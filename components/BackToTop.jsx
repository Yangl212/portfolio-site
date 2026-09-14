"use client"

import { useEffect, useState } from "react"

import styles from "./back-to-top.module.css"

/*
 * A way back up from the bottom of a long case study.
 *
 * It stays faint until it is pointed at, so on a page that is mostly images it
 * reads as a mark in the corner rather than a control competing with them. It
 * only exists once there is something to go back to - one screen of scrolling.
 */
export function BackToTop({ showAfter = 1 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => setVisible(window.scrollY > window.innerHeight * showAfter)

    check()
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)

    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [showAfter])

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={toTop}
    >
      <span aria-hidden="true">&#8593;</span>
    </button>
  )
}
