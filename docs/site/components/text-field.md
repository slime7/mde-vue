---
title: Text field 文本输入
description: mat-text-field 与 mat-textarea 的输入、校验提示、计数、局部配色和原生事件。
llms: true
order: 90
---

# Text field 文本输入

## 组件简介

`<mat-text-field>` 的组件导出名是 `MatTextField`，渲染单行原生 `input`；`<mat-textarea>` 的组件导出名是 `MatTextarea`，渲染固定初始高度的原生 `textarea`。两者共享 outlined、filled 外观、浮动标签、辅助或错误文字、字符计数、前后缀和局部 `color` 配色，但不执行表单校验或自动调整 textarea 高度。有标签的 outlined 外观会在顶部保留浮动标签空间，并以透明缺口裁剪描边，因此可以放在任意主题表面色上。

## 示例

`error` 与 `errorText`、输入值与 `v-model` 等只保留必要依赖。

### `block`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldBlockExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field 与 Textarea block 预览">
    <TextFieldBlockExample />
  </DocsPreview>
</ClientOnly>

### `modelValue`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldModelValueExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field modelValue 预览">
    <TextFieldModelValueExample />
  </DocsPreview>
</ClientOnly>

### `label`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldLabelExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field label 预览">
    <TextFieldLabelExample />
  </DocsPreview>
</ClientOnly>

### `variant`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldVariantExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field variant 预览">
    <TextFieldVariantExample />
  </DocsPreview>
</ClientOnly>

### `color`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldColorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field color 预览">
    <TextFieldColorExample />
  </DocsPreview>
</ClientOnly>

### `supportingText`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldSupportingTextExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field supportingText 预览">
    <TextFieldSupportingTextExample />
  </DocsPreview>
</ClientOnly>

### `error` 与 `errorText`

`errorText` 只有在 `error` 为 true 时才显示，因此两者是必要依赖。

::: details 查看示例代码
<<< @/examples/text-field/TextFieldErrorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field error 预览">
    <TextFieldErrorExample />
  </DocsPreview>
</ClientOnly>

### `prefixText`

空值且未聚焦时隐藏前缀，避免与停留在输入行的标签重叠；输入获得焦点、已有值或标签因 placeholder 浮动后显示。

::: details 查看示例代码
<<< @/examples/text-field/TextFieldPrefixTextExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field prefixText 预览">
    <TextFieldPrefixTextExample />
  </DocsPreview>
</ClientOnly>

### `suffixText`

后缀与前缀使用相同的可见条件。

::: details 查看示例代码
<<< @/examples/text-field/TextFieldSuffixTextExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field suffixText 预览">
    <TextFieldSuffixTextExample />
  </DocsPreview>
</ClientOnly>

### `maxLength`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldMaxLengthExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field maxLength 预览">
    <TextFieldMaxLengthExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldDisabledExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field disabled 预览">
    <TextFieldDisabledExample />
  </DocsPreview>
</ClientOnly>

### `readonly`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldReadonlyExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field readonly 预览">
    <TextFieldReadonlyExample />
  </DocsPreview>
</ClientOnly>

### `required`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldRequiredExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field required 预览">
    <TextFieldRequiredExample />
  </DocsPreview>
</ClientOnly>

### `type`

::: details 查看示例代码
<<< @/examples/text-field/TextFieldTypeExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field type 预览">
    <TextFieldTypeExample />
  </DocsPreview>
</ClientOnly>

### Textarea 的 `rows`

::: details 查看示例代码
<<< @/examples/text-field/TextareaRowsExample.vue
:::

<ClientOnly>
  <DocsPreview label="Textarea rows 预览">
    <TextareaRowsExample />
  </DocsPreview>
</ClientOnly>

### `leading` Slot

::: details 查看示例代码
<<< @/examples/text-field/TextFieldLeadingSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field leading Slot 预览">
    <TextFieldLeadingSlotExample />
  </DocsPreview>
</ClientOnly>

### `trailing` Slot

::: details 查看示例代码
<<< @/examples/text-field/TextFieldTrailingSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="Text field trailing Slot 预览">
    <TextFieldTrailingSlotExample />
  </DocsPreview>
</ClientOnly>

## API

### 共同属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `block` | `boolean` | `false` | 使用块级 flex 根布局，在普通文档流中铺满父元素 |
| `modelValue` | `string` | `''` | 受控输入值，可使用 `v-model` |
| `label` | `string` | 未设置 | 始终可见的输入标签；输入有值、获得焦点或设置 placeholder 时浮动 |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | 完整轮廓或带底部活动指示器的填充外观 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 焦点描边、活动指示器和光标的强调色 |
| `supportingText` | `string` | 未设置 | 控件下方的简短辅助说明 |
| `errorText` | `string` | 未设置 | `error` 为 true 时替换 supportingText 的错误说明 |
| `prefixText` | `string` | 未设置 | 输入值之前的固定短文本；有标签的空输入未聚焦时隐藏 |
| `suffixText` | `string` | 未设置 | 输入值之后的固定短文本；可见条件与 prefixText 相同 |
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

- label 通过 `for` 与原生控件显式关联，始终保留可访问标签；required 星号只作视觉提示。
- outlined 的标签缺口不填充背景色，聚焦时由同一条描边切换颜色和宽度。
- error 状态把 `aria-invalid` 设为 true，并通过 `aria-describedby` 关联错误文字和字符计数区域。
- 调用方已有的 `aria-describedby` 会与组件说明区域合并。
- filled 和 outlined 在同一区域内应保持一致，不应在同一个表单内交替使用。
- textarea 默认允许纵向调整尺寸，初始内容区高度严格按 `rows` 与正文行高计算；单行输入不会因长内容扩高。
- 减少动态效果偏好下关闭标签、描边与活动指示器的非必要过渡。

## 参考来源

结构、尺寸、状态和使用原则依据 Material 3 [Text fields overview](https://m3.material.io/components/text-fields/overview)、[Text fields specs](https://m3.material.io/components/text-fields/specs) 与 [Text fields guidelines](https://m3.material.io/components/text-fields/guidelines)。

<script setup>
import TextFieldBlockExample from '../examples/text-field/TextFieldBlockExample.vue';
import TextFieldColorExample from '../examples/text-field/TextFieldColorExample.vue';
import TextFieldDisabledExample from '../examples/text-field/TextFieldDisabledExample.vue';
import TextFieldErrorExample from '../examples/text-field/TextFieldErrorExample.vue';
import TextFieldLabelExample from '../examples/text-field/TextFieldLabelExample.vue';
import TextFieldLeadingSlotExample from '../examples/text-field/TextFieldLeadingSlotExample.vue';
import TextFieldMaxLengthExample from '../examples/text-field/TextFieldMaxLengthExample.vue';
import TextFieldModelValueExample from '../examples/text-field/TextFieldModelValueExample.vue';
import TextFieldPrefixTextExample from '../examples/text-field/TextFieldPrefixTextExample.vue';
import TextFieldReadonlyExample from '../examples/text-field/TextFieldReadonlyExample.vue';
import TextFieldRequiredExample from '../examples/text-field/TextFieldRequiredExample.vue';
import TextFieldSupportingTextExample from '../examples/text-field/TextFieldSupportingTextExample.vue';
import TextFieldSuffixTextExample from '../examples/text-field/TextFieldSuffixTextExample.vue';
import TextFieldTrailingSlotExample from '../examples/text-field/TextFieldTrailingSlotExample.vue';
import TextFieldTypeExample from '../examples/text-field/TextFieldTypeExample.vue';
import TextFieldVariantExample from '../examples/text-field/TextFieldVariantExample.vue';
import TextareaRowsExample from '../examples/text-field/TextareaRowsExample.vue';
</script>
