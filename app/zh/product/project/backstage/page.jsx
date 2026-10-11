/* Chinese mirror of the English route at /product/project/backstage - same
   page, locale="zh". The Chinese share card is the one /zh/project/backstage
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/backstage/page"
import { metadata as zhProjectMetadata } from "../../../project/backstage/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/backstage" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
