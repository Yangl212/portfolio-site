"use client"

import { useState } from "react"

import styles from "./page.module.css"

/*
 * The journal, turned one page at a time.
 *
 * The five screens are the five states of the same object - closed, opened,
 * my week, their week, both weeks - so they are shown in one frame that
 * changes rather than as five phones in a row. All five images are in the
 * DOM and only the current one is opaque, which is what lets the paper
 * cross-fade instead of flashing white while the next file loads.
 *
 * The strip of labels underneath is the control: a page is a button, and
 * the whole thing works from the keyboard because that is all it is.
 */
export function Journal({ pages, label }) {
  const [at, setAt] = useState(0)

  return (
    <div className={styles.journal}>
      <div className={styles.journalStage}>
        {pages.map((page, index) => (
          <img
            key={page.src}
            className={styles.journalPage}
            src={page.src}
            alt={page.alt}
            data-on={index === at || undefined}
            width="804"
            height="1748"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>

      <div className={styles.journalSteps} role="tablist" aria-label={label}>
        {pages.map((page, index) => (
          <button
            key={page.src}
            type="button"
            role="tab"
            aria-selected={index === at}
            className={styles.journalStep}
            data-on={index === at || undefined}
            onClick={() => setAt(index)}
          >
            <span className={styles.journalStepNo}>{String(index + 1).padStart(2, "0")}</span>
            <span>{page.step}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
