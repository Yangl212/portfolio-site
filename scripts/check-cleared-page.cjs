// Uses an existing Playwright install; no dependency is added to the site.
// PLAYWRIGHT_MODULE=/path/to/playwright node scripts/check-cleared-page.cjs
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.CLEARED_BASE_URL || 'http://localhost:3000'
const artifacts = process.env.CLEARED_SCREENSHOTS || path.join(os.tmpdir(), 'cleared-updated-review')

;(async () => {
  fs.mkdirSync(artifacts, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const errors = []
    const failures = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.url().startsWith(base) && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`)
    })
    await page.goto(`${base}/project/cleared`)
    await page.getByRole('heading', { level: 1, name: /AI-assisted planning/ }).waitFor()
    await page.evaluate(() => document.fonts.ready)
    const heroVideo = page.locator('video').first()
    await heroVideo.scrollIntoViewIfNeeded()
    await page.waitForFunction(() => { const v = document.querySelector('video'); return !v.paused && v.readyState >= 2 })
    await page.getByRole('button', { name: /^Pause demo: Preview:/ }).click()
    await page.evaluate(() => document.querySelector('video').dispatchEvent(new Event('canplay')))
    await page.waitForTimeout(200)
    assert(await heroVideo.evaluate(v => v.paused), 'Manual pause must survive media readiness events')
    await page.getByRole('button', { name: /^Play demo: Preview:/ }).click()
    await page.waitForFunction(() => !document.querySelector('video').paused)
    await page.evaluate(() => scrollTo(0, 0))
    await page.screenshot({ path: path.join(artifacts, 'desktop-hero.png') })

    for (let index = 1; index < 4; index += 1) {
      const video = page.locator('video').nth(index)
      await video.scrollIntoViewIfNeeded()
      await page.waitForFunction(i => { const v = document.querySelectorAll('video')[i]; return v.readyState >= 2 && !v.paused }, index)
      assert.deepEqual(await video.evaluate(v => [v.videoWidth, v.videoHeight, v.loop, v.muted]), [360, 704, true, true])
    }
    await page.locator('#experience').scrollIntoViewIfNeeded()
    await page.screenshot({ path: path.join(artifacts, 'desktop-decisions.png') })
    await page.locator('#trust').scrollIntoViewIfNeeded()
    await page.screenshot({ path: path.join(artifacts, 'desktop-trust.png') })
    await page.locator('#prototype').scrollIntoViewIfNeeded()
    const frame = page.frameLocator('iframe')
    await frame.getByText('Review next', { exact: true }).waitFor()
    await frame.getByText('Review next', { exact: true }).click()
    await frame.getByText('INFERRED', { exact: true }).waitFor()
    await page.locator('summary').click()
    assert.equal(await page.locator('details img').count(), 6)
    await page.locator('details img').last().scrollIntoViewIfNeeded()
    await page.waitForFunction(() => [...document.querySelectorAll('details img')].every(img => img.complete && img.naturalWidth > 0))

    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 844 })
      await page.goto(`${base}/project/cleared`)
      await page.getByRole('heading', { level: 1 }).waitFor()
      await page.evaluate(() => document.fonts.ready)
      await page.waitForFunction(() => !document.querySelector('iframe'))
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No horizontal overflow at ${width}`)
      await page.screenshot({ path: path.join(artifacts, `mobile-${width}.png`) })
      await page.locator('#prototype').scrollIntoViewIfNeeded()
      await page.waitForFunction(() => { const img = document.querySelector('a[aria-label*="desktop Calendar"] img'); return img?.complete && img.naturalWidth > 0 })
      await page.screenshot({ path: path.join(artifacts, `prototype-${width}.png`) })
      await page.locator('summary').click()
      if (width === 390) {
        const boxes = await page.locator('details figure').evaluateAll(items => items.slice(0, 2).map(el => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y })))
        assert.equal(boxes[0].x, boxes[1].x, 'Phone screenshots must use one readable column')
        assert(boxes[1].y > boxes[0].y)
      }
    }

    await page.goto(`${base}/visual/project/cleared`)
    await page.getByRole('heading', { level: 1 }).waitFor()
    assert.equal(await page.getByRole('link', { name: 'All Projects', exact: true }).getAttribute('href'), '/visual')

    const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
    await reduced.goto(`${base}/project/cleared`)
    const still = reduced.locator('video').first()
    await still.scrollIntoViewIfNeeded()
    await reduced.waitForTimeout(500)
    assert.equal(await still.getAttribute('src'), null, 'Reduced motion must not preload or autoplay video')
    await reduced.getByRole('button', { name: /^Play demo: Preview:/ }).click()
    await reduced.waitForFunction(() => !document.querySelector('video').paused)
    await reduced.getByRole('button', { name: /^Pause demo: Preview:/ }).click()
    assert(await still.evaluate(v => v.paused))
    assert.deepEqual(errors, [], 'No runtime errors')
    assert.deepEqual(failures, [], 'No failed local assets')
    console.log('PASS: looping media, manual pause, reduced motion, desktop prototype, mobile single-column screens, responsive widths and both portfolio routes.')
    console.log(`Screenshots: ${artifacts}`)
  } finally {
    await browser.close()
  }
})().catch(error => { console.error(error); process.exitCode = 1 })
