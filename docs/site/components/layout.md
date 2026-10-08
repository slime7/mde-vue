---
title: Layout 布局容器
description: mat-layout 建立局部边缘布局坐标系，协调六向 aside 的空间占用与正文自适应避让。
llms: true
order: 118
---

# Layout 布局容器

## 组件简介

`<mat-layout>` 的组件导出名是 `MatLayout`。它为局部区域（如卡片、工作区或视口分屏）提供多边缘停靠协调上下文。与 `<mat-aside>` 搭配使用时，自动计算各边缘占用厚度并为正文内容区提供自适应避让内边距。

## 示例

### 基础布局

在 `<mat-layout>` 内声明顶部与侧栏 Aside，正文内容自动留白展示。

:::: details 查看示例代码
::: code-group

<<< @/examples/layout/LayoutBasicExample.vue#template [template]

<<< @/examples/layout/LayoutBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Layout 基础布局预览" stacked height="252px">
    <LayoutBasicExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `as` | `string` | `'div'` | 根容器渲染的 HTML 标签，如 `'div'`、`'section'`、`'main'` 等。 |未被消费的属性、`class`、`style` 作用于外层根元素。

## 事件

组件不定义自定义事件。

## Slots

| 名称 | 说明 |
| --- | --- |
| 默认 Slot | 包含 `<mat-aside>` 边缘栏与主正文内容。 |

<script setup>
import LayoutBasicExample from '../examples/layout/LayoutBasicExample.vue';
</script>
