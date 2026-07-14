---
title: Button group 按钮组
description: mat-btn-group 的标准与连接布局、级联属性、受控单选多选和事件。
llms: true
order: 60
---

# Button group 按钮组

`<mat-btn-group>` 的组件导出名是 `MatBtnGroup`。它在单行中组织 `MatBtn` 和 `MatIconBtn`。standard 形态保留独立按钮间距，connected 形态连接可选择按钮。组容器不聚焦，每个子按钮保持独立 Tab 停靠点。

## 示例

### 默认 standard 组

```vue
<mat-btn-group>
  <mat-btn variant="outlined">取消</mat-btn>
  <mat-btn>保存</mat-btn>
</mat-btn-group>
```

<ClientOnly>
  <DocsPreview label="Button group 默认 standard 组预览">
    <mat-btn-group>
      <mat-btn variant="outlined">取消</mat-btn>
      <mat-btn>保存</mat-btn>
    </mat-btn-group>
  </DocsPreview>
</ClientOnly>

按下 standard 子项时，该项宽度临时变为 115%，相邻项不缩窄，组整体允许增宽。

### 受控 connected 多选

```vue
<script setup>
import { ref } from 'vue';

const selected = ref(['bold']);

function applySelection({ nextSelected }) {
  selected.value = nextSelected;
}
</script>

<template>
  <mat-btn-group
    variant="connected"
    selection="multiple"
    :selected="selected"
    required
    full-width
    @select="applySelection"
  >
    <mat-icon-btn label="粗体" value="bold">format_bold</mat-icon-btn>
    <mat-icon-btn label="斜体" value="italic">format_italic</mat-icon-btn>
  </mat-btn-group>
</template>
```

<ClientOnly>
  <DocsPreview label="Button group 受控 connected 多选预览">
    <mat-btn-group
      variant="connected"
      selection="multiple"
      :selected="groupSelected"
      required
      full-width
      @select="groupSelected = $event.nextSelected"
    >
      <mat-icon-btn label="粗体" value="bold">format_bold</mat-icon-btn>
      <mat-icon-btn label="斜体" value="italic">format_italic</mat-icon-btn>
    </mat-btn-group>
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'standard' \| 'connected'` | `'standard'` | 组布局形态 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 未显式设置尺寸的子按钮继承该值 |
| `shape` | `'round' \| 'square'` | `'round'` | 子按钮形状和 connected 外角形状 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 级联给未显式设置 `color` 的子按钮 |
| `disabled` | `boolean` | `false` | 为 true 时禁用全部子按钮；子按钮仍可单独禁用 |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | 是否按子按钮 `value` 计算选择候选值 |
| `selected` | 基础值、基础值数组或 `null` | `null` | 受控当前值；single 使用单值，multiple 使用数组 |
| `required` | `boolean` | `false` | 阻止取消 single 当前项或 multiple 最后一项 |
| `fullWidth` | `boolean` | `false` | connected 形态下铺满父容器并等分子项；standard 中忽略 |

组的 `size`、`shape`、`color` 只作为默认值，子组件显式 prop 优先。组 `disabled` 与子组件 `disabled` 取或。选择模式下每个直接子按钮都必须有唯一 `value`；缺少时发出开发警告并忽略该次选择。

connected 应使用 `single` 或 `multiple`，所有子项应使用相同颜色形态，不使用 text Button 或 standard Icon button。违反这些组合约束时开发环境会警告。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `select` | `{ value, selected, nextSelected, originalEvent }` | 未禁用子按钮被激活且选择规则允许变化 |

`value` 是本次项目值，`selected` 是该项目的候选布尔状态，`nextSelected` 是调用方应回写的单值、数组或 `null`，`originalEvent` 是原生 `MouseEvent`。组件不会修改 `selected`。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 直接放置 `MatBtn` 或 `MatIconBtn`；不要嵌套额外布局容器 |

### 状态与键盘

组根节点使用 `role="group"`，没有 `tabindex`。Tab 依次进入每个子按钮，Space 和 Enter 使用原生按钮激活；不实现方向键或 roving tabindex。connected 选择项使用 `aria-pressed`，不模拟 radio/radiogroup。

组件没有公开方法。

## 参考来源

参数与交互依据 [Material 3 Button group specs](https://m3.material.io/components/button-groups/specs)。

<script setup>
import { ref } from 'vue';

const groupSelected = ref(['bold']);
</script>
