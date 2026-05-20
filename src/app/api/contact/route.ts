import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const SUPPORT_EMAIL = 'suppoprtgcsemaths@gmail.com'

export async function POST(req: Request) {
  const { name, email, category, message } = await req.json()

  if (!name || !email || !category || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Hard-fail (with logging) if Resend isn't configured. Previously this
  // silently returned 200 OK with no email sent, which made the form look
  // like it worked while the message went nowhere.
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set — message NOT delivered:', { name, email, category })
    return NextResponse.json({
      error: 'Email service is not configured on the server. Please email us directly at ' + SUPPORT_EMAIL,
    }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: 'GCSEMaths Contact Form <noreply@gcsemathsai.co.uk>',
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `[${category}] Contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#0F4F3A;margin-bottom:16px">New contact form submission</h2>
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
      // Surface the full Resend error so we can see it in Vercel runtime logs.
      console.error('[contact] Resend send failed:', JSON.stringify(error, null, 2))
      return NextResponse.json({
        error: 'Failed to send message',
        detail: typeof error === 'object' && error && 'message' in error ? (error as { message: string }).message : String(error),
      }, { status: 500 })
    }

    console.log('[contact] Sent OK, Resend id:', data?.id)
    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err) {
    console.error('[contact] Resend threw:', err)
    return NextResponse.json({
      error: 'Failed to send message',
      detail: err instanceof Error ? err.message : String(err),
    }, { status: 500 })
  }
}
