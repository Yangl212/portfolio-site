/* Chinese mirror of the English route at /product/about - same page,
   locale="zh". The Chinese share card is the one /zh/about already
   carries, so the translated copy lives in one place. */
import AboutPage from "../../../about/page"
import { metadata as zhPageMetadata } from "../../about/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/product/about" }
}

export default function ZhProductAboutPage() {
  return <AboutPage track="product" locale="zh" />
}
