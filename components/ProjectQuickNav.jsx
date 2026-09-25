"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { trackHome } from "../lib/projects"

import styles from "./project-quick-nav.module.css"

const projectSections = {
  "boa-budgeting": [
    ["experience", "Experience"],
    ["prototype", "Prototype"],
    ["research", "Research"],
    ["testing", "Evaluation"],
    ["web", "Web"]
  ],
  vortexnet: [
    ["result", "Redesign"],
    ["testing", "Results"],
    ["start", "Problem"],
    ["iteration", "Decisions"],
    ["navigation", "Navigation"],
    ["reflection", "Trade-offs"]
  ],
  lastmessage: [
    ["experience", "Experience"],
    ["investigation-flow", "Investigation"],
    ["ai-behavior", "AI behavior"],
    ["playtesting", "Playtesting"],
    ["figma-to-build", "Build"]
  ],
  cleared: [
    ["context", "Context"],
    ["experience", "Design"],
    ["trust", "AI & trust"],
    ["mobile-ui", "Mobile"],
    ["prototype", "Prototype"],
    ["validation", "Evaluation"]
  ],
  backstage: [
    ["problem", "Problem"],
    ["design", "Design"],
    ["research", "Research"],
    ["direction", "Direction"],
    ["iteration", "Iteration"],
    ["reflection", "Reflection"]
  ],
  graveyard: [
    ["problem", "Problem"],
    ["research", "Research"],
    ["concept", "Concept"],
    ["experience", "Experience"],
    ["visual-design", "Visual design"]
  ],
  taroo: [
    ["product", "Product"],
    ["idea", "Idea"],
    ["decisions", "Decisions"],
    ["positioning", "Positioning"],
    ["brand", "Brand"],
    ["reflection", "Reflection"]
  ],
  alcohol: [
    ["book", "The book"],
    ["idea", "Idea"],
    ["direction", "Direction"],
    ["highlights", "Highlights"],
    ["spreads", "Spreads"],
    ["reflection", "Reflection"]
  ],
  bubu: [
    ["problem", "Problem"],
    ["bet", "The bet"],
    ["match", "Matching"],
    ["receipt", "Daily loop"],
    ["report", "Weekly report"],
    ["next", "Where it stands"]
  ],
  suglar: [
    ["product", "Product"],
    ["idea", "Idea"],
    ["decisions", "Decisions"],
    ["iteration", "Iteration"],
    ["visual-system", "Visual system"],
    ["results", "Results"]
  ]
}

export function ProjectQuickNav({ slug, track = "uiux" }) {
  const sections = projectSections[slug] || []
  const [active, setActive] = useState(sections[0]?.[0] || "")
  const [floating, setFloating] = useState(false)
  const slotRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    if (!sections.length) return

    let frame = 0

    const update = () => {
      frame = 0
      const slot = slotRef.current
      if (!slot) return

      const bounds = slot.getBoundingClientRect()
      const dockTop = window.matchMedia("(max-width: 700px)").matches ? 8 : 12
      setFloating(bounds.top <= dockTop)

      const marker = Math.min(window.innerHeight * 0.32, 280)
      let next = sections[0][0]

      for (const [id] of sections) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) next = id
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        next = sections[sections.length - 1][0]
      }

      setActive((current) => current === next ? current : next)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [sections])

  useEffect(() => {
    const nav = linksRef.current
    if (!nav) return

    const item = [...nav.children].find((child) => child.dataset.section === active)
    if (!item) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const centerActive = () => {
      if (!window.matchMedia("(max-width: 700px)").matches) {
        nav.scrollTo({ left: 0, behavior: "auto" })
        return
      }
      const left = item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2
      nav.scrollTo({ left, behavior: reduced ? "auto" : "smooth" })
    }
    centerActive()
    const resizeObserver = new ResizeObserver(centerActive)
    resizeObserver.observe(nav)
    return () => resizeObserver.disconnect()
  }, [active])

  if (!sections.length) return null

  const goToSection = (event, id) => {
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dockTop = window.matchMedia("(max-width: 700px)").matches ? 8 : 12
    const barHeight = slotRef.current?.firstElementChild?.getBoundingClientRect().height || 64
    const top = target.getBoundingClientRect().top + window.scrollY - dockTop - barHeight - 18
    window.history.replaceState(null, "", `#${id}`)
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" })
    setActive(id)
  }

  return (
    <div className={styles.slot} ref={slotRef}>
      <div className={styles.bar} data-floating={floating}>
        <Link className={styles.back} href={trackHome(track)} prefetch={false} aria-label="Back to all projects">
          <span className={styles.backArrow} aria-hidden="true">&#8592;</span>
          <span className={styles.backLabel}>Work</span>
        </Link>
        <nav className={styles.links} aria-label="On this project" ref={linksRef}>
          {sections.map(([id, label], index) => (
            <a
              className={styles.link}
              data-active={active === id}
              data-section={id}
              href={`#${id}`}
              key={id}
              onClick={(event) => goToSection(event, id)}
              aria-current={active === id ? "location" : undefined}
            >
              <span className={styles.linkIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.linkLabel}>{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
