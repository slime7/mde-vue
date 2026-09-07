---
title: Aside 边缘栏
description: mat-aside 停靠于布局容器边缘，提供统一的边缘占用、正交避让与切入退场过渡。
llms: true
order: 117
---

# Aside 边缘栏

## 组件简介

`<mat-aside>` 的组件导出名是 `MatAside`。它是专用于停靠在 `mat-layout` 或 `mat-app-root` 边缘的布局基础设施组件。通过统一管理四个停靠方向（`top`、`bottom`、`left`、`right`）的厚度尺寸与安全区留白，协调边缘占据与正交方向上的互斥避让，未来可作为各边缘组件（如顶部应用栏、导航侧栏、底部栏等）的底层根 DOM。

组件的核心排布机制遵循“先出现先占满”原则：在模板 DOM 中居前的边缘组件优先占满延展方向（例如居前的顶部栏占满横向整宽），而居后的边缘组件根据前序组件的占用尺寸自动偏移避让（例如居后的侧边栏高度自动避让顶部栏）。

## 示例

### 基础使用

设置 `location="left"` 与 `block-size="160"` 即可在布局左侧（或起始侧）建立固定宽度的边缘侧栏。

:::: details 查看示例代码
::: code-group

<<< @/examples/aside/AsideBasicExample.vue#template [template]

<<< @/examples/aside/AsideBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Aside 基础使用预览" stacked>
    <AsideBasicExample />
  </DocsPreview>
</ClientOnly>

### 组件顺序与避让

在 DOM 树中先声明的边缘组件优先占满延展方向，后声明的组件根据前序组件尺寸避让。以下示例通过不同对比背景色，直观展示头部栏在前（顶部占满横向整宽）与侧边栏在前（侧边栏占满纵向整高）的排布效果。

:::: details 查看示例代码
::: code-group

<<< @/examples/aside/AsideOrderExample.vue#template [template]

<<< @/examples/aside/AsideOrderExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Aside 组件顺序对照预览" stacked>
    <AsideOrderExample />
  </DocsPreview>
</ClientOnly>

### 动态切换显隐与回流

使用 `v-model` 控制 Aside 的显示与收起。收起时 Aside 沿边缘方向平滑滑出，Layout 容器的正文留白同步弹性收缩。

:::: details 查看示例代码
::: code-group

<<< @/examples/aside/AsideModelValueExample.vue#template [template]

<<< @/examples/aside/AsideModelValueExample.vue#script [script]

<<< @/examples/aside/AsideModelValueExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Aside 动态切换预览" stacked>
    <AsideModelValueExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `true` | 受控显示状态，支持 `v-model` 双向绑定。 |
| `as` | `string` | `'aside'` | 根元素渲染的 HTML 标签，如 `'aside'`、`'header'`、`'nav'` 等。 |
| `location` | `'top' | 'bottom' | 'start' | 'end'` | `'start'` | 依附的停靠边缘。 |
| `blockSize` | `number | string` | 必填 | 垂直于停靠边缘方向的占用厚度。数值自动转为 px。 |
| `safeAreaSize` | `number | string` | `0` | 边缘方向的安全区留白大小。组件总厚度为 `blockSize + safeAreaSize`。 |
| `bordered` | `boolean` | `false` | 是否在面向内容的一侧渲染 1px 分隔线。 |
| `zIndex` | `number | string | undefined` | `undefined` | 显式指定 CSS 层级；省略时根据 `location` 提供预设层级。 |

组件没有公开方法。未被消费的属性、`class`、`style` 作用于外层根元素。

## 事件

| 名称 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | 组件显示状态请求变更时触发。 |
| `opened` | 无 | 切入展开动画播放完毕后触发。 |
| `closed` | 无 | 退场收起动画播放完毕且清理完成后触发。 |

## Slots

| 名称 | 说明 |
| --- | --- |
| 默认 Slot | 边缘栏内部呈现的具体内容。 |

<script setup>
import AsideBasicExample from '../examples/aside/AsideBasicExample.vue';
import AsideOrderExample from '../examples/aside/AsideOrderExample.vue';
import AsideModelValueExample from '../examples/aside/AsideModelValueExample.vue';
</script>





