import Link from "next/link"

import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

const img = (hash) => `/framer-assets/images/${hash}`

const brandIdea = [
  {
    label: "What is Taroo?",
    body: "A 22-card Major Arcana deck and the brand around it, made for reflection rather than prediction. Each card is a piece of graphic design you would leave out on a desk, not a relic you keep in a drawer."
  },
  {
    label: "Who is it for?",
    body: "People who would never describe themselves as spiritual but who collect beautiful, useful objects - students, designers, illustrators, journalers, anyone who wants a prompt to think with."
  },
  {
    label: "What should tarot feel like instead?",
    body: "Readable in about five seconds. Approachable enough to hand to someone who has never touched a deck. Reflective without being solemn or occult."
  }
]

const directions = [
  {
    label: "Approachable",
    title: "Nothing to decode",
    body: "No occult symbolism and no scenes to interpret. A card is one shape, one color, one word, so it can be read before you know anything about tarot."
  },
  {
    label: "Modern",
    title: "Flat geometry, high chroma",
    body: "Everything is drawn with hard-edged geometry and bright pastels, set in a wide contemporary display face. Nothing engraved, nothing gothic, no gold foil."
  },
  {
    label: "Reflective",
    title: "Soft where you hold it",
    body: "The card back and the box interior are the only gradients in the system. The quiet surface is the part you touch; the fronts stay bright so a reading never feels heavy."
  }
]

/* Sampled from the finished deck artwork, so the swatches on this page are the
   exact field colors printed on the cards. */
const arcanaColors = [
  { no: "00", name: "Fool", hex: "#C2DEFF", band: "pale" },
  { no: "01", name: "Magician", hex: "#8E72D6", band: "saturated" },
  { no: "02", name: "High Priestess", hex: "#071551", band: "deep" },
  { no: "03", name: "Empress", hex: "#FE7DC7", band: "saturated" },
  { no: "04", name: "Emperor", hex: "#FFDC8C", band: "pale" },
  { no: "05", name: "Hierophant", hex: "#F89B3B", band: "saturated" },
  { no: "06", name: "Lovers", hex: "#B8E6EB", band: "pale" },
  { no: "07", name: "Chariot", hex: "#C2A1FF", band: "pale" },
  { no: "08", name: "Strength", hex: "#4A5AE3", band: "saturated" },
  { no: "09", name: "Hermit", hex: "#0F1252", band: "deep" },
  { no: "10", name: "Wheel of Fortune", hex: "#FFE696", band: "pale" },
  { no: "11", name: "Justice", hex: "#F5D2D1", band: "pale" },
  { no: "12", name: "Hanged Man", hex: "#CA294F", band: "saturated" },
  { no: "13", name: "Death", hex: "#E5E5E5", band: "pale" },
  { no: "14", name: "Temperance", hex: "#CDE4DA", band: "pale" },
  { no: "15", name: "Devil", hex: "#720000", band: "deep" },
  { no: "16", name: "Tower", hex: "#C4B1E6", band: "pale" },
  { no: "17", name: "Star", hex: "#63B6F9", band: "saturated" },
  { no: "18", name: "Moon", hex: "#FB62B3", band: "saturated" },
  { no: "19", name: "Sun", hex: "#FF9C01", band: "saturated" },
  { no: "20", name: "Judgement", hex: "#D7F289", band: "pale" },
  { no: "21", name: "World", hex: "#2D00F4", band: "saturated" }
]

const competitors = [
  {
    name: "The Modern Witch Tarot",
    image: img("dc3881dbc2e05bbe4a63549fe6774c595d6f7244.png"),
    body: "A contemporary retelling of the Rider-Waite deck with diverse modern characters, aimed at empowerment and inclusivity.",
    keywords: "Character-driven · Feminist · Illustrative",
    gap: "Still a scene to read. Every card needs interpreting before it can be used."
  },
  {
    name: "OK Tarot",
    image: img("be9365ca90faaa9c4d6a4e5182b328c238cc3ef2.png"),
    body: "Simple line drawings, faceless figures, and a single pink palette. The lowest barrier to entry on the shelf.",
    keywords: "Minimalist · Beginner-friendly · Faceless",
    gap: "One palette across the whole deck, so no card is recognisable on its own."
  },
  {
    name: "Prismavisions Tarot",
    image: img("bc001b0a1c023f69fc9228f6829c9fcc4cec2198.png"),
    body: "Dense hand-painted artwork on a dark ground, with cards that join into one continuous illustration across the set.",
    keywords: "Painterly · Collectible · Continuous artwork",
    gap: "A collector's object for people who already read tarot, not an entry point."
  }
]

const audienceTraits = [
  "Visually driven - buys things because of how they look",
  "Emotionally open, but sceptical of anything mystical",
  "Curious and playful; collects small beautiful objects"
]

/* Sampled off the wordmark itself: the seven shapes that make T-A-R-O-O, in
   drawing order. */
const brandBase = [
  { hex: "#E36D6D", label: "Coral", part: "T crossbar" },
  { hex: "#D96DE3", label: "Orchid", part: "T stem" },
  { hex: "#7B88FA", label: "Periwinkle", part: "A" },
  { hex: "#BFE0F3", label: "Mist", part: "R bowl" },
  { hex: "#F154A5", label: "Pink", part: "R leg" },
  { hex: "#FBBF37", label: "Amber", part: "First O" },
  { hex: "#4BADF4", label: "Sky", part: "Second O" }
]

/* The three places two shapes cross in the wordmark, and the color the
   crossing prints. These are read off the artwork, not blend-mode guesses. */
const brandOverlap = [
  { a: "#E36D6D", b: "#D96DE3", hex: "#BD0051", label: "Coral × orchid", part: "The T" },
  { a: "#BFE0F3", b: "#F154A5", hex: "#B13599", label: "Mist × pink", part: "The R" },
  { a: "#FBBF37", b: "#4BADF4", hex: "#456D2B", label: "Amber × sky", part: "The double O" }
]

const deliverables = [
  "22 Major Arcana cards",
  "Gradient card back",
  "Two-piece tuck box",
  "Geometric box pattern",
  "Wordmark and lockups",
  "Cover treatment system"
]

const reflection = [
  {
    label: "Limitation",
    body: "The deck stops at the 22 Major Arcana. Extending it to the 56 Minor Arcana would be the real test of whether one color per card survives four suits."
  },
  {
    label: "Key tradeoff",
    body: "Dropping figurative imagery makes the cards instantly readable but removes the narrative detail experienced readers rely on. I chose recognition over depth."
  },
  {
    label: "Next validation",
    body: "Print a physical run and watch first-time readers sort it. If they group the cards by value band without being told, the color system is doing its job."
  }
]

export default function TarooPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/" />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Student Work"
              discipline={"Brand Design · 2025"}
              title="Taroo"
              image={img("55ef7d1e82d0b3730f6aa708d084518b94eca511.png")}
              imageAlt="All twenty-two Taroo Major Arcana cards laid out in a grid beside the gradient card back"
              summary="A tarot brand for people drawn to good design rather than fortune telling - 22 Major Arcana cards, packaging, and the visual system behind them."
              problem="Tarot's visual language is dense, occult, and slow to read, which keeps design-minded newcomers out."
              contribution="Positioning, brand identity, 22 card illustrations, packaging, and the full visual system."
              outcome="A deck that works as a modern design object: one color per card, one shape kit, one typographic rule."
              role="Brand Designer (solo)"
              scope={"Positioning · Identity · Illustration · Packaging"}
              platform={"Physical product · 22-card deck"}
              timeline="8 weeks"
            />
          </div>

          <div className={styles.bodyContent}>
            {/* Final product first. This is a visual brand project, so the
                strongest artwork carries the top of the page and the reasoning
                follows it rather than delaying it. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Final Product</p>
                <div>
                  <h2 className={styles.sectionTitle}>The finished deck.</h2>
                </div>
              </div>

              <div className={styles.productGallery}>
                <figure className={styles.productBand}>
                  <img
                    src={img("0c4d57f9f7b2bd0585d9304ff82ad4664160d290.png")}
                    alt="Taroo wordmark beside a fan of five cards from the deck"
                    width="1400"
                    height="661"
                  />
                  <figcaption>Wordmark and deck</figcaption>
                </figure>
              </div>
            </section>

            {/* The idea, kept to three answers. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>The Idea</p>
                <div>
                  <h2 className={styles.sectionTitle}>Tarot as a design object, not a fortune-telling tool.</h2>
                </div>
              </div>

              <div className={styles.ideaGrid}>
                {brandIdea.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Direction: the three words, and what each one had to become. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design Direction</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three words, each written down as something I could draw.</h2>
                  <p className={styles.sectionLead}>
                    Approachable, modern, and reflective only became useful once each one was turned into a rule about
                    shape, color, or surface.
                  </p>
                </div>
              </div>

              <figure className={styles.keywordBoard}>
                <img
                  src={img("613a87350cf8ea4863473ee18000054c7c15bd90.png")}
                  alt="Keyword board reading colorful, simple, fresh, geometric, approachable, intuitive, playful"
                  width="1567"
                  height="503"
                />
              </figure>

              <div className={styles.directionGrid}>
                {directions.map((direction) => (
                  <article key={direction.label}>
                    <p className={styles.directionLabel}>{direction.label}</p>
                    <h3>{direction.title}</h3>
                    <p>{direction.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* The section a hiring manager actually reads: three decisions,
                each next to the artefact that proves it. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Key Design Decisions</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three decisions do most of the work.</h2>
                  <p className={styles.sectionLead}>
                    Color, illustration, and typography were each solved once as a system, then applied twenty-two
                    times without exception.
                  </p>
                </div>
              </div>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>01 / Color system</p>
                  <h3>One color per card, so the deck sorts itself.</h3>
                  <p>
                    Traditional decks run a single palette across all 78 cards, which makes them beautiful as a set and
                    unreadable one at a time. Taroo gives each arcana its own field color, spread around the hue circle
                    and split into three value bands - pale for the cards about beginnings and balance, saturated for
                    the cards about action, and near-black for the three heavy ones.
                  </p>
                  <p>
                    Color becomes the fastest way to recognise a card, and the deck still reads as one family because
                    every hue is mixed back toward the same pastel base.
                  </p>
                  <ul className={styles.bandKey}>
                    <li>
                      <span data-band="pale" aria-hidden="true" />
                      Pale &middot; beginnings and balance
                    </li>
                    <li>
                      <span data-band="saturated" aria-hidden="true" />
                      Saturated &middot; action
                    </li>
                    <li>
                      <span data-band="deep" aria-hidden="true" />
                      Deep &middot; High Priestess, Hermit, Devil
                    </li>
                  </ul>
                </div>

                <div className={styles.paletteGrid}>
                  {arcanaColors.map((card) => (
                    <div className={styles.swatch} key={card.no} data-band={card.band}>
                      <div className={styles.swatchChip} style={{ background: card.hex }}>
                        <span>{card.no}</span>
                      </div>
                      <p className={styles.swatchName}>{card.name}</p>
                      <p className={styles.swatchHex}>{card.hex}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>02 / Illustration language</p>
                  <h3>Six primitives, twenty-two pictures.</h3>
                  <p>
                    Every card is built from the same kit - circle, square, arch, four-point star, right triangle, leaf
                    - and nothing else is allowed in. Death is the arch with a cross laid over it, the Moon is a
                    circle subtracted by a circle, the Tower is a triangle sitting on a tapered column.
                  </p>
                  <p>
                    The constraint is what holds twenty-two illustrations together without a shared outline style.
                  </p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("e977fd7ff13555ab29179463ed5df8bc332fb12b.png")}
                    alt="The six Taroo primitives: circle, square, arch, four-point star, right triangle, leaf"
                    width="1698"
                    height="262"
                  />
                  <figcaption>The complete shape library</figcaption>
                </figure>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>03 / Typography &amp; hierarchy</p>
                  <h3>Two typefaces, three fixed positions.</h3>
                  <p>
                    Card information sits in the same place every time: the arcana number in a tinted chip at the top
                    right, the name locked to the bottom-left baseline, the illustration centred between them. Names
                    never run past two lines, so the layout is identical across the deck.
                  </p>
                  <p>
                    TT Modernoir Medium carries the names - wide and geometric enough to read as part of the
                    illustration - while Amoria Regular handles the numbers in a lighter, more classical voice. It is
                    the one deliberate nod to traditional tarot in the whole system.
                  </p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("7c81948064546ffd40e4f625440c6f034ab9d4cf.png")}
                    alt="Taroo type specimen showing the wordmark in solid and gradient forms with TT Modernoir and Amoria"
                    width="899"
                    height="674"
                  />
                  <figcaption>Wordmark treatments and the two type styles</figcaption>
                </figure>
              </article>
            </section>

            {/* Audience and competitors, compressed to roughly one screen. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Audience &amp; Positioning</p>
                <div>
                  <h2 className={styles.sectionTitle}>The gap is a deck you would leave out on a table.</h2>
                  <p className={styles.sectionLead}>
                    Three decks own the modern tarot shelf. Each solves one thing well, and each leaves the same thing
                    open.
                  </p>
                </div>
              </div>

              <div className={styles.audience}>
                <div>
                  <p className={styles.microLabel}>Who I designed for</p>
                  <p>
                    People who would not call themselves spiritual but who love meaningful design, visual tools, and
                    personal insight - students, artists, designers, journalers, and anyone who simply wants a
                    beautiful, useful deck on their desk.
                  </p>
                </div>
                <div>
                  <p className={styles.microLabel}>Personality traits</p>
                  <ul className={styles.traitList}>
                    {audienceTraits.map((trait) => (
                      <li key={trait}>{trait}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.competitorGrid}>
                {competitors.map((competitor) => (
                  <article className={styles.competitorCard} key={competitor.name}>
                    <div className={styles.competitorImage}>
                      <img src={competitor.image} alt={`${competitor.name} deck`} loading="lazy" />
                    </div>
                    <h3>{competitor.name}</h3>
                    <p className={styles.competitorKeywords}>{competitor.keywords}</p>
                    <p>{competitor.body}</p>
                    <p className={styles.competitorGap}>{competitor.gap}</p>
                  </article>
                ))}
              </div>

              <p className={styles.positioningNote}>
                Taroo sits where OK Tarot&apos;s approachability meets Prismavisions&apos; collectibility: simple enough
                to read cold, distinct enough to want the whole set.
              </p>
            </section>

            {/* The system, compact. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Brand System</p>
                <div>
                  <h2 className={styles.sectionTitle}>The wordmark is the same kit, overlapped.</h2>
                  <p className={styles.sectionLead}>
                    T, A, R, O, O are cut from the shape library rather than set in a typeface. Seven shapes make the
                    five letters, and the three places two of them cross are where the rest of the palette comes from.
                  </p>
                </div>
              </div>

              <div className={styles.paletteBlock}>
                <p className={styles.microLabel}>Seven shapes</p>
                <div className={styles.chipRow}>
                  {brandBase.map((color) => (
                    <div className={styles.brandChip} key={color.hex}>
                      <span style={{ background: color.hex }} />
                      <strong>{color.label}</strong>
                      <em>{color.hex}</em>
                      <em>{color.part}</em>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.paletteBlock}>
                <p className={styles.microLabel}>Three crossings</p>
                <div className={styles.mixRow}>
                  {brandOverlap.map((mix) => (
                    <div className={styles.mix} key={mix.hex}>
                      {/* Two blocks overlapping by a quarter, with the middle
                          band painted the color the artwork actually prints
                          there - not a CSS multiply, which lands a few points
                          off the hand-picked value. */}
                      <div className={styles.mixFigure} aria-hidden="true">
                        <span style={{ background: mix.a }} />
                        <span style={{ background: mix.b }} />
                        <span style={{ background: mix.hex }} />
                      </div>
                      <strong>{mix.hex}</strong>
                      <em>{mix.label}</em>
                      <em>{mix.part}</em>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Close on the artwork again. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Product Details</p>
                <div>
                  <h2 className={styles.sectionTitle}>Everything the deck ships with runs on the same rules.</h2>
                  <p className={styles.sectionLead}>
                    The cover treatments reuse the card back rather than inventing a second look for marketing.
                  </p>
                </div>
              </div>

              <figure className={styles.brandBoard}>
                <img
                  src={img("ff8fe4581ffca27adf6ebb6bde4b88406cdb35ff.png")}
                  alt="Taroo brand board: the wordmark over a soft gradient with three cover treatments beneath it"
                  width="4474"
                  height="2516"
                  loading="lazy"
                />
                <figcaption>Wordmark lockup and the three cover treatments</figcaption>
              </figure>

              <ul className={styles.deliverables}>
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Reflection, short. */}
            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Reflection</p>
                <h2 className={styles.sectionTitle}>Recognition first, depth second.</h2>
              </div>

              <div className={styles.reflectionGrid}>
                {reflection.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <nav className={styles.projectNav} aria-label="Project navigation">
              <Link className={styles.projectNavPrev} href="/project/graveyard">
                <span className={styles.projectNavLabel}>&#8592; Previous Project</span>
                <span className={styles.projectNavName}>
                  <span className={styles.projectNavDot} aria-hidden="true" />
                  Graveyard
                </span>
              </Link>
              <Link className={styles.projectNavAll} href="/">All Projects</Link>
              <Link className={styles.projectNavNext} href="/project/alcohal">
                <span className={styles.projectNavLabel}>Next Project &#8594;</span>
                <span className={styles.projectNavName}>
                  Alcohol Directory
                  <span className={styles.projectNavDot} aria-hidden="true" />
                </span>
              </Link>
            </nav>
          </div>
        </section>

        <Reveal
          fade={`.${styles.productGallery} figure, .${styles.keywordBoard}, .${styles.decisionVisual}, .${styles.swatch}, .${styles.competitorImage}, .${styles.brandBoard}`}
        />

        <SiteFooter />
      </div>
    </main>
  )
}
