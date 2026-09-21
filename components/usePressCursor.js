"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/*
 * The press mark that follows the cursor over a link: the same
 * registration ring and label the hero puts over its own name, factored
 * out on its own in case anything else in the header ever wants it.
 *
 * The ring is a fixed layer moved by one transform, written once a frame
 * from the pointer position rather than on the event itself - writing a
 * style from the event handler is what made the hero feel sticky before
 * this same fix went into it. It only exists while the pointer is
 * actually over the element, and only on a fine pointer: there is
 * nothing to follow on a touch screen, and a reader who has asked for
 * less motion keeps their own.
 *
 * Returns the props to spread on the trackable element and whether the
 * ring should be mounted; the caller renders the ring itself; a `ringRef`
 * to attach to it.
 */
export function usePressCursor() {
  const [tracking, setTracking] = useState(false)
  const ringRef = useRef(null)
  const point = useRef({ x: 0, y: 0 })
  const frame = useRef(0)

  const paint = useCallback(() => {
    frame.current = 0
    const ring = ringRef.current
    if (ring) ring.style.transform = `translate(${point.current.x}px, ${point.current.y}px)`
  }, [])

  const handlePointerMove = useCallback((event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    point.current = { x: event.clientX, y: event.clientY }
    if (!tracking) setTracking(true)
    if (!frame.current) frame.current = requestAnimationFrame(paint)
  }, [paint, tracking])

  const handlePointerLeave = useCallback(() => {
    setTracking(false)
  }, [])

  /* Paint once as soon as the ring appears, so it does not flash in at
     the last place the pointer was. */
  useEffect(() => {
    if (tracking) paint()
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = 0
    }
  }, [tracking, paint])

  return {
    tracking,
    ringRef,
    trackingProps: {
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      "data-tracking": tracking ? "true" : undefined
    }
  }
}
