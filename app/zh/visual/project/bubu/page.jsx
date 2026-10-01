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
      "我为八周减脂挑战做了 BUBU：每餐拍照，当天留下一张小票，七天后放进周手账；可以先一个人开始，也可以和搭子一起。"
  })
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
