import { expect, test } from '@playwright/test'

test.describe('OVOSKG customer journey', () => {
  test('homepage exposes core conversion paths', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Your presence/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Start a commission/i }).first()).toBeVisible()
    await expect(page.getByText(/800\+/).first()).toBeVisible()
    await expect(page.getByText(/Men and women bespoke/i).first()).toBeVisible()
  })

  test('major routes render', async ({ page }) => {
    const routes = [
      ['/collections', /Start with the occasion/i],
      ['/shop', /Browse like a client/i],
      ['/lookbook', /Bring references/i],
      ['/bespoke', /A better brief/i],
      ['/measurements', /Good tailoring starts/i],
      ['/track', /Track the work/i],
      ['/about', /The system came before/i],
      ['/company', /A serious clothing company/i],
      ['/contact', /Talk before you commit/i]
    ]

    for (const [route, heading] of routes) {
      await page.goto(route)
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    }
  })

  test('shop shortlist flows into bespoke', async ({ page }) => {
    await page.goto('/shop')
    const saveButtons = page.getByRole('button', { name: /Add to shortlist/i })
    await expect(saveButtons.first()).toBeVisible()
    await saveButtons.first().click()
    await page.getByRole('button', { name: /Open style shortlist/i }).click()
    await expect(page.getByText(/Style shortlist/i)).toBeVisible()
    await page.getByRole('button', { name: /Use shortlist in bespoke brief/i }).click()
    await expect(page).toHaveURL(/\/bespoke$/)
    await expect(page.getByText(/Shortlist attached/i)).toBeVisible()
  })

  test('bespoke builder completes a structured brief', async ({ page }) => {
    await page.goto('/bespoke')
    await page.getByRole('button', { name: /Women's bespoke suit/i }).click()
    await page.getByRole('button', { name: /Continue/i }).click()
    await page.getByPlaceholder('Wedding, work, ceremony...').fill('Wedding')
    await page.getByPlaceholder('Navy, black, cream...').fill('Deep navy')
    await page.getByRole('button', { name: /Continue/i }).click()
    await page.getByRole('button', { name: /Book a physical fitting/i }).click()
    await page.getByRole('button', { name: /Continue/i }).click()
    await page.getByPlaceholder('e.g. 0800 000 0000').fill('08000000000')
    await page.getByRole('button', { name: /Continue/i }).click()
    await expect(page.getByText('Deep navy')).toBeVisible()
    await expect(page.getByRole('link', { name: /Send brief to OVOSKG/i })).toHaveAttribute('href', /wa\.me\/2347070489393/)
  })

  test('measurement profile saves locally', async ({ page }) => {
    await page.goto('/measurements')
    const inputs = page.locator('input[inputmode="decimal"]')
    await inputs.first().fill('16')
    await page.getByRole('button', { name: /Save measurement profile/i }).click()
    await expect(page.getByRole('button', { name: /Saved on this device/i })).toBeVisible()
  })

  test('demo order tracker shows production status', async ({ page }) => {
    await page.goto('/track')
    await page.getByPlaceholder(/OVS-DEMO-001/i).fill('OVS-DEMO-001')
    await page.getByRole('button', { name: /Track order/i }).click()
    await expect(page.getByRole('heading', { name: /Finishing and quality control/i })).toBeVisible()
    await expect(page.getByText(/Ready \/ dispatched/i)).toBeVisible()
  })

  test('contact request produces OVOSKG WhatsApp handoff', async ({ page }) => {
    await page.goto('/contact')
    await page.getByPlaceholder('Full name').fill('Test Client')
    await page.getByPlaceholder('0800 000 0000').fill('08000000000')
    const send = page.getByRole('link', { name: /Send request on WhatsApp/i })
    await expect(send).toHaveAttribute('href', /wa\.me\/2347070489393/)
  })
})
