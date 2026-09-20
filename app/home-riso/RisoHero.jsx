"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import styles from "./page.module.css"

/*
 * The first screen: the name pulled as a two-colour screen print, with the
 * rest of the press sheet around it - a rotating job stamp, a colour control
 * strip, registration marks, halftone, and two bands of outlined type running
 * along the top and bottom edges.
 *
 * Motion:
 *   1. The print is pulled on load: a squeegee sweeps left to right and the
 *      pink plate appears behind it; a second sweep, right to left, lays the
 *      blue plate down slightly out of register. Then both drift slowly so
 *      the sheet never sits perfectly still.
 *   2. Clicking the name pulls another print: same two sweeps, a fresh
 *      random misregistration, and the pull count on the job ticket goes up.
 *   3. With a mouse, the plates pull apart in the direction of the cursor,
 *      the furniture shifts at its own depth, the halftone blooms around the
 *      pointer like ink spreading, the two buttons lean toward it, and a
 *      registration ring trails it. Hovering the word widens the offset.
 * Touch devices keep 1 and 2; reduced-motion gets a still, finished print.
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

/* A fresh misregistration for every pull: around the same few pixels, never
   the same twice. */
const jitter = (base, spread) => Math.round((base + (Math.random() * 2 - 1) * spread) * 10) / 10
const newRegistration = () => ({
  ax: jitter(-5, 3), ay: jitter(-4, 2),
  bx: jitter(5, 3), by: jitter(4, 2)
})

export function RisoHero() {
  const ref = useRef(null)
  const [pull, setPull] = useState(1)
  const [reg, setReg] = useState({ ax: -5, ay: -4, bx: 5, by: 4 })

  const pullPrint = useCallback(() => {
    setPull((n) => n + 1)
    setReg(newRegistration())
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    if (!window.matchMedia("(pointer: fine)").matches) return undefined

    /* --px/--py: the cursor as -1..1 from the hero's centre, eased so the
       plates trail the mouse like something with weight. --mx/--my: the raw
       position, for the halftone bloom. --cx/--cy: the ring, which lags
       further behind. */
    let targetX = 0, targetY = 0, x = 0, y = 0
    let rawX = -9999, rawY = -9999, ringX = -9999, ringY = -9999
    let frame = 0
    const buttons = [...el.querySelectorAll("[data-magnet]")]

    const tick = () => {
      x += (targetX - x) * 0.09
      y += (targetY - y) * 0.09
      if (ringX < -999) { ringX = rawX; ringY = rawY }
      ringX += (rawX - ringX) * 0.28
      ringY += (rawY - ringY) * 0.28
      el.style.setProperty("--px", x.toFixed(4))
      el.style.setProperty("--py", y.toFixed(4))
      el.style.setProperty("--cx", `${ringX.toFixed(1)}px`)
      el.style.setProperty("--cy", `${ringY.toFixed(1)}px`)
      const settled = Math.abs(targetX - x) < 0.0015 && Math.abs(targetY - y) < 0.0015 &&
        Math.abs(rawX - ringX) < 0.3 && Math.abs(rawY - ringY) < 0.3
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    /* The button nearest the cursor leans toward it a little - a few
       pixels, never enough to reach its neighbour - and settles back when
       the cursor moves on. Only one moves at a time. */
    const clamp = (v, limit) => Math.max(-limit, Math.min(limit, v))
    const magnetise = (clientX, clientY) => {
      let nearest = null, nearestDistance = Infinity
      for (const button of buttons) {
        const r = button.getBoundingClientRect()
        const dx = clientX - (r.left + r.width / 2)
        const dy = clientY - (r.top + r.height / 2)
        const within = Math.abs(dx) < r.width / 2 + 40 && Math.abs(dy) < r.height / 2 + 40
        const distance = Math.hypot(dx, dy)
        if (within && distance < nearestDistance) { nearest = button; nearestDistance = distance }
      }
      for (const button of buttons) {
        if (button !== nearest) { button.style.transform = ""; continue }
        const r = button.getBoundingClientRect()
        const dx = clientX - (r.left + r.width / 2)
        const dy = clientY - (r.top + r.height / 2)
        button.style.transform = `translate(${clamp(dx * 0.12, 6).toFixed(1)}px, ${clamp(dy * 0.16, 5).toFixed(1)}px)`
      }
    }

    /* What the custom cursor is over: a link or button, the name (which
       pulls another print), or plain sheet. */
    const cursorState = (target) => {
      const hit = target instanceof Element ? target.closest("a, button, h1") : null
      if (!hit) return "sheet"
      return hit.tagName === "H1" ? "pull" : "link"
    }

    const onMove = (event) => {
      const r = el.getBoundingClientRect()
      rawX = event.clientX - r.left
      rawY = event.clientY - r.top
      targetX = Math.max(-1, Math.min(1, (rawX / r.width - 0.5) * 2))
      targetY = Math.max(-1, Math.min(1, (rawY / r.height - 0.5) * 2))
      el.style.setProperty("--mx", `${rawX.toFixed(1)}px`)
      el.style.setProperty("--my", `${rawY.toFixed(1)}px`)
      el.dataset.pointer = "in"
      el.dataset.cursor = cursorState(event.target)
      magnetise(event.clientX, event.clientY)
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      el.style.setProperty("--mx", "-9999px")
      el.style.setProperty("--my", "-9999px")
      el.dataset.pointer = "out"
      el.dataset.cursor = "sheet"
      for (const button of buttons) button.style.transform = ""
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

  const registration = {
    "--ax": `${reg.ax}px`, "--ay": `${reg.ay}px`,
    "--bx": `${reg.bx}px`, "--by": `${reg.by}px`
  }

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.bloom} aria-hidden="true" />
      {/* The cursor, once a mouse is on the sheet: an instant dot where the
          pointer really is, a registration ring a beat behind it, and a
          label when the name can be pulled. The system cursor is hidden
          only while these are showing. */}
      <div className={styles.dot} aria-hidden="true" />
      <div className={styles.ring} aria-hidden="true"><span className={styles.cursorLabel}>Pull</span></div>
      <RegMark className={styles.regTL} />
      <RegMark className={styles.regTR} />
      <RegMark className={styles.regBL} />
      <RegMark className={styles.regBR} />

      <Band className={styles.bandTop} />
      <Band className={styles.bandBottom} />

      <div className={styles.heroIn}>
        <p className={`${styles.eyebrow} ${styles.rise}`}>UI/UX &amp; Visual Designer · New York</p>

        {/* Two plates of the same word. The outer span follows the cursor,
            the inner one carries the ink, the squeegee wipe and the drift,
            so the transforms never fight. Multiply on the plates makes the
            overlap purple. Re-keyed on every pull so the print runs again. */}
        <h1 id="hero-name" className={styles.op} aria-label="Lele Yang" title="Pull another print" onClick={pullPrint} style={registration}>
          <span key={pull} className={styles.sheet}>
            <span className={`${styles.plate} ${styles.plateA}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkA}`}>Lele</span></span>
            <span className={`${styles.plate} ${styles.plateB}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkB}`}>Lele</span></span>
            <span className={`${styles.squeegee} ${styles.squeegeeA}`} aria-hidden="true" />
            <span className={`${styles.squeegee} ${styles.squeegeeB}`} aria-hidden="true" />
          </span>
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
          <a className={styles.primary} href="#work" data-magnet="">Selected work <span aria-hidden="true">↓</span></a>
          <a className={styles.secondary} href="/resume.pdf" target="_blank" rel="noreferrer" data-magnet="">Resume <span aria-hidden="true">↗</span></a>
        </div>

        {/* The sheet's furniture, each at its own depth. */}
        <aside className={`${styles.marg} ${styles.marg1}`}>two inks, a few pixels<br />out of register —<br />on purpose</aside>
        <aside className={`${styles.marg} ${styles.marg2}`}>Lele · say it<br />like &ldquo;luh-luh&rdquo;</aside>
        <div className={styles.stampWrap} aria-hidden="true"><Stamp /></div>
        <div className={styles.strip} aria-hidden="true">
          {strip.map(([color, alpha, label]) => (
            <span key={label} className={styles.patch}><i style={{ background: color, opacity: alpha }} />{label}</span>
          ))}
        </div>
      </div>

      {/* The job ticket along the bottom edge: what this page is printed
          with, and how many pulls so far. The button is the keyboard route
          to another pull; the name itself is the mouse one. */}
      <p className={`${styles.ticket} ${styles.rise}`} style={{ animationDelay: "480ms" }}>
        <span className={styles.ticketLabel}>Printed in three inks</span>
        <span className={styles.swatch}><i style={{ background: "#222222" }} />Black</span>
        <span className={styles.swatch}><i style={{ background: "var(--ink-a)" }} />Fluorescent pink</span>
        <span className={styles.swatch}><i style={{ background: "var(--ink-b)" }} />Blue</span>
        <span className={styles.ticketStock}>on #e4e2e2 stock</span>
        <span className={styles.pullCount}>Pull {String(pull).padStart(2, "0")}</span>
        <button type="button" className={styles.pullButton} onClick={pullPrint}>Pull another <span aria-hidden="true">↻</span></button>
      </p>
    </section>
  )
}
