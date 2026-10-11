/* Chinese mirror of /uiux/interest. The Chinese share card is the one
   /zh/interest already carries, so the translated copy lives in one place. */
import InterestPage from "../../../interest/page"
import { metadata as zhPageMetadata } from "../../interest/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/uiux/interest" }
}

export default function ZhUiuxInterestPage() {
  return <InterestPage track="uiux" locale="zh" />
}
