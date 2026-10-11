/* Chinese mirror of the English route at /product/interest - same page,
   locale="zh". The Chinese share card is the one /zh/interest already
   carries, so the translated copy lives in one place. */
import InterestPage from "../../../interest/page"
import { metadata as zhPageMetadata } from "../../interest/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/product/interest" }
}

export default function ZhProductInterestPage() {
  return <InterestPage track="product" locale="zh" />
}
