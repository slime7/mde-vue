# 0027 — AppRoot 内模态与浮层按应用范围展示

- 状态: active
- 日期: 2026-08-12
- 替代: 无

## 背景

Dialog 与 modal Bottom/Side sheet 依赖原生 showModal() 进入浏览器 top layer，Menu 依赖 Popover top layer，定位与帷幕都以整个视口为边界。当组件在 MatAppRoot 内使用时，AppRoot 外的内容（例如 Electron 应用的自绘任务栏）会被遮挡且不可交互；原生 modal 的文档级 inert 也无法通过 pointer-events 穿透解除。

## 决策

所有场景弃用原生 modal（showModal），统一改为原生 dialog.show() 的非模态实现：根元素作为铺满坐标空间的帷幕容器、内部面板承载表面，焦点陷阱、背景拦截、滚动锁与堆叠由组件自管（aria-modal、Tab 循环、仅 AppRoot 正文 inert）。组件位于 MatAppRoot 内且省略 attach 时，或 attach 显式指向 AppRoot 根元素时（含命令式 dialog()），渲染进 AppRoot 内部模态层并限制在应用矩形内；其他显式 attach 保持原有视口行为。Menu 继续使用 Popover top layer，但在 AppRoot 内按应用矩形夹紧、将透明 scrim 限定为应用矩形，点击应用外关闭菜单且不拦截事件。公共组件 props 与命令式函数签名不变，仅新增公共令牌 --mat-sys-z-index-dialog。

## 考虑的方案

- 保留原生 modal 并仅约束面板位置：改动最小，但 scrim 仍覆盖整个窗口，AppRoot 外内容在打开期间不可交互。
- 保留原生 modal 并把 dialog 元素作为应用矩形帷幕容器：任务栏不被视觉遮挡，但文档级 inert 使任务栏仍不可交互，无法满足可点击需求。
- 统一非模态实现并自管焦点与背景拦截：任务栏保持可交互，所有场景只有一套渲染与样式路径，维护成本最低；需要自行保证焦点陷阱与可访问性等价。

## 影响

- Dialog、modal Sheet、Menu 的挂载与遮挡语义由浏览器 top layer 改为组件自管，需要维持 aria-modal、焦点循环、Escape、滚动锁与堆叠行为。
- AppRoot 内打开模态时仅正文层 inert，AppRoot 外内容（如自绘任务栏）保持可见且可点击。
- document 模式（fillViewport 且非 scrollable）下 AppRoot 范围等于视口，无法约束视口外内容；任务栏场景应使用 scrollable 或 fillViewport=false。
- 公共 API 不变，新增 --mat-sys-z-index-dialog 公共令牌；Dialog 根元素由可见面板变为容器加内部面板结构。
