---
title: Split button 拆分按钮
description: mat-split-btn 的双按钮组合、受控展开、事件、菜单 ARIA、slots 和 CSS 令牌。
llms: true
order: 65
---

# Split button 拆分按钮

`<mat-split-btn>` 的组件导出名是 `MatSplitBtn`。它把主要操作和展开菜单操作组合为两个独立原生按钮。组件只协调外观、事件、受控展开状态和菜单 ARIA，不创建菜单，也不管理菜单焦点。

## 示例

### 默认样式

```vue
<mat-split-btn>
  <template #leading>
    <mat-btn>新建</mat-btn>
  </template>
  <template #trailing>
    <mat-icon-btn label="更多新建方式">arrow_drop_down</mat-icon-btn>
  </template>
</mat-split-btn>
```

<ClientOnly>
  <DocsPreview label="Split button 默认样式预览">
    <mat-split-btn>
      <template #leading>
        <mat-btn>新建</mat-btn>
      </template>
      <template #trailing>
        <mat-icon-btn label="更多新建方式">arrow_drop_down</mat-icon-btn>
      </template>
    </mat-split-btn>
  </DocsPreview>
</ClientOnly>

### 受控展开与外部菜单

```vue
<script setup>
import { ref } from 'vue';

const expanded = ref(false);
</script>

<template>
  <mat-split-btn
    variant="filled"
    size="small"
    color="#6750a4"
    :expanded="expanded"
    controls="create-menu"
    @update:expanded="expanded = $event"
  >
    <template #leading>
      <mat-btn @click="createDefault">新建</mat-btn>
    </template>
    <template #trailing>
      <mat-icon-btn label="更多新建方式">arrow_drop_down</mat-icon-btn>
    </template>
  </mat-split-btn>

  <div v-if="expanded" id="create-menu" role="menu">
    <!-- 应用负责菜单项、焦点、Escape、外部点击和焦点返回。 -->
  </div>
</template>
```

<ClientOnly>
  <DocsPreview label="Split button 受控展开与外部菜单预览" stacked>
    <mat-split-btn
      variant="filled"
      size="small"
      color="#6750a4"
      :expanded="splitExpanded"
      controls="split-example-menu"
      @update:expanded="splitExpanded = $event"
    >
      <template #leading>
        <mat-btn>新建</mat-btn>
      </template>
      <template #trailing>
        <mat-icon-btn label="更多新建方式">arrow_drop_down</mat-icon-btn>
      </template>
    </mat-split-btn>

<!-- 保持下方原生元素顶格，避免 Markdown 将其解析为代码块。 -->
<div v-if="splitExpanded" id="split-example-menu" class="docs-preview-menu" role="menu">新建文档<br>新建文件夹</div>
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'elevated' \| 'filled' \| 'filled-tonal' \| 'outlined'` | `'filled'` | 两侧按钮统一视觉层级；不支持 text |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 两侧按钮统一尺寸和 split 几何参数 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 两侧按钮统一配色 |
| `disabled` | `boolean` | `false` | 禁用两侧原生按钮 |
| `expanded` | `boolean` | `false` | 受控菜单展开状态 |
| `controls` | `string` | 未设置 | 写入 trailing 按钮的 `aria-controls`，通常是外部菜单 id |

父组件的 `variant`、`size`、`color` 和 `disabled` 对两侧按钮具有最终决定权，slot 子按钮上的同名视觉值不会覆盖组合参数。expanded 不改变基础颜色，只加入 12% 状态层、改变 trailing 内角并把图标旋转 180°。

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

两侧按钮都是独立 Tab 停靠点，使用原生 Space/Enter 激活。菜单打开后应由应用把焦点移动到菜单，处理方向键、Escape、外部点击，并在关闭后把焦点返回 trailing 按钮。

### CSS 定制入口

| 自定义属性 | `extra-small / small / medium / large / extra-large` 默认值 |
| --- | --- |
| `--mat-split-btn-<size>-inner-corner-size` | `4 / 4 / 4 / 8 / 12px` |
| `--mat-split-btn-<size>-interactive-inner-corner-size` | `8 / 12 / 12 / 20 / 20px` |
| `--mat-split-btn-<size>-leading-button-leading-space` | `12 / 16 / 24 / 48 / 64px` |
| `--mat-split-btn-<size>-leading-button-trailing-space` | `10 / 12 / 24 / 48 / 64px` |
| `--mat-split-btn-<size>-trailing-button-icon-size` | `22 / 22 / 26 / 38 / 50px` |
| `--mat-split-btn-<size>-trailing-button-leading-space` | `13 / 13 / 15 / 29 / 43px` |
| `--mat-split-btn-<size>-trailing-button-trailing-space` | `13 / 13 / 15 / 29 / 43px` |

两侧间距 `--mat-split-btn-between-space` 默认 `2px`；`--mat-split-btn-menu-between-space` 默认 `4px`，供应用放置外部菜单时使用。组件根据 trailing 图标和两侧间距计算宽度，图标偏移属于内部实现，不是定制入口。

变体颜色使用 `--mat-split-btn-<variant>-container-color`、`label-text-color`、`icon-color`、`state-layer-color`。elevated、filled 和 filled-tonal 另有 `container-elevation` 与 `hover-container-elevation`；outlined 使用 `--mat-split-btn-outlined-outline-color`。组件没有公开方法。

## 参考来源

参数、形状和展开状态依据 [Material 3 Split button specs](https://m3.material.io/components/split-button/specs)。

<script setup>
import { ref } from 'vue';

const splitExpanded = ref(false);
</script>
