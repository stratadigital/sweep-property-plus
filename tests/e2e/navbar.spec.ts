import { test, expect } from '@playwright/test'

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('desktop', () => {
    test.use({ viewport: { width: 1280, height: 800 } })

    test('hides hamburger button and shows desktop nav', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Open main menu' })).not.toBeVisible()
      // At least one desktop nav link must be visible
      await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible()
    })
  })

  test.describe('mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } })

    test('shows hamburger button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Open main menu' })).toBeVisible()
    })

    test('opens the menu when hamburger is clicked', async ({ page }) => {
      await page.getByRole('button', { name: 'Open main menu' }).click()
      await expect(page.getByRole('dialog')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible()
    })

    test('closes the menu when X is clicked', async ({ page }) => {
      await page.getByRole('button', { name: 'Open main menu' }).click()
      await expect(page.getByRole('dialog')).toBeVisible()

      await page.getByRole('button', { name: 'Close menu' }).click()
      await expect(page.getByRole('dialog')).not.toBeVisible()
    })

    test('closes the menu when a nav link is clicked', async ({ page }) => {
      await page.getByRole('button', { name: 'Open main menu' }).click()
      await expect(page.getByRole('dialog')).toBeVisible()

      await page.getByRole('dialog').getByRole('link', { name: 'About' }).click()
      await expect(page.getByRole('dialog')).not.toBeVisible()
    })

    test('menu contains all nav links and CTA', async ({ page }) => {
      await page.getByRole('button', { name: 'Open main menu' }).click()
      const dialog = page.getByRole('dialog')

      for (const name of ['About', 'Services', 'Why Us', 'Industries', 'Contact']) {
        await expect(dialog.getByRole('link', { name })).toBeVisible()
      }
      await expect(dialog.getByRole('link', { name: 'Get a Quote' })).toBeVisible()
    })
  })
})
