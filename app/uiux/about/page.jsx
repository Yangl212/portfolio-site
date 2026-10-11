import AboutPage, { metadata as pageMetadata } from "../../about/page"

/* Same page, entered from the UI/UX track. The content lives once, in
   app/about - only the track differs, which keeps the header and its links
   inside /uiux. Canonical points at the root URL so one copy is indexed. */
export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/about" }
}

export default function UiuxAboutPage({ locale = "en" }) {
  return <AboutPage track="uiux" locale={locale} />
}
