import Link from "next/link"
import { DM_Mono } from "next/font/google"

import { MoreWorkCarousel } from "../../components/MoreWorkCarousel"
import { Reveal } from "../../components/Reveal"
import { SiteFooter } from "../../components/SiteFooter"
import { SiteHeader } from "../../components/SiteHeader"
import { featuredProjects, moreProjects } from "../../lib/projects"

import styles from "./page.module.css"

/*
 * A second home page, kept beside the live one so the two can be compared.
 * The hero prints the name in two misregistered inks - the language of the
 * riso zines in the visual track - and the rest of the page fills in what the
 * current home leaves out: experience, education, a short bio, and a contact
 * strip. Every fact on it comes from the resume, the case studies or the
 * Interest page; nothing here is new information.
 *
 * Not indexed while it is a preview.
 */
export const metadata = {
  title: { absolute: "Lele Yang — Product Designer" },
  description:
    "UI/UX designer with a visual designer's eye, based in New York. Case studies in fintech, AI scheduling, an AI detective game, and print.",
  robots: { index: false, follow: false }
}

/* The site sets Satoshi itself; the print-shop annotations want a mono. */
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" })

const TRACK = "uiux"

const experience = [
  {
    company: "VortexNet",
    role: "UI/UX Designer · Data Visualization",
    place: "Covina, CA",
    when: "Jun – Oct 2025",
    body: "Redesigned the landing overview and navigation of a 30-person company's internal finance dashboard. Both shipped during the internship after testing with 10 colleagues.",
    href: "/project/vortexnet",
    featured: true
  },
  {
    company: "Mango TV",
    role: "UX / Narrative Design Intern",
    place: "Changsha, China",
    when: "Feb – Apr 2022",
    body: "Mobile-first campaign pages and editorial layouts; compared layout variants for readability and applied the results to typography, spacing and content order."
  },
  {
    company: "Movie Cheese Pie",
    role: "Visual & UX Design Intern",
    place: "Beijing, China",
    when: "Oct – Dec 2020",
    body: "Turned film and editorial research into timelines and information graphics for digital and social channels."
  }
]

const education = [
  { school: "Parsons School of Design", degree: "MFA Design and Technology", when: "2024 – 2026" },
  { school: "Beijing Film Academy", degree: "BFA Digital Media Art", when: "2019 – 2023" }
]

const skills = [
  { label: "Design", items: "Interaction design, information architecture, user research, prototyping, design systems, data visualization" },
  { label: "Tools", items: "Figma, Framer, Adobe Creative Suite, Procreate" },
  { label: "Code", items: "HTML / CSS / JavaScript, AI-assisted builds for working prototypes" }
]

/* Pulled from the Interest page, so the strip shows the real spreads and photos. */
const offTheClock = [
  { src: "/framer-assets/images/219c18200500043bc20818d114dd7b0361002d65.jpg", alt: "Watercolor zine detail", label: "Zine" },
  { src: "/framer-assets/images/fa185a10f40131e943355fcaa6c679e2850c2578.png", alt: "Kyoto, Japan", label: "Kyoto · 2024" },
  { src: "/framer-assets/images/ab5ecd6c90cf97f5cce88865d79d15ec6e0bf1d2.jpg", alt: "Hudson, New York", label: "Hudson · 2025" }
]

function RegMark({ className }) {
  return (
    <svg className={`${styles.reg} ${className}`} viewBox="0 0 20 20" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" fill="none"><path d="M10 0v20M0 10h20" /><circle cx="10" cy="10" r="5" /></g>
    </svg>
  )
}

export default function HomeRisoPage() {
  const featured = featuredProjects(TRACK)
  const more = moreProjects(TRACK)

  return (
    <main className={`${styles.page} ${mono.variable}`}>
      <Reveal fade={`.${styles.rv}`} />
      <div className={styles.frame}>
        <SiteHeader active="/" track={TRACK} />

        <section className={styles.hero} aria-labelledby="hero-name">
          <div className={styles.grain} aria-hidden="true" />
          <RegMark className={styles.regTL} />
          <RegMark className={styles.regTR} />
          <RegMark className={styles.regBL} />
          <RegMark className={styles.regBR} />

          <div className={styles.heroIn}>
            <p className={`${styles.eyebrow} ${styles.rise}`}>UI/UX &amp; Visual Designer · New York</p>

            {/* Two plates of the same word. Each is out of register the other
                way, and multiply darkens the overlap the way ink does. */}
            <h1 id="hero-name" className={styles.op} aria-label="Lele Yang">
              <span className={`${styles.plate} ${styles.plateA}`} aria-hidden="true">Lele</span>
              <span className={`${styles.plate} ${styles.plateB}`} aria-hidden="true">Lele</span>
            </h1>

            <p className={`${styles.opSub} ${styles.rise}`} style={{ animationDelay: "160ms" }}>
              UI/UX designer with a visual designer&apos;s eye. Clear, trustworthy interfaces for complex systems and AI, plus the data visualization, brand and print work around them.
            </p>

            <p className={`${styles.opFacts} ${styles.rise}`} style={{ animationDelay: "240ms" }}>
              <span>Parsons MFA &rsquo;26</span>
              <span>Previously UI/UX at VortexNet</span>
              <span>Open to product design roles across the U.S.</span>
            </p>

            <div className={`${styles.opActions} ${styles.rise}`} style={{ animationDelay: "320ms" }}>
              <a className={styles.primary} href="#work">Selected work <span aria-hidden="true">↓</span></a>
              <a className={styles.secondary} href="/resume.pdf" target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
            </div>

            <aside className={`${styles.marg} ${styles.marg1}`}>two inks, six pixels<br />out of register —<br />on purpose</aside>
            <aside className={`${styles.marg} ${styles.marg2}`}>Lele · say it<br />like &ldquo;luh-luh&rdquo;</aside>
          </div>

          {/* The job ticket: what this page is printed with. All three are
              the page's actual colours. */}
          <p className={`${styles.ticket} ${styles.rise}`} style={{ animationDelay: "480ms" }}>
            <span className={styles.ticketLabel}>Printed in three inks</span>
            <span className={styles.swatch}><i style={{ background: "#222222" }} />Black</span>
            <span className={styles.swatch}><i style={{ background: "var(--ink-a)" }} />Bright red</span>
            <span className={styles.swatch}><i style={{ background: "var(--ink-b)" }} />Blue</span>
            <span className={styles.ticketStock}>on #e4e2e2 stock</span>
          </p>
        </section>

        <div className={styles.content}>
          <section id="work" className={`${styles.block} ${styles.rv}`} aria-labelledby="work-title">
            <header className={styles.blockHead}>
              <div>
                <p className={styles.kicker}>Selected work</p>
                <h2 id="work-title">Three case studies, tested with real people.</h2>
              </div>
              <a className={styles.seeAll} href="#more">All nine projects <span aria-hidden="true">↓</span></a>
            </header>

            <div className={styles.featuredGrid}>
              {featured.map((project, index) => (
                <article className={styles.card} key={project.href}>
                  <Link href={project.href} className={styles.cover} aria-label={project.title}>
                    <img src={project.image} alt="" width={1600} height={1000} decoding="async" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} />
                  </Link>
                  <div className={styles.cardMeta}>
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>
                  <h3><Link href={project.href}>{project.title}</Link></h3>
                  <p>{project.description}</p>
                  <Link href={project.href} className={styles.caseLink}>View case study <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </section>

          <div id="more" className={styles.rv}>
            <MoreWorkCarousel className={styles.moreWork} projects={more} />
          </div>

          <section className={`${styles.block} ${styles.rv}`} aria-labelledby="exp-title">
            <header className={styles.blockHead}>
              <div>
                <p className={styles.kicker}>Experience</p>
                <h2 id="exp-title">Where I&apos;ve worked.</h2>
              </div>
              <a className={styles.seeAll} href="/resume.pdf" target="_blank" rel="noreferrer">Full resume <span aria-hidden="true">↗</span></a>
            </header>

            <div className={styles.expGrid}>
              <ol className={styles.timeline}>
                {experience.map((job) => (
                  <li key={job.company} className={job.featured ? styles.jobFeatured : styles.job}>
                    <p className={styles.jobWhen}>{job.when}<span aria-hidden="true"> · </span>{job.place}</p>
                    <h3>{job.role}<span className={styles.at}> @ {job.company}</span></h3>
                    <p className={styles.jobBody}>{job.body}</p>
                    {job.href ? <Link href={job.href} className={styles.caseLink}>Read the case study <span aria-hidden="true">→</span></Link> : null}
                  </li>
                ))}
              </ol>

              <div className={styles.expSide}>
                <div className={styles.sideGroup}>
                  <p className={styles.kicker}>Education</p>
                  <ul className={styles.eduList}>
                    {education.map((item) => (
                      <li key={item.school}>
                        <strong>{item.school}</strong>
                        <span>{item.degree}</span>
                        <span className={styles.eduWhen}>{item.when}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.sideGroup}>
                  <p className={styles.kicker}>Skills</p>
                  <dl className={styles.skillList}>
                    {skills.map((group) => (
                      <div key={group.label}><dt>{group.label}</dt><dd>{group.items}</dd></div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.block} ${styles.rv}`} aria-labelledby="about-title">
            <header className={styles.blockHead}>
              <div>
                <p className={styles.kicker}>About</p>
                <h2 id="about-title">Hi, I&apos;m Lele.</h2>
              </div>
              <Link className={styles.seeAll} href="/interest">More on the Interest page <span aria-hidden="true">→</span></Link>
            </header>

            <div className={styles.aboutGrid}>
              <div className={styles.aboutCopy}>
                <p>
                  I&apos;m a UI/UX designer finishing an MFA at Parsons, with a visual and graphic design habit I never dropped: zines, posters and layouts made for fun, and a soft spot for riso and paper. Before New York I studied digital media art in Beijing and interned across UX, narrative and visual design.
                </p>
                <p>
                  Off the clock I follow anime-inspired fashion, sometimes design outfits myself, and cook a lot. Photography is how I slow down.
                </p>
              </div>

              <ul className={styles.offClock} aria-label="Off the clock">
                {offTheClock.map((item, index) => (
                  <li key={item.src} style={{ "--tilt": `${(index - 1) * 2.4}deg` }}>
                    <Link href="/interest">
                      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={`${styles.contactStrip} ${styles.rv}`} aria-label="Contact">
            <p className={styles.contactLead}>Let&apos;s talk.</p>
            <div className={styles.contactPills}>
              <a href="mailto:Lelework1211@gmail.com">Lelework1211@gmail.com</a>
              <a href="https://www.linkedin.com/in/leleyang1211" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href="https://www.instagram.com/shanjio17" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </div>

        <SiteFooter />
      </div>
    </main>
  )
}
