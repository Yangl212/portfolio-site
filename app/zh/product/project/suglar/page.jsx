/* Chinese mirror of the English route at /product/project/suglar - same
   page, locale="zh". The Chinese share card is the one /zh/project/suglar
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/suglar/page"
import { metadata as zhProjectMetadata } from "../../../project/suglar/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/suglar" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
