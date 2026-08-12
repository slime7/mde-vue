---
title: Avatar 头像
description: mat-avatar 的图片、图标、默认 Slot 内容、尺寸与 Material 配色。
llms: true
order: 38
---

# Avatar 头像

## 组件简介

`<mat-avatar>` 的组件导出名是 `MatAvatar`。它以固定圆形展示头像：`src` 渲染填满圆形的图片，`icon` 渲染 Material Symbols 图标，两者都未设置时渲染默认 Slot（可放图片、图标或文字，超出部分截断）。同时提供多个内容来源时，按 `src > icon > 默认 Slot` 的固定优先级展示。

## 示例

`src`、`icon` 和默认 Slot 是三个独立的内容来源，分别展示；`size` 与 `color` 对三种内容模式都生效。

### `src`

`src` 使用内部装饰性 `<img alt="">` 以 `cover` 方式填满圆形；头像承载身份信息时，应在组件根元素上提供 `aria-label`。

:::: details 查看示例代码
::: code-group

<<< @/examples/avatar/AvatarSrcExample.vue#template [template]

<<< @/examples/avatar/AvatarSrcExample.vue#script [script]

<<< @/examples/avatar/AvatarSrcExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Avatar src 预览">
    <AvatarSrcExample />
  </DocsPreview>
</ClientOnly>

### `icon`

`icon` 使用 Material Symbols 字形文本，字号自动取头像尺寸的 60%（默认 40px 头像即 24px 图标）。

:::: details 查看示例代码
::: code-group

<<< @/examples/avatar/AvatarIconExample.vue#template [template]

<<< @/examples/avatar/AvatarIconExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Avatar icon 预览">
    <AvatarIconExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

默认 Slot 可以放置文字、`mat-icon` 或 `<img>`；文字超出容器时以省略号截断，图片超出时直接裁剪。

:::: details 查看示例代码
::: code-group

<<< @/examples/avatar/AvatarSlotExample.vue#template [template]

<<< @/examples/avatar/AvatarSlotExample.vue#script [script]

<<< @/examples/avatar/AvatarSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Avatar 默认 Slot 预览">
    <AvatarSlotExample />
  </DocsPreview>
</ClientOnly>

### `size`

`size` 同时决定头像的宽和高；数字与纯数字字符串按 px 处理，其他字符串须为合法正 CSS 长度。

:::: details 查看示例代码
::: code-group

<<< @/examples/avatar/AvatarSizeExample.vue#template [template]

<<< @/examples/avatar/AvatarSizeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Avatar size 预览">
    <AvatarSizeExample />
  </DocsPreview>
</ClientOnly>

### `color`

`color` 接受 Material 语义色、系统颜色角色或六位十六进制种子色；默认 `primary` 使用 primary 填充、on-primary 内容，需要更柔和的填充时可以使用 `primary-container` 等容器角色。

:::: details 查看示例代码
::: code-group

<<< @/examples/avatar/AvatarColorExample.vue#template [template]

<<< @/examples/avatar/AvatarColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Avatar color 预览">
    <AvatarColorExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | 未设置 | 头像图片地址；非空字符串有效，空字符串等同未设置，优先级最高 |
| `icon` | `string` | 未设置 | Material Symbols 字形文本；非空字符串有效，空字符串等同未设置 |
| `color` | `string` | `'primary'` | Material 语义色、系统颜色角色或六位十六进制种子色 |
| `size` | `number \| string` | `40` | 头像边长；数字与纯数字字符串按 px，其他字符串须为合法正 CSS 长度，非法值回退 `40px` |

组件没有公开方法。

## 事件

组件不定义自定义事件。传入的原生事件监听器作用于根元素；内部图片的 `load`、`error` 不作为公共事件转发。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 在未设置 `src` 和 `icon` 时展示的图片、图标或文字；内容居中，文字超出时以省略号截断，图片超出时裁剪 |

## 状态与无障碍

Avatar 不提供交互语义，也不进入 Tab 顺序。`src` 模式的内部图片是装饰性的（`alt=""`），默认 Slot 中的图片应自行提供 `alt`；头像本身承载身份信息时，推荐在组件根元素上设置 `aria-label`，装饰性头像可以设置 `aria-hidden="true"`。`icon` 模式由组件内部自动隐藏图标，不再重复设置 `aria-hidden` 也无副作用。

<script setup>
import AvatarColorExample from '../examples/avatar/AvatarColorExample.vue';
import AvatarIconExample from '../examples/avatar/AvatarIconExample.vue';
import AvatarSizeExample from '../examples/avatar/AvatarSizeExample.vue';
import AvatarSlotExample from '../examples/avatar/AvatarSlotExample.vue';
import AvatarSrcExample from '../examples/avatar/AvatarSrcExample.vue';
</script>
