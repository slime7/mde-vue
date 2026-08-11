---
title: Text 文字
description: mat-text 的 Material 3 文字类型、尺寸、强调样式和动态根元素。
llms: true
order: 37
---

# Text 文字

## 组件简介

`<mat-text>` 的组件导出名是 `MatText`。它从 Material 3 type scale 中选择文字类型、尺寸和 baseline/emphasized 样式，并可通过 `as` 使用合适的原生 HTML 语义。组件不指定字体族，文字继续继承应用的默认字体。

## 示例

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/text/TextDefaultSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Text 默认 Slot 预览">
    <TextDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `type`

:::: details 查看示例代码
::: code-group

<<< @/examples/text/TextTypeExample.vue#template [template]

<<< @/examples/text/TextTypeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Text type 预览">
    <TextTypeExample />
  </DocsPreview>
</ClientOnly>

### `size`

:::: details 查看示例代码
::: code-group

<<< @/examples/text/TextSizeExample.vue#template [template]

<<< @/examples/text/TextSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Text size 预览">
    <TextSizeExample />
  </DocsPreview>
</ClientOnly>

### `emphasized`

:::: details 查看示例代码
::: code-group

<<< @/examples/text/TextEmphasizedExample.vue#template [template]

<<< @/examples/text/TextEmphasizedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Text emphasized 预览">
    <TextEmphasizedExample />
  </DocsPreview>
</ClientOnly>

emphasized 样式用于局部传达层级或重要性，例如选中或激活的内容、未读信息、关键操作和重点标题。它应与 baseline 样式配合使用，不应作为页面全部文字的默认样式。Material 组件本身不会仅因存在强调样式就自动启用它；使用方应根据内容状态和重要程度显式选择。

### `as`

:::: details 查看示例代码
::: code-group

<<< @/examples/text/TextAsExample.vue#template [template]

<<< @/examples/text/TextAsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Text as 预览">
    <TextAsExample />
  </DocsPreview>
</ClientOnly>

`as` 只替换实际根标签，不会根据文字外观自动推断文档层级。标题仍应选择符合页面结构的 `h1` 至 `h6`，普通正文可使用 `p` 或 `span`。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'display' \| 'headline' \| 'title' \| 'body' \| 'label'` | `'body'` | Material 3 文字类型 |
| `size` | `'large' \| 'medium' \| 'small'` | `'medium'` | 同一文字类型内的尺寸 |
| `emphasized` | `boolean` | `false` | 使用同类型同尺寸的 emphasized 样式 |
| `as` | `string` | `'span'` | 合法 HTML 标签名，用作实际根元素 |

未被组件消费的原生属性会传递给 `as` 指定的根元素。组件没有公开方法。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于 `as` 指定的根元素。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 要按所选 Material 3 排版样式展示的文字或内联内容 |

## 公共工具样式

不需要组件时，可以直接使用 `mde-vue/styles.css` 提供的 30 个公共 class：baseline 使用 `.mat-sys-typescale-<type>-<size>`，emphasized 使用 `.mat-sys-typescale-emphasized-<type>-<size>`。它们设置字号、字重、行高和字距，但不设置字体族。

Tailwind CSS v4 对应使用 `text-mat-<type>-<size>` 和 `text-mat-emphasized-<type>-<size>`。

## 参考来源

文字尺度和 emphasized 使用场景依据 [Material 3 Typography 官方文档](https://m3.material.io/styles/typography/type-scale-tokens)。

<script setup>
import TextAsExample from '../examples/text/TextAsExample.vue';
import TextDefaultSlotExample from '../examples/text/TextDefaultSlotExample.vue';
import TextEmphasizedExample from '../examples/text/TextEmphasizedExample.vue';
import TextSizeExample from '../examples/text/TextSizeExample.vue';
import TextTypeExample from '../examples/text/TextTypeExample.vue';
</script>
