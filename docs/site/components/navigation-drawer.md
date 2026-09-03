---
title: Navigation drawer 导航抽屉
description: Material 3 Expressive 风格的侧边导航抽屉组件与二级菜单分组，支持标准与模态布局。
outline: [2, 3]
---

# Navigation drawer 导航抽屉

`<mat-navigation-drawer>` 的组件导出名是 `MatNavigationDrawer`，配套的二级菜单分组组件为 `<mat-navigation-group>`（组件导出名 `MatNavigationGroup`）。

Navigation drawer 为应用提供主导航目的地，复用 `MatNavigationRail` 的 `hide-on-collapse` 沉浸隐藏模式，固定采用纵向全宽布局（`orientation="vertical"`、`full-width`、`collapsible`、`hide-on-collapse`）。未展开时整体隐藏（宽度置为 0），展开时呈现标准抽屉（占据布局空间）或模态抽屉（覆盖页面并带有遮罩）。默认 Slot 支持混排菜单切换按钮、FAB、导航项以及结合 `<mat-spacer />` 的底部操作。

## 示例

### 基础导航抽屉

导航抽屉默认在收起时隐藏，展开时占据左侧布局空间。通过在默认 Slot 中混排按钮或在外部提供触发按钮切换展开状态。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-drawer/NavigationDrawerBasicExample.vue#template [template]

<<< @/examples/navigation-drawer/NavigationDrawerBasicExample.vue#script [script]

<<< @/examples/navigation-drawer/NavigationDrawerBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="基础导航抽屉预览">
    <NavigationDrawerBasicExample />
  </DocsPreview>
</ClientOnly>

### 模态导航抽屉与遮罩

设置 layout="modal" 可呈现覆盖在页面上方的模态抽屉，带有半透明遮罩背景。点击遮罩或按下 Escape 键时会自动请求收起抽屉。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-drawer/NavigationDrawerModalExample.vue#template [template]

<<< @/examples/navigation-drawer/NavigationDrawerModalExample.vue#script [script]

<<< @/examples/navigation-drawer/NavigationDrawerModalExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="模态导航抽屉预览">
    <NavigationDrawerModalExample />
  </DocsPreview>
</ClientOnly>

### 二级菜单分组与底部操作

利用 `<mat-navigation-group>` 可轻松组织带前置缩进的二级子菜单，并通过 `#activator` 插槽自定义带折叠图标的一级导航项。利用 `<mat-spacer />` 还可以将辅助或帮助按钮自动推至抽屉底部。

:::: details 查看示例代码
::: code-group

<<< @/examples/navigation-drawer/NavigationDrawerGroupExample.vue#template [template]

<<< @/examples/navigation-drawer/NavigationDrawerGroupExample.vue#script [script]

<<< @/examples/navigation-drawer/NavigationDrawerGroupExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="二级菜单分组抽屉预览">
    <NavigationDrawerGroupExample />
  </DocsPreview>
</ClientOnly>

## API

#### MatNavigationDrawer

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model-value` | `string | number | boolean | null` | `null` | 受控的当前目的地值，支持 `v-model` |
| `expanded` | `boolean` | `false` | 受控展开状态，支持 `v-model:expanded`；收起时抽屉隐藏，展开时显示 |
| `width` | `number | string` | `undefined` | 展开状态宽度；数字按 px 处理，字符串须为合法 CSS 宽度，非法时使用默认宽度 |
| `layout` | `'standard' | 'modal'` | `'standard'` | 抽屉布局；`standard` 占据空间，`modal` 覆盖内容并附带遮罩 |
| `alignment` | `'start' | 'center' | 'end'` | `'start'` | 默认 Slot 内容在纵向轴上的对齐方式 |
| `close-label` | `string` | `'收起导航'` | 模态遮罩与收起动作的无障碍名称 |
| `app` | `boolean` | `false` | 开启应用级导航模式，省略 `attach` 且位于 `MatAppRoot` 内时自动登记边缘 |
| `attach` | `string | HTMLElement` | `'body'` | `app=true` 时的显式 Teleport 挂载目标 |
| `placeholder` | `boolean` | `false` | `app=true` 时在声明位置生成占位 |
| `bottom-placeholder` | `number | string` | `0` | `app=true` 时的额外底部安全区 |

注：`full-width`、`collapsible`、`hide-on-collapse` 和 `orientation` 在组件内部固定为 `true` 与 `'vertical'`，无需且不可配置。

#### MatNavigationGroup

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `expanded` | `boolean` | `false` | 受控展开状态，支持 `v-model:expanded` |
| `model-value` | `boolean` | `undefined` | 受控展开状态别名，支持 `v-model` |
| `title` | `string` | `undefined` | 分组标题文本 |
| `indent` | `number | string` | `16` | 二级子项的前置缩进量（默认 16px） |

组件没有公开方法。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatNavigationDrawer` | `update:modelValue` | `string | number | boolean` | 启用的子 Item 被激活时发出 |
| `MatNavigationDrawer` | `update:expanded` | `boolean` | 遮罩点击或按下 Escape 请求关闭时发出 |
| `MatNavigationGroup` | `update:expanded` | `boolean` | 分组展开/折叠状态改变时发出 |
| `MatNavigationGroup` | `update:modelValue` | `boolean` | 分组展开/折叠状态改变时发出 |

## Slots

| 名称 | 组件 | 内容约束 |
| --- | --- | --- |
| 默认 | `MatNavigationDrawer` | 混排菜单按钮、FAB、NavigationItem、NavigationGroup、Spacer 与底部操作。Slot 参数为 `{ expanded, orientation }` |
| `header` | `MatNavigationDrawer` | 可选的顶部品牌标识区域；Slot 参数为 `{ expanded }` |
| 默认 | `MatNavigationGroup` | 二级导航子项内容，自动应用前置缩进 |
| `activator` | `MatNavigationGroup` | 一级触发项插槽；Slot 参数为 `{ expanded, toggle }` |

<script setup>
import NavigationDrawerBasicExample from '../examples/navigation-drawer/NavigationDrawerBasicExample.vue';
import NavigationDrawerModalExample from '../examples/navigation-drawer/NavigationDrawerModalExample.vue';
import NavigationDrawerGroupExample from '../examples/navigation-drawer/NavigationDrawerGroupExample.vue';
</script>
