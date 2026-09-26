/* Chinese mirror of the English route at /visual/project/taroo - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../../project/taroo/page"
import { translateCard } from "../../../../../lib/share"

export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/zh/visual/project/taroo" },
  ...translateCard(projectMetadata, {
    description:
      "一套做给设计爱好者的塔罗品牌：22 张大阿卡纳、包装，以及贯穿其中的视觉系统。它更像一件设计物件，不太像算命工具。"
  })
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
