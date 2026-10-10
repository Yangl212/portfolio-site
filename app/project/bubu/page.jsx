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

/* Five loops, one pen. What each one is called is in `copy.cast.clips`.
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
      titleB: "Find your weight-loss buddy",
      lead: "BUBU is a weight-loss app that matches you with a buddy of similar height and weight. Every entry you log is kept in your journal, where it becomes a record worth keeping",
      storeLabel: "App Store",
      store: "Working build · preparing submission",
      roleLabel: "Role",
      role: "Product design, UI, illustration",
      scopeLabel: "Scope",
      scope: "35 icons and 30+ screens so far",
      platformLabel: "Platform",
      platform: "iOS",
      statusLabel: "Status",
      status: "Built, heading into TestFlight",
      action: "See the design features",
      heroAlt: "The BUBU home screen on an iPhone: day 21, the meals logged today beside an empty frame for a buddy who has not joined yet, and both runners on the track"
    },
    why: {
      kicker: "01",
      heading: "User pain points and inspiration",
      lead: "On social media I often see people forming weight-loss groups on their own. They post their height and weight, hoping to find a similar “buddy” to report their progress to, so the two can keep each other accountable and improve together. But buddies found this way are unreliable: many disappear after three or four days.",
      rules: [
        {
          label: "01",
          title: "Finding a buddy is hard",
          body: "Comment threads run long, so many requests to team up never get a reply, while the posts with the most replies take over the top of the thread. I felt these people needed a platform that matches them with the right partner."
        },
        {
          label: "02",
          title: "Rewards and consequences",
          body: "Most buddy pairs lose momentum after a few missed days, and that drags the other person down too. So the app should celebrate small milestones, and after three days in a row without a check-in, a pair automatically loses and is unmatched, so people who keep logging can find a new buddy."
        },
        {
          label: "03",
          title: "Privacy",
          body: "Most people trying to lose weight aren't happy with their bodies right now. So the app plays down the social side and doesn't ask users to pick a name. Most of what buddies do together is ask each other for tasty low-calorie recipes."
        }
      ]
    },
    how: {
      kicker: "02",
      heading: "Core features",
      beats: [
        {
          label: "01",
          title: "Solo and paired modes",
          body: "When you first open the app, it asks for your height, weight and how long you want to work toward your goal. BUBU protects your privacy as far as it can, leaving out strongly social features such as user IDs and buddy chat. Log on your own to build a weight-loss journal that is all yours, or join paired matching for some friendly competition and progress together.",
          demo: "Choosing solo or paired mode"
        },
        {
          label: "02",
          title: "The journal and daily receipts",
          body: "Log your daily meals alongside your buddy. Photos are cut out into stickers and added to your journal and receipts. Curious about something your buddy ate and want the recipe? Tap to send them a signal!",
          demo: "Opening the weekly journal, then a locked daily receipt"
        },
        {
          label: "03",
          title: "Breaking a big goal into smaller ones",
          body: "Long-term goals matter, but splitting them into smaller, easier goals and giving timely positive feedback does more to keep users coming back. As people use the app, they earn new badges based on their own progress.",
          demo: "Checking the medals and rules, then returning to the shared track"
        }
      ]
    },
    testing: {
      kicker: "03",
      heading: "Expert interviews",
      lead: "Before TestFlight, I tested the prototype with a potential user and a designer who had worked on a similar product, and interviewed them both",
      changedLabel: "What changed",
      findings: [
        {
          who: "A fitness creator with 20,000 followers",
          said: "“I love this interface. I don't have time to keep a journal myself, and this builds one from photos alone, which is perfect for people who want to check in. I think you could launch a solo version, because I'll use an app just because it looks good.”",
          changed: "After this conversation, I filled out the logic of solo mode. Home, the journal and the challenge all stay; the progress bar shows only one person, and the journal holds only your own week. It also solves the problem for users who don't have a suitable buddy yet."
        },
        {
          who: "A product designer with three years of experience",
          said: "“A new app's matching pool is this small. Won't users wait a long time and still end up matched with someone very different? A cold start like that really hurts a new app's retention.”",
          changed: "Based on this feedback, I reworked the matching I first had in mind so it is no longer limited to two-way matches. The system finds each person the closest rival by height and weight, goal and timeframe, and one person can be the buddy for several others at once, without waiting on the other side. I also added invite codes to encourage people to bring their own buddy; a pair formed this way can motivate more people at the same time."
        }
      ],
      model: {
        title: "How matching works",
        steps: [
          ["Join the pool", "Records height, weight and goal", "Records height, weight and goal"],
          ["Matching", "Filters out users whose goals are too far apart, and encourages inviting friends with a code", "Filters out users whose goals are too far apart, and encourages inviting friends with a code"],
          ["Matched", "Finds a close user in the pool and pairs the two as buddies", "Finds a close user in the pool and pairs the two as buddies"],
          ["Still in the pool", "After a match, users stay in the pool, so they can still be paired with someone whose goal is close when that person has no match", "After a match, users stay in the pool, so they can still be paired with someone whose goal is close when that person has no match"]
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
          ["Everyone has one buddy", "From each person's own view, the match is two-way", "From each person's own view, the match is two-way"],
          ["One person can be many people's buddy", "Helps the app get through its cold start sooner", "Helps the app get through its cold start sooner"],
          ["Matching on current goals", "A, ten days in, can still be matched with newcomer B when their current goals are close", "A, ten days in, can still be matched with newcomer B when their current goals are close"]
        ],
        open: "Still open: both people missing the same day, ties, and which photos a system-matched rival can see."
      }
    },
    iconset: {
      kicker: "04",
      heading: "Icon design",
      subheading: "A hand-drawn icon set made for this app",
      lead: "To suit the journal feel, I drew the app its own icon set with a hand-drawn character. Each icon was drawn with the pen tool and keeps a slight wobble, without much distortion beyond that.",
      families: [
        ["Actions", "add, remove, confirm, dismiss"],
        ["Arrows", "everything that moves you somewhere"],
        ["Controls", "checkbox, radio, toggle, filter"],
        ["The product", "the journal, the target, the race"]
      ]
    },
    cast: {
      kicker: "05",
      heading: "Animation design",
      lead: "The interface is full of little animated figures, which dress up empty pages and say things more precisely. Every figure is hand-drawn, then animated with Runway.",
      clips: ["Skipping", "Both of you", "Solo", "The finish", "Goal reached"]
    },
    /* The map's tree is a constant in Userflow.jsx; what each screen is
       called and what it is for is here, keyed by the screen's id, so the
       two languages cannot drift from the drawing. */
    userflow: {
      kicker: "06",
      heading: "User flow",
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
      kicker: "07",
      heading: "High-fidelity",
      names: ["Sign in", "Plan length", "Solo or paired", "Ready", "Home", "Weekly journal", "Today's receipt", "Matched", "Challenge progress"]
    },
    shipping: {
      kicker: "08",
      heading: "Shipping",
      lead: "Development has wrapped up for now; next come TestFlight, the App Store page and review",
      doneLabel: "Done",
      done: [
        "High-fidelity design and development complete",
        "Icon design",
        "Solo and paired modes",
        "The app's core logic"
      ],
      leftLabel: "Still to do",
      left: [
        "A TestFlight round with real users",
        "Turn the exercises into a full sticker set",
        "App Store screenshots and copy",
        "Submit for review, then handle any changes it asks for"
      ],
      limit: "This TestFlight round mainly tests two things: 1. whether any logic errors remain in everyday use, which means following up with users promptly; 2. how long matching should take, and how wide the weight and goal range for a match can be, which needs more research data to settle."
    }
  },
  zh: {
    hero: {
      pill: "个人项目",
      context: "产品设计 · iOS · 2026",
      titleA: "BUBU：",
      titleB: ["寻找属于你的", "减肥搭子"],
      lead: "BUBU是一个会根据你提供的身高体重智能寻找相似搭子的减脂软件，你的每一次记录都会留存于手账本中，成为珍贵的记录",
      storeLabel: "App Store",
      store: "开发已完成 · 正在准备上架",
      roleLabel: "我的角色",
      role: "产品设计、UI、插画",
      scopeLabel: "范围",
      scope: "当前包含35个icon，30+页面",
      platformLabel: "平台",
      platform: "iOS",
      statusLabel: "状态",
      status: "开发完成，准备进入TestFlight",
      action: "查看设计功能",
      heroAlt: "iPhone 上的 BUBU 首页：第 21 天，今天记下的餐，旁边是留给还没加入的搭子的空框，以及跑道上的两个人"
    },
    why: {
      kicker: "01",
      heading: "用户痛点与灵感来源",
      lead: "我常常会在社交平台上看到很多人自发的组成减脂小队，他们通常会写上自己的身高体重，想寻找一个接近的“搭子”一起进行减脂汇报，互相监督共同进步。然而这样找的搭档却非常不稳定，经常会出现坚持了三四天就消失的情况。",
      rules: [
        {
          label: "01",
          title: "搭子的寻找困难",
          body: "由于评论区的冗长，有些人发出的请求组队其实并没有获得回复，反而回复多的人会更占据评论区的前排，我认为应该搭建一个平台为他们匹配到合适的同伴。"
        },
        {
          label: "02",
          title: "激励与惩罚机制",
          body: "多数结成“搭子”的队伍会因为几日的缺失而丧失动力，同时也会对另一方产生影响。因此在app中应该设置小阶段的胜利鼓励，同时引入连续3日未打卡自动判输并取消匹配的机制，让愿意坚持打卡的人也可以有新的搭子。"
        },
        {
          label: "03",
          title: "隐私问题",
          body: "多数想要减脂的人并不满意自己当前的身体情况。因此本app会削弱社交属性，也不会要求用户自己取名。更多的搭子交互只存在于互相询问美味的低卡菜谱。"
        }
      ]
    },
    how: {
      kicker: "02",
      heading: "核心功能",
      beats: [
        {
          label: "01",
          title: "单人与双人模式",
          body: "进入软件后会向您采集个人身高体重与想要达成的目标周期。BUBU将尽可能保护您的个人隐私，取消用户id、搭子聊天等社交属性过强的设计。支持自己打卡记录做成独属于你的减脂手账本，也欢迎加入双人匹配模式进行友好切磋，互相进步。",
          demo: "选择单人或双人模式"
        },
        {
          label: "02",
          title: "手账与每日小票",
          body: "与你的搭子一起记录每日饮食，照片会抠图后做成贴纸记录入你们的手账本与小票中。看到搭子的食物很感兴趣想求配方？欢迎点击向搭子发出信号！",
          demo: "翻开周手账，再点进一张已经锁定的小票"
        },
        {
          label: "03",
          title: "将大目标切分成更容易完成的小目标",
          body: "长期目标固然重要，但将目标切分成更容易完成的小目标并及时给予用户正反馈更利于用户留存。用户使用时将根据自己的减脂情况获得新的徽章。",
          demo: "看完勋章和规则，再回到两个人的跑道"
        }
      ]
    },
    testing: {
      kicker: "03",
      heading: "达人访谈",
      lead: "在准备上 TestFlight 之前，我把原型给一位潜在用户和一位做过同类产品的设计师进行测试与访谈",
      changedLabel: "改动",
      findings: [
        {
          who: "一位有两万粉丝的健身博主",
          said: "“我喜欢这套界面，我平时生活中没有时间做自己的手账本，这个只需要拍照就可以自动生成很适合想要打卡的人。我觉得可以推出单人版，因为我会因为一个软件好看就使用它的。”",
          changed: "通过这次交流，我完善了单人模式的逻辑。首页、手账和挑战都保留，只把进度条变成一个人，手账也只放自己的一周。同时这也解决了一些用户暂时没有合适“搭子”的问题。"
        },
        {
          who: "一位有三年经验的产品设计师",
          said: "“新 App 的匹配池这么小，用户会不会等很久，最后还只能配到一个差得很远的人？这种冷启动非常影响新app的用户留存。”",
          changed: "根据这个反馈我重新优化了一开始思考的匹配机制，不再局限于双向匹配。系统按身高体重、目标和期限，给每个人找一个最接近的对手，而同一个人可以同时成为多个人的搭子，不用等对方自己。同时设立邀请码，鼓励用户自带搭子入场，两人在形成配对的同时也可以为更多人提供激励。"
        }
      ],
      model: {
        title: "匹配机制",
        steps: [
          ["进入匹配池", "记录用户身高体重与目标", "记录用户身高体重与目标"],
          ["匹配进行中", "排除与目标相差过大的用户，并鼓励用户使用邀请码邀请好友", "排除与目标相差过大的用户，并鼓励用户使用邀请码邀请好友"],
          ["匹配成功", "在用户群中找到接近的用户并将两人结为搭子", "在用户群中找到接近的用户并将两人结为搭子"],
          ["依旧存在于匹配池中", "匹配成功后，用户依旧存在于匹配池中，在缺少匹配对象时，依旧可以匹配为接近目标用户的搭子", "匹配成功后，用户依旧存在于匹配池中，在缺少匹配对象时，依旧可以匹配为接近目标用户的搭子"]
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
          ["每个人都只有一个搭子", "在个人视角匹配是双向的", "在个人视角匹配是双向的"],
          ["每一个人可以成为很多人的搭子", "帮助app尽快度过冷启动", "帮助app尽快度过冷启动"],
          ["拆分个人目标的匹配", "A已进入app10天并与新进入的B当前与目标相近，也可以进行匹配", "A已进入app10天并与新进入的B当前与目标相近，也可以进行匹配"]
        ],
        open: "待定：两人同时缺席、平局，以及系统分配的对手能看到哪些照片。"
      },
    },
    iconset: {
      kicker: "04",
      heading: "icon设计",
      subheading: "为此款app设计了一套偏手绘风格的icon",
      lead: "为了更贴合手账记录的设计，app独立设计了一套更为贴合手绘感的icon。使用钢笔工具绘画并富有一定的抖动，没有增加过多的变形。",
      families: [
        ["操作", "添加、删除、确认、关闭"],
        ["箭头", "所有把你带去别处的东西"],
        ["控件", "复选框、单选、开关、筛选"],
        ["这个产品", "手账、靶心、比赛"]
      ]
    },
    cast: {
      kicker: "05",
      heading: "动画设计",
      lead: "界面内含有很多小人动画，对于空置页面进行了美化和更精准的视觉传达。所有小人均为手绘，再使用runway进行动画生成。",
      clips: ["跳绳", "你们俩", "一个人", "冲线", "达成目标"]
    },
    userflow: {
      kicker: "06",
      heading: "流程图",
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
      kicker: "07",
      heading: "高保真",
      names: ["登录", "挑战时长", "单人还是双人", "准备好了", "首页", "手账本", "今日小票", "组队成功", "挑战进度"]
    },
    shipping: {
      kicker: "08",
      heading: "上架",
      lead: "当前开发告一段落，下一步是 TestFlight、准备 App Store 页面并送审",
      doneLabel: "已完成",
      done: [
        "高保真设计并开发完成",
        "icon与图标设计",
        "双人和单人两种模式",
        "App运行逻辑"
      ],
      leftLabel: "还要做这些",
      left: [
        "找真实用户进行一轮 TestFlight",
        "视觉化运动项目，制作一整套表情包",
        "App Store 的截图和文案",
        "送审，再处理审核提出的修改"
      ],
      limit: "这一轮 TestFlight 主要测试：1. 是否还有使用逻辑上的错误，需要与用户进行及时的跟进；2. 对于匹配时间与宽泛匹配对象体重与目标的额度还需要更多的调研数据支撑。"
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
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>{t.hero.titleA}<br />{Array.isArray(t.hero.titleB) ? t.hero.titleB.map((chunk) => <span className={styles.titleChunk} key={chunk}>{chunk}</span>) : t.hero.titleB}</h1>
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

          </section>

          <section id="iconset" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.iconset.kicker}</p>
              <h2>{t.iconset.heading}</h2>
              <h3 className={styles.sectionSubheading}>{t.iconset.subheading}</h3>
              <p className={styles.sectionLead}>{t.iconset.lead}</p>
            </div>

            {/* The set as one sheet: thirty-five drawings on the app's paper,
                seven to a row, which fills the rectangle exactly. Nothing is
                labelled at rest. Pointing at a drawing brings it up to ink
                and prints its family and name under it, and drops
                everything else back to a trace. */}
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

            </div>

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
                    alt={t.cast.clips[index]}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* The whole build as a tree of named screens, drawn live, before
              nine of them are dealt out as cards. */}
          <section id="userflow" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.userflow.kicker}</p>
              <h2>{t.userflow.heading}</h2>
            </div>
            <Userflow copy={t.userflow} />
          </section>

          <section id="screens" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.screens.kicker}</p>
              <h2>{t.screens.heading}</h2>
            </div>
            <Hand
              cards={hand.map((file, index) => ({ src: handScreen(file, locale), name: t.screens.names[index] }))}
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
