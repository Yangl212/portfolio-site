import { ProjectHero } from "../../../components/ProjectHero"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

export default function AlcohalProjectPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/" />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero label="Personal Work" discipline="Editorial Design · 2024" title="Alcohol Directory" image="/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png" imageAlt="Alcohol Directory cover" summary="A risograph-inspired cocktail zine that documents New York bar culture through drinks, color, and memory." problem="Nightlife stories are often reduced to places, not the sensory moments that define them." contribution="Art direction, editorial design, photography, and print production." outcome="A tactile visual archive of cocktails and city nightlife." role="Visual Designer" scope="Research · Art Direction · Editorial Design · Riso" platform="Print" timeline="6 weeks" />

            <header hidden className={`${styles.hero} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
              <div className={styles.heroHeader}>
                <div className={styles.heroCopy}>
                  <h1 className={styles.heroTitle}>aLCOHOL DIRECTORY</h1>
                </div>
              </div>
            </header>

            <div hidden className={`${styles.imageFull} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
              <img
                src="/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png"
                alt="Alcohol Directory cover"
              />
            </div>

            <p hidden className={`${styles.lead} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
              In New York, I was drawn to bars that are both visually captivating and thoughtfully
              crafted, along with their effortless atmosphere—combined with my interest in
              Risograph printing, this led me to create this Alcohol Directory zine.
            </p>
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.section}>
              <h3 className={styles.kicker}>Mian Idea</h3>
              <h2 className={styles.heading}>
                The book traces the classic cocktails I have drunk in New York City.
              </h2>
              <p className={styles.body}>
                It is a photographic journal of nightlife, flavor, and city cultural energy. The
                book is less concerned with subjective experience than objective drink review,
                with the collision of the senses between taste, color, and memory in mind.
              </p>
              <div className={styles.imageRow}>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/e45a0f4cd30eefe8fc27441ba9175797a52d1c57.png"
                    alt="Alcohol Directory spread"
                  />
                </div>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/d9fd9af0b3253543691532f63d2889cb8e858225.png"
                    alt="Alcohol Directory spread"
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>book setup</h3>
              <h2 className={styles.heading}>Format &amp; Art</h2>
              <p className={styles.body}>
                Dimensions: 10cm x 20cm
                <br />
                RISO style
                <br />
                Portrait
                <br />
                <br />
                I am still deciding between coil binding and traditional binding, so the format
                might be adjusted later.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/cc07e1c793e245a6d402323bc92aad29b2d2bad6.png"
                  alt="Book format study"
                />
              </div>

              <h2 className={styles.heading}>Structure</h2>
              <p className={styles.body}>
                The book is divided according to the taste profiles of the cocktails that I&apos;ve
                experienced in New York. The experience starts with the refreshing flavors of the
                cocktails, followed by the concentrated or strong ones. The emotions experienced
                in an evening in the city follow the same pattern.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/42d243e5fab64c2e2ef275ec138a184feb598268.png"
                  alt="Structure diagram"
                />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Moodboard</h3>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/c66b6d63ee8d99d60a454d4882a393ae06051d1e.png"
                  alt="Moodboard"
                />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>post design</h3>
              <div className={styles.imageRow}>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/987381382328bb7c55d8c7f932121000a73234a5.png"
                    alt="Post design detail"
                  />
                </div>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/017f7012c1c9f1131c319d0b9c26e5b2aa45eb18.png"
                    alt="Post design detail"
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>final book</h3>
              <div className={styles.imageRow}>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/b888c714deb12399e0ae32a3e4af79963c30fa7d.png"
                    alt="Final book detail"
                  />
                </div>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/72cd97c3b3129b7a1d948dd29e289efd41c74c36.png"
                    alt="Final book detail"
                  />
                </div>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/87de0e7dfe63f9f929d6a39c756d6880f8d94492.png"
                    alt="Final book detail"
                  />
                </div>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/b8f79aee563443b27c8e952c33c4f8fe79c47ce8.png"
                    alt="Final book detail"
                  />
                </div>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/61bf57fc290ac1c8e697603f1b95126eaafe2d4b.png"
                    alt="Final book detail"
                  />
                </div>
                <div className={styles.imageRowItem}>
                  <img
                    src="/framer-assets/images/88b540c5643f84a2c5214bbcde415b29390b8b5f.png"
                    alt="Final book detail"
                  />
                </div>
              </div>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/c6bb85e5adf83cf08f8c9093a3e096d4fe83dcbc.jpg"
                  alt="Final book presentation"
                />
              </div>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/1a49a56a595edf30f54b00a5547d495e074389b7.jpg"
                  alt="Final book presentation"
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
