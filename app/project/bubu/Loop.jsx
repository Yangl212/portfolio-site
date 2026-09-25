"use client"

import { useEffect, useRef } from "react"

/*
 * A drawn loop that only runs while it is on screen.
 *
 * There are six of these on the page and they are all short, so leaving
 * them on `autoplay` would have the browser decoding six videos at once
 * on a page where five of them are out of view. The observer starts one
 * when it arrives and pauses it when it leaves, which is also the honest
 * behaviour for an animation that is meant to be watched rather than to
 * sit there moving in the corner of the eye.
 *
 * The poster is a still of the first frame, so the shape is on the page
 * before the video is decoded and nothing shifts when it starts.
 */
export function Loop({ src, webm, poster, alt, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return undefined

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const played = video.play()
          if (played) played.catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      aria-label={alt}
      loop
      muted
      playsInline
      preload="none"
    >
      {/* VP9 with a real alpha channel where the browser takes it; the mp4
          under it is the same frames flattened onto the app's paper, which
          is the colour it sits on here either way. */}
      {webm ? <source src={webm} type="video/webm" /> : null}
      <source src={src} type="video/mp4" />
    </video>
  )
}
