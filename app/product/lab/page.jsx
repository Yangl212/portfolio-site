import LabPage, { metadata as pageMetadata } from "../../lab/page"

/* Same page, entered from the product track. The content lives once, in
   app/lab - only the track differs, which is what keeps the header,
   "All Projects" and prev/next pointing back at /product.

   Canonical points at the UI/UX URL so search engines index one copy; both
   URLs stay fully usable when linked directly. */
export const metadata = {
  ...pageMetadata,
  alternates: { canonical: "/lab" }
}

export default function ProductLabPage({ locale = "en" }) {
  return <LabPage track="product" locale={locale} />
}
