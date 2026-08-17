---
title: Badge 徽标
description: mat-badge 的点型、内容型、覆盖方位、偏移、行内布局和配色。
llms: true
order: 37
---

# Badge 徽标

## 组件简介

`<mat-badge>` 的组件导出名是 `MatBadge`。它用于显示与目标有关的状态、通知或数量。默认模式通过包装容器把 Badge 覆盖到默认 Slot 的边缘；`location="inline"` 时只显示 Badge 自身，并让它作为普通行内元素参与自然布局。

覆盖模式会增加一个 `inline-flex` 包装层，因此直接子选择器和 flex/grid 子项关系会相应改变。Badge 指示器不接收指针事件，不会阻断 Slot 内控件的点击、hover、焦点或键盘操作。

## 示例

### `dot`

:::: details 查看示例代码
::: code-group

<<< @/examples/badge/BadgeDotExample.vue#template [template]

<<< @/examples/badge/BadgeDotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Badge 点型预览">
    <BadgeDotExample />
  </DocsPreview>
</ClientOnly>

### `content`

:::: details 查看示例代码
::: code-group

<<< @/examples/badge/BadgeContentExample.vue#template [template]

<<< @/examples/badge/BadgeContentExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Badge 内容型预览">
    <BadgeContentExample />
  </DocsPreview>
</ClientOnly>

### `location`

:::: details 查看示例代码
::: code-group

<<< @/examples/badge/BadgeLocationExample.vue#template [template]

<<< @/examples/badge/BadgeLocationExample.vue#script [script]

<<< @/examples/badge/BadgeLocationExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Badge 方位预览">
    <BadgeLocationExample />
  </DocsPreview>
</ClientOnly>

### `offset`

:::: details 查看示例代码
::: code-group

<<< @/examples/badge/BadgeOffsetExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Badge 偏移预览">
    <BadgeOffsetExample />
  </DocsPreview>
</ClientOnly>

### Inline 布局

:::: details 查看示例代码
::: code-group

<<< @/examples/badge/BadgeInlineExample.vue#template [template]

<<< @/examples/badge/BadgeInlineExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Badge Inline 布局预览">
    <BadgeInlineExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/badge/BadgeColorExample.vue#template [template]

<<< @/examples/badge/BadgeColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Badge 配色预览">
    <BadgeColorExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `string \| number` | — | 内容型 Badge 的文本或数字；`0` 有效，空字符串不显示，内容不会自动截断。 |
| `dot` | `boolean` | `false` | 显示点型 Badge，并忽略 `content`。 |
| `location` | `top-start \| top \| top-end \| end \| bottom-end \| bottom \| bottom-start \| start \| inline` | `top-end` | 覆盖方位；`inline` 只渲染 Badge 自身并忽略默认 Slot。 |
| `offset` | `{ inline?: number \| string, block?: number \| string }` | `{ inline: 0, block: 0 }` | 覆盖模式的逻辑轴微调；数字按 px，字符串须为合法 CSS 长度。Inline 模式忽略。 |
| `color` | `string` | `error` | Material 语义色、系统颜色角色或六位十六进制种子色。 |

组件没有公开方法。

## 事件

组件没有自定义事件。覆盖层不接收指针事件，默认 Slot 内元素保持自己的原生或组件事件。

## Slots

| Slot | 内容约束 |
| --- | --- |
| 默认 Slot | 覆盖模式的目标内容；`location="inline"` 时忽略。 |

### 状态与布局

`dot=false` 且没有有效 `content` 时，覆盖模式仍渲染 Slot 和包装容器，但不显示指示器；Inline 模式不渲染任何 DOM。覆盖模式使用逻辑方向，因此 start/end 会随书写方向变化。`offset.inline` 正值朝 inline-end 移动，`offset.block` 正值朝 block-end 移动。

点型使用约 6px 圆形，自身边缘与 `location` 指定的目标边缘重合；内容型保持约 16px 高、四向 4px 内边距，以目标中线为左右锚点并随内容扩宽。Material 建议内容型最多使用四个字符，本组件不强制截断，使用方需要自行避免与邻近元素碰撞。

## 参考

尺寸、形态和默认位置参考 Material 3 [Badge specs](https://m3.material.io/components/badges/specs) 与 [Badge guidelines](https://m3.material.io/components/badges/guidelines)。

<script setup>
import BadgeColorExample from '../examples/badge/BadgeColorExample.vue';
import BadgeContentExample from '../examples/badge/BadgeContentExample.vue';
import BadgeDotExample from '../examples/badge/BadgeDotExample.vue';
import BadgeInlineExample from '../examples/badge/BadgeInlineExample.vue';
import BadgeLocationExample from '../examples/badge/BadgeLocationExample.vue';
import BadgeOffsetExample from '../examples/badge/BadgeOffsetExample.vue';
</script>
