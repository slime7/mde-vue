# 0015 — 连接按钮组选中态完整覆盖组外轮廓

- 状态: active
- 日期: 2026-07-19
- 替代: 0014

## 背景

0014 已将 connected 组选中态改为全圆 checked shape，但同时保留首尾按钮的组外侧轮廓，导致首项或尾项选中时只有朝向组内的一侧为全圆。Material 3 的 connected leading、middle 与 trailing button shapes 都使用同一个完整 checked shape。

## 决策

connected 组的选中按钮不区分所在位置，checked shape 覆盖四个角；组的 outer shape 只作用于未选中的首尾按钮。按压时同样由完整 pressed shape 控制四角。standard 组行为不变。

## 考虑的方案

- 继续让首尾选中按钮保留组外侧轮廓：能保持未选中组的外框，但会产生半圆选中态并破坏 checked shape 的完整性。

## 影响

- connected 组首项、中间项和尾项的选中形状一致；shape 仍控制未选中组外轮廓；不新增公共 CSS 令牌或 API。
