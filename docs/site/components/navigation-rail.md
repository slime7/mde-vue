---
title: Navigation 导航
description: mat-navigation-rail 的 Expressive collapsed/expanded rail 与 horizontal flexible navigation bar。
llms: true
order: 105
---

# Navigation 导航

## 组件简介

`<mat-navigation-rail>` 的组件导出名是 `MatNavigationRail`，`<mat-navigation-rail-item>` 的组件导出名是 `MatNavigationRailItem`。这组组件组合两种外观相近的 Material 3 Expressive 导航：默认的纵向 collapsed / expanded Navigation rail，以及 `orientation="horizontal"` 的 Flexible navigation bar。

官方把 Navigation rail 和 Navigation bar 定义为独立组件。本组件为减少重复 API 暂时组合两者，但仍保持规范边界：纵向模式只实现 rail；横向模式只实现 Navigation bar 的 horizontal items，不提供 vertical navigation bar，也不把横向模式称为 Navigation rail。

纵向 rail 支持 3–7 个主要目的地、可选菜单、Header 与 FAB。collapsed rail 保持可见；expanded rail 可以使用占据正文空间的 `standard` 布局或覆盖正文的 `modal` 布局。横向 bar 适合较小或中等窗口中的少量目的地，始终使用图标左、标签右的固定宽度 Item。

## 示例

### 基础导航与受控选择

`v-model` 保存当前目的地，Item 的 `value` 用于匹配选中状态。选中目的地使用填充图标、活动指示器和更醒目的标签颜色。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailBasicExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailBasicExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 基础导航预览">
    <NavigationRailBasicExample />
  </DocsPreview>
</ClientOnly>

### `collapsible` 与 `expanded`

`collapsible` 为纵向 rail 添加菜单按钮，`expanded` 支持 `v-model:expanded`。collapsed Item 为图标上、标签下；expanded Item 的图标与标签位于同一个 56px 高活动指示器中。`open-icon` 和 `close-icon` 可以替换菜单按钮图标。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailCollapsibleExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailCollapsibleExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailCollapsibleExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 展开与折叠预览">
    <NavigationRailCollapsibleExample />
  </DocsPreview>
</ClientOnly>

### `layout="standard"` 与 `layout="modal"`

`standard` expanded rail 位于正文旁并占据布局空间。`modal` expanded rail 保留 collapsed rail 的布局宽度，在其布局容器内覆盖正文，并显示可点击遮罩；点击遮罩或按 Escape 会请求收起。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailLayoutExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailLayoutExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailLayoutExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail standard 与 modal 预览">
    <NavigationRailLayoutExample />
  </DocsPreview>
</ClientOnly>

### `hide-on-collapse`

沉浸式布局可以隐藏 expanded rail 的容器，同时在布局起始侧保留菜单按钮。该配置不会把普通 collapsed rail 作为可隐藏变体；应仅与可展开的导航入口组合使用。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailHideOnCollapseExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailHideOnCollapseExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailHideOnCollapseExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="隐藏 expanded rail 预览">
    <NavigationRailHideOnCollapseExample />
  </DocsPreview>
</ClientOnly>

### Horizontal flexible Navigation bar

设置 `orientation="horizontal"` 后使用 64px 高的 Flexible navigation bar，并只提供 horizontal items。此模式忽略 `expanded`、`collapsible`、`layout`、`hide-on-collapse`、`alignment`、Header 和 FAB。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailHorizontalExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailHorizontalExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailHorizontalExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Horizontal flexible Navigation bar 预览">
    <NavigationRailHorizontalExample />
  </DocsPreview>
</ClientOnly>

### Header 与 FAB Slots

Header、菜单和 FAB 始终位于纵向 rail 顶部。Header 适合非交互品牌标识；不要把容易被误认为按钮的图形放入其中。FAB 应位于目的地之前。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailSlotsExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail Header 与 FAB 预览">
    <NavigationRailSlotsExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

#### `MatNavigationRail`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `string \| number \| boolean \| null` | `null` | 受控的当前 Item `value`，支持 `v-model` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | 纵向 Expressive rail 或 horizontal Flexible navigation bar |
| `expanded` | `boolean` | `false` | 纵向 rail 的受控展开状态，支持 `v-model:expanded` |
| `collapsible` | `boolean` | `false` | 为纵向 rail 显示展开/收起菜单按钮 |
| `layout` | `'standard' \| 'modal'` | `'standard'` | 纵向 expanded rail 占据空间或覆盖正文 |
| `hide-on-collapse` | `boolean` | `false` | 未展开时隐藏 rail 容器并保留菜单按钮 |
| `alignment` | `'top' \| 'center'` | `'top'` | 纵向目的地组靠上或居中；菜单、Header 与 FAB 始终靠上 |
| `open-icon` | `string` | `'menu'` | 未展开时的菜单按钮图标 |
| `close-icon` | `string` | `'menu_open'` | 展开时的菜单按钮图标 |
| `open-label` | `string` | `'展开导航'` | 未展开时菜单按钮的无障碍名称 |
| `close-label` | `string` | `'收起导航'` | 展开时菜单按钮和 modal 遮罩的无障碍名称 |

#### `MatNavigationRailItem`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | `undefined` | 供父组件匹配 `model-value`；省略时不参与受控选择 |
| `icon` | `string` | `undefined` | Material Symbols 图标名称；`icon` Slot 存在时忽略 |
| `href` | `string` | `undefined` | 提供后渲染为原生链接，否则渲染为按钮 |
| `disabled` | `boolean` | `false` | 禁用原生交互和选择请求，并降低内容强调 |

组件没有公开方法。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatNavigationRail` | `update:modelValue` | `string \| number \| boolean` | 未禁用、带 `value` 且尚未选中的 Item 被激活 |
| `MatNavigationRail` | `update:expanded` | `boolean` | 菜单按钮、modal 遮罩或 modal 状态下的 Escape 请求改变展开状态 |
| `MatNavigationRailItem` | `click` | `MouseEvent` | Item 的原生按钮或链接被激活 |

## Slots

| 名称 | 组件 | 内容约束 |
| --- | --- | --- |
| 默认 | `MatNavigationRail` | `MatNavigationRailItem` 列表；Slot 参数为 `{ expanded, orientation }` |
| `header` | `MatNavigationRail` | 纵向 rail 顶部的非交互品牌标识；Slot 参数为 `{ expanded }` |
| `fab` | `MatNavigationRail` | 纵向 rail 顶部、目的地之前的 FAB 或 Extended FAB；Slot 参数为 `{ expanded }` |
| 默认 | `MatNavigationRailItem` | 必填的简短目的地标签；避免截断，必要时最多换为两行 |
| `icon` | `MatNavigationRailItem` | 自定义图标内容；Slot 参数为 `{ selected }` |

## 无障碍与布局说明

根导航使用原生 `<nav>`；应用应通过 `aria-label` 或 `aria-labelledby` 区分页面中的多个导航区域。选中 Item 使用 `aria-current="page"`。Item 保留原生按钮或链接的 Tab 顺序，完整 Item 宽度都是命中区域，焦点环和状态层显示在活动指示器上。

纵向 rail 应位于窗口或应用布局的起始侧，并保持固定，不随正文纵向滚动。不要同时显示 rail 与 bar；compact 窗口使用 bar，medium 及更大窗口根据目的地数量和可用空间选择 rail。横向 bar 只负责组件外观，不自动监听窗口宽度，应用负责在断点处切换。

## 参考来源

官方明确规定 collapsed / expanded rail、3–7 个目的地、standard / modal、目的地对齐、Header、FAB、指示器和自适应使用方式，详见 [Navigation rail overview](https://m3.material.io/components/navigation-rail/overview)、[Navigation rail specs](https://m3.material.io/components/navigation-rail/specs) 与 [Navigation rail guidelines](https://m3.material.io/components/navigation-rail/guidelines)。Flexible bar 的 64px 容器和 horizontal items 依据 [Navigation bar specs](https://m3.material.io/components/navigation-bar/specs)。把两种官方组件组合为同一 Vue API 是本项目的实现选择。

<script setup>
import NavigationRailBasicExample from '../examples/navigation-rail/NavigationRailBasicExample.vue';
import NavigationRailCollapsibleExample from '../examples/navigation-rail/NavigationRailCollapsibleExample.vue';
import NavigationRailHideOnCollapseExample from '../examples/navigation-rail/NavigationRailHideOnCollapseExample.vue';
import NavigationRailHorizontalExample from '../examples/navigation-rail/NavigationRailHorizontalExample.vue';
import NavigationRailLayoutExample from '../examples/navigation-rail/NavigationRailLayoutExample.vue';
import NavigationRailSlotsExample from '../examples/navigation-rail/NavigationRailSlotsExample.vue';
</script>
