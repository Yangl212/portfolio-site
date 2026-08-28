import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"

import styles from "./page.module.css"

function InstagramIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 13.438 2.188 L 6.563 2.188 C 4.146 2.188 2.188 4.146 2.188 6.563 L 2.188 13.438 C 2.188 15.854 4.146 17.813 6.563 17.813 L 13.438 17.813 C 15.854 17.813 17.813 15.854 17.813 13.438 L 17.813 6.563 C 17.813 4.146 15.854 2.188 13.438 2.188 Z M 10 13.75 C 7.929 13.75 6.25 12.071 6.25 10 C 6.25 7.929 7.929 6.25 10 6.25 C 12.071 6.25 13.75 7.929 13.75 10 C 13.75 12.071 12.071 13.75 10 13.75 Z M 14.063 6.875 C 13.545 6.875 13.125 6.455 13.125 5.938 C 13.125 5.42 13.545 5 14.063 5 C 14.58 5 15 5.42 15 5.938 C 15 6.455 14.58 6.875 14.063 6.875 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 448 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3C448 46.5 433.6 32 416 32zM135.4 416H69V202.2h66.5V416zM102.2 173a38.5 38.5 0 1 1 0-77 38.5 38.5 0 0 1 0 77zM416 416h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/contact" />

        <section className={styles.content}>
          <div className={`${styles.hero} ${styles.reveal}`}>
            <h1 className={styles.title}>Contact</h1>
            <div className={styles.subtitleRow}>
              <p className={styles.subtitle}>
                Feel free to reach out for collaboration, inquiries, or just to say hi.
              </p>
            </div>
          </div>

          <div className={`${styles.details} ${styles.reveal} ${styles.delay1}`}>
            <div className={styles.spacer} aria-hidden="true" />

            <div className={styles.group}>
              <p className={styles.label}>Personal Contact</p>
              <div className={styles.groupList}>
                <a href="mailto:Lelework1211@gmail.com" className={styles.value}>
                  Lelework1211@gmail.com
                </a>
                <a href="tel:+19177672493" className={styles.value}>
                  (+1)917-767-2493
                </a>
              </div>
            </div>

            <div className={styles.group}>
              <p className={styles.label}>Social Media</p>
              <div className={styles.socialList}>
                <a
                  href="https://www.instagram.com/shanjio17"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.social}
                >
                  <InstagramIcon />
                  <span className={styles.value}>shanjio17</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/leleyang1211"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.social}
                >
                  <LinkedinIcon />
                  <span className={styles.value}>leleyang1211</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter className={`${styles.reveal} ${styles.delay2}`} />
      </div>
    </main>
  )
}
