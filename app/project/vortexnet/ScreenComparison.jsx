"use client"

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"

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

const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)"
const CROSSFADE_MS = 360

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function ScreenComparison() {
  const [selected, setSelected] = useState(1)
  /* The screen on its way out. It stays mounted on top of the incoming one
     for the length of the crossfade, then drops back to hidden. */
  const [leaving, setLeaving] = useState(null)
  /* Where the black pill sits: measured from the pressed button so it can
     slide between buttons instead of appearing on the next one. */
  const [pill, setPill] = useState(null)
  const toggleRef = useRef(null)
  const viewportRef = useRef(null)
  const heightBefore = useRef(null)
  const leaveTimer = useRef(null)
  const screenId = useId()
  const activeScreen = screens[selected]

  const select = (index) => {
    if (index === selected) return
    const animate = !prefersReducedMotion()
    heightBefore.current = animate && viewportRef.current ? viewportRef.current.offsetHeight : null
    if (animate) {
      clearTimeout(leaveTimer.current)
      setLeaving(selected)
      leaveTimer.current = setTimeout(() => setLeaving(null), CROSSFADE_MS)
    }
    setSelected(index)
  }

  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  /* Re-measured whenever the toggle reflows as well: fonts arriving, the
     viewport changing width, or the buttons wrapping onto two rows. */
  useLayoutEffect(() => {
    const toggle = toggleRef.current
    if (!toggle) return undefined
    const measure = () => {
      const button = toggle.querySelectorAll("button")[selected]
      if (!button) return
      setPill({ x: button.offsetLeft, y: button.offsetTop, w: button.offsetWidth, h: button.offsetHeight })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(toggle)
    return () => observer.disconnect()
  }, [selected])

  /* The frame takes its height from the visible screen, and the three are
     different heights. Animating from the old height to the new one lets the
     caption and the section below slide instead of jumping. */
  useLayoutEffect(() => {
    const from = heightBefore.current
    heightBefore.current = null
    const viewport = viewportRef.current
    if (from == null || !viewport) return
    viewport.getAnimations().forEach((animation) => animation.cancel())
    const to = viewport.offsetHeight
    if (from === to) return
    viewport.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: CROSSFADE_MS, easing: EASE })
  }, [selected])

  return (
    <figure className={styles.comparison}>
      <div className={styles.toolbar}>
        <div
          ref={toggleRef}
          className={styles.toggle}
          role="group"
          aria-label="Compare dashboard stages"
          data-measured={pill ? "" : undefined}
        >
          {pill && (
            <span
              aria-hidden="true"
              className={styles.pill}
              style={{ transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.w, height: pill.h }}
            />
          )}
          {screens.map((screen, index) => (
            <button
              key={screen.label}
              type="button"
              aria-pressed={selected === index}
              aria-controls={screenId}
              onClick={() => select(index)}
            >
              {screen.label}
            </button>
          ))}
        </div>
        <p className={styles.stage} aria-live="polite">
          <span key={selected} className={styles.stageBody}>{activeScreen.stage}</span>
        </p>
      </div>
      <div ref={viewportRef} className={styles.viewport} id={screenId}>
        {screens.map((screen, index) => {
          const state = index === selected ? "active" : index === leaving ? "leaving" : "hidden"
          return (
            <img
              key={screen.label}
              className={styles.screen}
              data-state={state}
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
              hidden={state === "hidden"}
            />
          )
        })}
      </div>
      <figcaption className={styles.caption} aria-live="polite" aria-atomic="true">
        <span key={selected} className={styles.captionBody}>
          <strong>{activeScreen.label}</strong>
          <span>{activeScreen.caption}</span>
          {activeScreen.result ? <span className={styles.result}>{activeScreen.result}</span> : null}
        </span>
      </figcaption>
    </figure>
  )
}
