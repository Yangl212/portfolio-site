/* Chinese mirror of the English route at /visual/project/boa-budgeting - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../../project/boa-budgeting/page"
import { translateCard } from "../../../../../lib/share"

export const metadata = {
  ...projectMetadata,
  alternates: { canonical: "/zh/visual/project/boa-budgeting" },
  ...translateCard(projectMetadata, {
    description:
      "我重新设计了移动端和网页端的预算功能。两轮任务测试后，6 位参与者中，能在没有提示的情况下完成预算重新分配的人从 2 位增加到 5 位；发现超支所需的中位时间也从 41 秒降到了 24 秒。"
  })
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
