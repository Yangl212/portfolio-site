import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import CaseVideo from "./CaseVideo"
import { PrototypePreview } from "./PrototypePreview"
import { SuggestionCard } from "./SuggestionCard"
import styles from "./page.module.css"

export const metadata = {
  title: "AI Calendar",
  description:
    "An AI-assisted Calendar concept tested with simulated data. Participants understood the scheduling actions, while four returned to the source email to verify the AI's interpretation."
}

const prototypeUrl = "/cleared/calendar-assistant-prototype.html?v=20260918-review"

const decisions = [
  {
    label: "01 / Context",
    title: "Compare the change before moving the task.",
    body: "I kept the conflict and proposed time in the week view so people can judge the change against the rest of their day.",
    tradeoff: "More calendar context adds visual density. The notice focuses on the affected task.",
    video: "desktop-replan",
    alt: "Desktop Calendar: review a meeting conflict and confirm moving the quote work to 16:00"
  },
  {
    label: "02 / Evidence",
    title: "Keep the email beside the suggestion.",
    body: "I put the source email beside time and duration so people can check the recommendation without leaving the calendar.",
    tradeoff: "Opening the full email adds a step, so the key request is shown first.",
    video: "desktop-source",
    alt: "Desktop Calendar: open a quote suggestion and inspect the original email"
  },
  {
    label: "03 / Control",
    title: "Let people choose the final time.",
    body: "I kept scheduling under individual review. Choosing an alternative slot adds the event, updates the pending count and exposes Undo.",
    tradeoff: "Choosing a slot currently confirms it immediately. A separate preview and confirmation is the next variant to test.",
    video: "desktop-confirm",
    alt: "Desktop Calendar: choose an alternative time, confirm the event and see the Undo action"
  }
]

const additionalDemos = [
  {
    video: "desktop-duration",
    title: "Ask for the missing duration.",
    body: "Choose a duration, preview the block and confirm it in the calendar.",
    alt: "Choose a half-day duration for Draft the Q3 outline and add the task to the desktop calendar"
  },
  {
    video: "desktop-preferences",
    title: "Review a preference before saving it.",
    body: "Confirm a morning scheduling preference before it becomes a rule. History and percentages use sample data.",
    alt: "Confirm a morning scheduling preference in the desktop assistant settings"
  },
  {
    video: "desktop-direct",
    title: "Keep direct calendar editing available.",
    body: "Drag an existing meeting; its time updates and Undo appears.",
    alt: "Drag an existing meeting in the desktop week view and see the updated time"
  }
]

const mobileScreens = [
  ["phone1.png", "Distinguish suggestions from bookings."],
  ["phone2.png", "Check the source email."],
  ["phone3.png", "Adjust time and duration."],
  ["phone4.png", "Confirm, with Undo available."],
  ["phone5.png", "Review a scheduling conflict."],
  ["phone6.png", "Keep unresolved conflicts visible."]
]

const reviewFindings = [
  {
    title: "Actions and states were clear",
    status: "Observed in usability testing",
    response: "Participants understood how to add a suggestion to the calendar and could distinguish pending suggestions from confirmed events."
  },
  {
    title: "Source verification remained necessary",
    status: "Observed behavior",
    response: "Four participants returned to the source email to read it carefully and check whether the AI had understood the request correctly."
  },
  {
    title: "Make the evidence easier to inspect",
    status: "Next iteration",
    response: "The next iteration will make the existing source evidence easier to inspect, give inferred deadlines and estimated durations clearer labels, and keep editing and email access close to the suggestion. These refinements still need to be tested."
  }
]

function DesktopDemo({ name, label, priority = false, className }) {
  return <CaseVideo className={className}
    src={`/cleared/media/${name}-loop.mp4`}
    poster={`/cleared/media/${name}-poster.webp`}
    width={1468} height={918} label={label} priority={priority} />
}

export default function ClearedPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track)} track={track} />
        <div className={styles.content}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>
                <span className={styles.pill}>Independent case study</span>
                <span>Product · UI/UX · 2026</span>
              </div>
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>Google Calendar:<br />AI-assisted planning.</h1>
              <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
                Turning email commitments into calendar suggestions people can inspect, adjust and confirm.
              </p>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>The challenge</dt><dd>Fit email commitments around a changing workday.</dd></div>
                <div><dt>My contribution</dt><dd>Product framing, desktop + mobile UI, and interactive prototyping.</dd></div>
                <div><dt>Status</dt><dd>Concept · Usability tested · Simulated data</dd></div>
                <div><dt>Result</dt><dd>Participants understood the scheduling action; four returned to the source email to verify the AI&apos;s interpretation.</dd></div>
              </dl>
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>Role</dt><dd>Product Designer</dd></div>
                <div><dt>Timeline</dt><dd>8 weeks</dd></div>
                <div><dt>Platform</dt><dd>Desktop + mobile</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <a className={styles.action} href="#experience">Explore the design <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href={prototypeUrl} target="_blank" rel="noreferrer">Open desktop prototype <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            {/* The hero is the product's own suggestion card rather than a
                recording of it: the three moves the case study is about can
                be made right here. */}
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <SuggestionCard caption="The prototype’s suggestion card, on sample data. See what the assistant read, add the block, undo it." />
            </div>
          </header>

          <nav className={styles.sectionNav} aria-label="Case study sections">
            <a href="#context">Context</a>
            <a href="#experience">Design choices</a>
            <a href="#trust">AI & trust</a>
            <a href="#mobile-ui">Mobile UI</a>
            <a href="#prototype">Prototype</a>
            <a href="#validation">Evaluation</a>
          </nav>

          <section id="context" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>01 / The starting point</p>
              <h2>An email gives a deadline, not a plan.</h2>
            </div>
            <div className={styles.contextGrid}>
              <div>
                <p className={styles.microLabel}>Target user hypothesis</p>
                <p className={styles.bodyLead}>People coordinating client work through email and a busy calendar.</p>
                <p>I explored a review step between an email request and a calendar booking, where people can check the source, estimate effort and choose a time.</p>
              </div>
              <div className={styles.scenario}>
                <p className={styles.microLabel}>Illustrative task</p>
                <blockquote>“Could you send the revised quote by end of week?”</blockquote>
                <p>How much time does it need, and where will it fit?</p>
              </div>
            </div>
            <p className={styles.sourceNote}>
              Product references: <a href="https://support.google.com/mail/answer/14355636" target="_blank" rel="noreferrer">Gemini in Gmail</a> and{" "}
              <a href="https://support.google.com/calendar/answer/6084018" target="_blank" rel="noreferrer">events from Gmail</a>.
            </p>
          </section>

          <section id="experience" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>02 / Three design choices</p>
              <h2>Keep context, evidence and control together.</h2>
            </div>
            <div className={styles.decisionList}>
              {decisions.map((decision) => (
                <article className={styles.decision} key={decision.video}>
                  <div className={styles.decisionCopy}>
                    <div className={styles.decisionSummary}>
                      <p className={styles.microLabel}>{decision.label}</p>
                      <h3>{decision.title}</h3>
                      <p>{decision.body}</p>
                    </div>
                    <dl className={styles.reasoning}>
                      <div><dt>The trade-off</dt><dd>{decision.tradeoff}</dd></div>
                    </dl>
                  </div>
                  <DesktopDemo
                    className={styles.decisionVideo}
                    name={decision.video}
                    label={decision.alt}
                  />
                </article>
              ))}
            </div>
          </section>

          <section id="trust" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>03 / AI & trust</p>
              <h2>Make the assumption visible.</h2>
              <p className={styles.sectionLead}>I changed the deadline label after finding that an inferred time looked like a fact from the email.</p>
            </div>
            <div className={styles.trustExample}>
              <div><span className={styles.microLabel}>Email request</span><p>“By end of week”</p><span>No exact time specified.</span></div>
              <div><span className={styles.microLabel}>Earlier label</span><p>Friday, 18:00</p><span>Presented as extracted from the email.</span></div>
              <div><span className={styles.microLabel}>Revised desktop label</span><p>Friday, 18:00 <small>Inferred</small></p><span>An assumption to check with the sender.</span></div>
            </div>
            <p className={styles.sourceNote}>Recordings and mobile screens show the earlier wording; the <a href={prototypeUrl} target="_blank" rel="noreferrer">desktop prototype</a> includes the revised labels.</p>
          </section>

          <section id="mobile-ui" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>04 / Mobile high fidelity</p>
              <h2>Focus on one scheduling decision at a time.</h2>
              <p className={styles.sectionLead}>I adapted the desktop week view into a day view and bottom sheet, keeping the current task and surrounding events together.</p>
            </div>
            <details className={styles.screenDetails} open>
              <summary>Six mobile screens</summary>
              <div className={styles.screensGrid}>
                {mobileScreens.map(([file, caption], index) => (
                  <figure key={file}>
                    <a href={`/cleared/${file}`} target="_blank" rel="noreferrer" aria-label={`Open mobile screen ${index + 1} at full size: ${caption}`}>
                      <img src={`/cleared/${file}`} alt={caption} width="834" height="1752" loading="lazy" />
                      <span className={styles.imageLink}>Open full size <span aria-hidden="true">↗</span></span>
                    </a>
                    <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{caption}</figcaption>
                  </figure>
                ))}
              </div>
            </details>
          </section>

          <section id="prototype" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>05 / Interactive prototype</p>
              <h2>Try a planning decision.</h2>
            </div>
            <PrototypePreview />
            <details id="more-interactions" className={styles.moreDetails}>
              <summary>Explore three more desktop interactions</summary>
              <div className={styles.additionalDemos}>
                {additionalDemos.map((demo, index) => (
                  <article key={demo.video} className={styles.additionalDemo}>
                    <div className={styles.additionalCopy}>
                      <p className={styles.microLabel}>Interaction / {String(index + 1).padStart(2, "0")}</p>
                      <h3>{demo.title}</h3>
                      <p>{demo.body}</p>
                    </div>
                    <DesktopDemo name={demo.video} label={demo.alt} />
                  </article>
                ))}
              </div>
            </details>
          </section>

          <section id="validation" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>06 / Evaluation & iteration</p>
              <h2>Clear actions, with a need to verify the AI&apos;s interpretation.</h2>
              <p className={styles.sectionLead}>Understanding the scheduling action did not automatically create confidence in the AI&apos;s interpretation.</p>
            </div>
            <div className={styles.participants}>
              <p className={styles.microLabel}>Participants</p>
              <p>I invited students and working professionals who frequently used calendar and task-planning apps. Participants had an established habit of recording events and planning daily tasks, with experience across Google Calendar and other planning tools.</p>
            </div>
            <div className={styles.validationGrid}>
              {reviewFindings.map((item) => (
                <article key={item.title}>
                  <p className={styles.microLabel}>{item.status}</p>
                  <h3>{item.title}</h3>
                  <p>{item.response}</p>
                </article>
              ))}
            </div>
            <p className={styles.limitNote}>I interpreted the return to the source email as a need for more visible evidence before relying on the recommendation. The goal is to help people verify the recommendation when needed, not to eliminate source checking.</p>
            <p className={styles.limitNote}>The prototype uses simulated data and is not connected to live email or calendars. This usability test did not validate backend AI accuracy or real-world time savings.</p>
            <p className={styles.sourceNote}>Independent concept based on public Google Workspace documentation. Not affiliated with Google.</p>
          </section>
          <ProjectNav slug="cleared" track={track} styles={styles} />
        </div>
        <SiteFooter />
      </div>
    </main>
  )
}
