---
title: Navigation bar 底部导航栏
description: mat-navigation-bar 的 Material 3 底部导航栏组件。
llms: true
order: 106
---

# Navigation bar 底部导航栏

## 组件简介

`<mat-navigation-bar>` 的组件导出名是 `MatNavigationBar`，配套子项组件 `<mat-navigation-bar-item>`（`MatNavigationBarItem`）或通用导航子项 `<mat-navigation-item>`（`MatNavigationItem`）。该组件遵循 Material 3 Navigation Bar 设计规范，专用于在移动端或紧凑型应用窗口底部呈现 3–5 个核心顶级导航目的地。

组件底层根元素基于 `MatAside` 呈现，默认停靠在布局容器的 `bottom` 边缘，统管底部定位、安全区预留与切入退场动效。开启 `app` 属性后，若位于 `MatAppRoot` 或 `MatLayout` 内部且未显式指定 `attach`，会向最近的一个根登记底部边缘并自适应底部安全区，正文内容自动获得相应内边距避让；否则支持固定至视口并挂载至指定 `attach` 容器。

## 示例

### 基础导航与受控选择

使用 `v-model` 绑定当前选中的目的地，子项的 `value` 用于匹配激活状态。选中的子项会呈现药丸形活动指示器、填充图标并切换为高亮颜色。

:::: details 查看示例代码

::: code-group

<<< @/examples/navigation-bar/NavigationBarBasicExample.vue#template [template]

<<< @/examples/navigation-bar/NavigationBarBasicExample.vue#script [script]

<<< @/examples/navigation-bar/NavigationBarBasicExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Navigation bar 基础导航预览">
    <NavigationBarBasicExample />
  </DocsPreview>
</ClientOnly>

### 内容对齐

通过 `alignment` 属性可以控制底部子项在横向主轴上的对齐方式，可选值为 `start`、`center`（默认）与 `end`。

:::: details 查看示例代码

::: code-group

<<< @/examples/navigation-bar/NavigationBarAlignmentExample.vue#template [template]

<<< @/examples/navigation-bar/NavigationBarAlignmentExample.vue#script [script]

<<< @/examples/navigation-bar/NavigationBarAlignmentExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Navigation bar 对齐预览">
    <NavigationBarAlignmentExample />
  </DocsPreview>
</ClientOnly>

### 应用级底部挂载

设置 `app=true` 将 Navigation bar 作为应用级底部导航接入 `MatAppRoot`。组件自动获取底部安全区，并向应用根布局登记占用厚度，主内容层自动避让。

:::: details 查看示例代码

::: code-group

<<< @/examples/navigation-bar/NavigationBarAppExample.vue#template [template]

<<< @/examples/navigation-bar/NavigationBarAppExample.vue#script [script]

<<< @/examples/navigation-bar/NavigationBarAppExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Navigation bar 应用级挂载预览">
    <NavigationBarAppExample />
  </DocsPreview>
</ClientOnly>

## API

### MatNavigationBar 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number \| boolean \| null` | `null` | 当前选中目的地的稳定值，支持 `v-model` 双向绑定。 |
| `alignment` | `'start' \| 'center' \| 'end'` | `'center'` | 默认 Slot 在横向主轴上的对齐方式。 |
| `height` | `number \| string \| undefined` | `undefined` | 显式指定导航栏高度，默认使用 64px 令牌高度。 |
| `app` | `boolean` | `false` | 是否接入应用级外壳布局，自动登记并停靠在 `MatAppRoot` 底部边缘。 |
| `attach` | `string \| HTMLElement` | `'body'` | `app=true` 且脱离 `MatAppRoot` 或有显式挂载需求时的 Teleport 目标。 |
| `placeholder` | `boolean` | `false` | 保留的 modal 占位属性；NavigationBar 没有 modal 布局，应用级导航使用最近根的 padding。 |
| `safeArea` | `boolean \| number \| string` | `true` | 底部安全区留白配置，为 `true` 时自适应环境安全区或 AppRoot 变量。 |
| `safeAreaSize` | `number \| string \| undefined` | `undefined` | 显式指定底部安全区留白大小。 |
| `bordered` | `boolean` | `false` | 是否在顶部边缘渲染 1px 细分割边框。 |
| `open` | `boolean \| undefined` | `undefined` | 受控显隐状态，支持 `v-model:open`，切换时触发滑入滑出动效。 |
| `transition` | `boolean` | `true` | 是否启用默认滑入滑出动效。 |
| `mode` | `'docked' \| 'flow' \| 'sticky' \| 'fixed' \| undefined` | `undefined` | 排布定位模式，未指定时遵循 Aside 默认逻辑。 |
| `zIndex` | `number \| string \| undefined` | `undefined` | 显式指定层级。 |

### MatNavigationBarItem 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean \| undefined` | `undefined` | 当前导航目的地的标识值，与父容器的 `modelValue` 进行全等比对。 |
| `icon` | `string \| undefined` | `undefined` | Material Symbols 图标名称。 |
| `badge` | `object \| undefined` | `undefined` | 附着在图标区域的 Badge 配置对象。 |
| `href` | `string \| undefined` | `undefined` | 传入时渲染为原生超链接跳转。 |
| `disabled` | `boolean` | `false` | 是否禁用当前项的交互。 |

## 事件

| 事件名 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `string \| number \| boolean` | 用户点击未禁用的子项且值与当前不一致时触发。 |
| `update:open` | `boolean` | 请求切换显示状态时发出新的布尔值。 |

## Slots

### MatNavigationBar Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `-` | 放置导航子项（`<mat-navigation-bar-item>` 或 `<mat-navigation-item>`）。 |

### MatNavigationBarItem Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `-` | 子项的文字标签内容。 |
| `icon` | `{ selected: boolean }` | 自定义图标内容，提供当前选中状态。 |

<script setup>
import NavigationBarBasicExample from '../examples/navigation-bar/NavigationBarBasicExample.vue';
import NavigationBarAlignmentExample from '../examples/navigation-bar/NavigationBarAlignmentExample.vue';
import NavigationBarAppExample from '../examples/navigation-bar/NavigationBarAppExample.vue';
</script>
