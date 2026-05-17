// Resolves a Stripe checkout session into purchase details for the /thanks page.
// Verifies the session_id directly against the Stripe API so the buyer can
// download immediately, without waiting for the asynchronous webhook to land.

import { NextRequest, NextResponse } from 'next/server'
import { getSkuById, getSkuByStripePriceId } from '@/lib/predicted-papers'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'missing session_id' }, { status: 400 })
  }
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'stripe not configured' }, { status: 500 })
  }

  // Fetch session + line items in parallel
  const auth = { Authorization: `Bearer ${stripeKey}` }
  const [sessionRes, itemsRes] = await Promise.all([
    fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, { headers: auth, cache: 'no-store' }),
    fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=10`, { headers: auth, cache: 'no-store' }),
  ])
  if (!sessionRes.ok) return NextResponse.json({ error: 'session not found' }, { status: 404 })
  const session = await sessionRes.json() as {
    id?: string; payment_status?: string; client_reference_id?: string | null
    customer_details?: { email?: string }; customer_email?: string
    amount_total?: number; currency?: string
  }
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'not paid' }, { status: 402 })
  }

  // Identify SKU: prefer client_reference_id, fall back to Price ID lookup.
  let skuId: string | null = null
  const ref = session.client_reference_id
  if (ref === 'paper2' || ref === 'paper3' || ref === 'bundle') skuId = ref
  if (!skuId && itemsRes.ok) {
    const items = await itemsRes.json() as { data?: Array<{ price?: { id?: string } }> }
    for (const it of items.data ?? []) {
      const priceId = it.price?.id
      if (priceId) {
        const sku = getSkuByStripePriceId(priceId)
        if (sku) { skuId = sku.id; break }
      }
    }
  }
  if (!skuId) return NextResponse.json({ error: 'cannot resolve sku' }, { status: 422 })

  const sku = getSkuById(skuId)
  if (!sku) return NextResponse.json({ error: 'sku not found' }, { status: 404 })

  return NextResponse.json({
    sku_id: sku.id,
    title: sku.title,
    email: session.customer_details?.email || session.customer_email || null,
    amount_total: session.amount_total ?? null,
    currency: session.currency ?? 'gbp',
    files: sku.files.map(f => ({ filename: f.filename, label: f.label })),
  })
}
