import { getSiteUrl, siteRoutes } from "../lib/site"

export default function sitemap() {
  const siteUrl = getSiteUrl()

  return siteRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }))
}
