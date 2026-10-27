---
title: Notification 通知
description: mat-notification 的 Android 风格单条通知卡片、六向定位、语义配色、操作与关闭。
llms: true
order: 110.5
---

# Notification 通知

## 组件简介

`<mat-notification>` 的组件导出名是 `MatNotification`。它展示单条 Android 风格通知卡片，包含标题、正文、时间、前置图标、最多三个操作和关闭入口。

独立使用时，组件按自然布局渲染在当前位置。位于 `<mat-layout>` 或 `<mat-app-root>` 内时，组件自动挂载到最近的布局根或应用覆盖层，并按 `position` 吸附到容器角落，同时避让布局 padding 与安全区。它不提供通知中心、通知队列、通知渠道或系统级通知权限。

Snackbar 适合短暂、只有一条文字操作反馈的场景；Notification 适合需要常驻、包含多条操作或需要展示标题、时间与图标的通知。两者可以同时存在：Snackbar 固定在底部，Notification 默认显示在右上角。

## 示例

### `modelValue`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationModelValueExample.vue#template [template]

<<< @/examples/notification/NotificationModelValueExample.vue#script [script]

<<< @/examples/notification/NotificationModelValueExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification v-model 预览">
    <NotificationModelValueExample />
  </DocsPreview>
</ClientOnly>

### `title`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationTitleExample.vue#template [template]

<<< @/examples/notification/NotificationTitleExample.vue#script [script]

<<< @/examples/notification/NotificationTitleExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification title 预览">
    <NotificationTitleExample />
  </DocsPreview>
</ClientOnly>

### `text`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationTextExample.vue#template [template]

<<< @/examples/notification/NotificationTextExample.vue#script [script]

<<< @/examples/notification/NotificationTextExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification text 预览">
    <NotificationTextExample />
  </DocsPreview>
</ClientOnly>

### `icon`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationIconExample.vue#template [template]

<<< @/examples/notification/NotificationIconExample.vue#script [script]

<<< @/examples/notification/NotificationIconExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification icon 预览">
    <NotificationIconExample />
  </DocsPreview>
</ClientOnly>

### `time`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationTimeExample.vue#template [template]

<<< @/examples/notification/NotificationTimeExample.vue#script [script]

<<< @/examples/notification/NotificationTimeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification time 预览">
    <NotificationTimeExample />
  </DocsPreview>
</ClientOnly>

### `actions`

最多展示前三项。用户触发任一操作后，组件先请求关闭，再派发 `action` 事件。

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationActionsExample.vue#template [template]

<<< @/examples/notification/NotificationActionsExample.vue#script [script]

<<< @/examples/notification/NotificationActionsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification actions 预览">
    <NotificationActionsExample />
  </DocsPreview>
</ClientOnly>

### `closable`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationClosableExample.vue#template [template]

<<< @/examples/notification/NotificationClosableExample.vue#script [script]

<<< @/examples/notification/NotificationClosableExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification closable 预览">
    <NotificationClosableExample />
  </DocsPreview>
</ClientOnly>

### `closeLabel`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationCloseLabelExample.vue#template [template]

<<< @/examples/notification/NotificationCloseLabelExample.vue#script [script]

<<< @/examples/notification/NotificationCloseLabelExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification closeLabel 预览">
    <NotificationCloseLabelExample />
  </DocsPreview>
</ClientOnly>

### `position`

在布局容器内切换六个方位。容器顶部和底部的 16px 间距由组件的视口边距提供。

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationPositionExample.vue#template [template]

<<< @/examples/notification/NotificationPositionExample.vue#script [script]

<<< @/examples/notification/NotificationPositionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification position 预览">
    <NotificationPositionExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationColorExample.vue#template [template]

<<< @/examples/notification/NotificationColorExample.vue#script [script]

<<< @/examples/notification/NotificationColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification color 预览">
    <NotificationColorExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationDefaultSlotExample.vue#template [template]

<<< @/examples/notification/NotificationDefaultSlotExample.vue#script [script]

<<< @/examples/notification/NotificationDefaultSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification 默认 Slot 预览">
    <NotificationDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `icon` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationIconSlotExample.vue#template [template]

<<< @/examples/notification/NotificationIconSlotExample.vue#script [script]

<<< @/examples/notification/NotificationIconSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification icon Slot 预览">
    <NotificationIconSlotExample />
  </DocsPreview>
</ClientOnly>

### `actions` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationActionsSlotExample.vue#template [template]

<<< @/examples/notification/NotificationActionsSlotExample.vue#script [script]

<<< @/examples/notification/NotificationActionsSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification actions Slot 预览">
    <NotificationActionsSlotExample />
  </DocsPreview>
</ClientOnly>

### `close` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/notification/NotificationCloseSlotExample.vue#template [template]

<<< @/examples/notification/NotificationCloseSlotExample.vue#script [script]

<<< @/examples/notification/NotificationCloseSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Notification close Slot 预览">
    <NotificationCloseSlotExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 使用 `v-model` 控制展示；请求关闭时发出 `false` |
| `title` | `string` | 未设置 | 通知标题；空字符串视为未设置 |
| `text` | `string` | 未设置 | 通知正文；默认 Slot 存在时由 Slot 提供正文 |
| `icon` | `string` | 未设置 | 前置 Material Symbols 图标；`icon` Slot 存在时忽略 |
| `time` | `string` | 未设置 | 标题行末尾的时间文本；空字符串视为未设置 |
| `actions` | `Array<{ text: string, icon?: string }>` | `[]` | 操作列表；只展示前三项，`text` 必须非空，`icon` 可选 |
| `closable` | `boolean` | `true` | 是否显示内置关闭按钮；`close` Slot 存在时仍展示 Slot |
| `closeLabel` | `string` | `'关闭'` | 内置关闭按钮的非空可访问名称 |
| `position` | `'top-start' \| 'top-center' \| 'top-end' \| 'bottom-start' \| 'bottom-center' \| 'bottom-end'` | `'top-end'` | 自动定位时的通知方位；独立使用时忽略 |
| `color` | `string` | 未设置 | 语义色或六位十六进制种子色 `#RRGGBB`；设置后替换默认表面色 |

未消费的 `class`、`style`、`id`、`aria-*` 与原生事件传给 Teleport 后的通知根元素。根元素固定使用 `role="status"`、`aria-live="polite"` 和 `aria-atomic="true"`。没有标题、正文或默认 Slot 时组件不会展示，并请求把 `modelValue` 更新为 `false`。

组件没有公共方法，也不提供 `attach`、自动关闭时长、通知队列、分组、进度条或系统级通知能力。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `false` | 关闭按钮、`close` Slot 或任一操作请求关闭；内容缺失时也会请求关闭 |
| `action` | `{ action, index }` | 用户点击内置操作或 `actions` Slot 调用 `action(action, index)`；随后开始关闭 |
| `closed` | 无 | 退出动画完成、通知 DOM 已移除时触发 |

通知显示期间不会移动焦点。自动关闭不存在，通知会一直保留，直到用户关闭、触发操作或应用把 `modelValue` 设为 `false`。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 通知正文；存在时替代 `text`，标题和时间仍保留 |
| `icon` | 前置图标或头像；存在时替代 `icon` 属性 |
| `actions` | 操作区；替代默认操作按钮，并接收 `{ actions, action, close }`。`action(item, index)` 会派发 `action` 事件并关闭通知，`close()` 只请求关闭 |
| `close` | 关闭控件；存在时替代内置关闭按钮，并接收 `{ close }` |

自定义操作与关闭控件需要由自身提供可访问名称和至少 48px 的交互目标。

## 定位与样式

组件按以下优先级选择定位容器：

1. 最近的 `<mat-layout>`：挂载到布局根元素，使用布局的 `padding` 避让 Aside、Navigation bar 等已登记边缘。
2. 最近的 `<mat-app-root>`：挂载到应用自由覆盖层，使用应用布局 padding 避让 App bar、Toolbar、Navigation 和安全区。
3. 没有上述祖先：不 Teleport，按自然布局留在原位置；`position` 不生效。

自动定位时，通知与容器边缘保持 16px 视口边距，最大宽度为 400px，窄容器中自动收缩。`top-*` 从容器顶部展开，`bottom-*` 从容器底部展开，进入与退出动画的方向随之变化。同一方位只应展示一条通知；组件不会把同时显示的多条通知排队或堆叠。

默认表面使用 `surfaceContainerHigh`、`onSurface` 与 `onSurfaceVariant`，形状为 28px extra-large 圆角，阴影为 level 2。前置图标与操作使用 primary；设置 `color` 后，卡片、正文、图标和操作统一改用对应语义色的 container / on-container 角色。标题使用 title medium，正文使用 body medium，时间使用 label medium，操作使用 label large。

根元素使用礼貌的状态播报，不会抢占焦点。常驻通知不应是唯一反馈：关闭后仍应能从应用界面重新查看同等信息。

## 参考来源

折叠通知的结构、前置图标、标题、时间、最多三个操作和关闭入口参考 Android [创建通知](https://developer.android.com/develop/ui/views/notifications/build-notification) 与 AOSP [notification_template_material_base.xml](https://android.googlesource.com/platform/frameworks/base/+/HEAD/core/res/res/layout/notification_template_material_base.xml)。卡片尺寸和间距按 Web 桌面场景调整。

<script setup>
import NotificationActionsExample from '../examples/notification/NotificationActionsExample.vue';
import NotificationActionsSlotExample from '../examples/notification/NotificationActionsSlotExample.vue';
import NotificationClosableExample from '../examples/notification/NotificationClosableExample.vue';
import NotificationCloseLabelExample from '../examples/notification/NotificationCloseLabelExample.vue';
import NotificationCloseSlotExample from '../examples/notification/NotificationCloseSlotExample.vue';
import NotificationColorExample from '../examples/notification/NotificationColorExample.vue';
import NotificationDefaultSlotExample from '../examples/notification/NotificationDefaultSlotExample.vue';
import NotificationIconExample from '../examples/notification/NotificationIconExample.vue';
import NotificationIconSlotExample from '../examples/notification/NotificationIconSlotExample.vue';
import NotificationModelValueExample from '../examples/notification/NotificationModelValueExample.vue';
import NotificationPositionExample from '../examples/notification/NotificationPositionExample.vue';
import NotificationTextExample from '../examples/notification/NotificationTextExample.vue';
import NotificationTimeExample from '../examples/notification/NotificationTimeExample.vue';
import NotificationTitleExample from '../examples/notification/NotificationTitleExample.vue';
</script>
