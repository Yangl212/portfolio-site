import { ProjectBackLink } from "../../../components/ProjectBackLink"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

// Content transcribed verbatim, in document order, from the legacy Framer
// export (xiangmuxiangqing/inflankland/index.html). Each entry renders as one
// block in the case-study body.
const blocks = [
  { kind: "image", src: "/framer-assets/images/734124733fc1c29039d94f4e1379cc8624fbca0b.jpg", alt: "Inflankland cover" },
  {
    kind: "p",
    text: "Inflankland is a customized system design created to promote local tourism, support government revenue, and protect native wildlife. The system includes an app, product, and web platform, working together to build a sustainable tourism ecosystem that connects visitors, local culture, and environmental conservation."
  },

  { kind: "kicker", text: "Research" },
  { kind: "h2", text: "Sexual Selection vs. Survival Instincts" },
  {
    kind: "p",
    text: "This research is based on Charles Darwin’s theory of evolution, exploring the relationship between sexual selection and survival instincts in both wild and domesticated animals. Through comparative analysis, it reveals that domesticated species—such as peacocks and roosters—have lost part of their natural survival instincts due to human-controlled environments, prioritizing aesthetic or productive traits instead. In contrast, wild species still rely on strong survival instincts shaped by natural selection, though excessive adaptation to environmental pressure can also lead to instability within species."
  },
  {
    kind: "p",
    text: "Interference of Beauty explores how aesthetic traits, such as body size, color, and ornamentation, influence mating behavior and survival among different species."
  },

  { kind: "h2", text: "Galleria mellonella" },
  {
    kind: "p",
    text: "Galleria mellonella is the wax moth and is one highly variable pest species that is a critical threat to honeybees. Existing control measures are usually inefficient due to the fact that the insects shelter inside beehives and end up destroying more bee colonies. Studies on the insect are geared towards creating environmentally friendly measures to control pests and biotechnology advances to save the bees and enhance massive prevention. Besides environmental protection, these researches also help advance other aspects of sterile technology and biosciences."
  },
  { kind: "h4", text: "Experimental procedure" },
  { kind: "image", src: "/framer-assets/images/2ee7e2551e7127ab16212f258d3e6713ee190231.png", alt: "Experimental procedure diagram" },
  { kind: "h4", text: "Conclusions" },
  {
    kind: "p",
    text: "This indicates that males of the greater wax borer tend to select females close to their body weight for mating."
  },
  {
    kind: "imageRow",
    images: [
      { src: "/framer-assets/images/bf66cd2c6b65534d0e7c272d22d45d2a5af11fce.png", alt: "Wax borer study chart 1" },
      { src: "/framer-assets/images/3f5a428f4aae5de9fdf78b2b881c4eb6ec43c2c8.png", alt: "Wax borer study chart 2" }
    ]
  },
  {
    kind: "p",
    text: "Experimental results on the effect of female body weight on sexual selection of males showed that there was also no significant difference (P>0.05) between the body weight of heavy weight males (selectors) and selected females. In contrast, there was a significant difference (P<0.01) in body weight between light weight males (selectors) and both selected and unselected females, but less so with selected females."
  },

  { kind: "image", src: "/framer-assets/images/f5e326b42ceb123fcf614d447c1c424ae2946358.png", alt: "Megaloceros giganteus" },
  { kind: "h2", text: "Megaloceros giganteus" },
  {
    kind: "p",
    text: "The extinction of Megaloceros giganteus, or the giant Irish elk, was largely due to the massive antlers of the males. While these large antlers offered an advantage in sexual selection, they also restricted movement through forested environments, often becoming entangled in branches and leading to fatal outcomes. Studies indicate that the larger the antlers, the greater the difference between individuals, which may increase reproductive success but decreases survivability and adaptability. In contrast, individuals with smaller antlers lacked strong mating appeal but had faster escape speed and better survival skills in the wild. Ultimately, exaggerated traits that favor reproduction can accelerate a species’ extinction."
  },

  {
    kind: "imageRow",
    images: [
      { src: "/framer-assets/images/f7ae0ed177292016332d25067ac4085ea239dcb2.png", alt: "Troglodytes cobbi habitat 1" },
      { src: "/framer-assets/images/797c7c4e59e66d3486041c7e7c96bbcc87b574be.png", alt: "Troglodytes cobbi habitat 2" }
    ]
  },
  { kind: "h2", text: "Troglodytes cobbi" },
  { kind: "image", src: "/framer-assets/images/fa40df93c28e82421c26eaa13c2402a9fc24611e.png", alt: "Troglodytes cobbi" },
  {
    kind: "p",
    text: "The territory consists of two main islands and more than two hundred smaller ones, featuring a winding coastline and complex terrain. Their nests are usually hidden in the grass between boulders, where they attract mates through distinctive calls — sometimes even cries that sound like a call for blood. However, rodents often seek out these nests for hunting, posing a serious threat to the species. Listed as Vulnerable (VU) on the IUCN Red List of Birds (Version 3.1, 2009), they are in need of protection. During courtship, breeding birds perform unique calls and gestures to attract their partners, triggering a series of reproductive behaviors including pairing, nest building, egg incubation, and brood rearing."
  },
  { kind: "h2", text: "In conclusion, I would like to further investigate Troglodytes cobbi." },

  { kind: "kicker", text: "Behavioral Ecology" },
  { kind: "h2", text: "Learning Behavior" },
  {
    kind: "p",
    text: "When the researchers used short pulses of light, the birds produced short syllables of song. When long-pulsed light was used, the birds sang long syllables."
  },
  { kind: "image", src: "/framer-assets/images/916faa1e49e9d15aa6fe8a55cf45016f04f7a588.png", alt: "Song circuit study" },
  { kind: "h4", text: "Auditory conduction and song movement circuits" },
  {
    kind: "imageRow",
    images: [
      { src: "/framer-assets/images/42d2e1bbe882c37733d93648923cdebddbffbbcc.png", alt: "Auditory conduction diagram 1" },
      { src: "/framer-assets/images/4ada6a5d6d4da8dcfb4f4fb8c375f6836864ffbd.png", alt: "Auditory conduction diagram 2" }
    ]
  },
  {
    kind: "p",
    text: "Through optical principles, the fluctuation behavior in the brains of birds can be seen, and the conclusion that birds have learning behaviors for music and calls can be inferred."
  },
  { kind: "h4", text: "Sammary" },
  { kind: "image", src: "/framer-assets/images/b18341b5ae193c1dce9c301de8484c65a66a0136.png", alt: "Summary diagram" },
  {
    kind: "p",
    text: "These birds face multiple survival challenges, including threats from predators and risks associated with their courtship behavior, which often exposes them to danger. To address these issues, I aim to explore potential strategies such as establishing artificial protective measures, studying their learning behavior to better understand adaptive patterns, and preventing biological invasions that may disrupt their natural habitat."
  },

  { kind: "h2", text: "Regional analysis" },
  {
    kind: "imageRow",
    images: [
      { src: "/framer-assets/images/8c7be37b4d4af6d18f190f319e74a64b6c4ea0be.png", alt: "Falkland Islands map 1" },
      { src: "/framer-assets/images/f0580231311e32f8fd3453733f05c398e72c30e4.png", alt: "Falkland Islands map 2" }
    ]
  },
  {
    kind: "p",
    text: "The Falkland Islands are a remote archipelago in the South Atlantic Ocean, characterized by a cold maritime climate, strong winds, and vast areas of untouched natural landscapes. Human activity here remains limited, and the tourism industry is relatively underdeveloped, which allows the islands to maintain a high level of ecological integrity. This isolation has made the Falklands a crucial sanctuary for many protected species, including Troglodytes cobbi, penguins, albatrosses, and seals."
  },

  { kind: "kicker", text: "Concept" },
  { kind: "h2", text: "System construction and app" },
  { kind: "image", src: "/framer-assets/images/dd441c49ef8f31783be5a08ae231e918c59a9dc9.png", alt: "System construction overview" },

  { kind: "h2", text: "Ecosystem Map" },
  { kind: "image", src: "/framer-assets/images/68ed4bd38b5a843d46179e308c72fedbdf2d0d31.png", alt: "Ecosystem map" },
  {
    kind: "p",
    text: "This system connects tourists, birds, and the government to monitor and protect the Falkland Islands’ ecosystem. Mobile apps collect data from visitors, while software and devices like speakers and scent dispersers simulate sounds or signals to guide wildlife and control rodents, forming a loop that supports conservation and sustainable tourism."
  },

  { kind: "h2", text: "Device Architecture" },
  { kind: "image", src: "/framer-assets/images/51e804c8ca52c80dbd0a49006e1d23811529509e.png", alt: "Device architecture diagram" },
  {
    kind: "p",
    text: "Through optical principles, the fluctuation behavior in the brains of birds can be seen, and the conclusion that birds have learning behaviors for music and calls can be inferred."
  },

  { kind: "h2", text: "How to Charity" },
  { kind: "image", src: "/framer-assets/images/91e3aba298e14ef89268ec1363329a679420bf4c.png", alt: "How to charity diagram" },

  { kind: "h2", text: "System Analysis" },
  { kind: "image", src: "/framer-assets/images/c174adeb08540382603dbd735a9b3d177dba666c.png", alt: "System analysis diagram" },

  { kind: "kicker", text: "Design Process" },
  { kind: "h2", text: "Work flow" },
  {
    kind: "p",
    text: "The system contains two sets of UI/UX designs. One is designed for tourists, providing navigation, information, and mobile access to animal protection data. The other serves official departments, supporting management, rescue operations, and wildlife protection."
  },
  { kind: "h4", text: "Tourists" },
  { kind: "image", src: "/framer-assets/images/9b1ac35bd918760615be6dfa310de6337116301f.png", alt: "Tourist app flow" },
  { kind: "h4", text: "Official departments" },
  { kind: "image", src: "/framer-assets/images/91a665378602302b31051b85811fb3dd4651b5bf.png", alt: "Official departments flow" },

  { kind: "h2", text: "Low-Fidelity Prototype" },
  { kind: "image", src: "/framer-assets/images/356ef30f493b1ed2fc68b589085d3085178d8923.png", alt: "Low-fidelity prototype" },

  { kind: "kicker", text: "High-Fidelity" },
  { kind: "h2", text: "User-End Design" },
  { kind: "image", src: "/framer-assets/images/25dc9c8d9bc0ac79f6e71cf1f2bad7434fe27a88.png", alt: "User-end design" },

  { kind: "kicker", text: "Product Design" },
  { kind: "h2", text: "Sound transmission" },
  {
    kind: "imageRow",
    images: [
      { src: "/framer-assets/images/dcfbaba0862b4f158e4a55825cdfb2063a7acfa7.png", alt: "Sound transmission device 1" },
      { src: "/framer-assets/images/b8cb4dbe8814bc312673ab9d10b9b8a34951985c.png", alt: "Sound transmission device 2" }
    ]
  },

  { kind: "h2", text: "Smell transmission" },
  { kind: "image", src: "/framer-assets/images/811e67819eef08ef12d4294b608c75071028b143.png", alt: "Smell transmission device" },

  { kind: "h2", text: "Motion monitor" },
  {
    kind: "p",
    text: "Monitor the movement trajectory and living habits of animals, and at the same time help animals to amplify their calls and protect their throats from bleeding."
  },
  { kind: "image", src: "/framer-assets/images/4a773ec1337589c431df4f478d69efc153dc2afa.png", alt: "Motion monitor device" }
]

function Block({ block, index }) {
  const delay = `${100 + (index % 6) * 60}ms`

  switch (block.kind) {
    case "kicker":
      return (
        <div className={`${styles.row} ${styles.reveal}`} style={{ animationDelay: delay }}>
          <p className={styles.kicker}>{block.text}</p>
          <div />
        </div>
      )
    case "h2":
      return (
        <div className={`${styles.row} ${styles.reveal}`} style={{ animationDelay: delay }}>
          <div />
          <h2 className={styles.heading}>{block.text}</h2>
        </div>
      )
    case "h4":
      return (
        <div className={`${styles.row} ${styles.reveal}`} style={{ animationDelay: delay }}>
          <div />
          <h3 className={styles.subheading}>{block.text}</h3>
        </div>
      )
    case "p":
      return (
        <div className={`${styles.row} ${styles.reveal}`} style={{ animationDelay: delay }}>
          <div />
          <p className={styles.body}>{block.text}</p>
        </div>
      )
    case "image":
      return (
        <div className={`${styles.imageBlock} ${styles.reveal}`} style={{ animationDelay: delay }}>
          <img src={block.src} alt={block.alt} className={styles.image} />
        </div>
      )
    case "imageRow":
      return (
        <div className={`${styles.imageRow} ${styles.reveal}`} style={{ animationDelay: delay }}>
          {block.images.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} className={styles.image} />
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function InflanklandPage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/project" />

        <section className={styles.content}>
          <ProjectBackLink className={styles.reveal} />

          <h1 className={`${styles.title} ${styles.reveal}`}>INFLANKLAND</h1>

          <div className={styles.blocks}>
            {blocks.map((block, index) => (
              <Block key={index} block={block} index={index} />
            ))}
          </div>
        </section>

        <SiteFooter className={styles.reveal} />
      </div>
    </main>
  )
}
