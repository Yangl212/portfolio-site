import { ProjectBackLink } from "../../../components/ProjectBackLink"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

export default function LastMessagePage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/project" />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectBackLink className={styles.reveal} />

            <header className={`${styles.hero} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
              <div className={styles.heroHeader}>
                <div className={styles.heroCopy}>
                  <h1 className={styles.heroTitle}>Last message</h1>
                </div>
                <a
                  className={styles.cta}
                  href="https://lastmessage.online/test-intro.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Click here to try <span aria-hidden="true">&#8594;</span>
                </a>
              </div>
            </header>

            <div className={`${styles.imageFull} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
              <img
                src="/framer-assets/images/0e9348c3cf750b5b00ab3ec032f26a2cc73e4197.png"
                alt="Last Message key art"
              />
            </div>

            <p className={`${styles.lead} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
              <em>Last Message</em> is a web-based ARG detective game developed through an
              AI-assisted workflow using <strong>Claude Code</strong> and{" "}
              <strong>ChatGPT-driven characters</strong>. The project explores how digital
              traces, such as deleted messages, broken links, account activity, and fragmented
              chat histories, can become the main material of storytelling. Instead of guiding
              players through a fixed linear plot, the game invites them to investigate a
              mysterious death by reading scattered digital evidence, interacting with
              AI-powered NPCs, and reconstructing the story through their own interpretation.
            </p>
          </div>

          <div className={styles.bodyContent}>
            <section className={styles.section}>
              <h3 className={styles.kicker}>Inspiration</h3>
              <h2 className={styles.heading}>From Real Events to Fictional Investigation</h2>
              <p className={styles.body}>
                The project was inspired by real-world online rumors and digital mystery
                cases, especially the media discussion around the &ldquo;Blue Whale
                Challenge.&rdquo; Rather than recreating the event directly,{" "}
                <em>Last Message</em> uses it as a reference for building an atmosphere of
                uncertainty, coercion, and unstable truth. I was also interested in how
                detective games and ARGs use fragmented information to create immersion.
                However, many existing mystery games rely heavily on fixed keywords and rigid
                puzzle structures. My goal was to create a more open investigative experience
                where players could move through the interface, follow traces, and form their
                own conclusions.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Research Process</h3>
              <h2 className={styles.heading}>Test 01: Trash Trace Inference</h2>
              <p className={styles.body}>
                The first test explored whether traces could help people reconstruct a
                person or a scene. I showed participants images of decontextualized trash and
                everyday leftovers, then asked them to infer the owner&rsquo;s identity,
                lifestyle, and emotional state. The results showed that people naturally
                create stories from very limited evidence. However, their interpretations
                were often different, showing that traces are powerful but also unstable and
                easy to misread.
              </p>
              <p className={styles.body}>
                Part 1: Based on the following four images, analyze the possible scenarios in
                which this trash bin might appear.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/b47f3558c752715ea7a91e80269a0d6bf96c5474.png"
                  alt="Trash trace inference test, part 1"
                />
              </div>
              <p className={styles.body}>
                Part 2: Based on the information provided in the picture, analyze what kind of
                person the owner of the trash can might be (for example: gender, occupation,
                family situation, mood, etc.).
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/8e13dc05a4b730bb0c86cf502c98eff96923d3a4.png"
                  alt="Trash trace inference test, part 2"
                />
              </div>

              <h2 className={styles.heading}>Test 02: Visual Detective Experiment</h2>
              <p className={styles.body}>
                The second test focused on how players interact with visual evidence. I
                created a detective-like scene where participants could inspect details such
                as phone notifications, torn papers, and discarded objects. The base image of
                the scene was generated with AI, while the detailed evidence, clue objects,
                and interactive visual elements were drawn and added manually by me. This
                process allowed me to quickly build an atmospheric environment while still
                controlling the narrative details that guided the player&rsquo;s
                investigation. Instead of reading the scene in a fixed order, participants
                moved between clues in their own way. This test helped me decide that an ARG
                format was more suitable than a linear story, because it could support
                non-linear investigation and fragmented reading.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/e170301fd8cc341588840a663f2c940611f1d986.png"
                  alt="Visual detective experiment scene"
                />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>Game Iteration</h3>
              <h2 className={styles.heading}>Cycle 01: Proof of Concept</h2>
              <p className={styles.body}>
                The first playable prototype tested whether the basic idea of a web-based
                detective game could work. Players were asked to explore a simple interface
                and identify important clues. Feedback showed that the introduction contained
                too much text, the player&rsquo;s role was unclear, and the motivation for
                investigation was not strong enough. In the next version, I reduced the amount
                of text, made the first page more visual, and redesigned it to feel closer to
                a police incident report.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/5a194480daae1010ec7ec4e0cbfe9506c2d91cb8.png"
                  alt="Cycle 01 proof of concept prototype"
                />
              </div>

              <h2 className={styles.heading}>Cycle 02: Technical Issues and AI Settings</h2>
              <p className={styles.body}>
                The second iteration focused on technical feasibility and AI interaction.
                Through a technical interview, I realized that some interface decisions were
                based on my own experience with Chinese chat apps, such as WeChat, and might
                not be intuitive for American players. I also found that AI-assisted coding
                could create complex and sometimes inefficient code. For the AI NPCs, I began
                setting clearer boundaries to prevent players from breaking immersion by
                testing the AI outside the story.
              </p>

              <h2 className={styles.heading}>Cycle 03: Logic and Branching</h2>
              <p className={styles.body}>
                The third iteration focused on narrative depth, character dialogue, and
                branching logic. Feedback from a character designer and experienced mystery
                game player showed that the game needed more digital residues, richer visual
                details, and stronger emotional feedback near the ending. The AI characters
                also needed more flexible prompts, because repeated responses or weak keyword
                recognition could make them feel artificial.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/9fbe8cb3cf3b27eb6051493210ca7974c96c0706.png"
                  alt="Cycle 03 branching logic diagram"
                />
              </div>

              <h2 className={styles.heading}>Cycle 04: Final Refinement and Player Agency</h2>
              <p className={styles.body}>
                The fourth iteration tested the game with eight players. Most players were
                able to understand the main storyline and identify the main suspect within
                around 35 minutes. However, only two players discovered the secret ending,
                which required deeper investigation of digital traces and more active
                interaction with AI NPCs. This showed that the main story was accessible, but
                hidden layers still needed stronger guidance and rewards.
              </p>
              <a
                className={styles.videoCard}
                href="https://www.youtube.com/watch?v=UkSPX1I5Q-U"
                target="_blank"
                rel="noreferrer"
                aria-label="Watch playtest video on YouTube"
              >
                <img
                  src="https://i.ytimg.com/vi_webp/UkSPX1I5Q-U/sddefault.webp"
                  alt="Playtest video thumbnail"
                />
              </a>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>AI Usage</h3>
              <h2 className={styles.heading}>
                Claude Code
                <br />
                as the Foundation of Web Development
              </h2>
              <p className={styles.body}>
                Claude Code was used as the main development tool for building the entire
                web-based game structure. It supported the construction of the interface,
                navigation logic, chat windows, clue pages, and branching interactions. Since{" "}
                <em>Last Message</em> relies on a multi-page investigative experience, Claude
                Code helped me quickly prototype different interaction flows and turn my
                design ideas into a functional web system. Throughout the process, I used
                natural language to describe the gameplay logic, then refined the generated
                code through testing, debugging, and visual adjustment. In this way, Claude
                Code became the technical foundation that allowed the project to move from a
                narrative concept into a playable web experience.
              </p>

              <h2 className={styles.heading}>AI-Driven Characters</h2>
              <p className={styles.body}>
                The characters in <em>Last Message</em> were powered by the ChatGPT API to
                create real-time NPC interactions inside the chat interface. Instead of using
                only pre-written dialogue, I designed each character with a specific
                background, personality, knowledge boundary, and emotional tone. When players
                typed questions, the system sent their input to ChatGPT together with a
                rule-based prompt that defined what the character could know, how they should
                respond, and what information they were not allowed to reveal. This allowed
                the NPCs to feel more alive and reactive while still staying within the
                mystery&rsquo;s narrative structure. To prevent AI hallucination or off-topic
                responses, I added strict prompt rules and narrative constraints, so the
                characters would remain in-character and support the investigation without
                breaking the story world.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/5247c345f474e10806399fab7a3a5708be0aa486.png"
                  alt="ChatGPT-driven character chat interface"
                />
              </div>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/01a293011536bfac21d1b0d0106f69962c9f74c7.png"
                  alt="AI character prompt design"
                />
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.kicker}>UI/UX &amp; Visual Design</h3>
              <h2 className={styles.heading}>
                From High-Fidelity Prototype to Functional Web Experience
              </h2>
              <p className={styles.body}>
                The UI/UX design of <em>Last Message</em> was built around the feeling of
                entering a hidden digital archive. Since the game takes place inside a secret
                chat website, the interface needed to feel familiar enough for players to
                understand, but also unfamiliar enough to create tension. I used a dark,
                low-saturation visual style with subtle contrast, minimal decoration, and
                layered information panels to create an atmosphere of secrecy, surveillance,
                and investigation. The overall design language avoids dramatic horror visuals
                and instead focuses on quiet unease, digital absence, and the feeling of
                searching through something that was not meant to be seen.
              </p>
              <p className={styles.body}>
                The page structure was designed to support non-linear exploration. Instead of
                presenting the story as one continuous text, the website is divided into chat
                rooms, profile pages, clue pages, system messages, and hidden interaction
                points. Players can move between different pages like opening drawers of
                information, gradually collecting fragments from different parts of the
                interface. This structure allows the UI itself to become part of the
                storytelling: navigation, missing content, broken links, and locked sections
                all function as narrative clues.
              </p>

              <h2 className={styles.heading}>Visual System</h2>
              <p className={styles.body}>
                The second iteration focused on technical feasibility and AI interaction.
                Through a technical interview, I realized that some interface decisions were
                based on my own experience with Chinese chat apps, such as WeChat, and might
                not be intuitive for American players. I also found that AI-assisted coding
                could create complex and sometimes inefficient code. For the AI NPCs, I began
                setting clearer boundaries to prevent players from breaking immersion by
                testing the AI outside the story.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/469b5436b54712a109f29c7244f7b455feb6839d.png"
                  alt="Visual system reference sheet"
                />
              </div>

              <h2 className={styles.heading}>
                High-Fidelity Design vs. Claude-Built Final Website
              </h2>
              <p className={styles.body}>
                Before building the final website, I created high-fidelity interface designs
                to define the visual direction, layout system, and interaction flow. These
                designs served as the blueprint for the final web version. During development,
                Claude Code helped translate the high-fidelity prototype into a functional
                website, including page navigation, interactive states, chat logic, and
                clue-based progression. The final version kept the main visual atmosphere and
                interface structure from the prototype, while some details were adjusted
                during implementation to improve usability, loading performance, and
                interaction clarity.
              </p>
              <div className={styles.imageFull}>
                <img
                  src="/framer-assets/images/bb00cb03b3e532c6003864bef9d21154b5215f5f.png"
                  alt="High-fidelity prototype compared with the final built website"
                />
              </div>
              <p className={styles.body}>
                The left side shows the high-fidelity pages designed in Figma, while the right
                side shows the actual game pages iterated and built through Claude Code.
              </p>
            </section>
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
