// Positions form one repeatable 2000 × 1400 canvas; images keep their own
// ratios. An item's `image` can be a bare filename (resolved against the
// framer-assets export below) or its own absolute path.
//
// The canvas opens untranslated, so whatever sits near (0, 0) is what a
// reader sees before they ever drag or scroll - the pieces here are kept
// inside that first screenful on purpose, clustered up near the top
// rather than spread across the full period. Positions are scattered
// rather than gridded, but every image stays upright and each box keeps
// generous, uneven breathing room from its neighbors - a board, not a
// spreadsheet.
export const LAB_PERIOD = { width: 2000, height: 1400 }

export const labItems = [
  { image: "/lab/wanpanel.webp", width: 1400, height: 880, alt: "WanPanel, an isometric virtual office with avatars walking between desks and meeting rooms", title: "WanPanel", description: "A virtual office, vibe-coded end to end - walk up to a coworker to talk.", x: 80, y: 60, size: 340 },
  { image: "219c18200500043bc20818d114dd7b0361002d65.jpg", width: 498, height: 498, alt: "Watercolor pages layered inside a translucent zine cover", title: "Anti-Meaning Zine", description: "Watercolor pages made through color and texture.", x: 160, y: 460, size: 240 },
  { image: "/lab/riso-skill.webp", width: 848, height: 1264, alt: "A riso-print illustration of a table set with bottles, flowers, bowls and fruit, made from a photo", title: "Riso Skill", description: "A skill I built that turns any photo into a riso print in seconds.", x: 1420, y: 60, size: 190 },
  { image: "529e7ef2fe55a5738deeea6b824d53dc4d528fac.jpg", width: 512, height: 267, alt: "Five handmade paper swatches taped to a window, backlit against a city skyline", title: "Material Experiment", description: "Pulp and pigment swatches, held up to a window to test how each batch takes the light.", x: 600, y: 40, size: 300 },
  { image: "/lab/mask.webp", width: 900, height: 581, alt: "Loose wires and cast resin beads tangled together, photographed macro", title: "Mask", description: "A wearable built from wire and cast resin, about restraint.", x: 1020, y: 160, size: 260 },
  { image: "/lab/melt.webp", width: 900, height: 900, alt: "Ice beads with letters spelling out love cast inside them, shown whole and melting", title: "Melt", description: "The word love broken into letters and cast in ice - legible only as it melts.", x: 560, y: 520, size: 220 },
  { image: "/lab/pome.webp", width: 865, height: 578, alt: "A poem with three phrases marked by colored dots, next to their positions plotted on a blank page", title: "Pome", description: "Generative poetry - mark \"I love you\" in a poem, then type your own words for a piece made just for you.", x: 980, y: 560, size: 260 }
].map(item => (item.image.startsWith("/") ? item : { ...item, image: `/framer-assets/images/${item.image}` }))
