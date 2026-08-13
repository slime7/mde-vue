---
title: Loader 加载器
description: mat-loader 的线条与环形进度、确定与不确定状态、波浪形、环形尺寸、粗细档位和配色。
llms: true
order: 88
---

# Loader 加载器

## 组件简介

`<mat-loader>` 的组件导出名是 `MatLoader`。它对应 Material 3 的 Progress indicators，提供线条形和环形两种进度展示。默认以线条形、确定进度渲染；设置 `indeterminate` 后用于无法量化完成比例的加载过程。

组件根元素始终是块级 `div`。线条形填满可用行宽；环形仍是块级元素，其自身宽高由 `size` 决定。

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

### `size`

:::: details 查看示例代码
::: code-group

<<< @/examples/loader/LoaderSizeExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loader 环形尺寸预览" stacked>
    <LoaderSizeExample />
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
| `size` | `number \| string` | `48` | 环形加载器的宽高，单位为 CSS px；数字与纯数字字符串限制在 `24` 至 `240`，线条形忽略此属性 |
| `thickness` | `'default' \| 'heavy'` | `'default'` | 轨道和活动指示器的粗细档位 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动指示器，以及线性确定进度的停止指示器颜色；轨道始终使用 secondary container 语义色 |

未被组件消费的 `aria-*`、`id`、`class`、`style` 和原生事件监听器会传给块级根元素。应通过 `aria-label` 为没有相邻说明文字的加载器提供名称。

### 尺寸与颜色

线条形不读取 `size`，`default` 和 `heavy` 分别使用 4px 与 4.8px 粗细。环形的 `size` 同时控制基础宽高，默认 48px；数字与纯数字字符串通过共享数值转换方法解析后限制在官方规格的 24px 至 240px 范围，非法值回退 48px。环形 `default` 粗细为 `size / 12`，`heavy` 为其两倍，即 `size / 6`。

环形以 48px 为基础尺寸：平直路径半径为 18px，波浪路径半径为 20.4px；default 粗细为 4px，heavy 为其两倍的 8px。平直环的名义外径分别为 40px 和 44px，计入 1.6px 振幅后的波浪环名义外径分别为 48px 和 52px。切换 shape 时，路径半径会随波浪振幅一起在两个基础半径间平滑过渡；切换 thickness 不改变路径半径。

`size` 表示环形的基础宽高。组件在基础宽高四周保留 `size / 24` 的外边距，用来展示 heavy 波浪超出的部分；48px 时每侧外边距为 2px，因此主体仍按 48px 布局，完整占位范围为 52px。尺寸变化时，外边距跟随 `size / 48` 等比增减。

波浪线的振幅为 3px、波长为 40px。波浪环的半径、粗细、振幅、波长和外边距随 `size` 等比缩放：24px、48px、240px 时的振幅分别为 0.8px、1.6px、8px，波长分别约为 7.5px、15px、75px，使不同尺寸保持接近的波峰数量和轮廓比例。4px 轨道间隙不会随 `size` 缩放。进度为 0 时，线条和环形的 SVG 活动线段通过圆形 `stroke-linecap` 直接形成与线条同粗的起点圆点；有长度的活动段以及轨道断开处同样使用圆口，组件不会在波浪端点上叠加独立圆点。

线性进度在活动段与轨道之间保留 4px 视觉间隙。线性确定进度末端的停止指示器固定为 4px 圆形，并居中叠放在轨道终点上，不在轨道与圆点之间额外留出断口；它不随 `thickness` 改变。不确定状态和环形加载器不会显示停止指示器。环形进度在活动弧两端与轨道之间分别保留 4px 视觉间隙；不确定状态下，这些断口会与活动段同步移动。组件默认保留线性确定进度的停止指示器，以适配低对比度容器的可访问性要求。

活动指示器和线性停止指示器使用 primary 语义色，轨道使用 secondary container 语义色；显式 `color` 只替换前两者的强调色。

## 事件

组件没有自定义事件。传入的原生 DOM 监听器会绑定到块级根元素。

## Slots

组件没有 Slots；不要在 `<mat-loader>` 内放置文字或其他内容。相邻文本或 `aria-label` 应承担加载状态说明。

## 状态

确定进度以 `role="progressbar"`、`aria-valuemin`、`aria-valuemax` 和 `aria-valuenow` 暴露当前比例。不确定状态保留 `progressbar` 语义但不声明具体值，并让活动片段沿轨道或环形轨道伸缩移动。线条形使用两段错开的活动线段，分别按 Material Web 的平移和伸缩时间轴连续越过轨道；环形组合弧长伸缩、分段旋转和匀速整圈旋转。两种形态的轨道断口都会与活动段同步。在能取得实际进度后，应切换为确定状态。

波浪形默认保持静态；设置 `waveMotion` 后，波浪相位会沿线条或环形路径连续前进，形成流动效果，SVG 圆口仍与活动路径端点重合。切换 `shape` 时始终复用同一条活动路径，并让波峰振幅逐渐增大或收平到直线，不使用两个图层交叉填色。修改 `size` 或 `thickness` 时，容器和线条粗细继续使用系统动效令牌过渡。启用减少动态效果偏好时，组件显示静态活动片段并关闭这些动画和过渡。组件没有公开方法。

## 参考来源

尺寸、颜色角色、确定与不确定行为、直线和波浪形依据 Material 3 [Progress indicators specs](https://m3.material.io/components/progress-indicators/specs) 与 [Progress indicators guidelines](https://m3.material.io/components/progress-indicators/guidelines)。不确定状态的时间和缓动参数改编自 Material Web 的 [_linear-progress.scss](https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_linear-progress.scss) 与 [_circular-progress.scss](https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/progress/internal/_circular-progress.scss)。

<script setup>
import LoaderColorExample from '../examples/loader/LoaderColorExample.vue';
import LoaderIndeterminateExample from '../examples/loader/LoaderIndeterminateExample.vue';
import LoaderProgressExample from '../examples/loader/LoaderProgressExample.vue';
import LoaderShapeExample from '../examples/loader/LoaderShapeExample.vue';
import LoaderSizeExample from '../examples/loader/LoaderSizeExample.vue';
import LoaderThicknessExample from '../examples/loader/LoaderThicknessExample.vue';
import LoaderVariantExample from '../examples/loader/LoaderVariantExample.vue';
import LoaderWaveMotionExample from '../examples/loader/LoaderWaveMotionExample.vue';
</script>
