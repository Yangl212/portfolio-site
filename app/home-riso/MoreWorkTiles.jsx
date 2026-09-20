"use client"

import Link from "next/link"

import styles from "./more-work-tiles.module.css"

/*
 * More Work as a shelf of tiles: each project is a rounded square of its
 * cover with the title and a mono line under it, all six on one row.
 * Well under the size of the stages above, so the section weighs less. On hover a tile lifts a little and grows a touch; the
 * cover inside drifts with it.
 */
export function MoreWorkTiles({ className = "", projects }) {
  return (
    <section className={`${className} ${styles.shelf}`} aria-label="More work">
      <div className={styles.header}>
        <h2>More Work</h2>
        <p>{projects.length} projects</p>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <Link key={project.slug} href={project.href} className={styles.card} style={{ "--i": index }}>
            <span className={styles.tile}>
              <img src={project.image} alt="" width={1600} height={1000} loading="lazy" decoding="async" />
            </span>
            <span className={styles.label}>
              <span className={styles.title}>{project.title}</span>
              <span className={styles.line}>{project.category} · {project.year}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
