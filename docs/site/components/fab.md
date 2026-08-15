---
title: FAB 浮动操作按钮
description: mat-fab 的纯图标 FAB 与 Extended FAB、尺寸、官方颜色角色、禁用状态和无障碍名称。
llms: true
order: 53
---

# FAB 浮动操作按钮

## 组件简介

`<mat-fab>` 的组件导出名是 `MatFab`。它使用同一个组件表达普通 FAB 和 Extended FAB：没有默认 Slot 文本时渲染纯图标 FAB；有默认 Slot 文本时渲染带标签的 Extended FAB。Extended FAB 可以通过 `expanded` 在保留同一组件实例的情况下收缩为图标态。默认在声明位置参与普通布局；设置 `app` 后自动进入最近 `MatAppRoot` 的普通浮动组。组件不实现滚动驱动的自动收缩、FAB menu 或页面级动效。

纯图标模式需要传入非空 `icon` 和 `label`。`label` 同时作为按钮的可访问名称和默认 Tooltip 文本；Extended FAB 可以省略图标，默认 Slot 标签仍然有效。标签保持单行，超出可用宽度时以省略号截断。

## 示例

### `icon` 与 `label`

没有默认 Slot 时，`mat-fab` 是纯图标 FAB。`label` 提供可访问名称，`title` 可以覆盖 Tooltip 文本。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabDefaultExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB 默认图标模式预览">
    <FabDefaultExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot 与无图标标签

默认 Slot 有内容时切换为 Extended FAB。图标是可选的，没有图标时仍然保留标签和完整的操作语义。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabExtendedExample.vue#template [template]

<<< @/examples/fab/FabExtendedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB Extended 与无图标标签预览">
    <FabExtendedExample />
  </DocsPreview>
</ClientOnly>

### `expanded`

带默认 Slot 标签的 Extended FAB 可以将 `expanded` 设为 `false` 收缩为纯图标 FAB。标签隐藏时仍使用 `label` 提供可访问名称和 Tooltip，恢复展开后继续使用原有 Slot 内容。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabExpandedExample.vue#template [template]

<<< @/examples/fab/FabExpandedExample.vue#script [script]

<<< @/examples/fab/FabExpandedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB 展开与收缩预览">
    <FabExpandedExample />
  </DocsPreview>
</ClientOnly>

### `size`

`small`、`medium` 和 `large` 分别使用 56px、80px 和 96px 高度。纯图标模式的宽度与高度相等，Extended FAB 的宽度随内容增长。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabSizeExample.vue#template [template]

<<< @/examples/fab/FabSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB 三种尺寸预览">
    <FabSizeExample />
  </DocsPreview>
</ClientOnly>

### `color`

FAB 只接受当前主题中的八组官方颜色角色，不接受十六进制种子色。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabColorExample.vue#template [template]

<<< @/examples/fab/FabColorExample.vue#script [script]

<<< @/examples/fab/FabColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB 八组颜色角色预览">
    <FabColorExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

禁用状态使用原生 `disabled`，浏览器不会触发 click；基础按钮层同时移除阴影并保留禁用内容对比。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabDisabledExample.vue#template [template]

<<< @/examples/fab/FabDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB 禁用状态预览">
    <FabDisabledExample />
  </DocsPreview>
</ClientOnly>

### 无障碍名称与 Tooltip

纯图标 FAB 必须使用非空 `label`。显式 `title` 只作为 Tooltip 文本，不会在按钮上保留原生 HTML `title` 提示。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabAccessibilityExample.vue#template [template]

<<< @/examples/fab/FabAccessibilityExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB 无障碍名称与 Tooltip 预览">
    <FabAccessibilityExample />
  </DocsPreview>
</ClientOnly>

### `app` 与 `position`

`app` 需要在 `MatAppRoot` 后代中使用。多个 app FAB 按 DOM 顺序纵向排列，`position` 分别控制逻辑起点、居中和逻辑终点对齐。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab/FabAppExample.vue#template [template]

<<< @/examples/fab/FabAppExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB AppRoot 浮动排列预览">
    <FabAppExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | FAB 高度和内容尺寸；分别为 56px、80px、96px，`small` 不是已废弃的 40px FAB |
| `icon` | `string` | 未设置 | Material Symbols 图标；Extended FAB 可以省略；非空时显示为填充图标 |
| `label` | `string` | 未设置 | 纯图标模式的无障碍名称和默认 Tooltip 文本；纯图标模式必须提供非空值 |
| `expanded` | `boolean` | `true` | 是否显示默认 Slot 标签；`false` 时同一 Extended FAB 收缩为纯图标态 |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'primary-container' \| 'secondary-container' \| 'tertiary-container' \| 'error' \| 'error-container'` | `'primary-container'` | 当前主题的官方颜色角色；不接受十六进制种子色 |
| `disabled` | `boolean` | `false` | 原生禁用状态 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |
| `app` | `boolean` | `false` | 自动 Teleport 到最近 `MatAppRoot` 的普通浮动组；AppRoot 外保持声明位置并给出普通按钮行为 |
| `position` | `'start' \| 'center' \| 'end'` | `'end'` | `app=true` 时在浮动组中的逻辑轴对齐位置；普通布局中忽略 |

没有默认 Slot 时，`aria-label` 取 `label`；有默认 Slot 时，默认 Slot 提供可见名称并保留调用方传入的 `aria-label`。未消费的 `name`、`form`、`aria-*`、`data-*` 等原生属性和事件继续传给内部 `<button>`。

### 事件

组件发出原生 `click`，载荷为 `MouseEvent`。`focus`、`blur` 和其他未消费的原生按钮事件按 Vue 属性透传规则生效；禁用时浏览器不会触发 click。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 可选的单行 Extended FAB 标签；存在非空内容时切换为 Extended FAB，超出可用宽度时以省略号截断 |

组件没有其他 Slots，也没有公共方法。

### 状态

| 状态 | 用户可观察行为 |
| --- | --- |
| hover | 显示 8% 状态层并从系统 level 3 升至 level 4 海拔 |
| focus-visible | 显示共享焦点环和状态层 |
| pressed | 使用基础按钮层的按下状态层和状态处理 |
| disabled | 使用原生禁用语义、禁用内容对比并移除阴影 |

组件不自行计算固定坐标；`app` 模式由 AppRoot 负责布局、边缘避让和安全区。组件不实现滚动收缩、FAB menu 或页面级动效。减少动态效果偏好下，基础按钮层和图标过渡会被取消。

## 参考来源

尺寸、形状、标签排版、颜色和使用边界依据 Material 3 的 [FAB overview](https://m3.material.io/components/floating-action-button/overview)、[FAB specs](https://m3.material.io/components/floating-action-button/specs)、[FAB guidelines](https://m3.material.io/components/floating-action-button/guidelines)、[Extended FAB overview](https://m3.material.io/components/extended-fab/overview)、[Extended FAB specs](https://m3.material.io/components/extended-fab/specs) 与 [Extended FAB guidelines](https://m3.material.io/components/extended-fab/guidelines)。

<script setup>
import FabAccessibilityExample from '../examples/fab/FabAccessibilityExample.vue';
import FabAppExample from '../examples/fab/FabAppExample.vue';
import FabColorExample from '../examples/fab/FabColorExample.vue';
import FabDefaultExample from '../examples/fab/FabDefaultExample.vue';
import FabDisabledExample from '../examples/fab/FabDisabledExample.vue';
import FabExpandedExample from '../examples/fab/FabExpandedExample.vue';
import FabExtendedExample from '../examples/fab/FabExtendedExample.vue';
import FabSizeExample from '../examples/fab/FabSizeExample.vue';
</script>
