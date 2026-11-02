# 0042 — 运行时插件与 Vite 自动导入插件分离

- 状态: active
- 日期: 2026-11-02
- 替代: 0020

## 背景

createMatUi 当前在顶层导入并全局注册全部组件，任何具名导入仍会保留完整组件图；单一运行时 ESM 也没有构建期自动导入入口，无法同时获得主题能力与按需体积。

## 决策

createMatUi 改为纯运行时插件，只创建主题、provide 组件设置、安装 v-intersection、v-state-layer 与 v-ripple；组件由使用方手动导入或由新增的 mde-vue/vite 子入口自动导入。Vite 插件扫描静态 HTML 模板标签并注入根入口导入。构建从组件源码生成 component-manifest，运行时 defaults 校验和自动导入共用该元数据。dist 增加 vite.js 与 vite.d.ts，根入口类型移除 GlobalComponents。

## 考虑的方案

- 保留全局注册并仅依赖 tree shaking：写法不变，但 createMatUi 仍会引入全部组件。
- 依赖第三方 unplugin-vue-components：实现较快，但增加消费方依赖和解析器维护。
- 为每个组件提供子路径入口：绝对按需，但文件数量、共享状态和分发复杂度显著增加。

## 影响

- 组件按需导入时 JS 体积显著下降；createMatUi 不再全局注册组件，属于破坏性变化，文档和测试需同步。mde-vue/vite 只处理静态 HTML 模板，动态组件和渲染函数仍需手动导入。dist 从四个文件增加为六个，取代 0020 的四文件约束。
