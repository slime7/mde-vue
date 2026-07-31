# 0018 — 通过私有 Git 分发预构建 ESM

- 状态: active
- 日期: 2026-07-31
- 替代: 0001

## 背景

源码分发会让消费方 Vite 分别预构建包根入口与直接转换 Vue 组件依赖，导致 Vue provide/inject 使用的模块级 Symbol 出现重复实例，createMatUi 配置无法被 Tooltip 等组件读取。Git 依赖的安装脚本也可能被包管理器跳过，不能依赖 prepare 在消费方生成产物。

## 决策

继续通过私有 Git 和完整提交 SHA 安装，但 package exports 只暴露仓库中已提交的 dist ESM、合并 CSS、Tailwind 映射与类型声明。构建保留公共入口和内部模块边界，Vue 与 Material Color Utilities 保持外部依赖；源码是维护权威，dist 由 pnpm build 可重复生成且不得手工修改。

## 考虑的方案

- 继续直接分发源码：维护简单，但消费方预构建边界会导致共享模块重复实例。
- 通过 `prepare` 在安装时构建：无需提交产物，但 Git 依赖生命周期脚本可能被禁用且增加安装环境要求。
- 发布私有 registry 包：产物边界清晰，但增加版本、凭据和发布流程。

## 影响

- 消费方不再编译 mdu-ui 的 Vue SFC，根入口与子入口共享构建图中的内部模块。
- Git 提交必须同时包含与源码同步的 `dist/`，评审中需检查生成产物。
- 新增公共入口时必须纳入构建输入和 `exports`。
- 仍不发布 npm registry，也不提供 CommonJS 或 SSR 兼容。
