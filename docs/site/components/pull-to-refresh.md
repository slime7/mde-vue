---
title: PullToRefresh 下拉刷新
description: mat-pull-to-refresh 的滚动区域下拉刷新手势、触发距离、placeholder 推挤内容与加载指示器透传。
llms: true
order: 88
---

# PullToRefresh 下拉刷新

## 组件简介

`<mat-pull-to-refresh>` 的组件导出名是 `MatPullToRefresh`。它在滚动区域起始端提供 Material 3 风格的下拉刷新手势：垂直 `mat-scroll-area` 滚动到顶部后继续向下拉动、水平 `mat-scroll-area` 滚动到最左端后继续向右拉动，都会以短暂的淡入放大动画显示内部的 `mat-loading` 指示器；释放时拉动距离达到触发距离即发出刷新，未达到则取消。鼠标、触摸、笔的拖拽与滚轮、触控板在边界朝界外的滚动都能触发。

组件没有 Slots，只负责手势与指示器：把它作为 `mat-scroll-area` 内容的第一个子元素，列表或其他内容作为兄弟元素跟在组件后面，组件渲染为零尺寸元素悬浮在内容上方。开启 `placeholder` 后组件自身随拉动变高（水平时变宽），把后面的内容推离起点，呈现列表"被拉动"的视觉效果。入场与回弹动画的阈值、拖拽系数和弹簧参数对应 AndroidX Material 3 `PullToRefresh` 的官方数值，刷新期间指示器切换到 `mat-loading` 的自动旋转模式。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### `v-model` 与 `refresh` 事件

触发刷新时组件把 `modelValue` 置为 `true` 并发出 `refresh`；异步刷新完成后把 `modelValue` 置回 `false`，指示器在原位淡出。刷新过程中继续拉动不会重复触发。

:::: details 查看示例代码
::: code-group

<<< @/examples/pull-to-refresh/PullToRefreshBasicExample.vue#template [template]

<<< @/examples/pull-to-refresh/PullToRefreshBasicExample.vue#script [script]

<<< @/examples/pull-to-refresh/PullToRefreshBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="PullToRefresh 基础用法预览" stacked>
    <PullToRefreshBasicExample />
  </DocsPreview>
</ClientOnly>

### `placeholder`

开启后组件根元素随拉动变高（水平时变宽）：开始下拉即随拉动距离增长，拉满进度后停止增长。触发刷新后 placeholder 以空间弹簧回弹归零、内容复位，指示器悬浮在内容上方；取消拉动或刷新结束时同样回弹归零。未开启时内容始终不移动。

:::: details 查看示例代码
::: code-group

<<< @/examples/pull-to-refresh/PullToRefreshPlaceholderExample.vue#template [template]

<<< @/examples/pull-to-refresh/PullToRefreshPlaceholderExample.vue#script [script]

<<< @/examples/pull-to-refresh/PullToRefreshPlaceholderExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="PullToRefresh placeholder 预览" stacked>
    <PullToRefreshPlaceholderExample />
  </DocsPreview>
</ClientOnly>

### `triggerDistance`

触发距离接受数字或纯数字字符串，单位 px；非法值回退默认 `80`。同一属性的多个取值集中展示：

:::: details 查看示例代码
::: code-group

<<< @/examples/pull-to-refresh/PullToRefreshTriggerDistanceExample.vue#template [template]

<<< @/examples/pull-to-refresh/PullToRefreshTriggerDistanceExample.vue#script [script]

<<< @/examples/pull-to-refresh/PullToRefreshTriggerDistanceExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="PullToRefresh triggerDistance 预览" stacked>
    <PullToRefreshTriggerDistanceExample />
  </DocsPreview>
</ClientOnly>

### 透传 `size`、`color`、`containment`

指示器属性直接透传给内部 `mat-loading`；未设置时使用 `mat-loading` 自身默认值。

:::: details 查看示例代码
::: code-group

<<< @/examples/pull-to-refresh/PullToRefreshLoadingExample.vue#template [template]

<<< @/examples/pull-to-refresh/PullToRefreshLoadingExample.vue#script [script]

<<< @/examples/pull-to-refresh/PullToRefreshLoadingExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="PullToRefresh loading 属性透传预览" stacked>
    <PullToRefreshLoadingExample />
  </DocsPreview>
</ClientOnly>

### 水平滚动区域

水平 `mat-scroll-area` 在最左端继续向右拉动时触发，指示器出现在左端、垂直居中，placeholder 在左端变宽把内容推向右侧。组件与内容需要保持行内布局（示例使用 `inline-flex` 列表），placeholder 才能推挤内容。

:::: details 查看示例代码
::: code-group

<<< @/examples/pull-to-refresh/PullToRefreshHorizontalExample.vue#template [template]

<<< @/examples/pull-to-refresh/PullToRefreshHorizontalExample.vue#script [script]

<<< @/examples/pull-to-refresh/PullToRefreshHorizontalExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="PullToRefresh 水平滚动区域预览" stacked>
    <PullToRefreshHorizontalExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 刷新中状态（v-model）；触发时组件置为 `true`，外部刷新完成后置回 `false` 结束刷新 |
| `placeholder` | `boolean` | `false` | 组件根元素随拉动变高（水平时变宽），推挤后面的兄弟内容；未开启时指示器悬浮在内容上方 |
| `triggerDistance` | `number \| string` | `80` | 触发刷新需要的拉动距离，单位 px；数字与纯数字字符串，非法值回退 `80` |
| `size` | `number \| string` | 未设置 | 透传给内部 `mat-loading` 的指示器宽高，未设置时使用其默认 `48` |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 透传给内部 `mat-loading` 的强调色 |
| `containment` | `boolean` | `false` | 透传给内部 `mat-loading` 的圆形背景容器开关 |

未被组件消费的 `aria-*`、`id`、`class`、`style` 和原生事件监听器会传给根元素。组件必须作为 `mat-scroll-area` 的子元素使用并放在滚动内容首位；在滚动区域外渲染时不建立手势。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `refresh` | 无 | 拉动距离达到 `triggerDistance` 后释放，或滚轮在边界朝界外累积达到阈值时触发；刷新中不重复触发 |
| `update:modelValue` | `boolean` | 触发刷新时载荷为 `true`；外部置回 `false` 结束刷新，指示器在原位淡出 |

## Slots

组件没有 Slots；列表或其他内容不进入组件，作为兄弟元素放在组件之后。组件内部渲染 `mat-loading` 指示器，其外观由 `size`、`color`、`containment` 控制。

## 状态

拖动开始后指示器以短暂的淡入放大动画入场，并固定在距起点 80px 的静止位。内部 `mat-loading` 进入受控进度模式：进度为拉动距离与触发距离之比，`0` 至 `1` 控制圆形到 `soft-burst` 的形变，超过 `1` 后保持 `soft-burst` 并继续旋转。释放达到阈值后切换到 `mat-loading` 的自动旋转模式，`placeholder` 以空间弹簧回弹归零、内容复位；未达阈值或刷新结束时指示器在原位淡出。启用减少动态效果偏好时，动画直接落位。组件没有公开方法。

## 参考来源

触发阈值（80dp）、拖拽系数（0.5）、拖动进度驱动与刷新弹簧（damping 1.0、stiffness 1600）参考 [AndroidX PullToRefresh.kt](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/pulltorefresh/PullToRefresh.kt)；指示器容器尺寸、出现动画与自动旋转参考 [AndroidX LoadingIndicator.kt](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/LoadingIndicator.kt)。

<script setup>
import PullToRefreshBasicExample from '../examples/pull-to-refresh/PullToRefreshBasicExample.vue';
import PullToRefreshHorizontalExample from '../examples/pull-to-refresh/PullToRefreshHorizontalExample.vue';
import PullToRefreshLoadingExample from '../examples/pull-to-refresh/PullToRefreshLoadingExample.vue';
import PullToRefreshPlaceholderExample from '../examples/pull-to-refresh/PullToRefreshPlaceholderExample.vue';
import PullToRefreshTriggerDistanceExample from '../examples/pull-to-refresh/PullToRefreshTriggerDistanceExample.vue';
</script>
