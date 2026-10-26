// Export the BUBU promo posters, both languages, for the case study's promo section.
// Sources stay untouched; run `node scripts/bubu-promo-build.cjs` after replacing one.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

// One folder per language, five 1206 x 2622 posters each, named
// "<n>-<title>.jpg". The page asks for them by number only, so a poster
// can be retitled without touching the page.
const locales = { en: 'pic/bubu-promo/en', zh: 'pic/bubu-promo/zh' };

// Exported at half: five to a row, a poster is never much wider than
// 250 CSS px on the page.
const WIDTH = 603;
const HEIGHT = 1311;

sharp.cache(false);

(async () => {
  let total = 0;
  let count = 0;
  for (const [locale, source] of Object.entries(locales)) {
    const target = path.resolve('public/bubu/promo', locale);
    fs.rmSync(target, { recursive: true, force: true });
    fs.mkdirSync(target, { recursive: true });
    const posters = fs.readdirSync(path.resolve(source)).filter(name => /^\d+-.*\.jpe?g$/i.test(name));
    for (const name of posters) {
      const info = await sharp(path.resolve(source, name))
        .resize(WIDTH, HEIGHT, { fit: 'cover', kernel: 'lanczos3' })
        .webp({ quality: 84, effort: 5 })
        .toFile(path.join(target, `${parseInt(name, 10)}.webp`));
      total += info.size;
      count += 1;
    }
  }
  console.log(`promo ${count}, ${Math.round(total / 1024)} KB`);

  // The hero: the App Store listing on a phone, once per language, with
  // its shadow on an alpha channel so it sits on the page's own white.
  // 1027 x 2000 at the source; the hero column is at most 380 CSS px wide.
  for (const locale of Object.keys(locales)) {
    const info = await sharp(path.resolve(`pic/bubu-promo/hero-${locale}.webp`))
      .resize(780, null, { kernel: 'lanczos3' })
      .webp({ quality: 86, alphaQuality: 90, effort: 5 })
      .toFile(path.resolve(`public/bubu/promo/hero-${locale}.webp`));
    console.log(`promo/hero-${locale}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
  }

  // The app icon beside the App Store line. The source is the icon on a
  // drop shadow; only the 260 px square is kept, and the page rounds it.
  const icon = await sharp(path.resolve('pic/bubu-promo/app-icon.png'))
    .extract({ left: 30, top: 18, width: 260, height: 260 })
    .resize(180, 180, { kernel: 'lanczos3' })
    .flatten({ background: '#EDEDED' })
    .webp({ quality: 90, effort: 5 })
    .toFile(path.resolve('public/bubu/promo/app-icon.webp'));
  console.log(`promo/app-icon.webp ${icon.width}x${icon.height} ${Math.round(icon.size / 1024)} KB`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
