# 0025 — MatBtn text 形态接受受控 on-* 内容色输入

- 状态: active
- 日期: 2026-08-11
- 替代: 0024

## 背景

text 等无底色形态可能放置在 primary-container 等已经填充配色的表面上，需要直接使用同组 on-* 内容色保证可读性；现有共享 color 契约按 ADR 0024 不接受 on-* 输入，组件内部 CSS 变量又不是公共定制入口。

## 决策

MatBtn 的 color 在既有输入之上额外接受 10 个受控 on-* 内容色令牌（on-primary、on-secondary、on-tertiary、on-error、四个 on-*-container、on-surface、on-surface-variant），仅 variant="text" 生效：文字、图标和状态层使用对应 --mat-sys-color-on-* 令牌；非 text 形态发出开发警告并按默认配色处理，不应用该颜色。共享 isComponentColor 与其他组件的输入契约保持不变，MatBtnGroup 与 MatSplitBtn 的 color 级联不扩展。

## 考虑的方案

- 新增 text-on-container 等变体：变体与颜色语义耦合，同一 color 值在不同变体下含义不同，需复制整套 text 行为并波及所有限制 text 的组合约束。
- 允许 on-* 进入共享 color 契约：text-field、chip 和填充形态按钮会把内容色误作容器色，违反容器与内容配对规则。
- 只扩展 MatBtn text 形态的受控清单：契约可枚举、可文档化，只有无底色形态消费内容色。

## 影响

- 公共 color 契约在 MatBtn 上扩展，组件文档、示例和生成文件同步更新；ADR 0024 的共享契约与 MatFab 例外保持不变。
- on-* 与填充形态组合时按默认配色处理并给出开发警告，避免内容色被用作容器色。
- 组合组件（如 dialog 动作按钮）自动继承该能力，MatBtnGroup 与 MatSplitBtn 级联保持原契约。
