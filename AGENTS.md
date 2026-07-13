# mdu-ui Agent 工作规则

`mdu-ui` 是一个仅供仓库所有者使用的 Vue 3 组件库，使用 JavaScript、Vue SFC 和原生 CSS，面向最新浏览器中的客户端应用。

## 开始任务前

1. 获取任何文件内容时默认使用 UTF-8 编码。
2. 阅读与任务相关的权威文档：
   - 产品目标与边界：`docs/project/VISION.md`
   - 系统结构与数据流：`docs/project/ARCHITECTURE.md`
   - 公共概念与不变量：`docs/project/ABSTRACTIONS.md`
   - 环境、命令与常见任务：`docs/project/GETTING-STARTED.md`
   - 长期技术决策：`docs/project/adr/README.md` 及相关 ADR
3. 检查工作区状态，保留与当前任务无关的现有更改。
4. 给用户看的回复使用清晰、直接的中文，禁止使用网络热梗、黑话或晦涩的典型互联网大厂术语。

## 开发约束

- 仅使用 JavaScript，不向源码引入 TypeScript。
- Vue 组件使用 Vue 3 Composition API 和 `<script setup>`。
- 公共 JavaScript API 使用 JSDoc 说明参数、返回值和可能抛出的错误；内部代码只为不直观的约束添加注释。
- 组件标签统一使用 `mat-*` 前缀，组件目录和导出名称保持一一对应。
- 组件基于 Vue 实现，不增加 Web Components、React 或其他框架适配层。
- 样式使用原生 CSS；共享设计值必须通过 `--mat-*` 令牌表达，组件私有定制入口使用组件命名空间，例如 `--mat-btn-*`。
- 保持源码直接分发：公共入口必须能由普通 Vue/Vite 使用方从包 `exports` 解析，不添加 npm 发布或 `prepare` 流程。
- 只支持最新浏览器和客户端渲染；不要加入旧浏览器兼容层、SSR 分支、本地化或 IDE 插件。
- 修改公共导出、组件 props、主题选项或 CSS 令牌时，同步更新测试、使用文档和 AI 文档来源页面。
- mdui 改编内容应标注来源；不得删除 `THIRD_PARTY_NOTICES.md` 或 `licenses/mdui-MIT.txt` 中的许可信息。

## 检查命令

开发过程中按改动范围运行检查，交付前运行所有相关命令：

```text
pnpm lint
pnpm test:run
pnpm build:check
pnpm docs:llms
pnpm docs:check
pnpm docs:build
pnpm validate:agent-docs
```

本地查看组件 demo 使用 `pnpm dev`，查看 VitePress 文档使用 `pnpm docs:dev`，以监视模式运行测试使用 `pnpm test`。完整命令说明以 `docs/project/GETTING-STARTED.md` 为准。

## 生成文件

- 根目录 `llms.txt` 和 `llms-full.txt` 由带 AI 文档标记的 Markdown 页面生成，禁止直接编辑。
- 修改 AI 文档时先编辑对应 Markdown 来源，再运行 `pnpm docs:llms`，并用 `pnpm docs:check` 检查生成结果。
- 不提交 `dist/`、VitePress 缓存或测试覆盖率等本地产物。

## 文档维护映射

| 变更类型 | 必须检查的文档 |
| --- | --- |
| 产品目标、受众或非目标变化 | `docs/project/VISION.md` |
| 模块边界、数据流、依赖或运行环境变化 | `docs/project/ARCHITECTURE.md`，必要时新增 ADR |
| 公共概念、状态、命名或兼容性约束变化 | `docs/project/ABSTRACTIONS.md`，必要时新增 ADR |
| 环境要求、命令、目录或常见操作变化 | `docs/project/GETTING-STARTED.md` |
| 新增或修改组件及公共 API | 对应使用文档、测试和 AI 文档来源页面 |
| 新的长期架构选择及其取舍 | `docs/project/adr/`，并同步当前状态文档 |

## ADR 规则

- 仅为会长期影响多个模块或公共接口的技术选择创建 ADR。
- 使用 `F:\private\dotfile-win\dot-agent\skills\init-agent-docs\scripts\create_adr.py` 创建 ADR，不手工分配编号。
- 已生效 ADR 不覆写历史；改变决策时新增 ADR 并记录替代关系。
