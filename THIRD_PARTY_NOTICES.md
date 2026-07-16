# 第三方声明

## mdui

本项目的 Material 3 组件设计、主题令牌组织和部分实现参考或改编自 mdui v2：

- 项目：`zdhxiong/mdui`
- 固定来源提交：`818146c3e188580e2831873b4f245d864422552c`
- 来源地址：<https://github.com/zdhxiong/mdui/tree/818146c3e188580e2831873b4f245d864422552c>
- AI 文档用法参考：<https://github.com/zdhxiong/mdui/blob/v2/docs/zh-cn/ai/llms.md>
- 原项目许可：MIT License
- 许可原文：[licenses/mdui-MIT.txt](licenses/mdui-MIT.txt)

对 mdui 内容的修改包括将实现范围收窄到 Vue 3、JavaScript 和最新浏览器，使用 `mat-*` Vue 组件接口，并移除 Web Components、多框架、本地化和 IDE 插件相关能力。mdui 的名称和许可仅用于说明第三方来源，不表示原作者为本项目提供支持或认可。

## Material Web

Loader 不确定状态的动画时间、缓动参数和关键帧结构参考或改编自 Material Web：

- 项目：`material-components/material-web`
- 固定来源提交：`b4de401eb665ec63474f39319a4ba8f2145974cc`
- 线条形来源：<https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_linear-progress.scss>
- 环形来源：<https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_circular-progress.scss>
- 原项目许可：Apache License 2.0
- 许可原文：<https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/LICENSE>

这些参数被改写为 Vue SVG 路径、轨道遮罩和原生 CSS 动画，以适配本项目的波浪路径和公开属性。Material Web 的名称和许可仅用于说明第三方来源，不表示原作者为本项目提供支持或认可。

本仓库自身为私有项目，未声明对外开源许可。第三方内容仍遵循其各自许可条款。
