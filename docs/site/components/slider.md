---
title: Slider 滑块
description: mat-slider 的单数值 v-model、标准与居中变体、尺寸、方向、图标和数值指示。
llms: true
order: 87
---

# Slider 滑块

## 组件简介

`<mat-slider>` 的组件导出名是 `MatSlider`。它用于立即应用一个连续或离散数值，例如音量、亮度或平衡值。组件提供标准与居中两种单滑块变体，支持横向和纵向布局、五档 Material 3 尺寸、内嵌图标、停靠点和按需显示的数值指示。

数值始终被限制在 `min` 与 `max` 之间，并按 `step` 对齐。若没有可见标签，必须传入 `aria-label`，使内部原生 range 输入具有可访问名称。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### `modelValue`、`min`、`max` 与 `step`

::: details 查看示例代码
<<< @/examples/slider/SliderModelValueExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 数值模型预览" stacked>
    <SliderModelValueExample />
  </DocsPreview>
</ClientOnly>

### `variant` 与 `center`

::: details 查看示例代码
<<< @/examples/slider/SliderVariantExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 居中变体预览" stacked>
    <SliderVariantExample />
  </DocsPreview>
</ClientOnly>

### `orientation`

::: details 查看示例代码
<<< @/examples/slider/SliderOrientationExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 横竖方向预览" stacked>
    <SliderOrientationExample />
  </DocsPreview>
</ClientOnly>

### `size`

::: details 查看示例代码
<<< @/examples/slider/SliderSizeExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 五档尺寸预览" stacked>
    <SliderSizeExample />
  </DocsPreview>
</ClientOnly>

### `insetIcon`

::: details 查看示例代码
<<< @/examples/slider/SliderInsetIconExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 内嵌图标预览" stacked>
    <SliderInsetIconExample />
  </DocsPreview>
</ClientOnly>

### `showStopIndicator`

::: details 查看示例代码
<<< @/examples/slider/SliderShowStopIndicatorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 停靠点预览" stacked>
    <SliderShowStopIndicatorExample />
  </DocsPreview>
</ClientOnly>

### `showValueIndicator`

::: details 查看示例代码
<<< @/examples/slider/SliderShowValueIndicatorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 数值指示预览" stacked>
    <SliderShowValueIndicatorExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

::: details 查看示例代码
<<< @/examples/slider/SliderDisabledExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 禁用状态预览" stacked>
    <SliderDisabledExample />
  </DocsPreview>
</ClientOnly>

### `color`

::: details 查看示例代码
<<< @/examples/slider/SliderColorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Slider 局部配色预览" stacked>
    <SliderColorExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `number` | `0` | `v-model` 的当前数值；会被钳制并按步长对齐 |
| `min` | `number` | `0` | 可选数值的下界 |
| `max` | `number` | `100` | 可选数值的上界；应大于 `min` |
| `step` | `number` | `1` | 大于零的离散步长 |
| `variant` | `'standard' \| 'centered'` | `'standard'` | 标准轨道或从中心基准向两侧延展的轨道 |
| `center` | `number` | `min`、`max` 的中点并按步长对齐 | 居中变体的活动轨道起点；标准变体忽略它 |
| `disabled` | `boolean` | `false` | 禁止指针和键盘交互 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动轨道、手柄和状态层的局部强调色 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 横向从左到右递增；纵向从下到上递增 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'extra-small'` | 对应 16、24、40、56、96px 轨道高度 |
| `insetIcon` | `string` | 未设置 | Material Symbols 图标名；仅在 `medium`、`large`、`extra-large` 显示，并随活动轨道覆盖范围切换前景色 |
| `showStopIndicator` | `boolean` | `false` | 标准变体始终显示最大值终点，居中变体始终显示最小值与最大值终点；手柄与停靠点共用两端各 6px 的保护区域，开启后再为所有离散步长渲染停靠点 |
| `showValueIndicator` | `boolean` | `false` | 当前手柄聚焦或拖动时通过受控 `MatTooltip` 显示规范化后的数值 |

`aria-label` 会透传给内部原生 range 输入。组件使用隐藏的原生输入提供焦点、键盘和 ARIA slider 语义，但不承诺表单提交、原生校验或表单重置代理。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 下一 `number` | 数值因指针或键盘交互发生变化 |
| `input` | 触发交互的原生 `Event` | 每次数值变化时触发 |
| `change` | 触发交互的原生 `Event` | 指针拖动释放或键盘操作导致数值变化后触发 |

## Slots

该组件没有自定义 Slots。请用相邻文本、`aria-label` 或 `aria-labelledby` 说明滑块用途。

## 状态与交互

组件支持 focus-visible、pressed、disabled 和减少动态效果偏好。键盘焦点使用手柄轮廓表示，不绘制圆形背景状态层；按下或拖动时，当前手柄会由 4px 收窄至 2px，轨道在手柄两侧保留 6px 断口且断口圆角为 2px。指针默认使用 `default`，并遵循 `createMatUi()` 的全局 `useCursor` 设置。方向键每次移动一个步长，`Page Up` 与 `Page Down` 每次移动十个步长，`Home` 与 `End` 分别跳至最小和最大可对齐值。纵向滑块以底部为最小值、顶部为最大值。组件没有公开方法。

## 参考来源

尺寸、变体、图标、停靠点和数值指示依据 Material 3 [Slider overview](https://m3.material.io/components/sliders/overview)、[Slider specs](https://m3.material.io/components/sliders/specs) 与 [Slider guidelines](https://m3.material.io/components/sliders/guidelines)。键盘、输入与事件语义参考 [Material Web slider API](https://github.com/material-components/material-web/blob/main/docs/components/slider.md)。

<script setup>
import SliderColorExample from '../examples/slider/SliderColorExample.vue';
import SliderDisabledExample from '../examples/slider/SliderDisabledExample.vue';
import SliderInsetIconExample from '../examples/slider/SliderInsetIconExample.vue';
import SliderModelValueExample from '../examples/slider/SliderModelValueExample.vue';
import SliderOrientationExample from '../examples/slider/SliderOrientationExample.vue';
import SliderShowStopIndicatorExample from '../examples/slider/SliderShowStopIndicatorExample.vue';
import SliderShowValueIndicatorExample from '../examples/slider/SliderShowValueIndicatorExample.vue';
import SliderSizeExample from '../examples/slider/SliderSizeExample.vue';
import SliderVariantExample from '../examples/slider/SliderVariantExample.vue';
</script>
