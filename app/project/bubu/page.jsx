import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"

import { Hand } from "./Hand"
import { iconFamilies, icons } from "./icons"
import { Loop } from "./Loop"
import { MatchingModel } from "./MatchingModel"
import { Userflow } from "./Userflow"
import styles from "./page.module.css"

export const metadata = {
  title: "BUBU",
  description:
    "BUBU is an iOS app I designed and built for an eight-week weight-loss challenge. Meal photos become daily receipts and weekly journals; solo mode and its matching model came from two early interviews.",
  ...projectShareCard("bubu", {
    title: "BUBU",
    description:
      "BUBU is an iOS app I designed and built for an eight-week weight-loss challenge. Meal photos become daily receipts and weekly journals; solo mode and its matching model came from two early interviews.",
    alt: "BUBU: the home screen on a phone, beside the app icon"
  })
}

/*
 * The case study reads in the order the product makes sense: why it
 * exists, how it works, what two conversations changed about it, the icons
 * and the cast, the map of the build, nine of its screens, and what is
 * left before the App Store. The screens are the artwork throughout; the
 * reasoning is kept to the two sections that carry a decision.
 *
 * Everything that has no language - file paths, hex values, the order the
 * screens run in - is a constant below, and the labels that go with them
 * are index-aligned arrays inside `copy`, so the two languages cannot
 * drift apart from each other or from the screens.
 */
const screen = (name) => `/bubu/screens/${name}.webp`
const motion = (name) => `/bubu/motion/${name}`

/* The usage recordings, one per beat, run beside the writing the way the
   Last Message page runs its loops. Each is recorded twice, off the
   English build and the Chinese one, and the reader gets the one in their
   own language - the interface in the video should say what the page
   around it says. A beat with no recording (null) shows the built screens
   instead, so the layout is the same either way.

   Files are /public/bubu/media/<name>-<locale>.mp4 and a .webp poster cut
   from the same recording, portrait at the phone's own aspect. */
const recordings = {
  mode: ["en", "zh"],
  journal: ["en", "zh"],
  race: ["en", "zh"]
}
const recording = (name, locale) => {
  const langs = recordings[name]
  if (!langs) return null
  const lang = langs.includes(locale) ? locale : langs[0]
  return { src: `/bubu/media/${name}-${lang}.mp4`, poster: `/bubu/media/${name}-${lang}.webp` }
}

/* The screens, as a hand of nine cards rather than a strip of every
   capture: the simulator's own screenshots with nothing round them but
   the device's corner and a shadow, fanned along one ruled line in the
   order the product is met. They are captured twice, off the English build and
   the Chinese one, and the reader gets the set in their own language: the
   files are /public/bubu/screens/<locale>/<file>.webp, exported by
   scripts/bubu-media-build.cjs, which keeps the captures' names. What
   each one is called is in `copy.screens.names`, one per entry. */
const hand = [
  "02-welcome-signin",
  "06-setup-weeks",
  "07-setup-mode",
  "08-setup-ready",
  "09-home-duo",
  "16-journal",
  "15-my-receipt",
  "20-buddy-panel",
  "18-challenge-progress"
]
const handScreen = (file, locale) => screen(`${locale === "zh" ? "zh" : "en"}/${file}`)

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
      pill: "Personal project",
      context: "Product Design · iOS · 2026",
      titleA: "BUBU:",
      titleB: "an eight-week challenge for two.",
      lead: "I designed BUBU around one small daily habit: take a photo of what you ate. The app turns each day into a receipt, then lays seven of them out as a journal for you and your buddy.",
      storeLabel: "App Store",
      store: "Working build · preparing submission",
      roleLabel: "Role",
      role: "Product design, UI, illustration",
      scopeLabel: "Scope",
      scope: "23 screens · 35 icons · paired and solo",
      platformLabel: "Platform",
      platform: "iOS · iPhone 17",
      statusLabel: "Status",
      status: "Built · two interviews · TestFlight next",
      action: "See how it works",
      heroAlt: "The BUBU home screen on an iPhone: day 21, the meals logged today beside an empty frame for a buddy who has not joined yet, and both runners on the track"
    },
    why: {
      kicker: "01 / Why it exists",
      heading: "Finding a dazi is easy. Making it to week eight together is the hard part.",
      lead: "In China, a dazi (搭子) is someone you meet for one thing, perhaps lunch or a trip to the gym. Neither person asks for much, so it is easy to start and just as easy to stop. That is fine for dinner. It gets shakier when the plan lasts two months.",
      rulesLabel: "Three choices I built around",
      rules: [
        {
          label: "01 / Keep it narrow",
          title: "You only share what you ate.",
          body: "There is no chat, feed, profile or display name. For the length of the challenge, your buddy sees a user ID and the meals you logged."
        },
        {
          label: "02 / Know where it ends",
          title: "Pick the finish date before day one.",
          body: "At setup, you choose 4, 8 or 12 weeks. Both people see the same countdown, so no one has to be the person who calls the challenge over."
        },
        {
          label: "03 / Leave the gap",
          title: "If you miss a day, the blank stays.",
          body: "BUBU does not chase you with reminders or guilt. A missed day leaves a dashed frame on the receipt and a plain counter such as MISSED 1 / 3."
        }
      ]
    },
    how: {
      kicker: "02 / How it works",
      heading: "Take the photo; BUBU keeps the record.",
      lead: "There is no form to fill in. Choose solo or paired mode, photograph each plate, and BUBU cuts out the background. The meal then appears on today's receipt, in the weekly journal and on the challenge track.",
      beats: [
        {
          label: "Start",
          title: "Start alone or bring a buddy.",
          body: "BUBU first asks how you want to log. Solo mode keeps the same home screen, receipts and journal, with one runner on the track. In paired mode, you can be matched or invite someone, and a second runner appears. You can switch modes later in Settings.",
          demo: "Choosing solo or paired mode"
        },
        {
          label: "Day by day",
          title: "Seven receipts become a weekly journal.",
          body: "Open the journal and your week sits beside your buddy's. Each day is a small cluster of cut-out meals, and tapping it opens that day's receipt. At 23:59 the receipt locks. Yesterday cannot be cleaned up after the fact, so your buddy sees what you actually logged that day.",
          demo: "Opening the weekly journal, then a locked daily receipt"
        },
        {
          label: "One finish line",
          title: "Both people run on the same clock.",
          body: "The challenge page keeps each person's medals in view, including first step, perfect week and halfway. The rules are one tap away: log every day, and three missed days in a row end the challenge for both people. On Home, the two runners move toward the same finish date.",
          demo: "Checking the medals and rules, then returning to the shared track"
        }
      ]
    },
    testing: {
      kicker: "03 / After two conversations",
      heading: "I spoke to two people, then changed the product twice.",
      lead: "Before TestFlight, I showed the prototype to a potential user and to a product designer who had shipped similar work.",
      saidLabel: "What I heard",
      changedLabel: "What I changed",
      findings: [
        {
          who: "A fitness creator with 20,000 followers",
          said: "She liked the interface and wanted to use it on her own. Someone might come to BUBU for the way it looks before they have a buddy; asking them to pair up at sign-up would stop them before they had started.",
          changed: "I added solo mode. The home screen, journal and challenge all stay, but there is one runner on the track and one week in the journal. Pairing can come later."
        },
        {
          who: "A product designer with three years of shipped work",
          said: "He pointed out the cold-start problem: a new app has a small matching pool, so people may wait a long time or get paired with someone who is not very similar.",
          changed: "I changed matching to work one way. Each person sees the rival closest to them in height and weight, goal and challenge length. One person can be the rival for several others, so no one has to wait for a mutual match. Invite-code buddies still see each other both ways."
        }
      ],
      model: {
        label: "The matching idea after interview 02",
        title: "You see one rival. More than one person may see you.",
        steps: [
          ["Join the pool", "Valid goal · agreed to anonymous matching", "Anyone with a valid goal who agrees to anonymous matching enters the pool."],
          ["Remove the obvious noes", "Not yourself · not your buddy · available", "When B needs a rival, B, B's invited buddy P and anyone unavailable are removed first."],
          ["Find the closest person", "Height & weight · goal · length", "The remaining people are compared with B by height and weight, goal and challenge length. D is the closest."],
          ["Give B one rival", "Creates B → D", "B now sees D. D is not asked to match back and still sees only their own rival."]
        ],
        people: {
          A: { name: "User A", note: "A sees only B. B does not see A back." },
          B: { name: "User B", note: "B sees D, while A and C see B. B and P are paired by invite code. One log from B updates all four relationships." },
          C: { name: "User C", note: "C was given B too. C sees B, and B still sees only D." },
          D: { name: "User D", note: "D is B's rival but does not see B. D's own rival is off this picture." },
          P: { name: "Invited buddy P", note: "P joined with B's invite code, so the two see each other. The system skips P when it picks B's rival." }
        },
        inviteCode: "invite code",
        aria: "A sees B, C sees B, B sees D, and B and P see each other through an invite code.",
        legend: "A solid arrow shows the system's pick: the person at the tail sees the person at the head. A dashed line joins invite-code buddies, who see each other. Point to anyone to trace their connections.",
        rules: [
          ["One rival each", "A sees only B; B sees only D.", "Each person has one outgoing arrow. A sees B, and B sees D."],
          ["Any number can see you", "B is A's rival and C's at once. Nobody has to pick back.", "Several arrows can point to the same person. B is the rival for both A and C, without having to choose either of them."],
          ["Each relationship updates separately", "One day's log updates every race it belongs to.", "B logs once, and that entry updates B's relationships with A, C, D and P."]
        ],
        open: "Still open: both people missing the same day, ties, and which photos a system-matched rival can see."
      },
      note: "Both conversations were about the prototype. No real pair had completed a challenge yet."
    },
    iconset: {
      kicker: "04 / The icon set",
      heading: "I drew all 35 icons with the same slightly wobbly hand.",
      lead: "A clean, geometric icon set looked out of place beside the illustrations and handwritten numbers. I kept the pen consistent, then drew each icon much as I would sketch it on paper.",
      partsLabel: "What stays consistent",
      parts: [
        ["One pen", "The icons, illustrations and dividers all use the same stroke weight."],
        ["Loose corners", "Circles stop a little short; corners turn by hand instead of snapping into place."],
        ["Only the lines it needs", "At 24 px, every stroke has to help the icon read."]
      ],
      wobbleLabel: "Why the wobble stays",
      wobble: "A ruler-straight icon beside a hand-drawn figure looked as if it belonged to another app. These lines bow and drift a little, the way quick sketches do, and each icon drifts differently.",
      rulesLabel: "A few hard rules",
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
      drawNote: "The icons draw themselves when this section enters the screen. Hover over one to isolate it, or hover over a family to find the whole group."
    },
    cast: {
      kicker: "05 / The cast",
      heading: "The same two little runners show up all through BUBU.",
      lead: "I drew five loops with the same line weight as the rest of the interface. They appear when a number is not quite enough: an empty state, meeting a buddy, running alone, crossing the line or reaching the goal.",
      clips: [
        ["Skipping", "Empty states, and the pause between two challenges"],
        ["Both of you", "The screen that confirms a match"],
        ["Solo", "Home, when you are running the challenge alone"],
        ["The finish", "Crossing the line on the last day"],
        ["Goal reached", "The celebration screen, and the receipt you can share from it"]
      ],
      note: "Each loop plays only while it is on screen."
    },
    /* The map's tree is a constant in Userflow.jsx; what each screen is
       called and what it is for is here, keyed by the screen's id, so the
       two languages cannot drift from the drawing. */
    userflow: {
      kicker: "06 / The map",
      heading: "All 23 screens, from sign-in to the finish line.",
      lead: "This is the working build, screen by screen. Solo and paired mode mostly follow the same paths; paired mode adds the moments where a buddy enters the picture.",
      label: "The whole build",
      title: "Most places are within two taps of Home.",
      aria: "A map of the build: sign in and set up lead to Home; from Home, recording, today's receipt, the journal, the challenge, the match sheet and settings.",
      legend: "Solid lines are taps. Dashed lines open a sheet over the current screen. Tinted screens belong only to paired mode. Point to any screen to trace the route from Home.",
      pairedOnly: "Only in paired mode.",
      nodes: {
        signin: ["Sign in", "Register or sign in. A returning account goes straight to Home."],
        setup: ["Set up", "Six short screens ask for a name, height and weight, a target, 4, 8 or 12 weeks, and solo or paired mode, then end on a ready screen."],
        home: ["Home", "See the day count, today's cut-out meals, both runners and the track. The black button adds a record; the corner menu opens Settings."],
        record: ["Record what?", "This sheet opens over Home. Logging a meal, exercise or weight checks in the day."],
        mealphoto: ["Meal photo", "Photograph the plate, let BUBU remove the background, then choose breakfast, lunch, dinner or snack. The cut-out goes onto today's receipt."],
        exercise: ["Exercise", "Add the activity and duration, or read today's workouts from Health. It appears as one line on the receipt."],
        weight: ["Weight", "Add this morning's number and, if you want, a photo of the scale. The progress figure on Home moves with it."],
        receipt: ["Today's receipt", "Tap today's polaroids to see each meal and its time, progress, streak and missed days. In paired mode, your buddy's receipt sits beside yours. Both lock at 23:59."],
        journal: ["Journal", "The tab on the left. One spread a week."],
        week: ["Weekly journal", "Seven days of cut-out meals, with the week's weight pinned to the page. Move between weeks along the bottom."],
        overview: ["Overview", "Both pages at once: your week on the left, your buddy's on the right, the same seven days."],
        dayreceipt: ["A day's receipt", "Tap any day to open its receipt. It is the same view Home uses for today."],
        locked: ["Older weeks", "Free keeps the past seven days. Further back, each day is a dashed Plus placeholder."],
        plus: ["BUBU Plus", "Every page of the journal, every receipt and medal kept, for you and one buddy. Yearly or monthly, the first seven days free."],
        challenge: ["Challenge", "The tab on the right: how far along you both are, and what the rules are."],
        progress: ["Progress", "Day 21 of 56, and the medals so far for each of you: first step, perfect week, halfway, finish line."],
        rules: ["Rules", "Pair with a code, log once a day, end the challenge after three missed days in a row and earn medals at milestones. Both missed-day counters live here too."],
        paired: ["Matched", "When a buddy arrives, this sheet opens over Home with their details, what you share, both goals and a button to begin."],
        settings: ["Settings", "Open it from the corner of Home to find Plus, your name and password, mode, units and language."],
        plus2: ["BUBU Plus", "The same sheet the journal opens, reached from Settings instead."],
        name: ["Change name", "Two wheels, the same as at setup: the name your buddy sees. Your username stays."],
        mode: ["Mode", "Solo or paired, the same choice as at setup. It can be changed any time."],
        language: ["Language", "System default, 简体中文 or English, picked in place."],
        block: ["Report & block", "Ends the pairing with that person."]
      }
    },
    screens: {
      kicker: "07 / The screens",
      heading: "A closer look at nine screens.",
      lead: "These are captures from the working build in an iPhone 17 simulator, covering setup, a day's record and a paired challenge.",
      names: ["Sign in", "Plan length", "Solo or paired", "Ready", "Home", "Weekly journal", "Today's receipt", "Matched", "Challenge progress"],
      hint: "↑ Run the pointer along the line"
    },
    shipping: {
      kicker: "08 / Shipping it",
      heading: "The app works. Now it needs real pairs.",
      lead: "The build is complete. Next comes a TestFlight round, the App Store listing and review.",
      doneLabel: "Done",
      done: [
        "23 screens, designed and built",
        "35 icons, drawn with one pen",
        "Paired and solo modes",
        "The receipt, the journal and the share card",
        "One-to-many matching, prompted by the second interview",
        "The five drawn loops"
      ],
      leftLabel: "Still to do",
      left: [
        "A TestFlight round with real pairs, including the first test of matching",
        "Privacy labels and the data the matching actually needs",
        "App Store screenshots and the listing",
        "App Store review, plus any changes it calls for"
      ],
      limit: "The biggest question is still open: will a stranger's meal receipt feel motivating, or simply uncomfortable? Two interviews changed the product, but they cannot tell me what eight weeks of use will feel like. That is what the TestFlight round needs to answer."
    }
  },

  zh: {
    hero: {
      pill: "个人项目",
      context: "产品设计 · iOS · 2026",
      titleA: "BUBU：",
      titleB: "一起把八周走完。",
      lead: "我把 BUBU 做成了一本会自己整理的减脂手账：每餐拍张照片，当天会有一张小票，七天后再和搭子的记录并排放进周手账里。",
      storeLabel: "App Store",
      store: "开发已完成 · 正在准备上架",
      roleLabel: "我的角色",
      role: "产品设计、UI、插画",
      scopeLabel: "范围",
      scope: "23 个界面 · 35 个图标 · 双人与单人",
      platformLabel: "平台",
      platform: "iOS · iPhone 17",
      statusLabel: "状态",
      status: "开发完成 · 访谈 2 人 · 下一步 TestFlight",
      action: "看看它怎么运作",
      heroAlt: "iPhone 上的 BUBU 首页：第 21 天，今天记下的餐，旁边是留给还没加入的搭子的空框，以及跑道上的两个人"
    },
    why: {
      kicker: "01 / 它为什么存在",
      heading: "搭子好找，一起走到第八周更难。",
      lead: "搭子关系轻松，是因为彼此不用承担太多。约饭、健身，说开始就开始，停下来也不难。可减脂一做就是两个月，这种轻松的关系很容易走到一半就散了。",
      rulesLabel: "所以我先定了三件事",
      rules: [
        {
          label: "01 / 只聊这一件事",
          title: "彼此只看得到吃了什么。",
          body: "没有聊天、动态、个人主页，也没有昵称。挑战期间，搭子看到的只有你的用户 ID 和每天记下的饭。"
        },
        {
          label: "02 / 先把终点定好",
          title: "第一天就知道哪天结束。",
          body: "开始时选 4 周、8 周或 12 周，两个人一起倒数到同一天。到了那天自然结束，不用等其中一个人开口说「要不就到这吧」。"
        },
        {
          label: "03 / 空白就留在那里",
          title: "漏掉一天，小票上会看得见。",
          body: "BUBU 不追着提醒，也不用通知制造愧疚。哪天没记，小票上就留一个虚线空框，旁边照实写着 MISSED 1 / 3。"
        }
      ]
    },
    how: {
      kicker: "02 / 它怎么运作",
      heading: "拍下这顿饭，后面交给 BUBU。",
      lead: "不用填表。先选一个人记，还是和搭子一起；之后每餐拍一下，BUBU 会抠掉背景，把它放进今天的小票、本周的手账和挑战跑道。",
      beats: [
        {
          label: "开始",
          title: "先一个人开始，也可以直接找搭子。",
          body: "BUBU 一上来先问你想怎么记。单人模式也有完整的首页、小票和手账，只是跑道上只有自己；双人模式可以等系统匹配，也可以邀请认识的人。以后在设置里随时能改。",
          demo: "选择单人或双人模式"
        },
        {
          label: "一天一天记",
          title: "七张小票组成一周手账。",
          body: "翻开手账，我的一周和搭子的一周正好并排。每天都是一小撮抠好图的饭，点进去就是那天的小票。23:59 一过，小票就锁上，昨天不能再补得更好看。搭子看到的，就是你当天真正记下来的东西。",
          demo: "翻开周手账，再点进一张已经锁定的小票"
        },
        {
          label: "同一个终点",
          title: "两个人按同一只钟往前走。",
          body: "挑战页把两个人拿到的勋章放在一起，比如第一步、完美一周和过半。规则随时能点开：每天记一次，连续三天没记，两个人一起结束挑战。回到首页，两个小人在同一条跑道上，倒数同一个终点。",
          demo: "看完勋章和规则，再回到两个人的跑道"
        }
      ]
    },
    testing: {
      kicker: "03 / 聊完以后",
      heading: "我找两个人聊了聊，BUBU 也跟着改了两次。",
      lead: "上 TestFlight 之前，我把原型给一位潜在用户和一位做过同类产品的设计师看了。",
      saidLabel: "对方怎么说",
      changedLabel: "我怎么改",
      findings: [
        {
          who: "一位有两万粉丝的健身博主",
          said: "她喜欢这套界面，就算暂时没有搭子也想先用起来。有人可能是先喜欢上 BUBU 的样子，之后才去找搭子；如果注册时非得配对，这些人连第一天都进不去。",
          changed: "我加了单人模式。首页、手账和挑战都保留，只把跑道变成一个人，手账也只放自己的一周。先开始，找到搭子以后再配对也来得及。"
        },
        {
          who: "一位有三年经验的产品设计师",
          said: "他先问了一个很现实的问题：新 App 的匹配池这么小，用户会不会等很久，最后还只能配到一个差得很远的人？",
          changed: "我把匹配改成了单向。系统按身高体重、目标和期限，给每个人找一个最接近的对手；你只看得到这一个人。同一个人可以同时出现在好几个人的跑道上，谁都不用等对方也选中自己。邀请码搭子另算，认识的两个人仍然互相看得到。"
        }
      ],
      model: {
        label: "第二次聊天之后，我这样改了匹配",
        title: "你只看到一个对手，但好几个人可能同时看到你。",
        steps: [
          ["进入匹配池", "目标有效 · 同意匿名参与", "目标有效，又同意匿名匹配的人，才会进入池子。"],
          ["先排除不合适的人", "排除本人 · 搭子 · 不可用", "给 B 找对手时，先去掉 B 自己、B 用邀请码找来的搭子 P，以及目前不可用的人。"],
          ["找最接近的一个", "身高体重 · 目标 · 期限", "剩下的人按身高体重、目标和挑战期限跟 B 比，D 最接近。"],
          ["把 D 分给 B", "建立 B → D", "B 从此看到 D。D 不需要反过来同意，看到的仍然是自己的那位对手。"]
        ],
        people: {
          A: { name: "用户 A", note: "A 只看到 B，B 看不到 A。" },
          B: { name: "用户 B", note: "B 看到 D，A 和 C 都看到 B；B 和 P 又通过邀请码互相配对。B 打一次卡，四条关系都会更新。" },
          C: { name: "用户 C", note: "C 也被分配到了 B。C 看到 B，B 仍然只看到 D。" },
          D: { name: "用户 D", note: "D 是 B 的对手，但 D 看不到 B；D 自己的对手不在这张图里。" },
          P: { name: "邀请搭子 P", note: "P 是用 B 的邀请码加入的，两人互相看得到。系统给 B 找对手时会跳过 P。" }
        },
        inviteCode: "邀请码",
        aria: "A 看到 B，C 看到 B，B 看到 D，B 和 P 通过邀请码互相看到。",
        legend: "实线箭头是系统分配，箭尾的人看得到箭头指向的人。虚线连着邀请码搭子，两边互相看得到。指一下任意一个人，就能顺着线看清 TA 的关系。",
        rules: [
          ["每个人只看一个", "A 只看到 B；B 只看到 D。", "每个人只有一条指向别人的箭头。A 看 B，B 看 D。"],
          ["很多人可以看同一个", "B 同时是 A 和 C 的对手，不用互选。", "好几条箭头可以一起指向 B。B 同时是 A 和 C 的对手，不需要反过来选中他们。"],
          ["每段关系各算各的", "同一次打卡会更新所有相关进度。", "B 只打一次卡，和 A、C、D、P 相关的进度都会一起更新。"]
        ],
        open: "待定：两人同时缺席、平局，以及系统分配的对手能看到哪些照片。"
      },
      note: "这两次聊的都是原型；当时还没有真实的搭子一起跑完一场挑战。"
    },
    iconset: {
      kicker: "04 / 图标",
      heading: "35 个图标，我故意没把它们画直。",
      lead: "太规整的图标放在插画和手写数字旁边，总像是从别的 App 借来的。我只把用笔统一好，剩下的就照平时在纸上随手画的样子来。",
      partsLabel: "我统一了这三件事",
      parts: [
        ["同一支笔", "图标、插画和分隔线都用同一种粗细。"],
        ["拐弯别太整齐", "圆不必刚好闭合，转角也保留手画过去的痕迹。"],
        ["能少一笔就少一笔", "到了 24 像素，每一笔都得真的有用。"]
      ],
      wobbleLabel: "这些歪线为什么要留下",
      wobble: "随手画出来的线会有一点鼓，也会偏一点。我保留了这些小误差，而且没有让两个图标歪得一模一样。这样它们和旁边的小人放在一起，才像是同一套东西。",
      rulesLabel: "几条不能破的规矩",
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
      drawNote: "滚到这里，图标会一笔笔画出来。指向一个，可以单独看它；指向下面的一组，就能在整张纸上找到这一家。"
    },
    cast: {
      kicker: "05 / 这些小人",
      heading: "这两个小人，从头到尾都陪你一起跑。",
      lead: "我用界面里的同一种线画了五段循环动画。空状态、组队成功、一个人跑、冲过终点，这些光靠数字说不清的时刻，就交给它们来演。",
      clips: [
        ["跳绳", "空状态，以及两场挑战之间的间隙"],
        ["你们俩", "确认组队成功的那一屏"],
        ["一个人", "单人模式下的首页"],
        ["冲线", "最后一天撞过终点线"],
        ["达成目标", "庆祝页，以及从那里分享出去的小票"]
      ],
      note: "动画出现在画面里才会播放，离开就停。"
    },
    userflow: {
      kicker: "06 / 流程图",
      heading: "从登录到冲线，一共 23 个界面。",
      lead: "这张图把实际版本一屏一屏摊开。单人和双人的路线大体一样，只有搭子出现的那几个时刻属于双人模式。",
      label: "完整版本",
      title: "从首页出发，大部分地方两步就到。",
      aria: "实际版本的地图：登录和初始设置通向首页；从首页出发有记录、今日小票、手账、挑战、组队页和设置。",
      legend: "实线表示点一下跳转，虚线表示在当前界面上打开弹层；有底色的界面只会出现在双人模式。指一下任意界面，就能看到从首页怎么走过去。",
      pairedOnly: "只在双人模式出现。",
      nodes: {
        signin: ["登录", "注册或登录。已有账号的直接进首页。"],
        setup: ["初始设置", "六个短界面依次问名字、身高体重、目标、4、8 或 12 周，以及单人还是双人，最后停在准备完成页。"],
        home: ["首页", "这里能看到今天是第几天、今天吃的饭、两个小人的进度和跑道。黑色按钮负责记录，角上的菜单打开设置。"],
        record: ["记录什么？", "这张弹层盖在首页上。记一餐、一次运动或体重，都算今天打了卡。"],
        mealphoto: ["拍一餐", "拍下盘子，让 BUBU 抠掉背景，再选早餐、午餐、晚餐或加餐。这顿饭就会出现在今天的小票上。"],
        exercise: ["运动", "写下做了什么、做了多久，也可以从「健康」里读取今天的运动。它会作为一行字放进小票。"],
        weight: ["体重", "记下早上的数字，愿意的话再拍一张秤。首页上的进度也会跟着变。"],
        receipt: ["今日小票", "点开首页的拍立得，可以看到每餐和时间、进度、连续天数、漏记天数。双人模式下，搭子的小票就在旁边；两张都会在 23:59 封存。"],
        journal: ["手账", "左边的标签页。一周一个跨页。"],
        week: ["手账本", "七天抠好图的饭排在一起，这周的体重钉在页角。沿着页脚可以前后翻周。"],
        overview: ["两页对照", "两页一起看：左边是你的一周，右边是搭子的，同样的七天。"],
        dayreceipt: ["某一天的小票", "点手账里的任何一天，就能打开那天的小票；首页打开今天时，用的也是这个界面。"],
        locked: ["更早的周", "免费版保留最近七天。再往前，每一天都是一个虚线的 Plus 占位。"],
        plus: ["BUBU Plus", "手账的每一页、每张小票和勋章都留下来，一份订阅覆盖你和一位搭子。按年或按月，前七天免费。"],
        challenge: ["挑战", "右边的标签页：两个人走到哪了，规则是什么。"],
        progress: ["进度", "第 21 天 / 56 天，以及你们各自到目前为止的勋章：第一步、完美一周、过半、冲线。"],
        rules: ["规则", "这里写着怎么用邀请码配对、每天记一次、连续三天没记就会结束挑战，以及什么时候拿到勋章。两个人的漏记次数也放在这里。"],
        paired: ["组队成功", "搭子一到，这张弹层就会盖在首页上。里面有 TA 的信息、你们的相似之处、两个人的目标和一个开始按钮。"],
        settings: ["设置", "从首页角上的菜单进来，可以找到 Plus、名字和密码、模式、单位和语言。"],
        plus2: ["BUBU Plus", "和手账里打开的是同一页，只是从设置进来。"],
        name: ["改名字", "和初始设置时一样的两个转盘：搭子看到的名字。用户名不变。"],
        mode: ["模式", "单人或双人，和初始设置时同一个选择，随时可以改。"],
        language: ["语言", "跟随系统、简体中文或 English，就地切换。"],
        block: ["举报并屏蔽", "结束和这个人的配对。"]
      }
    },
    screens: {
      kicker: "07 / 界面",
      heading: "从实际版本里挑出的九个界面。",
      lead: "这些画面直接截自 iPhone 17 模拟器里的版本，包含初始设置、一天的记录和双人挑战。",
      names: ["登录", "挑战时长", "单人还是双人", "准备好了", "首页", "手账本", "今日小票", "组队成功", "挑战进度"],
      hint: "↑ 让指针沿着这条线划过去"
    },
    shipping: {
      kicker: "08 / 上架",
      heading: "App 已经能跑了，接下来要交给真的搭子。",
      lead: "开发告一段落。下一步是 TestFlight、准备 App Store 页面，然后送审。",
      doneLabel: "已完成",
      done: [
        "23 个界面，设计并开发完成",
        "35 个图标，同一支笔画的",
        "双人和单人两种模式",
        "小票、手账和分享卡",
        "第二次访谈之后改出的一对多匹配",
        "五段手绘动画"
      ],
      leftLabel: "还要做这些",
      left: [
        "找真实搭子跑一轮 TestFlight，也第一次真正测试匹配",
        "隐私标签，以及匹配到底需要哪些数据",
        "App Store 的截图和文案",
        "送审，再处理审核提出的修改"
      ],
      limit: "还有一个问题，我现在答不了：看到陌生人的餐食小票，究竟会让人更有动力，还是只会让人不舒服？两次访谈帮我改了产品，却代替不了真正用上八周。这个问题得留给 TestFlight。"
    }
  }
}

/*
 * One stage per beat. When the recording for it is in, the stage runs it
 * inside the phone - silent, looping, playing only while it is on screen;
 * until then it holds the built screens, so a reader sees the product
 * either way and the layout does not move when the video lands.
 */
function Stage({ name, label, locale, children }) {
  const clip = recording(name, locale)
  return (
    <div className={styles.stage} data-recording={clip ? "" : undefined}>
      {clip
        ? (
          <IPhone>
            {/* Loop rather than CaseVideo: it plays while it is on screen
                and stops when it is not, and there is nothing to click -
                a phone that pauses when you touch it reads as a broken
                phone, not a control. */}
            <Loop className={styles.screenVideo} src={clip.src} poster={clip.poster} alt={label} />
          </IPhone>
        )
        : children}
    </div>
  )
}

/*
 * An iPhone 17, drawn rather than photographed: the recordings are off the
 * iPhone 17 simulator, so the body around them is that phone's - a 402 x
 * 874 screen, its corner radius, the thin black border inside a flat
 * aluminium band, the Action button and volume keys on the left and the
 * side button and Camera Control on the right. The Dynamic Island is not
 * drawn: it is already in the recording, where iOS put it.
 *
 * Everything is sized off the phone's own width (cqw), so the proportions
 * hold at whatever size the column gives it.
 */
function IPhone({ children }) {
  return (
    <div className={styles.iphone}>
      <span className={`${styles.iphoneKey} ${styles.keyAction}`} aria-hidden="true" />
      <span className={`${styles.iphoneKey} ${styles.keyVolUp}`} aria-hidden="true" />
      <span className={`${styles.iphoneKey} ${styles.keyVolDown}`} aria-hidden="true" />
      <span className={`${styles.iphoneKey} ${styles.keySide}`} aria-hidden="true" />
      <span className={`${styles.iphoneKey} ${styles.keyCamera}`} aria-hidden="true" />
      <div className={styles.iphoneScreen}>{children}</div>
    </div>
  )
}

/* The three rules of the pen, each shown by the icon that is most nearly
   just that rule: a minus is one line, a radio is a circle not quite
   closed, the journal is a few strokes. Looked up by id rather than by
   position, so cutting an icon out of the set cannot quietly point these
   somewhere else. */
const ruleIcons = ["minus", "radio", "notebook"].map((id) => icons.find((icon) => icon.id === id))

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
  const [start, week, race] = t.how.beats

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
              <img src="/bubu/phone.webp" alt={t.hero.heroAlt} width="424" height="896" fetchPriority="high" />
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

            {[["mode", start], ["journal", week], ["race", race]].map(([name, beat]) => (
              <article className={styles.beat} key={name}>
                <div className={styles.beatCopy}>
                  <p className={styles.microLabel}>{beat.label}</p>
                  <h3>{beat.title}</h3>
                  <p>{beat.body}</p>
                </div>
                <Stage name={name} label={beat.demo} locale={locale} />
              </article>
            ))}
          </section>

          <section id="testing" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.testing.kicker}</p>
              <h2>{t.testing.heading}</h2>
              <p className={styles.sectionLead}>{t.testing.lead}</p>
            </div>

            {/* The two conversations side by side, each read top to bottom:
                who, what they said, what it changed. On wide screens the
                rows line up across both, so "said" sits beside "said".
                What 02 changed is a model rather than a screen, so it gets
                the full width under both, drawn and live. */}
            <ol className={styles.findings}>
              {t.testing.findings.map((finding, index) => (
                <li className={styles.finding} key={finding.who}>
                  <div className={styles.findingHead}>
                    <span className={styles.findingNo}>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{finding.who}</h3>
                  </div>
                  <div className={styles.findingSaid}>
                    <p className={styles.microLabel}>{t.testing.saidLabel}</p>
                    <p>{finding.said}</p>
                  </div>
                  <div className={styles.findingChanged}>
                    <p className={styles.microLabel}>{t.testing.changedLabel}</p>
                    <p>{finding.changed}</p>
                  </div>
                </li>
              ))}
            </ol>

            <MatchingModel copy={t.testing.model} />

            <p className={styles.sourceNote}>{t.testing.note}</p>
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
                        <Glyph icon={ruleIcons[index]} size={30} />
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

          {/* The whole build as a tree of named screens, drawn live, before
              nine of them are dealt out as cards. */}
          <section id="userflow" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.userflow.kicker}</p>
              <h2>{t.userflow.heading}</h2>
              <p className={styles.sectionLead}>{t.userflow.lead}</p>
            </div>
            <Userflow copy={t.userflow} />
          </section>

          <section id="screens" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.screens.kicker}</p>
              <h2>{t.screens.heading}</h2>
              <p className={styles.sectionLead}>{t.screens.lead}</p>
            </div>
            <Hand
              cards={hand.map((file, index) => ({ src: handScreen(file, locale), name: t.screens.names[index] }))}
              hint={t.screens.hint}
            />
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
