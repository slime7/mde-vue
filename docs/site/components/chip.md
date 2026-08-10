---
title: Chips 标签
description: mat-chip 与 mat-chip-set 的用途形态、受控选中外观、内容 slot 和布局。
llms: true
order: 85
---

# Chips 标签

## 组件简介

`<mat-chip>` 的组件导出名是 `MatChip`，以单个原生按钮呈现简短操作、筛选条件、输入值或建议。`<mat-chip-set>` 的组件导出名是 `MatChipSet`，为一组 Chip 提供换行或隐藏滚动条的横向拖拽布局、`group` 语义和可选的受控单选或多选。

Chip 保留至少 48×48px 的按钮命中区域，32px 容器是其中的可见部分。独立使用时，`selected` 是 filter 与 input 的受控外观；进入启用选择的 ChipSet 后，带 `value` 的 filter/input 改由组 `v-model` 控制。input 默认 X 的图标区域发出 `remove`，但组件不自行删除数据，也不内置编辑、重排或菜单工作流。

## 示例

以下代码块与预览读取同一份 Vue 示例文件。

### `variant`

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipVariantExample.vue#template [template]
:::
::::

<ClientOnly><DocsPreview label="Chip variant 预览" stacked><ChipVariantExample /></DocsPreview></ClientOnly>

### `elevated`

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipElevatedExample.vue#template [template]
:::
::::

<ClientOnly><DocsPreview label="Chip elevated 预览" stacked><ChipElevatedExample /></DocsPreview></ClientOnly>

### `selected`

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipSelectedExample.vue#template [template]
:::
::::

<ClientOnly><DocsPreview label="Chip selected 预览" stacked><ChipSelectedExample /></DocsPreview></ClientOnly>

### input `remove`

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipRemoveExample.vue#template [template]
<<< @/examples/chip/ChipRemoveExample.vue#script [script]
<<< @/examples/chip/ChipRemoveExample.vue#style [style]
:::
::::

<ClientOnly><DocsPreview label="Input Chip remove 预览" stacked><ChipRemoveExample /></DocsPreview></ClientOnly>

### `disabled`

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipDisabledExample.vue#template [template]
:::
::::

<ClientOnly><DocsPreview label="Chip disabled 预览" stacked><ChipDisabledExample /></DocsPreview></ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipColorExample.vue#template [template]
:::
::::

<ClientOnly><DocsPreview label="Chip color 预览" stacked><ChipColorExample /></DocsPreview></ClientOnly>

### `leading` Slot

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipLeadingSlotExample.vue#template [template]
:::
::::

<ClientOnly><DocsPreview label="Chip leading Slot 预览"><ChipLeadingSlotExample /></DocsPreview></ClientOnly>

### `avatar` Slot

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipAvatarSlotExample.vue#template [template]
<<< @/examples/chip/ChipAvatarSlotExample.vue#style [style]
:::
::::

<ClientOnly><DocsPreview label="Chip avatar Slot 预览"><ChipAvatarSlotExample /></DocsPreview></ClientOnly>

### `trailing` Slot

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipTrailingSlotExample.vue#template [template]
:::
::::

<ClientOnly><DocsPreview label="Chip trailing Slot 预览"><ChipTrailingSlotExample /></DocsPreview></ClientOnly>

### ChipSet 布局

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipSetLayoutExample.vue#template [template]
<<< @/examples/chip/ChipSetLayoutExample.vue#script [script]
<<< @/examples/chip/ChipSetLayoutExample.vue#style [style]
:::
::::

<ClientOnly><DocsPreview label="ChipSet 布局预览" stacked><ChipSetLayoutExample /></DocsPreview></ClientOnly>

### ChipSet `v-model`

:::: details 查看示例代码
::: code-group
<<< @/examples/chip/ChipSetSelectionExample.vue#template [template]
<<< @/examples/chip/ChipSetSelectionExample.vue#script [script]
<<< @/examples/chip/ChipSetSelectionExample.vue#style [style]
:::
::::

<ClientOnly><DocsPreview label="ChipSet v-model 预览" stacked><ChipSetSelectionExample /></DocsPreview></ClientOnly>

## API

### MatChip 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'assist' \| 'filter' \| 'input' \| 'suggestion'` | `'assist'` | Chip 的用途形态 |
| `elevated` | `boolean` | `false` | 使用升高表面代替描边表面 |
| `selected` | `boolean` | `false` | filter 与 input 的受控选中外观及 `aria-pressed` |
| `value` | `string \| number \| boolean` | 未设置 | 加入 ChipSet 选择模型时使用的基础值 |
| `disabled` | `boolean` | `false` | 使用原生按钮禁用语义 |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| #RRGGBB` | 未设置 | 覆盖选中强调色和适用的前置图标颜色 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |

未消费的属性和监听器透传到根按钮。assist 与 suggestion 不设置 `aria-pressed`，它们的 `selected` 不产生选中外观。启用组选择后，带 value 的 filter/input 由 ChipSet 模型覆盖自身 selected。

### MatChipSet 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `layout` | `'wrap' \| 'scroll'` | `'wrap'` | 换行排列，或保持单行、隐藏滚动条并允许按住拖拽 |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | 不协调选择，或启用受控单选、多选 |
| `modelValue` | `string \| number \| boolean \| Array<string \| number \| boolean> \| null` | `null` | single 使用单值或 null，multiple 使用数组 |

未消费的属性应用于 `role="group"` 的根容器。single 再次激活当前值会请求更新为 null；multiple 每次请求都返回新数组。只有带 value 的 filter/input 参与模型。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| MatChip | `click` | `MouseEvent` | 启用的根按钮被点击或通过键盘激活 |
| MatChip | `remove` | `MouseEvent` | 启用的 input 默认 X 图标区域被点击；不会同时触发 click |
| MatChipSet | `update:modelValue` | 下一基础值、基础值数组或 `null` | 参与选择的 Chip 请求切换状态，用于 `v-model` |

MatChipSet 不提供额外的 select 或 selected 事件。remove 不自动删除 Chip，也不修改 ChipSet 模型；应用负责更新对应的数据源。

## Slots

### MatChip

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 单行标签文字，超出可用宽度时省略 |
| `leading` | 单个 18px 前置图标；avatar 存在时不显示 |
| `avatar` | 单个 24px 圆形头像；优先于 leading |
| `trailing` | 单个 18px 尾随图标；作为按钮展示内容，不自动触发 remove |

已选 filter 没有 avatar 或 leading 时显示默认勾选图标；input 没有 trailing 时显示默认关闭图标。默认关闭图标的指针点击区域触发 remove，但不建立独立键盘焦点；自定义 Slot 会替代相应默认图标和 remove 行为。

### MatChipSet

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 一组 MatChip 或其他需要按相同规则排列的内容 |

## 状态

Chip 支持 hover、focus-visible、pressed、disabled，以及 filter/input 的受控 selected。ChipSet 的 scroll 布局复用横向 MatScrollArea，完全隐藏滚动条，并使用 48px 边缘渐隐提示仍有内容可移动；鼠标主键和触控笔可以按住拖拽，触摸保持原生惯性滑动。超过拖拽阈值后不会激活 Chip，短按和键盘激活保持不变。描边形态使用 outline variant，升高形态使用 surface container low 和 level 1 海拔；按压只改变状态层。减少动态效果偏好下关闭颜色、阴影和状态层过渡。两个组件均没有公开方法。

## 参考来源

尺寸、形态、内容排列和状态依据 Material 3 [Chips specs](https://m3.material.io/m3/pages/chips/specs) 与 [Chips guidelines](https://m3.material.io/m3/pages/chips/guidelines)。

<script setup>
import ChipAvatarSlotExample from '../examples/chip/ChipAvatarSlotExample.vue';
import ChipColorExample from '../examples/chip/ChipColorExample.vue';
import ChipDisabledExample from '../examples/chip/ChipDisabledExample.vue';
import ChipElevatedExample from '../examples/chip/ChipElevatedExample.vue';
import ChipLeadingSlotExample from '../examples/chip/ChipLeadingSlotExample.vue';
import ChipRemoveExample from '../examples/chip/ChipRemoveExample.vue';
import ChipSelectedExample from '../examples/chip/ChipSelectedExample.vue';
import ChipSetLayoutExample from '../examples/chip/ChipSetLayoutExample.vue';
import ChipSetSelectionExample from '../examples/chip/ChipSetSelectionExample.vue';
import ChipTrailingSlotExample from '../examples/chip/ChipTrailingSlotExample.vue';
import ChipVariantExample from '../examples/chip/ChipVariantExample.vue';
</script>
