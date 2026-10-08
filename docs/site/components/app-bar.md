---
title: App bar 应用栏
description: mat-app-bar 的 MD3 Expressive 变体、搜索主内容、主内容区域与 CSS 滚动时间线折叠。
llms: true
order: 95
---

# App bar 应用栏

## 组件简介

`<mat-app-bar>` 的组件导出名是 `MatAppBar`。它实现 Material 3 Expressive 的 search、small、medium flexible 和 large flexible 四种顶部应用栏。通过 `content` 属性（`headline`、`image`、`search`）明确主内容语义；`content="search"` 时可在默认 Slot 中放置独立的 `<mat-search>`（组件导出名 `MatSearch`）。

组件支持吸顶停靠与随滚动连续折叠，提供 `leading`、`trailing` 操作区与 `subtitle` 副标题插槽，支持起始对齐与居中对齐，并支持通过 `app` 属性接入应用根布局。

## 示例

### `variant`

:::: details 查看示例代码

::: code-group

<<< @/examples/app-bar/AppBarVariantExample.vue#template [template]

<<< @/examples/app-bar/AppBarVariantExample.vue#script [script]

<<< @/examples/app-bar/AppBarVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="App bar 四种 Expressive 变体预览">
    <AppBarVariantExample />
  </DocsPreview>
</ClientOnly>

### `content` 与默认 Slot

:::: details 查看示例代码

::: code-group

<<< @/examples/app-bar/AppBarContentExample.vue#template [template]

<<< @/examples/app-bar/AppBarContentExample.vue#script [script]

<<< @/examples/app-bar/AppBarContentExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="标题、图像和搜索主内容预览">
    <AppBarContentExample />
  </DocsPreview>
</ClientOnly>

### `align`

:::: details 查看示例代码

::: code-group

<<< @/examples/app-bar/AppBarAlignExample.vue#template [template]

<<< @/examples/app-bar/AppBarAlignExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="App bar 起始和居中对齐预览">
    <AppBarAlignExample />
  </DocsPreview>
</ClientOnly>

### `leading`、`subtitle` 与 `trailing` Slots

:::: details 查看示例代码

::: code-group

<<< @/examples/app-bar/AppBarSlotsExample.vue#template [template]

<<< @/examples/app-bar/AppBarSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="App bar 内容 Slots 预览">
    <AppBarSlotsExample />
  </DocsPreview>
</ClientOnly>

### `scrollTarget` 与连续折叠

通过 `scrollTarget` 指定滚动容器，App bar 会随滚动进度平滑折叠并过渡背景色。

:::: details 查看示例代码

::: code-group

<<< @/examples/app-bar/AppBarScrollExample.vue#template [template]

<<< @/examples/app-bar/AppBarScrollExample.vue#script [script]

<<< @/examples/app-bar/AppBarScrollExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="App bar CSS 时间线折叠预览" height="452px">
    <AppBarScrollExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'search' \| 'small' \| 'medium-flexible' \| 'large-flexible'` | `'small'` | Expressive App bar 变体；不提供已不推荐的 baseline medium 和 large |
| `content` | `'headline' \| 'image' \| 'search'` | `'headline'` | 明确默认 Slot 的主内容类型；`variant="search"` 时有效值固定为 search |
| `align` | `'start' \| 'center'` | `'start'` | 主内容起始或居中对齐；居中模式使用对称侧轨 |
| `app` | `boolean` | `false` | 位于 `MatAppRoot` 且省略 `attach` 时登记应用顶边；其他场景固定到 `attach` |
| `attach` | `string \| HTMLElement` | `'body'` | `app=true` 时的显式 Teleport 目标；显式传入后优先于最近的 `MatAppRoot` |
| `scrollTarget` | `string \| HTMLElement` | `undefined` | 显式 CSS 时间线滚动源；省略时依次选择可滚动的 AppRoot 正文、最近滚动祖先和 document |
| `placeholder` | `boolean` | `false` | small/search 变体是否在声明位置保留 64px 内部占位；flexible 变体始终为展开差值（medium 48px、large 56px）保留内部占位。该占位属于 AppBar 折叠机制，不是 MatAside 的 modal placeholder |
| `safeArea` | `boolean \| number \| string` | `true` | 顶部安全区留白配置，为 `true` 时自适应环境安全区或 AppRoot 变量 |
| `safeAreaSize` | `number \| string \| undefined` | `undefined` | 显式指定顶部安全区留白大小 |
| `open` | `boolean \| undefined` | `undefined` | 受控显隐状态，支持 `v-model:open`，切换时触发滑入滑出动效 |
| `mode` | `'docked' \| 'flow' \| 'sticky' \| 'fixed' \| undefined` | `undefined` | 排布定位模式，未指定时遵循 Aside 默认逻辑 |
| `bordered` | `boolean` | `false` | 是否在底部边缘渲染 1px 细分割边框 |
| `zIndex` | `number \| string \| undefined` | `undefined` | 显式指定层级 |
| `transition` | `boolean` | `true` | 是否启用切入退场动效 |

未消费的属性透传给内部原生 `<header>`。

## 事件

| 事件名 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:open` | `boolean` | 请求切换显隐状态时发出新的布尔值 |
| `update:modelValue` | `boolean` | 请求切换显隐状态时发出新的布尔值 |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 唯一主内容区域；应与 `content` 一致地放置标题、图像或 `MatSearch` |
| `leading` | 起始操作，通常是一个具有可访问名称的 48px 目标按钮 |
| `subtitle` | 标题的辅助文字；flexible 折叠过程中连续淡出，不应与 search 主内容组合 |
| `trailing` | 末端操作；宽屏可放置最多四个简洁操作，避免挤压主内容 |

## 无障碍

App bar 使用原生 `<header>`；`content="search"` 时由 `MatSearch` 提供搜索无障碍语义。所有图标按钮操作均应提供明确的 `label` 或 `aria-label`。

## 参考来源

变体、结构、64px small/search 高度、112px medium flexible 高度、120px large flexible 高度、48px 操作目标、滚动填色与 flexible 压缩行为依据 Material 3 [App bars overview](https://m3.material.io/components/app-bars/overview)、[App bars specs](https://m3.material.io/components/app-bars/specs) 和 [App bars guidelines](https://m3.material.io/components/app-bars/guidelines)。滚动驱动实现采用 W3C [Scroll-driven Animations](https://www.w3.org/TR/scroll-animations-1/) 定义的 CSS timeline；该实现方式是 mde-vue 的 Web API 设计，不是 Material 官方组件 API。

<script setup>
import AppBarAlignExample from '../examples/app-bar/AppBarAlignExample.vue';
import AppBarContentExample from '../examples/app-bar/AppBarContentExample.vue';
import AppBarScrollExample from '../examples/app-bar/AppBarScrollExample.vue';
import AppBarSlotsExample from '../examples/app-bar/AppBarSlotsExample.vue';
import AppBarVariantExample from '../examples/app-bar/AppBarVariantExample.vue';
</script>
