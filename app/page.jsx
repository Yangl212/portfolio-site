import Link from "next/link"

import { MoreWorkCarousel } from "../components/MoreWorkCarousel"
import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"
import boaCover from "../pic/Cover1.png"
import clearedCover from "../pic/Cover.png"

import styles from "./page.module.css"

const featuredProjects = [
  {
    title: "BOA: Budgeting Redesign",
    description: "Making spending easier to understand and budgets easier to manage across mobile and web.",
    href: "/project/uxcasestudy",
    image: boaCover.src,
    tags: ["UI/UX Design", "Fintech"]
  },
  {
    title: "Last Message",
    description: "Exploring how AI, conversation, and interface design can shape a more intuitive interactive experience.",
    href: "/project/lastmessage",
    image: "/framer-assets/images/0e9348c3cf750b5b00ab3ec032f26a2cc73e4197.png",
    tags: ["AI", "Web Design"]
  },
  {
    title: "Backstage",
    description: "Helping people turn shared interests and free time into real-life plans.",
    href: "/project/backstage",
    image: "/framer-assets/images/3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png",
    tags: ["UI/UX Design", "Web Design"]
  }
]

const moreProjects = [
  { title: "Cleared", category: "Product Design", year: "2026", href: "/project/cleared", image: clearedCover.src },
  { title: "Graveyard", category: "Web Design", year: "2025", href: "/project/graveyard", image: "/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png" },
  { title: "TAROO", category: "Brand Design", year: "2025", href: "/project/taroo", image: "/framer-assets/images/0c4d57f9f7b2bd0585d9304ff82ad4664160d290.png" },
  { title: "Alcohol Directory", category: "Zine", year: "2025", href: "/project/alcohal", image: "/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png" },
  { title: "Suglar", category: "Visual & Game", year: "2023", href: "/project/suglar", image: "/framer-assets/images/a24d5da4bb5ee86851c88fe6ceac10ef0c01e5ad.png" }
]

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/" />

        <section className={styles.content}>
          <header className={styles.hero}>
            <h1 className={`${styles.heroTitle} ${styles.reveal}`}>Hi, I&apos;m Lele</h1>
            <p className={`${styles.heroCopy} ${styles.reveal}`}>
              A product designer focused on UX, AI, and interactive experiences - based in New York,
              currently at Parsons School of Design.
            </p>
          </header>

          <section className={styles.selectedWork}>
            <div className={`${styles.sectionHeader} ${styles.reveal}`}>
              <h2>Selected Work</h2>
            </div>

            <div className={styles.featuredList}>
              {featuredProjects.map((project, index) => (
                <article className={`${styles.featuredCard} ${styles.reveal}`} key={project.href} style={{ animationDelay: `${140 + index * 90}ms` }}>
                  <div className={styles.featuredCopy}>
                    <div className={styles.tagList}>
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link href={project.href} className={styles.caseLink}>View case study <span aria-hidden="true">→</span></Link>
                  </div>

                  <Link href={project.href} className={styles.featuredImageLink}>
                    <img src={project.image} alt={project.title} />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <MoreWorkCarousel className={styles.moreWork} projects={moreProjects} />
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
