/* Chinese mirror of /uiux/project/boa-budgeting. The Chinese share card is the
   one /zh/project/boa-budgeting already carries, so the translated copy lives in
   one place. */
import Page from "../../../../project/boa-budgeting/page"
import { metadata as zhProjectMetadata } from "../../../project/boa-budgeting/page"

export const metadata = {
  ...zhProjectMetadata,
  alternates: { canonical: "/zh/uiux/project/boa-budgeting" }
}

export default function ZhUiuxProjectPage() {
  return <Page track="uiux" locale="zh" />
}
