/* Chinese mirror of the English route at /project/vortexnet - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../project/vortexnet/page"
import { translateCard } from "../../../../lib/share"

export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/zh/project/vortexnet" },
  ...translateCard(projectMetadata, {
    description:
      "我按日常任务重新整理了一套内部金融仪表盘的信息架构。和 10 位同事测试后，查找「待结算」「趋势」等信息的时间从约 20–30 秒缩短到约 8 秒。"
  })
}

export default function ZhProjectPage() {
  return <Page track="uiux" locale="zh" />
}
