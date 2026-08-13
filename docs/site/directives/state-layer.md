---
title: State layer 指令
description: v-state-layer 的颜色配置、交互状态、宿主约束和生命周期。
llms: true
order: 121
---

# State layer 指令

## 指令简介

`v-state-layer` 的 JavaScript 导出名是 `StateLayer`。它为使用方自己的交互元素增加 Material 状态层，统一显示 hover、focus-visible 和 pressed 反馈。指令只提供视觉反馈，不会赋予元素焦点、点击、ARIA 或键盘激活语义。

## 示例

### 默认颜色

省略绑定值时，状态层使用宿主的 `currentcolor`。

:::: details 查看示例代码
::: code-group

<<< @/examples/state-layer/StateLayerDefaultExample.vue#template [template]

<<< @/examples/state-layer/StateLayerDefaultExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="State layer 默认颜色预览">
    <StateLayerDefaultExample />
  </DocsPreview>
</ClientOnly>

### 自定义颜色

`color` 可以引用公开的主题令牌。绑定值必须是对象，以便后续在不改变基本调用形式的情况下增加选项。

:::: details 查看示例代码
::: code-group

<<< @/examples/state-layer/StateLayerColorExample.vue#template [template]

<<< @/examples/state-layer/StateLayerColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="State layer 自定义颜色预览">
    <StateLayerColorExample />
  </DocsPreview>
</ClientOnly>

### 普通 div 宿主

`div` 没有原生交互语义，使用方需要自行提供 `role="button"`、`tabindex="0"`、键盘激活和点击行为，指令才能显示对应的 pressed 反馈。

:::: details 查看示例代码
::: code-group

<<< @/examples/state-layer/StateLayerDivExample.vue#template [template]

<<< @/examples/state-layer/StateLayerDivExample.vue#script [script]

<<< @/examples/state-layer/StateLayerDivExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="State layer 普通 div 预览">
    <StateLayerDivExample />
  </DocsPreview>
</ClientOnly>

## API

### 绑定值

绑定值类型是 `StateLayerOptions | undefined`。`v-state-layer`、`v-state-layer="undefined"` 和 `v-state-layer="{}"` 使用相同的默认配置；字符串不是合法绑定值。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `string` | `currentcolor` | 状态层使用的 CSS 颜色，支持颜色值和 `var(...)`。 |

非法绑定值、未知属性或非法颜色会在开发环境发出警告；无效颜色回退为 `currentcolor`。

### 状态

- hover 只在支持悬停的输入设备上显示。
- focus 状态使用宿主的 `:focus-visible`。
- pointer pressed 从主指针按下开始，释放、取消、失去指针捕获或失焦时结束；短按至少显示 150ms。
- 原生 `button` 和 `role="button"` 使用 Space、Enter 表达键盘 pressed；具有 `href` 的 `a` 和 `role="link"` 使用 Enter；其他宿主不由指令推导键盘 pressed。
- `disabled` 或 `aria-disabled="true"` 的宿主不显示交互状态。

150ms 是 mde-vue 为避免短按反馈闪烁而采用的视觉保持策略，不是 Material 规范规定的固定时长。

### 宿主与生命周期

宿主必须能容纳子元素，且不能使用 `display: contents`。`input`、`img` 等不能可靠容纳子元素的元素不支持该指令。自定义交互容器仍需由使用方提供正确的 `role`、`tabindex`、键盘激活和点击行为。

指令会加入一个绝对定位且 `aria-hidden="true"` 的内部子元素，并使用 CSS Anchor Positioning 让其覆盖宿主。不要依赖该子元素的 class、DOM 顺序或其他内部属性。绑定更新只更新选项；卸载时会清理状态层、观察器、事件监听和指令添加的 anchor 名称。

<script setup>
import StateLayerColorExample from '../examples/state-layer/StateLayerColorExample.vue';
import StateLayerDefaultExample from '../examples/state-layer/StateLayerDefaultExample.vue';
import StateLayerDivExample from '../examples/state-layer/StateLayerDivExample.vue';
</script>
