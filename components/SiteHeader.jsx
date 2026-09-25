"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { dictionary, t } from "../lib/dictionary"
import { withLocale } from "../lib/locale"
import { pageBase } from "../lib/projects"
import { requestScrollToWork } from "../lib/scrollIntent"

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

export function SiteHeader({ active = "/", track = "uiux", locale = "en" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const copy = t(locale)

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
  const base = pageBase(track, locale)
  const homeHref = base || "/"
  const isHomepage = pathname === homeHref
  const logoHref = isHomepage ? `${base}/about` : homeHref
  const logoLabel = isHomepage ? copy.nav.knowMore : copy.nav.home

  /* Work always points at Selected Work, not just the home route: from
     any other page it should land past the print, not back at the top
     of it. On the home page itself the hash is a same-page anchor and
     Next's default scroll-into-view handles it, so the flag below is
     only set when the click is actually leaving the current page. */
  const navItems = [
    { href: `${homeHref}#work`, activeHref: homeHref, label: copy.nav.work, onClick: isHomepage ? undefined : requestScrollToWork },
    { href: `${base}/lab`, label: copy.nav.lab }
  ]

  /* The locale switch only ever flips language, never track - the same
     silo rule the comment above draws for track itself. Both languages
     show at once, like a real switch rather than a single button whose
     label changes - EN and 中 sit side by side, the current one lit. The
     lit side is plain text, not a link: it is already the page you are
     on, so nothing under it should be clickable. The other side is a
     real navigation to the /zh URL (or back off it), not client state,
     so it survives a reload and is a link search engines can follow
     both ways. */
  const localeOptions = [
    { code: "en", label: "EN", switchTo: dictionary.en.localeToggle.switchTo },
    { code: "zh", label: "中", switchTo: dictionary.zh.localeToggle.switchTo }
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
              data-active={active === (item.activeHref ?? item.href)}
              href={item.href}
              onClick={(event) => {
                item.onClick?.(event)
                closeMenu()
              }}
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
            {copy.nav.resume} <span aria-hidden="true">&#8594;</span>
          </Link>
          <div className={styles.localeSwitch} role="group" aria-label="Language">
            {localeOptions.map((option) => {
              const isCurrent = option.code === locale
              return isCurrent ? (
                <span key={option.code} className={styles.localeOption} data-active="true" aria-current="true">
                  {option.label}
                </span>
              ) : (
                <Link
                  key={option.code}
                  className={styles.localeOption}
                  href={withLocale(pathname, option.code)}
                  onClick={closeMenu}
                  prefetch={false}
                  aria-label={option.switchTo}
                >
                  {option.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
