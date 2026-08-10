---
title: Chips 标签
description: mat-chip 与 mat-chip-set 的用途形态、受控选中外观、内容 slot 和布局。
llms: true
order: 85
---

# Chips 标签

## 组件简介

`<mat-chip>` 的组件导出名是 `MatChip`，以单个原生按钮呈现简短操作、筛选条件、输入值或建议。`<mat-chip-set>` 的组件导出名是 `MatChipSet`，只为一组 Chip 提供换行或横向滚动布局和 `group` 语义，不管理选择、焦点或子项状态。

Chip 保留至少 48×48px 的按钮命中区域，32px 容器是其中的可见部分。`selected` 是 filter 与 input 的受控外观：点击只触发普通 `click`，是否更新选中值由应用决定。组件不内置删除、编辑、拖拽、菜单或独立尾随操作。

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

## API

### MatChip 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'assist' \| 'filter' \| 'input' \| 'suggestion'` | `'assist'` | Chip 的用途形态 |
| `elevated` | `boolean` | `false` | 使用升高表面代替描边表面 |
| `selected` | `boolean` | `false` | filter 与 input 的受控选中外观及 `aria-pressed` |
| `disabled` | `boolean` | `false` | 使用原生按钮禁用语义 |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| #RRGGBB` | 未设置 | 覆盖选中强调色和适用的前置图标颜色 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |

未消费的属性和监听器透传到根按钮。assist 与 suggestion 不设置 `aria-pressed`，它们的 `selected` 不产生选中外观。

### MatChipSet 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `layout` | `'wrap' \| 'scroll'` | `'wrap'` | 换行排列，或保持单行并允许横向滚动 |

未消费的属性应用于 `role="group"` 的根容器。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| MatChip | `click` | `MouseEvent` | 启用的根按钮被点击或通过键盘激活 |

MatChipSet 没有自定义事件。MatChip 不提供 `select`、`remove` 或 `update:*` 事件。

## Slots

### MatChip

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 单行标签文字，超出可用宽度时省略 |
| `leading` | 单个 18px 前置图标；avatar 存在时不显示 |
| `avatar` | 单个 24px 圆形头像；优先于 leading |
| `trailing` | 单个 18px 尾随图标；只作为按钮内容，不是独立操作目标 |

已选 filter 没有 avatar 或 leading 时显示默认勾选图标；input 没有 trailing 时显示默认关闭图标。自定义 Slot 会替代相应默认图标。

### MatChipSet

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 一组 MatChip 或其他需要按相同规则排列的内容 |

## 状态

Chip 支持 hover、focus-visible、pressed、disabled，以及 filter/input 的受控 selected。描边形态使用 outline variant，升高形态使用 surface container low 和 level 1 海拔；按压只改变状态层。减少动态效果偏好下关闭颜色、阴影和状态层过渡。两个组件均没有公开方法。

## 参考来源

尺寸、形态、内容排列和状态依据 Material 3 [Chips specs](https://m3.material.io/components/chips/specs) 与 [Chips guidelines](https://m3.material.io/components/chips/guidelines)。

<script setup>
import ChipAvatarSlotExample from '../examples/chip/ChipAvatarSlotExample.vue';
import ChipColorExample from '../examples/chip/ChipColorExample.vue';
import ChipDisabledExample from '../examples/chip/ChipDisabledExample.vue';
import ChipElevatedExample from '../examples/chip/ChipElevatedExample.vue';
import ChipLeadingSlotExample from '../examples/chip/ChipLeadingSlotExample.vue';
import ChipSelectedExample from '../examples/chip/ChipSelectedExample.vue';
import ChipSetLayoutExample from '../examples/chip/ChipSetLayoutExample.vue';
import ChipTrailingSlotExample from '../examples/chip/ChipTrailingSlotExample.vue';
import ChipVariantExample from '../examples/chip/ChipVariantExample.vue';
</script>
