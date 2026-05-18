// Gated PDF download. Accepts EITHER:
//   - a Supabase JWT in the Authorization: Bearer header (logged-in customer
//     route — used by /my-papers), OR
//   - a Stripe checkout session_id in the ?session_id=cs_xxx query string
//     (immediate-post-purchase route — used by /thanks)
//
// Before streaming, every page of the PDF is stamped with the buyer's email
// and download date so the file is traceable if redistributed.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'
import {
  getSkuById, getSkuByStripePriceId, PREDICTED_PAPER_FAMILIES,
  entitlingSkus, isKnownSkuId,
} from '@/lib/predicted-papers'
import { applyWatermark } from '@/lib/watermark-pdf'

export const runtime = 'nodejs'

function fileBelongsToSku(skuId: string, filename: string): boolean {
  const sku = getSkuById(skuId)
  if (!sku) return false
  return sku.files.some(f => f.filename === filename)
}

/** Returns the bundle SKU id matching the same tier as `skuId`. */
function siblingBundleSkuId(skuId: string): string {
  return skuId.startsWith('foundation_') ? 'foundation_bundle' : 'bundle'
}

function fileBelongsToBundle(skuId: string, filename: string): boolean {
  const bundle = getSkuById(siblingBundleSkuId(skuId))
  return !!bundle?.files.some(f => f.filename === filename)
}

interface StripeVerification {
  ok: boolean
  email?: string
}

async function verifyByStripeSession(sessionId: string, skuId: string): Promise<StripeVerification> {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey || !sessionId.startsWith('cs_')) return { ok: false }
  const auth = { Authorization: `Bearer ${stripeKey}` }
  const [sessionRes, itemsRes] = await Promise.all([
    fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, { headers: auth, cache: 'no-store' }),
    fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=10`, { headers: auth, cache: 'no-store' }),
  ])
  if (!sessionRes.ok) return { ok: false }
  const session = await sessionRes.json() as {
    payment_status?: string; client_reference_id?: string | null
    customer_details?: { email?: string }; customer_email?: string
    amount_total?: number
  }
  if (session.payment_status !== 'paid') return { ok: false }

  let boughtSkuId: string | null = null
  const ref = session.client_reference_id
  if (isKnownSkuId(ref)) boughtSkuId = ref
  if (!boughtSkuId && itemsRes.ok) {
    const items = await itemsRes.json() as { data?: Array<{ price?: { id?: string } }> }
    for (const it of items.data ?? []) {
      const priceId = it.price?.id
      if (priceId) {
        const sku = getSkuByStripePriceId(priceId)
        if (sku) { boughtSkuId = sku.id; break }
      }
    }
  }
  // If we still can't identify the SKU but the session is paid, fall back
  // to the sibling bundle of the requested file's tier. Over-deliver in
  // that tier rather than blocking the download or mixing tiers.
  if (!boughtSkuId) boughtSkuId = siblingBundleSkuId(skuId)

  if (!entitlingSkus(skuId).includes(boughtSkuId)) return { ok: false }

  const email = session.customer_details?.email || session.customer_email || ''
  return { ok: true, email: email.toLowerCase().trim() }
}

type Props = { params: Promise<{ sku: string; file: string }> }

export async function GET(req: NextRequest, { params }: Props) {
  const { sku, file } = await params
  const decodedFile = decodeURIComponent(file)

  if (decodedFile.includes('/') || decodedFile.includes('\\') || decodedFile.includes('..')) {
    return NextResponse.json({ error: 'invalid filename' }, { status: 400 })
  }
  if (!fileBelongsToSku(sku, decodedFile) && !fileBelongsToBundle(sku, decodedFile)) {
    return NextResponse.json({ error: 'unknown file for this sku' }, { status: 404 })
  }

  let folder: 'paper2' | 'paper3' | null = null
  let contentRoot: 'predicted-papers' | 'foundation-papers' = 'predicted-papers'
  for (const f of PREDICTED_PAPER_FAMILIES) {
    for (const s of f.skus) {
      const hit = s.files.find(x => x.filename === decodedFile)
      if (hit) {
        folder = hit.folder
        contentRoot = s.contentRoot ?? 'predicted-papers'
        break
      }
    }
    if (folder) break
  }
  if (!folder) return NextResponse.json({ error: 'file not found' }, { status: 404 })

  // ── Auth + identify buyer ──────────────────────────────────────────────────
  let buyerEmail: string | null = null
  let reference: string | null = null
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (sessionId) {
    const v = await verifyByStripeSession(sessionId, sku)
    if (!v.ok) return NextResponse.json({ error: 'session does not entitle this file' }, { status: 403 })
    buyerEmail = v.email ?? 'paid customer'
    reference = sessionId
  } else {
    const authHeader = req.headers.get('authorization')
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!accessToken) return NextResponse.json({ error: 'sign in required' }, { status: 401 })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !anonKey) return NextResponse.json({ error: 'auth not configured' }, { status: 500 })

    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    })
    const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken)
    if (userErr || !userData.user?.email) {
      return NextResponse.json({ error: 'sign in required' }, { status: 401 })
    }
    buyerEmail = userData.user.email.toLowerCase().trim()
    const { data: rows, error } = await supabase
      .from('purchases')
      .select('sku_id, stripe_session_id')
      .eq('customer_email', buyerEmail)
      .in('sku_id', entitlingSkus(sku))
    if (error) return NextResponse.json({ error: 'lookup failed' }, { status: 500 })
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'no purchase found for this email' }, { status: 403 })
    }
    reference = rows[0].stripe_session_id ?? null
  }

  // ── Load, watermark, stream ────────────────────────────────────────────────
  const filePath = path.join(process.cwd(), 'content', contentRoot, folder, decodedFile)
  let raw: Buffer
  try { raw = await fs.readFile(filePath) }
  catch { return NextResponse.json({ error: 'file missing on server' }, { status: 404 }) }

  let stamped: Uint8Array
  try {
    stamped = await applyWatermark(raw, {
      reference: reference ?? undefined,
    })
  } catch (err) {
    console.error('Watermark failed', err)
    // Fall back to the unstamped file so the customer still gets their PDF.
    stamped = raw
  }

  return new NextResponse(new Uint8Array(stamped), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${decodedFile}"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
