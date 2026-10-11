/* Chinese mirror of the English route at /product/project/graveyard - same
   page, locale="zh". The Chinese share card is the one /zh/project/graveyard
   already carries, so the translated copy lives in one place. */
import Page from "../../../../project/graveyard/page"
import { metadata as zhProjectMetadata } from "../../../project/graveyard/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/product/project/graveyard" }
}

export default function ZhProductProjectPage() {
  return <Page track="product" locale="zh" />
}
