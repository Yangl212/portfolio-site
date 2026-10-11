import { shareCard } from "../lib/share"

export { default } from "./home-riso/page"

/* The root of the site is the product track. The UI/UX track that used to
   live here is at /uiux; /product redirects here (see next.config.mjs). */
const DESCRIPTION =
  "AI product designer in New York. Case studies on a shipped AI detective game, an eight-week habit app, and a calendar assistant people can check before they confirm."

export const metadata = {
  title: { absolute: "Lele Yang — AI Product Designer" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  ...shareCard({
    title: "Lele Yang — AI Product Designer",
    description: DESCRIPTION,
    image: "/og/home.jpg",
    alt: "Lele Yang, AI product designer, with three case-study covers"
  })
}
