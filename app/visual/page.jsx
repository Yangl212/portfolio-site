import HomeRisoPage from "../home-riso/page"

/* Same riso-print home page as "/" - the pulled name, the folder-style
   More Work, all of it - entered from the visual track instead. Only the
   track differs: HomeRisoPage and RisoHero both read it to swap in this
   track's own eyebrow, tagline, stats and Resume file, and to order the
   project cards the way a visual/brand reader should meet them (TAROO,
   Suglar and BOA first). The old, plainer /visual page - a static hero
   over a simple card list - is retired; the two tracks now read as one
   site rather than two different eras of it. */
export const metadata = {
  title: { absolute: "Lele Yang — Visual & Brand Designer" },
  description:
    "Visual and brand design across identity, digital, and visual systems: a tarot brand, a candy board game, and an editorial zine.",
  alternates: { canonical: "/visual" }
}

export default function VisualPage() {
  return <HomeRisoPage track="visual" />
}
