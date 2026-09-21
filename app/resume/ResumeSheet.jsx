"use client"

import Link from "next/link"
import { useState } from "react"

import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"
import { aboutReady, trackBase, trackHome } from "../../lib/projects"

import styles from "./resume.module.css"

/* A square icon: the entry's own logo if it has one, otherwise its
   initial on a plain dark square - there is no real company mark to show
   for a job that predates the portfolio's own assets. It rotates a few
   degrees in step with the entry opening, a small echo of the same
   motion rather than a separate effect. */
function Icon({ src, alt, initial, open }) {
  if (src) {
    return (
      <span className={`${styles.icon} ${styles.iconImage}`} data-open={open}>
        <img src={src} alt={alt || ""} loading="lazy" decoding="async" />
      </span>
    )
  }
  return <span className={styles.icon} data-open={open} aria-hidden="true">{initial}</span>
}

/* A button standing in for <summary>, driving a grid-rows collapse (see
   resume.module.css) instead of native <details> - the native element's
   open/close is instant with no animatable middle state. */
function ExperienceEntry({ entry, index }) {
  const [open, setOpen] = useState(false)
  const bodyId = `experience-${entry.company}-${entry.title}`.replace(/[^a-z0-9]+/gi, "-")

  return (
    <div className={styles.experienceEntry} style={{ "--i": index }}>
      <button
        type="button"
        className={styles.summary}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon src={entry.icon} alt={entry.company} initial={entry.company[0]} open={open} />
        <span className={styles.summaryBody}>
          <p className={styles.entryTitle}>{entry.title} @ <strong>{entry.company}</strong></p>
          <p className={styles.entryMeta}>{entry.dates} · {entry.place}</p>
        </span>
        <span className={styles.plus} data-open={open} aria-hidden="true">+</span>
      </button>
      <div className={styles.detailsCollapse} data-open={open}>
        <div className={styles.detailsInner} id={bodyId}>
          <p className={styles.detailText}>{entry.summary}</p>
        </div>
      </div>
      {!entry.noPhotos && (
        <div className={styles.photos}>
          {(entry.photos && entry.photos.length ? entry.photos : [null, null]).map((src, i) => (
            <span className={`${styles.photo} ${src ? styles.photoFilled : ""}`} key={src || i}>
              {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/*
 * The resume as a page rather than only a PDF, laid out the way an actual
 * resume reads: a label once at the top of a section (Education,
 * Experience, Skills), everything in that section stacked under it.
 * Education is two lines; each Experience entry is a closed line that
 * opens, with an animated collapse (see ExperienceEntry above), to the
 * same story the PDF carries in one or two sentences; Skills is a row
 * of tool marks rather than sentences.
 * The site's own header and footer bracket it.
 */
export function ResumeSheet({ track = "uiux", role, photo, education, experience, skillGroups, pdf }) {
  const base = trackBase(track)
  const knowMore = aboutReady(track)

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={`${base}/resume`} track={track} />

        <article className={styles.content}>
          <div className={styles.intro}>
            <span className={styles.avatar}>
              {photo ? <img src={photo} alt="Lele Yang" /> : "Photo"}
            </span>
            <p className={styles.name}>Lele Yang</p>
            <p className={styles.role}>{role}</p>
            <p className={styles.contactRow}>
              <a href="mailto:lelework1211@gmail.com">lelework1211@gmail.com</a>
              <span aria-hidden="true">·</span>
              <span>(917) 767-2493</span>
              <span aria-hidden="true">·</span>
              <a href="https://www.linkedin.com/in/leleyang1211" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
            <div className={styles.actions}>
              <a className={styles.download} href={pdf} target="_blank" rel="noreferrer">
                Download PDF <span aria-hidden="true">↓</span>
              </a>
              <Link className={styles.back} href={knowMore ? `${base}/about` : trackHome(track)}>
                {knowMore ? "Know more about me" : "Back to work"} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <section className={`${styles.section} ${styles.educationSection}`}>
            <h2 className={styles.label}>Education</h2>
            <div className={styles.entries}>
              {education.map((entry) => (
                <div className={styles.degree} key={entry.school}>
                  <p className={styles.degreeTitle}><strong>{entry.degree}</strong></p>
                  <p className={styles.degreeSchool}>
                    {entry.school} — {entry.place} <span className={styles.degreeDates}>· {entry.dates}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.label}>Experience</h2>
            <div className={styles.entries}>
              {experience.map((entry, index) => (
                <ExperienceEntry entry={entry} index={index} key={`${entry.company}-${entry.title}`} />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.label}>Skills</h2>
            <div>
              {skillGroups.map((group, index) => (
                <div className={styles.skillGroup} key={group.label} style={{ "--i": index }}>
                  <p className={styles.skillLabel}>{group.label}</p>
                  {group.mode === "text" ? (
                    <p className={styles.skillWords}>
                      {group.items.map((item) => item.name).join(" · ")}
                    </p>
                  ) : (
                    <div className={styles.skillIcons}>
                      {group.items.map((item) => (
                        <span className={styles.skillIcon} key={item.name}>
                          <span className={`${styles.skillMark} ${item.icon ? styles.skillMarkFilled : styles.skillMarkEmpty}`}>
                            {item.icon ? (
                            <img
                              src={item.icon}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              style={item.iconPad ? { padding: item.iconPad } : undefined}
                            />
                          ) : null}
                          </span>
                          <span className={styles.skillName}>{item.name}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </article>

        <SiteFooter compact />
      </div>
    </main>
  )
}
