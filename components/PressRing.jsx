"use client"

import styles from "./site-shell.module.css"

/* The dot-and-label mark itself, rendered beside whatever is being
   pointed at. Kept separate from usePressCursor so the hook carries no
   markup of its own - every trackable element in the header shares one
   set of pointer-following code and gets its own copy of this. */
export function PressRing({ ringRef, label }) {
  return (
    <span className={styles.pressCursor} ref={ringRef} aria-hidden="true">
      <span className={styles.pressDot} />
      <span className={styles.pressLabel}>{label}</span>
    </span>
  )
}
