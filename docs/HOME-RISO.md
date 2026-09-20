# 首页新方向预览：`/home-riso`

预览：`http://localhost:3000/home-riso`（线上是 `leleyang.com/home-riso`，已设 `noindex`，不进 sitemap）

原首页 `/` 一个字没动。这个路由是一份独立的副本，看效果用；定稿后再决定是替换 `/` 还是继续并存。

## 它是什么

- hero 用的是 hero studies 里第三个"套印"方向：居中、两版油墨（红 `#d84024` + 蓝 `#2f45ce`）错位叠印出 LELE，`mix-blend-mode: multiply` 让重叠处变深；四角套准线；整块 hero 铺一层网点；两条蓝色页边批注；底部一行"印刷工单"列出页面用到的三个颜色。
- 加载时两版油墨从大错位滑到小错位，1.1 秒，只一次；其余元素沿用站点现有的上浮显现。系统开了"减少动态效果"时全部静止。
- 页头是站点现有的 `SiteHeader`，Work / Interest / Resume / Let's talk 仍在右上角。
- 字体：正文 Satoshi（站点自带），批注、标签、工单用 DM Mono，通过 `next/font/google` 加载并自托管，只作用于这一页。

## 内容来源（没有任何新编的事实）

| 区块 | 来源 |
| --- | --- |
| hero 文案 | 按"UI/UX 为主、视觉/平面为辅"改写；第二行沿用现首页 status 行 |
| Selected work（三张卡） | `lib/projects.js` 的 `featuredProjects("uiux")` |
| More work | 现有 `MoreWorkCarousel` |
| Experience 三段、Education 两段、Skills | `public/resume.pdf` |
| About 两段 | Interest 页的自述 + 简历 |
| Off the clock 三张图 | Interest 页现有图片 |
| 联系方式 | Contact 页（邮箱、LinkedIn、Instagram；电话没放） |

参考站是 adasilv2.framer.website 的首页结构（居中 hero → 精选项目 → 经历 → 自我介绍 → 评价 → 联系）。"他人评价"这一段没有做，因为没有现成的评价内容，不编。

## 还要你定的

1. hero 批注 "Lele · say it like “luh-luh”" 的读法是否准确；不要的话删掉那一行。
2. 大字用 "LELE" 还是 "LELE YANG"。
3. 两版油墨颜色：现在是 hero studies 里的红+蓝。要换成 riso 的其他色（荧光粉、蓝、黄）改 `page.module.css` 顶部的 `--ink-a` / `--ink-b` 即可；页面里所有红色强调（区块小标题、经历高亮卡、封面 hover）都跟着 `--ink-a` 走。
4. 精选项目封面 hover 时会变成"单色印刷"（去色 + 红色叠印）。不喜欢就删掉 `.cover::after` 和 `.cover:hover img` 两条规则。

## 文件

- `app/home-riso/page.jsx`、`app/home-riso/page.module.css`
- 没有改动任何共享组件。
