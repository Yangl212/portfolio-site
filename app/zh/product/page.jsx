/* Chinese mirror of the English route at /product - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched. */
import HomeRisoPage from "../../home-riso/page"
import { shareCard } from "../../../lib/share"

const DESCRIPTION =
  "我做 AI 产品设计。作品包括一款已上线的 AI 推理游戏、一个八周习惯打卡 App，以及一个让人在确认前能先核对的日历助手。"

export const metadata = {
  title: { absolute: "Lele Yang — AI 产品设计师" },
  description: DESCRIPTION,
  alternates: { canonical: "/zh/product" },
  ...shareCard({
    title: "Lele Yang — AI 产品设计师",
    description: DESCRIPTION,
    image: "/og/home-zh.jpg",
    alt: "杨乐乐，AI 产品设计师"
  })
}

export default function ZhProductPage() {
  return <HomeRisoPage track="product" locale="zh" />
}
