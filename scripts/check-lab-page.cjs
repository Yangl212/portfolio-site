// Uses an existing Playwright installation; no site dependency is added.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')

const base = process.env.LAB_BASE_URL || 'http://127.0.0.1:3000'
const artifacts = process.env.LAB_SCREENSHOTS || path.join(os.tmpdir(), 'portfolio-lab-review')
const tileWidth = 2000
const tileHeight = 1400
const itemSelector = 'figure[data-lab-item]'
const interestAssets = [...new Set(fs.readFileSync(path.join(__dirname, '../app/interest/page.jsx'), 'utf8').match(/\/framer-assets\/images\/[a-zA-Z0-9_.-]+/g))]

const readPan = canvas => canvas.evaluate(element => ({
  x: Number(element.dataset.panX),
  y: Number(element.dataset.panY),
  transform: getComputedStyle(element).transform,
}))

function assertNormalized(pan) {
  assert(Number.isFinite(pan.x) && pan.x >= 0 && pan.x < tileWidth, `Horizontal pan is normalized: ${pan.x}`)
  assert(Number.isFinite(pan.y) && pan.y >= 0 && pan.y < tileHeight, `Vertical pan is normalized: ${pan.y}`)
  assert.notEqual(pan.transform, 'none', 'Canvas position is represented by a transform')
}

function panDistance(a, b) {
  const dx = Math.abs(a.x - b.x)
  const dy = Math.abs(a.y - b.y)
  return Math.min(dx, tileWidth - dx) + Math.min(dy, tileHeight - dy)
}

async function visibleImageIndex(viewport) {
  return viewport.evaluate(element => {
    const bounds = element.getBoundingClientRect()
    return [...element.querySelectorAll('figure[data-lab-item]')].findIndex(card => {
      const rect = card.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      return x > bounds.left + 50 && x < bounds.right - 50 && y > bounds.top + 50 && y < bounds.bottom - 50
    })
  })
}

async function assertVisibleImages(viewport, label) {
  await viewport.page().waitForFunction(() => {
    const region = document.querySelector('[data-lab-canvas]')?.parentElement
    if (!region) return false
    const bounds = region.getBoundingClientRect()
    const visible = [...region.querySelectorAll('figure[data-lab-item] img')].filter(image => {
      const rect = image.getBoundingClientRect()
      return rect.right > bounds.left + 8 && rect.left < bounds.right - 8 && rect.bottom > bounds.top + 8 && rect.top < bounds.bottom - 8
    })
    return visible.length >= 3 && visible.every(image => image.complete && image.naturalWidth > 0)
  })
  assert(await visibleImageIndex(viewport) >= 0, `${label}: an image remains reachable in the viewport`)
}

async function assertStill(page) {
  await page.waitForFunction(selector => [...document.querySelectorAll(selector)].every(card => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(card.firstElementChild).transform)
    return Math.abs(matrix.m41) < .01 && Math.abs(matrix.m42) < .01 && Math.abs(matrix.m12) < .0001 && Math.abs(matrix.m11 - 1) < .0001
  }), itemSelector)
}

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
    const viewport = page.getByRole('region', { name: /^Infinite image canvas/ })
    const canvas = page.locator('[data-lab-canvas]')
    await viewport.waitFor()
    assert.equal(await page.locator('[data-lab-tile="0:0"] figure[data-lab-item]').count(), 12, 'Original tile contains twelve images')
    assert(await page.locator('[data-lab-tile]').count() > 1, 'Desktop repeats the image tile')
    assert(await page.locator('[data-lab-tile]').evaluateAll(tiles => tiles.every(tile => tile.dataset.labTile === '0:0' ? tile.getAttribute('aria-hidden') !== 'true' : tile.getAttribute('aria-hidden') === 'true')), 'Only the original tile is exposed to assistive technology')
    assert(await page.locator(`${itemSelector} img`).evaluateAll((images, assets) => images.every(image => {
      const source = decodeURIComponent(image.getAttribute('src') || '')
      return assets.some(asset => source.includes(asset))
    }), interestAssets), 'Every canvas image is an existing Interest asset, not a project screenshot')
    assert.equal(await page.locator('main a[href*="/project/"]').count(), 0, 'There are no project links on the image canvas')
    assert.equal(await page.locator(`${itemSelector} figcaption, ${itemSelector} h2, ${itemSelector} h3`).count(), 0, 'Images have no added title or caption clutter')
    const primary = page.getByRole('navigation', { name: 'Primary' })
    assert(await primary.isVisible(), 'The original top navigation remains visible')
    assert.equal(await primary.getByRole('link', { name: 'Lab', exact: true }).getAttribute('data-active'), 'true')
    const desktopViewport = await viewport.boundingBox()
    assert(desktopViewport.height >= 880, 'Canvas fills the desktop below the header')
    assert.equal(await viewport.evaluate(element => getComputedStyle(element).backgroundColor), 'rgb(255, 255, 255)', 'Canvas background is pure white')
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight <= innerHeight + 1), 'Desktop canvas does not overflow the page')
    await assertVisibleImages(viewport, 'Initial canvas')
    await page.screenshot({ path: path.join(artifacts, 'desktop-lab.png'), fullPage: true })

    // A stationary pointer still produces organic movement; fixed layout
    // anchors prevent movement from feeding back into proximity calculations.
    const motionIndex = await visibleImageIndex(viewport)
    const motionCard = viewport.locator(itemSelector).nth(motionIndex)
    const firstBox = await motionCard.boundingBox()
    await page.mouse.move(firstBox.x + firstBox.width * .65, firstBox.y + firstBox.height * .4)
    const samples = await motionCard.evaluate(async card => {
      const frames = []
      for (let i = 0; i < 4; i++) {
        await new Promise(resolve => setTimeout(resolve, 450))
        const matrix = new DOMMatrixReadOnly(getComputedStyle(card.firstElementChild).transform)
        frames.push({ x: matrix.m41, y: matrix.m42, rotation: matrix.m12, scale: Math.hypot(matrix.m11, matrix.m12, matrix.m13), anchor: card.getBoundingClientRect().x })
      }
      return frames
    })
    assert(samples.some(sample => Math.abs(sample.rotation) > .0002), 'Hover includes a small rotation')
    assert(samples.some(sample => Math.abs(sample.scale - 1) > .0005), 'Hover includes breathing scale')
    assert(Math.abs(samples.at(-1).x - samples[0].x) + Math.abs(samples.at(-1).y - samples[0].y) > .2, 'Images keep floating under a stationary pointer')
    assert(samples.every(sample => Math.abs(sample.anchor - samples[0].anchor) < .5), 'Breathing does not change the layout anchor')
    await page.screenshot({ path: path.join(artifacts, 'desktop-lab-breathing.png') })

    // Cross both repeat boundaries while the visible image is already moving.
    // Record immediately before wheel handling and on the first painted wrap:
    // the replacement tile must inherit motion, not jump to its resting pose.
    assert.deepEqual(await canvas.evaluate(element => [Number(element.dataset.panX), Number(element.dataset.panY)]), [0, 0], 'Seam test starts at the original tile boundary')
    const seamItem = await motionCard.getAttribute('data-lab-item')
    await viewport.evaluate((element, item) => {
      window.__labSeamCapture = null
      element.addEventListener('wheel', () => {
        const original = element.querySelector(`[data-lab-tile="0:0"] [data-lab-item="${item}"]`)
        const beforeRect = original.querySelector('img').getBoundingClientRect()
        const beforeMatrix = new DOMMatrixReadOnly(getComputedStyle(original.firstElementChild).transform)
        const before = { x: beforeRect.x, y: beforeRect.y, motion: Math.abs(beforeMatrix.m41) + Math.abs(beforeMatrix.m42) }
        let frames = 0
        const inspect = () => {
          frames++
          const board = element.querySelector('[data-lab-canvas]')
          const x = Number(board.dataset.panX), y = Number(board.dataset.panY)
          if (x === 0 && y === 0 && frames < 5) return requestAnimationFrame(inspect)
          const next = [...element.querySelectorAll(`[data-lab-item="${item}"]`)].map(card => {
            const rect = card.querySelector('img').getBoundingClientRect()
            return { x: rect.x, y: rect.y, tile: card.parentElement.dataset.labTile }
          }).sort((a, b) => Math.hypot(a.x - before.x + 2, a.y - before.y + 2) - Math.hypot(b.x - before.x + 2, b.y - before.y + 2))[0]
          window.__labSeamCapture = { before, after: next, pan: { x, y }, frames }
        }
        requestAnimationFrame(inspect)
      }, { capture: true, once: true })
    }, seamItem)
    await page.mouse.wheel(2, 2)
    await page.waitForFunction(() => window.__labSeamCapture !== null)
    const seam = await page.evaluate(() => {
      const result = window.__labSeamCapture
      delete window.__labSeamCapture
      return result
    })
    assert(seam.before.motion > 2, 'The seam is crossed with a meaningful existing breathing offset')
    assert.equal(seam.pan.x, tileWidth - 2, 'The wheel crosses the horizontal repeat boundary')
    assert.equal(seam.pan.y, tileHeight - 2, 'The wheel crosses the vertical repeat boundary')
    assert.notEqual(seam.after.tile, '0:0', 'A neighboring tile takes over the image')
    assert(Math.abs(seam.after.x - seam.before.x + 2) <= 1, `Breathing remains horizontally continuous at the seam: ${JSON.stringify(seam)}`)
    assert(Math.abs(seam.after.y - seam.before.y + 2) <= 1, `Breathing remains vertically continuous at the seam: ${JSON.stringify(seam)}`)
    console.log('PASS animated seam: replacement tile preserves the existing breathing state across both boundaries')

    await page.mouse.move(30, 30)
    await assertStill(page)
    console.log('PASS motion: stationary-pointer drift, rotation, breathing, stable anchors, and soft reset')

    // Start on a photo, not an empty margin. Release must preserve momentum
    // without navigating away or triggering the browser's native image drag.
    const imageIndex = await visibleImageIndex(viewport)
    const imageBox = await viewport.locator(itemSelector).nth(imageIndex).boundingBox()
    const startX = imageBox.x + imageBox.width / 2
    const startY = imageBox.y + imageBox.height / 2
    const initialPan = await readPan(canvas)
    await page.mouse.move(startX, startY)
    await page.mouse.down()
    await page.mouse.move(startX + (startX > 720 ? -230 : 230), startY + (startY > 500 ? -170 : 170), { steps: 12 })
    const heldPan = await readPan(canvas)
    assert(panDistance(initialPan, heldPan) > 100, 'Dragging from a photo pans the canvas')
    await page.mouse.up()
    const releasedPan = await readPan(canvas)
    await page.waitForTimeout(180)
    const coastedPan = await readPan(canvas)
    assert(panDistance(releasedPan, coastedPan) > 1, 'Canvas coasts after releasing the drag')
    assert.equal(new URL(page.url()).pathname, '/lab', 'Dragging an image does not navigate away')
    assertNormalized(coastedPan)
    await assertVisibleImages(viewport, 'After image drag')
    console.log('PASS drag: photos are drag handles, release has inertia, and the route is unchanged')

    // Reduced motion removes automatic breathing/inertia, not user-directed
    // navigation. It also makes wraparound assertions deterministic.
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await assertStill(page)
    const regionBox = await viewport.boundingBox()
    await page.mouse.move(regionBox.x + regionBox.width / 2, regionBox.y + regionBox.height / 2)
    const beforeWheel = await readPan(canvas)
    await page.mouse.wheel(385, 525)
    await page.waitForTimeout(250)
    const afterWheel = await readPan(canvas)
    assert(panDistance(beforeWheel, afterWheel) > 20, 'Trackpad/wheel moves the canvas with reduced motion enabled')
    assertNormalized(afterWheel)
    await assertVisibleImages(viewport, 'After wheel pan')

    await viewport.focus()
    const beforeKeyboard = await readPan(canvas)
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(150)
    assert(panDistance(beforeKeyboard, await readPan(canvas)) > 20, 'Focused canvas can be panned with arrow keys')

    for (const [dx, dy] of [[-6473, -4379], [8521, 5771], [-10371, 8693]]) {
      const start = { x: regionBox.x + regionBox.width / 2, y: regionBox.y + regionBox.height / 2 }
      const beforeLongDrag = await readPan(canvas)
      await page.mouse.move(start.x, start.y)
      await page.mouse.down()
      await page.mouse.move(start.x + dx, start.y + dy, { steps: 4 })
      await page.mouse.up()
      await page.waitForTimeout(100)
      const afterLongDrag = await readPan(canvas)
      assert(panDistance(beforeLongDrag, afterLongDrag) > 20, 'A multi-period drag changes the canvas position')
      assertNormalized(afterLongDrag)
      await assertVisibleImages(viewport, `After a ${dx} × ${dy} drag`)
    }
    await page.mouse.move(regionBox.x + regionBox.width / 2, regionBox.y + regionBox.height / 2)
    const stillPan = await readPan(canvas)
    await page.waitForTimeout(350)
    assert(panDistance(stillPan, await readPan(canvas)) < .1, 'Reduced motion does not keep drifting after interaction')
    await assertStill(page)
    assert(await primary.isVisible(), 'The top navigation remains visible after long pans')
    await viewport.screenshot({ path: path.join(artifacts, 'desktop-lab-panned.png') })
    console.log('PASS infinite canvas: wheel, keyboard, multi-period drags, normalized positions, loaded imagery, and reduced motion')

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${base}/lab`, { waitUntil: 'networkidle' })
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile page has no horizontal overflow')
    assert.equal(await page.locator(itemSelector).count(), 12, 'Mobile renders twelve originals without duplicated tiles')
    assert(await page.locator('[data-lab-tile]').count() <= 1, 'Mobile does not render repeat tiles')
    const mobileCards = await page.locator(itemSelector).evaluateAll(cards => cards.map(card => {
      const rect = card.getBoundingClientRect()
      return { x: rect.x, top: rect.top, bottom: rect.bottom, width: rect.width }
    }))
    assert(mobileCards.every((card, index) => card.width <= 390 && card.x >= 0 && card.x + card.width <= 390 && (index === 0 || card.top >= mobileCards[index - 1].bottom)), 'Mobile images form one non-overlapping column')
    // Visit every image so lazy mobile media loads before the full-page shot.
    for (const card of await page.locator(itemSelector).all()) await card.scrollIntoViewIfNeeded()
    await page.waitForFunction(selector => [...document.querySelectorAll(`${selector} img`)].every(image => image.complete && image.naturalWidth > 0), itemSelector)
    assert(await page.evaluate(() => scrollY > 0), 'Mobile images use natural document scrolling')
    await page.evaluate(() => scrollTo(0, 0))
    await page.mouse.move(180, 340)
    await assertStill(page)
    await page.screenshot({ path: path.join(artifacts, 'mobile-lab.png'), fullPage: true })
    console.log('PASS mobile: twelve original images, natural single-column scrolling, no automatic motion, and no horizontal overflow')

    // Resize the same mounted page across the breakpoint. Repeated tiles and
    // input handlers must return without relying on navigation or a reload.
    await page.setViewportSize({ width: 810, height: 1000 })
    await page.waitForFunction(() => document.querySelectorAll('[data-lab-tile]').length > 1)
    await assertVisibleImages(viewport, 'Mobile-to-desktop resize at 810px')
    assert(await primary.isVisible(), 'Navigation survives a live mobile-to-desktop resize')
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight <= innerHeight + 1), 'The 810px desktop breakpoint has no page overflow')
    const resizedPan = await readPan(canvas)
    await page.mouse.move(400, 400)
    await page.mouse.wheel(210, 330)
    await page.waitForTimeout(150)
    assert(panDistance(resizedPan, await readPan(canvas)) > 20, 'Canvas controls resume after resizing from mobile without reloading')
    await page.screenshot({ path: path.join(artifacts, 'desktop-lab-810.png') })

    await page.setViewportSize({ width: 2560, height: 1440 })
    await page.waitForFunction(() => [...document.querySelectorAll('[data-lab-tile]')].some(tile => tile.dataset.labTile.startsWith('2:')))
    await assertVisibleImages(viewport, 'Wide desktop resize')
    assert(await viewport.evaluate(element => {
      const bounds = element.getBoundingClientRect()
      const images = [...element.querySelectorAll('img')].map(image => image.getBoundingClientRect())
      return [[0, 0], [1, 0], [0, 1], [1, 1]].every(([x, y]) => {
        const left = bounds.left + x * bounds.width / 2
        const top = bounds.top + y * bounds.height / 2
        return images.some(rect => rect.right > left + 24 && rect.left < left + bounds.width / 2 - 24 && rect.bottom > top + 24 && rect.top < top + bounds.height / 2 - 24)
      })
    }), 'Repeated imagery reaches every quadrant of the 2560px viewport')
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight <= innerHeight + 1), 'Wide desktop has no page overflow')
    await page.mouse.move(30, 30)
    await page.screenshot({ path: path.join(artifacts, 'desktop-lab-2560.png') })
    console.log('PASS responsive resize: 390 to 810 to 2560px without reload, restored controls, and full wide-screen coverage')

    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto(`${base}/visual/lab`, { waitUntil: 'networkidle' })
    assert.equal(await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Lab', exact: true }).getAttribute('href'), '/visual/lab')
    assert.equal(await page.locator('[data-lab-tile="0:0"] figure[data-lab-item]').count(), 12)
    await assertVisibleImages(page.getByRole('region', { name: /^Infinite image canvas/ }), 'Visual-track canvas')
    assert.equal(await page.locator('main a[href*="/project/"]').count(), 0)
    console.log('PASS visual track: shared infinite imagery and track-aware navigation')

    assert.deepEqual(errors, [], 'No browser runtime errors')
    assert.deepEqual(failures, [], 'No failed local responses')
    console.log(`Screenshots: ${artifacts}`)
  } finally {
    await browser.close()
  }
})().catch(error => { console.error(error); process.exitCode = 1 })
