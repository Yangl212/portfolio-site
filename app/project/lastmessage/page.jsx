import { ProjectNav } from "../../../components/ProjectNav"
import { ProjectQuickNav } from "../../../components/ProjectQuickNav"
import { Reveal } from "../../../components/Reveal"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"
import { trackHome } from "../../../lib/projects"
import CaseVideo from "../cleared/CaseVideo"
import styles from "./page.module.css"

export const metadata = {
  title: "Last Message",
  description:
    "An open-ended detective game with a readable main investigation and an optional, more demanding hidden route. Two of eight players reached the hidden ending in the playtest."
}

const img = (hash) => "/framer-assets/images/" + hash
const liveUrl = "https://lastmessage.online/test-intro.html"
const playtestUrl = "https://www.youtube.com/watch?v=UkSPX1I5Q-U"
const comparison = img("bb00cb03b3e532c6003864bef9d21154b5215f5f.png")

const investigation = [
  { title: "Take the case", body: "An incident report establishes the player's role and the mystery." },
  { title: "Question & inspect", body: "Choose between conversations, member files, calls, and diaries." },
  { title: "Connect the evidence", body: "Cross-reference records and follow clues onto the web." },
  { title: "Open another route", body: "Use discoveries to access more records and revisit characters." },
  { title: "Reach an ending", body: "Different paths resolve the case differently; closer attention to connected clues can open an optional hidden route." }
]

const aiRules = [
  {
    label: "01 / Character",
    title: "A consistent voice",
    detail: "Each character has a separate prompt for tone and conversational style. Midnight, for example, is calm and controlled, with a deliberate sense of distance."
  },
  {
    label: "02 / Knowledge",
    title: "A limit on what can be revealed",
    detail: "Rules distinguish acknowledging another member from revealing their private file. These instructions guide responses; they do not guarantee that the model will never reveal too much."
  },
  {
    label: "03 / Off-script input",
    title: "A response when players test the rules",
    detail: "Off-topic questions, challenges to the administrator, and questions about the AI have defined response rules. Repeated probing can become a story consequence, as the recording shows."
  }
]

const iterations = [
  {
    label: "01 / Entry",
    title: "Give the player a role before the first chat.",
    problem: "The text-heavy opening left testers unclear about who they were and why they were investigating.",
    changeLabel: "Changed",
    change: "Shortened the introduction and reframed the first screen as a visual police incident report.",
    outcomeLabel: "Later observation",
    outcome: "Most players in the eight-person working-build test followed the main storyline and identified the main suspect. This was not an isolated before-and-after test of the introduction."
  },
  {
    label: "02 / Conversation",
    title: "Design for questions outside the script.",
    problem: "Players challenged the fiction; keyword-based replies repeated themselves and made characters feel artificial.",
    changeLabel: "Changed",
    change: "Moved to character-specific prompts with personality, knowledge limits, and rules for off-topic input.",
    outcomeLabel: "Implemented behavior",
    outcome: "The current build demonstrates warnings and a revoked-access ending. More varied prompts are still needed to assess how consistently the boundaries hold."
  },
  {
    label: "03 / Discovery",
    title: "Evaluate the optional route on its own terms.",
    problem: "Two of the eight players reached the hidden ending. This is an observation of discovery in this group, not proof that the difficulty is right or wrong.",
    changeLabel: "Next evaluation",
    change: "I would examine where players stop, what they believe remains to be discovered, and whether the interface gives them enough feedback to choose a next step.",
    outcomeLabel: "Design intent",
    outcome: "Clear navigation and record states should support the investigation while preserving the effort required to solve the mystery."
  }
]

function Demo({ name, label }) {
  return <CaseVideo className={styles.demo} src={"/lastmessage/media/" + name + "-loop.mp4"}
    poster={"/lastmessage/media/" + name + "-poster.webp"} width={1600} height={1000} label={label} />
}

function SectionHeading({ label, title, children }) {
  return <header className={styles.sectionHeader}>
    <p className={styles.kicker}>{label}</p>
    <h2>{title}</h2>
    {children && <p className={styles.sectionLead}>{children}</p>}
  </header>
}

export default function LastMessagePage({ track = "uiux" }) {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active={trackHome(track)} track={track} />
        {/* The hero animates itself on load (.reveal below); everything
            past it waits until it is scrolled to, so a reader meets each
            section as they reach it rather than finding it already
            played out. */}
        <Reveal fade={`.${styles.caseSection}`} />
        <div className={styles.content}>
          <section className={styles.hero} aria-labelledby="project-title">
            <div className={`${styles.eyebrow} ${styles.reveal}`}>
              <span className={styles.pill}>MFA Thesis Project</span>
              <span>Product Design · AI Interaction · 2026</span>
            </div>
            <div className={styles.heroIntro}>
              <div className={styles.heroCopy}>
                <h1 id="project-title" className={styles.reveal} style={{ animationDelay: "60ms" }}>Last Message</h1>
                <p className={`${styles.heroLead} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>A browser-based detective game where players question AI characters and piece together a case in their own order.</p>
                <p className={`${styles.heroQuestion} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>The design challenge: keep an open-ended investigation understandable when both the player's route and the conversation can change.</p>
                <div className={`${styles.actions} ${styles.reveal}`} style={{ animationDelay: "220ms" }}>
                  <a className={styles.action} href={liveUrl} target="_blank" rel="noreferrer">Play the live game <span aria-hidden="true">↗</span></a>
                  <a className={styles.textLink} href={playtestUrl} target="_blank" rel="noreferrer">Watch the playtest</a>
                </div>
              </div>
              <img className={`${styles.heroImage} ${styles.reveal}`} style={{ animationDelay: "140ms" }} src="/lastmessage/cover.png" alt="Last Message detective game title screen on a laptop" fetchPriority="high" />
            </div>
            <dl className={`${styles.meta} ${styles.reveal}`} style={{ animationDelay: "260ms" }}>
              <div><dt>My role</dt><dd>Product Designer</dd></div>
              <div><dt>My scope</dt><dd>UX / UI, AI behavior &amp; web development</dd></div>
              <div><dt>Context</dt><dd>Parsons · MFA Design &amp; Technology</dd></div>
              <div><dt>Timeline</dt><dd>4 months</dd></div>
            </dl>
            <div className={`${styles.contribution} ${styles.reveal}`} style={{ animationDelay: "300ms" }}>
              <p className={styles.microLabel}>What I delivered</p>
              <p>A playable website, from investigation structure and interface design to character rules and implementation. The main investigation is designed to be readable; the hidden ending is an optional, more demanding route.</p>
            </div>
          </section>

          <ProjectQuickNav slug="lastmessage" track={track} />

          <section className={styles.caseSection} id="experience">
            <SectionHeading label="01 / The experience" title="Let players follow a question, wherever it leads.">
              Players enter as a detective investigating a death. Conversations, records, and clues on external websites offer different ways into the same case.
            </SectionHeading>
            <article className={styles.feature}>
              <div className={styles.featureCopy}>
                <p className={styles.microLabel}>Conversation</p>
                <h3>Ask in your own words.</h3>
                <p>Private chats let players question characters through free-form input. Each character's prompt defines a voice and the information they are allowed to share.</p>
                <dl className={styles.reasoning}>
                  <div><dt>Design choice</dt><dd>Use a familiar chat interface so the player can focus on what to ask.</dd></div>
                  <div><dt>Tradeoff</dt><dd>Open input gives players freedom, but also demands behavior for unexpected questions.</dd></div>
                </dl>
                <a className={styles.textLink} href="/lastmessage/media/chat-loop.mp4" target="_blank" rel="noreferrer">View conversation at full size ↗</a>
              </div>
              <Demo name="chat" label="Private conversation with Mike Anderson" />
            </article>
            <article className={styles.feature}>
              <div className={styles.featureCopy}>
                <p className={styles.microLabel}>Cross-reference</p>
                <h3>Follow a clue beyond the game.</h3>
                <p>A character's trail extends to a profile on X. Players investigate outside the case interface and bring their interpretation back into the story.</p>
                <dl className={styles.reasoning}>
                  <div><dt>Design choice</dt><dd>Let a familiar website become another piece of evidence in the fictional investigation.</dd></div>
                  <div><dt>Tradeoff</dt><dd>Leaving the interface adds immersion, but makes the return path and the next useful action less obvious.</dd></div>
                </dl>
                <a className={styles.textLink} href="/lastmessage/media/web-clue-loop.mp4" target="_blank" rel="noreferrer">View clue at full size ↗</a>
              </div>
              <Demo name="web-clue" label="The fictional character's profile on X, used as an investigation clue" />
            </article>
          </section>

          <section className={styles.caseSection} id="investigation-flow">
            <SectionHeading label="02 / Investigation flow" title="Keep the next move visible without prescribing the answer.">
              The core loop is to question, inspect, and connect evidence. Players can revisit records and characters as new information opens another route.
            </SectionHeading>
            <div className={styles.flowBlock}>
              <p className={styles.microLabel}>Investigation loop · high-level structure</p>
              <ol className={styles.flow}>
                {investigation.map((step, index) => <li key={step.title}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3><p>{step.body}</p>
                </li>)}
              </ol>
              <p className={styles.returnPath}><span aria-hidden="true">↶</span> New information sends the player back to earlier conversations and records.</p>
            </div>
            <div className={styles.mapIntro}>
              <h3>Eight endings, plus a hidden ninth.</h3>
              <p>Opened from an ending screen in this recording, the story map shows revealed and locked branches. It offers a view of the routes through the case after an outcome has been reached.</p>
            </div>
            <Demo name="routes" label="Story map showing revealed and locked routes through the branching endings" />
            <div className={styles.decisionGrid}>
              <article><p className={styles.microLabel}>Information architecture</p><h3>Give each kind of evidence a home.</h3><p>Chat, the member registry, and the mission board occupy separate routes. The player can return to the same record structure as the case grows.</p></article>
              <article><p className={styles.microLabel}>State feedback</p><h3>Show what has changed.</h3><p>Locked records, available files, member status, and counters distinguish what is known from what still needs investigation.</p></article>
            </div>
            <details className={styles.disclosure}>
              <summary>Early explorations behind the non-linear structure</summary>
              <div className={styles.disclosureBody}>
                <p className={styles.sectionLead}>Two exploratory exercises informed the direction: people could form different interpretations from the same fragments and inspect clues in their own order. These exercises informed the concept; they did not validate the final game's usability.</p>
                <div className={styles.studyList}>
                  <figure className={styles.study}>
                    <a href={img("8e13dc05a4b730bb0c86cf502c98eff96923d3a4.png")} target="_blank" rel="noreferrer" aria-label="Open trace inference study image at full size"><img loading="lazy" src={img("8e13dc05a4b730bb0c86cf502c98eff96923d3a4.png")} alt="Annotated discarded objects used to explore how people infer a story from traces" /></a>
                    <figcaption><strong>01 / Trace inference</strong>Participants inferred an owner from discarded objects. Their confident but differing interpretations suggested room for more than one reading of a clue.</figcaption>
                  </figure>
                  <figure className={styles.study}>
                    <a href={img("e170301fd8cc341588840a663f2c940611f1d986.png")} target="_blank" rel="noreferrer" aria-label="Open visual detective exercise at full size"><img loading="lazy" src={img("e170301fd8cc341588840a663f2c940611f1d986.png")} alt="Illustrated room with ten inspectable objects and their clue records" /></a>
                    <figcaption><strong>02 / Visual detective exercise</strong>A room contained ten inspectable objects with short records. Participants chose their own inspection order, informing the modular record structure.</figcaption>
                  </figure>
                </div>
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="ai-behavior">
            <SectionHeading label="03 / AI interaction design" title="Design what happens when the player goes off script.">
              Free-form conversation needs limits. I defined character personalities, knowledge boundaries, and responses to off-topic input, then connected those behaviors to the investigation.
            </SectionHeading>
            <article className={styles.feature}>
              <div className={styles.featureCopy}>
                <p className={styles.microLabel}>A boundary in the working build</p>
                <h3>A warning becomes a consequence.</h3>
                <p>The chat history records repeated weather questions and Lily's warnings. The recording then shows the disconnected chat and the “Revoked” ending.</p>
                <dl className={styles.reasoning}>
                  <div><dt>Intent</dt><dd>Keep an off-topic exchange inside the story instead of returning a generic assistant response.</dd></div>
                  <div><dt>Tradeoff</dt><dd>Revoking access makes the boundary consequential. It also risks punishing normal curiosity; the clarity of the warning needs further testing.</dd></div>
                </dl>
                <a className={styles.textLink} href="/lastmessage/media/boundary-loop.mp4" target="_blank" rel="noreferrer">View interaction at full size ↗</a>
              </div>
              <Demo name="boundary" label="Lily's warnings in the chat history, disconnection, and the Revoked ending" />
            </article>
            <div className={styles.ruleGrid}>
              {aiRules.map(rule => <article key={rule.label}><p className={styles.microLabel}>{rule.label}</p><h3>{rule.title}</h3><p>{rule.detail}</p></article>)}
            </div>
            <details className={styles.disclosure}>
              <summary>Character prompts and response rules</summary>
              <div className={styles.disclosureBody}>
                <div className={styles.ruleExample}>
                  <p className={styles.microLabel}>Illustrative exchange · not a playtest transcript</p>
                  <dl>
                    <div><dt>Player</dt><dd>“Who is No. 1?”</dd></div>
                    <div><dt>Rule</dt><dd>May confirm a member exists; may not reveal their private file.</dd></div>
                    <div><dt>Character</dt><dd>“There are others here. What they carry is not mine to hand over.”</dd></div>
                  </dl>
                </div>
                <div className={styles.evidenceGrid}>
                  <figure>
                    <a href={img("5247c345f474e10806399fab7a3a5708be0aa486.png")} target="_blank" rel="noreferrer" aria-label="Open Midnight's character prompt at full size"><img loading="lazy" src={img("5247c345f474e10806399fab7a3a5708be0aa486.png")} alt="Midnight's system prompt with tone, conversation, and boundary instructions" /></a>
                    <figcaption><strong>Character-level instructions</strong>Midnight's prompt defines tone, conversation style, boundaries, and off-topic handling.</figcaption>
                  </figure>
                  <figure>
                    <a href={img("01a293011536bfac21d1b0d0106f69962c9f74c7.png")} target="_blank" rel="noreferrer" aria-label="Open bilingual response rules at full size"><img loading="lazy" src={img("01a293011536bfac21d1b0d0106f69962c9f74c7.png")} alt="English and Chinese rules for off-topic detection and challenges to the story" /></a>
                    <figcaption><strong>Input-handling rules</strong>English and Chinese patterns cover member queries, off-topic messages, and attempts to challenge the fiction.</figcaption>
                  </figure>
                </div>
                <p className={styles.sourceNote}>Built with Claude Code and the ChatGPT API. My design work covered the characters, response boundaries, interface states, and the relationship between conversation and progression.</p>
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="playtesting">
            <SectionHeading label="04 / Playtesting & iteration" title="A readable main investigation, with an optional hidden route.">
              The hidden ending asks players to pay closer attention to clues and connections across the story. Discovering this layer is part of the challenge; universal completion was never the goal.
            </SectionHeading>
            <div className={styles.statRow}>
              <article><strong>8</strong><span>players in the working-build test</span></article>
              <article><strong>~35 min</strong><span>reported time to identify the main suspect</span></article>
              <article><strong>2 of 8</strong><span>players reached the secret ending</span></article>
            </div>
            <p className={styles.sourceNote}>Two of the eight players reached the hidden ending. I treat this as an observation of discovery in this group. It provides a starting point for examining how players explore the optional layer, but does not establish the ideal level of difficulty or determine the game&apos;s overall usability.</p>
            <div className={styles.iterationList}>
              {iterations.map(item => <article className={styles.iterationItem} key={item.label}>
                <div><p className={styles.microLabel}>{item.label}</p><h3>{item.title}</h3><p>{item.problem}</p></div>
                <dl className={styles.reasoning}>
                  <div><dt>{item.changeLabel}</dt><dd>{item.change}</dd></div>
                  <div><dt>{item.outcomeLabel}</dt><dd>{item.outcome}</dd></div>
                </dl>
              </article>)}
            </div>
            <details className={styles.disclosure}>
              <summary>The first playable chatroom</summary>
              <div className={[styles.disclosureBody, styles.origin].join(" ")}>
                <a href={img("5a194480daae1010ec7ec4e0cbfe9506c2d91cb8.png")} target="_blank" rel="noreferrer" aria-label="Open the early chatroom prototype at full size"><img loading="lazy" src={img("5a194480daae1010ec7ec4e0cbfe9506c2d91cb8.png")} alt="Early light chat interface with a general channel and member list" /></a>
                <p>A plain chatroom and member list provided an early way to explore the interaction. Testing exposed the need to establish a role and a reason to investigate before asking players to start a conversation.</p>
              </div>
            </details>
          </section>

          <section className={styles.caseSection} id="figma-to-build">
            <SectionHeading label="05 / From Figma to a working website" title="Building it exposed the states a static screen could miss.">
              The high-fidelity designs established the visual language. Working with real content made navigation, locked records, and changing member states part of the design work.
            </SectionHeading>
            <figure className={styles.compareFigure}>
              <img loading="lazy" src={comparison} alt="Figma designs on the left and the implemented member registry and mission board on the right" />
              <figcaption><span>Left: Figma designs. Right: implemented screens with locked records, member status, and diary access.</span></figcaption>
            </figure>
            <div className={styles.ruleGrid}>
              <article><p className={styles.microLabel}>Navigation</p><h3>Separate destinations as content grows.</h3><p>Chat, the registry, and the mission board moved into their own routes when a single stacked view became too dense.</p></article>
              <article><p className={styles.microLabel}>Interaction states</p><h3>Design before and after access.</h3><p>Locked and unlocked records, plus alive and deceased member states, needed recognizable treatments beyond the default screen.</p></article>
              <article><p className={styles.microLabel}>Language</p><h3>Support English and Chinese input.</h3><p>Character rules were maintained in both languages. Supporting the same intent requires more than translating the interface labels.</p></article>
            </div>
            <div className={styles.visualSystem}>
              <p className={styles.microLabel}>Visual system / a readable digital archive</p>
              <div className={styles.systemGrid}>
                <div><h3>Type</h3><p>Pixel display type establishes the fiction; monospace body text gives records a consistent rhythm.</p></div>
                <div><h3>Contrast</h3><p>Dark surfaces and light text frame the evidence, with red accents for status and alerts.</p></div>
                <div><h3>Record patterns</h3><p>Repeated headers, folders, status tags, and counters help players recognize new information.</p></div>
              </div>
            </div>
          </section>

          <section className={[styles.caseSection, styles.reflection].join(" ")}>
            <SectionHeading label="What I take forward" title="Preserve the mystery, then test whether the challenge is fair.">
              My next evaluation would examine whether the main investigation remains understandable, whether hidden-route clues can be reasoned through, and whether navigation and record states provide enough feedback without revealing the answer.
            </SectionHeading>
            <div className={styles.actions}>
              <a className={styles.action} href={liveUrl} target="_blank" rel="noreferrer">Explore Last Message <span aria-hidden="true">↗</span></a>
              <a className={styles.textLink} href={playtestUrl} target="_blank" rel="noreferrer">Watch the playtest</a>
            </div>
          </section>
          <ProjectNav slug="lastmessage" track={track} styles={styles} />
        </div>
        <SiteFooter compact />
      </div>
    </main>
  )
}
