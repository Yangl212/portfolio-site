/* Chinese mirror of the English route at /lab - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import LabPage, { metadata as pageMetadata } from "../../lab/page"
import { translateCard } from "../../../lib/share"

export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/zh/lab" },
  ...translateCard(pageMetadata, {
    title: "实验室",
    description:
      "这里放着我的摄影、视觉练习和一些还在试验中的作品。",
    image: "/og/lab-zh.jpg",
    alt: "杨乐乐的实验室"
  })
}

export default function ZhLabPage() {
  return <LabPage track="uiux" locale="zh" />
}
