---
title: Container 响应式容器
description: mat-container 统一正文的响应式水平内边距、最大宽度和流式布局。
llms: true
order: 116
---

# Container 响应式容器

## 组件简介

`<mat-container>` 的组件导出名是 `MatContainer`。它的外层始终铺满父容器，并根据浏览器视口在窄于 600px 时使用 16px、其他宽度使用 24px 的水平内边距。默认 Slot 位于正文区域；正文默认最大宽度为 1040px，空间更宽时自动居中。外层具有确定高度时，正文区域同步铺满高度；未确定高度时仍由内容自然撑开。

## 示例

### 默认正文宽度

:::: details 查看示例代码
::: code-group

<<< @/examples/container/ContainerDefaultExample.vue#template [template]

<<< @/examples/container/ContainerDefaultExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Container 默认正文宽度预览" stacked>
    <ContainerDefaultExample />
  </DocsPreview>
</ClientOnly>

### `fluid`

`fluid` 只取消正文区域的 1040px 最大宽度，不改变外层尺寸和响应式水平内边距。

:::: details 查看示例代码
::: code-group

<<< @/examples/container/ContainerFluidExample.vue#template [template]

<<< @/examples/container/ContainerFluidExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Container fluid 预览" stacked>
    <ContainerFluidExample />
  </DocsPreview>
</ClientOnly>

### 确定高度布局

当 Container 作为 Flex 或 Grid 布局中的弹性区域并获得确定高度时，正文区域会同步铺满高度。Slot 内的内容可以直接建立纵向 Flex 高度链，将剩余空间交给局部滚动区域，并让底部区域保持可见。

:::: details 查看示例代码
::: code-group

<<< @/examples/container/ContainerHeightExample.vue#template [template]

<<< @/examples/container/ContainerHeightExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Container 确定高度布局预览" stacked>
    <ContainerHeightExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fluid` | `boolean` | `false` | 为 `false` 时正文最大宽度为 1040px，超过时居中；为 `true` 时正文铺满外层扣除水平内边距后的可用宽度。 |

组件没有公开方法。未被消费的原生属性、`class`、`style` 和事件监听器传给铺满父容器的外层 `div`。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于外层 `div`。

## Slots

| 名称 | 说明 |
| --- | --- |
| 默认 Slot | 正文区域内容。 |

<script setup>
import ContainerDefaultExample from '../examples/container/ContainerDefaultExample.vue';
import ContainerFluidExample from '../examples/container/ContainerFluidExample.vue';
import ContainerHeightExample from '../examples/container/ContainerHeightExample.vue';
</script>
