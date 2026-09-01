"use client"

import Link from "next/link"
import { useState } from "react"

import { trackBase } from "../lib/projects"

import styles from "./site-shell.module.css"

/* One resume per track: the UI/UX track hands out the product resume, the
   visual track the visual one. Both live in /public. */
const resumeByTrack = {
  uiux: "/resume.pdf",
  visual: "/resume-visual.pdf"
}

export const resumeUrl = resumeByTrack.uiux

export function resumeUrlFor(track) {
  return resumeByTrack[track] || resumeByTrack.uiux
}

export function SiteHeader({ active = "/", track = "uiux" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  /*
   * The site is applied for on two self-contained tracks: "/" for UI/UX roles
   * and "/visual" for visual and brand roles. Each one closes back on itself -
   * every link in this header stays inside the track the reader came in on, and
   * neither track advertises the other. The only way across is a link sent
   * directly, which is the point: an application shows one portfolio, not both.
   *
   * That has to cover Interest and Let's talk as well as Work. Leaving those two
   * unprefixed was enough to leak a visual visitor back into the UI/UX home in
   * two clicks.
   */
  const base = trackBase(track)
  const homeHref = base || "/"

  const navItems = [
    { href: homeHref, label: "Work" },
    { href: `${base}/interest`, label: "Interest" }
  ]

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* prefetch is off on both routes the header points at. Next.js
           prefetches a static route in full, and React preloads the images
           in it, so leaving it on pulls several MB of home-page covers into
           every case study at hydration - starving the demo videos of
           bandwidth before the reader has scrolled anywhere near them. */}
        <Link href={homeHref} className={styles.brand} onClick={closeMenu} prefetch={false}>
          {"Lele Yang\u00AE"}
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="site-navigation"
          className={styles.nav}
          data-open={isMenuOpen}
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={styles.link}
              data-active={active === item.href}
              href={item.href}
              onClick={closeMenu}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
          <a
            className={styles.link}
            href={resumeUrlFor(track)}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Resume
          </a>
          <Link className={styles.cta} href={`${base}/contact`} onClick={closeMenu}>
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  )
}
