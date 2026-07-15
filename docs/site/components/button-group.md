---
title: Button group 按钮组
description: mat-btn-group 的标准与连接布局、级联属性、受控单选多选和事件。
llms: true
order: 60
---

# Button group 按钮组

`<mat-btn-group>` 的组件导出名是 `MatBtnGroup`。它在单行中组织普通或图标模式的 `MatBtn`。standard 形态保留独立按钮间距，connected 形态连接可选择按钮。组容器不聚焦，每个子按钮保持独立 Tab 停靠点。

## 示例

### 默认 standard 组

第二组设置 `block`，组根铺满父元素，子按钮仍保持内容宽度。

<<< @/examples/button/ButtonGroupDefaultExample.vue

<ClientOnly>
  <DocsPreview label="Button group 默认 standard 组预览">
    <ButtonGroupDefaultExample />
  </DocsPreview>
</ClientOnly>

按下 standard 子项时，该项宽度临时增大 15%，直接相邻项同步缩窄，组的总宽保持不变。首尾项由唯一邻项承担全部缩量，中间项由两侧邻项各承担一半；快速点击也会完成可见的展开和回弹。受控 `selected` 只保留形状和颜色状态，不持续改变宽度。connected 形态不联动子项宽度。

宽度与形状动效使用 `--mat-sys-motion-duration-short3`（150ms）和 `--mat-sys-motion-easing-standard`，作为 Web 上对 Material 3 FastSpatial 的近似。按下展开和释放回弹使用相同的时间与缓动曲线；这是仍留在界面中的空间变化，不按方向切换 decelerate 或 accelerate。快速释放时，组件会等待展开至少完成 75% 后再开始回弹；`prefers-reduced-motion: reduce` 下不等待动画。

### 受控 connected 多选

<<< @/examples/button/ButtonGroupSelectionExample.vue

<ClientOnly>
  <DocsPreview label="Button group 受控 connected 多选预览">
    <ButtonGroupSelectionExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `block` | `boolean` | `false` | 使用块级 flex 组根，在普通文档流中铺满父元素；不改变子按钮宽度分配 |
| `variant` | `'standard' \| 'connected'` | `'standard'` | 组布局形态 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 未显式设置尺寸的子按钮继承该值 |
| `shape` | `'round' \| 'square'` | `'round'` | 子按钮形状和 connected 外角形状 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 级联给未显式设置 `color` 的子按钮 |
| `disabled` | `boolean` | `false` | 为 true 时禁用全部子按钮；子按钮仍可单独禁用 |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | 是否按子按钮 `value` 计算选择候选值 |
| `selected` | 基础值、基础值数组或 `null` | `null` | 受控当前值；single 使用单值，multiple 使用数组 |
| `required` | `boolean` | `false` | 阻止取消 single 当前项或 multiple 最后一项 |
| `fullWidth` | `boolean` | `false` | connected 形态下铺满父容器并等分子项；standard 中忽略 |

`block` 只控制组根的外部布局；`fullWidth` 还会让 connected 的直接子按钮等分整行。connected 可以只设置 `block` 并保留内容宽度，也可以只设置 `fullWidth` 直接启用铺满与等分。standard 始终忽略 `fullWidth`。

组的 `size`、`shape`、`color` 只作为默认值，子组件显式 prop 优先。组 `disabled` 与子组件 `disabled` 取或。选择模式下每个直接子按钮都必须有唯一 `value`；缺少时发出开发警告并忽略该次选择。

connected 应使用 `single` 或 `multiple`，所有子项应使用相同颜色形态，不使用 text 或 standard Button。违反这些组合约束时开发环境会警告。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `select` | `{ value, selected, nextSelected, originalEvent }` | 未禁用子按钮被激活且选择规则允许变化 |

`value` 是本次项目值，`selected` 是该项目的候选布尔状态，`nextSelected` 是调用方应回写的单值、数组或 `null`，`originalEvent` 是原生 `MouseEvent`。组件不会修改 `selected`。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 直接放置普通或图标模式的 `MatBtn`；不要嵌套额外布局容器 |

### 状态与键盘

组根节点使用 `role="group"`，没有 `tabindex`。Tab 依次进入每个子按钮，Space 和 Enter 使用原生按钮激活；不实现方向键或 roving tabindex。connected 选择项使用 `aria-pressed`，不模拟 radio/radiogroup。

组件没有公开方法。

## 参考来源

参数与交互依据 [Material 3 Button group specs](https://m3.material.io/components/button-groups/specs)。

<script setup>
import ButtonGroupDefaultExample from '../examples/button/ButtonGroupDefaultExample.vue';
import ButtonGroupSelectionExample from '../examples/button/ButtonGroupSelectionExample.vue';
</script>
