import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Run with PLAYWRIGHT_MODULE pointing to an existing Playwright installation.
// Optional: PROTOTYPE_POSTER=/absolute/path.png saves the initial desktop view.
// Optional: PROTOTYPE_SOURCE_PREVIEW=/absolute/path.png saves the source review.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('..', import.meta.url));
const prototype = path.join(root, 'public/cleared/calendar-assistant-prototype.html');
const html = await fs.readFile(prototype, 'utf8');
const template = JSON.parse(html.match(/<script type="__bundler\/template">([\s\S]*?)<\/script>/)[1]);
assert(!template.includes('read from “by end of week”'));
assert(template.includes('assumed from “by end of week”; check with sender'));
assert(template.includes('estimated effort; not stated in the email'));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(pathToFileURL(prototype).href);
  await page.getByText('Review next', { exact: true }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
  if (process.env.PROTOTYPE_POSTER) {
    await page.screenshot({ path: path.resolve(process.env.PROTOTYPE_POSTER) });
  }

  await page.getByText('Review next', { exact: true }).click();
  await page.getByText('assumed from “by end of week”; check with sender', { exact: true }).waitFor();
  await page.getByText('estimated effort; not stated in the email', { exact: true }).waitFor();
  await page.getByText('FROM EMAIL', { exact: true }).waitFor();
  await page.getByText('INFERRED', { exact: true }).waitFor();
  assert.equal(await page.getByText('3 suggestions waiting', { exact: true }).count(), 1);
  if (process.env.PROTOTYPE_SOURCE_PREVIEW) {
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.resolve(process.env.PROTOTYPE_SOURCE_PREVIEW) });
  }

  // Opening the mail source retains the distinction between source and estimate.
  await page.getByText('Open in mail ↗', { exact: true }).click();
  await page.getByText('FROM THE EMAIL + ASSISTANT ESTIMATES', { exact: true }).waitFor();
  await page.getByText(/Neither appears in the email\./).waitFor();
  await page.getByText('← Back to calendar', { exact: true }).click();

  // A reviewed alternate confirms one task; Undo restores the pending suggestion.
  await page.getByText('Review next', { exact: true }).click();
  await page.getByText('Show other times', { exact: true }).click();
  await page.getByText('Tuesday 16:00 – 18:00', { exact: true }).click();
  await page.getByText('2 suggestions waiting', { exact: true }).waitFor();
  await page.getByText('Undo', { exact: true }).click();
  await page.getByText('3 suggestions waiting', { exact: true }).waitFor();
  await page.getByText('Review next', { exact: true }).click();
  await page.getByText('assumed from “by end of week”; check with sender', { exact: true }).waitFor();
  assert.deepEqual(errors, [], 'Prototype must not throw runtime errors');
  console.log('PASS: source/estimate labels, mail source, alternate confirmation, Undo, and runtime errors.');
} finally {
  await browser.close();
}
