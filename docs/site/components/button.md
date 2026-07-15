---
title: Button 按钮
description: mat-btn 的普通与图标模式、尺寸、宽度、形态、配色、受控切换、事件和 slots。
llms: true
order: 50
---

# Button 按钮

`<mat-btn>` 的组件导出名是 `MatBtn`。它统一渲染普通按钮和图标按钮：省略 `icon` 时由默认 Slot 提供可见标签；传入 Material Symbols 字符串 `icon` 时切换为只包含图标的按钮。两种模式都渲染原生 `<button>`。

## 示例

### 默认样式

省略属性时使用 `filled`、`small`、`round`。第二个按钮设置 `block`，在普通文档流中作为块级 flex 容器铺满父元素：

<<< @/examples/button/ButtonDefaultExample.vue

<ClientOnly>
  <DocsPreview label="Button 默认样式预览">
    <ButtonDefaultExample />
  </DocsPreview>
</ClientOnly>

### 外观、尺寸和形状

<<< @/examples/button/ButtonVariantsExample.vue

<ClientOnly>
  <DocsPreview label="Button 外观、尺寸和形状预览">
    <ButtonVariantsExample />
  </DocsPreview>
</ClientOnly>

`variant` 支持 elevated、filled、filled tonal、outlined、text 和 standard。普通与图标模式都可以使用全部六种形态。

### 前置图标与受控切换

<<< @/examples/button/ButtonToggleExample.vue

<ClientOnly>
  <DocsPreview label="Button 前置图标与受控切换预览">
    <ButtonToggleExample />
  </DocsPreview>
</ClientOnly>

组件不自行修改 `selected`，也不触发 `update:selected`。普通按钮可以通过 `prefix`、`suffix` 属性或同名 Slots 放置前后图标；属性和 Slot 同时存在时，属性优先。

### 图标模式

<<< @/examples/button/IconButtonDefaultExample.vue

<ClientOnly>
  <DocsPreview label="Button 图标模式默认样式预览">
    <IconButtonDefaultExample />
  </DocsPreview>
</ClientOnly>

图标模式必须提供 `label` 作为操作名称；未显式传入 `title` 时，组件也使用 `label` 提供原生提示。默认 `uniform` 宽度与 `round` 形状组成圆形容器。

### 图标模式的外观、宽度和切换

<<< @/examples/button/IconButtonVariantsExample.vue

<ClientOnly>
  <DocsPreview label="Button 图标模式外观、宽度和切换预览">
    <IconButtonVariantsExample />
  </DocsPreview>
</ClientOnly>

`width` 提供 narrow、uniform、wide 三档并且只影响图标模式。Button group 不根据子项数量自动改变该值。图标模式选中时复用 `icon`，通过 Material Symbols 的 FILL 轴加强图标。

### 组件配色

<<< @/examples/button/ButtonColorExample.vue

<ClientOnly>
  <DocsPreview label="Button 组件配色预览">
    <ButtonColorExample />
  </DocsPreview>
</ClientOnly>

省略 `color` 时按 `variant` 使用 Material 默认角色。语义字符串读取项目令牌，六位十六进制值生成只作用于当前按钮的 Material 2025 primary 色族。完整规则见[组件配色](/guide/component-color)。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `block` | `boolean` | `false` | 使用块级 flex 根布局，在普通文档流中铺满父元素 |
| `variant` | `'elevated' \| 'filled' \| 'filled-tonal' \| 'outlined' \| 'text' \| 'standard'` | `'filled'` | 视觉层级，两种内容模式均可使用 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 容器、排版、图标、间距和圆角尺寸 |
| `shape` | `'round' \| 'square'` | `'round'` | 静止形状；toggle 选中时在 round 与 square 之间切换 |
| `width` | `'narrow' \| 'uniform' \| 'wide'` | `'uniform'` | 图标模式的容器宽度；普通模式忽略 |
| `icon` | `string` | 未设置 | 非空 Material Symbols 字符；设置后切换为图标模式 |
| `prefix` | `string` | 未设置 | 普通按钮前置图标，优先于 prefix Slot |
| `suffix` | `string` | 未设置 | 普通按钮后置图标，优先于 suffix Slot |
| `label` | `string` | 未设置 | 图标模式必填，写入 `aria-label` 并作为默认 `title` |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| #RRGGBB` | 未设置 | 语义色族或局部 Material 2025 种子色 |
| `toggle` | `boolean` | `false` | 启用可选择外观和 `aria-pressed`；text 会忽略该值并发出开发警告 |
| `selected` | `boolean` | `false` | 受控选中状态，仅在 toggle 或选择组中生效 |
| `value` | `string \| number \| boolean` | 未设置 | 在 `MatBtnGroup` 选择模式中的项目值 |
| `disabled` | `boolean` | `false` | 原生禁用状态；父组合组件也可强制禁用 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |

未被组件消费的 `name`、`form`、`aria-*`、`data-*` 等属性传给内部 `<button>`。图标模式下显式 `title` 优先于 `label` 生成的提示。`color` 只接受严格六位十六进制值。

### 事件

组件不定义状态更新事件。`click` 使用原生 `MouseEvent`，`focus`、`blur` 和其他原生按钮事件按 Vue 属性透传规则生效。禁用时浏览器不会触发 click。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 普通模式的简短按钮标签；图标模式忽略 |
| `prefix` | 普通模式的前置 SVG 或自定义图标；同名 prop 存在时忽略 |
| `suffix` | 普通模式的后置 SVG 或自定义图标；同名 prop 存在时忽略 |
| `selected` | 普通模式 toggle 选中时替换默认标签；图标模式忽略 |

### 状态

| 状态 | 用户可观察行为 |
| --- | --- |
| hover | 显示 8% 状态层；elevated、filled 和 filled-tonal 按规格调整海拔 |
| focus-visible | 显示焦点环和 12% 状态层 |
| pressed | 显示 12% 状态层并按尺寸改变圆角；快速点击仍会完成一次可见的圆角往返过渡 |
| selected | 切换形状和颜色；图标模式同时切换 FILL 轴，设置 `aria-pressed="true"` |
| disabled | 容器使用 `on-surface` 10%，内容使用 38%，取消阴影和点击 |

`extra-small` 与 `small` 的视觉高度分别是 32px 和 40px，但交互目标至少为 48px。减少动态效果偏好下保留最终状态并取消过渡。

组件没有公开方法，也不提供 loading、链接模式、涟漪、密度参数或完整表单方法代理。

## 参考来源

尺寸、形状和状态依据 [Material 3 Button specs](https://m3.material.io/components/buttons/specs) 与 [Icon button specs](https://m3.material.io/components/icon-buttons/specs)。

<script setup>
import ButtonColorExample from '../examples/button/ButtonColorExample.vue';
import ButtonDefaultExample from '../examples/button/ButtonDefaultExample.vue';
import ButtonToggleExample from '../examples/button/ButtonToggleExample.vue';
import ButtonVariantsExample from '../examples/button/ButtonVariantsExample.vue';
import IconButtonDefaultExample from '../examples/button/IconButtonDefaultExample.vue';
import IconButtonVariantsExample from '../examples/button/IconButtonVariantsExample.vue';
</script>
