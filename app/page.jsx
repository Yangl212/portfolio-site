import { shareCard } from "../lib/share"

export { default } from "./home-riso/page"

export const metadata = {
  title: { absolute: "Lele Yang — Product Designer" },
  description:
    "UI/UX designer with a visual designer's eye, based in New York. Case studies in fintech, AI scheduling, an AI detective game, and print.",
  alternates: { canonical: "/" },
  ...shareCard({
    title: "Lele Yang — Product Designer",
    description:
      "UI/UX designer with a visual designer's eye, based in New York. Case studies in fintech, AI scheduling, an AI detective game, and print.",
    image: "/og/home.jpg",
    alt: "Lele Yang, product designer, with three case-study covers"
  })
}
