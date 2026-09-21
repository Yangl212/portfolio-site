import { AboutSheet, CIRCLE, CYCLE, HAND_B, HL, HL_LONG, UNDERLINE } from "../../about/AboutSheet"

export const metadata = {
  title: "About",
  description:
    "Lele Yang on color as meaning, building the TAROO tarot brand, Suglar and the Alcohol Directory zine, and what AI changed about visual work.",
  alternates: { canonical: "/about" }
}

/*
 * The visual track's own About - same AboutSheet shell as /about, its own
 * chapters. Where the UI/UX essay starts from the problem and lets beauty
 * in, this one starts from colour and texture and lets the systems
 * thinking in; same two halves, told from the other end, because that is
 * genuinely how a reader on this track meets the work first.
 *
 * Pictures are placeholders, same convention as the other track's page:
 * an empty `src` renders as a marked-out frame at the size it will be.
 */
const chapters = [
  {
    text: [
      "I would spend an hour picking one shade of pink over another, or matching two riso inks that were only ever meant to misalign a little.",
      ["For a long time that felt like a guilty pleasure next to the ", [UNDERLINE, "actual design work"], ". I do not think that any more. Colour and ", [CYCLE, "texture"], " are not decoration on top of an idea - for a tarot deck, a board game, or a zine, they are the idea. If a page or a card does not make someone want to pick it up, nothing else about it gets a chance to work."]
    ],
    pictures: [
      { side: "right", src: "", alt: "", ratio: "4 / 5", lift: 20 }
    ]
  },
  {
    text: [
      "TAROO started as a joke about the people who buy tarot decks for the art rather than the fortune - people like me. Designing all 22 Major Arcana meant building one visual system that could hold a wandering fool, a tired hermit, and a triumphant sun without ever reading like three different decks.",
      ["Packaging came with its own logic: a box has to survive being opened dozens of times, and a deck has to feel different in the ", [CIRCLE, "hand"], " than it looks on a shelf. That is still design work, just measured by touch instead of a task time."]
    ],
    pictures: [
      { side: "left", src: "", alt: "", ratio: "1 / 1", lift: 40 },
      { side: "right", src: "", alt: "", ratio: "3 / 4", lift: 260 }
    ]
  },
  {
    text: [
      ["Suglar asked a stranger question: what does a piece of candy feel like as ", [HL, "a rule"], "? Sour became risk, sweet became safety, and the board ended up looking more like a dessert table than a rulebook."],
      "The Alcohol Directory zine is smaller and slower - one riso spread per drink I actually had in New York, printed the way the drink tasted. A zine has no users in the product sense, but it still has a reader turning a page, which is its own kind of interaction design."
    ],
    pictures: [
      { side: "right", src: "", alt: "", ratio: "4 / 3", lift: 30 },
      { side: "left", src: "", alt: "", ratio: "1 / 1", lift: 220 }
    ]
  },
  {
    text: [
      "None of this means I do not care whether something works. A brand system that only looks good in a mockup is not finished, and a game board nobody wants to touch will never get played.",
      "I just start from the opposite end of the process than a lot of designers do: I want the colour and the shape to earn someone's attention first, and the logic underneath to keep it."
    ],
    /* Nothing beside this chapter either, for the same reason as the other
       track's: it is the bridge back to function, and reads better on
       plain paper. */
    pictures: []
  },
  {
    text: [
      "AI has mostly changed the middle of my process, not the start. An idea for a palette or an illustration still comes from looking at real things - fabric, old packaging, a drink menu - never from a prompt on its own.",
      ["What it is good at is getting me from a sketch to something I can actually print or playtest much faster, so more of the ideas that used to stay in a notebook ", [HL_LONG, "get to exist"], "."],
      ["That is the kind of visual designer I want to keep being: someone who still starts with colour and texture, and lets the slow parts of making something real catch up to ", [HAND_B, "the idea"], " instead of the other way around."]
    ],
    pictures: [
      { side: "right", src: "", alt: "", ratio: "3 / 4", lift: 40 },
      { side: "left", src: "", alt: "", ratio: "1 / 1", lift: 260 }
    ]
  }
]

export default function VisualAboutPage() {
  return (
    <AboutSheet
      track="visual"
      statement={["I used to think a good design had to prove itself before it was allowed to just look good."]}
      chapters={chapters}
    />
  )
}
