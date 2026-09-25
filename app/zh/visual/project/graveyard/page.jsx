/* Chinese mirror of the English route at /visual/project/graveyard - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../../project/graveyard/page"

export const metadata = {
  ...projectMetadata,
  description:
    "一个关于网络审查语言的交互档案，记录被限制的词，以及人们为了继续表达而造出的替代说法。",
  alternates: { canonical: "/zh/visual/project/graveyard" }
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
