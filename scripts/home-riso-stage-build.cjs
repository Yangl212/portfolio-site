// Builds the layer images for the /home-riso featured stacks from assets the
// site already has, into public/home-riso/.
//
//   node scripts/home-riso-stage-build.cjs
//
// - The three BOA video posters are phone mockups on a flat light ground;
//   the ground is flood-filled to transparent from the edges (so white areas
//   inside the phone screen are left alone), the result trimmed to the phone.
// - Alpha PNGs (BOA home screen, Last Message laptop) are resized to WebP
//   with alpha, which is a fraction of the size.
// - The rest are resized copies.
const fs = require("node:fs")
const path = require("node:path")
const sharp = require("sharp")

const pub = path.join(__dirname, "..", "public")
const out = path.join(pub, "home-riso")
fs.mkdirSync(out, { recursive: true })

const src = (p) => path.join(pub, p)
const dst = (name) => path.join(out, name)

/* Makes every background pixel reachable from the image border transparent.
   `tolerance` is the max per-channel distance from the border colour. */
async function cutOut(input, output, width, tolerance = 22) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const w = info.width, h = info.height
  const px = (x, y) => (y * w + x) * 4
  /* Border colour: the average of the four corners. */
  const corners = [px(0, 0), px(w - 1, 0), px(0, h - 1), px(w - 1, h - 1)]
  const bg = [0, 1, 2].map((c) => Math.round(corners.reduce((s, i) => s + data[i + c], 0) / 4))
  const matches = (i) => Math.abs(data[i] - bg[0]) <= tolerance && Math.abs(data[i + 1] - bg[1]) <= tolerance && Math.abs(data[i + 2] - bg[2]) <= tolerance

  const seen = new Uint8Array(w * h)
  const queue = new Int32Array(w * h)
  let head = 0, tail = 0
  const push = (x, y) => {
    const k = y * w + x
    if (seen[k]) return
    seen[k] = 1
    if (matches(k * 4)) queue[tail++] = k
  }
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
  let cleared = 0
  while (head < tail) {
    const k = queue[head++]
    data[k * 4 + 3] = 0
    cleared++
    const x = k % w, y = (k - x) / w
    if (x > 0) push(x - 1, y)
    if (x < w - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1)
    if (y < h - 1) push(x, y + 1)
  }
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .trim()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 92 })
    .toFile(output)
  return { cleared: Math.round((cleared / (w * h)) * 100) + "%", bg: "#" + bg.map((v) => v.toString(16).padStart(2, "0")).join("") }
}

async function resized(input, output, width, opts = {}) {
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 90, ...opts }).toFile(output)
}

async function report(file) {
  const m = await sharp(file).metadata()
  return `${path.basename(file)} ${m.width}x${m.height} ${Math.round(fs.statSync(file).size / 1024)}KB${m.hasAlpha ? " alpha" : ""}`
}

;(async () => {
  const made = []

  /* BOA: three phones cut from the posters, plus the existing alpha phone. */
  for (const name of ["spending", "budget", "reallocate"]) {
    const info = await cutOut(src(`boa/media/${name}-poster.webp`), dst(`boa-${name}.webp`), 520)
    made.push([dst(`boa-${name}.webp`), info])
  }
  await resized(src("boa/home-screen.png"), dst("boa-home.webp"), 640)
  made.push([dst("boa-home.webp")])

  /* VortexNet: the shipped screen and three crops of it. */
  await resized(src("vortexnet/media/shipped-screen.webp"), dst("vortexnet-screen.webp"), 1200)
  await resized(src("vortexnet/media/nav-after.webp"), dst("vortexnet-nav.webp"), 720)
  await resized(src("vortexnet/media/metrics-after.webp"), dst("vortexnet-metrics.webp"), 720)
  await resized(src("vortexnet/media/priorities.webp"), dst("vortexnet-priorities.webp"), 1000)
  for (const n of ["screen", "nav", "metrics", "priorities"]) made.push([dst(`vortexnet-${n}.webp`)])

  /* Last Message: the laptop with alpha, and three scene posters. */
  await resized(src("lastmessage/cover.png"), dst("lastmessage-laptop.webp"), 1100)
  await resized(src("lastmessage/media/chat-poster.webp"), dst("lastmessage-chat.webp"), 800)
  await resized(src("lastmessage/media/routes-poster.webp"), dst("lastmessage-routes.webp"), 800)
  await resized(src("lastmessage/media/boundary-poster.webp"), dst("lastmessage-boundary.webp"), 800)
  for (const n of ["laptop", "chat", "routes", "boundary"]) made.push([dst(`lastmessage-${n}.webp`)])

  for (const [file, info] of made) console.log(await report(file), info ? JSON.stringify(info) : "")
})().catch((error) => { console.error(error); process.exit(1) })
