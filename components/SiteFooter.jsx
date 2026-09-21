import styles from "./site-shell.module.css"

/* `compact` is for the case-study pages, whose type scale keeps the closing
   line at heading size. The default footer is built around the home page's
   full-width statement and leaves a tall empty block under a smaller title.

   The line itself prints the way every other closing statement on the site
   does - two ink plates, a pixel or two out of register, screened together
   on the black stock rather than set as one flat colour - so a case study
   ends on the same sheet the home page and About do, just at its own
   scale. Unlike those two, it holds still: a footer a reader hits at the
   bottom of ten different pages does not need to re-print itself every
   time, only to look like it was printed once. */
export function SiteFooter({ className = "", compact = false }) {
  const mergedClassName = [styles.footer, compact ? styles.footerCompact : "", className].filter(Boolean).join(" ")

  return (
    <footer className={mergedClassName}>
      <span className={styles.footerGrain} aria-hidden="true" />
      <h2 className={styles.footerTitle} aria-label="Stay curious, stay kind.">
        <span className={styles.footerSheet}>
          <span className={`${styles.footerPlate} ${styles.footerPlateA}`} aria-hidden="true">Stay curious, stay kind.</span>
          <span className={`${styles.footerPlate} ${styles.footerPlateB}`} aria-hidden="true">Stay curious, stay kind.</span>
        </span>
      </h2>
      <nav className={styles.footerContact} aria-label="Contact Lele Yang">
        <a href="mailto:Lelework1211@gmail.com">Lelework1211@gmail.com</a>
        <a href="https://www.linkedin.com/in/leleyang1211" target="_blank" rel="noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
        <a href="https://www.instagram.com/shanjio17" target="_blank" rel="noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </footer>
  )
}
