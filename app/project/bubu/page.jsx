import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"
import CaseVideo from "../cleared/CaseVideo"

import { iconFamilies, icons } from "./icons"
import { Journal } from "./Journal"
import { Loop } from "./Loop"
import styles from "./page.module.css"

export const metadata = {
  title: "BUBU",
  description:
    "A working iOS build for an eight-week weight-loss challenge, with daily meal receipts, weekly journals, solo mode, and a matching model shaped by two interviews.",
  ...projectShareCard("bubu", {
    title: "BUBU",
    description:
      "A working iOS build for an eight-week weight-loss challenge, with daily meal receipts, weekly journals, solo mode, and a matching model shaped by two interviews.",
    alt: "BUBU: the home screen on a phone, beside the app icon"
  })
}

/*
 * The case study reads in the order the product makes sense: why it
 * exists, how it works, what two conversations changed about it, what it
 * looks like, every screen, and what is left before the App Store. The
 * screens are the artwork throughout; the reasoning is kept to the two
 * sections that carry a decision.
 *
 * Everything that has no language - file paths, hex values, the order the
 * screens run in - is a constant below, and the labels that go with them
 * are index-aligned arrays inside `copy`, so the two languages cannot
 * drift apart from each other or from the screens.
 */
const screen = (name) => `/bubu/screens/${name}.webp`
const motion = (name) => `/bubu/motion/${name}`

/* The usage recordings, one per beat, the way the Last Message page runs
   its loops beside the writing. Until a recording is in, its stage shows
   the built screens instead, so the page reads as finished either way.
   To add one: put <name>-loop.mp4 and <name>-poster.webp in
   /public/bubu/media and flip the name to true. Recordings are portrait,
   at the phone's own aspect. */
const recordings = { day: false, week: false, finish: false, solo: false, matching: false }
const recording = (name) =>
  recordings[name] ? { src: `/bubu/media/${name}-loop.mp4`, poster: `/bubu/media/${name}-poster.webp` } : null

/* The build ships in both languages. Where a screen exists twice the page
   quietly shows the reader their own; it is not made a point of. */
const inLanguage = {
  home: { en: screen("en-home"), zh: screen("home-duo") },
  challenge: { en: screen("en-challenge"), zh: screen("challenge-progress") },
  cover: { en: screen("en-journal-cover"), zh: screen("journal-cover") },
  title: { en: screen("en-journal-title"), zh: screen("journal-title") },
  mine: { en: screen("en-journal-mine"), zh: screen("journal-mine") },
  theirs: { en: screen("en-journal-theirs"), zh: screen("journal-theirs") },
  spread: { en: screen("en-journal-spread"), zh: screen("journal-spread") }
}

const pick = (key, locale) => inLanguage[key][locale] || inLanguage[key].en

/* The full build, in the order a first-time user meets it. Captions are
   in `copy.screens.rail`, one per entry. */
const rail = [
  screen("signup"),
  screen("how-to-log"),
  screen("set-goal"),
  screen("invite"),
  screen("matched"),
  screen("home-duo"),
  screen("receipt-duo"),
  screen("receipt-mine"),
  screen("journal-cover"),
  screen("journal-mine"),
  screen("journal-spread"),
  screen("challenge-progress"),
  screen("challenge-rules"),
  screen("goal-reached"),
  screen("home-solo"),
  screen("journal-solo"),
  screen("challenge-solo"),
  screen("settings"),
  screen("rename")
]

/* Sampled out of the build rather than written down first: the app is
   four surfaces and one ink. Names are in `copy.look.swatches`. */
const palette = ["#F6F6F4", "#C8C5AD", "#F6F5EE", "#0E0E0E"]

/* Five loops, one pen. Where each one runs is in `copy.cast.clips`.
   All five are black line work on an alpha channel, so the paper behind
   them is the tile's own background and every one of them sits on exactly
   the same colour; the mp4 beside each webm is the same matte laid over
   that colour, for the browsers that will not take VP9 alpha. */
const cast = ["jumprope", "duo", "solo", "finish", "cheer"].map((name) => ({
  src: motion(`${name}.mp4`),
  webm: motion(`${name}.webm`),
  poster: motion(`${name}.webp`)
}))

const copy = {
  en: {
    hero: {
      pill: "Self-initiated",
      context: "Product Design · iOS · 2026",
      titleA: "BUBU:",
      titleB: "losing weight in pairs.",
      lead: "An iOS app for an eight-week weight-loss challenge. Photograph each meal and the app turns the day into a receipt. Seven receipts become a weekly journal shared with your buddy.",
      storeLabel: "App Store",
      store: "Build complete · preparing submission",
      roleLabel: "Role",
      role: "Product design, UI, illustration",
      scopeLabel: "Scope",
      scope: "23 screens · 35 icons · paired and solo",
      platformLabel: "Platform",
      platform: "iOS · iPhone 17",
      statusLabel: "Status",
      status: "Built · one round of interviews · TestFlight next",
      action: "How it works",
      heroAlt: "The BUBU home screen on an iPhone: day 24, both players' progress, and the meals they logged today"
    },
    why: {
      kicker: "01 / Why it exists",
      heading: "A dazi is easy to find. Keeping one for eight weeks is harder.",
      lead: "In China, a dazi (搭子) is someone you meet for one activity, such as lunch or the gym. The commitment stays small, which makes the pairing easy to start and easy to drop. That may work for dinner, but a weight-loss plan can last two months.",
      rulesLabel: "Three rules for the product",
      rules: [
        {
          label: "01 / One subject",
          title: "Only meals are shared.",
          body: "There is no chat, feed, profile or display name. During the challenge, each person appears as a user ID and the food they logged."
        },
        {
          label: "02 / A fixed end",
          title: "Choose the end date before you start.",
          body: "At setup, you choose 4, 8 or 12 weeks. Both people count down to the same date, so neither person has to decide when the challenge is over."
        },
        {
          label: "03 / Visible absence",
          title: "A missed day leaves a blank.",
          body: "The app will not nag you or try to make you feel guilty. If you miss a day, the receipt simply shows an empty dashed frame and a counter such as MISSED 1 / 3."
        }
      ]
    },
    how: {
      kicker: "02 / How it works",
      heading: "Take a photo and the app makes the record.",
      lead: "There is no form to fill in. After you photograph a plate, the app removes the background and adds the meal to three views: a daily receipt, a weekly journal spread and the challenge track.",
      beats: [
        {
          label: "The day",
          title: "At 23:59, the day's receipt locks.",
          body: "Yesterday cannot be edited to look better after the fact, so the receipt your buddy sees reflects what you actually logged. It can also answer a simple question: what did someone on the same plan really eat today?",
          demo: "Logging a meal and seeing the day close as a receipt",
          alts: [
            "Both players' receipts for the day, printed side by side on a black ground",
            "One receipt in full: each meal with its time, the exercise line, and the day's progress"
          ]
        },
        {
          label: "The week",
          title: "Seven receipts become a weekly journal.",
          body: "The journal brings both people's records into one place. Its pages move from the cover and title page to each person's week. Open it flat to compare both weeks across the spread.",
          demo: "Turning the journal from the cover to the open spread"
        },
        {
          label: "The finish",
          title: "Both people follow the same timeline.",
          body: "The home screen shows both people on one track, while the challenge page keeps the rules and progress count. On the final date, the app shows a celebration screen and a shareable receipt.",
          demo: "The challenge page, and reaching the goal on the last day",
          alts: [
            "The challenge page: both players' progress against the rules",
            "The goal-reached screen: a drawn figure with arms up, and the final numbers"
          ]
        }
      ],
      journalStepsLabel: "Turn the journal",
      journalPages: [
        ["Cover", "The journal, closed on the desk"],
        ["Title page", "My Diet Diary, and the two of you drawn on the flyleaf"],
        ["My week", "Seven days, each with what I ate and what I did"],
        ["Their week", "The same page, kept by the other person"],
        ["Open flat", "Both weeks across the gutter, with the week's loss clipped to each"]
      ]
    },
    testing: {
      kicker: "03 / What testing changed",
      heading: "Two interviews led to solo mode and a new matching model.",
      lead: "Before TestFlight, I spoke with one potential user and one product designer who had shipped similar work.",
      whoLabel: "Who",
      saidLabel: "What they said",
      changedLabel: "What changed",
      findings: [
        {
          who: "A fitness creator with 20,000 followers",
          said: "She liked the interface and wanted to use it by herself. People may download the app for its look before they have a buddy, so requiring a partner at sign-up would turn them away.",
          changed: "I added solo mode. It uses the same home, journal and challenge with one runner on the track and one week in the journal. Pairing can be added later instead of being required at sign-up.",
          demo: "Running a challenge alone: home, journal and challenge in solo mode",
          alts: [
            "Home in solo mode: one runner on the track",
            "The journal in solo mode: one week, one page",
            "The challenge page in solo mode"
          ]
        },
        {
          who: "A product designer with three years of shipped work",
          said: "He was concerned about cold start. A new app will not have a large pool of people to match, which can mean a long wait or a poor match.",
          changed: "I changed matching so it feels one-to-one to each person while working one-to-many in the system. Each user sees one buddy with a similar goal, starting weight and challenge length, but that buddy may already be paired with someone else. If A and B are paired and C is closest to A, C sees A while A still sees B and B still sees A. This lets people start without waiting for an even number of users.",
          demo: "Being matched: from setting a goal to the buddy arriving",
          alt: "The matched screen: your buddy has arrived, with both goals side by side"
        }
      ],
      figureLabel: "How a third person joins",
      legend: [
        ["A", "sees B"],
        ["B", "sees A"],
        ["C", "sees A"]
      ],
      note: "Both conversations were about the prototype, before any real pair had run a challenge."
    },
    look: {
      kicker: "04 / The look",
      heading: "The interface is built from paper, thin rules and cut-out food photos.",
      lead: "Every screen uses the same flat material language. Elements do not float or cast shadows, and the interface avoids rounded corners.",
      swatchLabel: "Color and materials",
      swatches: [
        ["Paper", "Every screen but the journal and the receipt"],
        ["Board", "The journal's cover cloth and the desk it lies on"],
        ["Page", "The journal's own paper, a shade warmer than the app"],
        ["Ink", "Type, rules, the black key and the receipt ground"]
      ],
      typeLabel: "Typography",
      type: "Geist Mono is used for numbers, labels and timestamps so the receipt data lines up. Noto Sans SC is used for sentences. Handwriting appears only in the drawn illustrations, not as a typeface.",
      rulesLabel: "Visual rules",
      rules: [
        "Cards use thin rules instead of drop shadows or elevation.",
        "Buttons and containers use right angles rather than rounded corners.",
        "Meal photos are removed from their backgrounds and placed directly on the paper without white borders.",
        "Each screen has one filled rectangular button. Receipts invert the palette, using light type on a black ground."
      ],
      detailAlt: "Setting the goal: height, current weight, target weight in mono, and the 4, 8 or 12 week choice",
      detailCaption: "Setting the goal: mono numbers, 4 / 8 / 12 week choices shown as figures, and one filled button."
    },
    iconset: {
      kicker: "05 / The icon set",
      heading: "Thirty-five icons, and not one of them drawn straight.",
      lead: "The interface needed an icon set that belonged to the same hand as the illustrations, without being redrawn every time the app grew. So the icons are not drawn one at a time: they are built from three primitives, and then knocked off true on purpose.",
      partsLabel: "Three primitives",
      parts: [
        ["A line", "that bows a little between its ends"],
        ["A circle", "that does not quite close where it started"],
        ["A rounded rectangle", "whose sides drift as they run"]
      ],
      wobbleLabel: "One wobble, seeded per icon",
      wobble: "Every finished path is resampled and each point pushed off true by a small random walk. The seed is the icon's own name, so an icon wobbles the same way every time it is drawn, and no two of them wobble alike. That is what keeps a generated set from looking generated.",
      rulesLabel: "What it holds to",
      rules: [
        "One 24 box, one stroke weight, round caps and joins.",
        "Solid parts are the exception, not the fill: four icons in thirty-five.",
        "Nothing is mirrored to make its opposite; the left arrow is its own drawing.",
        "The set is sorted by what a screen needs, not by shape."
      ],
      families: [
        ["Actions", "add, remove, confirm, dismiss"],
        ["Arrows", "everything that moves you somewhere"],
        ["Controls", "checkbox, radio, toggle, filter"],
        ["The product", "the journal, the target, the race"]
      ],
      drawNote: "They draw themselves in as the section arrives. Point at one and the rest step back; point at a family below and its icons light up on the sheet."
    },
    cast: {
      kicker: "06 / The cast",
      heading: "I drew five looping animations in the same line style as the interface.",
      lead: "The same two figures appear throughout the app. They use the same line weight as the dividers and show up when a screen needs to express a human moment, not just another number.",
      clips: [
        ["Skipping", "Empty states, and the pause between two challenges"],
        ["Both of you", "The screen that confirms a match"],
        ["Solo", "Home, when you are running the challenge alone"],
        ["The finish", "Crossing the line on the last day"],
        ["Goal reached", "The celebration screen, and the receipt you can share from it"]
      ],
      note: "The loops run while they are on screen and stop when they are not."
    },
    screens: {
      kicker: "07 / Every screen",
      heading: "All 19 screens, from sign-up to settings.",
      lead: "These screens were captured in an iPhone 17 simulator and follow the order of a first-time experience. Drag the strip to browse them.",
      rail: [
        "Sign up",
        "Solo or paired",
        "Set the goal",
        "Invite a buddy",
        "Matched",
        "Home · paired",
        "Today's receipt · both",
        "Today's receipt · mine",
        "Journal · cover",
        "Journal · my week",
        "Journal · the spread",
        "Challenge · progress",
        "Challenge · rules",
        "Goal reached",
        "Home · solo",
        "Journal · solo",
        "Challenge · solo",
        "Settings",
        "Rename"
      ]
    },
    shipping: {
      kicker: "08 / Shipping it",
      heading: "The build is complete. TestFlight and App Store review are next.",
      lead: "The current version runs as an app. The remaining work is user testing, store preparation and review.",
      doneLabel: "Done",
      done: [
        "23 screens, designed and built",
        "35 icons, generated from three primitives",
        "Paired and solo modes",
        "The receipt, the journal and the share card",
        "One-to-many matching, out of the second interview",
        "The five drawn loops"
      ],
      leftLabel: "Between here and the store",
      left: [
        "TestFlight round with real pairs, which is also the first test of the matching",
        "Privacy labels and the data the matching actually needs",
        "App Store screenshots and the listing",
        "Review, and whatever review asks for"
      ],
      limit: "The main assumption is still untested: seeing a stranger's meal receipt may feel motivating, or it may feel uncomfortable. Two interviews changed the product, but they cannot stand in for eight weeks of use. The TestFlight round will test that assumption."
    }
  },

  zh: {
    hero: {
      pill: "自发项目",
      context: "产品设计 · iOS · 2026",
      titleA: "BUBU：",
      titleB: "两个人一起减脂。",
      lead: "一款为八周减脂挑战设计的 iOS App。拍照记下一餐，每天生成一张小票，七天后整理成一页和搭子共享的手账。",
      storeLabel: "App Store",
      store: "开发已完成 · 正在准备上架",
      roleLabel: "我的角色",
      role: "产品设计、UI、插画",
      scopeLabel: "范围",
      scope: "23 个界面 · 35 个图标 · 双人与单人",
      platformLabel: "平台",
      platform: "iOS · iPhone 17",
      statusLabel: "状态",
      status: "已完成开发 · 做了一轮访谈 · 接下来是 TestFlight",
      action: "它怎么运作",
      heroAlt: "iPhone 上的 BUBU 首页：第 24 天、两个人的进度，以及今天各自记的餐"
    },
    why: {
      kicker: "01 / 它为什么存在",
      heading: "搭子容易找到，坚持八周却没那么容易。",
      lead: "搭子通常只对应一种活动，比如一起吃饭或健身。因为彼此要求不高，这种关系容易开始，也容易中断。约一顿饭还好，减脂却可能要一起坚持两个月。",
      rulesLabel: "产品遵循三条规则",
      rules: [
        {
          label: "01 / 只共享一件事",
          title: "只共享每天吃了什么。",
          body: "这里没有聊天、动态、个人主页或昵称。挑战期间，双方只能看到彼此的用户 ID 和餐食记录。"
        },
        {
          label: "02 / 有固定的终点",
          title: "开始前先选好结束日期。",
          body: "开始时选择 4 周、8 周或 12 周，两个人的页面会倒数到同一天。挑战何时结束不需要再由其中一人提出。"
        },
        {
          label: "03 / 缺席是看得见的",
          title: "漏记的一天会留下空白。",
          body: "App 不会催你，也不会用通知给你压力。哪天漏记了，小票上就留一个虚线空框，并显示 MISSED 1 / 3 这样的计数。"
        }
      ]
    },
    how: {
      kicker: "02 / 它怎么运作",
      heading: "拍下这一餐，App 会整理好记录。",
      lead: "不用填写表格。拍下餐盘后，App 会去掉照片背景，并把这顿饭放进三个地方：当天的小票、每周的手账，以及整场挑战的进度跑道。",
      beats: [
        {
          label: "一天",
          title: "23:59，当天的小票会锁定。",
          body: "锁定后，昨天的记录不能再补改。搭子看到的是当天真正留下的内容，也能从中知道：一个执行相似计划的人今天实际吃了什么。",
          demo: "记录一餐，并在当天结束时生成小票",
          alts: [
            "两个人当天的小票，并排印在黑色底上",
            "一张完整的小票：每一餐带时间、运动那一行，以及这一天的进度"
          ]
        },
        {
          label: "一周",
          title: "七张小票组成一周手账。",
          body: "手账把两个人的记录放到了一起。从封面和扉页继续翻，会依次看到我的一周和 TA 的一周；摊开后，两边的内容可以直接对照。",
          demo: "把手账从封面翻到摊开"
        },
        {
          label: "终点",
          title: "两个人按照同一段时间推进。",
          body: "首页用同一条跑道显示双方进度，挑战页保留规则和计数。到达结束日期后，App 会显示庆祝页面，并生成一张可以分享的小票。",
          demo: "挑战页，以及最后一天达成目标",
          alts: [
            "挑战页：两个人的进度，对照着规则",
            "目标达成页：一个举着手的小人，和最终的数字"
          ]
        }
      ],
      journalStepsLabel: "翻这本手账",
      journalPages: [
        ["封面", "合着放在桌上的手账"],
        ["扉页", "我的减脂日记，还有画在衬页上的你们俩"],
        ["我的一周", "七天，每天记着吃了什么、做了什么"],
        ["TA 的一周", "同一页，由对方记"],
        ["摊平", "两周横跨订口，各自夹着这一周掉了多少"]
      ]
    },
    testing: {
      kicker: "03 / 访谈改变了什么",
      heading: "两次访谈带来了单人模式和新的匹配方式。",
      lead: "TestFlight 之前，我访谈了一位潜在用户，以及一位有同类产品经验的产品设计师。",
      whoLabel: "谁",
      saidLabel: "她 / 他说了什么",
      changedLabel: "改了什么",
      findings: [
        {
          who: "一位有两万粉丝的健身博主",
          said: "她喜欢这套界面，也想在没有搭子的情况下独自使用。有人可能先被视觉吸引，再来寻找搭子；如果注册时必须配对，这些用户就无法开始。",
          changed: "我加入了单人模式。首页、手账和挑战沿用双人版结构，但跑道上只有一个人，手账也只记录自己的一周。用户可以先开始挑战，之后再选择配对。",
          demo: "一个人跑一场挑战：单人模式的首页、手账和挑战",
          alts: [
            "单人模式的首页：跑道上只有一个人",
            "单人模式的手账：一周，一页",
            "单人模式的挑战页"
          ]
        },
        {
          who: "一位有三年经验的产品设计师",
          said: "他担心冷启动。新 App 的匹配池还很小，用户可能等很久，也可能只能匹配到条件差异很大的人。",
          changed: "我把匹配改为：用户看到的是一对一关系，系统则允许一对多。每个人只看到一位目标、起始体重和挑战周期相近的搭子，但这位搭子可能也被匹配给其他人。如果 A 和 B 已经配对，后来加入的 C 与 A 最接近，C 会看到 A；A 仍然看到 B，B 也仍然看到 A。这样不必等人数凑成偶数才能开始。",
          demo: "被匹配的过程：从设定目标到搭子到来",
          alt: "组队成功页：搭子来了，两个人的目标并排"
        }
      ],
      figureLabel: "第三个人进来时",
      legend: [
        ["A", "看到 B"],
        ["B", "看到 A"],
        ["C", "看到 A"]
      ],
      note: "两次访谈聊的都是原型，那时还没有任何一对真实的搭子跑完过一场挑战。"
    },
    look: {
      kicker: "04 / 视觉",
      heading: "界面由纸张、细线和抠出的食物照片组成。",
      lead: "所有页面使用同一套平面材质。界面没有悬浮效果、阴影或圆角。",
      swatchLabel: "颜色与材质",
      swatches: [
        ["纸", "除手账和小票以外的每一屏"],
        ["板", "手账的封面布，以及它躺着的那张桌面"],
        ["页", "手账自己的纸，比 app 暖一点"],
        ["墨", "文字、分隔线、黑色按钮和小票底色"]
      ],
      typeLabel: "字体",
      type: "数字、标签和时间使用 Geist Mono，让小票上的信息保持对齐；句子使用 Noto Sans SC。手写只出现在绘制的插画里，不作为字体使用。",
      rulesLabel: "视觉规则",
      rules: [
        "卡片用细线划分，不使用投影或悬浮层级。",
        "按钮和容器都使用直角，不做圆角。",
        "食物照片去掉背景后直接放在纸面上，不加白边。",
        "每屏只有一个墨色实心矩形按钮。小票会反转配色，在黑底上使用浅色文字。"
      ],
      detailAlt: "设定目标：身高、当前体重、目标体重用等宽字，以及 4、8、12 周的选择",
      detailCaption: "设定目标：等宽数字、直接排列的 4 / 8 / 12 周选项，以及一个墨色实心按钮。"
    },
    iconset: {
      kicker: "05 / 图标",
      heading: "35 个图标，没有一笔是直的。",
      lead: "界面需要一套和插画同一只手画出来的图标，又不能每加一个功能就重画一遍。所以这些图标不是一个个画的：它们由三个基本形状搭出来，然后被刻意画歪。",
      partsLabel: "三个基本形状",
      parts: [
        ["一条线", "两端之间会轻微鼓出去一点"],
        ["一个圆", "起笔和收笔对不齐"],
        ["一个圆角矩形", "四条边走着走着会跑偏"]
      ],
      wobbleLabel: "一套抖动，每个图标一个种子",
      wobble: "每条画完的路径都会被重新取样，每个点再按一个小的随机游走推离原位。种子取自图标自己的名字，所以同一个图标每次抖动的样子都一样，而任意两个图标又不会抖得一样。一套生成出来的图标之所以不像生成的，靠的就是这个。",
      rulesLabel: "它守的规矩",
      rules: [
        "统一 24 的画格，统一线重，圆端点、圆转角。",
        "实心是例外不是填充：35 个里只有 4 个用到。",
        "不靠镜像凑出反向的那个；向左的箭头是自己画的。",
        "按界面上的用途分类，不按形状分类。"
      ],
      families: [
        ["操作", "添加、删除、确认、关闭"],
        ["箭头", "所有把你带去别处的东西"],
        ["控件", "复选框、单选、开关、筛选"],
        ["这个产品", "手账、靶心、比赛"]
      ],
      drawNote: "滚到这里时它们会自己画出来。指向一个，其余的会退到后面去；指向下面的一组，这一组会在纸上亮起来。"
    },
    cast: {
      kicker: "06 / 这些小人",
      heading: "我用界面的线条风格画了五段循环动画。",
      lead: "同样的两个小人会在 App 里反复出现。它们和分隔线使用相同的线条，只在画面需要传达人物状态时出现。",
      clips: [
        ["跳绳", "空状态，以及两场挑战之间的间隙"],
        ["你们俩", "确认组队成功的那一屏"],
        ["一个人", "单人模式下的首页"],
        ["冲线", "最后一天撞过终点线"],
        ["达成目标", "庆祝页，以及从那里分享出去的小票"]
      ],
      note: "动画只在进入画面时播放，离开就停。"
    },
    screens: {
      kicker: "07 / 全部界面",
      heading: "从注册到设置，共 19 个界面。",
      lead: "这些画面来自 iPhone 17 模拟器，并按照第一次使用的顺序排列。可以横向拖动查看。",
      rail: [
        "注册",
        "单人还是双人",
        "设定目标",
        "邀请搭子",
        "组队成功",
        "首页 · 双人",
        "今日小票 · 双人",
        "今日小票 · 我的",
        "手账本 · 封面",
        "手账本 · 我的一周",
        "手账本 · 摊开",
        "挑战 · 进度",
        "挑战 · 规则",
        "目标达成",
        "首页 · 单人",
        "手账本 · 单人",
        "挑战 · 单人",
        "设置",
        "改名"
      ]
    },
    shipping: {
      kicker: "08 / 上架",
      heading: "开发已经完成，接下来是 TestFlight 和 App Store 审核。",
      lead: "目前的版本可以实际运行。剩下的工作包括用户测试、商店素材准备和送审。",
      doneLabel: "已完成",
      done: [
        "23 个界面，设计并开发完成",
        "35 个图标，由三个基本形状生成",
        "双人和单人两种模式",
        "小票、手账和分享卡",
        "一对多的匹配，来自第二次访谈",
        "五段手绘动画"
      ],
      leftLabel: "离上架还差",
      left: [
        "一轮 TestFlight，找真实的搭子来用，也是第一次真正测匹配",
        "隐私标签，以及匹配到底需要哪些数据",
        "App Store 的截图和文案",
        "送审，以及审核提出的任何要求"
      ],
      limit: "最重要的假设还没有验证：看到陌生人的餐食小票，可能带来动力，也可能让人不舒服。两次访谈改变了产品，但无法代替八周的真实使用。下一轮 TestFlight 会重点验证这一点。"
    }
  }
}

/*
 * The matching, drawn: A and B are each other's buddy; C arrives closest
 * to A and is given A, without taking A off B. Strokes are hairlines in
 * ink, like the app's own rules. Everything the figure says is repeated
 * in the legend under it, so the picture is decoration for the sentence
 * rather than the only place the idea lives.
 */
function MatchingFigure({ legend }) {
  return (
    <div className={styles.matchFigure}>
      <svg viewBox="0 0 400 128" role="img" aria-label={legend.map((l) => `${l[0]} ${l[1]}`).join(", ")}>
        <defs>
          <marker id="bubu-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0.5 L9.5 5 L0 9.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </marker>
        </defs>
        {/* C -> A, one way */}
        <line x1="86" y1="64" x2="168" y2="64" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#bubu-arrow)" />
        {/* A <-> B, both ways */}
        <line x1="234" y1="64" x2="312" y2="64" stroke="currentColor" strokeWidth="1.2" markerStart="url(#bubu-arrow)" markerEnd="url(#bubu-arrow)" />
        {[["C", 58], ["A", 200], ["B", 342]].map(([name, x]) => (
          <g key={name}>
            <circle cx={x} cy="64" r="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x={x} y="70" textAnchor="middle" fontSize="20" fontFamily="inherit" fill="currentColor">{name}</text>
          </g>
        ))}
      </svg>
      <ul className={styles.matchLegend}>
        {legend.map(([who, sees]) => (
          <li key={who}><span className={styles.matchWho}>{who}</span><span>{sees}</span></li>
        ))}
      </ul>
    </div>
  )
}

/*
 * One stage per beat. When the recording for it is in, the stage runs it
 * the way Last Message's page runs its loops - silent, phone-shaped, the
 * image its own play control; until then it holds the built screens, so
 * a reader sees the product either way and the layout does not move when
 * the video lands.
 */
function Stage({ name, label, children }) {
  const clip = recording(name)
  return (
    <div className={styles.stage} data-recording={clip ? "" : undefined}>
      {clip
        ? <CaseVideo className={styles.stageVideo} src={clip.src} poster={clip.poster} width={804} height={1748} label={label} />
        : children}
    </div>
  )
}

/* The three primitives, shown as the icons nearest to being just that
   primitive: a minus is the line, a radio is the circle, a square is the
   rounded rectangle. Looked up by id rather than by position, so cutting
   an icon out of the set cannot quietly point these somewhere else. */
const primitiveIcons = ["minus", "radio", "square"].map((id) => icons.find((icon) => icon.id === id))

/* One icon. `d` is stroked, `dot` is a round cap standing in for a dot,
   `fill` is the few solid parts. Colour comes from the text around it. */
function Glyph({ icon, size }) {
  return (
    <svg
      className={styles.glyph}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {icon.d ? <path d={icon.d} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /> : null}
      {icon.dot ? <path d={icon.dot} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /> : null}
      {icon.fill ? <path d={icon.fill} fill="currentColor" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" /> : null}
    </svg>
  )
}

export default function BubuPage({ track = "uiux", locale = "en" }) {
  const t = copy[locale] || copy.en
  const journalPages = ["cover", "title", "mine", "theirs", "spread"].map((key, index) => ({
    src: pick(key, locale),
    step: t.how.journalPages[index][0],
    alt: t.how.journalPages[index][1]
  }))
  const [day, week, finish] = t.how.beats
  const [solo, matching] = t.testing.findings

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track, locale)} track={track} locale={locale} />

        {/* Each section arrives as it is scrolled to rather than all at
            once, the way the other case studies do. */}
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

              {/* The app icon at its real corner radius, next to the line
                  that says where the build actually is. */}
              <div className={`${styles.storeRow} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
                <img className={styles.storeIcon} src={screen("app-icon")} alt="BUBU" width="500" height="500" />
                <div>
                  <p className={styles.microLabel}>{t.hero.storeLabel}</p>
                  <p className={styles.storeLine}>{t.hero.store}</p>
                </div>
              </div>

              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "200ms" }}>
                <div><dt>{t.hero.roleLabel}</dt><dd>{t.hero.role}</dd></div>
                <div><dt>{t.hero.scopeLabel}</dt><dd>{t.hero.scope}</dd></div>
                <div><dt>{t.hero.platformLabel}</dt><dd>{t.hero.platform}</dd></div>
                <div><dt>{t.hero.statusLabel}</dt><dd>{t.hero.status}</dd></div>
              </dl>

              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "240ms" }}>
                <a className={styles.action} href="#how">{t.hero.action} <span aria-hidden="true">&darr;</span></a>
              </div>
            </div>

            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
              <img src="/bubu/phone.webp" alt={t.hero.heroAlt} width="773" height="1328" fetchPriority="high" />
            </div>
          </header>

          <ProjectQuickNav slug="bubu" track={track} locale={locale} />

          <section id="why" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.why.kicker}</p>
              <h2>{t.why.heading}</h2>
              <p className={styles.sectionLead}>{t.why.lead}</p>
            </div>
            <p className={styles.microLabel}>{t.why.rulesLabel}</p>
            <div className={styles.rules}>
              {t.why.rules.map((rule) => (
                <article className={styles.rule} key={rule.label}>
                  <p className={styles.microLabel}>{rule.label}</p>
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="how" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.how.kicker}</p>
              <h2>{t.how.heading}</h2>
              <p className={styles.sectionLead}>{t.how.lead}</p>
            </div>

            <article className={styles.beat}>
              <div className={styles.beatCopy}>
                <p className={styles.microLabel}>{day.label}</p>
                <h3>{day.title}</h3>
                <p>{day.body}</p>
              </div>
              <Stage name="day" label={day.demo}>
                <div className={styles.shots}>
                  <img src={screen("receipt-duo")} alt={day.alts[0]} width="804" height="1748" loading="lazy" decoding="async" />
                  <img src={screen("receipt-mine")} alt={day.alts[1]} width="804" height="1748" loading="lazy" decoding="async" />
                </div>
              </Stage>
            </article>

            <article className={styles.beat}>
              <div className={styles.beatCopy}>
                <p className={styles.microLabel}>{week.label}</p>
                <h3>{week.title}</h3>
                <p>{week.body}</p>
              </div>
              <Stage name="week" label={week.demo}>
                <Journal pages={journalPages} label={t.how.journalStepsLabel} />
              </Stage>
            </article>

            <article className={styles.beat}>
              <div className={styles.beatCopy}>
                <p className={styles.microLabel}>{finish.label}</p>
                <h3>{finish.title}</h3>
                <p>{finish.body}</p>
              </div>
              <Stage name="finish" label={finish.demo}>
                <div className={styles.shots}>
                  <img src={pick("challenge", locale)} alt={finish.alts[0]} width="804" height="1748" loading="lazy" decoding="async" />
                  <img src={screen("goal-reached")} alt={finish.alts[1]} width="804" height="1748" loading="lazy" decoding="async" />
                </div>
              </Stage>
            </article>
          </section>

          <section id="testing" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.testing.kicker}</p>
              <h2>{t.testing.heading}</h2>
              <p className={styles.sectionLead}>{t.testing.lead}</p>
            </div>

            <article className={styles.finding}>
              <dl className={styles.findingText}>
                <div><dt>{t.testing.whoLabel}</dt><dd className={styles.findingWho}>{solo.who}</dd></div>
                <div><dt>{t.testing.saidLabel}</dt><dd>{solo.said}</dd></div>
                <div><dt>{t.testing.changedLabel}</dt><dd>{solo.changed}</dd></div>
              </dl>
              <Stage name="solo" label={solo.demo}>
                <div className={styles.shots} data-count="3">
                  <img src={screen("home-solo")} alt={solo.alts[0]} width="804" height="1748" loading="lazy" decoding="async" />
                  <img src={screen("journal-solo")} alt={solo.alts[1]} width="804" height="1748" loading="lazy" decoding="async" />
                  <img src={screen("challenge-solo")} alt={solo.alts[2]} width="804" height="1748" loading="lazy" decoding="async" />
                </div>
              </Stage>
            </article>

            <article className={styles.finding}>
              <dl className={styles.findingText}>
                <div><dt>{t.testing.whoLabel}</dt><dd className={styles.findingWho}>{matching.who}</dd></div>
                <div><dt>{t.testing.saidLabel}</dt><dd>{matching.said}</dd></div>
                <div><dt>{t.testing.changedLabel}</dt><dd>{matching.changed}</dd></div>
              </dl>
              <Stage name="matching" label={matching.demo}>
                <div className={styles.shots} data-count="figure">
                  <div className={styles.figureCell}>
                    <p className={styles.microLabel}>{t.testing.figureLabel}</p>
                    <MatchingFigure legend={t.testing.legend} />
                  </div>
                  <img src={screen("matched")} alt={matching.alt} width="804" height="1748" loading="lazy" decoding="async" />
                </div>
              </Stage>
            </article>

            <p className={styles.sourceNote}>{t.testing.note}</p>
          </section>

          <section id="look" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.look.kicker}</p>
              <h2>{t.look.heading}</h2>
              <p className={styles.sectionLead}>{t.look.lead}</p>
            </div>

            <div>
              <p className={styles.microLabel}>{t.look.swatchLabel}</p>
              <ul className={styles.swatches}>
                {palette.map((hex, index) => (
                  <li key={hex}>
                    <span className={styles.swatch} style={{ background: hex }} aria-hidden="true" />
                    <p className={styles.swatchName}>{t.look.swatches[index][0]}</p>
                    <p className={styles.swatchHex}>{hex}</p>
                    <p className={styles.swatchUse}>{t.look.swatches[index][1]}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.lookGrid}>
              <div>
                <p className={styles.microLabel}>{t.look.typeLabel}</p>
                <p className={styles.typeSpec}>0123456789 · MISSED 1 / 3 · 08:05</p>
                <p>{t.look.type}</p>
              </div>
              <div>
                <p className={styles.microLabel}>{t.look.rulesLabel}</p>
                <ul className={styles.refusals}>
                  {t.look.rules.map((rule) => <li key={rule}>{rule}</li>)}
                </ul>
              </div>
            </div>

            <figure className={styles.detail}>
              <img src={screen("set-goal")} alt={t.look.detailAlt} width="804" height="1748" loading="lazy" decoding="async" />
              <figcaption>{t.look.detailCaption}</figcaption>
            </figure>
          </section>

          <section id="iconset" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.iconset.kicker}</p>
              <h2>{t.iconset.heading}</h2>
              <p className={styles.sectionLead}>{t.iconset.lead}</p>
            </div>

            {/* The set as one sheet: thirty-five drawings on the app's paper,
                seven to a row, which fills the rectangle exactly. Nothing is
                labelled at rest. Pointing at a drawing brings it up to ink
                and prints its name under it, drops everything else back to
                a trace, and leaves its own family half-dark, so the four
                families show themselves without a rule between them. */}
            <div className={styles.sheetWrap}>
              <ul className={styles.sheet}>
                {icons.map((icon, at) => {
                  const family = iconFamilies.indexOf(icon.cat)
                  return (
                    <li className={styles.cell} key={icon.id} data-family={icon.cat} style={{ "--i": at }}>
                      <Glyph icon={icon} size={44} />
                      <span className={styles.cellName}>
                        <span className={styles.cellFamily}>{t.iconset.families[family][0]}</span>
                        {icon.id}
                      </span>
                    </li>
                  )
                })}
              </ul>

              {/* The families, as a line under the sheet. Pointing at one
                  lights its icons in place on the sheet above. */}
              <ul className={styles.legend}>
                {iconFamilies.map((family, index) => (
                  <li className={styles.legendItem} key={family} data-family={family}>
                    <span className={styles.legendName}>{t.iconset.families[index][0]}</span>
                    <span className={styles.legendWhat}>{t.iconset.families[index][1]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.lookGrid}>
              <div>
                <p className={styles.microLabel}>{t.iconset.partsLabel}</p>
                <dl className={styles.primitives}>
                  {t.iconset.parts.map(([name, how], index) => (
                    <div key={name}>
                      <dt>
                        <Glyph icon={primitiveIcons[index]} size={30} />
                        {name}
                      </dt>
                      <dd>{how}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <p className={styles.microLabel}>{t.iconset.wobbleLabel}</p>
                <p>{t.iconset.wobble}</p>
                <p className={styles.microLabel}>{t.iconset.rulesLabel}</p>
                <ul className={styles.refusals}>
                  {t.iconset.rules.map((rule) => <li key={rule}>{rule}</li>)}
                </ul>
              </div>
            </div>
            <p className={styles.sourceNote}>{t.iconset.drawNote}</p>
          </section>

          <section id="cast" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.cast.kicker}</p>
              <h2>{t.cast.heading}</h2>
              <p className={styles.sectionLead}>{t.cast.lead}</p>
            </div>
            <ul className={styles.cast}>
              {cast.map((clip, index) => (
                <li className={styles.castItem} key={clip.src}>
                  <Loop
                    className={styles.castLoop}
                    src={clip.src}
                    webm={clip.webm}
                    poster={clip.poster}
                    alt={t.cast.clips[index][0]}
                  />
                  <p className={styles.castName}>{t.cast.clips[index][0]}</p>
                  <p className={styles.castWhere}>{t.cast.clips[index][1]}</p>
                </li>
              ))}
            </ul>
            <p className={styles.sourceNote}>{t.cast.note}</p>
          </section>

          <section id="screens" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.screens.kicker}</p>
              <h2>{t.screens.heading}</h2>
              <p className={styles.sectionLead}>{t.screens.lead}</p>
            </div>
            <ul className={styles.rail}>
              {rail.map((src, index) => (
                <li className={styles.railItem} key={src}>
                  <img src={src} alt={t.screens.rail[index]} width="804" height="1748" loading="lazy" decoding="async" />
                  <span>{String(index + 1).padStart(2, "0")} · {t.screens.rail[index]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="shipping" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.shipping.kicker}</p>
              <h2>{t.shipping.heading}</h2>
              <p className={styles.sectionLead}>{t.shipping.lead}</p>
            </div>
            <div className={styles.shipGrid}>
              <div>
                <p className={styles.microLabel}>{t.shipping.doneLabel}</p>
                <ul className={styles.shipList} data-done="">
                  {t.shipping.done.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <p className={styles.microLabel}>{t.shipping.leftLabel}</p>
                <ul className={styles.shipList}>
                  {t.shipping.left.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            <p className={styles.limitNote}>{t.shipping.limit}</p>
          </section>

          <ProjectNav slug="bubu" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
