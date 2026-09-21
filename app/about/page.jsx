import {
  Architects_Daughter,
  Caveat,
  DM_Sans,
  Homemade_Apple,
  Indie_Flower,
  Reenie_Beanie
} from "next/font/google"
import { SiteHeader } from "../../components/SiteHeader"
import { trackBase } from "../../lib/projects"
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

export const metadata = {
  title: "About",
  description:
    "Lele Yang on meaning and beauty, logic and user testing, games as a medium, and what AI changed about the work."
}

/* A paragraph is either a string or a list of parts, and a part is either
 * a string or [mark, text]: the marks are the hand ones off the sheets in
 * /public/about/marks, drawn over the words the way a reader would go at
 * a page with a pen. Used sparingly and unevenly on purpose - eight in
 * the whole page, none at all in the fourth chapter.
 */
const HL = "hl"
const HL_LONG = "hlLong"
const CIRCLE = "circle"
const CIRCLE_ROUND = "circleRound"
const UNDERLINE = "underline"
const UNDERLINE_DOUBLE = "underlineDouble"
const CYCLE = "cycle"
const HAND_A = "handA"
const HAND_B = "handB"
const HAND_C = "handC"
const HAND_D = "handD"
const HAND_E = "handE"

/*
 * About, entered from the name on the home page: the print is pulled, and
 * once it has finished this sheet rises over it from the foot of the
 * screen. It is a fixed sheet with its own scroll rather than a page that
 * grows the document, so the rise is one transform over nothing.
 *
 * The page is one narrow column of writing with pictures out in the
 * margins beside it. The pictures are not in yet: every slot below has an
 * empty `src` and renders as a marked-out frame at the size it will be.
 * To fill one, put the file in /public and its path in `src`, with `alt`
 * describing it; nothing else needs to change. `lift` is how far down the
 * chapter the picture sits, so they do not all line up with each other.
 */
const chapters = [
  {
    text: [
      "I would always ask myself what it was trying to say, what it could bring to people, and why it was worth making.",
      ["Over time, I started to see things a little differently. Meaning is still important to me, but I also believe that making something ", [CYCLE, "beautiful"], " can be meaningful on its own. A clear interface, a smooth interaction, or even a visual that makes someone want to stay for a few more seconds can already create a good experience."]
    ],
    pictures: [
      {
        side: "right",
        src: "/about/1.jpg",
        alt: "A research spread of annotated photographs, cut and written over by hand",
        width: 430,
        tilt: -2.5,
        lift: 0,
        edge: true
      }
    ]
  },
  {
    text: [
      ["I also know that I do not want to focus only on visual design. I really like ", [CIRCLE, "logic"], ", and I enjoy understanding why people hesitate, why they click the wrong thing, or why something feels hard to use even when it looks simple."],
      ["That is why I like ", [UNDERLINE, "user testing"], " so much. I enjoy listening to people, hearing their ", [HAND_D, "stories"], ", and understanding the habits and experiences they bring into a product. For me, design becomes more interesting when I can use those different points of view to make something easier, clearer, and more useful."]
    ],
    pictures: [
      { side: "left", book: true, lift: -14 },
      {
        side: "right",
        lift: 160,
        width: 216,
        stack: [
          { src: "/about/3.png", alt: "A window table looking out over the city" },
          { src: "/about/4.png", alt: "A queue outside a juice shop, two people mid-conversation" },
          { src: "/about/5.png", alt: "Sitting in shallow water at the edge of the sea" }
        ]
      }
    ]
  },
  {
    text: [
      "I have worked on many game-related projects, so people often ask me if I want to become a game designer. The answer is not really.",
      ["I have always seen games more as ", [HL, "a medium"], ". They give me space to bring UI, UX, storytelling, visuals, and logic together in one experience. That is what I like about them. The same is true for websites, digital products, and AI projects. They are all different ways for me to explore how people experience something."]
    ],
    pictures: [
      {
        side: "right",
        src: "/about/7.webp",
        alt: "A screen from one of the games",
        width: 290,
        tilt: -2,
        lift: 0,
        note: "past game work"
      },
      {
        side: "left",
        src: "/about/8.webp",
        alt: "A screen from another game project",
        width: 286,
        tilt: 2.5,
        lift: 96,
        note: "past game work"
      },
      {
        side: "right",
        src: "/about/9.webp",
        alt: "A third game screen",
        width: 280,
        tilt: 3,
        lift: 320,
        note: "past game work"
      }
    ]
  },
  {
    text: [
      "I do not want to be someone who only designs screens. I want to understand how people think, why they act in certain ways, and whether a design is actually helping them.",
      "I care a lot about how things look, but I care just as much about how they work. I like finding the balance between beauty and logic. To me, good design should feel good to look at, but it should also feel natural to use."
    ],
    /* Nothing beside this chapter: it is the one about the two halves of
       the work holding together, and it reads better with the margin
       empty on both sides. */
    pictures: []
  },
  {
    text: [
      ["", [CIRCLE_ROUND, "AI"], " has also changed the way I work. In the past, I could have a clear idea in my head but still be limited by whether I could actually build it."],
      "Now I can move much faster from an idea to something real, interactive, and testable. I can build websites, try different interactions, test product ideas, and turn something that once only existed in Figma into a working experience.",
      ["I do not see AI as something that designs for me. I see it as a tool that helps me bring ", [HL_LONG, "my own ideas"], " to life more fully."],
      ["That is the kind of designer I want to keep becoming: someone who cares about beauty, listens to people, thinks through the logic, and can turn an idea into ", [HAND_B, "a real experience"], "."]
    ],
    /* The tools themselves, dotted down both margins at the paragraph
       that is about them - small, unequal, at unequal heights. */
    /* Trimmed copies of the four icons: the artwork sits inside its
       canvas by a different amount in each file, so cropped to their own
       edges they all come out the same size on the page. */
    pictures: [
      { side: "right", src: "/about/icon-11.webp", alt: "ChatGPT", icon: true, width: 84, lift: -18, out: 9.5 },
      { side: "left", src: "/about/icon-10.webp", alt: "Gemini", icon: true, width: 84, lift: 128, out: 4.5 },
      { side: "right", src: "/about/icon-12.webp", alt: "Claude", icon: true, width: 84, lift: 176, out: 3.5 },
      { side: "left", src: "/about/icon-13.webp", alt: "Cursor", icon: true, width: 84, lift: 262, out: 10 }
    ]
  }
]

/* A marked word is kept on one line: a hand mark stretched across a line
   break would be drawn twice, once at each end. */
function parts(paragraph) {
  if (typeof paragraph === "string") return paragraph

  return paragraph.map((part) => {
    if (typeof part === "string") return part

    /* One word is written in each of the three hands in turn rather than
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
            <img src="/about/book.jpeg" alt="Keigo Higashino, Byakuyako - a novel I keep going back to" loading="lazy" decoding="async" />
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

export default function AboutPage({ track = "uiux" }) {
  const base = trackBase(track)
  /* One resume per track, as in the header. Not imported from there: that
     module is a client component, and a server page cannot call into it. */
  const resume = track === "visual" ? "/resume-visual.pdf" : "/resume.pdf"

  return (
    <main className={`${styles.page} ${sans.variable} ${handA.variable} ${handB.variable} ${handC.variable} ${handD.variable} ${handE.variable}`}>
      {/* The bar sits outside the sheet, so the sheet's scrollbar runs
          below it rather than up the side of it. */}
      <SiteHeader active={`${base}/about`} track={track} />

      <div className={styles.sheet} data-about-sheet="">
        <Reveal />

        <article className={styles.content}>
          <header className={`${styles.opening} ${styles.rise}`}>
            <h1 className={styles.title}>About me</h1>
            <p className={styles.statement}>
              I used to think that the most important thing about a piece of work was whether it
              had meaning.
            </p>
          </header>

          {chapters.map((chapter, index) => (
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
        <RisoFooter />
      </div>
    </main>
  )
}
