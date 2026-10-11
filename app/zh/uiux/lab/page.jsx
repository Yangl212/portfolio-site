/* Chinese mirror of /uiux/lab. The Chinese share card is the one
   /zh/lab already carries, so the translated copy lives in one place. */
import LabPage from "../../../lab/page"
import { metadata as zhPageMetadata } from "../../lab/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/uiux/lab" }
}

export default function ZhUiuxLabPage() {
  return <LabPage track="uiux" locale="zh" />
}
