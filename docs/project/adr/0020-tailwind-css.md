# 0020 — 恢复 tailwind.css 独立分发入口

- 状态: active
- 日期: 2026-07-31
- 替代: 0019

## 背景

适配 Tailwind CSS v4 时，Tailwind 主题映射需要通过 @theme inline 配置引入。将 tailwind.css 与 styles.css 合并后会导致非 Tailwind 项目或单独引用组件 CSS 的项目也加载该映射，带来不必要的样式解析。使用方希望恢复 mdu-ui/tailwind.css 作为可选的独立样式子入口。

## 决策

恢复 mdu-ui/tailwind.css 为独立分发入口，styles.css 仅包含基础令牌与组件 SFC 样式，dist/ 恰好包含 index.d.ts、mdu-ui.js、styles.css 和 tailwind.css 四个产物文件。

## 考虑的方案

- 合并为单一 styles.css：构建输出文件少，但会给非 Tailwind 消费方引入冗余 @theme 映射开销。

## 影响

- Tailwind v4 消费方需要在 CSS 中显式导入 mdu-ui/tailwind.css。普通项目仅导入 mdu-ui/styles.css，两者职责清晰且无额外编译包袱。
