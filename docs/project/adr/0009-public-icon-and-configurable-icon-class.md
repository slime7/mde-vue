# 0009 — 采用公共 Icon 与可配置图标类

- 状态: active
- 日期: 2026-07-15
- 替代: 无

## 背景

组件此前依赖内部 MatIconBase 与 useMaterialSymbols 布尔开关，无法独立表达图标来源、Material Symbols 字体轴、尺寸和组件级配色，也不能为其他图标字体选择 class。

## 决策

新增公共 MatIcon 作为字体字形、SVG 资源和 SVG Slot 的统一边界；createMatUi 使用字符串 iconClass 提供全局默认，组件级 iconClass 可以覆盖或关闭该值，并删除 useMaterialSymbols。

## 考虑的方案

- 保留内部包装器和布尔开关，只为 MatIcon 单独增加能力。
- 只允许 Material Symbols，不提供可配置图标 class。

## 影响

- 所有公共图标入口具有一致的尺寸、颜色和字体轴行为，现有组件可共享实现。
- useMaterialSymbols 被移除，使用旧选项的应用必须迁移到 iconClass。
- 其他图标字体可以复用容器和 class，但 Material Symbols 专用字体轴不保证对其生效。
