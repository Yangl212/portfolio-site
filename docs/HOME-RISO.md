# 首页新方向预览：`/home-riso`

预览：`http://localhost:3000/home-riso`（线上是 `leleyang.com/home-riso`，已设 `noindex`，不进 sitemap）

原首页 `/` 一个字没动。这个路由是一份独立的副本，看效果用；定稿后再决定是替换 `/` 还是继续并存。

## 范围

- hero 铺满进入时的整个视口，不往下滚看不到 Selected Work，和 adasilv2.framer.website 的首页一样。
- Selected Work（2026-09-20 改）：按参考站 Featured Projects 的做法改成三个"舞台"，见下一节。区块标题、More Work、页脚仍复用现首页 `app/page.jsx` / `app/page.module.css`，没改。

## Selected Work 舞台（`FeaturedStacks.jsx`）

每个案例是一块带色纸的舞台，上面叠着它自己的界面截图和一两枚数据贴纸，底部压一张标题卡（年份 · 时长 + 标题），下面是描述、Role 和 View case study。

- 素材全部来自站内已有文件，由 `scripts/home-riso-stage-build.cjs` 生成到 `public/home-riso/`：
  - BOA：三张视频海报里的手机（`boa/media/*-poster.webp`，脚本把浅灰底从边缘泛洪抠成透明再裁边）+ 原有透明手机 `boa/home-screen.png`。
  - VortexNet：交付版全屏 `shipped-screen` + 侧栏、指标、优先级三块裁片。
  - Last Message：透明笔记本 `lastmessage/cover.png` + chat / routes / boundary 三张场景海报。
- 贴纸上的数字都是案例页里的：2 of 6 → 5 of 6、41 s → 24 s、20–30 s → ~8 s、2 of 8 found the hidden route。Role 取自各案例页的 Role 行（Last Message 页没有 Role 行，用简历里的"end-to-end UX/UI design"写成 "UX/UI design, end to end"）。
- 动效：滚进视口时各层从下方依次落位（`Reveal` 给卡片打 `data-reveal="in"`，层用 CSS animation 错开 80ms）；悬停时底纸倾斜 3°、各层向外散开并各自旋转、主体略放大，弹簧缓动；指针在舞台上移动时各层按深度跟着倾斜。触屏没有悬停，舞台常驻在 35% 的散开状态。
- 每层的位置、大小、旋转和悬停位移都在 `FeaturedStacks.jsx` 顶部的 `stacks` 表里（百分比坐标），要微调直接改数字。
- 重新导出素材后跑 `node scripts/home-riso-stage-build.cjs`。

可以补的素材（可选）：BOA 三个界面如果有更高清的透明手机 mockup（PNG），VortexNet 如果有带透明底的笔记本 mockup，Last Message 如果有平板/手机框的透明截图，替换后会更精致；现在用的是海报抠图和平面截图。

## hero 是什么

- hero studies 里第三个"套印"方向：居中、两版油墨错位叠印出 LELE，`mix-blend-mode: multiply` 让重叠处变深；四角套准线；整块 hero 铺一层网点；两条蓝色页边批注；底部一行"印刷工单"列出页面用到的三个颜色。
- 油墨按你发的 riso 圣诞卡定的：荧光粉 `#ff48b0` + 天蓝 `#3fb0e6`，叠印处出紫色。改 `page.module.css` 顶部 `.hero` 里的 `--ink-a` / `--ink-b` 即可整体换色。
- 加载时两版油墨从大错位滑到小错位，1.1 秒，只一次；其余元素沿用站点现有的上浮显现。系统开了"减少动态效果"时全部静止。
- 页头是站点现有的 `SiteHeader`，Work / Interest / Resume / Let's talk 仍在右上角。
- 字体：正文 Satoshi（站点自带），批注、标签、工单用 DM Mono，通过 `next/font/google` 加载并自托管，只作用于这一页。
- 文案按"UI/UX 为主、视觉/平面为辅"写；第二行沿用现首页 status 行原文，没有新增事实。

## 页头（2026-09-20 改）

页头不再占 hero 的空间：`RevealHeader.jsx` 把 `SiteHeader` 固定在视口顶部、平时藏在上方，滚过 hero 的 82% 时滑下来，往回滚又收起。hero 因此是完整的 100svh。hero 自己有 Selected work 和 Resume 两个按钮，藏页头期间不缺入口。`#work` 锚点留了 84px 的 scroll-margin，跳过去时标题不会压在页头下面。

## 动效（2026-09-20 加，同日升级成"拉网印"）

hero 是客户端组件 `RisoHero.jsx`：

1. **加载 = 拉一张印**：一把刮板从左往右刮过，粉版在它后面显出来；第二把从右往左，蓝版落下，略微错位。之后两版各自以 9 秒 / 11 秒的周期缓慢漂移，印刷面永远不是死的。时间线：粉 240ms 起、蓝 1300ms 起、批注/印章/控制条 2300ms 淡入。
2. **点 LELE 再拉一张**：同样两次刮板，错位随机换一组（粉版 -5±3 / -4±2 px，蓝版 5±3 / 4±2 px），工单上的 "Pull 01" 计数加一。工单右侧还有一个 "Pull another" 按钮，是键盘可达的入口。
3. **跟鼠标**：粉版和蓝版沿光标方向反向拉开（最多 ±13px），批注、印章、控制条、两条描边字各按不同深度平移；光标附近网点变大像油墨晕开；离光标最近的那个按钮朝它微微倾斜（磁吸，最多 6px，只动一个，不会碰到旁边的）。鼠标停在 LELE 上时错位再放大一档（`--sep`，用 `@property` 做成可过渡）。
   **自定义光标**：鼠标进入 hero 后系统光标隐藏（只在 JS 已接管时隐藏，脚本失败不会没有光标），换成一个即时的粉色小点加一圈滞后半拍的套准环。悬停链接/按钮时圆环放大成半透明实心粉圆；悬停 LELE 时变成蓝色大环并在右侧弹出 "PULL" 标签。离开 hero 恢复系统光标。触屏和"减少动态效果"下不启用。
4. **常驻**：上下两条描边跑马灯（蓝在上往左，粉在下往右，90 秒 / 110 秒一圈，内容是真实的领域词），右侧圆形印章 26 秒转一圈，左侧七格色彩控制条。

触屏设备保留 1、2、4（批注、印章、控制条在 ≤860px 隐藏）；系统开"减少动态效果"时是一张已经印好的静态样张。

hero 和 Selected Work 之间原来那段 88–132px 的空灰去掉了：`.hero + .contentTight { padding-top: 0 }`，只加在这个路由的包裹层上，原首页样式表没动。

## 你可以补的素材（可选）

现在 hero 上的"物件"全是 CSS/SVG 画的。要更像参考站那种漂在标题周围的贴纸，最有效的是你自己的东西：

- 3–5 张 riso 风格的小插画/贴纸（像你发的圣诞卡那种人物或物件），PNG 透明底，长边 800px 左右。
- 一张真实印刷品的局部照片或扫描（有套印错位的更好），可以做成漂浮的"样张"。
- 一个手绘箭头或圈注。

给我文件我就挂到印章和控制条的位置上，替换或并存都行。

## 还要你定的

1. hero 批注 "Lele · say it like “luh-luh”" 的读法是否准确；不要的话删掉那一行。
2. 大字用 "LELE" 还是 "LELE YANG"。

## 文件

- `app/home-riso/page.jsx`、`app/home-riso/page.module.css`
- 没有改动任何共享组件，也没有改 `app/page.jsx` / `app/page.module.css`。
