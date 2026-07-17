---
title: List 列表
description: mat-list 与 mat-list-item 的 Material 3 Expressive 外观、内容结构、操作和受控选择。
llms: true
order: 100
---

# List 列表

## 组件简介

`<mat-list>` 的组件导出名是 `MatList`，子组件 `<mat-list-item>` 的导出名是 `MatListItem`。List 纵向组织相关内容，提供 `standard` 与 `segmented` 两种 Material 3 Expressive 外观，默认使用 `segmented`，并支持非交互、单操作、多操作、单选和多选五种互斥的交互模式。

## 示例

选择与操作示例只保留组件结构所需的 `interaction`、`selected` 和 `value` 依赖。

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListVariantExample.vue#template [template]

<<< @/examples/list/ListVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List variant 预览">
    <ListVariantExample />
  </DocsPreview>
</ClientOnly>

### `interaction`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListInteractionExample.vue#template [template]

<<< @/examples/list/ListInteractionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List interaction 预览" stacked>
    <ListInteractionExample />
  </DocsPreview>
</ClientOnly>

### `selected`

选择模式必须同时提供 `interaction`、项目 `value`，并在 `select` 事件中回写值。

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListSelectedExample.vue#template [template]

<<< @/examples/list/ListSelectedExample.vue#script [script]

<<< @/examples/list/ListSelectedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List selected 预览" stacked>
    <ListSelectedExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListColorExample.vue#template [template]

<<< @/examples/list/ListColorExample.vue#script [script]

<<< @/examples/list/ListColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List color 预览" stacked>
    <ListColorExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `value`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemValueExample.vue#template [template]

<<< @/examples/list/ListItemValueExample.vue#script [script]

<<< @/examples/list/ListItemValueExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem value 预览">
    <ListItemValueExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `href`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemHrefExample.vue#template [template]

<<< @/examples/list/ListItemHrefExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem href 预览">
    <ListItemHrefExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `type`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemTypeExample.vue#template [template]

<<< @/examples/list/ListItemTypeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem type 预览">
    <ListItemTypeExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemDisabledExample.vue#template [template]

<<< @/examples/list/ListItemDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem disabled 预览">
    <ListItemDisabledExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `lines`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemLinesExample.vue#template [template]

<<< @/examples/list/ListItemLinesExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem lines 预览">
    <ListItemLinesExample />
  </DocsPreview>
</ClientOnly>

### MatList 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListDefaultSlotExample.vue#template [template]

<<< @/examples/list/ListDefaultSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List 默认 Slot 预览">
    <ListDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### MatListItem 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemDefaultSlotExample.vue#template [template]

<<< @/examples/list/ListItemDefaultSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem 默认 Slot 预览">
    <ListItemDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `leading` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemLeadingSlotExample.vue#template [template]

<<< @/examples/list/ListItemLeadingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem leading Slot 预览">
    <ListItemLeadingSlotExample />
  </DocsPreview>
</ClientOnly>

### `overline` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemOverlineSlotExample.vue#template [template]

<<< @/examples/list/ListItemOverlineSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem overline Slot 预览">
    <ListItemOverlineSlotExample />
  </DocsPreview>
</ClientOnly>

### `supporting` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemSupportingSlotExample.vue#template [template]

<<< @/examples/list/ListItemSupportingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem supporting Slot 预览">
    <ListItemSupportingSlotExample />
  </DocsPreview>
</ClientOnly>

### `trailing` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemTrailingSlotExample.vue#template [template]

<<< @/examples/list/ListItemTrailingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem trailing Slot 预览">
    <ListItemTrailingSlotExample />
  </DocsPreview>
</ClientOnly>

省略 `lines` 时，组件按 overline、默认标签和 supporting Slot 的数量推断一至三行。单操作模式的 leading、文字和 trailing 共同构成一个主操作；多操作模式把 trailing 放在主操作之外。

## API {#list-api}

### MatList 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'standard' \| 'segmented'` | `'segmented'` | 项目连续排列或以 2px 间隔分段 |
| `interaction` | `'none' \| 'single-action' \| 'multi-action' \| 'single-select' \| 'multi-select'` | `'none'` | 整个 List 唯一的交互模式 |
| `selected` | 基础值、基础值数组或 `null` | `null` | 受控选择值；single-select 使用单值，multi-select 使用数组 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 选择项的局部 container/on-container 色对；省略时使用 secondary 色族 |

选择模式的根元素使用 `role="listbox"`，应通过 `aria-label` 或 `aria-labelledby` 提供可访问名称。其他未消费的原生属性传递给根 `ul` 或 listbox `div`。

### MatListItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | 未设置 | 选择模式中的项目值；选择模式下必须设置 |
| `href` | `string` | 未设置 | 单操作或多操作模式下把主操作渲染为链接 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 主操作为 button 时的原生类型 |
| `disabled` | `boolean` | `false` | 禁用主操作、选择和多操作 trailing 区域 |
| `lines` | `1 \| 2 \| 3` | 按 Slots 推断 | 控制 56、72、88px 最小高度以及三行内容的顶部对齐 |

操作模式中未消费的原生属性传给主按钮或链接，可设置 `target`、`rel` 等链接属性；非交互和选择模式中传给项目根元素。`href` 在非交互或选择模式中会被忽略并发出开发警告。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatList` | `select` | `{ value, selected, nextSelected, originalEvent }` | 启用的选择项通过指针、Space 或 Enter 请求改变选择 |
| `MatListItem` | `click` | 原生 `MouseEvent` | 单操作或多操作模式中的启用主操作被激活 |

single-select 再次激活当前项不会取消选择，也不会发出 `select`。multi-select 每次激活都返回不修改原数组的新数组。`originalEvent` 是实际的 `MouseEvent` 或 `KeyboardEvent`。非交互模式没有自定义事件，trailing 中的独立控件使用自己的事件。

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatList` | 默认 | 直接放置 `MatListItem` 和 `MatDivider` |
| `MatListItem` | 默认 | 必需的主要标签文字 |
| `MatListItem` | `leading` | 图标、40px 头像、56px 图片、媒体或非交互选择标记 |
| `MatListItem` | `overline` | 标签上方的短文本 |
| `MatListItem` | `supporting` | 一至三行辅助文字 |
| `MatListItem` | `trailing` | 尾部短文本、图标；仅 multi-action 可放置可聚焦操作 |

single-action 的所有 Slots 都位于同一个按钮或链接中，不能嵌套其他交互元素。选择模式中的 leading 和 trailing 作为展示内容处理，选择状态由 `aria-selected` 表达。

## 状态与键盘

- 静止时首项顶部和末项底部使用 16px 外角，相邻项目之间保持 4px 内角；仅有一项时四角均为 16px。
- List 使用 roving tabindex，Tab 进入当前停靠项，再次 Tab 离开 List。
- `ArrowDown`、`ArrowRight` 移至下一项，`ArrowUp`、`ArrowLeft` 移至上一项；到边界后循环并跳过禁用项。
- 选择模式优先以第一个选中项作为初始停靠点；方向键只移动焦点，不自动改变选择。
- 选择模式使用 Space 或 Enter 请求选择。多操作模式把主操作与 trailing 内的启用控件纳入同一方向键顺序。
- 键盘焦点环完整包围当前项目或独立操作，不会被相邻项目或多操作 trailing 区域遮挡。
- selected 同时改变容器配色和形状。disabled 内容降低强调，不响应指针或键盘；减少动态效果偏好下关闭形状和状态层过渡。

组件没有公开方法。

## 参考来源

外观、内容结构和交互依据 Material 3 [List overview](https://m3.material.io/components/lists/overview)、[List specs](https://m3.material.io/components/lists/specs) 与 [List guidelines](https://m3.material.io/components/lists/guidelines)。选择模式的语义限制参考 [WAI-ARIA Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)。

<script setup>
import ListColorExample from '../examples/list/ListColorExample.vue';
import ListDefaultSlotExample from '../examples/list/ListDefaultSlotExample.vue';
import ListInteractionExample from '../examples/list/ListInteractionExample.vue';
import ListItemDefaultSlotExample from '../examples/list/ListItemDefaultSlotExample.vue';
import ListItemDisabledExample from '../examples/list/ListItemDisabledExample.vue';
import ListItemHrefExample from '../examples/list/ListItemHrefExample.vue';
import ListItemLeadingSlotExample from '../examples/list/ListItemLeadingSlotExample.vue';
import ListItemLinesExample from '../examples/list/ListItemLinesExample.vue';
import ListItemOverlineSlotExample from '../examples/list/ListItemOverlineSlotExample.vue';
import ListItemSupportingSlotExample from '../examples/list/ListItemSupportingSlotExample.vue';
import ListItemTrailingSlotExample from '../examples/list/ListItemTrailingSlotExample.vue';
import ListItemTypeExample from '../examples/list/ListItemTypeExample.vue';
import ListItemValueExample from '../examples/list/ListItemValueExample.vue';
import ListSelectedExample from '../examples/list/ListSelectedExample.vue';
import ListVariantExample from '../examples/list/ListVariantExample.vue';
</script>
