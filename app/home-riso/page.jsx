import { Caveat } from "next/font/google"

import { Reveal } from "../../components/Reveal"
import { featuredProjects, moreProjects } from "../../lib/projects"

import homeStyles from "../page.module.css"
import { FeaturedStacks } from "./FeaturedStacks"
import stackStyles from "./featured-stacks.module.css"
import { MoreWorkFolders } from "./MoreWorkFolders"
import folderStyles from "./more-work-folders.module.css"
import { RevealHeader } from "./RevealHeader"
import { RisoFooter } from "./RisoFooter"
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
/* The one handwritten thing on the page: the note pencilled beside the
   name once it has finished printing. */
const hand = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-hand", display: "swap" })

const TRACK = "uiux"

export default function HomeRisoPage() {
  const featured = featuredProjects(TRACK)
  const more = moreProjects(TRACK)

  return (
    <main className={`${homeStyles.page} ${hand.variable}`}>
      {/* The whole page prints on the same white as the sheet: the panel
          token is overridden here, so the live stylesheet stays untouched. */}
      <div className={`${homeStyles.frame} ${styles.whiteFrame}`}>
        {/* Docked above the page and hidden while the sheet is on screen;
            it slides in as Selected Work arrives. */}
        <RevealHeader track={TRACK} />

        <RisoHero />

        {/* Selected Work as three stages of stacked screens, More Work as
            a row of folders; the section header is the live home page's own. */}
        <Reveal fade={`.${stackStyles.card}, .${folderStyles.folder}`} />
        <section className={`${homeStyles.content} ${styles.contentTight}`} id="work">
          <section className={homeStyles.selectedWork}>
            <div className={`${homeStyles.sectionHeader} ${homeStyles.reveal}`}>
              <h2>Selected Work</h2>
            </div>

            <FeaturedStacks projects={featured} />
          </section>

          <MoreWorkFolders className={homeStyles.moreWork} projects={more} />
        </section>

        <RisoFooter />
      </div>
    </main>
  )
}
