// Uses an existing Playwright installation; no site dependency is added.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')

const base = process.env.LAB_BASE_URL || 'http://127.0.0.1:3000'
const artifacts = process.env.LAB_SCREENSHOTS || path.join(os.tmpdir(), 'portfolio-lab-review')

;(async () => {
  fs.mkdirSync(artifacts, { recursive: true })
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const errors = []
    const failures = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.url().startsWith(base) && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`)
    })

    await page.goto(`${base}/lab`, { waitUntil: 'networkidle' })
    await page.getByRole('heading', { level: 1, name: "Lele's Lab" }).waitFor()
    assert.equal(await page.locator('article').count(), 6, 'Six experiments render')
    assert.equal(await page.locator('main img').count(), 6, 'Six experiment images render')
    assert(await page.locator('main img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'Every experiment image loads')
    assert.equal(await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Lab' }).getAttribute('data-active'), 'true')
    await page.screenshot({ path: path.join(artifacts, 'desktop-lab.png'), fullPage: true })

    const viewport = page.getByRole('region', { name: /Draggable canvas/ })
    const desktopViewport = await viewport.boundingBox()
    assert(desktopViewport.height >= 900, 'Canvas fills the viewport below the desktop header')
    assert.equal(await viewport.evaluate(element => getComputedStyle(element).backgroundColor), 'rgb(255, 255, 255)', 'Canvas background is pure white')
    await viewport.scrollIntoViewIfNeeded()
    const initialScroll = await viewport.evaluate(element => [element.scrollLeft, element.scrollTop])
    const box = await viewport.boundingBox()
    await page.mouse.move(box.x + 590, box.y + 560)
    await page.mouse.down()
    await page.mouse.move(box.x + 390, box.y + 360, { steps: 8 })
    await page.mouse.up()
    const draggedScroll = await viewport.evaluate(element => [element.scrollLeft, element.scrollTop])
    assert(draggedScroll[0] > initialScroll[0] && draggedScroll[1] > initialScroll[1], 'Empty-space drag pans the canvas')

    await viewport.screenshot({ path: path.join(artifacts, 'desktop-lab-panned.png') })
    console.log('PASS desktop: full-screen white canvas, images, active navigation, and drag')

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${base}/lab`, { waitUntil: 'networkidle' })
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile page has no horizontal overflow')
    assert.equal(await page.locator('main img').count(), 6)
    assert(await page.locator('main img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)))
    const mobileCards = await page.locator('main article').evaluateAll(cards => cards.slice(0, 6).map(card => ({ position: getComputedStyle(card).position, width: card.getBoundingClientRect().width })))
    assert(mobileCards.every(card => card.position === 'relative' && card.width <= 358), 'Cards become a single mobile column')
    await page.screenshot({ path: path.join(artifacts, 'mobile-lab.png'), fullPage: true })
    console.log('PASS mobile: single column, loaded media, and no overflow')

    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto(`${base}/visual/lab`, { waitUntil: 'networkidle' })
    assert.equal(await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Lab' }).getAttribute('href'), '/visual/lab')
    assert(await page.locator('main article').first().getByRole('link').first().getAttribute('href').then(href => href.startsWith('/visual/project/')))
    console.log('PASS visual track: navigation and experiment links stay in track')

    assert.deepEqual(errors, [], 'No browser runtime errors')
    assert.deepEqual(failures, [], 'No failed local responses')
    console.log(`Screenshots: ${artifacts}`)
  } finally {
    await browser.close()
  }
})().catch(error => { console.error(error); process.exitCode = 1 })
