---
title: Loader 加载器
description: mat-loader 的线条与环形进度、确定与不确定状态、波浪形、厚度和配色。
llms: true
order: 88
---

# Loader 加载器

## 组件简介

`<mat-loader>` 的组件导出名是 `MatLoader`。它对应 Material 3 的 Progress indicators，提供线条形和环形两种进度展示。默认以线条形、确定进度渲染；设置 `indeterminate` 后用于无法量化完成比例的加载过程。

组件根元素始终是块级 `div`。线条形填满可用行宽，环形仍是块级元素，但其自身宽高由规格尺寸决定。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### `value` 与 `max`

::: details 查看示例代码
<<< @/examples/loader/LoaderProgressExample.vue
:::

<ClientOnly>
  <DocsPreview label="Loader 确定进度预览" stacked>
    <LoaderProgressExample />
  </DocsPreview>
</ClientOnly>

### `variant`

::: details 查看示例代码
<<< @/examples/loader/LoaderVariantExample.vue
:::

<ClientOnly>
  <DocsPreview label="Loader 形态预览" stacked>
    <LoaderVariantExample />
  </DocsPreview>
</ClientOnly>

### `indeterminate`

::: details 查看示例代码
<<< @/examples/loader/LoaderIndeterminateExample.vue
:::

<ClientOnly>
  <DocsPreview label="Loader 不确定加载预览" stacked>
    <LoaderIndeterminateExample />
  </DocsPreview>
</ClientOnly>

### `shape`

::: details 查看示例代码
<<< @/examples/loader/LoaderShapeExample.vue
:::

<ClientOnly>
  <DocsPreview label="Loader 直线与波浪形预览" stacked>
    <LoaderShapeExample />
  </DocsPreview>
</ClientOnly>

### `thickness`

::: details 查看示例代码
<<< @/examples/loader/LoaderThicknessExample.vue
:::

<ClientOnly>
  <DocsPreview label="Loader 厚度预览" stacked>
    <LoaderThicknessExample />
  </DocsPreview>
</ClientOnly>

### `color`

::: details 查看示例代码
<<< @/examples/loader/LoaderColorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Loader 配色预览" stacked>
    <LoaderColorExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'linear' \| 'circular'` | `'linear'` | 选择线条形或环形进度展示 |
| `value` | `number` | `0` | 当前确定进度；实际值会限制在 `0` 到 `max` 之间 |
| `max` | 正数 `number` | `1` | 确定进度的上限 |
| `indeterminate` | `boolean` | `false` | 省略 `aria-valuenow` 并播放不确定加载动画 |
| `shape` | `'flat' \| 'wavy'` | `'flat'` | 选择直线或 Material 3 Expressive 波浪形活动指示器 |
| `thickness` | 正数 `number` | `4` | 轨道和活动指示器的厚度，单位为 CSS px |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动指示器，以及线性确定进度的停止指示器颜色；轨道始终使用 secondary container 语义色 |

未被组件消费的 `aria-*`、`id`、`class`、`style` 和原生事件监听器会传给块级根元素。应通过 `aria-label` 为没有相邻说明文字的加载器提供名称。

### 尺寸与颜色

默认厚度为 4px。官方规格中的 8px 为可调整厚度示例；组件会据此计算对应容器尺寸：

| 形态 | 4px 厚度 | 8px 厚度示例 |
| --- | --- | --- |
| 线条直线 | 高 4px | 高 8px |
| 线条波浪 | 高 10px | 高 14px |
| 环形直线 | 40×40px | 44×44px |
| 环形波浪 | 48×48px | 52×52px |

波浪线的振幅为 3px、波长为 40px；波浪环的径向振幅为 1.6px、波长约为 15px。线性确定进度末端的停止指示器固定为 4px 圆形，不随 `thickness` 改变；不确定状态和环形加载器不会显示它。组件默认保留该圆点，以适配低对比度容器的可访问性要求。

活动指示器和线性停止指示器使用 primary 语义色，轨道使用 secondary container 语义色；显式 `color` 只替换前两者的强调色。

## 事件

组件没有自定义事件。传入的原生 DOM 监听器会绑定到块级根元素。

## Slots

组件没有 Slots；不要在 `<mat-loader>` 内放置文字或其他内容。相邻文本或 `aria-label` 应承担加载状态说明。

## 状态

确定进度以 `role="progressbar"`、`aria-valuemin`、`aria-valuemax` 和 `aria-valuenow` 暴露当前比例。不确定状态保留 `progressbar` 语义但不声明具体值，并让活动片段沿轨道或环形轨道伸缩移动；在能取得实际进度后，应切换为确定状态。启用减少动态效果偏好时，组件显示静态活动片段而不持续动画。组件没有公开方法。

## 参考来源

尺寸、颜色角色、确定与不确定行为、直线和波浪形依据 Material 3 [Progress indicators specs](https://m3.material.io/components/progress-indicators/specs) 与 [Progress indicators guidelines](https://m3.material.io/components/progress-indicators/guidelines)。

<script setup>
import LoaderColorExample from '../examples/loader/LoaderColorExample.vue';
import LoaderIndeterminateExample from '../examples/loader/LoaderIndeterminateExample.vue';
import LoaderProgressExample from '../examples/loader/LoaderProgressExample.vue';
import LoaderShapeExample from '../examples/loader/LoaderShapeExample.vue';
import LoaderThicknessExample from '../examples/loader/LoaderThicknessExample.vue';
import LoaderVariantExample from '../examples/loader/LoaderVariantExample.vue';
</script>
