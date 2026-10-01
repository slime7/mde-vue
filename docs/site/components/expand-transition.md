---
title: Expand transition 折叠过渡
description: mat-expand-transition 的外部状态驱动折叠过渡容器，为 v-show 或 v-if 切换的内容提供高度折叠动画。
llms: true
order: 105.5
---

# Expand transition 折叠过渡

## 组件简介

`<mat-expand-transition>` 的组件导出名是 `MatExpandTransition`。它是一个无渲染过渡容器，为外部状态驱动的折叠内容提供 Material 3 Expressive 高度过渡：进入时从高度 0 展开到自然高度，离开时折叠回 0。

组件不维护展开状态，也不渲染任何包装元素。把需要折叠的内容作为默认插槽的唯一子元素，用 `v-show` 或 `v-if` 由任意外部状态驱动显隐即可。与自带触发器和手风琴语义的 `<mat-expansion-panel>` 不同，它专门服务「开关控制的子设置展开」这类由外部状态决定的折叠场景。

## 示例

### `v-show` 驱动的折叠

:::: details 查看示例代码
::: code-group

<<< @/examples/expand-transition/ExpandTransitionShowExample.vue#template [template]

<<< @/examples/expand-transition/ExpandTransitionShowExample.vue#script [script]

<<< @/examples/expand-transition/ExpandTransitionShowExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expand transition 显隐预览">
    <ExpandTransitionShowExample />
  </DocsPreview>
</ClientOnly>

### 开关控制的子设置展开

:::: details 查看示例代码
::: code-group

<<< @/examples/expand-transition/ExpandTransitionSettingExample.vue#template [template]

<<< @/examples/expand-transition/ExpandTransitionSettingExample.vue#script [script]

<<< @/examples/expand-transition/ExpandTransitionSettingExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expand transition 子设置预览">
    <ExpandTransitionSettingExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

组件没有属性。显隐完全由插槽子元素上的 `v-show` 或 `v-if` 控制，组件只负责过渡动画。

## 事件

组件没有自定义事件。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 需要折叠过渡的内容；必须提供单个根元素，显隐由该元素上的 `v-show` 或 `v-if` 驱动 |

## 状态与说明

- 过渡使用系统空间弹簧动效令牌；`prefers-reduced-motion: reduce` 下取消过渡，直接呈现展开或折叠后的状态。
- 过渡期间内容容器为 `overflow: hidden`，过渡结束后恢复原有 overflow。折叠内容无需约定固定高度，按内容自然撑开。
- 内容根元素的纵向外边距建议改为内边距或由外层容器承载，避免折叠首尾出现跳变。
- 高度在 `0` 与 `auto` 之间的过渡依赖现代浏览器的 `interpolate-size` 特性；不支持该特性的环境中显隐仍然正确，只是没有动画。
- 初次挂载时不播放过渡，内容直接按初始状态显示或隐藏。

<script setup>
import ExpandTransitionSettingExample from '../examples/expand-transition/ExpandTransitionSettingExample.vue';
import ExpandTransitionShowExample from '../examples/expand-transition/ExpandTransitionShowExample.vue';
</script>
