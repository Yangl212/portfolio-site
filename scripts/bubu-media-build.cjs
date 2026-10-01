// Export the BUBU case study's screens, its phone render, its cover and its share card.
// Sources stay untouched; run `node scripts/bubu-media-build.cjs` after replacing one.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

// The simulator captures, one folder per language of the build, and the
// nine of them the page deals out as cards. The names are kept, so the
// page asks for a screen by the name it was captured under.
const locales = { en: 'public/bubu/English', zh: 'public/bubu/中文' };
const shown = [
  '02-welcome-signin',
  '06-setup-weeks',
  '07-setup-mode',
  '08-setup-ready',
  '09-home-duo',
  '15-my-receipt',
  '16-journal',
  '18-challenge-progress',
  '20-buddy-panel',
];

// 1206 x 2622 off the iPhone 17 simulator, exported at two thirds: the
// largest card on the page is about 220 CSS px wide.
const WIDTH = 804;
const HEIGHT = 1748;

// The cards have no phone round them, so they have no Dynamic Island
// either - but a capture taken with a sheet up comes with one painted in.
// Where the middle of the island's place is black and its surround is one
// flat colour, the island is painted out in that colour.
const ISLAND = { left: 405, top: 36, width: 396, height: 124 };
async function withoutIsland(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const at = (x, y) => [...data.subarray((y * info.width + x) * 4, (y * info.width + x) * 4 + 3)];
  const centre = at(ISLAND.left + ISLAND.width / 2, ISLAND.top + ISLAND.height / 2);
  const around = [at(ISLAND.left - 10, 96), at(ISLAND.left + ISLAND.width + 10, 96), at(603, ISLAND.top - 6), at(603, ISLAND.top + ISLAND.height + 6)];
  const flat = around.every(colour => colour.join() === around[0].join());
  if (centre.some(channel => channel > 12) || !flat) return sharp(file);
  const [r, g, b] = around[0];
  const patch = await sharp({ create: { width: ISLAND.width, height: ISLAND.height, channels: 3, background: { r, g, b } } }).png().toBuffer();
  return sharp(await sharp(file).composite([{ input: patch, left: ISLAND.left, top: ISLAND.top }]).png().toBuffer());
}
sharp.cache(false);

(async () => {
  let total = 0;
  for (const [locale, source] of Object.entries(locales)) {
    const target = path.resolve('public/bubu/screens', locale);
    fs.rmSync(target, { recursive: true, force: true });
    fs.mkdirSync(target, { recursive: true });
    for (const name of shown) {
      const info = await (await withoutIsland(path.resolve(source, `${name}.png`)))
        .resize(WIDTH, HEIGHT, { fit: 'cover', kernel: 'lanczos3' })
        .flatten({ background: '#F6F6F4' })
        .webp({ quality: 84, effort: 5 })
        .toFile(path.join(target, `${name}.webp`));
      total += info.size;
    }
  }
  console.log(`screens ${shown.length} x ${Object.keys(locales).length}, ${Math.round(total / 1024)} KB`);

  // The device render the hero and the home page's stage both use. It is
  // flat colour and hairlines at its native size, so it is kept lossless.
  const phone = await sharp(path.resolve('public/bubu/iPhone.png'))
    .webp({ lossless: true, effort: 6 })
    .toFile(path.resolve('public/bubu/phone.webp'));
  console.log(`phone.webp ${phone.width}x${phone.height} ${Math.round(phone.size / 1024)} KB`);

  // The 16:10 cover: the title block on the left (pic/bubu-cover-title.png,
  // the icon, the name and the line under it, already set on the paper) and
  // the same phone on the right, leaning the way the home page's stage
  // leans it and bleeding off the top and the foot. The lean is resampled
  // at twice the size and brought back down, so the bezel's hairlines
  // come through the rotation clean.
  const COVER = { width: 1600, height: 1000, paper: '#F6F6F4' };
  const LEAN = -8;
  const PHONE_WIDTH = 480;
  const PHONE_CENTRE = { x: 1230, y: 500 };
  const upright = await sharp(path.resolve('public/bubu/iPhone.png'))
    .resize(PHONE_WIDTH * 2, null, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  const leaning = await sharp(upright).rotate(LEAN, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const leant = await sharp(leaning).metadata();
  const placed = { width: Math.round(leant.width / 2), height: Math.round(leant.height / 2) };
  const left = Math.round(PHONE_CENTRE.x - placed.width / 2);
  const top = Math.round(PHONE_CENTRE.y - placed.height / 2);
  if (left < 760 || left + placed.width > COVER.width) throw new Error('The phone no longer fits beside the cover title');
  // Taller than the cover by design, so the overhang is cut before it is laid down.
  const cut = Math.max(0, -top);
  const visible = await sharp(leaning)
    .resize(placed.width, placed.height, { kernel: 'lanczos3' })
    .extract({ left: 0, top: cut, width: placed.width, height: Math.min(placed.height - cut, COVER.height - Math.max(0, top)) })
    .png()
    .toBuffer();
  const cover = await sharp({ create: { width: COVER.width, height: COVER.height, channels: 3, background: COVER.paper } })
    .composite([
      { input: path.resolve('pic/bubu-cover-title.png'), left: 0, top: 0 },
      { input: visible, left, top: Math.max(0, top) },
    ])
    .png()
    .toBuffer();
  const coverInfo = await sharp(cover).webp({ quality: 82, effort: 5 }).toFile(path.resolve('public/covers/bubu.webp'));
  console.log(`covers/bubu.webp ${coverInfo.width}x${coverInfo.height} ${Math.round(coverInfo.size / 1024)} KB`);

  // The share card is the cover, full bleed, at the 1200 x 630 the scrapers
  // crop to - the same cut every other case study's card takes.
  const card = await sharp(cover)
    .resize(1200, 630, { fit: 'cover', position: 'centre', kernel: 'lanczos3' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.resolve('public/og/project-bubu.jpg'));
  console.log(`og/project-bubu.jpg ${card.width}x${card.height} ${Math.round(card.size / 1024)} KB`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
