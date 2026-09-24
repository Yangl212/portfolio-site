"use client"

import { useState } from "react"

import styles from "./page.module.css"

/*
 * The colour system drawn as what the copy says it is: the 22 cards spread
 * around the hue circle, each sitting on the orbit of its value band - pale
 * outermost, saturated in the middle, the three deep ones nearest the
 * centre - around a disc of the pastel base every hue is mixed back toward.
 * Cards are placed in hue order at equal steps rather than at their exact
 * hue, so the pinks and blues do not pile up.
 *
 * Each card is a group rotated to its angle, holding a slot that is pushed
 * out along that angle by CSS (--r). Keeping the push in CSS is what lets
 * the deck deal itself out from the centre as the section scrolls in, and
 * lets the ring breathe under the pointer. The centre disc names whichever
 * card is pointed at; at rest it names the base.
 */

const ORBIT = { pale: 156, saturated: 118, deep: 84 }
const CARD = { w: 22, h: 35 }

function hue(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  if (d === 0) return 0
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return (h * 60 + 360) % 360
}

export function HueWheel({ cards }) {
  const [on, setOn] = useState(null)
  const sorted = [...cards].sort((a, b) => hue(a.hex) - hue(b.hex))
  const step = 360 / sorted.length
  const shown = on ? sorted.find((card) => card.no === on) : null

  return (
    <svg
      className={styles.hueWheel}
      viewBox="0 0 400 400"
      role="img"
      aria-label="The 22 Major Arcana field colours arranged around a hue circle on three orbits: pale, saturated and deep"
      data-on={on ? "" : undefined}
      onPointerLeave={() => setOn(null)}
    >
      {Object.values(ORBIT).map((r) => (
        <circle key={r} className={styles.orbit} cx="200" cy="200" r={r} />
      ))}

      <circle className={styles.base} cx="200" cy="200" r="42" />
      {/* Keyed so a change re-mounts the label and replays its fade. */}
      <g key={shown ? shown.no : "base"} className={styles.baseText}>
        {shown ? (
          <>
            <text className={styles.baseNo} x="200" y="195">No.{shown.no}</text>
            <text className={styles.baseName} x="200" y="212">{shown.name}</text>
          </>
        ) : (
          <>
            <text className={styles.baseLabel} x="200" y="197">Pastel</text>
            <text className={styles.baseLabel} x="200" y="209">base</text>
          </>
        )}
      </g>

      {sorted.map((card, i) => (
        <g key={card.no} transform={`rotate(${(i * step).toFixed(2)} 200 200)`}>
          <g
            className={styles.hueSlot}
            style={{ "--i": i, "--r": `${ORBIT[card.band]}px` }}
            data-on={on === card.no || undefined}
            onPointerEnter={() => setOn(card.no)}
          >
            <title>{`${card.no} ${card.name} · ${card.hex}`}</title>
            <rect
              className={styles.hueCard}
              x={200 - CARD.w / 2}
              y={200 - CARD.h / 2}
              width={CARD.w}
              height={CARD.h}
              rx="3"
              fill={card.hex}
            />
          </g>
        </g>
      ))}
    </svg>
  )
}
