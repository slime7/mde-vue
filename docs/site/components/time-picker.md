---
title: Time picker 时间选择器
description: mat-time-picker 的表盘面板、12/24 小时制、表盘与输入模式切换及 v-model 绑定。
llms: true
order: 42
---

# Time picker 时间选择器

## 组件简介

`<mat-time-picker>` 的组件导出名是 `MatTimePicker`。它提供 Material 3 时间选择面板，包含时间读出与表盘；支持 24 小时制与 12 小时制、表盘模式与输入模式切换。面板为透明背景，由外部容器提供外观与弹出控制。`v-model` 绑定 24 小时制 `HH:mm` 时间字符串。

## 示例

### `v-model`

`v-model` 绑定 `HH:mm` 字符串，`null` 表示未选择。选择小时后表盘自动进入分钟视图；分钟表盘除 5 分钟刻度外，还可以拖拽指针选择任意分钟。

:::: details 查看示例代码
::: code-group

<<< @/examples/time-picker/TimePickerBasicExample.vue#template [template]

<<< @/examples/time-picker/TimePickerBasicExample.vue#script [script]

<<< @/examples/time-picker/TimePickerBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Time picker v-model 预览">
    <TimePickerBasicExample />
  </DocsPreview>
</ClientOnly>

### 12 小时制与 24 小时制

通过 `format`（`'24h'` 或 `'12h'`）或便捷属性 `is-24-hour` 切换制式。12 小时制下表盘显示 1–12 单环刻度，右侧提供 AM/PM 时段切换器，`v-model` 输出 24 小时制 `HH:mm` 字符串。

:::: details 查看示例代码
::: code-group

<<< @/examples/time-picker/TimePickerFormatExample.vue#template [template]

<<< @/examples/time-picker/TimePickerFormatExample.vue#script [script]

<<< @/examples/time-picker/TimePickerFormatExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Time picker 制式切换预览">
    <TimePickerFormatExample />
  </DocsPreview>
</ClientOnly>

### 表盘模式与输入模式

通过 `mode` 属性（`'dial'` 或 `'input'`）控制当前交互模式，支持 `v-model:mode`。设置 `show-mode-toggle` 可显示底部模式切换按钮。处于输入模式时，通过 `#input` 插槽承载自定义输入界面。

:::: details 查看示例代码
::: code-group

<<< @/examples/time-picker/TimePickerModeExample.vue#template [template]

<<< @/examples/time-picker/TimePickerModeExample.vue#script [script]

<<< @/examples/time-picker/TimePickerModeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Time picker 模式切换预览">
    <TimePickerModeExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `string \| null` | `null` | 选中的时间；24 小时制 `HH:mm` 零填充字符串，非法值发出 Vue 校验警告 |
| `color` | `string \| undefined` | `undefined` | Material 语义色、系统颜色角色或六位十六进制种子色，强调读出、指针与选中刻度；省略时使用 primary |
| `format` | `'24h' \| '12h'` | `'24h'` | 时间显示制式 |
| `is24Hour` | `boolean \| undefined` | `undefined` | 是否为 24 小时制；显式传入时优先级高于 `format` |
| `mode` | `'dial' \| 'input'` | `'dial'` | 交互模式，支持 `v-model:mode` |
| `show-mode-toggle` | `boolean` | `false` | 是否在面板中显示表盘与输入模式的切换图标按钮 |

面板宽度为 328px，超过容器时按容器收缩。表盘是一个 `role="slider"` 的键盘表面：方向键按 1 调整，Home 与 End 跳到边界，小时视图按 Enter 或空格进入分钟视图。选择小时刻度后自动进入分钟视图；分钟视图在 5 分钟刻度之外支持按角度连续拖拽。未消费的 class、style、ARIA 属性和原生事件监听器传递给根元素。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `HH:mm` 字符串 | 小时或分钟值变化时发出；切换视图本身不发出 |
| `update:mode` | `'dial' \| 'input'` | 交互模式在表盘和输入模式之间切换时发出 |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `input` | 输入模式（`mode="input"`）下的自定义内容插槽 |

## 状态与无障碍

数字读出使用 `aria-pressed` 标记当前编辑的小时或分钟；12 小时制下的 AM/PM 选择器具备单选组（`role="radiogroup"` 与 `aria-checked`）语义；表盘提供 slider 语义（`aria-valuemin`、`aria-valuemax`、`aria-valuenow` 与中文 `aria-valuetext`），键盘聚焦时显示焦点环。模式切换按钮具备清晰的中文 `aria-label`。指针拖拽与刻度点击是即时反馈，不引入自动动画；减少动态效果偏好下指针过渡直接落位。

## 参考来源

时间选择器面板（数字读出、12/24 小时制、小时与分钟切换、表盘与输入模式切换）依据 [Material 3 Time pickers 官方页面](https://m3.material.io/components/time-pickers/overview) 复刻；官方 Web 实现标记为不可用，本组件为按规格的 Vue 实现。

<script setup>
import TimePickerBasicExample from '../examples/time-picker/TimePickerBasicExample.vue';
import TimePickerFormatExample from '../examples/time-picker/TimePickerFormatExample.vue';
import TimePickerModeExample from '../examples/time-picker/TimePickerModeExample.vue';
</script>
