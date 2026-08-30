"use client"

import { useEffect, useRef } from "react"

/*
 * Silent looping demo video - it should read as an animated still.
 *
 * Loading is driven from here rather than left to the `autoplay` attribute,
 * because a case study page carries several of these plus ~8MB of stills. Left
 * to the browser, every clip starts fetching at once, they split the
 * connection evenly, and none of them reaches a playable frame - so the reader
 * scrolls past a column of empty boxes. That is indistinguishable from video
 * that is simply broken.
 *
 * Two rules avoid it:
 *   1. A clip only loads once it is near the viewport (`preload="none"` in the
 *      markup, raised to "auto" by the observer below).
 *   2. Only one clip fetches at a time, nearest to the middle of the screen
 *      first. The queue below is shared by every instance on the page.
 */

const waiting = []
let loading = null

function distanceFromCentre(video) {
  const box = video.getBoundingClientRect()
  return Math.abs(box.top + box.height / 2 - window.innerHeight / 2)
}

function pump() {
  if (loading || !waiting.length) return
  waiting.sort((a, b) => distanceFromCentre(a.video) - distanceFromCentre(b.video))
  loading = waiting.shift()
  loading.start()
}

function release(entry) {
  const queued = waiting.indexOf(entry)
  if (queued >= 0) waiting.splice(queued, 1)
  if (loading === entry) {
    loading = null
    pump()
  }
}

function request(entry) {
  if (loading === entry || waiting.includes(entry)) return
  waiting.push(entry)
  pump()
}

export function AutoplayVideo({ ariaLabel, className, height, src, width }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let near = false
    let handOff = null

    function play() {
      if (!near) return
      // Must be muted at the moment of the call or autoplay is refused.
      video.muted = true
      const attempt = video.play()
      if (attempt) attempt.catch(() => {})
    }

    const entry = {
      video,
      start() {
        if (video.preload !== "auto") video.preload = "auto"
        play()
        // Hand the slot on once this clip is running, and regardless after a
        // few seconds - a clip that cannot start must not block the rest.
        handOff = setTimeout(() => release(entry), 5000)
      }
    }

    function handOver() {
      clearTimeout(handOff)
      release(entry)
    }

    const observer = new IntersectionObserver(
      ([intersection]) => {
        near = intersection.isIntersecting
        if (near) {
          request(entry)
          play()
        } else {
          handOver()
          if (!video.paused) video.pause()
        }
      },
      // Start just before the card scrolls in, so it is already running by the
      // time it is on screen.
      { rootMargin: "300px 0px", threshold: 0 }
    )

    observer.observe(video)

    // One play() call is not enough to rely on: on a slow connection the first
    // one lands before there is anything to play, and a stalled download can
    // leave the element paused on a decoded frame - which again just looks
    // broken. Anything that means "there may be data now" tries again.
    const retryOn = ["loadedmetadata", "loadeddata", "canplay", "stalled", "suspend", "pause"]
    for (const type of retryOn) video.addEventListener(type, play)
    video.addEventListener("playing", handOver)

    function resumeWhenVisible() {
      if (!document.hidden) play()
    }

    document.addEventListener("visibilitychange", resumeWhenVisible)

    return () => {
      observer.disconnect()
      clearTimeout(handOff)
      release(entry)
      for (const type of retryOn) video.removeEventListener(type, play)
      video.removeEventListener("playing", handOver)
      document.removeEventListener("visibilitychange", resumeWhenVisible)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      width={width}
      height={height}
      loop
      muted
      playsInline
      preload="none"
      aria-label={ariaLabel}
    />
  )
}
