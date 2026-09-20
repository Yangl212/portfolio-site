"use client"

import Link from "next/link"
import { useRef, useState } from "react"

import styles from "./page.module.css"

const filters = [
  ["all", "All", "06"],
  ["build", "AI + code", "04"],
  ["visual", "Visual", "02"]
]

export function LabBoard({ items }) {
  const [filter, setFilter] = useState("all")
  const [dragging, setDragging] = useState(false)
  const viewportRef = useRef(null)
  const dragRef = useRef(null)

  const beginDrag = (event) => {
    if (event.button !== 0 || event.target.closest("a, button")) return

    const viewport = viewportRef.current
    if (!viewport) return

    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop
    }
    viewport.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const moveDrag = (event) => {
    const origin = dragRef.current
    const viewport = viewportRef.current
    if (!origin || !viewport) return

    viewport.scrollLeft = origin.left - (event.clientX - origin.x)
    viewport.scrollTop = origin.top - (event.clientY - origin.y)
  }

  const endDrag = (event) => {
    const viewport = viewportRef.current
    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId)
    }
    dragRef.current = null
    setDragging(false)
  }

  return (
    <section className={styles.explorer} aria-labelledby="lab-board-title">
      <div className={styles.boardHeader}>
        <div>
          <p className={styles.eyebrow}>Selected experiments / 2025—Now</p>
          <h2 id="lab-board-title">A living shelf of things I built to learn.</h2>
        </div>

        <div className={styles.filters} aria-label="Filter lab experiments">
          {filters.map(([value, label, count]) => (
            <button
              type="button"
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              <span>{label}</span>
              <span aria-hidden="true">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={styles.viewport}
        data-dragging={dragging}
        ref={viewportRef}
        tabIndex="0"
        role="region"
        aria-label="Draggable canvas of experiments. Use arrow keys or drag the empty space to explore."
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className={styles.canvas}>
          <p className={styles.dragHint} aria-hidden="true">
            <span>↔</span> Drag the empty space to explore
          </p>

          {items.map((item, index) => {
            const dimmed = filter !== "all" && item.group !== filter

            return (
              <article
                className={styles.card}
                data-dimmed={dimmed}
                key={item.title}
                style={{
                  "--x": item.position.x,
                  "--y": item.position.y,
                  "--w": item.position.w,
                  "--ratio": item.position.ratio,
                  "--accent": item.accent
                }}
              >
                <Link className={styles.cardImage} href={item.href} prefetch={false} tabIndex={dimmed ? -1 : undefined}>
                  <img src={item.image} alt={item.alt} loading={index < 2 ? "eager" : "lazy"} />
                  <span className={styles.openMark} aria-hidden="true">↗</span>
                </Link>

                <div className={styles.cardMeta}>
                  <p><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</p>
                  <p>{item.year}</p>
                </div>
                <h3><Link href={item.href} prefetch={false} tabIndex={dimmed ? -1 : undefined}>{item.title}</Link></h3>
                <p className={styles.cardCopy}>{item.copy}</p>
                <ul className={styles.tags} aria-label={`${item.title} skills`}>
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
