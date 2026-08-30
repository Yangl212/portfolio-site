"use client"

import { useEffect } from "react"

/*
 * Scroll reveal, as progressive enhancement.
 *
 * The markup ships fully visible. The hidden start state is added here, at
 * runtime, so a disabled or failed script leaves the page complete rather than
 * blank. Anything already on screen at mount is skipped, so nothing above the
 * fold flashes in.
 *
 * Deliberately a plain scroll/resize check rather than IntersectionObserver:
 * the reveal is synchronous with the scroll event, which makes the "is this
 * element still hidden?" question answerable at any moment instead of
 * depending on when an async callback happens to be delivered.
 *
 * Selectors are passed in per page because CSS-module class names are hashed
 * at build time - and they need the leading dot.
 */
export function Reveal({ fade = "", bars = "", barsUp = "" }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const groups = [
      [fade, "data-reveal"],
      [bars, "data-reveal-bar"],
      [barsUp, "data-reveal-bar-up"]
    ]

    let pending = []

    for (const [selector, attr] of groups) {
      if (!selector) continue

      for (const el of document.querySelectorAll(selector)) {
        // Already on screen at mount - leave it finished.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue

        // Bars in one row arrive in sequence rather than all at once.
        if (attr !== "data-reveal") {
          const siblings = el.parentElement ? [...el.parentElement.children] : []
          const index = Math.max(0, siblings.indexOf(el))
          el.style.transitionDelay = `${Math.min(index * 70, 280)}ms`
        }

        el.setAttribute(attr, "")
        pending.push({ el, attr })
      }
    }

    if (!pending.length) return

    // Runs straight off the scroll event, not through rAF. The list is small
    // and only ever shrinks, and the listeners come off as soon as it empties,
    // so the reads cost nothing worth deferring - and the reveal is guaranteed
    // to have happened by the time the event handler returns.
    function check() {
      const limit = window.innerHeight * 0.92
      const remaining = []

      for (const item of pending) {
        const rect = item.el.getBoundingClientRect()
        if (rect.top < limit && rect.bottom > 0) {
          item.el.setAttribute(item.attr, "in")
        } else {
          remaining.push(item)
        }
      }

      pending = remaining
      if (!pending.length) stop()
    }

    function stop() {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }

    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check)
    check()

    return () => {
      stop()
      // Never leave anything stuck in the hidden start state.
      for (const { el, attr } of pending) {
        el.removeAttribute(attr)
        el.style.transitionDelay = ""
      }
    }
  }, [fade, bars, barsUp])

  return null
}
