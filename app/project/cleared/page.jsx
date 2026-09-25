import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import CaseVideo from "./CaseVideo"
import { PrototypePreview } from "./PrototypePreview"
import { SuggestionCard } from "./SuggestionCard"
import styles from "./page.module.css"

export const metadata = {
  title: "AI Calendar",
  description:
    "An AI-assisted Calendar concept tested with simulated data. Participants understood the scheduling actions, while four returned to the source email to verify the AI's interpretation."
}

const prototypeUrl = "/cleared/calendar-assistant-prototype.html?v=20260918-review"

/*
 * Every line of prose on the page, in both languages. The English is
 * unchanged, lifted out of the JSX as it stood; the Chinese carries the
 * same claims and the same limits - "concept", "simulated data", the four
 * participants who went back to the email, and the note that the test
 * validated neither AI accuracy nor real-world time saved.
 */
const copy = {
  en: {
    hero: {
      pill: "Independent case study",
      context: "Product · UI/UX · 2026",
      titleA: "Google Calendar:",
      titleB: "AI-assisted planning.",
      lead: "Turning email commitments into calendar suggestions people can inspect, adjust and confirm.",
      challengeLabel: "The challenge",
      challenge: "Fit email commitments around a changing workday.",
      contributionLabel: "My contribution",
      contribution: "Product framing, desktop + mobile UI, and interactive prototyping.",
      statusLabel: "Status",
      status: "Concept · Usability tested · Simulated data",
      resultLabel: "Result",
      result: "Participants understood the scheduling action; four returned to the source email to verify the AI's interpretation.",
      roleLabel: "Role",
      role: "Product Designer",
      timelineLabel: "Timeline",
      timeline: "8 weeks",
      platformLabel: "Platform",
      platform: "Desktop + mobile",
      actionExplore: "Explore the design",
      actionPrototype: "Open desktop prototype",
      cardCaption: "The prototype’s suggestion card, on sample data. See what the assistant read, add the block, undo it."
    },
    context: {
      kicker: "01 / The starting point",
      heading: "An email gives a deadline, not a plan.",
      userLabel: "Target user hypothesis",
      userLead: "People coordinating client work through email and a busy calendar.",
      userBody: "I explored a review step between an email request and a calendar booking, where people can check the source, estimate effort and choose a time.",
      taskLabel: "Illustrative task",
      quote: "“Could you send the revised quote by end of week?”",
      taskBody: "How much time does it need, and where will it fit?",
      refPrefix: "Product references: ",
      refGemini: "Gemini in Gmail",
      refAnd: " and ",
      refEvents: "events from Gmail"
    },
    experience: {
      kicker: "02 / Three design choices",
      heading: "Keep context, evidence and control together.",
      tradeoffLabel: "The trade-off",
      decisions: [
        { label: "01 / Context", title: "Compare the change before moving the task.", body: "I kept the conflict and proposed time in the week view so people can judge the change against the rest of their day.", tradeoff: "More calendar context adds visual density. The notice focuses on the affected task.", video: "desktop-replan", alt: "Desktop Calendar: review a meeting conflict and confirm moving the quote work to 16:00" },
        { label: "02 / Evidence", title: "Keep the email beside the suggestion.", body: "I put the source email beside time and duration so people can check the recommendation without leaving the calendar.", tradeoff: "Opening the full email adds a step, so the key request is shown first.", video: "desktop-source", alt: "Desktop Calendar: open a quote suggestion and inspect the original email" },
        { label: "03 / Control", title: "Let people choose the final time.", body: "I kept scheduling under individual review. Choosing an alternative slot adds the event, updates the pending count and exposes Undo.", tradeoff: "Choosing a slot currently confirms it immediately. A separate preview and confirmation is the next variant to test.", video: "desktop-confirm", alt: "Desktop Calendar: choose an alternative time, confirm the event and see the Undo action" }
      ]
    },
    trust: {
      kicker: "03 / AI & trust",
      heading: "Make the assumption visible.",
      lead: "I changed the deadline label after finding that an inferred time looked like a fact from the email.",
      emailLabel: "Email request",
      emailValue: "“By end of week”",
      emailNote: "No exact time specified.",
      beforeLabel: "Earlier label",
      beforeValue: "Friday, 18:00",
      beforeNote: "Presented as extracted from the email.",
      afterLabel: "Revised desktop label",
      afterValue: "Friday, 18:00",
      afterBadge: "Inferred",
      afterNote: "An assumption to check with the sender.",
      notePrefix: "Recordings and mobile screens show the earlier wording; the ",
      noteLink: "desktop prototype",
      noteSuffix: " includes the revised labels."
    },
    mobile: {
      kicker: "04 / Mobile high fidelity",
      heading: "Focus on one scheduling decision at a time.",
      lead: "I adapted the desktop week view into a day view and bottom sheet, keeping the current task and surrounding events together.",
      summary: "Six mobile screens",
      openFull: "Open full size",
      openAria: (n, caption) => `Open mobile screen ${n} at full size: ${caption}`,
      screens: [
        ["phone1.png", "Distinguish suggestions from bookings."],
        ["phone2.png", "Check the source email."],
        ["phone3.png", "Adjust time and duration."],
        ["phone4.png", "Confirm, with Undo available."],
        ["phone5.png", "Review a scheduling conflict."],
        ["phone6.png", "Keep unresolved conflicts visible."]
      ]
    },
    prototype: {
      kicker: "05 / Interactive prototype",
      heading: "Try a planning decision.",
      summary: "Explore three more desktop interactions",
      interactionLabel: "Interaction / ",
      demos: [
        { video: "desktop-duration", title: "Ask for the missing duration.", body: "Choose a duration, preview the block and confirm it in the calendar.", alt: "Choose a half-day duration for Draft the Q3 outline and add the task to the desktop calendar" },
        { video: "desktop-preferences", title: "Review a preference before saving it.", body: "Confirm a morning scheduling preference before it becomes a rule. History and percentages use sample data.", alt: "Confirm a morning scheduling preference in the desktop assistant settings" },
        { video: "desktop-direct", title: "Keep direct calendar editing available.", body: "Drag an existing meeting; its time updates and Undo appears.", alt: "Drag an existing meeting in the desktop week view and see the updated time" }
      ]
    },
    validation: {
      kicker: "06 / Evaluation & iteration",
      heading: "Clear actions, with a need to verify the AI's interpretation.",
      lead: "Understanding the scheduling action did not automatically create confidence in the AI's interpretation.",
      participantsLabel: "Participants",
      participants: "I invited students and working professionals who frequently used calendar and task-planning apps. Participants had an established habit of recording events and planning daily tasks, with experience across Google Calendar and other planning tools.",
      findings: [
        { title: "Actions and states were clear", status: "Observed in usability testing", response: "Participants understood how to add a suggestion to the calendar and could distinguish pending suggestions from confirmed events." },
        { title: "Source verification remained necessary", status: "Observed behavior", response: "Four participants returned to the source email to read it carefully and check whether the AI had understood the request correctly." },
        { title: "Make the evidence easier to inspect", status: "Next iteration", response: "The next iteration will make the existing source evidence easier to inspect, give inferred deadlines and estimated durations clearer labels, and keep editing and email access close to the suggestion. These refinements still need to be tested." }
      ],
      limit1: "I interpreted the return to the source email as a need for more visible evidence before relying on the recommendation. The goal is to help people verify the recommendation when needed, not to eliminate source checking.",
      limit2: "The prototype uses simulated data and is not connected to live email or calendars. This usability test did not validate backend AI accuracy or real-world time savings.",
      note: "Independent concept based on public Google Workspace documentation. Not affiliated with Google."
    }
  },
  zh: {
    hero: {
      pill: "独立案例",
      context: "产品 · UI/UX · 2026",
      titleA: "Google 日历：",
      titleB: "用 AI 整理待办并安排时间。",
      lead: "AI 从邮件里读出待办，给出一条可以核对、调整和确认的日程建议。",
      challengeLabel: "挑战",
      challenge: "邮件里答应下来的事，怎么放进已经排满、还会不断变化的日程里？",
      contributionLabel: "我做了什么",
      contribution: "产品定义、桌面端和移动端界面，以及可交互原型。",
      statusLabel: "状态",
      status: "概念 · 做过可用性测试 · 模拟数据",
      resultLabel: "结果",
      result: "参与者都能看懂建议并完成排期，但其中 4 位会回看原始邮件，确认 AI 有没有理解对。",
      roleLabel: "角色",
      role: "产品设计师",
      timelineLabel: "周期",
      timeline: "8 周",
      platformLabel: "平台",
      platform: "桌面端 + 移动端",
      actionExplore: "看看这套设计",
      actionPrototype: "打开桌面端原型",
      cardCaption: "这张建议卡使用示例数据。你可以查看助手读到了什么、把时间加进日历，也可以撤销。"
    },
    context: {
      kicker: "01 / 起点",
      heading: "邮件只说什么时候交，不会替你排出什么时候做。",
      userLabel: "目标用户假设",
      userLead: "主要靠邮件沟通、日历又常常排满的客户工作者。",
      userBody: "我在「邮件提出请求」和「日历真正排进去」之间加了一步核对：先回看原文、估算时长，再自己选时间。",
      taskLabel: "举例任务",
      quote: "「这周内能把改好的报价发我吗？」",
      taskBody: "这件事要花多久，又该塞在哪？",
      refPrefix: "产品参考：",
      refGemini: "Gmail 里的 Gemini",
      refAnd: "、",
      refEvents: "从 Gmail 生成日程"
    },
    experience: {
      kicker: "02 / 三个设计选择",
      heading: "三个重点：看得到上下文、查得到依据，最后由人决定。",
      tradeoffLabel: "取舍",
      decisions: [
        { label: "01 / 上下文", title: "先看清改动会影响什么。", body: "冲突和建议时间都会留在周视图里，用户可以和当天其他安排放在一起比较，再决定要不要调整。", tradeoff: "上下文越多，日历越拥挤，所以提示只强调受影响的那件事。", video: "desktop-replan", alt: "桌面端日历：查看会议冲突，确认把报价的工作挪到 16:00" },
        { label: "02 / 依据", title: "把邮件放在建议旁边。", body: "我把原始邮件放在时间和时长边上，这样不用离开日历，就能核对这条建议靠不靠谱。", tradeoff: "展开完整邮件多了一步，所以最关键的那句请求先显示出来。", video: "desktop-source", alt: "桌面端日历：打开一条报价建议，查看原始邮件" },
        { label: "03 / 控制权", title: "最后选哪个时间，还是由人决定。", body: "排期不会自动完成。用户选好时间后，日程才会加入日历，待处理数量随之更新，同时提供撤销。", tradeoff: "当前版本选中时间段后会直接确认。下一版会把预览和确认拆成两步再测试。", video: "desktop-confirm", alt: "桌面端日历：选一个替代时间，确认日程，并看到撤销按钮" }
      ]
    },
    trust: {
      kicker: "03 / AI 与信任",
      heading: "AI 猜出来的时间，不能装成邮件里写过的。",
      lead: "原来的标签让推断出的截止时间看起来像邮件原文。我后来给它加上了明确的「推断」标记。",
      emailLabel: "邮件里的请求",
      emailValue: "「这周内」",
      emailNote: "没有写具体时间。",
      beforeLabel: "改之前的标签",
      beforeValue: "周五 18:00",
      beforeNote: "看起来像是从邮件里摘出来的。",
      afterLabel: "改之后的桌面端标签",
      afterValue: "周五 18:00",
      afterBadge: "推断",
      afterNote: "这是一个假设，需要跟发件人确认。",
      notePrefix: "录屏和移动端截图用的还是旧写法；",
      noteLink: "桌面端原型",
      noteSuffix: "里是改过的标签。"
    },
    mobile: {
      kicker: "04 / 移动端高保真",
      heading: "移动端一次只处理一个排期决定。",
      lead: "桌面端的周视图到了手机上，变成日视图加底部抽屉。当前任务和前后的日程仍然放在一起。",
      summary: "六张移动端界面",
      openFull: "看大图",
      openAria: (n, caption) => `查看第 ${n} 张移动端界面的大图：${caption}`,
      screens: [
        ["phone1.png", "把建议和已定的日程区分开。"],
        ["phone2.png", "核对原始邮件。"],
        ["phone3.png", "调整时间和时长。"],
        ["phone4.png", "确认，并保留撤销。"],
        ["phone5.png", "处理一次排期冲突。"],
        ["phone6.png", "让没解决的冲突一直看得见。"]
      ]
    },
    prototype: {
      kicker: "05 / 可交互原型",
      heading: "在原型里亲手排一次。",
      summary: "再看三个桌面端交互",
      interactionLabel: "交互 / ",
      demos: [
        { video: "desktop-duration", title: "缺时长，就问一句。", body: "选一个时长，预览这段时间，再确认加进日历。", alt: "为「起草 Q3 提纲」选择半天的时长，并把任务加进桌面端日历" },
        { video: "desktop-preferences", title: "偏好变成规则前，先确认一次。", body: "先确认「习惯排在上午」这条偏好，再把它保存成规则。历史记录和百分比使用示例数据。", alt: "在桌面端助手设置里确认「习惯把日程排在上午」" },
        { video: "desktop-direct", title: "直接改日历的路留着。", body: "拖动一个已有的会议，时间随之更新，撤销也会出现。", alt: "在桌面端周视图里拖动一个已有会议，看到更新后的时间" }
      ]
    },
    validation: {
      kicker: "06 / 评估与迭代",
      heading: "大家会操作，但不会直接相信 AI 的理解。",
      lead: "知道怎么排期是一回事，愿不愿意相信 AI 读对了邮件是另一回事。",
      participantsLabel: "参与者",
      participants: "参与者是平时会用日历和任务管理工具的学生与上班族。他们有记录日程、安排每日任务的习惯，用过 Google 日历，也用过其他规划工具。",
      findings: [
        { title: "动作和状态都清楚", status: "可用性测试中观察到", response: "参与者知道怎么把一条建议加进日历，也能分清哪些是待处理的建议、哪些是已确认的日程。" },
        { title: "核对原文这一步省不掉", status: "观察到的行为", response: "有 4 位参与者回头仔细读了原始邮件，确认 AI 有没有正确理解请求。" },
        { title: "下一版要让依据更好找", status: "下一轮迭代", response: "下一版会把原文依据放得更显眼，明确标出推断的截止时间和预估时长，并把编辑和打开邮件的入口移到建议附近。这些改动还没有经过测试。" }
      ],
      limit1: "4 位参与者回看邮件，说明他们在采纳建议前需要更清楚的依据。设计目标不是阻止核对，而是让需要核对时能更快找到原文。",
      limit2: "原型用的是模拟数据，没有接真实的邮箱和日历。这次可用性测试既没有验证后端 AI 的准确率，也没有验证真实场景里省下多少时间。",
      note: "基于 Google Workspace 公开文档做的独立概念，与 Google 无关联。"
    }
  }
}

function DesktopDemo({ name, label, priority = false, className }) {
  return <CaseVideo className={className}
    src={`/cleared/media/${name}-loop.mp4`}
    poster={`/cleared/media/${name}-poster.webp`}
    width={1468} height={918} label={label} priority={priority} />
}

export default function ClearedPage({ track = "uiux", locale = "en" }) {
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
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>
                <span className={styles.pill}>{t.hero.pill}</span>
                <span>{t.hero.context}</span>
              </div>
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>{t.hero.titleA}<br />{t.hero.titleB}</h1>
              <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
                {t.hero.lead}
              </p>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>{t.hero.challengeLabel}</dt><dd>{t.hero.challenge}</dd></div>
                <div><dt>{t.hero.contributionLabel}</dt><dd>{t.hero.contribution}</dd></div>
                <div><dt>{t.hero.statusLabel}</dt><dd>{t.hero.status}</dd></div>
                <div><dt>{t.hero.resultLabel}</dt><dd>{t.hero.result}</dd></div>
              </dl>
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>{t.hero.roleLabel}</dt><dd>{t.hero.role}</dd></div>
                <div><dt>{t.hero.timelineLabel}</dt><dd>{t.hero.timeline}</dd></div>
                <div><dt>{t.hero.platformLabel}</dt><dd>{t.hero.platform}</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <a className={styles.action} href="#experience">{t.hero.actionExplore} <span aria-hidden="true">↓</span></a>
                <a className={styles.textLink} href={prototypeUrl} target="_blank" rel="noreferrer">{t.hero.actionPrototype} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            {/* The hero is the product's own suggestion card rather than a
                recording of it: the three moves the case study is about can
                be made right here. Its own labels stay English on every
                locale - it is the designed artifact, the same as the
                screenshots and the recordings further down, and it would
                read oddly against them in translation. Only the caption
                around it follows the reader's language. */}
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <SuggestionCard caption={t.hero.cardCaption} />
            </div>
          </header>

          <ProjectQuickNav slug="cleared" track={track} locale={locale} />

          <section id="context" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.context.kicker}</p>
              <h2>{t.context.heading}</h2>
            </div>
            <div className={styles.contextGrid}>
              <div>
                <p className={styles.microLabel}>{t.context.userLabel}</p>
                <p className={styles.bodyLead}>{t.context.userLead}</p>
                <p>{t.context.userBody}</p>
              </div>
              <div className={styles.scenario}>
                <p className={styles.microLabel}>{t.context.taskLabel}</p>
                <blockquote>{t.context.quote}</blockquote>
                <p>{t.context.taskBody}</p>
              </div>
            </div>
            <p className={styles.sourceNote}>
              {t.context.refPrefix}<a href="https://support.google.com/mail/answer/14355636" target="_blank" rel="noreferrer">{t.context.refGemini}</a>{t.context.refAnd}
              <a href="https://support.google.com/calendar/answer/6084018" target="_blank" rel="noreferrer">{t.context.refEvents}</a>。
            </p>
          </section>

          <section id="experience" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.experience.kicker}</p>
              <h2>{t.experience.heading}</h2>
            </div>
            <div className={styles.decisionList}>
              {t.experience.decisions.map((decision) => (
                <article className={styles.decision} key={decision.video}>
                  <div className={styles.decisionCopy}>
                    <div className={styles.decisionSummary}>
                      <p className={styles.microLabel}>{decision.label}</p>
                      <h3>{decision.title}</h3>
                      <p>{decision.body}</p>
                    </div>
                    <dl className={styles.reasoning}>
                      <div><dt>{t.experience.tradeoffLabel}</dt><dd>{decision.tradeoff}</dd></div>
                    </dl>
                  </div>
                  <DesktopDemo
                    className={styles.decisionVideo}
                    name={decision.video}
                    label={decision.alt}
                  />
                </article>
              ))}
            </div>
          </section>

          <section id="trust" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.trust.kicker}</p>
              <h2>{t.trust.heading}</h2>
              <p className={styles.sectionLead}>{t.trust.lead}</p>
            </div>
            <div className={styles.trustExample}>
              <div><span className={styles.microLabel}>{t.trust.emailLabel}</span><p>{t.trust.emailValue}</p><span>{t.trust.emailNote}</span></div>
              <div><span className={styles.microLabel}>{t.trust.beforeLabel}</span><p>{t.trust.beforeValue}</p><span>{t.trust.beforeNote}</span></div>
              <div><span className={styles.microLabel}>{t.trust.afterLabel}</span><p>{t.trust.afterValue} <small>{t.trust.afterBadge}</small></p><span>{t.trust.afterNote}</span></div>
            </div>
            <p className={styles.sourceNote}>{t.trust.notePrefix}<a href={prototypeUrl} target="_blank" rel="noreferrer">{t.trust.noteLink}</a>{t.trust.noteSuffix}</p>
          </section>

          <section id="mobile-ui" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.mobile.kicker}</p>
              <h2>{t.mobile.heading}</h2>
              <p className={styles.sectionLead}>{t.mobile.lead}</p>
            </div>
            <details className={styles.screenDetails} open>
              <summary>{t.mobile.summary}</summary>
              <div className={styles.screensGrid}>
                {t.mobile.screens.map(([file, caption], index) => (
                  <figure key={file}>
                    <a href={`/cleared/${file}`} target="_blank" rel="noreferrer" aria-label={t.mobile.openAria(index + 1, caption)}>
                      <img src={`/cleared/${file}`} alt={caption} width="834" height="1752" loading="lazy" />
                      <span className={styles.imageLink}>{t.mobile.openFull} <span aria-hidden="true">↗</span></span>
                    </a>
                    <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{caption}</figcaption>
                  </figure>
                ))}
              </div>
            </details>
          </section>

          <section id="prototype" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.prototype.kicker}</p>
              <h2>{t.prototype.heading}</h2>
            </div>
            <PrototypePreview locale={locale} />
            <details id="more-interactions" className={styles.moreDetails}>
              <summary>{t.prototype.summary}</summary>
              <div className={styles.additionalDemos}>
                {t.prototype.demos.map((demo, index) => (
                  <article key={demo.video} className={styles.additionalDemo}>
                    <div className={styles.additionalCopy}>
                      <p className={styles.microLabel}>{t.prototype.interactionLabel}{String(index + 1).padStart(2, "0")}</p>
                      <h3>{demo.title}</h3>
                      <p>{demo.body}</p>
                    </div>
                    <DesktopDemo name={demo.video} label={demo.alt} />
                  </article>
                ))}
              </div>
            </details>
          </section>

          <section id="validation" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.validation.kicker}</p>
              <h2>{t.validation.heading}</h2>
              <p className={styles.sectionLead}>{t.validation.lead}</p>
            </div>
            <div className={styles.participants}>
              <p className={styles.microLabel}>{t.validation.participantsLabel}</p>
              <p>{t.validation.participants}</p>
            </div>
            <div className={styles.validationGrid}>
              {t.validation.findings.map((item) => (
                <article key={item.title}>
                  <p className={styles.microLabel}>{item.status}</p>
                  <h3>{item.title}</h3>
                  <p>{item.response}</p>
                </article>
              ))}
            </div>
            <p className={styles.limitNote}>{t.validation.limit1}</p>
            <p className={styles.limitNote}>{t.validation.limit2}</p>
            <p className={styles.sourceNote}>{t.validation.note}</p>
          </section>
          <ProjectNav slug="cleared" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
