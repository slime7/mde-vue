---
title: Table wrapper 表格容器
description: mat-table-wrapper 以 table-wrapper 容器优化表格展示：横向滚动、圆角边框、单元格内边距与表头底色。
llms: true
order: 117
---

# Table wrapper 表格容器

## 组件简介

`<mat-table-wrapper>` 的组件导出名是 `MatTableWrapper`。它是一个无 props、无交互的展示容器，用 `table-wrapper` 类包裹 `<table>` 后，启用一套参照 Material Design 官方文档规格表格的优化样式：表格超出可用宽度时在容器内横向滚动，并应用圆角边框、单元格内边距与表头底色。

样式随 `mde-vue/styles.css` 全局生效，`table-wrapper` 类本身就是启用开关：不使用组件、直接在 HTML 中写 `<div class="table-wrapper"><table>…</table></div>` 也会得到相同效果。

## 示例

### 基础表格

:::: details 查看示例代码
::: code-group

<<< @/examples/table-wrapper/TableWrapperBasicExample.vue#template [template]

<<< @/examples/table-wrapper/TableWrapperBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Table wrapper 表格容器预览" stacked>
    <TableWrapperBasicExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

组件没有专用属性。未被消费的原生属性、`class` 和 `style` 传递给根 `div.table-wrapper`。组件没有公开方法。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于根 `div`。

## Slots

默认 slot 应直接放置 `table` 元素（可包含 `thead`、`tbody` 和 `caption`）。样式规则作用于容器内的 `table` 及其 `th`、`td`；容器内的其他内容不会被特殊处理。

## 样式行为

- 容器 `overflow-x: auto`，表格超出可用宽度时在容器内横向滚动，不会撑破页面。
 - 容器滚动条采用 thin 尺寸，拇指使用 primary 色、轨道透明，与 scroll-area 的滚动条规范一致。
- 容器不设最大宽度，宽度由父元素决定；内部 `table` 占满容器宽度。
- 容器带 1px `surface-variant` 边框与 24px 圆角；单元格使用 `16px 24px` 内边距，行间以 1px `surface-variant` 上边框分隔，末列无右边框，首行无上边框。
- 表头 `th` 使用 `surface-container-low` 底色、`on-surface-variant` 文字色与 `font-weight: 500`。
- 单元格内的 `<p>` 块级外边距归零，避免段落外边距撑大行高。
- 颜色全部来自 `--mat-sys-*` 公共令牌，随主题与明暗模式自动切换；边框方向使用逻辑属性，随页面文字方向调整。

## 参考来源

样式参照 Material Design 官方文档规格页面中的表格容器（`table-wrapper`）实现，例如 [Button specs](https://m3.material.io/components/buttons/specs) 中的规格表格。

<script setup>
import TableWrapperBasicExample from '../examples/table-wrapper/TableWrapperBasicExample.vue';
</script>
