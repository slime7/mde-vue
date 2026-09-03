---
title: List 列表
description: mat-list、mat-list-group 与 mat-list-item 的 Material 3 Expressive 外观、折叠分组、操作和受控选择。
llms: true
order: 100
---

# List 列表

## 组件简介

`<mat-list>` 的组件导出名是 `MatList`，折叠分组 `<mat-list-group>` 的导出名是 `MatListGroup`，项目 `<mat-list-item>` 的导出名是 `MatListItem`。List 纵向组织相关内容，提供 `standard` 与 `segmented` 两种 Material 3 Expressive 外观，默认使用 `segmented`，并支持非交互、单操作、多操作、单选和多选五种互斥的交互模式。MatListGroup 可与直属 MatListItem 混排，其 Activator 仍使用普通 MatListItem。

## 示例

选择与操作示例只保留组件结构所需的 `interaction`、`selected` 和 `value` 依赖。

### `variant`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListVariantExample.vue#template [template]

<<< @/examples/list/ListVariantExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List variant 预览">
    <ListVariantExample />
  </DocsPreview>
</ClientOnly>

### `virtual` 虚拟滚动

针对海量数据长列表，`<mat-list>` 支持通过 `virtual` 属性开启原生虚拟滚动优化 DOM 渲染性能。列表首尾两项永久常驻渲染以保持标准的容器首尾圆角外观，占位容器置于内部，滚动平滑无闪烁。

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListVirtualExample.vue#template [template]

<<< @/examples/list/ListVirtualExample.vue#script [script]

<<< @/examples/list/ListVirtualExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List 虚拟滚动预览">
    <ListVirtualExample />
  </DocsPreview>
</ClientOnly>

### `expanded` 与 MatListGroup

有 `value` 的分组由根 List 的 `v-model:expanded` 完全控制；省略 `value` 的分组保存自己的展开状态。Activator Slot 提供当前 `expanded`，箭头和其他 trailing 内容由使用方决定。

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListExpandedExample.vue#template [template]

<<< @/examples/list/ListExpandedExample.vue#script [script]

<<< @/examples/list/ListExpandedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List 折叠分组预览">
    <ListExpandedExample />
  </DocsPreview>
</ClientOnly>

### `interaction`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListInteractionExample.vue#template [template]

<<< @/examples/list/ListInteractionExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List interaction 预览" stacked>
    <ListInteractionExample />
  </DocsPreview>
</ClientOnly>

### `draggable`

设置 `draggable` 后，按住未禁用的直属 MatListItem 500ms 可开始拖动。每个可排序项目必须提供稳定且唯一的 `value`；应用在 `reorder` 事件中更新原数组，List 本身不会修改业务数据。

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListDraggableExample.vue#template [template]

<<< @/examples/list/ListDraggableExample.vue#script [script]

<<< @/examples/list/ListDraggableExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List 长按拖动排序预览">
    <ListDraggableExample />
  </DocsPreview>
</ClientOnly>

### `selected`

选择模式必须同时提供 `interaction`、项目 `value`，并在 `select` 事件中回写值。

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListSelectedExample.vue#template [template]

<<< @/examples/list/ListSelectedExample.vue#script [script]

<<< @/examples/list/ListSelectedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List selected 预览" stacked>
    <ListSelectedExample />
  </DocsPreview>
</ClientOnly>

### `color`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListColorExample.vue#template [template]

<<< @/examples/list/ListColorExample.vue#script [script]

<<< @/examples/list/ListColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List color 预览" stacked>
    <ListColorExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `value`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemValueExample.vue#template [template]

<<< @/examples/list/ListItemValueExample.vue#script [script]

<<< @/examples/list/ListItemValueExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem value 预览">
    <ListItemValueExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `href`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemHrefExample.vue#template [template]

<<< @/examples/list/ListItemHrefExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem href 预览">
    <ListItemHrefExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `type`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemTypeExample.vue#template [template]

<<< @/examples/list/ListItemTypeExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem type 预览">
    <ListItemTypeExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `disabled`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemDisabledExample.vue#template [template]

<<< @/examples/list/ListItemDisabledExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem disabled 预览">
    <ListItemDisabledExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `lines`

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemLinesExample.vue#template [template]

<<< @/examples/list/ListItemLinesExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem lines 预览">
    <ListItemLinesExample />
  </DocsPreview>
</ClientOnly>

### ListItem 的 `separateTrailing`

在选择模式（`single-select` 或 `multi-select`）下，默认不开启 `separateTrailing` 时，尾部内容作为主选项的一部分，点击整行（包括尾部区域）均触发选择，适合放置展示型标记、`MatRadio` 或 `MatCheckbox`；开启 `separateTrailing` 后，尾部内容支持承载独立交互控件并与行选择解耦。此时整行仍保持统一连续的状态层（hover、按压与焦点环完整覆盖整行，视觉上不被割裂为两块），但尾部插槽内的交互控件享有最高点击与按压优先级，点击这些控件时优先响应其自身操作且不触发整行选中；点击尾部区域的空白留白处或非交互内容依然可正常触发整行选中。

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemSeparateTrailingExample.vue#template [template]

<<< @/examples/list/ListItemSeparateTrailingExample.vue#script [script]

<<< @/examples/list/ListItemSeparateTrailingExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem separateTrailing 预览">
    <ListItemSeparateTrailingExample />
  </DocsPreview>
</ClientOnly>

### ListItem 尺寸

一行项目至少为 56px。24px 图标和 40px 头像维持 56px 最小高度，56px 媒体和 64px 媒体分别把项目撑高至 72px 和 88px；更大的自定义 Slot 内容继续自然扩展。

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemSizesExample.vue#template [template]

<<< @/examples/list/ListItemSizesExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem 内容尺寸预览">
    <ListItemSizesExample />
  </DocsPreview>
</ClientOnly>

### MatList 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListDefaultSlotExample.vue#template [template]

<<< @/examples/list/ListDefaultSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="List 默认 Slot 预览">
    <ListDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### MatListItem 默认 Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemDefaultSlotExample.vue#template [template]

<<< @/examples/list/ListItemDefaultSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem 默认 Slot 预览">
    <ListItemDefaultSlotExample />
  </DocsPreview>
</ClientOnly>

### `leading` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemLeadingSlotExample.vue#template [template]

<<< @/examples/list/ListItemLeadingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem leading Slot 预览">
    <ListItemLeadingSlotExample />
  </DocsPreview>
</ClientOnly>

### `overline` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemOverlineSlotExample.vue#template [template]

<<< @/examples/list/ListItemOverlineSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem overline Slot 预览">
    <ListItemOverlineSlotExample />
  </DocsPreview>
</ClientOnly>

### `supporting` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemSupportingSlotExample.vue#template [template]

<<< @/examples/list/ListItemSupportingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem supporting Slot 预览">
    <ListItemSupportingSlotExample />
  </DocsPreview>
</ClientOnly>

### `trailing` Slot

:::: details 查看示例代码
::: code-group

<<< @/examples/list/ListItemTrailingSlotExample.vue#template [template]

<<< @/examples/list/ListItemTrailingSlotExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="ListItem trailing Slot 预览">
    <ListItemTrailingSlotExample />
  </DocsPreview>
</ClientOnly>

省略 `lines` 时，组件按 overline、默认标签和 supporting Slot 的数量推断一至三行。单操作模式的 leading、文字和 trailing 共同构成一个主操作；多操作模式把 trailing 放在主操作之外。

## API {#list-api}

### MatList 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'standard' \| 'segmented'` | `'segmented'` | 项目连续排列或以 2px 间隔分段 |
| `interaction` | `'none' \| 'single-action' \| 'multi-action' \| 'single-select' \| 'multi-select'` | `'none'` | 整个 List 唯一的交互模式 |
| `selected` | 基础值、基础值数组或 `null` | `null` | 受控选择值；single-select 使用单值，multi-select 使用数组 |
| `expanded` | `(string \| number \| boolean)[]` | `[]` | 有值 MatListGroup 的受控展开值，可同时包含多个值 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 选择项的局部 container/on-container 色对；省略时使用 secondary 色族 |
| `draggable` | `boolean` | `false` | 是否允许长按未禁用的直属 MatListItem 请求拖动排序 |
| `virtual` | `boolean` | `false` | 是否启用虚拟滚动来优化长列表 DOM 性能 |
| `items` | `Array<unknown>` | `[]` | 虚拟滚动的全量数据列表 |
| `itemHeight` | `number \| string \| undefined` | 未设置 | 固定单项高度（px）；设置后跳过动态尺寸计算 |
| `estimatedItemHeight` | `number \| string` | `48` | 动态高度模式下的初始预估单项高度（px） |
| `buffer` | `number \| string` | `3` | 视口上下方额外预渲染的缓冲项数量 |
| `itemKey` | `Function \| string \| undefined` | 未设置 | 用于提取 item 唯一 key 的函数或属性名；省略时默认使用 index |

选择模式的根元素使用 `role="listbox"`，应通过 `aria-label` 或 `aria-labelledby` 提供可访问名称。其他未消费的原生属性传递给根 `ul` 或 listbox `div`。

`expanded` 的成员使用 `Object.is()` 比较。分组请求展开或收起时会返回一个新数组，不修改传入数组，也不会移除当前没有对应分组的值。

### MatListGroup 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | 未设置 | 在根 List 的 `expanded` 数组中标识受控分组；省略时使用初始折叠的内部状态 |

同一 MatList 中有值分组的 `value` 必须稳定且唯一；重复值会发出开发警告。MatListGroup 应直接放置在 MatList 中。

### MatListItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string \| number \| boolean` | 未设置 | 选择或拖动排序中的稳定项目值；对应模式下必须设置 |
| `href` | `string` | 未设置 | 单操作或多操作模式下把主操作渲染为链接 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 主操作为 button 时的原生类型 |
| `disabled` | `boolean` | `false` | 禁用主操作、选择和多操作 trailing 区域 |
| `lines` | `1 \| 2 \| 3` | 按 Slots 推断 | 控制 56、72、88px 最小高度以及三行内容的顶部对齐 |
| `separateTrailing` | `boolean` | `false` | 是否将 trailing 插槽与主操作/选择区分离渲染为独立操作区；选择模式下用于承载独立按钮等交互控件 |

操作模式中未消费的原生属性传给主按钮或链接，可设置 `target`、`rel` 等链接属性；非交互和选择模式中传给项目根元素。`href` 在非交互或选择模式中会被忽略并发出开发警告。

## 事件

| 组件 | 事件 | 载荷 | 触发条件 |
| --- | --- | --- | --- |
| `MatList` | `select` | `{ value, selected, nextSelected, originalEvent }` | 启用的选择项通过指针、Space 或 Enter 请求改变选择 |
| `MatList` | `update:expanded` | `(string \| number \| boolean)[]` | 有值分组请求展开或收起，用于 `v-model:expanded` |
| `MatList` | `reorder` | `{ value, fromIndex, toIndex, originalEvent }` | `draggable` 项目长按拖动并在新位置释放 |
| `MatList` | `scroll` | `{ scrollTop, scrollHeight, clientHeight, startIndex, endIndex }` | 开启虚拟滚动时滚动触发 |
| `MatList` | `visible-range-change` | `{ startIndex, endIndex }` | 开启虚拟滚动时可见索引区间变化触发 |
| `MatListItem` | `click` | 原生 `MouseEvent` | 单操作或多操作模式中的启用主操作被激活 |

single-select 再次激活当前项不会取消选择，也不会发出 `select`。multi-select 每次激活都返回不修改原数组的新数组。`originalEvent` 是实际的 `MouseEvent` 或 `KeyboardEvent`。非交互模式没有自定义事件，trailing 中的独立控件使用自己的事件。MatListGroup 没有自定义事件；无值分组不会触发根 List 的 `update:expanded`。

## 方法

通过模板引用（`ref`）可调用 `MatList` 暴露的公共方法：

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `calculate` | 无 | `void` | 手动触发虚拟滚动计算 |
| `refresh` | 无 | `Promise<void>` | 在 `nextTick` 后异步触发虚拟滚动计算 |
| `scrollTo` | `options: ScrollToOptions` | `void` | 滚动容器原生 `scrollTo` 代理 |
| `scrollToIndex` | `index: number, options?: { align?: 'start' \| 'center' \| 'end' \| 'auto', behavior?: ScrollBehavior }` | `void` | 滚动到指定索引项 |
| `getScroller` | 无 | `HTMLElement \| Window \| null` | 获取关联的滚动容器元素 |

## Slots

| 组件 | 名称 | 内容约束 |
| --- | --- | --- |
| `MatList` | 默认 | 常规模式直接放置 `MatListItem` 等；虚拟滚动模式接收 `{ item, index, itemRef, isFirst, isLast }` 作用域参数 |
| `MatListGroup` | `activator` | 必须且只能放置一个 `MatListItem`；接收 `{ expanded: boolean }`，trailing 只放展示内容 |
| `MatListGroup` | 默认 | 直接放置该组的 `MatListItem` 和 `MatDivider` |
| `MatListItem` | 默认 | 必需的主要标签文字 |
| `MatListItem` | `leading` | 图标、40px 头像、56px 图片、媒体或非交互选择标记 |
| `MatListItem` | `overline` | 标签上方的短文本 |
| `MatListItem` | `supporting` | 一至三行辅助文字 |
| `MatListItem` | `trailing` | 尾部短文本、图标；multi-action 或开启 separateTrailing 的选择项可放置可聚焦操作 |

single-action 的所有 Slots 都位于同一个按钮或链接中，不能嵌套其他交互元素。选择模式中的 leading 和默认 trailing 作为展示内容处理，选择状态由 `aria-selected` 表达；若需要在选择模式下放置独立操作按钮，可设置 `separateTrailing` 将尾部操作区与行选择解耦。

作为 Activator 的 MatListItem 会变成单一 disclosure 按钮：组件忽略其 `href`、选择 `value` 和普通叶子 `click`，自动设置 `aria-expanded` 与 `aria-controls`。组件不会自动添加箭头或改写 trailing。Activator 缺失或不是单个 MatListItem 时会发出开发警告，并让内容保持展开。

## 状态与键盘

- 静止时首项顶部和末项底部使用 16px 外角，相邻项目之间保持 4px 内角；仅有一项时四角均为 16px。
- List 使用 roving tabindex，Tab 进入当前停靠项，再次 Tab 离开 List。
- 在 `none`、`single-action` 和 `multi-action` 模式中，点击 Activator 或按 Enter、Space 可切换分组；禁用 Activator 不响应。方向键顺序包含 Activator 和已展开的可操作项目，并跳过折叠内容。
- 折叠内容使用 `inert` 和 `aria-hidden` 离开交互与无障碍顺序。若收起时焦点仍在组内，焦点会先回到 Activator。
- `single-select` 和 `multi-select` 暂不支持折叠。此时组件发出开发警告，把 Activator 降级为静态分组标签并始终展示内容，保留 listbox 的 group/option 结构。
- `ArrowDown`、`ArrowRight` 移至下一项，`ArrowUp`、`ArrowLeft` 移至上一项；到边界后循环并跳过禁用项。
- 选择模式优先以第一个选中项作为初始停靠点；方向键只移动焦点，不自动改变选择。
- 选择模式使用 Space 或 Enter 请求选择。多操作模式以及开启 `separateTrailing` 的选择模式把主项与 trailing 内的启用控件纳入同一方向键顺序。
- 键盘焦点环完整包围当前项目或独立操作，不会被相邻项目、多操作 trailing 区域或展开分组内容的边界遮挡。
- selected 同时改变容器配色和形状。disabled 内容降低强调，不响应指针或键盘；减少动态效果偏好下关闭形状和状态层过渡。
- `draggable` 只接管主指针长按：按住 500ms 后显示等尺寸的 dragged 背景占位容器和抬升预览，预览自身也切换为 dragged 容器色；启动前移动超过 8px、提前释放或发生 pointercancel 时保持普通点击和滚动。
- 只有实际进入拖动后才会清除现有文本选区并在文档范围禁止新的文本选择；完成、取消、失焦、关闭 `draggable` 或组件卸载后立即恢复。
- 排序只在连续的有效直属 MatListItem 区段内进行。Divider、MatListGroup、禁用项、缺少 value 或 value 重复的项目是固定边界；multi-action 的 trailing 控件不会启动拖动。
- `fromIndex` 和 `toIndex` 按全部直属 MatListItem 计算，不包含 Divider 与 MatListGroup。位置没有变化时不触发 `reorder`；拖动成功后抑制同一次 click 或选择请求。
- 拖动支持鼠标、触控笔和触摸主指针，不提供键盘排序或跨 List 拖放。Escape、窗口失焦、关闭 `draggable` 和组件卸载会取消当前拖动。

组件没有公开方法。

## 参考来源

外观、内容结构和交互依据 Material 3 [List overview](https://m3.material.io/components/lists/overview)、[List specs](https://m3.material.io/components/lists/specs) 与 [List guidelines](https://m3.material.io/components/lists/guidelines)。折叠效果参考官方 Lists specs 的 [Expand 演示](https://m3.material.io/components/lists/specs#43f774a6-b1fb-4719-9376-f706c7b82eac)：官方页面说明 Android List 可以展开和折叠，本组件的受控数组、Vue Slots 和 Web 无障碍语义是面向浏览器的适配。选择模式的语义限制参考 [WAI-ARIA Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)。

<script setup>
import ListColorExample from '../examples/list/ListColorExample.vue';
import ListDefaultSlotExample from '../examples/list/ListDefaultSlotExample.vue';
import ListDraggableExample from '../examples/list/ListDraggableExample.vue';
import ListExpandedExample from '../examples/list/ListExpandedExample.vue';
import ListInteractionExample from '../examples/list/ListInteractionExample.vue';
import ListItemDefaultSlotExample from '../examples/list/ListItemDefaultSlotExample.vue';
import ListItemDisabledExample from '../examples/list/ListItemDisabledExample.vue';
import ListItemHrefExample from '../examples/list/ListItemHrefExample.vue';
import ListItemLeadingSlotExample from '../examples/list/ListItemLeadingSlotExample.vue';
import ListItemLinesExample from '../examples/list/ListItemLinesExample.vue';
import ListItemSeparateTrailingExample from '../examples/list/ListItemSeparateTrailingExample.vue';
import ListItemOverlineSlotExample from '../examples/list/ListItemOverlineSlotExample.vue';
import ListItemSizesExample from '../examples/list/ListItemSizesExample.vue';
import ListItemSupportingSlotExample from '../examples/list/ListItemSupportingSlotExample.vue';
import ListItemTrailingSlotExample from '../examples/list/ListItemTrailingSlotExample.vue';
import ListItemTypeExample from '../examples/list/ListItemTypeExample.vue';
import ListItemValueExample from '../examples/list/ListItemValueExample.vue';
import ListSelectedExample from '../examples/list/ListSelectedExample.vue';
import ListVariantExample from '../examples/list/ListVariantExample.vue';
import ListVirtualExample from '../examples/list/ListVirtualExample.vue';
</script>
