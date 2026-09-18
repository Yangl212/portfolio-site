// Rebuild the silent, cropped portfolio loops without modifying the source recordings.
// Set FFMPEG_PATH to a complete FFmpeg binary when it is not on PATH.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const localAppData = process.env.LOCALAPPDATA || '';
const candidates = [
  process.env.FFMPEG_PATH,
  'ffmpeg',
  path.join(localAppData, 'Python/pythoncore-3.14-64/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'),
].filter(Boolean);
const ffmpeg = candidates.find(binary => spawnSync(binary, ['-version'], { windowsHide: true }).status === 0);
if (!ffmpeg) throw new Error('Set FFMPEG_PATH to a complete FFmpeg binary with libx264 support.');

const outputDirectory = path.resolve('public/cleared/media');
fs.mkdirSync(outputDirectory, { recursive: true });
const clips = [
  { source: '1', name: 'collect', start: 1.133333, duration: 2.233334, posterAt: 2.8 },
  { source: '2', name: 'check', start: 0, duration: 15.566667, posterAt: 4 },
  { source: '3', name: 'decide', start: 0, duration: 15.166667, posterAt: 7.5 },
];
const crop = 'scale=1152:720:flags=lanczos,crop=360:704:394:8,setsar=1';

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    windowsHide: true,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(result.stderr || `FFmpeg exited ${result.status}`);
}

for (const clip of clips) {
  const input = path.resolve(`public/cleared/${clip.source}.mp4`);
  // A short end hold and dissolve back to the first frame make the reset readable.
  const offset = (Math.round(clip.duration * 30) / 30 + 0.2).toFixed(6);
  const filter = [
    `[0:v]trim=start=${clip.start}:duration=${clip.duration},setpts=PTS-STARTPTS,${crop},fps=30,settb=AVTB,split=2[body][first]`,
    '[body]tpad=stop_mode=clone:stop_duration=0.6,fps=30,settb=AVTB[held]',
    '[first]trim=end_frame=1,loop=loop=24:size=1:start=0,setpts=N/(30*TB),fps=30,settb=AVTB[reset]',
    `[held][reset]xfade=transition=fade:duration=0.4:offset=${offset},format=yuv420p[video]`,
  ].join(';');
  const videoFile = path.join(outputDirectory, `${clip.name}-loop.mp4`);
  run(['-i', input, '-filter_complex', filter, '-map', '[video]', '-an', '-c:v', 'libx264', '-crf', '19', '-preset', 'slow', '-movflags', '+faststart', videoFile]);
  run(['-ss', String(clip.posterAt), '-i', input, '-vf', crop, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '90', path.join(outputDirectory, `${clip.name}-poster.webp`)]);
  console.log(`${clip.name}: ${fs.statSync(videoFile).size.toLocaleString()} bytes, 360 x 704, 30 fps, silent H.264`);
}
