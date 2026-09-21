"use client"

import { useEffect, useRef, useState } from "react"

import { LAB_PERIOD } from "./lab-items"
import { useLabCanvas } from "./useLabCanvas"
import styles from "./page.module.css"

export function LabBoard({ items }) {
  const viewportRef = useRef(null)
  const canvasRef = useRef(null)
  const [tiles, setTiles] = useState([[0, 0]])

  useEffect(() => {
    const viewport = viewportRef.current
    const measure = () => {
      const next = [[0, 0]]
      if (window.matchMedia("(min-width: 810px)").matches) {
        for (let y = -1; y <= Math.ceil(viewport.clientHeight / LAB_PERIOD.height); y++) {
          for (let x = -1; x <= Math.ceil(viewport.clientWidth / LAB_PERIOD.width); x++) {
            if (x !== 0 || y !== 0) next.push([x, y])
          }
        }
      }
      setTiles(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    measure()
    return () => observer.disconnect()
  }, [])

  useLabCanvas(viewportRef, canvasRef, tiles)

  return (
    <section className={styles.explorer} aria-labelledby="lab-title">
      <h1 id="lab-title" className={styles.title}>Lele&apos;s Lab</h1>
      <div
        className={styles.viewport}
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Infinite image canvas. Move the pointer to an edge, scroll, drag, or use the arrow keys to explore."
      >
        <div className={styles.canvas} ref={canvasRef} data-lab-canvas>
          {tiles.map(([tileX, tileY]) => (
            <div
              className={styles.tile}
              key={`${tileX}:${tileY}`}
              data-lab-tile={`${tileX}:${tileY}`}
              aria-hidden={tileX !== 0 || tileY !== 0 ? true : undefined}
              style={{ "--tile-x": `${tileX * LAB_PERIOD.width}px`, "--tile-y": `${tileY * LAB_PERIOD.height}px` }}
            >
              {items.map((item, index) => (
                <figure
                  className={styles.card}
                  key={item.image}
                  data-lab-item={index}
                  data-x={item.x + tileX * LAB_PERIOD.width}
                  data-y={item.y + tileY * LAB_PERIOD.height}
                  style={{ "--x": `${item.x}px`, "--y": `${item.y}px`, "--w": `${item.size}px`, "--i": index }}
                >
                  <div className={styles.cardMotion}>
                    <img
                      src={item.image}
                      alt={tileX === 0 && tileY === 0 ? item.alt : ""}
                      width={item.width}
                      height={item.height}
                      draggable={false}
                      decoding="async"
                    />
                    <figcaption className={styles.caption}>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className={styles.dragHint} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2v20M2 12h20M8 6l4-4 4 4M8 18l4 4 4-4M6 8l-4 4 4 4M18 8l4 4-4 4" />
        </svg>
        Drag / move to edges
      </p>
    </section>
  )
}
