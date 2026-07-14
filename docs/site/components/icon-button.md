---
title: Icon button 图标按钮
description: mat-icon-btn 的尺寸、宽度、配色、无障碍名称、受控切换、slots 和 CSS 令牌。
llms: true
order: 55
---

# Icon button 图标按钮

`<mat-icon-btn>` 的组件导出名是 `MatIconBtn`。它渲染只包含图标的原生按钮。每个实例必须通过 `label` 提供可访问操作名称，并默认使用同一文本作为原生 `title` 提示。

## 示例

### 默认样式

```vue
<mat-icon-btn label="更多操作">more_vert</mat-icon-btn>
```

<ClientOnly>
  <DocsPreview label="Icon button 默认样式预览">
    <mat-icon-btn label="更多操作">more_vert</mat-icon-btn>
  </DocsPreview>
</ClientOnly>

默认使用 `filled`、`small`、`default` 宽度和 `round` 形状。

### 外观、宽度和受控切换

```vue
<mat-icon-btn label="Filled" variant="filled" width="narrow">star</mat-icon-btn>
<mat-icon-btn label="Tonal" variant="filled-tonal">star</mat-icon-btn>
<mat-icon-btn label="Outlined" variant="outlined" width="wide">star</mat-icon-btn>
<mat-icon-btn label="Standard" variant="standard">star</mat-icon-btn>

<mat-icon-btn
  label="收藏"
  toggle
  :selected="favorite"
  color="#6750a4"
  @click="favorite = !favorite"
>
  <template #default>favorite_border</template>
  <template #selected>favorite</template>
</mat-icon-btn>
```

<ClientOnly>
  <DocsPreview label="Icon button 外观、宽度和受控切换预览">
    <mat-icon-btn label="Filled" variant="filled" width="narrow">star</mat-icon-btn>
    <mat-icon-btn label="Tonal" variant="filled-tonal">star</mat-icon-btn>
    <mat-icon-btn label="Outlined" variant="outlined" width="wide">star</mat-icon-btn>
    <mat-icon-btn label="Standard" variant="standard">star</mat-icon-btn>
    <mat-icon-btn
      label="收藏"
      toggle
      :selected="iconFavorite"
      color="#6750a4"
      @click="iconFavorite = !iconFavorite"
    >
      <template #default>favorite_border</template>
      <template #selected>favorite</template>
    </mat-icon-btn>
  </DocsPreview>
</ClientOnly>

## API

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `'filled' \| 'filled-tonal' \| 'outlined' \| 'standard'` | `'filled'` | 视觉层级 |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'small'` | 高度、图标、宽度、边框和圆角尺寸 |
| `width` | `'narrow' \| 'default' \| 'wide'` | `'default'` | 当前尺寸中的容器宽度档位 |
| `shape` | `'round' \| 'square'` | `'round'` | 静止形状；toggle 选中时变为相反形状 |
| `color` | 语义色或 `#RRGGBB` | 未设置 | 遵守统一组件配色约定 |
| `toggle` | `boolean` | `false` | 启用受控选择外观和 `aria-pressed` |
| `selected` | `boolean` | `false` | 受控选中状态 |
| `value` | `string \| number \| boolean` | 未设置 | 按钮组选择值 |
| `label` | `string` | 必填 | 写入 `aria-label`，未传原生 `title` 时也作为提示 |
| `disabled` | `boolean` | `false` | 原生禁用状态 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 原生按钮类型 |

显式传入原生 `title` 时会覆盖 `label` 生成的提示。其他原生属性继续传给 `<button>`。

### 事件

`click` 载荷为原生 `MouseEvent`。组件不自行修改 `selected`，不触发 `update:selected`；其他原生事件继续透传。

### Slots

| 名称 | 内容约束 |
| --- | --- |
| 默认 | 单个图标，SVG 会适配当前图标尺寸 |
| `selected` | toggle 选中时使用的图标；省略时复用并加强默认图标 |

### 状态

hover、focus-visible、pressed、selected 和 disabled 状态与 Button 使用相同状态层和禁用规则；focus 与 pressed 使用 12% 状态层。`extra-small` 与 `small` 仍提供至少 48px 的交互目标。当前可见提示由原生 `title` 提供，不包含独立 Tooltip。

### CSS 定制入口

| 模式 | 自定义属性 | `extra-small / small / medium / large / extra-large` 默认值 |
| --- | --- | --- |
| 高度 | `--mat-icon-btn-<size>-container-height` | `32 / 40 / 56 / 96 / 136px` |
| 图标 | `--mat-icon-btn-<size>-icon-size` | `20 / 24 / 24 / 32 / 40px` |
| narrow 起始/结束间距 | `--mat-icon-btn-<size>-narrow-{leading,trailing}-space` | `4 / 4 / 12 / 16 / 32px` |
| default 起始/结束间距 | `--mat-icon-btn-<size>-default-{leading,trailing}-space` | `6 / 8 / 16 / 32 / 48px` |
| wide 起始/结束间距 | `--mat-icon-btn-<size>-wide-{leading,trailing}-space` | `10 / 14 / 24 / 48 / 72px` |
| outline | `--mat-icon-btn-<size>-outlined-outline-width` | `1 / 1 / 1 / 2 / 3px` |
| square 形状 | `--mat-icon-btn-<size>-square-container-shape` | `12 / 12 / 16 / 28 / 28px` |
| pressed 形状 | `--mat-icon-btn-<size>-pressed-container-shape` | `8 / 8 / 12 / 16 / 16px` |

组件根据图标大小与两侧间距计算容器宽度。变体颜色入口为 `--mat-icon-btn-<variant>-container-color`、`icon-color`、`state-layer-color`；outlined 另有 `outline-color`。选择状态使用 `--mat-icon-btn-filled-unselected-*`、`--mat-icon-btn-filled-tonal-selected-*`、`--mat-icon-btn-outlined-selected-*` 和 `--mat-icon-btn-standard-selected-*`。

共享交互、状态和焦点令牌与 Button 相同。组件没有公开方法。

## 参考来源

参数与行为依据 [Material 3 Icon button specs](https://m3.material.io/components/icon-buttons/specs)。

<script setup>
import { ref } from 'vue';

const iconFavorite = ref(false);
</script>
