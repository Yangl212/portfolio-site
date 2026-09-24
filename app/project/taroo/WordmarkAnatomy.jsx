"use client"

import { useState } from "react"

import styles from "./wordmark-anatomy.module.css"

/*
 * The Brand System section's one figure: the wordmark drawn from its own
 * geometry (lifted from the Figma source, 1359 x 340 units), and under it
 * the seven shapes that build it, pulled apart. Pointing at a shape - or
 * at one of the three numbered crossings - lights that piece inside the
 * wordmark and dims the rest, so the reader sees where each one sits
 * rather than reading a list of swatches.
 *
 * The crossings are painted as their own shapes in the hand-picked color
 * (clipped to where the two pieces meet), not produced by a blend mode,
 * which lands a few points off the printed values.
 */

const shapes = [
  { key: "crossbar", label: "Coral", hex: "#E36D6D", part: "T crossbar", box: [0, 0, 301.2, 71.5],
    draw: (fill) => <rect width="301.234" height="71.479" fill={fill} /> },
  { key: "stem", label: "Orchid", hex: "#D96DE3", part: "T stem", box: [112.3, 0, 76.6, 339.5],
    draw: (fill) => <rect x="112.324" width="76.585" height="339.526" fill={fill} /> },
  { key: "a", label: "Periwinkle", hex: "#7B88FA", part: "A", box: [257.8, 0, 263.6, 339.9],
    draw: (fill) => <path d="M389.612 0L521.425 339.895H257.798L389.612 0Z" fill={fill} /> },
  { key: "bowl", label: "Mist", hex: "#BFE0F3", part: "R bowl", box: [545.4, 0, 229.9, 199.1],
    draw: (fill) => <path d={BOWL} fill={fill} /> },
  { key: "leg", label: "Pink", hex: "#F154A5", part: "R leg", box: [545.4, 71.5, 229.9, 268],
    draw: (fill) => <path d={LEG} fill={fill} /> },
  { key: "o1", label: "Amber", hex: "#FBBF37", part: "First O", box: [798.3, 0, 339.5, 339.5],
    draw: (fill) => <circle cx="968.064" cy="169.763" r="169.763" fill={fill} /> },
  { key: "o2", label: "Sky", hex: "#4BADF4", part: "Second O", box: [1019.4, 0, 339.5, 339.5],
    draw: (fill) => <circle cx="1189.12" cy="169.763" r="169.763" fill={fill} /> }
]

const BOWL = "M545.367 0H675.663C730.649 0 775.223 44.5746 775.223 99.5601C775.223 154.546 730.649 199.12 675.663 199.12H545.367V0Z"
const LEG = "M545.367 339.526V71.479L775.223 339.526H545.367Z"

/* Each crossing: the two shapes it is made of, the clip that bounds it,
   the piece painted inside that clip, and where its number sits. */
const crossings = [
  { n: 1, of: ["crossbar", "stem"], hex: "#BD0051", label: "Coral × Orchid", part: "The T", at: [150.6, 35.7],
    clip: <rect width="301.234" height="71.479" />, paint: <rect x="112.324" width="76.585" height="339.526" /> },
  { n: 2, of: ["bowl", "leg"], hex: "#B13599", label: "Mist × Pink", part: "The R", at: [574, 165],
    clip: <path d={BOWL} />, paint: <path d={LEG} /> },
  { n: 3, of: ["o1", "o2"], hex: "#456D2B", label: "Amber × Sky", part: "The double O", at: [1078.6, 169.8],
    clip: <circle cx="968.064" cy="169.763" r="169.763" />, paint: <circle cx="1189.12" cy="169.763" r="169.763" /> }
]

/* The same 350-unit square for every loose shape, so the seven keep their
   true sizes relative to one another. */
const TILE = 350

export function WordmarkAnatomy() {
  /* What is lit: a shape key, or a crossing number. */
  const [lit, setLit] = useState(null)
  const litShapes = typeof lit === "number" ? crossings[lit - 1].of : lit ? [lit] : null
  const isDim = (key) => litShapes !== null && !litShapes.includes(key)

  return (
    <div className={styles.anatomy} onPointerLeave={() => setLit(null)}>
      <figure className={styles.mark}>
        <svg viewBox="-20 -150 1400 510" role="img" aria-label="The TAROO wordmark, built from seven overlapping shapes">
          <defs>
            {crossings.map((c) => <clipPath key={c.n} id={`taroo-cross-${c.n}`}>{c.clip}</clipPath>)}
          </defs>

          {shapes.map((s) => (
            <g key={s.key} className={styles.piece} data-dim={isDim(s.key) || undefined}>{s.draw(s.hex)}</g>
          ))}
          {crossings.map((c) => (
            <g
              key={c.n}
              className={styles.piece}
              data-dim={(litShapes !== null && !c.of.every((k) => litShapes.includes(k))) || undefined}
              clipPath={`url(#taroo-cross-${c.n})`}
              fill={c.hex}
            >
              {c.paint}
            </g>
          ))}

          {/* Numbered pins above the mark, each dropping a hairline to the
              crossing it names. */}
          {crossings.map((c) => (
            <g
              key={c.n}
              className={styles.pin}
              data-on={lit === c.n || undefined}
              onPointerEnter={() => setLit(c.n)}
            >
              <line x1={c.at[0]} y1={-78} x2={c.at[0]} y2={c.at[1]} />
              <circle cx={c.at[0]} cy={c.at[1]} r="7" />
              <circle cx={c.at[0]} cy={-102} r="26" className={styles.pinBadge} />
              <text x={c.at[0]} y={-102} dy="0.36em">{c.n}</text>
            </g>
          ))}
        </svg>
      </figure>

      <ol className={styles.crossings}>
        {crossings.map((c) => (
          <li
            key={c.n}
            className={styles.crossing}
            data-on={lit === c.n || undefined}
            onPointerEnter={() => setLit(c.n)}
          >
            <span className={styles.crossingNo}>{c.n}</span>
            <span className={styles.crossingSwatch} style={{ background: c.hex }} aria-hidden="true" />
            <span>
              <strong>{c.part}</strong>
              <em>{c.label} → {c.hex}</em>
            </span>
          </li>
        ))}
      </ol>

      <ul className={styles.shapes} aria-label="The seven shapes">
        {shapes.map((s) => {
          const [x, y, w, h] = s.box
          const viewBox = `${x + w / 2 - TILE / 2} ${y + h / 2 - TILE / 2} ${TILE} ${TILE}`
          return (
            <li
              key={s.key}
              className={styles.shape}
              data-on={lit === s.key || undefined}
              onPointerEnter={() => setLit(s.key)}
            >
              <svg viewBox={viewBox} aria-hidden="true">{s.draw(s.hex)}</svg>
              <strong>{s.part}</strong>
              <em>{s.label}</em>
              <em>{s.hex}</em>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
