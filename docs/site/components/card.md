---
title: Card 卡片
description: mat-card 的 Material 3 外观、标题、副标题、媒体、内容、操作区与链接式交互。
llms: true
order: 90
---

# Card 卡片

## 组件简介

`<mat-card>` 的组件导出名是 `MatCard`。它承载同一主题的内容与操作，支持 `filled`、`elevated`、`outlined` 三种 Material 3 外观。

组合组件 `<mat-card-headline>`、`<mat-card-subhead>`、`<mat-card-media>`、`<mat-card-action-area>`、`<mat-card-content>` 和 `<mat-card-actions>` 的导出名分别是 `MatCardHeadline`、`MatCardSubhead`、`MatCardMedia`、`MatCardActionArea`、`MatCardContent` 和 `MatCardActions`。Headline、Subhead 与 Media 同时提供 Card 具名 Slot 和直接子组件两种写法，其余组件分别组织可点击内容区、正文和独立操作区。

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

### Headline Slot 与子组件

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardHeadlineExample.vue#template [template]

<<< @/examples/card/CardHeadlineExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card headline 预览">
    <CardHeadlineExample />
  </DocsPreview>
</ClientOnly>

### Subhead Slot 与子组件

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardSubheadExample.vue#template [template]

<<< @/examples/card/CardSubheadExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card subhead 预览">
    <CardSubheadExample />
  </DocsPreview>
</ClientOnly>

### Media Slot 与子组件

:::: details 查看示例代码
::: code-group

<<< @/examples/card/CardMediaExample.vue#template [template]

<<< @/examples/card/CardMediaExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Card media 预览">
    <CardMediaExample />
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

### Card 子部件

`MatCardHeadline`、`MatCardSubhead`、`MatCardMedia`、`MatCardContent` 与 `MatCardActions` 没有自定义属性。未被消费的普通原生属性和事件分别传递给各自的根 `<div>`。

- Headline 使用系统 `title-large` 排版；Subhead 使用较低强调的 `body-medium` 排版。
- Media 占满卡片横向空间，并让直接放置的图片或视频保持自身比例铺满可用宽度。
- Content 提供 16px 内边距。
- Actions 使用末端对齐、可换行的横向 flex 布局，间距为 8px，内边距为 16px。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatCardActionArea` | `click` | 原生 `MouseEvent` | 启用的按钮或链接被用户激活时触发；禁用时不触发 |

除 `MatCardActionArea` 外，Card 组件族不定义自定义事件；传入的原生事件监听器作用于各自的根元素。

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatCard` | 默认 | 卡片内容，通常由各子部件、ActionArea、Content 和 Actions 组合构成 |
| `MatCard` | `headline` | Headline 内容；Card 自动使用 `MatCardHeadline` 渲染 |
| `MatCard` | `subhead` | Subhead 内容；Card 自动使用 `MatCardSubhead` 渲染 |
| `MatCard` | `media` | 图片、视频、缩略图或其他媒体；Card 自动使用 `MatCardMedia` 渲染 |
| `MatCardHeadline` | 默认 | 卡片主题或名称的标题内容 |
| `MatCardSubhead` | 默认 | 作者、标签、地点等较小的次要文字 |
| `MatCardMedia` | 默认 | 图片、视频、缩略图或其他图形内容 |
| `MatCardActionArea` | 默认 | 完整的可点击内容；不能包含按钮、链接或其他交互元素 |
| `MatCardContent` | 默认 | 支持文字或其他非固定结构的卡片内容 |
| `MatCardActions` | 默认 | 与 ActionArea 同级的按钮、链接或其他独立操作 |

## 状态

只有启用的 ActionArea 才会触发 Card 的 hover、focus 和 pressed 状态。焦点环显示在整张卡片上，减少动态效果偏好下不播放状态层过渡。

需要分隔 Actions 时，将 `MatDivider` 放在 `MatCardActions` 前。全宽 Divider 完整划分两个区域；布尔 `inset` 模式在两侧各保留 16px，用于分隔仍属于同一内容组的区域。

## 参考来源

结构、颜色、形状、状态和测量依据 Material 3 [Card specs](https://m3.material.io/components/cards/specs) 与 [Card guidelines](https://m3.material.io/components/cards/guidelines)。官方说明 Card 可包含 headline、subhead、supporting text、media 和 actions，卡片左右内容边距为 16dp、圆角为 12dp；本组件以对应系统令牌和 CSS 像素实现 Web 布局。

<script setup>
import CardActionDisabledExample from '../examples/card/CardActionDisabledExample.vue';
import CardActionHrefExample from '../examples/card/CardActionHrefExample.vue';
import CardActionTypeExample from '../examples/card/CardActionTypeExample.vue';
import CardActionsSlotExample from '../examples/card/CardActionsSlotExample.vue';
import CardAsExample from '../examples/card/CardAsExample.vue';
import CardColorExample from '../examples/card/CardColorExample.vue';
import CardContentSlotExample from '../examples/card/CardContentSlotExample.vue';
import CardHeadlineExample from '../examples/card/CardHeadlineExample.vue';
import CardMediaExample from '../examples/card/CardMediaExample.vue';
import CardSubheadExample from '../examples/card/CardSubheadExample.vue';
import CardVariantExample from '../examples/card/CardVariantExample.vue';
</script>
