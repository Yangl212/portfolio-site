"use client"

import { useId, useState } from "react"

import styles from "./SuggestionCard.module.css"

/*
 * The case study's hero: one suggestion from the prototype, running the same
 * three moves as the full thing - see what the assistant read, confirm exactly
 * what was previewed, undo.
 *
 * The data is fixed sample data. What is real is the set of states and what
 * each one tells the person: a dashed suggestion is not in the calendar, an
 * inferred deadline is marked as inferred, and confirming adds the slot that
 * was shown rather than a "better" one. Nothing here talks to an assistant.
 *
 * Colours are the prototype's own (text #111113, blue #3E7BFA, alert
 * #E5484D) so the card reads as a piece of the product, not of the site.
 */
export function SuggestionCard({ caption }) {
  const [confirmed, setConfirmed] = useState(false)
  const [sourceOpen, setSourceOpen] = useState(false)
  const sourceId = useId()

  return (
    <div className={styles.wrap}>
      <article className={styles.card} data-confirmed={confirmed} aria-label="Calendar suggestion, sample">
        <header className={styles.head}>
          <span className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            {confirmed ? "In your calendar · Tuesday" : "From mail · Priya Raman · 08:52"}
          </span>
          <span className={styles.badge}>{confirmed ? "Confirmed" : "Suggestion"}</span>
        </header>

        <h2 className={styles.title}>Send the revised quote</h2>

        {/* The slot is the preview. Confirming keeps it, so the person sees the
            same block move from dashed to solid rather than a new one appear. */}
        <div className={styles.slot}>
          <span className={styles.slotTime}>Tuesday 14:00 – 16:00</span>
          <span className={styles.slotNote} key={confirmed ? "confirmed" : "suggested"}>
            {confirmed
              ? "Added exactly as previewed"
              : "Your only clear two-hour block before the deadline"}
          </span>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt data-alert="">Deadline</dt>
            <dd>
              <span className={styles.value}>Friday 18:00 <small>· inferred</small></span>
              <span className={styles.note}>“by end of week” names no time. Worth checking with the sender.</span>
            </dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>
              <span className={styles.value}>2 hours <small>· estimate</small></span>
              <span className={styles.note}>Your last four quotes averaged 1h50.</span>
            </dd>
          </div>
        </dl>

        <div className={styles.source} id={sourceId} data-open={sourceOpen} aria-hidden={!sourceOpen}>
          <div className={styles.sourceInner}>
            <div className={styles.mail}>
              <div className={styles.mailHead}>
                <span>RE: Q3 proposal</span>
                <span>Tuesday 08:52</span>
              </div>
              <p>
                Could you send <mark className={styles.task}>the revised quote</mark> across. We need it{" "}
                <mark className={styles.deadline}>by end of week</mark> to get sign-off before the board meets.
              </p>
            </div>
            <p className={styles.sourceNote}>
              The underlined phrases are the only parts the assistant used. The 18:00 is its reading of
              “end of week”, not something the sender wrote.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${confirmed ? styles.ghost : styles.primary}`}
            onClick={() => setConfirmed((value) => !value)}
          >
            {confirmed ? "Undo" : "Add to calendar"}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.ghost}`}
            aria-expanded={sourceOpen}
            aria-controls={sourceId}
            onClick={() => setSourceOpen((value) => !value)}
          >
            {sourceOpen ? "Hide the email" : "See what it read"}
          </button>
        </div>

        <p className={styles.status} aria-live="polite" key={confirmed ? "confirmed" : "suggested"}>
          {confirmed
            ? "Nothing else on your calendar changed. Undo stays here until you leave."
            : "Nothing is final until you confirm it."}
        </p>
      </article>

      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
  )
}
