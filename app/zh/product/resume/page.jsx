/* Chinese mirror of the English route at /product/resume - same page,
   locale="zh". The Chinese share card is the one /zh/resume already
   carries, so the translated copy lives in one place. */
import ResumePage from "../../../resume/page"
import { metadata as zhPageMetadata } from "../../resume/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/product/resume" }
}

export default function ZhProductResumePage() {
  return <ResumePage track="product" locale="zh" />
}
