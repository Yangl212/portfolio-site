/* Chinese mirror of /uiux/project/graveyard. The Chinese share card is the
   one /zh/project/graveyard already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/graveyard/page"
import { metadata as zhProjectMetadata } from "../../../project/graveyard/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/graveyard" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
