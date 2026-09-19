// Render the case study's hero exhibit: a close-up of the landing screen's
// key region rather than the whole dashboard.
//
//   node vortexnet-source/capture-tool/capture-hero.mjs
//   node scripts/vortexnet-media-build.cjs
//
// The full dashboard shrunk into a portfolio column left the legend, the
// units and the supporting notes too small to read. This clips the part the
// case study is actually about - the four named totals, the cash chart and
// the settlement panel beside it, down to the first queue row with its next
// action - so the relationship between a number, its trend and the action it
// leads to is legible at the size the page shows it.
import { spawn } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath, pathToFileURL } from "node:url"

const require = createRequire(import.meta.url)
const { styles, renderDashboard } = require("./dashboard.cjs")

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe"
const toolDirectory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(toolDirectory, "../..")
const outputDirectory = path.join(root, "vortexnet-source", "captures")
const userDataDirectory = path.join(os.tmpdir(), `vortexnet-hero-${Date.now()}`)
const port = 9500 + Math.floor(Math.random() * 200)

fs.mkdirSync(outputDirectory, { recursive: true })

const page = `<!doctype html><meta charset="utf-8"><title>VortexNet · hero region</title>
<style>html,body{margin:0;padding:0;background:#fff}#stage{width:1240px}${styles}</style>
<div id="stage">${renderDashboard()}</div>`

const pagePath = path.join(os.tmpdir(), `vortexnet-hero-${Date.now()}.html`)
fs.writeFileSync(pagePath, page)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files", `--remote-debugging-port=${port}`, `--user-data-dir=${userDataDirectory}`, "--window-size=1400,1500", "about:blank"], { stdio: "ignore" })
const die = (message) => { console.log(message); try { chrome.kill() } catch {} process.exit(1) }
const guard = setTimeout(() => die("TIMEOUT"), 90000)

let list
for (let i = 0; i < 80; i++) { try { list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (list.length) break } catch {} await sleep(250) }
if (!list) die("devtools never responded")

const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl)
await new Promise((r) => { ws.onopen = r })
let id = 0
const pending = new Map()
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id) } }
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true })).result?.result?.value

await send("Page.enable")
await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 1500, deviceScaleFactor: 2, mobile: false })
await send("Page.navigate", { url: pathToFileURL(pagePath).href })
for (let i = 0; i < 80; i++) { if (await evaluate("!!document.querySelector('[data-vn=attention]') && document.fonts.status === 'loaded'")) break; await sleep(200) }
await sleep(700)

/* From the top of the totals to the bottom of the first queue row, with a
   little air on each side. */
const rect = await evaluate(`(() => {
  const metrics = document.querySelector('[data-vn=metrics]').getBoundingClientRect();
  const row = document.querySelector('[data-vn=attention] tbody tr').getBoundingClientRect();
  const pad = 14;
  return { x: metrics.x - pad, y: metrics.y + scrollY - pad, w: metrics.width + pad * 2, h: (row.bottom + scrollY) - (metrics.y + scrollY) + pad * 2 };
})()`)
if (!rect) die("hero region not found")

const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h, scale: 1 } })
fs.writeFileSync(path.join(outputDirectory, "dashboard-detail.png"), Buffer.from(shot.result.data, "base64"))
console.log("saved dashboard-detail.png", Math.round(rect.w) + "x" + Math.round(rect.h), "css px at 2x")

ws.close()
chrome.kill()
fs.rmSync(pagePath, { force: true })
clearTimeout(guard)
