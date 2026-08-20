import { ProjectBackLink } from "../../../components/ProjectBackLink"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

export default function AlcohalProjectPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/project" />

        <section className={styles.content}>
          <ProjectBackLink className={styles.reveal} />

          <header className={`${styles.hero} ${styles.reveal} ${styles.delay1}`}>
            <h1 className={styles.title}>aLCOHOL DIRECTORY</h1>
            <div className={styles.meta}>
              <span className={styles.category}>Visual Design</span>
              <span className={styles.year}>2024</span>
            </div>
          </header>

          <div className={`${styles.heroImage} ${styles.reveal} ${styles.delay2}`}>
            <img
              src="/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png"
              alt="Alcohol Directory cover"
            />
          </div>

          <p className={`${styles.intro} ${styles.reveal}`}>
            In New York, I was drawn to bars that are both visually captivating and thoughtfully
            crafted, along with their effortless atmosphere—combined with my interest in
            Risograph printing, this led me to create this Alcohol Directory zine.
          </p>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.label}>Mian Idea</h3>
            <div className={styles.rightCol}>
              <h2 className={styles.subhead}>
                The book traces the classic cocktails I have drunk in New York City.
              </h2>
              <p className={styles.body}>
                It is a photographic journal of nightlife, flavor, and city cultural energy. The
                book is less concerned with subjective experience than objective drink review,
                with the collision of the senses between taste, color, and memory in mind.
              </p>
            </div>
          </div>

          <div className={`${styles.pairGallery} ${styles.reveal}`}>
            <img
              className={styles.pairImage}
              src="/framer-assets/images/e45a0f4cd30eefe8fc27441ba9175797a52d1c57.png"
              alt="Alcohol Directory spread"
            />
            <img
              className={styles.pairImage}
              src="/framer-assets/images/d9fd9af0b3253543691532f63d2889cb8e858225.png"
              alt="Alcohol Directory spread"
            />
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.label}>book setup</h3>
            <div className={styles.rightCol}>
              <h2 className={styles.subhead}>Format &amp; Art</h2>
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
            </div>
          </div>

          <div className={`${styles.singleImage} ${styles.reveal}`}>
            <img
              src="/framer-assets/images/cc07e1c793e245a6d402323bc92aad29b2d2bad6.png"
              alt="Book format study"
            />
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <div className={styles.rightCol}>
              <h2 className={styles.subhead}>Structure</h2>
              <p className={styles.body}>
                The book is divided according to the taste profiles of the cocktails that I&apos;ve
                experienced in New York. The experience starts with the refreshing flavors of the
                cocktails, followed by the concentrated or strong ones. The emotions experienced
                in an evening in the city follow the same pattern.
              </p>
            </div>
          </div>

          <div className={`${styles.singleImage} ${styles.reveal}`}>
            <img
              src="/framer-assets/images/42d243e5fab64c2e2ef275ec138a184feb598268.png"
              alt="Structure diagram"
            />
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.label}>Moodboard</h3>
          </div>

          <div className={`${styles.singleImage} ${styles.reveal}`}>
            <img
              src="/framer-assets/images/c66b6d63ee8d99d60a454d4882a393ae06051d1e.png"
              alt="Moodboard"
            />
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.label}>post design</h3>
          </div>

          <div className={`${styles.pairGalleryPortrait} ${styles.reveal}`}>
            <img
              className={styles.pairImagePortrait}
              src="/framer-assets/images/987381382328bb7c55d8c7f932121000a73234a5.png"
              alt="Post design detail"
            />
            <img
              className={styles.pairImagePortrait}
              src="/framer-assets/images/017f7012c1c9f1131c319d0b9c26e5b2aa45eb18.png"
              alt="Post design detail"
            />
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.label}>final book</h3>
          </div>

          <div className={`${styles.grid} ${styles.reveal}`}>
            <img
              className={styles.gridImage}
              src="/framer-assets/images/b888c714deb12399e0ae32a3e4af79963c30fa7d.png"
              alt="Final book detail"
            />
            <img
              className={styles.gridImage}
              src="/framer-assets/images/72cd97c3b3129b7a1d948dd29e289efd41c74c36.png"
              alt="Final book detail"
            />
            <img
              className={styles.gridImage}
              src="/framer-assets/images/87de0e7dfe63f9f929d6a39c756d6880f8d94492.png"
              alt="Final book detail"
            />
            <img
              className={styles.gridImage}
              src="/framer-assets/images/b8f79aee563443b27c8e952c33c4f8fe79c47ce8.png"
              alt="Final book detail"
            />
            <img
              className={styles.gridImage}
              src="/framer-assets/images/61bf57fc290ac1c8e697603f1b95126eaafe2d4b.png"
              alt="Final book detail"
            />
            <img
              className={styles.gridImage}
              src="/framer-assets/images/88b540c5643f84a2c5214bbcde415b29390b8b5f.png"
              alt="Final book detail"
            />
          </div>

          <div className={`${styles.pairGallery} ${styles.reveal}`}>
            <img
              className={styles.pairImage}
              src="/framer-assets/images/c6bb85e5adf83cf08f8c9093a3e096d4fe83dcbc.jpg"
              alt="Final book presentation"
            />
            <img
              className={styles.pairImage}
              src="/framer-assets/images/1a49a56a595edf30f54b00a5547d495e074389b7.jpg"
              alt="Final book presentation"
            />
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
