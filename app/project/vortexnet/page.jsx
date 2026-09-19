import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import ScreenComparison from "./ScreenComparison"
import styles from "./page.module.css"

// The overview and navigation shipped during the internship at a company of
// about 30 people. The screens are rebuilt for this case study on the tool's
// test data; the structural counts describe the delivered structure, not
// usage analytics.
export const metadata = {
  title: "VortexNet: Finance Dashboard",
  description: "Information hierarchy and consolidation for an internal finance dashboard at a 30-person company. Today's overview and its task-based navigation shipped during the internship; in testing with 10 colleagues, finding the day's work dropped from 20–30 seconds to about 8."
}

const media = (name) => "/vortexnet/media/" + name + ".webp"

const observations = [
  { title: "A flat menu mixed different jobs.", body: "Fourteen entries put reports, operational queues and administration at the same level." },
  { title: "Labels reflected the system.", body: "Abbreviations such as PEND_CNT required interpretation before someone could act." },
  { title: "The overview emphasized records.", body: "A dense transaction table dominated the screen, without a dedicated list of items needing attention." }
]

const priorities = [
  { item: "Awaiting settlement", who: "Operations", often: "Every morning", place: "Landing screen", strong: true },
  { item: "Failed items", who: "Operations", often: "Every morning", place: "Landing screen", strong: true },
  { item: "Reconciliation queue", who: "Finance", often: "Daily", place: "Direct entry" },
  { item: "Daily / monthly reports", who: "Finance", often: "Weekly", place: "Reporting group" },
  { item: "Accounts, permissions, logs", who: "Data team", often: "Occasional", place: "Separate admin" }
]

const outcomes = [
  { value: "14 → 9", label: "Main navigation entries, before and after" },
  { value: "3 groups", label: "Monitor today · Reconcile · Review over time" },
  { value: "4 metrics", label: "Named summaries alongside context and action queues" }
]

/* Task-based sessions with 10 colleagues at the company, original interface
   against the redesigned dashboard on the same tasks. Times are approximate
   averages. */
const testing = {
  stats: [
    { value: "20–30 s → ~8 s", label: "To locate and understand one day’s work and its data" },
    { value: "10 of 10", label: "Participants noticed and used the cash chart first" },
    { value: "10+ s → ~5 s", label: "To find a requested item in the left-hand list" }
  ],
  findings: [
    {
      title: "Faster access to daily data.",
      body: "On the original interface, locating and understanding a single day’s work and its related data took an average of 20–30 seconds. On the redesigned dashboard it took about 8 seconds, roughly 60–70% less. The chart became the strongest entry point: all 10 participants noticed and used it first."
    },
    {
      title: "Faster scanning of the list.",
      body: "Finding a requested item in the left-hand list took 10 seconds or more on the original design, because entries carried similar visual weight. After regrouping the content into clearer sections with a stronger hierarchy, the same kind of item was found in about 5 seconds. All 10 participants completed the task faster."
    }
  ]
}

const iteration = [
  { label: "01 · Initial hypothesis", title: "Color could make priorities clearer.", body: "The dashboard used similar colors and gave information similar visual weight. I first explored color changes to make the screen easier to scan." },
  { label: "02 · Early test", title: "Color changes had limited impact.", body: "The improvement I observed was limited, and feedback was mixed. I reconsidered whether the screen communicated what to read first." },
  { label: "03 · Revised decision", title: "Build the hierarchy through type and layout.", body: "I shifted to typography, text size and placement to establish clearer priorities. Color became a supporting cue within the hierarchy." }
]

const chartDecisions = [
  { title: "Cash movement", body: "A trend compares incoming and outgoing funds over the same period, with a shared currency and scale." },
  { title: "Settlement progress", body: "Batch completion sits beside the pending amounts and their cutoff times, making the next deadline visible." },
  { title: "Needs attention", body: "A short queue connects each exception to its priority, owner and next action." }
]

function Shot({ name, alt, width, height, label, caption, priority = false }) {
  return (
    <figure className={styles.shot}>
      <img src={media(name)} alt={alt} width={width} height={height}
        loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} />
      {(label || caption) && <figcaption>{label && <strong>{label}</strong>}{caption && <span>{caption}</span>}</figcaption>}
    </figure>
  )
}

export default function VortexNetPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track)} track={track} />
        <div className={styles.content}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>
                <span className={styles.pill}>Work experience</span>
                <span>Internal tool · Company of about 30 · 2025</span>
              </div>
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>VortexNet:<br />Finance dashboard.</h1>
              <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>Bringing daily finance information into focus through clearer hierarchy and task-based grouping.</p>
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>Role</dt><dd>UI/UX Design Intern</dd></div>
                <div><dt>Timeline</dt><dd>Jun – Oct 2025</dd></div>
                <div><dt>Platform</dt><dd>Internal desktop tool</dd></div>
              </dl>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>My scope</dt><dd>Information hierarchy and consolidation for Today&apos;s overview and its task-based navigation.</dd></div>
                <div><dt>Implemented</dt><dd>Today&apos;s overview and the adjacent sidebar navigation, tested inside the company and shipped during the internship.</dd></div>
                <div><dt>Shown here</dt><dd>Three stages side by side: the original tool, the build that shipped and was tested, and a later refinement made for this case study.</dd></div>
                <div><dt>Result</dt><dd>In task-based testing with 10 colleagues, locating a day&apos;s work dropped from 20–30 seconds to about 8.</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <a className={styles.action} href="#result">Compare before & after <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href="#iteration">Explore the decisions</a>
              </div>
            </div>
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <Shot name="dashboard-detail" priority width={2114} height={1722}
                alt="Refined dashboard detail with CNY cash totals, cash movement, settlement deadlines and an assigned work queue"
                caption="Today’s overview · Later refinement · Test data" />
            </div>
          </header>

          <nav className={styles.sectionNav} aria-label="Case study sections">
            <a href="#result">Redesign</a>
            <a href="#testing">Results</a>
            <a href="#start">Problem</a>
            <a href="#iteration">Design decisions</a>
            <a href="#navigation">Navigation</a>
            <a href="#reflection">Takeaways</a>
          </nav>

          <section id="result" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>The redesign</p>
              <h2>A starting point for daily decisions.</h2>
              <p className={styles.sectionLead}>The dashboard connects a cash summary, settlement progress and a prioritized work queue. Each view supports a different daily decision. Use the toggle to separate what shipped from what was refined later.</p>
            </div>
            <ScreenComparison />
            <div className={styles.deliveryScope} aria-label="Delivery scope">
              <article>
                <p className={styles.microLabel}>Implemented during the internship</p>
                <h3>Overview and task-based navigation.</h3>
                <p>I delivered Today&apos;s overview and the adjacent navigation that groups daily monitoring, reconciliation and reporting tasks.</p>
              </article>
              <article>
                <p className={styles.microLabel}>Outside my implemented scope</p>
                <h3>Downstream workflows.</h3>
                <p>The destination pages and their end-to-end workflows are not presented here as work I implemented.</p>
              </article>
              <article>
                <p className={styles.microLabel}>Refined afterward</p>
                <h3>Data clarity and action detail.</h3>
                <p>For this case study I later refined the metric definitions, cash chart, settlement schedule, owners and next actions, keeping the tool&apos;s test data. That version is the third toggle above, and none of it was part of what was tested.</p>
              </article>
            </div>
            <div className={styles.chartDecisions}>
              {chartDecisions.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
            </div>
            <div className={styles.statRow}>
              {outcomes.map((item) => <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}
            </div>
            <p className={styles.sourceNote}>VortexNet is a company of about 30 people, and this dashboard is where its operations and finance teams start the day. The overview and navigation were tested with 10 colleagues before they shipped; the results follow below. The internal tool itself cannot be shown, so all three screens are reconstructions drawn from recollection and filled with the tool&apos;s test data - the shipped one is the delivered scope as it went live, without the later refinements. The counts above describe the delivered structure rather than usage analytics.</p>
          </section>

          <section id="testing" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>User testing</p>
              <h2>Faster to the day&apos;s work, on the same tasks.</h2>
              <p className={styles.sectionLead}>Task-based sessions with 10 colleagues at the company compared the original interface with the build that shipped - the second toggle above - on the same tasks.</p>
            </div>
            <div className={styles.statRow}>
              {testing.stats.map((item) => <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}
            </div>
            <div className={styles.observations}>
              {testing.findings.map((item, index) => <article key={item.title}>
                <p className={styles.microLabel}>0{index + 1}</p><h3>{item.title}</h3><p>{item.body}</p>
              </article>)}
            </div>
            <p className={styles.sourceNote}>All 10 participants were colleagues who work with the tool. Times are approximate averages across them. Overall, the redesign made the key information visible immediately and cut the time spent scanning for it.</p>
          </section>

          <section id="start" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>The problem</p>
              <h2>Daily work competed with reports and administration.</h2>
              <p className={styles.sectionLead}>The existing structure grouped information by document type. A morning check required interpreting the menu and metric labels before deciding where to go.</p>
            </div>
            <div className={styles.observations}>
              {observations.map((item, index) => <article key={item.title}>
                <p className={styles.microLabel}>0{index + 1}</p><h3>{item.title}</h3><p>{item.body}</p>
              </article>)}
            </div>
          </section>

          <section id="iteration" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>A decision changed by testing</p>
              <h2>From color contrast to a clearer reading order.</h2>
              <p className={styles.sectionLead}>An early test changed my explanation of the problem and the direction of the next iteration.</p>
            </div>
            <ol className={styles.iterationSteps}>
              {iteration.map((step) => <li key={step.label}>
                <p className={styles.microLabel}>{step.label}</p><h3>{step.title}</h3><p>{step.body}</p>
              </li>)}
            </ol>
            <details id="surface" className={styles.disclosure}>
              <summary>Explore a metric-hierarchy study</summary>
              <div className={styles.disclosureBody}>
                <p className={styles.sectionLead}>This reconstruction illustrates the shift in visual emphasis: primary figures lead, and supporting metrics follow.</p>
                <div className={styles.compare}>
                  <Shot name="metrics-before" alt="Six equally weighted, abbreviated metric cells" width={1220} height={424} label="Before" caption="System abbreviations, equal visual weight." />
                  <Shot name="metrics-after" alt="Collections and Outflows as primary figures with four secondary metrics" width={1220} height={496} label="After" caption="Plain-language labels and a primary reading order." />
                </div>
              </div>
            </details>
          </section>

          <section id="categories" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Information consolidation</p>
              <h2>Organize around the work people arrive to do.</h2>
              <p className={styles.sectionLead}>I used task-based questions to regroup the information, then worked through priorities with product and data.</p>
            </div>
            <div className={styles.compare}>
              <Shot name="filed-by-type" alt="Existing information grouped by document type across Reports, Data center and Analysis" width={1220} height={422} label="Before" caption="Related daily information split across document categories." />
              <Shot name="asked-by-task" alt="The information organized around daily attention, period review and setup tasks" width={1220} height={500} label="After" caption="What needs attention? What changed over time? What needs setup?" />
            </div>

            <div id="priorities" className={styles.priorityBlock}>
              <div className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>Placement decision</p>
                  <h3>Daily checks get the landing screen.</h3>
                  <p>The working priority model linked each item to a team and a cadence. It informed the landing view and the navigation groups.</p>
                </div>
                <dl className={styles.reasoning}>
                  <div><dt>Design trade-off</dt><dd>Prioritizing monitoring gives periodic reports less prominence. Named reporting and admin groups keep those destinations available.</dd></div>
                </dl>
              </div>
              <div className={styles.tableWrap} role="region" aria-label="Information priority model" tabIndex={0}>
                <table className={styles.prioTable}>
                  <caption>Working priority model · Qualitative cadence, not usage analytics</caption>
                  <thead><tr><th scope="col">Information</th><th scope="col">Team</th><th scope="col">Cadence</th><th scope="col">Placement</th></tr></thead>
                  <tbody>{priorities.map((row) => <tr key={row.item}>
                    <th scope="row">{row.item}</th><td>{row.who}</td><td>{row.often}</td>
                    <td><span className={styles.placement} data-strong={row.strong ? "true" : undefined}>{row.place}</span></td>
                  </tr>)}</tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="navigation" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Information architecture</p>
              <h2>Three task groups. A separate admin entry.</h2>
              <p className={styles.sectionLead}>The reconstructed navigation has nine main entries grouped by task. Accounts, permissions, configuration and logs sit under Admin.</p>
            </div>
            <div className={styles.compare}>
              <Shot name="nav-before" alt="Fourteen navigation entries in a flat list" width={1220} height={976} label="Before" caption="Reports, operations and administration at one level." />
              <Shot name="nav-after" alt="Nine entries grouped into Monitor today, Reconcile and Review over time, with four separate admin destinations" width={1220} height={972} label="After" caption="Regrouped and consolidated, with administration separated." />
            </div>
            <details className={styles.disclosure}>
              <summary>Inspect the landing-screen hierarchy</summary>
              <div className={styles.disclosureBody}>
                <Shot name="region-after" alt="Net cash flow, Collections, Payouts and Pending settlement, with explicit CNY units and supporting context" width={1220} height={544}
                  label="After" caption="Four totals with distinct meanings: net cash flow, collections, payouts and pending settlement. Currency and supporting context stay visible." />
              </div>
            </details>
          </section>

          <section id="reflection" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>Takeaways</p>
              <h2>Start with the task, then shape the screen.</h2>
            </div>
            <div className={styles.reflectionGrid}>
              <article><p className={styles.microLabel}>What changed my approach</p><h3>Test the diagnosis early.</h3><p>Mixed feedback challenged my initial focus on color. It prompted me to reconsider the order and emphasis of the information itself.</p></article>
              <article><p className={styles.microLabel}>Working across teams</p><h3>Make priorities explicit.</h3><p>The priority model gave product, data and design a shared way to discuss which information belonged on the landing screen.</p></article>
              <article><p className={styles.microLabel}>What I would validate next</p><h3>Can people find the right action?</h3><p>Compare how operations and finance identify a settlement issue and open the relevant queue. Observe wrong turns, completion and hesitation.</p></article>
            </div>
          </section>
          <ProjectNav slug="vortexnet" track={track} styles={styles} />
        </div>
        <SiteFooter />
      </div>
    </main>
  )
}
