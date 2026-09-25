"use client"

import { useEffect, useState } from "react"
import { ScaledIframe } from "../../../components/ScaledIframe"
import styles from "./page.module.css"

const PROTOTYPE_SRC = "/cleared/calendar-assistant-prototype.html?v=20260918-review"

/* The frame around the prototype, not the prototype itself: the page
   inside the iframe is the designed artifact and stays English on every
   locale, the same as the screenshots and recordings around it. */
const copy = {
  en: {
    intro: "Start with Review next. Check the email, choose a time, then try Undo.",
    open: "Open desktop prototype",
    frameTitle: "Google Calendar concept: review, adjust and confirm a scheduling suggestion",
    previewAria: "Open the desktop Calendar prototype in a new tab",
    previewAlt: "Desktop Calendar prototype with scheduling suggestions in the week view",
    captionDesktop: "Interactive desktop prototype · Simulated email and calendar data",
    captionMobile: "Desktop preview · Open on a larger screen to interact with the prototype."
  },
  zh: {
    intro: "先点 Review next，看一眼邮件，选个时间，再试试撤销。",
    open: "打开桌面端原型",
    frameTitle: "Google 日历概念：查看、调整并确认一条排期建议",
    previewAria: "在新标签页打开桌面端日历原型",
    previewAlt: "桌面端日历原型，周视图里带排期建议",
    captionDesktop: "可交互的桌面端原型 · 邮件和日历都是模拟数据",
    captionMobile: "桌面端预览 · 在更大的屏幕上打开才能操作原型。"
  }
}

export function PrototypePreview({ locale = "en" }) {
  const t = copy[locale] || copy.en
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 960px)")
    const update = () => setDesktop(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <figure className={styles.prototypeStage}>
      <div className={styles.prototypeIntro}>
        <div>
          <p>{t.intro}</p>
        </div>
        <a className={styles.outlineAction} href={PROTOTYPE_SRC} target="_blank" rel="noreferrer">{t.open} <span aria-hidden="true">↗</span></a>
      </div>
      {desktop ? (
        <ScaledIframe
          className={styles.prototypeViewport}
          frameClassName={styles.prototypeFrame}
          src={PROTOTYPE_SRC}
          title={t.frameTitle}
          width={1500} height={980} transparent
        />
      ) : (
        <a className={styles.prototypePreview} href={PROTOTYPE_SRC} target="_blank" rel="noreferrer" aria-label={t.previewAria}>
          <img src="/cleared/desktop-preview.png" alt={t.previewAlt} width="1440" height="900" loading="lazy" />
        </a>
      )}
      <figcaption>{desktop ? t.captionDesktop : t.captionMobile}</figcaption>
    </figure>
  )
}
