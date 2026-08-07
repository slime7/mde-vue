---
title: Image 图片
description: mat-image 的图片填充、圆角、宽高比、尺寸动画与原生属性透传。
llms: true
order: 36
---

# Image 图片

## 组件简介

`<mat-image>` 的组件导出名是 `MatImage`。它以内部原生 `<img>` 提供图片容器，可设置组件圆角（默认 28px）、`cover`/`contain` 填充方式和宽高比；切换宽高比、宽高或圆角时使用 Material 动效令牌平滑过渡。`src` 与其他原生图片属性、事件监听器透传到 `img`，`img-class`、`img-style` 定向到 `img`。

## 示例

### 基础用法

`src` 为必填属性，`alt`、`loading`、`decoding` 等原生属性直接透传到内部 `img`；组件上的 `class` 与 `style` 用于控制根容器尺寸。

:::: details 查看示例代码
::: code-group

<<< @/examples/image/ImageBasicExample.vue#template [template]

<<< @/examples/image/ImageBasicExample.vue#script [script]

<<< @/examples/image/ImageBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Image 基础用法预览">
    <ImageBasicExample />
  </DocsPreview>
</ClientOnly>

### `fit`

`fit` 决定图片在容器中的填充方式，默认 `cover` 裁切填充；`contain` 完整显示图片，容器剩余区域保持背景。

:::: details 查看示例代码
::: code-group

<<< @/examples/image/ImageFitExample.vue#template [template]

<<< @/examples/image/ImageFitExample.vue#script [script]

<<< @/examples/image/ImageFitExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Image fit 预览">
    <ImageFitExample />
  </DocsPreview>
</ClientOnly>

### `radius`

`radius` 控制组件圆角，数字按 px 处理，字符串原样写入 CSS。省略时使用形状令牌 `--mat-sys-shape-corner-extra-large`（默认 28px），主题可以整体调整。

:::: details 查看示例代码
::: code-group

<<< @/examples/image/ImageRadiusExample.vue#template [template]

<<< @/examples/image/ImageRadiusExample.vue#script [script]

<<< @/examples/image/ImageRadiusExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Image radius 预览">
    <ImageRadiusExample />
  </DocsPreview>
</ClientOnly>

### `aspect-ratio`

`aspect-ratio` 设置组件宽高比：数字表示宽/高比，字符串原样写入 CSS `aspect-ratio`。省略时保持图片自然比例。切换比例或宽度时，根容器使用系统动效令牌平滑过渡；系统开启“减少动态效果”时过渡时长归零。

:::: details 查看示例代码
::: code-group

<<< @/examples/image/ImageAspectRatioExample.vue#template [template]

<<< @/examples/image/ImageAspectRatioExample.vue#script [script]

<<< @/examples/image/ImageAspectRatioExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Image aspect-ratio 预览">
    <ImageAspectRatioExample />
  </DocsPreview>
</ClientOnly>

### `img-class`

`img-class` 把 class 合并到内部 `img` 元素，适合为图片本身添加滤镜、描边等样式。

:::: details 查看示例代码
::: code-group

<<< @/examples/image/ImageClassExample.vue#template [template]

<<< @/examples/image/ImageClassExample.vue#script [script]

<<< @/examples/image/ImageClassExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Image img-class 预览">
    <ImageClassExample />
  </DocsPreview>
</ClientOnly>

### `img-style`

`img-style` 把 style 合并到内部 `img` 元素，支持对象、字符串或数组形式。

:::: details 查看示例代码
::: code-group

<<< @/examples/image/ImageStyleExample.vue#template [template]

<<< @/examples/image/ImageStyleExample.vue#script [script]

<<< @/examples/image/ImageStyleExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Image img-style 预览">
    <ImageStyleExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | 必填 | 图片资源地址；必须是非空字符串 |
| `radius` | `number \| string` | `28px`（`--mat-sys-shape-corner-extra-large`） | 组件圆角；数字按 px 处理，字符串原样写入 CSS |
| `fit` | `'cover' \| 'contain'` | `'cover'` | 图片在容器中的填充方式 |
| `aspect-ratio` | `number \| string` | 未设置 | 组件宽高比；数字表示宽/高比，字符串原样写入 CSS `aspect-ratio`，省略时保持图片自然比例 |
| `img-class` | `string \| array \| object` | 未设置 | 合并到内部 `img` 的 class |
| `img-style` | `string \| array \| object` | 未设置 | 合并到内部 `img` 的 style |

组件上的 `class` 与 `style` 作用于根容器，用于控制尺寸等布局；其余未消费的原生属性和事件监听器透传到内部 `img`。组件没有公开方法。

## 事件

组件不定义自定义事件。传入的原生事件监听器（例如 `load`、`error`）作用于内部 `img` 元素。

## Slots

组件不提供 Slots。

## 状态与无障碍

尺寸动画只覆盖属性或样式驱动的变化：根元素对 `aspect-ratio`、`inline-size`、`block-size` 与 `border-radius` 使用 `--mat-sys-motion-duration-medium2` 时长和 standard 缓动过渡；`fit` 切换为离散值不参与动画。父容器尺寸变化导致的百分比重排不逐帧过渡。

`alt` 等原生属性由使用方按图片语义提供；纯装饰图片应传 `alt=""`。组件不改变 `img` 的加载行为，`loading="lazy"`、`srcset` 等属性直接透传。

<script setup>
import ImageAspectRatioExample from '../examples/image/ImageAspectRatioExample.vue';
import ImageBasicExample from '../examples/image/ImageBasicExample.vue';
import ImageClassExample from '../examples/image/ImageClassExample.vue';
import ImageFitExample from '../examples/image/ImageFitExample.vue';
import ImageRadiusExample from '../examples/image/ImageRadiusExample.vue';
import ImageStyleExample from '../examples/image/ImageStyleExample.vue';
</script>
