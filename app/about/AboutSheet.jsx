import {
  Architects_Daughter,
  Caveat,
  DM_Sans,
  Homemade_Apple,
  Indie_Flower,
  Reenie_Beanie
} from "next/font/google"
import { SiteHeader } from "../../components/SiteHeader"
import { pageBase } from "../../lib/projects"
import { RisoFooter } from "../home-riso/RisoFooter"

import { CyclingWord } from "./CyclingWord"
import { Reveal } from "./Reveal"

import styles from "./page.module.css"

/* The sans the writing itself is set in: one size, one weight, all the
   way down. The mono for the small print comes from the root layout. */
const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-sans", display: "swap" })
/* Five hands, for the odd word worth saying in a different voice. They
   are deliberately unlike one another - a fast slanted script, a looped
   cursive, a round print, a narrow drafting hand and a loose scrawl - so
   the word that cycles through them reads as five different people
   writing it rather than one typeface wobbling. The first is the one the
   home page writes its note in. */
const handA = Caveat({ subsets: ["latin"], weight: ["700"], variable: "--font-hand-a", display: "swap" })
const handB = Homemade_Apple({ subsets: ["latin"], weight: ["400"], variable: "--font-hand-b", display: "swap" })
const handC = Indie_Flower({ subsets: ["latin"], weight: ["400"], variable: "--font-hand-c", display: "swap" })
const handD = Architects_Daughter({ subsets: ["latin"], weight: ["400"], variable: "--font-hand-d", display: "swap" })
const handE = Reenie_Beanie({ subsets: ["latin"], weight: ["400"], variable: "--font-hand-e", display: "swap" })

/* A paragraph is either a string or a list of parts, and a part is either
 * a string or [mark, text]: the marks are the hand ones off the sheets in
 * /public/about/marks, drawn over the words the way a reader would go at
 * a page with a pen. Exported so each track's own chapters data can use
 * them without redeclaring the same strings.
 */
export const HL = "hl"
export const HL_LONG = "hlLong"
export const CIRCLE = "circle"
export const CIRCLE_ROUND = "circleRound"
export const UNDERLINE = "underline"
export const UNDERLINE_DOUBLE = "underlineDouble"
export const CYCLE = "cycle"
export const HAND_A = "handA"
export const HAND_B = "handB"
export const HAND_C = "handC"
export const HAND_D = "handD"
export const HAND_E = "handE"

/* A marked word is kept on one line: a hand mark stretched across a line
   break would be drawn twice, once at each end. */
function parts(paragraph) {
  if (typeof paragraph === "string") return paragraph

  return paragraph.map((part) => {
    if (typeof part === "string") return part

    /* One word is written in each of the five hands in turn rather than
       settling on one of them. */
    if (part[0] === CYCLE) {
      return (
        <CyclingWord
          key={part[1]}
          word={part[1]}
          hands={[styles.handA, styles.handC, styles.handE, styles.handD, styles.handB]}
          interval={300}
        />
      )
    }

    return <span className={styles[part[0]]} key={part[1]}>{part[1]}</span>
  })
}

function key(paragraph) {
  return typeof paragraph === "string" ? paragraph : paragraph.map((part) => (typeof part === "string" ? part : part[1])).join("")
}

function Picture({ side, src, alt, ratio, lift, book, width, tilt, edge, stack, note, icon, out }) {
  const className = [
    styles.picture,
    side === "left" ? styles.left : styles.right,
    edge ? styles.edge : "",
    icon ? styles.icon : ""
  ].filter(Boolean).join(" ")
  const style = {
    "--ratio": ratio,
    "--lift": `${lift}px`,
    /* A picture may be given its own width and its own angle; without
       them it takes the common size and hangs straight. */
    ...(width ? { "--pic-w": `min(${width}px, 24vw)` } : null),
    ...(tilt ? { "--tilt": `${tilt}deg` } : null),
    /* How far out into the margin this one stands, in rem. */
    ...(out ? { "--out": `${out}rem` } : null)
  }

  /* A handful of photographs dropped on top of each other. Pointed at,
     they slide apart into a hand of pictures. */
  if (stack) {
    return (
      <figure className={`${className} ${styles.stack}`} style={style} data-reveal="">
        {stack.map((photo, index) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            style={{ "--i": index }}
            loading="lazy"
            decoding="async"
          />
        ))}
      </figure>
    )
  }

  /* Not a picture of a book: a book. The cover swings open on its hinge
     when it is pointed at, and the pages behind it are already there. */
  if (book) {
    return (
      <figure className={`${className} ${styles.book}`} style={style} data-reveal="">
        <div className={styles.bookBody}>
          <span className={styles.bookPages} aria-hidden="true" />
          <span className={styles.bookCover}>
            <img src={book.src} alt={book.alt} loading="lazy" decoding="async" />
            <span className={styles.bookHinge} aria-hidden="true" />
          </span>
        </div>
      </figure>
    )
  }

  /* An empty slot is left showing as a frame rather than collapsing, so
     the page can be read at its finished width before the pictures are
     in. It says nothing and is hidden from screen readers. */
  if (!src) {
    return <figure className={`${className} ${styles.empty}`} style={style} data-reveal="" aria-hidden="true" />
  }

  return (
    <figure className={className} style={style} data-reveal="">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {/* Written in beside the picture when it is pointed at, the way a
          note gets added to a photograph after the fact. */}
      {note ? <figcaption className={`${styles.note} ${styles.handA}`}>{note}</figcaption> : null}
    </figure>
  )
}

/*
 * The shared shell both tracks' About pages stand on: the sheet that
 * rises from the foot of the screen, the narrow column of writing with
 * pictures in the margins, the hand-drawn marks, and the home page's own
 * riso footer to close on. A track brings only its own header link, title,
 * opening line and `chapters` - everything about how a chapter is laid
 * out and how a picture behaves is here, once, so the two tracks' pages
 * cannot quietly drift apart from each other.
 *
 * `chapters[].pictures[].book`, where used, is `{ src, alt }` rather than
 * a fixed file: each track keeps its own book.
 */
export function AboutSheet({ track = "uiux", locale = "en", title = "About me", statement, chapters }) {
  const base = pageBase(track, locale)
  /* The Chinese sheet is written in the hand declared in the stylesheet;
     the English one is left exactly as it was, down to the class string. */
  const contentClass = [styles.content, locale === "zh" ? styles.zhHand : null].filter(Boolean).join(" ")

  return (
    <main className={`${styles.page} ${sans.variable} ${handA.variable} ${handB.variable} ${handC.variable} ${handD.variable} ${handE.variable}`}>
      {/* The bar sits outside the sheet, so the sheet's scrollbar runs
          below it rather than up the side of it. The chapters below stay
          English until translated - only the chrome (header, footer) is
          locale-aware for now. */}
      <SiteHeader active={`${base}/about`} track={track} locale={locale} />

      <div className={styles.sheet} data-about-sheet="">
        <Reveal />

        <article className={contentClass}>
          <header className={`${styles.opening} ${styles.rise}`}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.statement}>{parts(statement)}</p>
          </header>

          {chapters.map((chapter) => (
            <section className={styles.chapter} key={key(chapter.text[0])}>
              <div className={styles.column}>
                {chapter.text.map((paragraph) => (
                  <p key={key(paragraph)} data-reveal="">{parts(paragraph)}</p>
                ))}
              </div>
              {chapter.pictures.map((picture) => (
                <Picture key={`${picture.side}-${picture.lift}`} {...picture} />
              ))}
            </section>
          ))}
        </article>

        {/* The same back of the sheet the home page prints. */}
        <RisoFooter locale={locale} />
      </div>
    </main>
  )
}
