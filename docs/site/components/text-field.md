---
title: Text field 文本输入
description: mat-text-field 与 mat-textarea 的输入、校验提示、计数、局部配色和原生事件。
llms: true
order: 90
---

# Text field 文本输入

## 组件简介

`<mat-text-field>` 的组件导出名是 `MatTextField`，渲染单行原生 `input`；`<mat-textarea>` 的组件导出名是 `MatTextarea`，渲染固定初始高度的原生 `textarea`。两者共享 outlined、filled 外观、浮动标签、辅助或错误文字、字符计数、前后缀和局部 `color` 配色，但不执行表单校验或自动调整 textarea 高度。

## 示例

下面同时展示 outlined、filled 错误状态和可纵向调整尺寸的 textarea。字符计数只在设置 `maxLength` 后显示。

<<< @/examples/text-field/TextFieldExample.vue

<ClientOnly>
  <DocsPreview label="Text field 与 Textarea 状态预览" stacked>
    <TextFieldExample />
  </DocsPreview>
</ClientOnly>

## API

### 共同属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | 受控输入值，可使用 `v-model` |
| `label` | `string` | 未设置 | 始终可见的输入标签；输入有值、获得焦点或设置 placeholder 时浮动 |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | 完整轮廓或带底部活动指示器的填充外观 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 焦点描边、活动指示器和光标的强调色 |
| `supportingText` | `string` | 未设置 | 控件下方的简短辅助说明 |
| `errorText` | `string` | 未设置 | `error` 为 true 时替换 supportingText 的错误说明 |
| `prefixText` | `string` | 未设置 | 输入值之前的固定短文本 |
| `suffixText` | `string` | 未设置 | 输入值之后的固定短文本 |
| `maxLength` | 非负整数 | 未设置 | 原生最大长度；设置后自动显示“当前长度 / 最大长度” |
| `disabled` | `boolean` | `false` | 使用原生禁用语义并降低内容强调 |
| `readonly` | `boolean` | `false` | 使用原生只读语义，保留选择和焦点 |
| `required` | `boolean` | `false` | 设置原生 required，并在标签后显示星号 |
| `error` | `boolean` | `false` | 启用错误外观、`aria-invalid` 和错误说明关联；错误色优先于 color |

除 `class`、`style`、`inert` 和 `aria-hidden` 外，未消费的原生属性传给实际的 input 或 textarea。前述四个属性传给最外层 label。可以直接设置 `id`、`name`、`autocomplete`、`placeholder` 和原生 ARIA 属性。

### MatTextField 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `string` | `'text'` | 原生 input type，例如 `email`、`password` 或 `search` |

### MatTextarea 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `rows` | 正整数 | `4` | textarea 的初始可见行数；内容不会令组件自动增高 |

组件没有公开方法。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `string` | 原生 input 事件产生新值，用于 `v-model` |
| `input`、`change`、`focus`、`blur` | 对应原生 Event 或 FocusEvent | 实际 input 或 textarea 触发同名事件；监听器直接传给原生控件 |

组件不会另外包装原生事件，也不会发出自定义校验事件。错误状态由调用方通过 `error` 和 `errorText` 控制。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| `leading` | 输入内容前的单个图标或简短展示内容，不应放置可交互控件 |
| `trailing` | 输入内容后的单个图标或简短展示内容，不应放置可交互控件 |

组件没有默认 Slot；输入文字只由 `modelValue` 提供。前后缀短文本使用 `prefixText` 与 `suffixText`，避免和图标 Slot 混淆。

## 状态与无障碍

- label 包裹原生控件，始终保留可访问标签；required 星号只作视觉提示。
- error 状态把 `aria-invalid` 设为 true，并通过 `aria-describedby` 关联错误文字和字符计数区域。
- 调用方已有的 `aria-describedby` 会与组件说明区域合并。
- filled 和 outlined 在同一区域内应保持一致，不应在同一个表单内交替使用。
- textarea 默认允许纵向调整尺寸；单行输入不会因长内容扩高。
- 减少动态效果偏好下关闭标签、描边与活动指示器的非必要过渡。

## 参考来源

结构、尺寸、状态和使用原则依据 Material 3 [Text fields overview](https://m3.material.io/components/text-fields/overview)、[Text fields specs](https://m3.material.io/components/text-fields/specs) 与 [Text fields guidelines](https://m3.material.io/components/text-fields/guidelines)。

<script setup>
import TextFieldExample from '../examples/text-field/TextFieldExample.vue';
</script>
