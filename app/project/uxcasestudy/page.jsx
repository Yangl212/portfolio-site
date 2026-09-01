import { AutoplayVideo } from "../../../components/AutoplayVideo"
import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { ScaledIframe } from "../../../components/ScaledIframe"
import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import boaCover from "../../../pic/Frame 2.png"

import styles from "./page.module.css"

const img = (hash) => `/framer-assets/images/${hash}`

const problemSnapshots = [
  {
    signal: "70% / 57%",
    title: "Spending is difficult to find and verify",
    body: "Users had to move between summaries, categories, and transaction lists to understand where a total came from.",
    evidence: "70% struggled to find insights; 57% were unsure how totals were calculated."
  },
  {
    signal: "67% / 63%",
    title: "Category correction breaks the flow",
    body: "Fixing a category required opening transactions one at a time, while filters and selections could reset on return.",
    evidence: "67% found correction time-consuming; 63% experienced resetting selections."
  },
  {
    signal: "73%",
    title: "Budget changes force a full rebuild",
    body: "A small monthly adjustment could send users through setup steps that did not match the change they wanted to make.",
    evidence: "73% found monthly budget adjustments inflexible."
  }
]

const designHighlights = [
  {
    label: "01 / Richer spending chart",
    title: "Redesign the spending chart to show more at a glance",
    body: "The new chart surfaces more information in one view. Users can quickly spot overspending by category and swipe to see more detailed spending insights.",
    video: "/boa/01.mp4",
    alt: "Screen recording of the redesigned BOA spending chart, showing overspending by category and swiping through further insights",
    tone: "spending"
  },
  {
    label: "02 / Clearer budget view",
    title: "Make budget status easier to understand",
    body: "The budget page provides more useful information than the current version, helping users notice overspending more quickly.",
    video: "/boa/02.mp4",
    alt: "Screen recording of the redesigned BOA budget page making overspending easier to notice",
    tone: "budget"
  },
  {
    label: "03 / Quick reallocation",
    title: "Let users move budget directly",
    body: "Users can directly move money from one category to another, making budget adjustments faster and easier.",
    video: "/boa/03.mp4",
    alt: "Screen recording of moving money directly from one BOA budget category to another",
    tone: "reallocation"
  }
]

const prototypeSteps = [
  {
    title: "Scan the month",
    body: "Open spending from the checking account card. The chart carries category totals and overspending in one view instead of a single ring."
  },
  {
    title: "Follow a category",
    body: "Step into a category and back out again. The active month and filters stay in place, and transactions can be recategorized from the list."
  },
  {
    title: "Move the budget",
    body: "Take from one category and give to another, then decide whether the change applies to this month only or from now on."
  }
]

const researchStats = [
  { pct: "63%", label: "Selections reset", color: "rgba(247, 235, 140, 0.78)" },
  { pct: "70%", label: "Insights hard to find", color: "rgba(212, 180, 240, 0.72)" },
  { pct: "67%", label: "Correction takes time", color: "rgba(210, 210, 210, 0.82)" },
  { pct: "57%", label: "Totals feel unclear", color: "rgba(190, 215, 247, 0.78)" },
  { pct: "73%", label: "Budgets feel inflexible", color: "rgba(247, 205, 205, 0.78)" }
]

const designDecisions = [
  {
    label: "Access",
    title: "Start from the account users already check",
    evidence: "The spending tool was buried behind several screens.",
    decision: "Surface monthly spending and budget progress on the checking account card."
  },
  {
    label: "Continuity",
    title: "Treat month and category as persistent context",
    evidence: "Selections could reset after opening a transaction and going back.",
    decision: "Keep the active month and category visible across overview, category, and transaction views."
  },
  {
    label: "Control",
    title: "Move category correction into the list",
    evidence: "Users had to correct transactions one at a time through detail screens.",
    decision: "Support multi-select and recategorization without leaving the transaction list."
  },
  {
    label: "Flexibility",
    title: "Separate temporary and ongoing changes",
    evidence: "A monthly adjustment could force users back through budget setup.",
    decision: "Allow direct edits or reallocation, then ask whether the change applies once or going forward."
  }
]

const flowComparisons = [
  {
    title: "Track spending",
    summary: "Direct access replaces the hidden entry, filters stay visible, and category changes happen inside the transaction flow.",
    current: img("0bc9cd759c554c1e5537ba810d083f5adf5d7f2c.png"),
    redesigned: img("aede7f6f2ddb4260fd295c2d97f190b4eff94b9b.png"),
    currentAlt: "Current BOA spending flow with hidden entry, lost context, and deep category editing",
    redesignedAlt: "Redesigned BOA spending flow with direct access, persistent filters, and quicker category editing"
  },
  {
    title: "Adjust a budget",
    summary: "The redesign starts from the current budget, supports focused edits or reallocation, and avoids restarting the setup process.",
    current: img("b20b93f0cad89301c7262d4330c7e81176dfb5c7.png"),
    redesigned: img("39c57feb914fc1ec121c56f373082c9159d742e3.png"),
    currentAlt: "Current BOA budget flow with a long setup process",
    redesignedAlt: "Redesigned BOA budget flow with direct edits and category reallocation"
  }
]

const lowFiArcs = [
  {
    label: "Entry",
    title: "Spending starts on a screen users already open",
    body: "In BOA today the spending tool sits several screens below the account it describes. Here the month's total is already on the accounts list and on the checking card, and a transaction row is a way back into the same spending context rather than a dead end.",
    screens: [
      {
        src: "/boa/low01.png",
        caption: "Accounts · spending in the list",
        alt: "Low-fidelity accounts screen with a spending summary sitting under the account list"
      },
      {
        src: "/boa/low02.png",
        caption: "Checking · one entry point",
        alt: "Low-fidelity checking account screen with this month's spending and a link into tracking"
      },
      {
        src: "/boa/low03.png",
        caption: "Transaction · category editable here",
        alt: "Low-fidelity transaction detail with an editable category row and a link to all spending in that category"
      }
    ]
  },
  {
    label: "Track spending",
    title: "Month and category survive the trip into detail",
    body: "The two pickers stay pinned above the overview, the category breakdown, and the transaction list, so stepping into a merchant and back does not clear them. Correcting a miscategorised charge happens in the list itself — select several, move them once — instead of one transaction detail at a time.",
    screens: [
      {
        src: "/boa/low04.png",
        caption: "Overview · filters pinned",
        alt: "Low-fidelity spending overview with month and category filters pinned above a category breakdown"
      },
      {
        src: "/boa/low05.png",
        caption: "Time range · month to year",
        alt: "Low-fidelity time range sheet offering month, quarter, and year"
      },
      {
        src: "/boa/low06.png",
        caption: "Category filter · all 16",
        alt: "Low-fidelity category filter sheet listing every category with spend against budget"
      },
      {
        src: "/boa/low07.png",
        caption: "Category · by merchant",
        alt: "Low-fidelity groceries detail broken down by merchant against the budget line"
      },
      {
        src: "/boa/low08.png",
        caption: "Same category · by month",
        alt: "Low-fidelity groceries detail broken down by month against the budget line"
      },
      {
        src: "/boa/low09.png",
        caption: "Transactions · filters intact",
        alt: "Low-fidelity groceries transaction list with the month and category filters still applied"
      },
      {
        src: "/boa/low10.png",
        caption: "Select · fix several at once",
        alt: "Low-fidelity transaction list in selection mode with two transactions checked and a recategorize action"
      },
      {
        src: "/boa/low11.png",
        caption: "Move to another category",
        alt: "Low-fidelity sheet moving the two selected transactions to Restaurants and Dining"
      }
    ]
  },
  {
    label: "Budget",
    title: "Changing one number does not restart setup",
    body: "A monthly adjustment stays inside the budget. Categories are edited in place or moved against each other while the total is held steady, and saving is where the flow finally asks whether this is a one-month change or the new normal — a question the current setup never puts to the user.",
    screens: [
      {
        src: "/boa/low13.png",
        caption: "Budget · edit in place",
        alt: "Low-fidelity budget screen with plus and minus steppers on each category"
      },
      {
        src: "/boa/low14.png",
        caption: "Reallocate · take from, give to",
        alt: "Low-fidelity reallocation sheet moving twenty dollars between two categories with both new limits previewed"
      },
      {
        src: "/boa/low15.png",
        caption: "Save once, or from now on",
        alt: "Low-fidelity save sheet offering to save for August only or as an ongoing budget"
      },
      {
        src: "/boa/low16.png",
        caption: "Category · line moved, bars kept",
        alt: "Low-fidelity Restaurants and Dining detail showing the moved budget line and an undo action"
      }
    ]
  }
]

const screenNumber = (src) => src.replace(/\D+/g, "")

const testIterations = [
  {
    observation: "Reallocation was useful, but choosing where money moved from and to was not immediately clear.",
    response: "Separated the interaction into Take from and Give to, kept the total visible, and added a change summary before saving."
  },
  {
    observation: "Some low-fi screens gave totals, lists, and controls similar visual weight.",
    response: "Strengthened the spending total, budget status, and primary actions so the next decision is easier to scan."
  },
  {
    observation: "Users asked for the redesign to stay close to BOA's current structure to reduce the learning curve.",
    response: "Kept familiar navigation, colors, list patterns, and terminology while changing only the points of friction."
  }
]

const webScreens = [
  {
    src: img("d4485ee34a100a5f9cebf1cddbaaa8ab03b4d746.png"),
    alt: "BOA web spending overview with category breakdown and recent transactions"
  },
  {
    src: img("b1dc4b580e7bd01533520ec3dd5ea78546576240.png"),
    alt: "BOA web category view with transaction selection and budget adjustment"
  },
  {
    src: img("d810dded2e769c21f8db7ba27d76722e94a3c37d.png"),
    alt: "BOA web budget editing view with category reallocation panel"
  }
]

const systemAssets = [
  { src: img("96d21119e7c4078c307a63377b7d633dbe4d78c8.png"), alt: "BOA core color palette", label: "Core palette" },
  { src: img("f1f1b3fd3c6f921ab73524efa128d6b7f8c377e9.png"), alt: "BOA spending category color ramp", label: "Category ramp" },
  { src: img("9b785afb90f4467916a28a2f125a7a41e2d54699.png"), alt: "BOA typography specimen", label: "Typography" }
]

export default function UxCaseStudyPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track)} track={track} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Independent Case Study"
              discipline={"UI/UX Design \u00b7 2026"}
              title="BOA: Budgeting Redesign"
              image={boaCover.src}
              imageAlt="BOA spending and budgeting redesign cover"
              summary="Redesigning BOA's spending and budgeting experience so users can find spending totals, correct categories, and adjust a monthly budget without rebuilding it."
              problem="Spending totals, category edits, and budget controls are split across disconnected screens."
              contribution="Mapped the existing flows, tested low-fi concepts, and designed mobile and web interactions."
              outcome="A cross-platform concept that keeps spending context visible and makes budget changes more direct."
              role="UI/UX Designer"
              scope={"Research \u00b7 UX \u00b7 UI \u00b7 Prototype"}
              platform="Mobile + Web"
              timeline="8 weeks"
            />
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Problem Snapshot</p>
                <div>
                  <h2 className={styles.sectionTitle}>The tool asks users to hunt for information, then rebuild context.</h2>
                  <p className={styles.sectionLead}>
                    The strongest issues clustered around three moments: finding and verifying spending, correcting
                    categories, and adapting a budget after the month had already started.
                  </p>
                </div>
              </div>

              <div className={styles.problemGrid}>
                {problemSnapshots.map((problem) => (
                  <article className={styles.problemCard} key={problem.title}>
                    <p className={styles.problemSignal}>{problem.signal}</p>
                    <h3>{problem.title}</h3>
                    <p>{problem.body}</p>
                    <p className={styles.problemEvidence}>{problem.evidence}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design Highlights</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three changes carry the redesign.</h2>
                  <p className={styles.sectionLead}>
                    The final mobile concept focuses on a spending chart that shows more at a glance, a budget view
                    that makes overspending obvious, and reallocation users can do in one move.
                  </p>
                </div>
              </div>

              <div className={styles.highlightList}>
                {designHighlights.map((highlight, index) => (
                  <article className={styles.highlightCard} data-tone={highlight.tone} key={highlight.title}>
                    <div className={styles.highlightCopy}>
                      <p className={styles.microLabel}>{highlight.label}</p>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.body}</p>
                    </div>
                    <div className={styles.highlightVisual}>
                      <AutoplayVideo
                        className={styles.highlightVideo}
                        src={highlight.video}
                        width="2304"
                        height="1440"
                        ariaLabel={highlight.alt}
                      />
                    </div>
                    <span className={styles.highlightNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.prototypeLayout}>
                <div className={styles.prototypeGuide}>
                  <div className={styles.sectionHeader}>
                    <p className={styles.kicker}>Interactive Prototype</p>
                    <div>
                      <h2 className={styles.sectionTitle}>Try the high-fidelity spending experience.</h2>
                      <p className={styles.sectionLead}>
                        The clips above introduce the key ideas one at a time. This working prototype connects them
                        into a single journey, running live in the page.
                      </p>
                    </div>
                  </div>

                  <p className={styles.microLabel}>Three things to try</p>
                  <ol className={styles.prototypeSteps}>
                    {prototypeSteps.map((step, index) => (
                      <li key={step.title}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <h3>{step.title}</h3>
                          <p>{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <a
                    className={styles.prototypeLink}
                    href="/boa/Spending%20Prototype%20(embeddable).html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open at full size <span aria-hidden="true">&#8594;</span>
                  </a>
                </div>

                <figure className={styles.prototypeStage}>
                  <ScaledIframe
                    className={styles.prototypeViewport}
                    frameClassName={styles.prototypeFrame}
                    src="/boa/Spending%20Prototype%20(embeddable).html"
                    title="Interactive high-fidelity BOA spending and budgeting prototype"
                    width={510}
                    height={1000}
                    maxDisplayWidth={440}
                    transparent
                  />
                  <figcaption>Live prototype &#183; iPhone 390 &#215; 844</figcaption>
                </figure>
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Research Evidence</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three sources pointed to the same breakdowns.</h2>
                  <p className={styles.sectionLead}>
                    A directional survey identified recurring patterns. Two interviews explained how those patterns
                    affected real tasks, while Reddit posts were used only as supporting evidence.
                  </p>
                </div>
              </div>

              <div className={styles.methodGrid}>
                <article><span>Survey</span><strong>32</strong><p>BOA users</p></article>
                <article><span>Interviews</span><strong>2</strong><p>BOA users</p></article>
                <article><span>Supporting signal</span><strong>Reddit</strong><p>Public complaints</p></article>
              </div>

              <div className={styles.researchChartViewport}>
                <div className={styles.researchChart}>
                  {researchStats.map((stat) => (
                    <article className={styles.researchStat} key={stat.label}>
                      <div className={styles.researchBarTrack}>
                        <div
                          className={styles.researchBar}
                          style={{ "--stat-value": stat.pct, "--stat-color": stat.color }}
                        />
                      </div>
                      <strong>{stat.pct}</strong>
                      <p>{stat.label}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className={styles.evidenceGrid}>
                <article className={styles.evidenceCard}>
                  <div className={styles.evidenceImage}>
                    <img src={img("32e5aee7ec9b38447e93967b911aa3777d108cfb.png")} alt="Two BOA user interviews" />
                  </div>
                  <div>
                    <p className={styles.microLabel}>Interview context</p>
                    <h3>Users could not explain the spending total.</h3>
                    <p>They described inaccurate categories, repeated edits, and uncertainty about which transactions were included in a spending total.</p>
                  </div>
                </article>

                <article className={`${styles.evidenceCard} ${styles.evidenceCardSupporting}`}>
                  <div className={styles.evidenceImage}>
                    <img src={img("aa2ba4021ed8c8dfbb35ea59a4cc6dd57175099f.png")} alt="Public Reddit posts about BOA spending and budgeting issues" />
                  </div>
                  <div>
                    <p className={styles.microLabel}>Supporting evidence</p>
                    <h3>Similar complaints appeared outside the study.</h3>
                    <p>Reddit posts reinforced the themes around buried charts, resetting categories, and totals that did not feel explainable.</p>
                  </div>
                </article>
              </div>

              <p className={styles.researchNote}>This was directional research, not a representative sample of all BOA customers.</p>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Key Design Decisions</p>
                <div>
                  <h2 className={styles.sectionTitle}>Each decision targets a specific point of friction.</h2>
                  <p className={styles.sectionLead}>
                    The redesign avoids replacing the whole product. It changes where information appears, what
                    context persists, and how much work is required for a correction.
                  </p>
                </div>
              </div>

              <div className={styles.decisionGrid}>
                {designDecisions.map((item) => (
                  <article className={styles.decisionCard} key={item.label}>
                    <p className={styles.decisionLabel}>{item.label}</p>
                    <h3>{item.title}</h3>
                    <dl>
                      <div><dt>Evidence</dt><dd>{item.evidence}</dd></div>
                      <div><dt>Decision</dt><dd>{item.decision}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>

              <p className={styles.referenceNote}>
                Chase informed flexible time ranges, Monarch Money reinforced budget reallocation, and Copilot Money
                provided a reference for faster category correction.
              </p>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Flow Improvement</p>
                <div>
                  <h2 className={styles.sectionTitle}>Reduce detours without hiding the decisions users still need to make.</h2>
                  <p className={styles.sectionLead}>
                    The redesigned flows remove hidden entry points, repeated setup, and unnecessary trips into detail
                    screens while keeping the active month, category, current budget, and save scope visible.
                  </p>
                </div>
              </div>

              <div className={styles.flowList}>
                {flowComparisons.map((flow) => (
                  <article className={styles.flowCase} key={flow.title}>
                    <div className={styles.flowIntro}>
                      <h3>{flow.title}</h3>
                      <p>{flow.summary}</p>
                    </div>
                    <div className={styles.flowPair}>
                      <figure>
                        <figcaption>Current</figcaption>
                        <img src={flow.current} alt={flow.currentAlt} />
                      </figure>
                      <figure>
                        <figcaption>Redesigned</figcaption>
                        <img src={flow.redesigned} alt={flow.redesignedAlt} />
                      </figure>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Low-fi Flows</p>
                <div>
                  <h2 className={styles.sectionTitle}>Fifteen wireframes, each answering something BOA does differently today.</h2>
                  <p className={styles.sectionLead}>
                    The structure was tested before any visual design: where spending is entered from, what survives a
                    step into detail, and how much of a budget has to be rebuilt to change one number.
                  </p>
                </div>
              </div>

              <div className={styles.lowFiFlows}>
                {lowFiArcs.map((arc) => (
                  <div className={styles.lowFiArc} key={arc.label}>
                    <div className={styles.lowFiArcHeader}>
                      <p className={styles.microLabel}>{arc.label}</p>
                      <h3>{arc.title}</h3>
                      <p>{arc.body}</p>
                    </div>

                    <div className={styles.lowFiScreens}>
                      {arc.screens.map((screen) => (
                        <figure key={screen.src}>
                          <img src={screen.src} alt={screen.alt} width="484" height="884" loading="lazy" />
                          <figcaption>
                            <span aria-hidden="true">{screenNumber(screen.src)}</span>
                            {screen.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Testing &amp; Iteration</p>
                <div>
                  <h2 className={styles.sectionTitle}>The low-fi test changed the interaction, not just the polish.</h2>
                  <p className={styles.sectionLead}>
                    Several BOA users tested the early prototype. Their feedback confirmed the direction for spending
                    and category editing, while exposing ambiguity in budget reallocation and hierarchy.
                  </p>
                </div>
              </div>

              <div className={styles.iterationList}>
                {testIterations.map((item, index) => (
                  <article className={styles.iterationItem} key={item.observation}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><p className={styles.microLabel}>Observed</p><p>{item.observation}</p></div>
                    <div><p className={styles.microLabel}>Changed</p><p>{item.response}</p></div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Web Adaptation + Design System</p>
                <div>
                  <h2 className={styles.sectionTitle}>The same decisions scale into a denser desktop workspace.</h2>
                  <p className={styles.sectionLead}>
                    Desktop uses the extra width for persistent summaries, transaction tables, and side-panel edits.
                    The behavior stays consistent with mobile instead of becoming a separate product.
                  </p>
                </div>
              </div>

              <div className={styles.webGallery}>
                {webScreens.map((screen, index) => (
                  <figure className={index === 0 ? styles.webPrimary : ""} key={screen.src}>
                    <img src={screen.src} alt={screen.alt} />
                  </figure>
                ))}
              </div>

              <div className={styles.systemIntro}>
                <p className={styles.microLabel}>Working within a familiar system</p>
                <p>
                  BOA's navy, category colors, typography, navigation, and list patterns remain recognizable. The
                  visual system supports the new interactions without asking existing users to relearn the product.
                </p>
              </div>

              <div className={styles.systemGrid}>
                {systemAssets.map((asset) => (
                  <figure key={asset.src}>
                    <figcaption>{asset.label}</figcaption>
                    <img src={asset.src} alt={asset.alt} />
                  </figure>
                ))}
              </div>
            </section>

            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Brief Reflection</p>
                <h2 className={styles.sectionTitle}>Change the friction, preserve the familiarity.</h2>
              </div>

              <div className={styles.reflectionGrid}>
                <article><p className={styles.microLabel}>Limitation</p><p>This independent concept used a small directional sample and was not tested against production data or engineering constraints.</p></article>
                <article><p className={styles.microLabel}>Key tradeoff</p><p>I kept BOA's familiar structure and focused the redesign on access, context, correction, and budget flexibility.</p></article>
                <article><p className={styles.microLabel}>Next validation</p><p>I would run task-based testing on reallocation and the one-month versus ongoing save choice, then measure comprehension and completion.</p></article>
              </div>
            </section>

            <ProjectNav slug="uxcasestudy" track={track} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.highlightVisual}, .${styles.evidenceImage}, .${styles.flowPair} figure, .${styles.lowFiScreens} figure, .${styles.webGallery} figure, .${styles.systemGrid} figure`}
          barsUp={`.${styles.researchBar}`}
        />

        <SiteFooter />
      </div>
    </main>
  )
}
