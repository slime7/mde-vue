---
title: Loading 加载指示器
description: mat-loading 的自动旋转与受控进度加载指示器、下拉刷新形变、背景容器、尺寸范围和配色。
llms: true
order: 87
---

# Loading 加载指示器

## 组件简介

`<mat-loading>` 的组件导出名是 `MatLoading`。它对应 Material 3 Expressive 的 Loading indicator，用于表示 200ms 到 5s 的短时等待过程；省略 `progress` 时使用不确定的自动旋转，设置有限数值后进入受控进度模式，适合下拉刷新等由外部手势提供进度的场景。活动指示器直接复用 `MatShape` 的官方 7 个 Material 3 形状，并使用相同拓扑的轮廓帧连续变形，容器尺寸默认 48px。

组件根元素始终是块级 `div`，默认水平居中。无论是否启用 `containment`，活动形状均按 38 : 48 比例限制在背景容器尺寸内并居中（未开启时背景容器透明）；`containment` 开启后在指示器外显示圆形背景容器，适合叠加在已有内容之上，活动形状自动换用同组 on-container 内容色。组件每 650ms 启动一次低阻尼弹簧变化，轮廓在前段快速接近下一个形状，额外 90° 旋转使用同一弹簧进度并轻微越过目标后回稳；组件另有 4666ms 的匀速整圈旋转。形状采样点会按整个循环对齐起点，减少轮廓特征在变形时沿边界滑动。

受控模式使用 AndroidX Determinate LoadingIndicator 的两帧参数：从经过 18° 起始旋转处理的圆形变为 `soft-burst`，`0` 到 `1` 之间的进度直接控制形变与 `-progress × 180°` 旋转；进度超过 `1` 后保持 `soft-burst`，继续追加相同方向的旋转。设置 `progress` 会停止自动形状循环和旋转，移除后恢复自动模式。配合 `<mat-pull-to-refresh>` 可直接获得完整的下拉刷新手势。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### `progress` 受控进度

滑块范围为 `0` 至 `2`：`0` 是圆形，`1` 到达 `soft-burst`，超过 `1` 用于观察下拉刷新阈值后的额外旋转。开关切换到“自动旋转”时传入 `undefined` 并禁用滑块。

:::: details 查看示例代码
::: code-group

<<< @/examples/loading/LoadingProgressExample.vue#template [template]

<<< @/examples/loading/LoadingProgressExample.vue#script [script]

<<< @/examples/loading/LoadingProgressExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Loading progress 受控进度预览" stacked>
    <LoadingProgressExample />
  </DocsPreview>
</ClientOnly>

### `containment`

:::: details 查看示例代码
::: code-group

<<< @/examples/loading/LoadingContainmentExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loading containment 预览" stacked>
    <LoadingContainmentExample />
  </DocsPreview>
</ClientOnly>

### `size`

尺寸只接受数字或纯数字字符串，单位是 px，并限制在官方规格的 24 至 240 范围；越界值会收缩到最近的边界。

:::: details 查看示例代码
::: code-group

<<< @/examples/loading/LoadingSizeExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loading size 预览" stacked>
    <LoadingSizeExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `containment` | `boolean` | `false` | 是否在活动指示器外显示圆形背景容器 |
| `size` | `number \| string` | `48` | 指示器宽高，单位 px；数字与纯数字字符串限制在 `24` 至 `240`，越界值收敛到边界 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动指示器强调色；`containment` 开启时自动使用同组 on-container 内容色 |
| `progress` | `number \| undefined` | 未设置 | 有限数值进入受控进度模式；负值按 `0` 处理，`0` 至 `1` 控制圆形到 `soft-burst` 的形变，超过 `1` 保持 `soft-burst` 并继续按 `-progress × 180°` 旋转；省略时保持自动动画 |

未被组件消费的 `aria-*`、`id`、`class`、`style` 和原生事件监听器会传给根元素。组件始终以 `role="progressbar"` 暴露加载语义，应通过 `aria-label` 说明正在加载的内容。

### 尺寸与颜色

根容器默认 48px。无论是否开启 `containment`，活动形状均按 38 : 48 比例限制在背景容器内并保持居中，无容器时等同于透明背景容器。默认配色使用 primary 强调色；显式 `color` 遵循项目统一组件配色规则，只替换强调色族。

## 事件

组件没有自定义事件。传入的原生 DOM 监听器会绑定到根元素。

## Slots

组件没有 Slots；不要在 `<mat-loading>` 内放置文字或其他内容。相邻文本或 `aria-label` 应承担加载状态说明。

## 状态

根元素提供 `role="progressbar"`、`aria-valuemin="0"` 与 `aria-valuemax="1"`。省略 `progress` 时不声明 `aria-valuenow`，活动形状按 650ms 间隔在 7 个官方形状之间变换，同一弹簧进度驱动额外 90° 旋转并与 4666ms 的整圈匀速旋转叠加。设置有限 `progress` 后声明限制在 `0` 至 `1` 的 `aria-valuenow`，暂停自动动画，以进度取样两帧 `polygon()` 轮廓并使用 `-progress × 180°` 旋转；超过 `1` 时轮廓保持 `soft-burst`，旋转继续累加。启用减少动态效果偏好时，自动模式保持首个形状并停止帧循环，受控模式仍显示传入进度对应的轮廓和旋转。组件没有公开方法。

## 参考来源

使用时机、尺寸范围、背景容器、配色与无障碍语义依据 Material 3 [Loading indicator guidelines](https://m3.material.io/components/loading-indicator/guidelines)、[Specs](https://m3.material.io/components/loading-indicator/specs) 与 [Accessibility](https://m3.material.io/components/loading-indicator/accessibility)。活动指示器的 7 个形状取自 [Shape 官方页面](https://m3.material.io/styles/shape/overview-principles)。不确定模式的弹簧、旋转和调度节奏，以及受控模式的 18° 起始圆形、两帧形变和 `-progress × 180°` 旋转参考 [AndroidX LoadingIndicator.kt](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/LoadingIndicator.kt)；下拉刷新阈值后的额外旋转参考 [AndroidX PullToRefresh.kt](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/pulltorefresh/PullToRefresh.kt) 与 [LoadingIndicatorSamples.kt](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/material3/material3/samples/src/main/java/androidx/compose/material3/samples/LoadingIndicatorSamples.kt)。

<script setup>
import LoadingContainmentExample from '../examples/loading/LoadingContainmentExample.vue';
import LoadingProgressExample from '../examples/loading/LoadingProgressExample.vue';
import LoadingSizeExample from '../examples/loading/LoadingSizeExample.vue';
</script>
