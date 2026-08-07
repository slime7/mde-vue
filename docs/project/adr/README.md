# 架构决策记录

本目录保存会长期影响公共接口、模块边界、依赖或维护方式的技术决策。当前系统状态仍以 [架构说明](../ARCHITECTURE.md) 为准，ADR 解释选择形成时的背景和取舍。

## 当前决策

| ADR | 状态 | 主题 |
| --- | --- | --- |
| [0001](0001-distribute-source-from-private-git.md) | superseded | 通过私有 Git 直接分发源码 |
| [0002](0002-runtime-and-tailwind-theme-layers.md) | superseded | 采用运行时令牌与 Tailwind 适配双层主题 |
| [0003](0003-generate-ai-docs-from-markdown.md) | active | 从 Markdown 生成 AI 使用文档 |
| [0004](0004-material-2025-dynamic-color.md) | active | 采用 Material 2025 动态配色规格 |
| [0005](0005-component-seed-color-inheritance.md) | active | 采用组件级种子配色与父子继承 |
| [0006](0006-material-3-layered-tokens-and-full-property-names.md) | superseded | 采用 Material 3 分层令牌与完整组件属性名 |
| [0007](0007-internal-component-tokens-without-public-customization.md) | active | 保留内部组件令牌但不提供公共定制入口 |
| [0008](0008-surface-action.md) | active | 采用共享 Surface 与 Action 内部基础层 |
| [0009](0009-public-icon-and-configurable-icon-class.md) | active | 采用公共 Icon 与可配置图标类 |
| [0010](0010-merge-button-and-icon-button.md) | superseded | 合并 Button 与 Icon button |
| [0011](0011-dialog-imperative-host-and-promise-settlement.md) | active | 采用共享 Dialog 宿主与关闭后 Promise 结算 |
| [0012](0012-toolbar-overlay-geometry-registry.md) | active | 使用内部 Toolbar 几何注册协调覆盖层 |
| [0013](0013-button-icon-group-semantics.md) | superseded | 重构按钮组与图标按钮语义 |
| [0014](0014-connected-button-group-checked-shape.md) | superseded | 连接按钮组选中态使用全圆形状 |
| [0015](0015-connected-button-group-checked-shape-overrides-outer-shape.md) | active | 连接按钮组选中态完整覆盖组外轮廓 |
| [0016](0016-public-input-base.md) | active | 公开 MatInputBase 作为可组合文本输入基础组件 |
| [0017](0017-tooltip-delay-groups.md) | active | 使用应用配置与显式容器协调 Tooltip 延迟 |
| [0018](0018-distribute-prebuilt-esm-from-private-git.md) | superseded | 通过私有 Git 分发预构建 ESM |
| [0019](0019-minimize-esm-distribution-files.md) | superseded | 将 ESM 分发压缩为三个文件 |
| [0020](0020-tailwind-css.md) | active | 恢复 tailwind.css 独立分发入口 |
| [0021](0021-app-root-layout-context.md) | active | 采用 AppRoot 应用布局上下文 |
| [0022](0022-rename-project-to-mde-vue.md) | active | 项目更名为 mde-vue |

## 何时创建 ADR

- 选择或替换会影响多个模块的框架、依赖或构建方式。
- 改变公共入口、主题权威来源、源码分发或兼容性边界。
- 存在多个合理方案，且取舍会影响后续维护。

修复缺陷、局部样式调整和没有长期取舍的重构通常不需要 ADR。

## 文件与状态

- 文件名使用 `NNNN-short-title.md`，编号单调递增。
- 使用技能固定的 `create_adr.py` 创建文件，不手工分配编号。
- 状态只使用 `proposed`、`active`、`superseded` 或 `retired`。
- 已生效 ADR 保留历史；改变决策时新增 ADR，并在新旧记录中建立替代关系。
- 一份 ADR 只记录一个长期决策。

## 内容结构

```text
# NNNN — 决策标题

- 状态: proposed
- 日期: YYYY-MM-DD
- 替代: 无

## 背景

促成决策的约束和作用力。

## 决策

明确写出选择。

## 考虑的方案

- 主要候选方案及取舍。

## 影响

- 正面影响、代价和重新评估条件。
```
