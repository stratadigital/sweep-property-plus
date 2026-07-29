import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Sweep Property Plus <noreply@sweeproperty.com>'
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

// The browser's type="email" is client-side only and trivially bypassed. This
// keeps malformed addresses from reaching Resend, where they'd fail at send time
// and surface to the user as a generic 500. Deliberately permissive — the goal is
// to reject obvious junk, not to adjudicate RFC 5322.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

// 254 is the maximum length of a forward path in RFC 5321
function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value)
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

  // Normalize once — this value becomes both the auto-reply recipient and the
  // notification's Reply-To, so neither should carry stray whitespace
  const senderEmail = email.trim()
  if (!isValidEmail(senderEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
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
      replyTo: senderEmail,
      to,
      subject: `New Quote Request — ${name}`,
      html: notificationHtml({
        name,
        email: senderEmail,
        company,
        phone,
        facility_type,
        message,
      }),
    }),
    // Auto-reply to submitter — Reply-To routes back to client inbox
    resend.emails.send({
      from: FROM,
      replyTo: CLIENT_EMAIL,
      to: senderEmail,
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

// Submitted values are interpolated into an HTML email. Escape them first so a
// crafted field can't inject markup or links into the client's inbox.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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
        <td style="padding:10px 0;font-size:13px;font-weight:600;color:#1A1A1A;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td>
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
        <p style="margin:0;font-size:13px;line-height:1.7;color:#1A1A1A;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      </div>
      <p style="margin-top:20px;margin-bottom:0;font-size:12px;color:#9ca3af;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
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
      <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#1A1A1A;">Hi ${escapeHtml(name)},</p>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#1A1A1A;">Thank you for reaching out. We've received your quote request and will be in touch shortly to discuss your space and how we can help.</p>
      <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:#1A1A1A;">In the meantime, feel free to reply to this email or reach us at <a href="tel:+17327028440" style="color:#337068;text-decoration:none;">(732) 702-8440</a>.</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#1A1A1A;">— The Sweep Property Plus Team</p>
    </div>
    <div style="padding:16px 28px;background:#F7F2EA;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">Sweep Property Plus &middot; NJ &middot; <a href="https://www.sweeproperty.com" style="color:#9ca3af;">sweeproperty.com</a></p>
    </div>
  </div>
</body>
</html>`
}
