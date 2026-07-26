---
title: Input base 输入基础层
description: mat-input-base 与 MatInputBase 提供可自定义输入 UI 的无边框原生 input 或 textarea 基础层。
llms: true
order: 89
---

# Input base 输入基础层

## 组件简介

`<mat-input-base>` 的组件导出名是 `MatInputBase`。它渲染调用方选择的原生 `input` 或 `textarea`，提供受控字符串值、原生属性透传、模型更新和聚焦方法。组件不提供标签、描边、填充、辅助文字或校验语义，适合由使用方自行绘制输入容器和交互界面。

## 示例

### 原生 input

:::: details 查看示例代码
::: code-group

<<< @/examples/input-base/InputBaseInputExample.vue#template [template]

<<< @/examples/input-base/InputBaseInputExample.vue#script [script]

<<< @/examples/input-base/InputBaseInputExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Input base input 预览">
    <InputBaseInputExample />
  </DocsPreview>
</ClientOnly>

### 原生 textarea

:::: details 查看示例代码
::: code-group

<<< @/examples/input-base/InputBaseTextareaExample.vue#template [template]

<<< @/examples/input-base/InputBaseTextareaExample.vue#script [script]

<<< @/examples/input-base/InputBaseTextareaExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Input base textarea 预览">
    <InputBaseTextareaExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `control` | `'input' \| 'textarea'` | 无，必填 | 选择渲染的原生控件类型 |
| `modelValue` | `string` | 无，必填 | 受控输入值 |
| `disabled` | `boolean` | `false` | 设置原生控件 disabled |
| `maxLength` | `number` | `undefined` | 设置原生 maxlength |
| `readonly` | `boolean` | `false` | 设置原生控件 readonly |
| `required` | `boolean` | `false` | 设置原生控件 required |
| `rows` | `number` | `undefined` | 仅 textarea 的初始行数 |
| `type` | `string` | `undefined` | 仅 input 的原生 type |

未被组件消费的属性、`class`、`style` 和 ARIA 属性传给实际的 `input` 或 `textarea`。`rows` 在 input 模式、`type` 在 textarea 模式下不会传递。

### 方法

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `focusInput()` | 无 | `void` | 将焦点移到原生输入控件 |
| `getInput()` | 无 | `HTMLInputElement \| HTMLTextAreaElement \| null` | 返回当前原生输入控件 |

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `string` | 原生控件触发 input 事件，用于 `v-model` |
| `input`、`change`、`focus`、`blur` | 对应原生 Event 或 FocusEvent | 实际原生控件触发同名事件，监听器直接透传 |

## Slots

组件没有 Slots。标签、前后缀、辅助文字、错误提示和校验状态由使用方在外层 UI 中提供。

<script setup>
import InputBaseInputExample from '../examples/input-base/InputBaseInputExample.vue';
import InputBaseTextareaExample from '../examples/input-base/InputBaseTextareaExample.vue';
</script>
