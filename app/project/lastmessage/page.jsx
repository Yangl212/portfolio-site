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
      lead: "An immersive ARG you play in the browser. It breaks away from the usual click-an-option way of talking to NPCs: players can say whatever they want to them, and every conversation shapes which ending they reach.",
      play: "Play the game",
      watch: "Watch the playtest footage",
      coverAlt: "Last Message detective game title screen on a laptop",
      roleLabel: "My role",
      role: "Product Designer",
      scopeLabel: "My scope",
      scope: "UX / UI, AI behavior & web development",
      contextLabel: "Delivered",
      contextValue: "The investigation structure, interface, character rules and code",
      timelineLabel: "Timeline",
      timeline: "4 months"
    },
    experience: {
      kicker: "01 / Product highlights",
      heading: "A new kind of AI game experience",
      lead: "Players investigate a death as a detective. I wanted the game to feel as immersive as possible, so there's no single direction to explore in. The story is non-linear.",
      choiceLabel: "Design choice",
      tradeoffLabel: "Tradeoff",
      chat: {
        label: "Conversation",
        title: "A lot of freedom for players",
        body: "Instead of choosing from dialogue options like most games, players can type anything they want to the NPCs. Each NPC gives its own side of things, which helps players work out the story.",
        choice: "A simple chat interface, close to the ones people use every day, so there's little to learn and players can focus on talking to the NPCs.",
        tradeoff: "Open input gives players freedom, but it also means some will ask things that have nothing to do with the game, just out of curiosity. So when I designed the endings, I made it so that asking too many unrelated questions triggers a bad ending straight away.",
        demoLabel: "Private conversation with Mike Anderson"
      },
      clue: {
        label: "Real and fake, intertwined",
        title: "Built from fictional pages and real content",
        body: "Some of what players find in the game can be followed up on the real internet, on sites like Wikipedia and X, where there are more clues.",
        choice: "Blurring the line between real and fictional, so players feel more immersed in it.",
        tradeoff: "Mixing real and fake does make it more immersive, but jumping between several sites confuses players, and it's hard to tell which parts belong to the game. The archived pages also still have some problems, so this part isn't smooth yet and still needs work.",
        demoLabel: "The fictional character's profile on X, used as an investigation clue"
      }
    },
    flow: {
      kicker: "02 / Game flow",
      heading: "The game is non-linear, with eight different endings",
      loopLabel: "Player flow",
      steps: [
        { title: "Enter the game", body: "As a detective, the player gets a call from a woman reporting a case." },
        { title: "Enter the mysterious site", body: "Slip into the group and talk to the NPCs to get more access." },
        { title: "Get a new account", body: "Get a new account in the group, then chat with its members to dig up more hidden information." },
        { title: "Get admin access", body: "Use what you've found to unlock more files and open up private chats." },
        { title: "Different endings", body: "Talking to different NPCs leads to different endings. Going off the beaten path may help you find secrets fewer people know about." }
      ],
      mapDemoLabel: "Story map showing revealed and locked routes through the branching endings",
      summary: "Early explorations behind the non-linear structure",
      disclosureLead: "Two small early exercises confirmed two things for me: people piece together different stories from the same fragments, and everyone looks at the clues in a different order. These exercises only shaped the concept. They didn't test whether the final game is easy to use.",
      study1Aria: "Open trace inference study image at full size",
      study1Alt: "Annotated discarded objects used to explore how people infer a story from traces",
      study1Title: "01 / Trace inference",
      study1Body: "Participants guessed who owned a pile of thrown-away objects. They were all confident, but they came to different conclusions, which showed that one clue can be read more than one way.",
      study2Alt: "Illustrated room with ten inspectable objects and their clue records",
      study2Title: "02 / Visual detective exercise",
      study2Body: "A room held ten objects to inspect, each with a short note. Participants chose the order themselves, and that fed into the modular file structure I used later."
    },
    ai: {
      kicker: "03 / AI interaction design",
      heading: "Giving players freedom while the NPCs keep the story moving",
      featureLabel: "Language boundaries I set for the AI NPCs",
      featureTitle: "Warnings turn into consequences",
      featureBody: "If a player keeps asking an NPC questions that have nothing to do with the game, the NPC warns them and won't answer. Trigger that reply enough times and the player gets \"reported\" to the site's admin and kicked out of the group chat, and the game goes to a bad ending.",
      intentLabel: "Intent",
      intent: "Even when the player goes off topic, the NPC stays in character, while still giving hints and warnings.",
      tradeoffLabel: "Tradeoff",
      tradeoff: "Some borderline questions can get misjudged, and it can dampen players' curiosity, which might make them hesitant to dig for the more hidden endings.",
      featureDemoLabel: "Lily's warnings in the chat history, disconnection, and the Revoked ending",
      summary: "Character prompts and response rules",
      rulesIntro: "Every NPC you can talk to has their own way of speaking, backstory and range of knowledge. Ask them about something outside of that and they'll be vague. Players get more information from each person's file and from talking to the NPCs, and that's how they learn about the dead woman and the website. The NPCs also have their own web of relationships, so if you mention a name or handle they don't know, they'll be confused too.",
      promptAria: "Open Midnight's character prompt at full size",
      promptAlt: "Midnight's system prompt with tone, conversation, and boundary instructions",
      promptTitle: "Character-level instructions",
      promptBody: "Midnight's prompt sets the tone, the way of speaking, the boundaries, and what to do when the conversation goes off topic.",
      rulesAria: "Open bilingual response rules at full size",
      rulesAlt: "English and Chinese rules for off-topic detection and challenges to the story",
      rulesTitle: "Input-handling rules",
      rulesBody: "Two sets of patterns, in Chinese and English, covering questions about members, off-topic messages and attempts to break the fiction.",
    },
    playtest: {
      kicker: "04",
      heading: "Testing and iteration",
      lead: "Over the project I ran two expert interviews and two rounds of user testing. Every round gave me important feedback for the next iteration.",
      rounds: [
        {
          label: "01",
          title: "First user test",
          intro: "I invited six classmates to test the first version. In this round, most players only got as far as the point where they had to steal a new user's account, log in, and talk to the story NPC in it.",
          paragraphs: [
            "Five of the six said the task was too hard, and four didn't realize they were playing the detective. They thought they were the dead woman's sister. Only one player got the new account without any hints, and they'd played a lot of games like this.",
            "One player also felt the interface was too plain and had no visual style of its own. It looked close to the chat apps people use every day, but it was short on visual design.",
            "Players also said the NPC replies were too limited. At the time, NPCs only responded when you hit one of the six keywords I'd set. If you didn't mention a keyword, you got nothing back, which left players confused about how to move the game forward."
          ],
          changesIntro: "Based on this feedback, I made these changes after the first round:",
          changes: [
            { label: "01", title: "Added a progress bar and a hint button", body: "This lets players see their overall progress, and when they're stuck, they can click for a hint to get a bit of information and keep going." },
            { label: "02", title: "Brought AI NPCs into the chatroom", body: "The NPCs now reply based on what the player types, and whatever the player says affects how they answer. I kept the original six keywords too, so hitting one still gives a fixed reply and its information." }
          ]
        },
        {
          label: "02",
          title: "Two expert interviews",
          intro: "I had a level designer from miHoYo and a professor from Parsons each play through the whole game, then talked with them about the game's logic and where the AI's boundaries should be.",
          blocks: [
            {
              title: "Talking game logic with a miHoYo level designer",
              paragraphs: [
                "After he'd played the whole thing, we went back over the game's logic.",
                "At first the game only moved one way: players just picked who they thought the killer was at the end, and that decided the ending. That made it fairly one-dimensional to play. After we talked it through, he suggested reworking the logic, so I made the changes that became the current version."
              ]
            },
            {
              title: "Talking about the AI's boundaries with a Parsons professor",
              paragraphs: [
                "I also talked at length with a professor at Parsons about the AI's behavioral boundaries.",
                "Watching him use the AI NPCs, I noticed he'd often bring up topics that had nothing to do with the story. There wasn't a bad ending for getting banned yet, so he could just keep chatting. The NPCs didn't play along, but the story didn't move forward either.",
                "So I went back and strengthened each NPC's personality and the limits on how they respond."
              ]
            }
          ]
        },
        {
          label: "03",
          title: "Second user test",
          intro: "I recruited eight players online with different amounts of experience with games like this, and ran the test remotely. Each session ended when the player reached their first ending, followed by an interview. Overall, players took about 20 minutes to reach their first ending.",
          blocks: [
            {
              title: "Most players chose to explore on their own instead of using hints",
              paragraphs: [
                "I noticed most players never clicked the hint button, so I asked them why in the interviews.",
                "Six of the eight saw the hint button. Five of them said that with games like this, they'd rather find things out themselves, so they didn't want to use hints.",
                "The other one used the hint button several times. He said that when he couldn't figure out what to do next, the hints helped him keep going instead of staying stuck.",
                "The remaining two didn't notice the hint button, so they never used it."
              ]
            },
            {
              title: "Some players kept exploring other endings after the test",
              paragraphs: [
                "I left the site open to them for another two days. During that time, five players came back to tell me they'd reached other endings, and two of them found every ending, including the hidden one.",
                "One more player figured out how to unlock the hidden ending, but couldn't finish it because of a bug."
              ]
            }
          ]
        }
      ],
      summary: "The first playable chatroom",
      originAria: "Open the early chatroom prototype at full size",
      originAlt: "Early light chat interface with a general channel and member list",
      originBody: "A basic chatroom with a member list was an early way to try out the interaction. Testing showed that players needed an identity and a reason to investigate before they'd start talking."
    },
    build: {
      kicker: "05",
      heading: "From Figma to VS Code",
      lead: [
        "I designed the high-fidelity screens in Figma first, then used the images and written descriptions to have Codex and Claude Code help me build the site. The built version differs from the designs in a few details, but overall it's pretty faithful. I iterated on the whole site this way through most of development.",
        "For the overall look, I went with a retro electronic style. Partly I wanted to build a creepier atmosphere, since it's a detective game. And the story is actually set around 2012, when interface design wasn't as modern as it is now, so I wanted the visuals to bring back the feel of that time."
      ],
      compareAlt: "The Figma designs and the screens that were built, side by side",
      compareCaption: "Each design next to what was built from it: first the member file, then the mission board.",
      shots: [
        { src: "figma-file", alt: "The member file screen in Figma" },
        { src: "built-file", alt: "The member file screen as built, with locked records, member status and diary access" },
        { src: "figma-board", alt: "The mission board in Figma" },
        { src: "built-board", alt: "The mission board as built, with the call record and its caller, location and time" }
      ],
    },
    reflection: {
      kicker: "06",
      heading: "Reflection and next steps",
      lead: [
        "After the user research and testing, I think the difficulty is about right for now. But because of time constraints, I didn't get to develop each NPC's backstory as thoroughly as I'd like.",
        "If I have more time in the future, I'd like to flesh out the whole story and push the experience further. I'll also keep improving the UI/UX."
      ]
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
      compareAlt: "Figma 稿和实现出来的界面并排",
      compareCaption: "每张设计稿挨着它实现出来的样子：先是成员档案页，再是任务板。",
      shots: [
        { src: "figma-file", alt: "成员档案页的 Figma 稿" },
        { src: "built-file", alt: "实现出来的成员档案页，含锁着的档案、成员状态和日记权限" },
        { src: "figma-board", alt: "任务板的 Figma 稿" },
        { src: "built-board", alt: "实现出来的任务板，含来电记录与来电号码、地点和时间" }
      ],
    },
    reflection: {
      kicker: "06",
      heading: "反思与后续优化",
      lead: [
        "在进行了用户调研和测试后，我认为目前游戏的难度比较适中。但因为时间限制，对每个 NPC 背后故事的打磨还不够细致。",
        "未来如果有时间，我希望进一步完善整个故事，让游戏体验更上一层楼。同时，我也会继续优化界面的 UI/UX。"
      ]
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

export default function LastMessagePage({ track = "product", locale = "en" }) {
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
            <figure className={styles.strip}>
              <div className={styles.stripTrack}>
                {t.build.shots.map((shot) => (
                  <img key={shot.src} className={styles.stripShot} loading="lazy"
                    src={`/lastmessage/build/${shot.src}.webp`} alt={shot.alt}
                    width={3024} height={1964} />
                ))}
              </div>
              <figcaption>{t.build.compareCaption}</figcaption>
            </figure>
          </section>

          <section className={[styles.caseSection, styles.reflection].join(" ")}>
            <SectionHeading label={t.reflection.kicker} title={t.reflection.heading}>
              {t.reflection.lead}
            </SectionHeading>
            <div className={styles.actions}>
              <a className={styles.action} href={liveUrl} target="_blank" rel="noreferrer">{t.hero.play} <span aria-hidden="true">↗</span></a>
              <a className={styles.textLink} href={playtestUrl} target="_blank" rel="noreferrer">{t.hero.watch}</a>
            </div>
          </section>
          <ProjectNav slug="lastmessage" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
