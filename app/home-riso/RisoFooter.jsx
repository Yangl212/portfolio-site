"use client"

import { useEffect, useRef, useState } from "react"

import styles from "./riso-footer.module.css"

/*
 * The back of the sheet. Black stock this time, with the closing line
 * printed in the same two inks: it is pulled as the footer scrolls into
 * view, follows the cursor the way the hero does, and the whole sheet is a
 * stamp pad - a click anywhere (except on a link) leaves a small job stamp
 * in one of the inks, which stays for the session.
 */
function RegMark({ className }) {
  return (
    <svg className={`${styles.reg} ${className}`} viewBox="0 0 20 20" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" fill="none"><path d="M10 0v20M0 10h20" /><circle cx="10" cy="10" r="5" /></g>
    </svg>
  )
}

const INKS = ["pink", "blue", "paper"]
const MAX_STAMPS = 14

export function RisoFooter() {
  const ref = useRef(null)
  /* "still" until we know the footer starts below the fold, then "armed"
     (plates hidden) and "in" once it scrolls into view. With no script the
     print is simply there. */
  const [phase, setPhase] = useState("still")
  const [stamps, setStamps] = useState([])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    if (el.getBoundingClientRect().top >= window.innerHeight * 0.9) setPhase("armed")
    else return undefined
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setPhase("in"); observer.disconnect() }
    }, { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    if (!window.matchMedia("(pointer: fine)").matches) return undefined
    let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0
    const tick = () => {
      x += (targetX - x) * 0.09
      y += (targetY - y) * 0.09
      el.style.setProperty("--px", x.toFixed(4))
      el.style.setProperty("--py", y.toFixed(4))
      frame = (Math.abs(targetX - x) > 0.0015 || Math.abs(targetY - y) > 0.0015) ? requestAnimationFrame(tick) : 0
    }
    const onMove = (event) => {
      const r = el.getBoundingClientRect()
      targetX = Math.max(-1, Math.min(1, ((event.clientX - r.left) / r.width - 0.5) * 2))
      targetY = Math.max(-1, Math.min(1, ((event.clientY - r.top) / r.height - 0.5) * 2))
      el.style.setProperty("--mx", `${(event.clientX - r.left).toFixed(1)}px`)
      el.style.setProperty("--my", `${(event.clientY - r.top).toFixed(1)}px`)
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      targetX = 0; targetY = 0
      el.style.setProperty("--mx", "-9999px"); el.style.setProperty("--my", "-9999px")
      if (!frame) frame = requestAnimationFrame(tick)
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); cancelAnimationFrame(frame) }
  }, [])

  const stamp = (event) => {
    if (event.target instanceof Element && event.target.closest("a, button")) return
    const r = ref.current.getBoundingClientRect()
    const next = {
      id: Date.now() + Math.random(),
      x: ((event.clientX - r.left) / r.width) * 100,
      y: ((event.clientY - r.top) / r.height) * 100,
      rotate: Math.round((Math.random() * 2 - 1) * 24),
      ink: INKS[Math.floor(Math.random() * INKS.length)]
    }
    setStamps((list) => [...list, next].slice(-MAX_STAMPS))
  }

  return (
    <footer ref={ref} className={styles.footer} data-phase={phase} onClick={stamp}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.bloom} aria-hidden="true" />
      <RegMark className={styles.regTL} />
      <RegMark className={styles.regTR} />
      <RegMark className={styles.regBL} />
      <RegMark className={styles.regBR} />

      <div className={styles.inner}>
        <h2 className={styles.op} aria-label="Stay curious, stay kind.">
          <span className={styles.sheet}>
            <span className={`${styles.plate} ${styles.plateA}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkA}`}>Stay curious,<br />stay kind.</span></span>
            <span className={`${styles.plate} ${styles.plateB}`} aria-hidden="true"><span className={`${styles.ink} ${styles.inkB}`}>Stay curious,<br />stay kind.</span></span>
            <span className={`${styles.squeegee} ${styles.squeegeeA}`} aria-hidden="true" />
            <span className={`${styles.squeegee} ${styles.squeegeeB}`} aria-hidden="true" />
          </span>
        </h2>

        <nav className={styles.contact} aria-label="Contact Lele Yang">
          <a href="mailto:Lelework1211@gmail.com">Lelework1211@gmail.com</a>
          <a href="https://www.linkedin.com/in/leleyang1211" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://www.instagram.com/shanjio17" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
        </nav>

        <p className={styles.ticket}>
          <span>&copy; Lele Yang</span>
          <span className={styles.hint}>Click anywhere to stamp the sheet</span>
        </p>
      </div>

      {stamps.map((item) => (
        <span key={item.id} className={styles.stamp} data-ink={item.ink} style={{ left: `${item.x}%`, top: `${item.y}%`, "--rot": `${item.rotate}deg` }} aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs><path id={`stamp-ring-${item.id}`} d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" /></defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
            <text className={styles.stampText}><textPath href={`#stamp-ring-${item.id}`}>Lele Yang · New York · Two inks · </textPath></text>
            <g stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M60 48v24M48 60h24" /></g>
          </svg>
        </span>
      ))}
    </footer>
  )
}
