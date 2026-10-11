import LabPage, { metadata as pageMetadata } from "../../lab/page"

/* Same page, entered from the UI/UX track. The content lives once, in
   app/lab - only the track differs, which keeps the header and its links
   inside /uiux. Canonical points at the root URL so one copy is indexed. */
export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/lab" }
}

export default function UiuxLabPage({ locale = "en" }) {
  return <LabPage track="uiux" locale={locale} />
}
