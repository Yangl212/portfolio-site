/* Chinese mirror of the English route at /product/lab - same page,
   locale="zh". The Chinese share card is the one /zh/lab already
   carries, so the translated copy lives in one place. */
import LabPage from "../../../lab/page"
import { metadata as zhPageMetadata } from "../../lab/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/product/lab" }
}

export default function ZhProductLabPage() {
  return <LabPage track="product" locale="zh" />
}
