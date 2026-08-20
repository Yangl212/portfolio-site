import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"

import styles from "./page.module.css"

const travelPhotos = [
  {
    src: "/framer-assets/images/fa185a10f40131e943355fcaa6c679e2850c2578.png",
    place: "Japan, Kyoto",
    date: "2024/06/01"
  },
  {
    src: "/framer-assets/images/ab5ecd6c90cf97f5cce88865d79d15ec6e0bf1d2.jpg",
    place: "New york, Hudson",
    date: "2025/02/17"
  },
  {
    src: "/framer-assets/images/8fcc113278c60ba7ef828566f4592daa4e5467c2.png",
    place: "China, Zhejiang",
    date: "2023/10/09"
  },
  {
    src: "/framer-assets/images/b56f6ca543cfd9b907bbc720bde0bce891a409da.png",
    place: "Thailand",
    date: "2024/03/20"
  },
  {
    src: "/framer-assets/images/beef617b8722f812fd99a4e40519c3927d5b80f2.png",
    place: "London",
    date: "2022/07/14"
  },
  {
    src: "/framer-assets/images/1a8704e25d217a240384eb41e8cfa2aeadd00fb2.jpg",
    place: "China, Chongqing",
    date: "2020/08/29"
  }
]

export default function InterestPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/interest" />

        <section className={styles.content}>
          <div className={`${styles.hero} ${styles.reveal}`}>
            <h1 className={styles.heroTitle}>Interest</h1>
            <div className={styles.introRow}>
              <span className={styles.introDivider} aria-hidden="true" />
              <h3 className={styles.introText}>
                I like visual and graphic design, making zines, posters, and layouts just for
                fun. I&apos;m also into anime-inspired fashion and sometimes design outfits
                myself.
                <br />
                <br />
                Outside of design, I really enjoy cooking and trying new recipes.
              </h3>
            </div>
          </div>

          <div className={`${styles.section} ${styles.reveal} ${styles.delay1}`}>
            <div className={styles.banner} style={{ aspectRatio: "2.73" }}>
              <img
                src="/framer-assets/images/3378ae486d7e0ebc48884f3347a8afb515e3b6f5.png"
                alt="Zine spread banner"
              />
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Zine</h3>
              <p className={styles.cardDesc}>
                This zine is about anti-meaning. It doesn&apos;t try to deliver a message or
                concept. Made with watercolor and different paper textures, it is fully driven by
                aesthetics. There is no deeper story behind it. I simply created it based on what
                I found beautiful.
              </p>
            </div>

            <div className={styles.mediaRow}>
              <p className={styles.mediaCaption}>
                I wanted to see what would happen if I stopped searching for meaning and simply
                focused on what looked beautiful.
              </p>
              <div className={styles.mediaImages}>
                <div className={styles.mediaImage} style={{ aspectRatio: "1" }}>
                  <img
                    src="/framer-assets/images/219c18200500043bc20818d114dd7b0361002d65.jpg"
                    alt="Zine watercolor detail"
                  />
                </div>
                <div className={styles.mediaImage} style={{ aspectRatio: "1" }}>
                  <img
                    src="/framer-assets/images/f9ae349b7f28b780cf305679437fc8a6152560bd.jpg"
                    alt="Zine watercolor detail"
                  />
                </div>
              </div>
            </div>

            <div className={styles.mediaRow}>
              <p className={styles.mediaCaption}>
                During the making process, I explored various materials, each with its own
                visual, tactile, and even olfactory qualities.
              </p>
              <div className={styles.mediaImages}>
                <div className={styles.mediaImage} style={{ aspectRatio: "1.917" }}>
                  <img
                    src="/framer-assets/images/529e7ef2fe55a5738deeea6b824d53dc4d528fac.jpg"
                    alt="Zine paper texture materials"
                  />
                </div>
                <div className={styles.mediaImage} style={{ aspectRatio: "2.112" }}>
                  <img
                    src="/framer-assets/images/c580c92a1210c7a44eef8a03396abe44a2d26259.jpg"
                    alt="Zine paper texture materials"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.section} ${styles.reveal} ${styles.delay2}`}>
            <div className={styles.banner} style={{ aspectRatio: "2.81" }}>
              <img
                src="/framer-assets/images/11792f48f66bb7ab468377cc0bbdcaef27c49e81.png"
                alt="Photography and travel banner"
              />
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Photography &amp; Travel</h3>
              <p className={styles.cardDesc}>
                For me, photography is a way to slow down and balance daily life.
              </p>
            </div>
          </div>

          <div className={styles.travelGrid}>
            {travelPhotos.map((photo, index) => (
              <article
                key={photo.place + photo.date}
                className={`${styles.travelCard} ${styles.reveal}`}
                style={{ animationDelay: `${360 + index * 80}ms` }}
              >
                <div className={styles.travelImage}>
                  <img src={photo.src} alt={photo.place} />
                </div>
                <div className={styles.travelMeta}>
                  <p className={styles.travelPlace}>{photo.place}</p>
                  <h3 className={styles.travelDate}>{photo.date}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
