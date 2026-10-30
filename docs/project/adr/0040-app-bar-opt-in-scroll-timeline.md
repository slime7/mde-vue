# 0040 — App bar 滚动时间线改为显式启用

- 状态: active
- 日期: 2026-10-30
- 替代: 无

## 背景

实际 Electron 页面中，挂在非根滚动容器上的具名 CSS scroll timeline 会在合成器等待主线程时停止产生帧；主线程空闲期间滚轮输入积压后集中补发。基础滚动反馈与连续折叠需要采用不同的性能边界。

## 决策

MatAppBar 新增布尔属性 scrollTimeline，默认 false 时不登记 CSS scroll timeline 和 timeline-scope，只维护滚动后的基础表面状态；显式开启时才建立连续折叠与表面过渡。该属性可通过组件声明或 createMatUi defaults 设置。

## 考虑的方案

- 继续默认启用 CSS scroll timeline：保留连续折叠，但在部分 Electron 与非根滚动容器组合中仍有停帧风险
- 仅在 document 根滚动源上自动启用时间线，非根滚动源回退基础状态：保留根页面效果，但同一组件的跨容器行为不一致
- 新增显式 scrollTimeline 开关并默认关闭：遇到停帧的容器保持稳定，需要连续效果的使用方主动开启

## 影响

- 默认滚动表现改为基础表面过渡，flexible 变体不再连续折叠，使用方需要显式开启 scrollTimeline 才能获得原连续效果。
- 新增公共属性并同步组件 JSDoc、生成类型、使用文档、示例、AI 文档与 Chromium 行为测试；createMatUi defaults 可统一启用。
