---
title: Radio group 单选组
description: mat-radio-group 的组标签、受控单选、颜色与禁用级联、方向键和 roving tabindex。
llms: true
order: 84
---

# Radio group 单选组

## 组件简介

`<mat-radio-group>` 的组件导出名是 `MatRadioGroup`。它通过默认 Slot 组织多个 [`<mat-radio>`](/components/radio)（`MatRadio`），统一管理单值 `v-model`、组标签、禁用和配色，并实现单选组的方向键与 roving tabindex。

## 示例

```vue
<script setup>
import { ref } from 'vue';

const themeMode = ref('system');
</script>

<template>
  <mat-radio-group v-model="themeMode" label="主题模式" color="#6750a4">
    <mat-radio value="system">跟随系统</mat-radio>
    <mat-radio value="light">亮色</mat-radio>
    <mat-radio value="dark">暗色</mat-radio>
    <mat-radio value="legacy" disabled>旧主题</mat-radio>
  </mat-radio-group>
</template>
```

<ClientOnly>
  <DocsPreview label="Radio group 受控单选预览" stacked>
    <mat-radio-group v-model="radioGroupMode" label="主题模式" color="#6750a4">
      <mat-radio value="system">跟随系统</mat-radio>
      <mat-radio value="light">亮色</mat-radio>
      <mat-radio value="dark">暗色</mat-radio>
      <mat-radio value="legacy" disabled>旧主题</mat-radio>
    </mat-radio-group>
    <span>当前值：{{ radioGroupMode }}</span>
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number \| boolean \| null` | `null` | `v-model` 当前选中值 |
| `label` | `string` | 必填 | 渲染为 `legend` 的可访问组名称 |
| `disabled` | `boolean` | `false` | 禁用全部子 Radio |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 级联给未显式设置颜色的子 Radio |

Group 只管理 Vue 状态，不公开 `name`、`required`、`form`、表单提交或原生校验能力。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 下一选中值 | 指针、Space 或方向键选择新的 Radio |
| `change` | 原生 `Event` 或 `KeyboardEvent` | 选中值实际发生变化 |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 放置 `MatRadio`；可以经过普通布局组件，但不要混入另一套单选组 |

## 状态与键盘

- Tab 只进入当前选中项；没有选中值时进入首个可用项。
- `ArrowRight`、`ArrowDown` 选择下一项，`ArrowLeft`、`ArrowUp` 选择上一项；到边界后循环并跳过禁用项。
- Space 使用原生 Radio 行为选择当前项。
- Group 禁用与子项禁用叠加；子项显式 `color` 优先于 Group。

组件没有公开方法。

<script setup>
import { ref } from 'vue';

const radioGroupMode = ref('system');
</script>
