/* Chinese mirror of the English route at /project/backstage - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../project/backstage/page"
import { translateCard } from "../../../../lib/share"

export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/zh/project/backstage" },
  ...translateCard(projectMetadata, {
    description:
      "把共同的兴趣和都空着的时间凑在一起，变成一次真的会发生的线下见面。"
  })
}

export default function ZhProjectPage() {
  return <Page track="uiux" locale="zh" />
}
