---
title: Card 卡片
description: mat-card 的 Material 3 外观、局部配色、内容、操作区与链接式交互。
llms: true
order: 90
---

# Card 卡片

`<mat-card>` 的组件导出名是 `MatCard`。它承载同一主题的内容与操作，支持 `filled`、`elevated`、`outlined` 三种 Material 3 外观。组合组件 `<mat-card-action-area>`、`<mat-card-content>` 和 `<mat-card-actions>` 的导出名分别是 `MatCardActionArea`、`MatCardContent` 和 `MatCardActions`，用于组织可点击内容区、正文和独立操作区。

## 示例

### 默认样式

<<< @/examples/card/CardDefaultExample.vue

<ClientOnly>
  <DocsPreview label="Card 默认样式预览">
    <CardDefaultExample />
  </DocsPreview>
</ClientOnly>

### 外观与配色

<<< @/examples/card/CardVariantsExample.vue

<ClientOnly>
  <DocsPreview label="Card 外观与配色预览">
    <CardVariantsExample />
  </DocsPreview>
</ClientOnly>

省略 `color` 时使用中性表面。设置语义色或六位十六进制种子色后，卡片使用对应的 container/on-container 色对；outlined 的边框仍使用中性 `outline-variant`。

### 语义、可点击内容与禁用状态

<<< @/examples/card/CardActionExample.vue

<ClientOnly>
  <DocsPreview label="Card 语义、可点击内容与禁用状态预览" stacked>
    <CardActionExample />
  </DocsPreview>
</ClientOnly>

ActionArea 内不能再放置按钮或链接；将附加操作放在同级 `MatCardActions` 中。

## API

### MatCard 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'elevated' \| 'filled' \| 'outlined'` | `'filled'` | 卡片的层级和边框外观 |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| #RRGGBB` | 未设置 | 语义色族或局部 Material 种子色 |
| `as` | `'div' \| 'article' \| 'section' \| 'li'` | `'div'` | 根元素语义 |

未被消费的普通原生属性和事件传递给 `as` 指定的根元素。

### MatCardActionArea 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `href` | `string` | 未设置 | 设置后渲染原生链接，否则渲染 button |
| `disabled` | `boolean` | `false` | 禁用交互；禁用链接移除 href 并设置无障碍状态 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | button 模式下的原生类型 |

未被消费的普通原生属性传递给内部 `<button>` 或 `<a>`；链接模式可由此设置 `target`、`rel` 等原生属性。

### MatCardContent 与 MatCardActions

两者没有自定义属性。未被消费的普通原生属性和事件分别传递给各自的根 `<div>`。Content 提供 16px 内边距；Actions 使用可换行横向 flex 布局、8px 间距和 8px 内边距。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatCardActionArea` | `click` | 原生 `MouseEvent` | 启用的按钮或链接被用户激活时触发；禁用时不触发 |

`MatCard`、`MatCardContent` 和 `MatCardActions` 不定义自定义事件；传入的原生事件监听器作用于各自的根元素。

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatCard` | 默认 | 卡片内容，通常由 Content、ActionArea 和 Actions 组合构成 |
| `MatCardActionArea` | 默认 | 完整的可点击内容；不能包含按钮、链接或其他交互元素 |
| `MatCardContent` | 默认 | 标题、正文、媒体或其他非固定结构的卡片内容 |
| `MatCardActions` | 默认 | 与 ActionArea 同级的按钮、链接或其他独立操作 |

## 状态

只有启用的 ActionArea 才会触发 Card 的 hover、focus 和 pressed 状态。焦点环显示在整张卡片上，减少动态效果偏好下不播放状态层过渡。

<script setup>
import CardActionExample from '../examples/card/CardActionExample.vue';
import CardDefaultExample from '../examples/card/CardDefaultExample.vue';
import CardVariantsExample from '../examples/card/CardVariantsExample.vue';
</script>
