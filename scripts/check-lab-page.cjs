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

    // Keep the pointer still: the artwork should continue breathing, while
    // its layout anchor stays still and remains a usable link target.
    const firstImage = page.locator('article').first().locator('img')
    const firstBox = await firstImage.boundingBox()
    await page.mouse.move(firstBox.x + firstBox.width * .7, firstBox.y + firstBox.height * .4)
    const samples = await page.locator('article').first().evaluate(async card => {
      const frames = []
      for (let i = 0; i < 4; i++) {
        await new Promise(resolve => setTimeout(resolve, 450))
        const matrix = new DOMMatrixReadOnly(getComputedStyle(card.firstElementChild).transform)
        frames.push({ x: matrix.m41, y: matrix.m42, rotation: matrix.m12, scale: Math.hypot(matrix.m11, matrix.m12, matrix.m13), anchor: card.getBoundingClientRect().x })
      }
      return frames
    })
    assert(samples.some(sample => Math.abs(sample.rotation) > .001 && sample.scale > 1.001), 'Hover includes rotation and breathing scale')
    assert(Math.abs(samples.at(-1).x - samples[0].x) + Math.abs(samples.at(-1).y - samples[0].y) > 1, 'Artwork keeps floating under a stationary pointer')
    assert(samples.every(sample => sample.anchor === samples[0].anchor), 'Artwork motion does not change its layout anchor')
    await page.screenshot({ path: path.join(artifacts, 'desktop-lab-breathing.png') })

    await page.mouse.move(30, 30)
    await page.waitForFunction(() => [...document.querySelectorAll('article')].every(card => getComputedStyle(card.firstElementChild).transform === 'none'))
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2)
    await page.waitForTimeout(150)
    assert(await page.locator('article').evaluateAll(cards => cards.every(card => getComputedStyle(card.firstElementChild).transform === 'none')), 'Reduced motion keeps the canvas still')
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    console.log('PASS motion: stationary-pointer drift, rotation, breathing, stable anchors, soft reset, and reduced motion')

    await viewport.scrollIntoViewIfNeeded()
    const initialScroll = await viewport.evaluate(element => [element.scrollLeft, element.scrollTop])
    const box = await viewport.boundingBox()
    await page.mouse.move(box.x + 590, box.y + 560)
    await page.mouse.down()
    await page.mouse.move(box.x + 390, box.y + 360, { steps: 8 })
    await page.waitForFunction(() => [...document.querySelectorAll('article')].every(card => getComputedStyle(card.firstElementChild).transform === 'none'))
    await page.mouse.up()
    await page.waitForFunction(() => [...document.querySelectorAll('article')].some(card => getComputedStyle(card.firstElementChild).transform !== 'none'))
    const draggedScroll = await viewport.evaluate(element => [element.scrollLeft, element.scrollTop])
    assert(draggedScroll[0] > initialScroll[0] && draggedScroll[1] > initialScroll[1], 'Empty-space drag pans the canvas')

    await viewport.screenshot({ path: path.join(artifacts, 'desktop-lab-panned.png') })
    console.log('PASS desktop: full-screen white canvas, images, active navigation, drag, and automatic motion recovery after release')

    await viewport.evaluate(element => element.scrollTo(0, 0))
    const firstLink = page.locator('article').first().getByRole('link').first()
    await firstLink.focus()
    await page.waitForFunction(() => getComputedStyle(document.querySelector('article').firstElementChild).transform === 'none')
    const destination = await firstLink.getAttribute('href')
    await firstLink.evaluate(element => element.blur())
    const linkBox = await firstLink.boundingBox()
    await page.mouse.click(linkBox.x + linkBox.width / 2, linkBox.y + linkBox.height / 2)
    await page.waitForURL(new URL(destination, base).href)
    console.log('PASS interaction: keyboard focus settles the artwork and mouse click opens its project')

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${base}/lab`, { waitUntil: 'networkidle' })
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile page has no horizontal overflow')
    assert.equal(await page.locator('main img').count(), 6)
    assert(await page.locator('main img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)))
    const mobileCards = await page.locator('main article').evaluateAll(cards => cards.slice(0, 6).map(card => ({ position: getComputedStyle(card).position, width: card.getBoundingClientRect().width })))
    assert(mobileCards.every(card => card.position === 'relative' && card.width <= 358), 'Cards become a single mobile column')
    await page.mouse.move(180, 340)
    assert(await page.locator('article').evaluateAll(cards => cards.every(card => getComputedStyle(card.firstElementChild).transform === 'none')), 'Mobile artwork stays still for reading and tapping')
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
