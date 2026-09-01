import { AutoplayVideo } from "../../../components/AutoplayVideo"
import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"

import styles from "./page.module.css"

const prototypeUrl = "https://sagbackstage.framer.website/?editSite"

const img = (hash) => `/framer-assets/images/${hash}`

/*
 * MEDIA SLOTS
 * -----------
 * Every `media` object below renders through <Media />:
 *   { video: "/backstage/x.mp4", alt }        -> silent looping video, framed
 *   { src: "/backstage/x.gif", alt }          -> renders the image file
 *   { label, hint, alt }                      -> dashed placeholder
 *
 * Put files in /public/backstage/ - that is the directory Next.js serves from -
 * then point the object at them. Nothing else changes.
 */

const researchInsights = [
  {
    label: "Insight 01",
    title: "People wanted structure, not more choice",
    body: "Both personas asked for the same thing from opposite situations: a newcomer who prefers structured activities, and a remote worker who wants a structured way to meet people but finds planned groups stiff. Neither wanted a longer list to browse.",
    evidence: "78.6% would meet strangers for a shared interest; 71.4% need a public place"
  },
  {
    label: "Insight 02",
    title: "Only offline contact counted as friendship",
    body: "One interviewee, 27 and working in education, said she considers only people she meets in person real friends - everyone else is a “digital neighbour.” Being online more had not produced the relationships people wanted.",
    evidence: "78.6% have found online chats easy but the meeting awkward"
  },
  {
    label: "Insight 03",
    title: "Existing platforms put the first move on the user",
    body: "Partiful assumes you will host or organise. Meetup runs on large gatherings. Eatwith splits people into host and guest. Dating apps lead with looks. Each one asks the user to step forward before anything happens.",
    evidence: "Competitive review of four offline-social platforms"
  }
]

/* Survey: 28 valid responses. Q1 is single-choice on an ordered frequency scale,
 * so it is one part-to-whole bar with a single ink ramp - denser = more often. */
const meetFrequency = [
  { pct: "14.3%", share: 14.29, label: "Every week", tone: "var(--text)" },
  { pct: "7.1%", share: 7.14, label: "Every month", tone: "rgba(34, 34, 34, 0.6)" },
  { pct: "39.3%", share: 39.29, label: "Occasionally", tone: "rgba(34, 34, 34, 0.4)" },
  { pct: "35.7%", share: 35.71, label: "Rarely", tone: "rgba(34, 34, 34, 0.24)" },
  { pct: "3.6%", share: 3.57, label: "Never", tone: "rgba(34, 34, 34, 0.12)" }
]

/* Q9 single-choice and Q10 multiple-choice. Both are read as a share of the 28
 * respondents, so both sit on the same 0-100 scale as ranked bars. */
const meetingConcerns = [
  { pct: "46.4%", share: 46.43, label: "No common topics, or it turns awkward" },
  { pct: "32.1%", share: 32.14, label: "Safety" },
  { pct: "14.3%", share: 14.29, label: "The time it takes" },
  { pct: "7.1%", share: 7.14, label: "Finding out it is not a good match" }
]

const meetingConditions = [
  { pct: "78.6%", share: 78.57, label: "A shared interest" },
  { pct: "71.4%", share: 71.43, label: "A safe public place" },
  { pct: "35.7%", share: 35.71, label: "A friend vouches for them" },
  { pct: "17.9%", share: 17.86, label: "Only at a specific event" },
  { pct: "3.6%", share: 3.57, label: "I would not meet strangers" }
]

const personas = [
  {
    name: "Li Wei",
    meta: "22 · International student · Jersey City",
    pull: "Prefers structured social activities",
    points: [
      "Isolated after moving to a new city",
      "Finds it hard to make friends outside of school",
      "Language barriers make unstructured settings harder"
    ]
  },
  {
    name: "Alex",
    meta: "35 · Software engineer · Astoria, Queens",
    pull: "Wants a structured way to meet like-minded people",
    points: [
      "Frustrated by superficial online relationships",
      "Struggles to find engaging offline events",
      "Finds planned group activities lack spontaneity"
    ]
  }
]

/* The four modes the product ships, in the order it presents them -
 * an ordered scale, so the ink gets denser as the mode asks for more. */
const socialModes = [
  { label: "Quietly together", tone: "rgba(34, 34, 34, 0.18)" },
  { label: "Little contact", tone: "rgba(34, 34, 34, 0.38)" },
  { label: "Takes some courage", tone: "rgba(34, 34, 34, 0.62)" },
  { label: "Looking for energy", tone: "var(--text)" }
]

const directionRules = [
  {
    label: "Declare, don't perform",
    body: "Before browsing anything, you set a social mode - quiet company, just want to listen, casual talk, or looking for energy. The app matches the energy you actually have today."
  },
  {
    label: "Be invited, not matched",
    body: "The platform sends a single invitation to a small event. There is no mutual selection, no swiping, and no profile to win over."
  },
  {
    label: "Passing costs nothing",
    body: "Declining returns a new invitation instead of a penalty or an empty feed. Saying no is a normal move, not a failure state."
  },
  {
    label: "Keep a private room",
    body: "The dressing room is yours by default. Others need permission to enter, so visibility is something you grant rather than something you lose."
  }
]

const comparison = [
  { app: "Meetup", asks: "Walk into a gathering of a hundred strangers" },
  { app: "Partiful", asks: "Host it yourself, or already know the host" },
  { app: "Eatwith", asks: "Be a guest at someone else's table" },
  { app: "Tinder / Bumble", asks: "Be picked, on looks, before you ever meet" },
  { app: "Backstage", asks: "Accept an invitation, or pass without explaining", ours: true }
]

const iterationOne = {
  feedback:
    "The midterm review was blunt: the concept was clear and the offline focus was right, but it was too close to Meetup to be worth choosing. Both reviewers pushed the same way - build around people, not around a catalogue of events.",
  change:
    "I removed the ability to create or freely browse events. The platform now assigns the activity and the user picks from a few curated options instead of an open feed. Group size was capped small, around three to six, so a table stays conversational.",
  result:
    "The flow stopped being a marketplace and became one decision per invitation. The final build still shows the seats remaining - usually three."
}

const iterationTwo = [
  {
    feedback: "“Upcoming Performances” was read as theatre shows rather than social events.",
    change: "Renamed the event language across the product to plain terms - invitations, activities, calendar.",
    result: "The final screens use Invitation and Activities Participated."
  },
  {
    feedback: "Testers were uneasy about safety and about how much of themselves would be exposed.",
    change: "Made the dressing room permissioned - others request access, and you grant it - and answered the safety question directly in the product.",
    result: "The built product includes access requests, unlocked areas, and a safety question in the FAQ."
  },
  {
    feedback: "The two calendars overlapped and testers were unsure which one they were looking at.",
    change: "Merged them into one calendar that holds both what is scheduled and what has already happened.",
    result: "The final build carries a single year-and-month view."
  },
  {
    feedback: "The dark theme read as too heavy and serious for something meant to feel welcoming.",
    change: "Kept the dark base, but softened it with warm photography, diffuse glows, and lighter type instead of switching to a light theme.",
    result: "A partial change - I kept the atmosphere and treated weight as the thing to fix, not darkness itself."
  }
]

const finalExperience = [
  {
    label: "01 / Onboarding",
    title: "Set the mode you are actually in",
    body: "Onboarding asks two things: when you are free, and what kind of company you want - quietly together, little contact, takes some courage, or looking for energy. There is no profile to fill in and no bio to write.",
    media: {
      video: "/backstage/01.mp4",
      alt: "Screen recording: picking a date, then choosing a social style from quietly together, little contact, takes some courage, and looking for energy"
    }
  },
  {
    label: "02 / The invitation",
    title: "One event at a time, and you can pass",
    body: "An invitation names the event, time, place, and the seats left. Join it, or change it and a different one takes its place - no reason asked for. Confirming ends on the questions people actually have, safety included.",
    media: {
      video: "/backstage/02.mp4",
      alt: "Screen recording: an invitation to a Switch Mode Party is exchanged for an Omakase Experience, then joined, ending on a confirmation page with a safety FAQ"
    }
  },
  {
    label: "03 / Your own room",
    title: "A private space others have to be let into",
    body: "The dressing room holds your diary, your settings, and your permissions. People send a request to visit; unlocked areas are the ones you opened yourself.",
    media: {
      video: "/backstage/03.mp4",
      alt: "Requesting access to a dressing room in Backstage"
    }
  },
  {
    label: "04 / After the event",
    title: "Keep the evening without having to post it",
    body: "The diary saves what you went to as photo cards with the people who were there. Whether any of it is visible to others is a separate decision, made afterwards.",
    media: {
      video: "/backstage/04.mp4",
      alt: "Screen recording: an attended event saved into the diary as a photo card"
    }
  }
]

const reflections = [
  {
    label: "The main tradeoff",
    body: "Taking away choice is what makes the product work and also what limits it. A user who wants to pick a specific event on a specific night cannot, and I never tested how that feels over weeks rather than one session."
  },
  {
    label: "Limitations",
    body: "This was a student project with a small survey, two rounds of qualitative testing, and no live events behind it. Nothing here has been validated against real attendance or safety incidents."
  },
  {
    label: "What I would test next",
    body: "Whether people accept an invitation they did not choose, and how many times they pass before the invitation model starts to feel like it is not listening."
  }
]

function Media({ media, className = "" }) {
  const wrapClass = className ? `${styles.media} ${className}` : styles.media

  if (media.video) {
    return (
      <div className={`${wrapClass} ${styles.mediaFramed}`}>
        {/* Silent, looping, no controls - it reads as an animated still.
            AutoplayVideo defers the download until the clip is near the
            viewport and keeps retrying play(), so four clips on one page
            cannot starve each other on a slow connection.
            width/height reserve the box so nothing shifts while it loads. */}
        <AutoplayVideo
          src={media.video}
          width="1200"
          height="750"
          ariaLabel={media.alt}
        />
      </div>
    )
  }

  if (media.src) {
    return (
      <div className={wrapClass}>
        <img src={media.src} alt={media.alt} />
      </div>
    )
  }

  return (
    <div className={`${wrapClass} ${styles.mediaEmpty}`}>
      <p className={styles.mediaLabel}>{media.label}</p>
      <p className={styles.mediaHint}>{media.hint}</p>
    </div>
  )
}

export default function BackstagePage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track)} track={track} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Student Work"
              discipline={"Product Design · 2025"}
              title="Backstage"
              image={img("abfbb25869f710fb242d7441ce77a95df021ad48.png")}
              imageAlt="Backstage running in a browser: the landing page with its FAQ, the social style chooser, and the friends area"
              summary="A consumer product that gets people to real-world events without asking them to host, browse, or be chosen."
              problem="Every offline-social app asks you to make the first move before anything happens."
              contribution="User research, product direction, UX, UI, and an interactive prototype."
              outcome="An invitation-led experience built and revised across two rounds of testing."
              role="Product Designer"
              scope={"Research · UX · UI"}
              platform="Web"
              timeline="12 weeks"
              action={{ href: prototypeUrl, label: "Try the prototype", arrow: false }}
            />
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Problem</p>
                <div>
                  <h2 className={styles.sectionTitle}>
                    Meeting people offline still depends on being the one who starts it.
                  </h2>
                  <p className={styles.sectionLead}>
                    People spend more time on social platforms and still report fewer real-world plans. The apps meant
                    to bridge that gap all begin with an act of initiative - posting an event, joining a large group,
                    or presenting yourself to be picked.
                  </p>
                </div>
              </div>

              <figure className={styles.survey}>
                <figcaption className={styles.surveyHead}>
                  <p className={styles.surveyQuestion}>How often do you proactively meet new people?</p>
                  <p className={styles.surveyMeta}>Single choice · 28 responses</p>
                </figcaption>

                <div
                  className={styles.surveyBar}
                  role="img"
                  aria-label="Every week 14.3%, every month 7.1%, occasionally 39.3%, rarely 35.7%, never 3.6%."
                >
                  {meetFrequency.map((answer) => (
                    <span
                      className={styles.surveySegment}
                      key={answer.label}
                      style={{ "--share": answer.share, "--tone": answer.tone }}
                    />
                  ))}
                </div>

                <dl className={styles.surveyKey}>
                  {meetFrequency.map((answer) => (
                    <div key={answer.label}>
                      <dt>
                        <span className={styles.surveySwatch} style={{ "--tone": answer.tone }} aria-hidden="true" />
                        {answer.pct}
                      </dt>
                      <dd>{answer.label}</dd>
                    </div>
                  ))}
                </dl>

                <p className={styles.surveyTakeaway}>
                  Nearly four in five meet new people occasionally at best. Four of the twenty-eight do it weekly.
                </p>
              </figure>

              <div className={styles.rankPair}>
                <figure className={styles.rankChart}>
                  <figcaption className={styles.surveyHead}>
                    <p className={styles.surveyQuestion}>What worries you most about meeting someone in person?</p>
                    <p className={styles.surveyMeta}>Single choice</p>
                  </figcaption>
                  <dl>
                    {meetingConcerns.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>
                          <span className={styles.rankTrack}>
                            <span className={styles.rankFill} style={{ "--share": row.share }} />
                          </span>
                          <strong>{row.pct}</strong>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </figure>

                <figure className={styles.rankChart}>
                  <figcaption className={styles.surveyHead}>
                    <p className={styles.surveyQuestion}>What would make you willing to meet strangers?</p>
                    <p className={styles.surveyMeta}>Multiple choice</p>
                  </figcaption>
                  <dl>
                    {meetingConditions.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>
                          <span className={styles.rankTrack}>
                            <span className={styles.rankFill} style={{ "--share": row.share }} />
                          </span>
                          <strong>{row.pct}</strong>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </figure>
              </div>

              <p className={styles.note}>
                The barrier is not desire, it is the opening move: awkwardness outranks safety as the top worry, while
                a shared interest and a public place are what most people said would get them to say yes.
              </p>
            </section>

            <section className={`${styles.caseSection} ${styles.finalSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design Highlights</p>
                <div>
                  <h2 className={styles.sectionTitle}>Four moments carry the product.</h2>
                  <p className={styles.sectionLead}>
                    Declaring a mode, receiving an invitation, keeping a private room, and recording what happened -
                    each one is designed so the user never has to be the first to speak.
                  </p>
                </div>
              </div>

              <div className={styles.highlightList}>
                {finalExperience.map((item) => (
                  <article className={styles.highlightCard} key={item.title}>
                    <div className={styles.highlightCopy}>
                      <p className={styles.microLabel}>{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                    <Media media={item.media} className={styles.highlightVisual} />
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Research Insights</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three findings set the product direction.</h2>
                  <p className={styles.sectionLead}>
                    A survey, follow-up interviews, and a review of four existing platforms pointed at the same gap:
                    people wanted a way in that did not require them to go first.
                  </p>
                </div>
              </div>

              <div className={styles.insightGrid}>
                {researchInsights.map((insight) => (
                  <article className={styles.insightCard} key={insight.label}>
                    <p className={styles.microLabel}>{insight.label}</p>
                    <h3>{insight.title}</h3>
                    <p>{insight.body}</p>
                    <p className={styles.insightEvidence}>{insight.evidence}</p>
                  </article>
                ))}
              </div>

              <div className={styles.personaGrid}>
                {personas.map((persona) => (
                  <article className={styles.personaCard} key={persona.name}>
                    <div className={styles.personaHead}>
                      <h3>{persona.name}</h3>
                      <p className={styles.personaMeta}>{persona.meta}</p>
                    </div>
                    <p className={styles.personaPull}>&ldquo;{persona.pull}&rdquo;</p>
                    <ul className={styles.personaPoints}>
                      {persona.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <p className={styles.note}>
                A small student study - 28 survey responses and a handful of interviews. Directional, not representative.
              </p>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Product Direction</p>
                <div>
                  <h2 className={styles.sectionTitle}>Not a social network. A social support system.</h2>
                  <p className={styles.sectionLead}>
                    The name comes from Goffman&rsquo;s idea of a front stage people perform on and a backstage they
                    prepare in. The product is built around the second one: a place you can be in before you are ready
                    to be seen.
                  </p>
                </div>
              </div>

              <div className={styles.directionGrid}>
                {directionRules.map((rule) => (
                  <article key={rule.label}>
                    <p className={styles.microLabel}>{rule.label}</p>
                    <p>{rule.body}</p>
                  </article>
                ))}
              </div>

              <div className={styles.modeScale}>
                <p className={styles.microLabel}>The four modes, in the order the product offers them</p>
                <ol>
                  {socialModes.map((mode) => (
                    <li key={mode.label} style={{ "--tone": mode.tone }}>
                      <span className={styles.modeBar} aria-hidden="true" />
                      <span className={styles.modeLabel}>{mode.label}</span>
                    </li>
                  ))}
                </ol>
                <div className={styles.modeAxis}>
                  <span>Barely any contact</span>
                  <span>Actively wants company</span>
                </div>
              </div>

              <div className={styles.compareTable}>
                <p className={styles.microLabel}>What each one asks of you first</p>
                <dl>
                  {comparison.map((row) => (
                    <div key={row.app} data-ours={row.ours ? "true" : undefined}>
                      <dt>{row.app}</dt>
                      <dd>{row.asks}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <figure className={`${styles.wideFigure} ${styles.brandFigure}`}>
                <img
                  src={img("3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png")}
                  alt="Backstage welcome screen reading: Not a social network. A social support system."
                />
              </figure>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Iteration 01</p>
                <div>
                  <h2 className={styles.sectionTitle}>The first version was a Meetup clone, and the review said so.</h2>
                  <p className={styles.sectionLead}>
                    The first build let people post events, browse a filtered feed, and join a waitlist behind identity
                    verification. It worked, and it was indistinguishable from what already existed.
                  </p>
                </div>
              </div>

              <div className={styles.fcrRow}>
                <article>
                  <p className={styles.microLabel}>Feedback</p>
                  <p>{iterationOne.feedback}</p>
                </article>
                <article>
                  <p className={styles.microLabel}>Design change</p>
                  <p>{iterationOne.change}</p>
                </article>
                <article>
                  <p className={styles.microLabel}>Result</p>
                  <p>{iterationOne.result}</p>
                </article>
              </div>

              <div className={styles.flowPair}>
                <figure>
                  <figcaption>Before &mdash; browse, post, join a waitlist</figcaption>
                  <img
                    className={styles.flowImageCompact}
                    src={img("0f6ee6283100bbd556c10dbf388819d49cc8a28f.png")}
                    alt="First user flow: home page leading to event browsing, posting an event, and joining a waitlist with personal data authentication"
                  />
                </figure>
                <figure>
                  <figcaption>After &mdash; set a mode, accept or pass</figcaption>
                  <img
                    src={img("f78a0d3c7329c9f62b9e183fae6d54f11a1d880a.png")}
                    alt="Revised user flow: set your social mode, receive a curtain call slip, accept or decline, plus a private dressing room with permissions"
                  />
                </figure>
              </div>

            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Iteration 02</p>
                <div>
                  <h2 className={styles.sectionTitle}>The second round was about language, safety, and weight.</h2>
                  <p className={styles.sectionLead}>
                    With the direction settled, testing moved to whether people could read the product - what things
                    were called, how exposed they felt, and how it made them feel before they had used it.
                  </p>
                </div>
              </div>

              <div className={styles.iterationList}>
                {iterationTwo.map((item, index) => (
                  <article className={styles.iterationItem} key={item.feedback}>
                    <span className={styles.iterationNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className={styles.microLabel}>Feedback</p>
                      <p>{item.feedback}</p>
                    </div>
                    <div>
                      <p className={styles.microLabel}>Design change</p>
                      <p>{item.change}</p>
                    </div>
                    <div>
                      <p className={styles.microLabel}>Result</p>
                      <p>{item.result}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design System</p>
                <div>
                  <h2 className={styles.sectionTitle}>Soft light on a dark ground.</h2>
                  <p className={styles.sectionLead}>
                    A serif display face for anything addressed to the user, a plain sans for controls, and diffuse
                    glows instead of hard edges - so a dark interface reads as quiet rather than severe.
                  </p>
                </div>
              </div>

              <figure className={styles.systemLead}>
                <figcaption>The language applied across the built pages</figcaption>
                <div className={styles.systemLeadStage}>
                  <img
                    src={img("c7b5b198ecbcc9e0361162f40233915523116c0c.png")}
                    alt="Backstage final screens: home, personal settings, activity track, calendar, invitation, social style, and diary"
                  />
                </div>
              </figure>

              <div className={styles.systemGrid}>
                <figure>
                  <figcaption>Typography</figcaption>
                  <img src={img("30810656e28623dcffdd5669b3d6603ae130054d.png")} alt="Backstage typography specimen" />
                </figure>
                <figure>
                  <figcaption>Components</figcaption>
                  <img src="/backstage/group-97.png" alt="Backstage component library: profile cards, access-request rows, FAQ accordion, progress bar, buttons, and calendar" />
                </figure>
              </div>
            </section>

            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Reflection</p>
                <h2 className={styles.sectionTitle}>Removing choice is the idea and the risk.</h2>
              </div>

              <div className={styles.reflectionGrid}>
                {reflections.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <ProjectNav slug="backstage" track={track} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.wideFigure}, .${styles.systemLead}, .${styles.media}, .${styles.flowPair} figure, .${styles.systemGrid} figure`}
          bars={`.${styles.rankFill}, .${styles.surveyBar}, .${styles.modeBar}`}
        />

        <SiteFooter />
      </div>
    </main>
  )
}
