# 0035 — 引入 Playwright 端到端测试

- 状态: active
- 日期: 2026-09-28
- 替代: 无

## 背景

现有验证以 jsdom 单元测试为主，真实布局、top layer、Popover、CSS Anchor Positioning、指针拖拽手势与滚动时序等浏览器行为无法自动验证；项目面向 Electron 等现代 Chromium 内核，项目文档已约定纯视觉与复杂交互优先用 E2E 检查覆盖。

## 决策

引入 @playwright/test 并仅安装 Chromium：在 tests/e2e/ 维护 fixture 应用（Vite alias 直连 src/ 维护权威）与高复杂度行为用例，覆盖浮层定位、模态焦点与滚动锁、指针拖拽、应用布局边缘与队列时序；原单元测试迁移至 tests/unit/。E2E 不并入 pnpm check，按改动范围单独运行。

## 考虑的方案

- Vitest Browser Mode：与现有工具链同源，但定位是组件级测试，多页导航、精细拖拽与截图基线管理较弱
- Cypress：Chromium-only 场景无优势，指针坐标级控制不如 Playwright
- Playwright（采用）：精确指针与帧级拖拽、内置等待与 trace 诊断、webServer 直接拉起 Vite，未来可扩展 Electron 验证

## 影响

- 新增 devDependency 与 Chromium 安装步骤（pnpm e2e:install）；fixture 应用不进入公共入口、dist 与 AI 文档；拖拽类用例依赖真实指针几何，维护时需结合组件手势参数调整。
