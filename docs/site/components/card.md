---
title: Card 卡片
description: mat-card 的 Material 3 外观、局部配色、内容、操作区与链接式交互。
llms: true
order: 90
---

# Card 卡片

`<mat-card>` 的组件导出名是 `MatCard`。它承载同一主题的内容与操作，支持 `filled`、`elevated`、`outlined` 三种 Material 3 外观。组合组件 `<mat-card-action-area>`、`<mat-card-content>` 和 `<mat-card-actions>` 的导出名分别是 `MatCardActionArea`、`MatCardContent` 和 `MatCardActions`，用于组织可点击内容区、正文和独立操作区。

## 示例

卡片内容区域和操作区域仅作为展示结构的必要依赖。

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardVariantExample.vue#template [template]

<<< @/examples/card/CardVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card variant 预览">
    <CardVariantExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardColorExample.vue#template [template]

<<< @/examples/card/CardColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card color 预览">
    <CardColorExample />
  </DocsPreview>
</ClientOnly>

### `as`

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardAsExample.vue#template [template]

<<< @/examples/card/CardAsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card as 预览">
    <CardAsExample />
  </DocsPreview>
</ClientOnly>

### ActionArea 的 `href`

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardActionHrefExample.vue#template [template]

<<< @/examples/card/CardActionHrefExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card ActionArea href 预览">
    <CardActionHrefExample />
  </DocsPreview>
</ClientOnly>

### ActionArea 的 `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardActionDisabledExample.vue#template [template]

<<< @/examples/card/CardActionDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card ActionArea disabled 预览">
    <CardActionDisabledExample />
  </DocsPreview>
</ClientOnly>

### ActionArea 的 `type`

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardActionTypeExample.vue#template [template]

<<< @/examples/card/CardActionTypeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card ActionArea type 预览">
    <CardActionTypeExample />
  </DocsPreview>
</ClientOnly>

### MatCardContent 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardContentSlotExample.vue#template [template]

<<< @/examples/card/CardContentSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="CardContent 默认 Slot 预览">
    <CardContentSlotExample />
  </DocsPreview>
</ClientOnly>

### MatCardActions 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardActionsSlotExample.vue#template [template]

<<< @/examples/card/CardActionsSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="CardActions 默认 Slot 预览">
    <CardActionsSlotExample />
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
import CardActionDisabledExample from '../examples/card/CardActionDisabledExample.vue';
import CardActionHrefExample from '../examples/card/CardActionHrefExample.vue';
import CardActionTypeExample from '../examples/card/CardActionTypeExample.vue';
import CardActionsSlotExample from '../examples/card/CardActionsSlotExample.vue';
import CardAsExample from '../examples/card/CardAsExample.vue';
import CardColorExample from '../examples/card/CardColorExample.vue';
import CardContentSlotExample from '../examples/card/CardContentSlotExample.vue';
import CardVariantExample from '../examples/card/CardVariantExample.vue';
</script>
