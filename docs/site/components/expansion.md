---
title: Expansion 折叠面板
description: mat-expansion 与 mat-expansion-panel 的 Material 3 Expressive 外观、分立与一体化折叠、受控绑定与手风琴协同。
llms: true
order: 105
---

# Expansion 折叠面板

## 组件简介

`<mat-expansion>` 的组件导出名是 `MatExpansion`，面板 `<mat-expansion-panel>` 的导出名是 `MatExpansionPanel`。Expansion 基于 List 与 ListGroup 构建，用于纵向折叠展开信息内容。它支持多面板独立展开与单选手风琴（`multiple=false`）两种模式，提供 `split=true`（分立列表项）与 `split=false`（一体化连续容器）两种内容呈现形态。

## 示例

示例重点展示 `split` 内容形态、触发器自定义、手风琴单选和禁用等能力。

### `split`

:::: details 查看示例代码
::: code-group

<<< @/examples/expansion/ExpansionSplitExample.vue#template [template]

<<< @/examples/expansion/ExpansionSplitExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expansion split 预览">
    <ExpansionSplitExample />
  </DocsPreview>
</ClientOnly>

### `title` 与 `activator` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/expansion/ExpansionActivatorExample.vue#template [template]

<<< @/examples/expansion/ExpansionActivatorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expansion activator 预览">
    <ExpansionActivatorExample />
  </DocsPreview>
</ClientOnly>

### `modelValue` 与手风琴模式

:::: details 查看示例代码
::: code-group

<<< @/examples/expansion/ExpansionAccordionExample.vue#template [template]

<<< @/examples/expansion/ExpansionAccordionExample.vue#script [script]

<<< @/examples/expansion/ExpansionAccordionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expansion 手风琴预览">
    <ExpansionAccordionExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/expansion/ExpansionColorExample.vue#template [template]

<<< @/examples/expansion/ExpansionColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expansion color 预览">
    <ExpansionColorExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/expansion/ExpansionDisabledExample.vue#template [template]

<<< @/examples/expansion/ExpansionDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expansion disabled 预览">
    <ExpansionDisabledExample />
  </DocsPreview>
</ClientOnly>

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/expansion/ExpansionVariantExample.vue#template [template]

<<< @/examples/expansion/ExpansionVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Expansion variant 预览">
    <ExpansionVariantExample />
  </DocsPreview>
</ClientOnly>

## API

### MatExpansion 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | 基础值、基础值数组或 `null` | 未设置 | 受控展开值；多选时为数组，手风琴模式 (`multiple=false`) 时为单值或 `null` |
| `multiple` | `boolean` | `true` | 是否允许多个面板同时展开；设为 `false` 时为单选手风琴模式 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 共享语义色或十六进制种子色，向下透传至子面板 |
| `disabled` | `boolean` | `false` | 全局禁用所有子面板 |
| `as` | `string` | `'div'` | 根元素语义 |
| `variant` | `'standard' \| 'segmented'` | `'segmented'` | 列表布局形态 |

### MatExpansionPanel 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | 自动生成 | 当前面板在 `MatExpansion` 中的唯一标识值 |
| `modelValue` | `boolean` | 未设置 | 独立或单面板使用时的受控展开状态 |
| `title` | `string` | 未设置 | 触发器标题文本；未提供 `activator` Slot 时自动渲染默认触发器 |
| `split` | `boolean` | `true` | 是否以分立列表项形态展开；为 `true` 时默认插槽使用 `MatListItem`，为 `false` 时在同一块卡片内展开自由内容 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 覆盖父级容器的局部语义色 |
| `disabled` | `boolean` | `false` | 是否禁用当前面板展开 |
| `as` | `string` | `'div'` | 面板根元素语义 |

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatExpansion` | `update:modelValue` | 基础值数组、单值或 `null` | 子面板展开状态变更时触发 |
| `MatExpansionPanel` | `update:modelValue` | `boolean` | 当前面板展开状态变更时触发 |

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatExpansion` | 默认 | 放置一个或多个 `MatExpansionPanel` |
| `MatExpansionPanel` | `activator` | 自定义触发器；接收 `{ expanded: boolean }` 参数，推荐放置 `MatListItem` |
| `MatExpansionPanel` | 默认 | `split=true` 时放置 `MatListItem`；`split=false` 时可放置任意自由内容 |

## 状态与无障碍

- 首尾面板遵循与 List 一致的容器圆角规则：首项顶部和末项底部在静止时保持 16px 外角，相邻面板之间保持 4px 内角；单项独立使用时四角均为 16px。
- 当面板通过 `title` 属性渲染默认激活器时，尾部自动提供随展开状态平滑旋转的箭头指示器。
- `split=false` 时，触发器与折叠内容区域合并至同一圆角背景容器内，展开时激活器底边角自动变为直角，与下方内容无缝衔接。
- 折叠区域遵循 Material 3 Expressive 弹簧动效规范，并在 `prefers-reduced-motion: reduce` 下自动禁用过渡动画。
- 组件完全继承了底层 `MatList` 与 `MatListGroup` 的 WAI-ARIA 语义（包括 `aria-expanded`、`aria-controls` 及键盘回车/空格激活）。

## 参考来源

组件结构和交互依据 Material 3 [List specs - Expandable list](https://m3.material.io/components/lists/specs#43f774a6-b1fb-4719-9376-f706c7b82eac) 与 [APG Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)。

<script setup>
import ExpansionAccordionExample from '../examples/expansion/ExpansionAccordionExample.vue';
import ExpansionActivatorExample from '../examples/expansion/ExpansionActivatorExample.vue';
import ExpansionColorExample from '../examples/expansion/ExpansionColorExample.vue';
import ExpansionDisabledExample from '../examples/expansion/ExpansionDisabledExample.vue';
import ExpansionSplitExample from '../examples/expansion/ExpansionSplitExample.vue';
import ExpansionVariantExample from '../examples/expansion/ExpansionVariantExample.vue';
</script>
