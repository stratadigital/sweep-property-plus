import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'noreply@sweeproperty.com'
const CLIENT_EMAIL = 'info@sweeproperty.com'

interface ContactBody {
  name: string
  email: string
  company?: string
  phone?: string
  facility_type?: string
  message: string
  botcheck?: boolean
}

function isLikelyBot(req: NextRequest, body: ContactBody): boolean {
  // Honeypot — bots that blindly fill all inputs will check this box
  if (body.botcheck) return true

  // Origin must match the request host — blocks scripts POSTing directly to the
  // endpoint without going through the site (the browser always sets this correctly)
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (!origin || !host) return true
  try {
    if (new URL(origin).host !== host) return true
  } catch {
    return true
  }

  return false
}

export async function POST(req: NextRequest) {
  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Silently succeed so bots think they got through
  if (isLikelyBot(req, body)) return NextResponse.json({ success: true })

  const { name, email, company, phone, facility_type, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const to = process.env.CONTACT_FORM_TO
  if (!to) {
    console.error('[contact] CONTACT_FORM_TO env var is not set')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const [notification, autoReply] = await Promise.all([
    // Notification to client — Reply-To is set to submitter so client can just hit Reply
    resend.emails.send({
      from: FROM,
      replyTo: email,
      to,
      subject: `New Quote Request — ${name}`,
      html: notificationHtml({ name, email, company, phone, facility_type, message }),
    }),
    // Auto-reply to submitter — Reply-To routes back to client inbox
    resend.emails.send({
      from: FROM,
      replyTo: CLIENT_EMAIL,
      to: email,
      subject: 'We received your request — Sweep Property Plus',
      html: autoReplyHtml(name),
    }),
  ])

  if (notification.error || autoReply.error) {
    console.error('[contact] Resend error:', notification.error ?? autoReply.error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

function notificationHtml({ name, email, company, phone, facility_type, message }: ContactBody) {
  const fields: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ...(company ? [['Company', company] as [string, string]] : []),
    ...(phone ? [['Phone', phone] as [string, string]] : []),
    ...(facility_type ? [['Facility Type', facility_type] as [string, string]] : []),
  ]

  const rows = fields
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 20px 10px 0;color:#6B7280;font-size:13px;white-space:nowrap;vertical-align:top;border-bottom:1px solid #e5e7eb;">${label}</td>
        <td style="padding:10px 0;font-size:13px;font-weight:600;color:#1A1A1A;border-bottom:1px solid #e5e7eb;">${value}</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:#1C4A43;padding:24px 28px;">
      <p style="margin:0;color:#F2BD71;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">Sweep Property Plus</p>
      <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">New Quote Request</h1>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <div style="margin-top:20px;background:#F7F2EA;border-radius:6px;padding:16px 20px;">
        <p style="margin:0 0 8px;color:#6B7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
        <p style="margin:0;font-size:13px;line-height:1.7;color:#1A1A1A;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p style="margin-top:20px;margin-bottom:0;font-size:12px;color:#9ca3af;">Reply to this email to respond directly to ${name}.</p>
    </div>
  </div>
</body>
</html>`
}

function autoReplyHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:#1C4A43;padding:24px 28px;">
      <p style="margin:0;color:#F2BD71;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">Sweep Property Plus</p>
      <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">We received your request.</h1>
    </div>
    <div style="padding:28px;">
      <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#1A1A1A;">Hi ${name},</p>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#1A1A1A;">Thank you for reaching out. We've received your quote request and will be in touch shortly to discuss your space and how we can help.</p>
      <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:#1A1A1A;">In the meantime, feel free to reply to this email or reach us at <a href="tel:+17327028440" style="color:#337068;text-decoration:none;">(732) 702-8440</a>.</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#1A1A1A;">— The Sweep Property Plus Team</p>
    </div>
    <div style="padding:16px 28px;background:#F7F2EA;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">Sweep Property Plus &middot; Union, NJ &middot; <a href="https://www.sweeproperty.com" style="color:#9ca3af;">sweeproperty.com</a></p>
    </div>
  </div>
</body>
</html>`
}
