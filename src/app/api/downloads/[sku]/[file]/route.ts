// Gated PDF download. Accepts EITHER:
//   - a Supabase JWT in the Authorization: Bearer header (logged-in customer
//     route — used by /my-papers), OR
//   - a Stripe checkout session_id in the ?session_id=cs_xxx query string
//     (immediate-post-purchase route — used by /thanks)

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'
import { getSkuById, getSkuByStripePriceId, PREDICTED_PAPER_FAMILIES } from '@/lib/predicted-papers'

export const runtime = 'nodejs'

function entitlingSkus(skuId: string): string[] {
  if (skuId === 'paper2') return ['paper2', 'bundle']
  if (skuId === 'paper3') return ['paper3', 'bundle']
  if (skuId === 'bundle') return ['bundle']
  return []
}

function fileBelongsToSku(skuId: string, filename: string): boolean {
  const sku = getSkuById(skuId)
  if (!sku) return false
  return sku.files.some(f => f.filename === filename)
}

function fileBelongsToBundle(filename: string): boolean {
  const bundle = getSkuById('bundle')
  return !!bundle?.files.some(f => f.filename === filename)
}

async function verifyByStripeSession(sessionId: string, skuId: string): Promise<boolean> {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey || !sessionId.startsWith('cs_')) return false
  const auth = { Authorization: `Bearer ${stripeKey}` }
  const [sessionRes, itemsRes] = await Promise.all([
    fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, { headers: auth, cache: 'no-store' }),
    fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=10`, { headers: auth, cache: 'no-store' }),
  ])
  if (!sessionRes.ok) return false
  const session = await sessionRes.json() as { payment_status?: string; client_reference_id?: string | null }
  if (session.payment_status !== 'paid') return false

  // Resolve the SKU bought in this session.
  let boughtSkuId: string | null = null
  const ref = session.client_reference_id
  if (ref === 'paper2' || ref === 'paper3' || ref === 'bundle') boughtSkuId = ref
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
  if (!boughtSkuId) return false
  return entitlingSkus(skuId).includes(boughtSkuId)
}

type Props = { params: Promise<{ sku: string; file: string }> }

export async function GET(req: NextRequest, { params }: Props) {
  const { sku, file } = await params
  const decodedFile = decodeURIComponent(file)

  if (decodedFile.includes('/') || decodedFile.includes('\\') || decodedFile.includes('..')) {
    return NextResponse.json({ error: 'invalid filename' }, { status: 400 })
  }
  if (!fileBelongsToSku(sku, decodedFile) && !fileBelongsToBundle(decodedFile)) {
    return NextResponse.json({ error: 'unknown file for this sku' }, { status: 404 })
  }

  // Resolve which folder the file lives in
  let folder: 'paper2' | 'paper3' | null = null
  for (const f of PREDICTED_PAPER_FAMILIES) {
    for (const s of f.skus) {
      const hit = s.files.find(x => x.filename === decodedFile)
      if (hit) { folder = hit.folder; break }
    }
    if (folder) break
  }
  if (!folder) return NextResponse.json({ error: 'file not found' }, { status: 404 })

  // ── Auth path A: Stripe session_id (immediate post-purchase) ───────────────
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (sessionId) {
    const ok = await verifyByStripeSession(sessionId, sku)
    if (!ok) return NextResponse.json({ error: 'session does not entitle this file' }, { status: 403 })
  } else {
    // ── Auth path B: Supabase JWT (logged-in /my-papers route) ───────────────
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
    const email = userData.user.email.toLowerCase().trim()
    const { data: rows, error } = await supabase
      .from('purchases')
      .select('sku_id')
      .eq('customer_email', email)
      .in('sku_id', entitlingSkus(sku))
    if (error) return NextResponse.json({ error: 'lookup failed' }, { status: 500 })
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'no purchase found for this email' }, { status: 403 })
    }
  }

  // Stream the PDF
  const filePath = path.join(process.cwd(), 'content', 'predicted-papers', folder, decodedFile)
  try {
    const buf = await fs.readFile(filePath)
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${decodedFile}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'file missing on server' }, { status: 404 })
  }
}
