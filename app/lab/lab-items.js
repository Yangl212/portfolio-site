// Positions form one repeatable 2000 × 1400 canvas; images keep their own
// ratios. An item's `image` can be a bare filename (resolved against the
// framer-assets export below) or its own absolute path.
//
// The canvas opens untranslated, so whatever sits near (0, 0) is what a
// reader sees before they ever drag or scroll - the three pieces here are
// kept inside that first screenful on purpose, clustered up near the top
// rather than spread across the full period.
export const LAB_PERIOD = { width: 2000, height: 1400 }

export const labItems = [
  { image: "/lab/wanpanel.webp", width: 1400, height: 880, alt: "WanPanel, an isometric virtual office with avatars walking between desks and meeting rooms", title: "WanPanel", description: "A virtual office, vibe-coded end to end - walk up to a coworker to talk.", x: 420, y: 40, size: 320 },
  { image: "219c18200500043bc20818d114dd7b0361002d65.jpg", width: 498, height: 498, alt: "Watercolor pages layered inside a translucent zine cover", title: "Anti-Meaning Zine", description: "Watercolor pages made through color and texture.", x: 80, y: 300, size: 280 },
  { image: "/lab/riso-skill.webp", width: 848, height: 1264, alt: "A riso-print illustration of a table set with bottles, flowers, bowls and fruit, made from a photo", title: "Riso Skill", description: "A skill I built that turns any photo into a riso print in seconds.", x: 800, y: 200, size: 200 }
].map(item => (item.image.startsWith("/") ? item : { ...item, image: `/framer-assets/images/${item.image}` }))
