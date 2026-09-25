import { localeBase } from "./locale"

/*
 * One record per project, and one place that decides what order they read in.
 *
 * The site is applied for on two tracks: leleyang.com for UI/UX roles and
 * leleyang.com/visual for visual and brand roles. Both tracks show the SAME
 * eight case studies - only the order and, where a project reads differently
 * to each audience, the labels in a `visual` override. Each audience meets the
 * relevant work first, described in its own terms. The case study pages
 * themselves are shared, never duplicated; a track is carried into them as a
 * prop, which is what keeps the header, the "All Projects" link, and
 * prev/next pointing back at the track the reader came in on.
 *
 * A second axis, `locale`, works the same way: a `zh` override block holds
 * the Chinese description/tags/category, merged in after the track override
 * so a Chinese visual-track reader gets both. `title` and `navName` stay in
 * English in every override - they are product names (TAROO, BUBU, ...),
 * not prose - unless a project's zh block says otherwise.
 *
 * Only the first three of each order are rendered as full featured cards, so
 * those are the ones that need `description` and `tags`. The rest appear in
 * the More Work carousel, which uses `category` and `year`.
 */
export const projects = {
  "boa-budgeting": {
    title: "BOA: Budgeting Redesign",
    navName: "BOA: Budgeting Redesign",
    description:
      "A mobile and web budgeting redesign tested across two task rounds: unassisted budget reallocation rose from 2 of 6 to 5 of 6, while overspending scan time fell from 41 to 24 seconds.",
    tags: ["UI/UX Design", "Fintech"],
    category: "UI/UX Design",
    year: "2026",
    image: "/covers/boa-budgeting.webp",
    /* The default track is read by UI/UX leads, so it keeps those words. The
       visual track meets the same work as the data and icon design it also is. */
    visual: {
      tags: ["Data Visualization", "Icon Design"],
      category: "Data Visualization"
    },
    zh: {
      description:
        "我重新设计了移动端和网页端的预算功能。两轮任务测试后，6 位参与者中，能在没有提示的情况下完成预算重新分配的人从 2 位增加到 5 位；发现超支所需的中位时间也从 41 秒降到了 24 秒。",
      tags: ["UI/UX 设计", "金融科技"],
      category: "UI/UX 设计"
    },
    zhVisual: {
      tags: ["数据可视化", "图标设计"],
      category: "数据可视化"
    },
    /* Three of the product's own charts, cut out of their screens: the
       spending ring off the phone, and the cash-flow chart and the
       Sankey off the web dashboard. The cover already shows the
       reallocate screen, so none of these repeat it. */
    cardStyle: "widgets",
    cards: ["/boa/piece-ring.webp", "/boa/piece-flow.webp", "/boa/piece-sankey.webp"]
  },
  lastmessage: {
    title: "Last Message",
    navName: "Last Message",
    description:
        "An open-ended detective game with a readable main investigation and an optional, more demanding hidden route reached by 2 of 8 players in the playtest.",
    tags: ["AI", "Web Design"],
    category: "Product Design",
    year: "2026",
    image: "/covers/lastmessage.webp",
    zh: {
      description:
        "一款可以自由盘问 AI 角色的侦探游戏。主线不难跟，另外藏了一条更难的路线；测试时，8 位玩家里有 2 位找到了它。",
      tags: ["AI", "网页设计"],
      category: "产品设计"
    },
    /* Three stills off the game's own case-video loops: the chat, the
       route map, and the warning that leads to the hidden ending -
       thrown out of the folder like evidence cards, all three clear of
       the cover rather than two of them sinking behind it. */
    cardStyle: "flung",
    cards: ["/lastmessage/media/chat-poster.webp", "/lastmessage/media/routes-poster.webp", "/lastmessage/media/boundary-poster.webp"]
  },
  backstage: {
    title: "Backstage",
    navName: "Backstage",
    description: "Helping people turn shared interests and free time into real-life plans.",
    tags: ["UI/UX Design", "Web Design"],
    category: "Product Design",
    year: "2025",
    image: "/covers/backstage.webp",
    zh: {
      description: "把共同的兴趣和都空着的时间凑在一起，变成一次真的会发生的线下见面。",
      tags: ["UI/UX 设计", "网页设计"],
      category: "产品设计"
    },
    /* Pieces of the product rather than a deck of cards, so they scatter
       up over the cover instead of fanning out behind it. */
    cardStyle: "scatter",
    cards: ["/backstage/card2.png", "/backstage/card1.webp", "/backstage/card3.png"]
  },
  taroo: {
    title: "TAROO",
    navName: "Taroo",
    description:
      "A tarot brand for people drawn to good design rather than fortune telling - 22 Major Arcana cards, packaging, and the visual system behind them.",
    tags: ["Brand Design", "Illustration"],
    category: "Brand Design",
    year: "2025",
    image: "/covers/taroo.webp",
    zh: {
      description:
        "一套做给设计爱好者的塔罗品牌：22 张大阿卡纳、包装，以及贯穿其中的视觉系统。它更像一件设计物件，不太像算命工具。",
      tags: ["品牌设计", "插画"],
      category: "品牌设计"
    },
    /* Three of the Major Arcana. `cards` puts them in the folder behind
       the cover in More Work, fanned out when it is pointed at. */
    cards: ["/Taroo/card1.png", "/Taroo/card2.png", "/Taroo/card3.png"]
  },
  suglar: {
    title: "Suglar",
    navName: "Suglar",
    description:
      "Translating the color, texture, and emotion of candy into a board game where sweetness becomes strategy.",
    tags: ["Game Design", "Visual Design"],
    category: "Visual & Game",
    year: "2024",
    image: "/covers/suglar.webp",
    zh: {
      description: "我把真的糖果做成了桌游组件。玩家要靠看、摸、闻、尝来判断下一颗糖，吃得太多反而会输。",
      tags: ["游戏设计", "视觉设计"],
      category: "视觉与游戏"
    },
    cardStyle: "toss",
    cards: ["/suglar/card1.png", "/suglar/card2.png", "/suglar/card3.png"]
  },
  alcohol: {
    title: "Alcohol Directory",
    navName: "Alcohol Directory",
    description:
      "A riso zine of the cocktails I drank in New York. One spread per drink - what it was, where I had it, and what it tasted like.",
    tags: ["Zine", "Editorial"],
    category: "Zine",
    year: "2025",
    image: "/covers/alcohol.webp",
    zh: {
      description:
        "一本记录纽约鸡尾酒的孔版印刷小册子。每杯酒占一个跨页，写下酒名、酒吧、地址，还有我记得的味道。",
      tags: ["独立小册子", "编辑设计"],
      category: "小册子"
    },
    /* Two spreads out of the zine, one behind the cover and one in front. */
    cardStyle: "spreads",
    cards: ["/alcohol/card1.webp", "/alcohol/card2.webp"]
  },
  graveyard: {
    title: "Graveyard",
    navName: "Graveyard",
    category: "Web Design",
    year: "2025",
    image: "/covers/graveyard.webp",
    zh: {
      category: "网页设计"
    },
    /* The cabinet the archive is kept in, and one of its records. */
    cardStyle: "case",
    cards: ["/graveyard/card1.png", "/graveyard/card2.png"]
  },
  vortexnet: {
    title: "VortexNet: Finance Dashboard",
    navName: "VortexNet: Finance Dashboard",
    description:
      "Task-based information hierarchy for an internal finance dashboard, tested with 10 colleagues. Daily lookup fell from roughly 20–30 seconds to about 8, with Pending settlement and Trend among the tasks.",
    tags: ["Work Experience", "Data Visualization"],
    category: "UI/UX Design",
    year: "2025",
    image: "/covers/vortexnet.webp",
    /* The visual track meets the same work as information design. */
    visual: {
      tags: ["Data Visualization", "Information Design"],
      category: "Data Visualization"
    },
    zh: {
      description:
        "我按日常任务重新整理了一套内部金融仪表盘的信息架构。和 10 位同事测试后，查找「待结算」「趋势」等信息的时间从约 20–30 秒缩短到约 8 秒。",
      tags: ["工作经历", "数据可视化"],
      category: "UI/UX 设计"
    },
    zhVisual: {
      tags: ["数据可视化", "信息设计"],
      category: "数据可视化"
    },
    /* Three screens from the shipped dashboard, picked for how they read
       at thumbnail size - the nav and metric-strip crops were mostly pale
       whitespace once shrunk, so the set leans on the two full, denser
       screens plus one bold KPI strip instead. */
    cardStyle: "panels",
    cards: ["/vortexnet/media/dashboard-detail.webp", "/vortexnet/media/legacy-screen.webp", "/vortexnet/media/region-after.webp"]
  },
  /* Featured on the visual track only. The case study is live, so the
     stage links and BUBU takes its place in prev/next; the work itself is
     still in progress, which the page says in its own status line. */
  bubu: {
    title: "BUBU",
    navName: "BUBU",
    description: "A weight-loss app for two: buddies log meals as receipts, race each other to a shared goal, and fill one food journal together.",
    tags: ["App Design", "Illustration"],
    category: "App Design",
    year: "2026",
    zh: {
      description: "一款两个人一起用的减脂 App：每餐记成一张小票，两个人朝同一个目标前进，也一起留下食物记录。",
      tags: ["App 设计", "插画"],
      category: "App 设计"
    }
  },
  cleared: {
    title: "AI Calendar",
    navName: "AI Calendar",
    description:
      "A usability-tested AI Calendar concept. Participants understood suggestions and confirmed events, while four returned to the source email to verify the AI’s interpretation.",
    tags: ["UI/UX Design", "AI"],
    category: "UI/UX Design",
    year: "2026",
    image: "/covers/cleared.webp",
    zh: {
      description:
        "一个经过可用性测试的 AI 日历概念。参与者都能看懂建议并确认日程，但其中 4 位还是会回看邮件原文，确认 AI 有没有理解对。",
      tags: ["UI/UX 设计", "AI"],
      category: "UI/UX 设计"
    },
    /* Two whole screens from the prototype - the week, and the mail the
       assistant read. The suggestion card was a third: tall and narrow,
       it never sat well against the other two whichever way it was
       thrown, so the folder shows the two that read cleanly. */
    cardStyle: "windows",
    cards: ["/cleared/hifi-calendar.png", "/cleared/hifi-mail.png"]
  }
}

/* The two reading orders. Each track's home page features the first three and
   carousels the rest, and prev/next walks the same list. */
export const trackOrder = {
  uiux: ["vortexnet", "boa-budgeting", "lastmessage", "cleared", "backstage", "graveyard", "taroo", "alcohol", "suglar"],
  visual: ["taroo", "suglar", "bubu", "boa-budgeting", "graveyard", "vortexnet", "cleared", "alcohol", "lastmessage", "backstage"]
}

export const tracks = Object.keys(trackOrder)

/* "" for the UI/UX track, "/visual" for the visual one. Every in-track URL is
   this prefix plus the shared path, which is what lets one set of pages serve
   both tracks without either linking into the other. */
export function trackBase(track) {
  return track === "visual" ? "/visual" : ""
}

/* Track and locale together: the prefix every in-site URL on a page hangs
   off. Both axes are URL segments, so a page only has to know which two it
   was rendered for and every link it writes stays in that corner of the
   site - the reader who switched to Chinese keeps reading Chinese when they
   click Work, and the visual track still never links into the UI/UX one. */
export function pageBase(track, locale = "en") {
  return `${localeBase(locale)}${trackBase(track)}`
}

export function trackHome(track, locale = "en") {
  return pageBase(track, locale) || "/"
}

/* Both tracks have an About page now. Kept as a function, not a flag
   inlined at each call site, since the header's own mark already links
   there unconditionally - this is only for the two places (the hero
   name's press-to-open, and the resume page's back link) that still
   ask first. */
export function aboutReady() {
  return true
}

export function projectHref(slug, track, locale = "en") {
  return `${pageBase(track, locale)}/project/${slug}`
}

function card(slug, track, locale = "en") {
  const { visual, zh, zhVisual, ...project } = projects[slug]
  const overrides = [
    track === "visual" ? visual : null,
    locale === "zh" ? zh : null,
    locale === "zh" && track === "visual" ? zhVisual : null
  ]

  return { ...project, ...Object.assign({}, ...overrides), slug, href: project.noPage ? null : projectHref(slug, track, locale) }
}

export function featuredProjects(track, locale = "en") {
  return trackOrder[track].slice(0, 3).map((slug) => card(slug, track, locale))
}

export function moreProjects(track, locale = "en") {
  return trackOrder[track].slice(3).map((slug) => card(slug, track, locale))
}

/* Wraps around, so the last project's "next" is the first one rather than a
   dead end. */
export function projectNeighbors(slug, track = "uiux", locale = "en") {
  const order = (trackOrder[track] || trackOrder.uiux).filter((key) => !projects[key].noPage)
  const index = order.indexOf(slug)

  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: card(order[(index - 1 + order.length) % order.length], track, locale),
    next: card(order[(index + 1) % order.length], track, locale)
  }
}
