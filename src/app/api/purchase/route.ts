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

  // Identify SKU: prefer client_reference_id, then Price ID, then amount.
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
  // Bundle is the only £9.99 SKU — safe to infer from amount when the buy
  // URL was missing client_reference_id.
  if (!skuId && session.amount_total === 999) skuId = 'bundle'
  // Paper 2 / Paper 3 share £5.99 and the same Stripe Payment Link, so we
  // can't tell which one this buyer wanted. They paid — over-deliver and
  // give them the full bundle rather than blocking on the error.
  if (!skuId && session.amount_total === 599) skuId = 'bundle'
  // Any other paid session we can't identify: still over-deliver the full
  // bundle. Stripe has already verified the payment is real.
  if (!skuId) skuId = 'bundle'

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
