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

### 字形、SVG 资源和 SVG Slot

<<< @/examples/icon/IconSourcesExample.vue

<ClientOnly>
  <DocsPreview label="Icon 内容来源预览">
    <IconSourcesExample />
  </DocsPreview>
</ClientOnly>

同时提供多个来源时固定使用 `src > icon > 默认 Slot`。`src` 交给内部 `<img alt="">` 加载，不会下载后再转成内联 SVG；默认 Slot 直接接收 Vue 渲染的 SVG 元素，不解析 SVG 字符串。

### 尺寸、配色和字体轴动画

<<< @/examples/icon/IconAppearanceExample.vue

<ClientOnly>
  <DocsPreview label="Icon 尺寸和字体轴预览" stacked>
    <IconAppearanceExample />
  </DocsPreview>
</ClientOnly>

`fill`、`weight`、`grade` 和 `optical-size` 会通过项目动效令牌平滑过渡；系统要求减少动画时立即切换。应用加载的字体文件必须包含对应变量范围，否则字体可能忽略部分值。

### 自定义图标 class 与根标签

<<< @/examples/icon/IconClassExample.vue

<ClientOnly>
  <DocsPreview label="Icon 自定义 class 预览">
    <IconClassExample />
  </DocsPreview>
</ClientOnly>

空 `icon` 仍视为显式字形来源，可配合由 class 或伪元素决定具体图形的图标库。`icon-class` 会覆盖 `createMatUi({ iconClass })` 的全局值；传入空字符串可以关闭全局 class。

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
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| #RRGGBB` | 未设置 | 语义色族或局部 Material 2025 种子色；省略时继承 `currentColor` |
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

Icon 本身不提供交互语义。装饰性图标应传入 `aria-hidden="true"`；承担信息含义时，应按所在上下文为根元素提供 `role` 和可访问名称。图标模式的 `MatBtn` 仍由必填 `label` 提供操作名称。

## 参考来源

四轴名称、范围和 FILL 状态动画依据 [Material Symbols 官方指南](https://developers.google.com/fonts/docs/material_symbols?hl=zh-CN)。

<script setup>
import IconAppearanceExample from '../examples/icon/IconAppearanceExample.vue';
import IconClassExample from '../examples/icon/IconClassExample.vue';
import IconSourcesExample from '../examples/icon/IconSourcesExample.vue';
</script>
