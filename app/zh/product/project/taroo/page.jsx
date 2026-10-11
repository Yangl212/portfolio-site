/* Chinese mirror of the English route at /product/project/taroo - same
   page, locale="zh". The Chinese share card is the one /zh/project/taroo
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/taroo/page"
import { metadata as zhProjectMetadata } from "../../../project/taroo/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/taroo" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
