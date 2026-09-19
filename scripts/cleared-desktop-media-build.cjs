// Rebuild desktop portfolio loops from the original recordings, which stay unchanged.
// Run: node scripts/cleared-desktop-media-build.cjs
// Set FFMPEG_PATH to a complete FFmpeg binary if it is not available on PATH.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const candidates = [
  process.env.FFMPEG_PATH,
  'ffmpeg',
  path.join(process.env.LOCALAPPDATA || '', 'Python/pythoncore-3.14-64/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'),
].filter(Boolean);
const ffmpeg = candidates.find(binary => spawnSync(binary, ['-version'], { windowsHide: true }).status === 0);
if (!ffmpeg) throw new Error('Set FFMPEG_PATH to a complete FFmpeg binary with libx264 and libwebp support.');

const root = path.resolve(__dirname, '..');
const outputDirectory = path.join(root, 'public/cleared/media');
fs.mkdirSync(outputDirectory, { recursive: true });

// Start, duration and posterAt are seconds in the unedited source recording.
// These are interface demonstrations; their loop reset is not an Undo action.
const clips = [
  { source: 'video2', name: 'desktop-overview', start: 6.2, duration: 14.65, posterAt: 7.6 },
  { source: 'video1', name: 'desktop-replan', start: 3.2, duration: 7.3, posterAt: 6.5 },
  { source: 'video2', name: 'desktop-source', start: 6.2, duration: 6.1, posterAt: 10.2 },
  { source: 'video2', name: 'desktop-confirm', start: 12.65, duration: 8.2, posterAt: 14.5 },
  { source: 'video1', name: 'desktop-preferences', start: 30.35, duration: 5.6, posterAt: 31.5 },
  { source: 'video1', name: 'desktop-duration', start: 36.45, duration: 8.4, posterAt: 40.5 },
  { source: 'video1', name: 'desktop-direct', start: 10.5, duration: 4.4, posterAt: 13.9 },
];
// Crop only the gray recording border, preserving all controls and bottom feedback.
const crop = 'crop=1468:918:20:30,setsar=1';

function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    windowsHide: true,
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024,
  });
  if (result.status !== 0) throw new Error(result.stderr || `FFmpeg exited ${result.status}`);
}

let totalBytes = 0;
for (const clip of clips) {
  const input = path.join(root, `public/cleared/${clip.source}.mp4`);
  const offset = (Math.round(clip.duration * 30) / 30 + 0.6).toFixed(6);
  // Hold the last frame for 0.6 s, dissolve for 0.3 s, then briefly hold the first frame.
  const filter = [
    `[0:v]trim=start=${clip.start}:duration=${clip.duration},setpts=PTS-STARTPTS,${crop},fps=30,settb=AVTB,split=2[body][first]`,
    '[body]tpad=stop_mode=clone:stop_duration=0.9,fps=30,settb=AVTB[held]',
    '[first]trim=end_frame=1,loop=loop=14:size=1:start=0,setpts=N/(30*TB),fps=30,settb=AVTB[reset]',
    `[held][reset]xfade=transition=fade:duration=0.3:offset=${offset},format=yuv420p[video]`,
  ].join(';');
  const output = path.join(outputDirectory, `${clip.name}-loop.mp4`);
  run(['-i', input, '-filter_complex', filter, '-map', '[video]', '-an', '-c:v', 'libx264', '-crf', '19', '-preset', 'slow', '-movflags', '+faststart', output]);
  run(['-ss', String(clip.posterAt), '-i', input, '-vf', crop, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '90', path.join(outputDirectory, `${clip.name}-poster.webp`)]);
  const size = fs.statSync(output).size;
  totalBytes += size;
  console.log(`${clip.name}: ${size.toLocaleString()} bytes, 1468 x 918, 30 fps, silent H.264`);
}
console.log(`Total video size: ${totalBytes.toLocaleString()} bytes`);
