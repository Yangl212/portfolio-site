"use client"

import { useEffect, useRef } from "react"

import styles from "./page.module.css"

/*
 * The first screen: the name printed in two misregistered riso inks, with
 * the rest of the press sheet around it - a rotating job stamp, a colour
 * control strip, registration marks, halftone, and two bands of outlined
 * type running along the top and bottom edges.
 *
 * Motion, in three layers:
 *   1. On load the two plates slide into (almost) register once, then keep a
 *      slow drift so the print never sits perfectly still.
 *   2. With a mouse, the plates pull apart in the direction of the cursor
 *      and the bands, stamp and notes shift at their own depths, so the sheet
 *      reads as layers rather than a flat image. The halftone also blooms
 *      around the cursor, the way ink spreads on paper.
 *   3. Hovering the word itself exaggerates the misregistration.
 * Touch devices keep layer 1 only; reduced-motion gets a still print.
 */
function RegMark({ className }) {
  return (
    <svg className={`${styles.reg} ${className}`} viewBox="0 0 20 20" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" fill="none"><path d="M10 0v20M0 10h20" /><circle cx="10" cy="10" r="5" /></g>
    </svg>
  )
}

const bandText = "UI/UX design · Data visualization · Brand & print · AI interfaces · Riso zines · New York · "

function Band({ className }) {
  return (
    <div className={`${styles.band} ${className}`} aria-hidden="true">
      <div className={styles.bandTrack}>
        <span>{bandText}{bandText}</span>
        <span>{bandText}{bandText}</span>
      </div>
    </div>
  )
}

function Stamp() {
  return (
    <svg className={styles.stamp} viewBox="0 0 140 140" aria-hidden="true">
      <defs>
        <path id="riso-stamp-ring" d="M70 70 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0" />
      </defs>
      <circle cx="70" cy="70" r="66" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <text className={styles.stampText}>
        <textPath href="#riso-stamp-ring" startOffset="0">Printed in New York · Two inks · Parsons MFA ’26 · </textPath>
      </text>
      <g stroke="currentColor" strokeWidth="1" fill="none"><path d="M70 56v28M56 70h28" /><circle cx="70" cy="70" r="8" /></g>
    </svg>
  )
}

const strip = [
  ["var(--ink-a)", 1, "A 100"],
  ["var(--ink-a)", 0.5, "A 50"],
  ["var(--ink-a)", 0.2, "A 20"],
  ["var(--ink-b)", 1, "B 100"],
  ["var(--ink-b)", 0.5, "B 50"],
  ["var(--ink-b)", 0.2, "B 20"],
  ["#222222", 1, "K"]
]

export function RisoHero() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    if (!window.matchMedia("(pointer: fine)").matches) return undefined

    /* --px/--py: the cursor as -1..1 from the hero's centre, eased so the
       plates trail the mouse like something with weight. --mx/--my: the raw
       position, for the halftone bloom. */
    let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0

    const tick = () => {
      x += (targetX - x) * 0.09
      y += (targetY - y) * 0.09
      el.style.setProperty("--px", x.toFixed(4))
      el.style.setProperty("--py", y.toFixed(4))
      if (Math.abs(targetX - x) > 0.0015 || Math.abs(targetY - y) > 0.0015) frame = requestAnimationFrame(tick)
      else frame = 0
    }

    const onMove = (event) => {
      const r = el.getBoundingClientRect()
      const localX = event.clientX - r.left
      const localY = event.clientY - r.top
      targetX = Math.max(-1, Math.min(1, (localX / r.width - 0.5) * 2))
      targetY = Math.max(-1, Math.min(1, (localY / r.height - 0.5) * 2))
      el.style.setProperty("--mx", `${Math.round(localX)}px`)
      el.style.setProperty("--my", `${Math.round(localY)}px`)
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      el.style.setProperty("--mx", "-9999px")
      el.style.setProperty("--my", "-9999px")
      if (!frame) frame = requestAnimationFrame(tick)
    }

    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.bloom} aria-hidden="true" />
      <RegMark className={styles.regTL} />
      <RegMark className={styles.regTR} />
      <RegMark className={styles.regBL} />
      <RegMark className={styles.regBR} />

      <Band className={styles.bandTop} />
      <Band className={styles.bandBottom} />

      <div className={styles.heroIn}>
        <p className={`${styles.eyebrow} ${styles.rise}`}>UI/UX &amp; Visual Designer · New York</p>

        {/* Two plates of the same word. The outer span follows the cursor,
            the inner one carries the load animation and the ink, so the two
            transforms never fight. Multiply darkens the overlap like ink. */}
        <h1 id="hero-name" className={styles.op} aria-label="Lele Yang">
          <span className={`${styles.plate} ${styles.plateA}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkA}`}>Lele</span></span>
          <span className={`${styles.plate} ${styles.plateB}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkB}`}>Lele</span></span>
        </h1>

        <p className={`${styles.opSub} ${styles.rise}`} style={{ animationDelay: "160ms" }}>
          UI/UX designer with a visual designer&apos;s eye. Clear, trustworthy interfaces for complex systems and AI, plus the data visualization, brand and print work around them.
        </p>

        <p className={`${styles.opFacts} ${styles.rise}`} style={{ animationDelay: "240ms" }}>
          <span>Parsons MFA &rsquo;26</span>
          <span>Previously UI/UX at VortexNet</span>
          <span>Open to product design roles across the U.S.</span>
        </p>

        <div className={`${styles.opActions} ${styles.rise}`} style={{ animationDelay: "320ms" }}>
          <a className={styles.primary} href="#work">Selected work <span aria-hidden="true">↓</span></a>
          <a className={styles.secondary} href="/resume.pdf" target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
        </div>

        {/* The sheet's furniture, each at its own depth. */}
        <aside className={`${styles.marg} ${styles.marg1}`}>two inks, six pixels<br />out of register —<br />on purpose</aside>
        <aside className={`${styles.marg} ${styles.marg2}`}>Lele · say it<br />like &ldquo;luh-luh&rdquo;</aside>
        <div className={styles.stampWrap} aria-hidden="true"><Stamp /></div>
        <div className={styles.strip} aria-hidden="true">
          {strip.map(([color, alpha, label]) => (
            <span key={label} className={styles.patch}><i style={{ background: color, opacity: alpha }} />{label}</span>
          ))}
        </div>
      </div>

      {/* The job ticket along the bottom edge: what this page is printed
          with. All three are the page's actual colours. */}
      <p className={`${styles.ticket} ${styles.rise}`} style={{ animationDelay: "480ms" }}>
        <span className={styles.ticketLabel}>Printed in three inks</span>
        <span className={styles.swatch}><i style={{ background: "#222222" }} />Black</span>
        <span className={styles.swatch}><i style={{ background: "var(--ink-a)" }} />Fluorescent pink</span>
        <span className={styles.swatch}><i style={{ background: "var(--ink-b)" }} />Blue</span>
        <span className={styles.ticketStock}>on #e4e2e2 stock</span>
      </p>
    </section>
  )
}
