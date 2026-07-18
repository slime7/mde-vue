# 0012 — 使用内部 Toolbar 几何注册协调覆盖层

- 状态: active
- 日期: 2026-07-18
- 替代: 无

## 背景

Toolbar、Snackbar 和 Tooltip 都可能由不同的 Teleport 根节点组成，需要共享固定 Toolbar 的实际矩形；Dialog 和菜单则依赖浏览器 top layer，不能通过普通 z-index 解决。

## 决策

新增仅供组件内部使用的 Toolbar 几何注册模块。Toolbar 在挂载、尺寸变化和卸载时发布矩形；Snackbar 读取底部 Toolbar 的顶部位置进行避让，Tooltip 将全部 Toolbar 矩形作为候选位置的障碍区；普通覆盖层使用统一的 Toolbar、Snackbar、Tooltip z-index 令牌，Dialog 保持原生 showModal() top layer。

## 考虑的方案

- 让每个覆盖层组件各自查询页面上的 Toolbar，耦合 DOM 结构且无法可靠处理 Teleport。
- 引入公开的全局 overlay manager，能力过大并扩大公共 API。
- 采用内部注册模块，通过最小几何查询接口协调现有组件。

## 影响

- 覆盖层可以对动态尺寸和多个 Toolbar 做出一致避让。
- 注册模块属于内部实现，不承诺给应用直接调用；未来若新增覆盖层，需要接入该模块或浏览器 top layer。
- 普通 z-index 只表达 Toolbar、Snackbar、Tooltip 的关系，Dialog 和 popover 仍由浏览器 top layer 保证最高层级。
