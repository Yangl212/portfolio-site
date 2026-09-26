/* Chinese mirror of the English route at /interest - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import InterestPage, { metadata as pageMetadata } from "../../interest/page"
import { translateCard } from "../../../lib/share"

export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/zh/interest" },
  ...translateCard(pageMetadata, {
    title: "兴趣",
    description:
      "客户项目之外，我还会做小册子、插画，也会记录在日本、泰国、英国等地旅行时拍下的照片。",
    image: "/og/interest-zh.jpg",
    alt: "杨乐乐的个人作品"
  })
}

export default function ZhInterestPage() {
  return <InterestPage track="uiux" locale="zh" />
}
