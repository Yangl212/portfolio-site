/* Chinese mirror of the English route at /product/project/alcohol - same
   page, locale="zh". The Chinese share card is the one /zh/project/alcohol
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/alcohol/page"
import { metadata as zhProjectMetadata } from "../../../project/alcohol/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/alcohol" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
