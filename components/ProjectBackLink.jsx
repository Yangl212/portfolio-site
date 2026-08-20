"use client"

import Image from "next/image"
import Link from "next/link"
import leftIcon from "../pic/Left.png"

import styles from "./project-back-link.module.css"

export function ProjectBackLink({ href = "/project", className = "" }) {
  return (
    <div className={className}>
      <Link href={href} className={styles.backLink}>
        <span className={styles.arrow} aria-hidden="true">
          <Image
            src={leftIcon}
            alt=""
            className={styles.arrowIcon}
            width={28}
            height={28}
          />
        </span>
        <span>Back</span>
      </Link>
    </div>
  )
}
