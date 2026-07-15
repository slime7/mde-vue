---
title: Menu 菜单
description: mat-menu 与 mat-menu-item 的 Popover、锚点换边、多级展开、键盘焦点和局部配色。
llms: true
order: 95
---

# Menu 菜单

## 组件简介

`<mat-menu>` 的组件导出名是 `MatMenu`，使用原生 Popover API 在 top layer 显示临时操作集合；`<mat-menu-item>` 的组件导出名是 `MatMenuItem`，渲染原生按钮和 `menuitem` 语义。Menu 支持 standard、vibrant 配色、多级子菜单、局部 `color`、循环键盘焦点和基于 CSS Anchor Positioning 的视口边缘换边。

## 示例

根菜单的 `open` 与 `anchor` 是受控定位所需的必要依赖，触发器只保留展示菜单所需的点击状态。

### `open` 与 `anchor`

::: details 查看示例代码
<<< @/examples/menu/MenuOpenAnchorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Menu open 与 anchor 预览">
    <MenuOpenAnchorExample />
  </DocsPreview>
</ClientOnly>

### `variant`

::: details 查看示例代码
<<< @/examples/menu/MenuVariantExample.vue
:::

<ClientOnly>
  <DocsPreview label="Menu variant 预览">
    <MenuVariantExample />
  </DocsPreview>
</ClientOnly>

### `color`

::: details 查看示例代码
<<< @/examples/menu/MenuColorExample.vue
:::

<ClientOnly>
  <DocsPreview label="Menu color 预览">
    <MenuColorExample />
  </DocsPreview>
</ClientOnly>

### MenuItem 的 `disabled`

::: details 查看示例代码
<<< @/examples/menu/MenuItemDisabledExample.vue
:::

<ClientOnly>
  <DocsPreview label="MenuItem disabled 预览">
    <MenuItemDisabledExample />
  </DocsPreview>
</ClientOnly>

### MatMenu 默认 Slot

::: details 查看示例代码
<<< @/examples/menu/MenuDefaultSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="Menu 默认 Slot 预览">
    <MenuDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### MatMenuItem 默认 Slot

::: details 查看示例代码
<<< @/examples/menu/MenuItemDefaultSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="MenuItem 默认 Slot 预览">
    <MenuItemDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `leading` Slot

::: details 查看示例代码
<<< @/examples/menu/MenuItemLeadingSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="MenuItem leading Slot 预览">
    <MenuItemLeadingSlotExample />
  </DocsPreview>
</ClientOnly>

### `supporting` Slot

::: details 查看示例代码
<<< @/examples/menu/MenuItemSupportingSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="MenuItem supporting Slot 预览">
    <MenuItemSupportingSlotExample />
  </DocsPreview>
</ClientOnly>

### `trailing` Slot

::: details 查看示例代码
<<< @/examples/menu/MenuItemTrailingSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="MenuItem trailing Slot 预览">
    <MenuItemTrailingSlotExample />
  </DocsPreview>
</ClientOnly>

### `submenu` Slot

::: details 查看示例代码
<<< @/examples/menu/MenuItemSubmenuSlotExample.vue
:::

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
| `open` | `boolean` | `false` | 根菜单的受控展开状态，使用 `v-model:open` |
| `anchor` | `string` | 未设置 | 根菜单触发元素的 id；打开时必须能在当前 document 中找到 |
| `variant` | `'standard' \| 'vibrant'` | `'standard'` | 中性表面或更高强调的 tertiary 表面 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动项目与 vibrant 表面的局部配色 |

根菜单使用 `anchor`；嵌套在 `submenu` Slot 中的 MatMenu 自动以父 MatMenuItem 为 anchor，并继承父菜单的 color 与 variant。嵌套菜单显式设置的 color 或 variant 优先。未消费的属性传给 `role="menu"` 的 Popover 根元素。

### MatMenuItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | 禁用原生按钮并从菜单方向键顺序中跳过 |

组件没有 items 数据接口、选择模型、autocomplete、多选能力或公开方法。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatMenu` | `update:open` | `boolean` | 根菜单请求关闭，或浏览器通过 Escape、轻触外部等方式关闭 Popover |
| `MatMenuItem` | `click` | 原生 `MouseEvent` | 启用的叶子项目被激活；随后关闭整条菜单链 |

包含 submenu 的项目把点击、Enter、Space 和朝子菜单方向的方向键用于展开，不发出叶子 click。关闭后，根菜单把焦点还给 anchor 触发器。

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatMenu` | 默认 | 直接放置 MatMenuItem 和 MatDivider |
| `MatMenuItem` | 默认 | 必需的简短操作标签 |
| `MatMenuItem` | `leading` | 20px 图标或简短展示内容 |
| `MatMenuItem` | `supporting` | 标签下方的一行简短辅助文字 |
| `MatMenuItem` | `trailing` | 快捷键或短文本；省略时子菜单项自动显示方向图标 |
| `MatMenuItem` | `submenu` | 直接放置一个 MatMenu；可以继续递归嵌套 |

MenuItem 的 Slots 只构成一个操作，不应嵌套按钮、开关或其他独立交互控件。MatDivider 在 Menu 中自动使用 `role="separator"` 和菜单间距。

## 键盘、定位与关闭

- 打开菜单后焦点进入第一个启用项目。ArrowDown 和 ArrowUp 循环移动并跳过 disabled；Home 和 End 移到首末启用项。
- 在从左到右的页面中，ArrowRight 展开子菜单，ArrowLeft 关闭当前子菜单；从右到左时方向相反。
- Escape 关闭当前层；Tab 关闭整条菜单链并按浏览器正常焦点顺序继续。
- 根菜单优先显示在触发器下方；子菜单优先显示在父项目行内末端。空间不足时自动向上、向左或向右换边，并保留视口间距。
- 菜单宽度限制为 112–280px，内容过高时在菜单内部滚动。项目视觉高度为 44px，指针目标区至少为 48px。
- 使用方负责触发器的点击、`aria-haspopup="menu"`、`aria-expanded` 和 `aria-controls`；Menu 不会接管外部按钮的展开逻辑。
- 减少动态效果偏好下关闭展开和形状变化的非必要过渡。

## 参考来源

外观、测量、子菜单和换边规则依据 Material 3 [Menus overview](https://m3.material.io/components/menus/overview)、[Menus specs](https://m3.material.io/components/menus/specs) 与 [Menus guidelines](https://m3.material.io/components/menus/guidelines)。键盘语义参考 [WAI-ARIA Menu and Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)。

<script setup>
import MenuColorExample from '../examples/menu/MenuColorExample.vue';
import MenuDefaultSlotExample from '../examples/menu/MenuDefaultSlotExample.vue';
import MenuItemDefaultSlotExample from '../examples/menu/MenuItemDefaultSlotExample.vue';
import MenuItemDisabledExample from '../examples/menu/MenuItemDisabledExample.vue';
import MenuItemLeadingSlotExample from '../examples/menu/MenuItemLeadingSlotExample.vue';
import MenuItemSubmenuSlotExample from '../examples/menu/MenuItemSubmenuSlotExample.vue';
import MenuItemSupportingSlotExample from '../examples/menu/MenuItemSupportingSlotExample.vue';
import MenuItemTrailingSlotExample from '../examples/menu/MenuItemTrailingSlotExample.vue';
import MenuOpenAnchorExample from '../examples/menu/MenuOpenAnchorExample.vue';
import MenuVariantExample from '../examples/menu/MenuVariantExample.vue';
</script>
