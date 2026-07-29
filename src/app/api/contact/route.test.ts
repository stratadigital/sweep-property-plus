import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// vi.hoisted ensures mockSend is available when vi.mock's factory runs (which is also hoisted)
const mockSend = vi.hoisted(() => vi.fn())

vi.mock('resend', () => ({
  // Regular function required — arrow functions cannot be used as constructors with `new`
  Resend: vi.fn(function () {
    return { emails: { send: mockSend } }
  }),
}))

import { POST } from './route'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_BODY = {
  name: 'Jane Smith',
  email: 'jane@acme.com',
  company: 'ACME Corp',
  phone: '(555) 123-4567',
  facility_type: 'Office Building',
  message: 'Looking for commercial cleaning for our 20,000 sqft office.',
  botcheck: false,
}

function makeRequest(
  body: unknown,
  { origin = 'http://localhost' }: { origin?: string | null } = {}
) {
  // Host must be set explicitly — NextRequest doesn't auto-set it like a real HTTP server does
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Host: 'localhost' }
  if (origin !== null) headers['Origin'] = origin
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.CONTACT_FORM_TO = 'notifications@example.com'
    process.env.RESEND_API_KEY = 're_test_placeholder'
    mockSend.mockResolvedValue({ data: { id: 'email-abc-123' }, error: null })
  })

  describe('input validation', () => {
    it('returns 400 for a malformed JSON body', async () => {
      const req = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{not valid json',
      })
      const res = await POST(req)
      expect(res.status).toBe(400)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it.each([
      ['name is missing', { ...VALID_BODY, name: undefined }],
      ['name is blank whitespace', { ...VALID_BODY, name: '   ' }],
      ['email is missing', { ...VALID_BODY, email: undefined }],
      ['email is empty', { ...VALID_BODY, email: '' }],
      ['message is missing', { ...VALID_BODY, message: undefined }],
      ['message is blank whitespace', { ...VALID_BODY, message: '\n\t ' }],
    ])('returns 400 when %s', async (_, body) => {
      const res = await POST(makeRequest(body))
      expect(res.status).toBe(400)
      expect(mockSend).not.toHaveBeenCalled()
    })
  })

  describe('spam protection', () => {
    it('silently succeeds without sending when botcheck is true', async () => {
      const res = await POST(makeRequest({ ...VALID_BODY, botcheck: true }))
      const json = await res.json()
      expect(res.status).toBe(200)
      expect(json.success).toBe(true)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('silently succeeds without sending when Origin header is absent', async () => {
      const res = await POST(makeRequest(VALID_BODY, { origin: null }))
      expect(res.status).toBe(200)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('silently succeeds without sending when Origin does not match host', async () => {
      const res = await POST(makeRequest(VALID_BODY, { origin: 'https://attacker.com' }))
      expect(res.status).toBe(200)
      expect(mockSend).not.toHaveBeenCalled()
    })
  })

  describe('server configuration', () => {
    it('returns 500 when CONTACT_FORM_TO is not set', async () => {
      delete process.env.CONTACT_FORM_TO
      const res = await POST(makeRequest(VALID_BODY))
      expect(res.status).toBe(500)
      expect(mockSend).not.toHaveBeenCalled()
    })
  })

  describe('Resend errors', () => {
    it('returns 500 when the notification email fails', async () => {
      mockSend
        .mockResolvedValueOnce({
          data: null,
          error: { message: 'Invalid API key', name: 'validation_error' },
        })
        .mockResolvedValueOnce({ data: { id: 'email-abc-123' }, error: null })

      const res = await POST(makeRequest(VALID_BODY))
      expect(res.status).toBe(500)
    })

    it('returns 500 when the auto-reply email fails', async () => {
      mockSend
        .mockResolvedValueOnce({ data: { id: 'email-abc-123' }, error: null })
        .mockResolvedValueOnce({
          data: null,
          error: { message: 'Rate limit exceeded', name: 'rate_limit_exceeded' },
        })

      const res = await POST(makeRequest(VALID_BODY))
      expect(res.status).toBe(500)
    })
  })

  describe('successful submission', () => {
    it('returns 200 with success: true', async () => {
      const res = await POST(makeRequest(VALID_BODY))
      const json = await res.json()
      expect(res.status).toBe(200)
      expect(json.success).toBe(true)
    })

    it('sends exactly two emails', async () => {
      await POST(makeRequest(VALID_BODY))
      expect(mockSend).toHaveBeenCalledTimes(2)
    })

    it('sends notification to CONTACT_FORM_TO with submitter as Reply-To', async () => {
      await POST(makeRequest(VALID_BODY))
      const [notification] = mockSend.mock.calls
      expect(notification[0]).toMatchObject({
        from: 'Sweep Property Plus <noreply@sweeproperty.com>',
        to: 'notifications@example.com',
        replyTo: VALID_BODY.email,
      })
    })

    it('sends auto-reply to submitter with client address as Reply-To', async () => {
      await POST(makeRequest(VALID_BODY))
      const [, autoReply] = mockSend.mock.calls
      expect(autoReply[0]).toMatchObject({
        from: 'Sweep Property Plus <noreply@sweeproperty.com>',
        to: VALID_BODY.email,
        replyTo: 'info@sweeproperty.com',
      })
    })

    it('works with only the three required fields (all optional fields absent)', async () => {
      const res = await POST(
        makeRequest({
          name: VALID_BODY.name,
          email: VALID_BODY.email,
          message: VALID_BODY.message,
        })
      )
      expect(res.status).toBe(200)
    })
  })

  describe('email validation', () => {
    // type="email" on the input is client-side only — anything can POST here directly
    it.each([
      ['no @ sign', 'jane.acme.com'],
      ['nothing before the @', '@acme.com'],
      ['nothing after the @', 'jane@'],
      ['no dot in the domain', 'jane@acme'],
      ['a trailing dot', 'jane@acme.'],
      ['consecutive dots in the domain', 'jane@acme..com'],
      ['an internal space', 'jane doe@acme.com'],
      ['a space in the domain', 'jane@acme corp.com'],
      ['two @ signs', 'jane@@acme.com'],
      ['a newline (header injection shape)', 'jane@acme.com\nBcc: evil@evil.test'],
    ])('returns 400 when the email has %s', async (_, badEmail) => {
      const res = await POST(makeRequest({ ...VALID_BODY, email: badEmail }))
      expect(res.status).toBe(400)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('returns 400 when the email exceeds 254 characters', async () => {
      const tooLong = `${'a'.repeat(250)}@acme.com`
      const res = await POST(makeRequest({ ...VALID_BODY, email: tooLong }))
      expect(res.status).toBe(400)
      expect(mockSend).not.toHaveBeenCalled()
    })

    it.each([
      ['a plus tag', 'jane+quotes@acme.com'],
      ['a subdomain', 'jane@mail.acme.co.uk'],
      ['a hyphenated domain', 'jane@acme-corp.com'],
      ['dots in the local part', 'jane.m.smith@acme.com'],
    ])('accepts an address with %s', async (_, goodEmail) => {
      const res = await POST(makeRequest({ ...VALID_BODY, email: goodEmail }))
      expect(res.status).toBe(200)
      expect(mockSend).toHaveBeenCalledTimes(2)
    })

    // The form keys off `field` to attach the message to the right input
    it('names the offending field so the form can show the error inline', async () => {
      const res = await POST(makeRequest({ ...VALID_BODY, email: 'not-an-email' }))
      const json = await res.json()
      expect(json.field).toBe('email')
      expect(json.error).toBeTruthy()
    })

    it('does not set `field` on failures the user cannot fix', async () => {
      delete process.env.CONTACT_FORM_TO
      const res = await POST(makeRequest(VALID_BODY))
      const json = await res.json()
      expect(res.status).toBe(500)
      expect(json.field).toBeUndefined()
    })

    it('trims surrounding whitespace before sending', async () => {
      await POST(makeRequest({ ...VALID_BODY, email: '  jane@acme.com  ' }))
      const [notification, autoReply] = mockSend.mock.calls
      expect(notification[0].replyTo).toBe('jane@acme.com')
      expect(autoReply[0].to).toBe('jane@acme.com')
    })
  })

  describe('HTML escaping', () => {
    // Submitted values are interpolated into email HTML. Unescaped, a crafted
    // field injects arbitrary markup into the client's inbox.
    const INJECTION = '<a href="https://evil.test">click</a>'

    it.each([
      ['name', 'name'],
      ['company', 'company'],
      ['phone', 'phone'],
      ['facility_type', 'facility_type'],
      ['message', 'message'],
    ])('escapes markup submitted in %s', async (_, field) => {
      await POST(makeRequest({ ...VALID_BODY, [field]: INJECTION }))
      const [notification] = mockSend.mock.calls
      expect(notification[0].html).not.toContain(INJECTION)
      expect(notification[0].html).toContain('&lt;a href=&quot;https://evil.test&quot;&gt;')
    })

    it('escapes markup in the auto-reply greeting', async () => {
      await POST(makeRequest({ ...VALID_BODY, name: INJECTION }))
      const [, autoReply] = mockSend.mock.calls
      expect(autoReply[0].html).not.toContain(INJECTION)
      expect(autoReply[0].html).toContain('&lt;a href=')
    })

    it('escapes ampersands without double-encoding the result', async () => {
      await POST(makeRequest({ ...VALID_BODY, company: 'Ellery & Sons' }))
      const [notification] = mockSend.mock.calls
      expect(notification[0].html).toContain('Ellery &amp; Sons')
      expect(notification[0].html).not.toContain('&amp;amp;')
    })

    it('still renders newlines in the message as line breaks', async () => {
      await POST(makeRequest({ ...VALID_BODY, message: 'First line\nSecond line' }))
      const [notification] = mockSend.mock.calls
      expect(notification[0].html).toContain('First line<br>Second line')
    })
  })
})
