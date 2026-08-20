import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"

import styles from "./page.module.css"

export default function InterestPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/interest" />

        <section className={styles.content}>
          <div className={`${styles.hero} ${styles.reveal}`}>
            <h1 className={styles.heroTitle}>Interest</h1>

            <div className={styles.heroCopy}>
              <p className={styles.introText}>
                I like visual and graphic design, making zines, posters, and layouts just for
                fun. I&apos;m also into anime-inspired fashion and sometimes design outfits
                myself.
              </p>
              <p className={styles.introText}>
                Outside of design, I really enjoy cooking and trying new recipes.
              </p>
            </div>
          </div>

          <section className={`${styles.zineSection} ${styles.reveal} ${styles.delay1}`}>
            <div className={styles.banner}>
              <img
                src="/framer-assets/images/3378ae486d7e0ebc48884f3347a8afb515e3b6f5.png"
                alt="Zine spread banner"
              />
            </div>

            <div className={styles.zineGrid}>
              <div className={styles.zineLabelBlock}>
                <h2 className={styles.sectionLabel}>Zine</h2>
                <p className={styles.sideNote}>
                  I wanted to see what would happen if I stopped searching for meaning and
                  simply focused on what looked beautiful.
                </p>
              </div>

              <div className={styles.zineDescBlock}>
                <p className={styles.zineDesc}>
                  This zine is about anti-meaning. It doesn&apos;t try to deliver a message or
                  concept. Made with watercolor and different paper textures, it is fully driven
                  by aesthetics. There is no deeper story behind it. I simply created it based
                  on what I found beautiful.
                </p>
              </div>

              <div className={styles.imageBlock}>
                <img
                  src="/framer-assets/images/219c18200500043bc20818d114dd7b0361002d65.jpg"
                  alt="Zine watercolor detail"
                />
              </div>

              <div className={styles.imageBlock}>
                <img
                  src="/framer-assets/images/f9ae349b7f28b780cf305679437fc8a6152560bd.jpg"
                  alt="Zine anti-meaning cover detail"
                />
              </div>
            </div>
          </section>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
