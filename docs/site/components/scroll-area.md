---
title: Scroll area 滚动区域
description: mat-scroll-area 与 MatScrollArea 为单轴内容提供真实边缘渐隐、固定区域和无限滚动事件。
llms: true
order: 114
---

# Scroll area 滚动区域

## 组件简介

`<mat-scroll-area>` 的组件导出名是 `MatScrollArea`。组件拥有一个纵向或横向原生滚动元素，并在仍有内容可滚动时用真实 CSS mask 渐隐对应边缘；渐隐不依赖容器背景色，适合透明表面、图片和任意主题背景。组件保留原生滚动条，并允许把页眉或页脚放在遮罩之外。

组件一次只管理一个滚动轴。使用方必须为纵向模式提供确定的块轴尺寸，或为横向模式提供确定的行轴尺寸和不会收缩的内部内容，才能形成滚动边界。

## 示例

### 滚动方向

`vertical` 与别名 `y`、`v` 表示纵向；`horizontal` 与别名 `x`、`h` 表示横向。公共文档和新代码推荐使用完整值，简写适合动态布局配置。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaOrientationExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaOrientationExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 方向预览">
    <ScrollAreaOrientationExample />
  </DocsPreview>
</ClientOnly>

### 滚动停靠

`snap="proximity"` 在内容接近停靠点时吸附，适合连续浏览；`snap="mandatory"` 要求滚动结束后停到某个停靠点，适合分页式内容。`snapPadding` 设置当前滚动轴两端的像素内边距。组件负责滚动容器，默认 Slot 中作为停靠目标的元素仍需自行设置 `scroll-snap-align`；需要尽量避免快速滚动跳过目标时，可以同时设置 `scroll-snap-stop: always`。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaSnapExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaSnapExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 滚动停靠预览">
    <ScrollAreaSnapExample />
  </DocsPreview>
</ClientOnly>

### 边缘事件与无限滚动

`reachThreshold` 只控制事件阈值，不改变渐隐长度。事件不会在初次挂载、内容尺寸变化或属性变化时自动触发；只有滚动从阈值区域外进入区域内时触发一次，离开后再次进入才会重新触发。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaReachExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaReachExample.vue#script [script]

<<< @/examples/scroll-area/ScrollAreaReachExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 无限滚动预览">
    <ScrollAreaReachExample />
  </DocsPreview>
</ClientOnly>

### 固定起始与末端区域

固定 Slots 位于滚动元素和遮罩之外，因此内容始终清晰。默认 Slot 中自行设置的 sticky 元素仍属于遮罩内容，不保证避开渐隐。

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaFixedSlotsExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaFixedSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 固定区域预览">
    <ScrollAreaFixedSlotsExample />
  </DocsPreview>
</ClientOnly>

### 命令式滚动

:::: details 查看示例代码
::: code-group

<<< @/examples/scroll-area/ScrollAreaMethodsExample.vue#template [template]

<<< @/examples/scroll-area/ScrollAreaMethodsExample.vue#script [script]

<<< @/examples/scroll-area/ScrollAreaMethodsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Scroll area 方法预览">
    <ScrollAreaMethodsExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'y' \| 'v' \| 'horizontal' \| 'x' \| 'h'` | `'vertical'` | 选择组件拥有的滚动轴；简写值映射到对应完整方向 |
| `snap` | `'none' \| 'proximity' \| 'mandatory'` | `'none'` | 设置当前滚动轴的停靠强度；`none` 关闭滚动停靠 |
| `snapPadding` | `number` | `0` | 当前滚动轴起始端和末端的停靠内边距，单位为 px，必须是非负有限数字 |
| `reachThreshold` | `number \| { start?: number, end?: number }` | `0` | 边缘事件的像素阈值；数字用于两端，对象未提供的一端为 `0`，值必须是非负有限数字 |

`class` 和 `style` 作用于组件根容器。其他未被消费的原生属性、ARIA 属性和监听器作用于实际滚动元素；需要键盘聚焦滚动区时，应按场景提供 `tabindex="0"` 和可访问名称。

### 方法

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `getScroller()` | 无 | `HTMLElement \| null` | 返回组件拥有的原生滚动元素；挂载前为 `null` |
| `scrollTo(options)` | `ScrollToOptions` | `void` | 调用原生滚动元素的 `scrollTo()`；挂载前调用不执行操作 |

方法不额外抛出错误。命令式滚动产生原生 scroll 事件时，使用与用户滚动相同的边缘事件规则。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `reach-start` | `{ distance: number, target: HTMLElement }` | 滚动进入起始端阈值区域时触发一次；`distance` 是距起始端像素数，`target` 是原生滚动元素 |
| `reach-end` | `{ distance: number, target: HTMLElement }` | 滚动进入末端阈值区域时触发一次；`distance` 是距末端像素数，`target` 是原生滚动元素 |
| `scroll` | 原生 `Event` | 滚动元素触发原生 scroll 事件，监听器直接透传 |

初次挂载、ResizeObserver 同步、默认 Slot 内容变化，以及 `orientation` 或 `reachThreshold` 变化只更新内部边缘状态，不派发 `reach-start` 或 `reach-end`。

## Slots

| Slot | 内容约束 |
| --- | --- |
| `default` | 可滚动内容；纵向内容通常自然排列，横向内容需要自行提供不收缩的横向布局 |
| `fixed-start` | 固定在滚动轴起始侧且不进入遮罩的内容 |
| `fixed-end` | 固定在滚动轴末端侧且不进入遮罩的内容 |

<script setup>
import ScrollAreaFixedSlotsExample from '../examples/scroll-area/ScrollAreaFixedSlotsExample.vue';
import ScrollAreaMethodsExample from '../examples/scroll-area/ScrollAreaMethodsExample.vue';
import ScrollAreaOrientationExample from '../examples/scroll-area/ScrollAreaOrientationExample.vue';
import ScrollAreaReachExample from '../examples/scroll-area/ScrollAreaReachExample.vue';
import ScrollAreaSnapExample from '../examples/scroll-area/ScrollAreaSnapExample.vue';
</script>
