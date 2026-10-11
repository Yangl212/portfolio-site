/* Chinese mirror of /uiux/project/bubu. The Chinese share card is the
   one /zh/project/bubu already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/bubu/page"
import { metadata as zhProjectMetadata } from "../../../project/bubu/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/bubu" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
