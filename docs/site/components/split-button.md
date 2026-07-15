---
title: Split button 拆分按钮
description: mat-split-btn 的双按钮组合、受控展开、事件、菜单 ARIA 和 slots。
llms: true
order: 65
---

# Split button 拆分按钮

`<mat-split-btn>` 的组件导出名是 `MatSplitBtn`。它把主要操作和展开菜单操作组合为两个独立原生按钮。组件只协调外观、事件、受控展开状态和菜单 ARIA，不创建菜单，也不管理菜单焦点。

## 示例

### 默认样式

第二个拆分按钮设置 `block`，只让组合根采用块级布局，不改变 leading 和 trailing 子项的宽度分配。

<<< @/examples/button/SplitButtonDefaultExample.vue

<ClientOnly>
  <DocsPreview label="Split button 默认样式预览">
    <SplitButtonDefaultExample />
  </DocsPreview>
</ClientOnly>

### 受控展开与 MatMenu

<<< @/examples/button/SplitButtonMenuExample.vue

<ClientOnly>
<DocsPreview label="Split button 受控展开与 MatMenu 预览" stacked>
    <SplitButtonMenuExample />
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `block` | `boolean` | `false` | 使用块级 flex 组根，在普通文档流中铺满父元素；不拉伸两侧按钮 |
| `variant` | `'elevated' \| 'filled' \| 'filled-tonal' \| 'outlined'` | `'filled'` | 两侧按钮统一视觉层级；不支持 text |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 两侧按钮统一尺寸和 split 几何参数 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 两侧按钮统一配色 |
| `disabled` | `boolean` | `false` | 禁用两侧原生按钮 |
| `expanded` | `boolean` | `false` | 受控菜单展开状态 |
| `controls` | `string` | 未设置 | 写入 trailing 按钮的 `aria-controls`，通常是外部菜单 id |

父组件的 `variant`、`size`、`color` 和 `disabled` 对两侧按钮具有最终决定权，slot 子按钮上的同名视觉值不会覆盖组合参数。expanded 不改变基础颜色，只加入 12% 状态层，将 trailing 的四个普通及按下圆角保持为 full，并把图标居中后旋转 180°。

### 事件

| 事件 | 载荷 | 触发条件 |
| --- | --- | --- |
| `leading-click` | `MouseEvent` | 主要按钮激活 |
| `trailing-click` | `MouseEvent` | 展开按钮激活 |
| `update:expanded` | `boolean` | trailing 激活，值为当前 `expanded` 的相反值 |

slot 子按钮自己的 `click` 监听器仍会执行。组件只发出候选展开值，不持有内部展开状态。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| `leading` | 一个 `MatBtn` 或 `MatIconBtn`，提供主要操作内容和原生属性 |
| `trailing` | 一个带必填 `label` 的 `MatIconBtn`，提供展开/收起图标 |

每个 slot 只渲染首个有效按钮。缺少或类型不符时开发环境会警告。trailing 自动获得 `aria-haspopup="menu"`、`aria-expanded`、可选 `aria-controls` 和受控 `aria-pressed`。

### 状态与键盘

两侧按钮都是独立 Tab 停靠点，使用原生 Space/Enter 激活。与 `MatMenu` 组合时，应用用同一个状态连接 `expanded` 与 `open`；MatMenu 负责菜单内部方向键、Escape、外部关闭和触发器焦点恢复。

组件没有公开方法。

## 参考来源

参数、形状和展开状态依据 [Material 3 Split button specs](https://m3.material.io/components/split-button/specs)。

<script setup>
import SplitButtonDefaultExample from '../examples/button/SplitButtonDefaultExample.vue';
import SplitButtonMenuExample from '../examples/button/SplitButtonMenuExample.vue';
</script>
