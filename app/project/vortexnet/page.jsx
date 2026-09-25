import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
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

/*
 * Every line of prose on the page, in both languages. The English is what
 * it has always been, lifted out of the JSX unchanged; the Chinese says
 * the same things in the same order - the same figures, the same hedges
 * ("approximate", "qualitative", "one employee cannot establish long-term
 * adoption"), the same scope boundaries. Layout, classes and structure
 * below are untouched; only the strings come from here.
 */
const copy = {
  en: {
    hero: {
      pill: "Work experience",
      context: "Internal tool · Company of about 30 · 2025",
      titleA: "VortexNet:",
      titleB: "Finance dashboard.",
      lead: "Bringing daily finance information into focus through clearer hierarchy and task-based grouping.",
      roleLabel: "Role",
      role: "UI/UX Design Intern",
      timelineLabel: "Timeline",
      timeline: "Jun – Oct 2025",
      platformLabel: "Platform",
      platform: "Internal desktop tool",
      scopeLabel: "My scope",
      scope: "Information hierarchy and consolidation for Today's overview and its task-based navigation.",
      implementedLabel: "Implemented",
      implemented: "Today's overview and the adjacent sidebar navigation, tested inside the company and shipped during the internship.",
      shownLabel: "Shown here",
      shown: "Three stages side by side: the original tool, the build that shipped and was tested, and a later refinement made for this case study.",
      resultLabel: "Result",
      result: "In task-based testing with 10 colleagues, locating a day's work dropped from 20–30 seconds to about 8.",
      actionCompare: "Compare before & after",
      actionDecisions: "Explore the decisions",
      shotAlt: "Close-up of the landing screen: four named CNY totals, the cash movement chart with its legend, the settlement schedule, and the first queue row with its next action",
      shotCaption: "Close-up of the landing screen · Later refinement · Test data · Full screen below"
    },
    result: {
      kicker: "The redesign",
      heading: "A starting point for daily decisions.",
      lead: "The dashboard connects a cash summary, settlement progress and a prioritized work queue. Each view supports a different daily decision. Use the toggle to separate what shipped from what was refined later.",
      scopeAria: "Delivery scope",
      scopeCards: [
        { label: "Implemented during the internship", title: "Overview and task-based navigation.", body: "I delivered Today's overview and the adjacent navigation that groups daily monitoring, reconciliation and reporting tasks." },
        { label: "Outside my implemented scope", title: "Downstream workflows.", body: "The destination pages and their end-to-end workflows are not presented here as work I implemented." },
        { label: "Refined afterward", title: "Data clarity and action detail.", body: "For this case study I later refined the metric definitions, cash chart, settlement schedule, owners and next actions, keeping the tool's test data. That version is the third toggle above, and none of it was part of what was tested." }
      ],
      chartDecisions: [
        { title: "Cash movement", body: "A trend compares incoming and outgoing funds over the same period, with a shared currency and scale." },
        { title: "Settlement progress", body: "Batch completion sits beside the pending amounts and their cutoff times, making the next deadline visible." },
        { title: "Needs attention", body: "A short queue connects each exception to its priority, owner and next action." }
      ],
      outcomes: [
        { value: "14 → 9", label: "Main navigation entries, before and after" },
        { value: "3 groups", label: "Monitor today · Reconcile · Review over time" },
        { value: "4 metrics", label: "Named summaries alongside context and action queues" }
      ],
      note: "VortexNet is a company of about 30 people, and this dashboard is where its operations and finance teams start the day. The overview and navigation were tested with 10 colleagues before they shipped; the results follow below. The internal tool itself cannot be shown, so all three screens are reconstructions drawn from recollection and filled with the tool's test data - the shipped one is the delivered scope as it went live, without the later refinements. The counts above describe the delivered structure rather than usage analytics."
    },
    testing: {
      kicker: "User testing",
      heading: "Faster to the day's work, on the same tasks.",
      lead: "Task-based sessions with 10 colleagues at the company compared the original interface with the build that shipped - the second toggle above - on the same tasks.",
      stats: [
        { value: "20–30 s → ~8 s", label: "Daily information lookup, approximate task summary" },
        { value: "10+ s → ~5 s", label: "Requested item in the left-hand list, approximate task summary" },
        { value: "Qualitative", label: "Participants appeared to grasp the overall data trend more quickly" }
      ],
      findings: [
        { title: "Testing everyday lookup tasks.", body: "I tested the dashboard with ten colleagues who used the internal tool. I timed lookup tasks in the original and redesigned interfaces, including finding Pending settlement and locating Trend in the left-hand navigation. Participants were asked to locate a specified data item or section. Timing started when I gave the task instruction and ended when the participant opened the correct page. I checked that they had reached the intended destination before marking the task complete." },
        { title: "Recorded lookup times improved.", body: "The recorded summaries showed that finding the day’s information took roughly 20–30 seconds in the original interface and about eight seconds in the redesign. Finding a requested item in the left-hand list fell from more than ten seconds to around five. These are approximate task-summary figures; some existing users initially took longer to find relocated items." },
        { title: "Trend understanding was an observation.", body: "I also observed that participants appeared to grasp the overall data trend more quickly. This was a qualitative observation, separate from the timed lookup results." }
      ],
      note: "The findings supported clearer labels, stronger typography and task-based grouping, with color as a supporting cue. Because these changes were introduced together, the results reflect the combined redesign rather than any single visual change."
    },
    start: {
      kicker: "The problem",
      heading: "Daily work competed with reports and administration.",
      lead: "The existing structure grouped information by document type. A morning check required interpreting the menu and metric labels before deciding where to go.",
      observations: [
        { title: "A flat menu mixed different jobs.", body: "Fourteen entries put reports, operational queues and administration at the same level." },
        { title: "Labels reflected the system.", body: "Abbreviations such as PEND_CNT required interpretation before someone could act." },
        { title: "The overview emphasized records.", body: "A dense transaction table dominated the screen, without a dedicated list of items needing attention." }
      ]
    },
    iteration: {
      kicker: "A decision changed by testing",
      heading: "From color contrast to a clearer reading order.",
      lead: "An early test changed my explanation of the problem and the direction of the next iteration.",
      steps: [
        { label: "01 · Initial hypothesis", title: "Color could make priorities clearer.", body: "The dashboard used similar colors and gave information similar visual weight. I first explored color changes to make the screen easier to scan." },
        { label: "02 · Early test", title: "Color changes had limited impact.", body: "The improvement I observed was limited, and feedback was mixed. I reconsidered whether the screen communicated what to read first." },
        { label: "03 · Revised decision", title: "Build the hierarchy through type and layout.", body: "I shifted to typography, text size and placement to establish clearer priorities. Color became a supporting cue within the hierarchy." }
      ],
      summary: "Explore a metric-hierarchy study",
      disclosureLead: "This reconstruction illustrates the shift in visual emphasis: primary figures lead, and supporting metrics follow.",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeAlt: "Six equally weighted, abbreviated metric cells",
      beforeCaption: "System abbreviations, equal visual weight.",
      afterAlt: "Collections and Outflows as primary figures with four secondary metrics",
      afterCaption: "Plain-language labels and a primary reading order."
    },
    categories: {
      kicker: "Information consolidation",
      heading: "Organize around the work people arrive to do.",
      lead: "I used task-based questions to regroup the information, then worked through priorities with product and data.",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeAlt: "Existing information grouped by document type across Reports, Data center and Analysis",
      beforeCaption: "Related daily information split across document categories.",
      afterAlt: "The information organized around daily attention, period review and setup tasks",
      afterCaption: "What needs attention? What changed over time? What needs setup?",
      placementLabel: "Placement decision",
      placementTitle: "Daily checks get the landing screen.",
      placementBody: "I asked colleagues what they checked first when starting their daily work. Their feedback shaped the priority model below and the order of information on the dashboard.",
      tradeoffLabel: "Design trade-off",
      tradeoffBody: "Prioritizing monitoring gives periodic reports less prominence. Named reporting and admin groups keep those destinations available.",
      tableAria: "Information priority model",
      tableCaption: "Working priority model · Qualitative cadence, not usage analytics",
      columns: { item: "Information", who: "Team", often: "Cadence", place: "Placement" },
      priorities: [
        { item: "Awaiting settlement", who: "Operations", often: "Every morning", place: "Landing screen", strong: true },
        { item: "Failed items", who: "Operations", often: "Every morning", place: "Landing screen", strong: true },
        { item: "Reconciliation queue", who: "Finance", often: "Daily", place: "Direct entry" },
        { item: "Daily / monthly reports", who: "Finance", often: "Weekly", place: "Reporting group" },
        { item: "Accounts, permissions, logs", who: "Data team", often: "Occasional", place: "Separate admin" }
      ]
    },
    navigation: {
      kicker: "Information architecture",
      heading: "Three task groups. A separate admin entry.",
      lead: "The reconstructed navigation has nine main entries grouped by task. Accounts, permissions, configuration and logs sit under Admin.",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeAlt: "Fourteen navigation entries in a flat list",
      beforeCaption: "Reports, operations and administration at one level.",
      afterAlt: "Nine entries grouped into Monitor today, Reconcile and Review over time, with four separate admin destinations",
      afterCaption: "Regrouped and consolidated, with administration separated.",
      summary: "Inspect the landing-screen hierarchy",
      regionAlt: "Net cash flow, Collections, Payouts and Pending settlement, with explicit CNY units and supporting context",
      regionCaption: "Four totals with distinct meanings: net cash flow, collections, payouts and pending settlement. Currency and supporting context stay visible."
    },
    reflection: {
      kicker: "Constraints & trade-offs",
      heading: "Designing within operational constraints.",
      cards: [
        { label: "Data freshness", title: "Show when the data was updated.", body: "The dashboard could not refresh continuously. After colleagues explained the update cycle, I added an “As of” timestamp so users could judge how current the figures were." },
        { label: "Team input", title: "Let daily work set the order.", body: "I asked users what they checked first each morning, then placed their highest-priority information at the top. The hierarchy reflected their working routine." },
        { label: "Navigation trade-off", title: "Clearer groups, unfamiliar locations.", body: "Existing users found top-level categories faster, but some initially took longer to find relocated items. One new hire, with little familiarity with the old menu, found items considerably faster in the redesign. I interpreted this as a possible adjustment cost; one employee cannot establish long-term adoption." }
      ],
      next: "Next, I would follow returning users over time and consider familiar terminology or temporary navigation cues to ease the transition."
    }
  },
  zh: {
    hero: {
      pill: "工作经历",
      context: "内部工具 · 约 30 人的公司 · 2025",
      titleA: "VortexNet：",
      titleB: "金融仪表盘。",
      lead: "我重新整理了信息层级和导航，让每天要看的数据更容易找到。",
      roleLabel: "角色",
      role: "UI/UX 设计实习生",
      timelineLabel: "周期",
      timeline: "2025 年 6 月–10 月",
      platformLabel: "平台",
      platform: "内部桌面工具",
      scopeLabel: "我负责的部分",
      scope: "「今日概览」、按任务分组的导航，以及信息层级和内容整合。",
      implementedLabel: "已上线",
      implemented: "「今日概览」和旁边的侧栏导航，在公司内部测过，实习期间上线。",
      shownLabel: "这里展示的",
      shown: "这里并排展示三个阶段：原版、经过测试并上线的版本，以及后来为案例展示补做的精修版。",
      resultLabel: "结果",
      result: "在 10 位同事参与的任务测试中，找到当天要处理的工作从约 20–30 秒缩短到约 8 秒。",
      actionCompare: "对比改版前后",
      actionDecisions: "看看当时的决策",
      shotAlt: "落地页特写：四个标明人民币的总数、带图例的资金流动图、结算排期，以及队列第一行和它的下一步动作",
      shotCaption: "落地页特写 · 后期精修版 · 测试数据 · 完整界面见下方"
    },
    result: {
      kicker: "改版",
      heading: "每天打开工具后，先从这里开始。",
      lead: "首页同时显示资金汇总、结算进度和按优先级排列的待办队列。上方的切换可以对比上线版本与后来的精修版。",
      scopeAria: "交付范围",
      scopeCards: [
        { label: "实习期间已实现", title: "概览页和任务式导航。", body: "我交付了「今日概览」，并把每日监控、对账和报表按任务重新分组。" },
        { label: "不在我的实现范围内", title: "后续页面与完整流程。", body: "导航指向的页面及其完整流程不属于我的实现范围。" },
        { label: "后来补做的精修", title: "数据表达和操作细节。", body: "整理这个案例时，我又调整了指标命名、资金图表、结算排期、负责人和下一步操作。数据仍是工具自带的测试数据，这个版本没有参加当时的测试。" }
      ],
      chartDecisions: [
        { title: "资金流动", body: "一条趋势线对比同一时间段里的进账和出账，货币和刻度统一。" },
        { title: "结算进度", body: "批次完成情况放在待结算金额和截止时间旁边，下一个节点不用再到别处找。" },
        { title: "需要处理", body: "一条短队列，把每个异常和它的优先级、负责人、下一步动作连起来。" }
      ],
      outcomes: [
        { value: "14 → 9", label: "主导航入口，改版前后" },
        { value: "3 组", label: "今日监控 · 对账 · 回看趋势" },
        { value: "4 个指标", label: "有明确名字的汇总，配上下文和待办队列" }
      ],
      note: "VortexNet 是一家约 30 人的公司，运营和财务团队每天都会从这个仪表盘开始工作。概览页和导航上线前，我和 10 位同事做了测试，结果见下方。由于内部工具不能公开，这三屏都是根据记忆重建、并填入工具自带测试数据的复原图。上线版本对应我当时实际交付的范围，不含后来的精修。上面的数字描述的是信息结构，不是产品使用数据。"
    },
    testing: {
      kicker: "用户测试",
      heading: "同样的任务，改版后找得更快。",
      lead: "我请公司里的 10 位同事完成同一组查找任务，对比原界面和上线版本，也就是上面的第二个切换项。",
      stats: [
        { value: "20–30 秒 → 约 8 秒", label: "日常信息查找，任务层面的大致汇总" },
        { value: "10 秒以上 → 约 5 秒", label: "在左侧列表里找指定项，任务层面的大致汇总" },
        { value: "定性观察", label: "参与者似乎更快看懂了整体数据走向" }
      ],
      findings: [
        { title: "测试内容是日常查找。", body: "10 位参与者平时都会使用这套内部工具。他们分别在原界面和改版界面完成查找任务，包括找到「待结算」，以及从左侧导航进入「趋势」。计时从任务说明结束开始，到打开正确页面为止；我确认到达目标后，才把任务记为完成。" },
        { title: "查找时间缩短了。", body: "在原界面找到当天的信息大约需要 20–30 秒，改版后约为 8 秒。在左侧导航里找指定项目，也从 10 秒以上缩短到约 5 秒。不过，有些老用户一开始反而花了更久，因为熟悉的位置变了。" },
        { title: "理解趋势只是一项定性观察。", body: "我还观察到，参与者似乎能更快抓住整体数据走向。这项观察没有单独计时，不能和前面的查找结果混为一谈。" }
      ],
      note: "这轮结果支持我继续使用更直白的标签、明确的字体层级和按任务分组的导航，并让颜色只做辅助提示。所有改动是一起测试的，所以结果只能说明整套方案有效，不能归功于其中某一个视觉调整。"
    },
    start: {
      kicker: "问题",
      heading: "每天要处理的工作，和报表、后台管理全挤在一层。",
      lead: "原导航按文档类型分组。早上打开工具后，得先弄懂菜单和指标缩写，才知道该去哪里。",
      observations: [
        { title: "一个扁平菜单把不同的活混在一起。", body: "14 个入口把报表、运营队列和后台管理放在同一层。" },
        { title: "标签更像写给系统看的。", body: "像 PEND_CNT 这样的缩写，用户得先在脑子里翻译一遍，才能知道它指什么。" },
        { title: "概览页强调的是记录。", body: "一张密密麻麻的交易表占满屏幕，没有单独列出需要处理的事项。" }
      ]
    },
    iteration: {
      kicker: "被测试改掉的一个决定",
      heading: "一开始我在调颜色，后来发现真正的问题是阅读顺序。",
      lead: "一次早期测试让我重新判断问题，也改变了下一轮迭代的方向。",
      steps: [
        { label: "01 · 最初的假设", title: "我以为调颜色就能讲清优先级。", body: "原仪表盘的颜色很接近，各类信息的视觉重量也差不多。我最先尝试调整配色，希望页面更容易扫读。" },
        { label: "02 · 早期测试", title: "改颜色的作用有限。", body: "我看到的改善不多，反馈也不一致。于是我回头想：这屏到底有没有说清楚该先看哪里。" },
        { label: "03 · 调整后的决定", title: "用字体和版面来建立层级。", body: "我转向用字体、字号和位置来立优先级，颜色退回去当辅助提示。" }
      ],
      summary: "看看指标层级的研究",
      disclosureLead: "这张复原图说明视觉重心的变化：主要数字在前，辅助指标跟在后面。",
      beforeLabel: "改版前",
      afterLabel: "改版后",
      beforeAlt: "六个视觉重量相同、名字是缩写的指标格",
      beforeCaption: "系统缩写，视觉重量一样。",
      afterAlt: "「收款」和「出账」作为主要数字，配四个次要指标",
      afterCaption: "标签说人话，阅读顺序有主次。"
    },
    categories: {
      kicker: "信息整合",
      heading: "导航应该按任务分组，而不是按文档类型分组。",
      lead: "我先用用户要完成的任务重新整理信息，再和产品、数据同事一起确认优先级。",
      beforeLabel: "改版前",
      afterLabel: "改版后",
      beforeAlt: "原有信息按文档类型，分散在「报表」「数据中心」「分析」里",
      beforeCaption: "每天要一起看的信息，被拆进了不同的文档分类。",
      afterAlt: "信息按「每天要盯的」「阶段性回看的」「要设置的」重新组织",
      afterCaption: "有什么要处理？这段时间变了什么？有什么要设置？",
      placementLabel: "位置上的决定",
      placementTitle: "每天都要看的，放落地页。",
      placementBody: "我问同事每天开始工作时最先看什么，再根据回答整理出下面这张优先级表，并确定首页的信息顺序。",
      tradeoffLabel: "设计上的取舍",
      tradeoffBody: "把监控放前面，周期性报表就没那么显眼了。报表和后台各自留了有名字的分组，入口还在。",
      tableAria: "信息优先级模型",
      tableCaption: "在用的优先级模型 · 频次是定性判断，不是使用数据",
      columns: { item: "信息", who: "团队", often: "频次", place: "位置" },
      priorities: [
        { item: "待结算", who: "运营", often: "每天早上", place: "落地页", strong: true },
        { item: "失败项", who: "运营", often: "每天早上", place: "落地页", strong: true },
        { item: "对账队列", who: "财务", often: "每天", place: "独立入口" },
        { item: "日报 / 月报", who: "财务", often: "每周", place: "报表分组" },
        { item: "账号、权限、日志", who: "数据团队", often: "偶尔", place: "单独的后台" }
      ]
    },
    navigation: {
      kicker: "信息架构",
      heading: "三个任务分组，后台单独一个入口。",
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
      kicker: "限制与取舍",
      heading: "这套设计也受真实运营条件限制。",
      cards: [
        { label: "数据新鲜度", title: "把更新时间写出来。", body: "仪表盘做不到持续刷新。同事讲清更新周期之后，我加了一个「截至」时间戳，让人自己判断数字有多新。" },
        { label: "团队的意见", title: "按每天的工作顺序来排。", body: "我问用户每天早上最先看什么，再把最常用、最急的信息放到上面。这个层级来自他们真实的工作顺序。" },
        { label: "导航上的取舍", title: "分组更清楚了，位置却变陌生了。", body: "老用户找顶层分类更快了，但有些人一开始反而要花更久，才能找到被挪走的东西。一位新同事几乎没用过旧菜单，在改版里找东西明显更快。我把这理解成可能存在的适应成本；一个人的表现说明不了长期的接受度。" }
      ],
      next: "如果继续做下去，我会跟踪老用户一段时间，也会考虑保留他们熟悉的叫法，或加入临时导航提示，降低改版初期的适应成本。"
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
              <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>{t.hero.lead}</p>
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>{t.hero.roleLabel}</dt><dd>{t.hero.role}</dd></div>
                <div><dt>{t.hero.timelineLabel}</dt><dd>{t.hero.timeline}</dd></div>
                <div><dt>{t.hero.platformLabel}</dt><dd>{t.hero.platform}</dd></div>
              </dl>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>{t.hero.scopeLabel}</dt><dd>{t.hero.scope}</dd></div>
                <div><dt>{t.hero.implementedLabel}</dt><dd>{t.hero.implemented}</dd></div>
                <div><dt>{t.hero.shownLabel}</dt><dd>{t.hero.shown}</dd></div>
                <div><dt>{t.hero.resultLabel}</dt><dd>{t.hero.result}</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <a className={styles.action} href="#result">{t.hero.actionCompare} <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href="#iteration">{t.hero.actionDecisions}</a>
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

          <section id="result" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.result.kicker}</p>
              <h2>{t.result.heading}</h2>
              <p className={styles.sectionLead}>{t.result.lead}</p>
            </div>
            <ScreenComparison />
            <div className={styles.deliveryScope} aria-label={t.result.scopeAria}>
              {t.result.scopeCards.map((card) => (
                <article key={card.title}>
                  <p className={styles.microLabel}>{card.label}</p>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
            <div className={styles.chartDecisions}>
              {t.result.chartDecisions.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
            </div>
            <div className={styles.statRow}>
              {t.result.outcomes.map((item) => <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}
            </div>
            <p className={styles.sourceNote}>{t.result.note}</p>
          </section>

          <section id="testing" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.testing.kicker}</p>
              <h2>{t.testing.heading}</h2>
              <p className={styles.sectionLead}>{t.testing.lead}</p>
            </div>
            <div className={styles.statRow}>
              {t.testing.stats.map((item) => <article key={item.value}><strong>{item.value}</strong><span>{item.label}</span></article>)}
            </div>
            <div className={styles.observations}>
              {t.testing.findings.map((item, index) => <article key={item.title}>
                <p className={styles.microLabel}>0{index + 1}</p><h3>{item.title}</h3><p>{item.body}</p>
              </article>)}
            </div>
            <p className={styles.sourceNote}>{t.testing.note}</p>
          </section>

          <section id="start" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.start.kicker}</p>
              <h2>{t.start.heading}</h2>
              <p className={styles.sectionLead}>{t.start.lead}</p>
            </div>
            <div className={styles.observations}>
              {t.start.observations.map((item, index) => <article key={item.title}>
                <p className={styles.microLabel}>0{index + 1}</p><h3>{item.title}</h3><p>{item.body}</p>
              </article>)}
            </div>
          </section>

          <section id="iteration" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.iteration.kicker}</p>
              <h2>{t.iteration.heading}</h2>
              <p className={styles.sectionLead}>{t.iteration.lead}</p>
            </div>
            <ol className={styles.iterationSteps}>
              {t.iteration.steps.map((step) => <li key={step.label}>
                <p className={styles.microLabel}>{step.label}</p><h3>{step.title}</h3><p>{step.body}</p>
              </li>)}
            </ol>
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
              <p className={styles.kicker}>{t.categories.kicker}</p>
              <h2>{t.categories.heading}</h2>
              <p className={styles.sectionLead}>{t.categories.lead}</p>
            </div>
            <div className={styles.compare}>
              <Shot name="filed-by-type" alt={t.categories.beforeAlt} width={1220} height={422} label={t.categories.beforeLabel} caption={t.categories.beforeCaption} />
              <Shot name="asked-by-task" alt={t.categories.afterAlt} width={1220} height={500} label={t.categories.afterLabel} caption={t.categories.afterCaption} />
            </div>

            <div id="priorities" className={styles.priorityBlock}>
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
            </div>
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

          <section id="reflection" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.reflection.kicker}</p>
              <h2>{t.reflection.heading}</h2>
            </div>
            <div className={styles.reflectionGrid}>
              {t.reflection.cards.map((card) => (
                <article key={card.title}><p className={styles.microLabel}>{card.label}</p><h3>{card.title}</h3><p>{card.body}</p></article>
              ))}
            </div>
            <p className={styles.sectionLead}>{t.reflection.next}</p>
          </section>
          <ProjectNav slug="vortexnet" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
