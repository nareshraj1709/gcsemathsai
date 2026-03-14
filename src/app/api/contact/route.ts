import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, category, message } = await req.json()

  if (!name || !email || !category || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // TODO: wire up to an email service (e.g. Resend, SendGrid, Postmark)
  // For now, log to console so messages are visible in server logs / Vercel Functions
  console.log('Contact form submission:', {
    name,
    email,
    category,
    message,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
