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
  title: "Alcohol Directory",
  description:
    "A riso zine of the cocktails I drank in New York. One spread per drink: what it was, where I had it, and what it tasted like.",
  ...projectShareCard("alcohol", {
    title: "Alcohol Directory",
    description:
      "A riso zine of the cocktails I drank in New York. One spread per drink: what it was, where I had it, and what it tasted like.",
    alt: "The Alcohol Directory zine, opened to an illustrated spread"
  })
}

const img = (hash) => `/framer-assets/images/${hash}`

const BOOK_SRC = "/alcohol/embed/flipbook.html"

const sourcePhotos = [
  { src: img("e45a0f4cd30eefe8fc27441ba9175797a52d1c57.png"), key: "margarita", w: "341", h: "460" },
  { src: img("d9fd9af0b3253543691532f63d2889cb8e858225.png"), key: "cards", w: "345", h: "460" }
]

/*
 * Every line of prose on the page, in both languages. The English is
 * unchanged, lifted out of the JSX as it stood. The zine's own pages are
 * printed artwork and stay as they were photographed - only the writing
 * about them changes language.
 */
const copy = {
  en: {
    hero: {
      label: "Personal Work",
      discipline: "Zine · 2025",
      imageAlt: "Alcohol Directory cover next to an open spread",
      summary: "A riso zine of the cocktails I drank in New York. One spread per drink: what it was, where I had it, and what it tasted like.",
      problem: "Bar photos record where you were. They do not record what the drink tasted like or how the room felt.",
      contribution: "Illustration, riso separations, editorial layout, photography, printing, and binding.",
      outcome: "24 spreads sorted by taste, with a map at the back so the route can be walked again.",
      role: "Designer, illustrator, photographer",
      scope: "Illustration · Editorial · Riso",
      platform: "Print · 10 × 20 cm zine",
      timeline: "6 weeks"
    },
    book: {
      kicker: "The Book",
      title: "The whole zine, cover to back.",
      lead: "All 24 spreads. Click either half of the book to turn a page, or use the arrow keys. Open it at full size to read the tasting notes.",
      open: "Open at full size",
      frameTitle: "Alcohol Directory, readable page by page"
    },
    idea: {
      kicker: "The Idea",
      title: "A record of drinks, not of bars.",
      items: [
        { label: "What it is", body: "A riso zine of the classic cocktails I drank in New York. One spread per drink: the name, the bar, the address, and what it actually tasted like." },
        { label: "Who it is for", body: "People who go out for the room as much as the drink. It works as a keepsake, and the map at the back means the route can be walked again." },
        { label: "Why I made it", body: "I kept taking photos in bars and forgetting the drinks. I wanted a way to record taste and mood, and I had been wanting to design something for riso." }
      ]
    },
    direction: {
      kicker: "Direction",
      title: "Three rules I set before drawing anything.",
      lead: "The moodboard was mostly riso printing and illustrated food books. What I took from it was less a look than three things I was not allowed to break.",
      boardAlt: "Moodboard of riso prints, illustrated food books, and zine formats",
      items: [
        { label: "Riso, not clean print", body: "Flat spot colors, visible halftone, paper grain, and the small misregistration riso gives you. None of it is cleaned up afterwards." },
        { label: "Drink drawn, room photographed", body: "The cocktail is illustrated and the bar is a photo. The drawing carries how it felt; the photo is the evidence I was there." },
        { label: "Color comes from the drink", body: "Each spread is keyed to the color of its own cocktail. There is no fixed palette to pull from, so no two spreads sit on the same ground." }
      ]
    },
    highlights: {
      kicker: "Highlights",
      title: "What makes it worth holding.",
      h1Label: "01 / Made by hand",
      h1Title: "Risograph printed and sewn by hand.",
      h1Body: "The whole book is printed on a risograph and bound by hand. The halftones are ink on paper rather than a filter, the registration drifts a little on some spreads, and the drink name on every left-hand page is hand-lettered — no two are drawn the same way.",
      h1Alt: "A printed copy of the zine open on a cutting mat, clipped at the spine, with an awl, bone folder, waxed thread and a steel ruler laid out beside it",
      h2Label: "02 / All of it first-hand",
      h2Title: "Every drink in here is one I actually drank.",
      h2P1: "Nothing is researched. Each spread is a bar I went to and a cocktail I ordered, and the tasting note is what I thought of it rather than what the menu said.",
      h2P2: "The bar names and addresses are real, so the book works as a route as much as a record. The map at the back lets you walk the whole thing.",
      h2Alt: "Pina Colada Pickleback spread: illustration left, bar name, riso photo, tasting note and address right",
      h3Label: "03 / My own photos",
      h3Title: "Every photo goes through a riso separation first.",
      h3P1: "The source photos are phone shots taken at the bar, usually in bad light. Separating them into two or three flat colors throws away most of the detail and keeps the shape and the mood, which is closer to what I remember of a night than the original file is.",
      h3P2: "It also means a badly lit photo stops being a problem. Half the shots in the book would not survive being printed straight.",
      photoAlts: {
        margarita: "Original phone photo of a margarita on a bar counter in low light",
        cards: "Original phone photo of a dark bar table with drinks and playing cards"
      },
      h4Label: "04 / Ordered by taste",
      h4Title: "Sorted by taste, not by bar or by date.",
      h4Body: "The book follows the taste profiles of the drinks rather than where or when I had them. It opens on the refreshing ones and moves toward the concentrated and strong, which is roughly the shape of an evening out. Sorting by neighbourhood or by date would have been easier to build and would have told a reader nothing.",
      chapters: [
        { label: "Chapter 00", body: "Introduces the book and the visual approach, which comes out of the riso tradition of drawn design." },
        { label: "Body", tastes: ["Sour", "Sweet", "Bitter", "Spicy", "Salty"], body: "One chapter per taste. Every drink gets its name, the bar and address, a note on the taste and the room, my own photographs, and an illustration for the mood." },
        { label: "Ending", body: "Afterthoughts on the nights in the book, plus a map of every bar so the route can be retraced." }
      ]
    },
    format: {
      kicker: "Format",
      title: "Small enough to carry, tall enough for one drink a page.",
      lead: "10 × 20 cm is close to a bar menu, and the tall portrait page suits a glass better than a square would. It is sewn rather than coiled, so the left-hand page can run full bleed.",
      specs: [
        { term: "Size", value: "10 × 20 cm" },
        { term: "Orientation", value: "Portrait" },
        { term: "Print", value: "Risograph" },
        { term: "Extent", value: "24 spreads" },
        { term: "Binding", value: "Hand-sewn" }
      ],
      referenceAlt: "Two reference zines: a thread-bound book lying open, and a coil-bound cooking zine"
    },
    posters: {
      kicker: "Posters",
      title: "When I'm sober, I'm not romantic anymore.",
      lead: "Two promo posters use the drawing style from the book but drop the information layer, so the line has to carry it on its own.",
      alts: [
        "Alcohol Directory poster: two figures on a pink ground reading behind a yellow book",
        "Alcohol Directory poster: a table of drinks drawn in riso colors on white"
      ]
    },
    spreads: {
      kicker: "Every Spread",
      title: "Twenty-five spreads, five taste chapters.",
      lead: "Laid out together, the template holds and the color still changes on every drink. Each taste chapter opens on its own divider.",
      alts: [
        "Fifteen Alcohol Directory spreads laid out in a grid on black",
        "Ten more Alcohol Directory spreads laid out in a grid on black, including the taste chapter dividers"
      ]
    },
    reflection: {
      kicker: "Reflection",
      title: "It exists, but it does not scale.",
      items: [
        { label: "Limitation", body: "Hand-sewing caps it at a handful of copies. Anything past that needs a binding I have not worked out yet, and most of the cheap ones cut into the left-hand page." },
        { label: "Tradeoff", body: "Sorting by taste makes the book good to read straight through and bad to use as a reference. To find one bar you have to remember what you drank there." },
        { label: "Next", body: "The map at the back wants to be a fold-out insert rather than a page, so it can come out of the book and go in a pocket on the way to the first bar." }
      ]
    }
  },
  zh: {
    hero: {
      label: "个人作品",
      discipline: "独立小册子 · 2025",
      imageAlt: "Alcohol Directory 封面，旁边是摊开的内页",
      summary: "一本记录纽约鸡尾酒的孔版印刷小册子。每杯酒占一个跨页，写下酒名、酒吧、地址，还有我记得的味道。",
      problem: "我在酒吧拍了很多照片，回头却常常想不起那杯酒的味道，也记不清当时空间里的感觉。",
      contribution: "插画、孔版分色、编排、摄影、印刷和装订。",
      outcome: "最后做成 24 个跨页，按味道排序，书末还有一张可以照着走的酒吧地图。",
      role: "设计、插画、摄影",
      scope: "插画 · 编辑设计 · 孔版印刷",
      platform: "印刷品 · 10 × 20 cm 小册子",
      timeline: "6 周"
    },
    book: {
      kicker: "这本书",
      title: "整本册子，从封面翻到封底。",
      lead: "24 个跨页都在这里。点书的左右任意一半翻页，也可以用方向键。想看清品酒笔记，就打开大图。",
      open: "打开大图",
      frameTitle: "Alcohol Directory，可以一页页翻"
    },
    idea: {
      kicker: "想法",
      title: "记的是酒，不是酒吧。",
      items: [
        { label: "这是什么", body: "一本孔版印刷的小册子，记我在纽约喝过的经典鸡尾酒。一杯一跨页：酒名、酒吧、地址，还有它实际喝起来什么味道。" },
        { label: "做给谁", body: "做给那些去酒吧不只为了喝酒，也在意空间和人的读者。它可以当作纪念品，书末的地图也能带人重新走一遍这条路线。" },
        { label: "为什么做", body: "我在酒吧总是拍照，回头却想不起喝的是什么。我想找个办法把味道和氛围记下来，也一直想做点孔版印刷的东西。" }
      ]
    },
    direction: {
      kicker: "方向",
      title: "动手前，我先定下三条视觉规则。",
      lead: "情绪板主要由孔版印刷作品和插画食谱书组成。我没有直接照搬某种风格，而是从中整理出三条要坚持的规则。",
      boardAlt: "情绪板：孔版印刷作品、带插画的食谱书，以及各种小册子开本",
      items: [
        { label: "要孔版，不要干净的印刷", body: "平涂的专色、看得见的网点、纸张纹理，还有孔版特有的轻微套印偏移。这些事后一律不修。" },
        { label: "酒是画的，空间是拍的", body: "鸡尾酒用插画，酒吧用照片。画承载当时的感觉，照片是「我确实去过」的证据。" },
        { label: "颜色从酒里来", body: "每个跨页的颜色都取自那杯酒本身。我没有先定一套固定色板，因此每个跨页的底色都不一样。" }
      ]
    },
    highlights: {
      kicker: "亮点",
      title: "这本小册子最重要的四个细节。",
      h1Label: "01 / 手工做的",
      h1Title: "孔版印刷，手工缝线。",
      h1Body: "整本书用孔版机印刷，再手工装订。纸上的网点来自真实油墨，不是滤镜；有些跨页会留下轻微的套印偏移；左页的酒名全部手写，每个都不一样。",
      h1Alt: "印好的册子摊在切割垫上，书脊处用夹子夹着，旁边摆着锥子、骨刀、蜡线和钢尺",
      h2Label: "02 / 全是亲身经历",
      h2Title: "里面每一杯，都是我真的喝过的。",
      h2P1: "没有一条是查来的。每个跨页都是我去过的酒吧、点过的一杯酒，品酒笔记写的是我自己的感受，不是菜单上的说法。",
      h2P2: "酒吧名和地址都是真的，所以这本书既是记录，也是一条路线。书末的地图让人可以把整条路走一遍。",
      h2Alt: "Pina Colada Pickleback 跨页：左边插画，右边是酒吧名、孔版照片、品酒笔记和地址",
      h3Label: "03 / 照片都是自己拍的",
      h3Title: "每张照片都先过一遍孔版分色。",
      h3P1: "原始照片是在酒吧用手机拍的，光线通常很糟。分成两三个平涂色之后，大部分细节被丢掉，留下的是形状和氛围——那比原图更接近我记忆里的那一晚。",
      h3P2: "分色也解决了原片光线差的问题。书里大约一半的照片，如果直接印出来，效果会很弱。",
      photoAlts: {
        margarita: "原始手机照片：昏暗灯光下吧台上的一杯玛格丽特",
        cards: "原始手机照片：深色的酒吧桌面，上面有酒和扑克牌"
      },
      h4Label: "04 / 按味道排",
      h4Title: "按味道排，不按酒吧，也不按日期。",
      h4Body: "内容按酒的味型排列，不按地点或日期。开头比较清爽，往后越来越浓、越来越烈，接近一个夜晚的节奏。按街区或日期整理会更省事，但和阅读体验关系不大。",
      chapters: [
        { label: "第 00 章", body: "介绍这本书和它的视觉做法，这套做法来自孔版印刷里手绘设计的传统。" },
        { label: "正文", tastes: ["酸", "甜", "苦", "辣", "咸"], body: "一种味道一章。每杯酒都有名字、酒吧和地址、关于味道和空间的一段话、我自己拍的照片，还有一张画氛围的插画。" },
        { label: "结尾", body: "关于书里那些夜晚的一些后话，外加一张标了所有酒吧的地图，可以照着再走一遍。" }
      ]
    },
    format: {
      kicker: "开本",
      title: "尺寸接近酒单，可以随手带走，也正好容得下一杯酒。",
      lead: "10 × 20 cm 接近一张酒单的尺寸，竖长的页面比方形更衬一只杯子。用线缝而不是打孔上环，所以左页可以做满版出血。",
      specs: [
        { term: "尺寸", value: "10 × 20 cm" },
        { term: "开向", value: "竖版" },
        { term: "印刷", value: "孔版印刷" },
        { term: "篇幅", value: "24 个跨页" },
        { term: "装订", value: "手工缝线" }
      ],
      referenceAlt: "两本参考小册子：一本线装的摊开着，一本是打孔上环的食谱册"
    },
    posters: {
      kicker: "海报",
      title: "清醒的时候，我就不浪漫了。",
      lead: "两张宣传海报沿用书里的画法，但把信息层去掉了，所以全靠线条自己撑住。",
      alts: [
        "Alcohol Directory 海报：粉底上两个人影，在一本黄色的书后面读着什么",
        "Alcohol Directory 海报：白底上用孔版颜色画的一桌酒"
      ]
    },
    spreads: {
      kicker: "所有跨页",
      title: "二十五个跨页，五个味道章节。",
      lead: "全部摊开后，可以看出统一的版式，也能看到每杯酒各自的颜色。五个味道章节都有独立的章节页。",
      alts: [
        "黑底上排成网格的十五个 Alcohol Directory 跨页",
        "黑底上排成网格的另外十个跨页，其中包括几张味道章节页"
      ]
    },
    reflection: {
      kicker: "反思",
      title: "成品做出来了，但目前没法大量复制。",
      items: [
        { label: "局限", body: "手工缝线决定了只能做几本。再多就需要另一种装订方式，我还没想好；而便宜的那几种，大多会吃掉左页。" },
        { label: "取舍", body: "按味道排，让这本书很适合从头读到尾，却很不适合当工具书查。想找某一家酒吧，你得先想起自己在那儿喝了什么。" },
        { label: "下一步", body: "书末那张地图应该做成可以抽出来的折页，而不是一页纸，这样出门去第一家酒吧的路上能把它揣进兜里。" }
      ]
    }
  }
}

export default function AlcoholProjectPage({ track = "uiux", locale = "en" }) {
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
              title="Alcohol Directory"
              image={img("de2adde594c13411e1b6edfae73dc2b71177dad0.png")}
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
            <ProjectQuickNav slug="alcohol" track={track} locale={locale} />
            {/* The book opens the body. It is the strongest thing on the page
                and should not need a scroll to find. */}
            <section id="book" className={styles.caseSection}>
              {/* The kicker sits on its own line so the button can align with the
                  top of the heading rather than with the label above it. */}
              <div className={styles.bookHeader}>
                <p className={styles.kicker}>{t.book.kicker}</p>
                <div className={styles.bookHeaderRow}>
                  <div className={styles.bookHeaderCopy}>
                    <h2 className={styles.sectionTitle}>{t.book.title}</h2>
                    <p className={styles.sectionLead}>{t.book.lead}</p>
                  </div>

                  <a className={styles.bookLink} href={BOOK_SRC} target="_blank" rel="noreferrer">
                    {t.book.open} <span aria-hidden="true">&#8594;</span>
                  </a>
                </div>
              </div>

              <div className={styles.bookFrame}>
                <iframe
                  className={styles.bookViewport}
                  src={BOOK_SRC}
                  title={t.book.frameTitle}
                  loading="lazy"
                />
              </div>
            </section>

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

            <section id="direction" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.direction.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.direction.title}</h2>
                  <p className={styles.sectionLead}>{t.direction.lead}</p>
                </div>
              </div>

              <figure className={styles.moodboard}>
                <img
                  src={img("c66b6d63ee8d99d60a454d4882a393ae06051d1e.png")}
                  alt={t.direction.boardAlt}
                  width="3840"
                  height="2160"
                  loading="lazy"
                />
              </figure>

              <div className={styles.directionGrid}>
                {t.direction.items.map((direction) => (
                  <article key={direction.label}>
                    <h3>{direction.label}</h3>
                    <p>{direction.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Highlights rather than decisions: the things that are true of the
                object itself, in the order they matter to someone holding it. */}
            <section id="highlights" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.highlights.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.highlights.title}</h2>
                </div>
              </div>

              <article className={styles.highlight}>
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>{t.highlights.h1Label}</p>
                  <h3>{t.highlights.h1Title}</h3>
                  <p>{t.highlights.h1Body}</p>
                </div>
                <figure className={styles.highlightVisual}>
                  <img
                    src="/alcohol/making.webp"
                    alt={t.highlights.h1Alt}
                    width="1800"
                    height="1350"
                    loading="lazy"
                  />
                </figure>
              </article>

              <article className={styles.highlight} data-layout="reverse">
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>{t.highlights.h2Label}</p>
                  <h3>{t.highlights.h2Title}</h3>
                  <p>{t.highlights.h2P1}</p>
                  <p>{t.highlights.h2P2}</p>
                </div>
                <figure className={styles.highlightVisual}>
                  <img
                    src={img("b888c714deb12399e0ae32a3e4af79963c30fa7d.png")}
                    alt={t.highlights.h2Alt}
                    width="6000"
                    height="4500"
                    loading="lazy"
                  />
                </figure>
              </article>

              <article className={styles.highlight}>
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>{t.highlights.h3Label}</p>
                  <h3>{t.highlights.h3Title}</h3>
                  <p>{t.highlights.h3P1}</p>
                  <p>{t.highlights.h3P2}</p>
                </div>
                <figure className={styles.highlightVisual}>
                  <div className={styles.photoPair}>
                    {sourcePhotos.map((photo) => (
                      <img
                        key={photo.src}
                        src={photo.src}
                        alt={t.highlights.photoAlts[photo.key]}
                        width={photo.w}
                        height={photo.h}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </figure>
              </article>

              <article className={styles.highlight} data-layout="wide">
                <div className={styles.highlightCopy}>
                  <p className={styles.microLabel}>{t.highlights.h4Label}</p>
                  <h3>{t.highlights.h4Title}</h3>
                  <p>{t.highlights.h4Body}</p>
                </div>

                <div className={styles.chapters}>
                  {t.highlights.chapters.map((chapter) => (
                    <div className={styles.chapter} key={chapter.label}>
                      <p className={styles.microLabel}>{chapter.label}</p>
                      {chapter.tastes && (
                        <ul className={styles.tastes}>
                          {chapter.tastes.map((taste) => (
                            <li key={taste}>{taste}</li>
                          ))}
                        </ul>
                      )}
                      <p>{chapter.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.format.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.format.title}</h2>
                  <p className={styles.sectionLead}>{t.format.lead}</p>
                </div>
              </div>

              <div className={styles.formatLayout}>
                <dl className={styles.specs}>
                  {t.format.specs.map((spec) => (
                    <div key={spec.term}>
                      <dt>{spec.term}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <figure className={styles.references}>
                  <img
                    src={img("cc07e1c793e245a6d402323bc92aad29b2d2bad6.png")}
                    alt={t.format.referenceAlt}
                    width="681"
                    height="492"
                    loading="lazy"
                  />
                </figure>
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.posters.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.posters.title}</h2>
                  <p className={styles.sectionLead}>{t.posters.lead}</p>
                </div>
              </div>

              <div className={styles.posterPair}>
                {[img("987381382328bb7c55d8c7f932121000a73234a5.png"), img("017f7012c1c9f1131c319d0b9c26e5b2aa45eb18.png")].map((src, index) => (
                  <figure key={src}>
                    <img src={src} alt={t.posters.alts[index]} width="595" height="842" loading="lazy" />
                  </figure>
                ))}
              </div>
            </section>

            <section id="spreads" className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>{t.spreads.kicker}</p>
                <div>
                  <h2 className={styles.sectionTitle}>{t.spreads.title}</h2>
                  <p className={styles.sectionLead}>{t.spreads.lead}</p>
                </div>
              </div>

              <div className={styles.bookGrids}>
                {[img("c6bb85e5adf83cf08f8c9093a3e096d4fe83dcbc.jpg"), img("1a49a56a595edf30f54b00a5547d495e074389b7.jpg")].map((src, index) => (
                  <figure key={src}>
                    <img src={src} alt={t.spreads.alts[index]} width="2000" height="1125" loading="lazy" />
                  </figure>
                ))}
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

            <ProjectNav slug="alcohol" track={track} locale={locale} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.moodboard}, .${styles.highlightVisual}, .${styles.references}, .${styles.posterPair} figure, .${styles.bookGrids} figure, .${styles.caseSection}`}
        />

        <SiteFooter locale={locale} />
      </div>
    </main>
  )
}
