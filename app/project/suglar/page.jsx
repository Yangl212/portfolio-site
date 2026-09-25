import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"

import { ColorBoard } from "./ColorBoard"
import styles from "./page.module.css"

export const metadata = {
  title: "Suglar",
  description:
    "Translating the color, texture, and emotion of candy into a board game where sweetness becomes strategy."
}

const img = (hash, ext = "png") => `/framer-assets/images/${hash}.${ext}`

/* Sampled from the finished card and box artwork, so the chips here are the
   colors the game actually prints.

   The split is by reach, not by taste: these five turn up on the box, the
   board, and every card, and between them they cover roughly four fifths of
   the printed surface. Everything in the tier below is local to one component
   or lives inside an illustration.

   Names and roles describe the colours rather than being printed on anything,
   so each carries both languages. The ground is flagged rather than found by
   its role string, which now changes with the locale. */
const corePalette = [
  { hex: "#FFEEFE", ground: true, name: { en: "Sugar white", zh: "糖霜白" }, role: { en: "Ground", zh: "底色" } },
  { hex: "#E15582", name: { en: "Suglar pink", zh: "Suglar 粉" }, role: { en: "Wordmark", zh: "字标" } },
  { hex: "#6A9CE3", name: { en: "Cornflower", zh: "矢车菊蓝" }, role: { en: "Board blue", zh: "板面蓝" } },
  { hex: "#C4DDD1", name: { en: "Mint", zh: "薄荷绿" }, role: { en: "Board green", zh: "板面绿" } },
  { hex: "#2F3237", name: { en: "Charcoal", zh: "炭黑" }, role: { en: "Type & rules", zh: "文字与规则" } }
]

const supportPalette = [
  { hex: "#EF8CD1", name: { en: "Bubblegum", zh: "泡泡糖粉" } },
  { hex: "#FFD952", name: { en: "Lemon", zh: "柠檬黄" } },
  { hex: "#C6C8F3", name: { en: "Periwinkle", zh: "长春花蓝" } },
  { hex: "#FD2894", name: { en: "Hot pink", zh: "亮粉" } },
  { hex: "#F1B2BA", name: { en: "Blush", zh: "腮红粉" } },
  { hex: "#E1A210", name: { en: "Amber", zh: "琥珀" } },
  { hex: "#F18C0D", name: { en: "Orange", zh: "橙" } },
  { hex: "#D47E4B", name: { en: "Caramel", zh: "焦糖" } },
  { hex: "#EEDFB8", name: { en: "Cream", zh: "奶油" } },
  { hex: "#6FA195", name: { en: "Sage", zh: "鼠尾草绿" } },
  { hex: "#73B6BF", name: { en: "Teal", zh: "青" } },
  { hex: "#2177B0", name: { en: "Sea blue", zh: "海蓝" } },
  { hex: "#1C0B64", name: { en: "Ink", zh: "墨蓝" } }
]

/* Flatten a palette to the plain strings ColorBoard expects. */
const swatches = (palette, locale) =>
  palette.map((chip) => ({
    ...chip,
    name: chip.name[locale] || chip.name.en,
    role: chip.role ? chip.role[locale] || chip.role.en : undefined
  }))

/*
 * Every line of prose on the page, both languages. The English is the copy
 * that was already here, lifted out of the JSX unchanged. Playtester quotes
 * are translated with their scores and attribution kept, so a Chinese reader
 * gets the same feedback from the same tester. Typeface names, the two
 * reference games, and the four card names printed on the cards stay as they
 * are printed.
 */
const copy = {
  en: {
    hero: {
      label: "Student Work",
      discipline: "Game & Visual Design · 2023",
      imageAlt:
        "The Suglar box open, showing the patterned lid, the printed sleeve, the card trays, and one of the black candy boxes",
      summary: "A candy board game you play with your hands and your nose. You lose by eating too much.",
      problem: "Board games are designed for the eyes, so what one is made of rarely changes how it plays.",
      contribution:
        "Solo: three rule sets, two playtest rounds, the card and brand system, and the printed prototype.",
      outcome:
        "Hidden candy, identified by smell, touch, or taste. Playtesters scored it 5/5 for innovation, immersion, and replayability.",
      role: "Game & Visual Designer (solo)",
      scope: "Game design · Playtesting · Identity",
      platform: "Physical board game",
      timeline: "8 weeks"
    },
    product: {
      kicker: "Final Product",
      title: "What actually ships in the box.",
      imageAlt:
        "The folded instruction sheet opened out beside the four yellow ability cards and the four pink sensory cards",
      caption: "Instruction sheet, four ability cards, four sensory cards",
      facts: [
        { label: "Players", value: "2–4 + 1 judge" },
        { label: "Length", value: "~20 minutes" },
        { label: "Turn", value: "Ability → sense → draw" },
        { label: "You lose at", value: "7 filled slots" }
      ],
      deliverables: [
        "4 sensory cards",
        "4 ability cards",
        "Reward cards",
        "Candy jar boards",
        "Folded instruction sheet",
        "Two-piece box",
        "Opaque candy boxes",
        "Wordmark and pattern system"
      ]
    },
    idea: {
      kicker: "The Idea",
      title: "Make the material the mechanic.",
      items: [
        {
          label: "What is Suglar?",
          body: "A 2–4 player board game made out of real candy. Every piece on the table is edible and hidden inside an identical opaque box, so a turn is spent working out what you are about to eat rather than looking at it."
        },
        {
          label: "Who is it for?",
          body: "People who like party games and sensory play more than rule-heavy strategy — and anyone who has ever picked a chocolate out of an assorted box by feel and hoped for the best."
        },
        {
          label: "Why build it?",
          body: "The research behind the brief kept turning up games with a rich concept and thin play. I wanted the concept to be the mechanic: if the game is about candy, then candy has to be the thing you physically handle."
        }
      ],
      componentsAlt: (name) => `${name} components`,
      /* Two existing games that already prove the argument, kept short. Both
         use a physical component as the rule rather than as decoration. */
      references: [
        {
          name: "Meltdown",
          keywords: "Cooperative · Consumable component",
          body: "A climate-crisis board game played around real ice cubes. The ice melts through the session, shifting the board and running down the clock at the same time.",
          takeaway: "A component that is used up can carry a game’s meaning better than a rule can state it."
        },
        {
          name: "Nyctophobia",
          keywords: "Asymmetric · Tactile · Blackout",
          body: "Three to six players, one of whom can see. The rest wear blackout glasses and navigate an 8×8 maze of obstacles by touch, memory, and talking to each other.",
          takeaway: "Take a sense away and the remaining ones become the game. Suglar takes sight off the pieces rather than off the players."
        }
      ]
    },
    decisions: {
      kicker: "Key Design Decisions",
      title: "Three rules carry the whole game.",
      lead: "Each one came out of a playtest that failed in a specific way, and each one is printed on a card rather than explained in a manual.",
      coreLabel: "01 / Core mechanic",
      coreTitle: "You cannot see the candy you are about to eat.",
      coreP1: "Every candy sits inside an identical opaque box. On your turn you may spend one sensory card — Visual, Touch, Taste, or Smell — to inspect a candy privately, then decide whether to keep it. What you learn is never revealed to the other players.",
      coreP2: "This is the rule the rest of the game hangs off. It turns a match-three loop into a bluffing loop, and it makes the four senses worth different amounts depending on what is still on the board: Visual is strongest early, Touch and Taste hold their value, Smell is the gamble.",
      coreNote: "Spend no sensory card and you must take the candy blind. Skipping the inspection is not a free action, it is the risk.",
      coreAlt:
        "The four Suglar sensory cards: Visual, Smell, Touch, and Taste, each drawn as a geometric symbol on pink",
      coreCaption: "The four sensory cards",
      winLabel: "02 / Win condition",
      winTitle: "Seven slots, and eating too much is how you lose.",
      winP1: "Each player holds a candy jar with seven slots. Three identical candies clear out of the jar and score a point plus a reward card. Fill all seven with nothing left to clear and you are out for overindulgence.",
      winP2: "The cap is what makes a blind draw dangerous. On slot two a bad guess costs nothing; on slot five it can end your game. So the sensory cards get more valuable at exactly the point in the round where they are hardest to spare.",
      winAlt1:
        "Candy jar diagram with seven slots, and three matching candies clearing while two mismatched sets do not",
      winAlt2: "Three rows of seven candies showing which combinations clear the jar and which fill it",
      winCaption: "Clearing the jar, and the two ways it fills up instead",
      abilityLabel: "03 / Player interaction",
      abilityTitle: "Four ability cards, added because round two had none.",
      abilityP1: "Change swaps a candy in your jar with another player's. Claim draws a random card out of someone's hand. Clone duplicates a candy you already hold. Forfeit discards one. They are played first in a turn, and you may play as many as you like.",
      abilityP2: "Round-two testers said the same thing three different ways: the game was fun but solitary. Three of the four abilities only do anything by reaching into another player's game, which is the entire point of adding them.",
      abilityAlt: "The four Suglar ability cards on yellow: Change, Claim, Clone, and Forfeit",
      abilityCaption: "The four ability cards"
    },
    iteration: {
      kicker: "Iteration",
      title: "Two playtests, two rebuilds.",
      lead: "The first version was strategically fine and thematically pointless. The second fixed the theme and broke the table. The third is the one in the box.",
      rounds: [
        {
          label: "Round 01",
          title: "A chess board made of candy",
          body: "Two players place candies on a grid and try to surround each other. Surround an opponent’s piece and you eat it. The player holding the most candy when the moves run out wins.",
          notes: [
            {
              label: "Worked",
              text: "Testers understood it in under a minute and liked handling real candy as pieces. Several compared the blocking to Go."
            },
            {
              label: "Broke",
              text: "It was Go with chocolate on it. Everything was visible, so the material was decoration — swap in plastic counters and nothing about the game changes."
            }
          ],
          alts: [
            "Grid board layout with candy pieces and the capture pattern diagrammed beside it",
            "The first paper board being cut on a green cutting mat"
          ],
          caption: "Round one board and capture rules"
        },
        {
          label: "Round 02",
          title: "Blind match-three",
          body: "Candies are hidden in the cells of a grid. Players pick blind, and three of a kind can be eaten. Sensory cards let you inspect a candy before committing, and holding more than seven loses the game.",
          notes: [
            {
              label: "Worked",
              text: "The hidden draw and the sensory guess were the only things anyone talked about afterwards. The overindulgence rule got laughs every time it fired."
            },
            {
              label: "Broke",
              text: "Four-player rounds dragged, and everyone was quietly solving their own jar. There was almost no reason to look at another player’s board."
            }
          ],
          alts: [
            "Cardboard grid prototype filled with wrapped candies, sorted candy on a table, and the taped play surface"
          ],
          caption: "Round two prototype, built from cardboard and sorted supermarket candy"
        },
        {
          label: "Final",
          title: "The rules that shipped",
          body: "Round two kept its core and gained the three things it was missing: ability cards, so a turn can reach into someone else’s game; a judge, who runs the sequence and returns eliminated candy to the board; and a printed instruction sheet, so the order of a turn is never argued about mid-game.",
          notes: [
            {
              label: "Added",
              text: "Change, Claim, Clone, and Forfeit — four ability cards, three of which only work by targeting another player."
            },
            {
              label: "Added",
              text: "A fifth seat at the table. The judge keeps pacing tight and is the only person who knows what went back onto the board."
            }
          ],
          alts: [],
          caption: null
        }
      ]
    },
    system: {
      kicker: "Visual System",
      title: "One shape kit, printed on everything.",
      lead: "Cards, box, sleeve, and instruction sheet are all drawn from the same four primitives and the same sampled candy palette, so the components read as one set without matching each other exactly.",
      wordmarkTitle: "The wordmark is the logo, offset.",
      wordmarkP1: "A condensed display cut with a periwinkle duplicate slipped behind it. The offset does the work a gloss or a bevel would normally do — it reads as sugar-coated without a single gradient.",
      wordmarkP2: "Type underneath it stays plain on purpose: Bebas Neue Regular for display, Belanosima Semibold for card labels, Montserrat Semibold and Bold for anything a player has to read while holding candy in the other hand.",
      wordmarkAlt1: "The Suglar wordmark in flat pink",
      wordmarkAlt2: "The Suglar wordmark with its periwinkle and pink offset duplicates",
      wordmarkAlt3: "Type specimen: Montserrat Semibold and Bold, Belanosima Semibold, Bebas Neue Regular",
      paletteTitle: "Five colors hold the set together; thirteen more fill it in.",
      paletteP1: "Sampled off wrappers rather than picked in a color wheel: lemon-drop yellows, wrapper-foil blues, a ground the pale pink of a sugar coating.",
      paletteP2: "Five of them run across the box, the board, and every card. The other thirteen stay local - Bubblegum on sensory cards, Lemon on ability cards, the rest inside the illustration.",
      patternTitle: "Circle, square, arc, half-circle.",
      patternBody: "Every tile in the pattern is one of four primitives nested inside a square, and every overlap is a flat transparency rather than a new color. It scales from a 12mm card corner to the full box wrap without redrawing anything.",
      patternAlt: "Style guide board: four transparency studies above twelve geometric element tiles",
      patternCaption: "Transparency studies and the element library",
      keyVisualAlt: "Suglar key visual: a nine-tile grid of geometric candy elements beside the wordmark",
      keyVisualCaption: "The same kit assembled as the key visual"
    },
    results: {
      kicker: "Results",
      title: "Strong on novelty, weak on pace.",
      lead: "Playtesters scored the finished game on six measures and wrote a comment each. The scores split cleanly: everything about the concept landed, everything about running a four-player table did not.",
      outOf: (score) => `${score} out of 5`,
      /* Scored by playtesters on the five-point card at the end of the final
         session, alongside the written comments below. */
      ratings: [
        { label: "Innovative", score: 5 },
        { label: "Immersion", score: 5 },
        { label: "Replayability", score: 5 },
        { label: "Graphics", score: 4 },
        { label: "Multiplayer", score: 3 },
        { label: "Fluency", score: 3 }
      ],
      quotes: [
        {
          text: "Finding and eating my favorite candies feels great. However, I think adding more skill cards might enhance the interaction between the game and the players.",
          source: "Playtester · replayability 5/5"
        },
        {
          text: "I really love the artistic design of this game; the visuals are fantastic. However, the card texture could be improved — consider using more professional printing next time.",
          source: "Playtester · graphics 4/5"
        },
        {
          text: "Candy brings joy. Incorporating multiple senses is very interesting, and this is my first time playing such a game. However, I find it difficult to distinguish scents.",
          source: "Playtester · innovative 5/5"
        }
      ],
      buildAlt1:
        "Rows of small black boxes assembled by hand, with printed sensory cards and the instruction sheet beside them",
      buildCaption1: "The opaque candy boxes, cut and folded for the session",
      buildAlt2:
        "The playtest table set up with the black boxes, the instruction sheet standing open, and cards dealt out",
      buildCaption2: "The final playtest table, set and ready"
    },
    reflection: {
      kicker: "Reflection",
      title: "The best component is the one I cannot ship.",
      items: [
        {
          label: "Limitation",
          body: "Smell is the weakest of the four senses in play. Wrapped supermarket candy barely smells of anything, so the Smell card is the least-used card in the deck — the mechanic is sound, the component choice undercut it."
        },
        {
          label: "Key tradeoff",
          body: "Real candy is what makes the game memorable and what makes it impossible to ship. Every session eats its own components. I chose the experience over the product, which is the right call for a studio brief and the wrong one for a shelf."
        },
        {
          label: "Next validation",
          body: "Print the cards properly and run four strangers through a full round without me at the table. Fluency scored 3/5 and I still cannot tell whether that was the rules or the judge’s pacing."
        }
      ]
    }
  },
  zh: {
    hero: {
      label: "学生作品",
      discipline: "游戏与视觉设计 · 2023",
      imageAlt: "打开的 Suglar 盒子：带图案的盒盖、印刷卡套、卡牌托盘，还有一个黑色糖果盒",
      summary: "一款用真糖果玩的桌游。你要靠看、摸、闻、尝来判断，吃得太多反而会输。",
      problem: "很多桌游主要靠视觉，换一种材料也不会改变玩法。我想让材料本身成为规则的一部分。",
      contribution: "独立完成：三套规则、两轮试玩、卡牌与品牌系统，以及印出来的实物原型。",
      outcome: "糖被装进不透明盒子，只能靠感官去判断。试玩者在创新性、沉浸感和重玩性三项上都给了 5/5。",
      role: "游戏与视觉设计师（独立完成）",
      scope: "游戏设计 · 试玩测试 · 品牌识别",
      platform: "实体桌游",
      timeline: "8 周"
    },
    product: {
      kicker: "成品",
      title: "最终装进盒子里的组件。",
      imageAlt: "摊开的折页说明书，旁边是四张黄色技能卡和四张粉色感官卡",
      caption: "说明书、四张技能卡、四张感官卡",
      facts: [
        { label: "人数", value: "2–4 人 + 1 名裁判" },
        { label: "时长", value: "约 20 分钟" },
        { label: "回合", value: "技能 → 感官 → 抽取" },
        { label: "输的条件", value: "7 格填满" }
      ],
      deliverables: [
        "4 张感官卡",
        "4 张技能卡",
        "奖励卡",
        "糖果罐板块",
        "折页说明书",
        "两件式盒子",
        "不透明糖果盒",
        "字标与图案系统"
      ]
    },
    idea: {
      kicker: "想法",
      title: "如果游戏讲的是糖，糖就应该真的参与玩法。",
      items: [
        {
          label: "Suglar 是什么？",
          body: "这是一款 2–4 人桌游，棋子就是真糖。每颗糖都能吃，也都装在相同的不透明小盒里。玩家每回合要做的是判断自己将吃到什么，而不是看一眼就知道答案。"
        },
        {
          label: "做给谁？",
          body: "比起规则厚重的策略游戏，更喜欢派对游戏和感官玩法的人；也给每一个在什锦巧克力盒里凭手感挑过一颗、然后听天由命的人。"
        },
        {
          label: "为什么要做？",
          body: "前期研究中，我看到不少游戏有很强的概念，但概念没有真正进入玩法。我想反过来做：既然主题是糖，玩家就必须真的拿起、判断和吃掉它。"
        }
      ],
      componentsAlt: (name) => `${name} 的组件`,
      references: [
        {
          name: "Meltdown",
          keywords: "合作 · 会被消耗的组件",
          body: "一款围着真冰块玩的气候危机桌游。冰在一局里慢慢化掉，既改变棋盘，也同时在倒计时。",
          takeaway: "会在游戏过程中融化的冰，让气候危机不只停在主题里，也直接改变了玩法。"
        },
        {
          name: "Nyctophobia",
          keywords: "不对称 · 触觉 · 全黑",
          body: "三到六个人，其中只有一个看得见。其余的人戴上全黑眼镜，靠触摸、记忆和彼此说话，在 8×8 的障碍迷宫里找路。",
          takeaway: "拿掉一种感官，剩下的感官就变成了游戏本身。Suglar 拿掉的是棋子的可见性，不是玩家的视力。"
        }
      ]
    },
    decisions: {
      kicker: "关键设计决策",
      title: "最终规则来自三次很具体的取舍。",
      lead: "每条规则都对应一次试玩里暴露的问题，而且会直接出现在卡牌上，不只藏在说明书里。",
      coreLabel: "01 / 核心机制",
      coreTitle: "你看不见自己即将吃掉的那颗糖。",
      coreP1: "每颗糖都装在一模一样的不透明盒子里。轮到你时，可以打出一张感官卡（Visual 看、Touch 摸、Taste 尝、Smell 闻）私下检查一颗糖，再决定要不要留下。你查到了什么，别人始终不知道。",
      coreP2: "这条规则把原本的三消循环变成了带猜测和诈唬的游戏。四种感官在不同阶段也有不同价值：开局时 Visual 最有用，Touch 和 Taste 一直比较稳定，Smell 则更像碰运气。",
      coreNote: "不打感官卡，就必须盲拿。跳过检查不是白捡的便宜，那就是风险本身。",
      coreAlt: "Suglar 的四张感官卡：Visual、Smell、Touch、Taste，每张都是粉底上的一个几何符号",
      coreCaption: "四张感官卡",
      winLabel: "02 / 胜负条件",
      winTitle: "七个格子，吃太多就是输。",
      winP1: "每位玩家有一个七格的糖果罐。集齐三颗一样的就能清掉，得一分，外加一张奖励卡。七格填满又没有可清的组合，就因为吃太多出局。",
      winP2: "正是这个上限让盲拿变得危险。填到第二格时猜错没什么代价；填到第五格，一次就可能结束你这局。于是感官卡恰恰在最舍不得用的时候变得最值钱。",
      winAlt1: "糖果罐示意图：七个格子，三颗相同的糖被清掉，两组不匹配的留着",
      winAlt2: "三排各七颗糖，说明哪些组合能清空罐子、哪些只会把它填满",
      winCaption: "怎么清空罐子，以及它被填满的两种方式",
      abilityLabel: "03 / 玩家互动",
      abilityTitle: "第二轮几乎没有玩家互动，所以我加了四张技能卡。",
      abilityP1: "Change 把你罐里的一颗糖和别人的交换，Claim 从别人手里随机抽一张卡，Clone 把你已有的一颗糖再变一颗，Forfeit 丢掉一颗。技能卡在回合最开始打，想打几张都行。",
      abilityP2: "第二轮的测试者都提到了同一个问题：游戏好玩，但大家只顾自己的糖果罐。四个技能中有三个必须对其他玩家使用，我加它们就是为了让人彼此影响。",
      abilityAlt: "黄底上的四张 Suglar 技能卡：Change、Claim、Clone、Forfeit",
      abilityCaption: "四张技能卡"
    },
    iteration: {
      kicker: "迭代",
      title: "两轮试玩后，规则改了两次。",
      lead: "第一版有策略，但糖果只是装饰。第二版让糖真正进入玩法，却几乎没有玩家互动。盒子里的最终版是在这两轮之后定下来的。",
      rounds: [
        {
          label: "第 01 轮",
          title: "一盘糖做的棋",
          body: "两个人在格子上放糖，互相围堵。围住对方的棋子就能把它吃掉。步数走完时，手上糖最多的人赢。",
          notes: [
            {
              label: "成立",
              text: "测试者不到一分钟就看懂了，也喜欢把真糖当棋子摆弄。有几个人说这个围堵很像围棋。"
            },
            {
              label: "垮了",
               text: "它很像换成巧克力棋子的围棋。所有信息都看得见，糖果只是装饰；换成塑料筹码，玩法也完全不变。"
            }
          ],
          alts: [
            "带糖果棋子的格子棋盘版式，旁边画着围吃规则的示意",
            "第一版纸质棋盘正在绿色切割垫上裁切"
          ],
          caption: "第一轮的棋盘和围吃规则"
        },
        {
          label: "第 02 轮",
          title: "盲抽三消",
          body: "糖被藏进格子里。玩家盲抽，凑到三颗一样的就能吃掉。感官卡让人在决定之前先检查一颗糖，手上超过七颗就输。",
          notes: [
            {
              label: "成立",
              text: "事后大家只聊两件事：盲抽，和靠感官去猜。吃太多这条规则每次触发都能把人逗笑。"
            },
            {
              label: "垮了",
              text: "四人局拖得很久，每个人都在安静地解自己那一罐。几乎没有理由去看别人的板子。"
            }
          ],
          alts: [
            "硬纸板做的格子原型，里面放着独立包装的糖，桌上是分好类的糖和用胶带贴出的游戏区"
          ],
          caption: "第二轮原型，用硬纸板和超市买来分好类的糖做的"
        },
        {
          label: "最终版",
          title: "最后定下来的规则",
           body: "我保留了第二轮的核心，再补上三样东西：技能卡，让玩家能影响彼此；一名裁判，负责推进流程并把吃掉的糖补回场上；还有印刷说明书，避免大家在回合中反复争论顺序。",
          notes: [
            {
              label: "新增",
              text: "Change、Claim、Clone、Forfeit 四张技能卡，其中三张只有指向别的玩家时才起作用。"
            },
            {
              label: "新增",
              text: "桌上的第五个位置。裁判把节奏压紧，也是唯一知道什么东西被放回场上的人。"
            }
          ],
          alts: [],
          caption: null
        }
      ]
    },
    system: {
      kicker: "视觉系统",
      title: "同一套形状贯穿所有组件。",
      lead: "卡牌、盒子、卡套和说明书都取自同样四个基本形，和同一套从糖纸上采来的颜色，所以这些组件看起来是一套，又不必彼此长得一模一样。",
      wordmarkTitle: "字标用一层错位做出糖衣感。",
      wordmarkP1: "我在窄体展示字后面叠了一层长春花蓝的副本，并稍微错开。这样不用渐变或倒角，也能看出一层糖衣般的厚度。",
      wordmarkP2: "它下面的字体刻意保持朴素：展示用 Bebas Neue Regular，卡牌标签用 Belanosima Semibold，凡是玩家得一手抓着糖一边读的内容，都用 Montserrat 的 Semibold 和 Bold。",
      wordmarkAlt1: "平涂粉色的 Suglar 字标",
      wordmarkAlt2: "带长春花蓝和粉色错位复制的 Suglar 字标",
      wordmarkAlt3: "字体样张：Montserrat Semibold 与 Bold、Belanosima Semibold、Bebas Neue Regular",
      paletteTitle: "五个主色负责统一，另外十三个只在局部出现。",
      paletteP1: "这些颜色是从糖纸上采的，不是在色轮里挑的：柠檬糖的黄、糖纸锡箔的蓝，还有一层像糖衣一样的淡粉打底。",
      paletteP2: "其中五个贯穿盒子、板面和每一张卡。另外十三个只在局部出现：泡泡糖粉用在感官卡上，柠檬黄用在技能卡上，剩下的都待在插画里。",
      patternTitle: "圆、方、弧、半圆。",
      patternBody: "图案里每一格都是四个基本形之一，嵌在一个正方形里；每处重叠都是平涂的透明叠色，而不是另调一个新颜色。从 12mm 的卡角到整只盒子的满版，都不用重画。",
      patternAlt: "风格指南板：上方四组透明度研究，下方十二个几何元素格",
      patternCaption: "透明度研究和元素库",
      keyVisualAlt: "Suglar 主视觉：九格几何糖果元素，旁边是字标",
      keyVisualCaption: "同一套零件拼成的主视觉"
    },
    results: {
      kicker: "结果",
      title: "概念得分很高，但多人节奏还有问题。",
      lead: "试玩者从六个维度给成品打分，并各自写下一条评论。创新性、沉浸感和重玩性都是 5/5，多人体验和流畅度只有 3/5。",
      outOf: (score) => `5 分中的 ${score} 分`,
      ratings: [
        { label: "创新性", score: 5 },
        { label: "沉浸感", score: 5 },
        { label: "重玩性", score: 5 },
        { label: "美术", score: 4 },
        { label: "多人体验", score: 3 },
        { label: "流畅度", score: 3 }
      ],
      quotes: [
        {
          text: "找到并吃掉自己喜欢的糖，感觉很好。不过我觉得再多加几张技能卡，游戏和玩家之间的互动会更强。",
          source: "试玩者 · 重玩性 5/5"
        },
        {
          text: "我很喜欢这个游戏的美术设计，视觉非常棒。不过卡牌的质感还能再好一点，下次可以考虑用更专业的印刷。",
          source: "试玩者 · 美术 4/5"
        },
        {
          text: "糖本身就让人开心。把多种感官放进来很有意思，这也是我第一次玩这样的游戏。不过我发现气味实在不太分得出来。",
          source: "试玩者 · 创新性 5/5"
        }
      ],
      buildAlt1: "一排排手工折好的黑色小盒，旁边是印好的感官卡和说明书",
      buildCaption1: "为这次试玩裁切、折好的不透明糖果盒",
      buildAlt2: "布置好的试玩桌：黑色小盒、立着摊开的说明书，以及发好的卡牌",
      buildCaption2: "最终那场试玩的桌面，摆好待开局"
    },
    reflection: {
      kicker: "反思",
      title: "真糖让人记住了这个游戏，也让它很难量产。",
      items: [
        {
          label: "局限",
          body: "四种感官里，闻是最弱的一个。超市买的独立包装糖几乎没什么味道，所以 Smell 是整副牌里最少被用的一张。机制本身没问题，是选的组件拖了后腿。"
        },
        {
          label: "关键取舍",
          body: "真糖让体验更特别，也让量产变得困难，因为每玩一局都会消耗一部分组件。对这次课题，我优先选择了体验；如果要做成真正上架的产品，就必须重新考虑。"
        },
        {
          label: "下一步验证",
          body: "把卡牌正经印一次，然后让四个陌生人在我不在桌边的情况下完整打一局。流畅度只有 3/5，我到现在也分不清那是规则的问题，还是裁判控场的问题。"
        }
      ]
    }
  }
}

/* Image sources and note tones sit outside the copy: they are the same in
   both languages, and only the alt text beside them changes. */
const referenceImages = [
  img("b4de6d98f3125ef938512f8b05a22250bdc288bb"),
  img("b3e1d63092bf3773c3bf3f1fae37215c0dd2bb7b")
]

const roundImages = [
  [img("017e4f8f7ba4a879095ad7f3f1ad01e913afbf99"), img("5d748aa3529acc1325c022572acde4c4d78a6e49")],
  [img("58e76814069dd3eb13e137479a88e7f64b7abeff")],
  []
]

const roundTones = [
  ["worked", "broke"],
  ["worked", "broke"],
  ["worked", "worked"]
]

export default function SuglarPage({ track = "uiux", locale = "en" }) {
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
              title="Suglar"
              image={img("3481cabd3205746d092e3c5502bb5c105650078a")}
              imageAlt={t.hero.imageAlt}
              summary={t.hero.summary}
              problem={t.hero.problem}
              contribution={t.hero.contribution}
              outcome={t.hero.outcome}
              role={t.hero.role}
              scope={t.hero.scope}
              platform={t.hero.platform}
              timeline={t.hero.timeline}
            />
          </div>

          <div className={styles.bodyContent}>
            <ProjectQuickNav slug="suglar" track={track} locale={locale} />
            {/* Finished object first, the same way the Taroo page opens. This is
                a physical product, so the box is the fastest answer to "what is
                it" that the page can give. */}
            <section id="product" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.product.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.product.title}</h2>
                </div>
              </div>

              <div className={styles.productGallery}>
                <figure>
                  <img
                    src={img("00bb1b7ff07ca26c4e9c8c0cdf78fa973d6a4fde")}
                    alt={t.product.imageAlt}
                    width="840"
                    height="936"
                  />
                  <figcaption>{t.product.caption}</figcaption>
                </figure>
              </div>

              <dl className={styles.factRow}>
                {t.product.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className={styles.deliverables}>
                {t.product.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* The idea, kept to three answers, then the two references that
                make the argument for a consumable component. */}
            <section id="idea" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.idea.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.idea.title}</h2>
                </div>
              </div>

              <div className={styles.ideaGrid}>
                {t.idea.items.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>

              <div className={styles.referenceGrid}>
                {t.idea.references.map((reference, i) => (
                  <article className={styles.referenceCard} key={reference.name}>
                    <div className={styles.referenceImage}>
                      <img src={referenceImages[i]} alt={t.idea.componentsAlt(reference.name)} loading="lazy" />
                    </div>
                    <h3>{reference.name}</h3>
                    <p className={styles.referenceKeywords}>{reference.keywords}</p>
                    <p>{reference.body}</p>
                    <p className={styles.referenceTakeaway}>{reference.takeaway}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* The section a hiring manager actually reads: three rules, each
                next to the artefact that carries it. */}
            <section id="decisions" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.decisions.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.decisions.title}</h2>
                  <p className={styles.sectionLead}>{t.decisions.lead}</p>
                </div>
              </div>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>{t.decisions.coreLabel}</p>
                  <h3>{t.decisions.coreTitle}</h3>
                  <p>{t.decisions.coreP1}</p>
                  <p>{t.decisions.coreP2}</p>
                  <p className={styles.ruleNote}>{t.decisions.coreNote}</p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("49999264c8c1175e04f35aa117e5ea0e04d29359")}
                    alt={t.decisions.coreAlt}
                    width="1534"
                    height="510"
                  />
                  <figcaption>{t.decisions.coreCaption}</figcaption>
                </figure>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>{t.decisions.winLabel}</p>
                  <h3>{t.decisions.winTitle}</h3>
                  <p>{t.decisions.winP1}</p>
                  <p>{t.decisions.winP2}</p>
                </div>
                <figure className={styles.decisionVisual}>
                  <div className={styles.stack}>
                    <img
                      src={img("1b77f96c64ac5e712ed86cd973172c0a7bc0d28a")}
                      alt={t.decisions.winAlt1}
                      width="921"
                      height="384"
                    />
                    <img
                      src={img("72b9aa8cf4d089587276c3663f7568af69d67ef7")}
                      alt={t.decisions.winAlt2}
                      width="921"
                      height="311"
                    />
                  </div>
                  <figcaption>{t.decisions.winCaption}</figcaption>
                </figure>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>{t.decisions.abilityLabel}</p>
                  <h3>{t.decisions.abilityTitle}</h3>
                  <p>{t.decisions.abilityP1}</p>
                  <p>{t.decisions.abilityP2}</p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("d4d4dce404837d1eb97dda9fc41e0e4b385798b6")}
                    alt={t.decisions.abilityAlt}
                    width="1534"
                    height="509"
                  />
                  <figcaption>{t.decisions.abilityCaption}</figcaption>
                </figure>
              </article>
            </section>

            {/* How the rules above were earned. Two rounds that each failed for
                a nameable reason, then what shipped. */}
            <section id="iteration" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.iteration.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.iteration.title}</h2>
                  <p className={styles.sectionLead}>{t.iteration.lead}</p>
                </div>
              </div>

              <div className={styles.rounds}>
                {t.iteration.rounds.map((round, r) => (
                  <article
                    className={styles.round}
                    key={round.label}
                    data-visual={roundImages[r].length ? undefined : "none"}
                  >
                    <div className={styles.roundCopy}>
                      <p className={styles.roundLabel}>{round.label}</p>
                      <h3>{round.title}</h3>
                      <p>{round.body}</p>
                      <ul className={styles.roundNotes}>
                        {round.notes.map((note, n) => (
                          <li key={note.text} data-tone={roundTones[r][n]}>
                            <b>{note.label}</b>
                            <span>{note.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {roundImages[r].length > 0 && (
                      <figure className={styles.roundVisual}>
                        <div className={styles.stack}>
                          {roundImages[r].map((src, i) => (
                            <img key={src} src={src} alt={round.alts[i]} loading="lazy" />
                          ))}
                        </div>
                        <figcaption>{round.caption}</figcaption>
                      </figure>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* The visual system, compact: wordmark, type, palette, elements. */}
            <section id="visual-system" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.system.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.system.title}</h2>
                  <p className={styles.sectionLead}>{t.system.lead}</p>
                </div>
              </div>

              <div className={styles.systemBlock}>
                <div className={styles.systemCopy}>
                  <h3>{t.system.wordmarkTitle}</h3>
                  <p>{t.system.wordmarkP1}</p>
                  <p>{t.system.wordmarkP2}</p>
                </div>
                <div className={styles.wordmarkRow}>
                  <div>
                    <img
                      src={img("e3cca4a6e38f5e0d14fddf93839f8a9886be5970")}
                      alt={t.system.wordmarkAlt1}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <img
                      src={img("03206a6eec0ab00994f9861a005553083838358d")}
                      alt={t.system.wordmarkAlt2}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <img
                      src={img("b88ed990c08c77db5d2bb0c85f00300843a7fea7")}
                      alt={t.system.wordmarkAlt3}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.systemBlock} data-wide="">
                <div className={styles.systemCopy}>
                  <h3>{t.system.paletteTitle}</h3>
                  <p>{t.system.paletteP1}</p>
                  <p>{t.system.paletteP2}</p>
                </div>
                <ColorBoard
                  core={swatches(corePalette, locale)}
                  support={swatches(supportPalette, locale)}
                  locale={locale}
                />
              </div>

              <div className={styles.systemBlock} data-wide="">
                <div className={styles.systemCopy}>
                  <h3>{t.system.patternTitle}</h3>
                  <p>{t.system.patternBody}</p>
                </div>
                <figure className={styles.systemFigure}>
                  <img
                    src={img("6a8f41e9abea36ec8fecdb89292885bb2e9b0c61")}
                    alt={t.system.patternAlt}
                    width="2588"
                    height="1634"
                    loading="lazy"
                  />
                  <figcaption>{t.system.patternCaption}</figcaption>
                </figure>
              </div>

              <figure className={styles.systemFigure}>
                <img
                  src={img("a24d5da4bb5ee86851c88fe6ceac10ef0c01e5ad")}
                  alt={t.system.keyVisualAlt}
                  width="5760"
                  height="3240"
                  loading="lazy"
                />
                <figcaption>{t.system.keyVisualCaption}</figcaption>
              </figure>
            </section>

            {/* What came back from the final session, scores included. */}
            <section id="results" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.results.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.results.title}</h2>
                  <p className={styles.sectionLead}>{t.results.lead}</p>
                </div>
              </div>

              <div className={styles.ratingGrid}>
                {t.results.ratings.map((rating) => (
                  <div className={styles.rating} key={rating.label}>
                    <p className={styles.ratingLabel}>
                      {rating.label}
                      <em>{rating.score}/5</em>
                    </p>
                    <div className={styles.ratingDots} role="img" aria-label={t.results.outOf(rating.score)}>
                      {[1, 2, 3, 4, 5].map((step) => (
                        <span key={step} data-on={step <= rating.score ? "" : undefined} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.quoteGrid}>
                {t.results.quotes.map((quote) => (
                  <figure className={styles.quote} key={quote.source}>
                    <blockquote>&ldquo;{quote.text}&rdquo;</blockquote>
                    <figcaption>{quote.source}</figcaption>
                  </figure>
                ))}
              </div>

              <div className={styles.buildGallery}>
                <figure>
                  <img
                    src={img("8a20674441c2b898970a4715a754956babc1861e")}
                    alt={t.results.buildAlt1}
                    loading="lazy"
                  />
                  <figcaption>{t.results.buildCaption1}</figcaption>
                </figure>
                <figure>
                  <img
                    src={img("be9017fde875eccd706cd08fd62ab5ece4ea6fb7")}
                    alt={t.results.buildAlt2}
                    loading="lazy"
                  />
                  <figcaption>{t.results.buildCaption2}</figcaption>
                </figure>
              </div>
            </section>

            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
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

            <ProjectNav slug="suglar" track={track} locale={locale} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.productGallery} figure, .${styles.referenceImage}, .${styles.decisionVisual}, .${styles.roundVisual}, .${styles.wordmarkRow} > div, .${styles.colorBoard}, .${styles.systemFigure}, .${styles.buildGallery} figure, .${styles.caseSection}`}
        />

        <SiteFooter locale={locale} />
      </div>
    </main>
  )
}
