"use client"

import { useEffect, useId, useRef, useState } from "react"

import styles from "./flow-map.module.css"

/*
 * The build's user flow, drawn rather than exported.
 *
 * The Figma board exists twice, once per language, identical but for the
 * words - so this is one geometry with a pair of labels on every node,
 * and the page's own locale picks which one prints. A flat export would
 * have been two 3500px images that go soft when scaled, carry text no
 * reader can select and no screen reader can reach, and drift out of date
 * the moment a screen is renamed.
 *
 * Coordinates are Figma's, kept verbatim: a 1052 x 1022 board, six branch
 * columns on a 168 pitch and rows on a 70 pitch. Nodes are HTML so the
 * labels wrap and scale on their own; the connectors are one SVG on the
 * same viewBox underneath them.
 *
 * Motion is one stroke, not a grid of beats. The spine is a single line
 * that the nodes sit on top of, so it draws as one pull of the pen and
 * each box surfaces as the ink reaches it; the bar sweeps out from the
 * middle; the columns fall as a ripple from the centre outward; the loop
 * is drawn last, through a mask, so a dashed line can still be drawn
 * end to end. Following a branch runs a current along the same route -
 * spine, then bar, then column - and lifts its boxes in turn.
 */

/* --- geometry, straight off the board --- */
const W = 1052
const H = 1022
const NODE_W = 132
const NODE_H = 46
const SPINE_X = 460
const BAR_Y = 484
const COL_X = [40, 208, 376, 544, 712, 880]
const ROW_Y = [512, 582, 652, 722, 792, 862, 932]

const mid = (x) => x + NODE_W / 2
const CX = mid(SPINE_X)

const spine = [
  { y: 130, label: { en: "BUBU", zh: "BUBU·步步" }, t: 0 },
  { y: 200, label: { en: "Sign in / Sign up", zh: "登录 / 注册" }, t: 90 },
  { y: 270, label: { en: "Set your goal", zh: "设定目标" }, note: { en: "height · weight · target · weeks", zh: "身高 · 体重 · 目标 · 周期" }, t: 250 },
  { y: 340, label: { en: "How to record", zh: "怎么记录" }, note: { en: "solo / duo", zh: "单人 / 双人" }, t: 410 },
  { y: 410, label: { en: "Home", zh: "首页" }, note: { en: "Day N · today's photos · track", zh: "第 N 天 · 今天的照片 · 跑道" }, t: 570 }
]

/* Each branch is the tab strip's own order, and the column under it. */
const branches = [
  {
    id: "record",
    label: { en: "Record", zh: "记录" },
    nodes: [
      { label: { en: "Record", zh: "记录" }, note: { en: "+", zh: "＋" } },
      { label: { en: "Camera / Library", zh: "拍照 / 相册" } },
      { label: { en: "Auto cutout", zh: "自动抠图" } },
      { label: { en: "Paste on receipt", zh: "贴到小票" }, note: { en: "breakfast · lunch · dinner · snack · scale", zh: "早餐 · 午餐 · 晚餐 · 加餐 · 体重" } },
      { label: { en: "Goal reached", zh: "目标达成" }, note: { en: "when the target weight is hit", zh: "到达目标体重时" } },
      { label: { en: "New challenge", zh: "开始新的挑战" }, note: { en: "back to Set your goal", zh: "回到设定目标" } }
    ]
  },
  {
    id: "receipts",
    label: { en: "Receipts", zh: "小票" },
    nodes: [
      { label: { en: "Receipts", zh: "小票" }, note: { en: "tap today's photos", zh: "点今天的照片" } },
      { label: { en: "Today's receipts", zh: "当天小票" }, note: { en: "me / Buddy", zh: "我 / TA" } },
      { label: { en: "My receipt", zh: "我的小票" } },
      { label: { en: "Add · Share", zh: "补记 · 分享" }, note: { en: "exercise · weight", zh: "运动 · 体重" } }
    ]
  },
  {
    id: "journal",
    label: { en: "Journal", zh: "手账本" },
    nodes: [
      { label: { en: "Journal", zh: "手账本" } },
      { label: { en: "Cover", zh: "封面" } },
      { label: { en: "Title page", zh: "扉页" } },
      { label: { en: "Week page", zh: "周页" }, note: { en: "me / Buddy", zh: "我 / TA" } },
      { label: { en: "Overview", zh: "全景" } }
    ]
  },
  {
    id: "challenge",
    label: { en: "Challenge", zh: "挑战" },
    nodes: [
      { label: { en: "Challenge", zh: "挑战" } },
      { label: { en: "Progress", zh: "进度" }, note: { en: "7 medals", zh: "7 枚奖牌" } },
      { label: { en: "Rules", zh: "规则" } },
      { label: { en: "Full rules · FAQ", zh: "完整规则 · 常见问题" } }
    ]
  },
  {
    id: "buddy",
    label: { en: "Buddy", zh: "搭子" },
    nodes: [
      { label: { en: "Buddy", zh: "搭子" }, note: { en: "line under the track", zh: "跑道下那行" } },
      { label: { en: "Invite a buddy", zh: "邀请搭子" }, note: { en: "make / enter a code", zh: "生成 / 输入邀请码" } },
      { label: { en: "Paired", zh: "组队成功" } },
      { label: { en: "Pair ends", zh: "组队解除" }, note: { en: "3 days missed · solo · new challenge", zh: "缺席 3 天 · 换单人 · 新挑战" } }
    ]
  },
  {
    id: "settings",
    label: { en: "Settings", zh: "设置" },
    nodes: [
      { label: { en: "Settings", zh: "设置" }, note: { en: "top right", zh: "右上角" } },
      { label: { en: "Language", zh: "语言" }, note: { en: "system / 中文 / English", zh: "跟随系统 / 中文 / English" } },
      { label: { en: "Mode", zh: "记录方式" }, note: { en: "solo / duo", zh: "单人 / 双人" } },
      { label: { en: "Rename", zh: "改名" } },
      { label: { en: "Report & block", zh: "举报并屏蔽" } },
      { label: { en: "Terms · Privacy", zh: "协议 · 隐私" } },
      { label: { en: "Sign out · Delete", zh: "退出 · 注销" } }
    ]
  }
]

/* --- the strokes --- */
/* The spine is one line from under BUBU to the bar; the boxes lie on it
   and hide the parts between them. Same for each column: one line from
   the bar down to its last box. */
const SPINE_D = `M ${CX} ${spine[0].y + NODE_H} V ${BAR_Y}`
const BAR_L = `M ${CX} ${BAR_Y} H ${mid(COL_X[0])}`
const BAR_R = `M ${CX} ${BAR_Y} H ${mid(COL_X[5])}`
const colD = (col) => `M ${mid(COL_X[col])} ${BAR_Y} V ${ROW_Y[branches[col].nodes.length - 1] + 12}`
const barTo = (col) => `M ${CX} ${BAR_Y} H ${mid(COL_X[col])}`

/* The one edge that is not a straight drop: New challenge sends you back
   up to Set your goal, the only cycle on the board and the reason the
   product does not end when you hit the number. */
const LOOP_D = `M ${COL_X[0]} ${ROW_Y[5] + NODE_H / 2} H 18 V 293 H ${SPINE_X}`

/* Draw-in timing, in ms. The columns ripple out from the middle: the two
   centre ones first, the outer pair last. */
const T_BAR = 720
const T_COLS = 1120
const colStart = (col) => T_COLS + Math.abs(col - 2.5) * 90
const T_LOOP = 2050

export function FlowMap({ locale = "en", copy }) {
  const [active, setActive] = useState(null)
  const [pinned, setPinned] = useState(false)
  const [drawn, setDrawn] = useState(false)
  const ref = useRef(null)
  const maskId = useId()

  const pick = (pair) => (pair ? pair[locale] || pair.en : null)

  /* The board draws itself once, when it is first scrolled to - the same
     contract as the rest of the page's sections. */
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const focus = (id) => {
    if (pinned && active === id) {
      setPinned(false)
      setActive(null)
      return
    }
    setActive(id)
    setPinned(true)
  }
  const hover = (id) => { if (!pinned) setActive(id) }
  const clearHover = () => { if (!pinned) setActive(null) }

  const dimmed = (id) => (active && id && active !== id ? "" : undefined)
  const lit = (id) => (active && active === id ? "" : undefined)

  return (
    <figure className={styles.wrap} ref={ref}>
      <div className={styles.controls} role="group" aria-label={copy.filterLabel}>
        <button
          type="button"
          className={styles.chip}
          data-on={active === null || undefined}
          onClick={() => { setActive(null); setPinned(false) }}
        >
          {copy.all}
        </button>
        {branches.map((branch) => (
          <button
            key={branch.id}
            type="button"
            className={styles.chip}
            data-on={active === branch.id || undefined}
            aria-pressed={pinned && active === branch.id}
            onClick={() => focus(branch.id)}
            onMouseEnter={() => hover(branch.id)}
            onMouseLeave={clearHover}
          >
            {pick(branch.label)}
          </button>
        ))}
      </div>

      <div className={styles.scroller}>
        <div
          className={styles.board}
          data-drawn={drawn || undefined}
          data-focused={active || undefined}
          style={{ "--w": W, "--h": H }}
          role="img"
          aria-label={copy.alt}
        >
          <svg className={styles.wires} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
            <defs>
              {/* A dashed line cannot be unrolled with dashoffset - the
                  dashes are the offset. So it is revealed instead: a
                  solid stroke drawn along the same path, used as a mask. */}
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                <path className={styles.reveal} d={LOOP_D} pathLength="1" style={{ "--t": T_LOOP, "--dur": 700 }} />
              </mask>
            </defs>

            {/* the resting wires */}
            <path className={styles.wire} d={SPINE_D} pathLength="1" style={{ "--t": 0, "--dur": 720 }} />
            <path className={styles.wire} d={BAR_L} pathLength="1" style={{ "--t": T_BAR, "--dur": 440 }} />
            <path className={styles.wire} d={BAR_R} pathLength="1" style={{ "--t": T_BAR, "--dur": 440 }} />
            {branches.map((branch, col) => (
              <path
                key={branch.id}
                className={styles.wire}
                d={colD(col)}
                pathLength="1"
                data-dim={dimmed(branch.id)}
                style={{ "--t": colStart(col), "--dur": 560 }}
              />
            ))}
            <path
              className={styles.loop}
              d={LOOP_D}
              mask={`url(#${maskId})`}
              data-dim={dimmed("record")}
              data-lit={lit("record")}
            />

            {/* the current: a heavier stroke that runs the route to a
                focused branch, spine then bar then column */}
            <path className={styles.pulse} d={SPINE_D} pathLength="1" data-leg="spine" data-on={active ? "" : undefined} />
            {branches.map((branch, col) => (
              <g key={branch.id}>
                <path className={styles.pulse} d={barTo(col)} pathLength="1" data-leg="bar" data-on={lit(branch.id)} />
                <path className={styles.pulse} d={colD(col)} pathLength="1" data-leg="col" data-on={lit(branch.id)} />
              </g>
            ))}

            {/* the dots where a line meets a box, as the board draws them */}
            <circle className={styles.cap} cx={CX} cy={spine[0].y + NODE_H} r="3" style={{ "--t": 0 }} />
            <circle className={styles.cap} cx={SPINE_X} cy="293" r="3" data-dim={dimmed("record")} style={{ "--t": T_LOOP + 620 }} />
            {branches.map((branch, col) => (
              <circle
                key={branch.id}
                className={styles.cap}
                cx={mid(COL_X[col])}
                cy={ROW_Y[0] - 3}
                r="3"
                data-dim={dimmed(branch.id)}
                style={{ "--t": colStart(col) + 60 }}
              />
            ))}
          </svg>

          {spine.map((node, i) => (
            <div
              key={node.label.en}
              className={styles.node}
              data-spine=""
              data-root={i === 0 ? "" : undefined}
              style={{ "--x": SPINE_X, "--y": node.y, "--t": node.t, "--row": i }}
            >
              <span className={styles.label}>{pick(node.label)}</span>
              {node.note ? <span className={styles.note}>{pick(node.note)}</span> : null}
            </div>
          ))}

          {branches.map((branch, col) =>
            branch.nodes.map((node, row) => (
              <div
                key={`${branch.id}-${node.label.en}`}
                className={styles.node}
                data-head={row === 0 ? "" : undefined}
                data-dim={dimmed(branch.id)}
                data-lit={lit(branch.id)}
                style={{ "--x": COL_X[col], "--y": ROW_Y[row], "--t": colStart(col) + 120 + row * 95, "--row": row }}
                onMouseEnter={() => hover(branch.id)}
                onMouseLeave={clearHover}
              >
                <span className={styles.label}>{pick(node.label)}</span>
                {node.note ? <span className={styles.note}>{pick(node.note)}</span> : null}
              </div>
            ))
          )}
        </div>
      </div>

      {/* The board is one picture to a screen reader, so the structure it
          draws is also written out here, where it can be read in order. */}
      <ol className={styles.plain}>
        {spine.map((node) => <li key={node.label.en}>{pick(node.label)}</li>)}
        {branches.map((branch) => (
          <li key={branch.id}>
            {pick(branch.label)}
            <ol>{branch.nodes.map((node) => <li key={node.label.en}>{pick(node.label)}</li>)}</ol>
          </li>
        ))}
      </ol>

      <figcaption className={styles.caption}>{copy.caption}</figcaption>
    </figure>
  )
}
