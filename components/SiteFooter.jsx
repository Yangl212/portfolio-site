import styles from "./site-shell.module.css"

/* `compact` is for the case-study pages, whose type scale keeps the closing
   line at heading size. The default footer is built around the home page's
   full-width statement and leaves a tall empty block under a smaller title. */
export function SiteFooter({ className = "", compact = false }) {
  const mergedClassName = [styles.footer, compact ? styles.footerCompact : "", className].filter(Boolean).join(" ")

  return (
    <footer className={mergedClassName}>
      <h2 className={styles.footerTitle}>Stay curious, stay kind.</h2>
      <nav className={styles.footerContact} aria-label="Contact Lele Yang">
        <a href="mailto:Lelework1211@gmail.com">Lelework1211@gmail.com</a>
        <a href="https://www.linkedin.com/in/leleyang1211" target="_blank" rel="noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <p className={styles.footerCopy}>{"© Lele Yang"}</p>
    </footer>
  )
}
