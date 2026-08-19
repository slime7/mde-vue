---
title: Docked container 浮动容器
description: mat-docked-container 结合菜单锚点定位与弹窗内容布局，支持自定义宽度、尺寸预设、标题与操作栏插槽。
llms: true
order: 97
---

# Docked container 浮动容器

## 组件简介

`<mat-docked-container>` 的组件导出名是 `MatDockedContainer`。它结合了 Menu 的锚点弹出定位能力与 Dialog 的结构化内容布局，使用原生 Popover API 在 top layer 显示依附于锚点或视口坐标的浮动容器表面。组件支持 standard 与 vibrant 配色变体、透明全屏遮罩、内置尺寸预设（small、medium、large）与自定义宽度，并提供 `headline`、`actions` 和 `activator` 插槽。

## 示例

浮动容器通过 `v-model` 控制显示状态，支持使用元素 id、`activator` Slot 或视口坐标形式的 `anchor` 进行锚定。

### `modelValue` 与元素 `anchor`

:::: details 查看示例代码
::: code-group

<<< @/examples/docked-container/DockedContainerOpenAnchorExample.vue#template [template]

<<< @/examples/docked-container/DockedContainerOpenAnchorExample.vue#script [script]

<<< @/examples/docked-container/DockedContainerOpenAnchorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Docked container modelValue 与元素 anchor 预览">
    <DockedContainerOpenAnchorExample />
  </DocsPreview>
</ClientOnly>

### `activator` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/docked-container/DockedContainerActivatorSlotExample.vue#template [template]

<<< @/examples/docked-container/DockedContainerActivatorSlotExample.vue#script [script]

<<< @/examples/docked-container/DockedContainerActivatorSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Docked container activator Slot 预览">
    <DockedContainerActivatorSlotExample />
  </DocsPreview>
</ClientOnly>

### 尺寸预设与自定义 `width`

支持使用 `size` 属性快速切换 `small`（280px）、`medium`（328px，标准时间/日期选择器尺寸）、`large`（560px）等预设尺寸，也可直接设置 `width`。

:::: details 查看示例代码
::: code-group

<<< @/examples/docked-container/DockedContainerSizeExample.vue#template [template]

<<< @/examples/docked-container/DockedContainerSizeExample.vue#script [script]

<<< @/examples/docked-container/DockedContainerSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Docked container 尺寸预设与自定义 width 预览">
    <DockedContainerSizeExample />
  </DocsPreview>
</ClientOnly>

### 时间选择器浮动面板

组合 `headline` 标题、自定义时间表盘及底部 `actions` 操作栏，实现符合 Material 3 规范的时间选择浮动容器。

:::: details 查看示例代码
::: code-group

<<< @/examples/docked-container/DockedContainerTimePickerExample.vue#template [template]

<<< @/examples/docked-container/DockedContainerTimePickerExample.vue#script [script]

<<< @/examples/docked-container/DockedContainerTimePickerExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Docked container 时间选择器浮动面板预览">
    <DockedContainerTimePickerExample />
  </DocsPreview>
</ClientOnly>

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 受控打开状态，支持 `v-model` |
| `anchor` | `string \| [number, number] \| undefined` | `undefined` | 锚点元素 id 或 `[clientX, clientY]` 视口坐标；未提供时使用 `activator` 插槽 |
| `offset` | `[number, number]` | `[0, 0]` | 相对锚点的 `[x, y]` 偏移像素 |
| `width` | `number \| string \| undefined` | `undefined` | 自定义宽度；数字与纯数字字符串按 px 处理，显式设置时优先于 `size` |
| `size` | `'small' \| 'medium' \| 'large' \| undefined` | `undefined` | 内置尺寸预设；`small` 为 280px，`medium` 为 328px，`large` 为 560px |
| `headline` | `string \| undefined` | `undefined` | 快捷设置容器标题 |
| `variant` | `'standard' \| 'vibrant' \| undefined` | `'standard'` | 配色形态 |
| `color` | `string \| undefined` | `undefined` | 语义色或六位十六进制种子色 `#RRGGBB` |
| `maxLength` | `number \| string \| undefined` | `undefined` | 容器最大块轴高度；数字与纯数字字符串按 px 处理 |
| `scrim` | `boolean` | `true` | 是否使用透明帷幕拦截容器外部的指针交互并在点击时请求关闭 |

## 事件

| 事件名 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | 容器请求打开或关闭时触发 |
| `opened` | - | 展开过渡动画完成时触发 |
| `closed` | - | 收起过渡动画完成且 DOM 清理后触发 |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 容器主体内容区域 |
| `activator` | 触发器插槽；必须只渲染一个当前 document 中的 HTMLElement 根节点 |
| `headline` | 标题插槽；优先于 `headline` 属性 |
| `actions` | 底部操作栏插槽 |

<script setup>
import DockedContainerActivatorSlotExample from '../examples/docked-container/DockedContainerActivatorSlotExample.vue';
import DockedContainerOpenAnchorExample from '../examples/docked-container/DockedContainerOpenAnchorExample.vue';
import DockedContainerSizeExample from '../examples/docked-container/DockedContainerSizeExample.vue';
import DockedContainerTimePickerExample from '../examples/docked-container/DockedContainerTimePickerExample.vue';
</script>
