"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

import { PressRing } from "../../components/PressRing"
import { usePressCursor } from "../../components/usePressCursor"

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
 * `facets` is the one line a recruiter scans before the summary: what the
 * thing runs on, who paid for it (B2B or B2C), and the field it sits in.
 * Three short tags, always in that order, so the three cards read as one
 * table rather than three blurbs.
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
    facets: ["Mobile + Web", "B2C", "Banking"],
    tint: "pink",
    layers: [
      { kind: "cut", src: "/boa/screen2.png", x: 1, y: 18, w: 28, r: -9, dx: -18, dy: -14, dr: -13, depth: 0.7, z: 1 },
      { kind: "cut", src: "/boa/screen3.png", x: 71, y: 16, w: 28, r: 8, dx: 18, dy: -16, dr: 13, depth: 0.7, z: 1 },
      { kind: "cut", src: "/boa/screen1.png", x: 34, y: 3, w: 32, r: 0, dx: 0, dy: -12, dr: -1, ds: 1.04, depth: 1, z: 3 },
      { kind: "chip", text: "Budget reallocation · unassisted 2/6 → 5/6", x: 0, y: 4, r: -4, dx: -8, dy: -8, dr: -7, depth: 0.5, z: 4 },
      /* The longest chip on the board: starts far enough left that even
         its hover drift stays inside the stage. */
      { kind: "chip", text: "Spot overspending · median 41 s → 24 s", x: 30, y: 66, r: 4, dx: 10, dy: 10, dr: 7, depth: 0.5, z: 4 }
    ]
  },
  vortexnet: {
    when: "2025 · Jun – Oct",
    role: "UI/UX Design Intern",
    summary: "Task-based information hierarchy for a 30-person company’s finance dashboard, shipped during the internship.",
    facets: ["Web app", "B2B internal", "Fintech"],
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
    role: "Product Design & Development",
    summary: "A playable browser-based AI detective game, designed and developed end to end across the investigation, character behavior, and interface.",
    facets: ["Browser game", "B2C", "AI · Narrative"],
    tint: "pink",
    layers: [
      { kind: "cut", src: "lastmessage-laptop", x: 6, y: 30, w: 88, r: 0, dx: 0, dy: 8, dr: 2, ds: 1.05, depth: 0.5, z: 2 },
      { kind: "shot", src: "lastmessage-chat", x: -2, y: 4, w: 46, r: -9, dx: -30, dy: -24, dr: -16, depth: 1, z: 3 },
      { kind: "shot", src: "lastmessage-routes", x: 56, y: 0, w: 46, r: 8, dx: 30, dy: -26, dr: 14, depth: 0.9, z: 3 },
      { kind: "shot", src: "lastmessage-boundary", x: 56, y: 60, w: 42, r: 4, dx: 28, dy: 24, dr: 9, depth: 0.7, z: 1 },
      { kind: "chip", text: "Playable AI conversations", x: 1, y: 5, r: -5, dx: -12, dy: -12, dr: -9, depth: 0.5, z: 4 },
      { kind: "chip", text: "UX/UI · AI behavior · web development", x: 31, y: 69, r: 4, dx: 14, dy: 14, dr: 8, depth: 0.5, z: 4 }
    ]
  },
  /* TAROO and Suglar lead the visual track's Selected Work, so they need
     a stack too - the same three cards already cut for their More Work
     folder in lib/projects.js, laid out here as a fanned hand instead of
     a folder's worth of paper. `when` is the year alone rather than a
     duration: unlike the three case studies above, no task-tested weeks
     figure exists for either project to report. */
  taroo: {
    when: "2025",
    role: "Brand & Illustration Design",
    summary: "A tarot brand for people drawn to good design rather than fortune telling - 22 Major Arcana cards, packaging, and the visual system behind them.",
    facets: ["Print + Packaging", "B2C", "Brand"],
    tint: "pink",
    layers: [
      { kind: "cut", src: "/Taroo/card1.png", x: 6, y: 20, w: 28, r: -10, dx: -16, dy: -12, dr: -15, depth: 0.7, z: 1 },
      { kind: "cut", src: "/Taroo/card3.png", x: 64, y: 20, w: 28, r: 9, dx: 16, dy: -12, dr: 14, depth: 0.7, z: 1 },
      { kind: "cut", src: "/Taroo/card2.png", x: 35, y: 4, w: 30, r: 0, dx: 0, dy: -14, dr: -1, ds: 1.05, depth: 1, z: 3 },
      { kind: "chip", text: "22 Major Arcana · one visual system", x: 2, y: 4, r: -4, dx: -10, dy: -10, dr: -8, depth: 0.5, z: 4 },
      { kind: "chip", text: "Packaging + card system", x: 30, y: 68, r: 4, dx: 12, dy: 12, dr: 7, depth: 0.5, z: 4 }
    ]
  },
  suglar: {
    when: "2024",
    role: "Visual & Game Design",
    summary: "Translating the color, texture, and emotion of candy into a board game where sweetness becomes strategy.",
    facets: ["Board game", "B2C", "Game · Visual"],
    tint: "blue",
    layers: [
      /* The box's own background is close to opaque edge to edge, so
         anything behind it only reads if it sits past the box's own
         footprint rather than under the middle of it - card1 moves out
         past the left edge for exactly that reason, the same way card3
         already clears the right edge. Both stay behind the box now. */
      { kind: "cut", src: "/suglar/box.png", x: 0, y: 2, w: 100, r: 2, dx: 4, dy: -8, dr: 3, ds: 1.02, depth: 0.6, z: 2 },
      { kind: "cut", src: "/suglar/card3.png", x: 80, y: 20, w: 16, r: 13, dx: 16, dy: 10, dr: 18, depth: 0.6, z: 1 },
      { kind: "cut", src: "/suglar/card1.png", x: 2, y: 42, w: 19, r: -15, dx: -16, dy: -8, dr: -20, depth: 0.7, z: 1 },
      { kind: "chip", text: "Color & texture → game rules", x: 1, y: 5, r: -5, dx: -12, dy: -12, dr: -9, depth: 0.5, z: 4 },
      { kind: "chip", text: "Sweetness becomes strategy", x: 40, y: 78, r: 4, dx: 14, dy: 14, dr: 8, depth: 0.5, z: 4 }
    ]
  },
  /* The app in hand, and the book it keeps: the home screen on a phone
     at the front, and behind it the weekly journal lying open - me on
     the left page, the buddy on the right - with two of the week's
     polaroids come loose off its top edge and the app icon set down
     in the corner. */
  bubu: {
    when: "2026",
    role: "Product Design",
    summary: "A weight-loss app for two: buddies log meals as receipts, race each other to a shared goal, and fill one food journal together.",
    facets: ["iOS app", "B2C", "Health · Social"],
    tint: "pink",
    layers: [
      { kind: "cut", src: "/bubu/book.webp", x: 32, y: 11, w: 67, r: 0, dx: 16, dy: -4, dr: 3, depth: 0.5, z: 1 },
      { kind: "cut", src: "/bubu/polaroid-salad.webp", x: 57, y: 3, w: 14, r: 0, dx: -6, dy: -20, dr: -8, ds: 1.06, depth: 1, z: 2 },
      { kind: "cut", src: "/bubu/polaroid-coffee.webp", x: 67, y: 11, w: 15, r: 0, dx: 14, dy: -16, dr: 8, ds: 1.06, depth: 1.1, z: 2 },
      { kind: "cut", src: "/bubu/phone.webp", x: 4, y: 8, w: 44, r: 0, dx: -14, dy: -6, dr: -4, ds: 1.02, depth: 0.8, z: 3 },
      { kind: "app", src: "/bubu/icon.webp", x: 62, y: 64, w: 22, r: 4, dx: 12, dy: 10, dr: 10, ds: 1.08, depth: 1.2, z: 5 },
      { kind: "chip", text: "Home · a race for two", x: 3, y: 2, r: -4, dx: -10, dy: -10, dr: -7, depth: 0.5, z: 4 },
      { kind: "chip", text: "Weekly journal · me & my buddy", x: 40, y: 88, r: 3, dx: 12, dy: 10, dr: 6, depth: 0.5, z: 4 }
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

/* boa-budgeting is the one tested concept on the board; every other
   featured project is a real, finished product - bar BUBU, still being
   built, whose stage has no case study to open yet. */
const SHIPPED = new Set(["vortexnet", "lastmessage", "taroo", "suglar"])
const IN_PROGRESS = new Set(["bubu"])

function Stage({ project, stack }) {
  const ref = useRef(null)
  const { tracking, ringRef, trackingProps } = usePressCursor()
  const status = SHIPPED.has(project.slug) ? "Shipped" : IN_PROGRESS.has(project.slug) ? "In progress" : "Concept"
  /* No case study yet: the same stage, but nothing to follow. */
  const Tag = project.href ? Link : "div"
  const linkProps = project.href ? { href: project.href, "aria-label": `${project.title}: view case study` } : { "aria-label": project.title }

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
    }
    const onLeave = () => {
      el.style.setProperty("--sx", "0")
      el.style.setProperty("--sy", "0")
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave) }
  }, [])

  return (
    <>
      <Tag
        ref={ref}
        className={styles.stage}
        data-tint={stack.tint}
        data-static={project.href ? undefined : ""}
        {...linkProps}
        {...trackingProps}
      >
        <span className={styles.sheet} aria-hidden="true" />
        {stack.layers.map((layer, index) => (
          <span key={layer.src || layer.text} className={styles.slot} style={layerStyle(layer, index)} aria-hidden="true">
            {layer.kind === "chip"
              ? <span className={`${styles.layer} ${styles.chip}`}>{layer.text}</span>
              : <img className={`${styles.layer} ${styles[layer.kind]}`} src={media(layer.src)} alt="" loading="lazy" decoding="async" />}
          </span>
        ))}
        <span className={styles.plate}>
          <span className={styles.when}>{stack.when}</span>
          <strong>{project.title}{project.href ? <> <span className={styles.arrow} aria-hidden="true">→</span></> : null}</strong>
        </span>
      </Tag>

      {/* The label the header's own logo carries, naming the one thing
          about the project a reader could not otherwise tell from three
          photos: whether it shipped. Without the mark's own dot, though -
          a stage is something you click, so the reader keeps the pointer
          that says so and the label just follows it. */}
      {tracking ? <PressRing ringRef={ringRef} label={status} dot={false} /> : null}
    </>
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
              <ul className={styles.facets} data-tint={stack.tint}>
                {stack.facets.map((facet) => <li key={facet} className={styles.facet}>{facet}</li>)}
              </ul>
              <p className={styles.description}>{stack.summary}</p>
              <p className={styles.role}><span>Role</span> — {stack.role}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
