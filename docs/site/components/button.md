---
title: Button 按钮
description: mat-btn 的普通与图标模式、尺寸、宽度、形态、配色、受控切换、事件和 slots。
llms: true
order: 50
---

# Button 按钮

## 组件简介

`<mat-btn>` 的组件导出名是 `MatBtn`。它统一渲染普通按钮和图标按钮：省略 `icon` 时由默认 Slot 提供可见标签；传入 Material Symbols 字符串 `icon` 时切换为只包含图标的按钮。两种模式都渲染原生 `<button>`。

## 示例

代码默认收起，预览直接可见。

### 默认内容

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonDefaultOnlyExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button 默认内容预览">
    <ButtonDefaultOnlyExample />
  </DocsPreview>
</ClientOnly>

### `block`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonBlockExample.vue#template [template]

<<< @/examples/button/ButtonBlockExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button block 预览">
    <ButtonBlockExample />
  </DocsPreview>
</ClientOnly>

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonVariantExample.vue#template [template]

<<< @/examples/button/ButtonVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button variant 预览">
    <ButtonVariantExample />
  </DocsPreview>
</ClientOnly>

### `size`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonSizeExample.vue#template [template]

<<< @/examples/button/ButtonSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button size 预览">
    <ButtonSizeExample />
  </DocsPreview>
</ClientOnly>

### `shape`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonShapeExample.vue#template [template]

<<< @/examples/button/ButtonShapeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button shape 预览">
    <ButtonShapeExample />
  </DocsPreview>
</ClientOnly>

### `width`

图标模式必须提供 `label`，它是展示 `width` 的必要依赖。

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonWidthExample.vue#template [template]

<<< @/examples/button/ButtonWidthExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button width 预览">
    <ButtonWidthExample />
  </DocsPreview>
</ClientOnly>

### `icon` 与 `label`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonIconExample.vue#template [template]

<<< @/examples/button/ButtonIconExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button icon 预览">
    <ButtonIconExample />
  </DocsPreview>
</ClientOnly>

### `prefix`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonPrefixExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button prefix 预览">
    <ButtonPrefixExample />
  </DocsPreview>
</ClientOnly>

### `suffix`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonSuffixExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button suffix 预览">
    <ButtonSuffixExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonColorExample.vue#template [template]

<<< @/examples/button/ButtonColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button color 预览">
    <ButtonColorExample />
  </DocsPreview>
</ClientOnly>

### `toggle` 与 `selected`

`selected` 是 toggle 的必要受控状态；组件不自行修改它。

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonToggleExample.vue#template [template]

<<< @/examples/button/ButtonToggleExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Button toggle 与 selected 预览">
    <ButtonToggleExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonDisabledExample.vue#template [template]

<<< @/examples/button/ButtonDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button disabled 预览">
    <ButtonDisabledExample />
  </DocsPreview>
</ClientOnly>

### `type`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonTypeExample.vue#template [template]

<<< @/examples/button/ButtonTypeExample.vue#script [script]

<<< @/examples/button/ButtonTypeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button type 预览">
    <ButtonTypeExample />
  </DocsPreview>
</ClientOnly>

### `value`

`value` 需要放在 `MatBtnGroup` 的选择模式中才有可见作用。

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonValueExample.vue#template [template]

<<< @/examples/button/ButtonValueExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Button value 预览">
    <ButtonValueExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonDefaultSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button 默认 Slot 预览">
    <ButtonDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `prefix` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonPrefixSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button prefix Slot 预览">
    <ButtonPrefixSlotExample />
  </DocsPreview>
</ClientOnly>

### `suffix` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonSuffixSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button suffix Slot 预览">
    <ButtonSuffixSlotExample />
  </DocsPreview>
</ClientOnly>

### `selected` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonSelectedSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button selected Slot 预览">
    <ButtonSelectedSlotExample />
  </DocsPreview>
</ClientOnly>

组件不自行修改 `selected`，也不触发 `update:selected`。图标模式必须提供 `label`；普通按钮可以通过 `prefix`、`suffix` 属性或同名 Slot 放置前后图标，属性和 Slot 同时存在时属性优先。完整配色规则见[组件配色](/guide/component-color)。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `block` | `boolean` | `false` | 使用块级 flex 根布局，在普通文档流中铺满父元素 |
| `variant` | `'elevated' \| 'filled' \| 'filled-tonal' \| 'outlined' \| 'text' \| 'standard'` | `'filled'` | 视觉层级，两种内容模式均可使用 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 容器、排版、图标、间距和圆角尺寸 |
| `shape` | `'round' \| 'square'` | `'round'` | 静止形状；toggle 选中时在 round 与 square 之间切换 |
| `width` | `'narrow' \| 'uniform' \| 'wide'` | `'uniform'` | 图标模式的容器宽度；普通模式忽略 |
| `icon` | `string` | 未设置 | 非空 Material Symbols 字符；设置后切换为图标模式 |
| `prefix` | `string` | 未设置 | 普通按钮前置图标，优先于 prefix Slot |
| `suffix` | `string` | 未设置 | 普通按钮后置图标，优先于 suffix Slot |
| `label` | `string` | 未设置 | 图标模式必填，写入 `aria-label` 并作为默认 Tooltip 文本 |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| #RRGGBB` | 未设置 | 语义色族或局部 Material 2025 种子色 |
| `toggle` | `boolean` | `false` | 启用可选择外观和 `aria-pressed`；text 会忽略该值并发出开发警告 |
| `selected` | `boolean` | `false` | 受控选中状态，仅在 toggle 或选择组中生效 |
| `value` | `string \| number \| boolean` | 未设置 | 在 `MatBtnGroup` 选择模式中的项目值 |
| `disabled` | `boolean` | `false` | 原生禁用状态；父组合组件也可强制禁用 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |

未被组件消费的 `name`、`form`、`aria-*`、`data-*` 等属性传给内部 `<button>`。图标模式下显式 `title` 优先于 `label` 作为 Tooltip 文本，组件不会为图标按钮生成原生 HTML `title` 提示。`color` 只接受严格六位十六进制值。

### 事件

组件不定义状态更新事件。`click` 使用原生 `MouseEvent`，`focus`、`blur` 和其他原生按钮事件按 Vue 属性透传规则生效。禁用时浏览器不会触发 click。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 普通模式的简短按钮标签；图标模式忽略 |
| `prefix` | 普通模式的前置 SVG 或自定义图标；同名 prop 存在时忽略 |
| `suffix` | 普通模式的后置 SVG 或自定义图标；同名 prop 存在时忽略 |
| `selected` | 普通模式 toggle 选中时替换默认标签；图标模式忽略 |

### 状态

| 状态 | 用户可观察行为 |
| --- | --- |
| hover | 显示 8% 状态层；elevated、filled 和 filled-tonal 按规格调整海拔 |
| focus-visible | 显示焦点环和 12% 状态层 |
| pressed | 显示 12% 状态层并按尺寸改变圆角；快速点击仍会完成一次可见的圆角往返过渡 |
| selected | 切换形状和颜色；图标模式同时切换 FILL 轴，设置 `aria-pressed="true"` |
| disabled | 容器使用 `on-surface` 10%，内容使用 38%，取消阴影和点击 |

`extra-small` 与 `small` 的视觉高度分别是 32px 和 40px，但交互目标至少为 48px。减少动态效果偏好下保留最终状态并取消过渡。

组件没有公开方法，也不提供 loading、链接模式、涟漪、密度参数或完整表单方法代理。

## 参考来源

尺寸、形状和状态依据 [Material 3 Button specs](https://m3.material.io/components/buttons/specs) 与 [Icon button specs](https://m3.material.io/components/icon-buttons/specs)。

<script setup>
import ButtonBlockExample from '../examples/button/ButtonBlockExample.vue';
import ButtonColorExample from '../examples/button/ButtonColorExample.vue';
import ButtonDefaultOnlyExample from '../examples/button/ButtonDefaultOnlyExample.vue';
import ButtonDefaultSlotExample from '../examples/button/ButtonDefaultSlotExample.vue';
import ButtonDisabledExample from '../examples/button/ButtonDisabledExample.vue';
import ButtonIconExample from '../examples/button/ButtonIconExample.vue';
import ButtonPrefixExample from '../examples/button/ButtonPrefixExample.vue';
import ButtonPrefixSlotExample from '../examples/button/ButtonPrefixSlotExample.vue';
import ButtonSelectedSlotExample from '../examples/button/ButtonSelectedSlotExample.vue';
import ButtonSizeExample from '../examples/button/ButtonSizeExample.vue';
import ButtonShapeExample from '../examples/button/ButtonShapeExample.vue';
import ButtonSuffixExample from '../examples/button/ButtonSuffixExample.vue';
import ButtonSuffixSlotExample from '../examples/button/ButtonSuffixSlotExample.vue';
import ButtonToggleExample from '../examples/button/ButtonToggleExample.vue';
import ButtonTypeExample from '../examples/button/ButtonTypeExample.vue';
import ButtonValueExample from '../examples/button/ButtonValueExample.vue';
import ButtonVariantExample from '../examples/button/ButtonVariantExample.vue';
import ButtonWidthExample from '../examples/button/ButtonWidthExample.vue';
</script>
