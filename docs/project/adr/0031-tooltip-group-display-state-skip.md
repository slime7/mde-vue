# 0031 — 同组 Tooltip 延迟跳过基于当前显示状态

- 状态: active
- 日期: 2026-08-16
- 替代: 0017

## 背景

默认 skipDelayDuration 为 0 时，同组 Tooltip 显示中切换仍要等待完整打开延迟；配置窗口后，Tooltip 关闭后短暂时间内进入同组其他 Tooltip 也会跳过延迟，与无显示时按 openDelay 计时的预期不一致。

## 决策

同组延迟跳过仅取决于组内当前是否有 Tooltip 显示：显示中进入同组另一个 Tooltip 立即显示；组内无显示时一律按 openDelay 计时；移除公共选项 defaults.tooltip.skipDelayDuration，旧配置静默忽略。

## 考虑的方案

- 保留 skipDelayDuration 作为关闭后额外快速切换窗口：与无显示时计时的规则冲突，且默认值 0 使同组切换无法立即显示。

## 影响

- 分组状态从有效期窗口改为当前显示标记，在 Tooltip 关闭动画结束时清除；移除插件选项与类型声明，运行时向后兼容；同步更新测试、使用文档与生成产物。
