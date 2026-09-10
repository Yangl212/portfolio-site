import { AutoplayVideo } from "../../../components/AutoplayVideo"
import { ProjectHero } from "../../../components/ProjectHero"
import { ScaledIframe } from "../../../components/ScaledIframe"
import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"

import styles from "./page.module.css"

const PROTOTYPE_SRC = "/cleared/calendar-assistant-prototype.html"

const designHighlights = [
  {
    label: "01 / Collect",
    title: "Review email suggestions inside Calendar",
    body: "Cleared adds a suggestion layer to Google Calendar. It reads dates, deadlines and requests from Gmail, then shows proposed time blocks in the existing week view.",
    video: "/cleared/1.mp4",
    width: 2304,
    height: 1440,
    alt: "Calendar view showing suggested time blocks that can be hidden with the assistant toggle"
  },
  {
    label: "02 / Check",
    title: "Keep the Gmail context attached",
    body: "Each card includes the source email, extracted details and the reason for the proposed slot. Users can check the suggestion without reconstructing the thread.",
    video: "/cleared/2.mp4",
    width: 1152,
    height: 720,
    alt: "A scheduling suggestion linked to its source email and the phrases used to create it"
  },
  {
    label: "03 / Decide",
    title: "Confirm every Calendar change",
    body: "Time and duration stay editable. Nothing is added to Google Calendar until the user confirms it, and every change can be undone.",
    video: "/cleared/3.mp4",
    width: 1152,
    height: 720,
    alt: "A user adjusts a suggested duration and time before adding it to the calendar"
  }
]

const guardrails = [
  {
    label: "From Gmail",
    title: "Treat explicit details as facts",
    body: "Dates, deadlines, attendees and locations remain tied to the sentence they came from."
  },
  {
    label: "From the assistant",
    title: "Label estimates as suggestions",
    body: "Duration and placement are proposals. They stay visible, editable and separate from confirmed events."
  },
  {
    label: "Before Calendar",
    title: "Require user confirmation",
    body: "Add, adjust or skip. Missing information triggers a question instead of an automatic change."
  }
]

export default function ClearedPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track)} track={track} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Independent Product Extension"
              discipline="Product Design · 2026"
              title="Cleared"
              image="/cleared/mockup.png"
              imageAlt="Cleared assistant interface shown across Gmail and Google Calendar mockups"
              summary="Cleared is an AI scheduling assistant inside Gmail and Google Calendar, turning email commitments into editable time suggestions."
              problem="Google can create events from individual emails, but reviewing multiple commitments against a full week still takes manual work."
              contribution="Extended familiar Gmail and Calendar patterns with a shared suggestion queue, review flow and interactive prototype."
              outcome="A review-first assistant that keeps inbox triage and weekly planning inside Google Workspace."
              role="Product Designer"
              scope="Product Strategy · UX · UI · Prototyping"
              platform="Gmail + Google Calendar"
              timeline="8 weeks"
            />
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Product Positioning</p>
                <div>
                  <h2 className={styles.sectionTitle}>An extension of Gmail and Calendar—not another planning app.</h2>
                  <p className={styles.sectionLead}>
                    Cleared sits inside both products. In Gmail, it identifies commitments and keeps the source context;
                    in Calendar, it checks availability and proposes where each item could fit. Nothing is added until
                    the user reviews it.
                  </p>
                </div>
              </div>

              <div className={styles.baseline}>
                <p>
                  <span>Existing foundation</span>
                  Gemini can extract event details, find availability and create Calendar events.
                </p>
                <p>
                  <span>Cleared extension</span>
                  One shared queue for reviewing suggestions from multiple emails against the week.
                </p>
              </div>

              <p className={styles.sourceNote}>
                Product baseline verified with Google&rsquo;s official documentation:{" "}
                <a href="https://support.google.com/mail/answer/14355636" target="_blank" rel="noreferrer">
                  Gemini in Gmail
                </a>{" "}
                and{" "}
                <a href="https://support.google.com/calendar/answer/6084018" target="_blank" rel="noreferrer">
                  events from Gmail
                </a>
                .
              </p>
            </section>

            <section className={`${styles.caseSection} ${styles.highlightsSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Core Experience</p>
                <div>
                  <h2 className={styles.sectionTitle}>Collect, check, decide.</h2>
                  <p className={styles.sectionLead}>
                    Cleared connects two familiar workflows: collect the context in Gmail, review the fit in Calendar,
                    then confirm—without adding another planning app.
                  </p>
                </div>
              </div>

              <div className={styles.highlightList}>
                {designHighlights.map((highlight) => (
                  <article className={styles.highlightCard} key={highlight.label}>
                    <div className={styles.highlightCopy}>
                      <p className={styles.microLabel}>{highlight.label}</p>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.body}</p>
                    </div>
                    <div className={styles.highlightVisual}>
                      <AutoplayVideo
                        className={styles.highlightVideo}
                        src={highlight.video}
                        width={highlight.width}
                        height={highlight.height}
                        ariaLabel={highlight.alt}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Interactive Prototype</p>
                <div>
                  <h2 className={styles.sectionTitle}>Try Cleared inside Calendar.</h2>
                  <p className={styles.sectionLead}>
                    Open an email-based suggestion, inspect its Gmail source, adjust the time and add it to the week.
                  </p>
                </div>
              </div>

              <figure className={styles.prototypeStage}>
                <ScaledIframe
                  className={styles.prototypeViewport}
                  frameClassName={styles.prototypeFrame}
                  src={PROTOTYPE_SRC}
                  title="Interactive prototype of Cleared extending Google Calendar with Gmail-based suggestions"
                  width={1500}
                  height={980}
                  transparent
                />
                <figcaption>Interactive prototype · Desktop 1440 × 900</figcaption>
              </figure>
            </section>

            <section className={`${styles.caseSection} ${styles.guardrailSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Trust Model</p>
                <div>
                  <h2 className={styles.sectionTitle}>Show what came from where.</h2>
                  <p className={styles.sectionLead}>
                    Cleared makes clear which details came from Gmail, which ones the assistant estimated and what will
                    change in Google Calendar.
                  </p>
                </div>
              </div>

              <div className={styles.guardrailGrid}>
                {guardrails.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>

              <p className={styles.limitNote}>
                This independent extension concept is based on public Google Workspace documentation and is not
                affiliated with Google. It has not been user-tested; extraction accuracy, duration estimates and
                confirmation speed are the next areas to validate.
              </p>
            </section>

            <ProjectNav slug="cleared" track={track} styles={styles} />
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
