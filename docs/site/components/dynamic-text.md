---
title: Dynamic text 动态文字
description: mat-dynamic-text 的逐字符切换动画、差异比对、继承排版和单行约束。
llms: true
order: 36.5
---

# Dynamic text 动态文字

## 组件简介

`<mat-dynamic-text>` 的组件导出名是 `MatDynamicText`。它在同一位置以逐字符动画切换单行文字：新字符从底部以加速动效曲线滑入，并由模糊渐变至清晰；被替换字符向上滑出并模糊淡出。组件继承父元素的字体、字号、颜色和行高，字符槽高度锁定为 `1em` 且溢出裁切，动画期间不会引起整体高度变化。

该组件不直接对应 Material 官方 API，因此安装 `createMatUi()` 后，除 `mat-dynamic-text` 外还会额外注册 `MdeDynamicText` 与 `mde-dynamic-text` 作为同一组件的全局标签别名。

组件默认只对发生变化的位置执行动画（`diff`），相同前后缀保持静止。文字只能通过 `text` 属性传入，不提供 Slot。

## 示例

以下代码块由 VitePress 直接读取实际渲染的 Vue 示例文件，因此代码与紧随其后的预览始终来自同一份源码。

### 基础切换

:::: details 查看示例代码
::: code-group

<<< @/examples/dynamic-text/DynamicTextBasicExample.vue#template [template]

<<< @/examples/dynamic-text/DynamicTextBasicExample.vue#script [script]

<<< @/examples/dynamic-text/DynamicTextBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Dynamic text 基础切换预览">
    <DynamicTextBasicExample />
  </DocsPreview>
</ClientOnly>

### `diff`

:::: details 查看示例代码
::: code-group

<<< @/examples/dynamic-text/DynamicTextDiffExample.vue#template [template]

<<< @/examples/dynamic-text/DynamicTextDiffExample.vue#script [script]

<<< @/examples/dynamic-text/DynamicTextDiffExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Dynamic text 差异比对预览">
    <DynamicTextDiffExample />
  </DocsPreview>
</ClientOnly>

`diff` 默认开启，只对值发生变化的位置执行切换动画；`diff` 关闭后，每次文字更新都会让全部字符重新入场。

### 继承排版

:::: details 查看示例代码
::: code-group

<<< @/examples/dynamic-text/DynamicTextInheritExample.vue#template [template]

<<< @/examples/dynamic-text/DynamicTextInheritExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Dynamic text 继承排版预览">
    <DynamicTextInheritExample />
  </DocsPreview>
</ClientOnly>

组件不设置字体族、字号、字重和颜色，直接继承父级排版；示例中的标题、正文和徽标均通过父元素控制外观。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string \| number` | `''` | 需要展示和动态切换的单行文本或数值 |
| `as` | `string` | `'span'` | 合法 HTML 标签名，用作实际根元素 |
| `diff` | `boolean` | `true` | 是否仅对发生变化的位置执行动画；关闭后每次更新全量重新入场 |
| `appear` | `boolean` | `false` | 首次挂载时是否执行入场动画 |

未被组件消费的原生属性会传递给 `as` 指定的根元素。组件没有公开方法。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于 `as` 指定的根元素。

## Slots

组件不提供 Slots，文字内容只能通过 `text` 属性传入。

## 参考来源

逐字符切换与加速动效是本项目的 Web 动画实现，不直接对应 Material 3 官方组件 API。动画时长使用系统动效令牌 `--mat-sys-motion-duration-medium2`，缓动使用 `--mat-sys-motion-easing-emphasized-accelerate`。

<script setup>
import DynamicTextBasicExample from '../examples/dynamic-text/DynamicTextBasicExample.vue';
import DynamicTextDiffExample from '../examples/dynamic-text/DynamicTextDiffExample.vue';
import DynamicTextInheritExample from '../examples/dynamic-text/DynamicTextInheritExample.vue';
</script>
