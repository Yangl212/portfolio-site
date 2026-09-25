/* Chinese mirror of the English route at /project/cleared - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../project/cleared/page"

export const metadata = {
  ...projectMetadata,
  description:
    "一个经过可用性测试的 AI 日历概念。参与者都能看懂建议并确认日程，但其中 4 位还是会回看邮件原文，确认 AI 有没有理解对。",
  alternates: { canonical: "/zh/project/cleared" }
}

export default function ZhProjectPage() {
  return <Page track="uiux" locale="zh" />
}
