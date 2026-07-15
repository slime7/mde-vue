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

- 先写测试，再改代码。新增能力或修复缺陷时，先添加或更新能表达预期行为的测试，并确认测试会因目标能力尚未实现而失败；随后修改实现直到测试通过。仅调整无法自动验证的说明文字时，可以不制造失败测试，但仍需运行相关文档检查。
- 仅使用 JavaScript，不向源码引入 TypeScript。
- Vue 组件使用 Vue 3 Composition API 和 `<script setup>`。
- 公共 JavaScript API 使用 JSDoc 说明参数、返回值和可能抛出的错误；内部代码只为不直观的约束添加注释。
- 组件标签统一使用 `mat-*` 前缀，组件目录和导出名称保持一一对应。
- 组件基于 Vue 实现，不增加 Web Components、React 或其他框架适配层。
- 样式使用原生 CSS；共享设计值必须通过公开的 `--mat-ref-*` 和 `--mat-sys-*` 令牌表达。组件可以使用 `--mat-<component>-*` 等内部变量组织样式，但这些变量不是公共定制入口。
- 保持源码直接分发：公共入口必须能由普通 Vue/Vite 使用方从包 `exports` 解析，不添加 npm 发布或 `prepare` 流程。
- 只支持最新浏览器和客户端渲染；不要加入旧浏览器兼容层、SSR 分支、本地化或 IDE 插件。
- 修改公共导出、组件 props、主题选项或公共 CSS 令牌时，同步更新测试、使用文档和 AI 文档来源页面。
- mdui 改编内容应标注来源；不得删除 `THIRD_PARTY_NOTICES.md` 或 `licenses/mdui-MIT.txt` 中的许可信息。

## 组件文档约束

- 每个公共组件必须在 `docs/site/components/` 中有对应的中文使用文档，并纳入 AI 文档来源。
- 组件文档必须包含“组件简介”“示例”“API”“事件”和“Slots”；介绍需同时写明 `mat-*` 模板标签和 PascalCase 组件导出名，方便使用者识别按需导入名称。
- 全局注册与按需导入的实际写法统一在安装文档中维护，不在每个组件页面重复。
- 示例必须包含代码和实际渲染预览；代码块与预览必须引用同一个 `docs/site/examples/` Vue 示例文件，不得分别维护两份实现。在保持示例清晰、有效的前提下，尽可能覆盖组件的公共属性、重要状态、事件和 Slots，不为尚未实现的能力编写示例。
- 除非功能本身需要组合，每个 prop 或 Slot 使用独立的示例文件和预览；同一 prop 的多个合法值可以集中展示。只保留必要依赖，例如 `icon + label`、`toggle + selected`、`error + errorText`、`v-model + value`、菜单的 `open + anchor` 以及拆分按钮的两侧 Slot。
- 示例代码使用 VitePress 原生 `::: details 查看示例代码` 容器，默认收起；预览放在容器外，保留 VitePress 原生高亮和复制按钮，不新增自定义代码查看器、标签页或运行时 API。示例文件按 `{Component}{Feature}Example.vue` 命名。
- API 需按实现记录属性和方法；属性需说明名称、类型、默认值和用途，方法需说明参数、返回值和可能抛出的错误。没有公共方法时不创建方法小节。
- “事件”需说明事件名、载荷和触发条件；“Slots”需说明名称和内容约束。组件没有自定义事件或 Slots 时，也必须在对应章节明确说明。
- 状态等其他章节按公共能力添加并说明用户可观察的行为；不得把内部 class 或 CSS 自定义属性写成公共接口。
- 新增或修改组件文档后，同步检查组件实现、测试、demo、使用文档和生成的 `llms.txt`、`llms-full.txt` 是否一致。

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
