# 0021 — 采用 AppRoot 应用布局上下文

- 状态: active
- 日期: 2026-08-05
- 替代: 无

## 背景

Toolbar、Navigation、Snackbar、FAB 与 Tooltip 需要在同一个应用坐标系内共享安全区、边缘占位和浮动排列；现有 Toolbar 几何注册表只适合 body 级覆盖层，不能表达容器断点、正交边缘优先级和正文 padding。

## 决策

新增 MatAppRoot 与公开 useMatApp() 上下文。默认沿用 document/body 滚动，scrollable 显式切换为内部正文滚动；边缘登记按顺序生成正交 inset，同侧外延取最大值；AppRoot 内的布局与浮动组件自动 Teleport 到内部层，非 AppRoot 场景保留既有 Toolbar 几何注册表。

## 考虑的方案

- 继续扩展 toolbar-overlay 全局注册表：无法自然表达多个同级容器、正文尺寸和断点。
- 让各组件直接查询 DOM 并各自计算偏移：会复制布局规则，并耦合私有 DOM 结构。
- 只提供公开 overlay Slot：页面组件通常无法访问布局根，不能支持自动接入。

## 影响

- 应用获得只读响应式布局数据、自定义边缘登记和统一安全区；常用组件无需手工计算固定偏移。
- 同侧多项使用最大值而不是累加，可能视觉重叠；文档要求通常每侧只设置一个固定组件。
- 命令式 Snackbar 与 AppRoot 外 Tooltip 继续使用 body 和 toolbar-overlay；Dialog、Menu 与浏览器 top layer 语义不变。
- AppRoot 不修改 html/body overflow，应用仍需负责页面基础尺寸和滚动选择。
