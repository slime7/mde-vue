---
title: Grid list 网格列表
description: mat-grid-list 的网格排列、相邻圆角规则与受控选择。
llms: true
order: 101
---

# Grid list 网格列表

## 组件简介

`<mat-grid-list>` 的组件导出名是 `MatGridList`。它以 CSS Grid 网格排列直属的 `mat-list-item`（导出名 `MatListItem`），是 List 的网格形态组合实现：交互模式、受控选择、键盘导航和无障碍语义与 [List 列表](/components/list)完全一致，项目自身继续使用 MatListItem 的全部能力。与纵向 List 的区别在圆角：只有旁边没有任何相邻项目的角使用大圆角（`--mat-list-container-shape`，16px），凡是有相邻项目的角使用小圆角（`--mat-list-item-container-shape`，4px），末行缺列时按真实相邻关系判断。

## 示例

### `cols`

:::: details 查看示例代码
::: code-group

<<< @/examples/grid-list/GridListColsExample.vue#template [template]

<<< @/examples/grid-list/GridListColsExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Grid list cols 预览">
    <GridListColsExample />
  </DocsPreview>
</ClientOnly>

### `interaction` 与 `selected`

选择模式必须同时提供 `interaction`、项目 `value`，并在 `select` 事件中回写值；方向键、roving tabindex 和 `role="listbox"` 语义与 List 一致。

:::: details 查看示例代码
::: code-group

<<< @/examples/grid-list/GridListSelectedExample.vue#template [template]

<<< @/examples/grid-list/GridListSelectedExample.vue#script [script]

<<< @/examples/grid-list/GridListSelectedExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Grid list selected 预览">
    <GridListSelectedExample />
  </DocsPreview>
</ClientOnly>

### `color` 与 `activeColor`

:::: details 查看示例代码
::: code-group

<<< @/examples/grid-list/GridListColorExample.vue#template [template]

<<< @/examples/grid-list/GridListColorExample.vue#script [script]

<<< @/examples/grid-list/GridListColorExample.vue#style [style]

:::
::::

<ClientOnly>
  <DocsPreview label="Grid list color 与 activeColor 预览">
    <GridListColorExample />
  </DocsPreview>
</ClientOnly>

## API

### MatGridList 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cols` | `number` | `2` | 网格列数；必须是正整数，非法值回退默认列数 |
| `interaction` | `'none' \| 'single-action' \| 'multi-action' \| 'single-select' \| 'multi-select'` | `'none'` | 整个网格唯一的交互模式，含义与 MatList 一致 |
| `selected` | 基础值、基础值数组或 `null` | `null` | 受控选择值；single-select 使用单值，multi-select 使用数组 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 网格项通常状态（未选中项）的背景色；省略时默认使用 surface-container |
| `activeColor` | 语义色或 `#RRGGBB` | 未设置 | 选中网格项的背景色；省略时默认使用 secondary-container 系列 |

项目直接使用 `mat-list-item`，其属性、事件和 Slots 见 [List 列表](/components/list)的 MatListItem 说明。未消费的原生属性（如 `aria-label`、`class`、`style`）传递给列表根元素；选择模式的根元素使用 `role="listbox"`，应通过 `aria-label` 或 `aria-labelledby` 提供可访问名称。

Grid list 是纵向 List 的网格形态组合：不提供 `variant`（分段间距与圆角即网格形态）、`draggable` 排序和 `virtual` 虚拟滚动；`mat-list-group` 折叠分组未针对网格适配。项目自身的 `swipeable` 在普通与 single-action 网格中仍按 MatListItem 的规则工作。

MatGridList 没有公开方法。

## 事件

### MatGridList 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `select` | `{ value, selected, nextSelected, originalEvent }` | 启用的选择项通过指针、Space 或 Enter 请求改变选择 |

single-select 再次激活当前项不会取消选择，也不会发出 `select`；multi-select 每次激活都返回不修改原数组的新数组。`originalEvent` 是实际的 `MouseEvent` 或 `KeyboardEvent`。非交互模式没有自定义事件。

## Slots

### MatGridList Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 直接放置 `MatListItem`；项目必须是网格的直接子级，位置由 DOM 顺序按行列依次填充 |

## 状态与键盘

- 只有网格外角使用 16px 大圆角，其余有相邻项目的角保持 4px 小圆角；仅有一项时四角均为 16px。末行缺列时，下、右方向都没有相邻项目的角同样使用大圆角。
- 网格项之间保持与分段 List 相同的 2px 间距；`cols` 变化时圆角按新的相邻关系随形状过渡更新。
- hover、focus、pressed 的形状变化、禁用与选中配色与 List 的项目行为一致。
- Tab 进入当前停靠项，`ArrowDown`、`ArrowRight` 移至下一项，`ArrowUp`、`ArrowLeft` 移至上一项；方向键按网格 DOM 顺序移动，到边界后循环并跳过禁用项。
- 选择模式优先以第一个选中项作为初始停靠点；方向键只移动焦点，不自动改变选择。选择使用 Space 或 Enter 请求。

## 参考来源

Material 3 官方规范与 AndroidX 均未提供网格形式的列表组件。本组件依据 [List specs](https://m3.material.io/components/lists/specs) 的令牌、状态与交互规则，结合 CSS Grid 布局组合实现，圆角与间距沿用 List 的分段形态语义；选择模式的语义限制参考 [WAI-ARIA Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)。

<script setup>
import GridListColorExample from '../examples/grid-list/GridListColorExample.vue';
import GridListColsExample from '../examples/grid-list/GridListColsExample.vue';
import GridListSelectedExample from '../examples/grid-list/GridListSelectedExample.vue';
</script>
