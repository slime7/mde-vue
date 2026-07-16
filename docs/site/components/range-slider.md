---
title: Range slider 范围滑块
description: mat-range-slider 的不可变区间 v-model、端点名称、方向、尺寸、停靠点和数值指示。
llms: true
order: 87.5
---

# Range slider 范围滑块

## 组件简介

`<mat-range-slider>` 的组件导出名是 `MatRangeSlider`。它使用两个手柄立即应用一个数值区间，例如价格范围、可用时段或筛选阈值。`v-model` 始终是 `[start, end]` 形式的不可变数组，两个端点会钳制到有效范围、按 `step` 对齐，并始终保持 `start <= end`。

范围滑块没有 `center` 或 `insetIcon` 属性。请用 `aria-label-start` 与 `aria-label-end` 为两个端点分别提供可访问名称，尤其是在没有相邻文本标签时。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### `modelValue`、`min`、`max` 与 `step`

::: details 查看示例代码
<<< @/examples/slider/RangeSliderModelValueExample.vue
:::

<ClientOnly>
  <DocsPreview label="Range slider 区间模型预览" stacked>
    <RangeSliderModelValueExample />
  </DocsPreview>
</ClientOnly>

### `orientation`

::: details 查看示例代码
<<< @/examples/slider/RangeSliderOrientationExample.vue
:::

<ClientOnly>
  <DocsPreview label="Range slider 横竖方向预览" stacked>
    <RangeSliderOrientationExample />
  </DocsPreview>
</ClientOnly>

### `size`

::: details 查看示例代码
<<< @/examples/slider/RangeSliderSizeExample.vue
:::

<ClientOnly>
  <DocsPreview label="Range slider 五档尺寸预览" stacked>
    <RangeSliderSizeExample />
  </DocsPreview>
</ClientOnly>

### `showStopIndicator`

::: details 查看示例代码
<<< @/examples/slider/RangeSliderShowStopIndicatorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Range slider 停靠点预览" stacked>
    <RangeSliderShowStopIndicatorExample />
  </DocsPreview>
</ClientOnly>

### `showValueIndicator`

::: details 查看示例代码
<<< @/examples/slider/RangeSliderShowValueIndicatorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Range slider 数值指示预览" stacked>
    <RangeSliderShowValueIndicatorExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

::: details 查看示例代码
<<< @/examples/slider/RangeSliderDisabledExample.vue
:::

<ClientOnly>
  <DocsPreview label="Range slider 禁用状态预览" stacked>
    <RangeSliderDisabledExample />
  </DocsPreview>
</ClientOnly>

### `color`

::: details 查看示例代码
<<< @/examples/slider/RangeSliderColorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Range slider 局部配色预览" stacked>
    <RangeSliderColorExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `[number, number]` | `[0, 100]` | `v-model` 的 `[start, end]` 区间；每次更新都会发出新的数组 |
| `min` | `number` | `0` | 可选数值的下界 |
| `max` | `number` | `100` | 可选数值的上界；应大于 `min` |
| `step` | `number` | `1` | 大于零的离散步长 |
| `disabled` | `boolean` | `false` | 禁止两个端点的指针和键盘交互 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动轨道、手柄和状态层的局部强调色 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 横向从左到右递增；纵向从下到上递增 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'extra-small'` | 对应 16、24、40、56、96px 轨道高度 |
| `showStopIndicator` | `boolean` | `false` | 为所有离散步长渲染停靠点 |
| `showValueIndicator` | `boolean` | `false` | 仅为当前聚焦或拖动的手柄显示规范化后的数值 |
| `ariaLabelStart` | `string` | 未设置 | 起始端点的可访问名称；模板属性写作 `aria-label-start` |
| `ariaLabelEnd` | `string` | 未设置 | 结束端点的可访问名称；模板属性写作 `aria-label-end` |

拖动或键盘操作试图越过另一端点时，端点会停在另一端点的位置。组件使用两个隐藏的原生 range 输入提供焦点、键盘和 ARIA slider 语义，但不承诺表单提交、原生校验或表单重置代理。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 新的 `[start, end]` 数组 | 任一端点因指针或键盘交互发生变化 |
| `input` | 触发交互的原生 `Event` | 每次区间变化时触发 |
| `change` | 触发交互的原生 `Event` | 指针拖动释放或键盘操作导致区间变化后触发 |

## Slots

该组件没有自定义 Slots。两个端点的名称由 `aria-label-start` 与 `aria-label-end` 提供；不要依赖未命名的范围滑块表达两个端点的含义。

## 状态与交互

组件支持 hover、focus-visible、pressed、disabled 和减少动态效果偏好。点击轨道时选择较近的端点；范围滑块的数值指示只显示当前活跃手柄。方向键每次移动一个步长，`Page Up` 与 `Page Down` 每次移动十个步长，`Home` 与 `End` 分别跳至当前端点允许的最小和最大位置。组件没有公开方法。

## 参考来源

范围变体、尺寸、停靠点和数值指示依据 Material 3 [Slider overview](https://m3.material.io/components/sliders/overview)、[Slider specs](https://m3.material.io/components/sliders/specs) 与 [Slider guidelines](https://m3.material.io/components/sliders/guidelines)。键盘、输入与事件语义参考 [Material Web slider API](https://github.com/material-components/material-web/blob/main/docs/components/slider.md)。

<script setup>
import RangeSliderColorExample from '../examples/slider/RangeSliderColorExample.vue';
import RangeSliderDisabledExample from '../examples/slider/RangeSliderDisabledExample.vue';
import RangeSliderModelValueExample from '../examples/slider/RangeSliderModelValueExample.vue';
import RangeSliderOrientationExample from '../examples/slider/RangeSliderOrientationExample.vue';
import RangeSliderShowStopIndicatorExample from '../examples/slider/RangeSliderShowStopIndicatorExample.vue';
import RangeSliderShowValueIndicatorExample from '../examples/slider/RangeSliderShowValueIndicatorExample.vue';
import RangeSliderSizeExample from '../examples/slider/RangeSliderSizeExample.vue';
</script>
