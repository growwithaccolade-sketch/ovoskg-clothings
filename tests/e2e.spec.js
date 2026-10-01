import { expect, test } from '@playwright/test'

test.describe('OVOSKG customer journey', () => {
  test('homepage exposes core conversion paths', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Made for your body/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Start an order/i }).first()).toBeVisible()
    await expect(page.getByRole('img', { name: /Nigerian man in a tailored suit/i }).first()).toBeVisible()
    await expect(page.getByText(/Bespoke suits, women’s tailoring and luxury kaftans for work, weddings and important occasions/i)).toBeVisible()
    await expect(page.getByText(/800\+ custom pieces delivered across Nigeria/i)).toBeVisible()
  })

  test('major routes render', async ({ page }) => {
    const routes = [
      ['/collections', /Choose the garment first/i],
      ['/shop', /Browse the current references/i],
      ['/lookbook', /Men’s suits. Women’s suits. Kaftans/i],
      ['/bespoke', /Tell us what you want made/i],
      ['/measurements', /Send your measurements for review/i],
      ['/track', /Check the current stage of your order/i],
      ['/about', /From tailoring work to OVOSKG/i],
      ['/company', /The team behind each order/i],
      ['/contact', /Speak with OVOSKG/i]
    ]

    for (const [route, heading] of routes) {
      await page.goto(route)
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    }
  })

  test('collection mini lookbook saves a reference and nudges to bespoke', async ({ page }) => {
    await page.goto('/collections/mens-bespoke')
    await expect(page.getByRole('heading', { name: /Men's bespoke suits/i })).toBeVisible()
    await expect(page.getByText(/6 references/i)).toBeVisible()
    const referenceButtons = page.getByRole('button', { name: /Use as reference/i })
    await expect(referenceButtons.first()).toBeVisible()
    await referenceButtons.first().click()
    await expect(page.getByRole('button', { name: /Saved as reference/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Start bespoke/i }).first()).toBeVisible()
  })

  test('remote fitting safeguards are visible before commitment', async ({ page }) => {
    await page.goto('/bespoke')
    await expect(page.getByRole('heading', { name: /Remote measurements are checked before production/i })).toBeVisible()
    await expect(page.getByText(/Send measurements/i).first()).toBeVisible()
    await expect(page.getByText(/Fit correction/i).first()).toBeVisible()
  })

  test('public pages contain no staging placeholder copy', async ({ page }) => {
    for (const route of ['/', '/lookbook', '/measurements', '/about']) {
      await page.goto(route)
      const body = await page.locator('body').innerText()
      expect(body).not.toMatch(/FOUNDER PORTRAIT SLOT|replace with|final media pass|media note|editorial image reference/i)
    }
  })

  test('core visual routes do not use low-resolution reel covers', async ({ page }) => {
    for (const route of ['/', '/collections', '/lookbook', '/measurements']) {
      await page.goto(route)
      const sources = await page.locator('img').evaluateAll(imgs => imgs.map(img => img.getAttribute('src') || ''))
      expect(sources.some(src => src.includes('/images/ovoskg/'))).toBeFalsy()
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
    await expect(page.getByText(/Saved references/i)).toBeVisible()
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
    await page.getByRole('button', { name: /Save measurement draft/i }).click()
    await expect(page.getByRole('button', { name: /Draft saved/i })).toBeVisible()
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


test('favicon assets are wired in', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('link[rel="icon"][href="/favicon.svg"]')).toHaveCount(1)
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href','/apple-touch-icon.png')
})


test('header uses transparent brand mark and dark luxury treatment', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /OVOSKG homepage/i }).first().locator('svg')).toBeVisible()
  await expect(page.locator('header')).toHaveClass(/luxury-header/)
  await expect(page.locator('header img[src="/ovoskg-logo.webp"]')).toHaveCount(0)
})


test('primary navigation is reduced and excludes Lookbook', async ({ page }) => {
  await page.goto('/')
  const primary = page.locator('header nav')
  await expect(primary.locator('a[href="/"]')).toHaveCount(1)
  await expect(primary.locator('a[href="/collections"]')).toHaveCount(1)
  await expect(primary.locator('a[href="/bespoke"]')).toHaveCount(1)
  await expect(primary.locator('a[href="/track"]')).toHaveCount(1)
  await expect(primary.locator('a[href="/contact"]')).toHaveCount(1)
  await expect(primary.locator('a[href="/lookbook"]')).toHaveCount(0)
  await expect(primary.locator('a[href="/shop"]')).toHaveCount(0)
  await expect(primary.locator('a[href="/about"]')).toHaveCount(0)
})


test('hero uses layered fit focused imagery', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('#home-hero')
  await expect(hero).toBeVisible()
  await expect(hero.locator('img[alt="Nigerian man in a tailored suit"]')).toHaveCount(1)
  await expect(hero.locator('.hero-detail-panel')).toHaveCount(2)
})


test('hero omits repeated brand label and stays concise', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('main section').first()
  await expect(hero.getByText('OVOSKG Clothings', { exact: true })).toHaveCount(0)
  await expect(hero.getByRole('heading', { name: /Made for your body/i })).toBeVisible()
})

test('mobile hero keeps primary actions visible', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Made for your body/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Start an order/i }).first()).toBeVisible()
  await expect(page.locator('.hero-artboard')).toBeVisible()
})


test('mobile sticky CTA is immediately available in black with white text', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/')
  const sticky=page.getByTestId('mobile-sticky-cta')
  await expect(sticky).toBeVisible()
  await expect(sticky.getByRole('link', { name: /Start an order/i })).toBeVisible()
  await expect(sticky.getByRole('link', { name: /WhatsApp/i })).toBeVisible()
})


test('legal pages are real routes', async ({ page }) => {
  for (const [route,title] of [['/privacy','Privacy policy'],['/terms','Terms of service'],['/delivery','Delivery policy'],['/returns','Alterations and returns']]) {
    await page.goto(route)
    await expect(page.getByRole('heading',{name:new RegExp(title,'i')})).toBeVisible()
  }
})

test('canonical metadata uses production domain', async ({ page }) => {
  await page.goto('/bespoke')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://ovoskgclothings.com/bespoke')
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content','https://ovoskgclothings.com/bespoke')
})

test('admin route is excluded from indexing', async ({ page }) => {
  await page.goto('/admin')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex,nofollow')
  await expect(page.getByRole('heading',{name:/Content studio/i})).toBeVisible()
})

test('hero image is prioritized and below fold images are lazy', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('img.hero-main-image')).toHaveAttribute('fetchpriority','high')
  expect(await page.locator('img[loading="lazy"]').count()).toBeGreaterThan(2)
})

for (const viewport of [
  {name:'phone-320',width:320,height:740},
  {name:'phone-360',width:360,height:800},
  {name:'phone-390',width:390,height:844},
  {name:'phone-430',width:430,height:900},
  {name:'tablet-768',width:768,height:1024},
  {name:'laptop-1024',width:1024,height:768},
  {name:'desktop-1440',width:1440,height:900}
]) {
  test(`responsive QA: ${viewport.name} has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({width:viewport.width,height:viewport.height})
    await page.goto('/')
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await expect(page.getByRole('heading',{name:/Made for your body/i})).toBeVisible()
    if(viewport.width<768) await expect(page.getByTestId('mobile-sticky-cta')).toBeVisible()
  })
}

test('SEO discovery files are available', async ({ request }) => {
  for (const path of ['/robots.txt','/sitemap.xml','/llms.txt']) {
    const response=await request.get(path)
    expect(response.ok()).toBeTruthy()
  }
})
