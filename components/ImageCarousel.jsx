"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

import styles from "./image-carousel.module.css"

/*
 * One image at a time, stepped with the arrows, the dots, or a swipe.
 *
 * Every slide stays in the flex track rather than being mounted on demand: the
 * neighbours are what bleed off either edge, dimmed, so the reader can see
 * there are more pages without a second one competing for attention. Clicking
 * a neighbour steps to it; clicking the centre one opens it full screen, since
 * these are dense desktop screens that a column of body text cannot do justice.
 */
export function ImageCarousel({ className = "", label, slides }) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const count = slides.length
  const goTo = (index) => setActive((index + count) % count)

  const onTouchStart = (event) => setTouchStart(event.touches[0].clientX)

  const onTouchEnd = (event) => {
    if (touchStart === null) return
    const distance = event.changedTouches[0].clientX - touchStart
    if (Math.abs(distance) > 45) goTo(active + (distance < 0 ? 1 : -1))
    setTouchStart(null)
  }

  const step = (event) => {
    if (event.key === "ArrowLeft") goTo(active - 1)
    if (event.key === "ArrowRight") goTo(active + 1)
  }

  // The overlay owns the keyboard and the scroll position while it is open, and
  // hands both back untouched on close.
  useEffect(() => {
    if (!zoomed) return

    const onKeyDown = (event) => {
      if (event.key === "Escape") setZoomed(false)
      else step(event)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [zoomed, active])

  const slide = slides[active]

  return (
    <div className={`${styles.carousel} ${className}`.trim()} role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        className={styles.viewport}
        onKeyDown={step}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
      >
        <div className={styles.track} style={{ "--active": active }}>
          {slides.map((item, index) => (
            <figure
              className={styles.slide}
              key={item.src}
              data-active={active === index}
              aria-hidden={active !== index}
            >
              <button
                type="button"
                className={styles.slideButton}
                tabIndex={active === index ? 0 : -1}
                aria-label={active === index ? `Enlarge image ${index + 1}` : `Show image ${index + 1}`}
                onClick={() => (active === index ? setZoomed(true) : goTo(index))}
              >
                <img src={item.src} alt={item.alt} loading={index === 0 ? undefined : "lazy"} decoding="async" />
              </button>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" aria-label="Previous image" onClick={() => goTo(active - 1)}>
          &#8592;
        </button>

        <div className={styles.dots}>
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.src}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={active === index}
              data-active={active === index}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <button type="button" aria-label="Next image" onClick={() => goTo(active + 1)}>
          &#8594;
        </button>
      </div>

      {zoomed
        /* Portalled to the body: the track carries a transform, which would
           otherwise become the containing block for a fixed overlay. */
        ? createPortal(
            <div
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`${label} - image ${active + 1} of ${count}`}
              onClick={() => setZoomed(false)}
            >
              <button type="button" className={styles.lightboxClose} aria-label="Close full screen" onClick={() => setZoomed(false)}>
                &#10005;
              </button>

              <button
                type="button"
                className={styles.lightboxPrev}
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation()
                  goTo(active - 1)
                }}
              >
                &#8592;
              </button>

              <img
                className={styles.lightboxImage}
                src={slide.src}
                alt={slide.alt}
                onClick={(event) => event.stopPropagation()}
              />

              <button
                type="button"
                className={styles.lightboxNext}
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation()
                  goTo(active + 1)
                }}
              >
                &#8594;
              </button>

              <p className={styles.lightboxCounter}>
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
