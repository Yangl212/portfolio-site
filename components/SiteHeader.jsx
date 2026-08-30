"use client"

import Link from "next/link"
import { useState } from "react"

import styles from "./site-shell.module.css"

export const resumeUrl =
  "/resume.pdf"

const navItems = [
  { href: "/", label: "Work" },
  { href: "/interest", label: "Interest" }
]

export function SiteHeader({ active = "/" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        <Link href="/" className={styles.brand} onClick={closeMenu} prefetch={false}>
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
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Resume
          </a>
          <Link className={styles.cta} href="/contact" onClick={closeMenu}>
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  )
}
