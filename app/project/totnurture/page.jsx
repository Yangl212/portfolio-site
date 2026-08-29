import { ProjectHero } from "../../../components/ProjectHero"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

// Block model built from xiangmuxiangqing/totnurture/index.html (RichTextContainer
// blocks in document order). Types: "eyebrow", "heading", "text", "image", "imagePair".
const blocks = [
  {
    type: "text",
    text: "We want to reach people who might not consider themselves “spiritual,” but who love meaningful design, visual tools, and personal insight. This includes students, artists, designers, journalers, and anyone who just wants a pretty and useful deck on their desk or shelf."
  },
  { type: "eyebrow", text: "Research" },
  { type: "heading", text: "In China, fathers are often absent from the time of birth." },
  {
    type: "text",
    text: "In America in 2015, 77 percent of black babies in the Native American States were born to single mothers. 49 percent of Hispanic babies are born to single mothers."
  },
  { type: "image", src: "c25674b0bf70f525c22911fbf5343be2aa439619.png" },
  {
    type: "text",
    text: "Absent fathers also pose huge mental health risks to children and affect their futures. In Britain, 74.3% of children live with their mothers after separation, while 42% experience an absent father even without divorce. Around 6.6% experience paternal absence between ages 5–10, showing how early absence can affect children's mental health and future development."
  },
  { type: "image", src: "f07553742d577655259dd261ab5b7fa99279427a.png" },
  {
    type: "text",
    text: "In Mexico, changes in family structure are strongly linked to immigration and mobility. Fathers are often absent due to divorce, death, or migration—either within Mexico or to the United States. Despite these shifts, 61% of children still live with both parents, indicating a higher family stability rate compared to other groups."
  },
  { type: "image", src: "98b431010ba8383e46086cb5a95deaf576be0c87.png" },
  { type: "eyebrow", text: "User research" },
  { type: "heading", text: "User Journey" },
  {
    type: "text",
    text: "This user journey map illustrates the physical, emotional, and psychological experiences of mothers during the postpartum period. Across these stages, mothers face challenges such as physical weakness, lack of parenting knowledge, emotional exhaustion, and difficulty balancing work and childcare."
  },
  { type: "image", src: "fd71e76a73abebccc46f8be4b45a7d8915f7e24d.png" },
  { type: "heading", text: "Questionaire & Interview" },
  {
    type: "text",
    text: "This paper investigated the difficulties encountered by contemporary mothers regarding \"father absence\", postpartum depression, and parenting support. In the survey, I found that more than 60% of mothers encountered difficulties in raising their newborns. And only 32% of mothers have received parenting training."
  },
  { type: "image", src: "c05142f32764239278b5638843fe0d885c7cbae5.png" },
  {
    type: "text",
    text: "The questionnaire showed that 46% of women have experienced postpartum depression, so I interviewed three mothers who had experienced it, hoping to learn more about their needs."
  },
  { type: "image", src: "914e321efcfd9687ca6440ffa37b793995c703d5.png" },
  { type: "eyebrow", text: "User Insights" },
  { type: "heading", text: "Persona" },
  { type: "image", src: "8bb573b2c0377170b0f1d5a2e1490c2c7374fbf8.png" },
  { type: "heading", text: "User Needs" },
  { type: "image", src: "fcffc2bbb352dde0afcead5d303001b6a81b3575.png" },
  { type: "eyebrow", text: "Concept" },
  { type: "heading", text: "We want to create a whole-house intelligent dashboard management system" },
  {
    type: "text",
    lines: [
      "The design considers both the baby’s and the parents’ needs.",
      <>On the <strong>baby side</strong>, the system focuses on health monitoring and virus detection, connecting data to smart devices to ensure safety and real-time care.</>,
      <>On the <strong>parents’ side</strong>, the system aims to protect mental health and reduce daily burdens by supporting rest, cooking, and education tasks, helping parents achieve a better balance between caregiving and personal well-being.</>
    ]
  },
  { type: "heading", text: "Rechargeable magnetic screen" },
  {
    type: "imagePair",
    images: ["36fadd5fddac5fda510ca22bcecfa1c8e1ae007f.png", "7dd2bb204b522159d094e60019aac1c533269a03.png"]
  },
  {
    type: "text",
    text: "It can be hung on the wall and used with a touch screen, and the magnetic suction on the back can be charged at any time. It is more convenient to take it off and carry it to other places. It is more convenient for studying such as preparing food and raising children."
  },
  { type: "eyebrow", text: "User test 1" },
  { type: "heading", text: "Work Flow" },
  { type: "image", src: "d4e87642e86c3b92e1a2ddd087662cf06cd0d13b.png" },
  { type: "heading", text: "User Flow" },
  { type: "image", src: "d8ad777d8d15e1757807785b69b045cdc3b83c99.png" },
  {
    type: "text",
    text: "This user flow shows the overall structure of the smart home system, covering different functional dashboards such as general control, kitchen, bedroom, and baby room. Each interface supports real-time monitoring, device management, and health tracking to create a safer and more efficient family environment."
  },
  { type: "heading", text: "Feedback" },
  { type: "text", text: "Question: Should baby smart monitoring devices dominate in other rooms?" },
  { type: "image", src: "8a696f123c629c47be414eda909060ab13fb6be5.png" },
  {
    type: "text",
    text: "Through the voting survey, 82.3% of mothers chose to give priority to baby monitoring. To sum up, I chose to monitor the version that accounts for a large proportion for in-depth optimization."
  },
  {
    type: "text",
    text: "Users enjoyed the obvious room-based layout, which helped to make navigation between rooms (bedroom, kitchen, baby room) simple and systematic."
  },
  {
    type: "text",
    text: "A few students noted that the visual hierarchy was wanting—critical health statistics such as temperature and heart rate could be more salient."
  },
  {
    type: "text",
    text: "A couple of users were overwhelmed by the number of dashboards and proposed merging functions that were similar (e.g., health status and patient data)."
  },
  {
    type: "text",
    text: "Parents also enjoyed the baby room dashboard, which they described as providing feelings of security due to its ability to monitor the baby's state and direct connection to physicians."
  },
  {
    type: "text",
    text: "More than a few requested notification or voice alert options so that they do not miss important health news while multitasking at home."
  },
  { type: "eyebrow", text: "User test 2" },
  { type: "heading", text: "Low-fidelity" },
  { type: "image", src: "98b5cd853d7437834699bd0163d2382a42264068.png" },
  { type: "heading", text: "Feedback" },
  { type: "image", src: "42623c840ce4f30b0dbf83788bdcdb4c1c7e99f8.png" },
  { type: "eyebrow", text: "Final" },
  { type: "heading", text: "Style Guide" },
  { type: "image", src: "b5e492fed08a148592b0c1046d1a532b9e9ec635.png" },
  { type: "heading", text: "High-fidelity" },
  {
    type: "text",
    text: "According to the research content and solutions, the final high-fidelity is determined."
  },
  {
    type: "text",
    text: "It reduces the management of various lights in the home and increases the link with smart devices. Two panels are added to the parents' rest room, one for resting and one for learning parenting knowledge, which can be switched freely. It reduces the management of various lights in the home and increases the link with smart devices."
  },
  { type: "image", src: "b72ad44a333a119216cef0068bf487b6f6b89a96.png" },
  { type: "heading", text: "User Journey" },
  { type: "image", src: "09c93a93a2abc8fc2cbf6a88ed3b2c6b1e8cded2.png" },
  { type: "heading", text: "Business Canvas" },
  { type: "image", src: "492fc1ba87a5ae67a1d4ab162379dc1da7e242e8.png" }
]

function imgSrc(hash) {
  return `/framer-assets/images/${hash}`
}

// The intro paragraph (before the first eyebrow) is rendered as the hero lead.
const leadBlock = blocks[0]

// Group the remaining flat blocks into sections keyed by their eyebrow marker.
const sections = blocks.slice(1).reduce((acc, block) => {
  if (block.type === "eyebrow") {
    acc.push({ kicker: block.text, items: [] })
    return acc
  }

  acc[acc.length - 1].items.push(block)
  return acc
}, [])

function SectionItem({ item }) {
  switch (item.type) {
    case "heading":
      return <h2 className={styles.heading}>{item.text}</h2>
    case "text":
      if (item.lines) {
        return (
          <p className={styles.body}>
            {item.lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < item.lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )
      }
      return <p className={styles.body}>{item.text}</p>
    case "image":
      return (
        <div className={styles.imageFull}>
          <img src={imgSrc(item.src)} alt="" />
        </div>
      )
    case "imagePair":
      return (
        <div className={styles.imageRow}>
          {item.images.map((src) => (
            <div key={src} className={styles.imageRowItem}>
              <img src={imgSrc(src)} alt="" />
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function TotnurtureProjectPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.headerMask}>
          <SiteHeader active="/" />
        </div>

        <section className={styles.content}>
          <div className={styles.topContent}>
            <ProjectHero label="Student Work" discipline="Product Design · 2024" title="Totnurture" image={imgSrc("182394c0d5cca71d7c4379f80af4d7a45e257d1c.jpg")} imageAlt="Totnurture smart-home parenting system" summary="A smart-home care system that supports parents and babies through connected monitoring, guidance, and everyday household tools." problem="New parents need support across caregiving, health monitoring, and emotional well-being, often in separate places." contribution="User research, journey mapping, service design, UX, UI, and product concepts." outcome="A room-based dashboard system that makes family care more visible, coordinated, and manageable." role="Product Designer" scope="Research · Service Design · UX · UI · Product Design" platform="Smart Home + Mobile" timeline="12 weeks" />

            <header hidden className={`${styles.hero} ${styles.reveal}`} style={{ animationDelay: "60ms" }}>
              <div className={styles.heroHeader}>
                <div className={styles.heroCopy}>
                  <h1 className={styles.heroTitle}>Totnurture</h1>
                </div>
              </div>
            </header>

            <div hidden className={`${styles.imageFull} ${styles.reveal}`} style={{ animationDelay: "120ms" }}>
              <img
                src={imgSrc("182394c0d5cca71d7c4379f80af4d7a45e257d1c.jpg")}
                alt="Totnurture"
              />
            </div>

            <p hidden className={`${styles.lead} ${styles.reveal}`} style={{ animationDelay: "160ms" }}>
              {leadBlock.text}
            </p>
          </div>

          <div className={styles.bodyContent}>
            {sections.map((section, index) => (
              <section key={index} className={styles.section}>
                <h3 className={styles.kicker}>{section.kicker}</h3>
                {section.items.map((item, itemIndex) => (
                  <SectionItem key={itemIndex} item={item} />
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
