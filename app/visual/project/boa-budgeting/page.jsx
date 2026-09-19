import UxCaseStudyPage, { metadata as projectMetadata } from "../../../project/boa-budgeting/page"

/* Same case study, entered from the visual track. The page content lives once,
   in app/project/boa-budgeting - only the track differs, which is what keeps the
   header, "All Projects", and prev/next pointing back at /visual.

   Canonical points at the UI/UX URL so search engines index one copy; both URLs
   stay fully usable when linked directly. */
export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/project/boa-budgeting" }
}

export default function VisualProjectPage() {
  return <UxCaseStudyPage track="visual" />
}
