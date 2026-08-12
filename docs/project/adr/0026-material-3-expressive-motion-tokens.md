# 0026 — 采用 Material 3 Expressive Web 动效令牌

- 状态: active
- 日期: 2026-08-12
- 替代: 无

## 背景

现有组件主要使用旧版 duration 与 easing 组合，跨组件空间变化、颜色效果和 JavaScript 阶段计时容易不一致。Material 3 Expressive 已为 Web 提供 spatial 与 effects 的曲线换算。

## 决策

新增 fast、default、slow 三档 spatial 与 effects 复合系统令牌；组件按属性语义选择令牌，旧 duration 与 easing 令牌继续保留。进入退出阶段优先等待浏览器实际 CSS 动画完成，测试或缺少 API 的环境才使用后备时长。

## 考虑的方案

- 继续逐组件组合旧时长与缓动：改动较小，但无法形成一致的 physics motion 语义。
- 引入 JavaScript spring 依赖：可处理中断和重定向，但增加运行时体积与维护成本。

## 影响

- 使用方可直接复用六个公开复合令牌，既有旧令牌样式不受破坏。
- 空间变化允许轻微回弹，颜色和透明度不回弹；减少动效时组件直接呈现静态状态。
- 组件生命周期不再依赖与 CSS 重复维护的固定计时器。
