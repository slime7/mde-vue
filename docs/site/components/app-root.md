---
title: App root 应用布局根
description: mat-app-root 的应用坐标系、文档与内部滚动模式、边缘登记、响应式布局数据和浮动组件自动接入。
llms: true
order: 69
---

# App root 应用布局根

## 组件简介

`<mat-app-root>` 的组件导出名是 `MatAppRoot`。它在 Vue 应用内承担通常由 `body` 承担的页面布局职责：建立隔离的覆盖层坐标系，统一处理安全区、固定边缘占位、正文避让、浮动组件排列和基于容器宽度的断点。应用通常只放置一个铺满视口的 AppRoot；文档预览等容器化场景可以放置多个同级实例，但 AppRoot 不允许嵌套。

默认模式沿用 Vuetify `VApp`/`VMain` 的文档滚动思路：AppRoot 至少铺满动态视口，内容增长时由 `document`/`body` 滚动，组件不会修改 `html` 或 `body` 的 `overflow`。设置 `scrollable` 后，AppRoot 保持确定高度，正文层改为内部滚动容器；`fillViewport=false` 与 `scrollable=true` 组合使用时，必须通过自身样式或父级布局提供确定的块轴高度。

## 示例

### `fillViewport`

完整页面保留默认 `fillViewport=true`。容器、文档预览和嵌入区域使用 `fillViewport=false`，高度由内容或外部样式决定。

:::: details 查看示例代码
::: code-group

<<< @/examples/app-root/AppRootBasicExample.vue#template [template]

<<< @/examples/app-root/AppRootBasicExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="AppRoot 容器化布局预览">
    <AppRootBasicExample />
  </DocsPreview>
</ClientOnly>

### `scrollable`

`scrollable` 只改变正文滚动归属，不改变边缘组件和浮动组件的接入方式。下面的预览为 AppRoot 提供了明确高度。

:::: details 查看示例代码
::: code-group

<<< @/examples/app-root/AppRootScrollableExample.vue#template [template]

<<< @/examples/app-root/AppRootScrollableExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="AppRoot 内部滚动预览">
    <AppRootScrollableExample />
  </DocsPreview>
</ClientOnly>

### `useMatApp()` 与实时布局数据

`useMatApp()` 必须在 AppRoot 的后代组件 `setup()` 中调用。返回的 `layout` 是同一个深只读响应式对象，可以直接用于 `computed()`、`watch()` 或模板渲染。

:::: details 查看示例代码
::: code-group

<<< @/examples/app-root/AppRootLayoutExample.vue#template [template]

<<< @/examples/app-root/AppRootLayoutExample.vue#script [script]

<<< @/examples/app-root/AppRootLayoutExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="AppRoot 实时布局数据预览">
    <AppRootLayoutExample />
  </DocsPreview>
</ClientOnly>

### `registerEdge()` 自定义边缘内容

自定义固定页眉、侧栏等内容通过 `registerEdge()` 加入布局计算。元素可以位于 AppRoot 内，也可以 Teleport 到当前 document 的其他位置。组件卸载时必须调用 `unregister()`；位置或尺寸由无法被 `ResizeObserver` 感知的状态改变时调用 `update()`。

:::: details 查看示例代码
::: code-group

<<< @/examples/app-root/AppRootRegisterEdgeExample.vue#template [template]

<<< @/examples/app-root/AppRootRegisterEdgeExample.vue#script [script]

<<< @/examples/app-root/AppRootRegisterEdgeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="AppRoot 自定义边缘登记预览">
    <AppRootRegisterEdgeExample />
  </DocsPreview>
</ClientOnly>

### 布局组件自动接入与正文滚动

位于 AppRoot 内且设置 `app` 的 Toolbar、Navigation rail 和 FAB 会自动接入当前应用布局并保持在边缘固定；正文区域可方便组合 `<mat-scroll-area>` 与 `<mat-container>` 进行滚动，Navigation 与 App bar 不会被正文滚动带走。示例展示底部 docked Toolbar、FAB、Snackbar 和 Tooltip 在正文滚动时的自动避让与层级排列。

:::: details 查看示例代码
::: code-group

<<< @/examples/app-root/AppRootComponentsExample.vue#template [template]

<<< @/examples/app-root/AppRootComponentsExample.vue#script [script]

<<< @/examples/app-root/AppRootComponentsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="AppRoot 相关组件自动接入预览">
    <AppRootComponentsExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fillViewport` | `boolean` | `true` | 至少铺满 `100dvb`；与 `scrollable` 同时启用时使用确定的 `100dvb` 高度 |
| `scrollable` | `boolean` | `false` | `false` 时内容增长并由 document/body 滚动；`true` 时正文层成为内部滚动容器 |

未消费的原生属性、`class` 和 `style` 传给 AppRoot 根元素。组件不会修改 `html`、`body` 或 Vue 挂载节点；完整页面应用应自行提供基础重置，例如让 `html`、`body` 与挂载节点具有可用的最小高度并清除默认 `body` 外边距。

### `useMatApp()`

```js
import { useMatApp } from 'mde-vue';

const { layout, registerEdge } = useMatApp();
```

在 AppRoot 外调用会抛出 `Error`。返回对象包含：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `layout` | `Readonly<MatAppLayout>` | 同一个深只读响应式布局对象 |
| `registerEdge(options)` | `({ edge, element }) => MatAppEdgeRegistration` | 登记固定边缘元素；参数无效时抛出 `TypeError` |

`layout` 字段：

| 字段 | 说明 |
| --- | --- |
| `size { width, height }` | 当前应用布局坐标区尺寸；默认文档滚动模式使用视口高度，内部滚动和容器化模式使用 AppRoot 边框盒 |
| `padding { top, bottom, start, end }` | 安全区与各边缘元素外延共同形成的正文避让值 |
| `content { width, height }` | `size` 减去对应两侧 `padding` 后的非负尺寸 |
| `breakpoint` | 按 AppRoot 宽度计算的 `compact`、`medium`、`expanded`、`large` 或 `extra-large` |
| `breakpointRange { min, max }` | 当前断点的闭区间；五档边界依次为 0、600、840、1200、1600px，最后一档 `max` 为 `Infinity` |
| `edges` | `top`、`bottom`、`start`、`end` 的 `{ size, startInset, endInset }` 汇总 |

`registerEdge({ edge, element })` 的 `edge` 只接受 `top`、`bottom`、`start`、`end`，`element` 必须是当前 document 中的 `HTMLElement`。返回值包含只读响应式 `insets { start, end }`、`update()` 和幂等的 `unregister()`。

边缘组件接入遵循“先出现先占有”的通栏排布规则：在 AppRoot 容器内先出现的组件占据该方向的通栏（例如先 Navigation 后 AppBar 时 Navigation 高度为页面高度，AppBar 宽度为页面宽度扣去 Navigation 宽度；反之 AppBar 占满整宽，Navigation 高度扣去 AppBar 高度）。同向连续放置多个组件时（如先后放置两个 Navigation rail）按顺序依次偏移并累加占据宽度，可用于组合两级导航菜单。

## 事件

组件不定义自定义事件。正文及浮动子组件的原生事件保持各自行为。

## Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 应用正文与布局组件；AppRoot 不公开覆盖层 Slot，浮动组件通过各自的 app 接入能力自动挂载 |

## 组件接入规则

- `MatToolbar app`：省略 `attach` 时自动进入当前 AppRoot。docked 登记 `bottom`；所有 floating 变体不占布局，但会避让已登记边缘。floating 仍可显式设置 `placeholder`，为声明处的长内容保留滚动末端空间。显式 `attach` 始终优先，并沿用视口固定模式。
- `MatNavigationRail app`：省略 `attach` 时自动进入当前 AppRoot。纵向固定登记 `start`，横向登记 `bottom`；modal 展开层覆盖正文，只以 collapsed host 宽度参与布局。显式 `attach` 保留原行为。
- `MatSnackbar`：模板实例自动进入当前 AppRoot 的 Snackbar 组，并由 AppRoot 处理安全区、边缘避让和 16px 容器边距；内部滚动模式下，该间距从浮动组边界向内计算，不把滚动条占用计作间距。命令式 `snackbar()`/`toast()` 仍挂载到 body，并使用旧 Toolbar 几何注册表。
- `MatFab app`：自动进入普通浮动组，与容器边缘保持 16px 间距；内部滚动模式下同样从浮动组边界向内计算。`position` 控制 `start`、`center`、`end` 对齐；未设置 `app` 时仍是声明位置的原生按钮。
- `MatTooltip`：省略 `attach` 且展示目标位于当前 AppRoot 时进入应用覆盖层，并避让 `layout.padding`；目标位于 AppRoot 外时回退到 body。已打开的 dialog/Popover 和显式 `attach` 仍具有更高优先级。
- `MatDialog` 与 modal Bottom sheet、Side sheet：位于 AppRoot 内且省略 `attach` 时，进入 AppRoot 内部的模态层，表面与帷幕限制在应用矩形内，正文层设为 `inert` 并锁定滚动；AppRoot 外的内容（如自绘任务栏）保持可见且可点击。`attach` 显式指向 AppRoot 根元素时同样按应用范围展示；指向其他元素时保持铺满视口的原有行为。document 模式（`fillViewport=true` 且 `scrollable=false`）下应用范围等于视口，任务栏等 AppRoot 外内容应使用 `scrollable` 或 `fillViewport=false` 布局。
- `MatMenu`：位于 AppRoot 内时，菜单的视口夹紧与透明 scrim 都限制在应用矩形内，点击应用外只关闭菜单且不拦截该次事件。

模态层位于浮动组与 Snackbar 层之上，多个模态实例仍由共享堆叠管理器只显示顶层帷幕；Menu 继续使用浏览器 Popover top layer。

## 参考来源

浮动边距与排列遵循 Material 3 的 [FAB specs](https://m3.material.io/components/fab/specs)、[Extended FAB specs](https://m3.material.io/components/extended-fab/specs)、[Snackbar guidelines](https://m3.material.io/components/snackbar/guidelines) 和 [Toolbars guidelines](https://m3.material.io/components/toolbars/guidelines)：FAB 与容器边缘保持 16dp，Snackbar 不贴边并位于 FAB 上方，floating Toolbar 使用自身推荐边距；docked Toolbar 仍保持横向贴边。

<script setup>
import AppRootBasicExample from '../examples/app-root/AppRootBasicExample.vue';
import AppRootComponentsExample from '../examples/app-root/AppRootComponentsExample.vue';
import AppRootLayoutExample from '../examples/app-root/AppRootLayoutExample.vue';
import AppRootRegisterEdgeExample from '../examples/app-root/AppRootRegisterEdgeExample.vue';
import AppRootScrollableExample from '../examples/app-root/AppRootScrollableExample.vue';
</script>
