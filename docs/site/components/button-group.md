---
title: Button group 按钮组
description: mat-btn-group 的标准与连接布局、级联属性、受控单选多选和事件。
llms: true
order: 60
---

# Button group 按钮组

## 组件简介

`<mat-btn-group>` 的组件导出名是 `MatBtnGroup`。它在单行中组织普通或图标模式的 `MatBtn`。standard 形态保留独立按钮间距，connected 形态连接可选择按钮。组容器不聚焦，每个子按钮保持独立 Tab 停靠点。

## 示例

示例代码默认收起，预览直接可见。

### `block`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupBlockExample.vue#template [template]

<<< @/examples/button/ButtonGroupBlockExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group block 预览">
    <ButtonGroupBlockExample />
  </DocsPreview>
</ClientOnly>

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupVariantExample.vue#template [template]

<<< @/examples/button/ButtonGroupVariantExample.vue#script [script]

<<< @/examples/button/ButtonGroupVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group variant 预览">
    <ButtonGroupVariantExample />
  </DocsPreview>
</ClientOnly>

### `size`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupSizeExample.vue#template [template]

<<< @/examples/button/ButtonGroupSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group size 预览">
    <ButtonGroupSizeExample />
  </DocsPreview>
</ClientOnly>

### `shape`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupShapeExample.vue#template [template]

<<< @/examples/button/ButtonGroupShapeExample.vue#script [script]

<<< @/examples/button/ButtonGroupShapeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group shape 预览">
    <ButtonGroupShapeExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupColorExample.vue#template [template]

<<< @/examples/button/ButtonGroupColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group color 预览">
    <ButtonGroupColorExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupDisabledExample.vue#template [template]

<<< @/examples/button/ButtonGroupDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group disabled 预览">
    <ButtonGroupDisabledExample />
  </DocsPreview>
</ClientOnly>

### `selection` 与 `selected`

选择模式必须给每个子按钮提供 `value`，并在 `select` 事件中回写 `selected`。

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupSelectionExample.vue#template [template]

<<< @/examples/button/ButtonGroupSelectionExample.vue#script [script]

<<< @/examples/button/ButtonGroupSelectionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group selection 与 selected 预览">
    <ButtonGroupSelectionExample />
  </DocsPreview>
</ClientOnly>

### `required`

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupRequiredExample.vue#template [template]

<<< @/examples/button/ButtonGroupRequiredExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group required 预览">
    <ButtonGroupRequiredExample />
  </DocsPreview>
</ClientOnly>

### `fullWidth`

`fullWidth` 只在 connected 形态中生效。

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupFullWidthExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group fullWidth 预览">
    <ButtonGroupFullWidthExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/button/ButtonGroupDefaultSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Button group 默认 Slot 预览">
    <ButtonGroupDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

按下 standard 子项时，该项宽度临时增大，直接相邻项同步缩窄；connected 形态不联动子项宽度。组的 `size`、`shape`、`color` 只作为未显式设置子项的默认值，组 `disabled` 与子项 `disabled` 取或。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `block` | `boolean` | `false` | 使用块级 flex 组根，在普通文档流中铺满父元素；不改变子按钮宽度分配 |
| `variant` | `'standard' \| 'connected'` | `'standard'` | 组布局形态 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 未显式设置尺寸的子按钮继承该值 |
| `shape` | `'round' \| 'square'` | `'round'` | 子按钮形状和 connected 外角形状 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 级联给未显式设置 `color` 的子按钮 |
| `disabled` | `boolean` | `false` | 为 true 时禁用全部子按钮；子按钮仍可单独禁用 |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | 是否按子按钮 `value` 计算选择候选值 |
| `selected` | 基础值、基础值数组或 `null` | `null` | 受控当前值；single 使用单值，multiple 使用数组 |
| `required` | `boolean` | `false` | 阻止取消 single 当前项或 multiple 最后一项 |
| `fullWidth` | `boolean` | `false` | connected 形态下铺满父容器并等分子项；standard 中忽略 |

`block` 只控制组根的外部布局；`fullWidth` 还会让 connected 的直接子按钮等分整行。connected 可以只设置 `block` 并保留内容宽度，也可以只设置 `fullWidth` 直接启用铺满与等分。standard 始终忽略 `fullWidth`。

组的 `size`、`shape`、`color` 只作为默认值，子组件显式 prop 优先。组 `disabled` 与子组件 `disabled` 取或。选择模式下每个直接子按钮都必须有唯一 `value`；缺少时发出开发警告并忽略该次选择。

connected 应使用 `single` 或 `multiple`，所有子项应使用相同颜色形态，不使用 text 或 standard Button。违反这些组合约束时开发环境会警告。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `select` | `{ value, selected, nextSelected, originalEvent }` | 未禁用子按钮被激活且选择规则允许变化 |

`value` 是本次项目值，`selected` 是该项目的候选布尔状态，`nextSelected` 是调用方应回写的单值、数组或 `null`，`originalEvent` 是原生 `MouseEvent`。组件不会修改 `selected`。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 直接放置普通或图标模式的 `MatBtn`；不要嵌套额外布局容器 |

### 状态与键盘

组根节点使用 `role="group"`，没有 `tabindex`。Tab 依次进入每个子按钮，Space 和 Enter 使用原生按钮激活；不实现方向键或 roving tabindex。connected 选择项使用 `aria-pressed`，不模拟 radio/radiogroup。

组件没有公开方法。

## 参考来源

参数与交互依据 [Material 3 Button group specs](https://m3.material.io/components/button-groups/specs)。

<script setup>
import ButtonGroupBlockExample from '../examples/button/ButtonGroupBlockExample.vue';
import ButtonGroupColorExample from '../examples/button/ButtonGroupColorExample.vue';
import ButtonGroupDefaultSlotExample from '../examples/button/ButtonGroupDefaultSlotExample.vue';
import ButtonGroupDisabledExample from '../examples/button/ButtonGroupDisabledExample.vue';
import ButtonGroupFullWidthExample from '../examples/button/ButtonGroupFullWidthExample.vue';
import ButtonGroupRequiredExample from '../examples/button/ButtonGroupRequiredExample.vue';
import ButtonGroupSelectionExample from '../examples/button/ButtonGroupSelectionExample.vue';
import ButtonGroupShapeExample from '../examples/button/ButtonGroupShapeExample.vue';
import ButtonGroupSizeExample from '../examples/button/ButtonGroupSizeExample.vue';
import ButtonGroupVariantExample from '../examples/button/ButtonGroupVariantExample.vue';
</script>
