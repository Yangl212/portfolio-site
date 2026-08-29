"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import styles from "./more-work-carousel.module.css"

export function MoreWorkCarousel({ className = "", projects }) {
  const [activePage, setActivePage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 809px)")
    const updateItemsPerPage = () => setItemsPerPage(media.matches ? 1 : 3)

    updateItemsPerPage()
    media.addEventListener("change", updateItemsPerPage)

    return () => media.removeEventListener("change", updateItemsPerPage)
  }, [])

  const pages = []
  for (let index = 0; index < projects.length; index += itemsPerPage) {
    pages.push(projects.slice(index, index + itemsPerPage))
  }

  const pageCount = pages.length

  useEffect(() => {
    setActivePage(0)
  }, [itemsPerPage])

  const goToPage = (page) => setActivePage((page + pageCount) % pageCount)

  return (
    <section className={className} aria-label="More work">
      <div className={styles.sectionHeader}>
        <h2>More Work</h2>
        <p>{projects.length} projects</p>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${activePage * 100}%)` }}>
          {pages.map((page, pageIndex) => (
            <div className={styles.page} key={pageIndex} aria-hidden={activePage !== pageIndex}>
              {page.map((project) => (
                <article className={styles.card} key={project.href}>
                  <Link href={project.href} className={styles.imageLink} tabIndex={activePage === pageIndex ? 0 : -1}>
                    <img src={project.image} alt={project.title} />
                  </Link>
                  <div className={styles.meta}>
                    <p>{project.category}</p>
                    <p>{project.year}</p>
                  </div>
                  <Link href={project.href} className={styles.titleLink} tabIndex={activePage === pageIndex ? 0 : -1}>
                    <h3>{project.title}</h3>
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" aria-label="Previous projects" onClick={() => goToPage(activePage - 1)}>←</button>
        <div className={styles.dots} aria-label={`Page ${activePage + 1} of ${pageCount}`}>
          {pages.map((_, page) => (
            <button
              type="button"
              aria-label={`Show page ${page + 1}`}
              aria-pressed={activePage === page}
              data-active={activePage === page}
              key={page}
              onClick={() => goToPage(page)}
            />
          ))}
        </div>
        <button type="button" aria-label="Next projects" onClick={() => goToPage(activePage + 1)}>→</button>
      </div>
    </section>
  )
}
