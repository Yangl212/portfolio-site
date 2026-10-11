/* Chinese mirror of /uiux/resume. The Chinese share card is the one
   /zh/resume already carries, so the translated copy lives in one place. */
import ResumePage from "../../../resume/page"
import { metadata as zhPageMetadata } from "../../resume/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/uiux/resume" }
}

export default function ZhUiuxResumePage() {
  return <ResumePage track="uiux" locale="zh" />
}
