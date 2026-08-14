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

纵向 rail 支持 3–7 个主要目的地、可选菜单、Header、FAB 与底部自定义内容。默认在声明位置参与父容器布局；expanded rail 可以使用占据正文空间的 `standard` 布局或覆盖当前布局容器的 `modal` 布局。设置 `app` 后，省略 `attach` 且位于 `MatAppRoot` 内时自动登记应用边缘，否则固定到视口并挂载至 `attach`。横向 bar 适合较小或中等窗口中的少量目的地：`expanded` 为 `false` 时图标在上、标签在下，为 `true` 时使用图标在左、标签在右的固定宽度 Item。

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

### `app` 与 `attach`

`app=true` 将 Navigation rail 作为应用级固定导航。位于 `MatAppRoot` 且省略 `attach` 时，纵向按 `position` 登记 `start`/`end`，horizontal bar 登记 `bottom`；显式 `attach` 时沿用视口固定模式。`app=false` 时 `attach` 不生效，组件保留在声明位置。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailAppExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailAppExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailAppExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 应用挂载预览">
    <NavigationRailAppExample />
  </DocsPreview>
</ClientOnly>

### `placeholder`

`placeholder` 只在 `app=true` 时有效。它在声明位置按实际应用级 rail 或 bar 尺寸保留空间，避免固定导航遮挡相邻正文。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailPlaceholderExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailPlaceholderExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailPlaceholderExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 自然占位预览">
    <NavigationRailPlaceholderExample />
  </DocsPreview>
</ClientOnly>

### `bottomPlaceholder`

`bottomPlaceholder` 只在 `app=true` 时预留底部手势区或安全区。它会抬高纵向 rail 的底部内容，并在 horizontal bar 底部增加同等空间。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailBottomPlaceholderExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailBottomPlaceholderExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailBottomPlaceholderExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 底部安全区预览">
    <NavigationRailBottomPlaceholderExample />
  </DocsPreview>
</ClientOnly>

### `collapsible` 与 `expanded`

`collapsible` 为纵向 rail 添加菜单按钮，`expanded` 支持 `v-model:expanded`。collapsed Item 为图标上、标签下；expanded Item 的图标与标签位于同一个 56px 高活动指示器中。`open-icon` 和 `close-icon` 可以替换菜单按钮图标。

展开与收回时，Item 下方的标签渐隐，活动指示器尺寸、Item 高度与间距平滑过渡（展开态 Item 之间间距为 0），展开状态的标签在指示器内逐渐出现；trailing 内容通过弹性 spacer 保持在 Item 尾部。

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

### `width`

`width` 只影响 expanded rail 的行内宽度。数字与纯数字字符串按像素处理（0 不带单位）；其他字符串需为 trim 后合法的 CSS 宽度值，因此可以使用 `clamp()`、`min()` 或百分比等现代 CSS 表达式。未传入或非法时使用组件默认宽度。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailWidthExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailWidthExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailWidthExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 自定义展开宽度预览">
    <NavigationRailWidthExample />
  </DocsPreview>
</ClientOnly>

### `full-width`（Item）

`full-width` 只作用于展开态 Item：活动指示器铺满 Item 可用宽度，两端保留展开侧边距；默认指示器只贴合图标与标签的内容宽度。设置 `full-width` 时，展开态指示器内图标与标签的间距增加到 12px。适合让展开后的目的地呈现等宽、更强的选中区域。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailItemFullWidthExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailItemFullWidthExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailItemFullWidthExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail full-width 预览">
    <NavigationRailItemFullWidthExample />
  </DocsPreview>
</ClientOnly>

### `position`

`position="start"` 使 Item 在每种状态下贴近起始侧；`position="end"` 使其贴近末尾侧。展开、收回及横向布局切换时，Item 不会先移动到中心再播放动画。参与正文排版的 standard rail 使用 default spatial 尺寸过渡；modal 只覆盖正文，不额外改变正文宽度。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailPositionExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailPositionExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailPositionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 固定侧对齐预览">
    <NavigationRailPositionExample />
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

沉浸式布局可以隐藏 expanded rail 的容器，同时在布局起始侧保留菜单按钮。收起时 expanded 内容会保留到宽度退出动画完成，随后才从 DOM 移除。该配置不会把普通 collapsed rail 作为可隐藏变体；应仅与可展开的导航入口组合使用。

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

设置 `orientation="horizontal"` 后使用 Flexible navigation bar。`expanded` 为 `false` 时显示 80px 高的图标上、标签下 Item；`expanded` 为 `true` 时显示 64px 高的图标左、标签右 Item。此模式仍忽略 `collapsible`、`layout`、`hide-on-collapse`、`alignment`、Header、FAB 和 `end`。

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

### Header、FAB 与底部内容 Slots

Header、菜单和 FAB 始终位于纵向 rail 顶部。Header 适合非交互品牌标识；不要把容易被误认为按钮的图形放入其中。FAB 应位于目的地之前；`end` 则固定在 rail 底部，适合帮助、设置或账户操作等自定义元素。

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

### Item 的 `trailing` Slot

Item 的 `trailing` 只在展开态显示，通过前置弹性 spacer 保持在 Item 尾部，并随 Item 宽度动画始终锚定在末尾；trailing 前后分别保留 12px 与 8px 间距，后部间距与展开侧边距合计在 rail 尾部空出 24px。适合放置徽标、状态图标或快捷键；Slot 参数为 `{ expanded, selected }`。折叠态 rail 宽度不足，trailing 不渲染。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailItemTrailingExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailItemTrailingExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailItemTrailingExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail Item trailing 预览">
    <NavigationRailItemTrailingExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

#### `MatNavigationRail`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `string \| number \| boolean \| null` | `null` | 受控的当前 Item `value`，支持 `v-model` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | 纵向 Expressive rail 或 horizontal Flexible navigation bar |
| `expanded` | `boolean` | `false` | 受控展开状态，支持 `v-model:expanded`；horizontal 模式中决定纵向或横向 Item 排列 |
| `width` | `number \| string` | `undefined` | expanded rail 宽度；数字与纯数字字符串按 px 处理（0 不带单位），其他字符串需为 trim 后合法的 CSS 宽度值，非法时使用默认宽度 |
| `position` | `'start' \| 'end'` | `'start'` | Item 在展开、收回和横向切换期间固定在起始或末尾侧，避免从居中位置开始动画 |
| `collapsible` | `boolean` | `false` | 为纵向 rail 显示展开/收起菜单按钮 |
| `layout` | `'standard' \| 'modal'` | `'standard'` | 纵向 expanded rail 占据空间或覆盖正文 |
| `hide-on-collapse` | `boolean` | `false` | 未展开时隐藏 rail 容器并保留菜单按钮 |
| `alignment` | `'top' \| 'center'` | `'top'` | 纵向目的地组靠上或居中；菜单、Header 与 FAB 始终靠上 |
| `open-icon` | `string` | `'menu'` | 未展开时的菜单按钮图标 |
| `close-icon` | `string` | `'menu_open'` | 展开时的菜单按钮图标 |
| `open-label` | `string` | `'展开导航'` | 未展开时菜单按钮的无障碍名称 |
| `close-label` | `string` | `'收起导航'` | 展开时菜单按钮和 modal 遮罩的无障碍名称 |
| `app` | `boolean` | `false` | 开启应用布局模式；位于 `MatAppRoot` 且省略 `attach` 时自动登记边缘，否则固定到显式目标 |
| `attach` | `string \| HTMLElement` | `'body'` | `app=true` 时的显式 Teleport 目标；一旦显式提供就优先于 AppRoot 自动接入 |
| `placeholder` | `boolean` | `false` | 仅 `app=true` 有效；在声明位置为固定 rail 或 bar 预留实际尺寸 |
| `bottom-placeholder` | `number \| string` | `0` | 仅 `app=true` 有效；数字与纯数字字符串按 px 处理，其他字符串需为 trim 后合法的 CSS block-size 值（如 `env(safe-area-inset-bottom)` 或 `calc(...)`），非法时回退 0 |

#### `MatNavigationRailItem`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | `undefined` | 供父组件匹配 `model-value`；省略时不参与受控选择 |
| `icon` | `string` | `undefined` | Material Symbols 图标名称；`icon` Slot 存在时忽略 |
| `href` | `string` | `undefined` | 提供后渲染为原生链接，否则渲染为按钮 |
| `disabled` | `boolean` | `false` | 禁用原生交互和选择请求，并降低内容强调 |
| `full-width` | `boolean` | `false` | 仅展开态有效；活动指示器铺满 Item 可用宽度，默认贴合内容 |

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
| `end` | `MatNavigationRail` | 纵向 rail 底部的自定义内容；Slot 参数为 `{ expanded }` |
| 默认 | `MatNavigationRailItem` | 必填的简短目的地标签；单行显示，超长时以省略号截断 |
| `icon` | `MatNavigationRailItem` | 自定义图标内容；Slot 参数为 `{ selected }` |
| `trailing` | `MatNavigationRailItem` | 展开态显示在 Item 尾部的内容，通过弹性 spacer 保持在末尾；Slot 参数为 `{ expanded, selected }` |

## 无障碍与布局说明

根导航使用原生 `<nav>`；应用应通过 `aria-label` 或 `aria-labelledby` 区分页面中的多个导航区域。选中 Item 使用 `aria-current="page"`。Item 保留原生按钮或链接的 Tab 顺序，完整 Item 宽度都是命中区域，焦点环和状态层显示在活动指示器上。

默认纵向 rail 位于应用布局容器的起始侧，由父容器决定滚动边界；需要作为固定应用导航时设置 `app`。AppRoot 模式会统一处理安全区；`layout="modal"` 展开时只用 collapsed host 宽度推动正文，展开表面覆盖正文。不要同时显示 rail 与 bar；compact 窗口使用 bar，medium 及更大窗口根据目的地数量和可用空间选择 rail。横向 bar 不自动监听窗口宽度，应用可读取 AppRoot 断点切换。显式 `attach` 无法解析时组件给出警告且不渲染应用布局。

## 参考来源

官方明确规定 collapsed / expanded rail、3–7 个目的地、standard / modal、目的地对齐、Header、FAB、指示器和自适应使用方式，详见 [Navigation rail overview](https://m3.material.io/components/navigation-rail/overview)、[Navigation rail specs](https://m3.material.io/components/navigation-rail/specs) 与 [Navigation rail guidelines](https://m3.material.io/components/navigation-rail/guidelines)。Flexible bar 的 64px 容器和 horizontal items 依据 [Navigation bar specs](https://m3.material.io/components/navigation-bar/specs)。把两种官方组件组合为同一 Vue API 是本项目的实现选择。

<script setup>
import NavigationRailBasicExample from '../examples/navigation-rail/NavigationRailBasicExample.vue';
import NavigationRailAppExample from '../examples/navigation-rail/NavigationRailAppExample.vue';
import NavigationRailBottomPlaceholderExample from '../examples/navigation-rail/NavigationRailBottomPlaceholderExample.vue';
import NavigationRailCollapsibleExample from '../examples/navigation-rail/NavigationRailCollapsibleExample.vue';
import NavigationRailHideOnCollapseExample from '../examples/navigation-rail/NavigationRailHideOnCollapseExample.vue';
import NavigationRailHorizontalExample from '../examples/navigation-rail/NavigationRailHorizontalExample.vue';
import NavigationRailLayoutExample from '../examples/navigation-rail/NavigationRailLayoutExample.vue';
import NavigationRailItemFullWidthExample from '../examples/navigation-rail/NavigationRailItemFullWidthExample.vue';
import NavigationRailItemTrailingExample from '../examples/navigation-rail/NavigationRailItemTrailingExample.vue';
import NavigationRailPositionExample from '../examples/navigation-rail/NavigationRailPositionExample.vue';
import NavigationRailPlaceholderExample from '../examples/navigation-rail/NavigationRailPlaceholderExample.vue';
import NavigationRailSlotsExample from '../examples/navigation-rail/NavigationRailSlotsExample.vue';
import NavigationRailWidthExample from '../examples/navigation-rail/NavigationRailWidthExample.vue';
</script>
