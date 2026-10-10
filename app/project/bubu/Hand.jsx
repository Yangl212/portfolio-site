"use client"

import { useEffect, useRef } from "react"

import styles from "./page.module.css"

/*
 * The hand of screens, and the pointer running along it.
 *
 * Markup and resting layout are the stylesheet's: each card carries --t,
 * its place from -1 at the left of the hand to 1 at the right, and with no
 * script the cards simply lie fanned on the line. What this adds is the
 * motion, and all of it is one model: a point travelling along the hand
 * (`at`, in the same -1..1 as --t) and how much it is there (`on`, 0..1).
 * A card rises by how close the point is to it - a bell over the distance
 * - so moving across the hand sends a wave along it instead of switching
 * one card off and the next on, and two cards share the lift while the
 * point is between them. The cards either side lean away to let the risen
 * one through, and it turns a few degrees toward the pointer, the way a
 * card does when it is held by one edge.
 *
 * Neither `at` nor `on` jumps to the pointer; each eases toward it on
 * every frame, which is where the smoothness comes from. Nothing here
 * touches transform directly: the loop writes four numbers per card
 * (--k lift, --p push, --ry turn, --zz stacking) and the stylesheet turns
 * them into the transform, so the narrow layout, which lays the cards
 * flat, can ignore them without this file knowing.
 *
 * The same model plays the two unprompted moves. On arrival the line is
 * ruled and the cards come up through it from the middle outward (--e,
 * each card's own 0..1). Then, once, the point is walked along the hand
 * at half strength - a ripple that says the cards move - unless a real
 * pointer got there first.
 */

const BELL = 0.2 /* width of the lift, in --t; cards sit 0.25 apart */
const PART = 0.55 /* how far along the hand the parting is felt, in --t */
const REACH = 0.38 /* a card's --t of 1 is this share of the hand's width from its middle */
const LEAD = 0.027 /* a resting card shows its left side, so aim a little right of the pointer */
const RISE = 950 /* ms for one card to come up through the line */
const STAGGER = 70 /* ms between a card and the next one out from the middle */
const RIPPLE = 1700 /* ms for the ripple to cross the hand */

const clamp = (value, low, high) => Math.min(high, Math.max(low, value))
const easeOut = (p) => 1 - Math.pow(1 - p, 5)
const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

export function Hand({ cards }) {
  const ref = useRef(null)

  useEffect(() => {
    const hand = ref.current
    if (!hand) return undefined

    const els = [...hand.querySelectorAll("figure")]
    const count = els.length
    const mid = (count - 1) / 2
    const place = els.map((_, index) => (index - mid) / mid)
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const flat = window.matchMedia("(max-width: 699px)")

    const state = { at: 0, atTo: 0, on: 0, onTo: 0, risen: null, ripple: null, rippled: false, hovering: false, frame: 0, last: 0 }
    const written = els.map(() => ({}))

    const write = (index, name, value, digits) => {
      const text = value.toFixed(digits)
      if (written[index][name] === text) return
      written[index][name] = text
      els[index].style.setProperty(name, text)
    }

    const draw = (now) => {
      for (let index = 0; index < count; index += 1) {
        const away = place[index] - state.at
        const lift = state.on * Math.exp(-((away / BELL) ** 2))
        write(index, "--k", lift, 4)
        /* Away from the point, hardest for the cards next to it and
           hardly at all by the ends, so the hand parts where it is
           touched and keeps its width. */
        write(index, "--p", state.on * Math.tanh(away / 0.12) * (1 - lift) * Math.exp(-((away / PART) ** 2)) * 2.6, 3)
        write(index, "--ry", lift * clamp(away / 0.125, -1, 1) * 5, 2)
        write(index, "--zz", index + Math.round(lift * 50), 0)
        if (state.risen !== null) {
          const delay = Math.abs(index - mid) * STAGGER
          write(index, "--e", easeOut(clamp((now - state.risen - delay) / RISE, 0, 1)), 4)
        }
      }
    }

    const tick = (now) => {
      state.frame = 0
      const dt = Math.min(64, now - (state.last || now))
      state.last = now

      let busy = false

      if (state.risen !== null) {
        if (now - state.risen < RISE + mid * STAGGER) busy = true
        else if (!state.rippled && !state.hovering && !still) {
          state.rippled = true
          state.ripple = now + 250
        }
      }

      if (state.ripple !== null) {
        const p = (now - state.ripple) / RIPPLE
        if (p >= 1) {
          state.ripple = null
          state.onTo = 0
        } else if (p >= 0) {
          state.at = state.atTo = -1.3 + 2.6 * easeInOut(p)
          state.on = state.onTo = 0.5 * Math.sin(Math.PI * p)
        }
        busy = true
      }

      if (still) {
        state.at = state.atTo
        state.on = state.onTo
      } else {
        state.at += (state.atTo - state.at) * (1 - Math.exp(-dt / 75))
        state.on += (state.onTo - state.on) * (1 - Math.exp(-dt / 120))
        if (Math.abs(state.atTo - state.at) > 0.0004 || Math.abs(state.onTo - state.on) > 0.0008) busy = true
        else {
          state.at = state.atTo
          state.on = state.onTo
        }
      }

      draw(now)
      if (busy) run()
      else state.last = 0
    }

    const run = () => {
      if (!state.frame) state.frame = requestAnimationFrame(tick)
    }

    const point = (clientX) => {
      const box = hand.getBoundingClientRect()
      state.atTo = clamp(((clientX - box.left) / box.width - 0.5) / REACH + LEAD / REACH, -1.2, 1.2)
    }

    const take = () => {
      state.ripple = null
      state.rippled = true
    }

    const onMove = (event) => {
      if (flat.matches) return
      take()
      /* Arriving, not travelling: start the point under the pointer
         instead of sliding it there from wherever it was left. */
      if (!state.hovering && state.on < 0.02) {
        point(event.clientX)
        state.at = state.atTo
      }
      state.hovering = true
      point(event.clientX)
      state.onTo = 1
      run()
    }

    const onLeave = (event) => {
      /* A finger lifting is not the pointer leaving: a tapped card stays
         up until something else is tapped. */
      if (event.pointerType === "touch") return
      state.hovering = false
      state.onTo = 0
      run()
    }

    const onOutside = (event) => {
      if (hand.contains(event.target)) return
      state.hovering = false
      state.onTo = 0
      run()
    }

    const onFocus = (event) => {
      if (flat.matches) return
      const index = els.indexOf(event.target)
      /* :focus-visible keeps this to the keyboard; a click focuses the
         card too, and the pointer is already saying where the point is. */
      if (index < 0 || !event.target.matches(":focus-visible")) return
      take()
      state.atTo = place[index]
      state.onTo = 1
      run()
    }

    const onBlur = () => {
      if (state.hovering) return
      state.onTo = 0
      run()
    }

    hand.addEventListener("pointermove", onMove)
    hand.addEventListener("pointerdown", onMove)
    hand.addEventListener("pointerleave", onLeave)
    hand.addEventListener("focusin", onFocus)
    hand.addEventListener("focusout", onBlur)
    document.addEventListener("pointerdown", onOutside)

    /* The arrival. A hand already on screen when the script starts is left
       as it lies - pulling it back under the line to play it in would be
       a jolt - and so is one for a reader who asked for less motion. */
    let observer = null
    const box = hand.getBoundingClientRect()
    const inView = box.top < window.innerHeight && box.bottom > 0
    if (still || inView || flat.matches) {
      state.rippled = true
      hand.dataset.live = "in"
    } else {
      els.forEach((el, index) => write(index, "--e", 0, 4))
      hand.dataset.live = "wait"
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer.disconnect()
          hand.dataset.live = "in"
          state.risen = performance.now() + 260
          run()
        },
        { threshold: 0.35 }
      )
      observer.observe(hand)
    }

    return () => {
      if (observer) observer.disconnect()
      if (state.frame) cancelAnimationFrame(state.frame)
      hand.removeEventListener("pointermove", onMove)
      hand.removeEventListener("pointerdown", onMove)
      hand.removeEventListener("pointerleave", onLeave)
      hand.removeEventListener("focusin", onFocus)
      hand.removeEventListener("focusout", onBlur)
      document.removeEventListener("pointerdown", onOutside)
      delete hand.dataset.live
      els.forEach((el) => ["--k", "--p", "--ry", "--zz", "--e"].forEach((name) => el.style.removeProperty(name)))
    }
  }, [cards.length])

  const mid = (cards.length - 1) / 2

  return (
    <>
      <div className={styles.hand} ref={ref}>
        {cards.map((card, index) => (
          <figure className={styles.handCard} key={card.src} style={{ "--t": (index - mid) / mid, "--z": index }} tabIndex={0}>
            <img src={card.src} alt={card.name} width="804" height="1748" loading="lazy" decoding="async" draggable="false" />
          </figure>
        ))}
      </div>
    </>
  )
}
