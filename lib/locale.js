/*
 * The language axis, sitting next to the track axis already defined in
 * lib/projects.js. Same idiom: a URL segment, never client state. English
 * keeps its existing URLs unprefixed (nothing already sent out or indexed
 * moves); Chinese lives under /zh, outermost - before the track segment,
 * so /zh/visual/project/taroo reads as "Chinese, visual track, taroo".
 */
export const locales = ["en", "zh"]
export const defaultLocale = "en"

/* "" for English, "/zh" for Chinese - mirrors trackBase's own shape. */
export function localeBase(locale) {
  return locale === "zh" ? "/zh" : ""
}

export function otherLocale(locale) {
  return locale === "zh" ? "en" : "zh"
}

/* The same page, in the other language: strips any existing /zh prefix off
   a pathname and reapplies the target one, leaving the track segment, slug
   and everything after it untouched. Used by the header's toggle, which
   only ever has a pathname (from usePathname()) to work from. */
export function withLocale(pathname, locale) {
  const stripped = pathname.replace(/^\/zh(?=\/|$)/, "") || "/"
  const base = localeBase(locale)
  if (!base) return stripped
  return stripped === "/" ? base : `${base}${stripped}`
}
