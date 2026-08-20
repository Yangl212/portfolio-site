import { ProjectBackLink } from "../../../components/ProjectBackLink"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

const personalityTraits = [
  "Visually driven, enjoys colors and design",
  "Emotionally open",
  "Curious, playful, and likes to collect beautiful things"
]

const competitors = [
  {
    name: "The Modern Witch Tarot",
    image: "/framer-assets/images/dc3881dbc2e05bbe4a63549fe6774c595d6f7244.png",
    description:
      "A contemporary reinterpretation of the Rider–Waite deck featuring diverse, modern female characters. It focuses on empowerment, feminism, and inclusivity, making it relatable to younger audiences seeking self-expression and confidence through tarot imagery.",
    keywords: "Character-driven · Feminism · Empowerment"
  },
  {
    name: "OK Tarot",
    image: "/framer-assets/images/be9365ca90faaa9c4d6a4e5182b328c238cc3ef2.png",
    description:
      "A minimalist and beginner-friendly tarot deck designed with simple line drawings and no facial features. Its pink color palette and approachable aesthetic lower the barrier for new users while emphasizing intuition over traditional symbolism.",
    keywords: "Minimalist · Beginner-friendly · Faceless"
  },
  {
    name: "Prismavisions Tarot",
    image: "/framer-assets/images/bc001b0a1c023f69fc9228f6829c9fcc4cec2198.png",
    description:
      "A minimalist and beginner-friendly tarot deck designed with simple line drawings and no facial features. Its pink color palette and approachable aesthetic lower the barrier for new users while emphasizing intuition over traditional symbolism.",
    keywords: "Minimalist · Beginner-friendly · Faceless"
  }
]

const finalProductImages = [
  "/framer-assets/images/5fbc98cf9df93597d10c0f861682d63da5658f43.png",
  "/framer-assets/images/55ef7d1e82d0b3730f6aa708d084518b94eca511.png",
  "/framer-assets/images/ff8fe4581ffca27adf6ebb6bde4b88406cdb35ff.png"
]

export default function TarooPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/project" />

        <section className={styles.content}>
          <ProjectBackLink className={styles.reveal} />

          <h1 className={`${styles.title} ${styles.reveal} ${styles.delay1}`}>Taroo</h1>

          <div className={`${styles.heroImage} ${styles.reveal} ${styles.delay1}`}>
            <img
              src="/framer-assets/images/0c4d57f9f7b2bd0585d9304ff82ad4664160d290.png"
              alt="Taroo project cover"
            />
          </div>

          <p className={`${styles.intro} ${styles.reveal} ${styles.delay2}`}>
            We want to reach people who might not consider themselves &ldquo;spiritual,&rdquo;
            but who love meaningful design, visual tools, and personal insight. This includes
            students, artists, designers, journalers, and anyone who just wants a pretty and
            useful deck on their desk or shelf.
          </p>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.rowLabel}>Brand Overview</h3>
            <div className={styles.rowBody}>
              <h2 className={styles.subheading}>Key words</h2>
              <div className={styles.keywordImage}>
                <img
                  src="/framer-assets/images/613a87350cf8ea4863473ee18000054c7c15bd90.png"
                  alt="Taroo key words board"
                />
              </div>

              <h2 className={styles.subheading}>Audience</h2>
              <p className={styles.bodyCopy}>
                We want to reach people who might not consider themselves &ldquo;spiritual,&rdquo;
                but who love meaningful design, visual tools, and personal insight. This includes
                students, artists, designers, journalers, and anyone who just wants a pretty and
                useful deck on their desk or shelf.
              </p>

              <h2 className={styles.subheading}>Personality traits</h2>
              <ol className={styles.traitList}>
                {personalityTraits.map((trait) => (
                  <li key={trait}>{trait}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.rowLabel}>Competitor</h3>
            <div className={styles.rowBody}>
              {competitors.map((competitor) => (
                <article key={competitor.name} className={styles.competitorCard}>
                  <h2 className={styles.subheading}>{competitor.name}</h2>
                  <div className={styles.competitorImage}>
                    <img src={competitor.image} alt={competitor.name} />
                  </div>
                  <p className={styles.bodyCopy}>{competitor.description}</p>
                  <p className={styles.keywords}>
                    <span className={styles.keywordsLabel}>Keywords: </span>
                    {competitor.keywords}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.rowLabel}>Mood Board</h3>
            <div className={styles.rowBody}>
              <h2 className={styles.subheading}>Color</h2>
              <div className={styles.wideImage}>
                <img
                  src="/framer-assets/images/e977fd7ff13555ab29179463ed5df8bc332fb12b.png"
                  alt="Taroo color mood board"
                />
              </div>

              <h2 className={styles.subheading}>Typography</h2>
              <div className={styles.typeImage}>
                <img
                  src="/framer-assets/images/7c81948064546ffd40e4f625440c6f034ab9d4cf.png"
                  alt="Taroo typography mood board"
                />
              </div>
            </div>
          </div>

          <div className={`${styles.row} ${styles.reveal}`}>
            <h3 className={styles.rowLabel}>Final Product</h3>
            <div className={styles.rowBody}>
              {finalProductImages.map((src, index) => (
                <div key={src} className={styles.finalImage}>
                  <img src={src} alt={`Taroo final product ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
