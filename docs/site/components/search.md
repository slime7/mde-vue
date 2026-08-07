---
title: Search 搜索
description: mat-search 的 MD3 contained 搜索条、直接输入、提交和操作 Slots。
llms: true
order: 91
---

# Search 搜索

## 组件简介

`<mat-search>` 的组件导出名是 `MatSearch`。它提供 Material 3 contained 搜索条的独立布局和原生 `search` 输入，适合放在页面内容、App bar 或其他布局容器中。组件默认使用 56px 高的圆角填充表面，输入区随可用宽度伸缩，最大宽度为 720px。

`MatSearch` 只负责直接输入和提交：输入内容实时更新 `v-model`，按 Enter 或点击默认 leading 搜索按钮发出 `search`。它不实现搜索建议、结果列表、全屏或停靠 Search View，清空、语音和其他操作由 trailing Slot 提供。

## 示例

### 直接输入与提交

输入内容会实时更新 `v-model`；按 Enter 或默认搜索按钮提交当前查询，trailing Slot 演示清空操作。

:::: details 查看示例代码
::: code-group

<<< @/examples/search/SearchInputExample.vue#template [template]

<<< @/examples/search/SearchInputExample.vue#script [script]

<<< @/examples/search/SearchInputExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Search 直接输入与提交预览">
    <SearchInputExample />
  </DocsPreview>
</ClientOnly>

### `disabled` 与 `readonly`

禁用状态阻止输入和提交；只读状态保留内容展示但不允许修改。

:::: details 查看示例代码
::: code-group

<<< @/examples/search/SearchStateExample.vue#template [template]

<<< @/examples/search/SearchStateExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Search 禁用和只读状态预览">
    <SearchStateExample />
  </DocsPreview>
</ClientOnly>

### `leading` 与 `trailing` Slots

自定义 leading 内容需要自行提供提交语义和无障碍名称；trailing Slot 可放置清空或其他搜索操作。

:::: details 查看示例代码
::: code-group

<<< @/examples/search/SearchSlotsExample.vue#template [template]

<<< @/examples/search/SearchSlotsExample.vue#script [script]

<<< @/examples/search/SearchSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Search leading 与 trailing Slots 预览">
    <SearchSlotsExample />
  </DocsPreview>
</ClientOnly>

## API

### `MatSearch` 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | 当前搜索文本，可使用 `v-model` |
| `label` | `string` | `'Search'` | 原生输入和默认搜索按钮的无障碍名称 |
| `placeholder` | `string` | `'Search'` | 原生输入占位文本 |
| `disabled` | `boolean` | `false` | 禁用输入和默认搜索按钮，并阻止提交 |
| `readonly` | `boolean` | `false` | 将原生输入设为只读 |
| `maxLength` | `number` | `undefined` | 原生最大字符数 |

`class` 与 `style` 传给搜索 `<form role="search">` 容器；其他未消费属性传给内部 `MatInputBase` 的原生 `<input type="search">`。原生搜索清除按钮由 `MatInputBase` 隐藏，清空能力由 trailing Slot 中的组件操作明确提供。

### `MatSearch` 方法

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `focusInput()` | 无 | `void` | 将焦点移到原生搜索输入框；未挂载时不抛出错误 |
| `getInput()` | 无 | `HTMLInputElement \| null` | 返回当前原生搜索输入框，未挂载时返回 `null` |

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `string` | 原生 input 事件产生新文本时，用于 `v-model` |
| `search` | `string` | 按 Enter 或点击默认搜索按钮时，载荷为当前受控查询文本；禁用时不触发 |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| `leading` | 替换默认搜索按钮的起始内容；自定义内容负责自身提交语义和可访问名称 |
| `trailing` | 输入框末端的清空、语音、头像或其他搜索操作 |

## 无障碍与边界

搜索使用原生 `<form role="search">` 和 `input[type="search"]`；默认图标按钮和自定义操作都应提供明确的 `label`。组件不移动焦点，不管理建议或结果列表，应用负责在 `search` 事件后展示查询结果。

## 参考来源

组件的 contained 样式、56px 搜索条、圆角容器、leading/trailing 操作和直接输入边界依据 `agent-temp` 中的 Material 3 Search overview、specs 与 guidelines 资料；组件行为只实现本页面记录的直接输入 API。

<script setup>
import SearchInputExample from '../examples/search/SearchInputExample.vue';
import SearchSlotsExample from '../examples/search/SearchSlotsExample.vue';
import SearchStateExample from '../examples/search/SearchStateExample.vue';
</script>
