# 0016 — 公开 MatInputBase 作为可组合文本输入基础组件

- 状态: active
- 日期: 2026-07-26
- 替代: 无

## 背景

MatInputBase 已被 Text field 与 Textarea 复用，但使用方无法通过公开入口组合无边框原生输入控件来绘制自定义输入界面。

## 决策

将 MatInputBase 作为公共组件，同时提供根入口、mdu-ui/components/mat-input-base 按需入口和 createMatUi() 的 mat-input-base 全局注册；保持现有 input、textarea、模型更新、原生属性透传以及 focusInput、getInput 行为不变。

## 考虑的方案

- 继续保持内部实现：无需维护公共入口，但使用方无法复用现有输入基础层。

## 影响

- 使用方可以复用一致的原生输入模型并自行绘制容器语义；公共 API 范围扩大，需要同步维护入口、测试和文档。
