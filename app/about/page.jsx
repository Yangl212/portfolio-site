import { AboutSheet, CIRCLE, CIRCLE_ROUND, CYCLE, HAND_B, HAND_D, HL, HL_LONG, UNDERLINE } from "./AboutSheet"

export const metadata = {
  title: "About",
  description:
    "Lele Yang on meaning and beauty, logic and user testing, games as a medium, and what AI changed about the work."
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
      "I would always ask myself what it was trying to say, what it could bring to people, and why it was worth making.",
      ["Over time, I started to see things a little differently. Meaning is still important to me, but I also believe that making something ", [CYCLE, "beautiful"], " can be meaningful on its own. A clear interface, a smooth interaction, or even a visual that makes someone want to stay for a few more seconds can already create a good experience."]
    ],
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
      ["I also know that I do not want to focus only on visual design. I really like ", [CIRCLE, "logic"], ", and I enjoy understanding why people hesitate, why they click the wrong thing, or why something feels hard to use even when it looks simple."],
      ["That is why I like ", [UNDERLINE, "user testing"], " so much. I enjoy listening to people, hearing their ", [HAND_D, "stories"], ", and understanding the habits and experiences they bring into a product. For me, design becomes more interesting when I can use those different points of view to make something easier, clearer, and more useful."]
    ],
    pictures: [
      { side: "left", book: { src: "/about/book.jpeg", alt: "Keigo Higashino, Byakuyako - a novel I keep going back to" }, lift: -14 },
      {
        side: "right",
        lift: 160,
        width: 216,
        stack: [
          { src: "/about/3.png", alt: "A window table looking out over the city" },
          { src: "/about/4.png", alt: "A queue outside a juice shop, two people mid-conversation" },
          { src: "/about/5.png", alt: "Sitting in shallow water at the edge of the sea" }
        ]
      }
    ]
  },
  {
    text: [
      "I have worked on many game-related projects, so people often ask me if I want to become a game designer. The answer is not really.",
      ["I have always seen games more as ", [HL, "a medium"], ". They give me space to bring UI, UX, storytelling, visuals, and logic together in one experience. That is what I like about them. The same is true for websites, digital products, and AI projects. They are all different ways for me to explore how people experience something."]
    ],
    pictures: [
      {
        side: "right",
        src: "/about/7.webp",
        alt: "A screen from one of the games",
        width: 290,
        tilt: -2,
        lift: 0,
        note: "past game work"
      },
      {
        side: "left",
        src: "/about/8.webp",
        alt: "A screen from another game project",
        width: 286,
        tilt: 2.5,
        lift: 96,
        note: "past game work"
      },
      {
        side: "right",
        src: "/about/9.webp",
        alt: "A third game screen",
        width: 280,
        tilt: 3,
        lift: 320,
        note: "past game work"
      }
    ]
  },
  {
    text: [
      "I do not want to be someone who only designs screens. I want to understand how people think, why they act in certain ways, and whether a design is actually helping them.",
      "I care a lot about how things look, but I care just as much about how they work. I like finding the balance between beauty and logic. To me, good design should feel good to look at, but it should also feel natural to use."
    ],
    /* Nothing beside this chapter: it is the one about the two halves of
       the work holding together, and it reads better with the margin
       empty on both sides. */
    pictures: []
  },
  {
    text: [
      ["", [CIRCLE_ROUND, "AI"], " has also changed the way I work. In the past, I could have a clear idea in my head but still be limited by whether I could actually build it."],
      "Now I can move much faster from an idea to something real, interactive, and testable. I can build websites, try different interactions, test product ideas, and turn something that once only existed in Figma into a working experience.",
      ["I do not see AI as something that designs for me. I see it as a tool that helps me bring ", [HL_LONG, "my own ideas"], " to life more fully."],
      ["That is the kind of designer I want to keep becoming: someone who cares about beauty, listens to people, thinks through the logic, and can turn an idea into ", [HAND_B, "a real experience"], "."]
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
    pictures: []
  },
  {
    text: [
      ["本科在北京电影学院学习数字媒体艺术时，我做了很多游戏相关的项目。设计游戏让我不断思考玩家会先注意到什么、在哪里犹豫、为什么愿意继续玩下去。我发现自己很喜欢", [CIRCLE, "观察和研究用户"], "，也擅长从他们的反应中找到问题，再用清晰的逻辑梳理流程、绘制线框图，把复杂的想法变成可以体验的内容。"]
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
        src: "/about/8.webp",
        alt: "本科时期制作的一款像素游戏，角色站在街边的包子铺前",
        width: 286,
        tilt: 2.5,
        lift: 118,
        note: "本科时期的游戏作品"
      },
      {
        side: "right",
        src: "/about/9.webp",
        alt: "本科时期制作的一款国风游戏，几位角色围绕一棵树展开故事",
        width: 280,
        tilt: 3,
        lift: 286,
        note: "本科时期的游戏作品"
      }
    ]
  },
  {
    text: [
      ["游戏对我来说一直是", [HL, "一个媒介"], "。它让我同时练习视觉、叙事、交互和系统设计，也帮我确认了自己最想深入的方向：人如何理解和使用一个产品。因此，到了帕森斯设计学院读硕士时，我开始更专注于用户体验与界面设计。在财务数据平台和预算流程等项目中，我通过调研、原型和", [UNDERLINE, "可用性测试"], "理解用户的困难，再不断调整信息结构与交互方式。"]
    ],
    pictures: [
      {
        side: "right",
        src: "/about/1.jpg",
        alt: "一张研究拼贴，照片、剪影、批注和手写问题被整理在同一张画面上",
        width: 430,
        tilt: -2.5,
        lift: 12,
        edge: true
      }
    ]
  },
  {
    text: [
      [[CIRCLE_ROUND, "AI"], " 和代码也让我能更快地把想法做成可操作的原型。我可以亲自试用、发现问题、继续修改，也能让合作的人更直观地理解我的设计。我希望自己做的不只是停留在 Figma 里的界面，而是经过", [HL_LONG, "真实使用与反复迭代"], "，最终成为", [UNDERLINE, "能够落地的产品"], "。"]
    ],
    pictures: [
      { side: "right", src: "/about/icon-11.webp", alt: "ChatGPT", icon: true, width: 84, lift: -18, out: 9.5 },
      { side: "left", src: "/about/icon-10.webp", alt: "Gemini", icon: true, width: 84, lift: 112, out: 4.5 },
      { side: "right", src: "/about/icon-12.webp", alt: "Claude", icon: true, width: 84, lift: 164, out: 3.5 },
      { side: "left", src: "/about/icon-13.webp", alt: "Cursor", icon: true, width: 84, lift: 246, out: 10 }
    ]
  }
]

export default function AboutPage({ track = "uiux", locale = "en" }) {
  const isZh = locale === "zh"

  return (
    <AboutSheet
      track={track}
      locale={locale}
      title={isZh ? "关于我" : "About me"}
      statement={isZh
        ? ["你好，我是杨乐乐，一名专注于用户体验与界面设计的设计师。"]
        : ["I used to think that the most important thing about a piece of work was whether it had meaning."]}
      chapters={isZh ? zhChapters : enChapters}
    />
  )
}
