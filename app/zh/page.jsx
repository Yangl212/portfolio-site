/* Chinese mirror of the English route at / - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import HomeRisoPage from "../home-riso/page"
import { shareCard } from "../../lib/share"

export const metadata = {
  title: { absolute: "Lele Yang — 产品设计师" },
  description:
    "我在纽约做 UI/UX，也做数据可视化、品牌和印刷。这里收录了金融科技、AI 日程、AI 侦探游戏和印刷设计等项目。",
  alternates: { canonical: "/zh" },
  ...shareCard({
    title: "Lele Yang — 产品设计师",
    description:
      "我在纽约做 UI/UX，也做数据可视化、品牌和印刷。这里收录了金融科技、AI 日程、AI 侦探游戏和印刷设计等项目。",
    image: "/og/home-zh.jpg",
    alt: "杨乐乐，产品设计师"
  })
}

export default function ZhHomePage() {
  return <HomeRisoPage track="uiux" locale="zh" />
}
