import { SiteHeader } from "../../components/SiteHeader"
import { pageBase } from "../../lib/projects"

import { LabBoard } from "./LabBoard"
import { labItems } from "./lab-items"
import styles from "./page.module.css"

export const metadata = {
  title: "Lab",
  description: "An open canvas for Lele Yang's photography, visual studies, and experiments."
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
