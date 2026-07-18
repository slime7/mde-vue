---
title: Toolbar 工具栏
description: mat-toolbar 的停靠、悬浮、自然布局占位、安全区和覆盖层避让。
llms: true
order: 100
---

# Toolbar 工具栏

## 组件简介

`<mat-toolbar>` 的组件导出名是 `MatToolbar`。它提供 Material 3 Expressive 的 docked 和 floating 两类 Toolbar：停靠模式固定在底部，悬浮模式支持底部横向和左右垂直布局。默认 Slot 可放置按钮、按钮组和自定义内容，悬浮模式可通过 `fab` Slot 放置外置主操作；当前示例使用带 `icon` 和 `label` 的 `<mat-fab>`。

Toolbar 默认固定显示，使用 `modelValue` 或 `v-model` 可以播放进入、退出动画并隐藏 Toolbar；不负责随滚动自动隐藏。Material 不建议同时显示 Toolbar 与 Navigation bar。

## 示例

### `variant`、`position`、`vibrant`、显示状态与 `fab` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/toolbar/ToolbarVariantExample.vue#template [template]

<<< @/examples/toolbar/ToolbarVariantExample.vue#script [script]

<<< @/examples/toolbar/ToolbarVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Toolbar 分组控制与 fab Slot 预览">
    <ToolbarVariantExample />
  </DocsPreview>
</ClientOnly>

### `placeholder`

:::: details 查看示例代码
::: code-group

<<< @/examples/toolbar/ToolbarPlaceholderExample.vue#template [template]

<<< @/examples/toolbar/ToolbarPlaceholderExample.vue#script [script]

<<< @/examples/toolbar/ToolbarPlaceholderExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Toolbar 自然布局占位预览">
    <ToolbarPlaceholderExample />
  </DocsPreview>
</ClientOnly>

### `bottomPlaceholder`

此示例分别提供 docked 与 floating-bottom 两个独立开关；两者共用同一滑块，方便观察 `bottomPlaceholder` 在停靠条内部与悬浮条下方的差异。

:::: details 查看示例代码
::: code-group

<<< @/examples/toolbar/ToolbarBottomPlaceholderExample.vue#template [template]

<<< @/examples/toolbar/ToolbarBottomPlaceholderExample.vue#script [script]

<<< @/examples/toolbar/ToolbarBottomPlaceholderExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Toolbar 底部安全区滑块预览">
    <ToolbarBottomPlaceholderExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `true` | 控制 Toolbar 是否显示；设为 `false` 时保留至退出动画结束，适合使用 `v-model` 控制 |
| `variant` | `'docked' \| 'floating' \| 'floating-bottom' \| 'floating-left' \| 'floating-right'` | `'docked'` | `floating` 是 `floating-bottom` 的别名；左右悬浮模式为垂直 Toolbar |
| `position` | `'start' \| 'center' \| 'end'` | `'center'` | 浮动底部模式按水平方向、左右模式按垂直方向对齐；停靠模式忽略 |
| `vibrant` | `boolean` | `false` | 使用高强调的 primary container 配色 |
| `placeholder` | `boolean` | `false` | 开启后在组件自然布局位置生成占位，避免固定 Toolbar 遮挡内容 |
| `bottomPlaceholder` | `number \| string` | `0` | 额外底部安全区；数字按 px 处理，可传入 `env(safe-area-inset-bottom)` 或 `calc(...)`；不负责生成自然布局占位 |

`placeholder=true` 时，横向 Toolbar 占用实际 Toolbar 的 block-size，垂直 Toolbar 占用实际 Toolbar 的 inline-size；占位尺寸包含有效的 `bottomPlaceholder`。无效的 `bottomPlaceholder` 不产生额外空间。`placeholder=false` 时，即使设置 `bottomPlaceholder` 也不会生成自然布局占位。`fab` Slot 在 docked 模式不会渲染并会给出警告。

组件没有公开方法。

## 事件

组件不定义自定义事件；显示状态由 `modelValue` 或 `v-model` 控制。未消费的属性、`class`、`style`、`id` 和 ARIA 属性传递给 Teleport 到 `body` 的 Toolbar 根节点。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | Toolbar 主内容，可放置按钮、按钮组、`MatSpacer` 和自定义内容 |
| `fab` | FAB 或其他主操作内容；仅在 floating variant 中渲染，位于 Toolbar 主表面外侧 |

## 覆盖层与避让

Toolbar 使用较低的普通覆盖层级。Snackbar 会自动向上避让底部 Toolbar 及其安全区；Tooltip 会在 Toolbar 占用首选位置时换边；Dialog 使用原生 top layer，始终位于这些普通覆盖层之上。使用方不需要为这三类组件额外设置 z-index 或底部偏移。

## 无障碍

Toolbar 根节点使用 `role="toolbar"`；左右悬浮模式使用 `aria-orientation="vertical"`。Toolbar 不接管子控件的焦点移动和激活语义，按钮、输入框等子组件仍需保持各自的可访问名称和键盘行为。

## 参考来源

外观、停靠与悬浮变体、尺寸和 Slot 内容依据 Material 3 [Toolbars overview](https://m3.material.io/components/toolbars/overview)、[Toolbars specs](https://m3.material.io/components/toolbars/specs) 与 [Toolbars guidelines](https://m3.material.io/components/toolbars/guidelines)。

<script setup>
import ToolbarBottomPlaceholderExample from '../examples/toolbar/ToolbarBottomPlaceholderExample.vue';
import ToolbarPlaceholderExample from '../examples/toolbar/ToolbarPlaceholderExample.vue';
import ToolbarVariantExample from '../examples/toolbar/ToolbarVariantExample.vue';
</script>
