import { ResumeSheet } from "../../resume/ResumeSheet"

export const metadata = {
  title: "Resume",
  description:
    "Lele Yang's resume: visual and brand design work at VortexNet, TAROO and the Alcohol Directory zine, and an MFA at Parsons.",
  alternates: { canonical: "/resume" }
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
    title: "Data Visualization",
    place: "Covina, CA",
    dates: "Jun. 2025 – Oct. 2025",
    summary:
      "Redesigned financial dashboards and spend-analysis experiences, translating dense financial data into clear visual hierarchies and responsive chart layouts. Built reusable data-visualization systems and patterns in Figma with product and data stakeholders, contributing to a 15% increase in task success."
  },
  {
    company: "Mango TV",
    icon: "/resume/mango-logo.png",
    title: "UX / Narrative Design Intern",
    place: "Changsha, China",
    dates: "Feb. 2022 – Apr. 2022",
    photos: ["/resume/mango-photo.jpg", "/resume/mango-photo-2.jpg"],
    summary:
      "Designed mobile-first campaign experiences and editorial layouts, using A/B comparisons and usability testing to refine typography, spacing and hierarchy — improving readability by 20%."
  },
  {
    company: "Movie Cheese Pie",
    icon: "/resume/moviecheesepie-logo.jpg",
    title: "Visual Design Intern",
    place: "Beijing, China",
    dates: "Oct. 2020 – Dec. 2020",
    noPhotos: true,
    summary:
      "Transformed film and editorial content into timelines, diagrams and information graphics, collaborating with editorial and social media teams across multiple publishing channels."
  }
]

/* See the note beside the UI/UX track's skillGroups: every icon slot is
   left empty on purpose, waiting on real tool-mark files. */
const skillGroups = [
  {
    label: "Design",
    mode: "text",
    items: [
      { name: "Visual Identity" },
      { name: "Brand Design" },
      { name: "Typography" },
      { name: "Editorial" },
      { name: "Info Design" },
      { name: "Art Direction" }
    ]
  },
  {
    label: "Tools",
    items: [
      { name: "Figma", icon: "/resume/skill-figma-v2.png" },
      { name: "Photoshop", icon: "/resume/skill-photoshop.png" },
      { name: "Illustrator" },
      { name: "InDesign" },
      { name: "After Effects" },
      { name: "Premiere Pro" },
      { name: "Framer", icon: "/resume/skill-framer.png" },
      { name: "Procreate", icon: "/resume/skill-procreate.png" }
    ]
  }
]

export default function VisualResumePage() {
  return (
    <ResumeSheet
      track="visual"
      role="Visual Designer"
      photo="/resume/photo.jpg"
      education={education}
      experience={experience}
      skillGroups={skillGroups}
      pdf="/resume-visual.pdf"
    />
  )
}
