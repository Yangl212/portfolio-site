import Page, { metadata as projectMetadata } from "../../../project/vortexnet/page"

/* Same case study, entered from the UI/UX track. The page content lives
   once, in app/project/vortexnet - only the track differs, which keeps the
   header, "All Projects" and prev/next pointing back at /uiux. Canonical
   points at the root URL so one copy is indexed. */
export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/project/vortexnet" }
}

export default function UiuxProjectPage() {
  return <Page track="uiux" />
}
