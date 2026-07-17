---
title: Panes 布局面板
description: mat-panes 与 mat-pane 的横向多窗口布局、受控宽度调整、断点事件和低频宽度信息。
llms: true
order: 118
---

# Panes 布局面板

## 组件简介

`<mat-panes>` 的组件导出名是 `MatPanes`，`<mat-pane>` 的组件导出名是 `MatPane`。它们用于把多个窗口横向排列，并在相邻 Pane 之间自动提供可用鼠标、触摸和键盘调整的窗口分隔控件。所有 Pane 使用受控权重分配宽度；组件不会根据断点替应用隐藏或重排内容。

Pane 默认与 `MatPanes` 保持相同的块轴高度，内容超出时在 Pane 内滚动。`MatPanes` 或其祖先需要有确定高度，滚动区域才有明确边界。

## 示例

### 受控尺寸与默认 Slot

::: details 查看示例代码
<<< @/examples/panes/PanesBasicExample.vue
:::

<ClientOnly>
  <DocsPreview label="Panes 受控尺寸预览" stacked>
    <PanesBasicExample />
  </DocsPreview>
</ClientOnly>

### 等高与 Pane 内滚动

::: details 查看示例代码
<<< @/examples/panes/PanesScrollExample.vue
:::

<ClientOnly>
  <DocsPreview label="Panes 等高滚动预览" stacked>
    <PanesScrollExample />
  </DocsPreview>
</ClientOnly>

### `resizable`

::: details 查看示例代码
<<< @/examples/panes/PanesResizableExample.vue
:::

<ClientOnly>
  <DocsPreview label="Panes 开关调整预览" stacked>
    <PanesResizableExample />
  </DocsPreview>
</ClientOnly>

### `update:breakpoint` 与 `v-if`

断点事件只报告浏览器视口等级。示例中的 `v-if` 是使用方自行决定的显隐策略，组件不会自动隐藏 Pane。

::: details 查看示例代码
<<< @/examples/panes/PanesBreakpointExample.vue
:::

<ClientOnly>
  <DocsPreview label="Panes 断点与显隐预览" stacked>
    <PanesBreakpointExample />
  </DocsPreview>
</ClientOnly>

### `update:widths`

实际宽度信息使用尾端防抖，避免拖动和窗口变化造成过于频繁的外部更新。

::: details 查看示例代码
<<< @/examples/panes/PanesWidthsExample.vue
:::

<ClientOnly>
  <DocsPreview label="Panes 宽度信息预览" stacked>
    <PanesWidthsExample />
  </DocsPreview>
</ClientOnly>

## API

### `MatPanes` 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `sizes` | `Record<string, number>` | 必填 | 以 `MatPane.id` 为键的受控权重对象；值必须是非负有限数。可保留暂时隐藏 Pane 的键 |
| `resizable` | `boolean` | `true` | 是否在相邻 Pane 之间显示调整控件；设为 `false` 时仍保留 24px 的 Pane 间距 |

权重只决定可见 Pane 的相对宽度，调整空间本身不计入 Pane 权重。缺少可见 Pane 权重时组件会发出开发警告并临时使用等分权重；重复 `id` 也会发出开发警告。

### `MatPane` 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | 必填 | 当前布局中唯一的 Pane 标识，同时用于 `sizes` 键和根元素 `id` |
| `resizeLabel` | `string` | 未设置 | 该 Pane 后方调整控件的可访问名称；有相邻 Pane 时应提供 |

`MatPane` 根元素默认使用 `block-size: 100%`、`min-block-size: 0` 和 `overflow: auto`。如果应用用 `v-if` 移除或重新显示 Pane，组件会按新的 Slot 顺序重建调整控件并更新宽度信息。

组件没有公开方法。

## 事件

| 组件与事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `MatPanes @update:sizes` | `Record<string, number>` | 指针拖动释放或一次键盘调整完成后，发送完整的下一组受控权重 |
| `MatPanes @update:widths` | `Record<string, number>` | 初始布局、Pane 集合或实际宽度稳定后发送取整后的像素宽度；常规变化尾端防抖约 100ms，拖动提交后下一渲染帧补发 |
| `MatPanes @update:breakpoint` | `'compact' | 'medium' | 'expanded' | 'large' | 'extra-large'` | 挂载时发送一次，之后仅在 `window.innerWidth` 跨过 `<600`、`600–839`、`840–1199`、`1200–1599` 或 `≥1600` 边界时发送 |

组件不会保存尺寸、不根据断点自动调整 Pane，也不会代替应用决定何时使用 `v-if`。

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatPanes` | 默认 | 直接放置一个或多个 `MatPane`；组件按 Slot 顺序识别相邻 Pane |
| `MatPane` | 默认 | Pane 内任意 Vue 内容；内容超出可用高度时由 Pane 自己滚动 |

## 状态与键盘

相邻 Pane 之间的分隔空间为 24px；调整控件交互目标为 48px，并在 `MatPanes` 高度方向垂直居中。Material 3 的默认指示条为 4×48px 胶囊，悬停时不增加独立背景层，按下或拖动时切换为 12×52px、圆角为 `corner-medium` 的 `on-surface` 形状；分隔空间本身不绘制额外背景，指针使用默认样式，键盘焦点轮廓跟随指示条形状。控件使用 `role="separator"` 与垂直方向语义；左右键每次调整 16px，Shift 加速为 64px，Home/End 移到边界，Enter 在折叠左侧 Pane 与最近一次非零比例间切换。指针拖动期间只更新内部预览，释放后才触发 `update:sizes`。

Material 3 Panes 通常建议不超过三个可见 Pane，并根据窗口等级选择单 Pane、双 Pane 或三 Pane；这是布局使用规范，组件不会限制 Pane 数量。fixed、temporary、floating、docked Pane、自动折叠和尺寸持久化不属于当前能力，应用可自行在外部实现。

## 参考来源

布局数量、Pane 适配和调整建议依据 [Material 3 Panes](https://m3.material.io/foundations/layout/scaffold/panes)。调整控件的 separator 语义和键盘交互参考 [WAI-ARIA Window Splitter Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)；Material 页面没有规定本组件使用的精确控件尺寸及状态视觉。

<script setup>
import PanesBasicExample from '../examples/panes/PanesBasicExample.vue';
import PanesBreakpointExample from '../examples/panes/PanesBreakpointExample.vue';
import PanesResizableExample from '../examples/panes/PanesResizableExample.vue';
import PanesScrollExample from '../examples/panes/PanesScrollExample.vue';
import PanesWidthsExample from '../examples/panes/PanesWidthsExample.vue';
</script>
