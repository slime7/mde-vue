# 0008 — 共享 Surface 与 Action 内部基础层

- 状态: active
- 日期: 2026-07-14
- 替代: 无

## 背景

Card、Button 以及后续 Dialog、List 都需要复用原生元素语义、交互状态与表面基础结构。

## 决策

采用 MatSurfaceBase 承担表面根结构，采用 MatActionBase 承担 button 与 link 的交互语义；公共组件仅组合这些内部基础层。

## 考虑的方案

- 继续在每个组件中复制表面和交互实现
- 直接暴露通用基础组件作为公共 API

## 影响

- 减少后续组件重复实现，同时保持基础层为内部实现，不承诺其文件路径、class 或 CSS 变量兼容性。
