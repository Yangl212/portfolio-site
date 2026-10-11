/* Chinese mirror of /uiux/project/cleared. The Chinese share card is the
   one /zh/project/cleared already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/cleared/page"
import { metadata as zhProjectMetadata } from "../../../project/cleared/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/cleared" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
