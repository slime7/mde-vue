---
title: Shape 形状
description: mat-shape 的 35 种 Material 3 Expressive 形状、尺寸、配色、根标签和内容。
llms: true
order: 39
---

# Shape 形状

## 组件简介

`<mat-shape>` 的组件导出名是 `MatShape`。它使用现代 CSS `clip-path: shape()` 展示 35 种 Material 3 Expressive 归一化形状，并可通过 `size`、`color`、`as` 和默认 Slot 作为装饰图形或内容容器使用。默认渲染 48px 的 primary circle，根元素为 `div`。

## 示例

### `name`

`name` 选择预定义轮廓。以下图鉴覆盖全部 35 个合法值；省略时使用 `circle`。

:::: details 查看示例代码
::: code-group

<<< @/examples/shape/ShapeNamesExample.vue#template [template]

<<< @/examples/shape/ShapeNamesExample.vue#script [script]

<<< @/examples/shape/ShapeNamesExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shape name 预览">
    <ShapeNamesExample />
  </DocsPreview>
</ClientOnly>

### `size`

`size` 同时控制形状宽高。数字与纯数字字符串按 px 处理，其他字符串须为合法正 CSS 长度。

:::: details 查看示例代码
::: code-group

<<< @/examples/shape/ShapeSizeExample.vue#template [template]

<<< @/examples/shape/ShapeSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shape size 预览">
    <ShapeSizeExample />
  </DocsPreview>
</ClientOnly>

### `color`

`color` 接受 Material 语义色、系统颜色角色或六位十六进制种子色。填充使用强调色，Slot 内容使用配对的 on-color。

:::: details 查看示例代码
::: code-group

<<< @/examples/shape/ShapeColorExample.vue#template [template]

<<< @/examples/shape/ShapeColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shape color 预览">
    <ShapeColorExample />
  </DocsPreview>
</ClientOnly>

### `as`

`as` 修改实际根元素。默认使用 `div`，也可根据所在文档结构改为其他合法 HTML 标签。

:::: details 查看示例代码
::: code-group

<<< @/examples/shape/ShapeAsExample.vue#template [template]

<<< @/examples/shape/ShapeAsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shape as 预览">
    <ShapeAsExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

默认 Slot 在形状内水平、垂直居中，超出轮廓的部分随 `clip-path` 裁剪。内容不会自动获得交互语义。

:::: details 查看示例代码
::: code-group

<<< @/examples/shape/ShapeSlotExample.vue#template [template]

<<< @/examples/shape/ShapeSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shape 默认 Slot 预览">
    <ShapeSlotExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | `'circle'` | 预定义形状名称；合法值见下方名称表，无效值发出 Vue 校验警告并防御性回退到 circle |
| `size` | `number \| string` | `48` | 正方形边长；数字与纯数字字符串按 px，其他字符串须为合法正 CSS 长度，非法值回退 `48px` |
| `color` | `string` | `'primary'` | Material 语义色、系统颜色角色或六位十六进制种子色 |
| `as` | `string` | `'div'` | 合法 HTML 标签名，用作实际根元素 |

`name` 合法值为：

`circle`、`square`、`slanted`、`arch`、`semicircle`、`oval`、`pill`、`triangle`、`arrow`、`fan`、`diamond`、`clamshell`、`pentagon`、`gem`、`very-sunny`、`sunny`、`4-sided-cookie`、`6-sided-cookie`、`7-sided-cookie`、`9-sided-cookie`、`12-sided-cookie`、`4-leaf-clover`、`8-leaf-clover`、`burst`、`soft-burst`、`boom`、`soft-boom`、`flower`、`puffy`、`puffy-diamond`、`ghost-ish`、`pixel-circle`、`pixel-triangle`、`bun`、`heart`。

组件没有公开方法。未消费的 class、style、ARIA 属性和原生事件监听器传递给实际根元素。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于 `as` 指定的根元素。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 在形状内部居中的 Vue 内容；超出形状轮廓的部分被裁剪，使用方负责内容的语义和可访问名称 |

## 状态与无障碍

Shape 本身不建立交互语义。装饰性形状应设置 `aria-hidden="true"`；承载信息时应为根元素提供合适的语义和可访问名称。`clip-path` 只改变绘制和命中轮廓，不会自动改变 Slot 内容的布局边界，复杂内容应留出足够的内部空间。

## 参考来源

形状名称和几何依据 [Material 3 Shape 官方页面](https://m3.material.io/styles/shape/overview-principles) 与 [AndroidX MaterialShapes](https://developer.android.com/reference/kotlin/androidx/compose/material3/MaterialShapes)。AndroidX 形状已归一化，源码中的曲线在开发时转换为百分比 CSS `shape()` 数据；组件不包含运行时转换依赖。

<script setup>
import ShapeAsExample from '../examples/shape/ShapeAsExample.vue';
import ShapeColorExample from '../examples/shape/ShapeColorExample.vue';
import ShapeNamesExample from '../examples/shape/ShapeNamesExample.vue';
import ShapeSizeExample from '../examples/shape/ShapeSizeExample.vue';
import ShapeSlotExample from '../examples/shape/ShapeSlotExample.vue';
</script>
