import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"

import { HueWheel } from "./HueWheel"
import { WordmarkAnatomy } from "./WordmarkAnatomy"

import styles from "./page.module.css"

export const metadata = {
  title: "TAROO",
  description:
    "A tarot brand for people drawn to good design rather than fortune telling: 22 Major Arcana cards, packaging, and the visual system behind them.",
  ...projectShareCard("taroo", {
    title: "TAROO",
    description:
      "A tarot brand for people drawn to good design rather than fortune telling: 22 Major Arcana cards, packaging, and the visual system behind them.",
    alt: "TAROO: the wordmark and a fan of tarot cards"
  })
}

const img = (hash) => `/framer-assets/images/${hash}`

/* Sampled from the finished deck artwork, so the wheel on this page is built
   from the exact field colors printed on the cards. The arcana names stay
   English in both locales: they are what is printed on the cards in the
   photograph above the wheel, so a translated legend would disagree with
   the artwork it labels. */
const arcanaColors = [
  { no: "00", name: "Fool", hex: "#C2DEFF", band: "pale" },
  { no: "01", name: "Magician", hex: "#8E72D6", band: "saturated" },
  { no: "02", name: "High Priestess", hex: "#071551", band: "deep" },
  { no: "03", name: "Empress", hex: "#FE7DC7", band: "saturated" },
  { no: "04", name: "Emperor", hex: "#FFDC8C", band: "pale" },
  { no: "05", name: "Hierophant", hex: "#F89B3B", band: "saturated" },
  { no: "06", name: "Lovers", hex: "#B8E6EB", band: "pale" },
  { no: "07", name: "Chariot", hex: "#C2A1FF", band: "pale" },
  { no: "08", name: "Strength", hex: "#4A5AE3", band: "saturated" },
  { no: "09", name: "Hermit", hex: "#0F1252", band: "deep" },
  { no: "10", name: "Wheel of Fortune", hex: "#FFE696", band: "pale" },
  { no: "11", name: "Justice", hex: "#F5D2D1", band: "pale" },
  { no: "12", name: "Hanged Man", hex: "#CA294F", band: "saturated" },
  { no: "13", name: "Death", hex: "#E5E5E5", band: "pale" },
  { no: "14", name: "Temperance", hex: "#CDE4DA", band: "pale" },
  { no: "15", name: "Devil", hex: "#720000", band: "deep" },
  { no: "16", name: "Tower", hex: "#C4B1E6", band: "pale" },
  { no: "17", name: "Star", hex: "#63B6F9", band: "saturated" },
  { no: "18", name: "Moon", hex: "#FB62B3", band: "saturated" },
  { no: "19", name: "Sun", hex: "#FF9C01", band: "saturated" },
  { no: "20", name: "Judgement", hex: "#D7F289", band: "pale" },
  { no: "21", name: "World", hex: "#2D00F4", band: "saturated" }
]

/*
 * Every line of prose on the page, in both languages. The English is
 * unchanged, lifted out of the JSX as it stood. Typeface names and the
 * competing decks' titles are products, so they read the same in both.
 */
const copy = {
  en: {
    hero: {
      label: "Student Work",
      discipline: "Brand Design · 2025",
      imageAlt: "Taroo wordmark beside a fan of five cards from the deck",
      summary: "A tarot brand for people drawn to good design rather than fortune telling - 22 Major Arcana cards, packaging, and the visual system behind them.",
      problem: "Tarot's visual language is dense, occult, and slow to read, which keeps design-minded newcomers out.",
      contribution: "Positioning, brand identity, 22 card illustrations, packaging, and the full visual system.",
      outcome: "A deck that works as a modern design object: one color per card, one shape kit, one typographic rule.",
      role: "Brand Designer (solo)",
      scope: "Positioning · Identity · Illustration · Packaging",
      platform: "Physical product · 22-card deck",
      timeline: "8 weeks"
    },
    product: {
      kicker: "Final Product",
      title: "The finished deck.",
      imageAlt: "All twenty-two Taroo Major Arcana cards laid out in a grid beside the gradient card back",
      caption: "All 22 Major Arcana and the card back"
    },
    idea: {
      kicker: "The Idea",
      title: "Tarot as a design object, not a fortune-telling tool.",
      items: [
        { label: "What is Taroo?", body: "A 22-card Major Arcana deck and the brand around it, made for reflection rather than prediction. Each card is a piece of graphic design you would leave out on a desk, not a relic you keep in a drawer." },
        { label: "Who is it for?", body: "People who would never describe themselves as spiritual but who collect beautiful, useful objects - students, designers, illustrators, journalers, anyone who wants a prompt to think with." },
        { label: "What should tarot feel like instead?", body: "Readable in about five seconds. Approachable enough to hand to someone who has never touched a deck. Reflective without being solemn or occult." }
      ]
    },
    direction: {
      kicker: "Design Direction",
      title: "Three words, each written down as something I could draw.",
      lead: "Approachable, modern, and reflective only became useful once each one was turned into a rule about shape, color, or surface.",
      boardAlt: "Keyword board reading colorful, simple, fresh, geometric, approachable, intuitive, playful",
      items: [
        { label: "Approachable", title: "Nothing to decode", body: "No occult symbolism and no scenes to interpret. A card is one shape, one color, one word, so it can be read before you know anything about tarot." },
        { label: "Modern", title: "Flat geometry, high chroma", body: "Everything is drawn with hard-edged geometry and bright pastels, set in a wide contemporary display face. Nothing engraved, nothing gothic, no gold foil." },
        { label: "Reflective", title: "Soft where you hold it", body: "The card back and the box interior are the only gradients in the system. The quiet surface is the part you touch; the fronts stay bright so a reading never feels heavy." }
      ]
    },
    decisions: {
      kicker: "Key Design Decisions",
      title: "Three decisions do most of the work.",
      lead: "Color, illustration, and typography were each solved once as a system, then applied twenty-two times without exception.",
      colorLabel: "01 / Color system",
      colorTitle: "One color per card, so the deck sorts itself.",
      colorP1: "Traditional decks run a single palette across all 78 cards, which makes them beautiful as a set and unreadable one at a time. Taroo gives each arcana its own field color, spread around the hue circle and split into three value bands - pale for the cards about beginnings and balance, saturated for the cards about action, and near-black for the three heavy ones.",
      colorP2: "Color becomes the fastest way to recognise a card, and the deck still reads as one family because every hue is mixed back toward the same pastel base.",
      bandPale: "Outer orbit · Pale · beginnings and balance",
      bandSaturated: "Middle orbit · Saturated · action",
      bandDeep: "Inner orbit · Deep · High Priestess, Hermit, Devil",
      shapeLabel: "02 / Illustration language",
      shapeTitle: "Six primitives, twenty-two pictures.",
      shapeP1: "Every card is built from the same kit - circle, square, arch, four-point star, right triangle, leaf - and nothing else is allowed in. Death is the arch with a cross laid over it, the Moon is a circle subtracted by a circle, the Tower is a triangle sitting on a tapered column.",
      shapeP2: "The constraint is what holds twenty-two illustrations together without a shared outline style.",
      shapeAlt: "The six Taroo primitives: circle, square, arch, four-point star, right triangle, leaf",
      shapeCaption: "The complete shape library",
      typeLabel: "03 / Typography & hierarchy",
      typeTitle: "Two typefaces, three fixed positions.",
      typeP1: "Card information sits in the same place every time: the arcana number in a tinted chip at the top right, the name locked to the bottom-left baseline, the illustration centred between them. Names never run past two lines, so the layout is identical across the deck.",
      typeP2: "TT Modernoir Medium carries the names - wide and geometric enough to read as part of the illustration - while Amoria Regular handles the numbers in a lighter, more classical voice. It is the one deliberate nod to traditional tarot in the whole system.",
      typeAlt: "Taroo type specimen showing the wordmark in solid and gradient forms with TT Modernoir and Amoria",
      typeCaption: "Wordmark treatments and the two type styles"
    },
    positioning: {
      kicker: "Audience & Positioning",
      title: "The gap is a deck you would leave out on a table.",
      lead: "Three decks own the modern tarot shelf. Each solves one thing well, and each leaves the same thing open.",
      audienceLabel: "Who I designed for",
      audienceBody: "People who would not call themselves spiritual but who love meaningful design, visual tools, and personal insight - students, artists, designers, journalers, and anyone who simply wants a beautiful, useful deck on their desk.",
      traitsLabel: "Personality traits",
      traits: [
        "Visually driven - buys things because of how they look",
        "Emotionally open, but sceptical of anything mystical",
        "Curious and playful; collects small beautiful objects"
      ],
      deckAlt: (name) => `${name} deck`,
      competitors: [
        { name: "The Modern Witch Tarot", image: img("dc3881dbc2e05bbe4a63549fe6774c595d6f7244.png"), body: "A contemporary retelling of the Rider-Waite deck with diverse modern characters, aimed at empowerment and inclusivity.", keywords: "Character-driven · Feminist · Illustrative", gap: "Still a scene to read. Every card needs interpreting before it can be used." },
        { name: "OK Tarot", image: img("be9365ca90faaa9c4d6a4e5182b328c238cc3ef2.png"), body: "Simple line drawings, faceless figures, and a single pink palette. The lowest barrier to entry on the shelf.", keywords: "Minimalist · Beginner-friendly · Faceless", gap: "One palette across the whole deck, so no card is recognisable on its own." },
        { name: "Prismavisions Tarot", image: img("bc001b0a1c023f69fc9228f6829c9fcc4cec2198.png"), body: "Dense hand-painted artwork on a dark ground, with cards that join into one continuous illustration across the set.", keywords: "Painterly · Collectible · Continuous artwork", gap: "A collector's object for people who already read tarot, not an entry point." }
      ],
      note: "Taroo sits where OK Tarot's approachability meets Prismavisions' collectibility: simple enough to read cold, distinct enough to want the whole set."
    },
    brand: {
      kicker: "Brand System",
      title: "The wordmark is the same kit, overlapped.",
      lead: "T, A, R, O, O are cut from the shape library rather than set in a typeface. Seven shapes make the five letters, and the three places two of them cross print colors of their own. Point at a shape to find it in the mark."
    },
    details: {
      kicker: "Product Details",
      title: "Everything the deck ships with runs on the same rules.",
      lead: "The cover treatments reuse the card back rather than inventing a second look for marketing.",
      boardAlt: "Taroo brand board: the wordmark over a soft gradient with three cover treatments beneath it",
      boardCaption: "Wordmark lockup and the three cover treatments",
      deliverables: [
        "22 Major Arcana cards",
        "Gradient card back",
        "Two-piece tuck box",
        "Geometric box pattern",
        "Wordmark and lockups",
        "Cover treatment system"
      ]
    },
    reflection: {
      kicker: "Reflection",
      title: "Recognition first, depth second.",
      items: [
        { label: "Limitation", body: "The deck stops at the 22 Major Arcana. Extending it to the 56 Minor Arcana would be the real test of whether one color per card survives four suits." },
        { label: "Key tradeoff", body: "Dropping figurative imagery makes the cards instantly readable but removes the narrative detail experienced readers rely on. I chose recognition over depth." },
        { label: "Next validation", body: "Print a physical run and watch first-time readers sort it. If they group the cards by value band without being told, the color system is doing its job." }
      ]
    }
  },
  zh: {
    hero: {
      label: "学生作品",
      discipline: "品牌设计 · 2025",
      imageAlt: "TAROO 字标，旁边是扇开的五张牌",
      summary: "一套做给设计爱好者的塔罗品牌，包括 22 张大阿卡纳、包装和完整的视觉系统。它更像一件设计物件，不太像算命工具。",
      problem: "传统塔罗的画面信息很密，也常带有神秘学符号。第一次接触的人往往要先学会解读，才能开始使用。",
      contribution: "定位、品牌识别、22 张牌面插画、包装，以及整套视觉系统。",
      outcome: "最终做出一副可以当作现代设计物件使用的牌：每张牌有自己的颜色，所有牌共用一套形状和排版规则。",
      role: "品牌设计师（独立完成）",
      scope: "定位 · 品牌识别 · 插画 · 包装",
      platform: "实体产品 · 22 张牌",
      timeline: "8 周"
    },
    product: {
      kicker: "成品",
      title: "做完的这副牌。",
      imageAlt: "22 张 TAROO 大阿卡纳排成网格，旁边是渐变牌背",
      caption: "22 张大阿卡纳和牌背"
    },
    idea: {
      kicker: "想法",
      title: "我把塔罗当成设计物件来做。",
      items: [
        { label: "TAROO 是什么？", body: "22 张大阿卡纳，加上围绕它做的一整套品牌，为的是让人想事情，不是预测未来。每张牌都是一件可以摊在桌上的平面设计，而不是收在抽屉里的法器。" },
        { label: "做给谁？", body: "那些绝不会说自己「灵性」、但会收集好看又好用的小东西的人：学生、设计师、插画师、写手账的人，以及任何想要一个念头来想事情的人。" },
        { label: "塔罗该是什么感觉？", body: "希望一张牌在几秒内就能看懂，也可以直接递给从没接触过塔罗的人。它能让人停下来想一想，但不会显得沉重或故作神秘。" }
      ]
    },
    direction: {
      kicker: "设计方向",
      title: "我把三个抽象关键词，分别变成了具体的视觉规则。",
      lead: "「容易接近」「现代」「适合反思」分别对应形状、颜色和材质上的选择，后面的设计才有可以执行的标准。",
      boardAlt: "关键词板：多彩、简单、清新、几何、好接近、直觉、好玩",
      items: [
        { label: "容易接近", title: "不需要先学会解读", body: "牌面不使用神秘学符号，也没有复杂场景。一张牌只有一个形状、一个颜色和一个词，即使不懂塔罗也能开始使用。" },
        { label: "现代", title: "平面几何，高饱和", body: "全部用硬边几何和明亮的粉彩画出来，配一款宽体的当代展示字。不做雕版，不做哥特，不烫金。" },
        { label: "适合反思", title: "把渐变留给手会碰到的地方", body: "牌背和盒子内壁是整套系统中仅有的渐变，牌面则保持明亮。这样抽牌时不会显得太沉重，拿在手里又有一层安静的过渡。" }
      ]
    },
    decisions: {
      kicker: "关键设计决策",
      title: "大部分设计工作集中在颜色、插画和排版这三套规则上。",
      lead: "我先分别定好三套系统，再把它们一致地应用到 22 张牌上。",
      colorLabel: "01 / 色彩系统",
      colorTitle: "一张牌一个颜色，这副牌自己就能分类。",
      colorP1: "传统牌用一套配色画完 78 张，整副摆出来好看，单看一张却认不出是哪张。TAROO 给每张大阿卡纳分了自己的底色，沿色相环铺开，再按明度分成三档：浅色给关于开始和平衡的牌，饱和色给关于行动的牌，近黑给那三张最重的。",
      colorP2: "颜色因此成了最快的识别方式。所有颜色又都混入同一个粉彩底色，所以整副牌放在一起仍然统一。",
      bandPale: "外圈 · 浅色 · 开始与平衡",
      bandSaturated: "中圈 · 饱和 · 行动",
      bandDeep: "内圈 · 深色 · 女祭司、隐士、恶魔",
      shapeLabel: "02 / 插画语言",
      shapeTitle: "六个基本形，二十二张图。",
      shapeP1: "每张牌都用同一套零件搭出来：圆、方、拱、四角星、直角三角、叶形，别的一律不许进来。死神是拱上压一个十字，月亮是一个圆减去另一个圆，高塔是三角坐在一根收窄的柱子上。",
      shapeP2: "正是这个限制，让二十二张插画在没有统一描边风格的情况下还能是一整套。",
      shapeAlt: "TAROO 的六个基本形：圆、方、拱、四角星、直角三角、叶形",
      shapeCaption: "完整的形状库",
      typeLabel: "03 / 字体与层级",
      typeTitle: "两款字体，三个固定位置。",
      typeP1: "牌面信息每次都在同一个地方：阿卡纳编号在右上角的色块里，名字锁在左下的基线上，插画居中放在两者之间。名字从不超过两行，所以整副牌的版式完全一致。",
      typeP2: "名字用 TT Modernoir Medium，够宽够几何，读起来像插画的一部分；编号用 Amoria Regular，轻一些，也更古典。这是整套系统里唯一一处刻意向传统塔罗致意的地方。",
      typeAlt: "TAROO 字体样张：实色和渐变两种字标，配 TT Modernoir 与 Amoria",
      typeCaption: "字标处理方式和两款字体"
    },
    positioning: {
      kicker: "受众与定位",
      title: "我想补上的，是一副愿意一直摊在桌上的牌。",
      lead: "现代塔罗这一格主要是三副牌在占。每一副都把一件事做得很好，也都留下了同一个空缺。",
      audienceLabel: "我为谁设计",
      audienceBody: "不会说自己「灵性」，但喜欢有意义的设计、视觉工具和自我觉察的人：学生、艺术家、设计师、写手账的人，以及任何只是想在桌上放一副好看又好用的牌的人。",
      traitsLabel: "性格特征",
      traits: [
        "视觉驱动，会因为好看就买",
        "情感上开放，但对神秘那一套持怀疑",
        "好奇、爱玩，喜欢收集漂亮的小东西"
      ],
      deckAlt: (name) => `${name} 牌`,
      competitors: [
        { name: "The Modern Witch Tarot", image: img("dc3881dbc2e05bbe4a63549fe6774c595d6f7244.png"), body: "用当代、多元的人物重讲了一遍韦特牌，主打赋权和包容。", keywords: "人物驱动 · 女性主义 · 插画感", gap: "还是一幅要读的画面。每张牌都得先解读，才能用起来。" },
        { name: "OK Tarot", image: img("be9365ca90faaa9c4d6a4e5182b328c238cc3ef2.png"), body: "简单的线稿、没有五官的人物，加一种粉色。货架上门槛最低的一副。", keywords: "极简 · 对新手友好 · 无面孔", gap: "整副牌只有一套配色，所以单拿一张出来认不出是哪张。" },
        { name: "Prismavisions Tarot", image: img("bc001b0a1c023f69fc9228f6829c9fcc4cec2198.png"), body: "深色底上密实的手绘，整副牌拼起来是一幅连续的画。", keywords: "绘画感 · 收藏向 · 连续画面", gap: "更像给熟悉塔罗的人收藏，不太适合作为第一副入门牌。" }
      ],
      note: "TAROO 的定位在 OK Tarot 的易上手和 Prismavisions 的收藏感之间：不用背牌义也能开始，同时有足够鲜明的视觉让人想收藏整副。"
    },
    brand: {
      kicker: "品牌系统",
      title: "字标也由牌面使用的形状拼出来。",
      lead: "T、A、R、O、O 不是用字体打出来的，是从形状库里裁出来的。七个形状拼成五个字母，其中三处两两相交的地方，各自印出自己的颜色。把鼠标放到某个形状上，就能在字标里找到它。"
    },
    details: {
      kicker: "产品细节",
      title: "牌、包装和宣传图都使用同一套规则。",
      lead: "封面处理直接复用牌背，没有另外为宣传造第二套样子。",
      boardAlt: "TAROO 品牌板：柔和渐变上的字标，下面是三种封面处理",
      boardCaption: "字标组合和三种封面处理",
      deliverables: [
        "22 张大阿卡纳",
        "渐变牌背",
        "两件式抽盒",
        "几何盒身图案",
        "字标与组合规范",
        "封面处理系统"
      ]
    },
    reflection: {
      kicker: "反思",
      title: "我先选择易识别，也接受它会少一些叙事细节。",
      items: [
        { label: "局限", body: "这副牌只做到 22 张大阿卡纳。真正考验「一张牌一个颜色」的，是把它扩到 56 张小阿卡纳、分成四个花色之后还成不成立。" },
        { label: "关键取舍", body: "去掉具象场景后，牌更容易识别，但也少了老玩家熟悉的叙事细节。这次我把易读性放在了深度之前。" },
        { label: "下一步验证", body: "印一批实体的，看第一次接触的人怎么给它分类。如果没人提示他们也按明度分档来分堆，这套色彩系统就是有用的。" }
      ]
    }
  }
}

export default function TarooPage({ track = "uiux", locale = "en" }) {
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
              title="Taroo"
              image={img("0c4d57f9f7b2bd0585d9304ff82ad4664160d290.png")}
              imageAlt={t.hero.imageAlt}
              layout="wide"
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
            <ProjectQuickNav slug="taroo" track={track} locale={locale} />
            {/* Final product first. This is a visual brand project, so the
                strongest artwork carries the top of the page and the reasoning
                follows it rather than delaying it. */}
            <section id="product" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.product.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.product.title}</h2>
                </div>
              </div>

              <div className={styles.productGallery}>
                <figure className={styles.productBand}>
                  <img
                    src={img("55ef7d1e82d0b3730f6aa708d084518b94eca511.png")}
                    alt={t.product.imageAlt}
                    width="988"
                    height="1053"
                  />
                  <figcaption>{t.product.caption}</figcaption>
                </figure>
              </div>
            </section>

            {/* The idea, kept to three answers. */}
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
            </section>

            {/* Direction: the three words, and what each one had to become. */}
            <section id="direction" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.direction.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.direction.title}</h2>
                  <p className={styles.sectionLead}>{t.direction.lead}</p>
                </div>
              </div>

              <figure className={styles.keywordBoard}>
                <img
                  src={img("613a87350cf8ea4863473ee18000054c7c15bd90.png")}
                  alt={t.direction.boardAlt}
                  width="1567"
                  height="503"
                />
              </figure>

              <div className={styles.directionGrid}>
                {t.direction.items.map((direction) => (
                  <article key={direction.label}>
                    <p className={styles.directionLabel}>{direction.label}</p>
                    <h3>{direction.title}</h3>
                    <p>{direction.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* The section a hiring manager actually reads: three decisions,
                each next to the artefact that proves it. */}
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
                  <p className={styles.microLabel}>{t.decisions.colorLabel}</p>
                  <h3>{t.decisions.colorTitle}</h3>
                  <p>{t.decisions.colorP1}</p>
                  <p>{t.decisions.colorP2}</p>
                  <ul className={styles.bandKey}>
                    <li>
                      <span data-band="pale" aria-hidden="true" />
                      {t.decisions.bandPale}
                    </li>
                    <li>
                      <span data-band="saturated" aria-hidden="true" />
                      {t.decisions.bandSaturated}
                    </li>
                    <li>
                      <span data-band="deep" aria-hidden="true" />
                      {t.decisions.bandDeep}
                    </li>
                  </ul>
                </div>

                <div className={styles.decisionVisual}>
                  <HueWheel cards={arcanaColors} locale={locale} />
                </div>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>{t.decisions.shapeLabel}</p>
                  <h3>{t.decisions.shapeTitle}</h3>
                  <p>{t.decisions.shapeP1}</p>
                  <p>{t.decisions.shapeP2}</p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("e977fd7ff13555ab29179463ed5df8bc332fb12b.png")}
                    alt={t.decisions.shapeAlt}
                    width="1698"
                    height="262"
                  />
                  <figcaption>{t.decisions.shapeCaption}</figcaption>
                </figure>
              </article>

              <article className={styles.decision}>
                <div className={styles.decisionCopy}>
                  <p className={styles.microLabel}>{t.decisions.typeLabel}</p>
                  <h3>{t.decisions.typeTitle}</h3>
                  <p>{t.decisions.typeP1}</p>
                  <p>{t.decisions.typeP2}</p>
                </div>
                <figure className={styles.decisionVisual}>
                  <img
                    src={img("7c81948064546ffd40e4f625440c6f034ab9d4cf.png")}
                    alt={t.decisions.typeAlt}
                    width="899"
                    height="674"
                  />
                  <figcaption>{t.decisions.typeCaption}</figcaption>
                </figure>
              </article>
            </section>

            {/* Audience and competitors, compressed to roughly one screen. */}
            <section id="positioning" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.positioning.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.positioning.title}</h2>
                  <p className={styles.sectionLead}>{t.positioning.lead}</p>
                </div>
              </div>

              <div className={styles.audience}>
                <div>
                  <p className={styles.microLabel}>{t.positioning.audienceLabel}</p>
                  <p>{t.positioning.audienceBody}</p>
                </div>
                <div>
                  <p className={styles.microLabel}>{t.positioning.traitsLabel}</p>
                  <ul className={styles.traitList}>
                    {t.positioning.traits.map((trait) => (
                      <li key={trait}>{trait}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.competitorGrid}>
                {t.positioning.competitors.map((competitor) => (
                  <article className={styles.competitorCard} key={competitor.name}>
                    <div className={styles.competitorImage}>
                      <img src={competitor.image} alt={t.positioning.deckAlt(competitor.name)} loading="lazy" />
                    </div>
                    <h3>{competitor.name}</h3>
                    <p className={styles.competitorKeywords}>{competitor.keywords}</p>
                    <p>{competitor.body}</p>
                    <p className={styles.competitorGap}>{competitor.gap}</p>
                  </article>
                ))}
              </div>

              <p className={styles.positioningNote}>{t.positioning.note}</p>
            </section>

            {/* The system, compact. */}
            <section id="brand" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.brand.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.brand.title}</h2>
                  <p className={styles.sectionLead}>{t.brand.lead}</p>
                </div>
              </div>

              <WordmarkAnatomy locale={locale} />
            </section>

            {/* Close on the artwork again. */}
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.details.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.details.title}</h2>
                  <p className={styles.sectionLead}>{t.details.lead}</p>
                </div>
              </div>

              <figure className={styles.brandBoard}>
                <img
                  src={img("ff8fe4581ffca27adf6ebb6bde4b88406cdb35ff.png")}
                  alt={t.details.boardAlt}
                  width="4474"
                  height="2516"
                  loading="lazy"
                />
                <figcaption>{t.details.boardCaption}</figcaption>
              </figure>

              <ul className={styles.deliverables}>
                {t.details.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Reflection, short. */}
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

            <ProjectNav slug="taroo" track={track} locale={locale} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.productGallery} figure, .${styles.keywordBoard}, .${styles.decisionVisual}, .${styles.hueWheel}, .${styles.competitorImage}, .${styles.brandBoard}, .${styles.caseSection}`}
        />

        <SiteFooter locale={locale} />
      </div>
    </main>
  )
}
