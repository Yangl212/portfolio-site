"use client"

import { useEffect, useRef } from "react"
import { LAB_PERIOD } from "./lab-items"

const wrap = (value, period) => ((value % period) + period) % period
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

export function useLabCanvas(viewportRef, canvasRef, tiles) {
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const viewport = viewportRef.current
    const canvas = canvasRef.current
    const desktop = window.matchMedia("(min-width: 810px)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const pointer = { x: 0, y: 0, inside: false }
    const speed = { x: 0, y: 0 }
    const edgeSpeed = { x: 0, y: 0 }
    let drag = null
    let frame = 0
    let lastTime = 0
    let elapsed = 0
    let bounds = viewport.getBoundingClientRect()
    const cards = [...canvas.querySelectorAll("[data-lab-item]")].map(anchor => ({
      anchor,
      surface: anchor.firstElementChild,
      x: Number(anchor.dataset.x),
      y: Number(anchor.dataset.y),
      width: anchor.offsetWidth,
      height: anchor.offsetHeight,
      phase: Number(anchor.dataset.labItem) * 1.77 + .8,
      values: [0, 0, 0, 0]
    }))
    const cardAt = new Map(cards.map(card => [`${card.x}:${card.y}`, card]))

    // Only the position wraps. Repeated tiles meet at exactly the same pixels,
    // so panning never hits an edge and never grows the DOM.
    const paintPosition = () => {
      const x = wrap(position.current.x, LAB_PERIOD.width)
      const y = wrap(position.current.y, LAB_PERIOD.height)
      const crossedX = Math.round((position.current.x - x) / LAB_PERIOD.width) * LAB_PERIOD.width
      const crossedY = Math.round((position.current.y - y) / LAB_PERIOD.height) * LAB_PERIOD.height
      if (crossedX || crossedY) {
        // A neighboring tile now occupies the same screen position. Pass its
        // breathing state along too, avoiding a small hover jump at the seam.
        const values = cards.map(card => [...(cardAt.get(`${card.x - crossedX}:${card.y - crossedY}`)?.values || [0, 0, 0, 0])])
        cards.forEach((card, index) => { card.values = values[index] })
      }
      position.current.x = x
      position.current.y = y
      canvas.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`
      canvas.dataset.panX = String(position.current.x)
      canvas.dataset.panY = String(position.current.y)
    }

    const resetMotion = () => {
      for (const card of cards) {
        card.values.fill(0)
        card.surface.style.removeProperty("transform")
      }
    }

    const tick = now => {
      frame = 0
      if (!desktop.matches || document.hidden) return
      const dt = lastTime ? Math.min((now - lastTime) / 1000, .05) : 1 / 60
      lastTime = now
      elapsed += dt
      let moving = false

      const edgeZone = Math.min(260, Math.max(140, Math.min(bounds.width, bounds.height) * .25))
      const edgeAxis = (value, length) => {
        if (value < edgeZone) return Math.pow(1 - value / edgeZone, 1.35)
        if (value > length - edgeZone) return -Math.pow(1 - (length - value) / edgeZone, 1.35)
        return 0
      }
      const edgeTarget = !drag && !reduced.matches && fine.matches && pointer.inside
        ? { x: edgeAxis(pointer.x, bounds.width) * 260, y: edgeAxis(pointer.y, bounds.height) * 260 }
        : { x: 0, y: 0 }
      const edgeEase = 1 - Math.exp(-7 * dt)
      edgeSpeed.x += (edgeTarget.x - edgeSpeed.x) * edgeEase
      edgeSpeed.y += (edgeTarget.y - edgeSpeed.y) * edgeEase
      const edgeMoving = Math.abs(edgeSpeed.x) > .35 || Math.abs(edgeSpeed.y) > .35

      if (edgeTarget.x || edgeTarget.y) speed.x = speed.y = 0
      if (!drag && edgeMoving) {
        position.current.x += edgeSpeed.x * dt
        position.current.y += edgeSpeed.y * dt
        moving = true
      }

      if (!drag && !edgeMoving && !reduced.matches && (Math.abs(speed.x) > 2 || Math.abs(speed.y) > 2)) {
        position.current.x += speed.x * dt
        position.current.y += speed.y * dt
        const friction = Math.exp(-5.5 * dt)
        speed.x *= friction
        speed.y *= friction
        moving = true
      }
      paintPosition()

      if (!reduced.matches && fine.matches) {
        const ease = 1 - Math.exp(-6 * dt)
        for (const card of cards) {
          const x = card.x + position.current.x
          const y = card.y + position.current.y
          const visible = x + card.width > -24 && x < bounds.width + 24 && y + card.height > -24 && y < bounds.height + 24
          const active = visible && pointer.inside && !drag
          const target = [0, 0, 0, 0]
          if (active) {
            const dx = pointer.x - (x + card.width / 2)
            const dy = pointer.y - (y + card.height / 2)
            const distance = Math.hypot(Math.max(Math.abs(dx) - card.width / 2, 0), Math.max(Math.abs(dy) - card.height / 2, 0))
            const strength = .15 + .85 * Math.max(0, 1 - distance / 320)
            const t = elapsed, p = card.phase
            target[0] = (Math.sin(t * .66 + p) * 5 + clamp(dx / 90, -1, 1) * 3) * strength
            target[1] = (Math.cos(t * .54 + p) * 6 + Math.sin(t * .83 + p) * 2) * strength
            target[2] = Math.sin(t * .42 + p) * .8 * strength
            target[3] = (.005 + (1 + Math.sin(t * .78 + p)) * .004) * strength
          }
          card.values = card.values.map((value, i) => value + (target[i] - value) * ease)
          if (active || card.values.some(value => Math.abs(value) > .001)) {
            const [dx, dy, rotation, scale] = card.values
            card.surface.style.transform = `translate3d(${dx.toFixed(3)}px, ${dy.toFixed(3)}px, 0) rotate(${rotation.toFixed(3)}deg) scale(${(1 + scale).toFixed(5)})`
            moving = true
          } else {
            card.surface.style.removeProperty("transform")
          }
        }
      }
      if (moving) frame = requestAnimationFrame(tick)
      else lastTime = 0
    }

    const wake = () => {
      if (!frame && desktop.matches && !document.hidden) frame = requestAnimationFrame(tick)
    }
    const measure = () => {
      bounds = viewport.getBoundingClientRect()
      for (const card of cards) {
        card.width = card.anchor.offsetWidth
        card.height = card.anchor.offsetHeight
      }
      wake()
    }
    const follow = event => {
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.inside = event.pointerType === "mouse" && pointer.x >= 0 && pointer.x <= bounds.width && pointer.y >= 0 && pointer.y <= bounds.height
      if (drag?.id === event.pointerId) {
        const now = performance.now()
        const dt = Math.max((now - drag.time) / 1000, .008)
        const dx = event.clientX - drag.x
        const dy = event.clientY - drag.y
        position.current.x += dx
        position.current.y += dy
        speed.x = clamp(dx / dt, -1800, 1800)
        speed.y = clamp(dy / dt, -1800, 1800)
        drag.x = event.clientX
        drag.y = event.clientY
        drag.time = now
      }
      wake()
    }
    const start = event => {
      if (!desktop.matches || !event.isPrimary || event.button !== 0) return
      event.preventDefault()
      viewport.focus({ preventScroll: true })
      speed.x = speed.y = 0
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now() }
      viewport.setPointerCapture(event.pointerId)
      viewport.dataset.dragging = "true"
      wake()
    }
    const end = event => {
      if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.id)) return
      const id = drag.id
      if (performance.now() - drag.time > 90 || event.type !== "pointerup") speed.x = speed.y = 0
      drag = null
      delete viewport.dataset.dragging
      if (viewport.hasPointerCapture(id)) viewport.releasePointerCapture(id)
      wake()
    }
    const leave = () => { pointer.inside = false; wake() }
    const wheel = event => {
      if (!desktop.matches || event.ctrlKey) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? bounds.height : 1
      const dx = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX
      const dy = event.shiftKey && !event.deltaX ? 0 : event.deltaY
      position.current.x -= dx * unit
      position.current.y -= dy * unit
      speed.x = speed.y = 0
      wake()
    }
    const keyboard = event => {
      if (!desktop.matches || event.target !== viewport) return
      const step = event.shiftKey ? 240 : 80
      const moves = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }
      if (!moves[event.key]) return
      event.preventDefault()
      const [x, y] = moves[event.key]
      position.current.x += x
      position.current.y += y
      speed.x = speed.y = 0
      wake()
    }
    const pause = () => {
      pointer.inside = false
      speed.x = speed.y = 0
      edgeSpeed.x = edgeSpeed.y = 0
      if (drag) end({ type: "cancel" })
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      resetMotion()
    }

    paintPosition()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    viewport.addEventListener("pointerdown", start)
    viewport.addEventListener("pointermove", follow)
    viewport.addEventListener("pointerup", end)
    viewport.addEventListener("pointercancel", end)
    viewport.addEventListener("lostpointercapture", end)
    viewport.addEventListener("pointerleave", leave)
    viewport.addEventListener("wheel", wheel, { passive: false })
    viewport.addEventListener("keydown", keyboard)
    desktop.addEventListener("change", pause)
    reduced.addEventListener("change", pause)
    fine.addEventListener("change", pause)
    document.addEventListener("visibilitychange", pause)
    window.addEventListener("blur", pause)
    return () => {
      pause()
      observer.disconnect()
      viewport.removeEventListener("pointerdown", start)
      viewport.removeEventListener("pointermove", follow)
      viewport.removeEventListener("pointerup", end)
      viewport.removeEventListener("pointercancel", end)
      viewport.removeEventListener("lostpointercapture", end)
      viewport.removeEventListener("pointerleave", leave)
      viewport.removeEventListener("wheel", wheel)
      viewport.removeEventListener("keydown", keyboard)
      desktop.removeEventListener("change", pause)
      reduced.removeEventListener("change", pause)
      fine.removeEventListener("change", pause)
      document.removeEventListener("visibilitychange", pause)
      window.removeEventListener("blur", pause)
    }
  }, [viewportRef, canvasRef, tiles])
}
