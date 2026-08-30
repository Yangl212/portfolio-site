"use client"

import { useEffect } from "react"

/*
 * The case study figures are fixed-width Framer fragments. Each one is scaled
 * down to whatever width its section gives it, and the wrapper is collapsed to
 * the scaled height - transform: scale() shrinks a figure visually but leaves
 * its layout box at full height, which would otherwise open a gap below.
 */
export function ScaledFigures() {
  useEffect(() => {
    const figures = [...document.querySelectorAll("[data-cleared-figure]")]

    if (!figures.length) {
      return undefined
    }

    const layout = (figure) => {
      const inner = figure.firstElementChild

      if (!inner) {
        return
      }

      const width = Number(figure.dataset.figureWidth) || 1269
      const scale = Math.min(figure.clientWidth / width, 1)

      inner.style.transform = `scale(${scale})`
      // offsetHeight ignores transforms, so this stays the untransformed height.
      figure.style.height = `${Math.ceil(inner.offsetHeight * scale)}px`
    }

    const layoutAll = () => figures.forEach(layout)

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        layout(entry.target)
      }
    })

    figures.forEach((figure) => observer.observe(figure))
    layoutAll()

    // Late-loading fonts and screenshots change the untransformed height.
    document.fonts?.ready.then(layoutAll).catch(() => {})
    window.addEventListener("load", layoutAll)

    return () => {
      observer.disconnect()
      window.removeEventListener("load", layoutAll)
    }
  }, [])

  return null
}
