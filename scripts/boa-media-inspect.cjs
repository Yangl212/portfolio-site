// Decode the three recordings and make five-frame contact sheets in TEMP.
// Use --generated to inspect the cropped website loops instead of sources.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

const candidates = [
  process.env.FFMPEG_PATH,
  'ffmpeg',
  path.join(process.env.LOCALAPPDATA || '', 'Python/pythoncore-3.14-64/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'),
].filter(Boolean);
const ffmpeg = candidates.find(binary => spawnSync(binary, ['-version'], { windowsHide: true }).status === 0);
if (!ffmpeg) throw new Error('Set FFMPEG_PATH to a complete FFmpeg binary.');

const generated = process.argv.includes('--generated');
const names = ['spending', 'budget', 'reallocate'];
const directory = path.join(os.tmpdir(), 'boa-media-inspection');
fs.mkdirSync(directory, { recursive: true });

for (let index = 0; index < names.length; index++) {
  const name = names[index];
  const file = path.resolve(generated ? `public/boa/media/${name}-loop.mp4` : `public/boa/0${index + 1}.mp4`);
  const result = spawnSync(ffmpeg, ['-hide_banner', '-i', file, '-f', 'null', '-'], { windowsHide: true, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr);
  const durationParts = result.stderr.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const duration = Number(durationParts[1]) * 3600 + Number(durationParts[2]) * 60 + Number(durationParts[3]);
  const sheet = path.join(directory, `${generated ? 'generated' : 'source'}-${name}.png`);
  const filter = `fps=${5 / duration},scale=${generated ? '288:-1' : '576:-1'},tile=5x1`;
  const image = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', file, '-vf', filter, '-frames:v', '1', sheet], { windowsHide: true, encoding: 'utf8' });
  if (image.status !== 0) throw new Error(image.stderr);
  const video = result.stderr.split(/\r?\n/).find(line => /Stream.*Video: h264/.test(line))?.trim();
  console.log(JSON.stringify({ name, duration, bytes: fs.statSync(file).size, audio: /Stream.*Audio:/.test(result.stderr), video, sheet }));
}
