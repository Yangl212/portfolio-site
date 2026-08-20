import styles from "./site-shell.module.css"

export function SiteFooter({ className = "" }) {
  const mergedClassName = className ? `${styles.footer} ${className}` : styles.footer

  return (
    <footer className={mergedClassName}>
      <h2 className={styles.footerTitle}>Stay curious, stay kind.</h2>
      <p className={styles.footerCopy}>{"\u00A9 Lele Yang"}</p>
    </footer>
  )
}
