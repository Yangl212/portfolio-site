/* Chinese mirror of the English route at /product/project/cleared - same
   page, locale="zh". The Chinese share card is the one /zh/project/cleared
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/cleared/page"
import { metadata as zhProjectMetadata } from "../../../project/cleared/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/cleared" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
