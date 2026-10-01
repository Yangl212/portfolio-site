"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./page.module.css"

/*
 * The build as a map: every screen a name, every line a tap from the
 * screen before it. Drawn the way the matching model is drawn - on the
 * app's paper, in its ink, with the icon set's pen - so the two figures
 * read as one hand.
 *
 * The tree is the data; where things stand is worked out from it, twice.
 * Wide is the landscape a desktop has room for, the root at the left and
 * the screens fanning out to the right. Tall is the same tree turned
 * into an outline for a phone column, each screen a row under its
 * parent. Both are in the markup and the stylesheet shows one, so the
 * page is right before the script runs and nothing moves when it does.
 *
 * Everything is linked through one `focus`. Pointing at a screen lights
 * the way to it from Home - the screens on the way in ink, the ones under
 * it half-lit, everything else stepped back to a trace - and prints what
 * it is for under the map. A dot runs the lit way, so the eye follows
 * the taps rather than the lines. While nobody is pointing and the map
 * is on screen, it walks itself through a day: Home, the black button, a
 * meal, its receipt, the week.
 *
 * The markup is the finished drawing. Motion is added on top once the
 * script is running and only if the reader has not asked for less.
 */

/* `kind` is how a screen is reached: a tap by default, "sheet" for one
   that opens over the screen before it, "tab" for the tab bar. `duo` is
   a screen only the paired route visits; `same` joins two places the one
   screen is reached from. What each is called and what it is for is in
   `copy.userflow.nodes`, keyed by id. */
const tree = {
  id: "signin", kids: [
    { id: "setup", kids: [
      { id: "home", home: true, kids: [
        { id: "record", kind: "sheet", kids: [
          { id: "mealphoto" },
          { id: "exercise" },
          { id: "weight" }
        ] },
        { id: "receipt", same: "receipt" },
        { id: "journal", kind: "tab", kids: [
          { id: "week", kids: [
            { id: "overview", duo: true },
            { id: "dayreceipt", same: "receipt" }
          ] },
          { id: "locked", kids: [
            { id: "plus", kind: "sheet", same: "plus" }
          ] }
        ] },
        { id: "challenge", kind: "tab", kids: [
          { id: "progress" },
          { id: "rules" }
        ] },
        { id: "paired", kind: "sheet", duo: true },
        { id: "settings", kind: "sheet", kids: [
          { id: "plus2", kind: "sheet", same: "plus" },
          { id: "name" },
          { id: "mode" },
          { id: "language" },
          { id: "block", duo: true }
        ] }
      ] }
    ] }
  ]
}

/* The tree in reading order, each screen knowing its depth, its parent
   and its children by id. */
function flatten(node, depth = 0, parent = null, out = []) {
  const kids = node.kids || []
  out.push({ ...node, depth, parent, kids: kids.map((k) => k.id) })
  kids.forEach((k) => flatten(k, depth + 1, node.id, out))
  return out
}
const nodes = flatten(tree)
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
const parents = nodes.filter((n) => n.kids.length)

/* The walk-through: a day in the app, then a breath with nothing lit. */
const tour = ["node:home", "node:record", "node:mealphoto", "node:receipt", "node:week", null]
const tourBeat = [2000, 1800, 2200, 2200, 2600, 1600]

/* The pen. `seeded` and `f` are the matching model's, copied so that
   file stays as it is: a pill here wobbles the way a ring does there,
   the same on the server and in the browser, and the two agree. Change
   one and change the other. */
function seeded(seed) {
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n) => Math.round(n * 10) / 10

/* A polyline measured out, so a point can be asked for at any distance
   along it - wrapping round if it is closed. Each point comes with the
   direction of travel there. */
function along(poly, closed) {
  const segs = []
  let L = 0
  for (let i = 0; i + 1 < poly.length; i++) {
    const [ax, ay] = poly[i]
    const [bx, by] = poly[i + 1]
    const l = Math.hypot(bx - ax, by - ay)
    if (l < 1e-6) continue
    segs.push([ax, ay, (bx - ax) / l, (by - ay) / l, L, l])
    L += l
  }
  const at = (s) => {
    if (closed) s = ((s % L) + L) % L
    s = Math.min(Math.max(s, 0), L)
    let seg = segs[segs.length - 1]
    for (const sg of segs) if (s <= sg[4] + sg[5]) { seg = sg; break }
    const [ax, ay, tx, ty, s0] = seg
    return [ax + tx * (s - s0), ay + ty * (s - s0), tx, ty]
  }
  return { L, at }
}

/* Points pushed off their line by a random walk, the way the icon set's
   strokes are. `flare` lets the stroke drift outward as it goes, so a
   closed shape overshoots its start rather than meeting it. */
function scribble(pts, seed, amp, flare = 0) {
  const rand = seeded(seed)
  const n = pts.length - 1
  let drift = 0
  return pts.map(([x, y, tx, ty], i) => {
    drift = drift * 0.72 + (rand() - 0.5) * amp
    const off = drift + (flare ? (i / n) * flare : 0)
    return [x + ty * off, y - tx * off]
  })
}

/* The path through a run of those points, joined through their
   midpoints - or through part of one, so a stretch of a line can be
   drawn again on top of itself and land exactly on it. */
function pathOf(out, from = 0, to = out.length - 1) {
  let d = `M${f(out[from][0])} ${f(out[from][1])}`
  for (let i = from + 1; i < to; i++) {
    const [x, y] = out[i]
    const [nx, ny] = out[i + 1]
    d += `Q${f(x)} ${f(y)} ${f((x + nx) / 2)} ${f((y + ny) / 2)}`
  }
  return d + `L${f(out[to][0])} ${f(out[to][1])}`
}

const stroke = (pts, seed, amp, flare) => pathOf(scribble(pts, seed, amp, flare))

/* The corners of a rectangle, turned. */
function arc(cx, cy, r, a0, a1, steps = 6) {
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return pts
}

function roundedRect(x, y, w, h, r) {
  const q = Math.PI / 2
  return [
    [x + r, y],
    [x + w - r, y],
    ...arc(x + w - r, y + r, r, -q, 0),
    [x + w, y + h - r],
    ...arc(x + w - r, y + h - r, r, 0, q),
    [x + r, y + h],
    ...arc(x + r, y + h - r, r, q, 2 * q),
    [x, y + r],
    ...arc(x + r, y + r, r, 2 * q, 3 * q),
    [x + r, y]
  ]
}

/* The icon set's rounded rectangle, at this size: one stroke that starts
   part-way along the top, goes all the way round and a little further,
   and does not quite land on itself. */
function pill(x, y, w, h, seed) {
  const r = Math.min(h / 2, 11)
  const { L, at } = along(roundedRect(x, y, w, h, r), true)
  const rand = seeded(`${seed}:start`)
  const s0 = r + rand() * (w - 2 * r) * 0.6
  const step = 6
  const n = Math.ceil((L + 10) / step)
  const pts = []
  for (let i = 0; i <= n; i++) pts.push(at(s0 + Math.min(i * step, L + 10)))
  return stroke(pts, seed, 0.9, 1.3)
}

/* The clean rectangle under it, for the fill. */
function pillFill(x, y, w, h) {
  const r = Math.min(h / 2, 11)
  return `M${f(x + r)} ${f(y)}H${f(x + w - r)}A${r} ${r} 0 0 1 ${f(x + w)} ${f(y + r)}V${f(y + h - r)}A${r} ${r} 0 0 1 ${f(x + w - r)} ${f(y + h)}H${f(x + r)}A${r} ${r} 0 0 1 ${f(x)} ${f(y + h - r)}V${f(y + r)}A${r} ${r} 0 0 1 ${f(x + r)} ${f(y)}Z`
}

/* A line that turns corners the way a pen does, by rounding them off.
   With no wobble it is the clean run a dot can travel. */
function elbowPoints(corners, radius, seed, amp = 0.7) {
  /* A child level with its parent has no corner to turn: the two points
     the turn would be between are the same point, and go. */
  const points = corners.filter((p, i) => i === 0 || Math.hypot(p[0] - corners[i - 1][0], p[1] - corners[i - 1][1]) > 1e-6)
  const poly = [points[0]]
  for (let i = 1; i + 1 < points.length; i++) {
    const [px, py] = points[i - 1]
    const [x, y] = points[i]
    const [nx, ny] = points[i + 1]
    const inL = Math.hypot(x - px, y - py)
    const outL = Math.hypot(nx - x, ny - y)
    const r = Math.min(radius, inL / 2, outL / 2)
    const a = [x - ((x - px) / inL) * r, y - ((y - py) / inL) * r]
    const b = [x + ((nx - x) / outL) * r, y + ((ny - y) / outL) * r]
    for (let k = 0; k <= 5; k++) {
      const t = k / 5
      poly.push([(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * x + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * y + t * t * b[1]])
    }
  }
  poly.push(points[points.length - 1])
  const { L, at } = along(poly, false)
  const step = 6
  const n = Math.max(2, Math.ceil(L / step))
  const pts = []
  for (let i = 0; i <= n; i++) pts.push(at((L * i) / n))
  return scribble(pts, seed, amp)
}

const elbow = (corners, radius, seed, amp) => pathOf(elbowPoints(corners, radius, seed, amp))

/* Where everything stands. How wide a name is before it is set, near
   enough for a pill that is hand-drawn anyway: Chinese is set
   full-width, Latin by its shape. */
function cjk(ch) {
  const c = ch.codePointAt(0)
  return (c >= 0x2e80 && c <= 0x9fff) || (c >= 0xf900 && c <= 0xfaff) || (c >= 0xff00 && c <= 0xffef)
}
function measure(label) {
  let w = 0
  for (const ch of label) {
    if (cjk(ch)) w += 14
    else if (ch === " ") w += 3.8
    else if (/[A-Z]/.test(ch)) w += 8.8
    else if (/[ilj.,'’!:]/.test(ch)) w += 3.4
    else w += 7.1
  }
  return Math.round(w + 28)
}

const ROW = 42
const PILL = 30
const BEND = 10

/* Rows go to the leaves in reading order; a screen with children sits
   level with the middle of them. */
function rows() {
  const y = {}
  let row = 0
  const place = (id) => {
    const n = byId[id]
    if (!n.kids.length) {
      y[id] = row++ * ROW
      return y[id]
    }
    const ys = n.kids.map(place)
    y[id] = (ys[0] + ys[ys.length - 1]) / 2
    return y[id]
  }
  place(tree.id)
  return { y, count: row }
}

/* The lines are drawn the way the reference draws them and a pen would:
   one trunk out of each parent - a stub to the gap, then one vertical
   down the gap - and a branch off it to each child, the first and last
   turning the corner where the trunk ends. The trunk is drawn once, not
   once per child, or six wobbles would pile up on the same stretch. The
   trunk keeps its points as well as its path, so the stretch of it that
   leads to a pointed screen can be lit on its own. A child's `run` is
   the clean, unwobbled way from its parent to it, for the dot to
   travel. */
function wire(layout, seed) {
  const stubs = []
  const trunks = []
  const branches = []
  const runs = {}
  for (const p of parents) {
    const { stub, trunk, branch, run } = layout(p)
    if (stub) stubs.push({ id: p.id, d: elbow(stub, BEND, `${seed}:stub:${p.id}`), depth: p.depth + 1 })
    if (trunk) {
      const pts = elbowPoints(trunk, BEND, `${seed}:trunk:${p.id}`)
      trunks.push({ id: p.id, pts, d: pathOf(pts), depth: p.depth + 1 })
    }
    for (const id of p.kids) {
      branches.push({ id, d: elbow(branch(id), BEND, `${seed}:${id}`), depth: byId[id].depth, kind: byId[id].kind })
      runs[id] = elbow(run(id), BEND, "", 0)
    }
  }
  return { stubs, trunks, branches, runs }
}

/* Wide: one column per depth, as wide as its widest name, the lines
   turning in the gap between columns. */
function layoutWide(labels) {
  const GAP = 40
  const cols = []
  const w = {}
  for (const n of nodes) {
    w[n.id] = measure(labels[n.id][0])
    cols[n.depth] = Math.max(cols[n.depth] || 0, w[n.id])
  }
  const left = []
  let x = 0
  cols.forEach((cw, d) => { left[d] = x; x += cw + GAP })
  const { y, count } = rows()
  const pos = {}
  for (const n of nodes) {
    pos[n.id] = { x: left[n.depth] + cols[n.depth] / 2, y: y[n.id] + ROW / 2, w: w[n.id], h: PILL }
  }
  const wires = wire((p) => {
    const a = pos[p.id]
    const x0 = a.x + a.w / 2 + 4
    const gx = left[p.depth + 1] - GAP / 2
    const kids = p.kids.map((id) => pos[id])
    const top = kids[0].y
    const bottom = kids[kids.length - 1].y
    const x1 = (id) => pos[id].x - pos[id].w / 2 - 4
    if (kids.length === 1) {
      return { branch: (id) => [[x0, a.y], [x1(id), pos[id].y]], run: (id) => [[x0, a.y], [x1(id), pos[id].y]] }
    }
    return {
      stub: [[x0, a.y], [gx, a.y]],
      trunk: [[gx, top + BEND], [gx, bottom - BEND]],
      branch: (id) => {
        const c = pos[id]
        if (c.y === top) return [[gx, top + BEND], [gx, top], [x1(id), top]]
        if (c.y === bottom) return [[gx, bottom - BEND], [gx, bottom], [x1(id), bottom]]
        return [[gx, c.y], [x1(id), c.y]]
      },
      run: (id) => [[x0, a.y], [gx, a.y], [gx, pos[id].y], [x1(id), pos[id].y]]
    }
  }, "wide")
  return { box: [x - GAP, count * ROW], pos, ...wires }
}

/* Tall: an outline, each screen a row and a step in from its parent, the
   trunk dropping from under the parent's first letters and each branch
   turning in to its row. */
function layoutTall(labels) {
  const INDENT = 30
  const pos = {}
  let right = 0
  nodes.forEach((n, i) => {
    const w = measure(labels[n.id][0])
    const x = n.depth * INDENT
    pos[n.id] = { x: x + w / 2, y: i * ROW + ROW / 2, w, h: PILL }
    right = Math.max(right, x + w)
  })
  const wires = wire((p) => {
    const a = pos[p.id]
    const gx = a.x - a.w / 2 + 12
    const y0 = a.y + PILL / 2 + 3
    const last = pos[p.kids[p.kids.length - 1]]
    const x1 = (id) => pos[id].x - pos[id].w / 2 - 4
    return {
      trunk: [[gx, y0], [gx, last.y - BEND]],
      branch: (id) => {
        const c = pos[id]
        if (c === last) return [[gx, last.y - BEND], [gx, last.y], [x1(id), last.y]]
        return [[gx, c.y], [x1(id), c.y]]
      },
      run: (id) => [[gx, y0], [gx, pos[id].y], [x1(id), pos[id].y]]
    }
  }, "tall")
  return { box: [right, nodes.length * ROW], pos, ...wires }
}

/* What is lit. */
function ancestors(id) {
  const out = []
  for (let n = byId[id]; n; n = byId[n.parent]) out.unshift(n.id)
  return out
}

function descendants(id, out = []) {
  for (const k of byId[id].kids) { out.push(k); descendants(k, out) }
  return out
}

/* `lit` is in ink, `half` the part under the pointed screen, `path` the
   branches on the way to it and `run` the same in order - the ones the
   dot runs. The way is counted from Home: sign in and set up are seen
   once, so they are not lit again for every screen past them. A branch
   is named for the screen it leads to, so the sets are of screen ids
   throughout. */
function resolve(key) {
  if (!key) return null
  const id = key.split(":")[1]
  const all = ancestors(id)
  const way = all.slice(Math.max(all.indexOf("home"), 0))
  const lit = new Set(way)
  const twin = byId[id].same
  if (twin) for (const n of nodes) if (n.same === twin) lit.add(n.id)
  const run = way.slice(1)
  return { lit, half: new Set(descendants(id)), path: new Set(run), run, lead: id }
}

/* A stub is lit when any branch off it is. */
function stubState(focus, parentId) {
  if (!focus) return {}
  const kids = byId[parentId].kids
  if (kids.some((k) => focus.path.has(k))) return { "data-on": "" }
  if (kids.some((k) => focus.half.has(k))) return { "data-half": "" }
  return { "data-off": "" }
}

/* A branch belongs to the child it reaches. Keep the branch in ink when
   that child is on the selected route, half-lit when it sits below the
   selected screen, and step it back with the rest of the map otherwise. */
function branchState(focus, childId) {
  if (!focus) return {}
  if (focus.path.has(childId)) return { "data-on": "" }
  if (focus.half.has(childId)) return { "data-half": "" }
  return { "data-off": "" }
}

/* A trunk as a whole is only ever half-lit or stepped back: the stretch
   of it on the way to a pointed screen is drawn again in ink on top, see
   `trunkLit`. */
function trunkState(focus, parentId) {
  if (!focus) return {}
  if (byId[parentId].kids.some((k) => focus.half.has(k))) return { "data-half": "" }
  return { "data-off": "" }
}

/* The stretch of a trunk between where its parent joins it and the
   furthest branch on the way, through the same points the trunk was
   drawn through - cut at exactly the two rows, so the ink meets the
   stub and the branch rather than stopping a sample short of them.
   Nothing if the way does not use the trunk at all. */
function trunkLit(focus, trunk, pos) {
  const p = byId[trunk.id]
  const ys = p.kids.filter((k) => focus.path.has(k)).map((k) => pos[k].y)
  if (!ys.length) return null
  const pts = trunk.pts
  const first = pts[0][1]
  const last = pts[pts.length - 1][1]
  const lo = Math.max(Math.min(pos[p.id].y, ...ys), first)
  const hi = Math.min(Math.max(pos[p.id].y, ...ys), last)
  if (hi - lo < 1) return null
  /* The trunk runs downward, so a row is found by its y; the point on
     the line there is between the two samples either side of it. */
  const cut = (y) => {
    for (let i = 0; i + 1 < pts.length; i++) {
      const [ax, ay] = pts[i]
      const [bx, by] = pts[i + 1]
      if (y >= ay && y <= by) return { i, p: [ax + (bx - ax) * (by === ay ? 0 : (y - ay) / (by - ay)), y] }
    }
    return null
  }
  const a = cut(lo)
  const b = cut(hi)
  if (!a || !b) return null
  return pathOf([a.p, ...pts.slice(a.i + 1, b.i + 1), b.p])
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

export function Userflow({ copy }) {
  const root = useRef(null)
  const reduced = useReducedMotion()
  const layouts = [["wide", layoutWide(copy.nodes)], ["tall", layoutTall(copy.nodes)]]

  /* The mouse and the keyboard are kept apart: what is hovered wins
     while a mouse is over it, and what is focused is still there when
     the mouse has gone, so a keyboard reader's pick is not dropped by a
     pointer passing through. */
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [touring, setTouring] = useState(null)
  const [stage, setStage] = useState("still")
  const [visible, setVisible] = useState(false)
  const pointed = hovered || focused

  /* Arrive drawn if already on screen; otherwise hide, and draw in when
     scrolled to. Once drawn, the arrival is over and done with, so a
     pill stroked again under the pointer is not stroked a third time
     when the pointer leaves. */
  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    /* The reduced-motion query is only answered after the first run of
       this effect, which may already have hidden the drawing: a reader
       who asked for less gets it back whole. */
    if (reduced) {
      setStage("still")
      return undefined
    }
    const onScreen = el.getBoundingClientRect().top < window.innerHeight * 0.9
    if (!onScreen) setStage("armed")
    let timer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setStage((s) => (s === "armed" ? "in" : s))
          clearTimeout(timer)
          timer = setTimeout(() => setStage("done"), 2800)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); clearTimeout(timer) }
  }, [reduced])

  useEffect(() => {
    if (reduced || !visible || pointed) {
      setTouring(null)
      return undefined
    }
    let i = 0
    let timer
    const next = () => {
      setTouring(tour[i])
      timer = setTimeout(() => {
        i = (i + 1) % tour.length
        next()
      }, tourBeat[i])
    }
    /* Let the drawing finish before the first screen lights. */
    timer = setTimeout(next, 2400)
    return () => clearTimeout(timer)
  }, [reduced, visible, pointed])

  const key = pointed || touring
  const focus = resolve(key)

  const readout = key ? copy.nodes[key.split(":")[1]][1] : copy.legend

  /* A mouse points; a finger taps. A tap fires enter and click together,
     so hover is left to the mouse and a tap simply selects - tapping
     somewhere else moves focus away and clears it. */
  const point = (next) => (e) => { if (e.pointerType === "mouse") setHovered(next) }
  const leave = (e) => { if (e.pointerType === "mouse") setHovered(null) }
  const select = (next) => () => setFocused(next)
  const blur = () => setFocused(null)

  return (
    <div
      ref={root}
      className={styles.map}
      data-stage={stage}
      data-focus={focus ? "" : undefined}
      data-touring={!pointed && touring ? "" : undefined}
      data-motion={reduced ? undefined : ""}
    >
      <div className={styles.mapHead}>
        <p className={styles.microLabel}>{copy.label}</p>
        <h3>{copy.title}</h3>
      </div>

      <div className={styles.mapBoard}>
        {layouts.map(([name, layout]) => {
          const [w, h] = layout.box
          const pad = 8
          return (
            <svg
              key={name}
              className={styles.mapGraph}
              data-layout={name}
              viewBox={`${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`}
              role="group"
              aria-label={copy.aria}
              onPointerLeave={leave}
            >
              {layout.stubs.map((line) => (
                <g key={line.id} className={styles.mapEdge} {...stubState(focus, line.id)} style={{ "--d": line.depth }}>
                  <path className={styles.mapLine} d={line.d} pathLength={1} />
                </g>
              ))}
              {layout.trunks.map((line) => (
                <g key={line.id} className={styles.mapEdge} {...trunkState(focus, line.id)} style={{ "--d": line.depth }}>
                  <path className={styles.mapLine} d={line.d} pathLength={1} />
                </g>
              ))}
              {/* The way along a trunk, in ink over the stepped-back trunk. */}
              {focus && layout.trunks.map((line) => {
                const d = trunkLit(focus, line, layout.pos)
                return d ? (
                  <g key={`lit:${line.id}`} className={`${styles.mapEdge} ${styles.mapLit}`} data-on="">
                    <path className={styles.mapLine} d={d} pathLength={1} />
                  </g>
                ) : null
              })}
              {layout.branches.map((line) => (
                <g
                  key={line.id}
                  className={styles.mapEdge}
                  data-kind={line.kind === "sheet" ? "sheet" : undefined}
                  {...branchState(focus, line.id)}
                  style={{ "--d": line.depth }}
                >
                  <path className={styles.mapLine} d={line.d} pathLength={line.kind === "sheet" ? undefined : 1} />
                </g>
              ))}

              {/* The tap, travelling: one dot per step of the lit way, each
                  setting off as the one before it arrives. Keyed on what is
                  pointed at, so the run starts over for every screen. */}
              {!reduced && focus?.run.map((id, i) => (
                <circle
                  key={`${key}:${id}`}
                  className={styles.mapDot}
                  r="3.2"
                  style={{ "--i": i, offsetPath: `path("${layout.runs[id]}")` }}
                />
              ))}

              {nodes.map((n, index) => {
                const p = layout.pos[n.id]
                const [label, note] = copy.nodes[n.id]
                const x = p.x - p.w / 2
                const y = p.y - p.h / 2
                const lit = focus ? focus.lit.has(n.id) : true
                const half = focus ? focus.half.has(n.id) : false
                return (
                  <g
                    key={n.id}
                    className={styles.mapNode}
                    data-home={n.home ? "" : undefined}
                    data-duo={n.duo ? "" : undefined}
                    data-lead={focus?.lead === n.id ? "" : undefined}
                    data-half={!lit && half ? "" : undefined}
                    data-off={!lit && !half ? "" : undefined}
                    style={{ "--i": index, "--d": n.depth }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${label}. ${note}${n.duo ? ` ${copy.pairedOnly}` : ""}`}
                    onPointerEnter={point(`node:${n.id}`)}
                    onFocus={select(`node:${n.id}`)}
                    onBlur={blur}
                    onClick={select(`node:${n.id}`)}
                  >
                    <path className={styles.mapFill} d={pillFill(x, y, p.w, p.h)} />
                    <path className={styles.mapPill} d={pill(x, y, p.w, p.h, n.id)} pathLength={1} />
                    <text className={styles.mapName} x={p.x} y={p.y + 5} textAnchor="middle">{label}</text>
                  </g>
                )
              })}
            </svg>
          )
        })}

        {/* Read out only for what the reader points at: the walk-through
            would otherwise be announced on every beat. */}
        <p className={styles.mapReadout} aria-live={pointed ? "polite" : "off"}>
          <span key={readout}>{readout}</span>
        </p>
      </div>

    </div>
  )
}
