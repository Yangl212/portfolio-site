const FALLBACK_SITE_URL = "http://localhost:3000"

function normalizeSiteUrl(value) {
  if (!value) {
    return FALLBACK_SITE_URL
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return FALLBACK_SITE_URL
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.replace(/\/+$/, "")
  }

  return `https://${trimmed.replace(/\/+$/, "")}`
}

export function getSiteUrl() {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL
  )
}

export function getSiteOrigin() {
  return new URL(getSiteUrl())
}

/* The /visual/project/* twins are deliberately left out: they render the same
   case studies and declare a canonical back to /project/*, so listing them
   would only ask search engines to crawl a second copy of everything. They stay
   fully linkable - the visual track's own pages point at them.

   The /zh counterpart of every route below IS listed: unlike /visual, it is
   a different language, not a second copy, so it earns its own sitemap entry
   rather than folding into the English canonical (see lib/locale.js and the
   /zh route files for how the pairing works). */
const englishRoutes = [
  "/",
  "/visual",
  "/about",
  "/lab",
  "/resume",
  "/project/inflankland",
  "/project/suglar",
  "/project/taroo",
  "/project/alcohol",
  "/project/graveyard",
  "/project/backstage",
  "/project/cleared",
  "/project/vortexnet",
  "/project/lastmessage",
  "/project/boa-budgeting",
  "/project/bubu"
]

/* inflankland has no /zh mirror (it's an orphaned, unlinked legacy page -
   see app/zh's route files), so it is excluded from the language pairing
   rather than pointing the sitemap at a 404. */
export const siteRoutes = [
  ...englishRoutes,
  ...englishRoutes.filter((route) => route !== "/project/inflankland").map((route) => `/zh${route === "/" ? "" : route}`)
]
