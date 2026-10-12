/* Chinese mirror of the root route at / - the product track, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched. */
import HomeRisoPage from "../home-riso/page"
import { shareCard } from "../../lib/share"

/* The share card: the name and the role, then the line the hero leads with. */
const CARD = "杨乐乐 · AI 产品设计"
const DESCRIPTION = "我致力于产品设计，了解用户需求与痛点，并借助 AI 进行多个项目落地"

export const metadata = {
  title: { absolute: "Lele Yang — AI 产品设计师" },
  description: DESCRIPTION,
  alternates: { canonical: "/zh" },
  ...shareCard({
    title: CARD,
    description: DESCRIPTION,
    image: "/og/home-zh.jpg",
    alt: "杨乐乐，AI 产品设计师"
  })
}

export default function ZhHomePage() {
  return <HomeRisoPage track="product" locale="zh" />
}
