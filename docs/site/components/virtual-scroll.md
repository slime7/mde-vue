---
title: Virtual scroll 虚拟滚动
description: mat-virtual-scroll 与 MatVirtualScroll 为大数据列表提供轻量高性能的虚拟列表渲染与滚动联动。
llms: true
order: 114.5
---

<script setup>
import VirtualScrollFixedExample from '../examples/virtual-scroll/VirtualScrollFixedExample.vue';
import VirtualScrollDynamicExample from '../examples/virtual-scroll/VirtualScrollDynamicExample.vue';
import VirtualScrollScrollAreaExample from '../examples/virtual-scroll/VirtualScrollScrollAreaExample.vue';
import VirtualScrollScrollToIndexExample from '../examples/virtual-scroll/VirtualScrollScrollToIndexExample.vue';
</script>

# Virtual scroll 虚拟滚动

## 组件简介

`<mat-virtual-scroll>` 的组件导出名是 `MatVirtualScroll`，同时提供别名 `<mde-virtual-scroll>` 和导出名 `MdeVirtualScroll`。组件专为长列表和海量数据设计，不创建自己的滚动容器，而是通过向上查找最近的滚动祖先（优先联动 `MatScrollArea`）监听滚动，仅渲染视口范围与缓冲区内的可见项目，并在上下两端使用 spacer 占位保持原生滚动条的完整滚动范围。

组件支持固定高度与动态高度两种模式：
- 传入 `item-height`（可数字化数值或纯数字字符串，默认单位 px）时进入固定高度模式，组件直接基于数学计算得出可见区间和占位高度，不运行 `ResizeObserver`；
- 未传入 `item-height` 时进入动态高度模式，初始依据 `estimated-item-height` 预估位置，并通过作用域插槽提供的 `itemRef` 收集真实 DOM 节点，利用共享的 `ResizeObserver` 动态修正高度缓存。

## 示例

### 固定高度

使用 `item-height="48"` 指定固定高度，并通过 `as="ul"` 将根容器渲染为 `<ul>` 列表。

:::: details 查看示例代码
::: code-group

<<< @/examples/virtual-scroll/VirtualScrollFixedExample.vue#template [template]

<<< @/examples/virtual-scroll/VirtualScrollFixedExample.vue#script [script]

<<< @/examples/virtual-scroll/VirtualScrollFixedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="固定高度虚拟滚动预览">
    <VirtualScrollFixedExample />
  </DocsPreview>
</ClientOnly>

### 动态高度与尺寸自适应

当列表项高度由内容动态决定时，不传递 `item-height`，在插槽中将 `:ref="itemRef"` 绑定到项目根元素，组件自动测量并在尺寸变化时重新计算占位。

:::: details 查看示例代码
::: code-group

<<< @/examples/virtual-scroll/VirtualScrollDynamicExample.vue#template [template]

<<< @/examples/virtual-scroll/VirtualScrollDynamicExample.vue#script [script]

<<< @/examples/virtual-scroll/VirtualScrollDynamicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="动态高度虚拟滚动预览">
    <VirtualScrollDynamicExample />
  </DocsPreview>
</ClientOnly>

### 联动 Scroll area

将虚拟滚动置于 `mat-scroll-area` 内部时，组件自动识别并绑定其原生滚动视口，配合边缘阴影与容器圆角呈现连贯的滚动体验。

:::: details 查看示例代码
::: code-group

<<< @/examples/virtual-scroll/VirtualScrollScrollAreaExample.vue#template [template]

<<< @/examples/virtual-scroll/VirtualScrollScrollAreaExample.vue#script [script]

<<< @/examples/virtual-scroll/VirtualScrollScrollAreaExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="联动 Scroll area 预览">
    <VirtualScrollScrollAreaExample />
  </DocsPreview>
</ClientOnly>

### 滚动定位

通过组件实例的 `scrollToIndex` 方法可以快速定位到指定数据项，支持设置对齐方式与平滑动画。

:::: details 查看示例代码
::: code-group

<<< @/examples/virtual-scroll/VirtualScrollScrollToIndexExample.vue#template [template]

<<< @/examples/virtual-scroll/VirtualScrollScrollToIndexExample.vue#script [script]

<<< @/examples/virtual-scroll/VirtualScrollScrollToIndexExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="虚拟滚动定位预览">
    <VirtualScrollScrollToIndexExample />
  </DocsPreview>
</ClientOnly>

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `Array<unknown>` | `[]` | 待虚拟滚动的全量数据列表。 |
| `item-height` | `number \| string` | `undefined` | 固定的单项高度（单位 px）；仅支持可转换为数字的数值或纯数字字符串。传入时跳过动态尺寸计算与 ResizeObserver 监听。 |
| `estimated-item-height` | `number \| string` | `48` | 动态高度模式下的初始预估单项高度（单位 px）。 |
| `buffer` | `number \| string` | `3` | 视口上下方额外预渲染的缓冲项数量。 |
| `item-key` | `Function \| string` | `undefined` | 用于提取 item 唯一 key 的函数或属性名；未设置时默认使用项的索引 index。 |
| `as` | `string` | `'div'` | 根容器渲染的 HTML 标签名。 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `scrollToIndex` | `(index: number, options?: { align?: 'start' \| 'center' \| 'end' \| 'auto', behavior?: ScrollBehavior })` | `void` | 滚动使指定索引项进入视口。 |
| `scrollTo` | `(options: ScrollToOptions)` | `void` | 代理调用关联滚动容器的原生 `scrollTo` 方法。 |
| `getScroller` | `()` | `HTMLElement \| Window \| null` | 获取当前关联的滚动容器元素或窗口对象。 |
| `refresh` | `()` | `Promise<void>` | 在 DOM 更新周期后强制重新计算可见区间与占位高度。 |
| `calculate` | `()` | `void` | 立即执行可见区间与占位高度重新计算。 |

## 事件

| 事件名 | 载荷 | 触发条件 |
| --- | --- | --- |
| `scroll` | `{ scrollTop: number, scrollHeight: number, clientHeight: number, startIndex: number, endIndex: number }` | 滚动容器发生滚动时触发。 |
| `visible-range-change` | `{ startIndex: number, endIndex: number }` | 渲染的项目索引区间变化时触发。 |

## Slots

| Slot 名称 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `{ item: unknown, index: number, itemRef: (el: HTMLElement \| null) => void }` | 渲染每个可见项的主插槽。动态高度模式下须将 `itemRef` 赋给项根元素。 |
