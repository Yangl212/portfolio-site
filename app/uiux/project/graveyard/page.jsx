import Page, { metadata as projectMetadata } from "../../../project/graveyard/page"

/* Same case study, entered from the UI/UX track. The page content lives
   once, in app/project/graveyard - only the track differs, which keeps the
   header, "All Projects" and prev/next pointing back at /uiux. Canonical
   points at the root URL so one copy is indexed. */
export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/project/graveyard" }
}

export default function UiuxProjectPage() {
  return <Page track="uiux" />
}
