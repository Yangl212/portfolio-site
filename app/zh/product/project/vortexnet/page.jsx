/* Chinese mirror of the English route at /product/project/vortexnet - same
   page, locale="zh". The Chinese share card is the one /zh/project/vortexnet
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/vortexnet/page"
import { metadata as zhProjectMetadata } from "../../../project/vortexnet/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/vortexnet" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
