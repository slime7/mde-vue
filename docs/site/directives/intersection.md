---
title: Intersection 指令
description: v-intersection 的 IntersectionObserver 绑定值、选项和修饰符。
llms: true
order: 120
---

# Intersection 指令

## 指令简介

`v-intersection` 的 JavaScript 导出名是 `Intersection`。它把元素连接到原生 `IntersectionObserver`，在相交状态改变时调用处理函数，不渲染额外元素，也不定义 Vue 组件事件或 Slots。

## 示例

### 处理函数

:::: details 查看示例代码
::: code-group

<<< @/examples/intersection/IntersectionHandlerExample.vue#template [template]

<<< @/examples/intersection/IntersectionHandlerExample.vue#script [script]

<<< @/examples/intersection/IntersectionHandlerExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Intersection 处理函数预览">
    <IntersectionHandlerExample />
  </DocsPreview>
</ClientOnly>

### IntersectionObserver 选项

:::: details 查看示例代码
::: code-group

<<< @/examples/intersection/IntersectionOptionsExample.vue#template [template]

<<< @/examples/intersection/IntersectionOptionsExample.vue#script [script]

<<< @/examples/intersection/IntersectionOptionsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Intersection options 预览">
    <IntersectionOptionsExample />
  </DocsPreview>
</ClientOnly>

### quiet 与 once

:::: details 查看示例代码
::: code-group

<<< @/examples/intersection/IntersectionModifiersExample.vue#template [template]

<<< @/examples/intersection/IntersectionModifiersExample.vue#script [script]

<<< @/examples/intersection/IntersectionModifiersExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Intersection 修饰符预览">
    <IntersectionModifiersExample />
  </DocsPreview>
</ClientOnly>

## API

### 绑定值

| 形式 | 类型 | 说明 |
| --- | --- | --- |
| 处理函数 | `(isIntersecting, entries, observer) => void` | 直接作为回调使用。 |
| 对象 | `{ handler, options? }` | `handler` 是回调；`options` 原样传给 `IntersectionObserver`。 |

### 修饰符

| 修饰符 | 说明 |
| --- | --- |
| `.quiet` | 跳过观察器首次投递的回调，后续投递仍会调用处理函数。 |
| `.once` | 首次出现相交项后解除观察；不相交投递不会结束观察。 |

### 回调

处理函数接收三个参数：`isIntersecting` 是当前投递中是否至少有一个 entry 相交，`entries` 是本次原生 `IntersectionObserverEntry[]`，`observer` 是当前 `IntersectionObserver` 实例。指令没有 Vue 自定义事件和 Slots。

### 生命周期

指令挂载时创建观察器，绑定更新时重新创建，卸载时解除观察。浏览器没有 `IntersectionObserver` 时指令保持静默，不执行处理函数。

<script setup>
import IntersectionHandlerExample from '../examples/intersection/IntersectionHandlerExample.vue';
import IntersectionModifiersExample from '../examples/intersection/IntersectionModifiersExample.vue';
import IntersectionOptionsExample from '../examples/intersection/IntersectionOptionsExample.vue';
</script>
