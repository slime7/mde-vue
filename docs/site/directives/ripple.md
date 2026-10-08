---
title: Ripple 涟漪指令
description: v-ripple 的按压涟漪、颜色与波点、柔光、圆环、星芒形态配置、宿主约束和生命周期。
llms: true
order: 122
---

# Ripple 涟漪指令

## 指令简介

`v-ripple` 的 JavaScript 导出名是 `Ripple`。它为使用方自己的交互元素增加 Material 3 按压涟漪：主指针按压时默认从按压点出现一个实心圆波纹，扩大到覆盖宿主后保持，释放后淡出移除；`variant` 还提供波点阵列、柔光光斑、扩散圆环与星芒爆发形态。涟漪渲染在 `v-state-layer` 状态层之上；单独使用时也可以独立提供按压反馈。指令只提供视觉反馈，不赋予元素焦点、点击、ARIA 或键盘激活语义，也不响应键盘激活。

## 示例

### 与状态层叠加

涟漪绘制在状态层之上。`mat-btn` 等交互组件自带状态层，直接追加 `v-ripple` 就能获得完整反馈；自定义元素可以组合 `v-state-layer`，由状态层表达 hover、focus-visible 与键盘 pressed，涟漪表达指针按压。

:::: details 查看示例代码
::: code-group

<<< @/examples/ripple/RippleDefaultExample.vue#template [template]

<<< @/examples/ripple/RippleDefaultExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Ripple 与状态层叠加预览">
    <RippleDefaultExample />
  </DocsPreview>
</ClientOnly>

### 自定义颜色

`color` 可以引用公开的主题令牌。绑定值必须是对象，以便后续在不改变基本调用形式的情况下增加更多涟漪形态选项。

:::: details 查看示例代码
::: code-group

<<< @/examples/ripple/RippleColorExample.vue#template [template]

<<< @/examples/ripple/RippleColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Ripple 自定义颜色预览">
    <RippleColorExample />
  </DocsPreview>
</ClientOnly>

### 波纹形状

`variant` 决定波纹形状，默认 `circle`。五个合法值集中对比展示，并使用面积更大的 `div` 宿主以便观察；各值的具体表现见下方 API 表与「按压行为」。`div` 宿主需自行提供交互语义，详见「普通 div 宿主」。

:::: details 查看示例代码
::: code-group

<<< @/examples/ripple/RippleVariantsExample.vue#template [template]

<<< @/examples/ripple/RippleVariantsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Ripple 波纹形状预览">
    <RippleVariantsExample />
  </DocsPreview>
</ClientOnly>

### 普通 div 宿主

`div` 没有原生交互语义，使用方需要自行提供 `role="button"`、`tabindex="0"`、键盘激活和点击行为；涟漪只在指针按压时出现。

:::: details 查看示例代码
::: code-group

<<< @/examples/ripple/RippleDivExample.vue#template [template]

<<< @/examples/ripple/RippleDivExample.vue#script [script]

<<< @/examples/ripple/RippleDivExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Ripple 普通 div 预览">
    <RippleDivExample />
  </DocsPreview>
</ClientOnly>

## API

### 绑定值

绑定值类型是 `RippleOptions | undefined`。`v-ripple`、`v-ripple="undefined"` 和 `v-ripple="{}"` 使用相同的默认配置；字符串不是合法绑定值。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `string` | `currentcolor` | 涟漪使用的 CSS 颜色，支持颜色值和 `var(...)`。 |
| `variant` | `'circle'` \| `'dots'` \| `'glow'` \| `'rings'` \| `'burst'` | `circle` | 波纹形状。`circle` 为实心圆；`dots` 为固定不动的波点阵列，可见范围由与实心圆同轨迹的扩张遮罩逐渐显示；`glow` 为停留在按压点按相同节奏放大并保持的羽化光斑；`rings` 与 `burst` 为不保持按压的瞬时反馈（两圈细环扩散出宿主、八道细光线放射消散），播放结束后自行从 DOM 移除。变体在每次按压时读取，进行中的波纹保持创建时的形状。 |
| `disabled` | `boolean` | `false` | 跳过涟漪；从 `true` 切换为 `false` 时按需挂载，反向切换时立即清理。 |

非法绑定值、未知属性、非法颜色、非布尔值的 `disabled` 或非法 `variant` 会在开发环境发出警告；无效颜色回退为 `currentcolor`，无效 `variant` 回退为 `circle`。

### 全局设置

`createMatUi({ useRipple: true })` 为基于操作交互的组件（按钮、FAB、Chip、菜单项、操作模式列表项、卡片操作区、导航项目等）统一启用按压涟漪，默认关闭。插件启用后，单个宿主仍可设置 `v-ripple="{ disabled: true }"` 单独关闭；`v-ripple` 在自定义元素上的行为不受该选项影响。详见 [`createMatUi` 配置](/guide/create-mat-ui)。

### 按压行为与变体

- **实心圆（`circle`）**：默认波纹，从按压点向四周扩散并平滑移动至宿主中心，释放后淡出。
- **波点（`dots`）**：固定点阵网格，通过圆形扩展遮罩逐渐显现。
- **柔光（`glow`）**：在按压点原地放大并保持的羽化光斑。
- **圆环（`rings`）**：向外扩散消散的双重细环瞬时反馈。
- **星芒（`burst`）**：放射状消散的八向光线瞬时反馈。
- 涟漪响应主指针（鼠标左键、触控和笔输入）；`disabled` 或 `aria-disabled="true"` 的宿主不触发涟漪。

### 宿主说明

宿主需能容纳子元素（不能使用 `display: contents`）。`input`、`img` 等不可容纳子元素的标签不支持该指令；非按钮元素需自行提供交互语义与键盘支持。

<script setup>
import RippleColorExample from '../examples/ripple/RippleColorExample.vue';
import RippleDefaultExample from '../examples/ripple/RippleDefaultExample.vue';
import RippleDivExample from '../examples/ripple/RippleDivExample.vue';
import RippleVariantsExample from '../examples/ripple/RippleVariantsExample.vue';
</script>
