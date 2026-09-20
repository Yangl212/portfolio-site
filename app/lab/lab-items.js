// Temporary studies from Interest. Replace images here as new Lab work is ready.
// Positions form one repeatable 2000 × 1400 canvas; images keep their own ratios.
export const LAB_PERIOD = { width: 2000, height: 1400 }

export const labItems = [
  { image: "f9ae349b7f28b780cf305679437fc8a6152560bd.jpg", width: 496, height: 496, alt: "Watercolor studies, printed sheets, and textured handmade paper", title: "Zine Material Study", description: "Layered watercolor, paper, and printed fragments.", x: 310, y: 65, size: 210 },
  { image: "ab5ecd6c90cf97f5cce88865d79d15ec6e0bf1d2.jpg", width: 2048, height: 2731, alt: "Red windsock against a deep blue evening sky", title: "Blue Hour", description: "A red windsock photographed against the evening sky.", x: 625, y: 290, size: 244 },
  { image: "fa185a10f40131e943355fcaa6c679e2850c2578.png", width: 873, height: 1024, alt: "Restaurant-lined walkway at dusk", title: "Night Walk", description: "A restaurant-lined street photographed after dusk.", x: -98, y: 234, size: 256 },
  { image: "219c18200500043bc20818d114dd7b0361002d65.jpg", width: 498, height: 498, alt: "Watercolor pages layered inside a translucent zine cover", title: "Anti-Meaning Zine", description: "Watercolor pages made through color and texture.", x: 120, y: 560, size: 300 },
  { image: "b56f6ca543cfd9b907bbc720bde0bce891a409da.png", width: 751, height: 1024, alt: "Vintage station wagon on a leafy street in Thailand", title: "Street Find", description: "A vintage station wagon on a quiet, leafy road.", x: 1030, y: 375, size: 275 },
  { image: "8fcc113278c60ba7ef828566f4592daa4e5467c2.png", width: 768, height: 1024, alt: "Fallen leaves scattered across dark pavement", title: "After the Rain", description: "Fallen leaves scattered across dark pavement.", x: 1360, y: 680, size: 230 },
  { image: "529e7ef2fe55a5738deeea6b824d53dc4d528fac.jpg", width: 512, height: 267, alt: "Handmade paper samples catching light against a window", title: "Handmade Paper", description: "Material samples held up to natural light.", x: 1440, y: 95, size: 290 },
  { image: "c580c92a1210c7a44eef8a03396abe44a2d26259.jpg", width: 512, height: 242, alt: "Color and texture experiments taped to a cutting mat", title: "Color Tests", description: "Small paper, pigment, and texture experiments.", x: 1740, y: 580, size: 240 },
  { image: "3378ae486d7e0ebc48884f3347a8afb515e3b6f5.png", width: 486, height: 178, alt: "Pink and yellow watercolor washes", title: "Watercolor", description: "Loose pink and yellow washes on paper.", x: 510, y: 760, size: 260 },
  { image: "beef617b8722f812fd99a4e40519c3927d5b80f2.png", width: 772, height: 1024, alt: "Chalk handwriting on a sunlit London pavement", title: "London Notes", description: "Chalk writing found on a city pavement.", x: 1730, y: 1000, size: 220 },
  { image: "11792f48f66bb7ab468377cc0bbdcaef27c49e81.png", width: 1024, height: 364, alt: "Passing traffic and warm storefront lights at night", title: "Passing Lights", description: "Traffic and storefront light blurred together at night.", x: 775, y: 880, size: 320 },
  { image: "1a8704e25d217a240384eb41e8cfa2aeadd00fb2.jpg", width: 1024, height: 1024, alt: "Chongqing street beneath a bright orange bridge", title: "Chongqing, 2020", description: "A city street framed by a bright orange bridge.", x: 840, y: -120, size: 300 }
].map(item => ({ ...item, image: `/framer-assets/images/${item.image}` }))
