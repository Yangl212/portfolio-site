import InterestPage, { metadata as pageMetadata } from "../../interest/page"

/* Same page, entered from the UI/UX track. The content lives once, in
   app/interest - only the track differs, which keeps the header and its links
   inside /uiux. Canonical points at the root URL so one copy is indexed. */
export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/interest" }
}

export default function UiuxInterestPage({ locale = "en" }) {
  return <InterestPage track="uiux" locale={locale} />
}
