import { ProjectHero } from "../../../components/ProjectHero"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import { projectShareCard } from "../../../lib/share"

import styles from "./page.module.css"

export const metadata = {
  title: "Graveyard",
  description:
    "An interactive archive that visualizes how censored language adapts, survives, and carries cultural memory.",
  ...projectShareCard("graveyard", {
    title: "Graveyard",
    description:
      "An interactive archive that visualizes how censored language adapts, survives, and carries cultural memory.",
    alt: "Graveyard: browser windows laid out on a laptop"
  })
}

const prototypeUrl = "https://graveyard.framer.website/?editSite"

/*
 * Every line of prose on the page, in both languages. The English is
 * exactly what it has always been, moved out of the JSX unchanged; the
 * Chinese is a translation, not a second draft, so the two say the same
 * things in the same order. Structure, classes and layout below are
 * untouched - only the strings come from here now.
 */
const copy = {
  en: {
    hero: {
      label: "Student Work",
      discipline: "Web Design · 2025",
      imageAlt: "Graveyard project cover",
      summary: "An interactive archive that visualizes how censored language adapts, survives, and carries cultural memory.",
      problem: "Digital censorship can erase language while leaving its social and political traces unseen.",
      contribution: "Research, information architecture, visual design, and web prototyping.",
      outcome: "A digital memorial where altered words become evidence of creativity and resistance.",
      role: "Interaction Designer",
      scope: "Research · IA · Visual Design · Web Prototype",
      platform: "Web",
      timeline: "8 weeks",
      action: "Try the experience"
    },
    problem: {
      kicker: "Current problem",
      heading: "Censored Language in the Digital Age",
      figureAlt: "Censored language reference archive",
      body: "In today’s digital world, language is no longer completely free. Many words have been banned or restricted on the internet, especially on social media platforms. To continue expressing ideas and emotions, people have started to create new ways of communication—using alternative spellings, homophones, symbols, or visual metaphors to replace the censored words. This constant adaptation shows how language evolves under control and how users resist silence through creativity. “Graveyard” explores this phenomenon by collecting and visualizing these “dead” or hidden words, revealing how censorship shapes online expression and cultural memory."
    },
    research: {
      kicker: "Research",
      heading: "What We Can’t Say",
      imageAlt: "Graveyard research board",
      p1: "Our research investigates how censorship transforms online language across different countries. By collecting examples of banned or restricted words, we trace how people adapt their expression to survive within controlled digital environments.",
      p2: "In China, users replace sensitive terms with homophones, emojis, or coded slang to evade platform filters. Words like 64, VPN, or President’s name are replaced with phonetically similar phrases or abbreviations. In other regions, such as Russia or the U.S., political and cultural keywords are quietly removed or shadow-banned from public discourse.",
      p3: "Through these substitutions, language becomes a living archive of resistance — a creative system that reveals both constraint and agency. Graveyard visualizes this phenomenon as a digital memorial, where “dead” words are not forgotten but reborn through adaptation, reflecting how censorship shapes the evolution of culture and communication online."
    },
    concept: {
      kicker: "Concept",
      heading: "Introduction",
      p1: "Graveyard is an interactive research-based platform that explores how censorship reshapes online language. In the digital world, many words have been banned, hidden, or replaced by algorithmic systems that decide what can be said. Yet people continue to resist — inventing new forms of expression through homophones, emojis, symbols, and codes. These “buried” words form a linguistic graveyard where meaning survives through disguise.",
      p2: "The website is designed as a digital archive rather than a traditional database. Inspired by the structure of filing cabinets, information is organized into drawers that group censored words by different themes, regions, or platforms.",
      p3: "The interaction is intentionally simple and intuitive. Each drawer acts as an entry point into a collection of archived words. Opening a drawer reveals original terms, alternative expressions, contextual information, and related references.",
      p4: "By navigating between drawers, users can compare how similar ideas evolve across different cultures and digital environments."
    },
    experience: {
      kicker: "Experience",
      heading: "Information Architecture",
      p1: "The website organizes information through a filing cabinet metaphor. Each drawer contains a collection of related words, allowing users to navigate naturally between different topics instead of following a linear reading experience. Browsing the archive is designed to feel like uncovering forgotten records. Opening each drawer reveals original words, substituted expressions, and supporting references, encouraging users to compare how language changes across different regions and platforms.",
      p2: "Interactions remain intentionally simple. Users select a drawer, explore the archived entries, and continue navigating through related content. The interface avoids unnecessary complexity, allowing the archive itself to become the focus of the experience."
    },
    visual: {
      kicker: "Visual design",
      heading: "Design System",
      imageAlt: "Graveyard interface design system",
      p1: "The interface references archival systems through structured layouts, restrained typography, and generous white space. The minimal visual style allows the content to remain the primary focus while reinforcing the idea of digital preservation.",
      p2: "Consistent typography, spacing, and interaction patterns create a unified browsing experience. Every visual element supports readability and encourages users to focus on the archived language rather than decorative graphics."
    },
    videoTitle: "Graveyard walkthrough video",
    cta: "Click here to try"
  },
  zh: {
    hero: {
      label: "学生作品",
      discipline: "网页设计 · 2025",
      imageAlt: "Graveyard 项目封面",
      summary: "一个关于网络审查语言的交互档案，记录被限制的词，以及人们为了继续表达而造出的替代说法。",
      problem: "一个词被删除或限制后，和它有关的社会、政治语境也很容易一起消失。",
      contribution: "调研、信息架构、视觉设计和网页原型。",
      outcome: "最终做成一座数字纪念馆，保存原词、替代说法和相关语境。",
      role: "交互设计师",
      scope: "调研 · 信息架构 · 视觉设计 · 网页原型",
      platform: "网页",
      timeline: "8 周",
      action: "去试试"
    },
    problem: {
      kicker: "当下的问题",
      heading: "被限制的词，往往会换一种写法继续出现",
      figureAlt: "被审查语言的参考档案",
      body: "在一些网络平台上，特定词语会被删除、限流或替换。为了继续表达，人们会改拼写、用谐音、符号或图像来代替原词。Graveyard 收集这些被限制的词和随之出现的替代说法，呈现审查怎样改变网络表达，也保存词语背后的语境。"
    },
    research: {
      kicker: "调研",
      heading: "不同网络环境里，人们怎样绕开词语限制",
      imageAlt: "Graveyard 调研板",
      p1: "调研比较了不同国家和平台上的网络审查，收集被删除或限制的词，也记录用户为了绕过限制而改出的新说法。",
      p2: "在中国，用户会用谐音、表情和暗语替换敏感词，绕过平台过滤。像 64、VPN、领导人姓名这类词，会被换成读音相近的短语或缩写。在俄罗斯和美国，一些政治或文化关键词也会被删除，或在公共讨论中受到限流。",
      p3: "这些替代说法既反映了限制，也记录了人们如何继续表达。Graveyard 把原词、替代说法和相关语境放进同一座数字纪念馆，让这些变化不至于随着帖子消失。"
    },
    concept: {
      kicker: "概念",
      heading: "把这些词放进一只可以翻阅的数字文件柜",
      p1: "Graveyard 基于前期调研，把被删除、隐藏或替换的词整理成一个交互档案。原词可能消失了，但谐音、表情、符号和暗号仍然带着原来的意思继续流通。",
      p2: "网站借用文件柜的结构。被审查的词按主题、地区或平台分组，分别放进不同抽屉。",
      p3: "打开抽屉后，可以看到原词、替代说法、上下文和相关引用。交互保持简单，让浏览方式接近翻阅实体档案。",
      p4: "读者可以在抽屉之间来回比较，看看同一个意思在不同文化和网络环境里如何变成不同说法。"
    },
    experience: {
      kicker: "体验",
      heading: "信息按抽屉分组，不要求从头读到尾",
      p1: "每个抽屉收纳一组相关词条，读者可以按主题自由跳转。拉开抽屉后，会依次看到原词、替代说法和参考材料，也能比较不同地区与平台上的变化。",
      p2: "操作只有三步：选抽屉、翻词条、沿相关内容继续查看。我尽量减少额外控件，让注意力留在档案内容上。"
    },
    visual: {
      kicker: "视觉设计",
      heading: "视觉上，我把它做得像一份克制的档案",
      imageAlt: "Graveyard 界面设计系统",
      p1: "界面采用规整的版面、克制的字体和较多留白，呼应文件档案的感觉。装饰被压到很少，重点留给词条和它们的上下文。",
      p2: "字体、间距和交互方式保持统一，方便读者在不同抽屉之间切换时快速找到相同类型的信息。"
    },
    videoTitle: "Graveyard 演示视频",
    cta: "点这里试试"
  }
}

export default function GraveyardPage({ track = "uiux", locale = "en" }) {
  const t = copy[locale] || copy.en

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track, locale)} track={track} locale={locale} />
          {/* The hero animates itself on load (.reveal below); everything
              past it waits until it is scrolled to, so a reader meets each
              section as they reach it rather than finding it already
              played out. */}
          <Reveal fade={`.${styles.section}`} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero label={t.hero.label} discipline={t.hero.discipline} title="Graveyard" image="/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png" imageAlt={t.hero.imageAlt} summary={t.hero.summary} problem={t.hero.problem} contribution={t.hero.contribution} outcome={t.hero.outcome} role={t.hero.role} scope={t.hero.scope} platform={t.hero.platform} timeline={t.hero.timeline} action={{ href: prototypeUrl, label: t.hero.action }} locale={locale} />

            <header hidden className={`${styles.hero} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
              <div className={styles.heroHeader}>
                <div className={styles.heroCopy}>
                  <h1 className={styles.heroTitle}>Graveyard</h1>
                </div>
                <a
                  className={styles.cta}
                  href={prototypeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click here to try <span aria-hidden="true">&#8594;</span>
                </a>
              </div>
            </header>

            <div hidden className={`${styles.imageFull} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
              <img
                src="/framer-assets/images/047a164dabc45a6cc5ce49de9cb5170f6f953d99.png"
                alt="Graveyard project cover"
              />
            </div>

            <p hidden className={`${styles.lead} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
              The project visualizes this evolving relationship between language, censorship, and
              resistance across different cultures. By collecting, categorizing, and reanimating
              these lost or altered words, <em>Graveyard</em> transforms digital silence into a
              space of memory and reflection — asking how speech, politics, and creativity coexist
              in an era of algorithmic control.
            </p>
          </div>

          <div className={styles.bodyContent}>
            <ProjectQuickNav slug="graveyard" track={track} locale={locale} />
            <section id="problem" className={styles.section}>
              <div className={styles.kickerColumn}>
                <h3 className={styles.kicker}>{t.problem.kicker}</h3>
                <div className={styles.figurePortrait}>
                  <img
                    src="/framer-assets/images/230be045efbfe0922d1a7719dc1c67095f348b31.png"
                    alt={t.problem.figureAlt}
                  />
                </div>
              </div>
              <div className={styles.sectionMain}>
                <h2 className={styles.heading}>{t.problem.heading}</h2>
                <p className={styles.body}>{t.problem.body}</p>
              </div>
            </section>

            <section id="research" className={styles.section}>
              <h3 className={styles.kicker}>{t.research.kicker}</h3>
              <h2 className={styles.heading}>{t.research.heading}</h2>
              <p className={styles.body}>{t.research.p1}</p>
              <p className={styles.body}>{t.research.p2}</p>
              <p className={styles.body}>{t.research.p3}</p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/301318464d7023e67f159923f6f3a9a36b859656.png"
                  alt={t.research.imageAlt}
                />
              </div>
            </section>

            <section id="concept" className={styles.section}>
              <h3 className={styles.kicker}>{t.concept.kicker}</h3>
              <h2 className={styles.heading}>{t.concept.heading}</h2>
              <p className={styles.body}>{t.concept.p1}</p>

              <div className={styles.subsection}>
                <p className={styles.body}>{t.concept.p2}</p>
                <p className={styles.body}>{t.concept.p3}</p>
                <p className={styles.body}>{t.concept.p4}</p>
              </div>
            </section>

            <section id="experience" className={styles.section}>
              <h3 className={styles.kicker}>{t.experience.kicker}</h3>
              <h2 className={styles.heading}>{t.experience.heading}</h2>
              <p className={styles.body}>{t.experience.p1}</p>
              <p className={styles.body}>{t.experience.p2}</p>
            </section>

            <section id="visual-design" className={styles.section}>
              <h3 className={styles.kicker}>{t.visual.kicker}</h3>
              <h2 className={styles.heading}>{t.visual.heading}</h2>
              <p className={styles.body}>{t.visual.p1}</p>
              <p className={styles.body}>{t.visual.p2}</p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/23322bba8cb2bef02a4f76491f14039066156dfe.png"
                  alt={t.visual.imageAlt}
                />
              </div>
            </section>

            <div className={`${styles.videoCard} ${styles.reveal}`}>
              <iframe
                src="https://www.youtube.com/embed/QIUnXm6PrHs?start=32"
                title={t.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <a
              className={`${styles.cta} ${styles.reveal}`}
              href={prototypeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t.cta} <span aria-hidden="true">&#8594;</span>
            </a>
          </div>
        </section>

        <SiteFooter className={styles.reveal} locale={locale} />
      </div>
    </main>
  )
}
