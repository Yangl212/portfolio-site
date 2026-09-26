/* Chinese mirror of the English route at /visual/about - same page,
   locale="zh", which picks that page's own Chinese essay. See
   lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL
   untouched. */
import VisualAboutPage, { metadata as pageMetadata } from "../../../visual/about/page"
import { translateCard } from "../../../../lib/share"

export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/zh/visual/about" },
  ...translateCard(pageMetadata, {
    title: "关于我",
    description:
      "关于我为什么从好看开始、游戏项目留下的遗憾、Last Message 和 Bubu，以及 AI 和代码怎样改变了我的设计方式。",
    image: "/og/about-visual-zh.jpg",
    alt: "关于杨乐乐"
  })
}

export default function ZhVisualAboutPage() {
  return <VisualAboutPage locale="zh" />
}
