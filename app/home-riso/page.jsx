import Link from "next/link"
import { DM_Mono } from "next/font/google"

import { MoreWorkCarousel } from "../../components/MoreWorkCarousel"
import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"
import { featuredProjects, moreProjects } from "../../lib/projects"

import homeStyles from "../page.module.css"
import styles from "./page.module.css"

/*
 * A second home page, kept beside the live one so the two can be compared.
 *
 * Only the hero is new: the name printed in two misregistered riso inks,
 * filling the first screen so nothing below shows until the reader scrolls.
 * Everything under it is the live home page's own markup and stylesheet,
 * untouched, so the comparison is about the hero alone.
 *
 * Not indexed while it is a preview.
 */
export const metadata = {
  title: { absolute: "Lele Yang — Product Designer" },
  description:
    "UI/UX designer with a visual designer's eye, based in New York. Case studies in fintech, AI scheduling, an AI detective game, and print.",
  robots: { index: false, follow: false }
}

/* The site sets Satoshi itself; the print-shop annotations want a mono. */
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" })

const TRACK = "uiux"

function RegMark({ className }) {
  return (
    <svg className={`${styles.reg} ${className}`} viewBox="0 0 20 20" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" fill="none"><path d="M10 0v20M0 10h20" /><circle cx="10" cy="10" r="5" /></g>
    </svg>
  )
}

export default function HomeRisoPage() {
  const featured = featuredProjects(TRACK)
  const more = moreProjects(TRACK)

  return (
    <main className={`${homeStyles.page} ${mono.variable}`}>
      <div className={homeStyles.frame}>
        <SiteHeader active="/" track={TRACK} />

        <section className={styles.hero} aria-labelledby="hero-name">
          <div className={styles.grain} aria-hidden="true" />
          <RegMark className={styles.regTL} />
          <RegMark className={styles.regTR} />
          <RegMark className={styles.regBL} />
          <RegMark className={styles.regBR} />

          <div className={styles.heroIn}>
            <p className={`${styles.eyebrow} ${styles.rise}`}>UI/UX &amp; Visual Designer · New York</p>

            {/* Two plates of the same word. Each is out of register the other
                way, and multiply darkens the overlap the way ink does. */}
            <h1 id="hero-name" className={styles.op} aria-label="Lele Yang">
              <span className={`${styles.plate} ${styles.plateA}`} aria-hidden="true">Lele</span>
              <span className={`${styles.plate} ${styles.plateB}`} aria-hidden="true">Lele</span>
            </h1>

            <p className={`${styles.opSub} ${styles.rise}`} style={{ animationDelay: "160ms" }}>
              UI/UX designer with a visual designer&apos;s eye. Clear, trustworthy interfaces for complex systems and AI, plus the data visualization, brand and print work around them.
            </p>

            <p className={`${styles.opFacts} ${styles.rise}`} style={{ animationDelay: "240ms" }}>
              <span>Parsons MFA &rsquo;26</span>
              <span>Previously UI/UX at VortexNet</span>
              <span>Open to product design roles across the U.S.</span>
            </p>

            <div className={`${styles.opActions} ${styles.rise}`} style={{ animationDelay: "320ms" }}>
              <a className={styles.primary} href="#work">Selected work <span aria-hidden="true">↓</span></a>
              <a className={styles.secondary} href="/resume.pdf" target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
            </div>

            <aside className={`${styles.marg} ${styles.marg1}`}>two inks, six pixels<br />out of register —<br />on purpose</aside>
            <aside className={`${styles.marg} ${styles.marg2}`}>Lele · say it<br />like &ldquo;luh-luh&rdquo;</aside>
          </div>

          {/* The job ticket along the bottom edge: what this page is printed
              with. All three are the page's actual colours. */}
          <p className={`${styles.ticket} ${styles.rise}`} style={{ animationDelay: "480ms" }}>
            <span className={styles.ticketLabel}>Printed in three inks</span>
            <span className={styles.swatch}><i style={{ background: "#222222" }} />Black</span>
            <span className={styles.swatch}><i style={{ background: "var(--ink-a)" }} />Fluorescent pink</span>
            <span className={styles.swatch}><i style={{ background: "var(--ink-b)" }} />Blue</span>
            <span className={styles.ticketStock}>on #e4e2e2 stock</span>
          </p>
        </section>

        {/* From here down: the live home page, verbatim (app/page.jsx). */}
        <section className={homeStyles.content} id="work">
          <section className={homeStyles.selectedWork}>
            <div className={`${homeStyles.sectionHeader} ${homeStyles.reveal}`}>
              <h2>Selected Work</h2>
            </div>

            <div className={homeStyles.featuredList}>
              {featured.map((project, index) => (
                <article className={`${homeStyles.featuredCard} ${homeStyles.reveal}`} key={project.href} style={{ animationDelay: `${140 + index * 90}ms` }}>
                  <div className={homeStyles.featuredCopy}>
                    <div className={homeStyles.tagList}>
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link href={project.href} className={homeStyles.caseLink}>View case study <span aria-hidden="true">→</span></Link>
                  </div>

                  <Link href={project.href} className={homeStyles.featuredImageLink}>
                    <img src={project.image} alt={project.title} width={1600} height={1000} decoding="async" loading="lazy" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <MoreWorkCarousel className={homeStyles.moreWork} projects={more} />
        </section>

        <SiteFooter className={homeStyles.reveal} />
      </div>
    </main>
  )
}
