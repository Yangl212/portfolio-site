// Rebuild the Last Message portfolio loops without changing the original recordings.
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

const outputDirectory = path.resolve('public/lastmessage/media');
fs.mkdirSync(outputDirectory, { recursive: true });
const clips = [
  { source: '01', name: 'chat', frames: 280, posterAt: 8.3 },
  { source: '02', name: 'routes', frames: 201, posterAt: 1 },
  { source: '03', name: 'web-clue', frames: 168, posterAt: 4.8 },
  { source: '04', name: 'boundary', frames: 463, posterAt: 1.1 },
];
// These are complete desktop interfaces, not device recordings on an empty
// canvas. Retain the full 16:10 frame and enough resolution to read the text.
const frame = 'scale=1600:1000:flags=lanczos,setsar=1';

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    windowsHide: true,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(result.error?.message || result.stderr || `FFmpeg exited ${result.status}`);
}

for (const clip of clips) {
  const input = path.resolve(`public/lastmessage/${clip.source}.mp4`);
  // Keep every interaction at its original speed, including the complete
  // question/response in 01 and the revoked-access ending in 04. A short
  // end hold and dissolve signal the replay without a visible control bar.
  const offset = (clip.frames / 30 + 0.3).toFixed(6);
  const filter = [
    `[0:v]trim=end_frame=${clip.frames},setpts=PTS-STARTPTS,${frame},fps=30,settb=AVTB,split=2[body][first]`,
    '[body]tpad=stop_mode=clone:stop_duration=0.7,fps=30,settb=AVTB[held]',
    '[first]trim=end_frame=1,loop=loop=23:size=1:start=0,setpts=N/(30*TB),fps=30,settb=AVTB[reset]',
    `[held][reset]xfade=transition=fade:duration=0.4:offset=${offset},format=yuv420p[video]`,
  ].join(';');
  const videoFile = path.join(outputDirectory, `${clip.name}-loop.mp4`);
  run(['-i', input, '-filter_complex', filter, '-map', '[video]', '-an', '-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-movflags', '+faststart', videoFile]);
  run(['-ss', String(clip.posterAt), '-i', input, '-vf', frame, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '90', path.join(outputDirectory, `${clip.name}-poster.webp`)]);
  console.log(`${clip.name}: ${fs.statSync(videoFile).size.toLocaleString()} bytes, 1600 x 1000, 30 fps, silent H.264`);
}
