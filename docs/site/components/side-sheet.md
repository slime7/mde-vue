---
title: Side sheet 侧边面板
description: mat-side-sheet 的 standard、modal、自适应布局、start/end 位置、帷幕和焦点行为。
llms: true
order: 102
---

# Side sheet 侧边面板

## 组件简介

`<mat-side-sheet>` 的组件导出名是 `MatSideSheet`。它从视口或布局容器的逻辑侧边展示补充内容，并提供 Material 3 的 `standard` 与 `modal` 两种变体。Standard 适合宽屏 supporting pane，与主内容并排；modal 从侧边覆盖进入并阻止背景交互。

默认 `variant="auto"`：视口宽度小于 840px 时使用 modal，更宽时使用 standard。`position="start|end"` 使用逻辑方向，默认从 end 边进入。自动模式不会把 Side sheet 替换成 Bottom sheet。

## 示例

### `standard` 与 `modal`

:::: details 查看示例代码
::: code-group

<<< @/examples/side-sheet/SideSheetVariantExample.vue#template [template]

<<< @/examples/side-sheet/SideSheetVariantExample.vue#script [script]

<<< @/examples/side-sheet/SideSheetVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Side sheet 变体预览">
    <SideSheetVariantExample />
  </DocsPreview>
</ClientOnly>

### `auto` 与 `breakpoint`

:::: details 查看示例代码
::: code-group

<<< @/examples/side-sheet/SideSheetResponsiveExample.vue#template [template]

<<< @/examples/side-sheet/SideSheetResponsiveExample.vue#script [script]

<<< @/examples/side-sheet/SideSheetResponsiveExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Side sheet 自适应预览">
    <SideSheetResponsiveExample />
  </DocsPreview>
</ClientOnly>

### `position`

:::: details 查看示例代码
::: code-group

<<< @/examples/side-sheet/SideSheetPositionExample.vue#template [template]

<<< @/examples/side-sheet/SideSheetPositionExample.vue#script [script]

<<< @/examples/side-sheet/SideSheetPositionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Side sheet position 预览">
    <SideSheetPositionExample />
  </DocsPreview>
</ClientOnly>

### 内容与操作 Slots

:::: details 查看示例代码
::: code-group

<<< @/examples/side-sheet/SideSheetSlotsExample.vue#template [template]

<<< @/examples/side-sheet/SideSheetSlotsExample.vue#script [script]

<<< @/examples/side-sheet/SideSheetSlotsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Side sheet Slots 预览">
    <SideSheetSlotsExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 受控打开状态，使用 `v-model` |
| `variant` | `'auto' \| 'standard' \| 'modal'` | `'auto'` | 布局变体；auto 根据 `breakpoint` 选择 |
| `breakpoint` | `number` | `840` | auto 切换到 standard 的最小视口宽度，单位为 CSS px |
| `position` | `'start' \| 'end'` | `'end'` | Sheet 依附的逻辑边缘 |
| `width` | `number \| string` | `400` | 首选宽度；数字按 px 处理，数值范围大于 0 且不超过 400；CSS 字符串最终也会限制在 400px 内 |
| `attach` | `string \| HTMLElement` | `'body'` | modal 的 Teleport 目标；standard 忽略 |
| `scrim` | `boolean` | `true` | modal 是否显示帷幕；false 时仍阻止背景指针交互 |
| `closeOnBack` | `boolean` | `true` | 模板属性为 `close-on-back`；是否允许点击 modal 帷幕关闭 |
| `draggable` | `boolean` | `true` | 是否允许触摸用户向依附边缘滑动关闭 |
| `closable` | `boolean` | `true` | 是否在默认头部显示内置关闭按钮 |
| `closeLabel` | `string` | `'关闭'` | 模板属性为 `close-label`；内置关闭按钮的非空可访问名称 |
| `title` | `string` | 未设置 | 简单标题；优先于 `title` Slot |
| `content` | `string` | 未设置 | 简单正文；优先于默认 Slot |

未消费的属性、原生事件、`class` 和 `style` 传给根元素。Modal 根为原生 `<dialog>`，standard 根为原生 `<aside>`。Modal 没有标题时必须提供 `aria-label` 或 `aria-labelledby`。`attach` 无法解析时组件会给出警告并请求把 `modelValue` 更新为 `false`。

Standard 必须放在横向 flex 父容器中才能与主内容并排；主内容通常使用 `flex: 1` 和 `min-inline-size: 0`，Side sheet 保持自身固定宽度。Side sheet 最大宽度为 400px；窄屏 modal 至少保留 16px 背景空间。内容过长时只滚动内容区，头部和底部区域保持可见。组件没有公共方法。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | Escape、允许的帷幕点击、关闭按钮或达到阈值的触摸滑动请求关闭时发出 `false` |
| `opened` | 无 | 进入动画完成后触发 |
| `closed` | 无 | 退出动画完成且 DOM 清理后触发 |

组件是受控的。Modal 打开后聚焦显式 `autofocus` 或第一个可交互元素，关闭完成后恢复原焦点；standard 不主动移动焦点，也不锁定页面滚动。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| `activator` | 唯一的当前 document 中 HTMLElement 根节点，作为 modal 关闭后的焦点恢复目标 |
| `header` | 完整替换默认头部；使用后 `title`、`actions` 和内置关闭按钮不会自动渲染 |
| `title` | 标题中的丰富 Vue 内容；`title` prop 存在时忽略 |
| 默认 | 可滚动正文中的丰富 Vue 内容；`content` prop 存在时忽略 |
| `actions` | 默认头部中的操作区域 |
| `footer` | 固定在内容区下方的底部操作区域 |

## 参考来源

结构、位置、standard/modal 用途和响应式原则依据 Material 3 的 [Side sheets overview](https://m3.material.io/components/side-sheets/overview)、[specs](https://m3.material.io/components/side-sheets/specs) 与 [guidelines](https://m3.material.io/components/side-sheets/guidelines)。Web 端没有对应的 Material Web 组件，本实现使用 Vue、原生 `<dialog>` 和 CSS 复刻用户可观察行为。

<script setup>
import SideSheetPositionExample from '../examples/side-sheet/SideSheetPositionExample.vue';
import SideSheetResponsiveExample from '../examples/side-sheet/SideSheetResponsiveExample.vue';
import SideSheetSlotsExample from '../examples/side-sheet/SideSheetSlotsExample.vue';
import SideSheetVariantExample from '../examples/side-sheet/SideSheetVariantExample.vue';
</script>
