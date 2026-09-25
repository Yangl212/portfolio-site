import { t } from "../lib/dictionary"

import styles from "./ProjectHero.module.css"

export function ProjectHero({
  label = "Project",
  discipline,
  title,
  image,
  imageAlt,
  imageFit = "cover",
  layout = "split",
  mobileImage,
  summary,
  problem,
  contribution,
  outcome,
  role,
  scope,
  platform,
  timeline,
  action,
  secondaryAction,
  /* Only the field labels (dt text) below come from locale - the values
     (summary, problem, ...) are per-project prose, still English until
     translated page by page. */
  locale = "en"
}) {
  const copy = t(locale).hero

  return (
    <section className={styles.wrap}>
      <div className={styles.eyebrow}>
        <span className={styles.pill}>{label}</span>
        <span>{discipline}</span>
      </div>

      <header className={`${styles.hero} ${layout === "wide" ? styles.wide : ""}`}>
        <h1 className={styles.title}>{title}</h1>
        <div className={`${styles.image} ${imageFit === "contain" ? styles.imageContain : ""}`}>
          <img className={mobileImage ? styles.desktopImage : ""} src={image} alt={imageAlt} />
          {mobileImage ? <img className={styles.mobileImage} src={mobileImage} alt={imageAlt} /> : null}
        </div>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.details}>
          <dl className={styles.facts}>
            <div><dt>{copy.problem}</dt><dd>{problem}</dd></div>
            <div><dt>{copy.whatIDid}</dt><dd>{contribution}</dd></div>
            <div><dt>{copy.outcome}</dt><dd>{outcome}</dd></div>
          </dl>
          <dl className={styles.meta}>
            <div><dt>{copy.role}</dt><dd>{role}</dd></div>
            <div><dt>{copy.scope}</dt><dd>{scope}</dd></div>
            <div><dt>{copy.platform}</dt><dd>{platform}</dd></div>
            <div><dt>{copy.timeline}</dt><dd>{timeline}</dd></div>
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
