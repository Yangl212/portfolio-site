import { ResumeSheet } from "./ResumeSheet"

export const metadata = {
  title: "Resume",
  description:
    "Lele Yang's resume: UI/UX design work at VortexNet, case studies in fintech and AI, and an MFA at Parsons."
}

const education = [
  {
    degree: "Master of Fine Arts in Design and Technology · GPA 3.98/4.00",
    school: "Parsons School of Design, The New School",
    place: "New York, NY",
    dates: "Sep. 2024 – Jun. 2026"
  },
  {
    degree: "Bachelor of Fine Arts in Digital Media Art · GPA 3.48/4.00",
    school: "Beijing Film Academy",
    place: "Beijing, China",
    dates: "Aug. 2019 – Jul. 2023"
  }
]

const experience = [
  {
    company: "Vortex Net",
    icon: "/resume/vortexnet-logo.png",
    title: "UI/UX Designer — Data Visualization",
    place: "Covina, CA",
    dates: "Jun. 2025 – Oct. 2025",
    summary:
      "Redesigned the landing overview and navigation of the internal finance dashboard a ~30-person team uses daily, cutting the time to locate a day's work from 20–30s to about 8s after testing with 10 colleagues. Regrouped a flat 14-entry menu into task-based sections and built a priority model with product and data stakeholders to decide what belongs on the landing screen."
  },
  {
    company: "Mango TV",
    icon: "/resume/mango-logo.png",
    title: "UX / Narrative Design Intern",
    place: "Changsha, China",
    dates: "Feb. 2022 – Apr. 2022",
    photos: ["/resume/mango-photo.jpg", "/resume/mango-photo-2.jpg"],
    summary:
      "Designed mobile-first campaign pages and editorial layouts, comparing layout variants for readability and applying the results to typography, spacing and content order."
  },
  {
    company: "Movie Cheese Pie",
    icon: "/resume/moviecheesepie-logo.jpg",
    title: "Visual & UX Design Intern",
    place: "Beijing, China",
    dates: "Oct. 2020 – Dec. 2020",
    noPhotos: true,
    summary:
      "Turned film and editorial research into timelines and information graphics for digital and social channels, working closely with the editorial team."
  }
]

/* Every icon here is left empty on purpose: a real tool mark (Figma,
   Framer, Adobe's apps) is a trademark, not an asset this codebase ships,
   so each slot renders as the same dashed placeholder the rest of the
   site uses until the real files are dropped into /public and named
   here - see the note where this is rendered. */
const skillGroups = [
  {
    label: "Design",
    mode: "text",
    items: [
      { name: "Interaction Design" },
      { name: "User Research" },
      { name: "Prototyping" },
      { name: "Design Systems" },
      { name: "Data Viz" },
      { name: "Accessibility" }
    ]
  },
  {
    label: "Tools",
    items: [
      { name: "Figma", icon: "/resume/skill-figma-v2.png" },
      { name: "Framer", icon: "/resume/skill-framer.png" },
      { name: "Adobe CS", icon: "/resume/skill-photoshop.png" },
      { name: "Procreate", icon: "/resume/skill-procreate.png" }
    ]
  },
  {
    label: "Code",
    items: [
      { name: "HTML/CSS/JS", icon: "/resume/skill-vscode.png", iconPad: 8 },
      { name: "Claude Code", icon: "/resume/skill-claude-code.png" },
      { name: "Codex", icon: "/resume/skill-codex.png" }
    ]
  }
]

export default function ResumePage() {
  return (
    <ResumeSheet
      track="uiux"
      role="UI/UX Designer"
      photo="/resume/photo.jpg"
      education={education}
      experience={experience}
      skillGroups={skillGroups}
      pdf="/resume.pdf"
    />
  )
}
