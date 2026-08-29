import { ProjectHero } from "../../../components/ProjectHero"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

const img = (hash, ext = "png") => `/framer-assets/images/${hash}.${ext}`

const sections = [
  {
    label: "Research",
    blocks: [
      {
        type: "heading",
        text: 'Many creators focus heavily on "concept"'
      },
      {
        type: "text",
        lines: [
          "I investigates the growing imbalance between concept-driven design and playability in modern game development.",
          "While many creators prioritize strong conceptual or narrative depth, this often leads to issues such as disrupted storytelling, reduced interactivity, and neglect of player engagement.",
          "Through case studies like Star Wars, Dear Esther, and Spore, the research reveals how social expectations, excessive narrative focus, and fragmented gameplay can weaken emotional immersion and creative integrity.",
          "The study aims to rethink how games can maintain artistic expression while preserving their fundamental playful nature."
        ]
      },
      {
        type: "subheading",
        text: "Star Wars & Baldur's Gate 3 — Story Development Altered by Social Impact"
      },
      {
        type: "text",
        lines: [
          "In recent years, many large-scale productions like Star Wars and Baldur's Gate 3 have faced creative tension between storytelling and public expectations. Under strong social and political influence, narrative direction is often adjusted to meet audience sensitivities or align with inclusive representation goals. While these intentions are valuable, they can sometimes disrupt narrative coherence and weaken artistic integrity, leading to controversy over authenticity and emotional depth."
        ]
      },
      { type: "image", src: img("3d9136506f9a67fab081f8e3635c9f3731ae1796") },
      {
        type: "subheading",
        text: "Spore — Ignoring Player Needs"
      },
      {
        type: "text",
        lines: [
          "Developed by Maxis, Spore was introduced as an ambitious simulation of life evolution—from a single cell to a space-faring civilization. However, its fragmented design across multiple stages and shallow gameplay loops made players feel disconnected from the core experience. Despite its grand concept, many found it lacking depth, replay value, and emotional engagement."
        ]
      }
    ]
  },
  {
    label: "Precedents",
    blocks: [
      { type: "heading", text: "Meltdown" },
      { type: "image", src: img("b4de6d98f3125ef938512f8b05a22250bdc288bb") },
      {
        type: "text",
        lines: [
          "Meltdown is a board game centered on the theme of environmental crisis and climate change. Players work together to prevent a global disaster while managing limited resources and time. The most distinctive feature of the game lies in its melting ice block system — real ice cubes are used as a dynamic game component that gradually melts during play.",
          "The melting ice not only serves as a visual timer, creating real-time tension, but also symbolizes the irreversible loss caused by global warming. As the ice disappears, game pieces shift, territories collapse, and players must adapt their strategies in response. This physical transformation bridges gameplay with environmental awareness, turning the act of play into an emotional and sensory reminder of climate fragility."
        ]
      },
      { type: "heading", text: "Nyctophobia" },
      {
        type: "text",
        lines: [
          "Nyctophobia is a horror-themed tactile board game designed by Catherine Stippell and published by Pandasaurus Games. It accommodates 3–6 players, with one acting as the Hunter—the only person who can see the board—while the others play as Survivors, wearing blackout glasses that completely block their vision."
        ]
      },
      { type: "image", src: img("b3e1d63092bf3773c3bf3f1fae37215c0dd2bb7b") },
      {
        type: "text",
        lines: [
          'The game takes place on an 8×8 maze-like grid filled with "trees" and obstacles. Survivors must rely on touch, memory, and teamwork to navigate the board, find the car, and escape before the Hunter catches them. By removing sight entirely, Nyctophobia transforms traditional gameplay into a sensory and psychological experience, heightening tension and empathy while exploring how people perceive fear in darkness.'
        ]
      }
    ]
  },
  {
    label: "Concept",
    blocks: [
      { type: "heading", text: "Aesthetic inspiration" },
      {
        type: "text",
        lines: [
          "The aesthetic inspiration for Sugar comes from the discovery that candy is a fascinating material — colorful, tactile, and emotionally evocative. Its glossy surfaces, diverse textures, and playful colors stimulate multiple senses at once, creating both visual pleasure and nostalgic joy."
        ]
      },
      {
        type: "imageRow",
        srcs: [
          img("1a6a64361235b25c0b71d54415121eaff77f3cec"),
          img("c124c1b38831c7e0a1e97714823784bc0712dca5")
        ]
      },
      {
        type: "text",
        lines: [
          "By translating these qualities into game design, Sugar aims to build a multi-sensory and emotionally rich play experience where aesthetics and interactivity merge, reminding players that beauty and playability can coexist in harmony."
        ]
      },
      { type: "image", src: img("521a1d251890ab0cbeb008316ff7cc8d4bb633e5") },
      { type: "heading", text: "Goals" },
      { type: "subheading", text: "Design Qualities" },
      {
        type: "text",
        lines: [
          "Sugar is a multi-sensory game combining color, texture, and touch. It creates playful tension between sweetness and strategy, turning visual pleasure into emotional interaction."
        ]
      },
      { type: "subheading", text: "Community of Practice" },
      {
        type: "text",
        lines: [
          "Targeted at artists, ordinary players, and game lovers who enjoy sensory, emotional, and creative experiences."
        ]
      }
    ]
  },
  {
    label: "User test 1",
    blocks: [
      { type: "heading", text: "Strategic Gameplay Exploration" },
      {
        type: "text",
        lines: [
          'This version of Sugar is a two-player competitive game inspired by Chinese chess mechanics. Players take turns placing candy pieces on a grid, using strategic moves to block the opponent\'s path. When one player successfully surrounds another\'s piece, they can "eat" the opponent\'s candy and claim it as their own. The game ends when there are no more available moves, and the player with the most remaining candies on the board wins.'
        ]
      },
      {
        type: "imageRow",
        srcs: [
          img("017e4f8f7ba4a879095ad7f3f1ad01e913afbf99"),
          img("5d748aa3529acc1325c022572acde4c4d78a6e49")
        ]
      },
      { type: "subheading", text: "Feedback" },
      {
        type: "text",
        lines: [
          "Players quickly understood the basic rules and enjoyed the visual satisfaction of using real candies as pieces.",
          "The tactile experience of picking and moving candies made the game feel more playful and engaging.",
          "Some participants mentioned that strategic blocking created tension similar to Go or Chinese Chess.",
          "A few players suggested adding different candy shapes or colors to represent special abilities or ranks.",
          "Several testers noted that the game felt balanced yet competitive, making every move meaningful.",
          "Others found the melting or sticky texture of candy could be a fun metaphor but might need material adjustments for replayability."
        ]
      }
    ]
  },
  {
    label: "User test 2",
    blocks: [
      { type: "heading", text: "Basic Game Logic Attempt" },
      {
        type: "text",
        lines: ["This version of Sugar takes inspiration from match-three puzzle games, but with a sensory twist."]
      },
      { type: "image", src: img("58e76814069dd3eb13e137479a88e7f64b7abeff") },
      {
        type: "text",
        lines: [
          'Players cannot see the candies hidden in each grid. Instead, they must choose tiles blindly, hoping to find three of the same kind to earn candies they can "eat." Each player has several ability cards that allow them to use smell, taste, or touch to decide whether to take a candy or skip it. If a player collects more than seven candies, they lose the game due to "overindulgence." The last remaining player wins.'
        ]
      },
      { type: "subheading", text: "Feedback" },
      {
        type: "text",
        lines: [
          "Players found the game fun and engaging, especially the hidden candy mechanic and sensory guessing system. They enjoyed the tension of using smell and touch but suggested adding more skill cards and faster pacing for multiplayer rounds. Some players also proposed introducing interaction-based ability cards, such as exchanging cards or stealing candies from others, to increase player-to-player engagement. Overall, the experience was described as unique, playful, and slightly challenging, with potential to deepen strategy in future versions."
        ]
      }
    ]
  },
  {
    label: "style guide",
    blocks: [
      { type: "heading", text: "Logo & Fonts" },
      {
        type: "imageRow",
        srcs: [
          img("e3cca4a6e38f5e0d14fddf93839f8a9886be5970"),
          img("03206a6eec0ab00994f9861a005553083838358d"),
          img("b88ed990c08c77db5d2bb0c85f00300843a7fea7")
        ]
      },
      { type: "heading", text: "Color & Elements" },
      { type: "image", src: img("6a8f41e9abea36ec8fecdb89292885bb2e9b0c61") }
    ]
  },
  {
    label: "Game Instruction",
    blocks: [
      { type: "heading", text: "Initial Setup" },
      {
        type: "text",
        lines: [
          "Game Type: Strategy & Puzzle",
          "Number of Players: 2–4 players, plus 1 judge",
          "Game Duration: Approximately 20 minutes"
        ]
      },
      { type: "subheading", text: "Player Starting Cards" },
      { type: "image", src: img("0655cdeffaed1281624465ab4336ebd06a736b14") },
      {
        type: "text",
        lines: [
          "Each player begins with one Sensory Card (representing smell, visual, touch, or taste) and one Ability Card. These cards determine the player's special actions and sensory access during gameplay."
        ]
      },
      { type: "subheading", text: "Candy Jar Rules" },
      {
        type: "text",
        lines: ["Put candy in the candy jar. Each player has 7 slots to store candies."]
      },
      { type: "image", src: img("1b77f96c64ac5e712ed86cd973172c0a7bc0d28a") },
      {
        type: "text",
        lines: [
          "When three identical candies are stored in the jar, they can be removed. The player will gain 1 point and draw a reward card. If a player's 7 candy jar are completely filled with candies and no elimination is possible, the player failure."
        ]
      },
      { type: "image", src: img("72b9aa8cf4d089587276c3663f7568af69d67ef7") },
      { type: "heading", text: "Game-flow" },
      {
        type: "text",
        lines: [
          "After starts, players take turns drawing candies. The judge guides players through the sequence: ability cards, sensory cards, and candy drawing."
        ]
      },
      { type: "image", src: img("c1dd5a84d8c7415ccad4b0cda228b3b165d0fd51") },
      { type: "heading", text: "Judge's Responsibilities" },
      {
        type: "text",
        lines: [
          "When a player is eliminated, their candies must be randomly returned to the board.",
          "When a card is used, it must be placed into the discard pile.",
          "During each player's turn, the judge must confirm with them whether they will use ability cards or a sensory card."
        ]
      },
      { type: "heading", text: "Sensory Cards" },
      {
        type: "text",
        lines: [
          "Sensory cards can explore the candy and gather information. Based on the information obtained, players can decide whether to collect the candy."
        ]
      },
      { type: "image", src: img("49999264c8c1175e04f35aa117e5ea0e04d29359") },
      {
        type: "text",
        lines: [
          "Visual — Directly observe the appearance of the candy.",
          "Touch — Close eyes and touch the candy with your hand.",
          "Taste — Taste a candy, but keep your eyes closed.",
          "Smell — Close eyes and use smell to identify the candy."
        ]
      },
      { type: "heading", text: "Ability Cards" },
      {
        type: "text",
        lines: [
          "Ability cards should be used FIRST during a player's turn, and MULTIPLY cards can be used at once. Used skill cards will be returned to the deck."
        ]
      },
      { type: "image", src: img("d4d4dce404837d1eb97dda9fc41e0e4b385798b6") },
      {
        type: "text",
        lines: [
          "Change — Choose a player and exchange one candy stored in the candy jar.",
          "Claim — Choose a player and randomly draw one card from their hand.",
          "Clone — Duplicate one candy from the candy jar.",
          "Forfeit — Discard one candy stored in the candy jar."
        ]
      }
    ]
  },
  {
    label: "Final Product",
    blocks: [
      { type: "image", src: img("3481cabd3205746d092e3c5502bb5c105650078a") },
      { type: "image", src: img("00bb1b7ff07ca26c4e9c8c0cdf78fa973d6a4fde") }
    ]
  },
  {
    label: "User Feedback",
    blocks: [
      { type: "image", src: img("8a20674441c2b898970a4715a754956babc1861e") },
      { type: "image", src: img("be9017fde875eccd706cd08fd62ab5ece4ea6fb7") },
      { type: "image", src: img("de15468bc22d5c9ef56cbe03a29c9ab1dd1b643d") }
    ]
  }
]

function Block({ block }) {
  if (block.type === "heading") {
    return <h2 className={styles.heading}>{block.text}</h2>
  }
  if (block.type === "subheading") {
    return <h3 className={styles.subheading}>{block.text}</h3>
  }
  if (block.type === "text") {
    return (
      <>
        {block.lines.map((line, index) => (
          <p key={index} className={styles.body}>
            {line}
          </p>
        ))}
      </>
    )
  }
  if (block.type === "image") {
    return (
      <div className={styles.imageFull}>
        <img src={block.src} alt="" />
      </div>
    )
  }
  if (block.type === "imageRow") {
    return (
      <div className={styles.imageRow}>
        {block.srcs.map((src) => (
          <div key={src} className={styles.imageRowItem}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function SuglarPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/" />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero label="Student Work" discipline="Game & Visual Design · 2023" title="Suglar" image={img("a24d5da4bb5ee86851c88fe6ceac10ef0c01e5ad")} imageAlt="Suglar candy-inspired board game" summary="A multi-sensory board game that translates the color, texture, and emotion of candy into playful strategy." problem="Many tabletop games prioritize rules over the tactile and emotional qualities of play." contribution="Game concept, visual system, material exploration, and playtesting." outcome="An immersive game experience where sweetness becomes strategy." role="Game & Visual Designer" scope="Concept · Game Mechanics · Visual Design · Prototyping" platform="Physical Game" timeline="8 weeks" />

            <header hidden className={`${styles.hero} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
              <div className={styles.heroHeader}>
                <div className={styles.heroCopy}>
                  <h1 className={styles.heroTitle}>Suglar</h1>
                </div>
              </div>
            </header>

            <div hidden className={`${styles.imageFull} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
              <img
                src={img("a24d5da4bb5ee86851c88fe6ceac10ef0c01e5ad")}
                alt="Suglar candy-inspired board game"
              />
            </div>

            <p hidden className={`${styles.lead} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
              Suglar is a multi-sensory board game inspired by the colors, textures, and emotions of candy. It
              transforms sweetness into strategy — combining visual delight with tactile play. Through color,
              material, and interaction, the game explores how beauty and playability can coexist in a joyful,
              immersive experience.
            </p>
          </div>

          <div className={styles.bodyContent}>
            {sections.map((sec) => (
              <section key={sec.label} className={styles.section}>
                <h3 className={styles.kicker}>{sec.label}</h3>
                {sec.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </section>
            ))}
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
