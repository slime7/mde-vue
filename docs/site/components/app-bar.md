---
title: App bar 应用栏
description: mat-app-bar 的 MD3 Expressive 变体、直接搜索、主内容区域与 CSS 滚动时间线折叠。
llms: true
order: 95
---

# App bar 应用栏

## 组件简介

`<mat-app-bar>` 的组件导出名是 `MatAppBar`，`<mat-app-bar-search>` 的组件导出名是 `MatAppBarSearch`。前者实现 Material 3 Expressive 的 search、small、medium flexible 和 large flexible 四种 App bar；后者基于 `MatInputBase` 提供适合宽屏桌面应用直接输入的原生搜索框。

App bar 的默认 Slot 是唯一主内容区域。通过 `content="headline"`、`content="image"` 或 `content="search"` 明确内容语义，标题、图像和搜索不会同时占据不同的主区域。`variant="search"` 始终按 search 内容处理。leading 和 trailing 操作区保持固定交互尺寸，主内容区使用剩余宽度；`align="center"` 使用对称侧轨，避免两侧操作数量不同时标题发生视觉偏移。

组件默认在声明位置参与文档布局并粘附到滚动容器顶部。small 与 search 在开始滚动时从 `surface` 连续过渡到 `surface container`；medium flexible 和 large flexible 还会分别在前 48px、56px 滚动距离内折叠到 64px。动画由 CSS `scroll-timeline` 和 `animation-timeline` 驱动，展开背景与主内容在不改变滚动范围的视觉层中折叠，不使用 JavaScript 逐帧计算。不支持这些 CSS 能力的浏览器保持静态展开；减少动态效果时保留展开几何，仅播放表面填色。

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

滚动示例把容器元素作为显式 `scrollTarget`。在最新浏览器中缓慢滚动，可以观察视觉高度、标题、subtitle 和背景色共享同一个滚动进度；折叠不会改写滚动容器的可滚动高度，因此越过动画终点后仍可正常继续滚动。

:::: details 查看示例代码
::: code-group

<<< @/examples/app-bar/AppBarScrollExample.vue#template [template]

<<< @/examples/app-bar/AppBarScrollExample.vue#script [script]

<<< @/examples/app-bar/AppBarScrollExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="App bar CSS 时间线折叠预览">
    <AppBarScrollExample />
  </DocsPreview>
</ClientOnly>

### `MatAppBarSearch`

桌面搜索输入实时更新 `v-model`；按 Enter 或使用默认 leading 搜索按钮发出 `search`。此示例还使用 trailing Slot 提供唯一的清空操作，组件会隐藏浏览器为 `type="search"` 添加的重复清除按钮。

:::: details 查看示例代码
::: code-group

<<< @/examples/app-bar/AppBarSearchExample.vue#template [template]

<<< @/examples/app-bar/AppBarSearchExample.vue#script [script]

<<< @/examples/app-bar/AppBarSearchExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="App bar 直接搜索输入预览">
    <AppBarSearchExample />
  </DocsPreview>
</ClientOnly>

## API

### `MatAppBar` 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'search' \| 'small' \| 'medium-flexible' \| 'large-flexible'` | `'small'` | Expressive App bar 变体；不提供已不推荐的 baseline medium 和 large |
| `content` | `'headline' \| 'image' \| 'search'` | `'headline'` | 明确默认 Slot 的主内容类型；`variant="search"` 时有效值固定为 search |
| `align` | `'start' \| 'center'` | `'start'` | 主内容起始或居中对齐；居中模式使用对称侧轨 |
| `app` | `boolean` | `false` | 位于 `MatAppRoot` 且省略 `attach` 时登记应用顶边；其他场景固定到 `attach` |
| `attach` | `string \| HTMLElement` | `'body'` | `app=true` 时的显式 Teleport 目标；显式传入后优先于最近的 `MatAppRoot` |
| `scrollTarget` | `string \| HTMLElement` | `undefined` | 显式 CSS 时间线滚动源；省略时依次选择可滚动的 AppRoot 正文、最近滚动祖先和 document |

`app=true` 且自动接入 `MatAppRoot` 时，64px 收起高度登记为固定顶边，flexible 变体多出的 48px 或 56px 在声明位置成为可滚走的起始占位，从而避免折叠高度反复改变 AppRoot 正文 padding。显式 `attach` 无法解析时不渲染 App bar。

`MatAppBar` 没有公开方法。未消费的属性、`class`、`style`、`id` 和 ARIA 属性传给原生 `<header>`。

### `MatAppBarSearch` 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | 当前搜索文本，可使用 `v-model` |
| `label` | `string` | `'Search'` | 原生输入和默认搜索按钮的无障碍名称 |
| `placeholder` | `string` | `'Search'` | 原生输入占位文本 |
| `disabled` | `boolean` | `false` | 禁用输入和默认搜索按钮，并阻止提交 |
| `readonly` | `boolean` | `false` | 将原生输入设为只读 |
| `maxLength` | `number` | `undefined` | 原生最大字符数 |

`class` 与 `style` 传给搜索 `<form role="search">` 容器；其他未消费属性传给内部 `MatInputBase` 的原生 `<input type="search">`。原生搜索清除按钮会被隐藏，清空能力由 trailing Slot 中的组件操作明确提供。

### `MatAppBarSearch` 方法

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `focusInput()` | 无 | `void` | 将焦点移到原生搜索输入框；未挂载时不抛出错误 |
| `getInput()` | 无 | `HTMLInputElement \| null` | 返回当前原生搜索输入框，未挂载时返回 `null` |

## 事件

`MatAppBar` 不定义自定义事件。

| `MatAppBarSearch` 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `string` | 原生 input 事件产生新文本时，用于 `v-model` |
| `search` | `string` | 按 Enter 或点击默认搜索按钮时，载荷为当前受控查询文本；禁用时不触发 |

## Slots

### `MatAppBar` Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 唯一主内容区域；应与 `content` 一致地放置标题、图像或 `MatAppBarSearch` |
| `leading` | 起始操作，通常是一个具有可访问名称的 48px 目标按钮 |
| `subtitle` | 标题的辅助文字；flexible 折叠过程中连续淡出，不应与 search 主内容组合 |
| `trailing` | 末端操作；宽屏可放置最多四个简洁操作，避免挤压主内容 |

### `MatAppBarSearch` Slots

| 名称 | 内容约束 |
| --- | --- |
| `leading` | 替换默认搜索按钮的起始内容；自定义内容负责自身提交语义和可访问名称 |
| `trailing` | 输入框末端的清空、语音或头像等操作 |

## 无障碍与降级

App bar 使用原生 `<header>`；搜索使用 `<form role="search">` 和原生 search input。所有图标操作都应提供明确的 `label`。sticky App bar 不移动焦点，折叠也不改变 leading 和 trailing 的交互顺序。

组件只面向最新浏览器。CSS scroll timeline 不可用时，App bar 保持展开和 `surface` 背景，不执行定时动画替代方案。`prefers-reduced-motion: reduce` 下保留展开高度和内容，只让滚动后的容器颜色表达内容分隔。

## 参考来源

变体、结构、64px small/search 高度、112px medium flexible 高度、120px large flexible 高度、48px 操作目标、滚动填色与 flexible 压缩行为依据 Material 3 [App bars overview](https://m3.material.io/components/app-bars/overview)、[App bars specs](https://m3.material.io/components/app-bars/specs) 和 [App bars guidelines](https://m3.material.io/components/app-bars/guidelines)。滚动驱动实现采用 W3C [Scroll-driven Animations](https://www.w3.org/TR/scroll-animations-1/) 定义的 CSS timeline；该实现方式是 mde-vue 的 Web API 设计，不是 Material 官方组件 API。

<script setup>
import AppBarAlignExample from '../examples/app-bar/AppBarAlignExample.vue';
import AppBarContentExample from '../examples/app-bar/AppBarContentExample.vue';
import AppBarScrollExample from '../examples/app-bar/AppBarScrollExample.vue';
import AppBarSearchExample from '../examples/app-bar/AppBarSearchExample.vue';
import AppBarSlotsExample from '../examples/app-bar/AppBarSlotsExample.vue';
import AppBarVariantExample from '../examples/app-bar/AppBarVariantExample.vue';
</script>
