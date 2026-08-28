import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"

import styles from "./page.module.css"

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/" />

        <section className={styles.content}>
          <div className={styles.hero}>
            <h1 className={`${styles.heroTitle} ${styles.reveal}`}>Hi, I&apos;m Lele</h1>
            <div className={`${styles.heroCopyRow} ${styles.reveal} ${styles.delay1}`}>
              <p className={styles.heroCopy}>
                A product designer focused on UX, AI, and interactive experiences. I like turning
                complex systems into products that feel clear and easy to use. My work spans user
                research, interaction design, visual design, and prototyping, and I often work with
                code and AI tools to bring ideas beyond Figma into working experiences.
              </p>
            </div>
          </div>

          <div className={styles.cards}>
            <article className={`${styles.card} ${styles.cardLeft} ${styles.reveal} ${styles.delay1}`}>
              <div className={styles.cardImage}>
                <img
                  src="/framer-assets/images/3ff1df5774d70f0c8a13dabffd6f9b6d038e2c5e.png"
                  alt="Lele Yang portrait"
                />
              </div>
              <h2 className={styles.cardTitle}>About Me</h2>
            </article>

            <article className={`${styles.card} ${styles.cardRight} ${styles.reveal} ${styles.delay2}`}>
              <div className={styles.cardImage}>
                <img
                  src="/framer-assets/images/518ff9e8866d99472ed20ef757d33c57d3e4f46f.png"
                  alt="Selected creative work"
                />
              </div>
              <div className={styles.aboutBody}>
                <p>
                  I&apos;m a hands-on designer who moves between research, systems thinking,
                  and interface craft, grounded in UI/UX and product design. AI shows up
                  throughout my work: I use it to prototype faster and pressure-test ideas,
                  and I&apos;m especially drawn to designing AI-driven products where trust,
                  control, and clarity matter as much as intelligence.
                </p>
                <p>
                  Outside of screens, I make things with my hands: ceramics, woodworking,
                  zines.
                </p>
              </div>
            </article>
          </div>
        </section>

        <SiteFooter className={`${styles.reveal} ${styles.delay3}`} />
      </div>
    </main>
  )
}
