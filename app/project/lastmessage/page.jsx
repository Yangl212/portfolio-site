import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"
import CaseVideo from "../cleared/CaseVideo"
import styles from "./page.module.css"

export const metadata = {
  title: "Last Message",
  description:
    "An open-ended detective game with a readable main investigation and an optional, more demanding hidden route. Two of eight players reached the hidden ending in the playtest.",
  ...projectShareCard("lastmessage", {
    title: "Last Message",
    description:
      "An open-ended detective game with a readable main investigation and an optional, more demanding hidden route. Two of eight players reached the hidden ending in the playtest.",
    alt: "Last Message: a chat with an AI suspect over a glitched terminal"
  })
}

const img = (hash) => "/framer-assets/images/" + hash
const liveUrl = "https://lastmessage.online/test-intro.html"
const playtestUrl = "https://www.youtube.com/watch?v=UkSPX1I5Q-U"
const comparison = img("bb00cb03b3e532c6003864bef9d21154b5215f5f.png")

/*
 * Every line of prose on the page, in both languages. The English is
 * unchanged, lifted out of the JSX as it stood; the Chinese keeps the
 * same figures and the same carefulness - 2 of 8 players is an
 * observation about that group, the boundary rules guide the model
 * rather than guarantee anything, and the illustrative exchange is
 * still labelled as not a transcript.
 */
const copy = {
  en: {
    hero: {
      pill: "MFA Thesis Project",
      context: "Product Design · AI Interaction · 2026",
      lead: "An immersive browser-based ARG. It breaks the usual model of talking to an NPC by clicking an option: players say whatever they want, and every exchange moves them toward a different ending.",
      play: "Play the live game",
      watch: "Watch the playtest",
      coverAlt: "Last Message detective game title screen on a laptop",
      roleLabel: "My role",
      role: "Product Designer",
      scopeLabel: "My scope",
      scope: "UX / UI, AI behavior & web development",
      contextLabel: "Delivered",
      contextValue: "Investigation structure, interface, character rules and implementation",
      timelineLabel: "Timeline",
      timeline: "4 months"
    },
    experience: {
      kicker: "01 / Product highlights",
      heading: "A new kind of AI game experience.",
      lead: "Players enter as a detective investigating a death. The game is built to be as immersive as it can be, so there is no one direction to explore in: the narrative is non-linear.",
      choiceLabel: "Design choice",
      tradeoffLabel: "Tradeoff",
      chat: {
        label: "Conversation",
        title: "An unusual amount of player freedom.",
        body: "It breaks the option-picking of a traditional game: players type whatever they like to the NPCs, and each one answers from a perspective of its own, which is how the story comes together.",
        choice: "A plain chat interface, close to the ones people already use, so there is nothing to learn and the attention goes to the conversation itself.",
        tradeoff: "Open input gives players freedom, but it also means some of them ask out of curiosity about things the game has nothing to do with. So the endings account for it: enough unrelated questions trigger a bad ending outright.",
        demoLabel: "Private conversation with Mike Anderson"
      },
      clue: {
        label: "Real and fictional, interleaved",
        title: "Built from fictional pages and real ones together.",
        body: "Some of what players turn up inside the game leads further out: the same names and events can be followed on the real internet, on Wikipedia or X.",
        choice: "Blur the line between what is real and what is made up, so players are further inside the story.",
        tradeoff: "Mixing the two does draw people in, but jumping between several sites leaves them unsure which parts belong to the game, and the archived pages still have problems of their own, so the run of it is not yet smooth. This part needs more work.",
        demoLabel: "The fictional character's profile on X, used as an investigation clue"
      }
    },
    flow: {
      kicker: "02 / Game flow",
      heading: "The game is non-linear, with eight different endings.",
      loopLabel: "Player flow",
      steps: [
        { title: "Enter the game", body: "The player is a detective, and takes a call from a woman reporting a case." },
        { title: "Get into the hidden site", body: "Slip into the group and talk to the NPCs to earn more access." },
        { title: "Get a new account", body: "Obtain an account that gets you into the group, then talk to its members for what they keep quiet." },
        { title: "Get admin rights", body: "Use what you have found to unlock more records, and open up private chats." },
        { title: "Reach one of the endings", body: "Who the player talks to decides which ending they reach. Going off the obvious path can turn up things few people see." }
      ],
      mapTitle: "Seven endings, plus one hidden.",
      mapBody: "Once an ending is reached, the player can open the story map, find a route they have not taken, and go back to explore it.",
      mapDemoLabel: "Story map showing revealed and locked routes through the branching endings",
      cards: [
        { label: "Information architecture", title: "Give each kind of evidence a home.", body: "Chat, the member registry, and the mission board occupy separate routes. The player can return to the same record structure as the case grows." },
        { label: "State feedback", title: "Show what has changed.", body: "Locked records, available files, member status, and counters distinguish what is known from what still needs investigation." }
      ],
      summary: "Early explorations behind the non-linear structure",
      disclosureLead: "Two exploratory exercises informed the direction: people could form different interpretations from the same fragments and inspect clues in their own order. These exercises informed the concept; they did not validate the final game's usability.",
      study1Aria: "Open trace inference study image at full size",
      study1Alt: "Annotated discarded objects used to explore how people infer a story from traces",
      study1Title: "01 / Trace inference",
      study1Body: "Participants inferred an owner from discarded objects. Their confident but differing interpretations suggested room for more than one reading of a clue.",
      study2Aria: "Open visual detective exercise at full size",
      study2Alt: "Illustrated room with ten inspectable objects and their clue records",
      study2Title: "02 / Visual detective exercise",
      study2Body: "A room contained ten inspectable objects with short records. Participants chose their own inspection order, informing the modular record structure."
    },
    ai: {
      kicker: "03 / AI interaction design",
      heading: "Design what happens when the player goes off script.",
      lead: "Free-form conversation needs limits. I defined character personalities, knowledge boundaries, and responses to off-topic input, then connected those behaviors to the investigation.",
      featureLabel: "A boundary in the working build",
      featureTitle: "A warning becomes a consequence.",
      featureBody: "The chat history records repeated weather questions and Lily's warnings. The recording then shows the disconnected chat and the “Revoked” ending.",
      intentLabel: "Intent",
      intent: "Keep an off-topic exchange inside the story instead of returning a generic assistant response.",
      tradeoffLabel: "Tradeoff",
      tradeoff: "Revoking access makes the boundary consequential. It also risks punishing normal curiosity; the clarity of the warning needs further testing.",
      featureDemoLabel: "Lily's warnings in the chat history, disconnection, and the Revoked ending",
      rules: [
        { label: "01 / Character", title: "A consistent voice", detail: "Each character has a separate prompt for tone and conversational style. Midnight, for example, is calm and controlled, with a deliberate sense of distance." },
        { label: "02 / Knowledge", title: "A limit on what can be revealed", detail: "Rules distinguish acknowledging another member from revealing their private file. These instructions guide responses; they do not guarantee that the model will never reveal too much." },
        { label: "03 / Off-script input", title: "A response when players test the rules", detail: "Off-topic questions, challenges to the administrator, and questions about the AI have defined response rules. Repeated probing can become a story consequence, as the recording shows." }
      ],
      summary: "Character prompts and response rules",
      exampleLabel: "Illustrative exchange · not a playtest transcript",
      playerLabel: "Player",
      playerLine: "“Who is No. 1?”",
      ruleLabel: "Rule",
      ruleLine: "May confirm a member exists; may not reveal their private file.",
      characterLabel: "Character",
      characterLine: "“There are others here. What they carry is not mine to hand over.”",
      promptAria: "Open Midnight's character prompt at full size",
      promptAlt: "Midnight's system prompt with tone, conversation, and boundary instructions",
      promptTitle: "Character-level instructions",
      promptBody: "Midnight's prompt defines tone, conversation style, boundaries, and off-topic handling.",
      rulesAria: "Open bilingual response rules at full size",
      rulesAlt: "English and Chinese rules for off-topic detection and challenges to the story",
      rulesTitle: "Input-handling rules",
      rulesBody: "English and Chinese patterns cover member queries, off-topic messages, and attempts to challenge the fiction.",
      note: "Built with Claude Code and the ChatGPT API. My design work covered the characters, response boundaries, interface states, and the relationship between conversation and progression."
    },
    playtest: {
      kicker: "04 / Playtesting & iteration",
      heading: "A readable main investigation, with an optional hidden route.",
      lead: "The hidden ending asks players to pay closer attention to clues and connections across the story. Discovering this layer is part of the challenge; universal completion was never the goal.",
      stats: [
        { value: "8", label: "players in the working-build test" },
        { value: "~35 min", label: "reported time to identify the main suspect" },
        { value: "2 of 8", label: "players reached the secret ending" }
      ],
      note: "Two of the eight players reached the hidden ending. I treat this as an observation of discovery in this group. It provides a starting point for examining how players explore the optional layer, but does not establish the ideal level of difficulty or determine the game's overall usability.",
      iterations: [
        { label: "01 / Entry", title: "Give the player a role before the first chat.", problem: "The text-heavy opening left testers unclear about who they were and why they were investigating.", changeLabel: "Changed", change: "Shortened the introduction and reframed the first screen as a visual police incident report.", outcomeLabel: "Later observation", outcome: "Most players in the eight-person working-build test followed the main storyline and identified the main suspect. This was not an isolated before-and-after test of the introduction." },
        { label: "02 / Conversation", title: "Design for questions outside the script.", problem: "Players challenged the fiction; keyword-based replies repeated themselves and made characters feel artificial.", changeLabel: "Changed", change: "Moved to character-specific prompts with personality, knowledge limits, and rules for off-topic input.", outcomeLabel: "Implemented behavior", outcome: "The current build demonstrates warnings and a revoked-access ending. More varied prompts are still needed to assess how consistently the boundaries hold." },
        { label: "03 / Discovery", title: "Evaluate the optional route on its own terms.", problem: "Two of the eight players reached the hidden ending. This is an observation of discovery in this group, not proof that the difficulty is right or wrong.", changeLabel: "Next evaluation", change: "I would examine where players stop, what they believe remains to be discovered, and whether the interface gives them enough feedback to choose a next step.", outcomeLabel: "Design intent", outcome: "Clear navigation and record states should support the investigation while preserving the effort required to solve the mystery." }
      ],
      summary: "The first playable chatroom",
      originAria: "Open the early chatroom prototype at full size",
      originAlt: "Early light chat interface with a general channel and member list",
      originBody: "A plain chatroom and member list provided an early way to explore the interaction. Testing exposed the need to establish a role and a reason to investigate before asking players to start a conversation."
    },
    build: {
      kicker: "05 / From Figma to a working website",
      heading: "Building it exposed the states a static screen could miss.",
      lead: "The high-fidelity designs established the visual language. Working with real content made navigation, locked records, and changing member states part of the design work.",
      compareAlt: "Figma designs on the left and the implemented member registry and mission board on the right",
      compareCaption: "Left: Figma designs. Right: implemented screens with locked records, member status, and diary access.",
      cards: [
        { label: "Navigation", title: "Separate destinations as content grows.", body: "Chat, the registry, and the mission board moved into their own routes when a single stacked view became too dense." },
        { label: "Interaction states", title: "Design before and after access.", body: "Locked and unlocked records, plus alive and deceased member states, needed recognizable treatments beyond the default screen." },
        { label: "Language", title: "Support English and Chinese input.", body: "Character rules were maintained in both languages. Supporting the same intent requires more than translating the interface labels." }
      ],
      systemLabel: "Visual system / a readable digital archive",
      system: [
        { title: "Type", body: "Pixel display type establishes the fiction; monospace body text gives records a consistent rhythm." },
        { title: "Contrast", body: "Dark surfaces and light text frame the evidence, with red accents for status and alerts." },
        { title: "Record patterns", body: "Repeated headers, folders, status tags, and counters help players recognize new information." }
      ]
    },
    reflection: {
      kicker: "What I take forward",
      heading: "Preserve the mystery, then test whether the challenge is fair.",
      lead: "My next evaluation would examine whether the main investigation remains understandable, whether hidden-route clues can be reasoned through, and whether navigation and record states provide enough feedback without revealing the answer.",
      explore: "Explore Last Message",
      watch: "Watch the playtest"
    }
  },
  zh: {
    hero: {
      pill: "MFA 毕业设计",
      context: "产品设计 · AI 交互 · 2026",
      lead: "一款网页端的 ARG 沉浸式游戏。打破传统点击选项与 NPC 对话的模式，游戏中玩家可与 NPC 自由对话，并且每一次对话都会影响最后通向不同结局。",
      play: "点击试玩",
      watch: "查看测试影像",
      coverAlt: "笔记本上打开的 Last Message 侦探游戏标题画面",
      roleLabel: "我的角色",
      role: "产品设计师",
      scopeLabel: "我负责的部分",
      scope: "UX / UI、AI 行为与网页开发",
      contextLabel: "交付内容",
      contextValue: "完成了调查结构、界面、角色规则和代码实现",
      timelineLabel: "周期",
      timeline: "4 个月"
    },
    experience: {
      kicker: "01 / 产品亮点",
      heading: "全新的 AI 游戏产品体验",
      lead: "玩家以侦探身份调查一桩死亡案件。本产品希望给玩家带去尽可能沉浸的体验感，因此探索方向没有唯一选择，是一个非线性叙事的游戏。",
      choiceLabel: "设计选择",
      tradeoffLabel: "取舍",
      chat: {
        label: "对话",
        title: "超高的玩家自由度",
        body: "打破传统游戏的选项交流，玩家可自由输入任何内容与 NPC 进行交流，从而获得不同 NPC 的独特视角，帮助玩家了解游戏剧情。",
        choice: "使用简单且贴近用户平时使用的聊天界面，减少用户学习难度，让用户将注意力放在与 NPC 的交流上。",
        tradeoff: "开放输入给了玩家自由，但同样也会出现玩家出于好奇心询问与游戏毫无相干问题的情况。因此在结局设计中，我引入了多次无关将直接触发 bad ending 的设计。",
        demoLabel: "与 Mike Anderson 的私聊"
      },
      clue: {
        label: "真假交错",
        title: "虚拟网页与真实内容共同构筑",
        body: "在游戏探索中得到的有些信息，可以在真实的互联网世界（例如维基百科、X 等）寻找到更多的线索。",
        choice: "模糊真实与虚拟的边界，帮助玩家更有代入感。",
        tradeoff: "真假混在一起确实更有代入感，但在多个网站之间跳转时玩家会产生疑问，不容易分清哪些属于游戏；这些网页的存档本身也还有一些问题，整段体验还不够顺。这部分还需要再打磨。",
        demoLabel: "虚构角色在 X 上的主页，被当作调查线索"
      }
    },
    flow: {
      kicker: "02 / 游戏流程",
      heading: "本游戏采用非线性叙事，并拥有 8 个不同结局",
      loopLabel: "玩家流程",
      steps: [
        { title: "进入游戏", body: "玩家作为警探接到一名女子的报案电话。" },
        { title: "进入神秘网站", body: "潜入群内，与 NPC 交流获得更多的权限。" },
        { title: "获得新账号", body: "获取新入群账号，并与群内成员进行聊天，获得更多隐秘信息。" },
        { title: "获得管理员权限", body: "用查到的东西解锁更多档案，并开启私聊权限。" },
        { title: "不同的结局", body: "玩家与不同 NPC 的沟通会走向不同结局。另辟蹊径可能会帮助你发现更鲜为人知的秘密。" }
      ],
      mapTitle: "七个结局 + 一个隐藏结局",
      mapBody: "进入结局后，玩家可以打开故事进程发现新的路径，并返回重新探索。",
      mapDemoLabel: "故事地图，显示分支结局里已解锁和锁着的路线",
      cards: [
        { label: "信息架构", title: "每类证据都有自己的地方", body: "聊天、成员名册和任务板各占一条路由。案子越查越大，玩家也能回到同一套档案结构里。" },
        { label: "状态反馈", title: "把变化显示出来", body: "锁着的档案、可看的文件、成员状态和计数器，把「已经知道的」和「还要查的」区分开。" }
      ],
      summary: "非线性结构背后的早期探索",
      disclosureLead: "前期两个小练习让我确认了两件事：同一组碎片，不同的人会拼出不同故事；查线索的顺序也因人而异。这些练习只影响了概念方向，没有验证最终游戏是否好用。",
      study1Aria: "查看痕迹推理研究的大图",
      study1Alt: "带标注的废弃物品，用来探索人如何从痕迹里推出故事",
      study1Title: "01 / 痕迹推理",
      study1Body: "参与者从一堆废弃物品推测主人是谁。他们讲得都很笃定，但结论各不相同，说明同一条线索容得下不止一种读法。",
      study2Aria: "查看视觉侦探练习的大图",
      study2Alt: "一间画出来的房间，里面有十件可查看的物品和它们的线索记录",
      study2Title: "02 / 视觉侦探练习",
      study2Body: "房间里有十件可以查看的物品，各配一小段记录。参与者自己决定查看顺序，这一点影响了后来模块化的档案结构。"
    },
    ai: {
      kicker: "03 / AI 交互设计",
      heading: "玩家问了剧本外的问题，角色也得接得住",
      lead: "自由对话不能没有边界。我为每个角色写下性格、知识范围和跑题时的回应方式，再把这些反应放回故事里。",
      featureLabel: "现有版本里的一条边界",
      featureTitle: "警告会变成后果",
      featureBody: "聊天记录里留着反复追问天气的对话，还有 Lily 的几次警告。录像接着显示连接被断开，以及「Revoked」结局。",
      intentLabel: "意图",
      intent: "即使玩家跑题，角色也要留在故事里回应，而不是突然变成通用 AI 助手。",
      tradeoffLabel: "取舍",
      tradeoff: "收回权限让这条边界真的有分量，但也可能误伤正常的好奇心；警告说得够不够清楚，还需要再测。",
      featureDemoLabel: "聊天记录里 Lily 的警告、断连，以及 Revoked 结局",
      rules: [
        { label: "01 / 角色", title: "口吻要一致", detail: "每个角色有各自的 prompt，规定语气和说话方式。比如 Midnight 是冷静、克制的，带着刻意保持的距离感。" },
        { label: "02 / 知识", title: "能说到哪为止", detail: "规则把「承认另一个成员存在」和「把他的私人档案说出去」分得很清。这些指令是引导回答的，不能保证模型永远不会说多。" },
        { label: "03 / 剧本外输入", title: "玩家试探规则时，角色怎么回应", detail: "跑题、质疑管理员、追问 AI 本身，各有不同的回应规则。反复试探还会触发故事里的后果，录像里展示的就是其中一种。" }
      ],
      summary: "角色 prompt 和回应规则",
      exampleLabel: "示意用的对话 · 不是测试实录",
      playerLabel: "玩家",
      playerLine: "「1 号是谁？」",
      ruleLabel: "规则",
      ruleLine: "可以确认这个成员存在；不能把他的私人档案说出去。",
      characterLabel: "角色",
      characterLine: "「这里还有别人。他们身上的东西，不该由我交出去。」",
      promptAria: "查看 Midnight 角色 prompt 的大图",
      promptAlt: "Midnight 的系统 prompt，含语气、对话方式和边界指令",
      promptTitle: "角色层面的指令",
      promptBody: "Midnight 的 prompt 规定了语气、说话方式、边界，以及跑题时怎么处理。",
      rulesAria: "查看中英双语回应规则的大图",
      rulesAlt: "中英文的规则，用于识别跑题和对故事本身的质疑",
      rulesTitle: "输入处理规则",
      rulesBody: "中英两套模式，覆盖询问成员、跑题消息，以及想拆穿这个虚构设定的尝试。",
      note: "用 Claude Code 和 ChatGPT API 搭的。我的设计工作包括角色、回应边界、界面状态，以及对话和进度之间的关系。"
    },
    playtest: {
      kicker: "04 / 测试与迭代",
      heading: "主线要跟得上，隐藏路线可以难一点",
      lead: "隐藏结局要求玩家更仔细地看线索，以及线索之间的联系。能不能发现这一层本身就是难度的一部分；让所有人都通关从来不是目标。",
      stats: [
        { value: "8", label: "参与可玩版本测试的玩家" },
        { value: "约 35 分钟", label: "玩家自述锁定主要嫌疑人的时间" },
        { value: "8 人中 2 人", label: "走到了隐藏结局" }
      ],
      note: "8 位玩家中有 2 位走到了隐藏结局。这个结果只能说明这组玩家是怎样探索可选路线的，不能证明难度恰好合适，也不能用来判断整个游戏是否好用。",
      iterations: [
        { label: "01 / 开场", title: "先让玩家知道自己是谁，再让他开口", problem: "开场文字太多，测试者搞不清自己的身份，也不知道为什么要查这个案子。", changeLabel: "改动", change: "缩短开场说明，把第一屏改成一份视觉化的警方事件报告。", outcomeLabel: "后来的观察", outcome: "在 8 人的可玩版本测试里，多数玩家能跟上主线，也认出了主要嫌疑人。但这不是一次只针对开场的前后对照测试。" },
        { label: "02 / 对话", title: "为剧本之外的问题做设计", problem: "玩家会质疑这个虚构设定；基于关键词的回复来回重复，角色显得很假。", changeLabel: "改动", change: "改成每个角色一套 prompt，写清性格、知识边界，以及跑题输入的处理规则。", outcomeLabel: "已实现的行为", outcome: "现在的版本能演示警告和「收回权限」的结局。边界到底稳不稳，还需要更多样的提问来评估。" },
        { label: "03 / 发现", title: "单独评估这条隐藏路线", problem: "8 位玩家中只有 2 位走到隐藏结局。这个数字不能证明难度合适或不合适。", changeLabel: "下一步评估", change: "下一轮会记录玩家卡在哪里、以为自己还漏了什么，以及界面反馈是否足够支持下一步判断。", outcomeLabel: "设计意图", outcome: "导航和档案状态应该帮玩家继续调查，但不能把谜题本身的难度拿掉。" }
      ],
      summary: "第一个能玩的聊天室",
      originAria: "查看早期聊天室原型的大图",
      originAlt: "早期的浅色聊天界面，有一个公共频道和成员列表",
      originBody: "一个朴素的聊天室加成员列表，是早期试交互的办法。测试暴露出的问题是：得先给玩家一个身份和一个查下去的理由，再让他开口聊。"
    },
    build: {
      kicker: "05 / 从 Figma 到能跑的网站",
      heading: "从 Figma 做成网站后，才发现静态稿漏了多少状态",
      lead: "高保真稿只定下了视觉语言。放入真实内容后，导航、锁定档案和不断变化的成员状态，才真正变成需要解决的问题。",
      compareAlt: "左边是 Figma 稿，右边是实现出来的成员名册和任务板",
      compareCaption: "左：Figma 稿。右：实现出来的界面，含锁着的档案、成员状态和日记权限。",
      cards: [
        { label: "导航", title: "内容变多，就把目的地拆开", body: "当单页堆叠太密时，聊天、名册和任务板各自挪进了自己的路由。" },
        { label: "交互状态", title: "拿到权限前后都要设计", body: "锁着和解锁的档案，还有成员在世与死亡的状态，都需要在默认画面之外有能一眼认出的处理。" },
        { label: "语言", title: "中英文输入都要支持", body: "角色规则是中英两套一起维护的。要让两种语言表达同一个意图，光把界面文字翻过去是不够的。" }
      ],
      systemLabel: "视觉系统 / 一份读得下去的数字档案",
      system: [
        { title: "字体", body: "像素风标题字立住虚构感；正文用等宽字，让档案有统一的节奏。" },
        { title: "对比", body: "深色底配浅色字把证据框出来，状态和警报用红色点出。" },
        { title: "档案模式", body: "重复出现的表头、文件夹、状态标签和计数器，帮玩家认出哪些是新信息。" }
      ]
    },
    reflection: {
      kicker: "接下来要做的",
      heading: "下一轮要确认：这个谜够难，但不是没法解",
      lead: "我会继续看主线是否容易跟、隐藏路线能否靠推理走通，以及导航和档案状态给的反馈是否足够，同时避免提前泄露答案。",
      explore: "去玩 Last Message",
      watch: "看测试录像"
    }
  }
}

function Demo({ name, label }) {
  return <CaseVideo className={styles.demo} src={"/lastmessage/media/" + name + "-loop.mp4"}
    poster={"/lastmessage/media/" + name + "-poster.webp"} width={1600} height={1000} label={label} />
}

function SectionHeading({ label, title, children, wide = false }) {
  return <header className={`${styles.sectionHeader} ${wide ? styles.sectionHeaderWide : ""}`.trim()}>
    <p className={styles.kicker}>{label}</p>
    <h2>{title}</h2>
    {children && <p className={styles.sectionLead}>{children}</p>}
  </header>
}

export default function LastMessagePage({ track = "uiux", locale = "en" }) {
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
          <section className={styles.hero} aria-labelledby="project-title">
            <div className={`${styles.eyebrow} ${styles.reveal}`}>
              <span className={styles.pill}>{t.hero.pill}</span>
              <span>{t.hero.context}</span>
            </div>
            <div className={styles.heroIntro}>
              <div className={styles.heroCopy}>
                <h1 id="project-title" className={styles.reveal} style={{ animationDelay: "60ms" }}>Last Message</h1>
                <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>{t.hero.lead}</p>
                {t.hero.question && <p className={`${styles.heroQuestion} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>{t.hero.question}</p>}
                <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                  <a className={styles.action} href={liveUrl} target="_blank" rel="noreferrer">{t.hero.play} <span aria-hidden="true">↗</span></a>
                  <a className={styles.textLink} href={playtestUrl} target="_blank" rel="noreferrer">{t.hero.watch}</a>
                </div>
              </div>
              <img className={`${styles.heroImage} ${styles.reveal}`} style={{ animationDelay: "140ms" }} src="/lastmessage/cover.png" alt={t.hero.coverAlt} fetchPriority="high" />
            </div>
            <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
              <div><dt>{t.hero.roleLabel}</dt><dd>{t.hero.role}</dd></div>
              <div><dt>{t.hero.scopeLabel}</dt><dd>{t.hero.scope}</dd></div>
              <div><dt>{t.hero.contextLabel}</dt><dd>{t.hero.contextValue}</dd></div>
              <div><dt>{t.hero.timelineLabel}</dt><dd>{t.hero.timeline}</dd></div>
            </dl>
          </section>

          <ProjectQuickNav slug="lastmessage" track={track} locale={locale} />

          <section className={styles.caseSection} id="experience">
            <SectionHeading label={t.experience.kicker} title={t.experience.heading}>
              {t.experience.lead}
            </SectionHeading>
            <article className={styles.feature}>
              <div className={styles.featureCopy}>
                <p className={styles.microLabel}>{t.experience.chat.label}</p>
                <h3>{t.experience.chat.title}</h3>
                <p>{t.experience.chat.body}</p>
                <dl className={styles.reasoning}>
                  <div><dt>{t.experience.choiceLabel}</dt><dd>{t.experience.chat.choice}</dd></div>
                  <div><dt>{t.experience.tradeoffLabel}</dt><dd>{t.experience.chat.tradeoff}</dd></div>
                </dl>
              </div>
              <Demo name="chat" label={t.experience.chat.demoLabel} />
            </article>
            <article className={styles.feature}>
              <div className={styles.featureCopy}>
                <p className={styles.microLabel}>{t.experience.clue.label}</p>
                <h3>{t.experience.clue.title}</h3>
                <p>{t.experience.clue.body}</p>
                <dl className={styles.reasoning}>
                  <div><dt>{t.experience.choiceLabel}</dt><dd>{t.experience.clue.choice}</dd></div>
                  <div><dt>{t.experience.tradeoffLabel}</dt><dd>{t.experience.clue.tradeoff}</dd></div>
                </dl>
              </div>
              <Demo name="web-clue" label={t.experience.clue.demoLabel} />
            </article>
          </section>

          <section className={styles.caseSection} id="investigation-flow">
            <SectionHeading wide label={t.flow.kicker} title={t.flow.heading}>
              {t.flow.lead}
            </SectionHeading>
            <div className={styles.flowBlock}>
              <p className={styles.microLabel}>{t.flow.loopLabel}</p>
              <ol className={styles.flow}>
                {t.flow.steps.map((step, index) => <li key={step.title}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3><p>{step.body}</p>
                </li>)}
              </ol>
            </div>
            <div className={styles.mapIntro}>
              <h3>{t.flow.mapTitle}</h3>
              <p>{t.flow.mapBody}</p>
            </div>
            <Demo name="routes" label={t.flow.mapDemoLabel} />
            <div className={styles.decisionGrid}>
              {t.flow.cards.map((card) => (
                <article key={card.title}><p className={styles.microLabel}>{card.label}</p><h3>{card.title}</h3><p>{card.body}</p></article>
              ))}
            </div>
            <details className={styles.disclosure}>
              <summary>{t.flow.summary}</summary>
              <div className={styles.disclosureBody}>
                <p className={styles.sectionLead}>{t.flow.disclosureLead}</p>
                <div className={styles.studyList}>
                  <figure className={styles.study}>
                    <a href={img("8e13dc05a4b730bb0c86cf502c98eff96923d3a4.png")} target="_blank" rel="noreferrer" aria-label={t.flow.study1Aria}><img loading="lazy" src={img("8e13dc05a4b730bb0c86cf502c98eff96923d3a4.png")} alt={t.flow.study1Alt} /></a>
                    <figcaption><strong>{t.flow.study1Title}</strong>{t.flow.study1Body}</figcaption>
                  </figure>
                  <figure className={styles.study}>
                    <a href={img("e170301fd8cc341588840a663f2c940611f1d986.png")} target="_blank" rel="noreferrer" aria-label={t.flow.study2Aria}><img loading="lazy" src={img("e170301fd8cc341588840a663f2c940611f1d986.png")} alt={t.flow.study2Alt} /></a>
                    <figcaption><strong>{t.flow.study2Title}</strong>{t.flow.study2Body}</figcaption>
                  </figure>
                </div>
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="ai-behavior">
            <SectionHeading label={t.ai.kicker} title={t.ai.heading}>
              {t.ai.lead}
            </SectionHeading>
            <article className={styles.feature}>
              <div className={styles.featureCopy}>
                <p className={styles.microLabel}>{t.ai.featureLabel}</p>
                <h3>{t.ai.featureTitle}</h3>
                <p>{t.ai.featureBody}</p>
                <dl className={styles.reasoning}>
                  <div><dt>{t.ai.intentLabel}</dt><dd>{t.ai.intent}</dd></div>
                  <div><dt>{t.ai.tradeoffLabel}</dt><dd>{t.ai.tradeoff}</dd></div>
                </dl>
              </div>
              <Demo name="boundary" label={t.ai.featureDemoLabel} />
            </article>
            <div className={styles.ruleGrid}>
              {t.ai.rules.map(rule => <article key={rule.label}><p className={styles.microLabel}>{rule.label}</p><h3>{rule.title}</h3><p>{rule.detail}</p></article>)}
            </div>
            <details className={styles.disclosure}>
              <summary>{t.ai.summary}</summary>
              <div className={styles.disclosureBody}>
                <div className={styles.ruleExample}>
                  <p className={styles.microLabel}>{t.ai.exampleLabel}</p>
                  <dl>
                    <div><dt>{t.ai.playerLabel}</dt><dd>{t.ai.playerLine}</dd></div>
                    <div><dt>{t.ai.ruleLabel}</dt><dd>{t.ai.ruleLine}</dd></div>
                    <div><dt>{t.ai.characterLabel}</dt><dd>{t.ai.characterLine}</dd></div>
                  </dl>
                </div>
                <div className={styles.evidenceGrid}>
                  <figure>
                    <a href={img("5247c345f474e10806399fab7a3a5708be0aa486.png")} target="_blank" rel="noreferrer" aria-label={t.ai.promptAria}><img loading="lazy" src={img("5247c345f474e10806399fab7a3a5708be0aa486.png")} alt={t.ai.promptAlt} /></a>
                    <figcaption><strong>{t.ai.promptTitle}</strong>{t.ai.promptBody}</figcaption>
                  </figure>
                  <figure>
                    <a href={img("01a293011536bfac21d1b0d0106f69962c9f74c7.png")} target="_blank" rel="noreferrer" aria-label={t.ai.rulesAria}><img loading="lazy" src={img("01a293011536bfac21d1b0d0106f69962c9f74c7.png")} alt={t.ai.rulesAlt} /></a>
                    <figcaption><strong>{t.ai.rulesTitle}</strong>{t.ai.rulesBody}</figcaption>
                  </figure>
                </div>
                <p className={styles.sourceNote}>{t.ai.note}</p>
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="playtesting">
            <SectionHeading label={t.playtest.kicker} title={t.playtest.heading}>
              {t.playtest.lead}
            </SectionHeading>
            <div className={styles.statRow}>
              {t.playtest.stats.map((stat) => (
                <article key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></article>
              ))}
            </div>
            <p className={styles.sourceNote}>{t.playtest.note}</p>
            <div className={styles.iterationList}>
              {t.playtest.iterations.map(item => <article className={styles.iterationItem} key={item.label}>
                <div><p className={styles.microLabel}>{item.label}</p><h3>{item.title}</h3><p>{item.problem}</p></div>
                <dl className={styles.reasoning}>
                  <div><dt>{item.changeLabel}</dt><dd>{item.change}</dd></div>
                  <div><dt>{item.outcomeLabel}</dt><dd>{item.outcome}</dd></div>
                </dl>
              </article>)}
            </div>
            <details className={styles.disclosure}>
              <summary>{t.playtest.summary}</summary>
              <div className={[styles.disclosureBody, styles.origin].join(" ")}>
                <a href={img("5a194480daae1010ec7ec4e0cbfe9506c2d91cb8.png")} target="_blank" rel="noreferrer" aria-label={t.playtest.originAria}><img loading="lazy" src={img("5a194480daae1010ec7ec4e0cbfe9506c2d91cb8.png")} alt={t.playtest.originAlt} /></a>
                <p>{t.playtest.originBody}</p>
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="figma-to-build">
            <SectionHeading label={t.build.kicker} title={t.build.heading}>
              {t.build.lead}
            </SectionHeading>
            <figure className={styles.compareFigure}>
              <img loading="lazy" src={comparison} alt={t.build.compareAlt} />
              <figcaption><span>{t.build.compareCaption}</span></figcaption>
            </figure>
            <div className={styles.ruleGrid}>
              {t.build.cards.map((card) => (
                <article key={card.title}><p className={styles.microLabel}>{card.label}</p><h3>{card.title}</h3><p>{card.body}</p></article>
              ))}
            </div>
            <div className={styles.visualSystem}>
              <p className={styles.microLabel}>{t.build.systemLabel}</p>
              <div className={styles.systemGrid}>
                {t.build.system.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}
              </div>
            </div>
          </section>

          <section className={[styles.caseSection, styles.reflection].join(" ")}>
            <SectionHeading label={t.reflection.kicker} title={t.reflection.heading}>
              {t.reflection.lead}
            </SectionHeading>
            <div className={styles.actions}>
              <a className={styles.action} href={liveUrl} target="_blank" rel="noreferrer">{t.reflection.explore} <span aria-hidden="true">↗</span></a>
              <a className={styles.textLink} href={playtestUrl} target="_blank" rel="noreferrer">{t.reflection.watch}</a>
            </div>
          </section>
          <ProjectNav slug="lastmessage" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
