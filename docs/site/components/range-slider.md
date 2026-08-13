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

:::: details 查看示例代码
::: code-group

<<< @/examples/slider/RangeSliderModelValueExample.vue#template [template]

<<< @/examples/slider/RangeSliderModelValueExample.vue#script [script]

<<< @/examples/slider/RangeSliderModelValueExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Range slider 区间模型预览" stacked>
    <RangeSliderModelValueExample />
  </DocsPreview>
</ClientOnly>

### `orientation`

:::: details 查看示例代码
::: code-group

<<< @/examples/slider/RangeSliderOrientationExample.vue#template [template]

<<< @/examples/slider/RangeSliderOrientationExample.vue#script [script]

<<< @/examples/slider/RangeSliderOrientationExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Range slider 横竖方向预览" stacked>
    <RangeSliderOrientationExample />
  </DocsPreview>
</ClientOnly>

### `size`

:::: details 查看示例代码
::: code-group

<<< @/examples/slider/RangeSliderSizeExample.vue#template [template]

<<< @/examples/slider/RangeSliderSizeExample.vue#script [script]

<<< @/examples/slider/RangeSliderSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Range slider 五档尺寸预览" stacked>
    <RangeSliderSizeExample />
  </DocsPreview>
</ClientOnly>

### `showStopIndicator`

:::: details 查看示例代码
::: code-group

<<< @/examples/slider/RangeSliderShowStopIndicatorExample.vue#template [template]

<<< @/examples/slider/RangeSliderShowStopIndicatorExample.vue#script [script]

<<< @/examples/slider/RangeSliderShowStopIndicatorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Range slider 停靠点预览" stacked>
    <RangeSliderShowStopIndicatorExample />
  </DocsPreview>
</ClientOnly>

### `showValueIndicator`

:::: details 查看示例代码
::: code-group

<<< @/examples/slider/RangeSliderShowValueIndicatorExample.vue#template [template]

<<< @/examples/slider/RangeSliderShowValueIndicatorExample.vue#script [script]

<<< @/examples/slider/RangeSliderShowValueIndicatorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Range slider 数值指示预览" stacked>
    <RangeSliderShowValueIndicatorExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/slider/RangeSliderDisabledExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Range slider 禁用状态预览" stacked>
    <RangeSliderDisabledExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/slider/RangeSliderColorExample.vue#template [template]

<<< @/examples/slider/RangeSliderColorExample.vue#script [script]

<<< @/examples/slider/RangeSliderColorExample.vue#style [style]

:::
::::

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
| `showStopIndicator` | `boolean` | `false` | 最小值与最大值端始终显示终点；手柄与停靠点共用两端各 6px 的保护区域，开启后再为所有离散步长渲染停靠点 |
| `showValueIndicator` | `boolean` | `false` | 仅为当前聚焦或拖动的手柄通过受控 `MatTooltip` 显示规范化后的数值；手柄位于已打开的 dialog 或 Popover 内时，数值指示自动留在该容器中 |
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

| Slot | 作用域 | 用途 |
| --- | --- | --- |
| `indicator-label` | `{ modelValue: number, index: 0 \| 1 }` | 自定义当前活动端点的数值指示内容；`modelValue` 是该端点当前显示值，`index` 的 `0` 代表起点、`1` 代表终点。指示器至少为 48px 圆形，内容较长时横向增长为胶囊形；未提供 Slot 时显示纯数值 |

两个端点的可访问名称由 `aria-label-start` 与 `aria-label-end` 提供；不要依赖未命名的范围滑块表达两个端点的含义。

## 状态与交互

组件支持 focus-visible、pressed、disabled 和减少动态效果偏好。键盘焦点使用 `secondary` 语义色的 3px 胶囊轮廓表示，轮廓与当前活跃手柄相隔 2px，不绘制圆形背景状态层；点击轨道时选择较近的端点。拖动期间，同一绘制帧内的连续指针输入合并为最新位置，活动轨道、非活动轨道和当前活跃手柄不会播放位置补间，释放前会同步刷新最终区间。按下或拖动时仅当前活跃手柄由 4px 收窄至 2px，轨道在两个手柄两侧各保留 6px 断口且断口圆角为 2px；数值指示也只显示当前活跃手柄。指针默认使用 `default`，并遵循 `createMatUi()` 的全局 `useCursor` 设置。方向键每次移动一个步长，`Page Up` 与 `Page Down` 每次移动十个步长，`Home` 与 `End` 分别跳至当前端点允许的最小和最大位置。组件没有公开方法。

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
