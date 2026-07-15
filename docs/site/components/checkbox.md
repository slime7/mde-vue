---
title: Checkbox 复选框
description: mat-checkbox 的布尔与数组 v-model、不确定态、配色、事件和默认 slot。
llms: true
order: 80
---

# Checkbox 复选框

## 组件简介

`<mat-checkbox>` 的组件导出名是 `MatCheckbox`。它让使用者从一组相关选项中选择任意数量的项目，也可以独立表示开关状态。组件使用原生 checkbox 语义，并按 Material 3 提供 18px 图标、40px 状态层和至少 48px 的交互目标。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### 布尔值

::: details 查看示例代码
<<< @/examples/selection/CheckboxBooleanExample.vue
:::

<ClientOnly>
  <DocsPreview label="Checkbox 布尔值预览" stacked>
    <CheckboxBooleanExample />
  </DocsPreview>
</ClientOnly>

### 多个 Checkbox 绑定同一数组

每个实例用 `value` 声明自己的候选值。组件添加或移除项目时返回新数组，不修改原数组。

::: details 查看示例代码
<<< @/examples/selection/CheckboxArrayExample.vue
:::

<ClientOnly>
  <DocsPreview label="Checkbox 数组绑定预览" stacked>
    <CheckboxArrayExample />
  </DocsPreview>
</ClientOnly>

### 父子选择与不确定态

::: details 查看示例代码
<<< @/examples/selection/CheckboxIndeterminateExample.vue
:::

<ClientOnly>
  <DocsPreview label="Checkbox 不确定态预览" stacked>
    <CheckboxIndeterminateExample />
  </DocsPreview>
</ClientOnly>

### `color`

::: details 查看示例代码
<<< @/examples/selection/CheckboxColorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Checkbox color 预览" stacked>
    <CheckboxColorExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

::: details 查看示例代码
<<< @/examples/selection/CheckboxDisabledExample.vue
:::

<ClientOnly>
  <DocsPreview label="Checkbox disabled 预览" stacked>
    <CheckboxDisabledExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| Array<string \| number \| boolean>` | `false` | `v-model` 当前值；数组模式按 `value` 增删项目 |
| `value` | `string \| number \| boolean` | `true` | 数组模式中的候选值；布尔模式忽略 |
| `indeterminate` | `boolean` | `false` | 显示父级部分选中的不确定状态 |
| `disabled` | `boolean` | `false` | 禁止指针与键盘交互 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 选中容器、图标和状态层的局部强调色 |

`class`、`style`、`inert`、`aria-hidden` 应用于外层标签，其余未消费属性传给内部 `input`。组件只承诺 Vue 状态绑定，不承诺表单提交、原生校验或表单重置。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 下一布尔值或新数组 | 使用者切换选中状态 |
| `update:indeterminate` | `false` | 使用者操作当前 Checkbox |
| `change` | 原生 `Event` | 内部 checkbox 发生 change |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 与控件关联的相邻标签；省略时必须提供 `aria-label` |

## 状态

组件支持未选中、选中、不确定、hover、focus-visible、pressed 和 disabled。减少动态效果偏好下关闭勾号、横线和状态层过渡。组件没有公开方法。

## 参考来源

尺寸、状态和父子选择行为依据 Material 3 [Checkbox specs](https://m3.material.io/components/checkbox/specs) 与 [Checkbox guidelines](https://m3.material.io/components/checkbox/guidelines)。

<script setup>
import CheckboxArrayExample from '../examples/selection/CheckboxArrayExample.vue';
import CheckboxBooleanExample from '../examples/selection/CheckboxBooleanExample.vue';
import CheckboxColorExample from '../examples/selection/CheckboxColorExample.vue';
import CheckboxDisabledExample from '../examples/selection/CheckboxDisabledExample.vue';
import CheckboxIndeterminateExample from '../examples/selection/CheckboxIndeterminateExample.vue';
</script>
