import HomeRisoPage from "../home-riso/page"
import { shareCard } from "../../lib/share"

/* The UI/UX track's home: the same riso-print page as "/" and "/visual",
   entered for UI/UX roles. It was the root of the site until the product
   track took that place. */
export const metadata = {
  title: { absolute: "Lele Yang — Product Designer" },
  description:
    "UI/UX designer with a visual designer's eye, based in New York. Case studies in fintech, AI scheduling, an AI detective game, and print.",
  alternates: { canonical: "/uiux" },
  ...shareCard({
    title: "Lele Yang — Product Designer",
    description:
      "UI/UX designer with a visual designer's eye, based in New York. Case studies in fintech, AI scheduling, an AI detective game, and print.",
    image: "/og/home.jpg",
    alt: "Lele Yang, product designer, with three case-study covers"
  })
}

export default function UiuxPage() {
  return <HomeRisoPage track="uiux" />
}
