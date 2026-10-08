---
title: Date picker 日期选择器
description: mat-date-picker 的日历面板、年份视图、v-model 绑定与外部容器外观约定。
llms: true
order: 41
---

# Date picker 日期选择器

## 组件简介

`<mat-date-picker>` 的组件导出名是 `MatDatePicker`。它提供 Material 3 日期选择面板，包含日期读出、月份与年份导航以及 6 行 7 列的日期网格。面板为透明背景，由外部容器提供外观与弹出控制。`v-model` 绑定选中的日期。

## 示例

### `v-model`

`v-model` 绑定本地时区当天 0 点的 `Date`，`null` 表示未选择。网格中高亮今天与选中日期，点击月外日期会同时选中并切换到所在月份。

:::: details 查看示例代码
::: code-group

<<< @/examples/date-picker/DatePickerBasicExample.vue#template [template]

<<< @/examples/date-picker/DatePickerBasicExample.vue#script [script]

<<< @/examples/date-picker/DatePickerBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Date picker v-model 预览">
    <DatePickerBasicExample />
  </DocsPreview>
</ClientOnly>

### 放入外部容器

面板自带透明背景；卡片、Dialog 或 Sheet 提供的背景色、圆角与阴影会直接成为面板外观。`color` 更换选中态强调色。

:::: details 查看示例代码
::: code-group

<<< @/examples/date-picker/DatePickerContainerExample.vue#template [template]

<<< @/examples/date-picker/DatePickerContainerExample.vue#script [script]

<<< @/examples/date-picker/DatePickerContainerExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Date picker 容器预览">
    <DatePickerContainerExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `Date \| null` | `null` | 选中的日期；值为本地时区当天 0 点的 `Date`，时间分量会被忽略，非法值发出 Vue 校验警告 |
| `color` | `string \| undefined` | `undefined` | Material 语义色、系统颜色角色或六位十六进制种子色，强调选中的日期与年份；省略时使用 primary |

面板宽度为 328px，超过容器时按容器收缩。日期网格支持键盘操作：选中日期（无选中时为今天）是唯一 Tab 停靠点，方向键按日或周移动焦点，Enter 与空格确认。未消费的 class、style、ARIA 属性和原生事件监听器传递给根元素。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 当天 0 点的 `Date` | 点击日期按钮（含月外日期）时发出；月份与年份切换不发出 |

## Slots

组件不提供 Slots。星期标签与标题文字由组件按浏览器默认语言渲染。

## 状态与无障碍

日期网格使用 `role="grid"` 语义，每个日期按钮带完整日期的 `aria-label`、`aria-pressed` 表示选中，`aria-current="date"` 标记今天。年视图的年份按钮带 `aria-pressed`。面板没有自动动画；交互状态使用共享状态令牌，焦点环在键盘聚焦时可见。

## 参考来源

面板结构（月份与年份选择、前后导航、星期标签、今天/选中/月外日期）依据 [Material 3 Date pickers 官方页面](https://m3.material.io/components/date-pickers/overview)（Specs 标签页，docked 结构去掉外层文本框）复刻；官方 Web 实现标记为不可用，本组件为按规格的 Vue 实现。

<script setup>
import DatePickerBasicExample from '../examples/date-picker/DatePickerBasicExample.vue';
import DatePickerContainerExample from '../examples/date-picker/DatePickerContainerExample.vue';
</script>
