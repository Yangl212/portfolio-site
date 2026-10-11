/* Chinese mirror of /uiux/project/taroo. The Chinese share card is the
   one /zh/project/taroo already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/taroo/page"
import { metadata as zhProjectMetadata } from "../../../project/taroo/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/taroo" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
