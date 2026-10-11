import HomeRisoPage from "../home-riso/page"
import { shareCard } from "../../lib/share"

/* The same riso-print home page as "/" and "/visual" - the pulled name, the
   folder-style More Work, all of it - entered from the product track. Only
   the track differs: HomeRisoPage and RisoHero both read it to swap in this
   track's own hero copy and to order the project cards the way a product
   reader should meet them (Last Message, BUBU and AI Calendar first).

   The share card is this track's own: the same person and the same case
   studies as "/", described to someone hiring for AI products. The image is
   the home one, since the covers it shows are the right three. */
const DESCRIPTION =
  "AI product designer in New York. Case studies on a shipped AI detective game, an eight-week habit app, and a calendar assistant people can check before they confirm."

export const metadata = {
  title: { absolute: "Lele Yang — AI Product Designer" },
  description: DESCRIPTION,
  alternates: { canonical: "/product" },
  ...shareCard({
    title: "Lele Yang — AI Product Designer",
    description: DESCRIPTION,
    image: "/og/home.jpg",
    alt: "Lele Yang, AI product designer, with three case-study covers"
  })
}

export default function ProductPage() {
  return <HomeRisoPage track="product" />
}
