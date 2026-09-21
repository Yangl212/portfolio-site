"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

import { aboutReady, trackBase } from "../../lib/projects"

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
 *      random misregistration.
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

function Band({ className, text }) {
  return (
    <div className={`${styles.band} ${className}`} aria-hidden="true">
      <div className={styles.bandTrack}>
        <span>{text}{text}</span>
        <span>{text}{text}</span>
      </div>
    </div>
  )
}

/* Everything about the hero that reads as a claim about who is applying,
   rather than about the print itself (the stamp, the ink strip, the
   registration marks stay the same either way) - one lookup, the way the
   header's own resumeByTrack is one lookup, so a page only has to pass
   its track through and never repeat this copy. */
const HERO_COPY = {
  uiux: {
    eyebrow: "UI/UX & Visual Designer · New York",
    subline: "UI/UX designer with a visual designer’s eye: interfaces people can trust, and the data, brand and print work around them.",
    facts: ["Parsons MFA ’26", "Previously at VortexNet", "Open to roles across the U.S."],
    band: "UI/UX design · Data visualization · Brand & print · AI interfaces · Riso zines · New York · "
  },
  visual: {
    eyebrow: "Visual & Brand Designer · New York",
    subline: "Visual & brand designer with an eye for systems: identity, illustration, and print work built to hold together.",
    facts: ["Parsons MFA ’26", "Former UI/UX Design Intern at VortexNet", "Seeking Visual & Brand Design roles"],
    band: "Brand identity · Illustration · Game & board design · Riso zines · Print · New York · "
  }
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

/* Three places the handwritten note can be written around the word; the
   step of two walks all three without repeating. */
const HINT_SPOTS = 3
/* Mirrors --t-rest in page.module.css: when the print has settled. */
const HINT_REST = 2300
/* About opens only once the print is finished - both plates down and the
   sheet at rest - and then rises slowly. */
const ABOUT_DELAY = 2400

/* A fresh misregistration for every pull: around the same few pixels, never
   the same twice. */
const jitter = (base, spread) => Math.round((base + (Math.random() * 2 - 1) * spread) * 10) / 10
const newRegistration = () => ({
  ax: jitter(-5, 3), ay: jitter(-4, 2),
  bx: jitter(5, 3), by: jitter(4, 2)
})

export function RisoHero({ track = "uiux" }) {
  const base = trackBase(track)
  const copy = HERO_COPY[track] || HERO_COPY.uiux
  const ref = useRef(null)
  const [pull, setPull] = useState(1)
  const [reg, setReg] = useState({ ax: -5, ay: -4, bx: 5, by: 4 })
  /* The handwritten note: which of the three places around the word it is
     written in, and whether it is on the sheet at the moment. */
  const [hint, setHint] = useState({ spot: 0, on: false })

  /* The print is the front door. Do not let browser scroll restoration or
     an old #work URL reopen the page halfway down at Selected Work. */
  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`
      )
    }

    const resetToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    resetToTop()
    const frame = requestAnimationFrame(resetToTop)
    window.addEventListener("pageshow", resetToTop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pageshow", resetToTop)
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  /* Pressing the name pulls another print, and where About is written,
     it rises over the print once the ink has settled - the route is
     prefetched on mount so the rise never waits on a fetch. Where it is
     not, the press is just the print: nothing to open, nothing to
     prefetch. */
  const router = useRouter()
  const openTimer = useRef(0)
  const canOpenAbout = aboutReady(track)

  useEffect(() => {
    if (!canOpenAbout) return undefined
    router.prefetch(`${base}/about`)
    return () => clearTimeout(openTimer.current)
  }, [router, base, canOpenAbout])

  const pullPrint = useCallback(() => {
    setPull((n) => n + 1)
    setReg(newRegistration())
    if (!canOpenAbout) return
    clearTimeout(openTimer.current)
    openTimer.current = setTimeout(() => router.push(`${base}/about`), ABOUT_DELAY)
  }, [router, base, canOpenAbout])

  /* The note is taken off the sheet the moment a print starts and written
     back on once the ink has settled - somewhere else each time, so it is
     never quite where it was left. HINT_REST mirrors --t-rest in the
     stylesheet, which is when the print finishes. */
  useEffect(() => {
    setHint((current) => (current.on ? { ...current, on: false } : current))
    const timer = setTimeout(() => {
      setHint({ spot: (pull * 2 + 1) % HINT_SPOTS, on: true })
    }, HINT_REST)
    return () => clearTimeout(timer)
  }, [pull])

  /* Selected work walks the page down rather than cutting to it: the sheet
     slides for about a second on an ease, so the reader keeps their place.
     Any scroll of their own takes the wheel back. Reduced motion, a modified
     click or a missing target all fall back to the plain anchor.

     The hash is deliberately not written to the address bar: with #work on
     the URL, a reload - or the page reopened from history - would skip the
     print and land on Selected Work, and the print is the page. */
  const scrollToWork = useCallback((event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById("work")
    if (!target) return
    const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    const from = window.scrollY
    const to = Math.max(0, Math.round(from + target.getBoundingClientRect().top - offset))
    event.preventDefault()
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(to - from) < 2) {
      window.scrollTo(0, to)
      return
    }
    const duration = Math.min(1150, Math.max(650, Math.abs(to - from) * 0.75))
    const start = performance.now()
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    let frame = 0
    const stop = () => { cancelAnimationFrame(frame); window.removeEventListener("wheel", stop); window.removeEventListener("touchstart", stop); window.removeEventListener("keydown", stop) }
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      window.scrollTo(0, from + (to - from) * ease(t))
      if (t < 1) { frame = requestAnimationFrame(step); return }
      stop()
    }
    window.addEventListener("wheel", stop, { passive: true })
    window.addEventListener("touchstart", stop, { passive: true })
    window.addEventListener("keydown", stop)
    frame = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    if (!window.matchMedia("(pointer: fine)").matches) return undefined

    /* --px/--py: the cursor as -1..1 from the hero's centre, eased so the
       plates trail the mouse like something with weight. --mx/--my: the raw
       position, for the halftone bloom and the dot. --cx/--cy: the ring,
       which lags further behind.

       Everything here happens once per frame, never on the pointer event
       itself: a move only records where the cursor is. Reading a box or
       writing a style from the event handler meant a layout and a style
       recalculation for every one of the hundred-odd moves a second a fine
       pointer reports, which is what made the sheet feel sticky. The boxes
       are measured once and re-measured only when the page moves under
       them, and each style is written only when its value has changed. */
    const bloom = el.querySelector(`.${styles.bloom}`)
    const dot = el.querySelector(`.${styles.dot}`)
    const ring = el.querySelector(`.${styles.ring}`)

    let targetX = 0, targetY = 0, x = 0, y = 0
    let rawX = -9999, rawY = -9999, ringX = -9999, ringY = -9999
    let clientX = -9999, clientY = -9999, moveTarget = null
    let pointerIn = false, moved = false, frame = 0, stale = true
    let rect = null
    const buttons = [...el.querySelectorAll("[data-magnet]")]
    /* Base centres, i.e. where each button sits with its magnet offset
       taken back off - measuring a button that is already leaning would
       feed its own offset back in. */
    const centres = buttons.map(() => ({ x: 0, y: 0, w: 0, h: 0 }))
    const offsets = buttons.map(() => ({ x: 0, y: 0 }))
    const written = new WeakMap()

    const measure = () => {
      rect = el.getBoundingClientRect()
      buttons.forEach((button, i) => {
        const r = button.getBoundingClientRect()
        centres[i].x = r.left + r.width / 2 - offsets[i].x
        centres[i].y = r.top + r.height / 2 - offsets[i].y
        centres[i].w = r.width
        centres[i].h = r.height
      })
      stale = false
    }

    const write = (node, prop, value) => {
      if (!node) return
      let last = written.get(node)
      if (!last) { last = {}; written.set(node, last) }
      if (last[prop] === value) return
      last[prop] = value
      node.style.setProperty(prop, value)
    }

    /* The button nearest the cursor leans toward it a little - a few
       pixels, never enough to reach its neighbour - and settles back when
       the cursor moves on. Only one moves at a time. */
    const clamp = (v, limit) => Math.max(-limit, Math.min(limit, v))
    const magnetise = () => {
      let nearest = -1, nearestDistance = Infinity
      centres.forEach((c, i) => {
        const dx = clientX - c.x
        const dy = clientY - c.y
        if (Math.abs(dx) > c.w / 2 + 40 || Math.abs(dy) > c.h / 2 + 40) return
        const distance = Math.hypot(dx, dy)
        if (distance < nearestDistance) { nearest = i; nearestDistance = distance }
      })
      buttons.forEach((button, i) => {
        const offset = offsets[i]
        let nx = 0, ny = 0
        if (i === nearest) {
          nx = clamp((clientX - centres[i].x) * 0.12, 6)
          ny = clamp((clientY - centres[i].y) * 0.16, 5)
        }
        if (Math.abs(nx - offset.x) < 0.1 && Math.abs(ny - offset.y) < 0.1) return
        offset.x = nx
        offset.y = ny
        button.style.transform = nx || ny ? `translate(${nx.toFixed(1)}px, ${ny.toFixed(1)}px)` : ""
      })
    }

    /* What the custom cursor is over: a link or button, the name (which
       pulls another print), or plain sheet. */
    const cursorState = (target) => {
      const hit = target instanceof Element ? target.closest("a, button, h1") : null
      if (!hit) return "sheet"
      return hit.tagName === "H1" ? "pull" : "link"
    }

    const tick = () => {
      frame = 0

      if (moved) {
        moved = false
        if (stale || !rect) measure()
        rawX = clientX - rect.left
        rawY = clientY - rect.top
        targetX = Math.max(-1, Math.min(1, (rawX / rect.width - 0.5) * 2))
        targetY = Math.max(-1, Math.min(1, (rawY / rect.height - 0.5) * 2))
        const mx = `${rawX.toFixed(1)}px`
        const my = `${rawY.toFixed(1)}px`
        write(bloom, "--mx", mx)
        write(bloom, "--my", my)
        write(dot, "--mx", mx)
        write(dot, "--my", my)
        const state = cursorState(moveTarget)
        if (el.dataset.pointer !== "in") el.dataset.pointer = "in"
        if (el.dataset.cursor !== state) el.dataset.cursor = state
        magnetise()
      }

      x += (targetX - x) * 0.09
      y += (targetY - y) * 0.09
      if (ringX < -999) { ringX = rawX; ringY = rawY }
      ringX += (rawX - ringX) * 0.28
      ringY += (rawY - ringY) * 0.28
      write(el, "--px", x.toFixed(4))
      write(el, "--py", y.toFixed(4))
      write(ring, "--cx", `${ringX.toFixed(1)}px`)
      write(ring, "--cy", `${ringY.toFixed(1)}px`)

      const settled = Math.abs(targetX - x) < 0.0015 && Math.abs(targetY - y) < 0.0015 &&
        Math.abs(rawX - ringX) < 0.3 && Math.abs(rawY - ringY) < 0.3
      if (!settled) frame = requestAnimationFrame(tick)
    }

    const request = () => { if (!frame) frame = requestAnimationFrame(tick) }

    const onMove = (event) => {
      clientX = event.clientX
      clientY = event.clientY
      moveTarget = event.target
      pointerIn = true
      moved = true
      request()
    }

    const onLeave = () => {
      pointerIn = false
      moved = false
      targetX = 0
      targetY = 0
      rawX = -9999
      rawY = -9999
      write(bloom, "--mx", "-9999px")
      write(bloom, "--my", "-9999px")
      write(dot, "--mx", "-9999px")
      write(dot, "--my", "-9999px")
      el.dataset.pointer = "out"
      el.dataset.cursor = "sheet"
      buttons.forEach((button, i) => {
        offsets[i].x = 0
        offsets[i].y = 0
        button.style.transform = ""
      })
      request()
    }

    /* The hero moves under the cursor when the page scrolls or resizes, so
       the cached boxes are thrown away rather than read back every move. */
    const invalidate = () => {
      stale = true
      if (pointerIn) request()
    }

    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    window.addEventListener("scroll", invalidate, { passive: true })
    window.addEventListener("resize", invalidate)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("scroll", invalidate)
      window.removeEventListener("resize", invalidate)
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
      {/* The halftone thins out into plain paper towards the bottom edge
          instead of stopping at the section rule. */}
      <div className={styles.fade} aria-hidden="true" />
      {/* The cursor, once a mouse is on the sheet: an instant dot where the
          pointer really is, a registration ring a beat behind it, and a
          label when the name can be pulled. The system cursor is hidden
          only while these are showing. */}
      <div className={styles.dot} aria-hidden="true" />
      <div className={styles.ring} aria-hidden="true"><span className={styles.cursorLabel}>{canOpenAbout ? "Know more about me" : "Pull"}</span></div>
      <RegMark className={styles.regTL} />
      <RegMark className={styles.regTR} />
      <RegMark className={styles.regBL} />
      <RegMark className={styles.regBR} />

      <Band className={styles.bandTop} text={copy.band} />
      <Band className={styles.bandBottom} text={copy.band} />

      <div className={styles.heroIn}>
        <p className={`${styles.eyebrow} ${styles.rise}`}>{copy.eyebrow}</p>

        {/* Two plates of the same word. The outer span follows the cursor,
            the inner one carries the ink, the squeegee wipe and the drift,
            so the transforms never fight. Multiply on the plates makes the
            overlap purple. Re-keyed on every pull so the print runs again. */}
        <h1 id="hero-name" className={styles.op} aria-label="Lele Yang" onClick={pullPrint} style={registration}>
          {/* Pencilled in beside the word once the print has settled: the
              only handwriting on the sheet, and the only thing that says
              the word is a thing you can press. It is rubbed out at the
              start of the next print and written back somewhere else. */}
          <span className={styles.clickHint} data-on={hint.on} data-spot={hint.spot} aria-hidden="true">
            <svg className={styles.hintArrow} viewBox="0 0 48 40" fill="none">
              <path d="M45 32C33 35 17 29 9 11M9 11l12 3M9 11l3 13" />
            </svg>
            <span className={styles.hintWord}>click!</span>
          </span>
          <span key={pull} className={styles.sheet}>
            <span className={`${styles.plate} ${styles.plateA}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkA}`}>Lele</span></span>
            <span className={`${styles.plate} ${styles.plateB}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkB}`}>Lele</span></span>
            <span className={`${styles.squeegee} ${styles.squeegeeA}`} aria-hidden="true" />
            <span className={`${styles.squeegee} ${styles.squeegeeB}`} aria-hidden="true" />
          </span>
        </h1>

        <p className={`${styles.opSub} ${styles.rise}`} style={{ animationDelay: "160ms" }}>
          {copy.subline}
        </p>

        <p className={`${styles.opFacts} ${styles.rise}`} style={{ animationDelay: "240ms" }}>
          {copy.facts.map((fact) => <span key={fact}>{fact}</span>)}
        </p>

        <div className={`${styles.opActions} ${styles.rise}`} style={{ animationDelay: "320ms" }}>
          <a className={styles.primary} href="#work" data-magnet="" onClick={scrollToWork}>Selected work <span aria-hidden="true">↓</span></a>
          <Link className={`${styles.secondary} ${styles.lab}`} href={`${base}/lab`} data-magnet="" prefetch={false}>Lab <span aria-hidden="true">→</span></Link>
          <Link className={styles.secondary} href={`${base}/resume`} data-magnet="" prefetch={false}>Resume <span aria-hidden="true">→</span></Link>
        </div>

        {/* The sheet's furniture, each at its own depth. */}
        <aside className={`${styles.marg} ${styles.marg1}`}>two inks, slightly<br />out of register —<br />on purpose</aside>
        <div className={styles.stampWrap} aria-hidden="true"><Stamp /></div>
        <div className={styles.strip} aria-hidden="true">
          {strip.map(([color, alpha, label]) => (
            <span key={label} className={styles.patch}><i style={{ background: color, opacity: alpha }} /></span>
          ))}
        </div>
      </div>

    </section>
  )
}
