# 0030 — 交错外部 CSS 层并增加最终安全层

- 状态: active
- 日期: 2026-08-14
- 替代: 0029

## 背景

单独把组件样式放入 mde 命名层后，使用方若在其后加载 Tailwind Preflight，原生控件与替换元素会被重新标准化，造成大范围视觉回归。全面使用 !important 会阻断 Vue v-show、内联样式、Web Animations 和脚本运行时更新。

## 决策

保留父层 mde 内的 mde.tokens、mde.components、mde.utilities，并新增顶层 mde-final。Tailwind 使用方预先声明 tailwind-theme、tailwind-reset、mde、tailwind-utilities、mde-final 的完整顺序，分别导入 Tailwind 各部分；mde-final 只允许不会阻断运行时样式控制的少量结构与交互安全不变量。

## 考虑的方案

- 全面为组件结构属性添加 !important：可以抵抗普通层序变化，但会压过普通内联样式并破坏运行时控制。
- 承诺任意第三方层序都安全：需要大量最终层或 important 规则，无法同时保留显式工具类与运行时样式的覆盖能力。
- 只要求 Tailwind reset 排在组件层前：足以恢复普通组件外观，但缺少对极少数交互安全不变量的最终保护。

## 影响

- Tailwind Preflight 在 mde 之前执行，组件普通样式稳定恢复自身外观；Tailwind utilities 仍可按使用方意图覆盖普通组件样式。
- mde-final 是稳定的顶层公共名称，不得改为 mde.final；其中禁止 display、visibility、opacity、运行时尺寸、位置和变换等属性。
- 未分层应用样式和普通内联样式继续优先于命名层；组件库不承诺任意第三方层序都产生相同结果。
