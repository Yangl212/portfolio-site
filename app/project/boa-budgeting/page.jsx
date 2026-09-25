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

const researchStats = [
  { key: "reset", pct: "63%", color: "rgba(247, 235, 140, 0.78)" },
  { key: "insights", pct: "69%", color: "rgba(212, 180, 240, 0.72)" },
  { key: "correction", pct: "66%", color: "rgba(210, 210, 210, 0.82)" },
  { key: "inflexible", pct: "72%", color: "rgba(247, 205, 205, 0.78)" }
]

const screenNumber = (src) => src.replace(/\D+/g, "")

/*
 * Every line of prose on the page, in both languages. The English is
 * unchanged, lifted out of the JSX as it stood; the Chinese keeps every
 * figure and every limit intact - the small directional study, the
 * practice effects, the exploratory assistant comparison, and the note
 * that this is not affiliated with Bank of America.
 */
const copy = {
  en: {
    hero: {
      pill: "Independent case study",
      context: "Product · UI/UX · 2026",
      titleA: "BOA: Spending",
      titleB: "& budgeting.",
      lead: "Understand the spending. Correct the details. Adjust the plan.",
      roleLabel: "Role",
      role: "UI/UX Designer",
      timelineLabel: "Timeline",
      timeline: "8 weeks",
      platformLabel: "Platform",
      platform: "Mobile + Web",
      challengeLabel: "The challenge",
      challenge: "Connect spending totals, category corrections and budget adjustments in one continuous flow.",
      scopeLabel: "My scope",
      scope: "Research, flow analysis, wireframes, mobile and web UI, and an interactive prototype.",
      outcomeLabel: "Outcome",
      outcome: "Budget reallocation rose from 2 of 6 to 5 of 6 unassisted; median time to spot overspending fell from 41 to 24 seconds.",
      actionPrototype: "Try the prototype",
      actionFlow: "See the core flow",
      videoLabel: "BOA preview: reallocate a category budget"
    },
    experience: {
      kicker: "01 / The core experience",
      heading: "From a spending total to a decision.",
      lead: "Each part of the flow pairs a visible interface change with the decision it helps someone make: find the issue, trace its source, then adjust the plan.",
      highlights: [
        { label: "01 / Understand", title: "See which category needs attention.", body: "Select a category to see its amount, budget, and status in one place.", video: "spending", alt: "Screen recording of the redesigned BOA spending chart, showing overspending by category and swiping through further insights" },
        { label: "02 / Investigate", title: "Trace the total back to the spending.", body: "Switch between merchant and monthly breakdowns without losing the active month, category, or budget.", video: "budget", alt: "Category spending view switching between merchant and monthly breakdowns" },
        { label: "03 / Adjust", title: "Reallocate the budget without restarting setup.", body: "Move an amount between categories, preview both limits, then choose whether the change is temporary or ongoing.", video: "reallocate", alt: "Reallocating budget allowances between two categories, with both limits visible" }
      ]
    },
    prototype: {
      kicker: "02 / Interactive prototype",
      heading: "Follow the task through.",
      lead: "Explore the connected mobile flow using sample transactions and budgets.",
      steps: [
        { title: "Inspect a spending category", body: "Select a category in the dial, compare its merchant and monthly breakdowns, then open its transactions." },
        { title: "Correct more than one transaction", body: "Select transactions and assign a category together, keeping the active month and category in context." },
        { title: "Make a one-month budget adjustment", body: "Reallocate category allowances, review the new limits, and choose a one-month or ongoing change. This adjusts the plan; it does not transfer funds." }
      ],
      open: "Open at full size",
      note: "The optional assistant demonstrates suggested questions and responses based on sample data. Free-text questions and live AI are outside this prototype.",
      tryMe: "Try me",
      frameTitle: "BOA spending and budgeting interactive prototype"
    },
    research: {
      kicker: "03 / Research & problem framing",
      heading: "Three points where the flow breaks.",
      lead: "The research focused on finding and verifying spending, correcting categories, and adapting a budget during the month.",
      methods: [
        { value: "32", label: "Survey responses" },
        { value: "2", label: "User interviews" },
        { value: "Reddit", label: "Supporting public posts" }
      ],
      methodNote: "Participants had used Bank of America, but not necessarily its budgeting feature. This was a small, directional study rather than a representative sample.",
      problems: [
        { title: "Spending is difficult to find and verify", body: "Users had to move between summaries, categories, and transaction lists to understand where a total came from." },
        { title: "Category correction breaks the flow", body: "Fixing a category required opening transactions one at a time, while filters and selections could reset on return." },
        { title: "Budget changes force a full rebuild", body: "A small monthly adjustment could send users through setup steps that did not match the change they wanted to make." }
      ],
      surveySummary: "View the survey breakdown and supporting material",
      statLabels: { reset: "Selections reset", insights: "Insights hard to find", correction: "Correction takes time", inflexible: "Budgets feel inflexible" },
      statNote: "These four recorded survey findings are preserved from the research notes. Uncertainty about how totals connect to transactions is retained as a qualitative theme rather than shown with an unverified percentage.",
      interviewAlt: "Interview context for the BOA spending case study",
      interviewTitle: "Interview context",
      interviewBody: " Categories, repeated edits and uncertainty about which transactions contributed to a total.",
      postsAlt: "Public posts discussing spending and budgeting issues",
      postsTitle: "Supporting public posts",
      postsBody: " External context for the themes; separate from the recruited survey and interviews.",
      flowsSummary: "View before-and-after flows and all 15 wireframes",
      flowLabel: "Task flow comparison",
      flowTitle: "Two tasks, before and after.",
      beforeCaption: "Before / Reviewed flow",
      afterCaption: "After / Redesigned flow",
      openFull: "Open full size",
      openBeforeAria: (title) => "Open full-size original flow: " + title,
      openAfterAria: (title) => "Open full-size redesigned flow: " + title,
      openWireAria: (caption) => "Open full-size wireframe: " + caption,
      flows: [
        { title: "Track spending", summary: "Direct access replaces the hidden entry, filters stay visible, and category changes happen inside the transaction flow.", current: img("0bc9cd759c554c1e5537ba810d083f5adf5d7f2c.png"), redesigned: img("aede7f6f2ddb4260fd295c2d97f190b4eff94b9b.png"), currentAlt: "Current BOA spending flow with hidden entry, lost context, and deep category editing", redesignedAlt: "Redesigned BOA spending flow with direct access, persistent filters, and quicker category editing" },
        { title: "Adjust a budget", summary: "The redesign starts from the current budget, supports focused edits or reallocation, and avoids restarting the setup process.", current: img("b20b93f0cad89301c7262d4330c7e81176dfb5c7.png"), redesigned: img("39c57feb914fc1ec121c56f373082c9159d742e3.png"), currentAlt: "Current BOA budget flow with a long setup process", redesignedAlt: "Redesigned BOA budget flow with direct edits and category reallocation" }
      ],
      arcs: [
        {
          label: "Entry",
          title: "Spending starts on a screen users already open",
          body: "The reviewed flow placed spending several screens below the account. These wireframes bring the monthly total to the accounts list and checking card, with a path from transactions back into spending.",
          screens: [
            { src: "/boa/low01.png", caption: "Accounts · spending in the list", alt: "Low-fidelity accounts screen with a spending summary sitting under the account list" },
            { src: "/boa/low02.png", caption: "Checking · one entry point", alt: "Low-fidelity checking account screen with this month's spending and a link into tracking" },
            { src: "/boa/low03.png", caption: "Transaction · category editable here", alt: "Low-fidelity transaction detail with an editable category row and a link to all spending in that category" }
          ]
        },
        {
          label: "Track spending",
          title: "Month and category survive the trip into detail",
          body: "The two pickers stay pinned above the overview, the category breakdown, and the transaction list, so stepping into a merchant and back does not clear them. Correcting a miscategorised charge happens in the list itself — select several, move them once — instead of one transaction detail at a time.",
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
          title: "Changing one number does not restart setup",
          body: "Categories can be edited or reallocated while the total stays visible. Saving is a separate decision: apply the adjustment to this month or keep it as an ongoing plan.",
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
      kicker: "04 / Testing & iteration",
      heading: "The clearest improvement came from budget reallocation.",
      lead: "The same six participants completed both task rounds.",
      keyLabel: "Key iteration / ",
      changeLabel: "Design change",
      resultLabel: "Observed result",
      nextLabel: "Next question",
      iterations: [
        { title: "Budget reallocation", count: "2 of 6 → 5 of 6 unassisted", change: "Separated the source and destination into Take from and Give to, then previewed both new limits and the unchanged total before confirmation.", result: "Five of six participants completed budget reallocation without help in the redesigned flow, compared with two of six in the earlier task round.", nextStep: "Next, test one-month versus ongoing changes, undo, and insufficient-funds cases." },
        { title: "Spending chart", count: "41 s → 24 s median", result: "Five of six participants identified the most overspent category without help after the selected category, budget ring, and text status were made more explicit." },
        { title: "Assistant exploration", count: "1 of 6 → 4 of 6", result: "Four of six participants resolved a follow-up question in the prototype assistant, compared with one of six using navigation in the comparison round." }
      ],
      note: "Directional evidence only: returning participants saw substantially different interfaces, so practice effects and multiple design changes may have influenced the results. The assistant comparison is exploratory."
    },
    web: {
      kicker: "05 / Web adaptation",
      heading: "Use the width to keep overview and detail together.",
      lead: "Mobile reveals details one view at a time. Desktop keeps the category overview beside merchant and monthly breakdowns, with the assistant available in a side panel.",
      carouselLabel: "BOA web adaptation screens",
      screenAlts: [
        "BOA web accounts home with total balance trend, account list, and August spending summary",
        "BOA web spending overview with category donut, budget bars, and a groceries breakdown by month and merchant",
        "BOA web cash flow view with net cash flow chart, month-by-month table, and a flow diagram of where the money went",
        "BOA web spending view with the assistant panel open, explaining why groceries is over budget"
      ],
      systemSummary: "View the visual system",
      systemBody: "Familiar banking navigation, category colors and typography support the revised flows. Text values and budget lines accompany color so the status has more than one cue.",
      systemAssets: [
        { src: img("96d21119e7c4078c307a63377b7d633dbe4d78c8.png"), alt: "BOA core color palette", label: "Core palette" },
        { src: img("f1f1b3fd3c6f921ab73524efa128d6b7f8c377e9.png"), alt: "BOA spending category color ramp", label: "Category ramp" },
        { src: img("9b785afb90f4467916a28a2f125a7a41e2d54699.png"), alt: "BOA typography specimen", label: "Typography" }
      ]
    },
    reflection: {
      kicker: "Reflection",
      heading: "Next, isolate what caused the improvement.",
      lead: "A broader study should separate the effects of persistent context, the revised chart, and the reallocation preview, while testing accessibility and error recovery.",
      note: "Independent redesign concept. Not affiliated with Bank of America."
    }
  },
  zh: {
    hero: {
      pill: "独立案例",
      context: "产品 · UI/UX · 2026",
      titleA: "BOA：支出",
      titleB: "与预算。",
      lead: "先看清钱花在哪，再改分类、调预算。",
      roleLabel: "角色",
      role: "UI/UX 设计师",
      timelineLabel: "周期",
      timeline: "8 周",
      platformLabel: "平台",
      platform: "移动端 + 网页",
      challengeLabel: "挑战",
      challenge: "看总额、改分类、调预算，本来是三段断开的流程。我想让它们能顺着做下去。",
      scopeLabel: "我负责的部分",
      scope: "调研、流程分析、线框、移动端和网页界面，以及一个可交互原型。",
      outcomeLabel: "结果",
      outcome: "6 位参与者中，能在没有提示的情况下完成预算重新分配的人从 2 位增加到 5 位；发现超支所需的中位时间从 41 秒降到 24 秒。",
      actionPrototype: "试试原型",
      actionFlow: "看核心流程",
      videoLabel: "BOA 预览：在分类之间重新分配预算"
    },
    experience: {
      kicker: "01 / 核心体验",
      heading: "看到超支以后，可以顺手查清原因，再调整预算。",
      lead: "我把流程拆成三步：先发现问题，再查到具体消费，最后决定要不要调整预算。",
      highlights: [
        { label: "01 / 看懂", title: "先找出需要处理的分类。", body: "点开一个分类，金额、预算和当前状态会放在一起显示。", video: "spending", alt: "改版后 BOA 支出图表的录屏：按分类显示超支情况，并滑动查看更多洞察" },
        { label: "02 / 追查", title: "再查清这笔总额是怎么来的。", body: "在「按商家」和「按月份」之间切换时，当前月份、分类和预算都会保留。", video: "budget", alt: "分类支出视图在按商家和按月份两种拆分之间切换" },
        { label: "03 / 调整", title: "调预算不用重走一遍设置。", body: "在两个分类之间挪一笔钱，预览两边的新额度，再决定这次改动是临时的还是长期的。", video: "reallocate", alt: "在两个分类之间重新分配预算额度，两边的额度都看得见" }
      ]
    },
    prototype: {
      kicker: "02 / 可交互原型",
      heading: "可以直接走一遍完整流程。",
      lead: "用示例交易和预算，试试串起来的移动端流程。",
      steps: [
        { title: "查看一个支出分类", body: "在圆环上选一个分类，对比它按商家和按月份的拆分，再打开它的交易明细。" },
        { title: "一次修改多笔交易的分类", body: "勾选多笔交易后一起改分类，当前的月份和分类不会被清掉。" },
        { title: "做一次只管一个月的预算调整", body: "重新分配各分类的额度，看一眼新的上限，再选这次改动只管这个月还是长期生效。这里调的是计划，不会真的转账。" }
      ],
      open: "打开大图",
      note: "可选的助手演示的是基于示例数据的推荐问题和回答。自由提问和真实 AI 不在这个原型范围内。",
      tryMe: "试试看",
      frameTitle: "BOA 支出与预算的可交互原型"
    },
    research: {
      kicker: "03 / 调研与问题定义",
      heading: "流程断掉的三个地方。",
      lead: "调研集中在三件事上：找到并核对支出、改分类，以及在月中调整预算。",
      methods: [
        { value: "32", label: "份问卷" },
        { value: "2", label: "场用户访谈" },
        { value: "Reddit", label: "作为佐证的公开帖子" }
      ],
      methodNote: "参与者都用过美国银行，但不一定用过预算功能。样本很小，这次调研只能帮我找方向，不能代表所有用户。",
      problems: [
        { title: "支出既不好找，也不好核对", body: "要弄清一个总额是怎么来的，用户得在汇总、分类和交易列表之间来回跳。" },
        { title: "改分类会把流程打断", body: "要改一个分类，得一笔一笔地打开交易；而返回时，筛选和已选中的项还可能被清空。" },
        { title: "想改一点预算，却要重走整套设置", body: "用户可能只想微调这个月的预算，却会被带回完整的设置流程，做一堆和这次修改无关的操作。" }
      ],
      surveySummary: "查看问卷拆解和佐证材料",
      statLabels: { reset: "选中项被清空", insights: "洞察不好找", correction: "改分类很费时间", inflexible: "预算不够灵活" },
      statNote: "这四项数据来自原始问卷记录。「不清楚总额和交易之间怎么对应」只在访谈里反复出现，所以我把它保留为定性发现，没有硬配一个百分比。",
      interviewAlt: "BOA 支出案例的访谈背景材料",
      interviewTitle: "访谈背景",
      interviewBody: " 访谈里反复提到三个问题：分类难改、修改步骤重复，也很难看出总额由哪些交易组成。",
      postsAlt: "讨论支出和预算问题的公开帖子",
      postsTitle: "作为佐证的公开帖子",
      postsBody: " 这些帖子只用来补充背景，没有和问卷或访谈样本混在一起。",
      flowsSummary: "查看改版前后的流程，以及全部 15 张线框",
      flowLabel: "任务流程对比",
      flowTitle: "两个任务，改版前后。",
      beforeCaption: "改版前 / 原有流程",
      afterCaption: "改版后 / 新流程",
      openFull: "打开大图",
      openBeforeAria: (title) => "打开原有流程的大图：" + title,
      openAfterAria: (title) => "打开新流程的大图：" + title,
      openWireAria: (caption) => "打开线框大图：" + caption,
      flows: [
        { title: "查看支出", summary: "我把藏得很深的支出入口提到前面，让筛选条件一直留在画面上，也把修改分类放回交易流程里。", current: img("0bc9cd759c554c1e5537ba810d083f5adf5d7f2c.png"), redesigned: img("aede7f6f2ddb4260fd295c2d97f190b4eff94b9b.png"), currentAlt: "现有 BOA 支出流程：入口很深、上下文丢失、改分类要钻很多层", redesignedAlt: "改版后的 BOA 支出流程：直接入口、筛选常驻、改分类更快" },
        { title: "调整预算", summary: "改版从当前预算出发，支持单点修改或重新分配，不用重走一遍设置流程。", current: img("b20b93f0cad89301c7262d4330c7e81176dfb5c7.png"), redesigned: img("39c57feb914fc1ec121c56f373082c9159d742e3.png"), currentAlt: "现有 BOA 预算流程：一长串设置步骤", redesignedAlt: "改版后的 BOA 预算流程：可直接修改，也可在分类之间重新分配" }
      ],
      arcs: [
        {
          label: "入口",
          title: "把支出放到用户本来就会打开的页面",
          body: "原有流程把支出放在账户下面好几屏的位置。这组线框把当月总额提到账户列表和支票卡片上，并从交易明细留了一条回到支出的路。",
          screens: [
            { src: "/boa/low01.png", caption: "账户 · 支出就在列表里", alt: "低保真账户页，账户列表下方带一个支出汇总" },
            { src: "/boa/low02.png", caption: "支票账户 · 一个入口", alt: "低保真支票账户页，显示本月支出并有一个进入追踪的链接" },
            { src: "/boa/low03.png", caption: "交易 · 分类在这里就能改", alt: "低保真交易详情，分类那一行可编辑，并有一个通往该分类全部支出的链接" }
          ]
        },
        {
          label: "查看支出",
          title: "看完详情再返回，月份和分类不会丢",
          body: "月份和分类筛选始终放在概览、分类拆解和交易列表上方。点进某个商家再返回时，筛选不会被清掉。分类改错了，也可以在列表里勾选多笔交易一起修改，不必逐条打开。",
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
          title: "改一个数字，不用重走设置",
          body: "每个分类都能直接改，也可以在分类之间调剂，预算总额会一直显示。保存时再决定：只改这个月，还是以后都按这套预算执行。",
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
      kicker: "04 / 测试与迭代",
      heading: "预算重新分配这一项，变化最明显。",
      lead: "两轮任务测试由同一组 6 位参与者完成。",
      keyLabel: "关键迭代 / ",
      changeLabel: "设计改动",
      resultLabel: "观察到的结果",
      nextLabel: "下一个问题",
      iterations: [
        { title: "预算重新分配", count: "无提示完成：6 人中 2 人 → 5 人", change: "我把来源和去向写成「从哪拿」和「给到哪」，确认前会同时预览两个分类的新额度，并保留不变的预算总额。", result: "改版后，6 位参与者中有 5 位没有求助就完成了预算重新分配；上一轮只有 2 位。", nextStep: "下一轮还要测试只改一个月和长期生效的区别，以及撤销和余额不足的情况。" },
        { title: "支出图表", count: "中位数 41 秒 → 24 秒", result: "把选中分类、预算圆环和文字状态都做得更明确之后，6 位参与者中有 5 位没要帮助就找出了超支最多的分类。" },
        { title: "助手探索", count: "6 人中 1 人 → 4 人", result: "在原型的助手里，6 位参与者中有 4 位解决了一个追问；对照轮里靠导航解决的是 6 位中 1 位。" }
      ],
      note: "这些结果只能用来判断方向。回访参与者看到的界面改动很多，熟练效应也可能影响结果；助手相关的测试更偏探索。"
    },
    web: {
      kicker: "05 / 网页端适配",
      heading: "桌面更宽，所以概览和细节可以同时出现。",
      lead: "移动端一次只展开一层细节。桌面端把分类概览和按商家、按月份的拆分并排放，助手放在侧边栏里随时可开。",
      carouselLabel: "BOA 网页端适配界面",
      screenAlts: [
        "BOA 网页端账户首页：总余额趋势、账户列表和八月支出汇总",
        "BOA 网页端支出概览：分类环形图、预算条，以及「食品杂货」按月份和商家的拆分",
        "BOA 网页端现金流视图：净现金流图表、逐月表格，以及一张钱去了哪里的流向图",
        "BOA 网页端支出视图，助手面板打开，解释「食品杂货」为什么超预算"
      ],
      systemSummary: "查看视觉系统",
      systemBody: "我保留了银行用户熟悉的导航、分类颜色和字体，只调整流程与层级。颜色旁边始终有数值和预算线，状态不会只靠颜色表达。",
      systemAssets: [
        { src: img("96d21119e7c4078c307a63377b7d633dbe4d78c8.png"), alt: "BOA 核心配色", label: "核心配色" },
        { src: img("f1f1b3fd3c6f921ab73524efa128d6b7f8c377e9.png"), alt: "BOA 支出分类色阶", label: "分类色阶" },
        { src: img("9b785afb90f4467916a28a2f125a7a41e2d54699.png"), alt: "BOA 字体样张", label: "字体" }
      ]
    },
    reflection: {
      kicker: "反思",
      heading: "下一步要弄清楚，究竟是哪项改动起了作用。",
      lead: "如果继续测试，我会把「保留上下文」「修改图表」「调剂前预览」分开验证，同时补测无障碍和出错后的恢复流程。",
      note: "独立的改版概念，与美国银行无关联。"
    }
  }
}

export default function UxCaseStudyPage({ track = "uiux", locale = "en" }) {
  const t = copy[locale] || copy.en
  const [featuredIteration, ...supportingIterations] = t.testing.iterations
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
                <a className={styles.action} href="#prototype">{t.hero.actionPrototype} <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href="#experience">{t.hero.actionFlow}</a>
              </div>
            </div>
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <CaseVideo src="/boa/media/reallocate-loop.mp4" poster="/boa/media/reallocate-poster.webp"
                width={720} height={1408} label={t.hero.videoLabel} priority />
            </div>
          </header>

          <ProjectQuickNav slug="boa-budgeting" track={track} locale={locale} />

          <section id="experience" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.experience.kicker}</p>
              <h2>{t.experience.heading}</h2>
              <p className={styles.sectionLead}>{t.experience.lead}</p>
            </div>
            <div className={styles.highlightList}>
              {t.experience.highlights.map((item) => (
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
                  <p className={styles.kicker}>{t.prototype.kicker}</p>
                  <h2>{t.prototype.heading}</h2>
                  <p className={styles.sectionLead}>{t.prototype.lead}</p>
                </div>
                <ol className={styles.prototypeSteps}>
                  {t.prototype.steps.map((step, index) => (
                    <li key={step.title}>
                      <span aria-hidden="true">0{index + 1}</span>
                      <div><h3>{step.title}</h3><p>{step.body}</p></div>
                    </li>
                  ))}
                </ol>
                <a className={styles.outlineAction} href={PROTOTYPE_SRC} target="_blank" rel="noreferrer">{t.prototype.open} <span aria-hidden="true">↗</span></a>
                <p className={styles.sourceNote}>{t.prototype.note}</p>
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
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.research.kicker}</p>
              <h2>{t.research.heading}</h2>
              <p className={styles.sectionLead}>{t.research.lead}</p>
            </div>
            <div className={styles.methodGrid}>
              {t.research.methods.map((method) => (
                <div key={method.label}><strong>{method.value}</strong><span>{method.label}</span></div>
              ))}
            </div>
            <p className={styles.sourceNote}>{t.research.methodNote}</p>
            <div className={styles.problemGrid}>
              {t.research.problems.map((item, index) => (
                <article key={item.title}>
                  <p className={styles.microLabel}>0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <details className={styles.disclosure}>
              <summary>{t.research.surveySummary}</summary>
              <div className={styles.disclosureBody}>
                <div className={styles.researchStats}>
                  {researchStats.map((stat) => (
                    <div key={stat.key}><strong>{stat.pct}</strong><p>{t.research.statLabels[stat.key]}</p></div>
                  ))}
                </div>
                <p className={styles.sourceNote}>{t.research.statNote}</p>
                <div className={styles.evidenceGrid}>
                  <figure>
                    <a href="/cleared/research1.png" target="_blank" rel="noreferrer">
                      <img src="/cleared/research1.png" alt={t.research.interviewAlt} width="1791" height="1041" loading="lazy" />
                    </a>
                    <figcaption><strong>{t.research.interviewTitle}</strong>{t.research.interviewBody}</figcaption>
                  </figure>
                  <figure>
                    <a href="/cleared/research2.png" target="_blank" rel="noreferrer">
                      <img src="/cleared/research2.png" alt={t.research.postsAlt} loading="lazy" />
                    </a>
                    <figcaption><strong>{t.research.postsTitle}</strong>{t.research.postsBody}</figcaption>
                  </figure>
                </div>
              </div>
            </details>
            <details className={styles.disclosure}>
              <summary>{t.research.flowsSummary}</summary>
              <div className={styles.disclosureBody}>
                <div id="task-flows" className={styles.flowComparisons}>
                  <div className={styles.flowIntro}>
                    <p className={styles.microLabel}>{t.research.flowLabel}</p>
                    <h3>{t.research.flowTitle}</h3>
                  </div>
              <div className={styles.flowList}>
                {t.research.flows.map((flow) => (
                  <article className={styles.flowCase} key={flow.title}>
                    <h4>{flow.title}</h4><p>{flow.summary}</p>
                    <div className={styles.flowPair}>
                      <figure>
                        <figcaption>{t.research.beforeCaption}</figcaption>
                        <a href={flow.current} target="_blank" rel="noreferrer" aria-label={t.research.openBeforeAria(flow.title)}>
                          <img src={flow.current} alt={flow.currentAlt} loading="lazy" />
                          <span className={styles.flowImageLink}>{t.research.openFull} <span aria-hidden="true">↗</span></span>
                        </a>
                      </figure>
                      <figure>
                        <figcaption>{t.research.afterCaption}</figcaption>
                        <a href={flow.redesigned} target="_blank" rel="noreferrer" aria-label={t.research.openAfterAria(flow.title)}>
                          <img src={flow.redesigned} alt={flow.redesignedAlt} loading="lazy" />
                          <span className={styles.flowImageLink}>{t.research.openFull} <span aria-hidden="true">↗</span></span>
                        </a>
                      </figure>
                    </div>
                  </article>
                ))}
              </div>
            </div>
                {t.research.arcs.map((arc) => (
                  <article className={styles.lowFiArc} key={arc.label}>
                    <div className={styles.flowIntro}><p className={styles.microLabel}>{arc.label}</p><h3>{arc.title}</h3><p>{arc.body}</p></div>
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
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.testing.kicker}</p>
              <h2>{t.testing.heading}</h2>
              <p className={styles.sectionLead}>{t.testing.lead}</p>
            </div>
            <div className={styles.iterationList}>
              <article className={`${styles.iterationItem} ${styles.iterationFeatured}`}>
                <div>
                  <p className={styles.microLabel}>{t.testing.keyLabel}{featuredIteration.title}</p>
                  <h3>{featuredIteration.count}</h3>
                  <dl className={styles.iterationEvidence}>
                    <div><dt>{t.testing.changeLabel}</dt><dd>{featuredIteration.change}</dd></div>
                    <div><dt>{t.testing.resultLabel}</dt><dd>{featuredIteration.result}</dd></div>
                  </dl>
                </div>
                <div className={styles.nextStep}><p className={styles.microLabel}>{t.testing.nextLabel}</p><p>{featuredIteration.nextStep}</p></div>
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
            <p className={styles.sourceNote}>{t.testing.note}</p>
          </section>

          <section id="web" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.web.kicker}</p>
              <h2>{t.web.heading}</h2>
              <p className={styles.sectionLead}>{t.web.lead}</p>
            </div>
            <ImageCarousel className={styles.webCarousel} label={t.web.carouselLabel} slides={webScreens} locale={locale} />
            <details className={styles.disclosure}>
              <summary>{t.web.systemSummary}</summary>
              <div className={styles.disclosureBody}>
                <p>{t.web.systemBody}</p>
                <div className={styles.systemGrid}>
                  {t.web.systemAssets.map((asset) => (
                    <figure key={asset.src}><figcaption>{asset.label}</figcaption><a href={asset.src} target="_blank" rel="noreferrer"><img src={asset.src} alt={asset.alt} loading="lazy" /></a></figure>
                  ))}
                </div>
              </div>
            </details>
          </section>

          <section className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.reflection.kicker}</p>
              <h2>{t.reflection.heading}</h2>
              <p className={styles.sectionLead}>{t.reflection.lead}</p>
            </div>
            <p className={styles.sourceNote}>{t.reflection.note}</p>
          </section>
          <ProjectNav slug="boa-budgeting" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
