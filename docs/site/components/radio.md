---
title: Radio 单选按钮与单选组
description: mat-radio 与 mat-radio-group 的独立或成组 v-model、标签、禁用、配色和键盘交互。
llms: true
order: 82
---

# Radio 单选按钮与单选组

## 组件简介

`<mat-radio>` 的组件导出名是 `MatRadio`，表示一个单选候选值；`<mat-radio-group>` 的组件导出名是 `MatRadioGroup`，通过默认 Slot 组织多个 Radio，并统一管理单值 `v-model`、组标签、禁用、配色和键盘焦点。Radio 可以独立绑定，也可以进入 Group 由组模型接管。

Radio 按 Material 3 提供 20px 图标、40px 状态层和至少 48px 的交互目标。需要标准方向键导航、唯一 Tab 停靠点或组级禁用与配色时，应使用 Radio Group。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### 独立绑定

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/RadioStandaloneExample.vue#template [template]

<<< @/examples/selection/RadioStandaloneExample.vue#script [script]

<<< @/examples/selection/RadioStandaloneExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Radio 独立绑定预览" stacked>
    <RadioStandaloneExample />
  </DocsPreview>
</ClientOnly>

独立 Radio 共享同一个 `v-model` 时仍保持单值，但不提供组级键盘导航。

### Radio Group

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/RadioGroupExample.vue#template [template]

<<< @/examples/selection/RadioGroupExample.vue#script [script]

<<< @/examples/selection/RadioGroupExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Radio group 受控单选预览" stacked>
    <RadioGroupExample />
  </DocsPreview>
</ClientOnly>

### MatRadio `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/RadioColorExample.vue#template [template]

<<< @/examples/selection/RadioColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Radio color 预览" stacked>
    <RadioColorExample />
  </DocsPreview>
</ClientOnly>

### MatRadio `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/RadioDisabledExample.vue#template [template]

<<< @/examples/selection/RadioDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Radio disabled 预览" stacked>
    <RadioDisabledExample />
  </DocsPreview>
</ClientOnly>

### MatRadioGroup `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/RadioGroupDisabledExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Radio group disabled 预览" stacked>
    <RadioGroupDisabledExample />
  </DocsPreview>
</ClientOnly>

### MatRadioGroup `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/RadioGroupColorExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Radio group color 预览" stacked>
    <RadioGroupColorExample />
  </DocsPreview>
</ClientOnly>

## MatRadio API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number \| boolean \| null` | 未设置 | 独立使用时的 `v-model` 当前值 |
| `value` | `string \| number \| boolean` | 必填 | 当前候选值 |
| `disabled` | `boolean` | `false` | 禁止当前 Radio 交互；Group 禁用时也会生效 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 选中圆环、圆点和状态层强调色 |

进入 `MatRadioGroup` 后，Group 的模型、禁用和颜色上下文生效；子项显式 `disabled` 与 Group 禁用叠加，显式 `color` 优先。此时不要再给子项传入 `v-model`。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 当前 `value` | 独立 Radio 被选中；Group 内由 Group 发出更新 |
| `change` | 原生 `Event` 或触发方向键的 `KeyboardEvent` | 当前 Radio 请求成为选中项 |

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 描述当前候选值的相邻标签；省略时必须提供 `aria-label` |

### 状态

Radio 支持未选中、选中、hover、focus-visible、pressed 和 disabled。已经选中的 Radio 再次操作不会取消选择。组件没有公开方法。

## MatRadioGroup API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number \| boolean \| null` | `null` | `v-model` 当前选中值 |
| `label` | `string` | 必填 | 渲染为 `legend` 的可访问组名称 |
| `disabled` | `boolean` | `false` | 禁用全部子 Radio |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 级联给未显式设置颜色的子 Radio |

Group 只管理 Vue 状态，不公开 `name`、`required`、`form`、表单提交或原生校验能力。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 下一选中值 | 指针、Space 或方向键选择新的 Radio |
| `change` | 原生 `Event` 或 `KeyboardEvent` | 选中值实际发生变化 |

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 放置 `MatRadio`；可以经过普通布局组件，但不要混入另一套单选组 |

### 状态与键盘

- Tab 只进入当前选中项；没有选中值时进入首个可用项。
- `ArrowRight`、`ArrowDown` 选择下一项，`ArrowLeft`、`ArrowUp` 选择上一项；到边界后循环并跳过禁用项。
- Space 使用原生 Radio 行为选择当前项。
- Group 禁用与子项禁用叠加；子项显式 `color` 优先于 Group。

Group 没有公开方法。

## 参考来源

尺寸、标签和单选行为依据 Material 3 [Radio button specs](https://m3.material.io/components/radio-button/specs) 与 [Radio button guidelines](https://m3.material.io/components/radio-button/guidelines)。

<script setup>
import RadioGroupExample from '../examples/selection/RadioGroupExample.vue';
import RadioGroupColorExample from '../examples/selection/RadioGroupColorExample.vue';
import RadioGroupDisabledExample from '../examples/selection/RadioGroupDisabledExample.vue';
import RadioColorExample from '../examples/selection/RadioColorExample.vue';
import RadioDisabledExample from '../examples/selection/RadioDisabledExample.vue';
import RadioStandaloneExample from '../examples/selection/RadioStandaloneExample.vue';
</script>
