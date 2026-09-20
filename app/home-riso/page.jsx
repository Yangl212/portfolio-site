import { DM_Mono } from "next/font/google"

import { MoreWorkCarousel } from "../../components/MoreWorkCarousel"
import { Reveal } from "../../components/Reveal"
import { SiteFooter } from "../../components/SiteFooter"
import { featuredProjects, moreProjects } from "../../lib/projects"

import homeStyles from "../page.module.css"
import { FeaturedStacks } from "./FeaturedStacks"
import stackStyles from "./featured-stacks.module.css"
import { RevealHeader } from "./RevealHeader"
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
      {/* The whole page prints on the same white as the sheet: the panel
          token is overridden here, so the live stylesheet stays untouched. */}
      <div className={`${homeStyles.frame} ${styles.whiteFrame}`}>
        {/* Docked above the page and hidden while the sheet is on screen;
            it slides in as Selected Work arrives. */}
        <RevealHeader track={TRACK} />

        <RisoHero />

        {/* Selected Work as three stages of stacked screens; the section
            header, More Work and the footer are the live home page's own. */}
        <Reveal fade={`.${stackStyles.card}`} />
        <section className={`${homeStyles.content} ${styles.contentTight}`} id="work">
          <section className={homeStyles.selectedWork}>
            <div className={`${homeStyles.sectionHeader} ${homeStyles.reveal}`}>
              <h2>Selected Work</h2>
              <p>Three case studies, tested with real people</p>
            </div>

            <FeaturedStacks projects={featured} />
          </section>

          <MoreWorkCarousel className={homeStyles.moreWork} projects={more} />
        </section>

        <SiteFooter className={homeStyles.reveal} />
      </div>
    </main>
  )
}
