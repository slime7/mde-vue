---
title: Simple expansion 简易折叠
description: mat-simple-expansion 的外部 v-model 驱动折叠容器，不带外观与触发器，为开关控制的子设置展开提供折叠过渡。
llms: true
order: 105.4
---

# Simple expansion 简易折叠

## 组件简介

`<mat-simple-expansion>` 的组件导出名是 `MatSimpleExpansion`。它是一个不带外观的折叠容器，效果等同于去掉触发器与容器视觉的 `<mat-expansion-panel>`：内容始终挂载，折叠时在高度 `0` 与自然高度之间播放 Material 3 Expressive 弹簧过渡，并同步渐隐。

组件通过 `v-model` 绑定布尔展开状态，自身不渲染任何触发器，展开与折叠完全由外部开关或按钮驱动，适合「开关控制的子设置展开」这类由外部状态决定折叠的场景。需要自带触发器和手风琴语义时，请使用 `<mat-expansion-panel>`。

## 示例

### 开关绑定 `v-model`

:::: details 查看示例代码
::: code-group

<<< @/examples/simple-expansion/SimpleExpansionSwitchExample.vue#template [template]

<<< @/examples/simple-expansion/SimpleExpansionSwitchExample.vue#script [script]

<<< @/examples/simple-expansion/SimpleExpansionSwitchExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Simple expansion 开关预览">
    <SimpleExpansionSwitchExample />
  </DocsPreview>
</ClientOnly>

### 外部按钮触发子设置展开

:::: details 查看示例代码
::: code-group

<<< @/examples/simple-expansion/SimpleExpansionButtonExample.vue#template [template]

<<< @/examples/simple-expansion/SimpleExpansionButtonExample.vue#script [script]

<<< @/examples/simple-expansion/SimpleExpansionButtonExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Simple expansion 按钮预览">
    <SimpleExpansionButtonExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | `v-model` 展开状态；`true` 展开内容，`false` 折叠内容。展开状态完全由外部驱动 |

未被组件消费的原生属性、`class` 和 `style` 传递给折叠容器根 `div`。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | 为 `v-model` 绑定声明；组件自身不改变状态，从不发出该事件 |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 折叠内容；始终挂载，可放置任意流式内容或组件 |

## 状态与说明

- 折叠时容器高度收为 `0` 并渐隐，展开时过渡到自然高度；动画使用系统空间与效果弹簧令牌，机制与 `<mat-expansion-panel>` 一致。
- 折叠期间容器声明 `aria-hidden="true"` 与 `inert`，内容同时离开无障碍树和焦点顺序；展开后两者立即移除。
- 过渡期间容器裁剪溢出内容；浮层类组件（如 Menu、Dialog）自身会传送挂载，不受裁剪影响。
- `prefers-reduced-motion: reduce` 下取消过渡，直接呈现展开或折叠后的状态。
- 高度在 `0` 与 `auto` 之间的过渡依赖现代浏览器的 `interpolate-size` 特性；不支持该特性的环境中显隐仍然正确，只是没有动画。
- 初次挂载时不播放过渡，内容直接按初始状态显示或隐藏。

## 参考来源

折叠过渡机制与 `<mat-expansion-panel>` 共享，交互模式参考 [APG Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)；触发控件与状态管理由使用方组合。

<script setup>
import SimpleExpansionButtonExample from '../examples/simple-expansion/SimpleExpansionButtonExample.vue';
import SimpleExpansionSwitchExample from '../examples/simple-expansion/SimpleExpansionSwitchExample.vue';
</script>
