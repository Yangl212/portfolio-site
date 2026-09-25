/* Chinese mirror of the English route at /visual/about - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import VisualAboutPage, { metadata as pageMetadata } from "../../../visual/about/page"

export const metadata = {
  ...pageMetadata,
  description:
    "关于我怎样使用色彩、如何做出 TAROO、Suglar 和 Alcohol Directory，以及 AI 怎样改变了我的视觉设计流程。",
  alternates: { canonical: "/zh/visual/about" }
}

export default function ZhVisualAboutPage() {
  return <VisualAboutPage locale="zh" />
}
