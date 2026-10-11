/* Chinese mirror of /uiux/project/alcohol. The Chinese share card is the
   one /zh/project/alcohol already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/alcohol/page"
import { metadata as zhProjectMetadata } from "../../../project/alcohol/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/alcohol" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
