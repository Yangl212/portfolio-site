"use client"

import Link from "next/link"
import { useState } from "react"

import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"

import styles from "./page.module.css"

const projects = [
  {
    title: "UX Case Study",
    category: "UI&UX Design · AI",
    year: "2026",
    href: "/xiangmuxiangqing/uxcasestudy",
    image: "/framer-assets/images/6a904de1906d34f3cf29f4186873a42e74d89b22.png"
  },
  {
    title: "Last Message",
    category: "AI · Web Design",
    year: "2025",
    href: "/xiangmuxiangqing/lastmessage",
    image: "/framer-assets/images/0e9348c3cf750b5b00ab3ec032f26a2cc73e4197.png"
  },
  {
    title: "Graveyard",
    category: "Web Design",
    year: "2025",
    href: "/xiangmuxiangqing/graveyard",
    image: "/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png"
  },
  {
    title: "Backstage",
    category: "Brand Design",
    year: "2025",
    href: "/xiangmuxiangqing/backstage",
    image: "/framer-assets/images/3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png"
  },
  {
    title: "TAROO",
    category: "Zine",
    year: "2025",
    href: "/xiangmuxiangqing/taroo",
    image: "/framer-assets/images/0c4d57f9f7b2bd0585d9304ff82ad4664160d290.png"
  },
  {
    title: "ALCOHAL DIRECTORY",
    category: "Visual Design",
    year: "2024",
    href: "/xiangmuxiangqing/alcohal",
    image: "/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png"
  },
  {
    title: "Suglar",
    category: "UI&UX Design",
    year: "2023",
    href: "/xiangmuxiangqing/suglar",
    image: "/framer-assets/images/a24d5da4bb5ee86851c88fe6ceac10ef0c01e5ad.png"
  },
  {
    title: "Inflankland",
    category: "UI&UX Design",
    year: "2023",
    href: "/xiangmuxiangqing/inflankland",
    image: "/framer-assets/images/734124733fc1c29039d94f4e1379cc8624fbca0b.jpg"
  },
  {
    title: "Totnurture",
    category: "UI&UX Design",
    year: "2023",
    href: "/xiangmuxiangqing/totnurture",
    image: "/framer-assets/images/182394c0d5cca71d7c4379f80af4d7a45e257d1c.jpg"
  }
]

export default function ProjectPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const selectFilter = (filter) => {
    setSelectedFilter(filter)
    setIsFilterOpen(false)
  }

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/project" />

        <section className={styles.content}>
          <div className={styles.header}>
            <h1 className={`${styles.title} ${styles.reveal}`}>Project</h1>

            <div className={`${styles.filter} ${styles.reveal}`}>
              <button
                type="button"
                className={styles.filterButton}
                aria-expanded={isFilterOpen}
                aria-haspopup="menu"
                onClick={() => setIsFilterOpen((open) => !open)}
              >
                <span>{selectedFilter}</span>
                <span className={styles.filterChevron} aria-hidden="true" />
              </button>

              {isFilterOpen && (
                <div className={styles.filterMenu} role="menu" aria-label="Project category">
                  {["All", "UI/UX", "Visual"].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      role="menuitemradio"
                      aria-checked={selectedFilter === filter}
                      className={styles.filterOption}
                      data-selected={selectedFilter === filter}
                      onClick={() => selectFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.grid}>
            {projects.map((project, index) => (
              <article
                key={project.href}
                className={`${styles.card} ${styles.reveal}`}
                style={{ animationDelay: `${150 + index * 80}ms` }}
              >
                {(project.category || project.year) && (
                  <div className={styles.meta}>
                    <p className={styles.category}>{project.category}</p>
                    <p className={styles.year}>{project.year}</p>
                  </div>
                )}

                <Link href={project.href} className={styles.imageLink}>
                  <img src={project.image} alt={project.title} className={styles.image} />
                </Link>

                <Link href={project.href} className={styles.titleLink}>
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
