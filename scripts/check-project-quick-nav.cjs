// Uses an existing Playwright installation; no site dependency is added.
// PLAYWRIGHT_MODULE=/path/to/playwright CHROME_EXECUTABLE=/path/to/chrome node scripts/check-project-quick-nav.cjs
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.NAV_BASE_URL || 'http://127.0.0.1:3000'
const artifacts = process.env.NAV_SCREENSHOTS || path.join(os.tmpdir(), 'portfolio-quick-nav-review')
const slugs = ['vortexnet', 'boa-budgeting', 'lastmessage', 'cleared', 'backstage', 'graveyard', 'taroo', 'alcohol', 'suglar']

async function inspect(nav, floating) {
  const state = await nav.evaluate(n => {
    const bar = n.parentElement
    const slot = bar.parentElement
    const active = n.querySelector('[aria-current="location"]')
    const rect = el => el.getBoundingClientRect().toJSON()
    return {
      floating: bar.dataset.floating,
      bar: rect(bar), slot: rect(slot), nav: rect(n), active: rect(active),
      radii: [bar, n, ...bar.querySelectorAll('a')].map(el => getComputedStyle(el).borderRadius),
      color: getComputedStyle(active).color,
      background: getComputedStyle(active).backgroundColor,
      opacity: getComputedStyle(active).opacity,
      shadow: getComputedStyle(bar).boxShadow,
      visible: rect(active).left >= rect(n).left - 1 && rect(active).right <= rect(n).right + 1,
      targets: [...n.children].every(a => document.getElementById(a.dataset.section)),
      activeCount: n.querySelectorAll('[aria-current="location"]').length,
      viewport: innerWidth
    }
  })
  assert.equal(state.floating, String(floating))
  assert(state.radii.every(radius => radius === '0px'), 'Every navigation edge is square')
  const expectedWidth = floating
    ? (state.viewport <= 700 ? state.viewport - 32 : Math.min(1280, state.viewport - 64))
    : state.slot.width
  const expectedLeft = floating ? (state.viewport - expectedWidth) / 2 : state.slot.left
  assert(Math.abs(state.bar.width - expectedWidth) < 1, 'Navigation row spans the intended page width')
  assert(Math.abs(state.bar.left - expectedLeft) < 1, 'Navigation row stays aligned with the page')
  assert(state.bar.left >= 0 && state.bar.right <= state.viewport, 'Navigation stays in the viewport')
  assert(state.active.height >= 44, 'Selected link has a full-height hit area')
  assert.equal(state.background, 'rgb(34, 34, 34)', 'Active section has a solid charcoal rectangle')
  assert.equal(state.color, 'rgb(255, 255, 255)', 'Selected label is white')
  assert.equal(state.opacity, '1', 'Selected label is not hidden by an animation')
  assert.equal(state.shadow, 'none', 'No detached capsule shadow')
  assert.equal(state.activeCount, 1)
  assert(state.visible, 'Current section is visible within the horizontal scroller')
  assert(state.targets, 'Every directory link points to an existing section')
}

async function scrollToSection(page, id) {
  await page.evaluate(id => {
    const target = document.getElementById(id)
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 86, behavior: 'instant' })
  }, id)
  await page.waitForFunction(id => document.querySelector('nav[aria-label="On this project"] [aria-current="location"]')?.dataset.section === id, id)
  await page.waitForTimeout(450)
}

;(async () => {
  fs.mkdirSync(artifacts, { recursive: true })
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE || undefined })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const slug of slugs) {
      await page.goto(`${base}/project/${slug}`, { waitUntil: 'load' })
      const nav = page.getByRole('navigation', { name: 'On this project' })
      await nav.waitFor()
      await page.evaluate(() => document.fonts.ready)
      await nav.evaluate(n => window.scrollTo({ top: n.parentElement.parentElement.getBoundingClientRect().top + scrollY - 180, behavior: 'instant' }))
      await page.waitForTimeout(550)
      await inspect(nav, false)
      const ids = await nav.locator('a').evaluateAll(links => links.map(a => a.dataset.section))
      if (slug === 'vortexnet') await page.screenshot({ path: path.join(artifacts, 'desktop-inline.png') })
      await nav.locator('a').nth(1).click()
      await page.waitForFunction(id => document.querySelector('nav[aria-label="On this project"] [aria-current="location"]')?.dataset.section === id && Math.abs(document.getElementById(id).getBoundingClientRect().top - 86) < 2, ids[1])
      await page.waitForTimeout(400)
      await inspect(nav, true)
      assert.equal(new URL(page.url()).hash, `#${ids[1]}`)
      if (slug === 'vortexnet') await page.screenshot({ path: path.join(artifacts, 'desktop-floating.png') })
      await scrollToSection(page, ids.at(-1))
      await inspect(nav, true)
      assert.equal(await page.getByRole('link', { name: 'Back to all projects', exact: true }).getAttribute('href'), '/')
      console.log(`PASS desktop /project/${slug}: square row, active contrast, anchors, alignment, scrolling`)
    }

    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 844 })
      await page.goto(`${base}/project/vortexnet`, { waitUntil: 'load' })
      const nav = page.getByRole('navigation', { name: 'On this project' })
      await scrollToSection(page, 'testing')
      await inspect(nav, true)
      await scrollToSection(page, 'reflection')
      await inspect(nav, true)
      await page.screenshot({ path: path.join(artifacts, `narrow-${width}.png`) })
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal page overflow')
      await nav.locator('a').last().focus()
      assert.equal(await nav.locator('a').last().evaluate(a => getComputedStyle(a).outlineOffset), '-4px', 'Keyboard focus remains inside the scroll container')
      console.log(`PASS ${width}px: full-width dock, visible active item, keyboard focus, no overflow`)
    }

    await page.setViewportSize({ width: 1440, height: 1000 })
    await scrollToSection(page, 'reflection')
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(600)
    await inspect(page.getByRole('navigation', { name: 'On this project' }), true)
    console.log('PASS resizing a floating row keeps the active item visible')

    await page.setViewportSize({ width: 620, height: 844 })
    await page.waitForTimeout(250)
    await page.setViewportSize({ width: 1414, height: 978 })
    await page.waitForTimeout(600)
    const restoredNav = page.getByRole('navigation', { name: 'On this project' })
    await inspect(restoredNav, true)
    assert.equal(await restoredNav.evaluate(n => n.scrollLeft), 0, 'Desktop row resets horizontal scrolling after a narrow viewport')
    assert.equal(await restoredNav.evaluate(n => n.scrollWidth), await restoredNav.evaluate(n => n.clientWidth), 'Desktop row never needs horizontal scrolling')
    console.log('PASS restoring a desktop window shows the complete directory')

    await page.setViewportSize({ width: 620, height: 844 })
    await page.goto(`${base}/project/boa-budgeting`, { waitUntil: 'load' })
    await scrollToSection(page, 'prototype')
    await page.setViewportSize({ width: 1414, height: 978 })
    await page.waitForTimeout(600)
    const boaNav = page.getByRole('navigation', { name: 'On this project' })
    await inspect(boaNav, true)
    assert.equal(await boaNav.evaluate(n => n.scrollLeft), 0, 'BOA desktop shows the directory from its first item')
    assert.equal(await boaNav.evaluate(n => n.scrollWidth), await boaNav.evaluate(n => n.clientWidth), 'BOA desktop directory fits without horizontal scrolling')
    await page.screenshot({ path: path.join(artifacts, 'boa-restored-desktop.png') })
    console.log('PASS BOA at 1414x978 after resize: complete directory remains visible')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`${base}/visual/project/vortexnet`, { waitUntil: 'load' })
    const visualNav = page.getByRole('navigation', { name: 'On this project' })
    await scrollToSection(page, 'navigation')
    await inspect(visualNav, true)
    assert.equal(await visualNav.evaluate(n => getComputedStyle(n.parentElement).animationName), 'none')
    assert.equal(await page.getByRole('link', { name: 'Back to all projects', exact: true }).getAttribute('href'), '/visual')
    await page.getByRole('link', { name: 'Back to all projects', exact: true }).click()
    await page.waitForURL(`${base}/visual`)
    console.log('PASS visual track: reduced motion and return navigation')
    assert.deepEqual(errors, [], 'No browser runtime errors')
    console.log(`Screenshots: ${artifacts}`)
  } finally {
    await browser.close()
  }
})().catch(error => { console.error(error); process.exitCode = 1 })
