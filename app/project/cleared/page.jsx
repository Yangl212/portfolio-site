import fs from "node:fs"
import path from "node:path"
import Image from "next/image"

import { CaseStudyResponsiveLayout } from "../../../components/CaseStudyResponsiveLayout"
import { ProjectBackLink } from "../../../components/ProjectBackLink"
import { SiteHeader } from "../../../components/SiteHeader"
import coverImage from "../../../pic/Cover.png"

import styles from "./intro.module.css"

const fontAssets = [
  ["1K3W8DizY3v4emK8Mb08YHxTbs", "font-1"],
  ["4RAEQdEOrcnDkhHiiCbJOw92Lk", "font-2"],
  ["DpPBYI0sL4fYLgAkX8KXOPVt7c", "font-3"],
  ["GIryZETIX4IFypco5pYZONKhJIo", "font-4"],
  ["syRNPWzAMIrcJ3wIlPIP43KjQs", "font-5"],
  ["tUSCtfYVM1I1IchuyCwz9gDdQ", "font-6"],
  ["VgYFWiwsAC5OYxAycRXXvhze58", "font-7"]
]

let source = fs.readFileSync(path.join(process.cwd(), "app/project/draft/interface-design/source.html"), "utf8")

for (const [remoteName, localName] of fontAssets) {
  source = source.replaceAll(
    `https://framerusercontent.com/assets/${remoteName}.woff2`,
    `/case-study-fonts/${localName}.woff2`
  )
}

source = source.replaceAll("#F0F0F2", "#BCBCBC")
source = source
  .replaceAll("Find a free time", "Check what is free")
  .replaceAll("Switch to Calendar and look for an open slot.", "Switch to Calendar and find a time yourself.")
  .replaceAll("Set the time", "Place and size it")
  .replaceAll("Choose a slot, decide how long it needs, and save it.", "Pick slot, set duration, guess the estimate, save.")
  .replaceAll("Move to the next one", "Return to the pile")
  .replaceAll("Then repeat the same process for the next item.", "Ten more items needing the same five screens.")
  .replace(
    '<div class="framer-chx5vp" data-framer-name="Frame 6">',
    '<div class="framer-chx5vp" data-framer-name="Frame 6"><img class="replacement-flow" src="/cleared/flow.png" alt="Primary end-to-end flow">'
  )

const flowCardClasses = [
  "framer-1eny8xn",
  "framer-1ujyg8t",
  "framer-1hcy903",
  "framer-69apnt",
  "framer-ke8ocz",
  "framer-mz5dql",
  "framer-17v2lrl",
  "framer-k630k5",
  "framer-165lce1"
]
const flowCards = [
  "/cleared/Background+Border.png",
  "/cleared/Background+Border-1.png",
  "/cleared/Background+Border-2.png",
  "/cleared/Background+Border-3.png",
  "/cleared/Background+Border-4.png",
  "/cleared/Background+Border-5.png",
  "/cleared/Background+Border-6.png",
  "/cleared/Background+Border-7.png",
  "/cleared/Background+Border-8.png"
]

for (const [index, className] of flowCardClasses.entries()) {
  source = source.replace(
    `<div class="${className}" data-border="true" data-framer-name="Background+Border">`,
    `<div class="${className}" data-border="true" data-framer-name="Background+Border"><img class="replacement-flow-card" src="${flowCards[index]}" alt="">`
  )
}

const sourceStyles = [...source.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map(([style]) => style).join("")
const body = source.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? ""
const content = body.replace(/<script[\s\S]*?<\/script>/gi, "")

export default function ClearedPage() {
  return (
    <>
      <main className={styles.page}>
        <div className={styles.frame}>
          <div className={styles.headerMask}>
            <SiteHeader active="/" />
          </div>

          <section className={styles.content}>
            <div className={styles.topContent}>
              <ProjectBackLink className={styles.reveal} />
              <header className={`${styles.hero} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
                <h1 className={styles.heroTitle}>Cleared</h1>
              </header>
              <div className={`${styles.imageFull} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
                <Image src={coverImage} alt="Cleared mobile planning app" priority />
              </div>
            </div>
          </section>
        </div>
      </main>

      <section id="case-study-root" className={styles.reveal} style={{ animationDelay: "180ms" }}>
        <div className="case-study-canvas" dangerouslySetInnerHTML={{ __html: `${sourceStyles}${content}` }} />
        <style>{`
        #case-study-root {
          --case-study-scale: 1;
          background: #e4e2e2;
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        #case-study-root #main,
        #case-study-root #appended-interface-design-section > div {
          background: #e4e2e2 !important;
          min-width: 1440px;
          transform: scale(var(--case-study-scale)) !important;
          transform-origin: left top !important;
          width: 1440px;
        }

        #case-study-root .framer-RHJLV.framer-72rtr7,
        #case-study-root .framer-RHJLV .framer-flw5j3,
        #case-study-root .framer-RHJLV .framer-m8u2lr {
          background-color: #e4e2e2 !important;
        }

        /* Framer's runtime normally draws these flow connectors. */
        #case-study-root .framer-q1y7ah,
        #case-study-root .framer-co5e9z,
        #case-study-root .framer-156nqid,
        #case-study-root .framer-rofpe9 {
          background: #c7c7cc !important;
          height: 1px !important;
          position: relative;
        }

        #case-study-root .framer-q1y7ah::after,
        #case-study-root .framer-co5e9z::after,
        #case-study-root .framer-156nqid::after,
        #case-study-root .framer-rofpe9::after {
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

        #case-study-root .framer-1u5hmsb,
        #case-study-root .framer-1j7scr4,
        #case-study-root .framer-wyztb0,
        #case-study-root .framer-pgwzea,
        #case-study-root .framer-1adsw37,
        #case-study-root .framer-1vijtxv,
        #case-study-root .framer-wai3zg,
        #case-study-root .framer-lx39mu {
          display: none !important;
        }

        #case-study-root .framer-1xqmebp,
        #case-study-root .framer-1edftdr,
        #case-study-root .framer-1eo6173 {
          --border-color: #a6a6ad !important;
        }

        #case-study-root [data-border="true"] {
          --border-color: #a6a6ad !important;
        }

        #case-study-root .framer-ifiwex > [data-border="true"],
        #case-study-root .framer-1p21enu > [data-border="true"] {
          --border-color: #a6a6ad !important;
        }

        #case-study-root .framer-jieyom,
        #case-study-root .framer-wsgggg,
        #case-study-root .framer-wsgggg [data-framer-name="HorizontalBorder"] {
          --border-color: #a6a6ad !important;
        }

        #case-study-root .framer-2rlox9 > [data-border="true"] {
          --border-color: #a6a6ad !important;
        }

        #case-study-root .framer-jndqau,
        #case-study-root .framer-1oxpdo6 {
          --border-color: #a6a6ad !important;
        }

        #case-study-root .framer-1cad1ew [data-border="true"] {
          --border-color: #a6a6ad !important;
        }

        #case-study-root .framer-1eytybq,
        #case-study-root .framer-bkfbbk,
        #case-study-root .framer-uh37tr,
        #case-study-root .framer-1ac87dx {
          background: #c7c7cc !important;
          height: 1px !important;
          position: relative;
        }

        #case-study-root .framer-1eytybq::after,
        #case-study-root .framer-bkfbbk::after,
        #case-study-root .framer-uh37tr::after,
        #case-study-root .framer-1ac87dx::after {
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

        #case-study-root .framer-chx5vp > :not(.replacement-flow) {
          display: none !important;
        }

        #case-study-root .replacement-flow {
          display: block;
          height: 100%;
          object-fit: contain;
          width: 100%;
        }

        #case-study-root [data-framer-name="Background+Border"] {
          overflow: hidden !important;
        }

        #case-study-root [data-framer-name="Background+Border"] > :not(.replacement-flow-card) {
          display: none !important;
        }

        #case-study-root .replacement-flow-card {
          display: block;
          height: 100%;
          object-fit: fill;
          width: 100%;
        }

        @media (min-width: 1440px) {
          #case-study-root {
            align-items: flex-start;
            display: flex;
            justify-content: center;
          }

          #case-study-root .case-study-canvas {
            flex: 0 0 1440px;
            width: 1440px;
          }
        }

        @media (min-width: 810px) and (max-width: 1439px) {
          #case-study-root .case-study-canvas {
            width: 1440px;
          }
        }

        @media (max-width: 809px) {
          #case-study-root {
            min-width: 0;
          }

          #case-study-root .case-study-canvas {
            width: 1440px;
          }
        }
      `}</style>
      <CaseStudyResponsiveLayout />
      </section>
    </>
  )
}
