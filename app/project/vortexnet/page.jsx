import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { ScrollLink } from "../../../components/ScrollLink"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"
import ScreenComparison from "./ScreenComparison"
import styles from "./page.module.css"

// The overview and navigation shipped during the internship at a company of
// about 30 people. The screens are rebuilt for this case study on the tool's
// test data; the structural counts describe the delivered structure, not
// usage analytics.
export const metadata = {
  title: "VortexNet: Finance Dashboard",
  description: "Information hierarchy and consolidation for an internal finance dashboard at a 30-person company. Today's overview and its task-based navigation shipped during the internship; in testing with 10 colleagues, finding the day's work dropped from 20–30 seconds to about 8.",
  ...projectShareCard("vortexnet", {
    title: "VortexNet: Finance Dashboard",
    description:
      "Information hierarchy and consolidation for an internal finance dashboard at a 30-person company. Today's overview and its task-based navigation shipped during the internship; in testing with 10 colleagues, finding the day's work dropped from 20–30 seconds to about 8.",
    alt: "The VortexNet finance dashboard on a laptop"
  })
}

const media = (name) => "/vortexnet/media/" + name + ".webp"

/*
 * Every line of prose on the page, in both languages. The Chinese is the
 * author's own writing and leads; the English follows it section by
 * section, saying the same things in the same order with the same figures.
 * Both locales therefore reach the same markup below - only the strings
 * come from here.
 */
const copy = {
  en: {
    hero: {
      pill: "Work experience",
      context: "Internal tool · Company of about 30 · 2025",
      titleA: "VortexNet:",
      titleB: "Finance dashboard.",
      roleLabel: "Role",
      role: "UI/UX Design Intern",
      timelineLabel: "Timeline",
      timeline: "Jun – Oct 2025",
      platformLabel: "Platform",
      platform: "Internal desktop tool",
      scopeLabel: "My scope",
      scope: "The landing-screen navigation, and the information hierarchy and consolidation behind it",
      implementedLabel: "Implemented",
      implemented: "Both the landing screen and the sidebar navigation shipped during the internship",
      resultLabel: "Result",
      result: "In task-based testing with 10 colleagues, finding the day's work dropped from about 20–30 seconds to about 8",
      actionCompare: "Compare before & after",
      actionDecisions: "Design decisions",
      shotAlt: "Close-up of the landing screen: four CNY totals, the cash movement chart with its legend, the settlement schedule, and the first queue row with its next action"
    },
    result: {
      kicker: "04",
      heading: "High-fidelity redesign",
      subheading: "Opening the dashboard each morning now gives a clearer view of the work and the numbers",
      lead: "The landing screen shows the cash summary, settlement progress and a priority-ordered work queue at once. The toggle below compares the version that shipped with the one I refined afterward."
    },
    testing: {
      kicker: "05",
      heading: "User testing",
      subheading: "In the second round of testing, the same tasks took noticeably less time after the redesign.",
      lead: "I invited 10 colleagues to use the new interface and dashboard, gave them a set of tasks, and asked them some questions.",
      findings: [
        { title: "Find a failed event, then open one transaction inside it", body: "Finding the failed event in the left-hand menu and then opening one transaction's details went from 20–30 seconds to about 8." },
        { title: "Find a specified item in the left-hand list", body: "This went from about 10 seconds to about 5." },
        { body: "During testing we found that people who had used the old dashboard for a long time were a little out of their depth with the new one, and would go looking in the old places out of habit. We also tested one new user, who was clearly faster on the new dashboard. On that basis we think the change improved how the dashboard is used." }
      ]
    },
    start: {
      kicker: "01",
      heading: "User pain points",
      lead: "VortexNet is in internet finance, so its internal systems carry a great deal of data to work through. The work people handle every day sat in the same layer as reports and administration, and opening the tool in the morning did not get them to what they needed.",
      bullets: [
        { title: "A flat menu mixed different kinds of content together", body: "Fourteen entries put reports, operational queues and administration in one layer, which left people confused and made it hard to read." },
        { title: "Labels read as if written for the system", body: "Abbreviations like PEND_CNT are not suited to the people who have to read them." },
        { title: "The overview emphasized records", body: "In practice a transaction table filled the entire screen, with nothing setting out what needed handling." }
      ]
    },
    iteration: {
      kicker: "02",
      heading: "Design decisions",
      numbered: [
        { title: "The first hypothesis", body: "After talking it over with my teammates, we decided to start with color: adjust it across the different kinds of content and the different levels, and let color carry the hierarchy." },
        { title: "The early test", body: "The first round of testing involved 10 employees, and it showed that our first read was wrong. Color did not make the priority of the information clear, and because the overall text layout had not changed, people were no faster in the test." },
        { title: "The revised decision", body: "After discussing it with my teammates and my manager, we decided to look further into the information hierarchy, build the levels through type and layout, and add some charts to draw attention." }
      ],
      summary: "Explore a metric-hierarchy study",
      disclosureLead: "This reconstruction shows the shift in visual emphasis: the primary figures lead, and the supporting metrics follow.",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeAlt: "Six equally weighted metric cells with abbreviated names",
      afterAlt: "Collections and Outflows as primary figures with four secondary metrics"
    },
    categories: {
      heading: "Dividing the information hierarchy",
      lead: [
        "Dividing the information hierarchy needed more thought. We dropped the old scheme, which filed daily reports, monthly reports and confirmations together because they were the same kind of document.",
        "Our aim was to make people faster, so we watched which categories they opened first to check at the start of the day, and which ones mattered less. Those observations set the new division of the hierarchy."
      ],
      beforeLabel: "Before",
      afterLabel: "After",
      beforeAlt: "Existing information grouped by document type across Reports, Data center and Analysis",
      afterAlt: "The information reorganized into what to watch daily, what to review periodically, and what to set up"
    },
    navigation: {
      kicker: "Information architecture",
      heading: "Three task groups. A separate admin entry.",
      lead: "The reconstructed navigation has nine main entries grouped by task. Accounts, permissions, configuration and logs all sit under Admin.",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeAlt: "Fourteen navigation entries in a flat list",
      beforeCaption: "Reports, operations and administration at one level.",
      afterAlt: "Nine entries grouped into Monitor today, Reconcile and Review over time, with four separate admin destinations",
      afterCaption: "Regrouped and consolidated, with administration split out on its own.",
      summary: "Inspect the landing-screen hierarchy",
      regionAlt: "Net cash flow, Collections, Payouts and Pending settlement, with explicit CNY units and supporting context",
      regionCaption: "Four totals with distinct meanings: net cash flow, collections, payouts and pending settlement. Currency and supporting context stay on screen."
    },
    reflection: {
      kicker: "06",
      heading: "Constraints & trade-offs",
      lead: [
        "This design works within real operating constraints. In this iteration the data could not update in real time and came with some delay, so I think adding a timestamp was the best answer available.",
        "There are trade-offs in the navigation too. The grouping is clearer, but the locations differ from what people knew, and some of them needed longer to find things. I think that is still within a normal, manageable range.",
        "At the same time, a finance company moves a great deal of money and carries a great many numbers, and the information on the dashboard still looks fairly cluttered.",
        "Within a single day, the focus in the morning, at midday and in the evening is not the same. The current arrangement simplifies the morning to some degree, but it does not yet help much with afternoon work, or with tasks that come up unexpectedly."
      ]
    }
  },
  zh: {
    hero: {
      pill: "工作经历",
      context: "内部工具 · 约 30 人的公司 · 2025",
      titleA: "VortexNet：",
      titleB: "金融仪表盘",
      roleLabel: "角色",
      role: "UI/UX 设计实习生",
      timelineLabel: "周期",
      timeline: "2025 年 6 月–10 月",
      platformLabel: "平台",
      platform: "内部桌面工具",
      scopeLabel: "我负责的部分",
      scope: "首页导航栏以及信息层级和内容整合",
      implementedLabel: "已上线",
      implemented: "主页与侧栏导航均已在实习期上线",
      resultLabel: "结果",
      result: "在 10 位同事参与的任务测试中，找到当天要处理的工作从约 20–30 秒缩短到约 8 秒",
      actionCompare: "对比改版前后",
      actionDecisions: "设计决策",
      shotAlt: "落地页特写：四个标明人民币的总数、带图例的资金流动图、结算排期，以及队列第一行和它的下一步动作"
    },
    result: {
      kicker: "04",
      heading: "高保真改版",
      subheading: "每天打开仪表盘后会有更为清晰的待办和数据",
      lead: "首页同时显示资金汇总、结算进度和按优先级排列的待办队列。下方的切换可以对比上线版本与后期思考版。"
    },
    testing: {
      kicker: "05",
      heading: "用户测试",
      subheading: "第二轮用户测试中，完成同样的任务，改版后花费的时间明显缩短。",
      lead: "我邀请了 10 位同事使用新的视觉界面和仪表盘，让他们完成一些任务，并向他们提出了一些问题。",
      findings: [
        { title: "找到失败事件，并定位其中一笔交易的详情", body: "从左侧目录栏找到失败事件，再查看其中一笔交易的详情，耗时从 20–30 秒降到了约 8 秒。" },
        { title: "从左侧列表中找到指定条目", body: "耗时从约 10 秒降到了约 5 秒。" },
        { body: "测试过程中，我们发现，长期使用旧仪表盘的用户对新界面有些生疏，会习惯性地去旧的位置寻找内容。我们也测试了一名新用户，发现他使用新仪表盘时效率明显更高。因此，我们认为这次改动优化了仪表盘的使用体验。" }
      ]
    },
    start: {
      kicker: "01",
      heading: "用户痛点",
      lead: "由于VortexNet是互联网金融行业，内部系统有大量的数字与信息需要处理。员工每天要处理的工作，和报表、后台管理全挤在一层，早上打开工具后并不能及时获取信息。",
      bullets: [
        { title: "一个扁平菜单把不同的内容混在一起", body: "14 个入口把报表、运营队列和后台管理放在同一层，给人造成疑惑和阅读困难。" },
        { title: "标签更像写给系统看的", body: "像 PEND_CNT 这样的缩写并不适用于员工阅读。" },
        { title: "概览页强调的是记录", body: "实际上一张交易表占满了整个屏幕，没有单独列出需要处理的事项。" }
      ]
    },
    iteration: {
      kicker: "02",
      heading: "设计决策",
      numbered: [
        { title: "最初的假设", body: "与组员商讨后，我们一开始决定先调整不同内容、不同层级的颜色，用颜色来区分信息层级。" },
        { title: "早期测试", body: "第一轮用户测试找了 10 位员工参与，但我们发现，最初的判断有问题。颜色并没有把信息的优先级讲清楚，因为没有调整整体文字的布局，员工在测试中的效率也没有明显提高。" },
        { title: "调整后的决定", body: "在和组员及上司讨论后，我们决定进一步研究信息层级，通过字体和版面来建立层级，并增设一些可视化图表来吸引用户的注意。" }
      ],
      summary: "看看指标层级的研究",
      disclosureLead: "这张复原图说明视觉重心的变化：主要数字在前，辅助指标跟在后面。",
      beforeLabel: "改版前",
      afterLabel: "改版后",
      beforeAlt: "六个视觉重量相同、名字是缩写的指标格",
      afterAlt: "「收款」和「出账」作为主要数字，配四个次要指标"
    },
    categories: {
      heading: "信息层级的划分",
      lead: [
        "信息层级的划分需要更深入地思考。我们取消了原先将日报、月报和确认信息这类同类型内容放在一起的分类方式。",
        "我们的目的是提高用户的效率，所以我们观察了用户一天开始时会先点进哪些类别进行确认，以及哪些类别的优先级没有那么高。通过这些观察，我们确定了新的信息层级划分方式。"
      ],
      beforeLabel: "改版前",
      afterLabel: "改版后",
      beforeAlt: "原有信息按文档类型，分散在「报表」「数据中心」「分析」里",
      afterAlt: "信息按「每天要盯的」「阶段性回看的」「要设置的」重新组织"
    },
    navigation: {
      kicker: "信息架构",
      heading: "三个任务分组，后台单独一个入口",
      lead: "重建后的导航有 9 个主入口，按任务分组。账号、权限、配置和日志都收进「后台」。",
      beforeLabel: "改版前",
      afterLabel: "改版后",
      beforeAlt: "14 个导航入口排成一个扁平列表",
      beforeCaption: "报表、运营和后台管理都在同一层。",
      afterAlt: "9 个入口分成「今日监控」「对账」「回看趋势」，另有四个独立的后台入口",
      afterCaption: "重新分组、做了合并，后台管理单独拆出去。",
      summary: "细看落地页的层级",
      regionAlt: "净现金流、收款、出账和待结算，货币单位写明，配辅助上下文",
      regionCaption: "四个含义不同的总数：净现金流、收款、出账、待结算。货币单位和辅助信息一直留在画面上。"
    },
    reflection: {
      kicker: "06",
      heading: "限制与取舍",
      lead: [
        "这套设计受到真实运营条件的限制。在此次迭代中，数据还无法实时更新，会有一定的延迟，所以我认为增加时间戳是当前最好的处理办法。",
        "导航上也有取舍。虽然分组更加清晰，但位置与过往不同，有些用户反而需要花更多时间才能找到内容。我认为这还在正常、可控的范围内。",
        "同时，金融公司有大量的资金往来和数字，仪表盘上的信息仍然显得比较混乱。",
        "一天中，早上、中午和晚上的工作重点也不一样。现在的排布可以在一定程度上简化大家早上的工作流程，但对于下午的工作，或者临时插入的任务，还没有提供很好的帮助。"
      ]
    }
  }
}

function Shot({ name, alt, width, height, label, caption, priority = false }) {
  return (
    <figure className={styles.shot}>
      <img src={media(name)} alt={alt} width={width} height={height}
        loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} />
      {(label || caption) && <figcaption>{label && <strong>{label}</strong>}{caption && <span>{caption}</span>}</figcaption>}
    </figure>
  )
}

export default function VortexNetPage({ track = "uiux", locale = "en" }) {
  const t = copy[locale] || copy.en

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track, locale)} track={track} locale={locale} />
        {/* The hero animates itself on load (.reveal below); everything
            past it waits until it is scrolled to, so a reader meets each
            section as they reach it rather than finding it already
            played out. */}
        <Reveal fade={`.${styles.caseSection}`} />
        <div className={styles.content}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>
                <span className={styles.pill}>{t.hero.pill}</span>
                <span>{t.hero.context}</span>
              </div>
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>{t.hero.titleA}<br />{t.hero.titleB}</h1>
              {t.hero.lead && <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>{t.hero.lead}</p>}
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>{t.hero.roleLabel}</dt><dd>{t.hero.role}</dd></div>
                <div><dt>{t.hero.timelineLabel}</dt><dd>{t.hero.timeline}</dd></div>
                <div><dt>{t.hero.platformLabel}</dt><dd>{t.hero.platform}</dd></div>
              </dl>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>{t.hero.scopeLabel}</dt><dd>{t.hero.scope}</dd></div>
                <div><dt>{t.hero.implementedLabel}</dt><dd>{t.hero.implemented}</dd></div>
                {t.hero.shown && <div><dt>{t.hero.shownLabel}</dt><dd>{t.hero.shown}</dd></div>}
                <div><dt>{t.hero.resultLabel}</dt><dd>{t.hero.result}</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <ScrollLink className={styles.action} href="#result">{t.hero.actionCompare} <span aria-hidden="true">↓</span></ScrollLink>
                <ScrollLink className={styles.textLink} href="#iteration">{t.hero.actionDecisions}</ScrollLink>
              </div>
            </div>
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              {/* A close-up rather than the whole dashboard: at portfolio
                  width the full screen put the legend, the units and the
                  supporting notes below reading size. The complete screen is
                  in the comparison below. */}
              <Shot name="dashboard-detail" priority width={2074} height={1258}
                alt={t.hero.shotAlt}
                caption={t.hero.shotCaption} />
            </div>
          </header>

          <ProjectQuickNav slug="vortexnet" track={track} locale={locale} />

          <section id="start" className={`${styles.caseSection} ${t.start.bullets ? styles.proseSection : ""}`}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.start.kicker}</p>
              <h2>{t.start.heading}</h2>
              <p className={styles.sectionLead}>{t.start.lead}</p>
            </div>
            {t.start.observations && <div className={styles.observations}>
              {t.start.observations.map((item, index) => <article key={item.title}>
                <p className={styles.microLabel}>0{index + 1}</p><h3>{item.title}</h3><p>{item.body}</p>
              </article>)}
            </div>}
            {t.start.bullets && <ul className={styles.noteList}>
              {t.start.bullets.map((item) => <li key={item.title}>
                <span className={styles.noteMarker} aria-hidden="true">•</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
              </li>)}
            </ul>}
          </section>

          <section id="iteration" className={`${styles.caseSection} ${t.iteration.numbered ? styles.proseSection : ""}`}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.iteration.kicker}</p>
              <h2>{t.iteration.heading}</h2>
              {t.iteration.lead && <p className={styles.sectionLead}>{t.iteration.lead}</p>}
            </div>
            {t.iteration.steps && <ol className={styles.iterationSteps}>
              {t.iteration.steps.map((step) => <li key={step.label}>
                <p className={styles.microLabel}>{step.label}</p>{step.title && <h3>{step.title}</h3>}<p>{step.body}</p>
              </li>)}
            </ol>}
            {t.iteration.numbered && <ol className={styles.noteList}>
              {t.iteration.numbered.map((step, index) => <li key={step.title}>
                <span className={styles.noteMarker} aria-hidden="true">{index + 1}.</span>
                <div><h3>{step.title}</h3><p>{step.body}</p></div>
              </li>)}
            </ol>}
            <details id="surface" className={styles.disclosure}>
              <summary>{t.iteration.summary}</summary>
              <div className={styles.disclosureBody}>
                <p className={styles.sectionLead}>{t.iteration.disclosureLead}</p>
                <div className={styles.compare}>
                  <Shot name="metrics-before" alt={t.iteration.beforeAlt} width={1220} height={424} label={t.iteration.beforeLabel} caption={t.iteration.beforeCaption} />
                  <Shot name="metrics-after" alt={t.iteration.afterAlt} width={1220} height={496} label={t.iteration.afterLabel} caption={t.iteration.afterCaption} />
                </div>
              </div>
            </details>
          </section>

          <section id="categories" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              {t.categories.kicker && <p className={styles.kicker}>{t.categories.kicker}</p>}
              <h2>{t.categories.heading}</h2>
              {[].concat(t.categories.lead).map((lead) => <p className={styles.sectionLead} key={lead}>{lead}</p>)}
            </div>
            <div className={styles.compare}>
              <Shot name="filed-by-type" alt={t.categories.beforeAlt} width={1220} height={422} label={t.categories.beforeLabel} caption={t.categories.beforeCaption} />
              <Shot name="asked-by-task" alt={t.categories.afterAlt} width={1220} height={500} label={t.categories.afterLabel} caption={t.categories.afterCaption} />
            </div>

            {t.categories.priorities && <div id="priorities" className={styles.priorityBlock}>
              <div className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>{t.categories.placementLabel}</p>
                  <h3>{t.categories.placementTitle}</h3>
                  <p>{t.categories.placementBody}</p>
                </div>
                <dl className={styles.reasoning}>
                  <div><dt>{t.categories.tradeoffLabel}</dt><dd>{t.categories.tradeoffBody}</dd></div>
                </dl>
              </div>
              <div className={styles.tableWrap} role="region" aria-label={t.categories.tableAria} tabIndex={0}>
                <table className={styles.prioTable}>
                  <caption>{t.categories.tableCaption}</caption>
                  <thead><tr><th scope="col">{t.categories.columns.item}</th><th scope="col">{t.categories.columns.who}</th><th scope="col">{t.categories.columns.often}</th><th scope="col">{t.categories.columns.place}</th></tr></thead>
                  <tbody>{t.categories.priorities.map((row) => <tr key={row.item}>
                    <th scope="row">{row.item}</th><td>{row.who}</td><td>{row.often}</td>
                    <td><span className={styles.placement} data-strong={row.strong ? "true" : undefined}>{row.place}</span></td>
                  </tr>)}</tbody>
                </table>
              </div>
            </div>}
          </section>

          <section id="navigation" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.navigation.kicker}</p>
              <h2>{t.navigation.heading}</h2>
              <p className={styles.sectionLead}>{t.navigation.lead}</p>
            </div>
            <div className={styles.compare}>
              <Shot name="nav-before" alt={t.navigation.beforeAlt} width={1220} height={976} label={t.navigation.beforeLabel} caption={t.navigation.beforeCaption} />
              <Shot name="nav-after" alt={t.navigation.afterAlt} width={1220} height={972} label={t.navigation.afterLabel} caption={t.navigation.afterCaption} />
            </div>
            <details className={styles.disclosure}>
              <summary>{t.navigation.summary}</summary>
              <div className={styles.disclosureBody}>
                <Shot name="region-after" alt={t.navigation.regionAlt} width={1220} height={544}
                  label={t.navigation.afterLabel} caption={t.navigation.regionCaption} />
              </div>
            </details>
          </section>

          <section id="result" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.result.kicker}</p>
              <h2>{t.result.heading}</h2>
              {t.result.subheading && <h3 className={styles.sectionSubheading}>{t.result.subheading}</h3>}
              <p className={styles.sectionLead}>{t.result.lead}</p>
            </div>
            <ScreenComparison locale={locale} />
            {t.result.scopeCards && <div className={styles.deliveryScope} aria-label={t.result.scopeAria}>
              {t.result.scopeCards.map((card) => (
                <article key={card.title}>
                  <p className={styles.microLabel}>{card.label}</p>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>}
            {t.result.chartDecisions && <div className={styles.chartDecisions}>
              {t.result.chartDecisions.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
            </div>}
            {t.result.outcomes && <div className={styles.statRow}>
              {t.result.outcomes.map((item) => <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}
            </div>}
            {t.result.note && <p className={styles.sourceNote}>{t.result.note}</p>}
          </section>

          <section id="testing" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.testing.kicker}</p>
              <h2>{t.testing.heading}</h2>
              {t.testing.subheading && <h3 className={styles.sectionSubheading}>{t.testing.subheading}</h3>}
              <p className={styles.sectionLead}>{t.testing.lead}</p>
            </div>
            {t.testing.stats && <div className={styles.statRow}>
              {t.testing.stats.map((item) => <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}
            </div>}
            {t.testing.findings && <div className={styles.observations}>
              {t.testing.findings.map((item, index) => <article key={index}>
                <p className={styles.microLabel}>0{index + 1}</p>{item.title && <h3>{item.title}</h3>}<p>{item.body}</p>
              </article>)}
            </div>}
            {t.testing.note && <p className={styles.sourceNote}>{t.testing.note}</p>}
          </section>

          <section id="reflection" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.reflection.kicker}</p>
              <h2>{t.reflection.heading}</h2>
              {[].concat(t.reflection.lead || []).map((lead) => <p className={styles.sectionLead} key={lead}>{lead}</p>)}
            </div>
            {t.reflection.cards && <div className={styles.reflectionGrid}>
              {t.reflection.cards.map((card) => (
                <article key={card.title}><p className={styles.microLabel}>{card.label}</p><h3>{card.title}</h3><p>{card.body}</p></article>
              ))}
            </div>}
            {t.reflection.next && <p className={styles.sectionLead}>{t.reflection.next}</p>}
          </section>
          <ProjectNav slug="vortexnet" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
