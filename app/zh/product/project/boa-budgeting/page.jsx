/* Chinese mirror of the English route at /product/project/boa-budgeting - same
   page, locale="zh". The Chinese share card is the one /zh/project/boa-budgeting
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/boa-budgeting/page"
import { metadata as zhProjectMetadata } from "../../../project/boa-budgeting/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/boa-budgeting" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
