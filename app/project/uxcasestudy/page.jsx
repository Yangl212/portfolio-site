import Link from "next/link"

import { ProjectHero } from "../../../components/ProjectHero"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
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
    label: "01 / Earlier entry",
    title: "Bring monthly spending into the account view",
    body: "The checking account now shows this month's spending, budget progress, and a direct path into the detailed view. Users can notice a problem before searching for the budgeting tool.",
    image: img("c0bf9090252ffed50f1a0f6e30faad2cfa1ba75c.png"),
    alt: "BOA mobile account screens with monthly spending surfaced in the checking account",
    tone: "entry"
  },
  {
    label: "02 / Context + control",
    title: "Keep filters visible and edit categories in place",
    body: "Month and category remain visible while users move from the spending overview into transactions. Multiple transactions can be selected and recategorized together instead of reopening each detail screen.",
    image: img("a96f52fde2f46c05197ef3fa6aed241c516c7ce5.png"),
    alt: "BOA mobile spending overview, persistent filters, transaction list, and batch recategorization",
    tone: "spending"
  },
  {
    label: "03 / Budget flexibility",
    title: "Adjust a category without restarting the budget",
    body: "Users can edit one category or move money between two categories while keeping the monthly total visible. The final step distinguishes a one-month change from an ongoing budget.",
    image: img("c4e71817e7a3d8acd01dba2645799e98a9d514f3.png"),
    alt: "BOA mobile budget editing and category reallocation flow",
    tone: "budget"
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

export default function UxCaseStudyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/" />
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

            <section className={`${styles.caseSection} ${styles.highlightsSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design Highlights</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three changes carry the redesign.</h2>
                  <p className={styles.sectionLead}>
                    The final mobile concept focuses on earlier access, continuous context, and budget controls that
                    match the size of the change.
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
                      <img src={highlight.image} alt={highlight.alt} />
                    </div>
                    <span className={styles.highlightNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </article>
                ))}
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
                <p className={styles.kicker}>Testing &amp; Iteration</p>
                <div>
                  <h2 className={styles.sectionTitle}>The low-fi test changed the interaction, not just the polish.</h2>
                  <p className={styles.sectionLead}>
                    Several BOA users tested the early prototype. Their feedback confirmed the direction for spending
                    and category editing, while exposing ambiguity in budget reallocation and hierarchy.
                  </p>
                </div>
              </div>

              <div className={styles.lowFiGrid}>
                <figure>
                  <figcaption>Track spending low-fi</figcaption>
                  <img src={img("ef14fa26529a70d0b6532be91a35a0e55856a13b.png")} alt="Low-fidelity mobile spending flow" />
                </figure>
                <figure>
                  <figcaption>Budget low-fi</figcaption>
                  <img src={img("1b9110f8e883b603d3c739b4e2e2d171587e7ac6.png")} alt="Low-fidelity mobile budget flow" />
                </figure>
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

            <nav className={styles.projectNav} aria-label="Project navigation">
              <Link className={styles.projectNavPrev} href="/project/backstage">
                <span className={styles.projectNavLabel}>&#8592; Previous Project</span>
                <span className={styles.projectNavName}>
                  <span className={styles.projectNavDot} aria-hidden="true" />
                  Backstage
                </span>
              </Link>
              <Link className={styles.projectNavAll} href="/">All Projects</Link>
              <Link className={styles.projectNavNext} href="/project/lastmessage">
                <span className={styles.projectNavLabel}>Next Project &#8594;</span>
                <span className={styles.projectNavName}>
                  Last Message
                  <span className={styles.projectNavDot} aria-hidden="true" />
                </span>
              </Link>
            </nav>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
