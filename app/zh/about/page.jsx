/* Chinese mirror of the English route at /about - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import AboutPage, { metadata as pageMetadata } from "../../about/page"

export const metadata = {
  ...pageMetadata,
  description:
    "关于我怎么看美感、逻辑和用户测试，为什么把游戏当作一种媒介，以及 AI 怎样改变了我的工作方式。",
  alternates: { canonical: "/zh/about" }
}

export default function ZhAboutPage() {
  return <AboutPage locale="zh" />
}
