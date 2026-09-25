import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import CaseVideo from "../cleared/CaseVideo"

import { Journal } from "./Journal"
import { Loop } from "./Loop"
import styles from "./page.module.css"

export const metadata = {
  title: "BUBU",
  description:
    "A weight-loss app for two, built for the App Store: a receipt a day, a journal a week, a solo mode and a matching system that came out of two interviews."
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

/* Five loops, one pen. Where each one runs is in `copy.cast.clips`. */
const cast = [
  { src: motion("jumprope.mp4"), webm: motion("jumprope.webm"), poster: motion("jumprope.webp") },
  { src: motion("duo.mp4"), poster: motion("duo.webp") },
  { src: motion("solo.mp4"), poster: motion("solo.webp") },
  { src: motion("finish.mp4"), poster: motion("finish.webp") },
  { src: motion("cheer.mp4"), poster: motion("cheer.webp") }
]

const copy = {
  en: {
    hero: {
      pill: "Self-initiated",
      context: "Product Design · iOS · 2026",
      titleA: "BUBU:",
      titleB: "losing weight in pairs.",
      lead: "An iOS app for two people on the same eight weeks. You photograph what you ate, the day prints itself as a receipt, and seven receipts bind into a paper journal you both sign.",
      storeLabel: "App Store",
      store: "Build complete · preparing submission",
      roleLabel: "Role",
      role: "Product design, UI, illustration",
      scopeLabel: "Scope",
      scope: "23 screens · paired and solo",
      platformLabel: "Platform",
      platform: "iOS · iPhone 17",
      statusLabel: "Status",
      status: "Built · one round of interviews · TestFlight next",
      action: "How it works",
      heroAlt: "The BUBU home screen on an iPhone: day 24, both players' progress, and the meals they logged today"
    },
    why: {
      kicker: "01 / Why it exists",
      heading: "A dazi is easy to find and easy to lose.",
      lead: "In China a dazi (搭子) is a partner for exactly one activity: a lunch dazi, a gym dazi. What makes it appealing is how little it asks, and that is also why it falls apart. Nothing holds the pairing together, so it quietly stops after a week and the search starts again. Dieting is the worst case, because it needs two months rather than one evening.",
      rulesLabel: "Three rules the whole product is built on",
      rules: [
        {
          label: "01 / One subject",
          title: "You share food. Nothing else.",
          body: "No chat, no feed, no profile, no display name. For the length of the challenge you are both a user id and a plate of food."
        },
        {
          label: "02 / A fixed end",
          title: "It ends on a date, not on a decision.",
          body: "You pick 4, 8 or 12 weeks at setup and both pages count down to the same day. Nobody has to be the one who quits."
        },
        {
          label: "03 / Visible absence",
          title: "A missed day prints as a blank.",
          body: "No nudge, no guilt notification. An empty dashed frame on the day's receipt, and a counter that reads MISSED 1 / 3."
        }
      ]
    },
    how: {
      kicker: "02 / How it works",
      heading: "Photograph the meal. The rest prints itself.",
      lead: "There is no form to fill in. You shoot the plate, the app cuts it out of its background, and from there the product is three pieces of printed matter: a receipt a day, a spread a week, and a track that runs the length of the challenge.",
      beats: [
        {
          label: "The day",
          title: "At 23:59 the day seals itself as a receipt.",
          body: "A receipt is already read as a day that has been closed and totalled. Sealing it means yesterday cannot be edited to look better, which is the only reason the other person's copy is worth anything. It is also the most useful answer to what to eat tonight: a real meal, eaten by someone on the same plan.",
          demo: "Logging a meal and watching the day seal into a receipt",
          alts: [
            "Both players' receipts for the day, printed side by side on a black ground",
            "One receipt in full: each meal with its time, the exercise line, and the day's progress"
          ]
        },
        {
          label: "The week",
          title: "Seven receipts, bound and laid open.",
          body: "The journal is the only place the two of you are shown as one object. Turn it and the cover, the title page, your week and their week come up in order; open it flat and both weeks read across the gutter at once.",
          demo: "Turning the journal from the cover to the open spread"
        },
        {
          label: "The finish",
          title: "One track, two runners, a date at the end.",
          body: "The home screen keeps the two of you on one track. The challenge page keeps the rules and the count. When the date arrives, the last screen is a celebration and a receipt you can share.",
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
      heading: "Two conversations, two changes to the product.",
      lead: "Before TestFlight I sat down with two people who would meet the app from opposite ends: someone who would use it, and someone who has shipped things like it.",
      whoLabel: "Who",
      saidLabel: "What they said",
      changedLabel: "What changed",
      findings: [
        {
          who: "A fitness creator with 20,000 followers",
          said: "She liked the interface enough to want it for herself, on her own. Her point was that people will come for how it looks and may not have a buddy to hand, and the app should not turn them away at the door.",
          changed: "A solo mode. The same home, journal and challenge, with one runner on the track and a journal that holds only your week. Pairing became something you can add later rather than the price of entry.",
          demo: "Running a challenge alone: home, journal and challenge in solo mode",
          alts: [
            "Home in solo mode: one runner on the track",
            "The journal in solo mode: one week, one page",
            "The challenge page in solo mode"
          ]
        },
        {
          who: "A product designer with three years of shipped work",
          said: "His concern was the cold start. Matching strangers online is a bad experience in a new app, because there are not yet enough strangers: you wait, or you are given someone nothing like you.",
          changed: "Matching that is one-to-one for you and one-to-many for the system. You are shown exactly one buddy, chosen for a similar goal, a similar starting weight and the same length of challenge. But the person you are shown may already be someone else's buddy, and that is allowed. When A and B are paired and C arrives closest to A, C is matched to A; A still sees B, and B still sees A. Nobody waits for an even number of people to turn up.",
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
      heading: "Flat paper, hairlines, and photographs printed straight onto it.",
      lead: "The whole app is one material. Nothing floats, nothing has a shadow, and nothing is rounded except the phone it runs on.",
      swatchLabel: "Four surfaces, one ink",
      swatches: [
        ["Paper", "Every screen but the journal and the receipt"],
        ["Board", "The journal's cover cloth and the desk it lies on"],
        ["Page", "The journal's own paper, a shade warmer than the app"],
        ["Ink", "Type, rules, the black key and the receipt ground"]
      ],
      typeLabel: "Two typefaces, no third",
      type: "Geist Mono carries every number, label and timestamp, because a receipt is a printed object and a receipt's numbers line up. Noto Sans SC carries the sentences. Nothing is set in a script face; the only handwriting in the app is drawn, not typed.",
      rulesLabel: "What the system refuses",
      rules: [
        "No drop shadows and no elevation. A card is a rule, not a layer.",
        "No rounded corners. Right angles everywhere, including the buttons.",
        "No white border on a photograph. A meal is cut out of its background and printed onto the paper.",
        "One filled button per screen, in ink, as a plain rectangle. The receipt is the one place the system inverts: paper type on a black ground."
      ],
      detailAlt: "Setting the goal: height, current weight, target weight in mono, and the 4, 8 or 12 week choice",
      detailCaption: "Setting the goal. The numbers in mono, the 4 / 8 / 12 week choice set as three figures rather than a control, and the one ink button on the screen."
    },
    cast: {
      kicker: "05 / The cast",
      heading: "One pen, five loops.",
      lead: "The app has no mascot and no illustration library. It has a cast of two, drawn with the same line as the interface rules, who appear only at the moments the product needs a person rather than a number.",
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
      kicker: "06 / Every screen",
      heading: "The whole build, in the order you meet it.",
      lead: "Nineteen screens captured on an iPhone 17 simulator, from sign-up to the settings page. Drag the strip.",
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
      kicker: "07 / Shipping it",
      heading: "What is built, and what is between here and the App Store.",
      lead: "The app is not a prototype. It is a build that runs, and the work left is the work of getting a build reviewed rather than designed.",
      doneLabel: "Done",
      done: [
        "23 screens, designed and built",
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
      limit: "One thing is still untested: the whole product rests on the assumption that a stranger's receipt is motivating rather than uncomfortable. Two interviews moved the product, but two interviews are not eight weeks of use. That is what TestFlight is for."
    }
  },

  zh: {
    hero: {
      pill: "自发项目",
      context: "产品设计 · iOS · 2026",
      titleA: "BUBU：",
      titleB: "两个人一起减脂。",
      lead: "一个给两个人用的 iOS 应用，同一个八周。你拍下这一餐，这一天自己印成一张小票，七张小票装订成一页你们共同签收的手账。",
      storeLabel: "App Store",
      store: "开发已完成 · 正在准备上架",
      roleLabel: "我的角色",
      role: "产品设计、UI、插画",
      scopeLabel: "范围",
      scope: "23 个界面 · 双人与单人",
      platformLabel: "平台",
      platform: "iOS · iPhone 17",
      statusLabel: "状态",
      status: "已完成开发 · 做了一轮访谈 · 接下来是 TestFlight",
      action: "它怎么运作",
      heroAlt: "iPhone 上的 BUBU 首页：第 24 天、两个人的进度，以及今天各自记的餐"
    },
    why: {
      kicker: "01 / 它为什么存在",
      heading: "搭子好找，也好散。",
      lead: "搭子只对应一件事：饭搭子、健身搭子。它吸引人的地方在于要求很低，散得快也是同一个原因。没有东西把两个人绑在一起，一周之后就悄悄停了，然后重新开始找。减脂是其中最难的一种，因为它要撑两个月，不是一个晚上。",
      rulesLabel: "整个产品建立在三条规则上",
      rules: [
        {
          label: "01 / 只共享一件事",
          title: "你们只共享吃了什么。",
          body: "没有聊天、没有动态、没有主页、没有昵称。在这场挑战里，你们彼此就是一个用户 ID 和一盘饭。"
        },
        {
          label: "02 / 有固定的终点",
          title: "它在某一天结束，不靠谁决定。",
          body: "开始时选 4 周、8 周或 12 周，两个人的页面倒数同一天。没有人需要当那个先退出的人。"
        },
        {
          label: "03 / 缺席是看得见的",
          title: "漏掉的那天会印成一块空白。",
          body: "不催、不发让人内疚的通知。当天的小票上留一个虚线空框，计数写着 MISSED 1 / 3。"
        }
      ]
    },
    how: {
      kicker: "02 / 它怎么运作",
      heading: "拍下这一餐，剩下的自己印出来。",
      lead: "没有表格要填。你拍一下盘子，app 把它从背景里抠出来，之后整个产品就是三样印刷品：一天一张小票，一周一页手账，还有一条贯穿整场挑战的跑道。",
      beats: [
        {
          label: "一天",
          title: "23:59，这一天自己封成一张小票。",
          body: "小票本来就读作一个已经结清、已经合计过的日子。封存意味着昨天不能再改得好看一点，这是对方手上那一张唯一值钱的原因。它同时也是今晚吃什么最有用的答案：一顿真实的饭，被一个跟你同一套计划的人吃掉。",
          demo: "记一餐，然后看着这一天封成一张小票",
          alts: [
            "两个人当天的小票，并排印在黑色底上",
            "一张完整的小票：每一餐带时间、运动那一行，以及这一天的进度"
          ]
        },
        {
          label: "一周",
          title: "七张小票，装订起来摊开。",
          body: "手账是整个产品里唯一把两个人显示成一件东西的地方。一页页翻过去是封面、扉页、我的一周、TA 的一周；摊平了看，两周的内容横跨订口一起读。",
          demo: "把手账从封面翻到摊开"
        },
        {
          label: "终点",
          title: "一条跑道，两个人，尽头是一个日期。",
          body: "首页把你们俩放在同一条跑道上，挑战页放着规则和计数。日期到了，最后一屏是庆祝，和一张可以分享出去的小票。",
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
      heading: "两次访谈，改了两处。",
      lead: "TestFlight 之前，我找了两个从相反方向接触这个 app 的人聊：一个会用它的人，一个做过这类东西的人。",
      whoLabel: "谁",
      saidLabel: "她 / 他说了什么",
      changedLabel: "改了什么",
      findings: [
        {
          who: "一位有两万粉丝的健身博主",
          said: "她喜欢这套界面，喜欢到想自己一个人用。她的意思是，很多人会冲着好看来，手边未必有搭子，app 不该把这些人挡在门口。",
          changed: "加了单人模式。同样的首页、手账和挑战，跑道上只有一个人，手账里只有你自己那一周。配对变成以后可以加的东西，不再是进门的条件。",
          demo: "一个人跑一场挑战：单人模式的首页、手账和挑战",
          alts: [
            "单人模式的首页：跑道上只有一个人",
            "单人模式的手账：一周，一页",
            "单人模式的挑战页"
          ]
        },
        {
          who: "一位有三年经验的产品设计师",
          said: "他担心的是冷启动。新 app 里线上匹配陌生人的体验非常差，因为陌生人还不够多：要么一直等，要么配到一个和你完全不像的人。",
          changed: "把匹配改成对你是一对一、对系统是一对多。你只会看到一个搭子，按目标接近、起始体重接近、周期一样长来选。但你看到的这个人可能已经是别人的搭子了，这是允许的。A 和 B 配成一对之后，C 进来时和 A 最像，C 就配给 A；A 看到的还是 B，B 看到的还是 A。没有人需要等到凑齐偶数才能开始。",
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
      heading: "平的纸、细线，照片直接印在上面。",
      lead: "整个 app 只用一种材质。没有东西浮起来，没有阴影，除了手机本身没有圆角。",
      swatchLabel: "四个面，一种墨",
      swatches: [
        ["纸", "除手账和小票以外的每一屏"],
        ["板", "手账的封面布，以及它躺着的那张桌面"],
        ["页", "手账自己的纸，比 app 暖一点"],
        ["墨", "文字、分隔线、黑色按钮和小票底色"]
      ],
      typeLabel: "两款字，没有第三款",
      type: "所有数字、标签和时间都用 Geist Mono，因为小票是印出来的东西，印出来的数字要对齐。句子用 Noto Sans SC。没有任何一处用手写体：app 里唯一的手写是画上去的，不是打出来的。",
      rulesLabel: "这套系统拒绝的东西",
      rules: [
        "不用投影，也没有层级高度。卡片是一条线，不是一层。",
        "不用圆角。哪里都是直角，按钮也一样。",
        "照片不留白边。一餐被从背景里抠出来，直接印在纸上。",
        "每屏只有一个实心按钮，墨色，就是一个矩形。唯一反过来的地方是小票：纸色的字印在黑底上。"
      ],
      detailAlt: "设定目标：身高、当前体重、目标体重用等宽字，以及 4、8、12 周的选择",
      detailCaption: "设定目标这一屏。数字用等宽字，4 / 8 / 12 周直接排成三个数字而不是一个控件，整屏只有一个墨色按钮。"
    },
    cast: {
      kicker: "05 / 这些小人",
      heading: "一支笔，五段动画。",
      lead: "这个 app 没有吉祥物，也没有插画库。它只有两个小人，用和界面分隔线同一条线画出来，只在产品需要一个人而不是一个数字的时刻出现。",
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
      kicker: "06 / 全部界面",
      heading: "整个 app，按你第一次用的顺序。",
      lead: "19 个界面，在 iPhone 17 模拟器上截的，从注册到设置。这一排可以横向拖动。",
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
      kicker: "07 / 上架",
      heading: "做完了什么，离 App Store 还差什么。",
      lead: "这不是一个原型，是一个能跑起来的版本。剩下的工作属于送审，不属于设计。",
      doneLabel: "已完成",
      done: [
        "23 个界面，设计并开发完成",
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
      limit: "有一件事仍然没验证：整个产品压在一个假设上，就是看到一个陌生人的小票是有动力的，而不是让人不舒服。两次访谈推着产品往前走了，但两次访谈不等于八周的使用。TestFlight 就是去看这个的。"
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
