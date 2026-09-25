/* Chinese mirror of the English route at /interest - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import InterestPage, { metadata as pageMetadata } from "../../interest/page"

export const metadata = {
  ...pageMetadata,
  description: "客户项目之外，我还会做小册子、插画，也会记录在日本、泰国、英国等地旅行时拍下的照片。",
  alternates: { canonical: "/zh/interest" }
}

export default function ZhInterestPage() {
  return <InterestPage track="uiux" locale="zh" />
}
