import { test, expect } from '@playwright/test'

const MOBILE_VIEWPORT = { width: 375, height: 667 }
const TABLET_VIEWPORT = { width: 768, height: 1024 }

test.describe('NotFound page responsiveness', () => {
  test('mobile viewport renders content without horizontal overflow', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT)
    await page.goto('/this-page-does-not-exist')

    await expect(page.getByRole('heading', { level: 1, name: /404/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Back to Main Page/i })).toBeVisible()

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    })

    expect(hasHorizontalOverflow).toBe(false)
  })

  test('mobile viewport uses full-width home link', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT)
    await page.goto('/missing-route')

    const link = page.getByRole('link', { name: /Back to Main Page/i })
    const dimensions = await link.evaluate((element) => ({
      linkWidth: element.clientWidth,
      parentWidth: element.parentElement?.clientWidth ?? 0,
      height: window.getComputedStyle(element).height,
    }))

    expect(dimensions.linkWidth).toBe(dimensions.parentWidth)
    expect(dimensions.height).toBe('48px')
  })

  test('tablet viewport renders content without horizontal overflow', async ({ page }) => {
    await page.setViewportSize(TABLET_VIEWPORT)
    await page.goto('/unknown-path')

    await expect(page.getByRole('heading', { level: 1, name: /404/i })).toBeVisible()

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    })

    expect(hasHorizontalOverflow).toBe(false)
  })
})
