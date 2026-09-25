"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { t } from "../lib/dictionary"
import { trackHome } from "../lib/projects"

import styles from "./project-quick-nav.module.css"

/* Each section is [id, { en, zh }] - the id is also the DOM anchor, so it
   never translates; only the label shown in the bar does. */
const projectSections = {
  "boa-budgeting": [
    ["experience", { en: "Experience", zh: "经历" }],
    ["prototype", { en: "Prototype", zh: "原型" }],
    ["research", { en: "Research", zh: "调研" }],
    ["testing", { en: "Evaluation", zh: "评估" }],
    ["web", { en: "Web", zh: "网页版" }]
  ],
  vortexnet: [
    ["result", { en: "Redesign", zh: "重新设计" }],
    ["testing", { en: "Results", zh: "结果" }],
    ["start", { en: "Problem", zh: "问题" }],
    ["iteration", { en: "Decisions", zh: "决策" }],
    ["navigation", { en: "Navigation", zh: "导航" }],
    ["reflection", { en: "Trade-offs", zh: "取舍" }]
  ],
  lastmessage: [
    ["experience", { en: "Experience", zh: "体验" }],
    ["investigation-flow", { en: "Investigation", zh: "调查流程" }],
    ["ai-behavior", { en: "AI behavior", zh: "AI 行为" }],
    ["playtesting", { en: "Playtesting", zh: "测试" }],
    ["figma-to-build", { en: "Build", zh: "开发" }]
  ],
  cleared: [
    ["context", { en: "Context", zh: "背景" }],
    ["experience", { en: "Design", zh: "设计" }],
    ["trust", { en: "AI & trust", zh: "AI 与信任" }],
    ["mobile-ui", { en: "Mobile", zh: "移动端" }],
    ["prototype", { en: "Prototype", zh: "原型" }],
    ["validation", { en: "Evaluation", zh: "评估" }]
  ],
  backstage: [
    ["problem", { en: "Problem", zh: "问题" }],
    ["design", { en: "Design", zh: "设计" }],
    ["research", { en: "Research", zh: "调研" }],
    ["direction", { en: "Direction", zh: "方向" }],
    ["iteration", { en: "Iteration", zh: "迭代" }],
    ["reflection", { en: "Reflection", zh: "反思" }]
  ],
  graveyard: [
    ["problem", { en: "Problem", zh: "问题" }],
    ["research", { en: "Research", zh: "调研" }],
    ["concept", { en: "Concept", zh: "概念" }],
    ["experience", { en: "Experience", zh: "体验" }],
    ["visual-design", { en: "Visual design", zh: "视觉设计" }]
  ],
  taroo: [
    ["product", { en: "Product", zh: "成品" }],
    ["idea", { en: "Idea", zh: "想法" }],
    ["decisions", { en: "Decisions", zh: "决策" }],
    ["positioning", { en: "Positioning", zh: "定位" }],
    ["brand", { en: "Brand", zh: "品牌" }],
    ["reflection", { en: "Reflection", zh: "反思" }]
  ],
  alcohol: [
    ["book", { en: "The book", zh: "这本书" }],
    ["idea", { en: "Idea", zh: "想法" }],
    ["direction", { en: "Direction", zh: "方向" }],
    ["highlights", { en: "Highlights", zh: "亮点" }],
    ["spreads", { en: "Spreads", zh: "内页" }],
    ["reflection", { en: "Reflection", zh: "反思" }]
  ],
  bubu: [
    ["why", { en: "Why", zh: "为什么" }],
    ["how", { en: "How it works", zh: "怎么运作" }],
    ["testing", { en: "Testing", zh: "访谈" }],
    ["look", { en: "The look", zh: "视觉" }],
    ["cast", { en: "The cast", zh: "小人" }],
    ["flow", { en: "The map", zh: "全图" }],
    ["screens", { en: "Every screen", zh: "全部界面" }],
    ["shipping", { en: "Shipping", zh: "上架" }]
  ],
  suglar: [
    ["product", { en: "Product", zh: "成品" }],
    ["idea", { en: "Idea", zh: "想法" }],
    ["decisions", { en: "Decisions", zh: "决策" }],
    ["iteration", { en: "Iteration", zh: "迭代" }],
    ["visual-system", { en: "Visual system", zh: "视觉系统" }],
    ["results", { en: "Results", zh: "结果" }]
  ]
}

export function ProjectQuickNav({ slug, track = "uiux", locale = "en" }) {
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
        <Link className={styles.back} href={trackHome(track, locale)} prefetch={false} aria-label={t(locale).projectNav.back}>
          <span className={styles.backArrow} aria-hidden="true">&#8592;</span>
          <span className={styles.backLabel}>{t(locale).projectNav.back}</span>
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
              <span className={styles.linkLabel}>{label[locale] || label.en}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
