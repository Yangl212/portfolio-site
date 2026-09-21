import CaseVideo from "../cleared/CaseVideo"
import { ImageCarousel } from "../../../components/ImageCarousel"
import { ScaledIframe } from "../../../components/ScaledIframe"
import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"

import styles from "./page.module.css"

export const metadata = {
  title: "BOA: Budgeting Redesign",
  description:
    "An independent redesign of Bank of America's spending and budgeting flow: trace a total to its transactions, fix categories in bulk, and adjust a budget without restarting setup."
}

const img = (hash) => `/framer-assets/images/${hash}`
const PROTOTYPE_SRC = "/boa/Spending%20Prototype%20(embeddable).html?v=20260915-1526"

const problemSnapshots = [
  {
    title: "Spending is difficult to find and verify",
    body: "Users had to move between summaries, categories, and transaction lists to understand where a total came from.",
    evidence: "69% struggled to find insights; interview participants described uncertainty about which transactions made up a total."
  },
  {
    title: "Category correction breaks the flow",
    body: "Fixing a category required opening transactions one at a time, while filters and selections could reset on return.",
    evidence: "66% found correction time-consuming; 63% experienced resetting selections."
  },
  {
    title: "Budget changes force a full rebuild",
    body: "A small monthly adjustment could send users through setup steps that did not match the change they wanted to make.",
    evidence: "72% found monthly budget adjustments inflexible."
  }
]

const designHighlights = [
  {
    label: "01 / Understand",
    title: "See which category needs attention.",
    body: "Select a category to see its amount, budget, and status in one place.",
    video: "spending",
    alt: "Screen recording of the redesigned BOA spending chart, showing overspending by category and swiping through further insights"
  },
  {
    label: "02 / Investigate",
    title: "Trace the total back to the spending.",
    body: "Switch between merchant and monthly breakdowns without losing the active month, category, or budget.",
    video: "budget",
    alt: "Category spending view switching between merchant and monthly breakdowns"
  },
  {
    label: "03 / Adjust",
    title: "Reallocate the budget without restarting setup.",
    body: "Move an amount between categories, preview both limits, then choose whether the change is temporary or ongoing.",
    video: "reallocate",
    alt: "Reallocating budget allowances between two categories, with both limits visible"
  }
]

const prototypeSteps = [
  {
    title: "Inspect a spending category",
    body: "Select a category in the dial, compare its merchant and monthly breakdowns, then open its transactions."
  },
  {
    title: "Correct more than one transaction",
    body: "Select transactions and assign a category together, keeping the active month and category in context."
  },
  {
    title: "Make a one-month budget adjustment",
    body: "Reallocate category allowances, review the new limits, and choose a one-month or ongoing change. This adjusts the plan; it does not transfer funds."
  }
]

const researchStats = [
  { pct: "63%", label: "Selections reset", color: "rgba(247, 235, 140, 0.78)" },
  { pct: "69%", label: "Insights hard to find", color: "rgba(212, 180, 240, 0.72)" },
  { pct: "66%", label: "Correction takes time", color: "rgba(210, 210, 210, 0.82)" },
  { pct: "72%", label: "Budgets feel inflexible", color: "rgba(247, 205, 205, 0.78)" }
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
    body: "The reviewed flow placed spending several screens below the account. These wireframes bring the monthly total to the accounts list and checking card, with a path from transactions back into spending.",
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
    body: "Categories can be edited or reallocated while the total stays visible. Saving is a separate decision: apply the adjustment to this month or keep it as an ongoing plan.",
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
    title: "Budget reallocation",
    count: "2 of 6 → 5 of 6 unassisted",
    change: "Separated the source and destination into Take from and Give to, then previewed both new limits and the unchanged total before confirmation.",
    result: "Five of six participants completed budget reallocation without help in the redesigned flow, compared with two of six in the earlier task round.",
    nextStep: "Next, test one-month versus ongoing changes, undo, and insufficient-funds cases."
  },
  {
    title: "Spending chart",
    count: "41 s → 24 s median",
    result: "Five of six participants identified the most overspent category without help after the selected category, budget ring, and text status were made more explicit."
  },
  {
    title: "Assistant exploration",
    count: "1 of 6 → 4 of 6",
    result: "Four of six participants resolved a follow-up question in the prototype assistant, compared with one of six using navigation in the comparison round."
  }
]

const webScreens = [
  {
    src: "/boa/web1.png",
    alt: "BOA web accounts home with total balance trend, account list, and August spending summary"
  },
  {
    src: "/boa/web2.png",
    alt: "BOA web spending overview with category donut, budget bars, and a groceries breakdown by month and merchant"
  },
  {
    src: "/boa/web3.png",
    alt: "BOA web cash flow view with net cash flow chart, month-by-month table, and a flow diagram of where the money went"
  },
  {
    src: "/boa/web4.png",
    alt: "BOA web spending view with the assistant panel open, explaining why groceries is over budget"
  }
]

const systemAssets = [
  { src: img("96d21119e7c4078c307a63377b7d633dbe4d78c8.png"), alt: "BOA core color palette", label: "Core palette" },
  { src: img("f1f1b3fd3c6f921ab73524efa128d6b7f8c377e9.png"), alt: "BOA spending category color ramp", label: "Category ramp" },
  { src: img("9b785afb90f4467916a28a2f125a7a41e2d54699.png"), alt: "BOA typography specimen", label: "Typography" }
]

export default function UxCaseStudyPage({ track = "uiux" }) {
  const [featuredIteration, ...supportingIterations] = testIterations

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track)} track={track} />
        <div className={styles.content}>
          <Reveal fade={[
            `.${styles.sectionHeader}`,
            `.${styles.highlightCard}`,
            `.${styles.prototypeSteps} li`,
            `.${styles.prototypeGuide} > .${styles.outlineAction}`,
            `.${styles.prototypeGuide} > .${styles.sourceNote}`,
            `.${styles.prototypeStage}`,
            `.${styles.methodGrid} > div`,
            `.${styles.problemGrid} article`,
            `.${styles.disclosure}`,
            `.${styles.flowCase}`,
            `.${styles.lowFiArc}`,
            `.${styles.iterationItem}`,
            `.${styles.supportingResult}`,
            `.${styles.webCarousel}`,
            `.${styles.systemGrid} figure`
          ].join(", ")} />
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>
                <span className={styles.pill}>Independent case study</span>
                <span>Product · UI/UX · 2026</span>
              </div>
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>BOA: Spending<br />&amp; budgeting.</h1>
              <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>Understand the spending. Correct the details. Adjust the plan.</p>
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>Role</dt><dd>UI/UX Designer</dd></div>
                <div><dt>Timeline</dt><dd>8 weeks</dd></div>
                <div><dt>Platform</dt><dd>Mobile + Web</dd></div>
              </dl>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>The challenge</dt><dd>Connect spending totals, category corrections and budget adjustments in one continuous flow.</dd></div>
                <div><dt>My scope</dt><dd>Research, flow analysis, wireframes, mobile and web UI, and an interactive prototype.</dd></div>
                <div><dt>Outcome</dt><dd>Budget reallocation rose from 2 of 6 to 5 of 6 unassisted; median time to spot overspending fell from 41 to 24 seconds.</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <a className={styles.action} href="#prototype">Try the prototype <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href="#experience">See the core flow</a>
              </div>
            </div>
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <CaseVideo src="/boa/media/reallocate-loop.mp4" poster="/boa/media/reallocate-poster.webp"
                width={720} height={1408} label="BOA preview: reallocate a category budget" priority />
            </div>
          </header>

          <ProjectQuickNav slug="boa-budgeting" track={track} />

          <section id="experience" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>01 / The core experience</p>
              <h2>From a spending total to a decision.</h2>
              <p className={styles.sectionLead}>Each part of the flow pairs a visible interface change with the decision it helps someone make: find the issue, trace its source, then adjust the plan.</p>
            </div>
            <div className={styles.highlightList}>
              {designHighlights.map((item) => (
                <article className={styles.highlightCard} key={item.video}>
                  <div className={styles.highlightCopy}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <CaseVideo className={styles.highlightVideo}
                    src={"/boa/media/" + item.video + "-loop.mp4"}
                    poster={"/boa/media/" + item.video + "-poster.webp"}
                    width={720} height={1408} label={item.alt} />
                </article>
              ))}
            </div>
          </section>

          <section id="prototype" className={styles.caseSection}>
            <div className={styles.prototypeLayout}>
              <div className={styles.prototypeGuide}>
                <div className={styles.sectionHeader}>
                  <p className={styles.kicker}>02 / Interactive prototype</p>
                  <h2>Follow the task through.</h2>
                  <p className={styles.sectionLead}>Explore the connected mobile flow using sample transactions and budgets.</p>
                </div>
                <ol className={styles.prototypeSteps}>
                  {prototypeSteps.map((step, index) => (
                    <li key={step.title}>
                      <span aria-hidden="true">0{index + 1}</span>
                      <div><h3>{step.title}</h3><p>{step.body}</p></div>
                    </li>
                  ))}
                </ol>
                <a className={styles.outlineAction} href={PROTOTYPE_SRC} target="_blank" rel="noreferrer">Open at full size <span aria-hidden="true">↗</span></a>
                <p className={styles.sourceNote}>The optional assistant demonstrates suggested questions and responses based on sample data. Free-text questions and live AI are outside this prototype.</p>
              </div>
              <div className={styles.prototypeStage}>
                <div className={styles.tryMe} aria-hidden="true">
                  <span>Try me</span>
                  <svg viewBox="0 0 76 52">
                    <path d="M4 8c25-5 29 27 61 30" />
                    <path d="m55 30 11 8-13 6" />
                  </svg>
                </div>
                <ScaledIframe className={styles.prototypeViewport} frameClassName={styles.prototypeFrame}
                  src={PROTOTYPE_SRC} title="BOA spending and budgeting interactive prototype"
                  width={510} height={1000} maxDisplayWidth={440} transparent />
              </div>
            </div>
          </section>

          <section id="research" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>03 / Research & problem framing</p>
              <h2>Three points where the flow breaks.</h2>
              <p className={styles.sectionLead}>The research focused on finding and verifying spending, correcting categories, and adapting a budget during the month.</p>
            </div>
            <div className={styles.methodGrid}>
              <div><strong>32</strong><span>Survey responses</span></div>
              <div><strong>2</strong><span>User interviews</span></div>
              <div><strong>Reddit</strong><span>Supporting public posts</span></div>
            </div>
            <p className={styles.sourceNote}>Participants had used Bank of America, but not necessarily its budgeting feature. This was a small, directional study rather than a representative sample.</p>
            <div className={styles.problemGrid}>
              {problemSnapshots.map((item, index) => (
                <article key={item.title}>
                  <p className={styles.microLabel}>0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <details className={styles.disclosure}>
              <summary>View the survey breakdown and supporting material</summary>
              <div className={styles.disclosureBody}>
                <div className={styles.researchStats}>
                  {researchStats.map((stat) => (
                    <div key={stat.label}><strong>{stat.pct}</strong><p>{stat.label}</p></div>
                  ))}
                </div>
                <p className={styles.sourceNote}>These four recorded survey findings are preserved from the research notes. Uncertainty about how totals connect to transactions is retained as a qualitative theme rather than shown with an unverified percentage.</p>
                <div className={styles.evidenceGrid}>
                  <figure>
                    <a href="/cleared/research1.png" target="_blank" rel="noreferrer">
                      <img src="/cleared/research1.png" alt="Interview context for the BOA spending case study" width="1791" height="1041" loading="lazy" />
                    </a>
                    <figcaption><strong>Interview context</strong> Categories, repeated edits and uncertainty about which transactions contributed to a total.</figcaption>
                  </figure>
                  <figure>
                    <a href="/cleared/research2.png" target="_blank" rel="noreferrer">
                      <img src="/cleared/research2.png" alt="Public posts discussing spending and budgeting issues" loading="lazy" />
                    </a>
                    <figcaption><strong>Supporting public posts</strong> External context for the themes; separate from the recruited survey and interviews.</figcaption>
                  </figure>
                </div>
              </div>
            </details>
            <details className={styles.disclosure}>
              <summary>View before-and-after flows and all 15 wireframes</summary>
              <div className={styles.disclosureBody}>
                <div id="task-flows" className={styles.flowComparisons}>
                  <div className={styles.flowIntro}>
                    <p className={styles.microLabel}>Task flow comparison</p>
                    <h3>Two tasks, before and after.</h3>
                  </div>
              <div className={styles.flowList}>
                {flowComparisons.map((flow) => (
                  <article className={styles.flowCase} key={flow.title}>
                    <h4>{flow.title}</h4><p>{flow.summary}</p>
                    <div className={styles.flowPair}>
                      <figure>
                        <figcaption>Before / Reviewed flow</figcaption>
                        <a href={flow.current} target="_blank" rel="noreferrer" aria-label={"Open full-size original flow: " + flow.title}>
                          <img src={flow.current} alt={flow.currentAlt} loading="lazy" />
                          <span className={styles.flowImageLink}>Open full size <span aria-hidden="true">↗</span></span>
                        </a>
                      </figure>
                      <figure>
                        <figcaption>After / Redesigned flow</figcaption>
                        <a href={flow.redesigned} target="_blank" rel="noreferrer" aria-label={"Open full-size redesigned flow: " + flow.title}>
                          <img src={flow.redesigned} alt={flow.redesignedAlt} loading="lazy" />
                          <span className={styles.flowImageLink}>Open full size <span aria-hidden="true">↗</span></span>
                        </a>
                      </figure>
                    </div>
                  </article>
                ))}
              </div>
            </div>
                {lowFiArcs.map((arc) => (
                  <article className={styles.lowFiArc} key={arc.label}>
                    <div className={styles.flowIntro}><p className={styles.microLabel}>{arc.label}</p><h3>{arc.title}</h3><p>{arc.body}</p></div>
                    <div className={styles.lowFiScreens}>
                      {arc.screens.map((screen) => (
                        <figure key={screen.src}>
                          <a href={screen.src} target="_blank" rel="noreferrer" aria-label={"Open full-size wireframe: " + screen.caption}>
                            <img src={screen.src} alt={screen.alt} width="484" height="884" loading="lazy" />
                          </a>
                          <figcaption><span>{screenNumber(screen.src)}</span>{screen.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </details>
          </section>

          <section id="testing" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>04 / Testing & iteration</p>
              <h2>The clearest improvement came from budget reallocation.</h2>
              <p className={styles.sectionLead}>The same six participants completed both task rounds.</p>
            </div>
            <div className={styles.iterationList}>
              <article className={`${styles.iterationItem} ${styles.iterationFeatured}`}>
                <div>
                  <p className={styles.microLabel}>Key iteration / {featuredIteration.title}</p>
                  <h3>{featuredIteration.count}</h3>
                  <dl className={styles.iterationEvidence}>
                    <div><dt>Design change</dt><dd>{featuredIteration.change}</dd></div>
                    <div><dt>Observed result</dt><dd>{featuredIteration.result}</dd></div>
                  </dl>
                </div>
                <div className={styles.nextStep}><p className={styles.microLabel}>Next question</p><p>{featuredIteration.nextStep}</p></div>
              </article>
              <div className={styles.supportingResults}>
                {supportingIterations.map((item) => (
                  <article className={styles.supportingResult} key={item.title}>
                    <div>
                      <p className={styles.microLabel}>{item.title}</p>
                      <h3>{item.count}</h3>
                      <p>{item.result}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className={styles.sourceNote}>Directional evidence only: returning participants saw substantially different interfaces, so practice effects and multiple design changes may have influenced the results. The assistant comparison is exploratory.</p>
          </section>

          <section id="web" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>05 / Web adaptation</p>
              <h2>Use the width to keep overview and detail together.</h2>
              <p className={styles.sectionLead}>Mobile reveals details one view at a time. Desktop keeps the category overview beside merchant and monthly breakdowns, with the assistant available in a side panel.</p>
            </div>
            <ImageCarousel className={styles.webCarousel} label="BOA web adaptation screens" slides={webScreens} />
            <details className={styles.disclosure}>
              <summary>View the visual system</summary>
              <div className={styles.disclosureBody}>
                <p>Familiar banking navigation, category colors and typography support the revised flows. Text values and budget lines accompany color so the status has more than one cue.</p>
                <div className={styles.systemGrid}>
                  {systemAssets.map((asset) => (
                    <figure key={asset.src}><figcaption>{asset.label}</figcaption><a href={asset.src} target="_blank" rel="noreferrer"><img src={asset.src} alt={asset.alt} loading="lazy" /></a></figure>
                  ))}
                </div>
              </div>
            </details>
          </section>

          <section className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Reflection</p>
              <h2>Next, isolate what caused the improvement.</h2>
              <p className={styles.sectionLead}>A broader study should separate the effects of persistent context, the revised chart, and the reallocation preview, while testing accessibility and error recovery.</p>
            </div>
            <p className={styles.sourceNote}>Independent redesign concept. Not affiliated with Bank of America.</p>
          </section>
          <ProjectNav slug="boa-budgeting" track={track} styles={styles} />
        </div>
        <SiteFooter compact />
      </div>
    </main>
  )
}
