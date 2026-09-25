/* Chinese mirror of the English route at /visual/project/lastmessage - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../../project/lastmessage/page"

export const metadata = {
  ...projectMetadata,
  description:
    "一款可以自由盘问 AI 角色的侦探游戏。主线不难跟，另外藏了一条更难的路线；测试时，8 位玩家里有 2 位找到了它。",
  alternates: { canonical: "/zh/visual/project/lastmessage" }
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
