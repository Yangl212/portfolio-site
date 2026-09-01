import { ProjectHero } from "../../../components/ProjectHero"
import { ScaledFigures } from "../../../components/ScaledFigures"
import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import coverImage from "../../../pic/Cover.png"

import { clearedBlocks, clearedStyles } from "./caseStudy"
import styles from "./page.module.css"

const FRAMER_FIGURE_WIDTH = 1269
const INTERFACE_FIGURE_WIDTH = 1272
const SCREEN_WIDTH = 393

function Figure({ block, width = FRAMER_FIGURE_WIDTH, caption }) {
  return (
    <figure className={styles.figureWrap}>
      <div className={styles.figure} data-cleared-figure data-figure-width={width}>
        <div
          className="framer-RHJLV"
          style={{ width, transformOrigin: "top left" }}
          dangerouslySetInnerHTML={{ __html: block }}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

const designHighlights = [
  {
    label: "01 / One queue",
    title: "Every pending decision arrives in the same place",
    body: "Mail, calendar, reminders and tasks feed one shared queue instead of four apps that each hold part of the picture. The day view and the cards read from that same queue, so handling something once handles it everywhere.",
    screen: "queueScreen",
    alt: "Day overview listing what is scheduled, waiting, and still needs an answer"
  },
  {
    label: "02 / One decision",
    title: "The card carries everything the decision needs",
    body: "The commitment, its deadline, an estimated duration and a proposed slot sit on one card, with a one-line reason for the time. Nothing has to be opened, compared, or remembered before answering.",
    screen: "cardScreen",
    alt: "Suggestion card proposing a two-hour slot for a quote task"
  },
  {
    label: "03 / Nothing without a yes",
    title: "The AI prepares the change, the user confirms it",
    body: "When a meeting moves and creates a conflict, the app works out a new time for the affected task and shows what it would cost. The calendar only changes after the user says so, and the change stays undoable.",
    screen: "confirmScreen",
    alt: "Schedule conflict screen proposing a new time with move and leave options"
  }
]

const reflections = [
  {
    label: "Limitation",
    body: "This is an independent concept built on desk research and public product documentation. It has not been tested with users, and the duration estimates it depends on were never validated against real task data."
  },
  {
    label: "Key tradeoff",
    body: "Every change waits for a confirmation, which is slower than the tools that rearrange a calendar on their own. Trust matters more than speed here: a wrong automatic move costs more than a slower correct one."
  },
  {
    label: "Next validation",
    body: "Two rounds of testing on the card itself. Whether a swipe feels like a decision people can stand behind, and whether the estimated duration is trusted enough to accept without opening the source."
  }
]

export default function ClearedPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <style dangerouslySetInnerHTML={{ __html: clearedStyles }} />

      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track)} track={track} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Independent Concept"
              discipline={"Product Design · 2026"}
              title="Cleared"
              image={coverImage.src}
              imageAlt="Cleared planning cards and day view on mobile"
              summary="A planning layer for Gmail and Google Calendar. Gemini already turns an email into an event; Cleared picks up where that stops, collecting every pending decision into one queue and proposing a time for each."
              problem="Gemini adds the event, but finding the time, sizing the task, and repeating that for ten more items still takes five screens across two apps."
              contribution={
                "Mapped the current Gemini flow, defined the shared suggestion queue and its architecture, then designed the card interaction, six mobile screens, and the design system."
              }
              outcome="One screen and four gestures replace five screens across two apps, with every calendar change still confirmed by the user."
              role="Product Designer"
              scope={"Product Strategy · UX · UI · Design System"}
              platform="Mobile"
              timeline="8 weeks"
            />
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>The Problem</p>
                <div>
                  <h2 className={styles.sectionTitle}>Four apps each hold part of the decision, so the decision waits.</h2>
                  <p className={styles.sectionLead}>
                    An email carries the deadline, the calendar holds the free time, reminders and tasks add more.
                    Nothing can be decided until someone assembles the pieces by hand, so it all gets pushed into one
                    sitting at the end of the day.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.scatteredInputs} />
              <Figure block={clearedBlocks.onePlanningSession} />
            </section>

            <section className={`${styles.caseSection} ${styles.highlightsSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design Highlights</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three moves carry the concept.</h2>
                  <p className={styles.sectionLead}>
                    One queue instead of four apps, one card that holds the whole decision, and a confirmation in front
                    of every calendar change.
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
                      <div
                        className={styles.screen}
                        data-cleared-figure
                        data-figure-width={SCREEN_WIDTH}
                        role="img"
                        aria-label={highlight.alt}
                      >
                        <div
                          style={{ width: SCREEN_WIDTH, transformOrigin: "top left" }}
                          dangerouslySetInnerHTML={{ __html: clearedBlocks[highlight.screen] }}
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Research Evidence</p>
                <div>
                  <h2 className={styles.sectionTitle}>
                    The day is full of short gaps, and a planning decision does not fit inside one.
                  </h2>
                  <p className={styles.sectionLead}>
                    Published research on how knowledge workers spend the day, read against five products that already
                    try to close this gap. The pattern is consistent: the interruption is not the problem, the split
                    information is.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.researchStats} />
              <Figure block={clearedBlocks.researchTakeaway} />
              <Figure block={clearedBlocks.competitorTable} />

              <p className={styles.researchNote}>
                Desk research only. Sources: Microsoft WorkLab Work Trend Index 2025, Asana Anatomy of Work Index,
                Litmus State of Email Engagement, McKinsey Global Institute, and product documentation for Morgen,
                Reclaim, Motion, Sunsama and Google Workspace.
              </p>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Where Gemini Stops</p>
                <div>
                  <h2 className={styles.sectionTitle}>
                    Gemini turns an email into an event. Everything after that is still manual.
                  </h2>
                  <p className={styles.sectionLead}>
                    Gmail already recognises the commitment and offers an Add to calendar action, reviewed before
                    anything is saved. But the suggestion only exists inside that one thread, and placing it in the day
                    is still the user&rsquo;s job, once per item.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.geminiGap} />
              <Figure block={clearedBlocks.currentFlow} />
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Product Direction</p>
                <div>
                  <h2 className={styles.sectionTitle}>One queue for every source, and nothing moves without a yes.</h2>
                  <p className={styles.sectionLead}>
                    Mail, calendar, reminders and tasks feed a single suggestion queue. The AI does the work around the
                    decision, reading the thread, estimating the duration and checking the calendar, so what reaches the
                    user is one confirmable choice rather than another planning task.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.solutionModel} />
              <Figure block={clearedBlocks.informationArchitecture} />
              <Figure block={clearedBlocks.explainRules} />
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Interaction Model</p>
                <div>
                  <h2 className={styles.sectionTitle}>One screen and four gestures replace five screens across two apps.</h2>
                  <p className={styles.sectionLead}>
                    Everything needed for the decision sits on the card, so accepting, moving, deferring and dismissing
                    are each a single gesture. Deferring is a real answer rather than a failure state, and the queue has
                    an end.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.cardAnatomy} />
              <Figure block={clearedBlocks.redesignedFlow} />
              <Figure block={clearedBlocks.flowPrinciples} />
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Final Experience</p>
                <div>
                  <h2 className={styles.sectionTitle}>Six screens covering one day, from the subway to the evening review.</h2>
                  <p className={styles.sectionLead}>
                    The decisions spread across moments that already exist: a commute, a gap between meetings, a queue
                    for coffee. The screens cover reading the source, accepting a suggestion, answering when the app
                    needs more, learning from a correction, absorbing a schedule change, and closing the day.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.dayJourney} />
              <Figure block={clearedBlocks.sixScreens} width={INTERFACE_FIGURE_WIDTH} />
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design System</p>
                <div>
                  <h2 className={styles.sectionTitle}>
                    Six type styles, four accent colors, and one rule: an estimate never looks like a fact.
                  </h2>
                  <p className={styles.sectionLead}>
                    Color carries meaning rather than decoration. Suggestions stay neutral, accents are reserved for
                    source and status, and a dashed border marks anything the user has not confirmed yet.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.designSystem} width={INTERFACE_FIGURE_WIDTH} />
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Decisions &amp; Risks</p>
                <div>
                  <h2 className={styles.sectionTitle}>Every decision here costs something.</h2>
                  <p className={styles.sectionLead}>
                    The four choices that shaped the product, and the four ways this model can still fail once it is
                    inside someone&rsquo;s day.
                  </p>
                </div>
              </div>

              <Figure block={clearedBlocks.tradeOffs} />
              <Figure block={clearedBlocks.risks} />
            </section>

            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Brief Reflection</p>
                <h2 className={styles.sectionTitle}>Extend what Google already does well, rather than rebuild it.</h2>
              </div>

              <div className={styles.reflectionGrid}>
                {reflections.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <ProjectNav slug="cleared" track={track} styles={styles} />
          </div>
        </section>

        <ScaledFigures />

        <SiteFooter />
      </div>
    </main>
  )
}
