import styles from "./ProjectHero.module.css"

export function ProjectHero({
  label = "Project",
  discipline,
  title,
  image,
  imageAlt,
  summary,
  problem,
  contribution,
  outcome,
  role,
  scope,
  platform,
  timeline,
  action,
  secondaryAction
}) {
  return (
    <section className={styles.wrap}>
      <div className={styles.eyebrow}>
        <span className={styles.pill}>{label}</span>
        <span>{discipline}</span>
      </div>

      <header className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.image}><img src={image} alt={imageAlt} /></div>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.details}>
          <dl className={styles.facts}>
            <div><dt>The problem</dt><dd>{problem}</dd></div>
            <div><dt>What I did</dt><dd>{contribution}</dd></div>
            <div><dt>The outcome</dt><dd>{outcome}</dd></div>
          </dl>
          <dl className={styles.meta}>
            <div><dt>Role</dt><dd>{role}</dd></div>
            <div><dt>Scope</dt><dd>{scope}</dd></div>
            <div><dt>Platform</dt><dd>{platform}</dd></div>
            <div><dt>Timeline</dt><dd>{timeline}</dd></div>
          </dl>
          {(action || secondaryAction) && (
            <div className={styles.actions}>
              {action && (
                <a className={styles.action} href={action.href} target="_blank" rel="noreferrer">
                  {action.label}
                  {action.arrow === false ? null : <span aria-hidden="true"> &#8594;</span>}
                </a>
              )}
              {secondaryAction && (
                <a className={styles.actionGhost} href={secondaryAction.href} target="_blank" rel="noreferrer">
                  {secondaryAction.label}
                </a>
              )}
            </div>
          )}
        </div>
      </header>
    </section>
  )
}
