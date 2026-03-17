import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  const { name, email, category, message } = await req.json()

  if (!name || !email || !category || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — contact form message not sent:', { name, email, category, message })
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'GCSEMathsAI <noreply@gcsemathsai.co.uk>',
    to: 'enquiries@gcsemathsai.co.uk',
    replyTo: email,
    subject: `[${category}] Contact form: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#6D28D9;margin-bottom:16px">New contact form submission</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;font-weight:700;width:100px">Name</td><td>${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Category</td><td>${category}</td></tr>
        </table>
        <hr style="margin:16px 0;border:none;border-top:1px solid #E5E1FF"/>
        <p style="font-weight:700;margin-bottom:8px">Message</p>
        <p style="white-space:pre-wrap;color:#374151">${message}</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #E5E1FF"/>
        <p style="color:#9CA3AF;font-size:12px">Sent via gcsemathsai.co.uk contact form</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
