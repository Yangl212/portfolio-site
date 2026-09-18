"use client"

import { useEffect, useId, useRef, useState } from "react"
import styles from "./CaseVideo.module.css"

/** A silent case-study loop; the image itself is the playback control. */
export default function CaseVideo({
  src,
  poster,
  width,
  height,
  label,
  className,
  priority = false
}) {
  const videoRef = useRef(null)
  const playbackRef = useRef(null)
  const videoId = useId()
  const [playing, setPlaying] = useState(false)
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reducedMotion = motionPreference.matches
    let visible = false
    let loaded = false
    let manuallyPaused = false
    let manuallyStarted = false
    let autoplayBlocked = false
    let disposed = false
    let attemptId = 0
    let playPending = false

    setFailed(false)
    setPlaying(false)
    setPending(false)

    function load() {
      if (loaded) return
      loaded = true
      video.preload = "auto"
      video.src = src
      video.load()
    }

    function shouldPlay() {
      return !disposed && visible && !document.hidden && !manuallyPaused &&
        !autoplayBlocked && (!reducedMotion || manuallyStarted)
    }

    function pause() {
      attemptId += 1
      playPending = false
      setPending(false)
      video.pause()
    }

    function syncPlayback() {
      if (!shouldPlay()) {
        pause()
        return
      }
      if (playPending || !video.paused) return
      load()
      video.muted = true
      const currentAttempt = ++attemptId
      playPending = true
      setPending(true)
      const result = video.play()
      if (!result) {
        playPending = false
        setPending(false)
        return
      }
      result.then(() => {
        if (disposed) return
        if (!shouldPlay()) video.pause()
        if (currentAttempt === attemptId) {
          playPending = false
          setPending(false)
        }
      }).catch((error) => {
        if (disposed || currentAttempt !== attemptId) return
        playPending = false
        setPending(false)
        // A blocked autoplay requires a fresh user gesture, not more retries.
        if (error.name === "NotAllowedError") autoplayBlocked = true
        if (error.name === "NotSupportedError") setFailed(true)
      })
    }

    function onPlaying() {
      if (!shouldPlay()) {
        pause()
        return
      }
      setPlaying(true)
      setPending(false)
    }

    function onPause() {
      setPlaying(false)
    }

    function onError() {
      pause()
      setPlaying(false)
      setFailed(true)
    }

    function onMotionChange(event) {
      reducedMotion = event.matches
      if (reducedMotion) manuallyStarted = false
      syncPlayback()
    }

    playbackRef.current = () => {
      if (!video.paused || playPending) {
        manuallyPaused = true
        manuallyStarted = false
        pause()
      } else {
        manuallyPaused = false
        manuallyStarted = true
        autoplayBlocked = false
        syncPlayback()
      }
    }

    video.addEventListener("playing", onPlaying)
    video.addEventListener("pause", onPause)
    video.addEventListener("error", onError)
    video.addEventListener("canplay", syncPlayback)
    document.addEventListener("visibilitychange", syncPlayback)
    motionPreference.addEventListener("change", onMotionChange)

    let loadObserver
    let playbackObserver
    if ("IntersectionObserver" in window) {
      loadObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !reducedMotion) {
          load()
          loadObserver.disconnect()
        }
      }, { rootMargin: "300px 0px", threshold: 0 })
      playbackObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        syncPlayback()
      }, { threshold: 0 })
      loadObserver.observe(video)
      playbackObserver.observe(video)
    } else {
      // Older browsers still show the poster and support the play button.
      visible = true
      autoplayBlocked = true
    }

    if (priority && !reducedMotion) load()

    return () => {
      disposed = true
      attemptId += 1
      playbackRef.current = null
      loadObserver?.disconnect()
      playbackObserver?.disconnect()
      video.removeEventListener("playing", onPlaying)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("error", onError)
      video.removeEventListener("canplay", syncPlayback)
      document.removeEventListener("visibilitychange", syncPlayback)
      motionPreference.removeEventListener("change", onMotionChange)
      video.pause()
      video.removeAttribute("src")
      video.load()
    }
  }, [src, priority])

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <video
        id={videoId}
        ref={videoRef}
        className={styles.video}
        poster={poster}
        width={width}
        height={height}
        style={{ aspectRatio: `${width} / ${height}` }}
        loop
        muted
        playsInline
        preload="none"
        aria-label={label}
      />
      {failed ? (
        <a className={styles.openLink} href={src} target="_blank" rel="noopener noreferrer">
          Open video <span aria-hidden="true">↗</span>
          <span className={styles.srOnly}> in a new tab</span>
        </a>
      ) : (
        <button
          className={styles.control}
          type="button"
          aria-controls={videoId}
          aria-label={`${playing || pending ? "Pause" : "Play"} demo: ${label}`}
          onClick={() => playbackRef.current?.()}
        />
      )}
    </div>
  )
}
