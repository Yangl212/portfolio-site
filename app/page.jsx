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
            <h1 className={`${styles.heroTitle} ${styles.reveal}`}>Hey, it&apos;s Lele</h1>
            <div className={`${styles.heroCopyRow} ${styles.reveal} ${styles.delay1}`}>
              <p className={styles.heroCopy}>
                A Interactive Designer based in New York. I&apos;m currently a graduate student
                at Parsons School of Design. My work covers UI/UX design, interactive media,
                and narrative games.
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
                  I am a hands-on multidisciplinary designer with UI/UX, game design, and
                  graphic design experience. I also have web development, illustration, and
                  logo abilities, combining technique with creativity to create interesting
                  and interactive projects on numerous platforms.
                </p>
                <p>
                  I also have strong hands-on skills, with experience in ceramics,
                  woodworking, and other craft techniques.
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
