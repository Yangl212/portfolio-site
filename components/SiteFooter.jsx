import styles from "./site-shell.module.css"

export function SiteFooter({ className = "" }) {
  const mergedClassName = className ? `${styles.footer} ${className}` : styles.footer

  return (
    <footer className={mergedClassName}>
      <h2 className={styles.footerTitle}>Stay curious, stay kind.</h2>
      <nav className={styles.footerContact} aria-label="Contact Lele Yang">
        <a href="mailto:Lelework1211@gmail.com">Lelework1211@gmail.com</a>
        <a href="https://www.linkedin.com/in/leleyang1211" target="_blank" rel="noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <p className={styles.footerCopy}>{"\u00A9 Lele Yang"}</p>
    </footer>
  )
}
