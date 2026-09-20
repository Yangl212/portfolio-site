"use client"

import Link from "next/link"

import styles from "./more-work-folders.module.css"

/*
 * More Work as a row of folders. Each one is the folder from
 * public/homepage/folder.png: a tinted back panel, the project's cover
 * laid on it, and the folder's white front over the lower half with its
 * tab standing up at the left. The job line and the title are printed on
 * that front. Pointed at, the cover tilts and slides up out of the
 * folder. Four to a row, with room above each for the cover to rise into.
 *
 * The front is the PNG at its own aspect (821 x 501, the tab the top 11%
 * of it), pinned to the foot of a square card - which puts the top edge
 * of the front at 46% of the card, where the example has it.
 *
 * A project may also carry `cards`, and with them a `cardStyle`: "deck"
 * fans them out from behind the cover, "scatter" throws them up over it.
 */
export function MoreWorkFolders({ className = "", projects }) {
  return (
    <section className={`${className} ${styles.shelf}`} aria-label="More work">
      <div className={styles.header}>
        <h2>More Work</h2>
        <p>{projects.length} projects</p>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <Link key={project.slug} href={project.href} className={styles.folder} style={{ "--i": index }}>
            <span className={styles.back} aria-hidden="true" />
            {project.cards ? (
              <span className={`${styles.fan} ${styles[project.cardStyle ?? "deck"]}`} aria-hidden="true">
                {project.cards.map((src) => (
                  /* No width/height: the pieces are absolutely placed and
                     sized in CSS, and they come in every shape. */
                  <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                ))}
              </span>
            ) : null}
            <span className={styles.sheet} aria-hidden="true">
              <img src={project.image} alt="" width={1600} height={1000} loading="lazy" decoding="async" />
            </span>
            <img className={styles.front} src="/homepage/folder.png" alt="" width={821} height={501} loading="lazy" decoding="async" aria-hidden="true" />
            <span className={styles.copy}>
              <span className={styles.meta}>
                <span>{project.category}</span>
                <span>{project.year}</span>
              </span>
              <span className={styles.title}>{project.title}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
