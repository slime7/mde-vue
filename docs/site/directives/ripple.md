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

### 按压行为

- 按压点出现圆形波纹，在 225ms 内扩大到覆盖宿主（带 10px 外扩）并从按压点移动到宿主中心，随后保持可见；透明度在 75ms 内淡入到按压状态层透明度 `--mat-sys-state-pressed-state-layer-opacity`。
- `variant: 'dots'` 时波点固定不动，由与实心圆同轨迹的圆形遮罩逐渐显示：遮罩从按压点扩张并迁移到宿主中心，节奏、颜色与裁剪仍与实心圆相同；波点网格把完整圆点对齐到按压点，点阵排布随按压位置变化，圆点不会在右缘或下缘被裁剪一半。
- `variant: 'glow'` 时边缘羽化的光斑停留在按压点，按与实心圆相同的半径节奏放大并保持，圆心不向宿主中心迁移；释放后与其他保持型变体一同淡出。
- `variant: 'rings'` 与 `variant: 'burst'` 是瞬时反馈，不保持按压：两圈 2px 细环间隔约 160ms 先后扩散，约 520ms 消散；八道细光线逐道延迟约 20ms 放射，约 460ms 消散。播放结束后自行从 DOM 移除，释放、快速连点或禁用只会提前结束它们。
- 柔光、圆环与星芒的可见结构比实心圆更细或更羽化，目标不透明度取按压状态层令牌的四倍（上限 1）作为感知补偿。
- 释放、取消、失去指针捕获或失焦后，保持型波纹（实心圆、波点、柔光）在 150ms 内淡出并从 DOM 移除；短按提前释放时等待进入时长结束后再淡出，避免反馈闪烁。瞬时波纹（圆环、星芒）自行消散，失焦或禁用时立即移除。
- 快速连点时每次按压产生新波纹，并让仍在展示中的旧波纹立即结束。
- 涟漪只响应主指针（鼠标左键、触摸、手写笔）；键盘激活的 pressed 反馈由 `v-state-layer` 表达。
- `disabled` 或 `aria-disabled="true"` 的宿主不显示涟漪；按压期间禁用会立即结束当前波纹。
- 减少动态效果偏好下跳过扩大与移动动画：保持型变体直接呈现按压点的静态波纹，瞬时变体呈现完全展开的静止结构，释放后按相同节奏移除。

225ms、75ms、150ms 与缓动参考 AndroidX Compose material-ripple 的默认实现，不是 Material 网页规范规定的固定时长。

### 宿主与生命周期

宿主必须能容纳子元素，且不能使用 `display: contents`。`input`、`img` 等不能可靠容纳子元素的元素不支持该指令。自定义交互容器仍需由使用方提供正确的 `role`、`tabindex`、键盘激活和点击行为。

指令会加入一个绝对定位且 `aria-hidden="true"` 的内部子元素作为涟漪容器，并使用 CSS Anchor Positioning 让其覆盖宿主，波纹被容器按宿主圆角裁剪。不要依赖该子元素的 class、DOM 顺序或其他内部属性。绑定更新只更新选项；卸载时会立即清理容器、进行中的波纹、观察器、事件监听和指令添加的 anchor 名称。

<script setup>
import RippleColorExample from '../examples/ripple/RippleColorExample.vue';
import RippleDefaultExample from '../examples/ripple/RippleDefaultExample.vue';
import RippleDivExample from '../examples/ripple/RippleDivExample.vue';
import RippleVariantsExample from '../examples/ripple/RippleVariantsExample.vue';
</script>
