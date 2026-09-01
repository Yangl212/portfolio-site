import Link from "next/link"

import { projectNeighbors, trackHome } from "../lib/projects"

/*
 * Prev / All / Next at the foot of a case study.
 *
 * Both the order and the destinations come from the track the reader is on, so
 * someone who entered at /visual keeps walking the visual order and lands back
 * on /visual rather than being dropped into the UI/UX home.
 *
 * `styles` is passed in because the nav is styled by each case study's own CSS
 * module - the class names are hashed per file, so there is no shared name to
 * reach for here.
 */
export function ProjectNav({ slug, track = "uiux", styles }) {
  const { prev, next } = projectNeighbors(slug, track)

  if (!prev || !next) {
    return null
  }

  return (
    <nav className={styles.projectNav} aria-label="Project navigation">
      <Link className={styles.projectNavPrev} href={prev.href}>
        <span className={styles.projectNavLabel}>&#8592; Previous Project</span>
        <span className={styles.projectNavName}>
          <span className={styles.projectNavDot} aria-hidden="true" />
          {prev.navName}
        </span>
      </Link>
      <Link className={styles.projectNavAll} href={trackHome(track)}>
        All Projects
      </Link>
      <Link className={styles.projectNavNext} href={next.href}>
        <span className={styles.projectNavLabel}>Next Project &#8594;</span>
        <span className={styles.projectNavName}>
          {next.navName}
          <span className={styles.projectNavDot} aria-hidden="true" />
        </span>
      </Link>
    </nav>
  )
}
