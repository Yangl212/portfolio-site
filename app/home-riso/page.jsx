import Link from "next/link"
import { DM_Mono } from "next/font/google"

import { MoreWorkCarousel } from "../../components/MoreWorkCarousel"
import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"
import { featuredProjects, moreProjects } from "../../lib/projects"

import homeStyles from "../page.module.css"
import { RisoHero } from "./RisoHero"
import styles from "./page.module.css"

/*
 * A second home page, kept beside the live one so the two can be compared.
 *
 * Only the hero is new (RisoHero): the name printed in two misregistered
 * riso inks, filling the first screen so nothing below shows until the
 * reader scrolls. Everything under it is the live home page's own markup and
 * stylesheet, untouched, so the comparison is about the hero alone.
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

export default function HomeRisoPage() {
  const featured = featuredProjects(TRACK)
  const more = moreProjects(TRACK)

  return (
    <main className={`${homeStyles.page} ${mono.variable}`}>
      <div className={homeStyles.frame}>
        <SiteHeader active="/" track={TRACK} />

        <RisoHero />

        {/* From here down: the live home page, verbatim (app/page.jsx). The
            only difference is the top padding, so the sheet runs straight
            into the Selected Work rule instead of leaving a blank band. */}
        <section className={`${homeStyles.content} ${styles.contentTight}`} id="work">
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
