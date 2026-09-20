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
    }
  },
  lastmessage: {
    title: "Last Message",
    navName: "Last Message",
    description:
        "An open-ended detective game with a readable main investigation and an optional, more demanding hidden route reached by 2 of 8 players in the playtest.",
    tags: ["AI", "Web Design"],
    category: "Product Design",
    year: "2026",
    image: "/covers/lastmessage.webp"
  },
  backstage: {
    title: "Backstage",
    navName: "Backstage",
    description: "Helping people turn shared interests and free time into real-life plans.",
    tags: ["UI/UX Design", "Web Design"],
    category: "Product Design",
    year: "2025",
    image: "/covers/backstage.webp",
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
    year: "2023",
    image: "/covers/suglar.webp",
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
    /* Three whole screens from the prototype - the week, the mail the
       assistant read, the suggestion it is holding - that come out of the
       folder at three different depths. */
    cardStyle: "windows",
    cards: ["/cleared/hifi-calendar.png", "/cleared/hifi-mail.png", "/cleared/hifi-suggestion.png"]
  }
}

/* The two reading orders. Each track's home page features the first three and
   carousels the rest, and prev/next walks the same list. */
export const trackOrder = {
  uiux: ["boa-budgeting", "vortexnet", "lastmessage", "cleared", "backstage", "graveyard", "taroo", "alcohol", "suglar"],
  visual: ["taroo", "suglar", "boa-budgeting", "graveyard", "vortexnet", "cleared", "alcohol", "lastmessage", "backstage"]
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
  const { visual, ...project } = projects[slug]

  return { ...project, ...(track === "visual" ? visual : null), slug, href: projectHref(slug, track) }
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
