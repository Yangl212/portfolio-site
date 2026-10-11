/* Chinese mirror of /uiux/about. The Chinese share card is the one
   /zh/about already carries, so the translated copy lives in one place. */
import AboutPage from "../../../about/page"
import { metadata as zhPageMetadata } from "../../about/page"

export const metadata = {
  ...zhPageMetadata,
  alternates: { canonical: "/zh/uiux/about" }
}

export default function ZhUiuxAboutPage() {
  return <AboutPage track="uiux" locale="zh" />
}
