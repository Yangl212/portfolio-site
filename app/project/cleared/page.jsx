import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import CaseVideo from "./CaseVideo"
import { PrototypePreview } from "./PrototypePreview"
import styles from "./page.module.css"

const decisions = [
  {
    label: "01 / Context",
    title: "Put the suggestion where the time decision happens.",
    body: "Proposed work appears alongside existing events. A dashed outline separates a suggestion from a confirmed booking, and the assistant layer can be hidden.",
    rationale: "Seeing the surrounding day lets people judge whether a task fits before accepting it. A separate queue would offer more room for triage, but less immediate calendar context.",
    tradeoff: "Suggestions add visual density to the calendar. The layer toggle gives people a way to clear the view.",
    video: "collect",
    alt: "Mobile Calendar demonstration: show and hide the layer of scheduling suggestions"
  },
  {
    label: "02 / Evidence",
    title: "Keep the request one step away.",
    body: "Opening a suggestion reveals the source email and the phrases behind it. Time and duration sit beside that context so the proposal can be checked before it is accepted.",
    rationale: "A compact summary keeps the calendar readable; opening the source gives people the detail needed to check the assistant. Both are part of the same review flow.",
    tradeoff: "Inspecting the source adds a step. It stays available when the wording or recommendation needs a closer look.",
    video: "check",
    alt: "Mobile Calendar demonstration: open a suggestion and inspect the email it came from"
  },
  {
    label: "03 / Control",
    title: "Make confirmation an explicit action.",
    body: "People can adjust time and duration before adding the task. A proposed block becomes a calendar event only after confirmation, with an option to undo the change.",
    rationale: "An incorrect estimate can occupy real working time. Individual review keeps that decision with the person who knows the task and the rest of their day.",
    tradeoff: "Reviewing each item takes more effort than automatic scheduling. Whether that effort feels worthwhile is a question for testing.",
    video: "decide",
    alt: "Mobile Calendar demonstration: review and adjust a proposed time before adding it"
  }
]

const screens = [
  ["phone1.png", "Suggested work stays visually distinct from confirmed events."],
  ["phone2.png", "Open the email context before accepting a suggestion."],
  ["phone3.png", "Adjust the proposed date, start time and duration."],
  ["phone4.png", "See the confirmed event and the option to undo."],
  ["phone5.png", "Review an overlap before committing to the time."],
  ["phone6.png", "If the overlap is kept, the conflict remains visible."]
]

const reviewFindings = [
  {
    title: "Separate the request from the assumption.",
    finding: "The email says “by end of week.” Presenting Friday at 18:00 as an extracted fact gave an inferred deadline more certainty than the source supported.",
    status: "Updated in the desktop prototype",
    response: "The review panel now labels the cutoff as inferred and the two-hour duration as an estimate, with the original email available for comparison."
  },
  {
    title: "Keep recovery within reach.",
    finding: "Confirming an alternative time and immediately undoing it works in the sample flow. The Undo message starts disappearing after 4.2 seconds, leaving a short window for recovery.",
    status: "Proposed next iteration",
    response: "Explore a recovery action in event details or a recent-changes view, so the option remains available after the temporary message disappears."
  },
  {
    title: "Carry uncertainty across devices.",
    finding: "The mobile review sheet shows the source email and a two-hour duration, but it does not yet carry the desktop version’s explicit inferred-deadline and estimate labels.",
    status: "Planned mobile refinement",
    response: "Bring those labels into the bottom sheet. The layouts can differ while keeping the meaning of a source, an estimate and a confirmation consistent."
  }
]

export default function ClearedPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track)} track={track} />
        <div className={styles.content}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span className={styles.pill}>Independent case study</span>
                <span>Product · UI/UX · 2026</span>
              </div>
              <h1>Google Calendar:<br />AI-assisted planning.</h1>
              <p className={styles.heroLead}>
                Turning email commitments into calendar suggestions people can inspect, adjust and confirm.
              </p>
              <dl className={styles.heroFacts}>
                <div><dt>The challenge</dt><dd>Connect a request in an email to a realistic place in the working day.</dd></div>
                <div><dt>My contribution</dt><dd>Product framing, interaction flows, desktop and mobile UI, and an interactive prototype.</dd></div>
                <div><dt>Current status</dt><dd>Independent design concept with simulated data. Not yet user-tested.</dd></div>
              </dl>
              <dl className={styles.meta}>
                <div><dt>Role</dt><dd>Product Designer</dd></div>
                <div><dt>Timeline</dt><dd>8 weeks</dd></div>
                <div><dt>Platform</dt><dd>Gmail + Calendar</dd></div>
              </dl>
              <div className={styles.actions}>
                <a className={styles.action} href="#experience">Explore the design <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href="#prototype">Try the prototype <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <figure className={styles.heroVisual}>
              <CaseVideo
                src="/cleared/media/check-loop.mp4"
                poster="/cleared/media/check-poster.webp"
                width={360} height={704}
                label="Preview: inspect an email-based calendar suggestion"
                priority
              />
            </figure>
          </header>

          <nav className={styles.sectionNav} aria-label="Case study sections">
            <a href="#context">Context</a>
            <a href="#experience">Design choices</a>
            <a href="#trust">AI & trust</a>
            <a href="#prototype">Prototype</a>
            <a href="#validation">Evaluation</a>
          </nav>

          <section id="context" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>The starting point</p>
              <h2>A request is only the beginning of a plan.</h2>
            </div>
            <div className={styles.contextGrid}>
              <div>
                <p className={styles.microLabel}>Target user hypothesis</p>
                <p className={styles.bodyLead}>People coordinating client work through email, with several commitments competing for time.</p>
                <p>This concept asks whether reviewing the request and the calendar together can make those planning decisions easier. The need and the proposed workflow still need validation with users.</p>
              </div>
              <div className={styles.scenario}>
                <p className={styles.microLabel}>Illustrative task</p>
                <blockquote>“Could you send the revised quote by end of week?”</blockquote>
                <p>The request leaves decisions open: how long the work will take, when to do it and what happens if another meeting moves.</p>
              </div>
            </div>
            <div className={styles.baseline}>
              <p><strong>Existing foundation</strong> Google documents event creation and scheduling assistance in Gemini.</p>
              <p><strong>Focus of this concept</strong> Review proposed work in calendar context, keep the email accessible and confirm each change.</p>
            </div>
            <p className={styles.sourceNote}>
              Product references: <a href="https://support.google.com/mail/answer/14355636" target="_blank" rel="noreferrer">Gemini in Gmail</a> and{" "}
              <a href="https://support.google.com/calendar/answer/6084018" target="_blank" rel="noreferrer">events from Gmail</a>. Public documentation informs the product baseline; it does not validate this concept.
            </p>
          </section>

          <section id="experience" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Three design choices</p>
              <h2>Keep context, evidence and control together.</h2>
              <p className={styles.sectionLead}>The mobile walkthroughs show the current design. Each choice has a benefit, a cost and something to learn in testing.</p>
            </div>
            <div className={styles.decisionList}>
              {decisions.map((decision) => (
                <article className={styles.decision} key={decision.video}>
                  <div className={styles.decisionCopy}>
                    <p className={styles.microLabel}>{decision.label}</p>
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                    <dl className={styles.reasoning}>
                      <div><dt>Why this approach</dt><dd>{decision.rationale}</dd></div>
                      <div><dt>The trade-off</dt><dd>{decision.tradeoff}</dd></div>
                    </dl>
                  </div>
                  <CaseVideo
                    className={styles.decisionVideo}
                    src={`/cleared/media/${decision.video}-loop.mp4`}
                    poster={`/cleared/media/${decision.video}-poster.webp`}
                    width={360} height={704}
                    label={decision.alt}
                  />
                </article>
              ))}
            </div>
          </section>

          <section id="trust" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>AI & trust</p>
              <h2>Make the assumption visible.</h2>
              <p className={styles.sectionLead}>A deadline mentioned in an email and an exact time inferred by an assistant carry different certainty. The interface needs to preserve that distinction.</p>
            </div>
            <div className={styles.trustExample}>
              <div><span className={styles.microLabel}>01 / Email wording</span><p>“By end of week”</p><span>The original request remains available.</span></div>
              <div><span className={styles.microLabel}>02 / Assistant assumption</span><p>Friday, 18:00 <small>Inferred</small></p><span>The exact time was not specified in the email.</span></div>
              <div><span className={styles.microLabel}>03 / Review before acting</span><p>Check the deadline</p><span>Verify the assumption before relying on the proposed slot.</span></div>
            </div>
            <p className={styles.sourceNote}>In the desktop prototype, the deadline is labeled as inferred and the duration as an estimate. Bringing the same labels into the mobile review sheet is the next UI refinement.</p>
          </section>

          <section id="prototype" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Across screens</p>
              <h2>Review one task. Keep the wider day in view.</h2>
              <p className={styles.sectionLead}>Both versions follow the same sequence: inspect the request, adjust the proposal, then confirm. The layout changes with the available space.</p>
            </div>
            <div className={styles.deviceGrid}>
              <div><h3>Desktop / Plan in context</h3><p>The week view keeps surrounding commitments visible while a popover holds the suggestion and its source.</p></div>
              <div><h3>Mobile / Focus on one decision</h3><p>A day view and bottom sheet give a single suggestion room to be read and adjusted on a smaller screen.</p></div>
            </div>
            <PrototypePreview />
            <details className={styles.screenDetails}>
              <summary>Inspect the six mobile screens <span>Review, confirm and handle a conflict</span></summary>
              <div className={styles.screensGrid}>
                {screens.map(([file, caption], index) => (
                  <figure key={file}>
                    <a href={`/cleared/${file}`} target="_blank" rel="noreferrer" aria-label={`Open screen ${index + 1} at full size: ${caption}`}>
                      <img src={`/cleared/${file}`} alt={caption} width="834" height="1752" loading="lazy" />
                      <span className={styles.imageLink}>Open full size <span aria-hidden="true">↗</span></span>
                    </a>
                    <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{caption}</figcaption>
                  </figure>
                ))}
              </div>
            </details>
          </section>

          <section id="validation" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Evaluation & iteration</p>
              <h2>What the prototype review revealed.</h2>
              <p className={styles.sectionLead}>An AI-assisted prototype walkthrough and browser interaction checks examined source clarity, confirmation and recovery using simulated data. The findings informed one desktop update and two priorities for the next iteration.</p>
            </div>
            <div className={styles.validationGrid}>
              {reviewFindings.map((item, index) => (
                <article key={item.title}>
                  <p className={styles.microLabel}>Review finding / 0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.finding}</p>
                  <div className={styles.observe}><span>{item.status}</span><p>{item.response}</p></div>
                </article>
              ))}
            </div>
            <div className={styles.nextValidation}>
              <h3>Next: test understanding and recovery with people.</h3>
              <p>Participant usability testing is still pending. The next round should check whether people can distinguish suggestions from confirmed events, identify the assistant’s assumptions and recover from an unwanted change without guidance.</p>
            </div>
            <p className={styles.limitNote}>This review checks the prototype’s behavior and presentation. Live Gmail integration, extraction accuracy and improvements in planning time remain unvalidated.</p>
            <p className={styles.sourceNote}>Independent concept based on public Google Workspace documentation. Not affiliated with Google.</p>
          </section>
          <ProjectNav slug="cleared" track={track} styles={styles} />
        </div>
        <SiteFooter />
      </div>
    </main>
  )
}
