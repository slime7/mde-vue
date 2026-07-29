---
title: Dialog 对话框
description: mat-dialog 的模态展示、全屏布局、帷幕、动画、滚动区域和 Promise 命令式函数。
llms: true
order: 100
---

# Dialog 对话框

## 组件简介

`<mat-dialog>` 的组件导出名是 `MatDialog`。组件使用原生 modal dialog 与 Vue Teleport，在基础或全屏布局中展示需要使用者确认、输入或选择的内容，并可通过 `activator` Slot 放置触发元素。Dialog 支持受控开关、进入和退出动画、焦点恢复、多个实例的顶层帷幕合并，以及 `dialog()`、`alert()`、`confirm()`、`prompt()` 四个 Promise 函数。

Dialog 通过原生 `showModal()` 进入浏览器 top layer，位于 Toolbar、Snackbar 和 Tooltip 等普通覆盖层之上；不需要额外设置 z-index。

## 示例

### `modelValue`、`title` 与 `content`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogModelValueExample.vue#template [template]

<<< @/examples/dialog/DialogModelValueExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog modelValue 预览">
    <DialogModelValueExample />
  </DocsPreview>
</ClientOnly>

### `width`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogWidthExample.vue#template [template]

<<< @/examples/dialog/DialogWidthExample.vue#script [script]

<<< @/examples/dialog/DialogWidthExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog width 预览">
    <DialogWidthExample />
  </DocsPreview>
</ClientOnly>

### `activator` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogActivatorSlotExample.vue#template [template]

<<< @/examples/dialog/DialogActivatorSlotExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog activator Slot 预览">
    <DialogActivatorSlotExample />
  </DocsPreview>
</ClientOnly>

### `full-screen` 与 `close-label`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogFullScreenExample.vue#template [template]

<<< @/examples/dialog/DialogFullScreenExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog full-screen 预览">
    <DialogFullScreenExample />
  </DocsPreview>
</ClientOnly>

### `attach`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogAttachExample.vue#template [template]

<<< @/examples/dialog/DialogAttachExample.vue#script [script]

<<< @/examples/dialog/DialogAttachExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog attach 预览">
    <DialogAttachExample />
  </DocsPreview>
</ClientOnly>

### `scrim`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogScrimExample.vue#template [template]

<<< @/examples/dialog/DialogScrimExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog scrim 预览">
    <DialogScrimExample />
  </DocsPreview>
</ClientOnly>

### `close-on-back`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogCloseOnBackExample.vue#template [template]

<<< @/examples/dialog/DialogCloseOnBackExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog close-on-back 预览">
    <DialogCloseOnBackExample />
  </DocsPreview>
</ClientOnly>

### `icon` 与 `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogIconColorExample.vue#template [template]

<<< @/examples/dialog/DialogIconColorExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog icon 与 color 预览">
    <DialogIconColorExample />
  </DocsPreview>
</ClientOnly>

### `title` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogTitleSlotExample.vue#template [template]

<<< @/examples/dialog/DialogTitleSlotExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog title Slot 预览">
    <DialogTitleSlotExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogContentSlotExample.vue#template [template]

<<< @/examples/dialog/DialogContentSlotExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog 默认 Slot 预览">
    <DialogContentSlotExample />
  </DocsPreview>
</ClientOnly>

### `icon` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogIconSlotExample.vue#template [template]

<<< @/examples/dialog/DialogIconSlotExample.vue#script [script]

<<< @/examples/dialog/DialogIconSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog icon Slot 预览">
    <DialogIconSlotExample />
  </DocsPreview>
</ClientOnly>

### `actions` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogActionsSlotExample.vue#template [template]

<<< @/examples/dialog/DialogActionsSlotExample.vue#script [script]

<<< @/examples/dialog/DialogActionsSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Dialog actions Slot 预览">
    <DialogActionsSlotExample />
  </DocsPreview>
</ClientOnly>

### `dialog()`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogFunctionExample.vue#template [template]

<<< @/examples/dialog/DialogFunctionExample.vue#script [script]

<<< @/examples/dialog/DialogFunctionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="dialog 函数预览">
    <DialogFunctionExample />
  </DocsPreview>
</ClientOnly>

### `alert()`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogAlertFunctionExample.vue#template [template]

<<< @/examples/dialog/DialogAlertFunctionExample.vue#script [script]

<<< @/examples/dialog/DialogAlertFunctionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="alert 函数预览">
    <DialogAlertFunctionExample />
  </DocsPreview>
</ClientOnly>

### `confirm()`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogConfirmFunctionExample.vue#template [template]

<<< @/examples/dialog/DialogConfirmFunctionExample.vue#script [script]

<<< @/examples/dialog/DialogConfirmFunctionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="confirm 函数预览">
    <DialogConfirmFunctionExample />
  </DocsPreview>
</ClientOnly>

### `prompt()`

:::: details 查看示例代码
::: code-group

<<< @/examples/dialog/DialogPromptFunctionExample.vue#template [template]

<<< @/examples/dialog/DialogPromptFunctionExample.vue#script [script]

<<< @/examples/dialog/DialogPromptFunctionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="prompt 函数预览">
    <DialogPromptFunctionExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 受控打开状态，使用 `v-model` |
| `fullScreen` | `boolean` | `false` | 模板属性为 `full-screen`；显式切换全屏布局，不自动响应视口 |
| `width` | `number \| string` | 未设置 | 基础 Dialog 的首选宽度；数字按 px 处理，字符串接受 CSS 宽度值；小屏按视口可用宽度限制，全屏布局忽略此属性 |
| `attach` | `string \| HTMLElement` | `'body'` | Teleport 目标；字符串按当前 document 的 CSS 选择器解析 |
| `scrim` | `boolean` | `true` | 是否显示顶层帷幕；`false` 时帷幕透明但仍阻止背景交互 |
| `closeOnBack` | `boolean` | `false` | 模板属性为 `close-on-back`；点击 Dialog 外帷幕时是否请求关闭 |
| `title` | `string` | 未设置 | 简单标题；设置后优先于 `title` Slot |
| `content` | `string` | 未设置 | 简单正文；设置后优先于默认 Slot |
| `icon` | `string` | 未设置 | 基础 Dialog 的 Material Symbols 字形；设置后优先于 `icon` Slot |
| `closeLabel` | `string` | `'关闭'` | 全屏头部关闭按钮的非空可访问名称 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 基础 Dialog 装饰图标的局部强调色 |

未消费的属性、原生 Dialog 事件、`class` 和 `style` 传给原生 `<dialog>`。没有标题时必须显式提供 `aria-label` 或 `aria-labelledby`。`attach` 无法解析时组件给出警告并请求把 `modelValue` 更新为 `false`。

`activator` Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点；组件使用它作为打开后的焦点恢复目标。多根节点或非 HTMLElement 根节点会给出警告并请求把 `modelValue` 更新为 `false`。

组件没有公共方法，不公开原生 `returnValue` 或 `method="dialog"` 表单协议。

### 命令式函数

四个函数统一从 `mdu-ui/functions` 导入，只接受简单字符串内容，不接受 HTML 字符串、VNode 或 Slots：

```js
import {
  alert,
  confirm,
  dialog,
  prompt,
} from 'mdu-ui/functions';
```

| 函数 | 主要附加选项 | 返回值 |
| --- | --- | --- |
| `dialog(options)` | `actions` | `Promise<T \| undefined>`；动作返回对应 `value`，取消返回 `undefined` |
| `alert(options)` | `confirmText` | `Promise<void>`；任意正常关闭返回 `undefined` |
| `confirm(options)` | `confirmText`、`cancelText` | `Promise<boolean>`；确认返回 `true`，其他关闭返回 `false` |
| `prompt(options)` | `confirmText`、`cancelText`、`defaultValue`、`label`、`placeholder`、`required` | `Promise<string \| null>`；确认返回字符串，取消返回 `null` |

公共选项与组件属性基本一致，使用 JavaScript 驼峰名称 `fullScreen`、`width`、`closeOnBack`，并增加 `ariaLabel`。`width` 接受数字 px 值或非空 CSS 宽度值。命令式内容只接受字符串。`dialog()` 的动作格式如下：

| 动作字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | 必填 | 非空按钮文字 |
| `value` | 任意值 | `undefined` | 选择该动作后返回的值 |
| `variant` | MatBtn variant | `'text'` | 动作按钮形态 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 动作按钮局部配色 |
| `disabled` | `boolean` | `false` | 是否禁用动作 |

省略 `dialog()` 的 `actions` 时显示一个“确定”按钮。`prompt()` 会自动聚焦输入框；`required=true` 且内容去除首尾空白后为空时，确认按钮保持禁用。第一版不包含异步动作回调、自定义校验器、完整 Text field 配置、调用队列或 `dialog.alert()` 等成员别名。

参数类型、动作、`attach` 或客户端运行环境无效时，函数返回 rejected Promise；Escape、帷幕、取消按钮和全屏关闭按钮等正常取消不会拒绝。Promise 只在退出动画完成、原生 Dialog 关闭并移除一次性宿主后结算。多个调用可以并行打开，只有顶层实例显示帷幕颜色。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:modelValue` | `boolean` | Escape、允许的帷幕点击或全屏关闭按钮请求关闭时发出 `false` |
| `opened` | 无 | 进入动画完成后触发 |
| `closed` | 无 | 退出动画完成、原生 Dialog 关闭且 DOM 移除后触发 |

组件是受控的：收到 `update:modelValue(false)` 后，使用者必须更新绑定值才会开始退出。打开后焦点进入显式 `autofocus` 或第一个可交互元素；关闭完成后恢复到打开前的元素。Escape 始终请求关闭，不受 `close-on-back` 影响。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| `activator` | 唯一的当前 document 中 HTMLElement 根节点，作为 Dialog 的触发元素和焦点恢复目标 |
| `title` | 标题中的丰富 Vue 内容；`title` prop 存在时忽略 |
| 默认 | 正文中的丰富 Vue 内容；`content` prop 存在时忽略 |
| `icon` | 基础 Dialog 的图标内容；`icon` prop 存在时忽略，全屏布局不显示 |
| `actions` | 基础布局底部或全屏固定头部中的操作；容器只提供 flex、换行和间距，可添加 `<mat-spacer>` 控制操作组对齐 |

基础 Dialog 的图标、标题、正文和 actions 各自提供容器留白，正文与标题之间保持 16px 间距；根容器不裁剪 Slot 内容或焦点环。Dialog 打开期间锁定页面根滚动；页面原本存在占据布局宽度的经典滚动条时会临时保留其槽位，避免页面宽度跳动，没有经典滚动条时不额外预留空间。最后一层关闭后恢复根元素原有内联样式。标题和动作区固定，正文过长时只有 content 区域沿纵向滚动，滚动条位于 Dialog 内部边缘并预留稳定空间。未设置 `width` 时基础 Dialog 宽度限制为 280–560px；设置后使用指定首选宽度，但小屏仍限制在视口可用范围内。全屏 Dialog 占满视口并使用固定 56px 头部，忽略 `width`。

## 参考来源

外观、尺寸、基础与全屏结构依据 Material 3 [Dialogs specs](https://m3.material.io/components/dialogs/specs) 与 [Dialogs guidelines](https://m3.material.io/components/dialogs/guidelines)。原生模态语义和焦点限制由最新浏览器的 `<dialog>.showModal()` 提供。

<script setup>
import DialogActionsSlotExample from '../examples/dialog/DialogActionsSlotExample.vue';
import DialogActivatorSlotExample from '../examples/dialog/DialogActivatorSlotExample.vue';
import DialogAlertFunctionExample from '../examples/dialog/DialogAlertFunctionExample.vue';
import DialogAttachExample from '../examples/dialog/DialogAttachExample.vue';
import DialogCloseOnBackExample from '../examples/dialog/DialogCloseOnBackExample.vue';
import DialogConfirmFunctionExample from '../examples/dialog/DialogConfirmFunctionExample.vue';
import DialogContentSlotExample from '../examples/dialog/DialogContentSlotExample.vue';
import DialogFullScreenExample from '../examples/dialog/DialogFullScreenExample.vue';
import DialogFunctionExample from '../examples/dialog/DialogFunctionExample.vue';
import DialogIconColorExample from '../examples/dialog/DialogIconColorExample.vue';
import DialogIconSlotExample from '../examples/dialog/DialogIconSlotExample.vue';
import DialogModelValueExample from '../examples/dialog/DialogModelValueExample.vue';
import DialogPromptFunctionExample from '../examples/dialog/DialogPromptFunctionExample.vue';
import DialogScrimExample from '../examples/dialog/DialogScrimExample.vue';
import DialogTitleSlotExample from '../examples/dialog/DialogTitleSlotExample.vue';
import DialogWidthExample from '../examples/dialog/DialogWidthExample.vue';
</script>
