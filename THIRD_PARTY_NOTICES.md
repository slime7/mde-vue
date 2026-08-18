# 第三方声明

## mdui 许可记录

本项目不包含 mdui 的运行时代码、组件实现或设计内容。此处仅保留 AI 文档用法参考和历史许可记录：

- AI 文档用法参考：<https://github.com/zdhxiong/mdui/blob/v2/docs/zh-cn/ai/llms.md>
- 原项目许可：MIT License
- 许可原文：[licenses/mdui-MIT.txt](licenses/mdui-MIT.txt)

## Progress 与 Loading

Progress 不确定状态的动画时间、缓动参数和关键帧结构，以及 Loading 形状变形的采样，参考或改编自 Material Web：

- 项目：`material-components/material-web`
- 固定来源提交：`b4de401eb665ec63474f39319a4ba8f2145974cc`
- 线条形来源：<https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_linear-progress.scss>
- 环形来源：<https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_circular-progress.scss>
- 原项目许可：Apache License 2.0
- 许可原文：<https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/LICENSE>

这些参数被改写为 Vue SVG 路径、轨道遮罩和原生 CSS 动画，以适配本项目的波浪路径和公开属性。Material Web 的名称和许可仅用于说明第三方来源，不表示原作者为本项目提供支持或认可。

## AndroidX MaterialShapes 与 shape-morph

Shape 的 35 个 Material 3 Expressive 归一化形状源自 AndroidX MaterialShapes，并使用 shape-morph 0.4.0 在开发时一次性转换为 CSS `clip-path: shape()` 曲线：

- AndroidX 固定来源提交：`c8a071114c193cd7b43a05ba1489e72d21f3b833`
- AndroidX 来源地址：<https://android.googlesource.com/platform/frameworks/support/+/c8a071114c193cd7b43a05ba1489e72d21f3b833/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/MaterialShapes.kt>
- AndroidX 原项目许可：Apache License 2.0
- AndroidX 许可原文：[licenses/androidx-Apache-2.0.txt](licenses/androidx-Apache-2.0.txt)
- shape-morph 项目：`Thereallo1026/shape-morph` 0.4.0
- shape-morph 来源地址：<https://github.com/Thereallo1026/shape-morph/tree/v0.4.0>
- shape-morph 原项目许可：MIT License
- shape-morph 许可原文：[licenses/shape-morph-MIT.txt](licenses/shape-morph-MIT.txt)

转换结果只保留归一化三次 Bézier 曲线，不包含转换工具的运行时代码或依赖。相关名称和许可仅用于说明第三方来源，不表示原作者为本项目提供支持或认可。

本仓库自身为私有项目，未声明对外开源许可。第三方内容仍遵循其各自许可条款。
