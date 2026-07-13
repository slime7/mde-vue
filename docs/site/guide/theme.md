---
title: 主题
description: 配置 Material 3 种子色、亮暗模式、配色变体和对比度，并在运行时切换主题。
llms: true
order: 30
---

# 主题

`createMatUi()` 接受可选的 `theme` 配置。默认种子色是 `#20a6fc`，默认模式是 `system`，默认配色变体是 `tonal-spot`，默认对比度是 `0`。

```js
import { createMatUi } from 'mdu-ui';

app.use(createMatUi({
  theme: {
    mode: 'system',
    seedColor: '#20a6fc',
    schemeVariant: 'tonal-spot',
    contrastLevel: 0,
  },
}));
```

## 配置项

| 配置 | 可用值 | 说明 |
| --- | --- | --- |
| `mode` | `light`、`dark`、`system` | `system` 跟随系统配色偏好 |
| `seedColor` | `#RGB` 或 `#RRGGBB` | 例如 `#20a6fc`，用于生成完整色板 |
| `schemeVariant` | 九种 Material 3 变体 | 默认 `tonal-spot` |
| `contrastLevel` | `-1` 至 `1` | 超出范围或非数字值会被拒绝 |
| `target` | `HTMLElement` | 默认写入 `document.documentElement` |

支持的 `schemeVariant` 是 `tonal-spot`、`neutral`、`vibrant`、`expressive`、`fidelity`、`content`、`monochrome`、`rainbow` 和 `fruit-salad`。

## 运行时切换

在插件后代组件中调用 `useMatTheme()`，通过返回的主题控制器更新配置：

```vue
<script setup>
import { useMatTheme } from 'mdu-ui';

const theme = useMatTheme();

function enableDarkMode() {
  theme.setMode('dark');
}

function changeSeedColor() {
  theme.setSeedColor('#6750a4');
}
</script>
```

控制器还提供当前配置、解析后的实际模式以及清理系统主题监听的方法。主题不会自动写入 `localStorage`；需要持久化时由应用自行读取与保存。

## CSS 令牌

运行时会在目标元素写入以下命名空间的 CSS 自定义属性：

- 颜色：`--mat-color-*`；
- 形状：`--mat-shape-*`；
- 排版：`--mat-type-*`；
- 阴影：`--mat-shadow-*`；
- 动效：`--mat-motion-*`；
- 状态：`--mat-state-*`。

应用样式可以直接使用令牌，例如 `color: var(--mat-color-on-surface)`。主题切换时，依赖这些令牌的组件和应用样式会同步更新。
