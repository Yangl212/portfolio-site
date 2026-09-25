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
  { key: "crossbar", label: { en: "Coral", zh: "珊瑚红" }, hex: "#E36D6D", part: { en: "T crossbar", zh: "T 的横" }, box: [0, 0, 301.2, 71.5],
    draw: (fill) => <rect width="301.234" height="71.479" fill={fill} /> },
  { key: "stem", label: { en: "Orchid", zh: "兰紫" }, hex: "#D96DE3", part: { en: "T stem", zh: "T 的竖" }, box: [112.3, 0, 76.6, 339.5],
    draw: (fill) => <rect x="112.324" width="76.585" height="339.526" fill={fill} /> },
  { key: "a", label: { en: "Periwinkle", zh: "长春花蓝" }, hex: "#7B88FA", part: { en: "A", zh: "A" }, box: [257.8, 0, 263.6, 339.9],
    draw: (fill) => <path d="M389.612 0L521.425 339.895H257.798L389.612 0Z" fill={fill} /> },
  { key: "bowl", label: { en: "Mist", zh: "雾蓝" }, hex: "#BFE0F3", part: { en: "R bowl", zh: "R 的圆" }, box: [545.4, 0, 229.9, 199.1],
    draw: (fill) => <path d={BOWL} fill={fill} /> },
  { key: "leg", label: { en: "Pink", zh: "粉" }, hex: "#F154A5", part: { en: "R leg", zh: "R 的腿" }, box: [545.4, 71.5, 229.9, 268],
    draw: (fill) => <path d={LEG} fill={fill} /> },
  { key: "o1", label: { en: "Amber", zh: "琥珀" }, hex: "#FBBF37", part: { en: "First O", zh: "第一个 O" }, box: [798.3, 0, 339.5, 339.5],
    draw: (fill) => <circle cx="968.064" cy="169.763" r="169.763" fill={fill} /> },
  { key: "o2", label: { en: "Sky", zh: "天蓝" }, hex: "#4BADF4", part: { en: "Second O", zh: "第二个 O" }, box: [1019.4, 0, 339.5, 339.5],
    draw: (fill) => <circle cx="1189.12" cy="169.763" r="169.763" fill={fill} /> }
]

const BOWL = "M545.367 0H675.663C730.649 0 775.223 44.5746 775.223 99.5601C775.223 154.546 730.649 199.12 675.663 199.12H545.367V0Z"
const LEG = "M545.367 339.526V71.479L775.223 339.526H545.367Z"

/* Each crossing: the two shapes it is made of, the clip that bounds it,
   the piece painted inside that clip, and where its number sits. */
const crossings = [
  { n: 1, of: ["crossbar", "stem"], hex: "#BD0051", label: { en: "Coral × Orchid", zh: "珊瑚红 × 兰紫" }, part: { en: "The T", zh: "T" }, at: [150.6, 35.7],
    clip: <rect width="301.234" height="71.479" />, paint: <rect x="112.324" width="76.585" height="339.526" /> },
  { n: 2, of: ["bowl", "leg"], hex: "#B13599", label: { en: "Mist × Pink", zh: "雾蓝 × 粉" }, part: { en: "The R", zh: "R" }, at: [574, 165],
    clip: <path d={BOWL} />, paint: <path d={LEG} /> },
  { n: 3, of: ["o1", "o2"], hex: "#456D2B", label: { en: "Amber × Sky", zh: "琥珀 × 天蓝" }, part: { en: "The double O", zh: "两个 O" }, at: [1078.6, 169.8],
    clip: <circle cx="968.064" cy="169.763" r="169.763" />, paint: <circle cx="1189.12" cy="169.763" r="169.763" /> }
]

/* The same 350-unit square for every loose shape, so the seven keep their
   true sizes relative to one another. */
const TILE = 350

const chrome = {
  en: { markAria: "The TAROO wordmark, built from seven overlapping shapes", shapesAria: "The seven shapes", groupAria: "Language" },
  zh: { markAria: "TAROO 字标，由七个互相叠压的形状拼成", shapesAria: "七个形状", groupAria: "语言" }
}

export function WordmarkAnatomy({ locale = "en" }) {
  const ui = chrome[locale] || chrome.en
  const pick = (v) => (v && typeof v === "object" ? v[locale] || v.en : v)
  /* What is lit: a shape key, or a crossing number. */
  const [lit, setLit] = useState(null)
  const litShapes = typeof lit === "number" ? crossings[lit - 1].of : lit ? [lit] : null
  const isDim = (key) => litShapes !== null && !litShapes.includes(key)

  return (
    <div className={styles.anatomy} onPointerLeave={() => setLit(null)}>
      <figure className={styles.mark}>
        <svg viewBox="-20 -150 1400 510" role="img" aria-label={ui.markAria}>
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
              <strong>{pick(c.part)}</strong>
              <em>{pick(c.label)} → {c.hex}</em>
            </span>
          </li>
        ))}
      </ol>

      <ul className={styles.shapes} aria-label={ui.shapesAria}>
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
              <strong>{pick(s.part)}</strong>
              <em>{pick(s.label)}</em>
              <em>{s.hex}</em>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
