"use client"

import { useEffect } from "react"

/*
 * Brings each line of the page up as it is scrolled to, the way the page
 * this one is modelled on does.
 *
 * The sheet scrolls inside itself rather than with the document, so the
 * observer is rooted on the sheet and not on the viewport - rooted on the
 * viewport it would think everything was already on screen and show the
 * lot at once. Observing starts after the sheet has finished rising, so
 * the first screenful arrives as the sheet lands rather than under it.
 */
export function Reveal({ delay = 760 }) {
  useEffect(() => {
    const root = document.querySelector("[data-about-sheet]")
    if (!root) return undefined

    const targets = [...root.querySelectorAll("[data-reveal]")]
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const target of targets) target.dataset.shown = "true"
      return undefined
    }

    let observer = null
    const start = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.dataset.shown = "true"
            observer.unobserve(entry.target)
          }
        },
        { root, rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
      )
      for (const target of targets) observer.observe(target)
    }, delay)

    return () => {
      clearTimeout(start)
      if (observer) observer.disconnect()
    }
  }, [delay])

  return null
}
