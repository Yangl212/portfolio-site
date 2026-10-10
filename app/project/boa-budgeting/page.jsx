import CaseVideo from "../cleared/CaseVideo"
import { ImageCarousel } from "../../../components/ImageCarousel"
import { ScaledIframe } from "../../../components/ScaledIframe"
import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { ScrollLink } from "./ScrollLink"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"

import styles from "./page.module.css"

export const metadata = {
  title: "BOA: Budgeting Redesign",
  description:
    "An independent redesign of Bank of America's spending and budgeting flow: trace a total to its transactions, fix categories in bulk, and adjust a budget without restarting setup.",
  ...projectShareCard("boa-budgeting", {
    title: "BOA: Budgeting Redesign",
    description:
      "An independent redesign of Bank of America's spending and budgeting flow: trace a total to its transactions, fix categories in bulk, and adjust a budget without restarting setup.",
    alt: "The BOA budgeting redesign on a phone"
  })
}

const img = (hash) => `/framer-assets/images/${hash}`
const PROTOTYPE_SRC = "/boa/Spending%20Prototype%20(embeddable).html?v=20260915-1526"

const screenNumber = (src) => src.replace(/\D+/g, "")

function SectionHeader({ section }) {
  const leads = [].concat(section.lead || [])
  return (
    <div className={styles.sectionHeader}>
      {section.kicker && <p className={styles.kicker}>{section.kicker}</p>}
      <h2>{section.heading}</h2>
      {section.subheading && <h3 className={styles.sectionSubheading}>{section.subheading}</h3>}
      {leads.map((lead) => <p className={styles.sectionLead} key={lead}>{lead}</p>)}
    </div>
  )
}

/*
 * Every line of prose on the page, in both languages. Both are the
 * author's own text: the Chinese as written, the English translated from
 * it. A `lead` may be a list of paragraphs, and headings and one-line
 * leads carry no closing full stop.
 */
const copy = {
  en: {
    hero: {
      pill: "Independent case study",
      context: "Product · UI/UX · 2026",
      titleA: "BOA: Spending",
      titleB: "& budgeting",
      lead: "A user experience overhaul of the BOA app",
      roleLabel: "Role",
      role: "UI/UX Designer",
      timelineLabel: "Timeline",
      timeline: "8 weeks",
      platformLabel: "Platform",
      platform: "Mobile + Web",
      challengeLabel: "The challenge",
      challenge: "Simplify the existing flows and iterate on new product features",
      scopeLabel: "My scope",
      scope: "Research, flow analysis, wireframe simplification, mobile and web design",
      outcomeLabel: "Outcome",
      outcome: "Six testers took part. Unassisted budget reallocation rose from 2 to 5; median time to spot overspending fell from 41 to 24 seconds",
      actionPrototype: "Interact with the prototype",
      actionFlow: "See the key design decisions",
      videoLabel: "BOA preview: reallocate a category budget"
    },
    experience: {
      kicker: "01",
      heading: "Design decisions",
      lead: "Three key design decisions, plus one new feature",
      highlights: [
        { label: "01", title: "Income and spending trends on the home screen", body: "Cards on the home screen now show how income and spending have changed, so users can see the trend at a glance.", compare: [{ src: "/boa/media/home-before.webp", label: "Before", alt: "The original BOA home screen: a search bar, greeting and rewards rows, and banking details, with no sign of how balances are changing" }, { src: "/boa/media/home-poster.webp", label: "After", alt: "Redesigned BOA home screen with the total balance trend and a change line on each account card" }] },
        { label: "02", title: "Overspending on the spending page", body: "The spending page shows clearly which category is over budget, rather than just a dial of numbers.", compare: [{ src: "/boa/media/spending-before.webp", label: "Before", alt: "The original BOA spending page: a total spending dial and a category list, with nothing on the dial showing which category is over budget" }, { video: "spending-white", label: "After", alt: "Screen recording of the redesigned BOA spending chart, showing overspending by category" }] },
        { label: "03", title: "Comparing overspent categories", body: "For an overspent category, monthly spending can be compared side by side, viewed by month or by merchant.", video: "budget", alt: "Category spending view switching between merchant and monthly breakdowns" },
        { label: "04", title: "New feature: budget transfer", body: "Budget can be moved directly between two categories without changing the monthly total. On saving, you're asked whether the change applies to this month only.", video: "reallocate", alt: "Moving budget between two categories, with both limits visible" }
      ]
    },
    prototype: {
      kicker: "02",
      heading: "Interactive prototype",
      lead: "Click the phone on the right to try the clickable mobile prototype",
      steps: [
        { title: "Try the hover interaction on the dials on the Spending and Budgeting pages." },
        { title: "Try Edit Budget, Save Budget, and the new Relocate feature to move budget between categories." },
        { title: "Try the AI assistant in the top-right corner." },
        { title: "Try changing the category of a transaction." }
      ],
      tryMe: "Try me",
      frameTitle: "BOA spending and budgeting interactive prototype"
    },
    research: {
      kicker: "03",
      heading: "User pain points and market research",
      lead: [
        "These questions came from my own confusion with the BOA app. Looking into it, I found many people on Reddit were also confused by the Spending and Budget features in their accounts.",
        "To dig further, I ran a survey and collected 32 responses. Feedback centred on three problems:"
      ],
      problems: [
        { title: "A cluttered home screen", body: "Most users couldn't find the spending page from the home screen, which made the app hard to use." },
        { title: "Changing a category breaks the flow", body: "Some users said every category change interrupted what they were doing, so they had to start over." },
        { title: "Editing a budget takes too much effort", body: "Every budget change meant going through the whole process again." }
      ],
      after: "In response, I mapped the whole flow, simplified both the spending and budget flows, and built wireframes.",
      flowsSummary: "View before-and-after flows and all 15 wireframes",
      flowTitle: "Task flow comparison",
      beforeCaption: "Before / Reviewed flow",
      afterCaption: "After / Redesigned flow",
      openBeforeAria: (title) => "Open full-size original flow: " + title,
      openAfterAria: (title) => "Open full-size redesigned flow: " + title,
      openWireAria: (caption) => "Open full-size wireframe: " + caption,
      flows: [
        { title: "Track spending", current: img("0bc9cd759c554c1e5537ba810d083f5adf5d7f2c.png"), redesigned: img("aede7f6f2ddb4260fd295c2d97f190b4eff94b9b.png"), currentAlt: "Current BOA spending flow with hidden entry, lost context, and deep category editing", redesignedAlt: "Redesigned BOA spending flow with direct access, persistent filters, and quicker category editing" },
        { title: "Adjust a budget", current: img("b20b93f0cad89301c7262d4330c7e81176dfb5c7.png"), redesigned: img("39c57feb914fc1ec121c56f373082c9159d742e3.png"), currentAlt: "Current BOA budget flow with a long setup process", redesignedAlt: "Redesigned BOA budget flow with direct edits and category reallocation" }
      ],
      arcs: [
        {
          label: "Entry",
          screens: [
            { src: "/boa/low01.png", caption: "Accounts · spending in the list", alt: "Low-fidelity accounts screen with a spending summary sitting under the account list" },
            { src: "/boa/low02.png", caption: "Checking · one entry point", alt: "Low-fidelity checking account screen with this month's spending and a link into tracking" },
            { src: "/boa/low03.png", caption: "Transaction · category editable here", alt: "Low-fidelity transaction detail with an editable category row and a link to all spending in that category" }
          ]
        },
        {
          label: "Track spending",
          screens: [
            { src: "/boa/low04.png", caption: "Overview · filters pinned", alt: "Low-fidelity spending overview with month and category filters pinned above a category breakdown" },
            { src: "/boa/low05.png", caption: "Time range · month to year", alt: "Low-fidelity time range sheet offering month, quarter, and year" },
            { src: "/boa/low06.png", caption: "Category filter · all 16", alt: "Low-fidelity category filter sheet listing every category with spend against budget" },
            { src: "/boa/low07.png", caption: "Category · by merchant", alt: "Low-fidelity groceries detail broken down by merchant against the budget line" },
            { src: "/boa/low08.png", caption: "Same category · by month", alt: "Low-fidelity groceries detail broken down by month against the budget line" },
            { src: "/boa/low09.png", caption: "Transactions · filters intact", alt: "Low-fidelity groceries transaction list with the month and category filters still applied" },
            { src: "/boa/low10.png", caption: "Select · fix several at once", alt: "Low-fidelity transaction list in selection mode with two transactions checked and a recategorize action" },
            { src: "/boa/low11.png", caption: "Move to another category", alt: "Low-fidelity sheet moving the two selected transactions to Restaurants and Dining" }
          ]
        },
        {
          label: "Budget",
          screens: [
            { src: "/boa/low13.png", caption: "Budget · edit in place", alt: "Low-fidelity budget screen with plus and minus steppers on each category" },
            { src: "/boa/low14.png", caption: "Reallocate · take from, give to", alt: "Low-fidelity reallocation sheet moving twenty dollars between two categories with both new limits previewed" },
            { src: "/boa/low15.png", caption: "Save once, or from now on", alt: "Low-fidelity save sheet offering to save for August only or as an ongoing budget" },
            { src: "/boa/low16.png", caption: "Category · line moved, bars kept", alt: "Low-fidelity Restaurants and Dining detail showing the moved budget line and an undo action" }
          ]
        }
      ]
    },
    testing: {
      kicker: "04",
      heading: "Design and iteration",
      lead: "Both test rounds were completed by the same six participants",
      findings: [
        { title: "Budget reallocation was a clear success", body: "Every tester said the new feature made allocating budget easier, cutting out the repeated taps it used to take." },
        { title: "The spending chart changes also worked well", body: "Users could see straight away which category was over budget, and finished the task noticeably faster than before." },
        { title: "The AI assistant drew some negative feedback", body: "Moving its entry point to the top-right corner made it less prominent." }
      ]
    },
    web: {
      kicker: "05",
      heading: "Web adaptation",
      lead: "Desktop isn't just the interface scaled up: more information sits on a single page. The dashboard is richer, and it's easier for users to look things up.",
      carouselLabel: "BOA web adaptation screens",
      screenAlts: [
        "BOA web accounts home with total balance trend, account list, and August spending summary",
        "BOA web spending overview with category donut, budget bars, and a groceries breakdown by month and merchant",
        "BOA web cash flow view with net cash flow chart, month-by-month table, and a flow diagram of where the money went",
        "BOA web spending view with the assistant panel open, explaining why groceries is over budget"
      ],
      systemSummary: "View the visual system",
      systemAssets: [
        { src: img("96d21119e7c4078c307a63377b7d633dbe4d78c8.png"), alt: "BOA core color palette", label: "Core palette" },
        { src: img("f1f1b3fd3c6f921ab73524efa128d6b7f8c377e9.png"), alt: "BOA spending category color ramp", label: "Category ramp" },
        { src: img("9b785afb90f4467916a28a2f125a7a41e2d54699.png"), alt: "BOA typography specimen", label: "Typography" }
      ]
    },
    reflection: {
      heading: "Reflection",
      subheading: "Keep iterating on the AI assistant",
      lead: [
        "An AI assistant can help people a great deal in any app. In a complex app like BOA, users run into questions and don't know where to find things, which makes the assistant especially important.",
        "How to weigh what the AI says on each page, and how to weave it into the whole experience, matters a great deal. Next, I'll keep experimenting with the assistant's user experience."
      ],
      note: "Independent redesign concept. Not affiliated with Bank of America."
    }
  },
  zh: {
    hero: {
      pill: "独立案例",
      context: "产品 · UI/UX · 2026",
      titleA: "BOA：支出",
      titleB: "与预算",
      lead: "针对于BOA产品的用户体验优化",
      roleLabel: "角色",
      role: "UI/UX 设计师",
      timelineLabel: "周期",
      timeline: "8 周",
      platformLabel: "平台",
      platform: "移动端 + 网页",
      challengeLabel: "挑战",
      challenge: "将已有的流程进行简化，并迭代新的产品功能",
      scopeLabel: "我负责的部分",
      scope: "调研、流程分析、线框图简化、移动端和网页设计",
      outcomeLabel: "结果",
      outcome: "本次招募测试者共有6人。在没有提示的情况下完成预算重新分配的人从 2 位增加到 5 位；发现超支所需的中位时间从 41 秒降到 24 秒",
      actionPrototype: "与prototype交互",
      actionFlow: "了解核心设计决策",
      videoLabel: "BOA 预览：在分类之间重新分配预算"
    },
    experience: {
      kicker: "01",
      heading: "设计决策",
      lead: "整个设计包含三个重要的设计决策，以及一个新功能的迭代",
      highlights: [
        { label: "01", title: "首页的收支趋势", body: "在首页增设卡片的收支变化，让用户可以直接看到趋势。", compare: [{ src: "/boa/media/home-before.webp", label: "改版前", alt: "原版 BOA 首页：搜索栏、问候与奖励入口、银行账户信息，看不出余额的变化" }, { src: "/boa/media/home-poster.webp", label: "改版后", alt: "改版后的 BOA 首页：总余额趋势，以及每个账户卡片上的收支变化" }] },
        { label: "02", title: "花费页的超支展示", body: "在花费页清楚地展示哪个项目超支，而不仅仅是一个数字圆盘。", compare: [{ src: "/boa/media/spending-before.webp", label: "改版前", alt: "原版 BOA 花费页：总支出圆盘和分类列表，圆盘上看不出哪个分类超支" }, { video: "spending-white", label: "改版后", alt: "改版后 BOA 支出图表的录屏：按分类显示超支情况" }] },
        { label: "03", title: "超支项目的对比", body: "对于超支项目，可以更清楚地横向对比每月的开销，不仅能按月份查看，也能按消费商家查看。", video: "budget", alt: "分类支出视图在按商家和按月份两种拆分之间切换" },
        { label: "04", title: "新功能：预算转移", body: "预算可以在两个不同分类之间直接转移，无需修改月度预算总量。保存时，会询问这次调整是否只针对当前月份。", video: "reallocate", alt: "在两个分类之间转移预算，两边的额度都看得见" }
      ]
    },
    prototype: {
      kicker: "02",
      heading: "可交互原型",
      lead: "请点击右侧的手机，试用可点击的移动端原型",
      steps: [
        { title: "尝试 Spending 和 Budgeting 页面圆盘的 Hover 交互。" },
        { title: "尝试 Edit Budget、Save Budget，以及新功能 Relocate，在不同分类之间转移预算。" },
        { title: "尝试右上角的 AI 助手。" },
        { title: "尝试修改一笔 Transaction 的分类。" }
      ],
      tryMe: "Try me",
      frameTitle: "BOA 支出与预算的可交互原型"
    },
    research: {
      kicker: "03",
      heading: "用户痛点与市场调研",
      lead: [
        "这些问题来自我自己使用 BOA 时对操作流程的疑问。在查询中我发现 Reddit 上有很多人也对账户中的 Spending 和 Budget 功能感到困惑。",
        "出于此目的，我做了一份问卷调查，共收集到 32 份问卷。用户反馈主要集中在三个问题："
      ],
      problems: [
        { title: "首屏信息冗杂", body: "大部分用户觉得首页找不到花费页面在哪里，用起来很不方便。" },
        { title: "修改分类会打断流程", body: "一部分用户表示，每次修改分类都会打断当前流程，导致要重新再来一遍。" },
        { title: "修改预算很费劲", body: "每次修改预算，都要把整个流程重新做一遍。" }
      ],
      after: "对此，我整理了整个使用流程，简化了支出与预算两条流程，并制作了线框图。",
      flowsSummary: "查看改版前后的流程，以及全部 15 张线框",
      flowTitle: "任务流程对比",
      beforeCaption: "改版前 / 原有流程",
      afterCaption: "改版后 / 新流程",
      openBeforeAria: (title) => "打开原有流程的大图：" + title,
      openAfterAria: (title) => "打开新流程的大图：" + title,
      openWireAria: (caption) => "打开线框大图：" + caption,
      flows: [
        { title: "查看支出", current: img("0bc9cd759c554c1e5537ba810d083f5adf5d7f2c.png"), redesigned: img("aede7f6f2ddb4260fd295c2d97f190b4eff94b9b.png"), currentAlt: "现有 BOA 支出流程：入口很深、上下文丢失、改分类要钻很多层", redesignedAlt: "改版后的 BOA 支出流程：直接入口、筛选常驻、改分类更快" },
        { title: "调整预算", current: img("b20b93f0cad89301c7262d4330c7e81176dfb5c7.png"), redesigned: img("39c57feb914fc1ec121c56f373082c9159d742e3.png"), currentAlt: "现有 BOA 预算流程：一长串设置步骤", redesignedAlt: "改版后的 BOA 预算流程：可直接修改，也可在分类之间重新分配" }
      ],
      arcs: [
        {
          label: "入口",
          screens: [
            { src: "/boa/low01.png", caption: "账户 · 支出就在列表里", alt: "低保真账户页，账户列表下方带一个支出汇总" },
            { src: "/boa/low02.png", caption: "支票账户 · 一个入口", alt: "低保真支票账户页，显示本月支出并有一个进入追踪的链接" },
            { src: "/boa/low03.png", caption: "交易 · 分类在这里就能改", alt: "低保真交易详情，分类那一行可编辑，并有一个通往该分类全部支出的链接" }
          ]
        },
        {
          label: "查看支出",
          screens: [
            { src: "/boa/low04.png", caption: "概览 · 筛选常驻", alt: "低保真支出概览，月份和分类筛选钉在分类拆解上方" },
            { src: "/boa/low05.png", caption: "时间范围 · 从月到年", alt: "低保真时间范围面板，可选月、季、年" },
            { src: "/boa/low06.png", caption: "分类筛选 · 全部 16 个", alt: "低保真分类筛选面板，列出每个分类的花费与预算" },
            { src: "/boa/low07.png", caption: "分类 · 按商家看", alt: "低保真「食品杂货」详情，按商家拆分并对照预算线" },
            { src: "/boa/low08.png", caption: "同一分类 · 按月看", alt: "低保真「食品杂货」详情，按月份拆分并对照预算线" },
            { src: "/boa/low09.png", caption: "交易 · 筛选还在", alt: "低保真「食品杂货」交易列表，月份和分类筛选仍然生效" },
            { src: "/boa/low10.png", caption: "多选 · 一次改好几笔", alt: "低保真交易列表进入多选状态，勾了两笔并显示改分类的操作" },
            { src: "/boa/low11.png", caption: "挪到另一个分类", alt: "低保真面板，把选中的两笔交易挪到「餐饮」分类" }
          ]
        },
        {
          label: "预算",
          screens: [
            { src: "/boa/low13.png", caption: "预算 · 就地修改", alt: "低保真预算页，每个分类都有加减步进器" },
            { src: "/boa/low14.png", caption: "调剂 · 从哪拿，给到哪", alt: "低保真调剂面板，在两个分类之间挪 20 美元，两边的新额度都能预览" },
            { src: "/boa/low15.png", caption: "只存这次，还是从今往后", alt: "低保真保存面板，可选只对八月生效或作为长期预算" },
            { src: "/boa/low16.png", caption: "分类 · 预算线挪了，柱子没变", alt: "低保真「餐饮」详情，显示挪动后的预算线和一个撤销操作" }
          ]
        }
      ]
    },
    testing: {
      kicker: "04",
      heading: "设计与迭代",
      lead: "两轮测试均由同一组 6 位成员参与并完成",
      findings: [
        { title: "预算重新分配功能获得巨大成功", body: "每位测试者都表示新功能对于预算调配很有帮助，直接减少了分配时的多次点击。" },
        { title: "支出图表的调整也取得了很好的效果", body: "用户可以直接看到哪个项目超支，相比之前，完成任务所需的时间明显缩短。" },
        { title: "AI 助手功能的使用有一些反向的反馈", body: "因为移动了助手入口至右上角，导致权重降低。" }
      ]
    },
    web: {
      kicker: "05",
      heading: "网页端适配",
      lead: "桌面端并非只是简单地将界面放大，而是将更多信息放在同一个页面中。仪表盘更加丰富，也更方便用户查询资料。",
      carouselLabel: "BOA 网页端适配界面",
      screenAlts: [
        "BOA 网页端账户首页：总余额趋势、账户列表和八月支出汇总",
        "BOA 网页端支出概览：分类环形图、预算条，以及「食品杂货」按月份和商家的拆分",
        "BOA 网页端现金流视图：净现金流图表、逐月表格，以及一张钱去了哪里的流向图",
        "BOA 网页端支出视图，助手面板打开，解释「食品杂货」为什么超预算"
      ],
      systemSummary: "查看视觉系统",
      systemAssets: [
        { src: img("96d21119e7c4078c307a63377b7d633dbe4d78c8.png"), alt: "BOA 核心配色", label: "核心配色" },
        { src: img("f1f1b3fd3c6f921ab73524efa128d6b7f8c377e9.png"), alt: "BOA 支出分类色阶", label: "分类色阶" },
        { src: img("9b785afb90f4467916a28a2f125a7a41e2d54699.png"), alt: "BOA 字体样张", label: "字体" }
      ]
    },
    reflection: {
      heading: "反思",
      subheading: "继续迭代 AI 助手",
      lead: [
        "AI 助手可以在各类 App 中为用户提供很大的帮助。像 BOA 这类复杂的 App，用户在使用时会遇到疑问，也会不知道去哪里找内容，所以 AI 助手变得尤为重要。",
        "如何权衡 AI 在每一页给出的回应，以及如何让 AI 融入整个使用过程，是很重要的一件事。后续，我也会围绕 AI 助手的用户体验做更多尝试。"
      ],
      note: "独立的改版概念，与美国银行无关联。"
    }
  }
}

export default function UxCaseStudyPage({ track = "uiux", locale = "en" }) {
  const t = copy[locale] || copy.en
  const webScreens = t.web.screenAlts.map((alt, index) => ({ src: `/boa/web${index + 1}.png`, alt }))

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track, locale)} track={track} locale={locale} />
        <div className={styles.content}>
          <Reveal fade={[
            `.${styles.sectionHeader}`,
            `.${styles.highlightCard}`,
            `.${styles.prototypeSteps} li`,
            `.${styles.prototypeStage}`,
            `.${styles.problemGrid} article`,
            `.${styles.disclosure}`,
            `.${styles.flowCase}`,
            `.${styles.lowFiArc}`,
            `.${styles.webCarousel}`,
            `.${styles.systemGrid} figure`
          ].join(", ")} />
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
                <div><dt>{t.hero.challengeLabel}</dt><dd>{t.hero.challenge}</dd></div>
                <div><dt>{t.hero.scopeLabel}</dt><dd>{t.hero.scope}</dd></div>
                <div><dt>{t.hero.outcomeLabel}</dt><dd>{t.hero.outcome}</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <ScrollLink className={styles.action} href="#prototype">{t.hero.actionPrototype} <span aria-hidden="true">↓</span></ScrollLink>
                <ScrollLink className={styles.textLink} href="#experience">{t.hero.actionFlow}</ScrollLink>
              </div>
            </div>
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <CaseVideo src="/boa/media/reallocate-loop.mp4" poster="/boa/media/reallocate-poster.webp"
                width={720} height={1408} label={t.hero.videoLabel} priority />
            </div>
          </header>

          <ProjectQuickNav slug="boa-budgeting" track={track} locale={locale} />

          <section id="experience" className={styles.caseSection}>
            <SectionHeader section={t.experience} />
            <div className={styles.highlightList}>
              {t.experience.highlights.map((item) => (
                <article className={item.compare ? `${styles.highlightCard} ${styles.highlightCardCompare}` : styles.highlightCard} key={item.label}>
                  <div className={styles.highlightCopy}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  {item.video ? (
                    <CaseVideo className={styles.highlightVideo}
                      src={"/boa/media/" + item.video + "-loop.mp4"}
                      poster={"/boa/media/" + item.video + "-poster.webp"}
                      width={720} height={1408} label={item.alt} />
                  ) : (
                    <div className={styles.highlightCompare}>
                      {item.compare.map((shot) => (
                        <figure key={shot.label}>
                          {shot.video ? (
                            <CaseVideo className={styles.compareVideo}
                              src={"/boa/media/" + shot.video + "-loop.mp4"}
                              poster={"/boa/media/" + shot.video + "-poster.webp"}
                              width={720} height={1408} label={shot.alt} />
                          ) : (
                            <img src={shot.src} alt={shot.alt} width="720" height="1408" loading="lazy" />
                          )}
                          <figcaption>{shot.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="prototype" className={styles.caseSection}>
            <div className={styles.prototypeLayout}>
              <div className={styles.prototypeGuide}>
                <SectionHeader section={t.prototype} />
                <ol className={styles.prototypeSteps}>
                  {t.prototype.steps.map((step, index) => (
                    <li key={step.title}>
                      <span aria-hidden="true">0{index + 1}</span>
                      <p className={styles.prototypeStepPlain}>{step.title}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={styles.prototypeStage}>
                <div className={styles.tryMe} aria-hidden="true">
                  <span>{t.prototype.tryMe}</span>
                  <svg viewBox="0 0 76 52">
                    <path d="M4 8c25-5 29 27 61 30" />
                    <path d="m55 30 11 8-13 6" />
                  </svg>
                </div>
                <ScaledIframe className={styles.prototypeViewport} frameClassName={styles.prototypeFrame}
                  src={PROTOTYPE_SRC} title={t.prototype.frameTitle}
                  width={510} height={1000} maxDisplayWidth={440} transparent />
              </div>
            </div>
          </section>

          <section id="research" className={styles.caseSection}>
            <SectionHeader section={t.research} />
            <div className={styles.problemGrid}>
              {t.research.problems.map((item, index) => (
                <article key={item.title}>
                  <p className={styles.microLabel}>0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <p className={styles.sectionLead}>{t.research.after}</p>
            <details className={styles.disclosure}>
              <summary>{t.research.flowsSummary}</summary>
              <div className={styles.disclosureBody}>
                <div id="task-flows" className={styles.flowComparisons}>
                  <div className={styles.flowIntro}>
                    <h3>{t.research.flowTitle}</h3>
                  </div>
                  <div className={styles.flowList}>
                    {t.research.flows.map((flow) => (
                      <article className={styles.flowCase} key={flow.title}>
                        <h4>{flow.title}</h4>
                        <div className={styles.flowPair}>
                          <figure>
                            <figcaption>{t.research.beforeCaption}</figcaption>
                            <a href={flow.current} target="_blank" rel="noreferrer" aria-label={t.research.openBeforeAria(flow.title)}>
                              <img src={flow.current} alt={flow.currentAlt} loading="lazy" />
                            </a>
                          </figure>
                          <figure>
                            <figcaption>{t.research.afterCaption}</figcaption>
                            <a href={flow.redesigned} target="_blank" rel="noreferrer" aria-label={t.research.openAfterAria(flow.title)}>
                              <img src={flow.redesigned} alt={flow.redesignedAlt} loading="lazy" />
                            </a>
                          </figure>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                {t.research.arcs.map((arc) => (
                  <article className={styles.lowFiArc} key={arc.label}>
                    <div className={styles.flowIntro}><p className={styles.microLabel}>{arc.label}</p></div>
                    <div className={styles.lowFiScreens}>
                      {arc.screens.map((screen) => (
                        <figure key={screen.src}>
                          <a href={screen.src} target="_blank" rel="noreferrer" aria-label={t.research.openWireAria(screen.caption)}>
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
            <SectionHeader section={t.testing} />
            <div className={styles.problemGrid}>
              {t.testing.findings.map((item, index) => (
                <article key={item.title}>
                  <p className={styles.microLabel}>0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="web" className={styles.caseSection}>
            <SectionHeader section={t.web} />
            <ImageCarousel className={styles.webCarousel} label={t.web.carouselLabel} slides={webScreens} locale={locale} />
            <details className={styles.disclosure}>
              <summary>{t.web.systemSummary}</summary>
              <div className={styles.disclosureBody}>
                <div className={styles.systemGrid}>
                  {t.web.systemAssets.map((asset) => (
                    <figure key={asset.src}><figcaption>{asset.label}</figcaption><a href={asset.src} target="_blank" rel="noreferrer"><img src={asset.src} alt={asset.alt} loading="lazy" /></a></figure>
                  ))}
                </div>
              </div>
            </details>
          </section>

          <section className={styles.caseSection}>
            <SectionHeader section={t.reflection} />
            <p className={styles.sourceNote}>{t.reflection.note}</p>
          </section>
          <ProjectNav slug="boa-budgeting" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
