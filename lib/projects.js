import boaCover from "../pic/Cover1.png"
import clearedCover from "../pic/Cover.png"

/*
 * One record per project, and one place that decides what order they read in.
 *
 * The site is applied for on two tracks: leleyang.com for UI/UX roles and
 * leleyang.com/visual for visual and brand roles. Both tracks show the SAME
 * eight case studies - only the order changes, so each audience meets the
 * relevant work first. The case study pages themselves are shared, never
 * duplicated; a track is carried into them as a prop, which is what keeps the
 * header, the "All Projects" link, and prev/next pointing back at the track
 * the reader came in on.
 *
 * Only the first three of each order are rendered as full featured cards, so
 * those are the ones that need `description` and `tags`. The rest appear in
 * the More Work carousel, which uses `category` and `year`.
 */
export const projects = {
  uxcasestudy: {
    title: "BOA: Budgeting Redesign",
    navName: "BOA: Budgeting Redesign",
    description:
      "Making spending easier to understand and budgets easier to manage across mobile and web.",
    tags: ["UI/UX Design", "Fintech"],
    category: "UI/UX Design",
    year: "2026",
    image: boaCover.src
  },
  lastmessage: {
    title: "Last Message",
    navName: "Last Message",
    description:
      "Exploring how AI, conversation, and interface design can shape a more intuitive interactive experience.",
    tags: ["AI", "Web Design"],
    category: "Product Design",
    year: "2026",
    image: "/framer-assets/images/0e9348c3cf750b5b00ab3ec032f26a2cc73e4197.png"
  },
  backstage: {
    title: "Backstage",
    navName: "Backstage",
    description: "Helping people turn shared interests and free time into real-life plans.",
    tags: ["UI/UX Design", "Web Design"],
    category: "Product Design",
    year: "2025",
    image: "/framer-assets/images/3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png"
  },
  taroo: {
    title: "TAROO",
    navName: "Taroo",
    description:
      "A tarot brand for people drawn to good design rather than fortune telling - 22 Major Arcana cards, packaging, and the visual system behind them.",
    tags: ["Brand Design", "Illustration"],
    category: "Brand Design",
    year: "2025",
    image: "/Taroo/Frame%205.png"
  },
  suglar: {
    title: "Suglar",
    navName: "Suglar",
    description:
      "Translating the color, texture, and emotion of candy into a board game where sweetness becomes strategy.",
    tags: ["Game Design", "Visual Design"],
    category: "Visual & Game",
    year: "2023",
    image: "/suglar/Frame%2066.png"
  },
  alcohol: {
    title: "Alcohol Directory",
    navName: "Alcohol Directory",
    description:
      "A riso zine of the cocktails I drank in New York. One spread per drink - what it was, where I had it, and what it tasted like.",
    tags: ["Zine", "Editorial"],
    category: "Zine",
    year: "2025",
    image: "/framer-assets/images/de2adde594c13411e1b6edfae73dc2b71177dad0.png"
  },
  graveyard: {
    title: "Graveyard",
    navName: "Graveyard",
    category: "Web Design",
    year: "2025",
    image: "/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png"
  },
  cleared: {
    title: "Cleared",
    navName: "Cleared",
    category: "Product Design",
    year: "2026",
    image: clearedCover.src
  }
}

/* The two reading orders. Each track's home page features the first three and
   carousels the rest, and prev/next walks the same list. */
export const trackOrder = {
  uiux: ["uxcasestudy", "lastmessage", "backstage", "cleared", "graveyard", "taroo", "alcohol", "suglar"],
  visual: ["taroo", "suglar", "alcohol", "graveyard", "cleared", "uxcasestudy", "lastmessage", "backstage"]
}

export const tracks = Object.keys(trackOrder)

/* "" for the UI/UX track, "/visual" for the visual one. Every in-track URL is
   this prefix plus the shared path, which is what lets one set of pages serve
   both tracks without either linking into the other. */
export function trackBase(track) {
  return track === "visual" ? "/visual" : ""
}

export function trackHome(track) {
  return trackBase(track) || "/"
}

export function projectHref(slug, track) {
  return track === "visual" ? `/visual/project/${slug}` : `/project/${slug}`
}

function card(slug, track) {
  return { ...projects[slug], slug, href: projectHref(slug, track) }
}

export function featuredProjects(track) {
  return trackOrder[track].slice(0, 3).map((slug) => card(slug, track))
}

export function moreProjects(track) {
  return trackOrder[track].slice(3).map((slug) => card(slug, track))
}

/* Wraps around, so the last project's "next" is the first one rather than a
   dead end. */
export function projectNeighbors(slug, track = "uiux") {
  const order = trackOrder[track] || trackOrder.uiux
  const index = order.indexOf(slug)

  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: card(order[(index - 1 + order.length) % order.length], track),
    next: card(order[(index + 1) % order.length], track)
  }
}
