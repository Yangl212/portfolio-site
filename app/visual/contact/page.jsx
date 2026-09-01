import ContactPage from "../../contact/page"

/* Same page, entered from the visual track. The content lives once, in
   app/contact - only the track differs, which keeps the header's Work, Interest,
   and Let's talk links inside /visual instead of dropping the reader into the
   UI/UX home.

   Canonical points at the UI/UX URL so search engines index one copy. */
export const metadata = {
  alternates: { canonical: "/contact" }
}

export default function VisualPage() {
  return <ContactPage track="visual" />
}
