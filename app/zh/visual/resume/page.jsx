/* Chinese mirror of the English route at /visual/resume - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import VisualResumePage, { metadata as pageMetadata } from "../../../visual/resume/page"

export const metadata = {
  ...pageMetadata,
  description:
    "我的简历，包括视觉与品牌设计经历、金融科技与 AI 项目，以及在帕森斯设计学院攻读 MFA 的经历。",
  alternates: { canonical: "/zh/visual/resume" }
}

export default function ZhVisualResumePage() {
  return <VisualResumePage locale="zh" />
}
