---
title: Bottom sheet 底部面板
description: mat-bottom-sheet 的 standard、modal、自适应布局、自然高度、受控展开与拖动行为。
llms: true
order: 101
---

# Bottom sheet 底部面板

## 组件简介

`<mat-bottom-sheet>` 的组件导出名是 `MatBottomSheet`。它把补充内容固定在可用区域底部，提供 Material 3 的 `standard` 与 `modal` 两种变体，并保留 `auto` 自适应模式。

Bottom sheet 内置的布局只有 drag handle、用户内容区域和 `footer`。标题、说明、操作控件以及其他内容都应由使用者放入默认 Slot；`content` 仅用于需要显示一段纯文本时的便利场景。`drag-handle` Slot 只替换把手行中的视觉内容，整行至少提供 48px 的拖动命中区域。

Standard 与主内容共存，不锁定页面滚动，也不会主动移动焦点；modal 使用原生 `<dialog>`、帷幕和 Vue Teleport，组件负责焦点陷阱、背景交互拦截以及关闭后的焦点恢复。Modal 没有内置标题，因此必须由使用者提供 `aria-label` 或 `aria-labelledby`，默认 Slot 中的标题由使用者自行关联。位于 `MatAppRoot` 内且省略 `attach` 时，modal 自动进入该 AppRoot 的模态层。

默认 `variant="auto"`：视口宽度小于 `breakpoint` 时使用 modal，达到断点后使用 standard。默认断点为 840px。自动模式只改变 Bottom sheet 自身的布局方式，不会把它替换成 Side sheet。

`normal` 状态按内容自然高度展示；内容超过当前最大展开高度时，只有内容区域滚动。`full` 状态使用扣除顶部安全间距后的最大高度。`expanded` 也可以设置数字、纯数字字符串或合法 CSS `block-size` 值；手动高度低于 64px 时只把实际渲染高度限制为 64px，不修改受控值。高度切换、阴影开关和圆角开关都使用 Material motion 过渡，拖动时会暂时关闭高度过渡以跟随指针，释放后恢复动画。

把手的鼠标点击不会切换高度；键盘 Enter/Space 仍然执行可访问的状态操作：normal 请求 `full`，standard 的展开状态请求 `normal`，modal 的展开状态请求关闭。normal 状态向上拖动请求 `full`，向下拖动达到阈值请求关闭；full 或自定义高度向下拖动请求 `normal`。开启 `virtualExpand` 后，normal 状态下内容区向下滚轮或向上滑动会请求 `full`，已经展开时不会重复请求。

## 示例

### `standard` 与 `modal`

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetVariantExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetVariantExample.vue#script [script]

<<< @/examples/bottom-sheet/BottomSheetVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet 变体预览">
    <BottomSheetVariantExample />
  </DocsPreview>
</ClientOnly>

### `virtualExpand` 自动展开

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetVirtualExpandExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetVirtualExpandExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet virtualExpand 预览">
    <BottomSheetVirtualExpandExample />
  </DocsPreview>
</ClientOnly>

### `expanded` 高度状态

示例通过同一个受控值演示 `normal`、`full` 和 `320px` 三种合法状态。自定义高度可以使用数字或 CSS `block-size` 字符串。

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetExpandedExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetExpandedExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet 展开高度预览">
    <BottomSheetExpandedExample />
  </DocsPreview>
</ClientOnly>

### `shadow` 阴影

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetShadowExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetShadowExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet 阴影预览">
    <BottomSheetShadowExample />
  </DocsPreview>
</ClientOnly>

### `rounded` 顶部圆角

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetRoundedExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetRoundedExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet 圆角预览">
    <BottomSheetRoundedExample />
  </DocsPreview>
</ClientOnly>

### `auto` 与 `breakpoint`

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetResponsiveExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetResponsiveExample.vue#script [script]

<<< @/examples/bottom-sheet/BottomSheetResponsiveExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet 自适应预览">
    <BottomSheetResponsiveExample />
  </DocsPreview>
</ClientOnly>

### 默认内容、`drag-handle` 与 `footer` Slots

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetSlotsExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetSlotsExample.vue#script [script]

<<< @/examples/bottom-sheet/BottomSheetSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet Slots 预览">
    <BottomSheetSlotsExample />
  </DocsPreview>
</ClientOnly>

### `container-color`

`container-color` 默认关闭。开启后，standard Bottom sheet 的面板背景改用与 `variant="modal"` 相同的 surface-container-low 语义色；`variant="modal"` 本身始终使用该语义色，不受属性影响。下方示例在同一个 standard Bottom sheet 上切换该属性，以便观察容器色变化。

:::: details 查看示例代码
::: code-group

<<< @/examples/bottom-sheet/BottomSheetContainerColorExample.vue#template [template]

<<< @/examples/bottom-sheet/BottomSheetContainerColorExample.vue#script [script]

<<< @/examples/bottom-sheet/BottomSheetContainerColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Bottom sheet 容器语义色预览">
    <BottomSheetContainerColorExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 受控打开状态，使用 `v-model` |
| `variant` | `'auto' \| 'standard' \| 'modal'` | `'auto'` | 布局变体；auto 根据 `breakpoint` 选择 |
| `breakpoint` | `number` | `840` | auto 切换到 standard 的最小视口宽度，单位为 CSS px |
| `width` | `number \| string` | 未设置 | 首选宽度；数字与纯数字字符串按 px 处理，其他字符串需为 trim 后合法的 CSS 宽度值，非法时使用默认宽度；最终仍受 640px 最大宽度限制 |
| `attach` | `string \| HTMLElement` | `'body'` | modal 的 Teleport 目标；standard 忽略。位于 `MatAppRoot` 内且省略时自动进入该 AppRoot 的模态层，指向 AppRoot 根元素时同样按应用范围展示 |
| `scrim` | `boolean` | `true` | modal 是否显示帷幕；false 时仍阻止背景指针交互 |
| `closeOnBack` | `boolean` | `true` | 模板属性为 `close-on-back`；是否允许点击 modal 帷幕关闭 |
| `dragHandle` | `boolean` | `true` | 模板属性为 `drag-handle`；是否显示顶部拖动把手 |
| `expanded` | `'normal' \| 'full' \| number \| string` | `'normal'` | normal 使用自然内容高度，full 使用当前最大展开高度；数字与纯数字字符串按 px 处理，其他字符串按合法 CSS `block-size` 处理；实际高度不会低于 64px，非法值回退 normal |
| `virtualExpand` | `boolean` | `false` | 模板属性为 `virtual-expand`；normal 状态下内容区向下滚轮或向上滑动时请求 full |
| `dragHandleLabel` | `string` | `'展开底部面板'` | 模板属性为 `drag-handle-label`；预览状态下把手的可访问名称 |
| `collapseDragHandleLabel` | `string` | `'折叠底部面板'` | 模板属性为 `collapse-drag-handle-label`；展开的 standard 状态下把手的可访问名称 |
| `expandedDragHandleLabel` | `string` | `'关闭底部面板'` | 模板属性为 `expanded-drag-handle-label`；展开的 modal 状态下把手的可访问名称 |
| `draggable` | `boolean` | `true` | 是否允许通过把手拖动展开、回到 normal 或关闭 |
| `content` | `string` | 未设置 | 纯文本内容便利属性；需要标题、说明或操作布局时使用默认 Slot |
| `containerColor` | `boolean` | `false` | standard 布局使用与 modal 相同的容器背景语义色；modal 布局始终使用该语义色 |
| `shadow` | `boolean` | `true` | 是否显示 Material 3 level 1 阴影，切换带效果过渡 |
| `rounded` | `boolean` | `true` | 是否显示顶部 extra-large 圆角，切换带效果过渡 |

未消费的属性、原生事件、`class` 和 `style` 传给根元素；BottomSheet 会过滤已移除的 `closable`、`closeLabel` 和 `title` 属性。Modal 根为原生 `<dialog>`，standard 根为原生 `<aside>`。Modal 必须提供 `aria-label` 或 `aria-labelledby`；如果使用默认 Slot 中的标题，请自行设置对应的 `id` 并通过 `aria-labelledby` 关联。`attach` 无法解析时组件会给出警告并请求把 `modelValue` 更新为 `false`。

Bottom sheet 的宽度不超过 640px。宽屏顶部安全间距至少为 56px，窄屏至少为 72px；normal 状态按内容自然高度展示，超出最大高度时只滚动内容区域。`footer` 固定在内容区下方。把手的完整交互行至少为 48px，灰色视觉条只负责显示。

### 方法

组件没有公共方法。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | Escape、允许的帷幕点击，或 normal 状态向下拖动达到阈值时请求关闭并发出 `false` |
| `update:expanded` | `'normal' \| 'full'` | 键盘操作、拖动或 `virtualExpand` 内容手势请求高度状态变化时发出；自定义高度向下拖动统一请求 `normal` |
| `opened` | 无 | 进入动画完成后触发 |
| `closed` | 无 | 退出动画完成且 DOM 清理后触发 |

组件是受控的：收到 `update:modelValue(false)` 或 `update:expanded` 后，使用者需要更新对应绑定值。把手的鼠标点击不会发出 `update:expanded`；Enter/Space 仍然执行键盘状态操作。Modal 打开后聚焦显式 `autofocus` 或第一个可交互元素，退出完成后恢复原焦点。Standard 不主动移动焦点，也不锁定页面滚动。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| `activator` | 唯一的当前 document 中 HTMLElement 根节点，作为 modal 关闭后的焦点恢复目标 |
| `drag-handle` | 替换默认 drag handle 行中的视觉内容；不能放置其他交互元素，只有 `dragHandle=true` 时渲染 |
| 默认 | 用户自行布局标题、说明、操作控件和其他内容的主要区域；内容过长时该区域可滚动 |
| `footer` | 固定在内容区下方的用户内容区域 |

## 参考来源

结构、尺寸、standard/modal 用途和响应式原则依据 Material 3 的 [Bottom sheets overview](https://m3.material.io/components/bottom-sheets/overview)、[specs](https://m3.material.io/components/bottom-sheets/specs) 与 [guidelines](https://m3.material.io/components/bottom-sheets/guidelines)。容器背景、extra-large 圆角、level 1 阴影、640px 最大宽度和 drag handle 交互行参考 [Google Material Components BottomSheet 官方实现说明](https://github.com/material-components/material-components-android/blob/master/docs/components/BottomSheet.md)。Web 端没有对应的 Material Web 组件，本实现使用 Vue、原生 `<dialog>` 和 CSS 复刻用户可观察行为。

<script setup>
import BottomSheetContainerColorExample from '../examples/bottom-sheet/BottomSheetContainerColorExample.vue';
import BottomSheetExpandedExample from '../examples/bottom-sheet/BottomSheetExpandedExample.vue';
import BottomSheetResponsiveExample from '../examples/bottom-sheet/BottomSheetResponsiveExample.vue';
import BottomSheetRoundedExample from '../examples/bottom-sheet/BottomSheetRoundedExample.vue';
import BottomSheetShadowExample from '../examples/bottom-sheet/BottomSheetShadowExample.vue';
import BottomSheetSlotsExample from '../examples/bottom-sheet/BottomSheetSlotsExample.vue';
import BottomSheetVariantExample from '../examples/bottom-sheet/BottomSheetVariantExample.vue';
import BottomSheetVirtualExpandExample from '../examples/bottom-sheet/BottomSheetVirtualExpandExample.vue';
</script>
