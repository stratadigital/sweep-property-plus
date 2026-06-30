import { test, expect } from '@playwright/test'

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact')
  })

  async function fillRequiredFields(page: Parameters<typeof test>[1] extends (...args: infer A) => unknown ? A[0] : never) {
    await page.locator('input[name="name"]').fill('Jane Smith')
    await page.locator('input[name="email"]').fill('jane@acme.com')
    await page.locator('textarea[name="message"]').fill('20,000 sqft office building. Looking for nightly cleaning.')
  }

  test('native validation blocks submission when required fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Request a Free Quote' }).click()
    // Browser validation fires — success state must not appear
    await expect(page.getByText('Request received.')).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'Request a Free Quote' })).toBeVisible()
  })

  test('shows success state after a valid submission', async ({ page }) => {
    await page.route('/api/contact', (route) => route.fulfill({ json: { success: true } }))

    await fillRequiredFields(page)
    await page.getByRole('button', { name: 'Request a Free Quote' }).click()

    await expect(page.getByText('Request received.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Request a Free Quote' })).not.toBeVisible()
  })

  test('shows error state with mailto fallback when submission fails', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({ status: 500, json: { error: 'Failed to send' } })
    )

    await fillRequiredFields(page)
    await page.getByRole('button', { name: 'Request a Free Quote' }).click()

    await expect(page.getByText('Something went wrong.')).toBeVisible()
    await expect(page.getByRole('link', { name: 'email us directly' })).toBeVisible()
    // Form should still be visible so the user can retry
    await expect(page.getByRole('button', { name: 'Request a Free Quote' })).toBeVisible()
  })

  test('resets to the form after clicking "Send another request"', async ({ page }) => {
    await page.route('/api/contact', (route) => route.fulfill({ json: { success: true } }))

    await fillRequiredFields(page)
    await page.getByRole('button', { name: 'Request a Free Quote' }).click()
    await expect(page.getByText('Request received.')).toBeVisible()

    await page.getByRole('button', { name: 'Send another request' }).click()
    await expect(page.getByRole('button', { name: 'Request a Free Quote' })).toBeVisible()
    // Form fields should be cleared
    await expect(page.locator('input[name="name"]')).toHaveValue('')
    await expect(page.locator('textarea[name="message"]')).toHaveValue('')
  })

  test('submits all optional fields correctly', async ({ page }) => {
    let capturedBody: Record<string, unknown> = {}
    await page.route('/api/contact', async (route) => {
      capturedBody = JSON.parse(route.request().postData() ?? '{}')
      await route.fulfill({ json: { success: true } })
    })

    await fillRequiredFields(page)
    await page.locator('input[name="company"]').fill('ACME Corp')
    await page.locator('input[name="phone"]').fill('(555) 123-4567')
    await page.locator('select[name="facility_type"]').selectOption('Office Building')
    await page.getByRole('button', { name: 'Request a Free Quote' }).click()

    await expect(page.getByText('Request received.')).toBeVisible()
    expect(capturedBody.company).toBe('ACME Corp')
    expect(capturedBody.phone).toBe('(555) 123-4567')
    expect(capturedBody.facility_type).toBe('Office Building')
  })
})
