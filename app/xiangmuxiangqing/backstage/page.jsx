import { ProjectBackLink } from "../../../components/ProjectBackLink"
import { SiteFooter } from "../../../components/SiteFooter"
import { SiteHeader } from "../../../components/SiteHeader"

import styles from "./page.module.css"

const prototypeUrl = "https://sagbackstage.framer.website/?editSite"

const blocks = [
  {
    type: "cta",
    text: "Click here to try →",
    href: prototypeUrl
  },
  {
    type: "image",
    src: "/framer-assets/images/3fe62a4c484c9d96ced4a9fead0c31ab65c741b5.png",
    alt: "Backstage app banner"
  },
  {
    type: "body",
    text: "Backstage is an offline social support app designed for people with social anxiety. It aims to help users gradually build confidence in face-to-face social interaction through social guidance, low-pressure activity and emotional feedback mechanisms."
  },
  { type: "eyebrow", text: "Current problem" },
  { type: "heading", text: "Social anxiety and online isolation" },
  {
    type: "body",
    text: "Social anxiety has been increasingly common in recent years, particularly among young people. According to the Anxiety and Depression Association of America (ADAA), around 15 million adults in the U.S. live with social anxiety disorder, and many of them go untreated for years. As a result, many avoid face-to-face interactions and rely heavily on digital platforms.\n\nHowever, online interaction doesn’t always lead to emotional support. In fact, too much digital communication can make people feel lonelier. A 2025 study by Bear, Fazel, and Skripkauskaite found that among 8,500 students aged 11–18, 62% reported emotional loneliness despite frequent social media use. Moreover, 35% showed strong symptoms of social anxiety, closely tied to how much time they spent online.\n\nAnother study focused on university students revealed that the type of social support they received had a clear impact on their well-being. Students who received mostly offline support had a significantly lower average anxiety score (4.2), compared to those who relied primarily on online communication (average 7.6). In fact, 72% of the latter group reported experiencing “moderate to severe” loneliness.\n\nFor people with social anxiety, online communication might feel like a safe space—but it can easily become a trap. The more they avoid real-world socialization, the harder it becomes to form genuine emotional connections. This creates a vicious cycle of isolation, masked by digital over-connection."
  },
  { type: "eyebrow", text: "Primary research" },
  { type: "heading", text: "Surveys & Interviews" },
  {
    type: "body",
    text: "In my recent primary research, I conducted a survey with 55 participants and followed up with several in-depth interviews to better understand people’s perspectives on online and offline social interaction. The results revealed some clear patterns. About 74% of respondents said that online communication rarely led to meaningful friendships in real life, highlighting a general skepticism toward digital interactions as a foundation for emotional connection. Many also noted that relying too much on online socializing often increased their feelings of loneliness, rather than reducing it."
  },
  {
    type: "image",
    src: "/framer-assets/images/f19ae046c34c94e527d759c230900702273d4f89.png",
    alt: "Survey and interview research findings"
  },
  {
    type: "body",
    text: "Additionally, 60.71% agreed that technology has a notable impact on emotional relationships, although they also emphasized that this effect depends heavily on how individuals use it. What stood out more was that 35.71% of respondents felt that face-to-face communication had decreased due to the rising influence of digital platforms—a sign of growing digital dependence."
  },
  {
    type: "body",
    text: "Interview feedback provided further insights. One 27-year-old woman working in education shared her perspective by saying she only considers people she meets in person as true “friends.” In contrast, she referred to online contacts simply as “digital neighbors.” Her view emphasized the importance of real-life interactions in forming authentic and lasting friendships, suggesting that relationships formed purely online may lack the emotional depth that comes from physical presence."
  },
  {
    type: "body",
    text: "Taken together, these findings highlight the need for a more supportive kind of social platform—one that gently encourages people to reconnect offline and fills the emotional gaps that many current applications fail to address."
  },
  { type: "heading", text: "Limitations of existing social platforms" },
  {
    type: "body",
    text: "Many popular social platforms today try to connect online interaction with real-life relationships, but most still show clear limitations—especially for users dealing with social anxiety."
  },
  {
    type: "body",
    text: "Take Partiful as an example. It focuses on user-initiated, user-hosted events and assumes that participants will actively organize or join social activities. While this works for outgoing users, it can be overwhelming for those who struggle with making the first move or managing unfamiliar social situations on their own. Similarly, Meetup tends to feature large-scale events, often with more than 100 attendees. For people with social anxiety, such big, impersonal gatherings can feel intimidating rather than welcoming. They tend to increase anxiety instead of easing it."
  },
  {
    type: "body",
    text: "Eatwith is another platform that connects people through shared dining experiences. Although it offers a relaxed setting, the clear separation between “host” and “guest” can sometimes block authentic emotional connection. The transactional feel of these activities makes it difficult to build equal, meaningful friendships naturally."
  },
  {
    type: "body",
    text: "Dating apps like Tinder and Bumble also have their limitations. They are usually focused on physical looks and quick interactions. This often makes it more difficult to create deeper emotional bonds,especially for social anxiety groups."
  },
  {
    type: "body",
    text: "All of these examples show a problem: All these platforms put too much pressure on users to take initiative, but ignore the emotional needs of individuals, or focus too much on superficial interactions. As a result, people with social anxiety are often left without a truly supportive or suitable space for developing genuine relationships."
  },
  {
    type: "body",
    text: "Seeing this gap, I decided to conduct primary research to better understand what socially anxious users actually experience and need."
  },
  { type: "eyebrow", text: "Theoretical Background" },
  { type: "heading", text: "Dramaturgy" },
  {
    type: "body",
    text: "Erving Goffman's Dramaturgy theory describes social interactions as performances, emphasizing that individuals publicly present unique \"front level\" personas while preserving a secret \"backstage\" home for preparation and personal management. This idea remains very important in the digital age, providing important insights into net social behaviours and anxieties."
  },
  { type: "heading", text: "Exposure Therapy" },
  {
    type: "body",
    text: "Originally developed by Joseph Wolpe in the 1950s, is a behavioral treatment method based on classical conditioning principles. It proposes that gradually and repeatedly facing feared stimuli in controlled environments can desensitize individuals and reduce anxiety. This technique became foundational in treating phobias, including social anxiety, which is marked by intense fear of social judgment or embarrassment."
  },
  { type: "eyebrow", text: "User-Centered Design Process" },
  { type: "heading", text: "User Personas" },
  {
    type: "body",
    text: "Originally developed by Joseph Wolpe in the 1950s, is a behavioral treatment method based on classical conditioning principles. It proposes that gradually and repeatedly facing feared stimuli in controlled environments can desensitize individuals and reduce anxiety. This technique became foundational in treating phobias, including social anxiety, which is marked by intense fear of social judgment or embarrassment."
  },
  {
    type: "image",
    src: "/framer-assets/images/7675f81965c187f9c6fc79b71ac105ebc2451527.png",
    alt: "User persona research"
  },
  {
    type: "image",
    src: "/framer-assets/images/58ef9d601df9a603aa776d99d93b0d2b7465b240.png",
    alt: "User persona detail"
  },
  { type: "eyebrow", text: "User test 1" },
  { type: "heading", text: "Overview" },
  {
    type: "body",
    text: "This project aims to design an activity-based offline social app that connects users through platform-organized events rather than mutual selection.The goal is to help users meet naturally in real-world settings and reduce social anxiety through guided participation."
  },
  {
    type: "list",
    items: [
      "Offline socializing is based on platform-organized activities.",
      "Users cannot choose participants directly; all interactions happen naturally through events.",
      "Users can filter activities by distance, time, or type.",
      "The platform provides registration, management, and reminders to simplify preparation.",
      "Real-world participation helps users gradually reduce social anxiety.",
      "User testing focuses on how participants select and experience events within this structure."
    ]
  },
  { type: "heading", text: "User flow" },
  {
    type: "image",
    src: "/framer-assets/images/0f6ee6283100bbd556c10dbf388819d49cc8a28f.png",
    alt: "User flow diagram, test 1"
  },
  { type: "heading", text: "Lo-fi" },
  {
    type: "body",
    text: "Originally developed by Joseph Wolpe in the 1950s, is a behavioral treatment method based on classical conditioning principles. It proposes that gradually and repeatedly facing feared stimuli in controlled environments can desensitize individuals and reduce anxiety. This technique became foundational in treating phobias, including social anxiety, which is marked by intense fear of social judgment or embarrassment."
  },
  {
    type: "image",
    src: "/framer-assets/images/46821f8b9f877c569dd97ca7338af323973ab140.png",
    alt: "Lo-fi wireframe, screen 1"
  },
  {
    type: "image",
    src: "/framer-assets/images/ca5dcfb4ff7f9eda5862eb9127118244684dbddc.png",
    alt: "Lo-fi wireframe, screen 2"
  },
  {
    type: "image",
    src: "/framer-assets/images/cce5db55b31542f83437e42ab2a3ffd4418e69f5.png",
    alt: "Lo-fi wireframe, screen 3"
  },
  {
    type: "image",
    src: "/framer-assets/images/5aba2ceb4368815dccaf4c7a4c67711879fcdda9.png",
    alt: "Lo-fi wireframe, screen 4"
  },
  { type: "heading", text: "Feedback" },
  {
    type: "body",
    text: "During the first round of user testing for Backstage, participants noted that the app felt quite similar to other existing social platforms. They mentioned that its concept and functions lacked distinctive features, making it hard to identify what set it apart or gave it a competitive advantage in the market."
  },
  {
    type: "body",
    text: "In order to respond to the feedback, the future iteration of Backstage will aim at creating a more distinct and emotionally centered direction. Rather than copying other social models, the design will prioritize feelings and empathy — assisting customers in expressing vulnerability, experience comfort, and connect due to common experiences. The aim is identifying and addressing actual points of emotional hurt among socially anxious people, such as fear of rejection, inability to initiate conversations, and pressure in putting up social facades. By designing at points of emotional truth, Backstage can become a more legitimate and people-oriented social experience."
  },
  { type: "eyebrow", text: "User test 2" },
  { type: "heading", text: "Overview" },
  {
    type: "body",
    text: "This prototype was a low-fidelity website wireframe built in Figma and Framer, aiming to simulate the basic flow and interaction logic of a social app that promotes offline connections. It focused on four main screens:"
  },
  {
    type: "list",
    items: ["Homepage", "Event choose", "backstage", "login & signup page"]
  },
  {
    type: "body",
    text: "The goal was to see if users could figure out how to use the app and understand the content without any instructions."
  },
  { type: "heading", text: "User flow" },
  {
    type: "image",
    src: "/framer-assets/images/f78a0d3c7329c9f62b9e183fae6d54f11a1d880a.png",
    alt: "User flow diagram, test 2"
  },
  { type: "heading", text: "Feedback" },
  {
    type: "body",
    text: "Naming Confusion: Some members misinterpreted “Upcoming Performances” as play performances instead of social events. They offered more distinctive titles such as “Nearby Activities” in order to enhance understanding and interaction."
  },
  {
    type: "body",
    text: "Safety and Exposure Design: Members indicated fearfulness about platform safety and desired to see the concept for exposure therapy more reflected in the use of slow, activity-based progressions."
  },
  {
    type: "body",
    text: "Visual Weight and Theme: The dark topic was explained as too serious. Users suggested lighter and fluffy visual shades in order to produce a more friendly and emotionally encouraging environment."
  },
  {
    type: "body",
    text: "Spatial Cognition and Navigation: The dual-calendar structure caused confusion. Simplifying or merging overlapping sections was suggested to reduce users’ mental effort and improve clarity."
  },
  { type: "eyebrow", text: "Final project" },
  {
    type: "image",
    src: "/framer-assets/images/abfbb25869f710fb242d7441ce77a95df021ad48.png",
    alt: "Final project screens overview"
  },
  { type: "heading", text: "Style guide" },
  { type: "subheading", text: "Typography" },
  {
    type: "image",
    src: "/framer-assets/images/30810656e28623dcffdd5669b3d6603ae130054d.png",
    alt: "Typography style guide"
  },
  { type: "subheading", text: "Color Palette" },
  { type: "subheading", text: "Component Library" },
  {
    type: "image",
    src: "/framer-assets/images/56714211cdfe5990d6552c13e8144bf03b42ff91.png",
    alt: "Component library"
  },
  { type: "heading", text: "High-Fidelity" },
  {
    type: "image",
    src: "/framer-assets/images/c7b5b198ecbcc9e0361162f40233915523116c0c.png",
    alt: "High-fidelity screens"
  },
  {
    type: "cta",
    text: "Click here to try →",
    href: prototypeUrl
  }
]

function Block({ block, index }) {
  switch (block.type) {
    case "eyebrow":
      return (
        <h3 className={`${styles.eyebrow} ${styles.reveal}`}>{block.text}</h3>
      )
    case "heading":
      return (
        <h2 className={`${styles.heading} ${styles.reveal}`}>{block.text}</h2>
      )
    case "subheading":
      return (
        <h4 className={`${styles.subheading} ${styles.reveal}`}>{block.text}</h4>
      )
    case "body":
      return (
        <div className={`${styles.body} ${styles.reveal}`}>
          {block.text.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )
    case "list":
      return (
        <ul className={`${styles.list} ${styles.reveal}`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case "image":
      return (
        <div className={`${styles.imageWrap} ${styles.reveal}`}>
          <img src={block.src} alt={block.alt} className={styles.image} />
        </div>
      )
    case "cta":
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noreferrer"
          className={`${styles.cta} ${styles.reveal}`}
        >
          {block.text}
        </a>
      )
    default:
      return null
  }
}

export default function BackstagePage() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <SiteHeader active="/project" />

        <section className={styles.content}>
          <ProjectBackLink className={styles.reveal} />

          <h1 className={`${styles.title} ${styles.reveal}`}>Backstage</h1>

          <div className={styles.meta}>
            <p className={styles.category}>Brand Design</p>
            <p className={styles.year}>2025</p>
          </div>

          <div className={styles.article}>
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
