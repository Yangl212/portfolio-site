/* Chinese mirror of the English route at /visual/project/backstage - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../../project/backstage/page"

export const metadata = {
  ...projectMetadata,
  description:
    "把共同的兴趣和都空着的时间凑在一起，变成一次真的会发生的线下见面。",
  alternates: { canonical: "/zh/visual/project/backstage" }
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
