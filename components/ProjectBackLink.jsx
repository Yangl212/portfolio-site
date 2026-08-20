"use client"

import Link from "next/link"

import styles from "./project-back-link.module.css"

export function ProjectBackLink({ href = "/project", className = "" }) {
  return (
    <div className={className}>
      <Link href={href} className={styles.backLink}>
        <span className={styles.arrow} aria-hidden="true">
          {"<-"}
        </span>
        <span>Back</span>
      </Link>
    </div>
  )
}
