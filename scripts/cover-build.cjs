// Export the 16:10 web covers used by the home pages and the More Work carousel.
// Sources stay untouched; run `node scripts/cover-build.cjs` after replacing one.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const covers = {
  uxcasestudy: 'pic/Cover1.png',
  lastmessage: 'public/framer-assets/images/0e9348c3cf750b5b00ab3ec032f26a2cc73e4197.png',
  backstage: 'public/framer-assets/images/3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png',
  taroo: 'public/Taroo/Frame 5.png',
  suglar: 'public/suglar/Frame 66.png',
  alcohol: 'public/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png',
  graveyard: 'public/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png',
  cleared: 'public/cleared/MacBook.png',
  vortexnet: 'public/vortexnet/cover.png',
};

// Both the featured cards and the carousel crop to 16:10 with object-fit: cover,
// so the export does the same centre crop and every cover shares one size.
const WIDTH = 1600;
const HEIGHT = 1000;
const outputDirectory = path.resolve('public/covers');
fs.mkdirSync(outputDirectory, { recursive: true });
sharp.cache(false);

(async () => {
  for (const [slug, source] of Object.entries(covers)) {
    const target = path.join(outputDirectory, `${slug}.webp`);
    const info = await sharp(path.resolve(source), { limitInputPixels: false })
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre', kernel: 'lanczos3' })
      .webp({ quality: 82, effort: 5 })
      .toFile(target);
    console.log(`${slug}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
  }
})().catch(error => {
  console.error(error);
  process.exit(1);
});
