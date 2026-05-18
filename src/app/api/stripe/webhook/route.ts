// Stripe webhook handler — records successful purchases into the Supabase
// `purchases` table. Configure in Stripe Dashboard:
//   Endpoint URL: https://www.gcsemathsai.co.uk/api/stripe/webhook
//   Events to listen for: checkout.session.completed
// Env vars required:
//   STRIPE_WEBHOOK_SECRET  — copied from the Stripe webhook endpoint dashboard
//   SUPABASE_SERVICE_ROLE_KEY  — service-role key (not the anon key)

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { getSkuByStripePriceId } from '@/lib/predicted-papers'

export const runtime = 'nodejs'

/** Verify the Stripe-Signature header without pulling in the stripe SDK. */
function verifySignature(payload: string, header: string | null, secret: string): boolean {
  if (!header) return false
  const parts = Object.fromEntries(
    header.split(',').map(kv => {
      const i = kv.indexOf('=')
      return [kv.slice(0, i), kv.slice(i + 1)] as [string, string]
    })
  ) as { t?: string; v1?: string }
  if (!parts.t || !parts.v1) return false

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(parts.t))
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) return false // 5 min tolerance

  const signedPayload = `${parts.t}.${payload}`
  const expected = crypto.createHmac('sha256', secret).update(signedPayload, 'utf8').digest('hex')
  return crypto.timingSafeEqual(Buffer.from(parts.v1), Buffer.from(expected))
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'webhook not configured' }, { status: 500 })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'supabase not configured' }, { status: 500 })
  }

  const payload = await req.text()
  const signature = req.headers.get('stripe-signature')
  if (!verifySignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  let event: { type?: string; data?: { object?: Record<string, unknown> } }
  try {
    event = JSON.parse(payload)
  } catch {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: true })
  }

  const session = event.data?.object as Record<string, unknown> | undefined
  if (!session) return NextResponse.json({ received: true })

  // Customer email comes from Stripe Payment Link with "Collect email" on.
  const email =
    (session.customer_details as { email?: string } | undefined)?.email ||
    (session.customer_email as string | undefined)
  if (!email) {
    return NextResponse.json({ received: true, warning: 'no email' })
  }

  const sessionId = session.id as string | undefined
  const amountTotal = session.amount_total as number | undefined
  const currency = session.currency as string | undefined

  // Identify which SKU was bought. Preferred: the `client_reference_id` we
  // append to the Payment Link URL on each buy button — this tells SKUs apart
  // even when two share the same Stripe Price. Fallback: line-item lookup by
  // Price ID via the Stripe API.
  let skuId: string | null = null
  const ref = session.client_reference_id as string | undefined
  if (ref === 'paper2' || ref === 'paper3' || ref === 'bundle') {
    skuId = ref
  }

  if (!skuId) {
    try {
      const stripeKey = process.env.STRIPE_SECRET_KEY
      if (stripeKey && sessionId) {
        const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=10`, {
          headers: { Authorization: `Bearer ${stripeKey}` },
        })
        if (r.ok) {
          const json = await r.json() as { data?: Array<{ price?: { id?: string } }> }
          for (const item of json.data ?? []) {
            const priceId = item.price?.id
            if (priceId) {
              const sku = getSkuByStripePriceId(priceId)
              if (sku) { skuId = sku.id; break }
            }
          }
        }
      }
    } catch {
      // Best-effort; fall through to amount-based inference / null SKU
    }
  }

  // If we still can't identify the SKU, fall back to the full bundle so the
  // buyer can download all ten papers. Over-delivering beats blocking on an
  // error — Stripe has already verified the payment.
  if (!skuId) {
    skuId = 'bundle'
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)
  const { error } = await supabase.from('purchases').upsert({
    customer_email: email.toLowerCase().trim(),
    stripe_session_id: sessionId ?? null,
    sku_id: skuId,
    amount_total: amountTotal ?? null,
    currency: currency ?? 'gbp',
    paid_at: new Date().toISOString(),
  }, { onConflict: 'stripe_session_id' })

  if (error) {
    console.error('Supabase insert failed', error)
    return NextResponse.json({ error: 'insert failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true, sku: skuId })
}
