import { ProjectBackLink } from "../../../components/ProjectBackLink"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

export default function GraveyardPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/project" />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectBackLink className={styles.reveal} />

            <header className={`${styles.hero} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
              <div className={styles.heroHeader}>
                <div className={styles.heroCopy}>
                  <h1 className={styles.heroTitle}>Graveyard</h1>
                </div>
              </div>
            </header>

            <div className={`${styles.imageFull} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
              <img
                src="/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png"
                alt="Graveyard project cover"
              />
            </div>

            <p className={`${styles.lead} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
              The project visualizes this evolving relationship between language, censorship, and
              resistance across different cultures. By collecting, categorizing, and reanimating
              these lost or altered words, <em>Graveyard</em> transforms digital silence into a
              space of memory and reflection — asking how speech, politics, and creativity coexist
              in an era of algorithmic control.
            </p>
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.section}>
              <h3 className={styles.kicker}>Current problem</h3>
              <h2 className={styles.heading}>Censored Language in the Digital Age</h2>
              <p className={styles.body}>
                In today&rsquo;s digital world, language is no longer completely free. Many words
                have been banned or restricted on the internet, especially on social media
                platforms. To continue expressing ideas and emotions, people have started to
                create new ways of communication—using alternative spellings, homophones,
                symbols, or visual metaphors to replace the censored words. This constant
                adaptation shows how language evolves under control and how users resist silence
                through creativity. &ldquo;Graveyard&rdquo; explores this phenomenon by collecting
                and visualizing these &ldquo;dead&rdquo; or hidden words, revealing how censorship
                shapes online expression and cultural memory.
              </p>
              <div className={styles.figurePortrait}>
                <img
                  src="/framer-assets/images/230be045efbfe0922d1a7719dc1c67095f348b31.png"
                  alt="Censored language reference archive"
                />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Research</h3>
              <h2 className={styles.heading}>What We Can&rsquo;t Say</h2>
              <p className={styles.body}>
                Our research investigates how censorship transforms online language across
                different countries. By collecting examples of banned or restricted words, we
                trace how people adapt their expression to survive within controlled digital
                environments.
              </p>
              <p className={styles.body}>
                In China, users replace sensitive terms with homophones, emojis, or coded slang to
                evade platform filters. Words like 64, VPN, or President&rsquo;s name are replaced
                with phonetically similar phrases or abbreviations. In other regions, such as
                Russia or the U.S., political and cultural keywords are quietly removed or
                shadow-banned from public discourse.
              </p>
              <p className={styles.body}>
                Through these substitutions, language becomes a living archive of resistance — a
                creative system that reveals both constraint and agency. Graveyard visualizes this
                phenomenon as a digital memorial, where &ldquo;dead&rdquo; words are not forgotten
                but reborn through adaptation, reflecting how censorship shapes the evolution of
                culture and communication online.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/301318464d7023e67f159923f6f3a9a36b859656.png"
                  alt="Graveyard research board"
                />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Concept</h3>
              <h2 className={styles.heading}>Introduction</h2>
              <p className={styles.body}>
                Graveyard is an interactive research-based platform that explores how censorship
                reshapes online language. In the digital world, many words have been banned,
                hidden, or replaced by algorithmic systems that decide what can be said. Yet
                people continue to resist — inventing new forms of expression through homophones,
                emojis, symbols, and codes. These &ldquo;buried&rdquo; words form a linguistic
                graveyard where meaning survives through disguise.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Design Principle</h3>
              <p className={styles.body}>
                The website is designed as a digital archive rather than a traditional database.
                Inspired by the structure of filing cabinets, information is organized into
                drawers that group censored words by different themes, regions, or platforms.
              </p>
              <p className={styles.body}>
                The interaction is intentionally simple and intuitive. Each drawer acts as an
                entry point into a collection of archived words. Opening a drawer reveals original
                terms, alternative expressions, contextual information, and related references.
              </p>
              <p className={styles.body}>
                By navigating between drawers, users can compare how similar ideas evolve across
                different cultures and digital environments.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Experience</h3>
              <h2 className={styles.heading}>Information Architecture</h2>
              <p className={styles.body}>
                The website organizes information through a filing cabinet metaphor. Each drawer
                contains a collection of related words, allowing users to navigate naturally
                between different topics instead of following a linear reading experience.
                Browsing the archive is designed to feel like uncovering forgotten records.
                Opening each drawer reveals original words, substituted expressions, and
                supporting references, encouraging users to compare how language changes across
                different regions and platforms.
              </p>
              <p className={styles.body}>
                Interactions remain intentionally simple. Users select a drawer, explore the
                archived entries, and continue navigating through related content. The interface
                avoids unnecessary complexity, allowing the archive itself to become the focus of
                the experience.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Visual design</h3>
              <h2 className={styles.heading}>Design System</h2>
              <p className={styles.body}>
                The interface references archival systems through structured layouts, restrained
                typography, and generous white space. The minimal visual style allows the content
                to remain the primary focus while reinforcing the idea of digital preservation.
              </p>
              <p className={styles.body}>
                Consistent typography, spacing, and interaction patterns create a unified browsing
                experience. Every visual element supports readability and encourages users to
                focus on the archived language rather than decorative graphics.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/23322bba8cb2bef02a4f76491f14039066156dfe.png"
                  alt="Graveyard interface design system"
                />
              </div>
            </section>
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
