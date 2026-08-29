import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import boaCover from "../../../pic/Cover1.png"

import styles from "./page.module.css"

const img = (hash) => `/framer-assets/images/${hash}`

const stats = [
  {
    letter: "A",
    pct: "63%",
    text: "Experienced filters or selections resetting",
    color: "rgba(247, 235, 140, 0.6)",
    height: 220
  },
  {
    letter: "B",
    pct: "70%",
    text: "Struggled to find spending insights",
    color: "rgba(212, 180, 240, 0.55)",
    height: 270
  },
  {
    letter: "C",
    pct: "67%",
    text: "Found category correction time-consuming",
    color: "rgba(220, 220, 220, 0.7)",
    height: 245
  },
  {
    letter: "D",
    pct: "57%",
    text: "Were unsure how spending totals were calculated",
    color: "rgba(190, 215, 247, 0.6)",
    height: 190
  },
  {
    letter: "E",
    pct: "73%",
    text: "Found monthly budget adjustments inflexible",
    color: "rgba(247, 205, 205, 0.6)",
    height: 290
  }
]

const findings = [
  {
    label: "Finding 1",
    heading: "Spending insights are hard to find",
    trail: ["Dashboard / Home", "Spending tile", "Spending & Budgeting", "Spending breakdown / chart"],
    images: [
      img("7cc447fec1f9f1da0f4e8091d30c30af48d0d08e.png"),
      img("d59a8cd44cd61d826da75a5ab426fcf10f0e339c.png"),
      img("c8dfbe72f1e665534b7f5ed5229aa8f12509d42e.png"),
      img("59ed31c26d3d085dcaafc250dd0ee18d1f09fdc2.png")
    ]
  },
  {
    label: "Finding 2",
    heading: "Category management is slow and repetitive",
    trail: ["Dashboard", "Spending", "Transactions", "Transaction", "Category"],
    images: [
      img("7ffd6ce86989488819a352e6689f26fe35c67d8f.png"),
      img("f89101c55f4503a4337f4b8f7a2c481654b30c14.png"),
      img("36f6bc5800f68813cbd6b313a5de4fff1d8c9003.png"),
      img("cd9ffe63e31966b9a20afdfc606268dca6b960d2.png"),
      img("9beacd49671a0f307ab63532f1d417d94df6118d.png")
    ]
  },
  {
    label: "Finding 3",
    heading: "Filters and selections don't persist",
    trail: ["Spending", "Dining", "Transaction", "Back"],
    images: [
      img("c1f7f388e9aeec1f2026c8d3f28a11cb080d4456.png"),
      img("a3bb5525571e00ec61f95181887af00e210a304a.png"),
      img("aa1a3d5c5444ce74851cc08b102945bf55a67e21.png"),
      img("2c3bff046d39113851e69475e1ba404d8ddcab99.png"),
      img("1c45a93dc700809867df9558a072c86553b979e0.png")
    ]
  },
  {
    label: "Finding 4",
    heading: "Spending totals are difficult to verify",
    trail: ["Dashboard", "Spending", "Spending Summary / Monthly Spending & Account", "Transactions / Activity"],
    images: [
      img("b349e130594b3ea5342dfa774917d7cf582cc812.png"),
      img("c24ac4f06ae8d8c4c5cac63826d0a062c9947051.png"),
      img("f56eefd7f2af4a27cfce010a20761e1d28ae6400.png"),
      img("1cb4d0c09115de3c8d446417c07d246b754e9463.png")
    ]
  },
  {
    label: "Finding 5",
    heading: "Monthly budgets are difficult to adjust flexibly",
    trail: [
      "Spending Overview",
      "Budget",
      "Edit Budget",
      "Confirm Income",
      "Choose Budget Starting Point",
      "Set Up Fixed Spending",
      "Set Up Flexible Spending",
      "Save Changes"
    ],
    images: [
      img("cbfc946217894fd03b412b05a3796251631012e2.png"),
      img("de5bc73904db121c089b15140b1f15ee9b2e2059.png"),
      img("baeb6df966190efb5fc0d732a2630c428b2a2214.png"),
      img("da89f08732b9354d09acc4d9db52d92a6db2040f.png"),
      img("13ebd6303ee8c5dc2a7e9592828de8b5c1af75c4.png"),
      img("2a8c39f97ac3be3075871710b3f3939c61d8df68.png")
    ]
  }
]

const competitors = [
  {
    name: "Chase",
    points: [
      "Flexible time range selection - Users can easily switch between monthly, quarterly, yearly, and custom spending views.",
      "Simple and flexible budget management - Budgets can be quickly adjusted by category, with real-time visibility into how much has already been spent."
    ],
    images: [img("438abe3d779a1f660f49cab1fbb9aece40d8519c.png")]
  },
  {
    name: "Monarch Money",
    points: [
      "Flexible budget reallocation - Users can move budget amounts between categories without changing the total monthly budget.",
      "Clear cash flow visualization - Provides an intuitive view of income, expenses, and spending patterns through clear charts and categories."
    ],
    images: [img("45e99e584cc4a14b08c68139c91fd2fdadd0aee2.png"), img("247c59aaebfb325568a13a5be52b0b1e6df850fc.png")]
  },
  {
    name: "Copilot Money",
    points: [
      "Smart transaction categorization - Copilot learns from users' corrections to improve how future transactions are categorized.",
      "Fast transaction review and editing - Users can quickly review transactions and correct categories without navigating through multiple screens."
    ],
    images: [img("3406b8c92ce751377fab91c137d2caa97d0c1c5e.png")]
  }
]

const takeaways = [
  {
    tag: "ACCESS",
    tone: "access",
    heading: "Make spending insights easier to access and verify",
    body: "Surface key spending information earlier and connect spending totals directly to the transactions behind them."
  },
  {
    tag: "CONTROL",
    tone: "control",
    heading: "Give users more control over categories",
    body: "Make incorrect categories easier to identify and correct, while allowing the system to learn from users' changes over time."
  },
  {
    tag: "CONTINUITY",
    tone: "continuity",
    heading: "Preserve users' context throughout the spending flow",
    body: "Keep selected filters, categories, and time ranges when users move between spending views and transaction details."
  },
  {
    tag: "FLEXIBILITY",
    tone: "flexibility",
    heading: "Make budgeting easier to adapt to real-life changes",
    body: "Allow users to quickly adjust or reallocate category budgets as monthly spending needs change."
  }
]

const usabilityPoints = [
  "Category editing is more efficient",
  "Spending flow feels clearer and easier to follow",
  "Budget reallocation is useful, but the interaction should feel more intuitive",
  "Some screens still need clearer visual hierarchy",
  "The redesign should stay close to BOA's current layout to reduce the learning curve"
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
            <div className={`${styles.heroEyebrow} ${styles.reveal}`}>
              <span className={styles.heroPill}>Professional Work</span>
              <span>UI/UX Design · 2026</span>
            </div>

            <header className={styles.hero}>
              <h1 className={`${styles.heroTitle} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
                BOA: Budgeting Redesign
              </h1>

              <div className={`${styles.heroImage} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
                <img src={boaCover.src} alt="BOA spending and budgeting redesign cover" />
              </div>

              <p className={`${styles.lead} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
                Redesigning BOA&rsquo;s spending and budgeting experience to make money management simpler,
                clearer, and more flexible.
              </p>

              <div className={`${styles.heroDetails} ${styles.reveal}`} style={{ animationDelay: "200ms" }}>
                <dl className={styles.heroFacts}>
                  <div>
                    <dt>The problem</dt>
                    <dd>Spending data is buried across screens.</dd>
                  </div>
                  <div>
                    <dt>What I did</dt>
                    <dd>Research, IA, and a budget flow end to end.</dd>
                  </div>
                  <div>
                    <dt>The outcome</dt>
                    <dd>A simpler, clearer, and more flexible budgeting flow.</dd>
                  </div>
                </dl>

                <dl className={styles.heroMeta}>
                  <div>
                    <dt>Role</dt>
                    <dd>UI/UX Designer</dd>
                  </div>
                  <div>
                    <dt>Scope</dt>
                    <dd>Research · UX · UI · Prototype</dd>
                  </div>
                  <div>
                    <dt>Platform</dt>
                    <dd>Mobile + Web</dd>
                  </div>
                  <div>
                    <dt>Timeline</dt>
                    <dd>8 weeks</dd>
                  </div>
                </dl>
              </div>
            </header>

          </div>

          <div className={styles.bodyContent}>
            <section className={styles.section}>
              <h3 className={styles.kicker}>Background</h3>
              <h2 className={styles.heading}>I found many BOA users experiencing similar app issues.</h2>
              <div className={styles.imageFull}>
                <img src={img("aa2ba4021ed8c8dfbb35ea59a4cc6dd57175099f.png")} alt="Background research overview" />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Overview</h3>
              <h2 className={styles.heading}>Making BOA spending &amp; budgeting simpler to manage</h2>
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <p className={styles.tagPill} data-tone="neutral">WHAT</p>
                  <p className={styles.body}>Redesigning Bank of America&rsquo;s Spending &amp; Budgeting experience.</p>
                </div>
                <div className={styles.metaItem}>
                  <p className={styles.tagPill} data-tone="focus">FOCUS</p>
                  <p className={styles.body}>Improving spending insights, transaction categories, and budget management.</p>
                </div>
                <div className={styles.metaItem}>
                  <p className={styles.tagPill} data-tone="goal">GOAL</p>
                  <p className={styles.body}>Make the experience simpler, clearer, and more flexible.</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Research</h3>
              <h2 className={styles.heading}>Online Survey</h2>
              <p className={styles.body}>
                I shared a short online survey on Reddit to gather feedback from BOA app users and identify common
                issues with spending and budgeting.
              </p>
              <p className={styles.sampleSize}>n = 32 BOA users</p>
              <div className={styles.statBars}>
                {stats.map((stat) => (
                  <div
                    className={styles.statBar}
                    key={stat.letter}
                    style={{ "--bar-height": `${stat.height}`, "--stat-color": stat.color }}
                  >
                    <p className={styles.statPct}>{stat.pct}</p>
                  </div>
                ))}
              </div>
              <div className={styles.statCaptions}>
                {stats.map((stat) => (
                  <p className={styles.statText} key={stat.letter}>
                    {stat.text}
                  </p>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Interview</h3>
              <h2 className={styles.heading}>I interviewed two BOA users and identified several common pain points</h2>
              <p className={styles.body}>
                Spending features were hard to find, categories were sometimes inaccurate, editing took too many
                steps, spending totals were unclear, and budget adjustments felt complicated.
              </p>
              <div className={styles.imageFull}>
                <img src={img("32e5aee7ec9b38447e93967b911aa3777d108cfb.png")} alt="Interview findings summary" />
              </div>
            </section>

            {findings.map((finding) => (
              <section className={styles.section} key={finding.label}>
                <h3 className={styles.kicker}>Current Experience</h3>
                <h2 className={styles.heading}>{finding.heading}</h2>
                <p className={styles.trail}>{finding.trail.join(" - ")}</p>
                <div className={styles.mockGrid} data-count={finding.images.length}>
                  {finding.images.map((src) => (
                    <div className={styles.mockFrame} key={src}>
                      <img src={src} alt={`${finding.heading} screen`} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className={styles.section}>
              <h3 className={styles.kicker}>Desktop Spending Flow</h3>
              <div className={styles.imageFull}>
                <img src={img("5a0510c48028614ffc675d307cd8676b6821918b.png")} alt="Desktop spending flow" />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Desktop Budget Flow</h3>
              <div className={styles.imageFull}>
                <img src={img("ec4b9ccb965cb7db84dd9d86003fc4b02ad7e85f.png")} alt="Desktop budget flow" />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Competitive Analysis</h3>
              <h2 className={styles.heading}>
                I researched other competing products on the market and compared their strengths to identify useful
                features and design opportunities.
              </h2>

              {competitors.map((competitor) => (
                <div className={styles.competitor} key={competitor.name}>
                  <p className={styles.competitorName}>{competitor.name}</p>
                  <ul className={styles.competitorList}>
                    {competitor.points.map((point) => (
                      <li className={styles.body} key={point}>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.competitorImages} data-count={competitor.images.length}>
                    {competitor.images.map((src) => (
                      <div className={styles.competitorFrame} key={src}>
                        <img src={src} alt={`${competitor.name} product screenshot`} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Key Takeaways</h3>
              <div className={styles.takeawayGrid}>
                {takeaways.map((takeaway) => (
                  <div className={styles.takeawayItem} key={takeaway.tag}>
                    <p className={styles.takeawayTag} data-tone={takeaway.tone}>{takeaway.tag}</p>
                    <h4 className={styles.takeawayHeading}>{takeaway.heading}</h4>
                    <p className={styles.body}>{takeaway.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={`${styles.kicker} ${styles.kickerStatic}`}>User Flow</h3>
              <h2 className={styles.heading}>Current Track Spending Flow</h2>
              <div className={`${styles.imageFull} ${styles.imageFullBleed}`}>
                <img src={img("0bc9cd759c554c1e5537ba810d083f5adf5d7f2c.png")} alt="Current track spending flow" />
              </div>
              <h2 className={styles.heading}>Current Budget Flow</h2>
              <div className={`${styles.imageFull} ${styles.imageFullBleed}`}>
                <img src={img("b20b93f0cad89301c7262d4330c7e81176dfb5c7.png")} alt="Current budget flow" />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={`${styles.kicker} ${styles.kickerStatic}`}>Redesigned User Flow</h3>
              <h2 className={styles.heading}>Redesigned Track Spending Flow</h2>
              <div className={`${styles.imageFull} ${styles.imageFullBleed}`}>
                <img src={img("aede7f6f2ddb4260fd295c2d97f190b4eff94b9b.png")} alt="Redesigned track spending flow" />
              </div>
              <h2 className={styles.heading}>Redesigned Budget Flow</h2>
              <div className={`${styles.imageFull} ${styles.imageFullBleed}`}>
                <img src={img("39c57feb914fc1ec121c56f373082c9159d742e3.png")} alt="Redesigned budget flow" />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Current Design System</h3>

              <h2 className={styles.heading}>Core palette</h2>
              <div className={styles.imageFull}>
                <img src={img("96d21119e7c4078c307a63377b7d633dbe4d78c8.png")} alt="Core color palette" />
              </div>

              <h2 className={styles.heading}>Category ramp</h2>
              <div className={styles.imageFull}>
                <img src={img("f1f1b3fd3c6f921ab73524efa128d6b7f8c377e9.png")} alt="Category color ramp" />
              </div>

              <h2 className={styles.heading}>Typography</h2>
              <div className={styles.imageFull}>
                <img src={img("9b785afb90f4467916a28a2f125a7a41e2d54699.png")} alt="Typography specimen" />
              </div>

              <p className={styles.microLabel}>WEIGHTS</p>
              <div className={styles.imageFull}>
                <img src={img("eb9b394fbfd2232fa0d631c69d819e743164a901.png")} alt="Typography weights" />
              </div>

              <p className={styles.microLabel}>NUMERALS</p>
              <div className={styles.imageFull}>
                <img src={img("4a77257b6d5a54a844800ad7e4f3b2915b7fddfb.png")} alt="Numeral styles" />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Prototype</h3>
              <h2 className={styles.heading}>App low-fidelity</h2>
              <div className={styles.protoGrid}>
                <div className={styles.protoItem}>
                  <p className={styles.microLabel}>Entry</p>
                  <img src={img("4c316b96f56fb495ac82508190968b3b10cab06f.png")} alt="App low-fidelity entry screens" />
                </div>
                <div className={styles.protoItem}>
                  <p className={styles.microLabel}>Track Spending</p>
                  <img src={img("ef14fa26529a70d0b6532be91a35a0e55856a13b.png")} alt="App low-fidelity track spending screens" />
                </div>
                <div className={styles.protoItem}>
                  <p className={styles.microLabel}>Budget</p>
                  <img src={img("1b9110f8e883b603d3c739b4e2e2d171587e7ac6.png")} alt="App low-fidelity budget screens" />
                </div>
              </div>

              <h2 className={styles.heading}>Web low-fidelity</h2>
              <div className={styles.webLoFiGrid}>
                {[
                  "50441351fc96dc2fe2bc8edbf508599e70e80bfb.png",
                  "124628209e616bf68b8177680ec4f6f2122f5094.png",
                  "49c54da30cac0e41e632264a1fb566d91e9de6d2.png",
                  "439246a730dfebc3f7384cf9a3ef5af796fbf492.png",
                  "5c9fd527a037e2c2310eeaa722c6b7160fce587c.png"
                ].map((hash) => (
                  <div className={styles.webLoFiFrame} key={hash}>
                    <img src={img(hash)} alt="Web low-fidelity screen" />
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Usability Testing</h3>
              <h2 className={styles.heading}>I asked several BOA users to test the low-fi prototype and share feedback</h2>
              <p className={styles.microLabel}>Key Point:</p>
              <ul className={styles.usabilityList}>
                {usabilityPoints.map((point) => (
                  <li className={styles.body} key={point}>
                    {point}
                  </li>
                ))}
              </ul>
              <p className={styles.body}>
                Based on this feedback, I refined the final high-fidelity design and created a web version for
                further testing and iteration. The experience was continuously polished to improve clarity,
                consistency, and usability.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>High-fidelity</h3>
              <h2 className={styles.heading}>Mobile</h2>
              <div className={styles.protoGrid}>
                <div className={styles.protoItem}>
                  <p className={styles.microLabel}>Entry</p>
                  <img src={img("c0bf9090252ffed50f1a0f6e30faad2cfa1ba75c.png")} alt="High-fidelity mobile entry screens" />
                </div>
                <div className={styles.protoItem}>
                  <p className={styles.microLabel}>Track Spending</p>
                  <img src={img("a96f52fde2f46c05197ef3fa6aed241c516c7ce5.png")} alt="High-fidelity mobile track spending screens" />
                </div>
                <div className={styles.protoItem}>
                  <p className={styles.microLabel}>Budget</p>
                  <img src={img("c4e71817e7a3d8acd01dba2645799e98a9d514f3.png")} alt="High-fidelity mobile budget screens" />
                </div>
              </div>

              <h2 className={styles.heading}>Web</h2>
              <div className={styles.webGallery}>
                {[
                  "578bded2b16b649445c5a6cc10148de4b028299a.png",
                  "d4485ee34a100a5f9cebf1cddbaaa8ab03b4d746.png",
                  "b1dc4b580e7bd01533520ec3dd5ea78546576240.png",
                  "89c8c58356c212b9d0f3aa4be030ae4941d47f87.png",
                  "d810dded2e769c21f8db7ba27d76722e94a3c37d.png"
                ].map((hash) => (
                  <div className={styles.imageFull} key={hash}>
                    <img src={img(hash)} alt="High-fidelity web screen" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
