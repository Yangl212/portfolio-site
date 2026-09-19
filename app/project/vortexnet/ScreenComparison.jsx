"use client"

import { useId, useState } from "react"

import styles from "./ScreenComparison.module.css"

const screens = [
  {
    label: "Before",
    src: "/vortexnet/media/legacy-screen.webp",
    width: 2480,
    height: 1508,
    alt: "Reconstructed legacy finance dashboard with a flat sidebar, abbreviated metrics, and a transaction table.",
    caption: "A flat sidebar and system labels leave daily priorities to the reader."
  },
  {
    label: "After",
    src: "/vortexnet/media/rebuilt-screen.webp",
    width: 2480,
    height: 1830,
    alt: "Portfolio dashboard refinement with explicit CNY totals, cumulative collections and payouts, settlement deadlines, and assigned action queues.",
    caption: "Portfolio refinement · Cash movement, settlement deadlines and assigned queues. Mock data."
  }
]

export default function ScreenComparison() {
  const [selected, setSelected] = useState(1)
  const screenId = useId()
  const activeScreen = screens[selected]

  return (
    <figure className={styles.comparison}>
      <div className={styles.toolbar}>
        <div className={styles.toggle} role="group" aria-label="Compare dashboard screens">
          {screens.map((screen, index) => (
            <button
              key={screen.label}
              type="button"
              aria-pressed={selected === index}
              aria-controls={screenId}
              onClick={() => setSelected(index)}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.viewport} id={screenId}>
        {screens.map((screen, index) => (
          <img
            key={screen.label}
            className={styles.screen}
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            loading="lazy"
            decoding="async"
            hidden={selected !== index}
          />
        ))}
      </div>
      <figcaption className={styles.caption} aria-live="polite" aria-atomic="true">
        <strong>{activeScreen.label}</strong>
        <span>{activeScreen.caption}</span>
      </figcaption>
    </figure>
  )
}
