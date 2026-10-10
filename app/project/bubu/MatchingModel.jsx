"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./page.module.css"
import { f, seeded } from "./pen"

/*
 * The matching model that came out of the second interview, drawn so it
 * can be poked at.
 *
 * Two parts. The pipeline on top is how one rival is picked; the graph
 * under it is what the picks add up to. Every edge is one-way: the arrow
 * runs from the person looking to the person they see. The dashed pair is
 * the exception - a buddy joined by invite code, who sees and is seen.
 *
 * Everything is linked through one `focus`. Pointing at a person, a step
 * or a rule lights the part of the graph it is about and prints what it
 * means under the graph. While nobody is pointing and the figure is on
 * screen, it walks itself through the four steps, so a reader who only
 * scrolls past still sees B get its rival.
 *
 * The markup is the finished drawing. Motion is added on top once the
 * script is running and only if the reader has not asked for less.
 */

/* Where everyone stands. Wide is the landscape the section has room for
   on a desktop; tall is the same graph turned for a phone column, where
   a landscape drawing would shrink its type to nothing. Both are in the
   markup and the stylesheet shows one, so a phone gets the right drawing
   before the script runs and nothing below it moves when it does. */
const layouts = {
  wide: {
    box: [760, 360],
    r: 38,
    nodes: { A: [120, 88], C: [120, 272], B: [380, 180], D: [640, 88], P: [640, 272] },
    bend: { ab: 14, cb: -14, bd: -14, bp: 20, pb: 20 },
    invite: [468, 290, "middle"],
    edgeLabels: true
  },
  tall: {
    box: [360, 606],
    r: 36,
    nodes: { A: [78, 80], C: [282, 80], B: [180, 290], D: [78, 500], P: [282, 500] },
    bend: { ab: -12, cb: 12, bd: 12, bp: 16, pb: 16 },
    invite: [352, 598, "end"],
    /* At phone width the arrows say who sees whom on their own, and their
       labels would only stack into each other. */
    edgeLabels: false,
    /* B's name would sit on the lines leaving it downward; it goes beside. */
    nameBeside: "B"
  }
}

const edges = [
  { id: "ab", from: "A", to: "B", kind: "match" },
  { id: "cb", from: "C", to: "B", kind: "match" },
  { id: "bd", from: "B", to: "D", kind: "match" },
  { id: "bp", from: "B", to: "P", kind: "invite" },
  { id: "pb", from: "P", to: "B", kind: "invite" }
]

const people = ["A", "C", "B", "D", "P"]

/* What each thing points at. `nodes` and `edges` are what stays in ink,
   `lead` is the one person drawn inverted, `ripple` is B's single log
   spreading along every relation it is part of. */
const focusMap = {
  "node:A": { nodes: "AB", edges: ["ab"], lead: "A" },
  "node:C": { nodes: "CB", edges: ["cb"], lead: "C" },
  "node:B": { nodes: "ABCDP", edges: ["ab", "cb", "bd", "bp", "pb"], lead: "B", ripple: true },
  "node:D": { nodes: "BD", edges: ["bd"], lead: "D" },
  "node:P": { nodes: "BP", edges: ["bp", "pb"], lead: "P" },
  "rule:0": { nodes: "BD", edges: ["bd"], lead: "B" },
  "rule:1": { nodes: "ABC", edges: ["ab", "cb"], lead: "B" },
  "rule:2": { nodes: "AB", edges: ["ab"], lead: "A" },
  "step:0": { nodes: "ABCDP", edges: [] },
  "step:1": { nodes: "BP", edges: ["bp", "pb"], lead: "B" },
  "step:2": { nodes: "BD", edges: ["bd"], lead: "B" },
  "step:3": { nodes: "ABC", edges: ["ab", "cb"], lead: "B" }
}

/* The icon set's circle, at this size: one stroke that goes round a
   little more than once and does not quite meet itself. */
function ring(cx, cy, r, seed) {
  const rand = seeded(seed)
  const start = rand() * Math.PI * 2
  const sweep = Math.PI * 2 + 0.2
  const n = 34
  const pts = []
  let drift = 0
  for (let i = 0; i <= n; i++) {
    const a = start + (sweep * i) / n
    drift = drift * 0.75 + (rand() - 0.5) * 1.1
    const rr = r + drift + (i / n) * 1.4
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)])
  }
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 1; i < n; i++) {
    const [x, y] = pts[i]
    const [nx, ny] = pts[i + 1]
    d += `Q${f(x)} ${f(y)} ${f((x + nx) / 2)} ${f((y + ny) / 2)}`
  }
  return d + `L${f(pts[n][0])} ${f(pts[n][1])}`
}

/* One relation as a slightly bowed line, stopping short of both rings,
   with its arrowhead and where its label sits. */
function geometry(layout, edge) {
  const [x0, y0] = layout.nodes[edge.from]
  const [x2, y2] = layout.nodes[edge.to]
  const dx = x2 - x0
  const dy = y2 - y0
  const len = Math.hypot(dx, dy)
  const nx = -dy / len
  const ny = dx / len
  const bend = layout.bend[edge.id]
  const cx = (x0 + x2) / 2 + nx * bend
  const cy = (y0 + y2) / 2 + ny * bend
  const toward = (px, py, qx, qy, gap) => {
    const l = Math.hypot(qx - px, qy - py)
    return [px + ((qx - px) / l) * gap, py + ((qy - py) / l) * gap]
  }
  const [sx, sy] = toward(x0, y0, cx, cy, layout.r + 6)
  const [ex, ey] = toward(x2, y2, cx, cy, layout.r + 7)
  const d = `M${f(sx)} ${f(sy)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`

  const ang = Math.atan2(ey - cy, ex - cx)
  const head = (spread) => [ex - 11 * Math.cos(ang + spread), ey - 11 * Math.sin(ang + spread)]
  const [h1x, h1y] = head(0.42)
  const [h2x, h2y] = head(-0.42)
  const arrow = `M${f(h1x)} ${f(h1y)}L${f(ex)} ${f(ey)}L${f(h2x)} ${f(h2y)}`

  const mx = 0.25 * sx + 0.5 * cx + 0.25 * ex
  const my = 0.25 * sy + 0.5 * cy + 0.25 * ey
  const side = Math.sign(bend) || 1
  return { d, arrow, label: [f(mx + nx * side * 16), f(my + ny * side * 16 + 4)] }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

/* The walk-through: one step at a time, then a breath with nothing lit,
   then again. */
const tour = ["step:0", "step:1", "step:2", "step:3", null]
const tourBeat = [2400, 2400, 2400, 3000, 1600]

export function MatchingModel({ copy }) {
  const root = useRef(null)
  const reduced = useReducedMotion()

  /* The mouse and the keyboard are kept apart: what is hovered wins
     while a mouse is over it, and what is focused is still there when
     the mouse has gone, so a keyboard reader's pick is not dropped by a
     pointer passing through. */
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [touring, setTouring] = useState(null)
  const [stage, setStage] = useState("still")
  const [visible, setVisible] = useState(false)
  const pointed = hovered || focused

  /* Arrive drawn if already on screen; otherwise hide, and draw in when
     scrolled to. The same observer tells the tour when to run. */
  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    /* The reduced-motion query is only answered after the first run of
       this effect, which may already have hidden the drawing: a reader
       who asked for less gets it back whole. */
    if (reduced) {
      setStage("still")
      return undefined
    }
    const onScreen = el.getBoundingClientRect().top < window.innerHeight * 0.9
    if (!onScreen) setStage("armed")
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setStage((s) => (s === "armed" ? "in" : s))
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  useEffect(() => {
    if (reduced || !visible || pointed) {
      setTouring(null)
      return undefined
    }
    let i = 0
    let timer
    const next = () => {
      setTouring(tour[i])
      timer = setTimeout(() => {
        i = (i + 1) % tour.length
        next()
      }, tourBeat[i])
    }
    /* Let the drawing finish before the first step lights. */
    timer = setTimeout(next, 1400)
    return () => clearTimeout(timer)
  }, [reduced, visible, pointed])

  const key = pointed || touring
  const focus = key ? focusMap[key] : null
  const lit = (id) => !focus || focus.nodes.includes(id)
  const on = (id) => !focus || focus.edges.includes(id)

  const readout = (() => {
    if (!key) return copy.legend
    const [kind, id] = key.split(":")
    if (kind === "node") return copy.people[id].note
    if (kind === "rule") return copy.rules[id][2]
    return copy.steps[id][2]
  })()

  /* A mouse points; a finger taps. A tap fires enter and click together,
     so hover is left to the mouse and a tap simply selects - tapping
     somewhere else moves focus away and clears it. */
  const point = (next) => (e) => { if (e.pointerType === "mouse") setHovered(next) }
  const leave = (e) => { if (e.pointerType === "mouse") setHovered(null) }
  const select = (next) => () => setFocused(next)
  const blur = () => setFocused(null)

  return (
    <div
      ref={root}
      className={styles.model}
      data-stage={stage}
      data-focus={focus ? "" : undefined}
      data-motion={reduced ? undefined : ""}
    >
      <div className={styles.modelHead}>
        <h3>{copy.title}</h3>
      </div>

      <ol className={styles.modelSteps} onPointerLeave={leave}>
        {copy.steps.map(([title, sub], index) => {
          const id = `step:${index}`
          return (
            <li
              key={title}
              className={styles.modelStep}
              style={{ "--i": index }}
              data-on={key === id ? "" : undefined}
              tabIndex={0}
              onPointerEnter={point(id)}
              onFocus={select(id)}
              onBlur={blur}
              onClick={select(id)}
            >
              <span className={styles.modelStepNo}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.modelStepTitle}>{title}</span>
              <span className={styles.modelStepSub}>{sub}</span>
            </li>
          )
        })}
      </ol>

      <div className={styles.modelBoard}>
        {Object.entries(layouts).map(([name, layout]) => {
          const [w, h] = layout.box
          const geo = Object.fromEntries(edges.map((e) => [e.id, geometry(layout, e)]))
          const inviteLabel = layout.invite
          return (
            <svg
              key={name}
              className={styles.modelGraph}
              data-layout={name}
              viewBox={`0 0 ${w} ${h}`}
              role="group"
              aria-label={copy.aria}
              onPointerLeave={leave}
            >
              {edges.map((edge, index) => {
                const g = geo[edge.id]
                const isOn = on(edge.id)
                return (
                  <g
                    key={edge.id}
                    className={styles.edge}
                    data-kind={edge.kind}
                    data-on={focus && isOn ? "" : undefined}
                    data-off={isOn ? undefined : ""}
                    style={{ "--i": index }}
                  >
                    <path className={styles.edgeLine} d={g.d} pathLength={edge.kind === "match" ? 1 : undefined} />
                    <path className={styles.edgeHead} d={g.arrow} />
                    {edge.kind === "match" && layout.edgeLabels && (
                      <text className={styles.edgeLabel} x={g.label[0]} y={g.label[1]} textAnchor="middle">
                        {edge.from} → {edge.to}
                      </text>
                    )}
                    {/* A person seeing another, as something travelling the
                        line: slow at rest, quicker when it is the point. */}
                    {!reduced && edge.kind === "match" && isOn && (
                      <circle className={styles.edgeDot} r="3.4">
                        <animateMotion dur={focus ? "1.4s" : "3.2s"} begin={`${index * 0.7}s`} repeatCount="indefinite" path={g.d} />
                      </circle>
                    )}
                    {/* B's one log, running out along every relation it is part
                        of - backwards up the arrows that point at B. */}
                    {!reduced && focus?.ripple && (
                      <circle className={styles.edgeDot} data-log="" r="3.4">
                        <animateMotion
                          dur="1.6s"
                          repeatCount="indefinite"
                          path={g.d}
                          keyPoints={edge.to === "B" ? "1;0" : "0;1"}
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                      </circle>
                    )}
                  </g>
                )
              })}

              <text
                className={styles.edgeLabel}
                data-off={on("bp") ? undefined : ""}
                x={inviteLabel[0]}
                y={inviteLabel[1]}
                textAnchor={inviteLabel[2]}
              >
                B ↔ P · {copy.inviteCode}
              </text>

              {people.map((id, index) => {
                const [cx, cy] = layout.nodes[id]
                const isLead = focus?.lead === id
                return (
                  <g
                    key={id}
                    className={styles.person}
                    data-held={id === "B" || id === "P" ? "" : undefined}
                    data-lead={isLead ? "" : undefined}
                    data-off={lit(id) ? undefined : ""}
                    style={{ "--i": index }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${copy.people[id].name}. ${copy.people[id].note}`}
                    onPointerEnter={point(`node:${id}`)}
                    onFocus={select(`node:${id}`)}
                    onBlur={blur}
                    onClick={select(`node:${id}`)}
                  >
                    {focus?.ripple && id === "B" && !reduced && (
                      <circle className={styles.personRipple} cx={cx} cy={cy} r={layout.r} />
                    )}
                    <circle className={styles.personFill} cx={cx} cy={cy} r={layout.r - 1} />
                    <path className={styles.personRing} d={ring(cx, cy, layout.r, id)} />
                    <text className={styles.personLetter} x={cx} y={cy + 10} textAnchor="middle">{id}</text>
                    <text
                      className={styles.personName}
                      {...(layout.nameBeside === id
                        ? { x: cx + layout.r + 12, y: cy + 5, textAnchor: "start" }
                        : { x: cx, y: cy + layout.r + 24, textAnchor: "middle" })}
                    >
                      {copy.people[id].name}
                    </text>
                  </g>
                )
              })}
            </svg>
          )
        })}

        {/* Read out only for what the reader points at: the walk-through
            would otherwise be announced on every beat. */}
        <p className={styles.modelReadout} aria-live={pointed ? "polite" : "off"}>
          <span key={readout}>{readout}</span>
        </p>
      </div>

      <ul className={styles.modelRules} onPointerLeave={leave}>
        {copy.rules.map(([title, body], index) => {
          const id = `rule:${index}`
          return (
            <li
              key={title}
              className={styles.modelRule}
              data-on={key === id ? "" : undefined}
              tabIndex={0}
              onPointerEnter={point(id)}
              onFocus={select(id)}
              onBlur={blur}
              onClick={select(id)}
            >
              <p className={styles.modelRuleTitle}>{title}</p>
              <p className={styles.modelRuleBody}>{body}</p>
            </li>
          )
        })}
      </ul>

      <p className={styles.modelOpen}>{copy.open}</p>
    </div>
  )
}
