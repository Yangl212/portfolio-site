"use client"

import { useEffect, useState } from "react"
import { ScaledIframe } from "../../../components/ScaledIframe"
import styles from "./page.module.css"

const PROTOTYPE_SRC = "/cleared/calendar-assistant-prototype.html?v=20260918-review"

export function PrototypePreview() {
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 960px)")
    const update = () => setDesktop(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <figure className={styles.prototypeStage}>
      <div className={styles.prototypeIntro}>
        <div>
          <p>Start with Review next. Check the email, choose a time, then try Undo.</p>
        </div>
        <a className={styles.outlineAction} href={PROTOTYPE_SRC} target="_blank" rel="noreferrer">Open desktop prototype <span aria-hidden="true">↗</span></a>
      </div>
      {desktop ? (
        <ScaledIframe
          className={styles.prototypeViewport}
          frameClassName={styles.prototypeFrame}
          src={PROTOTYPE_SRC}
          title="Google Calendar concept: review, adjust and confirm a scheduling suggestion"
          width={1500} height={980} transparent
        />
      ) : (
        <a className={styles.prototypePreview} href={PROTOTYPE_SRC} target="_blank" rel="noreferrer" aria-label="Open the desktop Calendar prototype in a new tab">
          <img src="/cleared/desktop-preview.png" alt="Desktop Calendar prototype with scheduling suggestions in the week view" width="1440" height="900" loading="lazy" />
        </a>
      )}
      <figcaption>{desktop ? "Interactive desktop prototype · Simulated email and calendar data" : "Desktop preview · Open on a larger screen to interact with the prototype."}</figcaption>
    </figure>
  )
}
