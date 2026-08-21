"use client"

import Link from "next/link"
import { useState } from "react"

import styles from "./site-shell.module.css"

export const resumeUrl =
  "https://drive.google.com/file/d/1JIz9VXiV1uDP5mMBTB01crdDZLiVhh8C/view?usp=sharing"

const navItems = [
  { href: "/", label: "About" },
  { href: "/project", label: "Project" },
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
        <Link href="/" className={styles.brand} onClick={closeMenu}>
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
