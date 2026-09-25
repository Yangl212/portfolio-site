"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

import { PressRing } from "../../components/PressRing"
import { usePressCursor } from "../../components/usePressCursor"
import { t } from "../../lib/dictionary"

import styles from "./featured-stacks.module.css"

/*
 * Selected Work as three stages. Each project is a small stack of its own
 * screens - phones, a laptop, crops of the dashboard - lying on a tinted
 * sheet with a stat chip or two. They settle into place as the section
 * scrolls in, fan out when the pointer is over them, and lean with it.
 *
 * Every image is one the site already ships. Chips either scope a test result
 * to its task or state the capability the project demonstrates.
 *
 * `facets` is the one line a recruiter scans before the summary: what the
 * thing runs on, who paid for it (B2B or B2C), and the field it sits in.
 * Three short tags, always in that order, so the three cards read as one
 * table rather than three blurbs.
 *
 * Layer geometry is in percent of the stage: x/y the top-left, w the width;
 * r the resting rotation. dx/dy/dr/ds are the hover move, spin and scale.
 * depth is how far the layer leans with the pointer.
 *
 * `copy` and a chip layer's `text` are both `{ en, zh }` - geometry is
 * language-neutral and stays a single value; anything printed is a pair,
 * picked by `locale` at render time.
 */
const media = (name) => name.startsWith("/") ? name : `/home-riso/${name}.webp`

const stacks = {
  "boa-budgeting": {
    copy: {
      en: { when: "2026 · 8 weeks", role: "UI/UX Designer", summary: "A mobile and web budgeting redesign for Bank of America, tested across two task rounds.", facets: ["Mobile + Web", "B2C", "Banking"] },
      zh: { when: "2026 年 · 8 周", role: "UI/UX 设计师", summary: "我重新设计了美国银行的移动端和网页端预算功能，并做了两轮任务测试。", facets: ["移动端 + 网页", "B2C", "银行"] }
    },
    tint: "pink",
    layers: [
      { kind: "cut", src: "/boa/screen2.png", x: 1, y: 18, w: 28, r: -9, dx: -18, dy: -14, dr: -13, depth: 0.7, z: 1 },
      { kind: "cut", src: "/boa/screen3.png", x: 71, y: 16, w: 28, r: 8, dx: 18, dy: -16, dr: 13, depth: 0.7, z: 1 },
      { kind: "cut", src: "/boa/screen1.png", x: 34, y: 3, w: 32, r: 0, dx: 0, dy: -12, dr: -1, ds: 1.04, depth: 1, z: 3 },
      { kind: "chip", text: { en: "Budget reallocation · unassisted 2/6 → 5/6", zh: "预算重新分配 · 无提示 2/6 → 5/6" }, x: 0, y: 4, r: -4, dx: -8, dy: -8, dr: -7, depth: 0.5, z: 4 },
      /* The longest chip on the board: starts far enough left that even
         its hover drift stays inside the stage. */
      { kind: "chip", text: { en: "Spot overspending · median 41 s → 24 s", zh: "发现超支 · 中位数 41 秒 → 24 秒" }, x: 30, y: 66, r: 4, dx: 10, dy: 10, dr: 7, depth: 0.5, z: 4 }
    ]
  },
  vortexnet: {
    copy: {
      en: { when: "2025 · Jun – Oct", role: "UI/UX Design Intern", summary: "Task-based information hierarchy for a 30-person company’s finance dashboard, shipped during the internship.", facets: ["Web app", "B2B internal", "Fintech"] },
      zh: { when: "2025 年 · 6 月–10 月", role: "UI/UX 设计实习生", summary: "我按日常任务重新整理了一家约 30 人公司的内部金融仪表盘，并在实习期间上线。", facets: ["网页应用", "B2B 内部工具", "金融科技"] }
    },
    tint: "blue",
    layers: [
      { kind: "shot", src: "vortexnet-screen", x: 8, y: 16, w: 84, r: 0, dx: 0, dy: 4, dr: -2, ds: 1.04, depth: 0.4, z: 1 },
      { kind: "shot", src: "vortexnet-nav", x: -3, y: 38, w: 34, r: -8, dx: -28, dy: 18, dr: -14, depth: 1, z: 3 },
      { kind: "shot", src: "vortexnet-metrics", x: 48, y: 0, w: 50, r: 5, dx: 26, dy: -26, dr: 11, depth: 0.9, z: 3 },
      { kind: "shot", src: "vortexnet-priorities", x: 42, y: 70, w: 58, r: 3, dx: 24, dy: 24, dr: 8, depth: 0.7, z: 2 },
      { kind: "chip", text: { en: "Daily lookup 20–30 s → ~8 s", zh: "日常查找 20–30 秒 → 约 8 秒" }, x: 3, y: 4, r: -4, dx: -16, dy: -14, dr: -8, depth: 0.5, z: 4 }
    ]
  },
  lastmessage: {
    copy: {
      en: { when: "2026 · 4 months", role: "Product Design & Development", summary: "A playable browser-based AI detective game, designed and developed end to end across the investigation, character behavior, and interface.", facets: ["Browser game", "B2C", "AI · Narrative"] },
      zh: { when: "2026 年 · 4 个月", role: "产品设计与开发", summary: "一款可以直接在浏览器里玩的 AI 侦探游戏。我独立完成了调查结构、角色行为、界面和开发。", facets: ["浏览器游戏", "B2C", "AI · 叙事"] }
    },
    tint: "pink",
    layers: [
      { kind: "cut", src: "lastmessage-laptop", x: 6, y: 30, w: 88, r: 0, dx: 0, dy: 8, dr: 2, ds: 1.05, depth: 0.5, z: 2 },
      { kind: "shot", src: "lastmessage-chat", x: -2, y: 4, w: 46, r: -9, dx: -30, dy: -24, dr: -16, depth: 1, z: 3 },
      { kind: "shot", src: "lastmessage-routes", x: 56, y: 0, w: 46, r: 8, dx: 30, dy: -26, dr: 14, depth: 0.9, z: 3 },
      { kind: "shot", src: "lastmessage-boundary", x: 56, y: 60, w: 42, r: 4, dx: 28, dy: 24, dr: 9, depth: 0.7, z: 1 },
      { kind: "chip", text: { en: "Playable AI conversations", zh: "可玩的 AI 对话" }, x: 1, y: 5, r: -5, dx: -12, dy: -12, dr: -9, depth: 0.5, z: 4 },
      { kind: "chip", text: { en: "UX/UI · AI behavior · web development", zh: "UX/UI · AI 行为 · 网页开发" }, x: 31, y: 69, r: 4, dx: 14, dy: 14, dr: 8, depth: 0.5, z: 4 }
    ]
  },
  /* TAROO and Suglar lead the visual track's Selected Work, so they need
     a stack too - the same three cards already cut for their More Work
     folder in lib/projects.js, laid out here as a fanned hand instead of
     a folder's worth of paper. `when` is the year alone rather than a
     duration: unlike the three case studies above, no task-tested weeks
     figure exists for either project to report. */
  taroo: {
    copy: {
      en: { when: "2025", role: "Brand & Illustration Design", summary: "A tarot brand for people drawn to good design rather than fortune telling - 22 Major Arcana cards, packaging, and the visual system behind them.", facets: ["Print + Packaging", "B2C", "Brand"] },
      zh: { when: "2025 年", role: "品牌与插画设计", summary: "一套做给设计爱好者的塔罗品牌，包括 22 张大阿卡纳、包装和一套完整的视觉系统。", facets: ["印刷 + 包装", "B2C", "品牌"] }
    },
    tint: "pink",
    /* Five arcana rather than three, fanned in two depths: High Priestess
       and Sun stand at the rear corners, which takes the hand from the
       dark end of the palette to the warm one - navy, purple, mint, pink,
       orange - and the three pastel cards sit in front. On hover the back
       row spreads wider than the front, so the fan opens in two stages. */
    layers: [
      /* x sits further in than the visible edge suggests: a card this
         tall gains about 4% of the stage on each side once it is turned,
         so 7 and 62 are what keep the two rear corners inside it. */
      { kind: "cut", src: "/Taroo/card6.png", x: 7, y: 6, w: 32, r: -7, dx: -12, dy: -12, dr: -13, depth: 0.55, z: 1 },
      { kind: "cut", src: "/Taroo/card7.png", x: 62, y: 8, w: 32, r: 8, dx: 12, dy: -12, dr: 14, depth: 0.55, z: 1 },
      { kind: "cut", src: "/Taroo/card1.png", x: 20, y: 26, w: 26, r: -7, dx: -10, dy: 6, dr: -13, depth: 0.8, z: 2 },
      { kind: "cut", src: "/Taroo/card3.png", x: 54, y: 26, w: 26, r: 7, dx: 10, dy: 6, dr: 13, depth: 0.8, z: 2 },
      { kind: "cut", src: "/Taroo/card2.png", x: 36, y: 16, w: 28, r: 0, dx: 0, dy: -10, dr: -1, ds: 1.05, depth: 1, z: 3 },
      { kind: "chip", text: { en: "22 Major Arcana · one visual system", zh: "22 张大阿卡纳 · 一套视觉系统" }, x: 2, y: 2, r: -4, dx: -10, dy: -10, dr: -8, depth: 0.5, z: 4 },
      { kind: "chip", text: { en: "Packaging + card system", zh: "包装 + 卡牌系统" }, x: 44, y: 80, r: 4, dx: 12, dy: 12, dr: 7, depth: 0.5, z: 4 }
    ]
  },
  suglar: {
    copy: {
      en: { when: "2024", role: "Visual & Game Design", summary: "Translating the color, texture, and emotion of candy into a board game where sweetness becomes strategy.", facets: ["Board game", "B2C", "Game · Visual"] },
      zh: { when: "2024 年", role: "视觉与游戏设计", summary: "我把真的糖果做成桌游组件，让玩家靠看、摸、闻、尝来判断下一步。", facets: ["桌游", "B2C", "游戏 · 视觉"] }
    },
    tint: "blue",
    layers: [
      /* The box's own background is close to opaque edge to edge, so
         anything behind it only reads if it sits past the box's own
         footprint rather than under the middle of it - card1 moves out
         past the left edge for exactly that reason, the same way card3
         already clears the right edge. Both stay behind the box now. */
      { kind: "cut", src: "/suglar/box.png", x: 0, y: 2, w: 100, r: 2, dx: 4, dy: -8, dr: 3, ds: 1.02, depth: 0.6, z: 2 },
      { kind: "cut", src: "/suglar/card3.png", x: 80, y: 20, w: 16, r: 13, dx: 16, dy: 10, dr: 18, depth: 0.6, z: 1 },
      { kind: "cut", src: "/suglar/card1.png", x: 2, y: 42, w: 19, r: -15, dx: -16, dy: -8, dr: -20, depth: 0.7, z: 1 },
      { kind: "chip", text: { en: "Color & texture → game rules", zh: "颜色与质感 → 游戏规则" }, x: 1, y: 5, r: -5, dx: -12, dy: -12, dr: -9, depth: 0.5, z: 4 },
      { kind: "chip", text: { en: "Sweetness becomes strategy", zh: "甜味即策略" }, x: 40, y: 78, r: 4, dx: 14, dy: 14, dr: 8, depth: 0.5, z: 4 }
    ]
  },
  /* The app in hand, and the book it keeps: the home screen on a phone
     at the front, and behind it the weekly journal lying open - me on
     the left page, the buddy on the right - with two of the week's
     polaroids come loose off its top edge and the app icon set down
     in the corner. */
  bubu: {
    copy: {
      en: { when: "2026", role: "Product Design", summary: "A weight-loss app for two: buddies log meals as receipts, race each other to a shared goal, and fill one food journal together.", facets: ["iOS app", "B2C", "Health · Social"] },
      zh: { when: "2026 年", role: "产品设计", summary: "一款两个人一起用的减脂 App：每餐记成小票，一起朝同一个目标前进，也一起留下食物记录。", facets: ["iOS App", "B2C", "健康 · 社交"] }
    },
    tint: "pink",
    layers: [
      { kind: "cut", src: "/bubu/book.webp", x: 29, y: 7, w: 70, r: 0, dx: 16, dy: -4, dr: 3, depth: 0.5, z: 1 },
      { kind: "cut", src: "/bubu/polaroid-salad.webp", x: 55, y: 0, w: 16, r: 0, dx: -6, dy: -20, dr: -8, ds: 1.06, depth: 1, z: 2 },
      { kind: "cut", src: "/bubu/polaroid-coffee.webp", x: 66, y: 8, w: 17, r: 0, dx: 14, dy: -16, dr: 8, ds: 1.06, depth: 1.1, z: 2 },
      { kind: "cut", src: "/bubu/phone.webp", x: 1, y: 3, w: 48, r: 0, dx: -14, dy: -6, dr: -4, ds: 1.02, depth: 0.8, z: 3 },
      { kind: "app", src: "/bubu/icon.webp", x: 60, y: 70, w: 21, r: 4, dx: 12, dy: 10, dr: 10, ds: 1.08, depth: 1.2, z: 5 },
      { kind: "chip", text: { en: "Home · a race for two", zh: "首页 · 两人赛跑" }, x: 2, y: 0, r: -4, dx: -10, dy: -10, dr: -7, depth: 0.5, z: 4 },
      { kind: "chip", text: { en: "Weekly journal · me & my buddy", zh: "周记手账 · 我与搭子" }, x: 38, y: 91, r: 3, dx: 12, dy: 10, dr: 6, depth: 0.5, z: 4 }
    ]
  }
}

function layerStyle(layer, index) {
  return {
    "--x": `${layer.x}%`,
    "--y": `${layer.y}%`,
    "--w": `${layer.w}%`,
    "--r": `${layer.r}deg`,
    "--dx": `${layer.dx}px`,
    "--dy": `${layer.dy}px`,
    "--dr": `${layer.dr}deg`,
    "--ds": layer.ds || 1,
    "--depth": layer.depth,
    "--z": layer.z,
    "--i": index
  }
}

/* boa-budgeting is the one tested concept on the board; every other
   featured project is a real, finished product - bar BUBU, still being
   built, whose stage has no case study to open yet. */
const SHIPPED = new Set(["vortexnet", "lastmessage", "taroo", "suglar"])
const IN_PROGRESS = new Set(["bubu"])

function Stage({ project, stack, locale }) {
  const ref = useRef(null)
  const { tracking, ringRef, trackingProps } = usePressCursor()
  const status = t(locale).status
  const statusLabel = SHIPPED.has(project.slug) ? status.shipped : IN_PROGRESS.has(project.slug) ? status.inProgress : status.concept
  const copy = stack.copy[locale] || stack.copy.en
  /* No case study yet: the same stage, but nothing to follow. */
  const Tag = project.href ? Link : "div"
  const linkProps = project.href ? { href: project.href, "aria-label": `${project.title}: ${statusLabel}` } : { "aria-label": project.title }

  /* The layers lean toward the pointer, each by its own depth. */
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    if (!window.matchMedia("(pointer: fine)").matches) return undefined
    const onMove = (event) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty("--sx", (((event.clientX - r.left) / r.width - 0.5) * 2).toFixed(3))
      el.style.setProperty("--sy", (((event.clientY - r.top) / r.height - 0.5) * 2).toFixed(3))
    }
    const onLeave = () => {
      el.style.setProperty("--sx", "0")
      el.style.setProperty("--sy", "0")
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave) }
  }, [])

  return (
    <>
      <Tag
        ref={ref}
        className={styles.stage}
        data-tint={stack.tint}
        data-static={project.href ? undefined : ""}
        {...linkProps}
        {...trackingProps}
      >
        <span className={styles.sheet} aria-hidden="true" />
        {stack.layers.map((layer, index) => (
          <span key={layer.src || layer.text?.en} className={styles.slot} style={layerStyle(layer, index)} aria-hidden="true">
            {layer.kind === "chip"
              ? <span className={`${styles.layer} ${styles.chip}`}>{layer.text[locale] || layer.text.en}</span>
              : <img className={`${styles.layer} ${styles[layer.kind]}`} src={media(layer.src)} alt="" loading="lazy" decoding="async" />}
          </span>
        ))}
        <span className={styles.plate}>
          <span className={styles.when}>{copy.when}</span>
          <strong>{project.title} <span className={styles.arrow} aria-hidden="true">→</span></strong>
        </span>
      </Tag>

      {/* The label the header's own logo carries, naming the one thing
          about the project a reader could not otherwise tell from three
          photos: whether it shipped. Without the mark's own dot, though -
          a stage is something you click, so the reader keeps the pointer
          that says so and the label just follows it. */}
      {tracking ? <PressRing ringRef={ringRef} label={statusLabel} dot={false} /> : null}
    </>
  )
}

export function FeaturedStacks({ projects, locale = "en" }) {
  const roleLabel = t(locale).hero.role

  return (
    <div className={styles.grid}>
      {projects.map((project) => {
        const stack = stacks[project.slug]
        if (!stack) return null
        const copy = stack.copy[locale] || stack.copy.en
        return (
          <article key={project.slug} className={styles.card}>
            <Stage project={project} stack={stack} locale={locale} />
            <div className={styles.copy}>
              <ul className={styles.facets} data-tint={stack.tint}>
                {copy.facets.map((facet) => <li key={facet} className={styles.facet}>{facet}</li>)}
              </ul>
              <p className={styles.description}>{copy.summary}</p>
              <p className={styles.role}><span>{roleLabel}</span> — {copy.role}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
