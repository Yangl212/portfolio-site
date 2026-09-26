/* Chinese mirror of the English route at /visual - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import HomeRisoPage from "../../home-riso/page"
import { shareCard } from "../../../lib/share"

export const metadata = {
  title: { absolute: "Lele Yang — 视觉与品牌设计师" },
  description:
    "我的视觉与品牌项目包括一套塔罗品牌、一款用真糖果玩的桌游，以及一本记录纽约鸡尾酒的孔版印刷小册子。",
  alternates: { canonical: "/zh/visual" },
  ...shareCard({
    title: "Lele Yang — 视觉与品牌设计师",
    description:
      "我的视觉与品牌项目包括一套塔罗品牌、一款用真糖果玩的桌游，以及一本记录纽约鸡尾酒的孔版印刷小册子。",
    image: "/og/home-visual-zh.jpg",
    alt: "杨乐乐，视觉与品牌设计师"
  })
}

export default function ZhVisualHomePage() {
  return <HomeRisoPage track="visual" locale="zh" />
}
