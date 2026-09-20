import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"
import { projectHref, trackBase } from "../../lib/projects"

import { LabBoard } from "./LabBoard"
import styles from "./page.module.css"

export const metadata = {
  title: "Lab",
  description:
    "Lele Yang's lab for AI products, coded prototypes, interactive systems, illustration, and visual experiments."
}

export default function LabPage({ track = "uiux" }) {
  const base = trackBase(track)
  const items = [
    {
      title: "Last Message",
      label: "AI narrative system",
      year: "2026",
      group: "build",
      href: projectHref("lastmessage", track),
      image: "/lastmessage/media/chat-poster.webp",
      alt: "Last Message detective game chat interface",
      copy: "A browser-based detective game where AI behavior, evidence design, and branching routes shape what a player can discover.",
      tags: ["AI behavior", "Game logic", "Front-end"],
      accent: "#f3c443",
      position: { x: "72px", y: "92px", w: "470px", ratio: "1.45" }
    },
    {
      title: "Calendar Assistant",
      label: "AI product prototype",
      year: "2026",
      group: "build",
      href: projectHref("cleared", track),
      image: "/cleared/desktop-preview.png",
      alt: "AI Calendar desktop assistant prototype",
      copy: "A working scheduling prototype that makes AI suggestions inspectable, editable, confirmable, and reversible.",
      tags: ["AI UX", "Trust", "Prototype"],
      accent: "#a8d8ff",
      position: { x: "660px", y: "32px", w: "430px", ratio: "1.42" }
    },
    {
      title: "Budgeting Prototype",
      label: "Coded interaction",
      year: "2026",
      group: "build",
      href: projectHref("boa-budgeting", track),
      image: "/boa/media/reallocate-poster.webp",
      alt: "Interactive budgeting prototype showing a category adjustment",
      copy: "A connected banking flow with sample data, editable categories, and explicit one-month versus ongoing decisions.",
      tags: ["Front-end", "Interaction", "State"],
      accent: "#ff8d72",
      position: { x: "1235px", y: "142px", w: "360px", ratio: ".76" }
    },
    {
      title: "Finance Dashboard Rebuild",
      label: "Interface engineering",
      year: "2025",
      group: "build",
      href: projectHref("vortexnet", track),
      image: "/vortexnet/media/shipped-screen.webp",
      alt: "Rebuilt finance dashboard with task-based navigation and work queue",
      copy: "A production-minded dashboard rebuild used to compare hierarchy, navigation, and everyday lookup tasks.",
      tags: ["Data UI", "Responsive", "Testing"],
      accent: "#b9e3c6",
      position: { x: "160px", y: "650px", w: "550px", ratio: "1.74" }
    },
    {
      title: "Taroo Illustration System",
      label: "Visual system",
      year: "2025",
      group: "visual",
      href: projectHref("taroo", track),
      image: "/covers/taroo.webp",
      alt: "Taroo illustrated tarot cards and gradient card back",
      copy: "Twenty-two card illustrations built from one shape grammar, one color logic, and a compact typographic identity.",
      tags: ["Illustration", "Identity", "Print"],
      accent: "#d4b8ff",
      position: { x: "810px", y: "610px", w: "440px", ratio: "1.28" }
    },
    {
      title: "Material & Image Studies",
      label: "Open-ended making",
      year: "Ongoing",
      group: "visual",
      href: `${base}/interest`,
      image: "/framer-assets/images/3378ae486d7e0ebc48884f3347a8afb515e3b6f5.png",
      alt: "Colorful zine and image-making studies",
      copy: "Zines, photographs, watercolor, paper, and layouts made to keep visual instinct active outside product work.",
      tags: ["Image-making", "Editorial", "Material"],
      accent: "#ffb3cf",
      position: { x: "1390px", y: "740px", w: "380px", ratio: "1.36" }
    }
  ]

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={`${base}/lab`} track={track} />

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Experiments / AI, code &amp; image-making</p>
            <h1>Lele&apos;s Lab</h1>
          </div>
          <div className={styles.heroIntro}>
            <p>Ideas get better when I can make them move.</p>
            <p>
              Small AI products, coded prototypes, and visual studies. This is where I turn a question into a working thing, then use what it reveals to make the next version sharper.
            </p>
          </div>
        </header>

        <LabBoard items={items} />

        <section className={styles.principles} aria-labelledby="lab-principles-title">
          <div className={styles.principlesIntro}>
            <p className={styles.eyebrow}>How I use the lab</p>
            <h2 id="lab-principles-title">Not just prompts. Decisions, behavior, and evidence.</h2>
          </div>
          <div className={styles.principleGrid}>
            <article>
              <span>01</span>
              <h3>Build the behavior</h3>
              <p>I use code to test flows, state, edge cases, and feedback—not only to produce a polished screen.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Keep AI legible</h3>
              <p>Sources, uncertainty, confirmation, and recovery stay visible so people can understand and control the system.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Keep a visual voice</h3>
              <p>Illustration and image-making remain part of how I think, prototype, and make digital work feel specific.</p>
            </article>
          </div>
        </section>

        <SiteFooter compact />
      </div>
    </main>
  )
}
