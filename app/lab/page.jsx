import { SiteHeader } from "../../components/SiteHeader"
import { pageBase } from "../../lib/projects"
import { shareCard } from "../../lib/share"

import { LabBoard } from "./LabBoard"
import { labItems } from "./lab-items"
import styles from "./page.module.css"

export const metadata = {
  title: "Lab",
  description: "An open canvas for Lele Yang's photography, visual studies, and experiments.",
  ...shareCard({
    title: "Lab",
    description:
      "An open canvas for Lele Yang's photography, visual studies, and experiments.",
    image: "/og/lab.jpg",
    alt: "Lele Yang's lab"
  })
}

export default function LabPage({ track = "uiux", locale = "en" }) {
  const base = pageBase(track, locale)

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={`${base}/lab`} track={track} locale={locale} />
        <LabBoard items={labItems} />
      </div>
    </main>
  )
}
