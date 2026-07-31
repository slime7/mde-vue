# 0019 — 将 ESM 分发压缩为三个文件

- 状态: superseded (by 0020)
- 日期: 2026-07-31
- 替代: 0018

## 背景

预构建 ESM 已解决源码被消费方分开预构建造成的模块实例重复，但为兼容组件、指令和函数子入口生成了大量轻量转发文件，仍显著增加 Git 依赖的文件数量。当前使用方允许破坏性升级，并优先要求最少的 dist 文件。

## 决策

移除所有 JavaScript 与 Tailwind 子入口。组件、插件、指令和命令式函数全部从 mdu-ui 根入口具名导出并编译到 dist/mdu-ui.js；基础令牌、组件样式和 Tailwind 映射合并到 dist/styles.css；完整根入口声明写入 dist/index.d.ts。dist 必须恰好包含这三个文件。

## 考虑的方案

- 保留轻量子入口转发：兼容旧导入但文件数量仍多。|只保留单一 JavaScript，Tailwind 与基础样式分离：迁移较少但 dist 仍需四个文件。|把样式注入 JavaScript：可减少为两个文件，但破坏显式样式控制、Tailwind 编译和纯 CSS 使用。

## 影响

- 使用方必须把 mdu-ui/components/*、mdu-ui/directives/*、mdu-ui/functions 改为 mdu-ui 根入口，并移除 mdu-ui/tailwind.css；支持 tree shaking 的消费构建仍可删除未使用导出；普通项目导入 mdu-ui/styles.css，Tailwind 项目在应用 CSS 中与 tailwindcss 一起导入同一文件；新增公共能力只更新根入口，不再创建包子入口。
