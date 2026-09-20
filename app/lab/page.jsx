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
      position: { x: "120px", y: "150px", w: "430px", ratio: "1.45" }
    },
    {
      title: "Calendar Assistant",
      label: "AI product prototype",
      year: "2026",
      group: "build",
      href: projectHref("cleared", track),
      image: "/cleared/desktop-preview.png",
      alt: "AI Calendar desktop assistant prototype",
      position: { x: "720px", y: "70px", w: "380px", ratio: "1.42" }
    },
    {
      title: "Budgeting Prototype",
      label: "Coded interaction",
      year: "2026",
      group: "build",
      href: projectHref("boa-budgeting", track),
      image: "/boa/media/reallocate-poster.webp",
      alt: "Interactive budgeting prototype showing a category adjustment",
      position: { x: "1300px", y: "190px", w: "310px", ratio: ".76" }
    },
    {
      title: "Finance Dashboard Rebuild",
      label: "Interface engineering",
      year: "2025",
      group: "build",
      href: projectHref("vortexnet", track),
      image: "/vortexnet/media/shipped-screen.webp",
      alt: "Rebuilt finance dashboard with task-based navigation and work queue",
      position: { x: "260px", y: "810px", w: "560px", ratio: "1.74" }
    },
    {
      title: "Taroo Illustration System",
      label: "Visual system",
      year: "2025",
      group: "visual",
      href: projectHref("taroo", track),
      image: "/covers/taroo.webp",
      alt: "Taroo illustrated tarot cards and gradient card back",
      position: { x: "940px", y: "700px", w: "400px", ratio: "1.28" }
    },
    {
      title: "Material & Image Studies",
      label: "Open-ended making",
      year: "Ongoing",
      group: "visual",
      href: `${base}/interest`,
      image: "/framer-assets/images/3378ae486d7e0ebc48884f3347a8afb515e3b6f5.png",
      alt: "Colorful zine and image-making studies",
      position: { x: "1610px", y: "760px", w: "360px", ratio: "1.36" }
    }
  ]

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={`${base}/lab`} track={track} />

        <LabBoard items={items} />
      </div>
    </main>
  )
}
