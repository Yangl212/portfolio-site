import { spawn } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe"
const toolDirectory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(toolDirectory, "../..")
const outputDirectory = path.join(root, "vortexnet-source", "captures")
const userDataDirectory = path.join(os.tmpdir(), `vortexnet-capture-${process.pid}`)
const port = 9347
const url = pathToFileURL(path.join(root, "vortexnet-source", "VortexNet Case Study.html")).href
fs.mkdirSync(outputDirectory, { recursive: true })
const chrome = spawn(CHROME, ["--headless=new","--disable-gpu","--hide-scrollbars","--no-first-run","--allow-file-access-from-files",`--remote-debugging-port=${port}`,`--user-data-dir=${userDataDirectory}`,"--window-size=1440,1200","about:blank"], { stdio: "ignore" })
const sleep = ms => new Promise(r => setTimeout(r, ms))
const die = (msg) => { console.log(msg); try { chrome.kill() } catch {} process.exit(1) }
setTimeout(() => die("TIMEOUT"), 90000)
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (list.length) break } catch {} await sleep(250) }
const ws = new WebSocket(list.find(t => t.type === "page").webSocketDebuggerUrl); await new Promise(r => ws.onopen = r)
let id = 0; const pending = new Map(); ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id) } }
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async (expression) => { const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }); if (!r.result || !r.result.result) { console.log("EVAL ERR", JSON.stringify(r).slice(0, 400)); return undefined } if (r.result.exceptionDetails) console.log("EXC", JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result.result.value }
await send("Page.enable")
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1200, deviceScaleFactor: 2, mobile: false })
await send("Page.navigate", { url })
let ready = false
for (let i = 0; i < 100; i++) { if (await evaluate("!!document.body && document.body.innerText.includes('The rebuilt screen') && document.fonts.status === 'loaded'")) { ready = true; break } await sleep(250) }
if (!ready) die("page never finished unpacking")
await sleep(1500)
const TITLES = ["Where it started","First pass: I fixed the surface","Feedback pointed at the categories","Priorities, agreed with product and data","Navigation regrouped by task","The rebuilt screen","SAME REGION OF THE SCREEN, BEFORE AND AFTER"]
await evaluate(fs.readFileSync(path.join(toolDirectory, "page-helpers.js"), "utf8"))
const mode = process.argv[2]
if (mode === "inspect") {
  console.log(await evaluate(`window.__inspect(${JSON.stringify(TITLES)})`))
} else {
  const plan = JSON.parse(fs.readFileSync(path.join(toolDirectory, "plan.json"), "utf8"))
  for (const p of plan) {
    const rect = await evaluate(`window.__rect(${JSON.stringify(p.title)}, ${JSON.stringify(p.pick)})`)
    if (!rect) { console.log("MISS", p.name); continue }
    await sleep(400)
    const pad = p.pad || 0
    const shot = await send("Page.captureScreenshot", { format: p.format || "png", quality: 92, captureBeyondViewport: true, clip: { x: rect.x - pad, y: rect.y - pad, width: rect.w + 2 * pad, height: rect.h + 2 * pad, scale: p.scale || 1 } })
    fs.writeFileSync(path.join(outputDirectory, `${p.name}.png`), Buffer.from(shot.result.data, "base64"))
    console.log("saved", p.name, Math.round(rect.w) + "x" + Math.round(rect.h))
  }
}
ws.close(); chrome.kill(); process.exit(0)
