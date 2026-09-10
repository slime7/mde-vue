---
title: Aside 边缘栏
description: mat-aside 停靠于布局容器边缘，提供统一的边缘占用、正交避让与切入退场过渡。
llms: true
order: 117
---

# Aside 边缘栏

## 组件简介

`<mat-aside>` 的组件导出名是 `MatAside`。它是专用于停靠在 `mat-layout` 或 `mat-app-root` 边缘的布局基础设施组件。通过统一管理四个停靠方向（`top`、`bottom`、`left`、`right`）的厚度尺寸与安全区留白，协调边缘占据与正交方向上的互斥避让，未来可作为各边缘组件（如顶部应用栏、导航侧栏、底部栏等）的底层根 DOM。

同一个组件树同时存在 `MatLayout` 与 `MatAppRoot` 时，Aside 只向最近的一个根登记一次，不会同时改变两层正文 padding。`docked` 与 `fixed` 都会参与最近根的边缘计算；`flow` 与 `sticky` 不登记边缘。`fixed` 组件显式 Teleport 后仍沿用原有挂载行为，但不会因为 Teleport 目标产生第二份登记。

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

### 多边缘停靠

通过 `location` 属性将多个 Aside 放置在同一容器的边缘。当同一方向存在多个 Aside 时（如下例中在两侧边栏之后、底栏上方声明的第二个顶栏），后声明的 Aside 自动在纵向累加堆叠于主顶栏下方，并在横向避让两侧边栏，容器自动完成复合避让与内边距计算。

:::: details 查看示例代码
::: code-group

<<< @/examples/aside/AsideLocationExample.vue#template [template]

<<< @/examples/aside/AsideLocationExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Aside 多边缘停靠预览" stacked>
    <AsideLocationExample />
  </DocsPreview>
</ClientOnly>

### 固定停靠

设置 `mode="fixed"` 后，Aside 会保留在当前声明位置，并继续依据最近的 `mat-layout` 或 `mat-app-root` 的声明顺序进行边缘避让与同向堆叠，同时为正文产生对应 padding。只有显式指定 `attach` 时才会 Teleport 到目标节点。由于 fixed 示例会覆盖当前文档页面的视口边缘，这里只提供演练场入口：<a href="../playground?example=aside%2FAsideFixedExample" target="_blank" rel="noopener noreferrer">在演练场中打开 fixed 多边缘停靠示例</a>。

### 粘性停靠

设置 `mode="sticky"` 使 Aside 在滚动容器中表现为粘性定位。当容器内部发生滚动时，Aside 会自然停靠在容器指定边缘，不脱离容器上下文。

:::: details 查看示例代码
::: code-group

<<< @/examples/aside/AsideStickyExample.vue#template [template]

<<< @/examples/aside/AsideStickyExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Aside 粘性停靠预览" stacked>
    <AsideStickyExample />
  </DocsPreview>
</ClientOnly>

### 状态保活

默认情况下 `unmountOnClose` 为 `false`，收起关闭时仅使用 `hidden` 属性隐藏节点并注销布局占用，不销毁底层 DOM。再次展开时，内部表单输入、滚动位置等状态均得以完整保留。

:::: details 查看示例代码
::: code-group

<<< @/examples/aside/AsideKeepAliveExample.vue#template [template]

<<< @/examples/aside/AsideKeepAliveExample.vue#script [script]

<<< @/examples/aside/AsideKeepAliveExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Aside 状态保活预览" stacked>
    <AsideKeepAliveExample />
  </DocsPreview>
</ClientOnly>

### 模态浮层

设置 `modal` 使 Aside 作为局部的模态浮层展现。开启时 Aside 不向 `mat-layout` 或 `mat-app-root` 申请正文内边距避让，而是浮动覆盖在正文之上，并在其后渲染半透明背景遮罩，点击遮罩或按下 Escape 键可请求关闭。此时 `placeholder` 才会在声明位置生效；普通边缘模式直接使用根布局 padding，不需要 placeholder。

:::: details 查看示例代码
::: code-group

<<< @/examples/aside/AsideModalExample.vue#template [template]

<<< @/examples/aside/AsideModalExample.vue#script [script]

<<< @/examples/aside/AsideModalExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Aside 模态浮层预览" stacked>
    <AsideModalExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `true` | 受控开闭状态，支持 `v-model:open` 双向绑定。 |
| `modelValue` | `boolean` | `true` | 受控显示状态，支持 `v-model` 双向绑定。 |
| `as` | `string` | `'aside'` | 根元素渲染的 HTML 标签，如 `'aside'`、`'header'`、`'nav'` 等。 |
| `app` | `boolean` | `false` | 是否接入应用级外壳布局。在 `mat-app-root` 内未显式指定 `attach` 时自动表现为 `docked` 并登记避让；在外部或显式指定 `attach` 时自动表现为 `fixed`，只有后者会 Teleport 到目标。 |
| `bordered` | `boolean` | `false` | 是否在面向内容的一侧渲染 1px 分隔线。 |
| `modal` | `boolean` | `false` | 是否作为模态浮层呈现。开启时不向布局容器申请内边距避让，并接入全局遮罩与滚动锁定。 |
| `unmountOnClose` | `boolean` | `false` | 关闭时是否彻底卸载 DOM。默认 `false`（保活隐藏），关闭后保留 DOM 并使用 `hidden` 属性隐藏；设为 `true` 时在退场动画完成后销毁节点。 |
| `placeholder` | `boolean` | `false` | `modal=true` 时是否在自然文档流位置保留占位节点；普通 `docked`、`fixed`、`flow` 与 `sticky` 模式忽略该属性。 |
| `placeholderSize` | `number \| string \| undefined` | `undefined` | modal placeholder 的显式尺寸；省略时跟随组件自身总厚度。 |
| `location` | `'top' \| 'bottom' \| 'start' \| 'end' \| 'left' \| 'right'` | `'start'` | 依附的停靠边缘。`'left'` 等价映射为 `'start'`，`'right'` 等价映射为 `'end'`。 |
| `mode` | `'docked' \| 'flow' \| 'sticky' \| 'fixed'` | `'docked'` | 排布与定位模式。`'docked'` 为容器内绝对定位避让，`'flow'` 为常规文档流，`'sticky'` 为粘性定位，`'fixed'` 为视口固定定位。 |
| `blockSize` | `number \| string \| undefined` | `undefined` | 垂直于停靠边缘方向的占用厚度。数值自动转为 px；省略或传 `'auto'` 时自适应内容并由内部 ResizeObserver 自动测量。 |
| `safeArea` | `boolean \| number \| string` | `true` | 边缘安全区留白配置。`true` 时自适应当前 `mat-app-root` 或系统环境安全区；`false` 为 0；也可显式指定具体尺寸。 |
| `safeAreaSize` | `number \| string \| undefined` | `undefined` | 兼容旧版边缘方向安全区大小。 |
| `zIndex` | `number \| string \| undefined` | `undefined` | 显式指定 CSS 层级；省略时根据 `location` 提供预设层级。 |
| `attach` | `string \| HTMLElement` | `undefined` | `mode="fixed"` 时的挂载目标。未指定时保留在声明位置，显式传入后才 Teleport 到目标。 |
| `transition` | `boolean` | `true` | 是否启用默认滑入滑出过渡动效。设为 `false` 时立即切换显隐。 |
| `closeOnBack` | `boolean` | `true` | `modal=true` 时点击背景遮罩是否请求关闭。 |

组件没有公开方法。通过模板 ref 暴露 `hostElement`（根 DOM 元素）、`activeInsets`（当前生效的正交避让数据）和 `phase`（动效阶段）。未被消费的属性、`class`、`style` 作用于外层根元素。

## 事件

| 名称 | 载荷 | 触发条件 |
| --- | --- | --- |
| `update:open` | `boolean` | 组件开闭状态请求变更时触发。 |
| `update:modelValue` | `boolean` | 组件显示状态请求变更时触发。 |
| `opened` | 无 | 切入展开动画播放完毕后触发。 |
| `closed` | 无 | 退场收起动画播放完毕且清理完成后触发。 |

## Slots

| 名称 | 说明 |
| --- | --- |
| 默认 Slot | 边缘栏内部呈现的具体内容。 |
| `placeholder` | 自定义占位节点内容，提供 `{ style }` 作用域参数。 |

<script setup>
import AsideBasicExample from '../examples/aside/AsideBasicExample.vue';
import AsideOrderExample from '../examples/aside/AsideOrderExample.vue';
import AsideModelValueExample from '../examples/aside/AsideModelValueExample.vue';
import AsideLocationExample from '../examples/aside/AsideLocationExample.vue';
import AsideStickyExample from '../examples/aside/AsideStickyExample.vue';
import AsideKeepAliveExample from '../examples/aside/AsideKeepAliveExample.vue';
import AsideModalExample from '../examples/aside/AsideModalExample.vue';
</script>
