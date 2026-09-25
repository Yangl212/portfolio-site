/* Chinese mirror of the English route at /about. The shared page selects
   its Chinese article, labels and image notes through locale="zh". */
import AboutPage, { metadata as pageMetadata } from "../../about/page"

export const metadata = {
  ...pageMetadata,
  title: "关于我",
  description:
    "关于我怎么看美感、逻辑和用户测试，为什么把游戏当作一种媒介，以及 AI 怎样改变了我的工作方式。",
  alternates: { canonical: "/zh/about" }
}

export default function ZhAboutPage() {
  return <AboutPage locale="zh" />
}
