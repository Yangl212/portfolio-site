import { AutoplayVideo } from "../../../components/AutoplayVideo"
import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"

import styles from "./page.module.css"

export const metadata = {
  title: "Backstage",
  description: "Helping people turn shared interests and free time into real-life plans.",
  ...projectShareCard("backstage", {
    title: "Backstage",
    description:
      "Helping people turn shared interests and free time into real-life plans.",
    alt: "Backstage: the welcome screen of a social support system"
  })
}

const prototypeUrl = "https://sagbackstage.framer.website/?editSite"

const img = (hash) => `/framer-assets/images/${hash}`

/*
 * MEDIA SLOTS
 * -----------
 * Every `media` object below renders through <Media />:
 *   { video: "/backstage/x.mp4", alt }        -> silent looping video, framed
 *   { src: "/backstage/x.gif", alt }          -> renders the image file
 *   { label, hint, alt }                      -> dashed placeholder
 *
 * Put files in /public/backstage/ - that is the directory Next.js serves from -
 * then point the object at them. Nothing else changes.
 */

/* Survey: 28 responses. Q1 is single-choice on an ordered frequency scale,
 * so it is one part-to-whole bar with a single ink ramp - denser = more often.
 * Q9 single-choice and Q10 multiple-choice are read as a share of the same 28,
 * so both sit on the 0-100 scale as ranked bars. The numbers are the data;
 * the answer labels live in `copy` next to the rest of the prose. */
const meetFrequency = [
  { pct: "14.3%", share: 14.29, tone: "var(--text)" },
  { pct: "7.1%", share: 7.14, tone: "rgba(34, 34, 34, 0.6)" },
  { pct: "39.3%", share: 39.29, tone: "rgba(34, 34, 34, 0.4)" },
  { pct: "35.7%", share: 35.71, tone: "rgba(34, 34, 34, 0.24)" },
  { pct: "3.6%", share: 3.57, tone: "rgba(34, 34, 34, 0.12)" }
]

const meetingConcerns = [
  { pct: "46.4%", share: 46.43 },
  { pct: "32.1%", share: 32.14 },
  { pct: "14.3%", share: 14.29 },
  { pct: "7.1%", share: 7.14 }
]

const meetingConditions = [
  { pct: "78.6%", share: 78.57 },
  { pct: "71.4%", share: 71.43 },
  { pct: "35.7%", share: 35.71 },
  { pct: "17.9%", share: 17.86 },
  { pct: "3.6%", share: 3.57 }
]

/* The four modes the product ships, in the order it presents them -
 * an ordered scale, so the ink gets denser as the mode asks for more. */
const modeTones = [
  "rgba(34, 34, 34, 0.18)",
  "rgba(34, 34, 34, 0.38)",
  "rgba(34, 34, 34, 0.62)",
  "var(--text)"
]

const finalMedia = [
  {
    video: "/backstage/01.mp4",
    altKey: 0
  },
  { video: "/backstage/02.mp4", altKey: 1 },
  { video: "/backstage/03.mp4", altKey: 2 },
  { video: "/backstage/04.mp4", altKey: 3 }
]

/*
 * All of the page's prose, in both languages. The English is exactly the copy
 * that was already here, lifted out of the JSX. On the Chinese side, anything
 * printed inside the product itself stays as the product prints it - the four
 * competitor names, and the screen labels Invitation and Activities
 * Participated - while everything written about them is translated.
 */
const copy = {
  en: {
    hero: {
      label: "Student Work",
      discipline: "Product Design · 2025",
      imageAlt:
        "Backstage running in a browser: the landing page with its FAQ, the social style chooser, and the friends area",
      summary:
        "A consumer product that gets people to real-world events without asking them to host, browse, or be chosen.",
      problem: "Every offline-social app asks you to make the first move before anything happens.",
      contribution: "User research, product direction, UX, UI, and an interactive prototype.",
      outcome: "An invitation-led experience built and revised across two rounds of testing.",
      role: "Product Designer",
      scope: "Research · UX · UI",
      platform: "Web",
      timeline: "12 weeks",
      action: "Try the prototype"
    },
    problem: {
      kicker: "Problem",
      title: "Meeting people offline still depends on being the one who starts it.",
      lead: "People spend more time on social platforms and still report fewer real-world plans. The apps meant to bridge that gap all begin with an act of initiative - posting an event, joining a large group, or presenting yourself to be picked.",
      freqQuestion: "How often do you proactively meet new people?",
      freqMeta: "Single choice · 28 responses",
      freqAria: "Every week 14.3%, every month 7.1%, occasionally 39.3%, rarely 35.7%, never 3.6%.",
      freqLabels: ["Every week", "Every month", "Occasionally", "Rarely", "Never"],
      freqTakeaway:
        "Nearly four in five meet new people occasionally at best. Four of the twenty-eight do it weekly.",
      concernQuestion: "What worries you most about meeting someone in person?",
      concernMeta: "Single choice",
      concernLabels: [
        "No common topics, or it turns awkward",
        "Safety",
        "The time it takes",
        "Finding out it is not a good match"
      ],
      conditionQuestion: "What would make you willing to meet strangers?",
      conditionMeta: "Multiple choice",
      conditionLabels: [
        "A shared interest",
        "A safe public place",
        "A friend vouches for them",
        "Only at a specific event",
        "I would not meet strangers"
      ],
      note: "The barrier is not desire, it is the opening move: awkwardness outranks safety as the top worry, while a shared interest and a public place are what most people said would get them to say yes."
    },
    design: {
      kicker: "Design Highlights",
      title: "Four moments carry the product.",
      lead: "Declaring a mode, receiving an invitation, keeping a private room, and recording what happened - each one is designed so the user never has to be the first to speak.",
      items: [
        {
          label: "01 / Onboarding",
          title: "Set the mode you are actually in",
          body: "Onboarding asks two things: when you are free, and what kind of company you want - quietly together, little contact, takes some courage, or looking for energy. There is no profile to fill in and no bio to write.",
          alt: "Screen recording: picking a date, then choosing a social style from quietly together, little contact, takes some courage, and looking for energy"
        },
        {
          label: "02 / The invitation",
          title: "One event at a time, and you can pass",
          body: "An invitation names the event, time, place, and the seats left. Join it, or change it and a different one takes its place - no reason asked for. Confirming ends on the questions people actually have, safety included.",
          alt: "Screen recording: an invitation to a Switch Mode Party is exchanged for an Omakase Experience, then joined, ending on a confirmation page with a safety FAQ"
        },
        {
          label: "03 / Your own room",
          title: "A private space others have to be let into",
          body: "The dressing room holds your diary, your settings, and your permissions. People send a request to visit; unlocked areas are the ones you opened yourself.",
          alt: "Requesting access to a dressing room in Backstage"
        },
        {
          label: "04 / After the event",
          title: "Keep the evening without having to post it",
          body: "The diary saves what you went to as photo cards with the people who were there. Whether any of it is visible to others is a separate decision, made afterwards.",
          alt: "Screen recording: an attended event saved into the diary as a photo card"
        }
      ]
    },
    research: {
      kicker: "Research Insights",
      title: "Three findings set the product direction.",
      lead: "A survey, follow-up interviews, and a review of four existing platforms pointed at the same gap: people wanted a way in that did not require them to go first.",
      insights: [
        {
          label: "Insight 01",
          title: "People wanted structure, not more choice",
          body: "Both personas asked for the same thing from opposite situations: a newcomer who prefers structured activities, and a remote worker who wants a structured way to meet people but finds planned groups stiff. Neither wanted a longer list to browse.",
          evidence: "78.6% would meet strangers for a shared interest; 71.4% need a public place"
        },
        {
          label: "Insight 02",
          title: "Only offline contact counted as friendship",
          body: "One interviewee, 27 and working in education, said she considers only people she meets in person real friends - everyone else is a “digital neighbour.” Being online more had not produced the relationships people wanted.",
          evidence: "78.6% have found online chats easy but the meeting awkward"
        },
        {
          label: "Insight 03",
          title: "Existing platforms put the first move on the user",
          body: "Partiful assumes you will host or organise. Meetup runs on large gatherings. Eatwith splits people into host and guest. Dating apps lead with looks. Each one asks the user to step forward before anything happens.",
          evidence: "Competitive review of four offline-social platforms"
        }
      ],
      personas: [
        {
          name: "Li Wei",
          meta: "22 · International student · Jersey City",
          pull: "Prefers structured social activities",
          points: [
            "Isolated after moving to a new city",
            "Finds it hard to make friends outside of school",
            "Language barriers make unstructured settings harder"
          ]
        },
        {
          name: "Alex",
          meta: "35 · Software engineer · Astoria, Queens",
          pull: "Wants a structured way to meet like-minded people",
          points: [
            "Frustrated by superficial online relationships",
            "Struggles to find engaging offline events",
            "Finds planned group activities lack spontaneity"
          ]
        }
      ],
      note: "A small student study - 55 people in total, none counted twice: 28 survey responses, then a handful of interviews and two rounds of usability testing. Directional, not representative."
    },
    direction: {
      kicker: "Product Direction",
      title: "Not a social network. A social support system.",
      lead1: "The name comes from Goffman’s idea of a front stage people perform on and a backstage they prepare in. The product is built around the second one: a place you can be in before you are ready to be seen.",
      rules: [
        {
          label: "Declare, don't perform",
          body: "Before browsing anything, you set a social mode - quiet company, just want to listen, casual talk, or looking for energy. The app matches the energy you actually have today."
        },
        {
          label: "Be invited, not matched",
          body: "The platform sends a single invitation to a small event. There is no mutual selection, no swiping, and no profile to win over."
        },
        {
          label: "Passing costs nothing",
          body: "Declining returns a new invitation instead of a penalty or an empty feed. Saying no is a normal move, not a failure state."
        },
        {
          label: "Keep a private room",
          body: "The dressing room is yours by default. Others need permission to enter, so visibility is something you grant rather than something you lose."
        }
      ],
      modeHeading: "The four modes, in the order the product offers them",
      modeLabels: ["Quietly together", "Little contact", "Takes some courage", "Looking for energy"],
      axisLow: "Barely any contact",
      axisHigh: "Actively wants company",
      compareHeading: "What each one asks of you first",
      comparison: [
        { app: "Meetup", asks: "Walk into a gathering of a hundred strangers" },
        { app: "Partiful", asks: "Host it yourself, or already know the host" },
        { app: "Eatwith", asks: "Be a guest at someone else's table" },
        { app: "Tinder / Bumble", asks: "Be picked, on looks, before you ever meet" },
        { app: "Backstage", asks: "Accept an invitation, or pass without explaining", ours: true }
      ],
      brandAlt: "Backstage welcome screen reading: Not a social network. A social support system."
    },
    iterationOne: {
      kicker: "Iteration 01",
      title: "The first version was a Meetup clone, and the review said so.",
      lead: "The first build let people post events, browse a filtered feed, and join a waitlist behind identity verification. It worked, and it was indistinguishable from what already existed.",
      feedbackLabel: "Feedback",
      changeLabel: "Design change",
      resultLabel: "Result",
      feedback:
        "The midterm review was blunt: the concept was clear and the offline focus was right, but it was too close to Meetup to be worth choosing. Both reviewers pushed the same way - build around people, not around a catalogue of events.",
      change:
        "I removed the ability to create or freely browse events. The platform now assigns the activity and the user picks from a few curated options instead of an open feed. Group size was capped small, around three to six, so a table stays conversational.",
      result:
        "The flow stopped being a marketplace and became one decision per invitation. The final build still shows the seats remaining - usually three.",
      beforeCaption: "Before — browse, post, join a waitlist",
      beforeAlt:
        "First user flow: home page leading to event browsing, posting an event, and joining a waitlist with personal data authentication",
      afterCaption: "After — set a mode, accept or pass",
      afterAlt:
        "Revised user flow: set your social mode, receive a curtain call slip, accept or decline, plus a private dressing room with permissions"
    },
    iterationTwo: {
      kicker: "Iteration 02",
      title: "The second round was about language, safety, and weight.",
      lead: "With the direction settled, testing moved to whether people could read the product - what things were called, how exposed they felt, and how it made them feel before they had used it.",
      items: [
        {
          feedback: "“Upcoming Performances” was read as theatre shows rather than social events.",
          change:
            "Renamed the event language across the product to plain terms - invitations, activities, calendar.",
          result: "The final screens use Invitation and Activities Participated."
        },
        {
          feedback: "Testers were uneasy about safety and about how much of themselves would be exposed.",
          change:
            "Made the dressing room permissioned - others request access, and you grant it - and answered the safety question directly in the product.",
          result: "The built product includes access requests, unlocked areas, and a safety question in the FAQ."
        },
        {
          feedback: "The two calendars overlapped and testers were unsure which one they were looking at.",
          change: "Merged them into one calendar that holds both what is scheduled and what has already happened.",
          result: "The final build carries a single year-and-month view."
        },
        {
          feedback: "The dark theme read as too heavy and serious for something meant to feel welcoming.",
          change:
            "Kept the dark base, but softened it with warm photography, diffuse glows, and lighter type instead of switching to a light theme.",
          result: "A partial change - I kept the atmosphere and treated weight as the thing to fix, not darkness itself."
        }
      ]
    },
    system: {
      kicker: "Design System",
      title: "Soft light on a dark ground.",
      lead: "A serif display face for anything addressed to the user, a plain sans for controls, and diffuse glows instead of hard edges - so a dark interface reads as quiet rather than severe.",
      leadCaption: "The language applied across the built pages",
      leadAlt:
        "Backstage final screens: home, personal settings, activity track, calendar, invitation, social style, and diary",
      typeCaption: "Typography",
      typeAlt: "Backstage typography specimen",
      componentCaption: "Components",
      componentAlt:
        "Backstage component library: profile cards, access-request rows, FAQ accordion, progress bar, buttons, and calendar"
    },
    reflection: {
      kicker: "Reflection",
      title: "Removing choice is the idea and the risk.",
      items: [
        {
          label: "The main tradeoff",
          body: "Taking away choice is what makes the product work and also what limits it. A user who wants to pick a specific event on a specific night cannot, and I never tested how that feels over weeks rather than one session."
        },
        {
          label: "Limitations",
          body: "This was a student project with a small survey, a few interviews, two rounds of qualitative testing, and no live events behind it. Nothing here has been validated against real attendance or safety incidents."
        },
        {
          label: "What I would test next",
          body: "Whether people accept an invitation they did not choose, and how many times they pass before the invitation model starts to feel like it is not listening."
        }
      ]
    }
  },
  zh: {
    hero: {
      label: "学生作品",
      discipline: "产品设计 · 2025",
      imageAlt: "浏览器里运行的 Backstage：带 FAQ 的落地页、社交状态选择，以及好友区",
      summary: "一款帮人参加线下活动的产品。你不用自己组局，也不用翻活动列表或等别人挑中。",
      problem: "现有的线下社交产品，大多要用户先主动发起或加入，事情才会开始。",
      contribution: "用户研究、产品方向、UX、UI，以及一套可交互原型。",
      outcome: "经过两轮测试，我把产品改成了一套由邀请开始的体验。",
      role: "产品设计师",
      scope: "研究 · UX · UI",
      platform: "网页",
      timeline: "12 周",
      action: "试试原型"
    },
    problem: {
      kicker: "问题",
      title: "想在线下认识人，仍然得由你先开口。",
      lead: "人们在社交平台上花了更多时间，真正约到线下的次数却没有变多。很多产品一上来就要求用户主动：发布活动、加入大群，或先展示自己等别人选择。",
      freqQuestion: "你多久会主动去认识新的人？",
      freqMeta: "单选 · 28 份回答",
      freqAria: "每周 14.3%，每月 7.1%，偶尔 39.3%，很少 35.7%，从不 3.6%。",
      freqLabels: ["每周", "每月", "偶尔", "很少", "从不"],
      freqTakeaway: "接近五分之四的人最多只是偶尔认识新的人。28 个人里有 4 个每周都会。",
      concernQuestion: "和人线下见面，你最担心什么？",
      concernMeta: "单选",
      concernLabels: ["没有共同话题，或者见面变尴尬", "安全", "要花的时间", "见了才发现不合适"],
      conditionQuestion: "什么情况下你愿意和陌生人见面？",
      conditionMeta: "多选",
      conditionLabels: ["有共同的兴趣", "在安全的公共场所", "有朋友帮着担保", "只在某个特定活动上", "我不会和陌生人见面"],
      note: "问卷里，尴尬比安全更常被选为顾虑；多数人也表示，共同兴趣和公共场所会让自己更愿意见陌生人。问题不一定是没有意愿，也可能是第一步太难迈。"
    },
    design: {
      kicker: "设计亮点",
      title: "产品主要围绕四个时刻展开。",
      lead: "先选今天想怎么和人相处，再收到邀请、管理自己的私人空间，最后把参加过的活动留下来。整个流程都不要求用户先开口组局。",
      items: [
        {
          label: "01 / 进入",
          title: "先选今天想怎么和人相处",
          body: "第一次进来只问两件事：你什么时候有空，以及你想要什么样的陪伴（安静待着、少量交流、需要一点勇气、想找点热闹）。没有资料要填，也没有自我介绍要写。",
          alt: "录屏：先选日期，再从安静待着、少量交流、需要一点勇气、想找点热闹里挑一种社交状态"
        },
        {
          label: "02 / 邀请",
          title: "一次只给一个活动，不想去也没关系",
          body: "一份邀请会写清活动、时间、地点和还剩几个位置。你可以加入，也可以换一个，换了就会来另一份，不用给理由。确认页最后放的是人们真正会问的问题，安全也在其中。",
          alt: "录屏：把一份 Switch Mode Party 的邀请换成 Omakase Experience，然后加入，最后停在带安全 FAQ 的确认页"
        },
        {
          label: "03 / 你自己的房间",
          title: "这是你的私人空间，别人进来要先申请",
          body: "更衣室里放着你的日记、设置和权限。别人要来得先发申请；开放的区域，是你自己打开的那些。",
          alt: "在 Backstage 里申请进入某人的更衣室"
        },
        {
          label: "04 / 活动之后",
          title: "把那晚留下来，不一定要公开",
          body: "日记会把你去过的活动存成照片卡，连同当时在场的人。这些要不要给别人看，是之后另做的一个决定。",
          alt: "录屏：参加过的活动被存进日记，变成一张照片卡"
        }
      ]
    },
    research: {
      kicker: "研究发现",
      title: "这三条发现决定了产品往哪里走。",
      lead: "一份问卷、几场后续访谈，再加上四个平台的竞品分析，都指向同一个问题：不少人想参加线下社交，却不想做第一个主动的人。",
      insights: [
        {
          label: "发现 01",
          title: "比起更多选择，人们更需要一点安排",
          body: "一位受访者刚到新城市，更习惯有安排的活动；另一位长期远程工作，想认识人，又觉得正式团体太拘束。他们的处境不同，但都不想再翻一张更长的活动清单。",
          evidence: "78.6% 愿意为共同兴趣和陌生人见面；71.4% 需要公共场所"
        },
        {
          label: "发现 02",
          title: "至少对这位受访者来说，见过面才算朋友",
          body: "一位 27 岁、在教育行业工作的受访者说，只有当面见过的人她才当作真朋友，其他都是“数字邻居”。在线上待得更久，并没有换来人们真正想要的关系。",
          evidence: "78.6% 觉得线上聊天很轻松，见了面却别扭"
        },
        {
          label: "发现 03",
          title: "现有平台大多把第一步留给用户",
          body: "Partiful 默认你会做东或组局。Meetup 靠大型聚会运转。Eatwith 把人分成主人和客人。约会软件则先看脸。每一个都要求用户先站出来，事情才会开始。",
          evidence: "对四个线下社交平台的竞品拆解"
        }
      ],
      personas: [
        {
          name: "李伟",
          meta: "22 岁 · 留学生 · 泽西城",
          pull: "更喜欢有安排的社交活动",
          points: ["搬到新城市之后很孤立", "出了学校就很难交到朋友", "语言不通，让没有安排的场合更难应付"]
        },
        {
          name: "Alex",
          meta: "35 岁 · 软件工程师 · 皇后区阿斯托里亚",
          pull: "想要一条能认识同类人的稳定路子",
          points: ["受够了停在表面的线上关系", "很难找到值得去的线下活动", "觉得组织好的团体活动缺少随性"]
        }
      ],
      note: "这是一次小规模的学生项目研究，共 55 人且没有重复计数，包括 28 份问卷、几场访谈和两轮可用性测试。结果只能用来判断方向，不能代表所有人。"
    },
    direction: {
      kicker: "产品方向",
      title: "我想做的更像社交支持工具，而不是另一个社交网络。",
      lead1: "Backstage 这个名字来自戈夫曼关于前台与后台的说法：人在前台表演，在后台准备。我把产品重点放在「后台」，让用户还没准备好被看见时，也有地方待着。",
      rules: [
        {
          label: "说明状态，不用表演",
          body: "看活动之前，先选一个社交状态：想安静地有人陪、只想听、随便聊聊，或者想找点热闹。应用会根据当天的状态给邀请。"
        },
        {
          label: "被邀请，而不是被匹配",
          body: "平台每次只发一份小型活动的邀请。没有互选，没有左右滑，也没有一份需要打动别人的资料。"
        },
        {
          label: "不去不用付代价",
          body: "拒绝后会出现新的邀请，不会被惩罚，也不会只剩空白页。不想去只是一个正常选择。"
        },
        {
          label: "留一个自己的房间",
          body: "更衣室默认私密。别人要进入必须先申请，用户可以自己决定开放哪些区域。"
        }
      ],
      modeHeading: "四种状态，按产品给出的顺序",
      modeLabels: ["安静待着", "少量交流", "需要一点勇气", "想找点热闹"],
      axisLow: "几乎不用交流",
      axisHigh: "主动想要有人陪",
      compareHeading: "它们各自先要求你做什么",
      comparison: [
        { app: "Meetup", asks: "走进一场有上百个陌生人的聚会" },
        { app: "Partiful", asks: "自己做东，或者本来就认识主人" },
        { app: "Eatwith", asks: "去别人的餐桌上当客人" },
        { app: "Tinder / Bumble", asks: "还没见面，先靠脸被挑中" },
        { app: "Backstage", asks: "接受一份邀请，或者不解释地放过它", ours: true }
      ],
      brandAlt: "Backstage 的欢迎页，上面写着：Not a social network. A social support system."
    },
    iterationOne: {
      kicker: "迭代 01",
      title: "第一版太像 Meetup，评审也直接指出了这一点。",
      lead: "第一版可以发布活动、筛选信息流，还要完成身份验证才能进入候补名单。流程能跑通，但和现有产品没有明显区别。",
      feedbackLabel: "反馈",
      changeLabel: "设计改动",
      resultLabel: "结果",
      feedback:
        "期中评审的反馈很直接：概念清楚，线下社交这个方向也成立，但产品太像 Meetup，用户没有理由选它。两位评审都建议我从人的状态出发，而不是继续做活动目录。",
      change:
        "我去掉了创建活动和自由浏览。平台改为给出活动邀请，用户只需接受或换一个，不再面对开放的信息流。活动人数控制在约 3–6 人，让一桌人还能聊得起来。",
      result: "修改后，每次只需要对一份邀请做决定。最终版本仍会显示剩余名额，通常是 3 个。",
      beforeCaption: "改之前：浏览、发布、进候补",
      beforeAlt: "第一版用户流程：首页进入活动浏览、发布活动，以及带个人信息验证的候补名单",
      afterCaption: "改之后：设定状态，接受或放过",
      afterAlt: "修改后的用户流程：设定社交状态、收到一张谢幕通知、接受或拒绝，另外还有一个带权限的私人更衣室"
    },
    iterationTwo: {
      kicker: "迭代 02",
      title: "第二轮主要改了措辞、安全感和整体氛围。",
      lead: "产品方向确定后，我开始测试用户能不能读懂它：功能叫什么、个人信息会露出多少，以及第一次打开时会有什么感觉。",
      items: [
        {
          feedback: "“Upcoming Performances”被看成是剧场演出，而不是社交活动。",
          change: "把产品里和活动有关的说法都改成平实的词：邀请、活动、日历。",
          result: "最终界面用的是 Invitation 和 Activities Participated。"
        },
        {
          feedback: "测试者对安全，以及自己会被看到多少，都不太放心。",
          change: "把更衣室改成需要授权：别人发申请，由你放行；安全这个问题也在产品里直接回答。",
          result: "做出来的产品里有访问申请、已开放区域，FAQ 里也有一条关于安全的问答。"
        },
        {
          feedback: "两个日历叠在一起，测试者分不清自己在看哪一个。",
          change: "把它们合成一个日历，既装已经排好的，也装已经发生的。",
          result: "最终版本只有一个按年月看的视图。"
        },
        {
          feedback: "深色主题被读成太重、太严肃，不像一个想让人放松的地方。",
           change: "我保留深色底，但加入暖调照片、柔和光晕和更轻的字体，让界面没那么压迫，而不是直接改成浅色。",
          result: "这是一次部分采纳：氛围我留下了，要修的是分量，不是深色本身。"
        }
      ]
    },
    system: {
      kicker: "设计系统",
      title: "深底上的柔光。",
      lead: "面向用户的标题使用衬线展示字，控件使用简单的无衬线字，边缘用柔和光晕代替硬切。这样既能保留深色界面，也不会显得太严厉。",
      leadCaption: "这套语言用在做出来的各个页面上",
      leadAlt: "Backstage 的最终界面：首页、个人设置、活动轨迹、日历、邀请、社交状态和日记",
      typeCaption: "字体",
      typeAlt: "Backstage 字体样张",
      componentCaption: "组件",
      componentAlt: "Backstage 组件库：资料卡、访问申请行、FAQ 折叠、进度条、按钮和日历"
    },
    reflection: {
      kicker: "反思",
      title: "少一点选择让产品有了特点，也带来了风险。",
      items: [
        {
          label: "主要取舍",
          body: "减少选择让产品和活动列表类平台拉开了距离，也限制了想在特定晚上挑特定活动的人。我只测试过一次使用，还不知道连续用几周会是什么感受。"
        },
        {
          label: "局限",
          body: "这是一个学生项目：一份小样本问卷、几场访谈、两轮定性测试，背后没有真实办过的活动。这里的东西都没有拿真实的到场率或安全事件验证过。"
        },
        {
          label: "下一步想验证什么",
          body: "人会不会接受一份不是自己挑的邀请，以及连着放过几次之后，这套邀请机制会不会开始让人觉得它没在听。"
        }
      ]
    }
  }
}

function Media({ media, className = "" }) {
  const wrapClass = className ? `${styles.media} ${className}` : styles.media

  if (media.video) {
    return (
      <div className={`${wrapClass} ${styles.mediaFramed}`}>
        {/* Silent, looping, no controls - it reads as an animated still.
            AutoplayVideo defers the download until the clip is near the
            viewport and keeps retrying play(), so four clips on one page
            cannot starve each other on a slow connection.
            width/height reserve the box so nothing shifts while it loads. */}
        <AutoplayVideo
          src={media.video}
          width="1200"
          height="750"
          ariaLabel={media.alt}
        />
      </div>
    )
  }

  if (media.src) {
    return (
      <div className={wrapClass}>
        <img src={media.src} alt={media.alt} />
      </div>
    )
  }

  return (
    <div className={`${wrapClass} ${styles.mediaEmpty}`}>
      <p className={styles.mediaLabel}>{media.label}</p>
      <p className={styles.mediaHint}>{media.hint}</p>
    </div>
  )
}

export default function BackstagePage({ track = "uiux", locale = "en" }) {
  const t = copy[locale] || copy.en

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track, locale)} track={track} locale={locale} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              locale={locale}
              label={t.hero.label}
              discipline={t.hero.discipline}
              title="Backstage"
              image={img("abfbb25869f710fb242d7441ce77a95df021ad48.png")}
              imageAlt={t.hero.imageAlt}
              summary={t.hero.summary}
              problem={t.hero.problem}
              contribution={t.hero.contribution}
              outcome={t.hero.outcome}
              role={t.hero.role}
              scope={t.hero.scope}
              platform={t.hero.platform}
              timeline={t.hero.timeline}
              action={{ href: prototypeUrl, label: t.hero.action, arrow: false }}
            />
          </div>

          <div className={styles.bodyContent}>
            <ProjectQuickNav slug="backstage" track={track} locale={locale} />
            <section id="problem" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.problem.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.problem.title}</h2>
                  <p className={styles.sectionLead}>{t.problem.lead}</p>
                </div>
              </div>

              <figure className={styles.survey}>
                <figcaption className={styles.surveyHead}>
                  <p className={styles.surveyQuestion}>{t.problem.freqQuestion}</p>
                  <p className={styles.surveyMeta}>{t.problem.freqMeta}</p>
                </figcaption>

                <div className={styles.surveyBar} role="img" aria-label={t.problem.freqAria}>
                  {meetFrequency.map((answer) => (
                    <span
                      className={styles.surveySegment}
                      key={answer.pct}
                      style={{ "--share": answer.share, "--tone": answer.tone }}
                    />
                  ))}
                </div>

                <dl className={styles.surveyKey}>
                  {meetFrequency.map((answer, i) => (
                    <div key={answer.pct}>
                      <dt>
                        <span className={styles.surveySwatch} style={{ "--tone": answer.tone }} aria-hidden="true" />
                        {answer.pct}
                      </dt>
                      <dd>{t.problem.freqLabels[i]}</dd>
                    </div>
                  ))}
                </dl>

                <p className={styles.surveyTakeaway}>{t.problem.freqTakeaway}</p>
              </figure>

              <div className={styles.rankPair}>
                <figure className={styles.rankChart}>
                  <figcaption className={styles.surveyHead}>
                    <p className={styles.surveyQuestion}>{t.problem.concernQuestion}</p>
                    <p className={styles.surveyMeta}>{t.problem.concernMeta}</p>
                  </figcaption>
                  <dl>
                    {meetingConcerns.map((row, i) => (
                      <div key={t.problem.concernLabels[i]}>
                        <dt>{t.problem.concernLabels[i]}</dt>
                        <dd>
                          <span className={styles.rankTrack}>
                            <span className={styles.rankFill} style={{ "--share": row.share }} />
                          </span>
                          <strong>{row.pct}</strong>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </figure>

                <figure className={styles.rankChart}>
                  <figcaption className={styles.surveyHead}>
                    <p className={styles.surveyQuestion}>{t.problem.conditionQuestion}</p>
                    <p className={styles.surveyMeta}>{t.problem.conditionMeta}</p>
                  </figcaption>
                  <dl>
                    {meetingConditions.map((row, i) => (
                      <div key={t.problem.conditionLabels[i]}>
                        <dt>{t.problem.conditionLabels[i]}</dt>
                        <dd>
                          <span className={styles.rankTrack}>
                            <span className={styles.rankFill} style={{ "--share": row.share }} />
                          </span>
                          <strong>{row.pct}</strong>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </figure>
              </div>

              <p className={styles.note}>{t.problem.note}</p>
            </section>

            <section id="design" className={`${styles.caseSection} ${styles.finalSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.design.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.design.title}</h2>
                  <p className={styles.sectionLead}>{t.design.lead}</p>
                </div>
              </div>

              <div className={styles.highlightList}>
                {t.design.items.map((item, i) => (
                  <article className={styles.highlightCard} key={item.title}>
                    <div className={styles.highlightCopy}>
                      <p className={styles.microLabel}>{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                    <Media
                      media={{ video: finalMedia[i].video, alt: item.alt }}
                      className={styles.highlightVisual}
                    />
                  </article>
                ))}
              </div>
            </section>

            <section id="research" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.research.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.research.title}</h2>
                  <p className={styles.sectionLead}>{t.research.lead}</p>
                </div>
              </div>

              <div className={styles.insightGrid}>
                {t.research.insights.map((insight) => (
                  <article className={styles.insightCard} key={insight.label}>
                    <p className={styles.microLabel}>{insight.label}</p>
                    <h3>{insight.title}</h3>
                    <p>{insight.body}</p>
                    <p className={styles.insightEvidence}>{insight.evidence}</p>
                  </article>
                ))}
              </div>

              <div className={styles.personaGrid}>
                {t.research.personas.map((persona) => (
                  <article className={styles.personaCard} key={persona.name}>
                    <div className={styles.personaHead}>
                      <h3>{persona.name}</h3>
                      <p className={styles.personaMeta}>{persona.meta}</p>
                    </div>
                    <p className={styles.personaPull}>&ldquo;{persona.pull}&rdquo;</p>
                    <ul className={styles.personaPoints}>
                      {persona.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <p className={styles.note}>{t.research.note}</p>
            </section>

            <section id="direction" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.direction.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.direction.title}</h2>
                  <p className={styles.sectionLead}>{t.direction.lead1}</p>
                </div>
              </div>

              <div className={styles.directionGrid}>
                {t.direction.rules.map((rule) => (
                  <article key={rule.label}>
                    <p className={styles.microLabel}>{rule.label}</p>
                    <p>{rule.body}</p>
                  </article>
                ))}
              </div>

              <div className={styles.modeScale}>
                <p className={styles.microLabel}>{t.direction.modeHeading}</p>
                <ol>
                  {t.direction.modeLabels.map((label, i) => (
                    <li key={label} style={{ "--tone": modeTones[i] }}>
                      <span className={styles.modeBar} aria-hidden="true" />
                      <span className={styles.modeLabel}>{label}</span>
                    </li>
                  ))}
                </ol>
                <div className={styles.modeAxis}>
                  <span>{t.direction.axisLow}</span>
                  <span>{t.direction.axisHigh}</span>
                </div>
              </div>

              <div className={styles.compareTable}>
                <p className={styles.microLabel}>{t.direction.compareHeading}</p>
                <dl>
                  {t.direction.comparison.map((row) => (
                    <div key={row.app} data-ours={row.ours ? "true" : undefined}>
                      <dt>{row.app}</dt>
                      <dd>{row.asks}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <figure className={`${styles.wideFigure} ${styles.brandFigure}`}>
                <img
                  src={img("3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png")}
                  alt={t.direction.brandAlt}
                />
              </figure>
            </section>

            <section id="iteration" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.iterationOne.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.iterationOne.title}</h2>
                  <p className={styles.sectionLead}>{t.iterationOne.lead}</p>
                </div>
              </div>

              <div className={styles.fcrRow}>
                <article>
                  <p className={styles.microLabel}>{t.iterationOne.feedbackLabel}</p>
                  <p>{t.iterationOne.feedback}</p>
                </article>
                <article>
                  <p className={styles.microLabel}>{t.iterationOne.changeLabel}</p>
                  <p>{t.iterationOne.change}</p>
                </article>
                <article>
                  <p className={styles.microLabel}>{t.iterationOne.resultLabel}</p>
                  <p>{t.iterationOne.result}</p>
                </article>
              </div>

              <div className={styles.flowPair}>
                <figure>
                  <figcaption>{t.iterationOne.beforeCaption}</figcaption>
                  <img
                    className={styles.flowImageCompact}
                    src={img("0f6ee6283100bbd556c10dbf388819d49cc8a28f.png")}
                    alt={t.iterationOne.beforeAlt}
                  />
                </figure>
                <figure>
                  <figcaption>{t.iterationOne.afterCaption}</figcaption>
                  <img
                    src={img("f78a0d3c7329c9f62b9e183fae6d54f11a1d880a.png")}
                    alt={t.iterationOne.afterAlt}
                  />
                </figure>
              </div>

            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.iterationTwo.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.iterationTwo.title}</h2>
                  <p className={styles.sectionLead}>{t.iterationTwo.lead}</p>
                </div>
              </div>

              <div className={styles.iterationList}>
                {t.iterationTwo.items.map((item, index) => (
                  <article className={styles.iterationItem} key={item.feedback}>
                    <span className={styles.iterationNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className={styles.microLabel}>{t.iterationOne.feedbackLabel}</p>
                      <p>{item.feedback}</p>
                    </div>
                    <div>
                      <p className={styles.microLabel}>{t.iterationOne.changeLabel}</p>
                      <p>{item.change}</p>
                    </div>
                    <div>
                      <p className={styles.microLabel}>{t.iterationOne.resultLabel}</p>
                      <p>{item.result}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.system.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.system.title}</h2>
                  <p className={styles.sectionLead}>{t.system.lead}</p>
                </div>
              </div>

              <figure className={styles.systemLead}>
                <figcaption>{t.system.leadCaption}</figcaption>
                <div className={styles.systemLeadStage}>
                  <img
                    src={img("c7b5b198ecbcc9e0361162f40233915523116c0c.png")}
                    alt={t.system.leadAlt}
                  />
                </div>
              </figure>

              <div className={styles.systemGrid}>
                <figure>
                  <figcaption>{t.system.typeCaption}</figcaption>
                  <img src={img("30810656e28623dcffdd5669b3d6603ae130054d.png")} alt={t.system.typeAlt} />
                </figure>
                <figure>
                  <figcaption>{t.system.componentCaption}</figcaption>
                  <img src="/backstage/group-97.png" alt={t.system.componentAlt} />
                </figure>
              </div>
            </section>

            <section id="reflection" className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.reflection.kicker}</p>
                <h2 className={styles.sectionTitle}>{t.reflection.title}</h2>
              </div>

              <div className={styles.reflectionGrid}>
                {t.reflection.items.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <ProjectNav slug="backstage" track={track} locale={locale} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.wideFigure}, .${styles.systemLead}, .${styles.media}, .${styles.flowPair} figure, .${styles.systemGrid} figure, .${styles.caseSection}`}
          bars={`.${styles.rankFill}, .${styles.surveyBar}, .${styles.modeBar}`}
        />

        <SiteFooter locale={locale} />
      </div>
    </main>
  )
}
