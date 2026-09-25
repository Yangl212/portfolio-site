import Link from "next/link"

import { t } from "../lib/dictionary"
import { projectNeighbors, trackHome } from "../lib/projects"

/*
 * Prev / All / Next at the foot of a case study.
 *
 * Both the order and the destinations come from the track the reader is on, so
 * someone who entered at /visual keeps walking the visual order and lands back
 * on /visual rather than being dropped into the UI/UX home. Locale works the
 * same way: neighbours and the href both carry it, so a Chinese reader keeps
 * walking under /zh/... . `navName` (a product name) stays as authored in
 * lib/projects.js at whatever locale it resolved to - untranslated for most
 * projects, since those are brand names.
 *
 * `styles` is passed in because the nav is styled by each case study's own CSS
 * module - the class names are hashed per file, so there is no shared name to
 * reach for here.
 */
export function ProjectNav({ slug, track = "uiux", locale = "en", styles }) {
  const { prev, next } = projectNeighbors(slug, track, locale)
  const copy = t(locale).projectNav

  if (!prev || !next) {
    return null
  }

  return (
    <nav className={styles.projectNav} aria-label="Project navigation">
      <Link className={styles.projectNavPrev} href={prev.href}>
        <span className={styles.projectNavLabel}>&#8592; {copy.prev}</span>
        <span className={styles.projectNavName}>
          <span className={styles.projectNavDot} aria-hidden="true" />
          {prev.navName}
        </span>
      </Link>
      <Link className={styles.projectNavAll} href={trackHome(track, locale)}>
        {copy.all}
      </Link>
      <Link className={styles.projectNavNext} href={next.href}>
        <span className={styles.projectNavLabel}>{copy.next} &#8594;</span>
        <span className={styles.projectNavName}>
          {next.navName}
          <span className={styles.projectNavDot} aria-hidden="true" />
        </span>
      </Link>
    </nav>
  )
}
