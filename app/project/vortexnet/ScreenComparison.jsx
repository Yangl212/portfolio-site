"use client"

import { useId, useState } from "react"

import styles from "./ScreenComparison.module.css"

/*
 * Three states, in the order they happened: the tool as it was, the build that
 * shipped and was tested during the internship, and the refinement made later
 * for this case study.
 *
 * The middle one is the one a reader is really asking about, so it opens on it
 * and carries the test result beside it. Keeping the later refinement as its
 * own separate step is the point: it stops a screen that was never tested from
 * standing in for the delivered work.
 */
const screens = [
  {
    label: "Original",
    stage: "Before the internship",
    src: "/vortexnet/media/legacy-screen.webp",
    width: 2480,
    height: 1508,
    alt: "The original finance dashboard: a flat fourteen-entry sidebar, abbreviated metric labels such as TXN_CNT and SUCC_RATE, and a dense transaction table.",
    caption: "A flat sidebar and system labels leave daily priorities to the reader.",
    result: null
  },
  {
    label: "Shipped & tested",
    stage: "Delivered during the internship",
    src: "/vortexnet/media/shipped-screen.webp",
    width: 2480,
    height: 1632,
    alt: "The delivered build: nine navigation entries grouped into Monitor today, Reconcile and Review over time, with Today's overview showing four named totals, a cash movement chart, a settlement list and a queue of open work.",
    caption: "The regrouped navigation and Today's overview as they went live. This is the build the 10 colleagues tested.",
    result: "Daily information lookup: 20–30s → ~8s · Requested item in the left-hand list: 10+s → ~5s · Approximate task summaries"
  },
  {
    label: "Later refinement",
    stage: "After the internship, for this case study",
    src: "/vortexnet/media/rebuilt-screen.webp",
    width: 2480,
    height: 1830,
    alt: "The later refinement: the same layout with currency and time context on each total, collections compared against payouts in the chart, settlement progress, and owner and next-action columns on the queue.",
    caption: "Metric definitions, the cash chart, the settlement schedule and per-queue owners and next actions, refined afterwards on the tool's test data. Not tested.",
    result: null
  }
]

export default function ScreenComparison() {
  const [selected, setSelected] = useState(1)
  const screenId = useId()
  const activeScreen = screens[selected]

  return (
    <figure className={styles.comparison}>
      <div className={styles.toolbar}>
        <div className={styles.toggle} role="group" aria-label="Compare dashboard stages">
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
        <p className={styles.stage} aria-live="polite">{activeScreen.stage}</p>
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
            /* All three load up front. A hidden lazy image is never fetched,
               so the first press of a toggle would otherwise land on an
               empty frame while it downloads. */
            loading="eager"
            fetchPriority={index === 1 ? "high" : "low"}
            decoding="async"
            hidden={selected !== index}
          />
        ))}
      </div>
      <figcaption className={styles.caption} aria-live="polite" aria-atomic="true">
        <strong>{activeScreen.label}</strong>
        <span>{activeScreen.caption}</span>
        {activeScreen.result ? <span className={styles.result}>{activeScreen.result}</span> : null}
      </figcaption>
    </figure>
  )
}
