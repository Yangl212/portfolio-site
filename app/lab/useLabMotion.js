"use client"

import { useEffect } from "react"

// One animation loop for the board. Layout anchors stay still so a moving
// image never changes the pointer distance that drives its own movement.
export function useLabMotion(viewportRef, canvasRef, dragRef, items) {
  useEffect(() => {
    const viewport = viewportRef.current
    const canvas = canvasRef.current
    if (!viewport || !canvas) return

    const media = window.matchMedia("(min-width: 810px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
    const cards = [...canvas.children].map((anchor, index) => ({
      anchor,
      surface: anchor.firstElementChild,
      phase: index * 1.77 + 0.8,
      values: [0, 0, 0, 0, 0, 0]
    }))
    const pointer = { x: 0, y: 0, inside: false }
    let frame = 0
    let lastTime = 0
    let elapsed = 0

    const reset = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      for (const card of cards) {
        card.values.fill(0)
        card.surface.style.removeProperty("transform")
      }
    }

    const animate = (now) => {
      frame = 0
      if (!media.matches || document.hidden) return reset()

      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60
      lastTime = now
      elapsed += dt
      const ease = 1 - Math.exp(-6.5 * dt)
      const bounds = viewport.getBoundingClientRect()
      const rects = cards.map(({ anchor }) => anchor.getBoundingClientRect())
      let moving = false

      cards.forEach((card, index) => {
        const rect = rects[index]
        const visible = rect.right > bounds.left && rect.left < bounds.right && rect.bottom > bounds.top && rect.top < bounds.bottom
        const focused = card.anchor.contains(document.activeElement)
        const active = pointer.inside && visible && !dragRef.current && !focused
        const target = [0, 0, 0, 0, 0, 0]

        if (active) {
          const dx = pointer.x - (rect.left + rect.width / 2)
          const dy = pointer.y - (rect.top + rect.height / 2)
          const distance = Math.hypot(Math.max(Math.abs(dx) - rect.width / 2, 0), Math.max(Math.abs(dy) - rect.height / 2, 0))
          const strength = 0.18 + 0.82 * Math.max(0, 1 - distance / 300)
          const x = Math.max(-1, Math.min(1, dx / (rect.width / 2)))
          const y = Math.max(-1, Math.min(1, dy / (rect.height / 2)))
          const t = elapsed
          const p = card.phase

          // Different periods and phases give each piece an unhurried orbit,
          // plus a small lift and tilt towards the pointer.
          target[0] = (Math.sin(t * 0.66 + p) * 8 + Math.cos(t * 0.37 + p * 1.43) * 3 + x * 6) * strength
          target[1] = (Math.cos(t * 0.54 + p) * 9 + Math.sin(t * 0.83 + p * 0.7) * 3 + y * 4) * strength
          target[2] = (-y * 2 + Math.cos(t * 0.38 + p) * 0.5) * strength
          target[3] = (x * 2 + Math.sin(t * 0.51 + p) * 0.5) * strength
          target[4] = (Math.sin(t * 0.42 + p) * 1.2 + x * 0.6) * strength
          target[5] = (0.006 + (1 + Math.sin(t * 0.78 + p)) * 0.006) * strength
        }

        card.values = card.values.map((value, axis) => value + (target[axis] - value) * ease)
        const unsettled = card.values.some(value => Math.abs(value) > 0.001)
        if (active || unsettled) {
          const [x, y, tiltX, tiltY, rotation, scale] = card.values
          card.surface.style.transform = `perspective(1100px) translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0) rotateX(${tiltX.toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg) rotateZ(${rotation.toFixed(3)}deg) scale(${(1 + scale).toFixed(5)})`
          moving = true
        } else {
          card.values.fill(0)
          card.surface.style.removeProperty("transform")
        }
      })

      if (moving) frame = window.requestAnimationFrame(animate)
      else lastTime = 0
    }

    const wake = () => {
      if (!frame && media.matches && !document.hidden) frame = window.requestAnimationFrame(animate)
    }
    const follow = event => {
      if (event.pointerType !== "mouse") return
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.inside = true
      wake()
    }
    const leave = () => {
      pointer.inside = false
      wake()
    }
    const changeMode = () => {
      pointer.inside = false
      reset()
    }

    viewport.addEventListener("pointermove", follow, { passive: true })
    viewport.addEventListener("pointerleave", leave)
    viewport.addEventListener("pointerup", wake)
    viewport.addEventListener("lostpointercapture", wake)
    viewport.addEventListener("scroll", wake, { passive: true })
    viewport.addEventListener("focusin", wake)
    viewport.addEventListener("focusout", wake)
    media.addEventListener("change", changeMode)
    document.addEventListener("visibilitychange", changeMode)
    window.addEventListener("blur", changeMode)

    return () => {
      reset()
      viewport.removeEventListener("pointermove", follow)
      viewport.removeEventListener("pointerleave", leave)
      viewport.removeEventListener("pointerup", wake)
      viewport.removeEventListener("lostpointercapture", wake)
      viewport.removeEventListener("scroll", wake)
      viewport.removeEventListener("focusin", wake)
      viewport.removeEventListener("focusout", wake)
      media.removeEventListener("change", changeMode)
      document.removeEventListener("visibilitychange", changeMode)
      window.removeEventListener("blur", changeMode)
    }
  }, [viewportRef, canvasRef, dragRef, items])
}
