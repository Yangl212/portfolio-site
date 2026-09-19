import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import ScreenComparison from "./ScreenComparison"
import styles from "./page.module.css"

// The dashboard is a portfolio refinement of the internship case, using mock data.
// Structural counts describe these exhibits, not measured production outcomes.
export const metadata = {
  title: "VortexNet finance dashboard · Lele Yang",
  description: "Information hierarchy and consolidation for an internal finance dashboard. A partially shipped internship project with a user-test decision story and a portfolio refinement using mock data."
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
  { value: "14 → 9", label: "Main navigation entries in the reconstructed designs" },
  { value: "3 groups", label: "Monitor today · Reconcile · Review over time" },
  { value: "4 metrics", label: "Named summaries alongside context and action queues" }
]

const iteration = [
  { label: "01 · Initial hypothesis", title: "Color could make priorities clearer.", body: "The dashboard used similar colors and gave information similar visual weight. I first explored color changes to make the screen easier to scan." },
  { label: "02 · One user test", title: "Color changes had limited impact.", body: "The improvement I observed was limited, and feedback was mixed. I reconsidered whether the screen communicated what to read first." },
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
              <div className={styles.eyebrow}>
                <span className={styles.pill}>Work experience</span>
                <span>Internal tool · Information design · 2025</span>
              </div>
              <h1>VortexNet:<br />Finance dashboard.</h1>
              <p className={styles.heroLead}>Bringing daily finance information into focus through clearer hierarchy and task-based grouping.</p>
              <dl className={styles.meta}>
                <div><dt>Role</dt><dd>UI/UX Design Intern</dd></div>
                <div><dt>Timeline</dt><dd>Jun – Oct 2025</dd></div>
                <div><dt>Platform</dt><dd>Internal desktop tool</dd></div>
              </dl>
              <dl className={styles.heroFacts}>
                <div><dt>My scope</dt><dd>Information hierarchy and consolidation, working with product and data teams.</dd></div>
                <div><dt>Delivery</dt><dd>Partially shipped.</dd></div>
                <div><dt>Shown here</dt><dd>A portfolio refinement using mock data.</dd></div>
              </dl>
              <div className={styles.actions}>
                <a className={styles.action} href="#result">Compare before & after <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href="#iteration">Explore the decisions</a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <Shot name="dashboard-detail" priority width={2114} height={1722}
                alt="Refined dashboard detail with CNY cash totals, cash movement, settlement deadlines and an assigned work queue"
                caption="Portfolio refinement · Mock data" />
            </div>
          </header>

          <nav className={styles.sectionNav} aria-label="Case study sections">
            <a href="#result">Redesign</a>
            <a href="#start">Problem</a>
            <a href="#iteration">Design decisions</a>
            <a href="#navigation">Navigation</a>
            <a href="#reflection">Takeaways</a>
          </nav>

          <section id="result" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>The redesign</p>
              <h2>A starting point for daily decisions.</h2>
              <p className={styles.sectionLead}>The refined dashboard connects a cash summary, settlement progress and a prioritized work queue. Each view supports a different daily decision.</p>
            </div>
            <ScreenComparison />
            <div className={styles.chartDecisions}>
              {chartDecisions.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
            </div>
            <div className={styles.statRow}>
              {outcomes.map((item) => <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}
            </div>
            <p className={styles.sourceNote}>These counts describe the illustrated structure, not measured performance.</p>
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
              <p className={styles.sectionLead}>A user test changed my explanation of the problem and the direction of the next iteration.</p>
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
                  <div><dt>The trade-off</dt><dd>Prioritizing monitoring gives periodic reports less prominence. Named reporting and admin groups keep those destinations available.</dd></div>
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
