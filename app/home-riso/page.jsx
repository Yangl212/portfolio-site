import { Caveat } from "next/font/google"

import { Reveal } from "../../components/Reveal"
import { t } from "../../lib/dictionary"
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
 * The riso-print home page: the name pulled as a two-colour screen print
 * (RisoHero) over the site's usual Selected Work / More Work markup.
 * Shared by both tracks - app/page.jsx renders it for "/" and
 * app/visual/page.jsx for "/visual" - with its own metadata and canonical
 * URL, so this file's own `metadata` below is only ever a fallback for
 * whichever of the two forgets to set its own.
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

export default function HomeRisoPage({ track = "uiux", locale = "en" }) {
  const featured = featuredProjects(track, locale)
  const more = moreProjects(track, locale)

  return (
    <main className={`${homeStyles.page} ${hand.variable}`}>
      {/* The whole page prints on the same white as the sheet: the panel
          token is overridden here, so the live stylesheet stays untouched. */}
      <div className={`${homeStyles.frame} ${styles.whiteFrame}`}>
        {/* Docked above the page and hidden while the sheet is on screen;
            it slides in as Selected Work arrives. */}
        <RevealHeader track={track} locale={locale} />

        <RisoHero track={track} locale={locale} />

        {/* Selected Work as three stages of stacked screens, More Work as
            a row of folders; the section header is the live home page's own. */}
        <Reveal fade={`.${stackStyles.card}, .${folderStyles.folder}`} />
        <section className={`${homeStyles.content} ${styles.contentTight}`} id="work">
          <section className={homeStyles.selectedWork}>
            <div className={`${homeStyles.sectionHeader} ${homeStyles.reveal}`}>
              <h2>{t(locale).work.selectedWork}</h2>
            </div>

            <FeaturedStacks projects={featured} locale={locale} />
          </section>

          <MoreWorkFolders className={homeStyles.moreWork} projects={more} locale={locale} />
        </section>

        <RisoFooter locale={locale} />
      </div>
    </main>
  )
}
