"use client"

import { useEffect, useRef, useState } from "react"

/*
 * One word rewritten by a different hand every second, round and round.
 *
 * The three hands set the word at three different widths, and left to
 * itself the line would re-wrap every second. So the word is measured in
 * each hand once, after mount, and then held at the widest of the three:
 * the hand changes, the line does not move.
 *
 * It renders the first hand on the server and starts from that one, so
 * nothing changes under hydration. The interval skips a hidden tab, and a
 * reader who has asked for less motion keeps the first hand.
 */
export function CyclingWord({ word, hands, interval = 1000 }) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(null)
  const rulerRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    /* Measured only once the hands themselves have loaded - measured
       against the fallback, the word would be held at the wrong width. */
    const measure = () => {
      const ruler = rulerRef.current
      if (cancelled || !ruler) return
      const widest = Math.max(...[...ruler.children].map((child) => child.getBoundingClientRect().width))
      if (widest > 0) setWidth(widest)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure)
    } else {
      measure()
    }

    return () => { cancelled = true }
  }, [word, hands])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined

    const timer = setInterval(() => {
      if (document.hidden) return
      setIndex((current) => (current + 1) % hands.length)
    }, interval)

    return () => clearInterval(timer)
  }, [hands.length, interval])

  return (
    <span
      className={hands[index]}
      style={width ? { display: "inline-block", width: `${Math.ceil(width)}px`, textAlign: "center" } : undefined}
    >
      {word}
      <span ref={rulerRef} aria-hidden="true" style={RULER}>
        {hands.map((hand) => (
          <span className={hand} key={hand}>{word}</span>
        ))}
      </span>
    </span>
  )
}

/* Out of the flow and out of the way: only there to be measured. */
const RULER = {
  position: "absolute",
  left: 0,
  top: 0,
  visibility: "hidden",
  pointerEvents: "none",
  whiteSpace: "nowrap"
}
