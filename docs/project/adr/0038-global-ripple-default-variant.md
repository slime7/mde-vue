# 0038 — 全局涟漪支持默认变体配置

- 状态: active
- 日期: 2026-10-29
- 替代: 无

## 背景

createMatUi 的 useRipple 原本只是布尔开关，应用无法统一选择组件涟漪的波纹形状，只能逐实例接管 v-ripple，破坏组件内建状态层顺序。

## 决策

useRipple 保留布尔开关语义并扩展为 boolean | { variant }：传 true 使用默认 circle，传对象时隐含启用并读取 variant 作为组件涟漪的默认波纹形状，对象为空时等同 true。createMatUi 校验 variant 是否属于 v-ripple 支持的五个值，useMatUi() 返回 false、true 或只读的 { variant } 对象，MatActionBase 将变体传给 v-ripple。

## 考虑的方案

- 新增独立的 ripple 选项对象，与 useRipple 并列
- useRipple 接受对象，单选项同时表达启用与默认变体
- 在 defaults 中按组件配置涟漪变体

## 影响

- 公共插件选项类型从 boolean 扩展为 boolean 或对象，读取 useRipple 的用户代码可继续按真值判断；组件涟漪默认形状可由应用统一设置，自定义元素上的 v-ripple 不受影响；如后续需要更多全局涟漪选项，可继续扩展该对象。
