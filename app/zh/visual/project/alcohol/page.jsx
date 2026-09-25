/* Chinese mirror of the English route at /visual/project/alcohol - same page, locale="zh".
   See lib/locale.js for why this lives as a sibling file instead of a
   [locale] dynamic segment: it keeps every existing English URL untouched.
   Case-study/essay body prose is still English here until translated;
   only the site chrome (nav, footer, field labels) reads Chinese. */
import Page, { metadata as projectMetadata } from "../../../../project/alcohol/page"

export const metadata = {
  ...projectMetadata,
  description:
    "一本记录纽约鸡尾酒的孔版印刷小册子。每杯酒占一个跨页，写下酒名、酒吧、地址，还有我记得的味道。",
  alternates: { canonical: "/zh/visual/project/alcohol" }
}

export default function ZhVisualProjectPage() {
  return <Page track="visual" locale="zh" />
}
