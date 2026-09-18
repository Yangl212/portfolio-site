const path = require('node:path');
const fs = require('node:fs/promises');
const os = require('node:os');
const { pathToFileURL } = require('node:url');

let playwright;
for (const modulePath of [process.env.PLAYWRIGHT_MODULE, 'playwright'].filter(Boolean)) {
  try { playwright = require(modulePath); break; } catch {}
}
if (!playwright) throw new Error('Set PLAYWRIGHT_MODULE to an installed Playwright module.');
const { chromium } = playwright;

async function main() {
  const directory = path.join(os.tmpdir(), 'cleared-media-inspection');
  await fs.mkdir(directory, { recursive: true });
  const browser = await chromium.launch({ headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const clips = process.argv.includes('--generated')
    ? ['collect', 'check', 'decide'].map(name => ({ name, file: `public/cleared/media/${name}-loop.mp4` }))
    : ['1', '2', '3'].map(name => ({ name, file: `public/cleared/${name}.mp4` }));
  for (const { name, file } of clips) {
    await page.goto(pathToFileURL(path.resolve(file)).href);
    await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
    const result = await page.evaluate(async () => {
      const video = document.querySelector('video');
      video.pause();
      const width = video.videoWidth;
      const height = video.videoHeight;
      const samples = [0.1, video.duration * .25, video.duration * .5, video.duration * .75, video.duration - .1];
      const canvas = document.createElement('canvas');
      canvas.width = 500 * samples.length;
      canvas.height = Math.round(height / width * 500) + 40;
      const context = canvas.getContext('2d');
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      for (let index = 0; index < samples.length; index++) {
        await new Promise(resolve => { video.onseeked = resolve; video.currentTime = samples[index]; });
        context.drawImage(video, index * 500, 40, 500, canvas.height - 40);
        context.fillStyle = '#000';
        context.font = '20px sans-serif';
        context.fillText(samples[index].toFixed(2) + 's', index * 500 + 10, 28);
      }
      return { width, height, duration: video.duration, image: canvas.toDataURL('image/png').split(',')[1] };
    });
    const { image, ...metadata } = result;
    await fs.writeFile(path.join(directory, `inspection-${name}.png`), Buffer.from(image, 'base64'));
    console.log(JSON.stringify({ name, ...metadata }));
  }
  await browser.close();
  console.log(`Inspection sheets: ${directory}`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
