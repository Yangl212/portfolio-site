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

export const siteRoutes = [
  "/",
  "/project",
  "/interest",
  "/contact",
  "/xiangmuxiangqing/totnurture",
  "/xiangmuxiangqing/inflankland",
  "/xiangmuxiangqing/suglar",
  "/xiangmuxiangqing/taroo",
  "/xiangmuxiangqing/alcohal",
  "/xiangmuxiangqing/graveyard",
  "/xiangmuxiangqing/backstage",
  "/xiangmuxiangqing/lastmessage",
  "/xiangmuxiangqing/uxcasestudy"
]
