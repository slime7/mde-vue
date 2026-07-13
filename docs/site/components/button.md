---
title: Button 按钮
description: mat-btn 的尺寸、形态、配色、受控切换、图标、事件、slots 和 CSS 令牌。
llms: true
order: 50
---

# Button 按钮

`MatBtn` 渲染原生 `<button>`，用于触发保存、确认或取消等页面内操作。实现遵循 Material 3 Expressive Button 的五档尺寸、形状变换和状态规则。

## 使用方法

### 全局注册

安装插件后使用 `<mat-btn>`：

```js
import { createApp } from 'vue';
import { createMatUi } from 'mdu-ui';
import App from './App.vue';
import 'mdu-ui/styles.css';

createApp(App).use(createMatUi()).mount('#app');
```

```vue
<template>
  <mat-btn>保存</mat-btn>
</template>
```

### 按需导入

```vue
<script setup>
import { MatBtn } from 'mdu-ui/components/mat-btn';
import 'mdu-ui/styles.css';
</script>

<template>
  <MatBtn>保存</MatBtn>
</template>
```

## 示例

### 默认样式

省略属性时使用 `filled`、`s`、`round`：

```vue
<mat-btn>确认</mat-btn>
```

<ClientOnly>
  <DocsPreview label="Button 默认样式预览">
    <mat-btn>确认</mat-btn>
  </DocsPreview>
</ClientOnly>

### 外观、尺寸和形状

```vue
<mat-btn variant="elevated" size="xs">Elevated</mat-btn>
<mat-btn variant="filled" size="s">Filled</mat-btn>
<mat-btn variant="tonal" size="m">Tonal</mat-btn>
<mat-btn variant="outlined" size="l" shape="square">Outlined</mat-btn>
<mat-btn variant="text" size="xl">Text</mat-btn>
```

<ClientOnly>
  <DocsPreview label="Button 外观、尺寸和形状预览">
    <mat-btn variant="elevated" size="xs">Elevated</mat-btn>
    <mat-btn variant="filled" size="s">Filled</mat-btn>
    <mat-btn variant="tonal" size="m">Tonal</mat-btn>
    <mat-btn variant="outlined" size="l" shape="square">Outlined</mat-btn>
    <mat-btn variant="text" size="xl">Text</mat-btn>
  </DocsPreview>
</ClientOnly>

`variant` 分别表示抬升、主要填充、次要 tonal、轮廓和低强调文本操作。`text` 不支持 toggle。

### 前置图标与受控切换

```vue
<script setup>
import { ref } from 'vue';

const selected = ref(false);
</script>

<template>
  <mat-btn
    toggle
    :selected="selected"
    @click="selected = !selected"
  >
    <template #icon>☆</template>
    <template #selected-icon>★</template>
    <template #default>收藏</template>
    <template #selected>已收藏</template>
  </mat-btn>
</template>
```

<ClientOnly>
  <DocsPreview label="Button 前置图标与受控切换预览">
    <mat-btn
      toggle
      :selected="buttonSelected"
      @click="buttonSelected = !buttonSelected"
    >
      <template #icon>☆</template>
      <template #selected-icon>★</template>
      <template #default>收藏</template>
      <template #selected>已收藏</template>
    </mat-btn>
  </DocsPreview>
</ClientOnly>

组件不自行修改 `selected`，也不触发 `update:selected`。未提供选中 slot 时复用默认内容；图标回退会尝试提高字重和 `FILL` 轴。

### 组件配色

```vue
<mat-btn color="secondary">次要操作</mat-btn>
<mat-btn color="#6750a4">局部种子色</mat-btn>
```

<ClientOnly>
  <DocsPreview label="Button 组件配色预览">
    <mat-btn color="secondary">次要操作</mat-btn>
    <mat-btn color="#6750a4">局部种子色</mat-btn>
  </DocsPreview>
</ClientOnly>

省略 `color` 时按 `variant` 使用 Material 默认角色。语义字符串读取项目令牌，六位十六进制值生成只作用于当前按钮的 Material 2025 primary 色族。完整规则见[组件配色](/guide/component-color)。

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'elevated' \| 'filled' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'` | 视觉层级 |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'s'` | 容器、排版、图标、间距和圆角尺寸 |
| `shape` | `'round' \| 'square'` | `'round'` | 静止形状；toggle 选中时在 round 与 square 之间切换 |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'error' \| #RRGGBB` | 未设置 | 语义色族或局部 Material 2025 种子色 |
| `toggle` | `boolean` | `false` | 启用可选择外观和 `aria-pressed`；text 会忽略该值并发出开发警告 |
| `selected` | `boolean` | `false` | 受控选中状态，仅在 toggle 或选择组中生效 |
| `value` | `string \| number \| boolean` | 未设置 | 在 `MatBtnGroup` 选择模式中的项目值 |
| `disabled` | `boolean` | `false` | 原生禁用状态；父组合组件也可强制禁用 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |

未被组件消费的 `name`、`form`、`title`、`aria-*`、`data-*` 等属性传给内部 `<button>`。`color` 只接受严格六位十六进制值，不接受 `#RGB`、透明色、颜色名称或其他 CSS 表达式。

### 事件

组件不定义状态更新事件。`click` 使用原生 `MouseEvent`，`focus`、`blur` 和其他原生按钮事件按 Vue 属性透传规则生效。禁用时浏览器不会触发 click。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 简短按钮标签 |
| `icon` | 标签前的单个图标；按当前尺寸限制为规定图标大小 |
| `selected` | toggle 选中时替换默认标签；省略时复用默认 slot |
| `selected-icon` | toggle 选中时替换 `icon`；省略时复用并加强默认图标 |

### 状态

| 状态 | 用户可观察行为 |
| --- | --- |
| hover | 显示 8% 状态层；elevated、filled 和 tonal 按规格调整阴影 |
| focus-visible | 显示焦点环和 10% 状态层 |
| pressed | 显示 10% 状态层并按尺寸改变圆角；快速点击仍会完成一次可见的圆角往返过渡 |
| selected | 切换形状、颜色及可选 slot，设置 `aria-pressed="true"` |
| disabled | 容器使用 `on-surface` 10%，内容使用 38%，取消阴影和点击 |

`xs` 与 `s` 的视觉高度分别是 32px 和 40px，但交互目标至少为 48px。减少动态效果偏好下保留最终状态并取消过渡。

### CSS 定制入口

尺寸令牌按 `xs`、`s`、`m`、`l`、`xl` 分组：

| 模式 | 自定义属性 | 默认值序列 |
| --- | --- | --- |
| 容器高度 | `--mat-btn-<size>-container-height` | `32px / 40px / 56px / 96px / 136px` |
| 水平内边距 | `--mat-btn-<size>-horizontal-padding` | `12px / 16px / 24px / 48px / 64px` |
| 图标大小 | `--mat-btn-<size>-icon-size` | `20px / 20px / 24px / 32px / 40px` |
| 图文间距 | `--mat-btn-<size>-icon-label-gap` | `8px / 8px / 8px / 12px / 16px` |
| outline 宽度 | `--mat-btn-<size>-outline-width` | `1px / 1px / 1px / 2px / 3px` |
| square 圆角 | `--mat-btn-<size>-square-radius` | `12px / 12px / 16px / 28px / 28px` |
| pressed 圆角 | `--mat-btn-<size>-pressed-radius` | `8px / 8px / 12px / 16px / 16px` |

共享入口包括 `--mat-interactive-target-min-size`、`--mat-focus-ring-width`、`--mat-focus-ring-offset`、`--mat-state-hover-opacity`、`--mat-state-focus-opacity`、`--mat-state-pressed-opacity`、`--mat-state-disabled-container-opacity` 和 `--mat-state-disabled-content-opacity`。prop 生成的配色优先于内部颜色变量；不要依赖未记录的内部 class 或 `--mat-button-*` 变量。

组件没有公开方法，也不提供 loading、链接模式、涟漪、密度参数或完整表单方法代理。

## 参考来源

尺寸、形状和状态依据 [Material 3 Button specs](https://m3.material.io/components/buttons/specs)。基础交互结构改编自 [mdui v2 Button](https://www.mdui.org/zh-cn/docs/2/components/button)，MIT 许可见仓库根目录的 `THIRD_PARTY_NOTICES.md`。

<script setup>
import { ref } from 'vue';

const buttonSelected = ref(false);
</script>
