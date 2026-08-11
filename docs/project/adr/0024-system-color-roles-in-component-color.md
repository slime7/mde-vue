# 0024 — 扩展公共 color 输入到系统颜色角色

- 状态: active
- 日期: 2026-08-11
- 替代: 无

## 背景

极少数场景需要按钮等组件直接使用 surface-container、primary-container 等系统令牌；现有 color 只接受四个语义色与六位十六进制种子色，组件内部 CSS 变量又不作为公共定制入口。

## 决策

共享 isComponentColor/useComponentColor 增加受控的系统颜色角色清单：四个 -container 角色，以及 surface、surface-dim、surface-bright、surface-variant 和五个 surface-container-* 角色。角色直接引用当前主题令牌，有同组 on-* 的角色按该配对使用内容色，表面角色使用 on-surface（surface-variant 使用 on-surface-variant），不生成局部色板；MatFab 保持官方 FAB 角色契约。

## 考虑的方案

- 只允许应用通过内部 CSS 变量覆盖：违背 ADR 0007，不提供兼容承诺。
- 接受 MAT_COLOR_ROLES 全部角色：shadow、scrim、outline 等角色没有组件语义，on-* 角色作为输入无意义。
- 接受受控角色清单：契约可枚举、可文档化，surface-container 等无 on-* 配对的角色使用显式内容映射。

## 影响

- 公共 color 契约扩展，组件文档、示例和类型同步更新。
- 无填充形态会把所选角色直接用作内容色调，表面系列角色主要适合填充形态。
- 组合组件自动继承新输入；MatFab 保持官方 FAB 角色契约。
