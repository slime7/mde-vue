---
title: Loader 加载器
description: mat-loader 的线条与环形进度、确定与不确定状态、波浪形及其运动开关、厚度和配色。
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

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderProgressExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loader 确定进度预览" stacked>
    <LoaderProgressExample />
  </DocsPreview>
</ClientOnly>

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderVariantExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loader 形态预览" stacked>
    <LoaderVariantExample />
  </DocsPreview>
</ClientOnly>

### `indeterminate`

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderIndeterminateExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loader 不确定加载预览" stacked>
    <LoaderIndeterminateExample />
  </DocsPreview>
</ClientOnly>

### `shape`

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderShapeExample.vue#template [template]

<<< @/examples/loader/LoaderShapeExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Loader 直线与波浪形预览" stacked>
    <LoaderShapeExample />
  </DocsPreview>
</ClientOnly>

### `waveMotion`

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderWaveMotionExample.vue#template [template]

<<< @/examples/loader/LoaderWaveMotionExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Loader 波浪运动预览" stacked>
    <LoaderWaveMotionExample />
  </DocsPreview>
</ClientOnly>

### `thickness`

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderThicknessExample.vue#template [template]

<<< @/examples/loader/LoaderThicknessExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Loader 厚度预览" stacked>
    <LoaderThicknessExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderColorExample.vue#template [template]

:::
::::

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
| `waveMotion` | `boolean` | `false` | 让线条或环形波浪的相位沿路径连续流动；不会改变进度端点位置 |
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

波浪线的振幅为 3px、波长为 40px；波浪环的径向振幅为 1.6px、波长约为 15px。进度为 0 时，线条和环形的 SVG 活动线段通过圆形 `stroke-linecap` 直接形成与线条同粗的起点圆点；有长度的活动段以及轨道断开处同样使用圆口，组件不会在波浪端点上叠加独立圆点。

线性进度在活动段与轨道之间保留 4px 视觉间隙。线性确定进度末端的停止指示器固定为 4px 圆形，并居中叠放在轨道终点上，不在轨道与圆点之间额外留出断口；它不随 `thickness` 改变。不确定状态和环形加载器不会显示停止指示器。环形进度在活动弧两端与轨道之间分别保留 4px 视觉间隙；不确定状态下，这些断口会与活动段同步移动。组件默认保留线性确定进度的停止指示器，以适配低对比度容器的可访问性要求。

活动指示器和线性停止指示器使用 primary 语义色，轨道使用 secondary container 语义色；显式 `color` 只替换前两者的强调色。

## 事件

组件没有自定义事件。传入的原生 DOM 监听器会绑定到块级根元素。

## Slots

组件没有 Slots；不要在 `<mat-loader>` 内放置文字或其他内容。相邻文本或 `aria-label` 应承担加载状态说明。

## 状态

确定进度以 `role="progressbar"`、`aria-valuemin`、`aria-valuemax` 和 `aria-valuenow` 暴露当前比例。不确定状态保留 `progressbar` 语义但不声明具体值，并让活动片段沿轨道或环形轨道伸缩移动。线条形使用两段错开的活动线段，分别按 Material Web 的平移和伸缩时间轴连续越过轨道；环形组合弧长伸缩、分段旋转和匀速整圈旋转。两种形态的轨道断口都会与活动段同步。在能取得实际进度后，应切换为确定状态。

波浪形默认保持静态；设置 `waveMotion` 后，波浪相位会沿线条或环形路径连续前进，形成流动效果，SVG 圆口仍与活动路径端点重合。切换 `shape` 时始终复用同一条活动路径，并让波峰振幅逐渐增大或收平到直线，不使用两个图层交叉填色。修改 `thickness` 时，容器、轨道和活动段厚度平滑变化。启用减少动态效果偏好时，组件显示静态活动片段并关闭这些动画和过渡。组件没有公开方法。

## 参考来源

尺寸、颜色角色、确定与不确定行为、直线和波浪形依据 Material 3 [Progress indicators specs](https://m3.material.io/components/progress-indicators/specs) 与 [Progress indicators guidelines](https://m3.material.io/components/progress-indicators/guidelines)。不确定状态的时间和缓动参数改编自 Material Web 的 [_linear-progress.scss](https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_linear-progress.scss) 与 [_circular-progress.scss](https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_circular-progress.scss)。

<script setup>
import LoaderColorExample from '../examples/loader/LoaderColorExample.vue';
import LoaderIndeterminateExample from '../examples/loader/LoaderIndeterminateExample.vue';
import LoaderProgressExample from '../examples/loader/LoaderProgressExample.vue';
import LoaderShapeExample from '../examples/loader/LoaderShapeExample.vue';
import LoaderThicknessExample from '../examples/loader/LoaderThicknessExample.vue';
import LoaderVariantExample from '../examples/loader/LoaderVariantExample.vue';
import LoaderWaveMotionExample from '../examples/loader/LoaderWaveMotionExample.vue';
</script>
