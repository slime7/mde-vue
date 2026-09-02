---
title: FAB Menu 浮动操作菜单
description: mat-fab-menu 的折叠态主 FAB、展开列表操作按钮、固定右上角圆形关闭按钮、受控状态与 AppRoot 浮动层集成。
llms: true
order: 54
---

# FAB Menu 浮动操作菜单

## 组件简介

`<mat-fab-menu>` 的组件导出名是 `MatFabMenu`。它实现 Material 3 Expressive 风格的浮动操作按钮菜单（Speed Dial），在折叠状态下呈现为主 FAB，展开后沿上方纵向展示操作按钮列表。

组件的 `app` 浮动属性固定内置为 `true`，在 `MatAppRoot` 后代中使用时固定进入最近 `MatAppRoot` 的普通浮动层右下角，无需手动配置 `app` 或 `position` 属性；在 `MatAppRoot` 之外使用时保持在声明位置渲染。展开状态下的关闭按钮采用固定尺寸（56px）的纯圆按钮，定位固定于主 FAB 区域的右上角，展开与折叠过渡时按钮位置不发生跳动。列表操作按钮由调用方通过默认 Slot 放置带有图标与文字的按钮组件（如 `<mat-btn prefix="...">`）。

根据 Material 3 Expressive 规范推荐，展开菜单中的操作按钮建议使用与当前主题对应的 `-container` 语义色（如 `color="primary-container"` 或 `color="secondary-container"`）。

## 示例

### 基础用法

在 `MatAppRoot` 内声明后自动进入右下角浮动层。点击主 FAB 向上平滑展开操作列表，点击内部操作按钮后默认自动收起菜单。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab-menu/FabMenuBasicExample.vue#template [template]

<<< @/examples/fab-menu/FabMenuBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB Menu 基础用法预览">
    <FabMenuBasicExample />
  </DocsPreview>
</ClientOnly>

### `v-model` 受控展开

支持通过 `v-model` 双向绑定展开状态，或通过外部按钮切换展开与折叠。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab-menu/FabMenuModelValueExample.vue#template [template]

<<< @/examples/fab-menu/FabMenuModelValueExample.vue#script [script]

<<< @/examples/fab-menu/FabMenuModelValueExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB Menu 受控展开预览">
    <FabMenuModelValueExample />
  </DocsPreview>
</ClientOnly>

### 尺寸与颜色

主 FAB 支持 `small`（56px）、`medium`（80px）和 `large`（96px）三种尺寸，以及 8 组 Material 3 官方颜色角色。展开时的关闭按钮保持固定 56px 圆形并定位于右上角。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab-menu/FabMenuColorSizeExample.vue#template [template]

<<< @/examples/fab-menu/FabMenuColorSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB Menu 尺寸与颜色预览">
    <FabMenuColorSizeExample />
  </DocsPreview>
</ClientOnly>

### 底部 Toolbar 与 Small FAB

在包含底部 Docked Toolbar 的 `MatAppRoot` 中，`small` 尺寸的 FAB Menu 会自动排列在浮动层并位于 Toolbar 上方，展开时列表操作按钮顺畅向上弹出。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab-menu/FabMenuToolbarExample.vue#template [template]

<<< @/examples/fab-menu/FabMenuToolbarExample.vue#script [script]

<<< @/examples/fab-menu/FabMenuToolbarExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB Menu 底部 Toolbar 协作预览">
    <FabMenuToolbarExample />
  </DocsPreview>
</ClientOnly>

### 自定义触发器 Slot

支持通过 `trigger` Slot 自定义触发器内容。

:::: details 查看示例代码
::: code-group

<<< @/examples/fab-menu/FabMenuCustomTriggerExample.vue#template [template]

<<< @/examples/fab-menu/FabMenuCustomTriggerExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="FAB Menu 自定义触发器预览">
    <FabMenuCustomTriggerExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 折叠态主 FAB 尺寸；高度分别为 56px、80px、96px |
| `icon` | `string` | 未设置 | 折叠状态下主 FAB 显示的 Material Symbols 图标 |
| `label` | `string` | 未设置 | 折叠状态下主 FAB 的无障碍名称和默认 Tooltip 文本 |
| `closeIcon` | `string` | `'close'` | 展开状态下关闭按钮显示的 Material Symbols 图标 |
| `closeLabel` | `string` | 未设置 | 展开状态下关闭按钮的无障碍名称和 Tooltip 文本；缺省时回退到 `'关闭'` |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'primary-container' \| 'secondary-container' \| 'tertiary-container' \| 'error' \| 'error-container'` | `'primary-container'` | 颜色角色；主体 FAB 使用对应的 `-container` 语义色（如 `primary-container`），展开后的关闭按钮使用非 `-container` 语义色（如 `primary` 与 `on-primary`）；展开列表按钮由使用者自由定义，推荐搭配 `-container` 颜色 |
| `disabled` | `boolean` | `false` | 禁用主按钮及菜单展开交互 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 主按钮原生类型 |
| `modelValue` | `boolean` | 未设置 | 控制菜单展开与折叠状态；支持 `v-model` 双向绑定 |
| `closeOnClick` | `boolean` | `true` | 点击默认 Slot 内的按钮后是否自动收起菜单 |
| `closeOnEsc` | `boolean` | `true` | 按下 Escape 键时是否自动收起菜单 |
| `closeOnClickOutside` | `boolean` | `true` | 点击菜单外部区域时是否自动收起菜单 |

组件的 `app` 属性固定内置为 `true`，在 `MatAppRoot` 下自动挂载至右下角浮动层，无需手动传入。菜单固定向上展开，关闭按钮固定为 56px 圆形并定位于右上角。

### 事件

| 事件名 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | 展开状态发生变化时派发 |
| `open` | 无 | 菜单展开时派发 |
| `close` | 无 | 菜单收起时派发 |

### Slots

| 名称 | 参数 | 内容约束 |
| --- | --- | --- |
| 默认 | 无 | 列表操作按钮插槽；调用方可放置带有图标与文本的 `mat-btn` 等操作项 |
| `trigger` | `{ open: boolean, toggle: () => void, size: string, color: string }` | 自定义主触发区域插槽；缺省时渲染内置主 FAB 与右上角圆形关闭按钮 |

### 状态

| 状态 | 用户可观察行为 |
| --- | --- |
| 折叠态 | 显示主 FAB 图标与标签，列表按钮平滑收起隐藏且不接受键盘 Tab 聚焦，`aria-expanded="false"` |
| 展开态 | 显示右上角固定位置圆形关闭按钮，列表操作按钮向上平滑展开显示，`aria-expanded="true"` |
| disabled | 禁用主按钮交互，无法展开或折叠 |

减少动态效果偏好下，主 FAB、关闭按钮与列表项的过渡动画会被取消。

## 参考来源

尺寸、图标、颜色角色与浮动层交互依据 Material 3 的 [FAB overview](https://m3.material.io/components/floating-action-button/overview) 与 [FAB menu guidelines](https://m3.material.io/components/floating-action-button/guidelines)。

<script setup>
import FabMenuBasicExample from '../examples/fab-menu/FabMenuBasicExample.vue';
import FabMenuColorSizeExample from '../examples/fab-menu/FabMenuColorSizeExample.vue';
import FabMenuCustomTriggerExample from '../examples/fab-menu/FabMenuCustomTriggerExample.vue';
import FabMenuModelValueExample from '../examples/fab-menu/FabMenuModelValueExample.vue';
import FabMenuToolbarExample from '../examples/fab-menu/FabMenuToolbarExample.vue';
</script>
