---
title: 组件配色
description: 按 Material 3 颜色角色为组件选择容器、内容、表面、边界和状态配色。
llms: true
order: 35
---

# 组件配色

本指南用于实现或审查 `mdu-ui` 组件样式。全局主题和组件级种子色都由共享 Material 2025 配色模块生成，组件负责把交互含义和视觉层级映射到语义角色。不要根据某个种子色下的外观选择十六进制颜色，也不要为亮色和暗色模式分别编写组件结构。

## 公共 `color` 属性

除完全没有强调色的组件外，所有公共组件都应遵守同一输入和优先级：

| 值 | 行为 |
| --- | --- |
| 省略 | 保留该组件形态的 Material 默认角色，例如 filled-tonal 按钮默认使用 secondary container |
| `primary`、`secondary`、`tertiary`、`error` | 使用当前项目主题中对应色族的 base、on-base、container 和 on-container |
| `#RRGGBB` | 把六位十六进制值作为局部种子色，生成亮暗 primary 色族 |

局部色板沿用当前主题的 `schemeVariant` 和 `contrastLevel`，未安装插件时使用 `tonal-spot` 与对比度 `0`。生成结果通过 `light-dark()` 跟随当前 `color-scheme`，只写在当前组件作用域，不修改全局令牌。

组件显式 `color` 优先于父组合组件级联值，父级联值优先于形态默认值。由 prop 生成的局部配色优先于组件的默认角色映射。中性表面、outline 和 disabled 仍使用项目中性角色，不随局部种子色变化。

三位十六进制、带透明度的十六进制、`rgb()`、颜色名称和任意 CSS 值都不是合法 `color` prop。组件内部颜色变量不是公共 API，不应由应用直接覆盖。

`MatIcon` 是内容颜色例外：省略 `color` 时继承 `currentColor`；需要绕过动态色板直接使用 CSS 颜色时可传入 `font-color`，它接受 `rgb()`、颜色名称、CSS 变量等合法颜色，并优先于 `color`。该例外不扩展其他组件的 `color` 输入格式。

`MatFab` 是官方颜色角色输入例外：它的 `color` 只接受 `primary`、`secondary`、`tertiary`、`primary-container`、`secondary-container`、`tertiary-container`、`error` 和 `error-container`。默认角色是 `primary-container`，不接受十六进制种子色；容器、内容和状态层分别使用所选角色及同组的 `on-*` 令牌。

## 基本方法

1. 先确定元素的用途、重要程度和所在表面，再选择颜色角色。
2. 在组件根节点把全局颜色角色映射到 `--mat-<component>-*` 组件变量。
3. 容器色与内容色使用规定的配对，不跨颜色组拼接。
4. 使用亮色、暗色和不同对比度检查配色，而不是只看默认主题。

```css
.mat-example {
  --mat-example-container-color: var(--mat-sys-color-primary);
  --mat-example-content-color: var(--mat-sys-color-on-primary);

  color: var(--mat-example-content-color);
  background: var(--mat-example-container-color);
}
```

上例中的组件变量只用于集中表达内部角色映射，不属于公共 CSS API。

## 理解角色名称

| 名称部分 | 用途 |
| --- | --- |
| `surface` | 页面背景和大面积、低强调区域 |
| `primary`、`secondary`、`tertiary` | 按重要程度和用途区分的强调色 |
| `container` | 按钮、卡片等前景组件的填充色，不用于文字或图标 |
| `on-*` | 放在对应父角色之上的文字或图标颜色 |
| `variant` | 相对同组基础角色更低强调的选择 |

容器和内容必须按组配对：

- `primary` 与 `on-primary`；
- `primary-container` 与 `on-primary-container`；
- `secondary` 与 `on-secondary`；
- `secondary-container` 与 `on-secondary-container`；
- `tertiary` 与 `on-tertiary`；
- `tertiary-container` 与 `on-tertiary-container`；
- `error` 与 `on-error`；
- `error-container` 与 `on-error-container`。

同一规则适用于其他成对角色。透明容器位于表面上时，内容可根据强调程度使用 `primary`、`secondary`、`tertiary`、`on-surface` 或 `on-surface-variant`。不要把 `primary-container` 当作 `primary` 上的文字色，也不要把 `on-surface` 随意放到强调色容器上。错误配对可能在动态配色或调整 `contrastLevel` 后失去必要的对比。

## 选择强调色

| 角色组 | 使用条件 | 常见用途 |
| --- | --- | --- |
| `primary` | 页面中最重要、需要最高强调的操作或活动状态 | 高强调按钮、FAB、关键活动状态 |
| `secondary` | 不需要立即吸引注意的较低强调元素 | tonal 按钮、筛选项、次要选中状态 |
| `tertiary` | 需要与主色形成对比的特殊强调，但不是最高优先级 | 徽标、通知、需要额外区分的局部元素 |
| `error` | 明确传达错误或紧急错误状态 | 无效输入、错误提示、错误操作容器 |

不要为了增加颜色数量而轮换三个强调色。`primary`、`secondary` 和 `tertiary` 表达的是用途与注意力层级，不是任意可互换的品牌色。`error` 也不能代替普通警告、选中或装饰色。

强调色组中的基础角色可作为表面上的填充、文字或图标色；带 `container` 的角色只作为填充。需要较柔和的强调容器时，优先使用同组的 `*-container` 及对应 `on-*-container`。

## 组织表面层级

`surface` 是默认页面背景。卡片、侧栏、菜单、面板和对话框等中性容器使用下列角色建立层级：

| 角色 | 相对强调程度 |
| --- | --- |
| `surface-container-lowest` | 最低 |
| `surface-container-low` | 较低 |
| `surface-container` | 默认 |
| `surface-container-high` | 较高 |
| `surface-container-highest` | 最高 |

先使用默认的 `surface-container`，只有在嵌套关系或布局层级确实需要区分时才选择其他级别。相同布局区域在不同窗口尺寸下应保持同一角色，不能因布局变化而随意交换表面语义。

所有 `surface` 和 `surface-container-*` 上的主要文字与图标使用 `on-surface`，低强调内容使用 `on-surface-variant`。需要与周围表面形成反向对比的少数组件使用 `inverse-surface`，其内容和操作分别使用 `inverse-on-surface` 与 `inverse-primary`，例如消息条。

## 选择边界颜色

- `outline` 用于需要明确边界的元素，例如输入框轮廓或独立的带轮廓控件。
- `outline-variant` 用于分隔线、装饰性边界和内部已有清晰内容对比的多元素容器。

不要用 `outline` 绘制普通分隔线或卡片的装饰边框，以免边界过强。也不要仅依靠 `outline-variant` 定义交互目标边界；只有目标内部的文字或图标已经提供足够对比时，才可把它用于按钮或标签类控件的低强调边框。

## 处理状态

- `hover`、`focus` 和 `pressed` 状态层沿用组件当前内容或强调角色，并使用共享的 `--mat-sys-state-*-state-layer-opacity` 透明度。
- `disabled` 状态使用 `on-surface` 与约定透明度生成容器、内容或边界，不为禁用状态新增颜色角色。
- `focus-visible` 边界应使用能在所在表面上保持清晰对比的语义角色。
- 除状态层和禁用态等明确需要透明度的场景外，不混合不同颜色组来制造新的组件颜色。

## 谨慎使用附加角色

大多数组件不需要附加角色，默认忽略它们：

- `primary-fixed`、`secondary-fixed`、`tertiary-fixed` 及其 `fixed-dim` 变体在亮色和暗色主题中保持相同色调。只有组件明确要求跨模式保持色调时才使用，并分别搭配对应的 `on-*-fixed` 或低强调的 `on-*-fixed-variant`。需要可靠主题对比时，仍应使用普通强调角色。
- `surface-bright` 与 `surface-dim` 在两种主题中分别保持相对最亮和最暗。只有布局需要这种跨模式亮度关系时才使用，普通背景与容器仍使用 `surface` 和 `surface-container-*`。

## 检查清单

新增或修改组件配色时确认：

1. 默认颜色来自 `--mat-sys-color-*` 语义令牌，自定义种子色只通过共享 Material 2025 模块生成，没有组件硬编码色值。
2. 先按用途和强调程度选角色，再考虑视觉效果。
3. 容器色与对应 `on-*` 内容色严格配对，`container` 角色不用于文字或图标。
4. 表面、容器层级和边界角色在不同组件及窗口尺寸中含义一致。
5. 状态层、禁用态和 `focus-visible` 使用共享规则，没有临时创造颜色。
6. 在 `light`、`dark`、支持的配色变体以及 `contrastLevel` 边界下验证可读性和层级。
7. 公共 `color` 的格式、继承和优先级符合本页约定，且局部配色不会泄漏到兄弟节点。

## 参考依据

本指南提炼自 [Material Design 3：Color roles](https://m3.material.io/styles/color/roles)，并按本项目现有的 `--mat-sys-color-*` 令牌、动态主题和组件私有变量约定改写。
