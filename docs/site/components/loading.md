---
title: Loading 加载指示器
description: mat-loading 的短时不确定加载指示器、背景容器、尺寸范围和配色。
llms: true
order: 87
---

# Loading 加载指示器

## 组件简介

`<mat-loading>` 的组件导出名是 `MatLoading`。它对应 Material 3 Expressive 的 Loading indicator，用于表示 200ms 到 5s 的短时、不确定等待过程；活动指示器由官方 7 个 Material 3 形状循环变形并缓慢旋转，容器尺寸默认 48px。

组件根元素始终是块级 `div`，默认水平居中。`containment` 开启后在指示器外显示圆形背景容器，适合叠加在已有内容之上；活动形状按 38 : 48 的比例缩小并换成同组 on-container 内容色。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### `containment`

:::: details 查看示例代码
::: code-group

<<< @/examples/loading/LoadingContainmentExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loading containment 预览" stacked>
    <LoadingContainmentExample />
  </DocsPreview>
</ClientOnly>

### `size`

尺寸只接受数字或纯数字字符串，单位是 px，并限制在官方规格的 24 至 240 范围；越界值会收缩到最近的边界。

:::: details 查看示例代码
::: code-group

<<< @/examples/loading/LoadingSizeExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Loading size 预览" stacked>
    <LoadingSizeExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `containment` | `boolean` | `false` | 是否在活动指示器外显示圆形背景容器 |
| `size` | `number \| string` | `48` | 指示器宽高，单位 px；数字与纯数字字符串限制在 `24` 至 `240`，越界值收敛到边界 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 活动指示器强调色；`containment` 开启时自动使用同组 on-container 内容色 |

未被组件消费的 `aria-*`、`id`、`class`、`style` 和原生事件监听器会传给根元素。组件始终以 `role="progressbar"` 暴露加载语义，应通过 `aria-label` 说明正在加载的内容。

### 尺寸与颜色

根容器默认 48px。活动形状在无容器时铺满容器尺寸，开启 `containment` 后按 38 : 48 比例缩小并保持居中。默认配色使用 primary 强调色；显式 `color` 遵循项目统一组件配色规则，只替换强调色族。

## 事件

组件没有自定义事件。传入的原生 DOM 监听器会绑定到根元素。

## Slots

组件没有 Slots；不要在 `<mat-loading>` 内放置文字或其他内容。相邻文本或 `aria-label` 应承担加载状态说明。

## 状态

根元素提供 `role="progressbar"`、`aria-valuemin="0"` 与 `aria-valuemax="1"`，不确定加载不声明具体比例。活动形状在 7 个官方形状之间连续变形，并叠加整圈缓慢旋转。启用减少动态效果偏好时，组件停止形状变形与旋转，显示静态活动形状。组件没有公开方法。组件不应被装饰性使用，也不应从不确定加载切换到确定进度。

## 参考来源

使用时机、尺寸范围、背景容器、配色与无障碍语义依据 Material 3 [Loading indicator guidelines](https://m3.material.io/components/loading-indicator/guidelines)、[Specs](https://m3.material.io/components/loading-indicator/specs) 与 [Accessibility](https://m3.material.io/components/loading-indicator/accessibility)。活动指示器的 7 个形状取自 [Shape 官方页面](https://m3.material.io/styles/shape/overview-principles)。

<script setup>
import LoadingContainmentExample from '../examples/loading/LoadingContainmentExample.vue';
import LoadingSizeExample from '../examples/loading/LoadingSizeExample.vue';
</script>
