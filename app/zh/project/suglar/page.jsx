/* Chinese mirror of the English route at /project/suglar - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../project/suglar/page"
import { translateCard } from "../../../../lib/share"

export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/zh/project/suglar" },
  ...translateCard(projectMetadata, {
    description:
      "我把真的糖果做成了桌游组件。玩家要靠看、摸、闻、尝来判断下一颗糖，吃得太多反而会输。"
  })
}

export default function ZhProjectPage() {
  return <Page track="uiux" locale="zh" />
}
