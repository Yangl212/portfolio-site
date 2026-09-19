// Render the as-shipped reconstruction (shipped-dashboard.cjs) straight to a
// 2x PNG in vortexnet-source/captures, so scripts/vortexnet-media-build.cjs
// picks it up with every other capture.
//
//   node vortexnet-source/capture-tool/capture-shipped.mjs
//   node scripts/vortexnet-media-build.cjs
//
// Unlike capture.mjs this does not go through the bundled walkthrough HTML:
// the screen is code-native, so it is rendered on its own page at the same
// width the rebuilt screen was captured at.
import { spawn } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath, pathToFileURL } from "node:url"

const require = createRequire(import.meta.url)
const { shippedStyles, renderShippedDashboard } = require("./shipped-dashboard.cjs")

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe"
const toolDirectory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(toolDirectory, "../..")
const outputDirectory = path.join(root, "vortexnet-source", "captures")
const userDataDirectory = path.join(os.tmpdir(), `vortexnet-shipped-${Date.now()}`)
const port = 9348 + Math.floor(Math.random() * 120)

fs.mkdirSync(outputDirectory, { recursive: true })

/* 1240 CSS px matches the width the rebuilt screen was captured at, so the two
   screens sit at the same scale when the comparison swaps between them. */
const page = `<!doctype html><meta charset="utf-8"><title>VortexNet · as shipped</title>
<style>html,body{margin:0;padding:0;background:#fff}#stage{width:1240px}${shippedStyles}</style>
<div id="stage">${renderShippedDashboard()}</div>`

const pagePath = path.join(os.tmpdir(), `vortexnet-shipped-${Date.now()}.html`)
fs.writeFileSync(pagePath, page)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files", `--remote-debugging-port=${port}`, `--user-data-dir=${userDataDirectory}`, "--window-size=1400,1400", "about:blank"], { stdio: "ignore" })
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
await send("Emulation.setDeviceMetricsOverride", { width: 1400, height: 1400, deviceScaleFactor: 2, mobile: false })
await send("Page.navigate", { url: pathToFileURL(pagePath).href })
for (let i = 0; i < 80; i++) { if (await evaluate("!!document.querySelector('[data-vn=shipped]') && document.fonts.status === 'loaded'")) break; await sleep(200) }
await sleep(700)

const rect = await evaluate("(() => { const r = document.querySelector('[data-vn=shipped]').getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height } })()")
if (!rect) die("shipped dashboard not found")

const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h, scale: 1 } })
const target = path.join(outputDirectory, "shipped-screen.png")
fs.writeFileSync(target, Buffer.from(shot.result.data, "base64"))
console.log("saved shipped-screen.png", Math.round(rect.w) + "x" + Math.round(rect.h), "css px at 2x")

ws.close()
chrome.kill()
fs.rmSync(pagePath, { force: true })
clearTimeout(guard)
