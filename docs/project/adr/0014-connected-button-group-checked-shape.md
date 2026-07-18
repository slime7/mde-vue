# 0014 — 连接按钮组选中态使用全圆形状

- 状态: superseded
- 日期: 2026-07-18
- 替代: 0013
- 被替代: 0015

## 背景

0013 将 connected 组选中形状描述为按 round 与 square 反转，但实际示例和 Material 3 ButtonGroupDefaults 的 checked shape 语义要求选中按钮使用全圆内角。原规则使 round 组在 variant 与 selection 示例中的选中按钮出现 square 内角。

## 决策

connected 组的选中按钮统一使用全圆 checked shape；shape 只决定未选中组的外部轮廓，首尾选中按钮继续保留组外侧轮廓，按压态使用对应尺寸的 connected pressed inner corner。standard 组继续沿用普通按钮的 round/square 选中反转。

## 考虑的方案

- 把 connected 选中态继续按组 shape 反转：实现简单，但与 Material 3 checked shape 和跨示例一致性不符。

## 影响

- variant、selection 与 shape 示例中的 connected 选中态统一；round 与 square 组仍可区分未选中外轮廓；不新增公共 CSS 定制令牌；0013 中的 MatBtn 图标 API 与选择模型仍然有效。
