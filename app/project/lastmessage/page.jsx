import { AutoplayVideo } from "../../../components/AutoplayVideo"
import { ProjectHero } from "../../../components/ProjectHero"
import { Reveal } from "../../../components/Reveal"
import { ProjectNav } from "../../../components/ProjectNav"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"

import styles from "./page.module.css"

const img = (hash) => `/framer-assets/images/${hash}`

const liveUrl = "https://lastmessage.online/test-intro.html"
const playtestUrl = "https://www.youtube.com/watch?v=UkSPX1I5Q-U"

const challengeConstraints = [
  {
    label: "Fragmented",
    body: "Information lives in chats, member files, call logs, and diary entries rather than one document."
  },
  {
    label: "Non-linear",
    body: "Users decide what to open next, so the interface cannot assume a reading order."
  },
  {
    label: "Conversational",
    body: "Some information only exists inside a conversation with an AI character, which cannot be scripted."
  }
]

const designHighlights = [
  {
    label: "01 / Live NPCs",
    title: "The NPCs respond to the player, not a dialogue tree",
    body: "Players question characters in their own words. Each NPC responds in real time through the ChatGPT API, guided by a distinct personality, private knowledge boundary, and story state - so an improvised conversation can reveal evidence without breaking character.",
    media: {
      video: "/lastmessage/01.mp4",
      slot: "Video 01",
      title: "Real-time NPC interaction",
      hint: "Show a free-form question, an in-character response, and a clue becoming available.",
      path: "/lastmessage/01.mp4"
    },
    alt: "Screen recording of a real-time conversation with a Last Message NPC"
  },
  {
    label: "02 / Branching Endings",
    title: "Eight endings, plus one that has to be uncovered",
    body: "The case does not collapse into one final multiple-choice screen. What the player uncovers and which route they follow can resolve the same mystery in eight different ways. A ninth, hidden ending rewards players who connect the least visible traces.",
    media: {
      video: "/lastmessage/02.mp4",
      slot: "Video 02",
      title: "Eight routes + one hidden ending",
      hint: "Move through the ending map, then reveal how an earlier decision changes the outcome.",
      path: "/lastmessage/02.mp4"
    },
    alt: "Screen recording showing the branching endings in Last Message"
  },
  {
    label: "03 / Open-web Investigation",
    title: "The investigation leaves the game and enters the real web",
    body: "Critical clues are placed where people already search and browse. Players use familiar, live websites to verify identities, follow traces, and bring what they discover back into the case - turning the browser itself into part of the game world.",
    media: {
      video: "/lastmessage/03.mp4",
      slot: "Video 03",
      title: "A clue hidden on the live web",
      hint: "Start inside the case, search on a familiar website, then return with the key evidence.",
      path: "/lastmessage/03.mp4"
    },
    alt: "Screen recording of a player finding a Last Message clue on a real website"
  },
  {
    label: "04 / Consequence",
    title: "Every clue changes what becomes possible",
    body: "Calls, chat fragments, member files, and open-web discoveries are not collectible decoration. The system records what the player has verified, then changes access, NPC responses, and ending routes. That is what makes a non-linear mystery feel consequential rather than scattered.",
    media: {
      video: "/lastmessage/04.mp4",
      slot: "Video 04",
      title: "Evidence changes the story state",
      hint: "Verify one clue, then show a locked record, NPC response, or route becoming available.",
      path: "/lastmessage/04.mp4"
    },
    alt: "Screen recording showing evidence changing the story state in Last Message"
  }
]

function HighlightMedia({ media, alt }) {
  if (media.video) {
    return (
      <AutoplayVideo
        className={styles.highlightVideo}
        src={media.video}
        width="1200"
        height="750"
        ariaLabel={alt}
      />
    )
  }

  return (
    <div className={styles.videoPlaceholder} role="img" aria-label={alt}>
      <div className={styles.placeholderTop}>
        <span>{media.slot}</span>
        <span className={styles.placeholderStatus}>Awaiting footage</span>
      </div>
      <div className={styles.placeholderCenter}>
        <span className={styles.placeholderPlay} aria-hidden="true" />
        <p className={styles.placeholderTitle}>{media.title}</p>
        <p className={styles.placeholderHint}>{media.hint}</p>
      </div>
      <p className={styles.placeholderPath}>Future asset · public{media.path}</p>
    </div>
  )
}

const aiRules = [
  {
    label: "Personality",
    title: "Each character is a person, not an assistant",
    detail: "Midnight's prompt opens by stating he is not an AI, a narrator, or a system, then fixes his tone as calm, patient, and controlled with a subtle sense of distance."
  },
  {
    label: "Knowledge boundary",
    title: "Define what a character may confirm",
    detail: "Characters may acknowledge that other members exist, but may never reveal critical or hidden information. Each character has a separate prompt file, so knowledge does not leak between them."
  },
  {
    label: "Off-topic handling",
    title: "Redirect instead of refusing",
    detail: "Weather, meals, and daily small talk are detected and answered politely but firmly: tone tightens, the topic is named as out of place, then the conversation is turned back to the user's emotional state."
  },
  {
    label: "Pressure testing",
    title: "Plan for users who attack the fiction",
    detail: "Separate rule sets catch attempts to expose the site as dangerous, shut it down, report the administrator, or ask what the AI can technically do, so probing the model becomes an in-world response."
  },
  {
    label: "Progression",
    title: "Conversation is one of the ways to unlock",
    detail: "Name, member-number, and topic patterns decide when an answer counts as evidence, which is what connects a conversation to the member registry and the endings."
  }
]

const dialogueRules = [
  { turn: "user", text: "what's the weather like where you are?" },
  { turn: "rule", text: "Off-topic daily message - answer politely, tighten tone, name the boundary, redirect to feeling" },
  { turn: "character", text: "That is not what this space is for. Let's stay with how you have been feeling this week." },
  { turn: "user", text: "who is No. 1?" },
  { turn: "rule", text: "Member-number query - may confirm the member exists, may not reveal the file" },
  { turn: "character", text: "There are others here. What they carry is not mine to hand over." }
]

const researchTests = [
  {
    label: "Test 01",
    title: "Trash trace inference",
    body: "Participants were shown decontextualized trash and asked who it belonged to. They built confident stories from very little, but their readings diverged sharply.",
    image: img("8e13dc05a4b730bb0c86cf502c98eff96923d3a4.png"),
    alt: "Annotated trash items used in the trace inference test, labelled with baking paper, kitchen gloves, alcohol pad, and cosmetic packaging"
  },
  {
    label: "Test 02",
    title: "Visual detective experiment",
    body: "A single room was broken into ten inspectable objects, each with its own short record. Participants moved between them in their own order rather than reading top to bottom.",
    image: img("e170301fd8cc341588840a663f2c940611f1d986.png"),
    alt: "Illustrated room scene with ten clue cards covering a diary, contact lens, medicine bottle, trash bin, door, cup, invitation letter, chair, and calendar"
  }
]

const iterations = [
  {
    label: "Entry",
    problem: "The opening carried too much text, and testers could not say who they were supposed to be or why they were investigating.",
    change: "Cut the introduction down, made the first screen visual, and framed it as a police incident report so the role is legible before any reading starts.",
    result: "In the eight-person test on the working build, most players followed the main storyline and identified the main suspect."
  },
  {
    label: "AI boundaries",
    problem: "Players tested the characters from outside the story, and weak keyword matching produced repeated answers that read as artificial.",
    change: "Replaced keyword lookups with per-character prompt rules: fixed personality, an explicit knowledge boundary, off-topic redirection, and named responses for attempts to break the fiction.",
    result: "Each of those attempts now has a defined in-world response, so the failure case is designed for rather than left to the model."
  },
  {
    label: "Hidden layer",
    problem: "Of eight players, most identified the main suspect in around thirty-five minutes, but only two reached the secret ending.",
    change: "Treated this as a guidance problem rather than a difficulty problem - the traces leading to the hidden layer need to be visible, and progress through each record set needs to be countable.",
    result: "This is the open issue in the current build and has not been retested."
  }
]

const implementationChanges = [
  {
    label: "Navigation",
    body: "Chat, member registry, and mission board were separated into their own routes once real content made a single stacked view unreadable."
  },
  {
    label: "Interaction states",
    body: "Locked, unlocked, alive, and deceased needed visible treatments in the build, because a static frame cannot show what a record looks like before it opens."
  },
  {
    label: "Dialogue",
    body: "Prompt rules were rewritten against real transcripts, not in the abstract - most boundary rules exist because a tester found the gap first."
  },
  {
    label: "Localisation",
    body: "A technical review flagged that some patterns came from Chinese chat apps, so each character kept a parallel English and Chinese rule set."
  }
]

const visualSystem = [
  {
    label: "Type",
    body: "A pixel display face carries the title and section headers; body content stays in a plain monospace so records read like files rather than prose."
  },
  {
    label: "Surface",
    body: "Near-black surfaces with white text keep the archive quiet. Red is reserved for status and alerts, and appears only where a record changes state."
  },
  {
    label: "Components",
    body: "One record pattern repeats across members, calls, and logs: a header, a status tag, a set of folders, and a counter. New content never needs a new layout."
  }
]

export default function LastMessagePage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active={trackHome(track)} track={track} />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero
              label="Professional Work"
              discipline={"Product Design · AI Interaction · 2026"}
              title="Last Message"
              image="/lastmessage/cover.png"
              imageAlt="Last Message title screen on a laptop, its glitched terminal art reading Detctive ARG"
              summary="An AI-driven interactive web experience built around conversation, fragmented information, and non-linear exploration."
              problem="Fragmented information usually forces people down one fixed path."
              contribution="UX, UI, AI interaction rules, and the functional website."
              outcome="A live product where AI characters, clue records, and locked states respond to how each user explores."
              role="Product Designer"
              scope={"UX · UI · AI Interaction · Prototype"}
              platform="Web"
              timeline="4 months"
              action={{ href: liveUrl, label: "Open the live product", arrow: false }}
              secondaryAction={{ href: playtestUrl, label: "Watch the playtest" }}
            />
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>UX Challenge</p>
                <div>
                  <h2 className={styles.sectionTitle}>
                    How can an interface help users navigate fragmented information without forcing them through a
                    fixed path?
                  </h2>
                  <p className={styles.sectionLead}>
                    Every answer in this product is split across a conversation, a file, and a log. The design problem
                    was to keep that structure legible while leaving the order of discovery to the user.
                  </p>
                </div>
              </div>

              <div className={styles.constraintGrid}>
                {challengeConstraints.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.caseSection} ${styles.highlightsSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Design Highlights</p>
                <div>
                  <h2 className={styles.sectionTitle}>Four systems make the mystery feel alive.</h2>
                  <p className={styles.sectionLead}>
                    Live characters make the investigation responsive; branching endings, open-web clues, and
                    persistent evidence make every discovery matter.
                  </p>
                </div>
              </div>

              <div className={styles.highlightList}>
                {designHighlights.map((highlight) => (
                  <article className={styles.highlightCard} data-wide={highlight.wide ? "true" : undefined} key={highlight.title}>
                    <div className={styles.highlightCopy}>
                      <p className={styles.microLabel}>{highlight.label}</p>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.body}</p>
                    </div>
                    <div className={styles.highlightVisual}>
                      <HighlightMedia media={highlight.media} alt={highlight.alt} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>AI Interaction Design</p>
                <div>
                  <h2 className={styles.sectionTitle}>I designed how the characters behave, not just what they say.</h2>
                  <p className={styles.sectionLead}>
                    A character that answers anything breaks a mystery. Each one needed a personality, a boundary, and a
                    defined response for the moment a user stops playing along and starts testing the model.
                  </p>
                </div>
              </div>

              <div className={styles.ruleGrid}>
                {aiRules.map((rule) => (
                  <article className={styles.ruleCard} key={rule.label}>
                    <p className={styles.microLabel}>{rule.label}</p>
                    <h3>{rule.title}</h3>
                    <p>{rule.detail}</p>
                  </article>
                ))}
              </div>

              <div className={styles.dialogueBlock}>
                <p className={styles.microLabel}>Rule illustration - how a boundary reads in conversation</p>
                <div className={styles.dialogue}>
                  {dialogueRules.map((line, index) => (
                    <p className={styles.dialogueLine} data-turn={line.turn} key={index}>
                      <span className={styles.dialogueWho}>
                        {line.turn === "user" ? "User" : line.turn === "rule" ? "Rule" : "Character"}
                      </span>
                      <span>{line.text}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.evidenceGrid}>
                <figure>
                  <img
                    src={img("5247c345f474e10806399fab7a3a5708be0aa486.png")}
                    alt="Character system prompt with sections for tone and style, conversation approach, boundaries and guidance, and handling off-topic conversation"
                  />
                  <figcaption>
                    The system prompt for Midnight, organised into tone, conversation approach, boundaries, off-topic
                    handling, and how to respond to distress.
                  </figcaption>
                </figure>
                <figure>
                  <img
                    src={img("01a293011536bfac21d1b0d0106f69962c9f74c7.png")}
                    alt="Intent rules covering danger signals, site destruction, administrator exposure, model capability questions, and off-topic detection in English and Chinese"
                  />
                  <figcaption>
                    Intent rules behind the conversation, including off-topic detection and the cases where a user tries
                    to break the fiction - each defined in English and Chinese.
                  </figcaption>
                </figure>
              </div>

              <p className={styles.note}>
                Claude Code and the ChatGPT API were the implementation tools. The personalities, boundaries, refusal
                behaviour, and the link between conversation and progression were design decisions.
              </p>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Research to Product Direction</p>
                <div>
                  <h2 className={styles.sectionTitle}>Two studies pointed away from a linear story.</h2>
                  <p className={styles.sectionLead}>
                    Both tests asked people to reconstruct something from incomplete evidence. They did it readily, and
                    they did it in their own order - which is what made a non-linear structure the right call.
                  </p>
                </div>
              </div>

              <div className={styles.researchGrid}>
                {researchTests.map((test) => (
                  <article className={styles.researchCard} key={test.label}>
                    <div>
                      <p className={styles.microLabel}>{test.label}</p>
                      <h3>{test.title}</h3>
                      <p>{test.body}</p>
                    </div>
                    <div className={styles.researchImage}>
                      <img src={test.image} alt={test.alt} />
                    </div>
                  </article>
                ))}
              </div>

              <p className={styles.note}>
                Users will connect incomplete information on their own, but they will not agree on the reading. The
                product had to support many routes through the same evidence and stay legible on each of them.
              </p>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Testing &amp; Iteration</p>
                <div>
                  <h2 className={styles.sectionTitle}>Three changes came out of watching people play.</h2>
                  <p className={styles.sectionLead}>
                    Testing ran alongside development, from an early proof of concept through an eight-person session on
                    the working build.
                  </p>
                </div>
              </div>

              <div className={styles.originBlock}>
                <figure>
                  <img
                    src={img("5a194480daae1010ec7ec4e0cbfe9506c2d91cb8.png")}
                    alt="Early proof of concept: a plain light chat interface with a general channel and member list"
                  />
                </figure>
                <div>
                  <p className={styles.microLabel}>Starting point</p>
                  <h3>The first playable build</h3>
                  <p>
                    A plain chatroom with a member list, used to check whether a browser chat could hold the case at
                    all. It confirmed the container worked, and made it obvious that the entry gave players no role to
                    step into.
                  </p>
                </div>
              </div>

              <div className={styles.statRow}>
                <article><span>Final test</span><strong>8</strong><p>players</p></article>
                <article><span>Main suspect found in</span><strong>~35</strong><p>minutes</p></article>
                <article><span>Reached the secret ending</span><strong>2</strong><p>of 8 players</p></article>
              </div>

              <div className={styles.iterationList}>
                {iterations.map((item, index) => (
                  <article className={styles.iterationItem} key={item.label}>
                    <span className={styles.iterationNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className={styles.microLabel}>{item.label} - problem</p>
                      <p>{item.problem}</p>
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
                <p className={styles.kicker}>From Figma to Functional Product</p>
                <div>
                  <h2 className={styles.sectionTitle}>The design kept changing after it started running.</h2>
                  <p className={styles.sectionLead}>
                    High-fidelity screens set the layout system and interaction model. Building the real site exposed
                    states and pacing a static frame could not, and those were resolved as design work.
                  </p>
                </div>
              </div>

              <figure className={styles.compareFigure}>
                <img
                  src={img("bb00cb03b3e532c6003864bef9d21154b5215f5f.png")}
                  alt="High-fidelity Figma screens on the left beside the built administrator registry and mission board on the right"
                />
                <figcaption>
                  Left: high-fidelity screens in Figma. Right: the same screens running, with locked member rows, a
                  status tag on the deceased member, and the diary set that opens as evidence is verified.
                </figcaption>
              </figure>

              <div className={styles.changeGrid}>
                {implementationChanges.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.caseSection}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Visual System</p>
                <div>
                  <h2 className={styles.sectionTitle}>An archive that was not meant to be read.</h2>
                  <p className={styles.sectionLead}>
                    The interface borrows from file browsers and incident reports rather than from games, so unfamiliar
                    content still lands in a familiar structure.
                  </p>
                </div>
              </div>

              <div className={styles.systemGrid}>
                {visualSystem.map((item) => (
                  <article key={item.label}>
                    <p className={styles.microLabel}>{item.label}</p>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.caseSection} ${styles.reflectionSection}`}>
              <div className={styles.sectionHeader}>
                <p className={styles.kicker}>Reflection</p>
                <h2 className={styles.sectionTitle}>Designing behaviour is harder than designing screens.</h2>
              </div>

              <div className={styles.reflectionGrid}>
                <article>
                  <p className={styles.microLabel}>Biggest challenge</p>
                  <p>Keeping a story legible when the user sets the order. Most of the work went into what stays visible between fragments, not into the fragments themselves.</p>
                </article>
                <article>
                  <p className={styles.microLabel}>Limits of AI interaction</p>
                  <p>A character is only as reliable as its boundary rules, and every rule was written after someone found the gap. This does not generalise from a small test group.</p>
                </article>
                <article>
                  <p className={styles.microLabel}>What I would test next</p>
                  <p>Whether visible progress through each record set raises discovery of the hidden layer, and whether the boundary rules hold up against users who set out to break them.</p>
                </article>
              </div>
            </section>

            <ProjectNav slug="lastmessage" track={track} styles={styles} />
          </div>
        </section>

        <Reveal
          fade={`.${styles.highlightVisual}, .${styles.compareFigure}, .${styles.researchImage}, .${styles.evidenceGrid} figure, .${styles.originBlock} figure`}
        />

        <SiteFooter />
      </div>
    </main>
  )
}
