/* Chinese mirror of the English route at /product/project/bubu - same
   page, locale="zh". The Chinese share card is the one /zh/project/bubu
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/bubu/page"
import { metadata as zhProjectMetadata } from "../../../project/bubu/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/bubu" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
