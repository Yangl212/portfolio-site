"use client"

import Link from "next/link"

import { PressRing } from "./PressRing"
import { usePressCursor } from "./usePressCursor"
import styles from "./site-shell.module.css"

/*
 * The drawn mark in the header, printed in the site's two inks. Pointed
 * at, it is followed by a small press mark (see usePressCursor) that
 * says where it leads - the nav links beside it are left as plain type,
 * short and self-explanatory enough not to need one. A track with
 * nothing behind the mark yet renders it with `disabled`: the same two
 * inks, without the link or the press mark that would promise a page.
 */
function BrandType() {
  return (
    <span className={styles.brandType} aria-hidden="true">
      <span className={styles.brandInkA}>Lele</span>
      <span className={styles.brandInkB}>Lele</span>
    </span>
  )
}

export function BrandMark({ href, label, onNavigate, disabled = false }) {
  const { tracking, ringRef, trackingProps } = usePressCursor()

  /* Printed but not pressable: there is nowhere for it to lead yet. A
     plain span rather than a disabled link, since a link that goes
     nowhere is still a link a screen reader announces as one. */
  if (disabled) {
    return <span className={styles.brand} aria-hidden="true"><BrandType /></span>
  }

  return (
    <>
      <Link
        href={href}
        className={styles.brand}
        aria-label={label}
        prefetch={false}
        onClick={onNavigate}
        {...trackingProps}
      >
        {/* The name set in type rather than the drawn file, so it can be
            printed the way the home page prints: two inks, slightly out
            of register, and further out of register when pointed at. */}
        <BrandType />
      </Link>

      {tracking ? <PressRing ringRef={ringRef} label={label} /> : null}
    </>
  )
}
