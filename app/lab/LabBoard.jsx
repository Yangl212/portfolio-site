"use client"

import Link from "next/link"
import { useRef, useState } from "react"

import styles from "./page.module.css"

export function LabBoard({ items }) {
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
    <section className={styles.explorer} aria-labelledby="lab-title">
      <div
        className={styles.viewport}
        data-dragging={dragging}
        ref={viewportRef}
        tabIndex="0"
        role="region"
        aria-label="Draggable canvas of experiments. Use arrow keys or drag empty space to explore."
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className={styles.boardTitle}>
          <h1 id="lab-title">Lele&apos;s Lab</h1>
          <p>AI builds · coded experiments · visual studies</p>
        </div>

        <p className={styles.dragHint} aria-hidden="true">Drag to explore&nbsp; ↔</p>

        <div className={styles.canvas}>
          {items.map((item, index) => (
            <article
              className={styles.card}
              key={item.title}
              style={{
                "--x": item.position.x,
                "--y": item.position.y,
                "--w": item.position.w,
                "--ratio": item.position.ratio
              }}
            >
              <Link className={styles.cardImage} href={item.href} prefetch={false}>
                <img src={item.image} alt={item.alt} loading={index < 2 ? "eager" : "lazy"} />
              </Link>
              <div className={styles.caption}>
                <h2><Link href={item.href} prefetch={false}>{item.title} <span aria-hidden="true">↗</span></Link></h2>
                <p>{item.label} · {item.year}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
