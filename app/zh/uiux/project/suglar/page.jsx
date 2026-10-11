/* Chinese mirror of /uiux/project/suglar. The Chinese share card is the
   one /zh/project/suglar already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/suglar/page"
import { metadata as zhProjectMetadata } from "../../../project/suglar/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/suglar" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
