import Link from "next/link"

import { MoreWorkCarousel } from "../../components/MoreWorkCarousel"
import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"
import { featuredProjects, moreProjects } from "../../lib/projects"

import styles from "./page.module.css"

/* Both home pages render the same markup over the same eight projects. The
   track decides the order and where the cards link, nothing else. */
const TRACK = "visual"

export default function VisualPage() {
  const featured = featuredProjects(TRACK)
  const more = moreProjects(TRACK)

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/visual" track={TRACK} />

        <section className={styles.content}>
          <header className={styles.hero}>
            <h1 className={`${styles.heroTitle} ${styles.reveal}`}>Hi, I&apos;m Lele</h1>
            <p className={`${styles.heroCopy} ${styles.reveal}`}>
              Visual &amp; Brand Designer working across identity, digital, and visual systems.
              I care about strong concepts, clear communication, and making things people remember.
            </p>
          </header>

          <section className={styles.selectedWork}>
            <div className={`${styles.sectionHeader} ${styles.reveal}`}>
              <h2>Selected Work</h2>
            </div>

            <div className={styles.featuredList}>
              {featured.map((project, index) => (
                <article className={`${styles.featuredCard} ${styles.reveal}`} key={project.href} style={{ animationDelay: `${140 + index * 90}ms` }}>
                  <div className={styles.featuredCopy}>
                    <div className={styles.tagList}>
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link href={project.href} className={styles.caseLink}>View case study <span aria-hidden="true">→</span></Link>
                  </div>

                  <Link href={project.href} className={styles.featuredImageLink}>
                    <img src={project.image} alt={project.title} />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <MoreWorkCarousel className={styles.moreWork} projects={more} />
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
