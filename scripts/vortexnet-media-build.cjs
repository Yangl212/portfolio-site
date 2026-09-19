// Turn the VortexNet walkthrough captures into the web images the case study
// serves. The 16:10 home cover is built by scripts/cover-build.cjs.
//
//   node scripts/vortexnet-media-build.cjs
//
// The PNGs in vortexnet-source/captures/ are 2x element screenshots taken
// from the bundled walkthrough (vortexnet-source/VortexNet Case Study.html)
// with vortexnet-source/capture-tool/capture.mjs. Re-capture, then re-run.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const sourceDirectory = path.resolve('vortexnet-source/captures');
const mediaDirectory = path.resolve('public/vortexnet/media');
fs.mkdirSync(mediaDirectory, { recursive: true });
sharp.cache(false);

(async () => {
  for (const file of fs.readdirSync(sourceDirectory).filter((name) => name.endsWith('.png'))) {
    const target = path.join(mediaDirectory, file.replace(/\.png$/, '.webp'));
    const info = await sharp(path.join(sourceDirectory, file)).webp({ quality: 90, effort: 5 }).toFile(target);
    console.log(`${path.basename(target)} ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
  }

  // The home cover is public/vortexnet/cover.png, exported by scripts/cover-build.cjs
  // alongside every other cover.
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
