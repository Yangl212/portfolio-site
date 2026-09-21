"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

import styles from "./featured-stacks.module.css"

/*
 * Selected Work as three stages. Each project is a small stack of its own
 * screens - phones, a laptop, crops of the dashboard - lying on a tinted
 * sheet with a stat chip or two. They settle into place as the section
 * scrolls in, fan out when the pointer is over them, and lean with it.
 *
 * Every image is one the site already ships. Chips either scope a test result
 * to its task or state the capability the project demonstrates.
 *
 * Layer geometry is in percent of the stage: x/y the top-left, w the width;
 * r the resting rotation. dx/dy/dr/ds are the hover move, spin and scale.
 * depth is how far the layer leans with the pointer.
 */
const media = (name) => name.startsWith("/") ? name : `/home-riso/${name}.webp`

const stacks = {
  "boa-budgeting": {
    when: "2026 · 8 weeks",
    role: "UI/UX Designer",
    summary: "A mobile and web budgeting redesign for Bank of America, tested across two task rounds.",
    tint: "pink",
    layers: [
      { kind: "cut", src: "/boa/screen2.png", x: 1, y: 18, w: 28, r: -9, dx: -18, dy: -14, dr: -13, depth: 0.7, z: 1 },
      { kind: "cut", src: "/boa/screen3.png", x: 71, y: 16, w: 28, r: 8, dx: 18, dy: -16, dr: 13, depth: 0.7, z: 1 },
      { kind: "cut", src: "/boa/screen1.png", x: 34, y: 3, w: 32, r: 0, dx: 0, dy: -12, dr: -1, ds: 1.04, depth: 1, z: 3 },
      { kind: "chip", text: "Budget reallocation · unassisted 2/6 → 5/6", x: 0, y: 4, r: -4, dx: -8, dy: -8, dr: -7, depth: 0.5, z: 4 },
      { kind: "chip", text: "Spot overspending · median 41 s → 24 s", x: 34, y: 66, r: 4, dx: 10, dy: 10, dr: 7, depth: 0.5, z: 4 }
    ]
  },
  vortexnet: {
    when: "2025 · Jun – Oct",
    role: "UI/UX Design Intern",
    summary: "Task-based information hierarchy for a 30-person company’s finance dashboard, shipped during the internship.",
    tint: "blue",
    layers: [
      { kind: "shot", src: "vortexnet-screen", x: 8, y: 16, w: 84, r: 0, dx: 0, dy: 4, dr: -2, ds: 1.04, depth: 0.4, z: 1 },
      { kind: "shot", src: "vortexnet-nav", x: -3, y: 38, w: 34, r: -8, dx: -28, dy: 18, dr: -14, depth: 1, z: 3 },
      { kind: "shot", src: "vortexnet-metrics", x: 48, y: 0, w: 50, r: 5, dx: 26, dy: -26, dr: 11, depth: 0.9, z: 3 },
      { kind: "shot", src: "vortexnet-priorities", x: 42, y: 70, w: 58, r: 3, dx: 24, dy: 24, dr: 8, depth: 0.7, z: 2 },
      { kind: "chip", text: "Daily lookup 20–30 s → ~8 s", x: 3, y: 4, r: -4, dx: -16, dy: -14, dr: -8, depth: 0.5, z: 4 }
    ]
  },
  lastmessage: {
    when: "2026 · 4 months",
    role: "Product design · AI behavior · Web development",
    summary: "A playable browser-based AI detective game, designed and developed end to end across the investigation, character behavior, and interface.",
    tint: "pink",
    layers: [
      { kind: "cut", src: "lastmessage-laptop", x: 6, y: 30, w: 88, r: 0, dx: 0, dy: 8, dr: 2, ds: 1.05, depth: 0.5, z: 2 },
      { kind: "shot", src: "lastmessage-chat", x: -2, y: 4, w: 46, r: -9, dx: -30, dy: -24, dr: -16, depth: 1, z: 3 },
      { kind: "shot", src: "lastmessage-routes", x: 56, y: 0, w: 46, r: 8, dx: 30, dy: -26, dr: 14, depth: 0.9, z: 3 },
      { kind: "shot", src: "lastmessage-boundary", x: 56, y: 60, w: 42, r: 4, dx: 28, dy: 24, dr: 9, depth: 0.7, z: 1 },
      { kind: "chip", text: "Playable AI conversations", x: 1, y: 5, r: -5, dx: -12, dy: -12, dr: -9, depth: 0.5, z: 4 },
      { kind: "chip", text: "UX/UI · AI behavior · web development", x: 31, y: 69, r: 4, dx: 14, dy: 14, dr: 8, depth: 0.5, z: 4 }
    ]
  }
}

function layerStyle(layer, index) {
  return {
    "--x": `${layer.x}%`,
    "--y": `${layer.y}%`,
    "--w": `${layer.w}%`,
    "--r": `${layer.r}deg`,
    "--dx": `${layer.dx}px`,
    "--dy": `${layer.dy}px`,
    "--dr": `${layer.dr}deg`,
    "--ds": layer.ds || 1,
    "--depth": layer.depth,
    "--z": layer.z,
    "--i": index
  }
}

function Stage({ project, stack }) {
  const ref = useRef(null)

  /* The layers lean toward the pointer, each by its own depth. */
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    if (!window.matchMedia("(pointer: fine)").matches) return undefined
    const onMove = (event) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty("--sx", (((event.clientX - r.left) / r.width - 0.5) * 2).toFixed(3))
      el.style.setProperty("--sy", (((event.clientY - r.top) / r.height - 0.5) * 2).toFixed(3))
      el.style.setProperty("--cursor-x", `${(event.clientX - r.left).toFixed(1)}px`)
      el.style.setProperty("--cursor-y", `${(event.clientY - r.top).toFixed(1)}px`)
    }
    const onLeave = () => {
      el.style.setProperty("--sx", "0")
      el.style.setProperty("--sy", "0")
      el.style.removeProperty("--cursor-x")
      el.style.removeProperty("--cursor-y")
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave) }
  }, [])

  return (
    <Link ref={ref} href={project.href} className={styles.stage} data-tint={stack.tint} aria-label={`${project.title}: view case study`}>
      <span className={styles.sheet} aria-hidden="true" />
      {stack.layers.map((layer, index) => (
        <span key={layer.src || layer.text} className={styles.slot} style={layerStyle(layer, index)} aria-hidden="true">
          {layer.kind === "chip"
            ? <span className={`${styles.layer} ${styles.chip}`}>{layer.text}</span>
            : <img className={`${styles.layer} ${layer.kind === "shot" ? styles.shot : styles.cut}`} src={media(layer.src)} alt="" loading="lazy" decoding="async" />}
        </span>
      ))}
      <span className={styles.plate}>
        <span className={styles.when}>{stack.when}</span>
        <strong>{project.title} <span className={styles.arrow} aria-hidden="true">→</span></strong>
      </span>
    </Link>
  )
}

export function FeaturedStacks({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => {
        const stack = stacks[project.slug]
        if (!stack) return null
        return (
          <article key={project.slug} className={styles.card}>
            <Stage project={project} stack={stack} />
            <div className={styles.copy}>
              <p className={styles.description}>{stack.summary}</p>
              <p className={styles.role}><span>Role</span> — {stack.role}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
