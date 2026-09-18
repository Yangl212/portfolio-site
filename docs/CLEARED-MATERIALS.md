# Cleared：补充素材与后续验证

当前页面已使用现有素材完成改版。下面是进一步提升案例可信度和画面质量所需的内容；页面上没有未完成占位块。

## 已完成

- 首屏明确个人职责、交付物、8 周周期，以及独立概念项目、模拟数据和未测试状态。
- 用具体任务说明目标用户假设，三个循环演示分别配上设计理由和取舍。
- 三段原始视频裁紧手机周围留白，保留完整设备；增加首尾过渡、静音循环、海报和减少动态效果支持，点击视频画面即可播放或暂停。
- 解释桌面周视图与移动端日视图/底部面板的关系。
- 手机上用桌面预览代替缩得过小的可操作 iframe；六张手机图可展开、单列阅读并打开原尺寸。
- 修正桌面原型中的邮件原文/推断混淆：周五 18:00 是根据“本周结束”作出的假设，时长是估计，样例历史是模拟数据。
- 增加明确的后续测试任务。没有填入虚构的访谈、用户反馈、历史方案或效率数据。
- 页面末尾已加入 `Evaluation & iteration`（`#validation`），展示原型走查的三项发现、已完成调整和待做迭代，并注明 AI 辅助走查、浏览器检查及模拟数据的评审方法。

## 最值得补的素材

| 优先级 | 内容 | 推荐形式与镜头 | 需要你提供什么 |
| --- | --- | --- | --- |
| 1 | 高清「查看来源」和「调整确认」演示 | 两段 10–16 秒循环 MP4。① 点建议 → 打开邮件 → 停 2 秒展示依据；② 调整时间/时长 → 确认 → 显示事件与 Undo。 | 从原始 Figma/设计工具重新导出的高清录屏。现有 2.mp4、3.mp4 中手机本体有效宽约 300px，压缩和裁切无法恢复丢失细节。手机本体宽至少 720px，建议 2× 导出。 |
| 2 | 移动端的推断状态 | 8–12 秒循环：邮件原文“by end of week” → 标记 Fri 18:00 为 Inferred → 用户查看/修改假设。 | 更新后的移动端设计和录屏。当前手机静态图/原视频是已有导出，桌面原型的文案修复不会自动同步进去。需要源设计里的新状态。 |
| 3 | 实际用户测试后的改进 | 一段 12–20 秒对比演示：原方案卡点 → 简短真实发现 → 修改后的操作；标明这是方案演示。 | 真实测试记录、实际参加人数、任务与观察，以及对应修改。没有测试前不能把演示当成测试证据。 |
| 4（如已有） | 真实的备选方案或早期版本 | 8–12 秒交替展示两个方案，保留相同任务和尺寸；每个停留 2–3 秒，并标出信息/操作差异。 | 原有草图、Figma 页面或版本记录，以及你当时的选择理由。若没有历史版本，不需要为了凑流程补造。新做的探索应注明是后续探索。 |

优先使用 MP4 循环，GIF 可以另给预览版。页面已准备好接入新的循环素材。

## 录屏交付规格

- 手机本体至少 720px 宽；不要把小手机放在 1920px 的大灰底中再导出。
- 桌面演示建议 1440×900 或 1920×1080；重要弹层可单独导出近景。
- 每段只讲一个操作目标，8–16 秒为宜；重要信息停留约 2 秒。
- 30fps、MP4 H.264、静音；保留完整按钮与底部反馈。末尾停留再回到初始状态，避免突然跳切。
- 建议命名：`check-hd.mp4`、`decide-hd.mp4`、`inference-mobile.mp4`、`tested-iteration.mp4`。
- 直接交高清原始导出即可，后续可继续压缩、裁切和生成海报。

## 已完成的原型走查：可用于作品集的依据

本节记录的是 AI 辅助设计评审与浏览器交互检查，不是参与者用户测试。走查使用当前桌面原型及既有移动端素材；没有招募参与者，也没有访谈原话、成功率或完成时长数据。

### 1. 把邮件原文与 AI 推断分开

**发现：** 邮件只写了“by end of week”，具体的周五 18:00 是系统假设。此前把具体时间标成来自邮件，会掩盖信息的不确定性。

**已完成的修改：** 桌面来源弹层分别使用 `FROM EMAIL` 和 `INFERRED`；18:00 旁注明需要向发件人核实，2 小时标为估计。打开邮件视图后，仍保留原文与估计的区别。

**已核实：** 浏览器中可以打开来源弹层和邮件视图，并看到这些标签。这只能证明信息已经展示，不能证明真实用户一定理解了区别。

**适合展示的循环视频：** 10–12 秒，打开建议 → 展示邮件原文 → 停留在 Inferred / estimate 标签 → 返回日历。片名用“Making assumptions visible”。

### 2. 确认之后能恢复，但恢复入口有时间限制

**已核实：** 在当前示例中选择周二 16:00–18:00 后，待处理建议从 3 条变成 2 条；立即点击 Undo，恢复为 3 条。这里只是一个固定场景的功能检查，不是用户任务成功率。

**发现的设计风险：** 原型提示条在 4.2 秒后开始消失。虽然即时撤销可以运行，但晚一些才发现错误的人是否能找到恢复路径，仍需要测试。

**建议的下一次迭代：** 评估在事件详情中保留恢复入口，或提供可查看的近期修改记录；这项建议尚未实现。

**适合展示的循环视频：** 10–15 秒，选另一时间 → 确认 → 展示事件状态 → 点击 Undo → 恢复建议。片名用“Keeping a scheduling decision reversible”。

### 3. 将同一套不确定性标签带到移动端

**发现：** 当前移动端导出展示了来源邮件和 2 小时时长，但尚未完整呈现桌面版新增的推断截止时间及估计说明。

**设计判断：** 桌面和手机可以使用不同布局，但原文、推断、估计和确认的含义应该一致。

**下一步：** 在移动端底部面板补充这些标签，再导出新的截图和循环录屏。此项是待完成的设计调整，不能写成已经通过测试的改进。

### 可直接使用的英文案例文案

**AI-assisted prototype review**

The prototype was reviewed through an AI-assisted walkthrough and browser interaction checks, focusing on source clarity, confirmation and recovery. This was a design review using simulated data; no participant usability study has been conducted.

**Separate the request from the assumption.** An email saying “by end of week” does not specify Friday at 18:00. The desktop review panel now labels that cutoff as inferred and the two-hour duration as an estimate, while keeping the original message accessible.

**Check what happens after confirmation.** In the sample flow, confirming an alternative time removes the item from the pending queue, and immediate Undo restores it. The temporary Undo message leaves an open design question: how should someone recover after the message disappears?

**Carry uncertainty across devices.** The mobile review sheet still needs the same inferred-deadline and duration-estimate labels. This is a planned refinement, alongside evaluating a more persistent recovery path.

Participant testing is the next step: can people distinguish suggestions from confirmed events, identify the assistant’s assumptions and recover from an unwanted change without guidance?

### 真正的用户测试仍需要什么

先确认目标用户确实通过邮件安排工作，再请他们独立完成上述任务，记录实际行为、犹豫点和需要的提示。任务描述给出目标即可，例如“安排报价工作，避免与会议冲突”，不要提前告诉对方点哪个按钮。

上述走查内容已加入网站的 `Evaluation & iteration` 区块，标题为 `What the prototype review revealed`；页面明确区分已完成的原型评审与待执行的参与者测试。实际参与者反馈收集完成后，再补人数、发现和对应迭代。

原型走查也不能证明真实 AI 提取准确率、Gmail 集成可靠性或长期效率提升；这些需要另外的实现与评估。

## 当前资源和复验

- `public/cleared/media/collect-loop.mp4`：360×704，3.27 秒，约 31 KB。
- `public/cleared/media/check-loop.mp4`：360×704，16.60 秒，约 237 KB。
- `public/cleared/media/decide-loop.mp4`：360×704，16.20 秒，约 165 KB。
- 对应的 `*-poster.webp` 为静态首屏。
- `scripts/cleared-media-build.cjs` 可重新生成视频；参数见脚本。
- `scripts/check-cleared-page.cjs` 检查视频控制、减少动态效果、手机布局、原型加载及两条作品集路径。
- `scripts/check-cleared-prototype.mjs` 检查来源与推断标签、确认及 Undo。

浏览器检查脚本复用已有 Playwright，通过 `PLAYWRIGHT_MODULE` 指向安装路径；网站没有新增运行依赖。
