# 0023 — createMatUi 组件默认属性 defaults 配置

- 状态: active
- 日期: 2026-08-11
- 替代: 0017

## 背景

应用需要统一设置组件的默认属性，且 Tooltip 的全局延迟配置也应纳入统一入口。

## 决策

createMatUi 新增 defaults 选项，按组件键（mat-* 标签去前缀后的 camelCase）设置公共组件的 prop 默认值；显式 prop 优先于 defaults，defaults 优先于组件定义默认值，v-model 相关属性不接受配置。原顶层 tooltip 选项迁移为 defaults.tooltip，不兼容旧用法。新增公共函数 useMatProps 统一处理注入与合并，全部公共组件接入。

## 考虑的方案

- 保留顶层 tooltip 并另增 defaults
- 注册时包装组件改写 props 默认值
- 每个组件手工读取注入配置

## 影响

- 公共插件选项面发生破坏性变更；组件统一通过 useMatProps 读取默认值，命令式宿主自动继承；Tooltip 延迟配置随 defaults 迁移。
