"use client"

import { useEffect, useRef, useState } from "react"

import styles from "./page.module.css"

/*
 * The palette as a board you can play on. Every colour is one piece from
 * Suglar's own shape kit - circle, square, half-circle, arc - printed in
 * multiply, so wherever two pieces lie over each other the board shows the
 * colour that overprint makes, with its hex pinned to the overlap. Sugar
 * white is not a piece: it is the board, the way it is the ground on every
 * printed component.
 *
 * Positions are fractions of the board (x, w of its width; y of its
 * height), so the composition scales with the column. Overlaps are found
 * from bounding boxes and only counted once they cover a real share of the
 * smaller piece, which keeps two circles that merely touch at the corners
 * from claiming a mix that is not visible.
 */

/* Which piece of the kit each colour is cut as. The core four are the
   four the case study names; the supporting thirteen draw on the wider
   kit - wedge, ring, triangle, diamond, pill - so the board reads as a
   box of parts rather than four shapes repeated. Neighbours that start
   out overlapping are paired so the overlap is a real area, not a tip. */
const KINDS = {
  core: ["circle", "square", "half", "arc"],
  support: ["square", "quarter", "arc", "circle", "square", "ring", "triangle", "diamond", "pill", "quarter", "arc", "circle", "triangle"]
}

/* Where each piece starts. The core four are big and already crossing
   one another; the supporting thirteen are small, a few of them laid over
   a core piece so the board shows mixes before anyone has touched it. */
const START = {
  core: [
    [0.04, 0.12],
    [0.12, 0.42],
    [0.29, 0.08],
    [0.37, 0.34]
  ],
  support: [
    [0.53, 0.1], [0.56, 0.14], [0.65, 0.08], [0.7, 0.5], [0.78, 0.08],
    [0.8, 0.12], [0.86, 0.54], [0.92, 0.12], [0.66, 0.62],
    [0.05, 0.7], [0.28, 0.74], [0.2, 0.68], [0.345, 0.6]
  ]
}
/* The same pieces laid out again for the square board a phone gets, where
   the wide composition would come apart and lose its overlaps. */
const START_NARROW = {
  core: [
    [0.06, 0.06],
    [0.16, 0.16],
    [0.42, 0.05],
    [0.52, 0.16]
  ],
  support: [
    [0.74, 0.06], [0.78, 0.08], [0.86, 0.22], [0.76, 0.4], [0.62, 0.44],
    [0.65, 0.47], [0.86, 0.6], [0.4, 0.4], [0.44, 0.46],
    [0.06, 0.62], [0.2, 0.72], [0.26, 0.3], [0.56, 0.72]
  ]
}
const SIZE = { core: 0.12, support: 0.065 }

/* Is a point (u, v in 0..100 of the piece's box) inside this glyph? The
   same geometry the SVG paths draw. */
function inside(kind, u, v) {
  if (kind === "square") return true
  if (kind === "circle") return (u - 50) ** 2 + (v - 50) ** 2 <= 2500
  if (kind === "half") return (u - 50) ** 2 + (v - 100) ** 2 <= 2500
  if (kind === "quarter") return u ** 2 + (v - 100) ** 2 <= 10000
  if (kind === "ring") {
    const d = (u - 50) ** 2 + (v - 50) ** 2
    return d >= 900 && d <= 2500
  }
  if (kind === "triangle") return Math.abs(u - 50) <= v / 2
  if (kind === "diamond") return Math.abs(u - 50) + Math.abs(v - 50) <= 50
  if (kind === "pill") return v >= 25 && v <= 75 && ((u >= 25 && u <= 75) || (u - 25) ** 2 + (v - 50) ** 2 <= 625 || (u - 75) ** 2 + (v - 50) ** 2 <= 625)
  const d = (u - 100) ** 2 + (v - 100) ** 2
  return d >= 66 * 66 && d <= 10000
}

/* The only words the board says. Swatch names and roles arrive already
   translated from the page; these are the board's own chrome. */
const copy = {
  en: {
    count: "18 colours",
    on: (name, hex) => `on ${name} ${hex}`,
    onGround: "on the ground",
    fallbackRole: "Card fills · candy accents",
    hint: "Drag a piece · overlaps print their mix",
    reset: "Reset",
    drag: (name, hex) => `${name} ${hex}, drag to overlap`
  },
  zh: {
    count: "18 个颜色",
    on: (name, hex) => `铺在${name} ${hex} 上`,
    onGround: "铺在底色上",
    fallbackRole: "卡面填色 · 糖果点缀",
    hint: "拖动一块 · 叠在一起会印出混色",
    reset: "重置",
    drag: (name, hex) => `${name} ${hex}，拖动可以叠色`
  }
}

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/* Multiply, per channel: exactly what the browser paints where the two
   pieces cross, so the pinned hex is the colour under it. */
function multiply(a, b) {
  const [r1, g1, b1] = rgb(a)
  const [r2, g2, b2] = rgb(b)
  const ch = (x, y) => Math.round((x * y) / 255).toString(16).padStart(2, "0")
  return `#${ch(r1, r2)}${ch(g1, g2)}${ch(b1, b2)}`.toUpperCase()
}

function Glyph({ kind, hex }) {
  if (kind === "circle") return <circle cx="50" cy="50" r="50" fill={hex} />
  if (kind === "square") return <rect width="100" height="100" fill={hex} />
  if (kind === "half") return <path d="M0 100 A50 50 0 0 1 100 100 Z" fill={hex} />
  if (kind === "quarter") return <path d="M0 100 L0 0 A100 100 0 0 1 100 100 Z" fill={hex} />
  if (kind === "ring") return <path d="M50 0 A50 50 0 1 1 49.9 0 Z M50 20 A30 30 0 1 0 50.1 20 Z" fill={hex} fillRule="evenodd" />
  if (kind === "triangle") return <path d="M50 0 L100 100 L0 100 Z" fill={hex} />
  if (kind === "diamond") return <path d="M50 0 L100 50 L50 100 L0 50 Z" fill={hex} />
  if (kind === "pill") return <rect x="0" y="25" width="100" height="50" rx="25" fill={hex} />
  return <path d="M0 100 A100 100 0 0 1 100 0 L100 34 A66 66 0 0 0 34 100 Z" fill={hex} />
}

export function ColorBoard({ core, support, locale = "en" }) {
  const t = copy[locale] || copy.en
  const boardRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [on, setOn] = useState(null)

  /* The square phone board gets its own layout and bigger pieces, or the
     starting overlaps that show what the board does would come apart. */
  const narrow = Boolean(size.w && size.w < 640)
  const scale = narrow ? 1.5 : 1
  const pw = (p) => p.w * scale

  const build = (square = narrow) => {
    const at = square ? START_NARROW : START
    return [
      ...core.filter((c) => !c.ground).map((c, i) => ({ ...c, tier: "core", kind: KINDS.core[i], w: SIZE.core, x: at.core[i][0], y: at.core[i][1] })),
      ...support.map((c, i) => ({ ...c, tier: "support", kind: KINDS.support[i], w: SIZE.support, x: at.support[i][0], y: at.support[i][1] }))
    ]
  }
  const [pieces, setPieces] = useState(() => build(false))
  /* Stacking order: the last touched piece sits on top. */
  const [order, setOrder] = useState(() => build(false).map((p) => p.hex))

  /* Crossing the phone breakpoint re-lays the board for that shape. */
  useEffect(() => {
    if (!size.w) return
    setPieces(build(narrow))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrow])

  const ground = core.find((c) => c.ground)

  useEffect(() => {
    const el = boardRef.current
    if (!el) return undefined
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const lift = (hex) => setOrder((o) => [...o.filter((h) => h !== hex), hex])

  const onPointerDown = (event, piece) => {
    const el = boardRef.current
    if (!el) return
    /* Held here: React clears currentTarget once the handler returns, and
       the listeners below outlive it. */
    const target = event.currentTarget
    target.setPointerCapture(event.pointerId)
    lift(piece.hex)
    setOn(piece)
    const startX = event.clientX
    const startY = event.clientY
    const fromX = piece.x
    const fromY = piece.y
    const W = el.clientWidth
    const H = el.clientHeight
    const s = pw(piece) * W
    const move = (e) => {
      const x = Math.min(Math.max(fromX + (e.clientX - startX) / W, 0), 1 - s / W)
      const y = Math.min(Math.max(fromY + (e.clientY - startY) / H, 0), 1 - s / H)
      setPieces((ps) => ps.map((p) => (p.hex === piece.hex ? { ...p, x, y } : p)))
    }
    const up = () => {
      target.removeEventListener("pointermove", move)
      target.removeEventListener("pointerup", up)
      target.removeEventListener("pointercancel", up)
      target.removeAttribute("data-drag")
    }
    target.setAttribute("data-drag", "")
    target.addEventListener("pointermove", move)
    target.addEventListener("pointerup", up)
    target.addEventListener("pointercancel", up)
  }

  const reset = () => {
    setPieces(build())
    setOrder(build().map((p) => p.hex))
    setOn(null)
  }

  /* Every pair that currently crosses, with the mix and where to pin it.
     Where the boxes meet, a 7 x 7 grid of points is tested against both
     glyphs; the tag goes at the centre of the points inside both, and a
     pair needs a handful of them before it counts as an overlap. */
  const mixes = []
  if (size.w) {
    const box = (p) => {
      const s = pw(p) * size.w
      return { x: p.x * size.w, y: p.y * size.h, s, kind: p.kind }
    }
    const N = 7
    for (let i = 0; i < pieces.length; i++) {
      for (let j = i + 1; j < pieces.length; j++) {
        const a = box(pieces[i])
        const b = box(pieces[j])
        const x1 = Math.max(a.x, b.x)
        const y1 = Math.max(a.y, b.y)
        const x2 = Math.min(a.x + a.s, b.x + b.s)
        const y2 = Math.min(a.y + a.s, b.y + b.s)
        if (x2 <= x1 || y2 <= y1) continue
        let hits = 0
        let sx = 0
        let sy = 0
        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            const px = x1 + ((c + 0.5) / N) * (x2 - x1)
            const py = y1 + ((r + 0.5) / N) * (y2 - y1)
            if (
              inside(a.kind, ((px - a.x) / a.s) * 100, ((py - a.y) / a.s) * 100) &&
              inside(b.kind, ((px - b.x) / b.s) * 100, ((py - b.y) / b.s) * 100)
            ) {
              hits += 1
              sx += px
              sy += py
            }
          }
        }
        if (hits < 5) continue
        mixes.push({ key: `${pieces[i].hex}${pieces[j].hex}`, a: pieces[i], b: pieces[j], hex: multiply(pieces[i].hex, pieces[j].hex), cx: sx / hits, cy: sy / hits })
      }
    }
    /* Where three pieces cross, two tags land on top of each other; the
       later one steps down until it clears the ones already placed. */
    mixes.sort((m, n) => m.cy - n.cy)
    for (let i = 0; i < mixes.length; i++) {
      for (let j = 0; j < i; j++) {
        if (Math.abs(mixes[i].cx - mixes[j].cx) < 64 && Math.abs(mixes[i].cy - mixes[j].cy) < 20) {
          mixes[i].cy = mixes[j].cy + 20
        }
      }
    }
  }
  const onMix = on ? mixes.find((m) => m.a.hex === on.hex || m.b.hex === on.hex) : null

  return (
    <div className={styles.colorBoard}>
      <div className={styles.boardCaption}>
        {/* Keyed so a change re-mounts the caption and replays its fade. */}
        <p key={on ? on.hex : "all"}>
          {on ? (
            <>
              <strong>{on.name}</strong>
              <span>{on.hex}</span>
              <span>{on.role || t.fallbackRole}</span>
              {onMix ? <span className={styles.boardMix}>× {onMix.a.hex === on.hex ? onMix.b.name : onMix.a.name} → {onMix.hex}</span> : null}
            </>
          ) : (
            <>
              <strong>{t.count}</strong>
              <span>{ground ? t.on(ground.name, ground.hex) : t.onGround}</span>
              <span>{t.hint}</span>
            </>
          )}
        </p>
        <button type="button" className={styles.boardReset} onClick={reset}>{t.reset}</button>
      </div>

      <div
        ref={boardRef}
        className={styles.board}
        style={{ background: ground ? ground.hex : undefined }}
        onPointerLeave={() => setOn(null)}
      >
        {pieces.map((piece, i) => (
          <button
            type="button"
            key={piece.hex}
            className={styles.piece}
            data-tier={piece.tier}
            style={{ left: `${piece.x * 100}%`, top: `${piece.y * 100}%`, width: `${pw(piece) * 100}%`, zIndex: order.indexOf(piece.hex) + 1, "--i": i }}
            aria-label={t.drag(piece.name, piece.hex)}
            onPointerEnter={() => setOn(piece)}
            onPointerDown={(e) => onPointerDown(e, piece)}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true"><Glyph kind={piece.kind} hex={piece.hex} /></svg>
          </button>
        ))}

        {mixes.map((m) => (
          <span key={m.key} className={styles.mixTag} style={{ left: m.cx, top: m.cy }} aria-hidden="true">
            {m.hex}
          </span>
        ))}
      </div>
    </div>
  )
}
