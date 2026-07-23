---
title: Menu 菜单
description: mat-menu、mat-menu-group 与 mat-menu-item 的分组、坐标定位、多级展开、键盘焦点和局部配色。
llms: true
order: 95
---

# Menu 菜单

## 组件简介

`<mat-menu>` 的组件导出名是 `MatMenu`，使用原生 Popover API 在 top layer 显示临时操作集合；`<mat-menu-group>` 的组件导出名是 `MatMenuGroup`，以带可选标签的独立表面组织相关操作；`<mat-menu-item>` 的组件导出名是 `MatMenuItem`，渲染原生按钮和 `menuitem` 语义。Menu 支持 standard、vibrant 配色、expressive 间隙分组、多级子菜单、局部 `color`、循环键盘焦点、元素锚点换边和右键坐标定位。

## 示例

根菜单通过普通 `v-model` 控制显示状态，并使用元素 id、`activator` Slot 或视口坐标形式的 `anchor` 定位。触发器只保留展示菜单所需的点击状态。

### `modelValue` 与元素 `anchor`

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuOpenAnchorExample.vue#template [template]

<<< @/examples/menu/MenuOpenAnchorExample.vue#script [script]

<<< @/examples/menu/MenuOpenAnchorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu modelValue 与元素 anchor 预览">
    <MenuOpenAnchorExample />
  </DocsPreview>
</ClientOnly>

### `activator` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuActivatorSlotExample.vue#template [template]

<<< @/examples/menu/MenuActivatorSlotExample.vue#script [script]

<<< @/examples/menu/MenuActivatorSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu activator Slot 预览">
    <MenuActivatorSlotExample />
  </DocsPreview>
</ClientOnly>

### MatMenuGroup 分组与 `label`

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuGroupExample.vue#template [template]

<<< @/examples/menu/MenuGroupExample.vue#script [script]

<<< @/examples/menu/MenuGroupExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="MenuGroup 分组与 label 预览">
    <MenuGroupExample />
  </DocsPreview>
</ClientOnly>

### 右键坐标菜单

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuContextExample.vue#template [template]

<<< @/examples/menu/MenuContextExample.vue#script [script]

<<< @/examples/menu/MenuContextExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu 右键坐标预览">
    <MenuContextExample />
  </DocsPreview>
</ClientOnly>

坐标使用鼠标事件的 `[clientX, clientY]`，表示当前视口中的位置。示例先聚焦右键目标，以便菜单关闭后恢复焦点。

### `offset`

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuOffsetExample.vue#template [template]

<<< @/examples/menu/MenuOffsetExample.vue#script [script]

<<< @/examples/menu/MenuOffsetExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu offset 预览">
    <MenuOffsetExample />
  </DocsPreview>
</ClientOnly>

### `closeOnClick`

`closeOnClick` 默认为 `true`，启用时叶子项目被点击后关闭整条菜单链。设为 `false` 时，该菜单中的叶子项目只触发 `click`，菜单保持开启。每个嵌套的 MatMenu 独立读取自身属性，不继承父菜单设置。

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuCloseOnClickExample.vue#template [template]

<<< @/examples/menu/MenuCloseOnClickExample.vue#script [script]

<<< @/examples/menu/MenuCloseOnClickExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu closeOnClick 预览">
    <MenuCloseOnClickExample />
  </DocsPreview>
</ClientOnly>

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuVariantExample.vue#template [template]

<<< @/examples/menu/MenuVariantExample.vue#script [script]

<<< @/examples/menu/MenuVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu variant 预览">
    <MenuVariantExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuColorExample.vue#template [template]

<<< @/examples/menu/MenuColorExample.vue#script [script]

<<< @/examples/menu/MenuColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu color 预览">
    <MenuColorExample />
  </DocsPreview>
</ClientOnly>

### MenuItem 的 `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuItemDisabledExample.vue#template [template]

<<< @/examples/menu/MenuItemDisabledExample.vue#script [script]

<<< @/examples/menu/MenuItemDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="MenuItem disabled 预览">
    <MenuItemDisabledExample />
  </DocsPreview>
</ClientOnly>

### MatMenu 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuDefaultSlotExample.vue#template [template]

<<< @/examples/menu/MenuDefaultSlotExample.vue#script [script]

<<< @/examples/menu/MenuDefaultSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Menu 默认 Slot 预览">
    <MenuDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### MatMenuItem 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuItemDefaultSlotExample.vue#template [template]

<<< @/examples/menu/MenuItemDefaultSlotExample.vue#script [script]

<<< @/examples/menu/MenuItemDefaultSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="MenuItem 默认 Slot 预览">
    <MenuItemDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `leading` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuItemLeadingSlotExample.vue#template [template]

<<< @/examples/menu/MenuItemLeadingSlotExample.vue#script [script]

<<< @/examples/menu/MenuItemLeadingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="MenuItem leading Slot 预览">
    <MenuItemLeadingSlotExample />
  </DocsPreview>
</ClientOnly>

### `supporting` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuItemSupportingSlotExample.vue#template [template]

<<< @/examples/menu/MenuItemSupportingSlotExample.vue#script [script]

<<< @/examples/menu/MenuItemSupportingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="MenuItem supporting Slot 预览">
    <MenuItemSupportingSlotExample />
  </DocsPreview>
</ClientOnly>

### `trailing` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuItemTrailingSlotExample.vue#template [template]

<<< @/examples/menu/MenuItemTrailingSlotExample.vue#script [script]

<<< @/examples/menu/MenuItemTrailingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="MenuItem trailing Slot 预览">
    <MenuItemTrailingSlotExample />
  </DocsPreview>
</ClientOnly>

### `submenu` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/menu/MenuItemSubmenuSlotExample.vue#template [template]

<<< @/examples/menu/MenuItemSubmenuSlotExample.vue#script [script]

<<< @/examples/menu/MenuItemSubmenuSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="MenuItem submenu Slot 预览">
    <MenuItemSubmenuSlotExample />
  </DocsPreview>
</ClientOnly>

Menu 触发器的点击和 ARIA 由调用方控制；嵌套菜单自动以父项目为 anchor，并继承父菜单的配色与形态。

## API

### MatMenu 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 根菜单的受控展开状态，使用普通 `v-model` |
| `anchor` | `string \| [number, number]` | 未设置 | 根菜单触发元素的 id，或 `[clientX, clientY]` 视口坐标；存在 `activator` Slot 时忽略 |
| `offset` | `[number, number]` | `[0, 0]` | 在基础位置之后增加 `[x, y]` 偏移；正值向右、向下 |
| `variant` | `'standard' \| 'vibrant'` | `'standard'` | 中性表面或更高强调的 tertiary 表面 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动项目与 vibrant 表面的局部配色 |
| `closeOnClick` | `boolean` | `true` | 叶子项目点击后是否关闭整条菜单链；设为 `false` 时保持开启 |

字符串 anchor 必须能在当前 document 中找到对应 id。`activator` Slot 存在时优先使用其唯一的 HTMLElement 根节点，并忽略 `anchor`；多根节点或非 HTMLElement 根节点会给出警告并请求关闭。坐标 anchor 使用 fixed 定位，适合 `contextmenu`；坐标或 offset 改变时，已打开的菜单立即重新定位。根菜单缺少有效 anchor 时会请求关闭。嵌套在 `submenu` Slot 中的 MatMenu 自动以父 MatMenuItem 为 anchor，并继承父菜单的 color 与 variant；嵌套菜单显式设置的 color、variant 或 offset 优先，自身 anchor 被忽略。`closeOnClick` 不会继承，父菜单和每个子菜单分别决定其叶子项目是否关闭菜单链。未消费的属性传给 `role="menu"` 的 Popover 根元素。

### MatMenuGroup 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `string` | 未设置 | 可选的可见分组标签，同时作为 `role="group"` 的无障碍名称 |

同一个 MatMenu 的直接子级应统一使用 MatMenuGroup，或统一直接放置 MatMenuItem 与 MatDivider，不混合两种组织方式。两个 Group 之间使用 2px 间隙；每个 Group 保留独立圆角表面和阴影。

### MatMenuItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 禁用原生按钮并从菜单方向键顺序中跳过 |

组件没有 items 数据接口、选择模型、autocomplete、多选能力或公开方法。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatMenu` | `update:modelValue` | `boolean` | 根菜单请求关闭，或浏览器通过 Escape、轻触外部等方式关闭 Popover |
| `MatMenuItem` | `click` | 原生 `MouseEvent` | 启用的叶子项目被激活；`closeOnClick=true` 时随后关闭整条菜单链 |

MatMenuGroup 没有自定义事件。包含 submenu 的项目把点击、Enter、Space 和朝子菜单方向的方向键用于展开，不发出叶子 click。元素锚点菜单关闭后把焦点还给 anchor；坐标菜单恢复打开前的焦点元素。

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatMenu` | `activator` | 唯一的当前 document 中 HTMLElement 根节点，作为根菜单锚点；存在时优先于 `anchor` |
| `MatMenu` | 默认 | 直接放置 MatMenuItem 和 MatDivider，或统一放置 MatMenuGroup |
| `MatMenuGroup` | 默认 | 直接放置 MatMenuItem 和可选 MatDivider |
| `MatMenuItem` | 默认 | 必需的简短操作标签 |
| `MatMenuItem` | `leading` | 20px 图标或简短展示内容 |
| `MatMenuItem` | `supporting` | 标签下方的一行简短辅助文字 |
| `MatMenuItem` | `trailing` | 快捷键或短文本；省略时子菜单项自动显示方向图标 |
| `MatMenuItem` | `submenu` | 直接放置一个 MatMenu；可以继续递归嵌套 |

MenuItem 的 Slots 只构成一个操作，不应嵌套按钮、开关或其他独立交互控件。MatDivider 在 Menu 中自动使用 `role="separator"` 和菜单间距。

## 键盘、定位与关闭

- 打开菜单后焦点进入第一个启用项目。ArrowDown 和 ArrowUp 循环移动并跳过 disabled；Home 和 End 移到首末启用项。
- 在从左到右的页面中，ArrowRight 展开子菜单，ArrowLeft 关闭当前子菜单；从右到左时方向相反。
- Escape 关闭当前层；Tab 关闭整条菜单链并按浏览器正常焦点顺序继续。程序化关闭、菜单操作以及 Popover 的外部或触发器关闭都会保留菜单 200ms 以完成消失动画，嵌套菜单的状态会立即收起。
- 元素锚点菜单优先显示在触发器下方；子菜单优先显示在父项目行内末端。空间不足时自动向上、向左或向右换边，并保留视口间距。坐标菜单以视口坐标为左上基准，超出边缘时向内夹紧。
- `offset` 在基础定位后、视口夹紧前生效。坐标使用 client 坐标，不接受 page/document 坐标；页面滚动后由下一次鼠标事件提供新坐标。
- 菜单宽度限制为 112–280px，内容过高时在菜单内部滚动。容器内边距为 4px，项目和活动高亮高度为 48px，图标为 20px，项目总水平边缘距离为 12px。
- MatMenuGroup 提供 Material 3 expressive 间隙分组；这是本组件库补充的 Web 实现能力，不受 Google 官方 Web 组件暂未提供间隙分组的限制。滚动菜单仍应优先使用 MatDivider，避免间隙削弱连续滚动内容。
- 使用方负责触发器的点击、`aria-haspopup="menu"`、`aria-expanded` 和 `aria-controls`；Menu 不会接管外部按钮的展开逻辑。
- 减少动态效果偏好下关闭展开和形状变化的非必要过渡。

## 参考来源

外观、测量、子菜单和换边规则依据 Material 3 [Menus overview](https://m3.material.io/components/menus/overview)、[Menus specs](https://m3.material.io/components/menus/specs) 与 [Menus guidelines](https://m3.material.io/components/menus/guidelines)。键盘语义参考 [WAI-ARIA Menu and Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)。

<script setup>
import MenuActivatorSlotExample from '../examples/menu/MenuActivatorSlotExample.vue';
import MenuColorExample from '../examples/menu/MenuColorExample.vue';
import MenuCloseOnClickExample from '../examples/menu/MenuCloseOnClickExample.vue';
import MenuContextExample from '../examples/menu/MenuContextExample.vue';
import MenuDefaultSlotExample from '../examples/menu/MenuDefaultSlotExample.vue';
import MenuGroupExample from '../examples/menu/MenuGroupExample.vue';
import MenuItemDefaultSlotExample from '../examples/menu/MenuItemDefaultSlotExample.vue';
import MenuItemDisabledExample from '../examples/menu/MenuItemDisabledExample.vue';
import MenuItemLeadingSlotExample from '../examples/menu/MenuItemLeadingSlotExample.vue';
import MenuItemSubmenuSlotExample from '../examples/menu/MenuItemSubmenuSlotExample.vue';
import MenuItemSupportingSlotExample from '../examples/menu/MenuItemSupportingSlotExample.vue';
import MenuItemTrailingSlotExample from '../examples/menu/MenuItemTrailingSlotExample.vue';
import MenuOpenAnchorExample from '../examples/menu/MenuOpenAnchorExample.vue';
import MenuOffsetExample from '../examples/menu/MenuOffsetExample.vue';
import MenuVariantExample from '../examples/menu/MenuVariantExample.vue';
</script>
