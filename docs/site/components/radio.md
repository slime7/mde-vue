---
title: Radio 单选按钮
description: mat-radio 的独立 v-model、标签、禁用、配色及与 mat-radio-group 的关系。
llms: true
order: 82
---

# Radio 单选按钮

## 组件简介

`<mat-radio>` 的组件导出名是 `MatRadio`。它表示一项单选候选值，可以独立绑定，也可以放入 [`<mat-radio-group>`](/components/radio-group) 由 `MatRadioGroup` 统一管理。组件按 Material 3 提供 20px 图标、40px 状态层和至少 48px 的交互目标。

## 示例

### 独立绑定

```vue
<script setup>
import { ref } from 'vue';

const density = ref('comfortable');
</script>

<template>
  <mat-radio v-model="density" value="compact">紧凑</mat-radio>
  <mat-radio v-model="density" value="comfortable">舒适</mat-radio>
</template>
```

<ClientOnly>
  <DocsPreview label="Radio 独立绑定预览" stacked>
    <mat-radio v-model="radioDensity" value="compact">紧凑</mat-radio>
    <mat-radio v-model="radioDensity" value="comfortable" color="secondary">舒适</mat-radio>
    <span>当前值：{{ radioDensity }}</span>
  </DocsPreview>
</ClientOnly>

独立 Radio 共享同一个 `v-model` 时仍保持单值。需要标准方向键导航和统一禁用状态时，应使用 `MatRadioGroup`。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number \| boolean \| null` | 未设置 | 独立使用时的 `v-model` 当前值 |
| `value` | `string \| number \| boolean` | 必填 | 当前候选值 |
| `disabled` | `boolean` | `false` | 禁止当前 Radio 交互；Group 禁用时也会生效 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 选中圆环、圆点和状态层强调色 |

进入 `MatRadioGroup` 后，Group 的模型、禁用和颜色上下文生效；子项显式 `disabled` 与 Group 禁用叠加，显式 `color` 优先。此时不要再给子项传入 `v-model`。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 当前 `value` | 独立 Radio 被选中；Group 内由 Group 发出更新 |
| `change` | 原生 `Event` 或触发方向键的 `KeyboardEvent` | 当前 Radio 请求成为选中项 |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 描述当前候选值的相邻标签；省略时必须提供 `aria-label` |

## 状态

组件支持未选中、选中、hover、focus-visible、pressed 和 disabled。已经选中的 Radio 再次操作不会取消选择。组件没有公开方法。

## 参考来源

尺寸、标签和单选行为依据 Material 3 [Radio button specs](https://m3.material.io/components/radio-button/specs) 与 [Radio button guidelines](https://m3.material.io/components/radio-button/guidelines)。

<script setup>
import { ref } from 'vue';

const radioDensity = ref('comfortable');
</script>
