// Rebuild the portfolio loops without changing the original recordings.
// Set FFMPEG_PATH to a complete FFmpeg binary when it is not on PATH.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const candidates = [
  process.env.FFMPEG_PATH,
  'ffmpeg',
  path.join(process.env.LOCALAPPDATA || '', 'Python/pythoncore-3.14-64/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'),
].filter(Boolean);
const ffmpeg = candidates.find(binary => spawnSync(binary, ['-version'], { windowsHide: true }).status === 0);
if (!ffmpeg) throw new Error('Set FFMPEG_PATH to a complete FFmpeg binary with libx264 support.');

const outputDirectory = path.resolve('public/boa/media');
fs.mkdirSync(outputDirectory, { recursive: true });
const clips = [
  { source: '01', name: 'spending', frames: 147, posterAt: 1 },
  { source: '02', name: 'budget', frames: 241, posterAt: 3 },
  { source: '03', name: 'reallocate', frames: 254, posterAt: 4.5 },
];
// The source phone is about 600 pixels wide. Crop its canvas at native
// resolution, retaining the complete device and shadow without upscaling.
const crop = 'crop=720:1408:736:16,setsar=1';

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    windowsHide: true,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(result.stderr || `FFmpeg exited ${result.status}`);
}

for (const clip of clips) {
  const input = path.resolve(`public/boa/${clip.source}.mp4`);
  // Give the last state time to read, then dissolve back to a held first
  // frame. Preserve the original interactions and their playback speed.
  const offset = (clip.frames / 30 + 0.55).toFixed(6);
  const filter = [
    `[0:v]trim=end_frame=${clip.frames},setpts=PTS-STARTPTS,${crop},fps=30,settb=AVTB,split=2[body][first]`,
    '[body]tpad=stop_mode=clone:stop_duration=0.9,fps=30,settb=AVTB[held]',
    '[first]trim=end_frame=1,loop=loop=23:size=1:start=0,setpts=N/(30*TB),fps=30,settb=AVTB[reset]',
    `[held][reset]xfade=transition=fade:duration=0.35:offset=${offset},format=yuv420p[video]`,
  ].join(';');
  const videoFile = path.join(outputDirectory, `${clip.name}-loop.mp4`);
  run(['-i', input, '-filter_complex', filter, '-map', '[video]', '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', videoFile]);
  run(['-ss', String(clip.posterAt), '-i', input, '-vf', crop, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '92', path.join(outputDirectory, `${clip.name}-poster.webp`)]);
  console.log(`${clip.name}: ${fs.statSync(videoFile).size.toLocaleString()} bytes, 720 x 1408, 30 fps, silent H.264`);
}
