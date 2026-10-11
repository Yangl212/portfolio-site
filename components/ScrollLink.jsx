"use client"

/* Glides the page to a section instead of jumping, with the same ease as
   the home page's Selected Work button, and stops short of the floating
   quick nav. Where the section should come to rest is measured again on
   every frame: the quick nav changes height once it docks, and images
   above the section can finish loading on the way down. Any scroll of the
   reader's own takes the wheel back; reduced motion jumps. */
export function glideTo(target) {
  const dockTop = window.matchMedia("(max-width: 700px)").matches ? 8 : 12
  const destination = () => {
    const barHeight = document.querySelector("[data-floating]")?.getBoundingClientRect().height || 64
    return Math.max(0, Math.round(window.scrollY + target.getBoundingClientRect().top - dockTop - barHeight - 18))
  }
  const from = window.scrollY
  const to = destination()

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(to - from) < 2) {
    window.scrollTo(0, to)
    return
  }
  const duration = Math.min(1150, Math.max(650, Math.abs(to - from) * 0.75))
  const start = performance.now()
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  let frame = 0
  const stop = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener("wheel", stop)
    window.removeEventListener("touchstart", stop)
    window.removeEventListener("keydown", stop)
  }
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo(0, from + (destination() - from) * ease(t))
    if (t < 1) { frame = requestAnimationFrame(step); return }
    stop()
  }
  window.addEventListener("wheel", stop, { passive: true })
  window.addEventListener("touchstart", stop, { passive: true })
  window.addEventListener("keydown", stop)
  frame = requestAnimationFrame(step)
}

/* An in-page link that glides to its section. A modified click or a
   missing target falls back to the plain anchor. */
export function ScrollLink({ href, className, children }) {
  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()
    window.history.replaceState(null, "", href)
    glideTo(target)
  }

  return <a className={className} href={href} onClick={onClick}>{children}</a>
}
