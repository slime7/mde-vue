---
title: Spacer 弹性占位
description: mat-spacer 在 flex 布局中占据主轴剩余空间。
llms: true
order: 115
---

# Spacer 弹性占位

## 组件简介

`<mat-spacer>` 的组件导出名是 `MatSpacer`。它是一个无内容、无交互的 flex 子元素，通过增长占据父容器主轴上的剩余空间，适合分隔工具栏或 Dialog actions 中的操作组。父元素需要使用 flex 布局。

## 示例

### Flex 操作栏

::: details 查看示例代码
<<< @/examples/spacer/SpacerFlexExample.vue
:::

<ClientOnly>
  <DocsPreview label="Spacer flex 布局预览">
    <SpacerFlexExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

组件没有专用属性。未被消费的原生属性、`class` 和 `style` 传递给根 `span`；组件固定设置 `aria-hidden="true"`，不进入无障碍树。组件没有公开方法。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于根 `span`，但 Spacer 本身不应承担交互。

## Slots

组件没有 Slots，也不应放置文字、图标或其他内容。

## 布局行为

Spacer 使用 `flex-grow: 1`，可同时用于横向和纵向 flex 容器。多个 Spacer 会平均分配可增长的剩余空间；组件不设置父容器的方向、对齐或间距。

<script setup>
import SpacerFlexExample from '../examples/spacer/SpacerFlexExample.vue';
</script>
