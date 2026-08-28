"use client"

import Link from "next/link"
import { useState } from "react"

import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"
import boaCover from "../pic/Cover1.png"
import clearedCover from "../pic/Cover.png"

import styles from "./page.module.css"

const projects = [
  {
    title: "BOA: Budgeting Redesign",
    category: "UI&UX Design · AI",
    year: "2026",
    href: "/project/uxcasestudy",
    image: boaCover.src,
    filter: "UI/UX"
  },
  {
    title: "Cleared",
    category: "Product Design · AI-assisted",
    year: "2026",
    href: "/project/cleared",
    image: clearedCover.src,
    filter: "UI/UX"
  },
  {
    title: "Last Message",
    category: "AI · Web Design",
    year: "2026",
    href: "/project/lastmessage",
    image: "/framer-assets/images/0e9348c3cf750b5b00ab3ec032f26a2cc73e4197.png",
    filter: "UI/UX"
  },
  {
    title: "Graveyard",
    category: "Web Design",
    year: "2025",
    href: "/project/graveyard",
    image: "/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png",
    filter: "UI/UX"
  },
  {
    title: "Backstage",
    category: "Web Design",
    year: "2025",
    href: "/project/backstage",
    image: "/framer-assets/images/3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png",
    filter: "UI/UX"
  },
  {
    title: "TAROO",
    category: "Brand Design",
    year: "2025",
    href: "/project/taroo",
    image: "/framer-assets/images/0c4d57f9f7b2bd0585d9304ff82ad4664160d290.png",
    filter: "Visual"
  },
  {
    title: "ALCOHOL DIRECTORY",
    category: "Zine",
    year: "2024",
    href: "/project/alcohal",
    image: "/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png",
    filter: "Visual"
  },
  {
    title: "Suglar",
    category: "Visual & Game",
    year: "2023",
    href: "/project/suglar",
    image: "/framer-assets/images/a24d5da4bb5ee86851c88fe6ceac10ef0c01e5ad.png",
    filter: "Visual"
  },
  {
    title: "Inflankland",
    category: "UI&UX Design",
    year: "2023",
    href: "/project/inflankland",
    image: "/framer-assets/images/734124733fc1c29039d94f4e1379cc8624fbca0b.jpg",
    filter: "UI/UX"
  },
]

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState("All")

  const visibleProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((project) => project.filter === selectedFilter)

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/" />

        <section className={styles.content}>
          <div className={styles.hero}>
            <h1 className={`${styles.heroTitle} ${styles.reveal}`}>Hi, I&apos;m Lele</h1>
            <div className={`${styles.heroCopyRow} ${styles.reveal} ${styles.delay1}`}>
              <p className={styles.heroCopy}>
                A product designer focused on UX, AI, and interactive experiences &mdash; based
                in New York, graduated from Parsons School of Design.
              </p>
            </div>
          </div>

          <div className={`${styles.header} ${styles.reveal}`}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionTitle}>Selected Work</span>
            </div>

            <div
              className={styles.filter}
              role="radiogroup"
              aria-label="Project category"
            >
              {["All", "UI/UX", "Visual"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="radio"
                  aria-checked={selectedFilter === filter}
                  className={styles.filterOption}
                  data-selected={selectedFilter === filter}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.grid}>
            {visibleProjects.map((project, index) => (
              <article
                key={`${selectedFilter}-${project.href}`}
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
