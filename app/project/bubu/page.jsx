import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"

import { Receipt } from "./Receipt"
import styles from "./page.module.css"

export const metadata = {
  title: "BUBU",
  description:
    "A weight-loss app for two: buddies log meals as receipts, race each other to a shared goal, and fill one food journal together."
}

/*
 * Both languages of the case study, in the shape the other project pages
 * use: one object per locale, same keys, picked once at render.
 *
 * "Dazi" is the hinge of the whole argument, so the two languages carry it
 * differently on purpose. The English gloss explains the word, because the
 * problem only makes sense once a reader knows how little a dazi pairing
 * asks; the Chinese just says 搭子 and spends the sentence on something a
 * Chinese reader does not already know.
 */
const copy = {
  en: {
    hero: {
      pill: "Self-initiated",
      context: "Product Design · iOS · 2026",
      titleA: "BUBU:",
      titleB: "losing weight in pairs.",
      lead: "Pair with one person on the same timeline, share nothing but what you ate, and finish the same challenge on the same day.",
      challengeLabel: "The challenge",
      challenge: "A diet partner is easy to want and hard to keep, so people spend more effort finding one than following the plan.",
      contributionLabel: "My contribution",
      contribution: "Product framing, interaction design, illustration and the visual system.",
      betLabel: "The bet",
      bet: "Cap the relationship at one subject - food - and give it a start date and an end date, so it has nothing to maintain and nothing to drift out of.",
      statusLabel: "Status",
      status: "In progress · Not yet user-tested",
      roleLabel: "Role",
      role: "Product Designer & Illustrator",
      scopeLabel: "Scope",
      scope: "Product · UI · Illustration",
      platformLabel: "Platform",
      platform: "iOS",
      action: "Read the case",
      heroAlt: "The BUBU challenge home screen: day 12, both players' progress, and today's receipt"
    },
    problem: {
      kicker: "01 / The starting point",
      heading: "A dazi is easy to find and easy to lose.",
      lead: "In China, a dazi (搭子) is a partner for exactly one activity - a lunch dazi, a gym dazi, a concert dazi. What makes it appealing is how little it asks: no friendship to keep up, no obligation past the activity itself.",
      breakLabel: "Why it breaks",
      breakLead: "The same looseness that makes a dazi easy to start makes it impossible to keep.",
      breakBody: "Nothing holds the pairing together, so it quietly stops after a week and the search begins again. People end up spending more energy finding a partner than following the plan the partner was meant to support.",
      dietLabel: "Why dieting is the worst case",
      dietLead: "It needs weeks, a matching schedule, and a witness on exactly the days you least want one.",
      dietBody: "A concert dazi has to survive one evening. A diet dazi has to survive two months, a mismatched starting weight, and the day you would rather nobody saw what you ate.",
      questionLabel: "The design question",
      question: "What is the smallest commitment that can hold two strangers together for eight weeks?"
    },
    bet: {
      kicker: "02 / The bet",
      heading: "Narrow the relationship until there is nothing left to break.",
      lead: "Rather than add features to make the pairing stickier, I took things away until only one shared subject was left.",
      tradeoffLabel: "The trade-off",
      principles: [
        {
          label: "01 / One subject",
          title: "You share food. Nothing else.",
          body: "Your buddy sees what you ate and when. There is no chat thread, no feed, no profile and no display name - both of you are a user id for the length of the challenge.",
          tradeoff: "A message box would make this a social app, and a social app is exactly the upkeep a dazi pairing is meant to avoid."
        },
        {
          label: "02 / A fixed end",
          title: "The challenge ends on a date, not on a decision.",
          body: "You pick 4, 8 or 12 weeks at setup, and both pages count down to the same day. Nobody has to be the one who quits.",
          tradeoff: "A fixed window rules out an open-ended habit tracker. This is a race with a finish line, not a lifelong log."
        },
        {
          label: "03 / Visible absence",
          title: "A missed day prints as a blank.",
          body: "Skipping does not send a nudge or a guilt notification. It leaves an empty dashed frame on the day's receipt, and the counter reads MISSED 1 / 3.",
          tradeoff: "Three blank days in a row ends the challenge for both people. Harsh, but it is the only thing holding the pairing together."
        }
      ]
    },
    match: {
      kicker: "03 / Finding a buddy",
      heading: "Invite someone you know, or match on the three things that decide whether you can finish together.",
      lead: "Matching does not ask for age, city, gender or a photo. It compares the only three facts that affect whether two people can run the same challenge to the end.",
      axes: [
        ["Similar goal", "Both aiming for about the same number of kilograms"],
        ["Similar start", "Close enough in starting weight that the pace is comparable"],
        ["Same end date", "Both challenges close on the same day"]
      ],
      cardLabel: "Your challenge",
      yourGoal: "Your goal",
      theirGoal: "Their goal",
      startsLabel: "Starts",
      starts: "Tomorrow 0:00",
      endsLabel: "Ends",
      ends: "11.17 · 56 days",
      caption: "Three blank days in a row ends the challenge for both of you."
    },
    receipt: {
      kicker: "04 / The daily loop",
      heading: "Photograph the meal; the day closes itself as a receipt.",
      lead: "You shoot the plate, the app cuts it out of its background, and at 23:59 the day seals into a printed receipt. Yours and theirs sit side by side.",
      whyLabel: "Why a receipt",
      why: "A receipt is already read as a day that has been closed and totalled. Sealing it at 23:59 means yesterday cannot be edited to look better, which is what makes the other person's copy worth anything.",
      secondLabel: "The second reason to look",
      second: "Motivation is only half of it. Their receipt is also the most useful answer to “what do I eat tonight” - a real meal, eaten by someone on the same plan, at a time you can compare to your own.",
      note: "The receipts above are drawn in CSS from the product’s own layout. The meal photos are stand-ins from the home screen; in the app they are cut out of their background and printed straight onto the paper."
    },
    report: {
      kicker: "05 / The weekly report",
      heading: "Seven receipts become a spread you both sign.",
      lead: "Every week the daily receipts bind into one journal. Your page and theirs face each other, so a week reads as a single object rather than two separate logs.",
      alt: "The weekly report: two facing journal pages, one per player, each holding seven days of meal photos and notes",
      caption: "Left page is mine, right page is theirs. Missed days stay on the paper as empty frames."
    },
    next: {
      kicker: "06 / Where it stands",
      heading: "The loop is designed. The assumption underneath it is not yet tested.",
      lead: "BUBU is still being built. The screens, the receipt system and the illustration set are done; what is missing is evidence that the core bet holds for anyone other than me.",
      questionLabel: "Open question",
      questions: [
        {
          title: "Does a stranger's receipt push or pressure?",
          body: "The whole product assumes that seeing someone else show up is motivating. It could just as easily read as surveillance on a bad day. This is the first thing to put in front of people."
        },
        {
          title: "Is no messaging at all the right cap?",
          body: "Zero contact is the cleanest version of the idea. It may also be too cold to sustain - a single reaction per receipt might be the minimum warmth needed without turning it into a chat app."
        },
        {
          title: "Is ending after three blank days fair?",
          body: "The rule exists so the pairing cannot quietly rot. Whether it reads as a fair contract or as a punishment for one bad week is a question for testing, not for me."
        }
      ],
      limit: "No usability testing has been run yet, so nothing on this page is a validated outcome. The numbers shown in the screens are sample data."
    }
  },
  zh: {
    hero: {
      pill: "自发项目",
      context: "产品设计 · iOS · 2026",
      titleA: "BUBU：",
      titleB: "两个人一起减脂。",
      lead: "和一个周期相同的人组队，除了吃了什么之外什么都不共享，在同一天一起结束这场挑战。",
      challengeLabel: "挑战",
      challenge: "减脂搭子人人都想要，却很难留住，找搭子花掉的力气经常比执行计划本身还多。",
      contributionLabel: "我做了什么",
      contribution: "产品定义、交互设计、插画，以及整套视觉系统。",
      betLabel: "我的判断",
      bet: "把这段关系收窄到只剩一件事——吃，再给它一个开始日期和一个结束日期。没有需要维护的东西，也就没有可以散掉的东西。",
      statusLabel: "状态",
      status: "进行中 · 还没做用户测试",
      roleLabel: "角色",
      role: "产品设计师 & 插画",
      scopeLabel: "范围",
      scope: "产品 · UI · 插画",
      platformLabel: "平台",
      platform: "iOS",
      action: "开始阅读",
      heroAlt: "BUBU 的挑战主页：第 12 天、两个人各自的进度，以及今天的小票"
    },
    problem: {
      kicker: "01 / 起点",
      heading: "搭子好找，也好散。",
      lead: "搭子的吸引力在于它要求得足够少：不用维系友情，活动结束了也不欠对方什么。饭搭子、健身搭子、演出搭子，一次活动就是关系的全部边界。",
      breakLabel: "它为什么会散",
      breakLead: "让搭子容易开始的那份松散，也让它没法持续。",
      breakBody: "没有任何东西把两个人绑在一起，所以一周之后它就悄悄停了，然后又要重新找。最后花在找搭子上的力气，比花在计划本身上的还多。",
      dietLabel: "减脂为什么是最难的一种",
      dietLead: "它要熬几周，要作息对得上，还要在你最不想被人看见的那天有人在看。",
      dietBody: "演出搭子只需要撑过一个晚上。减脂搭子要撑过两个月、对不上的起始体重，还有那些你宁愿没人知道自己吃了什么的日子。",
      questionLabel: "设计问题",
      question: "能把两个陌生人绑在一起八周的最小承诺，是什么？"
    },
    bet: {
      kicker: "02 / 我的判断",
      heading: "把关系收窄到没有东西可以坏掉为止。",
      lead: "我没有靠加功能让这段关系更黏，而是一直做减法，直到只剩下一个共同话题。",
      tradeoffLabel: "代价",
      principles: [
        {
          label: "01 / 只有一件事",
          title: "你们只共享吃的，别的都没有。",
          body: "搭子能看到你吃了什么、什么时候吃的。没有聊天、没有动态、没有主页，也没有昵称——整场挑战里你们彼此都只是一个用户 id。",
          tradeoff: "加个聊天框，它就变成社交产品了，而社交产品需要的维护成本，正是搭子关系想躲开的东西。"
        },
        {
          label: "02 / 固定的终点",
          title: "挑战是到日子结束，不是到有人决定结束。",
          body: "创建时选 4 周、8 周或 12 周，两个人的页面倒数同一天。谁都不用当那个先开口说不干了的人。",
          tradeoff: "固定周期意味着它做不成一个没有尽头的习惯打卡。这是一场有终点线的比赛，不是一本记一辈子的账。"
        },
        {
          label: "03 / 缺席是看得见的",
          title: "漏掉的那天，会印成一块空白。",
          body: "漏记不会推送提醒，也不会发愧疚感通知。它只是在那天的小票上留下一个空的虚线框，计数变成 MISSED 1 / 3。",
          tradeoff: "连续三天空白，两个人的挑战一起结束。是有点狠，但这是唯一还在支撑这段关系的东西。"
        }
      ]
    },
    match: {
      kicker: "03 / 找到搭子",
      heading: "邀请你认识的人，或者按三件真正决定你们能不能一起走完的事来匹配。",
      lead: "匹配不问年龄、城市、性别，也不要照片。它只比对三件会影响两个人能否把同一场挑战跑到底的事实。",
      axes: [
        ["目标相近", "两个人想减掉的公斤数差不多"],
        ["起点相近", "起始体重足够接近，节奏才有可比性"],
        ["同一天结束", "两场挑战在同一天收尾"]
      ],
      cardLabel: "你们的挑战",
      yourGoal: "你的目标",
      theirGoal: "TA 的目标",
      startsLabel: "开始",
      starts: "明天 0:00",
      endsLabel: "结束",
      ends: "11.17 · 共 56 天",
      caption: "连续三天没有记录，两个人的挑战一起结束。"
    },
    receipt: {
      kicker: "04 / 每天的循环",
      heading: "拍下这一餐，这一天自己结算成一张小票。",
      lead: "你拍下盘子，App 把它从背景里抠出来，23:59 这一天封存成一张打印好的小票。你的和 TA 的并排放着。",
      whyLabel: "为什么是小票",
      why: "小票这个形式本身就意味着「这一天已经结算完了」。23:59 自动封存，等于昨天不能再改得好看一点——这也正是对方那张小票有价值的原因。",
      secondLabel: "看对方小票的第二个理由",
      second: "动力只是一半。TA 的小票也是「今晚吃什么」最实用的答案——一顿真实的饭，来自一个和你执行同一套计划的人，时间点还能和你自己的对上。",
      note: "上面两张小票是按产品本身的排版用 CSS 画出来的。食物照片暂时用了主页的素材；在 App 里它们是抠好图直接印在纸上的。"
    },
    report: {
      kicker: "05 / 每周回顾",
      heading: "七张小票装订成一页你们共同签收的手账。",
      lead: "每周的小票会装订成同一本手账。你的那页和 TA 的那页面对面，一周因此读起来是一件完整的东西，而不是两份各自的记录。",
      alt: "每周回顾：面对面的两页手账，一人一页，各自记着七天的食物照片和备注",
      caption: "左页是我的，右页是 TA 的。漏掉的日子以空框的形式留在纸上。"
    },
    next: {
      kicker: "06 / 目前进展",
      heading: "循环已经设计好了，但它底下的那个假设还没被验证。",
      lead: "BUBU 还在做。界面、小票系统和插画都完成了；缺的是证据——除了我自己之外，这个核心判断对别人是否也成立。",
      questionLabel: "待验证",
      questions: [
        {
          title: "陌生人的小票，是推动还是压力？",
          body: "整个产品都建立在「看见别人在坚持会给人动力」这个假设上。但在状态不好的那天，它也完全可能被读成一种监视。这是最该先拿去问用户的事。"
        },
        {
          title: "完全不能说话，是对的边界吗？",
          body: "零沟通是这个想法最干净的版本，但也可能冷到撑不下去。每张小票允许一个表情回应，也许就是既不变成聊天软件、又够暖的那条底线。"
        },
        {
          title: "连续三天空白就结束，算公平吗？",
          body: "这条规则的存在是为了不让关系悄无声息地烂掉。但它读起来是一份公平的契约，还是对一个糟糕星期的惩罚，得靠测试回答，不该由我来定。"
        }
      ],
      limit: "目前还没有做过可用性测试，所以这一页上的任何内容都不是经过验证的结论。界面里出现的数字均为示例数据。"
    }
  }
}

export default function BubuPage({ track = "uiux", locale = "en" }) {
  const t = copy[locale] || copy.en

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track, locale)} track={track} locale={locale} />
        {/* The hero animates itself on load (.reveal below); everything past
            it waits until it is scrolled to, so a reader meets each section
            as they reach it rather than finding it already played out. */}
        <Reveal fade={`.${styles.caseSection}`} />
        <div className={styles.content}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>
                <span className={styles.pill}>{t.hero.pill}</span>
                <span>{t.hero.context}</span>
              </div>
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>{t.hero.titleA}<br />{t.hero.titleB}</h1>
              <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>{t.hero.lead}</p>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>{t.hero.challengeLabel}</dt><dd>{t.hero.challenge}</dd></div>
                <div><dt>{t.hero.contributionLabel}</dt><dd>{t.hero.contribution}</dd></div>
                <div><dt>{t.hero.betLabel}</dt><dd>{t.hero.bet}</dd></div>
                <div><dt>{t.hero.statusLabel}</dt><dd>{t.hero.status}</dd></div>
              </dl>
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>{t.hero.roleLabel}</dt><dd>{t.hero.role}</dd></div>
                <div><dt>{t.hero.scopeLabel}</dt><dd>{t.hero.scope}</dd></div>
                <div><dt>{t.hero.platformLabel}</dt><dd>{t.hero.platform}</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <a className={styles.action} href="#problem">{t.hero.action} <span aria-hidden="true">&darr;</span></a>
              </div>
            </div>
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <img src="/bubu/phone.webp" alt={t.hero.heroAlt} width="900" height="1100" />
            </div>
          </header>

          <ProjectQuickNav slug="bubu" track={track} locale={locale} />

          <section id="problem" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.problem.kicker}</p>
              <h2>{t.problem.heading}</h2>
              <p className={styles.sectionLead}>{t.problem.lead}</p>
            </div>
            <div className={styles.contextGrid}>
              <div>
                <p className={styles.microLabel}>{t.problem.breakLabel}</p>
                <p className={styles.bodyLead}>{t.problem.breakLead}</p>
                <p>{t.problem.breakBody}</p>
              </div>
              <div>
                <p className={styles.microLabel}>{t.problem.dietLabel}</p>
                <p className={styles.bodyLead}>{t.problem.dietLead}</p>
                <p>{t.problem.dietBody}</p>
              </div>
            </div>
            <div className={styles.question}>
              <p className={styles.microLabel}>{t.problem.questionLabel}</p>
              <blockquote>{t.problem.question}</blockquote>
            </div>
          </section>

          <section id="bet" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.bet.kicker}</p>
              <h2>{t.bet.heading}</h2>
              <p className={styles.sectionLead}>{t.bet.lead}</p>
            </div>
            <div className={styles.principles}>
              {t.bet.principles.map((principle) => (
                <article className={styles.principle} key={principle.label}>
                  <p className={styles.microLabel}>{principle.label}</p>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                  <dl className={styles.reasoning}>
                    <div><dt>{t.bet.tradeoffLabel}</dt><dd>{principle.tradeoff}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section id="match" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.match.kicker}</p>
              <h2>{t.match.heading}</h2>
              <p className={styles.sectionLead}>{t.match.lead}</p>
            </div>
            <div className={styles.matchStage}>
              <ul className={styles.axes}>
                {t.match.axes.map(([name, detail]) => (
                  <li key={name}>
                    <span className={styles.check} aria-hidden="true" />
                    <span className={styles.axisName}>{name}</span>
                    <span className={styles.axisDetail}>{detail}</span>
                  </li>
                ))}
              </ul>
              {/* The match card as the product prints it: two goals, no
                  names. Drawn here rather than exported so the numbers stay
                  legible at any width. */}
              <figure className={styles.matchCard}>
                <p className={styles.matchLabel}>{t.match.cardLabel}</p>
                <div className={styles.matchGoals}>
                  <div>
                    <p className={styles.microLabel}>{t.match.yourGoal}</p>
                    <p className={styles.matchNumber}>&minus;6.0 <span>kg</span></p>
                    <p className={styles.matchRange}>68.0 &rarr; 62.0</p>
                  </div>
                  <div>
                    <p className={styles.microLabel}>{t.match.theirGoal}</p>
                    <p className={styles.matchNumber}>&minus;6.0 <span>kg</span></p>
                    <p className={styles.matchRange}>66.0 &rarr; 60.0</p>
                  </div>
                </div>
                <dl className={styles.matchFacts}>
                  <div><dt>{t.match.startsLabel}</dt><dd>{t.match.starts}</dd></div>
                  <div><dt>{t.match.endsLabel}</dt><dd>{t.match.ends}</dd></div>
                </dl>
                <figcaption>{t.match.caption}</figcaption>
              </figure>
            </div>
          </section>

          <section id="receipt" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.receipt.kicker}</p>
              <h2>{t.receipt.heading}</h2>
              <p className={styles.sectionLead}>{t.receipt.lead}</p>
            </div>
            {/* The receipt itself stays in the product's own English, in
                either locale - it is the designed artifact, not page copy. */}
            <div className={styles.receiptStage}>
              <Receipt
                player="ME"
                date="2026.09.22 TUE"
                no="012 / 056"
                meals={[
                  { slot: "BREAKFAST", time: "08:05", image: "/bubu/polaroid-coffee.webp", name: "ICED AMERICANO & EGGS" },
                  { slot: "LUNCH", time: "12:40", image: "/bubu/polaroid-salad.webp", name: "SHRIMP & EGG SALAD" }
                ]}
                exercise="RUN 30 MIN"
                progress="42% → 46%"
                items="4"
                streak="12 DAYS"
                missed="0 / 3"
              />
              <Receipt
                player="TA"
                date="2026.09.22 TUE"
                no="012 / 056"
                meals={[
                  { slot: "BREAKFAST", time: "07:50", image: "/bubu/polaroid-salad.webp", name: "CROISSANT & LATTE" },
                  { slot: "LUNCH", time: "12:30", image: null, name: "NOT LOGGED" }
                ]}
                exercise="WALK 5 KM"
                progress="30% → 34%"
                items="4"
                streak="12 DAYS"
                missed="1 / 3"
              />
            </div>
            <div className={styles.contextGrid}>
              <div>
                <p className={styles.microLabel}>{t.receipt.whyLabel}</p>
                <p>{t.receipt.why}</p>
              </div>
              <div>
                <p className={styles.microLabel}>{t.receipt.secondLabel}</p>
                <p>{t.receipt.second}</p>
              </div>
            </div>
            <p className={styles.sourceNote}>{t.receipt.note}</p>
          </section>

          <section id="report" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.report.kicker}</p>
              <h2>{t.report.heading}</h2>
              <p className={styles.sectionLead}>{t.report.lead}</p>
            </div>
            <figure className={styles.spread}>
              <img src="/bubu/book.webp" alt={t.report.alt} width="1520" height="1120" loading="lazy" />
              <figcaption>{t.report.caption}</figcaption>
            </figure>
          </section>

          <section id="next" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>{t.next.kicker}</p>
              <h2>{t.next.heading}</h2>
              <p className={styles.sectionLead}>{t.next.lead}</p>
            </div>
            {/*
              Placeholder for user validation. When the interviews or the
              survey are done, replace this list with the findings - the
              pattern to follow is the evaluation section of the BOA and
              AI Calendar case studies: one card per finding, each with
              what was observed and what changed because of it.
            */}
            <div className={styles.questions}>
              {t.next.questions.map((question) => (
                <article key={question.title}>
                  <p className={styles.microLabel}>{t.next.questionLabel}</p>
                  <h3>{question.title}</h3>
                  <p>{question.body}</p>
                </article>
              ))}
            </div>
            <p className={styles.limitNote}>{t.next.limit}</p>
          </section>

          <ProjectNav slug="bubu" track={track} locale={locale} styles={styles} />
        </div>
        <SiteFooter compact locale={locale} />
      </div>
    </main>
  )
}
