import Page, { metadata as projectMetadata } from "../../../project/suglar/page"

/* Same case study, entered from the product track. The page content lives
   once, in app/project/suglar - only the track differs, which keeps the
   header, "All Projects" and prev/next pointing back at /product.

   Canonical points at the UI/UX URL so search engines index one copy; both
   URLs stay fully usable when linked directly. */
export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/project/suglar" }
}

export default function ProductProjectPage() {
  return <Page track="product" />
}
