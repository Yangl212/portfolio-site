"use client"

import { useEffect } from "react"

const desktopWidth = 1440

export function CaseStudyResponsiveLayout() {
  useEffect(() => {
    const container = document.getElementById("case-study-root")
    const content = container?.querySelector("#main")
    // Content appended after #main isn't part of its scrollHeight, so its height must be added separately.
    const trailingContent = container?.querySelector("#appended-interface-design-section")

    if (!container || !content) {
      return undefined
    }

    const updateLayout = () => {
      const availableWidth = Math.min(container.clientWidth, window.innerWidth)
      const scale = Math.min(availableWidth / desktopWidth, 1)
      const trailingHeight = trailingContent?.scrollHeight ?? 0
      // transform: scale() shrinks #main visually but not its layout box, so trailing
      // siblings sit below its untransformed height — pull them up to close that gap.
      const scaleGap = content.scrollHeight * (1 - scale)

      container.style.setProperty("--case-study-scale", String(scale), "important")
      content.style.setProperty("transform", `scale(${scale})`, "important")
      container.style.height = `${Math.ceil((content.scrollHeight + trailingHeight) * scale)}px`
      if (trailingContent) {
        trailingContent.style.marginTop = `${-scaleGap}px`
      }
    }

    const observer = new ResizeObserver(updateLayout)
    observer.observe(container)
    observer.observe(content)
    if (trailingContent) {
      observer.observe(trailingContent)
    }
    updateLayout()

    return () => observer.disconnect()
  }, [])

  return null
}
