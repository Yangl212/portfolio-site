/* Chinese mirror of /uiux/project/lastmessage. The Chinese share card is the
   one /zh/project/lastmessage already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/lastmessage/page"
import { metadata as zhProjectMetadata } from "../../../project/lastmessage/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/lastmessage" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
