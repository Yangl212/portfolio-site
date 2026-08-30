import fs from "node:fs"
import path from "node:path"

/*
 * The case study visuals are a Framer export. Rather than injecting the whole
 * 1440px page and scaling it as one canvas, the export is sliced into named
 * blocks so the page can order them, drop the repeated ones, and wrap each in a
 * native section header. Every block keeps its original Framer markup; only the
 * narrative around it is written here.
 */

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"
])

// Framer emits well-formed markup, so a tag scanner is enough - no DOM needed.
function parseNodes(html) {
  const tokens = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g
  const stack = []
  const roots = []
  let token

  while ((token = tokens.exec(html))) {
    if (token[0].startsWith("<!--")) continue

    if (token[1]) {
      const tag = token[1].toLowerCase()
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].tag !== tag) continue
        const node = stack[i]
        node.end = tokens.lastIndex
        stack.length = i
        ;(stack.length ? stack[stack.length - 1].children : roots).push(node)
        break
      }
      continue
    }

    const tag = token[2].toLowerCase()
    const node = { tag, attrs: token[3] || "", start: token.index, end: tokens.lastIndex, children: [] }

    if (VOID_TAGS.has(tag) || token[4] === "/") {
      ;(stack.length ? stack[stack.length - 1].children : roots).push(node)
    } else {
      stack.push(node)
    }
  }

  while (stack.length) {
    const node = stack.pop()
    node.end = html.length
    ;(stack.length ? stack[stack.length - 1].children : roots).push(node)
  }

  return roots
}

const fontAssets = [
  ["1K3W8DizY3v4emK8Mb08YHxTbs", "font-1"],
  ["4RAEQdEOrcnDkhHiiCbJOw92Lk", "font-2"],
  ["DpPBYI0sL4fYLgAkX8KXOPVt7c", "font-3"],
  ["GIryZETIX4IFypco5pYZONKhJIo", "font-4"],
  ["syRNPWzAMIrcJ3wIlPIP43KjQs", "font-5"],
  ["tUSCtfYVM1I1IchuyCwz9gDdQ", "font-6"],
  ["VgYFWiwsAC5OYxAycRXXvhze58", "font-7"]
]

// Phone mockups that Framer drew with its runtime are replaced by flat exports.
const flowCardScreens = [
  ["framer-1eny8xn", "/cleared/Background+Border.png"],
  ["framer-1ujyg8t", "/cleared/Background+Border-1.png"],
  ["framer-1hcy903", "/cleared/Background+Border-2.png"],
  ["framer-69apnt", "/cleared/Background+Border-3.png"],
  ["framer-ke8ocz", "/cleared/Background+Border-4.png"],
  ["framer-mz5dql", "/cleared/Background+Border-5.png"],
  ["framer-17v2lrl", "/cleared/Background+Border-6.png"],
  ["framer-k630k5", "/cleared/Background+Border-7.png"],
  ["framer-165lce1", "/cleared/Background+Border-8.png"]
]

let source = fs.readFileSync(path.join(process.cwd(), "app/project/draft/interface-design/source.html"), "utf8")

for (const [remoteName, localName] of fontAssets) {
  source = source.replaceAll(
    `https://framerusercontent.com/assets/${remoteName}.woff2`,
    `/case-study-fonts/${localName}.woff2`
  )
}

// Copy patches that sharpen the "what it costs today" walkthrough.
source = source
  .replaceAll("Find a free time", "Check what is free")
  .replaceAll("Switch to Calendar and look for an open slot.", "Switch to Calendar and find a time yourself.")
  .replaceAll("Set the time", "Place and size it")
  .replaceAll("Choose a slot, decide how long it needs, and save it.", "Pick slot, set duration, guess the estimate, save.")
  .replaceAll("Move to the next one", "Return to the pile")
  .replaceAll("Then repeat the same process for the next item.", "Ten more items needing the same five screens.")
  // The comparison table pointed at a section that no longer follows it.
  .replaceAll(">See below</span>", ">Only inside one thread, and the time is still found by hand.</span>")
  // The product panel still carried a working title.
  .replaceAll(">Personal </span>", ">Cleared</span>")
  .replaceAll(">Assistant App</span>", ">for Gmail</span>")

for (const [className, screen] of flowCardScreens) {
  source = source.replace(
    `<div class="${className}" data-border="true" data-framer-name="Background+Border">`,
    `<div class="${className}" data-border="true" data-framer-name="Background+Border"><img class="framer-flow-screen" src="${screen}" alt="">`
  )
}

const styleBlocks = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(([, css]) => css)

// The export ships page-level resets. Scoped markup is fine; these are not.
/*
 * A few elements were drawn by the Framer runtime rather than by CSS: the flow
 * connectors and their arrowheads, and the phone frames that now carry flat
 * screenshots. The scripts are stripped, so those are rebuilt here.
 */
const runtimeFallbackStyles = `
.framer-RHJLV .framer-q1y7ah,
.framer-RHJLV .framer-co5e9z,
.framer-RHJLV .framer-156nqid,
.framer-RHJLV .framer-rofpe9,
.framer-RHJLV .framer-1eytybq,
.framer-RHJLV .framer-bkfbbk,
.framer-RHJLV .framer-uh37tr,
.framer-RHJLV .framer-1ac87dx {
  background: #c7c7cc !important;
  height: 1px !important;
  position: relative;
}

.framer-RHJLV .framer-q1y7ah::after,
.framer-RHJLV .framer-co5e9z::after,
.framer-RHJLV .framer-156nqid::after,
.framer-RHJLV .framer-rofpe9::after,
.framer-RHJLV .framer-1eytybq::after,
.framer-RHJLV .framer-bkfbbk::after,
.framer-RHJLV .framer-uh37tr::after,
.framer-RHJLV .framer-1ac87dx::after {
  border-right: 1px solid #8e8e96;
  border-top: 1px solid #8e8e96;
  content: "";
  height: 7px;
  position: absolute;
  right: 0;
  top: -3px;
  transform: rotate(45deg);
  width: 7px;
}

.framer-RHJLV .framer-1u5hmsb,
.framer-RHJLV .framer-1j7scr4,
.framer-RHJLV .framer-wyztb0,
.framer-RHJLV .framer-pgwzea,
.framer-RHJLV .framer-1adsw37,
.framer-RHJLV .framer-1vijtxv,
.framer-RHJLV .framer-wai3zg,
.framer-RHJLV .framer-lx39mu {
  display: none !important;
}

/* The frames these screenshots replace painted a white card, a border and 14px
   of padding. The exports already carry their own background and rounded
   corners, so strip all three - the padding was also squashing them out of
   their 316x528 aspect. */
.framer-RHJLV [data-framer-name="Background+Border"] {
  --border-bottom-width: 0px;
  --border-left-width: 0px;
  --border-right-width: 0px;
  --border-top-width: 0px;
  background-color: transparent !important;
  overflow: hidden !important;
  padding: 0 !important;
}

/* The one exception: this frame's dashed edge marks the step that has no
   interface at all. That is meaning rather than a backdrop, so it stays. */
.framer-RHJLV .framer-mz5dql {
  --border-bottom-width: 1px;
  --border-left-width: 1px;
  --border-right-width: 1px;
  --border-top-width: 1px;
}

.framer-RHJLV [data-framer-name="Background+Border"] > :not(.framer-flow-screen) {
  display: none !important;
}

.framer-RHJLV .framer-flow-screen {
  display: block;
  height: 100%;
  object-fit: contain;
  width: 100%;
}
`

const caseStudyStyles = styleBlocks
  .join("")
  .replace(/html\s*,\s*body\s*,\s*#main\{[^}]*\}/g, "")
  .replace(/body\s*,\s*input\s*,\s*textarea\s*,\s*select\s*,\s*button\{[^}]*\}/g, "")
  .replace(/html\s+body\s*\{[^}]*\}/g, "")
  .replace(/\*\{[^}]*\}/g, "")
  .replace(/h1,h2,h3,h4,h5,h6,p,figure\{[^}]*\}/g, "")
  .replace(/#__framer-badge-container\{[^}]*\}/g, "") + runtimeFallbackStyles

const body = source.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? ""
const roots = parseNodes(body)
const html = (node) => body.slice(node.start, node.end)

const main = roots.find((node) => /id="main"/.test(node.attrs))
const appended = roots.find((node) => /id="appended-interface-design-section"/.test(node.attrs))

// #main > style, wrapper > [Product Thinking, User Experience & Interaction]
const [productThinking, experience] = main.children[1].children
const productSections = productThinking.children[0].children[1].children
const experienceSections = experience.children[0].children[1].children

const [problemSection, researchSection, gapSection, solutionSection, decisionsSection] = productSections
const [iaSection, screenSection, journeySection, riskSection] = experienceSections
const [currentFlow, redesignedFlow] = screenSection.children[1].children

// Chapter three is hand-authored HTML. Its wrapper carries the type styles, so
// keep those and drop the fixed page width (the figure wrapper sets that) plus
// the white slab it painted behind the blocks.
const interfaceWrapper = appended.children[0]
const interfaceStyle = (/style="([^"]*)"/.exec(interfaceWrapper.attrs)?.[1] ?? "")
  .replace(/(^|;)\s*(width|margin|background)\s*:[^;]*/g, "")
const withInterfaceType = (markup) => `<div style="${interfaceStyle}">${markup}</div>`

/*
 * With the slab removed, the spec sheet sits straight on the page's grey. Two
 * things were tuned for a white canvas and stop reading there: its own hairline
 * rules, and the swatch for the lightest color in the palette. The rules get
 * darker; the swatch keeps its true value and gains an outline instead, since
 * the whole point of that square is to show the color it actually is.
 */
const liftSpecSheetContrast = (markup) =>
  markup
    .replaceAll("1px solid #E4E4E7", "1px solid #C7C7CC")
    .replaceAll("background: #E4E4E7;", "background: #E4E4E7; box-shadow: inset 0 0 0 1px #C7C7CC;")
const [designSystemBlock, screensBlock] = interfaceWrapper.children[0].children[1].children

// The six screens are a grid of cells, each one a 393px phone plus its caption.
// The phones alone are reused as the design highlight visuals.
const screensGrid = screensBlock.children[1]
const screenPhones = screensGrid.children.map((cell) => withInterfaceType(html(cell.children[0])))

export const clearedStyles = caseStudyStyles

export const clearedBlocks = {
  // Only the four source cards; the lead paragraph is written natively.
  scatteredInputs: html(problemSection.children[1].children[1]),
  onePlanningSession: html(problemSection.children[2]),

  researchStats: html(researchSection.children[1]),
  researchTakeaway: html(researchSection.children[2]),
  competitorTable: html(researchSection.children[3]),

  geminiGap: html(gapSection.children[1]),
  currentFlow: html(currentFlow),

  solutionModel: html(solutionSection.children[1]),
  informationArchitecture: html(iaSection.children[1]),
  explainRules: html(journeySection.children[2].children[2]),

  cardAnatomy: html(journeySection.children[2].children[0]),
  flowPrinciples: html(journeySection.children[2].children[1]),
  redesignedFlow: html(redesignedFlow),

  dayJourney: html(journeySection.children[1]),
  sixScreens: withInterfaceType(html(screensGrid)),

  queueScreen: screenPhones[5],
  cardScreen: screenPhones[1],
  confirmScreen: screenPhones[4],

  designSystem: withInterfaceType(liftSpecSheetContrast(html(designSystemBlock.children[1]))),

  tradeOffs: html(decisionsSection.children[3]),
  risks: html(riskSection.children[1])
}
