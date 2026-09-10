---
title: Navigation rail 导航栏
description: mat-navigation-rail 的 Material 3 Expressive 纵向导航栏。
llms: true
order: 105
---

# Navigation rail 导航栏

## 组件简介

`<mat-navigation-rail>` 的组件导出名是 `MatNavigationRail`，配套子项组件 `<mat-navigation-rail-item>`（`MatNavigationRailItem`）或通用导航子项 `<mat-navigation-item>`（`MatNavigationItem`）。该组件遵循 Material 3 Expressive 规范，专用于在平板、桌面等中大尺寸屏幕中提供 3–7 个主要目的地、菜单入口、FAB 与底部操作的纵向导航栏。

组件底层根元素基于 `MatAside` 呈现，默认停靠在布局容器的 `start`（起始侧）边缘，统管侧边定位、安全区留白、展开收起动画和模态遮罩。位于 `MatAppRoot` 或 `MatLayout` 内时会自动向最近的根登记起始侧边缘，主内容层自动避让；组件树中同时存在两个根时不会重复登记。AppRoot 只额外提供覆盖层、Snackbar、布局尺寸和边缘上下文等应用能力，不改变 Navigation rail 的停靠规则。

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

### NavigationItem 的 `badge`

`MatNavigationRailItem` 提供一等 `badge` 属性，将 Badge 固定绑定到 Item 的图标区域。收缩态显示 Badge 指示器，展开态保留图标布局但隐藏指示器，因此不会影响标签、活动指示器、`trailing` 或完整点击区域。`content` 支持数字（包括 `0`），空字符串不显示；设置 `dot` 时优先显示点型 Badge。

Badge 不提供专用 Slot，也不支持 `offset`。`location` 只接受八种覆盖位置；传入 `inline` 会在开发环境发出警告，并按 `top-end` 处理。没有图标时，收缩态会使用 Item 原有的圆形占位图标作为 Badge 目标。Badge 指示器是不可交互的 `aria-hidden` 内容，不会自动加入 Item 的无障碍名称。示例为了让展开态 Badge 继续显示，在标签内容后单独组合通用 `MatBadge location="inline"`；这不属于 NavigationItem 的 `badge` 属性能力。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailItemBadgeExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailItemBadgeExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailItemBadgeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail Item Badge 预览">
    <NavigationRailItemBadgeExample />
  </DocsPreview>
</ClientOnly>

### AppRoot 与 Layout 自动接入

Navigation rail 在 `MatLayout` 或 `MatAppRoot` 内统一登记 `start` 边缘，并让正文自动避让。无论组件位于哪一种布局根内，使用方式和停靠行为都相同；组件不再提供 `app` 属性。若明确选择 `mode="fixed"`，仍可使用 `attach` 指定 Teleport 目标，这与 `MatAside` 的固定模式一致。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailAppExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailAppExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailAppExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 自动接入预览">
    <NavigationRailAppExample />
  </DocsPreview>
</ClientOnly>

### `placeholder`

`placeholder` 只在 `layout="modal"` 时有效。modal rail 不登记根布局边缘，启用 placeholder 后会在声明位置按实际 rail 尺寸保留空间；standard rail 使用最近 `MatLayout` 或 `MatAppRoot` 的 padding，不需要 placeholder。

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

### `collapsible` 与 `expanded`

`collapsible` 支持纵向 rail 折叠展开能力，`expanded` 支持 `v-model:expanded`。组件不再自带内置菜单按钮，使用方可直接在默认 Slot 混排自定义按钮进行切换，不添加则不显示。collapsed Item 为图标上、标签下；expanded Item 的图标与标签位于同一个 56px 高活动指示器中。

展开与收回时，Item 下方的标签渐隐，活动指示器尺寸、Item 高度与间距平滑过渡（展开态 Item 之间间距为 0），展开状态的标签在指示器内逐渐出现；trailing 内容通过弹性 spacer 保持在 Item 尾部。standard rail 的实际宽度变化会同步更新最近根的 padding；多个同向 rail 的总占位和后续 rail 偏移也会随展开、收缩、隐藏和重新打开重新计算。

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

### `full-width`

在 `MatNavigationRail` 上设置 `full-width` 后，全部直接子级 NavigationItem 的活动指示器会在展开态铺满可用宽度，两端保留展开侧边距；默认指示器只贴合图标与标签的内容宽度。启用时，展开态指示器内图标与标签的间距增加到 12px，避免逐项重复配置。

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

### `alignment`

`alignment` 使用 `start`、`center`、`end` 控制默认 Slot 在主轴上的位置。纵向模式在固定 Header/FAB 和 `end` 之间的剩余高度内对齐；横向模式沿水平方向对齐 NavigationItem。内容溢出时安全回退到起始位置，确保滚动起点可达。参与正文排版的 standard rail 使用 default spatial 尺寸过渡；modal 只覆盖正文，不额外改变正文宽度。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailAlignmentExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailAlignmentExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailAlignmentExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 默认内容对齐预览">
    <NavigationRailAlignmentExample />
  </DocsPreview>
</ClientOnly>

### `layout="standard"` 与 `layout="modal"`

`standard` expanded rail 位于正文旁并占据布局空间。`modal` expanded rail 保留 collapsed rail 的布局宽度，在其布局容器内覆盖正文，并显示可点击遮罩；点击遮罩或按 Escape 会请求收起。下方示例默认收起 modal rail，点击“打开模态导航”后查看覆盖正文的效果。

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

### 内容混排与弹性布局

菜单按钮、FAB、导航项与底部操作统一在默认 Slot 中混排。导航项本身无左右内边距，容器两侧的 16px 留白统一由父容器提供，使 FAB、按钮、分割线等各类混排元素都能获得一致的标准容器内边距。默认 Slot 暴露 `{ expanded: currentExpanded, orientation }` 作用域参数；结合 `<mat-spacer />` 可轻松将底部操作推至末尾。

Material Design 规范推荐间距：
- **菜单按钮与 FAB 之间**：推荐保持 **12px** 间距（`--mat-navigation-rail-header-gap`）。
- **菜单按钮 / FAB 与导航项之间**：推荐保持 **40px** 间距（`--mat-navigation-rail-header-content-space`）。
- **导航项之间**：收起态为 **4px**（`--mat-navigation-rail-item-space`），展开态为 **0px**。
- **导航项与底部操作之间**：插入 `<mat-spacer />` 自动填充剩余可用空间。

组件样式内置智能相邻选择器，当检测到菜单按钮与 FAB、或 FAB/按钮与导航项紧邻时会自动注入对应的 12px 与 40px 间距，用户亦可通过 inline style 显式指定。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailSlotsExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailSlotsExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail Header 与 FAB 预览">
    <NavigationRailSlotsExample />
  </DocsPreview>
</ClientOnly>

### 顶部元素间距与规范

纵向容器顶部固定保留 44px 留白。在默认 Slot 混排菜单按钮、FAB 与导航项时，组件会自动保持 M3 规范的 12px 与 40px 间隙。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailHeaderSpacingExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailHeaderSpacingExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 顶部内容组合预览">
    <NavigationRailHeaderSpacingExample />
  </DocsPreview>
</ClientOnly>

### `container-color`

`container-color` 默认关闭。开启后，standard Rail 的容器背景改用与 `layout="modal"` 相同的语义色；`layout="modal"` 本身始终使用 modal 语义色，不受该属性影响。下方示例在同一个 standard Rail 上切换该属性，以便观察容器色变化。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-rail/NavigationRailContainerColorExample.vue#template [template]

<<< @/examples/navigation-rail/NavigationRailContainerColorExample.vue#script [script]

<<< @/examples/navigation-rail/NavigationRailContainerColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Navigation rail 容器语义色预览">
    <NavigationRailContainerColorExample />
  </DocsPreview>
</ClientOnly>

### Item 的 `trailing` Slot

Item 的 `trailing` 只在展开态显示。在 `full-width` 激活时（如导航抽屉或开启 `full-width` 的 Rail），trailing 内容置于活动指示器内部，选中的高亮背景与交互状态层完整包含 trailing 内容，使折叠展开箭头或操作图标与按钮背景视觉融为一体；未激活 `full-width` 时，保持原先处理，置于指示器外部的本行末尾。Slot 参数为 `{ expanded, selected }`。折叠态 rail 宽度不足，trailing 不渲染。

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

### MatNavigationRail 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `string \| number \| boolean \| null` | `null` | 受控的当前 Item `value`，支持 `v-model` |
| `expanded` | `boolean` | `false` | 受控展开状态，支持 `v-model:expanded`；horizontal 模式中决定纵向或横向 Item 排列 |
| `width` | `number \| string` | `undefined` | expanded rail 宽度；数字与纯数字字符串按 px 处理（0 不带单位），其他字符串需为 trim 后合法的 CSS 宽度值，非法时使用默认宽度 |
| `full-width` | `boolean` | `false` | 仅展开态有效；让全部 Item 的活动指示器铺满可用宽度 |
| `collapsible` | `boolean` | `false` | 开启纵向 rail 折叠展开能力；不再自带内置菜单按钮，需自行从 slot 混排添加或外部受控 |
| `layout` | `'standard' \| 'modal'` | `'standard'` | 纵向 expanded rail 占据空间或覆盖正文 |
| `hide-on-collapse` | `boolean` | `false` | 未展开时隐藏 rail 容器（宽度置为 0） |
| `mode` | `'docked' \| 'flow' \| 'sticky' \| 'fixed'` | `undefined` | 排布与定位模式；省略时在最近 Layout/AppRoot 中自动 docked，其他场景保留 Aside 的 flow 行为 |
| `alignment` | `'start' \| 'center' \| 'end'` | `'start'` | 默认 Slot 沿主轴对齐；纵向按剩余高度对齐，横向按可用宽度对齐 |
| `open-icon` | `string` | `'menu'` | 未展开时的菜单按钮图标 |
| `close-icon` | `string` | `'menu_open'` | 展开时的菜单按钮图标 |
| `open-label` | `string` | `'展开导航'` | 未展开时菜单按钮的无障碍名称 |
| `attach` | `string \| HTMLElement` | `undefined` | 仅 `mode="fixed"` 时指定 Teleport 目标；省略时保留在声明位置 |
| `placeholder` | `boolean` | `false` | 仅 `layout="modal"` 有效；在声明位置为 modal rail 预留实际尺寸，standard rail 使用最近根的 padding |
| `bordered` | `boolean` | `false` | 是否复用 Aside 的边框修饰，在面向内容的一侧渲染 1px 细边框 |
| `container-color` | `boolean` | `false` | 非 modal 布局使用与 modal 相同的容器背景语义色；modal 布局始终使用 modal 语义色 |
| `open` | `boolean` | `undefined` | 受控显示/隐藏状态，支持 `v-model:open`；省略时遵循 `hide-on-collapse` 或 `modal` 模式与 `expanded` 联动 |

### MatNavigationRailItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | `undefined` | 供父组件匹配 `model-value`；省略时不参与受控选择 |
| `icon` | `string` | `undefined` | Material Symbols 图标名称；`icon` Slot 存在时忽略。缺省或空字符串在展开态不占空间，收缩态使用圆点占位 |
| `badge` | `{ content?: string \| number, dot?: boolean, location?: 'top-start' \| 'top' \| 'top-end' \| 'end' \| 'bottom-end' \| 'bottom' \| 'bottom-start' \| 'start', color?: string }` | `undefined` | 仅绑定到图标区域的 Badge；收缩态显示、展开态隐藏。`content=0` 有效，空字符串不显示，`dot` 优先；不支持 `inline` 和 `offset`，也不在 `createMatUi.defaults` 中提供默认值 |
| `href` | `string` | `undefined` | 提供后渲染为原生链接，否则渲染为按钮 |
| `disabled` | `boolean` | `false` | 禁用原生交互和选择请求，并降低内容强调 |

组件没有公开方法。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatNavigationRail` | `update:modelValue` | `string \| number \| boolean` | 未禁用、带 `value` 且尚未选中的 Item 被激活 |
| `MatNavigationRail` | `update:expanded` | `boolean` | 菜单按钮、modal 遮罩或 modal 状态下的 Escape 请求改变展开状态 |
| `MatNavigationRail` | `update:open` | `boolean` | 请求切换显示或隐藏状态时触发 |
| `MatNavigationRailItem` | `click` | `MouseEvent` | Item 的原生按钮或链接被激活 |

## Slots

### MatNavigationRail Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 混排菜单按钮、FAB、NavigationItem、NavigationGroup、Spacer 与底部操作。Slot 参数为 `{ expanded, orientation }` |
| `header` | 可选的纵向 rail 顶部品牌标识；Slot 参数为 `{ expanded }` |

### MatNavigationRailItem Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 必填的简短目的地标签；单行显示，超长时隐藏溢出内容 |
| `icon` | 自定义图标内容；Slot 参数为 `{ selected }` |
| `trailing` | 展开态显示在 Item 尾部的内容，通过弹性 spacer 保持在末尾；Slot 参数为 `{ expanded, selected }` |

Badge 通过 `badge` 属性配置，不新增 Badge 专用 Slot。

## 无障碍与布局说明

根导航使用原生 `<nav>`；应用应通过 `aria-label` 或 `aria-labelledby` 区分页面中的多个导航区域。选中 Item 使用 `aria-current="page"`。Item 保留原生按钮或链接的 Tab 顺序，完整 Item 宽度都是命中区域，焦点环和状态层显示在活动指示器上。

默认纵向 rail 位于最近应用布局容器的起始侧，由 `MatLayout` 或 `MatAppRoot` 自动登记并决定滚动边界。AppRoot 模式会统一处理安全区；`layout="modal"` 展开时只用 collapsed host 宽度推动正文，展开表面覆盖正文。不要同时显示 rail 与 bar；compact 窗口使用 bar，medium 及更大窗口根据目的地数量和可用空间选择 rail。横向 bar 不自动监听窗口宽度，应用可读取 AppRoot 断点切换。Item 的 Badge 数量不会自动修改无障碍名称，需要时由应用在 `aria-label` 或关联描述中补充业务语义。

Navigation 使用覆盖整栏的 scroll-area：纵向 Header、具名 FAB 与 `end` 在其中 sticky 固定，默认内容从它们之间滚过；横向 bar 超出可用宽度时沿水平方向滚动。滚动条使用 8px thin 尺寸并贴住容器逻辑末端，纵向容器上下各保留 44px，顶部固定区与默认内容之间保留 40px。

## 参考来源

官方明确规定 collapsed / expanded rail、3–7 个目的地、standard / modal、目的地对齐、Header、FAB、指示器和自适应使用方式，详见 [Navigation rail overview](https://m3.material.io/components/navigation-rail/overview)、[Navigation rail specs](https://m3.material.io/components/navigation-rail/specs) 与 [Navigation rail guidelines](https://m3.material.io/components/navigation-rail/guidelines)。Flexible bar 的 64px 容器和 horizontal items 依据 [Navigation bar specs](https://m3.material.io/components/navigation-bar/specs)。把两种官方组件组合为同一 Vue API 是本项目的实现选择。

<script setup>
import NavigationRailBasicExample from '../examples/navigation-rail/NavigationRailBasicExample.vue';
import NavigationRailAppExample from '../examples/navigation-rail/NavigationRailAppExample.vue';
import NavigationRailCollapsibleExample from '../examples/navigation-rail/NavigationRailCollapsibleExample.vue';
import NavigationRailHideOnCollapseExample from '../examples/navigation-rail/NavigationRailHideOnCollapseExample.vue';
import NavigationRailHeaderSpacingExample from '../examples/navigation-rail/NavigationRailHeaderSpacingExample.vue';
import NavigationRailLayoutExample from '../examples/navigation-rail/NavigationRailLayoutExample.vue';
import NavigationRailItemFullWidthExample from '../examples/navigation-rail/NavigationRailItemFullWidthExample.vue';
import NavigationRailItemBadgeExample from '../examples/navigation-rail/NavigationRailItemBadgeExample.vue';
import NavigationRailItemTrailingExample from '../examples/navigation-rail/NavigationRailItemTrailingExample.vue';
import NavigationRailAlignmentExample from '../examples/navigation-rail/NavigationRailAlignmentExample.vue';
import NavigationRailPlaceholderExample from '../examples/navigation-rail/NavigationRailPlaceholderExample.vue';
import NavigationRailContainerColorExample from '../examples/navigation-rail/NavigationRailContainerColorExample.vue';
import NavigationRailSlotsExample from '../examples/navigation-rail/NavigationRailSlotsExample.vue';
import NavigationRailWidthExample from '../examples/navigation-rail/NavigationRailWidthExample.vue';
</script>
