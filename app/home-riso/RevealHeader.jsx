"use client"

import { useEffect, useState } from "react"

import { SiteHeader } from "../../components/SiteHeader"
import { trackHome } from "../../lib/projects"

import styles from "./page.module.css"

/*
 * The site header, docked to the top of the viewport but kept out of the
 * way while the printed sheet is on screen. It slides in once the reader has
 * scrolled most of the way through the hero - as Selected Work arrives -
 * and slides back out on the way up. The hero carries its own Resume and
 * Selected-work actions, so nothing is unreachable while it is hidden.
 */
export function RevealHeader({ track, locale = "en" }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * 0.82)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check) }
    check()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={styles.headerDock} data-visible={visible}>
      <SiteHeader active={trackHome(track, locale)} track={track} locale={locale} />
    </div>
  )
}
