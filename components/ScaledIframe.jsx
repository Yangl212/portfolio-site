"use client"

import { useLayoutEffect, useRef } from "react"

export function ScaledIframe({
  src,
  title,
  width,
  height,
  maxDisplayWidth = width,
  className,
  frameClassName
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
