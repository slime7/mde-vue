# 0006 — 采用 Material 3 分层令牌与完整组件属性名

- 状态: active
- 日期: 2026-07-13
- 替代: 0002

## 背景

现有主题使用扁平的颜色、形状、排版、阴影、动效和状态命名空间，按钮尺寸与 filled tonal 变体使用缩写，难以与 Material 3 的 reference、system、component 令牌层对应，也无法完整表达 Expressive 字体、形状与动效体系。

## 决策

基础样式采用 `--mat-ref-*`、`--mat-sys-*`、`--mat-<component>-*` 三层 CSS 令牌；运行时主题只写入 53 个 `--mat-sys-color-*` 角色；Tailwind 仅映射同一语义值。按钮尺寸改用 `extra-small`、`small`、`medium`、`large`、`extra-large`，`tonal` 改为 `filled-tonal`，旧名称不保留兼容别名。组件几何值采用 Material Android Expressive v34，Web 端继续使用 Vue 与原生 CSS。

## 考虑的方案

- 保留旧令牌和属性并增加兼容别名：迁移平缓，但会长期维持两套公共 API。
- 仅整理系统令牌，不修改组件属性：改动较小，但组件 API 与 Material 命名仍不一致。

## 影响

- 公共 CSS 令牌、按钮 size 和 filled-tonal 变体发生不兼容变更，使用方必须一次性迁移。
- 字体、形状、海拔、动效和状态获得完整且可测试的 Material 3 体系，组件与 Tailwind 共享同一语义来源。
- 不引入 `@material/web` 或字体资源，继续保持 Vue 3 源码直接分发和 `system-ui` 默认字体。
