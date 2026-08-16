---
title: Shared Element 同元素转移
description: mat-shared-element 与 mde-shared-element 的 View Transitions 同元素转移动效。
llms: true
order: 120
---

# Shared Element 同元素转移

## 组件简介

`<mat-shared-element>` 的组件导出名是 `MatSharedElement`。由于它是 mde-vue 的非标准 Web 扩展，公共入口还提供 `MdeSharedElement` 导出，安装 `createMatUi()` 后也可以使用 `<MdeSharedElement>` 与 `<mde-shared-element>` 全局标签别名。

组件保存稳定的共享名称，让同一业务实体在状态切换前后的两个视图中通过浏览器 View Transitions 连续过渡。名称默认不会写入 DOM；只有把名称传给 `useMatViewTransition()` 的本次 `start()` 后才临时启用，避免页面中其他共享元素进入过渡顶层。组件不管理应用状态、Dialog、Sheet 或路由。

## 示例

### 卡片打开 Dialog

:::: details 查看示例代码
::: code-group

<<< @/examples/shared-element/SharedElementDialogExample.vue#template [template]

<<< @/examples/shared-element/SharedElementDialogExample.vue#script [script]

<<< @/examples/shared-element/SharedElementDialogExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shared Element 卡片到 Dialog 预览">
    <SharedElementDialogExample />
  </DocsPreview>
</ClientOnly>

示例使用 `MatCard`、`MatCardActionArea`、`MatImage`、`MatText`、`MatDialog`、`MatSpacer` 与 `MatBtn` 组合旅行列表和弹出详情。每项拥有唯一名称，打开时只把所选名称传给协调器，因此其他列表项不会进入过渡顶层。所选图片从 104px 缩略图移动到 Dialog 的 16:9 宽幅区域，位置、宽高和圆角会在两次快照间同时过渡；关闭时沿原路径返回。

### `as`

:::: details 查看示例代码
::: code-group

<<< @/examples/shared-element/SharedElementRootExample.vue#template [template]

<<< @/examples/shared-element/SharedElementRootExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shared Element 自定义根元素预览">
    <SharedElementRootExample />
  </DocsPreview>
</ClientOnly>

`as` 只改变实际根元素，不附加交互或无障碍语义。

### `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/shared-element/SharedElementDisabledExample.vue#template [template]

<<< @/examples/shared-element/SharedElementDisabledExample.vue#script [script]

<<< @/examples/shared-element/SharedElementDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Shared Element 禁用动画预览">
    <SharedElementDisabledExample />
  </DocsPreview>
</ClientOnly>

`disabled` 会阻止该元素响应协调器对同名元素的临时激活；状态更新和其他 View Transition 内容仍由协调器照常处理。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | `string` | — | 必填。非空的 CSS `<custom-ident>`，作为可由协调器激活的共享名称；每次旧快照或新快照中的名称必须唯一。 |
| `as` | `string` | `'div'` | 合法 HTML 标签名，作为实际根元素。 |
| `disabled` | `boolean` | `false` | 为 `true` 时不向根元素声明共享名称。 |

组件没有公开方法。

### 事件

组件没有自定义事件；根元素的原生事件会透传。

### Slots

| Slot | 内容约束 |
| --- | --- |
| 默认 Slot | 任意内容；建议只包含需要在状态切换前后保持身份的图片或媒体内容。 |

### 协调器

`useMatViewTransition()` 创建独立协调器。公共入口同时提供等价别名 `useMdeViewTransition()`。

```js
const transition = useMatViewTransition();

await transition.start(() => {
  selectedId.value = item.id;
}, { names: `shared-photo-${item.id}` });
```

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `supported` | `boolean` | 当前 document 是否提供 `startViewTransition()`；该值不表示用户是否请求减少动态效果。 |
| `start(update, options?)` | `(update: () => void \| Promise<void>, options?: { skip?: boolean, names?: string \| string[] }) => Promise<void>` | 临时激活 `names` 指定的共享元素并执行状态更新；可用且未跳过时等待 View Transition 完成，随后清理名称。 |

`names` 可以是一个名称或名称数组；省略时不激活任何 `MatSharedElement`。`update` 不是函数或 `names` 包含非字符串、空字符串时，`start()` 抛出 `TypeError`。`update` 抛出的错误、返回 Promise 的拒绝以及当前 View Transition 的完成错误会继续向调用方传播。浏览器不支持 View Transitions、用户请求减少动态效果或 `options.skip` 为 `true` 时，协调器直接执行并等待 `update`。

### 使用约束

- 源元素和目标元素使用相同的 `name`，并把该名称传给本次 `start()`；同名元素不能同时参与旧快照或新快照。
- 列表中的每个业务实体应使用不同名称。不要把整页名称数组传给一次过渡，只传实际发生位置或尺寸变化的元素。
- `name` 应由业务实体 ID 稳定生成并符合 CSS `<custom-ident>` 语法；不要使用随机值、`none`、`match-element` 或 CSS 全局关键字。
- 同一交互流程应复用一个协调器实例。只有同一实例知道自己的活动动画；调用方仍应等待 `start()` 返回的 Promise，并在完成前阻止同一操作被并发触发。
- 首版只支持同一文档内的列表、内嵌详情、Dialog 或 Sheet 场景，不绑定路由库。
- `mde-vue/styles.css` 会以 `--mat-sys-motion-duration-medium4` 和 `--mat-sys-motion-easing-emphasized` 设置文档内 View Transition 的默认时长与缓动；减少动态效果时将时长降为 `0s`。应用未分层的 CSS 可以覆盖这些默认值。

## 参考来源

Material 3 Expressive 将 motion 作为样式系统的一部分，并以令牌驱动可定制过渡，参见 [Material 3 Motion](https://m3.material.io/styles/motion/overview)。Shared Element 不是 Material 3 官方 Web 组件；本组件是基于浏览器 View Transitions API 的 mde-vue 扩展。

<script setup>
import SharedElementDialogExample from '../examples/shared-element/SharedElementDialogExample.vue';
import SharedElementRootExample from '../examples/shared-element/SharedElementRootExample.vue';
import SharedElementDisabledExample from '../examples/shared-element/SharedElementDisabledExample.vue';
</script>
