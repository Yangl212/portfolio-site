import { shareCard } from "../lib/share"

export { default } from "./home-riso/page"

/* The root of the site is the product track. The UI/UX track that used to
   live here is at /uiux; /product redirects here (see next.config.mjs). */
/* The share card: the name and the role, then the line the hero leads with. */
const CARD = "Lele Yang · AI Product Design"
const DESCRIPTION = "I focus on product design: finding what people need and where it hurts, and using AI to get projects shipped."

export const metadata = {
  title: { absolute: "Lele Yang — AI Product Designer" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  ...shareCard({
    title: CARD,
    description: DESCRIPTION,
    image: "/og/home.jpg",
    alt: "Lele Yang, AI product designer, with three case-study covers"
  })
}
