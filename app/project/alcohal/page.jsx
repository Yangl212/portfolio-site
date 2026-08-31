import Link from "next/link"

import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

const img = (hash) => `/framer-assets/images/${hash}`

const BOOK_SRC = "/alcohol/embed/flipbook.html"

const sourcePhotos = [
  {
    src: img("e45a0f4cd30eefe8fc27441ba9175797a52d1c57.png"),
    alt: "Original phone photo of a margarita on a bar counter in low light",
    w: "341",
    h: "460"
  },
  {
    src: img("d9fd9af0b3253543691532f63d2889cb8e858225.png"),
    alt: "Original phone photo of a dark bar table with drinks and playing cards",
    w: "345",
    h: "460"
  }
]

const idea = [
  {
    label: "What it is",
    body: "A riso zine of the classic cocktails I drank in New York. One spread per drink: the name, the bar, the address, and what it actually tasted like."
  },
  {
    label: "Who it is for",
    body: "People who go out for the room as much as the drink. It works as a keepsake, and the map at the back means the route can be walked again."
  },
  {
    label: "Why I made it",
    body: "I kept taking photos in bars and forgetting the drinks. I wanted a way to record taste and mood, and I had been wanting to design something for riso."
  }
]

const directions = [
  {
    label: "Riso, not clean print",
    body: "Flat spot colors, visible halftone, paper grain, and the small misregistration riso gives you. None of it is cleaned up afterwards."
  },
  {
    label: "Drink drawn, room photographed",
    body: "The cocktail is illustrated and the bar is a photo. The drawing carries how it felt; the photo is the evidence I was there."
  },
  {
    label: "Color comes from the drink",
    body: "Each spread is keyed to the color of its own cocktail. There is no fixed palette to pull from, so no two spreads sit on the same ground."
  }
]

const chapters = [
  {
    label: "Chapter 00",
    body: "Introduces the book and the visual approach, which comes out of the riso tradition of drawn design."
  },
  {
    label: "Body",
    tastes: ["Sour", "Sweet", "Bitter", "Spicy", "Salty"],
    body: "One chapter per taste. Every drink gets its name, the bar and address, a note on the taste and the room, my own photographs, and an illustration for the mood."
  },
  {
    label: "Ending",
    body: "Afterthoughts on the nights in the book, plus a map of every bar so the route can be retraced."
  }
]

const formatSpecs = [
  { term: "Size", value: "10 × 20 cm" },
  { term: "Orientation", value: "Portrait" },
  { term: "Print", value: "Risograph" },
  { term: "Extent", value: "25 spreads" },
  { term: "Binding", value: "Hand-sewn" }
]

const posters = [
  {
    src: img("987381382328bb7c55d8c7f932121000a73234a5.png"),
    alt: "Alcohol Directory poster: two figures on a pink ground reading behind a yellow book"
  },
  {
    src: img("017f7012c1c9f1131c319d0b9c26e5b2aa45eb18.png"),
    alt: "Alcohol Directory poster: a table of drinks drawn in riso colors on white"
  }
]

const bookGrids = [
  {
    src: img("c6bb85e5adf83cf08f8c9093a3e096d4fe83dcbc.jpg"),
    alt: "Fifteen Alcohol Directory spreads laid out in a grid on black"
  },
  {
    src: img("1a49a56a595edf30f54b00a5547d495e074389b7.jpg"),
    alt: "Ten more Alcohol Directory spreads laid out in a grid on black, including the taste chapter dividers"
  }
]

const reflection = [
  {
    label: "Limitation",
    body: "Hand-sewing caps it at a handful of copies. Anything past that needs a binding I have not worked out yet, and most of the cheap ones cut into the left-hand page."
  },
  {
    label: "Tradeoff",
    body: "Sorting by taste makes the book good to read straight through and bad to use as a reference. To find one bar you have to remember what you drank there."
  },
  {
    label: "Next",
    body: "The map at the back wants to be a fold-out insert rather than a page, so it can come out of the book and go in a pocket on the way to the first bar."
  }
]

export default function AlcohalProjectPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/" />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Personal Work"
              discipline={"Zine · 2025"}
              title="Alcohol Directory"
              image={img("de2adde594c13411e1b6edfae73dc2b71177dad0.png")}
              imageAlt="Alcohol Directory cover next to an open spread"
              summary="A riso zine of the cocktails I drank in New York. One spread per drink: what it was, where I had it, and what it tasted like."
              problem="Bar photos record where you were. They do not record what the drink tasted like or how the room felt."
              contribution="Illustration, riso separations, editorial layout, photography, printing, and binding."
              outcome="25 spreads sorted by taste, with a map at the back so the route can be walked again."
              role="Designer, illustrator, photographer"
              scope={"Illustration · Editorial · Riso"}
              platform={"Print · 10 × 20 cm zine"}
              timeline="6 weeks"
            />
          </div>

          <div className={styles.bodyContent}>
            {/* The book opens the body. It is the strongest thing on the page
                and should not need a scroll to find. */}
            <section className={styles.caseSection}>
              {/* The kicker sits on its own line so the button can align with the
                  top of the heading rather than with the label above it. */}
              <div className={styles.bookHeader}>
                <p className={styles.kicker}>The Book</p>
                <div className={styles.bookHeaderRow}>
                  <div className={styles.bookHeaderCopy}>
                    <h2 className={styles.sectionTitle}>The whole zine, cover to back.</h2>
                    <p className={styles.sectionLead}>
                      All 25 spreads. Click either half of the book to turn a page, or use the arrow keys. Open it at
                      full size to read the tasting notes.
                    </p>
                  </div>

                  <a className={styles.bookLink} href={BOOK_SRC} target="_blank" rel="noreferrer">
                    Open at full size <span aria-hidden="true">&#8594;</span>
                  </a>
                </div>
              </div>

              <div className={styles.bookFrame}>
                <iframe
                  className={styles.bookViewport}
                  src={BOOK_SRC}
                  title="Alcohol Directory, readable page by page"
                  loading="lazy"
                />
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>The Idea</p>
                <div>
                  <h2 className={styles.sectionTitle}>A record of drinks, not of bars.</h2>
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
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Direction</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three rules I set before drawing anything.</h2>
                  <p className={styles.sectionLead}>
                    The moodboard was mostly riso printing and illustrated food books. What I took from it was less a
                    look than three things I was not allowed to break.
                  </p>
                </div>
              </div>

              <figure className={styles.moodboard}>
                <img
                  src={img("c66b6d63ee8d99d60a454d4882a393ae06051d1e.png")}
                  alt="Moodboard of riso prints, illustrated food books, and zine formats"
                  width="3840"
                  height="2160"
                  loading="lazy"
                />
              </figure>

              <div className={styles.directionGrid}>
                {directions.map((direction) => (
                  <article key={direction.label}>
                    <h3>{direction.label}</h3>
                    <p>{direction.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Highlights rather than decisions: the things that are true of the
                object itself, in the order they matter to someone holding it. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Highlights</p>
                <div>
                  <h2 className={styles.sectionTitle}>What makes it worth holding.</h2>
                </div>
              </div>

              <article className={styles.highlight}>
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>01 / Made by hand</p>
                  <h3>Risograph printed and sewn by hand.</h3>
                  <p>
                    The whole book is printed on a risograph and bound by hand. The halftones are ink on paper rather
                    than a filter, the registration drifts a little on some spreads, and the drink name on every
                    left-hand page is hand-lettered &mdash; no two are drawn the same way.
                  </p>
                </div>
                <figure className={styles.highlightVisual}>
                  <img
                    src="/alcohol/making.webp"
                    alt="A printed copy of the zine open on a cutting mat, clipped at the spine, with an awl, bone folder, waxed thread and a steel ruler laid out beside it"
                    width="1800"
                    height="1350"
                    loading="lazy"
                  />
                </figure>
              </article>

              <article className={styles.highlight} data-layout="reverse">
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>02 / All of it first-hand</p>
                  <h3>Every drink in here is one I actually drank.</h3>
                  <p>
                    Nothing is researched. Each spread is a bar I went to and a cocktail I ordered, and the tasting
                    note is what I thought of it rather than what the menu said.
                  </p>
                  <p>
                    The bar names and addresses are real, so the book works as a route as much as a record. The map at
                    the back lets you walk the whole thing.
                  </p>
                </div>
                <figure className={styles.highlightVisual}>
                  <img
                    src={img("b888c714deb12399e0ae32a3e4af79963c30fa7d.png")}
                    alt="Pina Colada Pickleback spread: illustration left, bar name, riso photo, tasting note and address right"
                    width="6000"
                    height="4500"
                    loading="lazy"
                  />
                </figure>
              </article>

              <article className={styles.highlight}>
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>03 / My own photos</p>
                  <h3>Every photo goes through a riso separation first.</h3>
                  <p>
                    The source photos are phone shots taken at the bar, usually in bad light. Separating them into two
                    or three flat colors throws away most of the detail and keeps the shape and the mood, which is
                    closer to what I remember of a night than the original file is.
                  </p>
                  <p>
                    It also means a badly lit photo stops being a problem. Half the shots in the book would not survive
                    being printed straight.
                  </p>
                </div>
                <figure className={styles.highlightVisual}>
                  <div className={styles.photoPair}>
                    {sourcePhotos.map((photo) => (
                      <img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.w}
                        height={photo.h}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </figure>
              </article>

              <article className={styles.highlight} data-layout="wide">
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>04 / Ordered by taste</p>
                  <h3>Sorted by taste, not by bar or by date.</h3>
                  <p>
                    The book follows the taste profiles of the drinks rather than where or when I had them. It opens on
                    the refreshing ones and moves toward the concentrated and strong, which is roughly the shape of an
                    evening out. Sorting by neighbourhood or by date would have been easier to build and would have
                    told a reader nothing.
                  </p>
                </div>

                <div className={styles.chapters}>
                  {chapters.map((chapter) => (
                    <div className={styles.chapter} key={chapter.label}>
                      <p className={styles.microLabel}>{chapter.label}</p>
                      {chapter.tastes && (
                        <ul className={styles.tastes}>
                          {chapter.tastes.map((taste) => (
                            <li key={taste}>{taste}</li>
                          ))}
                        </ul>
                      )}
                      <p>{chapter.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Format</p>
                <div>
                  <h2 className={styles.sectionTitle}>Small enough to carry, tall enough for one drink a page.</h2>
                  <p className={styles.sectionLead}>
                    10 × 20 cm is close to a bar menu, and the tall portrait page suits a glass better than a square
                    would. It is sewn rather than coiled, so the left-hand page can run full bleed.
                  </p>
                </div>
              </div>

              <div className={styles.formatLayout}>
                <dl className={styles.specs}>
                  {formatSpecs.map((spec) => (
                    <div key={spec.term}>
                      <dt>{spec.term}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <figure className={styles.references}>
                  <img
                    src={img("cc07e1c793e245a6d402323bc92aad29b2d2bad6.png")}
                    alt="Two reference zines: a thread-bound book lying open, and a coil-bound cooking zine"
                    width="681"
                    height="492"
                    loading="lazy"
                  />
                </figure>
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Posters</p>
                <div>
                  <h2 className={styles.sectionTitle}>When I&apos;m sober, I&apos;m not romantic anymore.</h2>
                  <p className={styles.sectionLead}>
                    Two promo posters use the drawing style from the book but drop the information layer, so the line
                    has to carry it on its own.
                  </p>
                </div>
              </div>

              <div className={styles.posterPair}>
                {posters.map((poster) => (
                  <figure key={poster.src}>
                    <img src={poster.src} alt={poster.alt} width="595" height="842" loading="lazy" />
                  </figure>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Every Spread</p>
                <div>
                  <h2 className={styles.sectionTitle}>Twenty-five spreads, five taste chapters.</h2>
                  <p className={styles.sectionLead}>
                    Laid out together, the template holds and the color still changes on every drink. Each taste
                    chapter opens on its own divider.
                  </p>
                </div>
              </div>

              <div className={styles.bookGrids}>
                {bookGrids.map((grid) => (
                  <figure key={grid.src}>
                    <img src={grid.src} alt={grid.alt} width="2000" height="1125" loading="lazy" />
                  </figure>
                ))}
              </div>
            </section>

            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Reflection</p>
                <h2 className={styles.sectionTitle}>It exists, but it does not scale.</h2>
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
              <Link className={styles.projectNavPrev} href="/project/taroo">
                <span className={styles.projectNavLabel}>&#8592; Previous Project</span>
                <span className={styles.projectNavName}>
                  <span className={styles.projectNavDot} aria-hidden="true" />
                  Taroo
                </span>
              </Link>
              <Link className={styles.projectNavAll} href="/">All Projects</Link>
              <Link className={styles.projectNavNext} href="/project/suglar">
                <span className={styles.projectNavLabel}>Next Project &#8594;</span>
                <span className={styles.projectNavName}>
                  Suglar
                  <span className={styles.projectNavDot} aria-hidden="true" />
                </span>
              </Link>
            </nav>
          </div>
        </section>

        <Reveal
          fade={`.${styles.moodboard}, .${styles.highlightVisual}, .${styles.references}, .${styles.posterPair} figure, .${styles.bookGrids} figure`}
        />

        <SiteFooter />
      </div>
    </main>
  )
}
