---
title: Navigation Rail 导航栏
description: mat-navigation-rail 的纵向 Navigation Rail、横向 Navigation Bar、standard/modal 布局与可选展开状态。
llms: true
order: 105
---

# Navigation Rail 导航栏

## 组件简介

`<mat-navigation-rail>` 的组件导出名是 `MatNavigationRail`，`<mat-navigation-rail-item>` 的组件导出名是 `MatNavigationRailItem`。组件纵向使用 Material 3 Expressive Navigation Rail；设置 `orientation="horizontal"` 时复用为 Navigation Bar，不需要另行添加导航栏组件。

纵向展开状态支持两种布局：`standard` 会占据容器空间并推动正文，`modal` 会保留折叠 Rail 的宽度并覆盖正文。`hide-on-collapse` 可用于沉浸式的 Modal Rail，使折叠状态只保留展开按钮。

## 示例

### 基础导航与受控选择

`selected` 由父组件控制，Item 的 `value` 用于识别当前页面。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailBasicExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailBasicExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation Rail 基础导航预览">
    <NavigationRailBasicExample />
  </DocsPreview>
</ClientOnly>

### `collapsible`、`expanded`、`open-icon` 与 `close-icon`

纵向 Rail 的展开按钮由 `collapsible` 启用，`expanded` 支持 `v-model:expanded`。展开后 Item 为左侧图标、右侧标签；折叠后为上方图标、下方标签。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailCollapsibleExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailCollapsibleExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailCollapsibleExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation Rail 展开与自定义图标预览">
    <NavigationRailCollapsibleExample />
  </DocsPreview>
</ClientOnly>

### `layout="standard"` 与 `layout="modal"`

`standard` 适合空间充足的窗口，展开后正文让位；`modal` 适合空间有限或信息密集的布局，展开面板悬浮覆盖正文。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailLayoutExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailLayoutExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation Rail standard 与 modal 预览">
    <NavigationRailLayoutExample />
  </DocsPreview>
</ClientOnly>

### `hide-on-collapse`

仅对纵向 `modal` Rail 生效。折叠时 Rail 不占用空间，只显示展开按钮；展开后显示完整面板。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailHideOnCollapseExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailHideOnCollapseExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailHideOnCollapseExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation Rail 隐藏折叠预览">
    <NavigationRailHideOnCollapseExample />
  </DocsPreview>
</ClientOnly>

### 横向复用为 Navigation Bar

设置 `orientation="horizontal"` 后，组件使用 Navigation Bar 的横向布局。`expanded` 仅控制 Item 是否采用左图标右标签，不显示 Rail 展开按钮；`layout` 和 `hide-on-collapse` 在横向时不生效。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailHorizontalExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailHorizontalExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation Bar 横向复用预览">
    <NavigationRailHorizontalExample />
  </DocsPreview>
</ClientOnly>

### `fab` 与 `end` Slots

`fab` Slot 用于纵向 Rail 的 FAB 或 Extended FAB；`end` Slot 用于尾部自定义按钮或其他内容。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailSlotsExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation Rail fab 与 end Slot 预览">
    <NavigationRailSlotsExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

#### `MatNavigationRail`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | 纵向 Navigation Rail 或横向 Navigation Bar |
| `expanded` | `boolean` | `false` | 受控展开状态，支持 `v-model:expanded` |
| `collapsible` | `boolean` | `false` | 纵向显示展开/折叠按钮；横向忽略 |
| `layout` | `'standard' \| 'modal'` | `'standard'` | 纵向展开布局；standard 占据空间，modal 覆盖正文 |
| `hide-on-collapse` | `boolean` | `false` | 纵向 modal 折叠时隐藏 Rail，仅保留展开按钮 |
| `selected` | `string \| number \| boolean \| null` | `null` | 父组件控制的当前 Item `value` |
| `open-icon` | `string` | `'menu'` | 折叠状态下展开按钮的图标 |
| `close-icon` | `string` | `'menu_open'` | 展开状态下折叠按钮的图标 |
| `open-label` | `string` | `'展开导航'` | 展开按钮的无障碍名称 |
| `close-label` | `string` | `'收起导航'` | 折叠按钮的无障碍名称 |

#### `MatNavigationRailItem`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | `undefined` | 供父组件匹配 `selected`；省略时不会成为选中项 |
| `icon` | `string` | `undefined` | Material Symbols 图标名称 |
| `href` | `string` | `undefined` | 提供后渲染为链接 |
| `disabled` | `boolean` | `false` | 禁用交互并降低内容强调 |

Label 使用 Item 默认 Slot，可省略。省略 Label 时必须通过 `aria-label` 为图标模式提供可访问名称。

组件没有公开方法。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatNavigationRail` | `update:expanded` | `boolean` | 展开按钮被激活或 Modal Rail 按下 Escape |
| `MatNavigationRail` | `select` | `{ value, selected, nextSelected, originalEvent }` | 带 `value` 且未禁用的 Item 被激活；组件不会修改 `selected` |
| `MatNavigationRailItem` | `click` | `MouseEvent` | Item 被激活 |

## Slots

| 名称 | 组件 | 内容约束 |
| --- | --- | --- |
| 默认 | `MatNavigationRail` | `MatNavigationRailItem` 列表 |
| `fab` | `MatNavigationRail` | FAB 或 Extended FAB；纵向显示，Slot 参数为 `{ expanded }` |
| `end` | `MatNavigationRail` | 自定义按钮或其他尾部内容；Slot 参数为 `{ expanded, orientation }` |
| 默认 | `MatNavigationRailItem` | Item 标签，可省略 |

## 无障碍与布局说明

根节点使用 `<nav>` 和 `aria-orientation`。选中且带 `value` 的链接或按钮使用 `aria-current="page"`。Rail 不接管页面焦点；子 Item 保持原生按钮或链接的 Tab 顺序。

Modal Rail 是所在布局容器内的覆盖层，不会移动到 `body`，使用时应让外层容器提供需要的高度。折叠 Rail 按 Material 指南保持可见；只有启用 `hide-on-collapse` 时才会进入隐藏折叠模式。

## 参考来源

布局、展开行为、standard/modal 与隐藏折叠依据 Material 3 [Navigation rail overview](https://m3.material.io/components/navigation-rail/overview)、[Navigation rail specs](https://m3.material.io/components/navigation-rail/specs) 和 [Navigation rail guidelines](https://m3.material.io/components/navigation-rail/guidelines)。横向布局依据 [Navigation bar specs](https://m3.material.io/components/navigation-bar/specs)。

<script setup>
import NavigationRailBasicExample from '../examples/navigation-rail/NavigationRailBasicExample.vue';
import NavigationRailCollapsibleExample from '../examples/navigation-rail/NavigationRailCollapsibleExample.vue';
import NavigationRailHideOnCollapseExample from '../examples/navigation-rail/NavigationRailHideOnCollapseExample.vue';
import NavigationRailHorizontalExample from '../examples/navigation-rail/NavigationRailHorizontalExample.vue';
import NavigationRailLayoutExample from '../examples/navigation-rail/NavigationRailLayoutExample.vue';
import NavigationRailSlotsExample from '../examples/navigation-rail/NavigationRailSlotsExample.vue';
</script>
