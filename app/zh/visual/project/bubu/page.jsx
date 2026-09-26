/* Chinese mirror of the English route at /visual/project/bubu - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched. */
import Page, { metadata as projectMetadata } from "../../../../project/bubu/page"
import { translateCard } from "../../../../../lib/share"

export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/zh/visual/project/bubu" },
  ...translateCard(projectMetadata, {
    description:
      "一款为八周减脂挑战设计的 iOS App。拍照记下一餐，每天生成一张小票，每周整理成手账；可以和搭子一起，也可以独自完成。"
  })
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
