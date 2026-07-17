---
title: Divider 分隔线
description: mat-divider 的 Material 3 全宽、起始缩进和两侧缩进样式。
llms: true
order: 110
---

# Divider 分隔线

## 组件简介

`<mat-divider>` 的组件导出名是 `MatDivider`。它以低强调的 Material 3 `outline-variant` 色分隔相邻内容，支持全宽、起始侧缩进和两侧缩进。Divider 可以独立使用，也可以作为 `MatList` 的直接子项。

## 示例

### 三种缩进

:::: details 查看示例代码
::: code-group

<<< @/examples/divider/DividerInsetsExample.vue#template [template]

<<< @/examples/divider/DividerInsetsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Divider 三种缩进预览" stacked>
    <DividerInsetsExample />
  </DocsPreview>
</ClientOnly>

### List 中使用

:::: details 查看示例代码
::: code-group

<<< @/examples/divider/DividerListExample.vue#template [template]

<<< @/examples/divider/DividerListExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Divider 在 List 中的预览">
    <DividerListExample />
  </DocsPreview>
</ClientOnly>

普通 List 中 Divider 自动使用合法的 `li` separator 语义；选择 List 中它只作为不参与选择的展示元素。segmented List 已通过项目间隔表达分组，通常不再加入 Divider。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `inset` | `'none' \| 'start' \| 'middle'` | `'none'` | 全宽、起始侧缩进 16px 或两侧缩进 16px |

未被消费的原生属性传递给实际根元素。独立使用时根元素是 `hr`；普通 List 中是 `li`；选择 List 中是展示用 `div`。组件没有公开方法。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于实际根元素。

## Slots

组件没有 Slots，也不应在分隔线上放置文字、图标或操作。

## 状态

Divider 固定为 1px，不响应 hover、focus、pressed 或 selected，也不进入 Tab 顺序。缩进使用逻辑方向，因此会随页面文字方向调整起始侧。

## 参考来源

尺寸、缩进和颜色角色依据 Material 3 [Divider specs](https://m3.material.io/components/divider/specs)。

<script setup>
import DividerInsetsExample from '../examples/divider/DividerInsetsExample.vue';
import DividerListExample from '../examples/divider/DividerListExample.vue';
</script>
