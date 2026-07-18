# 0013 — 重构按钮组与图标按钮语义

- 状态: superseded
- 日期: 2026-07-18
- 替代: 0010
- 被替代: 0014

## 背景

现有 MatBtn 将非空字符串 icon 作为独立图标模式，无法用 icon=true 从默认 Slot 读取 Material Symbols，也没有让显式 aria-label 覆盖 label。按钮组实现还把 connected 选中圆角固定为全圆，未完整表达 Material 3 Button groups guidelines 对 standard/connected 的选择模式、按压宽度和 round/square 反转规则。

## 决策

保留一个 MatBtn 原生按钮实现：icon=true 解析默认 Slot 文本，字符串 icon 使用 prop 文本并优先，未设置 icon 时默认 Slot 中的 MatIcon 仍按普通按钮渲染；label 作为可访问名称与 Tooltip 回退，显式 aria-label 优先，title 优先覆盖 Tooltip。MatBtnGroup 的 standard 与 connected 都支持 none/single/multiple，standard 在按压时协调相邻宽度，connected 只协调当前形状；两者均反转选中形状，connected 额外维护组外轮廓与子按钮颜色/视觉层级约束。

## 考虑的方案

- 继续把图标按钮作为独立组件：会造成 variant、toggle、selected、disabled 和按钮组交互分叉。
- 让 icon=true 只改变样式而不解析默认 Slot：无法形成稳定的 Material Symbols 文本来源。
- 统一普通按钮与图标模式，并由按钮组提供形状和按压协调：公共状态逻辑一致，迁移成本集中在图标内容 API。

## 影响

- icon 属性类型扩展为 boolean | string，icon=true 的默认 Slot 文本 API 替代旧的隐式用法。
- connected 的 none 选择模式与不一致的子按钮颜色或视觉层级在开发环境发出警告。
- 内部 CSS 变量只用于组形状和状态协调，不新增公共 CSS 定制令牌。
