---
title: Icon 图标
description: mat-icon 的 Material Symbols 字形、SVG 资源、内联 SVG、尺寸、字体轴和配色。
llms: true
order: 35
---

# Icon 图标

## 组件简介

`<mat-icon>` 的组件导出名是 `MatIcon`。它统一展示 Material Symbols 字形、SVG URL 或 `data:` URL，以及默认 Slot 中的真实 SVG 元素，并能控制尺寸、经典四轴、颜色和根标签。组件只负责渲染，不下载字体或图标资源。

## 示例

`src`、`icon` 和默认 Slot 是互斥的内容来源，因此分别展示。

### `icon`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconIconExample.vue#template [template]

<<< @/examples/icon/IconIconExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon icon 预览">
    <IconIconExample />
  </DocsPreview>
</ClientOnly>

### `src`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconSrcExample.vue#template [template]

<<< @/examples/icon/IconSrcExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon src 预览">
    <IconSrcExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconDefaultSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon 默认 Slot 预览">
    <IconDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `size`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconSizeExample.vue#template [template]

<<< @/examples/icon/IconSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon size 预览">
    <IconSizeExample />
  </DocsPreview>
</ClientOnly>

### `fill`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconFillExample.vue#template [template]

<<< @/examples/icon/IconFillExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon fill 预览">
    <IconFillExample />
  </DocsPreview>
</ClientOnly>

### `weight`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconWeightExample.vue#template [template]

<<< @/examples/icon/IconWeightExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon weight 预览">
    <IconWeightExample />
  </DocsPreview>
</ClientOnly>

### `grade`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconGradeExample.vue#template [template]

<<< @/examples/icon/IconGradeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon grade 预览">
    <IconGradeExample />
  </DocsPreview>
</ClientOnly>

### `optical-size`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconOpticalSizeExample.vue#template [template]

<<< @/examples/icon/IconOpticalSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon optical-size 预览">
    <IconOpticalSizeExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconColorExample.vue#template [template]

<<< @/examples/icon/IconColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon color 预览">
    <IconColorExample />
  </DocsPreview>
</ClientOnly>

### `font-color`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconFontColorExample.vue#template [template]

<<< @/examples/icon/IconFontColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon font-color 预览">
    <IconFontColorExample />
  </DocsPreview>
</ClientOnly>

### `as`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconAsExample.vue#template [template]

<<< @/examples/icon/IconAsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon as 预览">
    <IconAsExample />
  </DocsPreview>
</ClientOnly>

### `icon-class`

:::: details 查看示例代码
::: code-group

<<< @/examples/icon/IconClassOnlyExample.vue#template [template]

<<< @/examples/icon/IconClassOnlyExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Icon icon-class 预览">
    <IconClassOnlyExample />
  </DocsPreview>
</ClientOnly>

同时提供多个来源时固定使用 `src > icon > 默认 Slot`。`src` 交给内部 `<img alt="">` 加载；默认 Slot 直接接收 Vue 渲染的 SVG 元素，不解析 SVG 字符串。`fill`、`weight`、`grade` 和 `optical-size` 使用 Material Symbols 字体轴。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `string` | 未设置 | 字体字形或连字文本；允许空字符串 |
| `src` | `string` | 未设置 | 非空 SVG URL 或 `data:` URL，优先于其他内容来源 |
| `size` | `'small' \| 'medium' \| 'large' \| 'extra-large' \| CSS 长度` | `'medium'` | 对应 `20px / 24px / 40px / 48px`；也接受带单位长度及 `var()`、`calc()`、`min()`、`max()`、`clamp()` |
| `fill` | `number` | `0` | Material Symbols `FILL` 轴，范围 `0..1` |
| `weight` | `number` | `400` | Material Symbols `wght` 轴，范围 `100..700` |
| `grade` | `number` | `0` | Material Symbols `GRAD` 轴，范围 `-50..200` |
| `optical-size` | `number` | 自动 | Material Symbols `opsz` 轴，范围 `20..48`；命名尺寸使用对应值，自定义尺寸回退为 `24` |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| 系统颜色角色 \| #RRGGBB` | 未设置 | 语义色族、主题颜色角色或局部 Material 2025 种子色；省略时继承 `currentColor` |
| `font-color` | `string` | 未设置 | 直接使用任意合法 CSS 颜色，同时传入时优先于 `color` |
| `as` | `string` | `'i'` | 非空 HTML 标签名，用作实际根元素 |
| `icon-class` | `string` | 继承全局值 | 空格分隔的图标 class；默认全局值为 `material-symbols-outlined`，空字符串关闭全局值 |

未被消费的原生属性传递给实际根元素。组件没有公开方法。Slot SVG 只有在自身使用 `currentColor` 时才继承组件颜色；`src` 资源保留自己的内部颜色。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于 `as` 指定的根元素；内部图片的 `load`、`error` 不作为公共自定义事件转发。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 在未传 `src` 和 `icon` 时展示真实 SVG 或其他 Vue 内容；推荐 SVG 使用 `viewBox` 并以 `currentColor` 表达可继承颜色 |

## 状态与无障碍

Icon 本身不提供交互语义。装饰性图标应传入 `aria-hidden="true"`；承担信息含义时，应按所在上下文为根元素提供 `role` 和可访问名称。图标模式的 `MatBtn` 由 `label` 提供默认操作名称，也可由显式 `aria-label` 覆盖。

## 参考来源

四轴名称、范围和 FILL 状态动画依据 [Material Symbols 官方指南](https://developers.google.com/fonts/docs/material_symbols?hl=zh-CN)。

<script setup>
import IconAsExample from '../examples/icon/IconAsExample.vue';
import IconClassOnlyExample from '../examples/icon/IconClassOnlyExample.vue';
import IconColorExample from '../examples/icon/IconColorExample.vue';
import IconDefaultSlotExample from '../examples/icon/IconDefaultSlotExample.vue';
import IconFillExample from '../examples/icon/IconFillExample.vue';
import IconFontColorExample from '../examples/icon/IconFontColorExample.vue';
import IconGradeExample from '../examples/icon/IconGradeExample.vue';
import IconIconExample from '../examples/icon/IconIconExample.vue';
import IconOpticalSizeExample from '../examples/icon/IconOpticalSizeExample.vue';
import IconSizeExample from '../examples/icon/IconSizeExample.vue';
import IconSrcExample from '../examples/icon/IconSrcExample.vue';
import IconWeightExample from '../examples/icon/IconWeightExample.vue';
</script>
