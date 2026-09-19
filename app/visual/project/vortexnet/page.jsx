import VortexNetPage, { metadata as projectMetadata } from "../../../project/vortexnet/page"

/* Same case study, entered from the visual track. The page content lives once,
   in app/project/vortexnet - only the track differs, which is what keeps the
   header, "All Projects", and prev/next pointing back at /visual.

   Canonical points at the UI/UX URL so search engines index one copy; both URLs
   stay fully usable when linked directly. */
export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/project/vortexnet" }
}

export default function VisualProjectPage() {
  return <VortexNetPage track="visual" />
}
