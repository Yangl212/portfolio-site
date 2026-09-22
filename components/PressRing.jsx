"use client"

import styles from "./site-shell.module.css"

/* The dot-and-label mark itself, rendered beside whatever is being
   pointed at. Kept separate from usePressCursor so the hook carries no
   markup of its own - every trackable element in the header shares one
   set of pointer-following code and gets its own copy of this.

   `dot={false}` drops the mark's own dot and keeps only the label, for
   somewhere the reader keeps their own pointer rather than giving it up
   to ours. */
export function PressRing({ ringRef, label, dot = true }) {
  return (
    <span className={styles.pressCursor} ref={ringRef} aria-hidden="true">
      {dot ? <span className={styles.pressDot} /> : null}
      <span className={`${styles.pressLabel} ${dot ? "" : styles.pressLabelAlone}`}>{label}</span>
    </span>
  )
}
