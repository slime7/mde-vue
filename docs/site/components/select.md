---
title: Select 选择器
description: mat-select 的 items、单选、多选、Chips、分组、表单值与菜单交互。
llms: true
order: 88
---

# Select 选择器

## 组件简介

`<mat-select>` 的组件导出名是 `MatSelect`。它使用 Text field 的 outlined 或 filled 字段外观，并通过 Menu 展示由 `items` 生成的选项。单选显示一个标题，多选按 `items` 顺序用逗号连接标题；启用 `chips` 后，已选内容改用可移除的 input Chip 展示。

组件内部保留完全隐藏的原生 `select`，同步 `name`、`form`、`required`、`disabled`、`multiple`、options 和选择状态。可见字段承担 combobox 焦点、键盘与菜单交互。Select 是 mde-vue 根据 Text field、Menu、Chip 与 Checkbox 总结的组合组件，不是 Material 官方定义的独立 Web Select 规格。

## 示例

### `items`、字段映射与分组

字符串项以自身作为标题和值。对象项默认读取 `title`、`value`、`subtitle`，也可以用 `item-title`、`item-value`、`item-subtitle` 更换字段。分组使用 `{ group, items }`，不允许嵌套分组。

:::: details 查看示例代码
::: code-group
<<< @/examples/select/SelectItemsExample.vue#template [template]
<<< @/examples/select/SelectItemsExample.vue#script [script]
:::
::::

<ClientOnly><DocsPreview label="Select items 预览"><SelectItemsExample /></DocsPreview></ClientOnly>

### `multiple`

多选项目的前置位置使用 Checkbox 指示状态。选中后菜单保持打开，便于连续选择。

:::: details 查看示例代码
::: code-group
<<< @/examples/select/SelectMultipleExample.vue#template [template]
<<< @/examples/select/SelectMultipleExample.vue#script [script]
:::
::::

<ClientOnly><DocsPreview label="Select multiple 预览"><SelectMultipleExample /></DocsPreview></ClientOnly>

### `chips`

`chips` 只改变已选内容的展示方式。点击 Chip 的关闭图标会移除对应值、保留字段焦点且不会展开菜单。

:::: details 查看示例代码
::: code-group
<<< @/examples/select/SelectChipsExample.vue#template [template]
<<< @/examples/select/SelectChipsExample.vue#script [script]
:::
::::

<ClientOnly><DocsPreview label="Select chips 预览"><SelectChipsExample /></DocsPreview></ClientOnly>

### `variant` 与 `color`

:::: details 查看示例代码
::: code-group
<<< @/examples/select/SelectVariantExample.vue#template [template]
<<< @/examples/select/SelectVariantExample.vue#script [script]
<<< @/examples/select/SelectVariantExample.vue#style [style]
:::
::::

<ClientOnly><DocsPreview label="Select variant 预览"><SelectVariantExample /></DocsPreview></ClientOnly>

### 状态

:::: details 查看示例代码
::: code-group
<<< @/examples/select/SelectStateExample.vue#template [template]
<<< @/examples/select/SelectStateExample.vue#script [script]
<<< @/examples/select/SelectStateExample.vue#style [style]
:::
::::

<ClientOnly><DocsPreview label="Select 状态预览"><SelectStateExample /></DocsPreview></ClientOnly>

### `leading` 与 `trailing` Slots

:::: details 查看示例代码
::: code-group
<<< @/examples/select/SelectSlotsExample.vue#template [template]
<<< @/examples/select/SelectSlotsExample.vue#script [script]
:::
::::

<ClientOnly><DocsPreview label="Select Slots 预览"><SelectSlotsExample /></DocsPreview></ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | 基础值、基础值数组或 `null` | `null` | 单选使用基础值或 null，多选使用数组 |
| `items` | `Array` | 必填 | 字符串、对象或 `{ group: string, items: Array }` 分组 |
| `multiple` | `boolean` | `false` | 启用多选，并保持菜单打开 |
| `chips` | `boolean` | `false` | 使用 input Chip 展示已选内容 |
| `itemTitle` | `string` | `'title'` | 对象项标题字段名 |
| `itemValue` | `string` | `'value'` | 对象项基础值字段名 |
| `itemSubtitle` | `string` | `'subtitle'` | 对象项菜单 supporting 文字字段名 |
| `label` | `string` | 未设置 | 字段浮动标签 |
| `placeholder` | `string` | 未设置 | 没有选中值时显示的提示 |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | 字段外观 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 聚焦描边或活动指示器强调色 |
| `supportingText` | `string` | 未设置 | 字段下方辅助说明 |
| `errorText` | `string` | 未设置 | error 时替换 supportingText |
| `disabled` | `boolean` | `false` | 禁止焦点、菜单和选择，且禁用隐藏 select |
| `readonly` | `boolean` | `false` | 保留字段焦点，但禁止展开和修改 |
| `required` | `boolean` | `false` | 标签显示星号，并同步隐藏 select 的 required |
| `error` | `boolean` | `false` | 启用错误外观和 `aria-invalid` |

对象项的 `disabled: true` 禁止选择。title 必须是字符串，value 只支持 `string`、`number`、`boolean`；非法项、嵌套分组、按 `Object.is()` 重复或 `String(value)` 冲突的后续项会在开发环境警告并跳过。

`class` 和 `style` 应用于 Select 根；`id` 与 `aria-label` 应用于可见 combobox，`name` 与 `form` 应用于隐藏 select。number 与 boolean 在 Vue 模型中保留原类型，HTML 表单值按 `String(value)` 提交。组件没有公开方法。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 下一基础值、基础值数组或 `null` | 用户选择或移除项目，用于 `v-model` |
| `change` | 与 update:modelValue 相同 | 同一次用户选择或移除；外部直接修改 modelValue 不触发 |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| `leading` | 字段前置的单个图标或简短展示内容，不应包含交互控件 |
| `trailing` | 字段尾随的单个图标或简短展示内容，不应包含交互控件 |

组件没有默认 Slot，所有选项只通过 `items` 提供；不支持子菜单、自由输入、搜索过滤或对象值。

## 状态与无障碍

- 可见控件使用 combobox、`aria-expanded`、`aria-controls` 与 Menu 建立关系。点击以及 Enter、Space、ArrowDown、ArrowUp 可以打开菜单。
- 打开后由 Menu 处理方向键、Home、End、Escape 与 Tab。单选选择后关闭，多选选择后保持打开。
- 多选 Checkbox 只表达状态，不参与焦点或无障碍树，避免在菜单项内产生嵌套交互控件。
- 单选空值为 `null`，多选空值为 `[]`；`modelValue` 与 multiple 模式不匹配时在开发环境警告。
- 隐藏 select 不进入 Tab 顺序或无障碍树，只用于原生 options、required 与表单提交。

## 参考来源

Select 的组合外观由 mde-vue 根据 Material 3 [Text fields](https://m3.material.io/components/text-fields/overview)、[Menus](https://m3.material.io/components/menus/overview)、[Chips](https://m3.material.io/components/chips/overview) 与 [Checkbox](https://m3.material.io/components/checkbox/overview) 总结；这些页面没有规定本组件完整的 Select API 或组合方式。

<script setup>
import SelectChipsExample from '../examples/select/SelectChipsExample.vue';
import SelectItemsExample from '../examples/select/SelectItemsExample.vue';
import SelectMultipleExample from '../examples/select/SelectMultipleExample.vue';
import SelectSlotsExample from '../examples/select/SelectSlotsExample.vue';
import SelectStateExample from '../examples/select/SelectStateExample.vue';
import SelectVariantExample from '../examples/select/SelectVariantExample.vue';
</script>
