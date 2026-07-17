---
title: Snackbar 消息提示
description: mat-snackbar 的 Material 3 底部消息提示、文字 action、全局 FIFO 队列和 Promise 函数。
llms: true
order: 110
---

# Snackbar 消息提示

## 组件简介

`<mat-snackbar>` 的组件导出名是 `MatSnackbar`。它用于展示短暂、非阻塞的操作结果或状态提示，并固定在视口底部。模板组件和命令式 `snackbar()` 会共同进入全局 FIFO 队列，任意时刻只显示一条通知；`toast` 是同一个函数的别名。

Snackbar 适合“保存完成”“已复制链接”这类无需立即作答的反馈。可选文字 action 适合与这条反馈直接相关的简短操作，例如“撤销”；一次只提供一个 action。它不提供多操作菜单、图标、颜色或挂载目标。需要用户决定、输入或确认时应使用 Dialog。

## 示例

### `v-model`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarModelValueExample.vue#template [template]

<<< @/examples/snackbar/SnackbarModelValueExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar v-model 预览">
    <SnackbarModelValueExample />
  </DocsPreview>
</ClientOnly>

### `text`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarTextExample.vue#template [template]

<<< @/examples/snackbar/SnackbarTextExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar text 预览">
    <SnackbarTextExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarDefaultSlotExample.vue#template [template]

<<< @/examples/snackbar/SnackbarDefaultSlotExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar 默认 Slot 预览">
    <SnackbarDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### 两行内容

两行由内容自然换行触发，不需要额外属性。此示例同时展示双行内容中的 action 与关闭入口；使用 `duration=0` 以便观察布局。

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarTwoLineExample.vue#template [template]

<<< @/examples/snackbar/SnackbarTwoLineExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar 两行内容预览">
    <SnackbarTwoLineExample />
  </DocsPreview>
</ClientOnly>

### `closable`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarClosableExample.vue#template [template]

<<< @/examples/snackbar/SnackbarClosableExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar closable 预览">
    <SnackbarClosableExample />
  </DocsPreview>
</ClientOnly>

### `close-label`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarCloseLabelExample.vue#template [template]

<<< @/examples/snackbar/SnackbarCloseLabelExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar close-label 预览">
    <SnackbarCloseLabelExample />
  </DocsPreview>
</ClientOnly>

### `close` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarCloseSlotExample.vue#template [template]

<<< @/examples/snackbar/SnackbarCloseSlotExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar close Slot 预览">
    <SnackbarCloseSlotExample />
  </DocsPreview>
</ClientOnly>

### `action-text`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarActionTextExample.vue#template [template]

<<< @/examples/snackbar/SnackbarActionTextExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar action-text 预览">
    <SnackbarActionTextExample />
  </DocsPreview>
</ClientOnly>

### `action` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarActionSlotExample.vue#template [template]

<<< @/examples/snackbar/SnackbarActionSlotExample.vue#script [script]

<<< @/examples/snackbar/SnackbarActionSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar action Slot 预览">
    <SnackbarActionSlotExample />
  </DocsPreview>
</ClientOnly>

### `position`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarPositionExample.vue#template [template]

<<< @/examples/snackbar/SnackbarPositionExample.vue#script [script]

<<< @/examples/snackbar/SnackbarPositionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar position 预览">
    <SnackbarPositionExample />
  </DocsPreview>
</ClientOnly>

### `duration`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarDurationExample.vue#template [template]

<<< @/examples/snackbar/SnackbarDurationExample.vue#script [script]

<<< @/examples/snackbar/SnackbarDurationExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar duration 预览">
    <SnackbarDurationExample />
  </DocsPreview>
</ClientOnly>

### `snackbar()` 与 `toast()`

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarFunctionExample.vue#template [template]

<<< @/examples/snackbar/SnackbarFunctionExample.vue#script [script]

<<< @/examples/snackbar/SnackbarFunctionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar 函数式调用预览">
    <SnackbarFunctionExample />
  </DocsPreview>
</ClientOnly>

### 全局队列

:::: details 查看示例代码
::: code-group

<<< @/examples/snackbar/SnackbarQueueExample.vue#template [template]

<<< @/examples/snackbar/SnackbarQueueExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Snackbar 全局队列预览">
    <SnackbarQueueExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 使用 `v-model` 请求展示或取消排队中的通知；收到 `false` 时，活动通知开始退出，排队通知直接取消 |
| `text` | `string` | 未设置 | 简短文本内容；默认 Slot 存在时忽略 |
| `actionText` | `string` | 未设置 | 可选 action 的非空文字；`action` Slot 存在时忽略 |
| `closable` | `boolean` | `false` | 是否显示内置关闭按钮；不影响自动关闭计时 |
| `closeLabel` | `string` | `'关闭'` | 内置关闭按钮的非空可访问名称 |
| `position` | `'left' \| 'center' \| 'right'` | `'center'` | 宽屏时的底部对齐位置；窄屏占满安全边距内的可用宽度 |
| `duration` | `number` | `4000` | 自动关闭等待时间，单位为毫秒；`0` 表示不自动关闭 |

未消费的 `class`、`style`、`id`、`aria-*` 与原生事件传给 Teleport 后的 Snackbar 根元素；根元素的 `role` 固定为 `status`，并固定使用 `aria-live="polite"`。没有 `text` 和默认 Slot 时组件不会展示，并请求把 `modelValue` 更新为 `false`。

组件没有公共方法，也不提供多个 action、图标、`color`、`attach` 或其他挂载位置属性。

### 命令式函数

从 `mdu-ui/functions` 导入函数：

```js
import { snackbar, toast } from 'mdu-ui/functions';

await snackbar({
  actionText: '撤销',
  closable: true,
  onAction() {
    // 执行与这条提示直接相关的操作。
  },
  text: '保存完成。',
});
```

`snackbar(options)` 只接受对象参数，`text` 为必填非空字符串；`actionText`、`closable`、`closeLabel`、`position`、`duration` 与组件同名属性一致。`onAction` 是可选函数，在用户点击 action 后调用。它返回 `Promise<void>`，会在退出动画完成、命令式宿主清理后结算。`toast === snackbar`，因此两者行为完全相同。

命令式调用只接受文本、action 回调和属性，不接受 HTML 字符串、VNode 或 Slots。参数不是对象、`text` 或 `actionText` 为空、`onAction` 不是函数、`duration` 不是大于等于零的有限数字，或其他选项无效时，函数返回 rejected Promise。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `false` | 自动计时结束、关闭按钮或 `close` Slot 调用 `close()`、内容缺失时请求关闭 |
| `action` | 无 | 用户点击内置 action，或 `action` Slot 调用 `action()`；当前 Snackbar 随即开始关闭 |
| `closed` | 无 | 退出动画完成、Snackbar DOM 已移除且下一条队列项可以展示时触发 |

通知显示期间不会移动焦点。自动关闭、action 和关闭操作都会开始本组件的退出动画，同时向绑定值请求 `false`；使用 `v-model` 时仍应同步更新绑定状态，避免应用状态与通知状态不一致。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | Snackbar 的 Vue 内容；存在时优先于 `text`，内容应保持简短且不放置额外可交互控件 |
| `action` | 可选 action 控件；存在时替代 `actionText`，并接收 `{ action }`，调用 `action()` 会派发 `action` 事件并关闭当前通知 |
| `close` | 可选关闭控件；存在时替代内置关闭按钮，并接收 `{ close }`，调用 `close()` 请求关闭当前通知 |

`action` Slot 即使未设置 `actionText` 也会展示，`close` Slot 即使 `closable=false` 也会展示。自定义 action 与关闭控件需要由自身提供可访问名称和至少 48px 的交互目标。

## 队列、显示与无障碍

模板 `<mat-snackbar v-model="open">` 与每次 `snackbar()` / `toast()` 调用共享同一个全局 FIFO 队列。活动通知完成 200ms 退出动画后，才会激活下一条；不会堆叠显示。排队中的模板通知在 `v-model=false` 或组件卸载时取消。命令式调用没有独立取消句柄，Promise 在对应通知显示并关闭后结算。

默认显示时间为 4 秒，即使设置 action 或 `closable=true` 也不改变；需要常驻通知时设置 `duration=0`。Snackbar 使用底部安全边距，窄屏一行最小高度为 48px、两行自然扩展为 64px；宽屏支持左、中、右对齐。表面使用 Material 3 inverse surface、inverse on surface 与 inverse primary 角色，形状为 extra-small 圆角。文本起始留白为 16px，文本与尾部操作区相隔 24px，action 末端保留 8px；内置 action 与关闭控件都保留 48px 交互目标，关闭图标为 24px。

根元素使用 `role="status"` 和礼貌播报，不会抢占焦点。自动关闭的 Snackbar 不能是操作结果的唯一反馈：应在触发位置同时提供等价、可持续读取的行内反馈，例如保存状态文字或错误说明。

## 参考来源

外观、尺寸、间距与关闭图标目标依据 Material 3 [Snackbar specs](https://m3.material.io/components/snackbar/specs)。单条展示、顺序通知、显示时长、内容限制与反馈建议依据 Material 3 [Snackbar guidelines](https://m3.material.io/components/snackbar/guidelines)。

<script setup>
import SnackbarClosableExample from '../examples/snackbar/SnackbarClosableExample.vue';
import SnackbarActionSlotExample from '../examples/snackbar/SnackbarActionSlotExample.vue';
import SnackbarActionTextExample from '../examples/snackbar/SnackbarActionTextExample.vue';
import SnackbarCloseLabelExample from '../examples/snackbar/SnackbarCloseLabelExample.vue';
import SnackbarCloseSlotExample from '../examples/snackbar/SnackbarCloseSlotExample.vue';
import SnackbarDefaultSlotExample from '../examples/snackbar/SnackbarDefaultSlotExample.vue';
import SnackbarTwoLineExample from '../examples/snackbar/SnackbarTwoLineExample.vue';
import SnackbarDurationExample from '../examples/snackbar/SnackbarDurationExample.vue';
import SnackbarFunctionExample from '../examples/snackbar/SnackbarFunctionExample.vue';
import SnackbarModelValueExample from '../examples/snackbar/SnackbarModelValueExample.vue';
import SnackbarPositionExample from '../examples/snackbar/SnackbarPositionExample.vue';
import SnackbarQueueExample from '../examples/snackbar/SnackbarQueueExample.vue';
import SnackbarTextExample from '../examples/snackbar/SnackbarTextExample.vue';
</script>
