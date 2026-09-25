/* Chinese mirror of the English route at /project/bubu - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched. */
import Page, { metadata as projectMetadata } from "../../../project/bubu/page"

export const metadata = {
  ...projectMetadata,
  description:
    "一款两个人一起用的减脂 App：每餐记成一张小票，两个人朝同一个目标前进，也一起留下食物记录。",
  alternates: { canonical: "/zh/project/bubu" }
}

export default function ZhProjectPage() {
  return <Page track="uiux" locale="zh" />
}
