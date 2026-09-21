"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { trackBase } from "../lib/projects"

import { BrandMark } from "./BrandMark"

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
  const pathname = usePathname()

  /*
   * The site is applied for on two self-contained tracks: "/" for UI/UX roles
   * and "/visual" for visual and brand roles. Each one closes back on itself -
   * every link in this header stays inside the track the reader came in on, and
   * neither track advertises the other. The only way across is a link sent
   * directly, which is the point: an application shows one portfolio, not both.
   *
   * Contact follows the same rule so a visual visitor cannot leak back into
   * the UI/UX home in two clicks.
   */
  const base = trackBase(track)
  const homeHref = base || "/"
  const isHomepage = pathname === homeHref
  const logoHref = isHomepage ? `${base}/about` : homeHref
  const logoLabel = isHomepage ? "Know more about me" : "Home page"

  const navItems = [
    { href: homeHref, label: "Work" },
    { href: `${base}/lab`, label: "Lab" }
  ]

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <BrandMark href={logoHref} label={logoLabel} onNavigate={closeMenu} />

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
          {/* prefetch is off on the routes this header points at: Next.js
             prefetches a static route in full, and React preloads the
             images in it, which would pull several MB of home-page covers
             into every case study at hydration. */}
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
          <Link
            className={styles.link}
            data-active={active === `${base}/resume`}
            href={`${base}/resume`}
            onClick={closeMenu}
            prefetch={false}
          >
            Resume <span aria-hidden="true">&#8594;</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
