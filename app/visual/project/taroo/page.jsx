import TarooPage from "../../../project/taroo/page"

/* Same case study, entered from the visual track. The page content lives once,
   in app/project/taroo - only the track differs, which is what keeps the
   header, "All Projects", and prev/next pointing back at /visual.

   Canonical points at the UI/UX URL so search engines index one copy; both URLs
   stay fully usable when linked directly. */
export const metadata = {
  alternates: { canonical: "/project/taroo" }
}

export default function VisualProjectPage() {
  return <TarooPage track="visual" />
}
