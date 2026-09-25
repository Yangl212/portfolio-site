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

/* The three rules the whole product is built on. Everything that follows -
   the matching axes, the receipt, the auto-end - is one of these three
   made concrete. */
const principles = [
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

/* Matched on the three things that decide whether two people can actually
   finish together - and on nothing that identifies them. */
const matchAxes = [
  ["Similar goal", "Both aiming for about the same number of kilograms"],
  ["Similar start", "Close enough in starting weight that the pace is comparable"],
  ["Same end date", "Both challenges close on the same day"]
]

const openQuestions = [
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
]

export default function BubuPage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track)} track={track} />
        {/* The hero animates itself on load (.reveal below); everything past
            it waits until it is scrolled to, so a reader meets each section
            as they reach it rather than finding it already played out. */}
        <Reveal fade={`.${styles.caseSection}`} />
        <div className={styles.content}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>
                <span className={styles.pill}>Self-initiated</span>
                <span>Product Design &middot; iOS &middot; 2026</span>
              </div>
              <h1 className={styles.reveal} style={{ animationDelay: "60ms" }}>BUBU:<br />losing weight in pairs.</h1>
              <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
                Pair with one person on the same timeline, share nothing but what you ate, and finish the same challenge on the same day.
              </p>
              <dl className={`${styles.heroFacts} ${styles.reveal}`} style={{ animationDelay: "180ms" }}>
                <div><dt>The challenge</dt><dd>A diet partner is easy to want and hard to keep, so people spend more effort finding one than following the plan.</dd></div>
                <div><dt>My contribution</dt><dd>Product framing, interaction design, illustration and the visual system.</dd></div>
                <div><dt>The bet</dt><dd>Cap the relationship at one subject - food - and give it a start date and an end date, so it has nothing to maintain and nothing to drift out of.</dd></div>
                <div><dt>Status</dt><dd>In progress &middot; Not yet user-tested</dd></div>
              </dl>
              <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                <div><dt>Role</dt><dd>Product Designer &amp; Illustrator</dd></div>
                <div><dt>Scope</dt><dd>Product &middot; UI &middot; Illustration</dd></div>
                <div><dt>Platform</dt><dd>iOS</dd></div>
              </dl>
              <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
                <a className={styles.action} href="#problem">Read the case <span aria-hidden="true">&darr;</span></a>
              </div>
            </div>
            <div className={`${styles.heroVisual} ${styles.reveal}`} style={{ animationDelay: "140ms" }}>
              <img src="/bubu/phone.webp" alt="The BUBU challenge home screen: day 12, both players' progress, and today's receipt" width="900" height="1100" />
            </div>
          </header>

          <ProjectQuickNav slug="bubu" track={track} />

          <section id="problem" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>01 / The starting point</p>
              <h2>A dazi is easy to find and easy to lose.</h2>
              <p className={styles.sectionLead}>
                In China, a <em>dazi</em> (&#25628;&#23376;) is a partner for exactly one activity - a lunch dazi, a gym dazi, a concert dazi. What makes it appealing is how little it asks: no friendship to keep up, no obligation past the activity itself.
              </p>
            </div>
            <div className={styles.contextGrid}>
              <div>
                <p className={styles.microLabel}>Why it breaks</p>
                <p className={styles.bodyLead}>The same looseness that makes a dazi easy to start makes it impossible to keep.</p>
                <p>Nothing holds the pairing together, so it quietly stops after a week and the search begins again. People end up spending more energy finding a partner than following the plan the partner was meant to support.</p>
              </div>
              <div>
                <p className={styles.microLabel}>Why dieting is the worst case</p>
                <p className={styles.bodyLead}>It needs weeks, a matching schedule, and a witness on exactly the days you least want one.</p>
                <p>A concert dazi has to survive one evening. A diet dazi has to survive two months, a mismatched starting weight, and the day you would rather nobody saw what you ate.</p>
              </div>
            </div>
            <div className={styles.question}>
              <p className={styles.microLabel}>The design question</p>
              <blockquote>What is the smallest commitment that can hold two strangers together for eight weeks?</blockquote>
            </div>
          </section>

          <section id="bet" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>02 / The bet</p>
              <h2>Narrow the relationship until there is nothing left to break.</h2>
              <p className={styles.sectionLead}>Rather than add features to make the pairing stickier, I took things away until only one shared subject was left.</p>
            </div>
            <div className={styles.principles}>
              {principles.map((principle) => (
                <article className={styles.principle} key={principle.label}>
                  <p className={styles.microLabel}>{principle.label}</p>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                  <dl className={styles.reasoning}>
                    <div><dt>The trade-off</dt><dd>{principle.tradeoff}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section id="match" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>03 / Finding a buddy</p>
              <h2>Invite someone you know, or match on the three things that decide whether you can finish together.</h2>
              <p className={styles.sectionLead}>
                Matching does not ask for age, city, gender or a photo. It compares the only three facts that affect whether two people can run the same challenge to the end.
              </p>
            </div>
            <div className={styles.matchStage}>
              <ul className={styles.axes}>
                {matchAxes.map(([name, detail]) => (
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
                <p className={styles.matchLabel}>Your challenge</p>
                <div className={styles.matchGoals}>
                  <div>
                    <p className={styles.microLabel}>Your goal</p>
                    <p className={styles.matchNumber}>&minus;6.0 <span>kg</span></p>
                    <p className={styles.matchRange}>68.0 &rarr; 62.0</p>
                  </div>
                  <div>
                    <p className={styles.microLabel}>Their goal</p>
                    <p className={styles.matchNumber}>&minus;6.0 <span>kg</span></p>
                    <p className={styles.matchRange}>66.0 &rarr; 60.0</p>
                  </div>
                </div>
                <dl className={styles.matchFacts}>
                  <div><dt>Starts</dt><dd>Tomorrow 0:00</dd></div>
                  <div><dt>Ends</dt><dd>11.17 &middot; 56 days</dd></div>
                </dl>
                <figcaption>Three blank days in a row ends the challenge for both of you.</figcaption>
              </figure>
            </div>
          </section>

          <section id="receipt" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>04 / The daily loop</p>
              <h2>Photograph the meal; the day closes itself as a receipt.</h2>
              <p className={styles.sectionLead}>
                You shoot the plate, the app cuts it out of its background, and at 23:59 the day seals into a printed receipt. Yours and theirs sit side by side.
              </p>
            </div>
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
                <p className={styles.microLabel}>Why a receipt</p>
                <p>A receipt is already read as a day that has been closed and totalled. Sealing it at 23:59 means yesterday cannot be edited to look better, which is what makes the other person's copy worth anything.</p>
              </div>
              <div>
                <p className={styles.microLabel}>The second reason to look</p>
                <p>Motivation is only half of it. Their receipt is also the most useful answer to &ldquo;what do I eat tonight&rdquo; - a real meal, eaten by someone on the same plan, at a time you can compare to your own.</p>
              </div>
            </div>
            <p className={styles.sourceNote}>The receipts above are drawn in CSS from the product&rsquo;s own layout. The meal photos are stand-ins from the home screen; in the app they are cut out of their background and printed straight onto the paper.</p>
          </section>

          <section id="report" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>05 / The weekly report</p>
              <h2>Seven receipts become a spread you both sign.</h2>
              <p className={styles.sectionLead}>
                Every week the daily receipts bind into one journal. Your page and theirs face each other, so a week reads as a single object rather than two separate logs.
              </p>
            </div>
            <figure className={styles.spread}>
              <img src="/bubu/book.webp" alt="The weekly report: two facing journal pages, one per player, each holding seven days of meal photos and notes" width="1520" height="1120" loading="lazy" />
              <figcaption>Left page is mine, right page is theirs. Missed days stay on the paper as empty frames.</figcaption>
            </figure>
          </section>

          <section id="next" className={styles.caseSection}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>06 / Where it stands</p>
              <h2>The loop is designed. The assumption underneath it is not yet tested.</h2>
              <p className={styles.sectionLead}>
                BUBU is still being built. The screens, the receipt system and the illustration set are done; what is missing is evidence that the core bet holds for anyone other than me.
              </p>
            </div>
            {/*
              Placeholder for user validation. When the interviews or the
              survey are done, replace this list with the findings - the
              pattern to follow is the evaluation section of the BOA and
              AI Calendar case studies: one card per finding, each with
              what was observed and what changed because of it.
            */}
            <div className={styles.questions}>
              {openQuestions.map((question) => (
                <article key={question.title}>
                  <p className={styles.microLabel}>Open question</p>
                  <h3>{question.title}</h3>
                  <p>{question.body}</p>
                </article>
              ))}
            </div>
            <p className={styles.limitNote}>
              No usability testing has been run yet, so nothing on this page is a validated outcome. The numbers shown in the screens are sample data.
            </p>
          </section>

          <ProjectNav slug="bubu" track={track} styles={styles} />
        </div>
        <SiteFooter compact />
      </div>
    </main>
  )
}
