---
title: Switch 开关
description: mat-switch 的布尔 v-model、三档内置图标、配色、事件和默认 slot。
llms: true
order: 86
---

# Switch 开关

## 组件简介

`<mat-switch>` 的组件导出名是 `MatSwitch`。它切换一个独立设置并应立即产生效果。组件按 Material 3 使用 52×32px 轨道、16/24/28px 手柄、40px 状态层和至少 48px 的交互目标。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### 无图标与内置图标

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/SwitchIconsExample.vue#template [template]

<<< @/examples/selection/SwitchIconsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Switch 图标配置预览" stacked>
    <SwitchIconsExample />
  </DocsPreview>
</ClientOnly>

### `modelValue`

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/SwitchModelValueExample.vue#template [template]

<<< @/examples/selection/SwitchModelValueExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Switch modelValue 预览" stacked>
    <SwitchModelValueExample />
  </DocsPreview>
</ClientOnly>

### `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/SwitchDisabledExample.vue#template [template]

<<< @/examples/selection/SwitchDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Switch disabled 预览" stacked>
    <SwitchDisabledExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/selection/SwitchColorExample.vue#template [template]

<<< @/examples/selection/SwitchColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Switch color 预览" stacked>
    <SwitchColorExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | `v-model` 当前开关状态 |
| `icons` | `'none' \| 'selected' \| 'both'` | `'none'` | 不显示图标、只显示开启勾号或同时显示勾号与叉号 |
| `disabled` | `boolean` | `false` | 禁止指针与键盘交互 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 开启轨道、手柄图标和状态层的局部强调色 |

Switch 只表示二元状态，不用于在两个对立选项间选择。组件只承诺 Vue 状态绑定，不承诺表单提交、原生校验或表单重置。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | 下一布尔值 | 使用者切换开关 |
| `change` | 原生 `Event` | 内部 checkbox 发生 change |

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 描述开启状态作用的简短相邻标签；省略时必须提供 `aria-label` |

## 状态

组件支持关闭、开启、hover、focus-visible、pressed 和 disabled。按下时手柄扩展到 28px；减少动态效果偏好下关闭手柄与图标过渡。组件没有公开方法。

## 参考来源

尺寸、图标配置和即时生效行为依据 Material 3 [Switch specs](https://m3.material.io/components/switch/specs) 与 [Switch guidelines](https://m3.material.io/components/switch/guidelines)。

<script setup>
import SwitchColorExample from '../examples/selection/SwitchColorExample.vue';
import SwitchDisabledExample from '../examples/selection/SwitchDisabledExample.vue';
import SwitchIconsExample from '../examples/selection/SwitchIconsExample.vue';
import SwitchModelValueExample from '../examples/selection/SwitchModelValueExample.vue';
</script>
