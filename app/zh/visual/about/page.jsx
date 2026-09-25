/* Chinese mirror of the English route at /visual/about - same page,
   locale="zh", which picks that page's own Chinese essay. See
   lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL
   untouched. */
import VisualAboutPage, { metadata as pageMetadata } from "../../../visual/about/page"

export const metadata = {
  ...pageMetadata,
  description:
    "关于我为什么从好看开始、游戏项目留下的遗憾、Last Message 和 Bubu，以及 AI 和代码怎样改变了我的设计方式。",
  alternates: { canonical: "/zh/visual/about" }
}

export default function ZhVisualAboutPage() {
  return <VisualAboutPage locale="zh" />
}
