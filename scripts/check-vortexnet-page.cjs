// Reuses an existing Playwright install; set PLAYWRIGHT_MODULE to its path.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.VORTEXNET_BASE_URL || 'http://localhost:3000'
const artifacts = path.join(os.tmpdir(), 'vortexnet-review')

;(async () => {
  fs.mkdirSync(artifacts, {recursive: true})
  const browser = await chromium.launch({headless: true})
  try {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}})
    const errors = [], failures = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.url().startsWith(base) && response.status() >= 400) failures.push(response.url())
    })
    await page.goto(base + '/project/vortexnet')
    await page.getByRole('heading', {level: 1}).waitFor()
    await page.evaluate(() => document.fonts.ready)
    await page.locator('header img').evaluate(img => img.decode())
    await page.screenshot({path: path.join(artifacts, 'desktop-hero.png')})
    await page.locator('#iteration').screenshot({path: path.join(artifacts, 'desktop-decision.png')})
    const before = page.getByRole('button', {name: 'Before', exact: true})
    const after = page.getByRole('button', {name: 'After', exact: true})
    const viewport = page.locator('[id="' + await before.getAttribute('aria-controls') + '"]')
    assert.equal(await after.getAttribute('aria-pressed'), 'true')
    await viewport.locator('img:visible').evaluate(img => img.decode())
    await page.locator('#result').evaluate(el => el.scrollIntoView({block: 'start'}))
    const afterHeight = (await viewport.boundingBox()).height
    await page.screenshot({path: path.join(artifacts, 'desktop-comparison.png')})
    await before.focus()
    await page.keyboard.press('Enter')
    assert.equal(await before.getAttribute('aria-pressed'), 'true')
    assert.equal(await after.getAttribute('aria-pressed'), 'false')
    assert.equal(await viewport.locator('img:visible').count(), 1)
    assert((await viewport.locator('img:visible').getAttribute('src')).endsWith('legacy-screen.webp'))
    await viewport.locator('img:visible').evaluate(img => img.decode())
    assert.equal((await viewport.boundingBox()).height, afterHeight, 'Comparison must not jump between image sizes')
    assert.equal(await page.getByText('View full size', {exact: false}).count(), 0)
    assert.equal((await page.request.get(base + '/vortexnet/media/legacy-screen.webp')).status(), 200)
    await page.keyboard.press('Tab')
    assert(await after.evaluate(el => el === document.activeElement))
    await page.keyboard.press('Space')
    assert.equal(await after.getAttribute('aria-pressed'), 'true')
    assert.equal((await page.request.get(base + '/vortexnet/media/rebuilt-screen.webp')).status(), 200)

    for (const summary of await page.locator('details summary').all()) {
      await summary.click()
    }
    for (const img of await page.locator('main img:visible').all()) {
      await img.scrollIntoViewIfNeeded()
      await img.evaluate(img => img.decode())
      if ((await img.getAttribute('src')).startsWith('/vortexnet/media/')) {
        assert(await img.evaluate(img => Number(img.getAttribute('width')) === img.naturalWidth && Number(img.getAttribute('height')) === img.naturalHeight), 'Image dimensions must match the regenerated asset')
      }
    }
    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash))
    assert.deepEqual(brokenAnchors, [])
    for (const width of [320, 390, 768, 1024]) {
      await page.setViewportSize({width, height: 844})
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No page overflow at ' + width)
      await before.click()
      assert.equal(await before.getAttribute('aria-pressed'), 'true')
      await after.click()
      assert.equal(await after.getAttribute('aria-pressed'), 'true')
      if (width === 390) {
        await page.evaluate(() => scrollTo(0, 0))
        await page.screenshot({path: path.join(artifacts, 'mobile-hero.png')})
        await page.locator('#result').evaluate(el => el.scrollIntoView({block: 'start'}))
        await page.screenshot({path: path.join(artifacts, 'mobile-comparison.png')})
        await page.locator('#iteration').screenshot({path: path.join(artifacts, 'mobile-decision.png')})
        const table = page.getByRole('region', {name: 'Information priority model'})
        await table.focus()
        await page.keyboard.press('End')
        await table.evaluate(el => { el.scrollLeft = el.scrollWidth })
        assert(await table.evaluate(el => el.scrollLeft > 0), 'Priority table can be scrolled on narrow screens')
      }
    }
    for (const route of ['/project/vortexnet', '/visual/project/vortexnet']) {
      await page.goto(base + route)
      await page.getByRole('heading', {level: 1}).waitFor()
      assert.equal(await page.getByRole('link', {name: 'All Projects', exact: true}).getAttribute('href'), route.startsWith('/visual') ? '/visual' : '/')
    }
    assert.deepEqual(errors, [], 'No runtime errors')
    assert.deepEqual(failures, [], 'No failed local requests')
    console.log('PASS: keyboard comparison, stable image viewport, clean image presentation, disclosure images, anchors, narrow-screen table and both portfolio tracks.')
    console.log('Screenshots: ' + artifacts)
  } finally { await browser.close() }
})().catch(error => { console.error(error); process.exitCode = 1 })
