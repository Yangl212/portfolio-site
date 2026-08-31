"use client"

import { useLayoutEffect, useRef } from "react"

/* Injected into the embedded document rather than patched into the file it
   loads. The bundled prototypes paint their own ground on <body>, and every
   re-export from the design tool restores it, so a hand-edit to the bundle
   only survives until the next export. */
const TRANSPARENT_STYLE_ID = "__host-transparent"
const TRANSPARENT_CSS = [
  "html,body{background:transparent!important}",
  /* The unpack placeholder paints a full-bleed light rect. A CSS fill beats
     the presentation attribute, so the ground never flashes before the real
     document arrives. */
  "#__bundler_thumbnail rect{fill:none!important}"
].join("")

export function ScaledIframe({
  src,
  title,
  width,
  height,
  maxDisplayWidth = width,
  className,
  frameClassName,
  transparent = false
}) {
  const viewportRef = useRef(null)
  const frameRef = useRef(null)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const frame = frameRef.current

    if (!viewport || !frame) return undefined

    const resizeFrame = () => {
      const scale = Math.min(1, viewport.getBoundingClientRect().width / width)
      frame.style.transform = `scale(${scale})`
    }

    resizeFrame()

    const resizeObserver = new ResizeObserver(resizeFrame)
    resizeObserver.observe(viewport)

    return () => resizeObserver.disconnect()
  }, [width])

  useLayoutEffect(() => {
    const frame = frameRef.current

    if (!transparent || !frame) return undefined

    let observer

    const applyStyle = () => {
      try {
        const doc = frame.contentDocument

        if (!doc || !doc.head || doc.getElementById(TRANSPARENT_STYLE_ID)) return

        const style = doc.createElement("style")
        style.id = TRANSPARENT_STYLE_ID
        style.textContent = TRANSPARENT_CSS
        doc.head.appendChild(style)
      } catch {
        /* A cross-origin src cannot be restyled from here; leave it alone. */
      }
    }

    /* The bundle unpacks itself by swapping the whole documentElement, which
       discards anything injected beforehand. Watching the document node for
       that one swap re-applies the style without observing the prototype's own
       (constant) DOM churn underneath it. */
    const watchDocument = () => {
      try {
        const doc = frame.contentDocument

        if (!doc) return

        applyStyle()
        observer?.disconnect()
        observer = new MutationObserver(applyStyle)
        observer.observe(doc, { childList: true })
      } catch {
        /* Same as above. */
      }
    }

    watchDocument()
    frame.addEventListener("load", watchDocument)

    return () => {
      frame.removeEventListener("load", watchDocument)
      observer?.disconnect()
    }
  }, [transparent, src])

  return (
    <div
      ref={viewportRef}
      className={className}
      style={{ maxWidth: `${maxDisplayWidth}px`, aspectRatio: `${width} / ${height}` }}
    >
      <iframe
        ref={frameRef}
        className={frameClassName}
        src={src}
        title={title}
        width={width}
        height={height}
        loading="lazy"
      />
    </div>
  )
}
