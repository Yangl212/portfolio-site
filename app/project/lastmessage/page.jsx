import { Fragment } from "react"

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
      mapDemoLabel: "Story map showing revealed and locked routes through the branching endings",
      summary: "Early explorations behind the non-linear structure",
      disclosureLead: "Two exploratory exercises informed the direction: people could form different interpretations from the same fragments and inspect clues in their own order. These exercises informed the concept; they did not validate the final game's usability.",
      study1Aria: "Open trace inference study image at full size",
      study1Alt: "Annotated discarded objects used to explore how people infer a story from traces",
      study1Title: "01 / Trace inference",
      study1Body: "Participants inferred an owner from discarded objects. Their confident but differing interpretations suggested room for more than one reading of a clue.",
      study2Alt: "Illustrated room with ten inspectable objects and their clue records",
      study2Title: "02 / Visual detective exercise",
      study2Body: "A room contained ten inspectable objects with short records. Participants chose their own inspection order, informing the modular record structure."
    },
    ai: {
      kicker: "03 / AI interaction design",
      heading: "Holding the story together while the player roams.",
      featureLabel: "Language boundaries set for the AI NPCs",
      featureTitle: "A warning becomes a consequence.",
      featureBody: "When a player keeps asking an NPC about things the game has nothing to do with, the NPC says so and declines to answer. Trip that enough times and you are reported to the site’s admin, thrown out of the group chat, and the game ends in a bad ending.",
      intentLabel: "Intent",
      intent: "Even when the player wanders off, the character answers in the voice it was written with - and warns them while it does.",
      tradeoffLabel: "Tradeoff",
      tradeoff: "Questions near the edge can be misjudged, and a player whose curiosity takes a knock may stop digging for the more hidden endings.",
      featureDemoLabel: "Lily's warnings in the chat history, disconnection, and the Revoked ending",
      summary: "Character prompts and response rules",
      rulesIntro: "Every NPC you can talk to has its own way of speaking, its own backstory and its own range of knowledge, and a question past that range gets a vague answer. Players pick up more from each member’s file and from the conversations themselves, which is how they learn about the dead woman and about the site. The NPCs also have a web of relationships of their own: ask about a name or handle they do not know, and they are puzzled too.",
      promptAria: "Open Midnight's character prompt at full size",
      promptAlt: "Midnight's system prompt with tone, conversation, and boundary instructions",
      promptTitle: "Character-level instructions",
      promptBody: "Midnight's prompt defines tone, conversation style, boundaries, and off-topic handling.",
      rulesAria: "Open bilingual response rules at full size",
      rulesAlt: "English and Chinese rules for off-topic detection and challenges to the story",
      rulesTitle: "Input-handling rules",
      rulesBody: "English and Chinese patterns cover member queries, off-topic messages, and attempts to challenge the fiction.",
    },
    playtest: {
      kicker: "04",
      heading: "Playtesting & iteration",
      lead: "The game went through two rounds of expert interviews and two rounds of user testing. Every round gave me something that changed the version after it.",
      rounds: [
        {
          label: "01",
          title: "The first user test",
          intro: "I asked six classmates to play the first version. Most of them got as far as the point where you have to take another user's account, log in with it, and talk to the story NPC inside it.",
          paragraphs: [
            "Five of the six said the task was too hard, and four had not understood that they were the detective - they thought they were the dead woman's sister. One player got the new account with no hint at all, and that player had played a lot of games like this one.",
            "One player also felt the interface was too ordinary and had no art direction of its own. It sits close to the chat apps people actually use, but there was little design on top of that.",
            "Players also said the NPC replies were too flat. At that point an NPC answered only when one of the six keywords I had set was hit; anything else got nothing back, which left players unsure how the game was meant to continue."
          ],
          changesIntro: "After the first round I made these changes:",
          changes: [
            { label: "01", title: "A progress bar and a hint button", body: "Players can see where they are in the game as a whole, and when they get stuck they can ask for a hint themselves and keep going." },
            { label: "02", title: "Real AI NPCs in the chatroom", body: "The NPCs answer what the player actually writes, and what the player says shapes what comes back. The six original keywords stayed: hitting one still returns its fixed reply and the information with it." }
          ]
        },
        {
          label: "02",
          title: "Two expert interviews",
          intro: "I asked a level designer at miHoYo and a professor at Parsons to play the whole thing through, then talked with each of them - about how the game is structured, and about where the AI should stop.",
          blocks: [
            {
              title: "Going through the game logic with a level designer at miHoYo",
              paragraphs: [
                "Once he had played the whole thing, we went back over how the game is put together.",
                "At first it ran in one direction: players only chose who they thought the killer was at the very end, and that one choice decided the ending. It made for thin play. He suggested reworking the logic, and the version that exists now came out of that."
              ]
            },
            {
              title: "Going through the AI's boundaries with a professor at Parsons",
              paragraphs: [
                "I also went into the limits of the AI's behaviour at length with a professor at Parsons.",
                "Watching him use the AI NPCs, I noticed he kept raising subjects with nothing to do with the story. There was no bad ending for being thrown out yet, so he could keep going indefinitely. The NPCs did not take the bait, but the story did not move either.",
                "So I sharpened each NPC's character and the limits of what it will answer."
              ]
            }
          ]
        },
        {
          label: "03",
          title: "The second user test",
          intro: "I recruited eight players online, with a range of experience in games like this, and ran the test remotely. A session ended once the player reached their first ending, and an interview followed. Reaching that first ending took about 20 minutes.",
          blocks: [
            {
              title: "Most players would rather work it out than take a hint",
              paragraphs: [
                "Most of them never pressed the hint button, so I asked why in the interviews.",
                "Six of the eight had seen the button. Five of those said that in a game like this they would rather find things for themselves, so they did not want the hint.",
                "The sixth used it several times. He said that when he could not think of a next move, the hint kept him going instead of leaving him stuck.",
                "The other two never noticed the button, so it went unused the whole way through."
              ]
            },
            {
              title: "Some of them kept going after the session was over",
              paragraphs: [
                "I left the site open to them for two more days. In that time five came back to tell me they had reached other endings, and two of those had found every ending, the hidden one included.",
                "One more worked out how to open the hidden ending, but hit a bug and never got to finish it."
              ]
            }
          ]
        }
      ],
      summary: "The first playable chatroom",
      originAria: "Open the early chatroom prototype at full size",
      originAlt: "Early light chat interface with a general channel and member list",
      originBody: "A plain chatroom and member list provided an early way to explore the interaction. Testing exposed the need to establish a role and a reason to investigate before asking players to start a conversation."
    },
    build: {
      kicker: "05",
      heading: "From Figma to VS Code",
      lead: [
        "I built the high-fidelity screens in Figma first, then handed the images and a written description to Codex and Claude Code to put the site together. What came out differs from the designs in places, but it holds up well overall. That is how I worked through the whole build.",
        "For the look I went with retro electronics. Partly to carry the dread - it is a detective game. And partly because the story is set around 2012, when interfaces did not look the way they do now, so I wanted the visuals to sit in that period too."
      ],
      compareAlt: "Figma designs on the left and the implemented member registry and mission board on the right",
      compareCaption: "Left: Figma designs. Right: implemented screens with locked records, member status, and diary access.",
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
      mapDemoLabel: "故事地图，显示分支结局里已解锁和锁着的路线",
      summary: "非线性结构背后的早期探索",
      disclosureLead: "前期两个小练习让我确认了两件事：同一组碎片，不同的人会拼出不同故事；查线索的顺序也因人而异。这些练习只影响了概念方向，没有验证最终游戏是否好用。",
      study1Aria: "查看痕迹推理研究的大图",
      study1Alt: "带标注的废弃物品，用来探索人如何从痕迹里推出故事",
      study1Title: "01 / 痕迹推理",
      study1Body: "参与者从一堆废弃物品推测主人是谁。他们讲得都很笃定，但结论各不相同，说明同一条线索容得下不止一种读法。",
      study2Alt: "一间画出来的房间，里面有十件可查看的物品和它们的线索记录",
      study2Title: "02 / 视觉侦探练习",
      study2Body: "房间里有十件可以查看的物品，各配一小段记录。参与者自己决定查看顺序，这一点影响了后来模块化的档案结构。"
    },
    ai: {
      kicker: "03 / AI 交互设计",
      heading: "给予玩家自由度的同时，如何把控 NPC 推进故事进程",
      featureLabel: "我为 AI NPC 设定了语言边界",
      featureTitle: "警告会变成后果",
      featureBody: "当玩家不断向 NPC 提问与游戏无关的问题时，NPC 会进行提示并拒绝回答；多次触发此回复将被「报告」给网站的管理员，从而被踢出群聊，游戏进入 bad ending。",
      intentLabel: "意图",
      intent: "即使玩家跑题，角色也会根据自己的角色性格进行回复，但同时会给予提示和警告。",
      tradeoffLabel: "取舍",
      tradeoff: "有些边界模糊的问题可能会被误判，玩家的好奇心也可能遭到打击，从而让他们不敢去挖掘更隐秘的结局。",
      featureDemoLabel: "聊天记录里 Lily 的警告、断连，以及 Revoked 结局",
      summary: "角色 prompt 和回应规则",
      rulesIntro: "每个可以互动的 NPC 都有自己的一套说话习惯，个人设定和知识范围。超越了他们理解范畴以外的问题将含糊其辞。玩家可以在每个人的档案以及和互动 NPC 的对话中获得更多的信息，从而了解死者和这个网站的情况。NPC 之间存在自己的关系网，如果询问到陌生的名字或代号，他们也会感到疑惑。",
      promptAria: "查看 Midnight 角色 prompt 的大图",
      promptAlt: "Midnight 的系统 prompt，含语气、对话方式和边界指令",
      promptTitle: "角色层面的指令",
      promptBody: "Midnight 的 prompt 规定了语气、说话方式、边界，以及跑题时怎么处理。",
      rulesAria: "查看中英双语回应规则的大图",
      rulesAlt: "中英文的规则，用于识别跑题和对故事本身的质疑",
      rulesTitle: "输入处理规则",
      rulesBody: "中英两套模式，覆盖询问成员、跑题消息，以及想拆穿这个虚构设定的尝试。",
    },
    playtest: {
      kicker: "04",
      heading: "测试与迭代",
      lead: "本游戏前后共进行了两次专家访谈和两次用户测试。每一轮用户都为游戏的迭代提供了很重要的反馈。",
      rounds: [
        {
          label: "01",
          title: "第一次用户测试",
          intro: "我邀请了 6 名同学测试初版游戏。这一轮，大多数玩家只进行到需要盗取新用户账号并登录，再与该账号中的故事 NPC 互动的阶段。",
          paragraphs: [
            "6 位玩家中，有 5 位反馈任务太难，4 位没有理解自己是警探的身份，而是认为自己是死者的姐姐。只有 1 位玩家在没有任何提示的情况下获得了新用户的账号，这位玩家有很多同类型游戏的经验。",
            "另外，有 1 位玩家认为当前界面过于普通，没有自己的美术风格。虽然很贴近实际生活中的聊天软件，但缺少一些美术上的设计。",
            "玩家还反馈，NPC 的回复太过单一。当时只有触发我设置的 6 个关键词，NPC 才会回复。如果没有聊到关键词，就得不到回应，这让玩家很疑惑，不知道游戏应该如何继续。"
          ],
          changesIntro: "根据这些反馈，我在第一轮测试后进行了以下调整：",
          changes: [
            { label: "01", title: "增设游戏进度条和提示按钮", body: "让玩家可以看到整体游戏进程，并在卡住时自行点击提示，获取一些信息，继续推进游戏。" },
            { label: "02", title: "在聊天室中正式引入 AI NPC", body: "NPC 会根据玩家的输入进行回复，玩家的回答和回应都会影响 NPC 的回答。同时，保留原先设置的 6 个关键词，触发后仍会给出固定的回复和信息。" }
          ]
        },
        {
          label: "02",
          title: "两位专家访谈",
          intro: "我分别请了一位米哈游的关卡设计师和一位 Parsons 的教授完整体验了一遍，再和他们聊游戏逻辑和 AI 的行为边界。",
          blocks: [
            {
              title: "与米哈游关卡设计师讨论游戏逻辑",
              paragraphs: [
                "整体游戏体验后，我们重新确认了游戏的逻辑。",
                "一开始，游戏是单向推进的，玩家只在最后选择自己心中的凶手，从而达成不同结局。但这个玩法比较单一。在讨论后，他建议重新调整游戏逻辑，于是我做了修改，形成了现在的版本。"
              ]
            },
            {
              title: "与 Parsons 教授讨论 AI 的行为边界",
              paragraphs: [
                "我也和 Parsons 的一位教授深入讨论了 AI 的行为边界。",
                "在观察教授使用 AI NPC 时，我发现他经常会聊一些与故事完全不相干的话题。当时还没有设置直接被封禁的坏结局，导致他可以一直聊下去。虽然 NPC 没有接他的话茬，但故事也没有继续推进。",
                "因此，我再次强化了不同 NPC 的性格和回应边界。"
              ]
            }
          ]
        },
        {
          label: "03",
          title: "第二次用户测试",
          intro: "我从网络上招募了 8 位对这类游戏有不同经验的玩家，进行线上测试。测试在玩家达成第一个结局后结束，再进行访谈。整体来说，玩家达到第一个结局大约需要 20 分钟。",
          blocks: [
            {
              title: "大部分玩家选择自己探索，而不使用提示",
              paragraphs: [
                "我发现大部分玩家并不会点击提示按钮，于是在访谈中询问了原因。",
                "8 位玩家中，有 6 位看到了提示按钮。其中 5 位表示，玩这类游戏时，更希望通过自己的发现找到更多信息，所以不愿意使用提示。",
                "另外 1 位玩家多次使用了提示按钮。他表示，在想不出下一步时，提示能帮助他继续推进，而不是一直卡住。",
                "还有 2 位玩家没有注意到提示按钮，因此全程没有使用。"
              ]
            },
            {
              title: "测试结束后，部分玩家继续探索其他结局",
              paragraphs: [
                "我将网站继续开放给他们两天。在这两天中，有 5 位玩家回来告诉我，他们打出了其他结局。其中 2 位发现了所有结局，包括隐藏结局。",
                "还有 1 位玩家发现了隐藏结局的开启方式，但由于系统 Bug，没有完成最后的结局。"
              ]
            }
          ]
        }
      ],
      summary: "第一个能玩的聊天室",
      originAria: "查看早期聊天室原型的大图",
      originAlt: "早期的浅色聊天界面，有一个公共频道和成员列表",
      originBody: "一个朴素的聊天室加成员列表，是早期试交互的办法。测试暴露出的问题是：得先给玩家一个身份和一个查下去的理由，再让他开口聊。"
    },
    build: {
      kicker: "05",
      heading: "从 Figma 迭代至 VS Code",
      lead: [
        "我先在 Figma 中制作高保真界面，再用图片和文字描述，让 Codex 和 Claude Code 帮我搭建网站。实现后的界面和设计稿还有一些细节上的区别，但整体还原度还不错。开发过程中，我基本都用这种方式迭代整个网页。",
        "整体视觉上，我选择了复古电子风。一方面，我想烘托比较恐怖的气氛，毕竟这是一个侦探类型的游戏。另一方面，故事的真实背景发生在 2012 年左右，当时的界面设计不像现在这么现代，所以我也希望在视觉上还原那个时期的感觉。"
      ],
      compareAlt: "左边是 Figma 稿，右边是实现出来的成员名册和任务板",
      compareCaption: "左：Figma 稿。右：实现出来的界面，含锁着的档案、成员状态和日记权限。",
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
    {children && [].concat(children).map((line, index) => <p className={styles.sectionLead} key={index}>{line}</p>)}
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
            <Demo name="routes" label={t.flow.mapDemoLabel} />
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
                    <img loading="lazy" src={img("e170301fd8cc341588840a663f2c940611f1d986.png")} alt={t.flow.study2Alt} />
                    <figcaption><strong>{t.flow.study2Title}</strong>{t.flow.study2Body}</figcaption>
                  </figure>
                </div>
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="ai-behavior">
            <SectionHeading wide label={t.ai.kicker} title={t.ai.heading} />
            <article className={`${styles.feature} ${styles.featureFlush}`}>
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
            <details className={styles.disclosure}>
              <summary>{t.ai.summary}</summary>
              <div className={styles.disclosureBody}>
                <p className={styles.sectionLead}>{t.ai.rulesIntro}</p>
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
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="playtesting">
            <SectionHeading label={t.playtest.kicker} title={t.playtest.heading}>
              {t.playtest.lead}
            </SectionHeading>
            {t.playtest.rounds.map((round) => (
              <Fragment key={round.title}>
                <div className={styles.roundBand}>
                  <div className={styles.roundBandInner}>
                    <h3>{round.title}</h3>
                    {round.intro && <p>{round.intro}</p>}
                  </div>
                </div>
                <div className={styles.col}>
                  <section className={styles.hangBlock}>
                    {(round.paragraphs || []).map((text) => <p key={text}>{text}</p>)}
                    {(round.blocks || []).map((block) => (
                      <div className={styles.hangChange} key={block.title}>
                        <h4>{block.title}</h4>
                        {block.paragraphs.map((text) => <p key={text}>{text}</p>)}
                      </div>
                    ))}
                  </section>
                  {round.changes && <section className={styles.hangBlock}>
                    <p className={styles.hangIntro}>{round.changesIntro}</p>
                    {round.changes.map((change) => (
                      <div className={styles.hangChange} key={change.title}>
                        <h4><span className={styles.hangNum}>{change.label}</span>{change.title}</h4>
                        <p>{change.body}</p>
                      </div>
                    ))}
                  </section>}
                </div>
              </Fragment>
            ))}
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
