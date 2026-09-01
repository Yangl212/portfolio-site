import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"

import styles from "./page.module.css"

const img = (hash, ext = "png") => `/framer-assets/images/${hash}.${ext}`

const facts = [
  { label: "Players", value: "2–4 + 1 judge" },
  { label: "Length", value: "~20 minutes" },
  { label: "Turn", value: "Ability → sense → draw" },
  { label: "You lose at", value: "7 filled slots" }
]

const deliverables = [
  "4 sensory cards",
  "4 ability cards",
  "Reward cards",
  "Candy jar boards",
  "Folded instruction sheet",
  "Two-piece box",
  "Opaque candy boxes",
  "Wordmark and pattern system"
]

const idea = [
  {
    label: "What is Suglar?",
    body: "A 2–4 player board game made out of real candy. Every piece on the table is edible and hidden inside an identical opaque box, so a turn is spent working out what you are about to eat rather than looking at it."
  },
  {
    label: "Who is it for?",
    body: "People who like party games and sensory play more than rule-heavy strategy — and anyone who has ever picked a chocolate out of an assorted box by feel and hoped for the best."
  },
  {
    label: "Why build it?",
    body: "The research behind the brief kept turning up games with a rich concept and thin play. I wanted the concept to be the mechanic: if the game is about candy, then candy has to be the thing you physically handle."
  }
]

/* Two existing games that already prove the argument, kept short. Both use a
   physical component as the rule rather than as decoration. */
const references = [
  {
    name: "Meltdown",
    image: img("b4de6d98f3125ef938512f8b05a22250bdc288bb"),
    keywords: "Cooperative · Consumable component",
    body: "A climate-crisis board game played around real ice cubes. The ice melts through the session, shifting the board and running down the clock at the same time.",
    takeaway: "A component that is used up can carry a game’s meaning better than a rule can state it."
  },
  {
    name: "Nyctophobia",
    image: img("b3e1d63092bf3773c3bf3f1fae37215c0dd2bb7b"),
    keywords: "Asymmetric · Tactile · Blackout",
    body: "Three to six players, one of whom can see. The rest wear blackout glasses and navigate an 8×8 maze of obstacles by touch, memory, and talking to each other.",
    takeaway: "Take a sense away and the remaining ones become the game. Suglar takes sight off the pieces rather than off the players."
  }
]

const rounds = [
  {
    label: "Round 01",
    title: "A chess board made of candy",
    body: "Two players place candies on a grid and try to surround each other. Surround an opponent’s piece and you eat it. The player holding the most candy when the moves run out wins.",
    notes: [
      { tone: "worked", label: "Worked", text: "Testers understood it in under a minute and liked handling real candy as pieces. Several compared the blocking to Go." },
      { tone: "broke", label: "Broke", text: "It was Go with chocolate on it. Everything was visible, so the material was decoration — swap in plastic counters and nothing about the game changes." }
    ],
    images: [
      { src: img("017e4f8f7ba4a879095ad7f3f1ad01e913afbf99"), alt: "Grid board layout with candy pieces and the capture pattern diagrammed beside it" },
      { src: img("5d748aa3529acc1325c022572acde4c4d78a6e49"), alt: "The first paper board being cut on a green cutting mat" }
    ],
    caption: "Round one board and capture rules"
  },
  {
    label: "Round 02",
    title: "Blind match-three",
    body: "Candies are hidden in the cells of a grid. Players pick blind, and three of a kind can be eaten. Sensory cards let you inspect a candy before committing, and holding more than seven loses the game.",
    notes: [
      { tone: "worked", label: "Worked", text: "The hidden draw and the sensory guess were the only things anyone talked about afterwards. The overindulgence rule got laughs every time it fired." },
      { tone: "broke", label: "Broke", text: "Four-player rounds dragged, and everyone was quietly solving their own jar. There was almost no reason to look at another player’s board." }
    ],
    images: [
      { src: img("58e76814069dd3eb13e137479a88e7f64b7abeff"), alt: "Cardboard grid prototype filled with wrapped candies, sorted candy on a table, and the taped play surface" }
    ],
    caption: "Round two prototype, built from cardboard and sorted supermarket candy"
  },
  {
    label: "Final",
    title: "The rules that shipped",
    body: "Round two kept its core and gained the three things it was missing: ability cards, so a turn can reach into someone else’s game; a judge, who runs the sequence and returns eliminated candy to the board; and a printed instruction sheet, so the order of a turn is never argued about mid-game.",
    notes: [
      { tone: "worked", label: "Added", text: "Change, Claim, Clone, and Forfeit — four ability cards, three of which only work by targeting another player." },
      { tone: "worked", label: "Added", text: "A fifth seat at the table. The judge keeps pacing tight and is the only person who knows what went back onto the board." }
    ],
    images: [],
    caption: null
  }
]

/* Sampled from the finished card and box artwork, so the chips here are the
   colors the game actually prints. */
const palette = [
  { hex: "#FFEEFE", name: "Sugar white", role: "Ground" },
  { hex: "#E15582", name: "Suglar pink", role: "Wordmark" },
  { hex: "#EF8CD1", name: "Bubblegum", role: "Sensory cards" },
  { hex: "#C6C8F3", name: "Periwinkle", role: "Logo offset" },
  { hex: "#FFD952", name: "Lemon", role: "Ability cards" },
  { hex: "#E1A210", name: "Amber", role: "Field" },
  { hex: "#F18C0D", name: "Orange", role: "Field" },
  { hex: "#FD2894", name: "Hot pink", role: "Field" },
  { hex: "#F1B2BA", name: "Blush", role: "Field" },
  { hex: "#EEDFB8", name: "Cream", role: "Field" },
  { hex: "#6A9CE3", name: "Cornflower", role: "Field" },
  { hex: "#2177B0", name: "Sea blue", role: "Field" },
  { hex: "#1C0B64", name: "Ink", role: "Contrast" },
  { hex: "#73B6BF", name: "Teal", role: "Field" },
  { hex: "#6FA195", name: "Sage", role: "Field" },
  { hex: "#C4DDD1", name: "Mint", role: "Field" },
  { hex: "#D47E4B", name: "Caramel", role: "Field" },
  { hex: "#2F3237", name: "Charcoal", role: "Contrast" }
]

/* Scored by playtesters on the five-point card at the end of the final
   session, alongside the written comments below. */
const ratings = [
  { label: "Innovative", score: 5 },
  { label: "Immersion", score: 5 },
  { label: "Replayability", score: 5 },
  { label: "Graphics", score: 4 },
  { label: "Multiplayer", score: 3 },
  { label: "Fluency", score: 3 }
]

const quotes = [
  {
    text: "Finding and eating my favorite candies feels great. However, I think adding more skill cards might enhance the interaction between the game and the players.",
    source: "Playtester · replayability 5/5"
  },
  {
    text: "I really love the artistic design of this game; the visuals are fantastic. However, the card texture could be improved — consider using more professional printing next time.",
    source: "Playtester · graphics 4/5"
  },
  {
    text: "Candy brings joy. Incorporating multiple senses is very interesting, and this is my first time playing such a game. However, I find it difficult to distinguish scents.",
    source: "Playtester · innovative 5/5"
  }
]

const reflection = [
  {
    label: "Limitation",
    body: "Smell is the weakest of the four senses in play. Wrapped supermarket candy barely smells of anything, so the Smell card is the least-used card in the deck — the mechanic is sound, the component choice undercut it."
  },
  {
    label: "Key tradeoff",
    body: "Real candy is what makes the game memorable and what makes it impossible to ship. Every session eats its own components. I chose the experience over the product, which is the right call for a studio brief and the wrong one for a shelf."
  },
  {
    label: "Next validation",
    body: "Print the cards properly and run four strangers through a full round without me at the table. Fluency scored 3/5 and I still cannot tell whether that was the rules or the judge’s pacing."
  }
]

export default function SuglarPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track)} track={track} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Student Work"
              discipline="Game & Visual Design · 2023"
              title="Suglar"
              image={img("3481cabd3205746d092e3c5502bb5c105650078a")}
              imageAlt="The Suglar box open, showing the patterned lid, the printed sleeve, the card trays, and one of the black candy boxes"
              summary="A candy board game you play with your hands and your nose. Four senses, seven slots, and a losing condition that fires when you eat too much."
              problem="Board games are designed almost entirely for the eyes, so what a game is physically made of rarely changes how it plays."
              contribution="Solo: game design across three rule sets and two playtest rounds, card and brand system, packaging, and the printed prototype."
              outcome="A 2–4 player game where hidden candy is identified by smell, touch, or taste. Playtesters scored it 5/5 for innovation, immersion, and replayability."
              role="Game & Visual Designer (solo)"
              scope="Game design · Playtesting · Identity · Packaging"
              platform="Physical board game"
              timeline="8 weeks"
            />
          </div>

          <div className={styles.bodyContent}>
            {/* Finished object first, the same way the Taroo page opens. This is
                a physical product, so the box is the fastest answer to "what is
                it" that the page can give. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Final Product</p>
                <div>
                  <h2 className={styles.sectionTitle}>What actually ships in the box.</h2>
                </div>
              </div>

              <div className={styles.productGallery}>
                <figure>
                  <img
                    src={img("00bb1b7ff07ca26c4e9c8c0cdf78fa973d6a4fde")}
                    alt="The folded instruction sheet opened out beside the four yellow ability cards and the four pink sensory cards"
                    width="840"
                    height="936"
                  />
                  <figcaption>Instruction sheet, four ability cards, four sensory cards</figcaption>
                </figure>
              </div>

              <dl className={styles.factRow}>
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className={styles.deliverables}>
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* The idea, kept to three answers, then the two references that
                make the argument for a consumable component. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>The Idea</p>
                <div>
                  <h2 className={styles.sectionTitle}>Make the material the mechanic.</h2>
                </div>
              </div>

              <div className={styles.ideaGrid}>
                {idea.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>

              <div className={styles.referenceGrid}>
                {references.map((reference) => (
                  <article className={styles.referenceCard} key={reference.name}>
                    <div className={styles.referenceImage}>
                      <img src={reference.image} alt={`${reference.name} components`} loading="lazy" />
                    </div>
                    <h3>{reference.name}</h3>
                    <p className={styles.referenceKeywords}>{reference.keywords}</p>
                    <p>{reference.body}</p>
                    <p className={styles.referenceTakeaway}>{reference.takeaway}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* The section a hiring manager actually reads: three rules, each
                next to the artefact that carries it. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Key Design Decisions</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three rules carry the whole game.</h2>
                  <p className={styles.sectionLead}>
                    Each one came out of a playtest that failed in a specific way, and each one is printed on a card
                    rather than explained in a manual.
                  </p>
                </div>
              </div>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>01 / Core mechanic</p>
                  <h3>You cannot see the candy you are about to eat.</h3>
                  <p>
                    Every candy sits inside an identical opaque box. On your turn you may spend one sensory card
                    &mdash; Visual, Touch, Taste, or Smell &mdash; to inspect a candy privately, then decide whether to
                    keep it. What you learn is never revealed to the other players.
                  </p>
                  <p>
                    This is the rule the rest of the game hangs off. It turns a match-three loop into a bluffing loop,
                    and it makes the four senses worth different amounts depending on what is still on the board:
                    Visual is strongest early, Touch and Taste hold their value, Smell is the gamble.
                  </p>
                  <p className={styles.ruleNote}>
                    Spend no sensory card and you must take the candy blind. Skipping the inspection is not a free
                    action, it is the risk.
                  </p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("49999264c8c1175e04f35aa117e5ea0e04d29359")}
                    alt="The four Suglar sensory cards: Visual, Smell, Touch, and Taste, each drawn as a geometric symbol on pink"
                    width="1534"
                    height="510"
                  />
                  <figcaption>The four sensory cards</figcaption>
                </figure>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>02 / Win condition</p>
                  <h3>Seven slots, and eating too much is how you lose.</h3>
                  <p>
                    Each player holds a candy jar with seven slots. Three identical candies clear out of the jar and
                    score a point plus a reward card. Fill all seven with nothing left to clear and you are out for
                    overindulgence.
                  </p>
                  <p>
                    The cap is what makes a blind draw dangerous. On slot two a bad guess costs nothing; on slot five
                    it can end your game. So the sensory cards get more valuable at exactly the point in the round
                    where they are hardest to spare.
                  </p>
                </div>
                <figure className={styles.decisionVisual}>
                  <div className={styles.stack}>
                    <img
                      src={img("1b77f96c64ac5e712ed86cd973172c0a7bc0d28a")}
                      alt="Candy jar diagram with seven slots, and three matching candies clearing while two mismatched sets do not"
                      width="921"
                      height="384"
                    />
                    <img
                      src={img("72b9aa8cf4d089587276c3663f7568af69d67ef7")}
                      alt="Three rows of seven candies showing which combinations clear the jar and which fill it"
                      width="921"
                      height="311"
                    />
                  </div>
                  <figcaption>Clearing the jar, and the two ways it fills up instead</figcaption>
                </figure>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>03 / Player interaction</p>
                  <h3>Four ability cards, added because round two had none.</h3>
                  <p>
                    Change swaps a candy in your jar with another player&apos;s. Claim draws a random card out of
                    someone&apos;s hand. Clone duplicates a candy you already hold. Forfeit discards one. They are
                    played first in a turn, and you may play as many as you like.
                  </p>
                  <p>
                    Round-two testers said the same thing three different ways: the game was fun but solitary. Three of
                    the four abilities only do anything by reaching into another player&apos;s game, which is the
                    entire point of adding them.
                  </p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("d4d4dce404837d1eb97dda9fc41e0e4b385798b6")}
                    alt="The four Suglar ability cards on yellow: Change, Claim, Clone, and Forfeit"
                    width="1534"
                    height="509"
                  />
                  <figcaption>The four ability cards</figcaption>
                </figure>
              </article>
            </section>

            {/* How the rules above were earned. Two rounds that each failed for
                a nameable reason, then what shipped. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Iteration</p>
                <div>
                  <h2 className={styles.sectionTitle}>Two playtests, two rebuilds.</h2>
                  <p className={styles.sectionLead}>
                    The first version was strategically fine and thematically pointless. The second fixed the theme and
                    broke the table. The third is the one in the box.
                  </p>
                </div>
              </div>

              <div className={styles.rounds}>
                {rounds.map((round) => (
                  <article
                    className={styles.round}
                    key={round.label}
                    data-visual={round.images.length ? undefined : "none"}
                  >
                    <div className={styles.roundCopy}>
                      <p className={styles.roundLabel}>{round.label}</p>
                      <h3>{round.title}</h3>
                      <p>{round.body}</p>
                      <ul className={styles.roundNotes}>
                        {round.notes.map((note) => (
                          <li key={note.text} data-tone={note.tone}>
                            <b>{note.label}</b>
                            <span>{note.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {round.images.length > 0 && (
                      <figure className={styles.roundVisual}>
                        <div className={styles.stack}>
                          {round.images.map((image) => (
                            <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
                          ))}
                        </div>
                        <figcaption>{round.caption}</figcaption>
                      </figure>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* The visual system, compact: wordmark, type, palette, elements. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Visual System</p>
                <div>
                  <h2 className={styles.sectionTitle}>One shape kit, printed on everything.</h2>
                  <p className={styles.sectionLead}>
                    Cards, box, sleeve, and instruction sheet are all drawn from the same four primitives and the same
                    sampled candy palette, so the components read as one set without matching each other exactly.
                  </p>
                </div>
              </div>

              <div className={styles.systemBlock}>
                <div className={styles.systemCopy}>
                  <h3>The wordmark is the logo, offset.</h3>
                  <p>
                    A condensed display cut with a periwinkle duplicate slipped behind it. The offset does the work a
                    gloss or a bevel would normally do &mdash; it reads as sugar-coated without a single gradient.
                  </p>
                  <p>
                    Type underneath it stays plain on purpose: Bebas Neue Regular for display, Belanosima Semibold for
                    card labels, Montserrat Semibold and Bold for anything a player has to read while holding candy in
                    the other hand.
                  </p>
                </div>
                <div className={styles.wordmarkRow}>
                  <div>
                    <img
                      src={img("e3cca4a6e38f5e0d14fddf93839f8a9886be5970")}
                      alt="The Suglar wordmark in flat pink"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <img
                      src={img("03206a6eec0ab00994f9861a005553083838358d")}
                      alt="The Suglar wordmark with its periwinkle and pink offset duplicates"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <img
                      src={img("b88ed990c08c77db5d2bb0c85f00300843a7fea7")}
                      alt="Type specimen: Montserrat Semibold and Bold, Belanosima Semibold, Bebas Neue Regular"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.systemBlock} data-wide="">
                <div className={styles.systemCopy}>
                  <h3>Eighteen colors, all sampled off candy.</h3>
                  <p>
                    The palette was pulled from wrappers and confectionery photography rather than picked in a color
                    wheel, which is why it sits slightly off-primary throughout: the yellows are lemon-drop, the blues
                    are wrapper-foil, and the ground is the pale pink of a sugar coating.
                  </p>
                </div>
                <div className={styles.paletteGrid}>
                  {palette.map((color) => (
                    <div className={styles.swatch} key={color.hex}>
                      <div className={styles.swatchChip} style={{ background: color.hex }} />
                      <p className={styles.swatchName}>{color.name}</p>
                      <p className={styles.swatchHex}>{color.hex}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.systemBlock} data-wide="">
                <div className={styles.systemCopy}>
                  <h3>Circle, square, arc, half-circle.</h3>
                  <p>
                    Every tile in the pattern is one of four primitives nested inside a square, and every overlap is a
                    flat transparency rather than a new color. It scales from a 12mm card corner to the full box wrap
                    without redrawing anything.
                  </p>
                </div>
                <figure className={styles.systemFigure}>
                  <img
                    src={img("6a8f41e9abea36ec8fecdb89292885bb2e9b0c61")}
                    alt="Style guide board: four transparency studies above twelve geometric element tiles"
                    width="2588"
                    height="1634"
                    loading="lazy"
                  />
                  <figcaption>Transparency studies and the element library</figcaption>
                </figure>
              </div>

              <figure className={styles.systemFigure}>
                <img
                  src={img("a24d5da4bb5ee86851c88fe6ceac10ef0c01e5ad")}
                  alt="Suglar key visual: a nine-tile grid of geometric candy elements beside the wordmark"
                  width="5760"
                  height="3240"
                  loading="lazy"
                />
                <figcaption>The same kit assembled as the key visual</figcaption>
              </figure>
            </section>

            {/* What came back from the final session, scores included. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Results</p>
                <div>
                  <h2 className={styles.sectionTitle}>Strong on novelty, weak on pace.</h2>
                  <p className={styles.sectionLead}>
                    Playtesters scored the finished game on six measures and wrote a comment each. The scores split
                    cleanly: everything about the concept landed, everything about running a four-player table did not.
                  </p>
                </div>
              </div>

              <div className={styles.ratingGrid}>
                {ratings.map((rating) => (
                  <div className={styles.rating} key={rating.label}>
                    <p className={styles.ratingLabel}>
                      {rating.label}
                      <em>{rating.score}/5</em>
                    </p>
                    <div className={styles.ratingDots} role="img" aria-label={`${rating.score} out of 5`}>
                      {[1, 2, 3, 4, 5].map((step) => (
                        <span key={step} data-on={step <= rating.score ? "" : undefined} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.quoteGrid}>
                {quotes.map((quote) => (
                  <figure className={styles.quote} key={quote.source}>
                    <blockquote>&ldquo;{quote.text}&rdquo;</blockquote>
                    <figcaption>{quote.source}</figcaption>
                  </figure>
                ))}
              </div>

              <div className={styles.buildGallery}>
                <figure>
                  <img
                    src={img("8a20674441c2b898970a4715a754956babc1861e")}
                    alt="Rows of small black boxes assembled by hand, with printed sensory cards and the instruction sheet beside them"
                    loading="lazy"
                  />
                  <figcaption>The opaque candy boxes, cut and folded for the session</figcaption>
                </figure>
                <figure>
                  <img
                    src={img("be9017fde875eccd706cd08fd62ab5ece4ea6fb7")}
                    alt="The playtest table set up with the black boxes, the instruction sheet standing open, and cards dealt out"
                    loading="lazy"
                  />
                  <figcaption>The final playtest table, set and ready</figcaption>
                </figure>
              </div>
            </section>

            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Reflection</p>
                <h2 className={styles.sectionTitle}>The best component is the one I cannot ship.</h2>
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

            <ProjectNav slug="suglar" track={track} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.productGallery} figure, .${styles.referenceImage}, .${styles.decisionVisual}, .${styles.roundVisual}, .${styles.wordmarkRow} > div, .${styles.swatch}, .${styles.systemFigure}, .${styles.buildGallery} figure`}
        />

        <SiteFooter />
      </div>
    </main>
  )
}
