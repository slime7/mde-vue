---
title: Hover 悬停状态
description: mat-hover 的作用域 Slot、受控状态和进入离开延迟。
llms: true
order: 119
---

# Hover 悬停状态

## 组件简介

`<mat-hover>` 的组件导出名是 `MatHover`。它不渲染包装元素，通过默认作用域 Slot 为使用方提供 `isHovering` 状态和目标元素事件 props，适合把悬停状态交给任意原生元素或组件。

## 示例

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/hover/HoverDefaultExample.vue#template [template]

<<< @/examples/hover/HoverDefaultExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Hover 默认 Slot 预览">
    <HoverDefaultExample />
  </DocsPreview>
</ClientOnly>

### openDelay 与 closeDelay

:::: details 查看示例代码
::: code-group

<<< @/examples/hover/HoverDelayExample.vue#template [template]

<<< @/examples/hover/HoverDelayExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Hover 延迟预览">
    <HoverDelayExample />
  </DocsPreview>
</ClientOnly>

### 受控 modelValue

:::: details 查看示例代码
::: code-group

<<< @/examples/hover/HoverControlledExample.vue#template [template]

<<< @/examples/hover/HoverControlledExample.vue#script [script]

<<< @/examples/hover/HoverControlledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Hover 受控状态预览">
    <HoverControlledExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean \| null` | `null` | 显式传入时使用受控状态；省略时由组件根据进入和离开事件维护状态。 |
| `disabled` | `boolean` | `false` | 禁止向外同步 hover 状态，但组件仍记录真实指针状态。重新启用时同步当前状态。 |
| `openDelay` | `number \| string` | `0` | 进入目标后等待的毫秒数；非有限或负值按 `0` 处理。 |
| `closeDelay` | `number \| string` | `0` | 离开目标后等待的毫秒数；非有限或负值按 `0` 处理。 |

组件没有公开方法。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | 非 disabled 状态下，进入或离开延迟完成，或 disabled 重新启用时触发。 |

### Slots

| Slot | 参数 | 内容约束 |
| --- | --- | --- |
| 默认 Slot | `{ isHovering: boolean \| null, props: { onMouseenter, onMouseleave } }` | 使用 `props` 绑定到需要观察 hover 的目标元素；组件不要求固定根元素。 |

### 状态行为

省略 `modelValue` 时，Slot 初始收到 `null`，首次进入或离开完成后变为 `true` 或 `false`。显式传入 `modelValue` 后，组件只通过 `update:modelValue` 请求父级更新，Slot 状态以父级传入值为准。新的进入或离开操作会取消相反方向尚未完成的延迟。

<script setup>
import HoverControlledExample from '../examples/hover/HoverControlledExample.vue';
import HoverDefaultExample from '../examples/hover/HoverDefaultExample.vue';
import HoverDelayExample from '../examples/hover/HoverDelayExample.vue';
</script>
