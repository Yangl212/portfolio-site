import ResumePage, { metadata as pageMetadata } from "../../resume/page"

/* Same page, entered from the UI/UX track. The content lives once, in
   app/resume - only the track differs, which keeps the header and its links
   inside /uiux. Canonical points at the root URL so one copy is indexed. */
export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/resume" }
}

export default function UiuxResumePage({ locale = "en" }) {
  return <ResumePage track="uiux" locale={locale} />
}
