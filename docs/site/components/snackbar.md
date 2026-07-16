---
title: Snackbar 消息提示
description: mat-snackbar 的 Material 3 底部消息提示、全局 FIFO 队列、关闭选项和 Promise 函数。
llms: true
order: 110
---

# Snackbar 消息提示

## 组件简介

`<mat-snackbar>` 的组件导出名是 `MatSnackbar`。它用于展示短暂、非阻塞的操作结果或状态提示，并固定在视口底部。模板组件和命令式 `snackbar()` 会共同进入全局 FIFO 队列，任意时刻只显示一条通知；`toast` 是同一个函数的别名。

Snackbar 适合“保存完成”“已复制链接”这类无需立即作答的反馈。它不提供通用操作按钮、图标、颜色或挂载目标；可选关闭按钮是唯一内置操作。需要用户决定、输入或确认时应使用 Dialog。

## 示例

### `v-model`

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarModelValueExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar v-model 预览">
    <SnackbarModelValueExample />
  </DocsPreview>
</ClientOnly>

### `text`

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarTextExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar text 预览">
    <SnackbarTextExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarDefaultSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar 默认 Slot 预览">
    <SnackbarDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `closable`

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarClosableExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar closable 预览">
    <SnackbarClosableExample />
  </DocsPreview>
</ClientOnly>

### `close-label`

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarCloseLabelExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar close-label 预览">
    <SnackbarCloseLabelExample />
  </DocsPreview>
</ClientOnly>

### `close` Slot

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarCloseSlotExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar close Slot 预览">
    <SnackbarCloseSlotExample />
  </DocsPreview>
</ClientOnly>

### `position`

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarPositionExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar position 预览">
    <SnackbarPositionExample />
  </DocsPreview>
</ClientOnly>

### `duration`

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarDurationExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar duration 预览">
    <SnackbarDurationExample />
  </DocsPreview>
</ClientOnly>

### `snackbar()` 与 `toast()`

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarFunctionExample.vue
:::

<ClientOnly>
  <DocsPreview label="Snackbar 函数式调用预览">
    <SnackbarFunctionExample />
  </DocsPreview>
</ClientOnly>

### 全局队列

::: details 查看示例代码
<<< @/examples/snackbar/SnackbarQueueExample.vue
:::

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
| `closable` | `boolean` | `false` | 是否显示内置关闭按钮；不影响自动关闭计时 |
| `closeLabel` | `string` | `'关闭'` | 内置关闭按钮的非空可访问名称 |
| `position` | `'left' \| 'center' \| 'right'` | `'center'` | 宽屏时的底部对齐位置；窄屏占满安全边距内的可用宽度 |
| `duration` | `number` | `4000` | 自动关闭等待时间，单位为毫秒；`0` 表示不自动关闭 |

未消费的 `class`、`style`、`id`、`aria-*` 与原生事件传给 Teleport 后的 Snackbar 根元素；根元素的 `role` 固定为 `status`，并固定使用 `aria-live="polite"`。没有 `text` 和默认 Slot 时组件不会展示，并请求把 `modelValue` 更新为 `false`。

组件没有公共方法，也不提供 `color`、操作按钮、图标、`attach` 或其他挂载位置属性。

### 命令式函数

从 `mdu-ui/functions` 导入函数：

```js
import { snackbar, toast } from 'mdu-ui/functions';

await snackbar({
  closable: true,
  text: '保存完成。',
});
```

`snackbar(options)` 只接受对象参数，`text` 为必填非空字符串；`closable`、`closeLabel`、`position`、`duration` 与组件同名属性一致。它返回 `Promise<void>`，会在退出动画完成、命令式宿主清理后结算。`toast === snackbar`，因此两者行为完全相同。

命令式调用只接受文本和属性，不接受 HTML 字符串、VNode 或 Slots。参数不是对象、`text` 为空、`duration` 不是大于等于零的有限数字，或其他选项无效时，函数返回 rejected Promise。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `false` | 自动计时结束、关闭按钮或 `close` Slot 调用 `close()`、内容缺失时请求关闭 |
| `closed` | 无 | 退出动画完成、Snackbar DOM 已移除且下一条队列项可以展示时触发 |

通知显示期间不会移动焦点。自动关闭和关闭操作都会开始本组件的退出动画，同时向绑定值请求 `false`；使用 `v-model` 时仍应同步更新绑定状态，避免应用状态与通知状态不一致。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | Snackbar 的 Vue 内容；存在时优先于 `text`，内容应保持简短且不放置额外可交互控件 |
| `close` | 可选关闭控件；存在时替代内置关闭按钮，并接收 `{ close }`，调用 `close()` 请求关闭当前通知 |

`close` Slot 即使 `closable=false` 也会展示。需要可访问名称和足够大的交互目标时，应由自定义控件自身负责。

## 队列、显示与无障碍

模板 `<mat-snackbar v-model="open">` 与每次 `snackbar()` / `toast()` 调用共享同一个全局 FIFO 队列。活动通知完成 200ms 退出动画后，才会激活下一条；不会堆叠显示。排队中的模板通知在 `v-model=false` 或组件卸载时取消。命令式调用没有独立取消句柄，Promise 在对应通知显示并关闭后结算。

默认显示时间为 4 秒，即使 `closable=true` 也不改变；需要常驻通知时设置 `duration=0`。Snackbar 使用底部安全边距，窄屏一行最小高度为 48px、两行自然扩展为 64px；宽屏支持左、中、右对齐。表面使用 Material 3 inverse surface、inverse on surface 与 inverse primary 角色，形状为 extra-small 圆角。文本起始留白为 16px，关闭控件保留 48px 交互目标与 24px 图标。

根元素使用 `role="status"` 和礼貌播报，不会抢占焦点。自动关闭的 Snackbar 不能是操作结果的唯一反馈：应在触发位置同时提供等价、可持续读取的行内反馈，例如保存状态文字或错误说明。

## 参考来源

外观、尺寸、间距与关闭图标目标依据 Material 3 [Snackbar specs](https://m3.material.io/components/snackbar/specs)。单条展示、顺序通知、显示时长、内容限制与反馈建议依据 Material 3 [Snackbar guidelines](https://m3.material.io/components/snackbar/guidelines)。

<script setup>
import SnackbarClosableExample from '../examples/snackbar/SnackbarClosableExample.vue';
import SnackbarCloseLabelExample from '../examples/snackbar/SnackbarCloseLabelExample.vue';
import SnackbarCloseSlotExample from '../examples/snackbar/SnackbarCloseSlotExample.vue';
import SnackbarDefaultSlotExample from '../examples/snackbar/SnackbarDefaultSlotExample.vue';
import SnackbarDurationExample from '../examples/snackbar/SnackbarDurationExample.vue';
import SnackbarFunctionExample from '../examples/snackbar/SnackbarFunctionExample.vue';
import SnackbarModelValueExample from '../examples/snackbar/SnackbarModelValueExample.vue';
import SnackbarPositionExample from '../examples/snackbar/SnackbarPositionExample.vue';
import SnackbarQueueExample from '../examples/snackbar/SnackbarQueueExample.vue';
import SnackbarTextExample from '../examples/snackbar/SnackbarTextExample.vue';
</script>
