/* Chinese mirror of /uiux/project/vortexnet. The Chinese share card is the
   one /zh/project/vortexnet already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/vortexnet/page"
import { metadata as zhProjectMetadata } from "../../../project/vortexnet/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/vortexnet" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
