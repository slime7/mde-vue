---
title: Chat minimap 聊天缩略图
description: mat-chat-minimap 的短横线条目、悬停正态梯度、自定义条目尺寸与整行悬停范围、增长方向、点击事件与 Rich tooltip 透传。
llms: true
order: 105.5
---

# Chat minimap 聊天缩略图

## 组件简介

`<mat-chat-minimap>` 的组件导出名是 `MatChatMinimap`。它把一组聊天条目渲染成纵向排列的短横线，适合放在对话或消息列表边缘作为视觉索引。悬停某一条时，该条变亮并展开到两倍静止宽度，前后各 3 条按距离扩大；横向宽度按正态分布衰减，厚度保持不变。

组件使用自然文档流，自身不负责绝对定位或居中，摆放位置由使用者决定。组件的 `inline-size` 始终预留两倍 `item-width` 的展开宽度，短横线在自身范围内增长，不会推动周围内容。每个条目的悬停范围覆盖整行，并向上下各扩展一半 `item-gap`；高亮和宽度变化只表达视觉效果。`direction` 控制短横线的锚定边和增长方向；条目是可聚焦按钮，点击或使用键盘激活时发出 `click` 事件。

## 示例

### items 与 Rich tooltip 透传

每个条目对应一条短横线，`item.tooltip` 的对象属性原样透传给内部 `MatTooltip`。省略 `rich` 时使用 Rich tooltip 外观，默认出现在缩略图的另一侧。

:::: details 查看示例代码
::: code-group

<<< @/examples/chat-minimap/ChatMinimapBasicExample.vue#template [template]

<<< @/examples/chat-minimap/ChatMinimapBasicExample.vue#script [script]

<<< @/examples/chat-minimap/ChatMinimapBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Chat minimap 条目与 Rich tooltip 预览" height="300px">
    <ChatMinimapBasicExample />
  </DocsPreview>
</ClientOnly>

### item-width、item-height 与 item-gap

`item-width` 设置短横线的静止宽度，悬停时展开到两倍，组件总宽也等于两倍；`item-height` 设置短横线厚度；`item-gap` 设置相邻短横线之间的间距，同时作为上下悬停范围的扩展量，由相邻条目各占一半。示例并排展示默认尺寸与一组自定义尺寸。

:::: details 查看示例代码
::: code-group

<<< @/examples/chat-minimap/ChatMinimapSizeExample.vue#template [template]

<<< @/examples/chat-minimap/ChatMinimapSizeExample.vue#script [script]

<<< @/examples/chat-minimap/ChatMinimapSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Chat minimap 自定义尺寸预览" height="300px">
    <ChatMinimapSizeExample />
  </DocsPreview>
</ClientOnly>

### direction

`direction="left"` 表示缩略图位于左侧，短横线左对齐并向右增长；`direction="right"` 表示缩略图位于右侧，短横线右对齐并向左增长。示例中的虚线框用于展示使用者自行决定的对齐位置。

:::: details 查看示例代码
::: code-group

<<< @/examples/chat-minimap/ChatMinimapDirectionExample.vue#template [template]

<<< @/examples/chat-minimap/ChatMinimapDirectionExample.vue#script [script]

<<< @/examples/chat-minimap/ChatMinimapDirectionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Chat minimap 增长方向预览" height="420px">
    <ChatMinimapDirectionExample />
  </DocsPreview>
</ClientOnly>

### click

点击条目时发出 `click` 事件，载荷包含原始条目、从 0 开始的索引和原生 `MouseEvent`。条目是按钮元素，也可以用 Tab 聚焦后按 Enter 或 Space 触发。

:::: details 查看示例代码
::: code-group

<<< @/examples/chat-minimap/ChatMinimapClickExample.vue#template [template]

<<< @/examples/chat-minimap/ChatMinimapClickExample.vue#script [script]

<<< @/examples/chat-minimap/ChatMinimapClickExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Chat minimap 点击事件预览" height="300px">
    <ChatMinimapClickExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `Array<{ id?: string \| number, tooltip?: object }>` | `[]` | 从上到下渲染的条目；每个条目渲染一条短横线，`id` 用作稳定 key，`tooltip` 的对象属性透传给内部 `MatTooltip` |
| `item-width` | `number \| string` | `16` | 短横线的静止宽度；数字与纯数字字符串按 px 处理，其他字符串须为合法正向 CSS 宽度。悬停时展开到两倍，组件总宽也是该值的两倍 |
| `item-height` | `number \| string` | `2` | 短横线的厚度；数字与纯数字字符串按 px 处理，其他字符串须为合法正向 CSS 高度 |
| `item-gap` | `number \| string` | `8` | 相邻短横线之间的间距，允许 `0`；条目悬停范围在短横线上下各扩展一半，条目之间的命中区域连续 |
| `direction` | `'left' \| 'right'` | `'left'` | 短横线锚定的方位；`left` 左对齐并向右增长，`right` 右对齐并向左增长 |

`item.tooltip` 支持 `MatTooltip` 的公共属性，例如 `subhead`、`content`、`location`、`openDelay` 和 `closeDelay`。`rich` 默认按 `true` 处理；显式传入时以传入值为准。`target` 由组件管理，条目自身的提示触发器不能被覆盖。默认 `location` 与缩略图所在侧相反：`direction="left"` 时显示在右侧，`direction="right"` 时显示在左侧；需要其他位置时在 `item.tooltip.location` 中覆盖。

组件总宽固定为 `item-width` 的两倍，即短横线完全展开后的宽度，悬停不会改变外层尺寸；总高为全部短横线厚度与间距之和，首末条目外侧也各含一半 `item-gap` 的悬停范围。条目使用按钮元素参与键盘顺序，并通过 `aria-label` 提供可访问名称：优先取 `item.tooltip.subhead`，其次取 `item.tooltip.content`。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `click` | `{ item, index, originalEvent }` | 点击任一条目，或条目获得焦点后按 Enter、Space 时触发；`item` 是原始条目对象，`index` 从 0 开始，`originalEvent` 是原生 `MouseEvent` |

## Slots

组件没有 Slots。

## 状态与配色

悬停某一条时，该条从 `on-surface-variant` 切换为 `on-surface` 颜色，并在前后各 3 条范围内按正态分布衰减宽度；厚度始终保持不变。鼠标离开整个缩略图后恢复初始状态。每个条目的悬停范围覆盖整行与上下各一半的 `item-gap`，包括首末条目外侧的范围，因此指针在条目之间移动时命中区域连续，不会反复进出。高亮和宽度变化只表达视觉效果，不会改变悬停区域。组件遵循 `prefers-reduced-motion`，减少动态效果时直接切换尺寸。

短横线的静止宽度、厚度和间距通过 `item-width`、`item-height` 与 `item-gap` 定制；公共配色沿用 Material 3 的 `on-surface-variant` 与 `on-surface` 颜色角色。

<script setup>
import ChatMinimapBasicExample from '../examples/chat-minimap/ChatMinimapBasicExample.vue';
import ChatMinimapClickExample from '../examples/chat-minimap/ChatMinimapClickExample.vue';
import ChatMinimapDirectionExample from '../examples/chat-minimap/ChatMinimapDirectionExample.vue';
import ChatMinimapSizeExample from '../examples/chat-minimap/ChatMinimapSizeExample.vue';
</script>
