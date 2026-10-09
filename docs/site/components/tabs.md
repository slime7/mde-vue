---
title: Tabs 标签页
description: mat-tabs 的 Material 3 标签页组件，含 primary/secondary 变体与触摸滑动翻页。
llms: true
order: 108
---

# Tabs 标签页

## 组件简介

`<mat-tabs>` 的组件导出名是 `MatTabs`，配套子项组件 `<mat-tab-item>`（`MatTabItem`）与内容面板 `<mat-tab-content>`（`MatTabContent`）。组件实现 Material 3 的 primary 与 secondary 两种 Tabs 变体，用于在同一层级的内容视图之间切换。

默认 Slot 中混排的 `mat-tab-item` 与 `mat-tab-content` 由容器按组件类型自动分组：Item 渲染进标签行（`role="tablist"`），Content 渲染进内容轨道。两者通过稳定 `value` 关联，容器 `v-model` 是选中值的唯一来源，`null` 表示未选择；未匹配当前值的面板移出无障碍树与焦点顺序。

触摸与手写笔可以在内容区左右滑动翻页并完全跟手，鼠标指针只能通过点击切换。变体、尺寸、指示器与配色角色依据 Material 3 [Tabs specs](https://m3.material.io/components/tabs/specs) 与 [Tabs overview](https://m3.material.io/components/tabs/overview)；滑动翻页是本组件面向 Web 的补充能力，不是官方 Tabs API。

## 示例

### 基础标签页与受控选择

`v-model` 绑定当前选中值，点击子项或滑动内容区都会请求更新；值为 `null` 时没有选中项。

:::: details 查看示例代码

::: code-group

<<< @/examples/tabs/TabsBasicExample.vue#template [template]

<<< @/examples/tabs/TabsBasicExample.vue#script [script]

<<< @/examples/tabs/TabsBasicExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Tabs 基础用法预览" height="232px">
    <TabsBasicExample />
  </DocsPreview>
</ClientOnly>

### primary 与 secondary 变体

`primary`（默认）带图标时渲染 64px 堆叠图文，纯标签时渲染 48px，指示器对齐居中内容；`secondary` 固定 48px 水平图文，指示器横跨整个单元格。两种变体底部都带水平分割线。

:::: details 查看示例代码

::: code-group

<<< @/examples/tabs/TabsVariantExample.vue#template [template]

<<< @/examples/tabs/TabsVariantExample.vue#script [script]

<<< @/examples/tabs/TabsVariantExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Tabs 变体预览" height="560px">
    <TabsVariantExample />
  </DocsPreview>
</ClientOnly>

### 标签上的徽标

Item 的 `badge` 在图标或标签上渲染徽标，支持 `content`、`dot` 与 `color`；省略 `label` 时以默认 Slot 内容作为标签文字。

:::: details 查看示例代码

::: code-group

<<< @/examples/tabs/TabsBadgeExample.vue#template [template]

<<< @/examples/tabs/TabsBadgeExample.vue#script [script]

<<< @/examples/tabs/TabsBadgeExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Tabs 徽标预览" height="232px">
    <TabsBadgeExample />
  </DocsPreview>
</ClientOnly>

### 触摸滑动翻页

`swipeable` 默认开启：触摸与手写笔拖动内容区跟手移动，越过半页宽度或快速甩动时翻到相邻页，否则回弹；首尾两端阻尼回弹，鼠标拖动不触发翻页。减少动态效果偏好下切换不播放过渡。

:::: details 查看示例代码

::: code-group

<<< @/examples/tabs/TabsSwipeExample.vue#template [template]

<<< @/examples/tabs/TabsSwipeExample.vue#script [script]

<<< @/examples/tabs/TabsSwipeExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Tabs 滑动翻页预览" height="232px">
    <TabsSwipeExample />
  </DocsPreview>
</ClientOnly>

### 滚动标签行、居中与翻页按钮

设置 `scrollable` 后标签按内容宽度排列，超出容器时可横向滚动（支持鼠标滚轮）；激活项切换时自动平滑滚动到视口中央，并用边缘渐变提示可滚动方向。开启 `scrollButtons` 可在溢出时显示两端翻页按钮；`align` 控制宽屏下滚动标签行的整体对齐，均分模式不受其影响。

:::: details 查看示例代码

::: code-group

<<< @/examples/tabs/TabsScrollableExample.vue#template [template]

<<< @/examples/tabs/TabsScrollableExample.vue#script [script]

<<< @/examples/tabs/TabsScrollableExample.vue#style [style]

:::

::::

<ClientOnly>
  <DocsPreview label="Tabs 滚动标签行预览" height="232px">
    <TabsScrollableExample />
  </DocsPreview>
</ClientOnly>

## API

### MatTabs 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number \| boolean \| null` | `null` | 当前选中的标签页值，支持 `v-model`；`null` 表示未选择。 |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | 标签页变体；`primary` 支持 64px 堆叠图文与居中指示器，`secondary` 为 48px 水平图文与全宽指示器。 |
| `swipeable` | `boolean` | `true` | 是否允许触摸与手写笔在内容区左右滑动翻页；鼠标指针不参与手势。 |
| `scrollable` | `boolean` | `false` | 是否使用滚动标签行：标签按内容宽度排列并可横向滚动；关闭时均分容器宽度。 |
| `scrollButtons` | `boolean` | `false` | 是否在滚动标签行两端显示翻页按钮；仅在 `scrollable` 且内容溢出时可见。 |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | 滚动标签行中标签的整体对齐方式；均分模式下不产生效果。 |
| `color` | `string \| undefined` | `undefined` | 统一组件配色，作用于活动标签内容与活动指示器；省略时使用 primary 角色。 |

### MatTabItem 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | `undefined` | 标签页的稳定值，与容器 `modelValue` 和对应 `mat-tab-content` 的 `value` 匹配；省略时该项不可被选中。 |
| `label` | `string \| undefined` | `undefined` | 标签文字；省略时使用默认 Slot 内容。 |
| `icon` | `string \| undefined` | `undefined` | Material Symbols 图标文本；primary 渲染在文本上方，secondary 与文本水平并排。 |
| `badge` | `object \| undefined` | `undefined` | 图标或标签上的 Badge 配置，支持 `content`、`dot` 与 `color`。 |
| `disabled` | `boolean` | `false` | 禁止该标签页被激活；禁用项在键盘导航中被跳过。 |

### MatTabContent 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | `undefined` | 对应 `mat-tab-item` 的稳定值；匹配当前选中项的面板保持可交互。 |

## 事件

### MatTabs 事件

| 事件名 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `string \| number \| boolean` | 点击未禁用子项、键盘导航或滑动翻页请求切换时触发。 |

MatTabItem 与 MatTabContent 没有自定义事件。

## Slots

### MatTabs Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `-` | 混排放置 `<mat-tab-item>` 与 `<mat-tab-content>`；容器按组件类型自动分组渲染。 |

### MatTabItem Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `-` | 自定义标签文本内容；省略 `label` 时作为标签文字来源。 |
| `icon` | `{ selected: boolean }` | 自定义图标内容，提供当前选中状态。 |

### MatTabContent Slots

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `default` | `-` | 面板内容；面板尺寸由内容撑开，轨道高度取最高面板。 |

## 键盘与状态

标签行提供 `tablist` 语义与 roving tabindex：左右方向键在标签间移动并自动激活（RTL 方向反转），`Home` 与 `End` 跳转首尾，禁用项被跳过。活动指示器随选中标签移动，点击跨越多页时只播放相邻一页的过渡；减少动态效果偏好下指示器与内容直接落位。内容面板提供 `tabpanel` 语义，未激活面板声明 `aria-hidden` 与 `inert`。

<script setup>
import TabsBasicExample from '../examples/tabs/TabsBasicExample.vue';
import TabsVariantExample from '../examples/tabs/TabsVariantExample.vue';
import TabsBadgeExample from '../examples/tabs/TabsBadgeExample.vue';
import TabsSwipeExample from '../examples/tabs/TabsSwipeExample.vue';
import TabsScrollableExample from '../examples/tabs/TabsScrollableExample.vue';
</script>
