# 首页新方向预览：`/home-riso`

预览：`http://localhost:3000/home-riso`（线上是 `leleyang.com/home-riso`，已设 `noindex`，不进 sitemap）

原首页 `/` 一个字没动。这个路由是一份独立的副本，看效果用；定稿后再决定是替换 `/` 还是继续并存。

## 范围：只有 hero 是新的

- hero 铺满进入时的整个视口（视口高度减去页头高度），不往下滚看不到 Selected Work，和 adasilv2.framer.website 的首页一样。
- hero 以下的 Selected Work、More Work、页脚，直接复用现首页 `app/page.jsx` 的标记和 `app/page.module.css` 的样式，没有任何改动。要改下面的部分时另说。

## hero 是什么

- hero studies 里第三个"套印"方向：居中、两版油墨错位叠印出 LELE，`mix-blend-mode: multiply` 让重叠处变深；四角套准线；整块 hero 铺一层网点；两条蓝色页边批注；底部一行"印刷工单"列出页面用到的三个颜色。
- 油墨按你发的 riso 圣诞卡定的：荧光粉 `#ff48b0` + 天蓝 `#3fb0e6`，叠印处出紫色。改 `page.module.css` 顶部 `.hero` 里的 `--ink-a` / `--ink-b` 即可整体换色。
- 加载时两版油墨从大错位滑到小错位，1.1 秒，只一次；其余元素沿用站点现有的上浮显现。系统开了"减少动态效果"时全部静止。
- 页头是站点现有的 `SiteHeader`，Work / Interest / Resume / Let's talk 仍在右上角。
- 字体：正文 Satoshi（站点自带），批注、标签、工单用 DM Mono，通过 `next/font/google` 加载并自托管，只作用于这一页。
- 文案按"UI/UX 为主、视觉/平面为辅"写；第二行沿用现首页 status 行原文，没有新增事实。

## 还要你定的

1. hero 批注 "Lele · say it like “luh-luh”" 的读法是否准确；不要的话删掉那一行。
2. 大字用 "LELE" 还是 "LELE YANG"。

## 文件

- `app/home-riso/page.jsx`、`app/home-riso/page.module.css`
- 没有改动任何共享组件，也没有改 `app/page.jsx` / `app/page.module.css`。
