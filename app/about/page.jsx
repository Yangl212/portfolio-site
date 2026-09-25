import { AboutSheet, CIRCLE, CIRCLE_ROUND, CYCLE, HAND_B, HL, HL_LONG, UNDERLINE } from "./AboutSheet"

export const metadata = {
  title: "About",
  description:
    "Lele Yang on beauty and curiosity, researching users, games as a medium, usability testing at Parsons, and what AI and code changed about the work."
}

/*
 * About, entered from the name on the home page: the print is pulled, and
 * once it has finished this sheet rises over it from the foot of the
 * screen - all of it built in AboutSheet, which both tracks share.
 *
 * The pictures are not all in yet: a slot with an empty `src` renders as
 * a marked-out frame at the size it will be. To fill one, put the file in
 * /public and its path in `src`, with `alt` describing it; nothing else
 * needs to change. `lift` is how far down the chapter the picture sits,
 * so they do not all line up with each other.
 */
const enChapters = [
  {
    text: [
      ["I was first drawn to design because I have always loved ", [CYCLE, "beautiful"], " things. I believe aesthetics shape how people feel when they use a product. A clear and inviting interface can encourage exploration and make even an ordinary interaction feel enjoyable. Over time, I became curious about what makes an experience truly engaging, and what causes people to hesitate or feel confused."]
    ],
    pictures: [
      {
        side: "left",
        src: "/about/1.jpg",
        alt: "A research spread of annotated photographs, cut and written over by hand",
        width: 430,
        tilt: 2.5,
        lift: 0,
        edge: true
      }
    ]
  },
  {
    text: [
      ["While studying Digital Media Art at Beijing Film Academy, I worked on many game related projects. Designing games taught me to think carefully about what players notice first, where they might get stuck, and what motivates them to keep going. Through this process, I discovered that I enjoy observing and ", [CIRCLE, "researching users"], ". I am good at identifying problems through their behavior, organizing complex flows with clear logic, and turning ideas into tangible experiences through wireframes and prototypes."]
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
        lift: 168,
        note: "past game work"
      }
    ]
  },
  {
    text: [
      ["Games have always been ", [HL, "a medium"], " for me. They gave me a way to bring visual design, storytelling, interaction, and systems thinking into a single experience. They also helped me identify the area I wanted to explore more deeply: how people understand and use products."]
    ],
    pictures: [
      {
        side: "right",
        src: "/about/8.webp",
        alt: "A pixel street from a third game, two characters stopped outside a bun shop",
        width: 286,
        tilt: 2.5,
        lift: 12,
        note: "past game work"
      }
    ]
  },
  {
    text: [
      ["When I began my graduate studies at Parsons School of Design, I shifted my focus toward user experience and interface design. Through projects involving financial data platforms and budgeting tools, I used research, prototyping, and ", [UNDERLINE, "usability testing"], " to understand users’ difficulties, then refined the information architecture and interactions based on what I learned."]
    ],
    /* The afternoon the research came from, as a stack rather than three
       frames: it fans out into a hand when it is pointed at. */
    pictures: [
      {
        side: "right",
        lift: 68,
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
      ["Today, ", [CIRCLE_ROUND, "AI"], " and code allow me to turn ideas into interactive prototypes more quickly. I can test them myself, uncover problems, and continue improving them while communicating my design decisions more clearly to collaborators. I want to create products that move beyond Figma—products that are ", [HL_LONG, "tested through real use"], ", refined through iteration, and ultimately ", [HAND_B, "brought to life"], "."]
    ],
    /* The tools themselves, dotted down both margins at the paragraph
       that is about them - small, unequal, at unequal heights. Trimmed
       copies of the four icons: the artwork sits inside its canvas by a
       different amount in each file, so cropped to their own edges they
       all come out the same size on the page. */
    pictures: [
      { side: "right", src: "/about/icon-11.webp", alt: "ChatGPT", icon: true, width: 84, lift: -18, out: 9.5 },
      { side: "left", src: "/about/icon-10.webp", alt: "Gemini", icon: true, width: 84, lift: 128, out: 4.5 },
      { side: "right", src: "/about/icon-12.webp", alt: "Claude", icon: true, width: 84, lift: 176, out: 3.5 },
      { side: "left", src: "/about/icon-13.webp", alt: "Cursor", icon: true, width: 84, lift: 262, out: 10 }
    ]
  }
]

const zhChapters = [
  {
    text: [
      ["我最初喜欢设计，是因为我喜欢", [HL, "漂亮的东西"], "。我相信美感会影响人们使用产品时的心情：一个清晰、舒服的界面，能让人更愿意开始探索，也能让一次普通的操作变得愉快。但慢慢地，我开始好奇：除了好看，是什么让一个体验真正吸引人，又是什么让人在使用时感到困惑？"]
    ],
    /* The research collage, the prettiest thing in the folder, next to
       the sentence about liking pretty things. */
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
      ["本科在北京电影学院学习数字媒体艺术时，我做了很多游戏相关的项目。设计游戏让我不断思考玩家会先注意到什么、在哪里犹豫、为什么愿意继续玩下去。我发现自己很喜欢", [CIRCLE, "观察和研究用户"], "，也擅长从他们的反应中找到问题，再用清晰的逻辑梳理流程、绘制线框图，把复杂的想法变成可以体验的内容。"]
    ],
    /* Two screens rather than three: the lit room and the title card are
       far enough apart to read as two different games, and the third sat
       so far down the chapter it landed in the next one. */
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
        lift: 118,
        note: "本科时期的游戏作品"
      }
    ]
  },
  {
    text: [
      ["游戏对我来说一直是", [HL, "一个媒介"], "。它让我同时练习视觉、叙事、交互和系统设计，也帮我确认了自己最想深入的方向：人如何理解和使用一个产品。因此，到了帕森斯设计学院读硕士时，我开始更专注于用户体验与界面设计。在财务数据平台和预算流程等项目中，我通过调研、原型和", [UNDERLINE, "可用性测试"], "理解用户的困难，再不断调整信息结构与交互方式。"]
    ],
    /* The field-research photographs, next to the sentence about finding
       out where people get stuck. A stack rather than three frames: they
       are one afternoon's work, and they fan out when pointed at. */
    pictures: [
      {
        side: "right",
        lift: 68,
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
      [[CIRCLE_ROUND, "AI"], " 和代码也让我能更快地把想法做成可操作的原型。我可以亲自试用、发现问题、继续修改，也能让合作的人更直观地理解我的设计。我希望自己做的不只是停留在 Figma 里的界面，而是经过", [HL_LONG, "真实使用与反复迭代"], "，最终成为", [UNDERLINE, "能够落地的产品"], "。"]
    ],
    pictures: [
      { side: "right", src: "/about/icon-11.webp", alt: "ChatGPT", icon: true, width: 84, lift: -14, out: 9.5 },
      { side: "left", src: "/about/icon-10.webp", alt: "Gemini", icon: true, width: 84, lift: 76, out: 4.5 },
      { side: "right", src: "/about/icon-12.webp", alt: "Claude", icon: true, width: 84, lift: 122, out: 3.5 },
      { side: "left", src: "/about/icon-13.webp", alt: "Cursor", icon: true, width: 84, lift: 178, out: 10 }
    ]
  }
]

export default function AboutPage({ track = "uiux", locale = "en" }) {
  const isZh = locale === "zh"

  return (
    <AboutSheet
      track={track}
      locale={locale}
      title={isZh ? "关于我" : "About Me"}
      statement={isZh
        ? ["你好，我是杨乐乐，一名专注于用户体验与界面设计的设计师。"]
        : ["Hi, I’m Lele Yang, a designer focused on user experience and interface design."]}
      chapters={isZh ? zhChapters : enChapters}
    />
  )
}
