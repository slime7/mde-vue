---
title: Tooltip 文字提示
description: mat-tooltip 的 Material 3 Plain tooltip、展示元素、固定定位、延迟和无障碍说明。
llms: true
order: 105
---

# Tooltip 文字提示

## 组件简介

`<mat-tooltip>` 的组件导出名是 `MatTooltip`。它实现 Material 3 Plain tooltip：用于补充展示元素的简短、非交互说明。组件以覆盖定位 Teleport 到合适容器，默认显示在展示元素上方；省略 `attach` 时，依次选择展示元素所在的已打开 `dialog`/Popover、目标所属 `MatAppRoot`、`body`。它不包含 Rich tooltip、操作按钮、箭头或触屏长按。AppRoot 内会避让布局边缘，其他场景会把 Toolbar 作为避让区域，必要时自动换边。

## 示例

### content

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipContentExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip content 预览">
    <TooltipContentExample />
  </DocsPreview>
</ClientOnly>

### 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipDefaultSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip 默认 Slot 预览">
    <TooltipDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### activator Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipActivatorSlotExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip activator Slot 预览">
    <TooltipActivatorSlotExample />
  </DocsPreview>
</ClientOnly>

### target

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipTargetExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip target 预览">
    <TooltipTargetExample />
  </DocsPreview>
</ClientOnly>

### attach

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipAttachExample.vue#template [template]

<<< @/examples/tooltip/TooltipAttachExample.vue#script [script]

<<< @/examples/tooltip/TooltipAttachExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip attach 预览">
    <TooltipAttachExample />
  </DocsPreview>
</ClientOnly>

### location

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipLocationExample.vue#template [template]

<<< @/examples/tooltip/TooltipLocationExample.vue#script [script]

<<< @/examples/tooltip/TooltipLocationExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip location 预览">
    <TooltipLocationExample />
  </DocsPreview>
</ClientOnly>

### open-delay

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipOpenDelayExample.vue#template [template]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip open-delay 预览">
    <TooltipOpenDelayExample />
  </DocsPreview>
</ClientOnly>

### v-model

:::: details 查看示例代码
::: code-group

<<< @/examples/tooltip/TooltipModelValueExample.vue#template [template]

<<< @/examples/tooltip/TooltipModelValueExample.vue#script [script]

:::
::::

<ClientOnly>
  <DocsPreview label="Tooltip v-model 预览">
    <TooltipModelValueExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | boolean | false | 显式传入时启用受控模式，可使用 v-model；省略时由 hover 和 focus 自动控制 |
| content | string | 未设置 | 简短纯文本内容；存在时优先于默认 Slot |
| target | string 或 HTMLElement | 未设置 | 展示元素；字符串按当前 document 的 CSS 选择器解析 |
| attach | string 或 HTMLElement | body | Tooltip 的显式 Teleport 目标；省略时依次使用已打开的 `dialog`/Popover、目标所属 AppRoot、`body`；字符串按当前 document 的 CSS 选择器解析 |
| location | top、right、bottom、left 及其 -start、-end 形式 | top | Tooltip 相对展示元素的首选位置 |
| openDelay | number | 插件配置或 0 | 自动模式的打开延迟，单位为毫秒；显式值优先于 `createMatUi()` 的 `defaults.tooltip.openDelay`；可直接写为 open-delay="600"，动态数值使用 :open-delay；负数、空字符串或非有限数字按 0 处理，并触发 Vue prop 校验警告 |

activator Slot 存在时优先于 target，且必须只渲染一个属于当前 document 的 HTMLElement 根节点。选择器目标在初次挂载时尚未出现，会在后续 Vue 更新中继续解析；只有实际请求展示时仍无法解析，组件才给出警告且不显示。attach 无法解析时同样给出警告并抑制显示。

未消费的 class、style、id、aria-* 和原生事件监听器传递给 Teleport 后的 tooltip 根节点；根节点的 role 固定为 tooltip。显式传入 `attach` 时始终使用指定目标，不会被 top-layer 自动挂载覆盖。组件没有 color 属性、Rich tooltip 内容、公共方法或操作按钮。

## 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| update:modelValue | boolean | 受控模式下 Escape、无效挂载目标或被新 Tooltip 替代而请求关闭时发出 false |

自动模式不会发出自定义事件。受控模式忽略 hover、focus 和 open-delay，展示状态由使用者传入的 modelValue 决定。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 简短、非交互的 Plain tooltip 内容；content prop 存在时忽略 |
| activator | 唯一的 HTMLElement 根节点，作为 tooltip 的展示元素；存在时优先于 target |

## 展示行为与无障碍

自动模式在鼠标悬停或键盘焦点进入展示元素时打开。打开延迟优先读取组件的 `openDelay`，省略时读取 `createMatUi()` 的 `defaults.tooltip.openDelay`，未安装插件时为 0；指针和焦点都离开后等待 1.5 秒关闭。Escape 会立即请求关闭当前提示，但节点会保留 150ms 以完成消失动画。模块级协调器保证同一时间只显示一个可见 Tooltip；打开新实例会关闭旧实例，并向受控旧实例发出关闭请求。

应用可以在包含相关展示元素的最近祖先上添加 `data-mat-tooltip-group`。首个 Tooltip 实际显示后，该实例在指针和焦点都离开时启动 `defaults.tooltip.skipDelayDuration` 快速切换窗口；窗口内进入同组另一个 Tooltip 会跳过打开延迟。首个尚未显示、跨组、超过窗口和同一实例重新进入不会跳过延迟。该分组通过展示元素的 DOM 祖先识别，因此同样覆盖 Button 和 FAB 内部创建的 Tooltip。

Tooltip 默认位于上方，展示元素边界与提示之间保持 4px 间距。首选方向空间不足时会翻转到对侧并保留 start、end 对齐；最终坐标始终夹紧在距离视口边缘至少 8px 的区域内。窗口缩放、任意滚动容器滚动以及展示元素或 Tooltip 尺寸变化都会重新计算位置。

当展示元素位于已打开的原生 `dialog`、`mat-dialog`、模态 Bottom/Side sheet 或 Popover（包括 `mat-menu`）内时，省略 `attach` 的 Tooltip 会留在最近的 top-layer 容器中，避免被更高的 top layer 遮挡。该规则同样适用于 Button、FAB 以及 Slider、Range slider 内部创建的 Tooltip；普通页面中的 Tooltip 仍挂载到 `body`。

显示期间组件把 tooltip 的 id 合并到展示元素的 aria-describedby；关闭、切换展示元素或卸载时恢复展示元素原有属性值。内容应帮助理解已可见的界面，不应重复标签、仅承载关键操作说明，或放置链接、按钮等可交互内容。

## 参考来源

外观、尺寸和颜色角色依据 Material 3 [Tooltips overview](https://m3.material.io/components/tooltips/overview) 与 [Tooltips specs](https://m3.material.io/components/tooltips/specs)。展示时机、单实例行为和内容限制依据 [Tooltips guidelines](https://m3.material.io/components/tooltips/guidelines)。

<script setup>
import TooltipActivatorSlotExample from '../examples/tooltip/TooltipActivatorSlotExample.vue';
import TooltipAttachExample from '../examples/tooltip/TooltipAttachExample.vue';
import TooltipContentExample from '../examples/tooltip/TooltipContentExample.vue';
import TooltipDefaultSlotExample from '../examples/tooltip/TooltipDefaultSlotExample.vue';
import TooltipLocationExample from '../examples/tooltip/TooltipLocationExample.vue';
import TooltipModelValueExample from '../examples/tooltip/TooltipModelValueExample.vue';
import TooltipOpenDelayExample from '../examples/tooltip/TooltipOpenDelayExample.vue';
import TooltipTargetExample from '../examples/tooltip/TooltipTargetExample.vue';
</script>
