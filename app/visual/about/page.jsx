import { AboutSheet, CIRCLE, CIRCLE_ROUND, CYCLE, HAND_B, HL, HL_LONG, UNDERLINE } from "../../about/AboutSheet"

export const metadata = {
  title: "About",
  description:
    "Lele Yang on beautiful things, the game projects that never shipped, Last Message and Bubu, and what AI and code changed about the work.",
  alternates: { canonical: "/about" }
}

/*
 * The visual track's own About - same AboutSheet shell as /about, its own
 * chapters. Where the UI/UX essay reads as a designer who researches, this
 * one reads as one who starts from how a thing looks and then insists on
 * shipping it; same person, told to the audience that meets the visual
 * work first.
 */
const chapters = [
  {
    text: [
      ["I was first drawn to design simply because I love ", [CYCLE, "beautiful"], " things. I believe visuals shape how people feel when they use a product. Color, typography, and small details can spark curiosity and make an interface feel more inviting. Over time, though, I realized that getting someone to open a product is only the beginning. Whether they understand it and want to keep using it matters just as much."]
    ],
    /* The research collage, next to the sentence about colour, type and
       detail: it is the one piece here that is all three. */
    pictures: [
      {
        side: "right",
        src: "/about/1.jpg",
        alt: "A research spread of annotated photographs, cut and written over by hand",
        width: 430,
        tilt: -2.5,
        lift: 0,
        edge: true
      }
    ]
  },
  {
    text: [
      ["I studied Digital Media Art at Beijing Film Academy, where I worked on many game related projects. Games taught me to think about visuals, storytelling, rules, and interaction at the same time. They also made me pay close attention to how players feel at every step. Some of my early projects, however, never became fully working products that people could actually use. I found that frustrating, and it made me want to learn how to take an idea all the way from a concept to ", [CIRCLE, "something real"], "."]
    ],
    pictures: [
      {
        side: "right",
        src: "/about/7.webp",
        alt: "A room from one of the games: a piano, an armchair and papers left on the table",
        width: 290,
        tilt: -2,
        lift: -24,
        note: "past game work"
      },
      {
        side: "left",
        src: "/about/9.webp",
        alt: "The title screen of another game, its characters gathered around a tree",
        width: 280,
        tilt: 3,
        lift: 196,
        note: "past game work"
      }
    ]
  },
  {
    text: [
      ["During my graduate studies at Parsons School of Design, I began moving more intentionally in that direction. Last Message is an AI powered mystery game that I designed, developed, and ", [UNDERLINE, "launched independently"], ". I worked on everything from the visual atmosphere and interface to the gameplay and development. Once it was live, I could watch people play, see what worked, and find the parts that still needed to change. I am now designing Bubu, where I am exploring how matching, personal goals, and daily check-ins can come together in an experience people want to return to."]
    ],
    /* Watching people use the thing, which is what this chapter is about.
       A stack rather than three frames: it fans out into a hand when it
       is pointed at. */
    pictures: [
      {
        side: "right",
        lift: 150,
        width: 244,
        stack: [
          { src: "/about/3.png", alt: "Talking to someone in a cinema lobby about the film she had just seen" },
          { src: "/about/4.png", alt: "Two customers filling in a questionnaire outside a juice shop" },
          { src: "/about/5.png", alt: "Asking a passer-by a question from a clipboard outside a shop" }
        ]
      }
    ]
  },
  {
    text: [
      [[CIRCLE_ROUND, "AI"], " and code have made it much easier for me to test my own ideas. I can turn a design into a working prototype, try it myself, and improve it based on ", [HL_LONG, "real feedback"], ". I want to keep creating digital products with a strong visual personality—products that can be launched, used, and ", [HAND_B, "continue to grow"], "."]
    ],
    /* The tools themselves, dotted down both margins at the paragraph
       that is about them - small, unequal, at unequal heights. */
    pictures: [
      { side: "right", src: "/about/icon-11.webp", alt: "ChatGPT", icon: true, width: 84, lift: -14, out: 9.5 },
      { side: "left", src: "/about/icon-10.webp", alt: "Gemini", icon: true, width: 84, lift: 96, out: 4.5 },
      { side: "right", src: "/about/icon-12.webp", alt: "Claude", icon: true, width: 84, lift: 144, out: 3.5 },
      { side: "left", src: "/about/icon-13.webp", alt: "Cursor", icon: true, width: 84, lift: 214, out: 10 }
    ]
  }
]

/* The visual track's Chinese essay. Not a translation of the chapters
   above: it is a different piece of writing, so it stands on its own the
   way the English one does. The picture slots follow the same convention
   - an empty `src` is a marked-out frame at the size it will be. */
const zhChapters = [
  {
    text: [
      ["我最初喜欢设计，是因为我喜欢", [HL, "漂亮的东西"], "。我相信视觉会影响人使用产品时的心情：颜色、排版和细节能让人产生好奇，也能让一个界面更亲切。但我渐渐发现，让人愿意打开一个产品只是开始；他们能否理解它、用下去，同样值得设计。"]
    ],
    /* The research collage, next to the sentence about colour, layout
       and detail: it is the one piece here that is all three. */
    pictures: [
      {
        side: "right",
        src: "/about/1.jpg",
        alt: "一张研究拼贴：照片、剪影、批注和手写的问题被拼在同一张画面上",
        width: 430,
        tilt: -2.5,
        lift: 0,
        edge: true
      }
    ]
  },
  {
    text: [
      ["本科在北京电影学院学习数字媒体艺术时，我做了很多游戏相关的项目。游戏让我同时思考视觉、故事、规则和交互，也让我开始在意玩家每一步的感受。不过，当时有些作品停留在概念或展示阶段，没能成为可以持续运行、供人使用的产品。这让我有些挫败，也让我更想学会把一个想法", [CIRCLE, "真正做出来"], "。"]
    ],
    pictures: [
      {
        side: "right",
        src: "/about/7.webp",
        alt: "本科时期制作的一款叙事游戏场景，房间里摆着钢琴、扶手椅和散落的线索",
        width: 290,
        tilt: -2,
        lift: -24,
        note: "本科时期的游戏作品"
      },
      {
        side: "left",
        src: "/about/9.webp",
        alt: "本科时期制作的一款国风游戏的标题画面，几位角色围着一棵大树",
        width: 280,
        tilt: 3,
        lift: 132,
        note: "本科时期的游戏作品"
      }
    ]
  },
  {
    text: [
      ["到了帕森斯设计学院读硕士时，我开始更有意识地朝这个方向走。Last Message 是我", [UNDERLINE, "独立设计并上线"], "的 AI 互动推理游戏。从视觉氛围、界面到玩法和开发，我都参与其中；作品上线后，我也能通过试玩看到哪些设计有效，哪些地方需要调整。现在正在设计的 Bubu 则让我继续思考：怎样把匹配、目标和日常打卡组织成一个让人愿意持续使用的体验。"]
    ],
    /* Watching people use the thing, which is what this chapter is
       about. A stack rather than three frames: it fans out into a hand
       when it is pointed at. */
    pictures: [
      {
        side: "right",
        lift: 96,
        width: 244,
        stack: [
          { src: "/about/3.png", alt: "在影院大厅和一位观众聊她刚看完的片子" },
          { src: "/about/4.png", alt: "在街边饮品店门口，拿着问卷和两位顾客交谈" },
          { src: "/about/5.png", alt: "拿着问卷在店门口向一位路人提问" }
        ]
      }
    ]
  },
  {
    text: [
      [[CIRCLE_ROUND, "AI"], " 和代码让我能够更直接地验证自己的想法。我可以把画面做成可操作的原型，亲自试用，再", [HL_LONG, "根据真实反馈迭代"], "。我希望继续做有鲜明视觉个性、也真正", [UNDERLINE, "能够上线和被人使用"], "的数字产品。"]
    ],
    /* The tools themselves, dotted down both margins at the paragraph
       that is about them - small, unequal, at unequal heights. */
    pictures: [
      { side: "right", src: "/about/icon-11.webp", alt: "ChatGPT", icon: true, width: 84, lift: -10, out: 9.5 },
      { side: "left", src: "/about/icon-10.webp", alt: "Gemini", icon: true, width: 84, lift: 54, out: 4.5 },
      { side: "right", src: "/about/icon-12.webp", alt: "Claude", icon: true, width: 84, lift: 96, out: 3.5 },
      { side: "left", src: "/about/icon-13.webp", alt: "Cursor", icon: true, width: 84, lift: 142, out: 10 }
    ]
  }
]

export default function VisualAboutPage({ locale = "en" }) {
  const isZh = locale === "zh"

  return (
    <AboutSheet
      track="visual"
      locale={locale}
      title={isZh ? "关于我" : "About Me"}
      statement={isZh
        ? ["你好！我是杨乐乐，一名关注数字产品与视觉体验的设计师。"]
        : ["Hi, I’m Lele Yang, a designer interested in digital products and visual experiences."]}
      chapters={isZh ? zhChapters : chapters}
    />
  )
}
