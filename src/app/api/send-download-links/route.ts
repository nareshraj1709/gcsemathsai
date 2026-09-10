// Emails the buyer their download links as a backup. Called from /thanks
// after a successful payment, when the buyer enters an email into the
// backup form. Verifies the Stripe session is paid before sending so this
// can't be abused as a spam relay.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSkuById, isKnownSkuId } from '@/lib/predicted-papers'
import { isPsleSkuId, PSLE_PRODUCT, PSLE_SKU_ID } from '@/lib/psle-papers'

export const runtime = 'nodejs'

const BASE = 'https://www.gcsemathsai.co.uk'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const resendKey = process.env.RESEND_API_KEY
  if (!stripeKey || !resendKey) {
    return NextResponse.json({ error: 'email not configured' }, { status: 500 })
  }

  const body = await req.json().catch(() => ({})) as { session_id?: string; email?: string }
  const sessionId = (body.session_id || '').trim()
  const email = (body.email || '').trim().toLowerCase()
  if (!sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'missing session_id' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 })
  }

  const sessionRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${stripeKey}` },
    cache: 'no-store',
  })
  if (!sessionRes.ok) return NextResponse.json({ error: 'session not found' }, { status: 404 })
  const session = await sessionRes.json() as { payment_status?: string; client_reference_id?: string | null }
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'not paid' }, { status: 402 })
  }

  // Identify which product this session paid for. PSLE is checked first since
  // it's a distinct product line from the GCSE predicted papers.
  const ref = session.client_reference_id
  const isPsle = isPsleSkuId(ref)
  const skuId = isKnownSkuId(ref) ? ref : 'bundle' // GCSE over-delivers bundle when unidentified (see /api/purchase)

  const downloadSkuSegment = isPsle ? PSLE_SKU_ID : skuId
  const files = isPsle ? PSLE_PRODUCT.files : (getSkuById(skuId)?.files ?? [])
  if (files.length === 0) return NextResponse.json({ error: 'catalogue missing sku' }, { status: 500 })

  const linkFor = (filename: string) =>
    `${BASE}/api/downloads/${downloadSkuSegment}/${encodeURIComponent(filename)}?session_id=${encodeURIComponent(sessionId)}`

  const linesText = files.map(f => `• ${f.label} — ${linkFor(f.filename)}`).join('\n')
  const linesHtml = files.map(f =>
    `<li style="margin:6px 0"><a href="${linkFor(f.filename)}" style="color:#1b6a4f;text-decoration:underline">${f.label}</a></li>`
  ).join('')

  const productName = isPsle ? 'PSLE Maths practice papers' : 'predicted papers'
  const resend = new Resend(resendKey)
  const { error } = await resend.emails.send({
    from: 'GCSEMathsAI <noreply@gcsemathsai.co.uk>',
    to: email,
    replyTo: 'enquiriesgcsemath@yahoo.com',
    subject: `Your GCSEMathsAI ${productName} — download links`,
    text:
`Thanks for your purchase from GCSEMathsAI.

Your download links:

${linesText}

Each link streams the paper with your buyer email watermarked on every page. Keep this email — the links keep working so you can re-download any time.

If anything doesn't work, just reply to this email and we'll sort it.

— GCSEMathsAI`,
    html:
`<div style="font-family:Georgia,serif;color:#222;max-width:560px">
  <p>Thanks for your purchase from <strong>GCSEMathsAI</strong>.</p>
  <p>Your download links:</p>
  <ul style="padding-left:18px">${linesHtml}</ul>
  <p style="font-size:13px;color:#555">Each link streams the paper with your buyer email watermarked on every page. Keep this email — the links keep working so you can re-download any time.</p>
  <p style="font-size:13px;color:#555">If anything doesn't work, just reply to this email and we'll sort it.</p>
  <p style="font-size:13px;color:#555">— GCSEMathsAI</p>
</div>`,
  })

  if (error) {
    console.error('Resend send failed', error)
    return NextResponse.json({ error: 'send failed' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
