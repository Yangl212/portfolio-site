/* Chinese mirror of /uiux/project/backstage. The Chinese share card is the
   one /zh/project/backstage already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/backstage/page"
import { metadata as zhProjectMetadata } from "../../../project/backstage/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/backstage" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
