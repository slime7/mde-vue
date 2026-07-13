# 开发入门

## 前置环境

- Node.js 24 LTS
- 通过 Corepack 启用的 pnpm
- Git，以及访问私有 GitHub 仓库的 SSH 凭据
- 支持现代 Web 平台特性的最新浏览器

项目没有必填环境变量，也不需要数据库或外部运行时服务。

## 安装依赖

```powershell
corepack enable
pnpm install
```

仓库提交 `pnpm-lock.yaml`。不要使用 npm 或 yarn 重新生成锁文件。

## 最短运行步骤

启动组件 demo：

```powershell
pnpm dev
```

启动 VitePress 文档：

```powershell
pnpm docs:dev
```

终端输出会给出本地访问地址。demo 用于查看组件和主题状态；VitePress 用于阅读使用文档和交互示例。

## 检查命令

| 命令 | 用途 |
| --- | --- |
| `pnpm lint` | 运行 JavaScript、Vue 和 CSS 静态检查 |
| `pnpm test` | 以监视模式运行 Vitest 组件与主题测试 |
| `pnpm test:run` | 单次运行全部 Vitest 测试 |
| `pnpm build:check` | 从包公开出口执行 Vue/Vite 源码编译检查 |
| `pnpm docs:llms` | 从带标记的 Markdown 生成 AI 文档 |
| `pnpm docs:check` | 检查 `llms.txt` 和 `llms-full.txt` 是否与 Markdown 来源一致 |
| `pnpm docs:build` | 构建 VitePress 文档及交互示例 |
| `pnpm validate:agent-docs` | 检查项目级 Agent 文档结构、链接和 ADR |

改动公共接口或构建配置后，应运行全部检查。

## 目录结构

| 路径 | 内容 |
| --- | --- |
| `src/` | 组件、主题、公共入口和基础样式 |
| `docs/site/` | VitePress 使用文档、AI 使用指南和交互 demo |
| `docs/project/` | 产品愿景、架构、公共抽象、开发入门和 ADR |
| `tests/` | 主题及跨入口的测试辅助内容 |
| `scripts/` | AI 文档生成与项目验证脚本 |
| `llms.txt`、`llms-full.txt` | 从 Markdown 生成的 AI 文档产物 |
| `licenses/` | 第三方许可原文 |

实际源码边界和数据流见 [架构说明](ARCHITECTURE.md)。

## 常见任务

### 增加或修改组件

1. 在 `src/` 中维护组件 SFC、样式和单组件入口。
2. 同步完整包入口，保持 PascalCase 导出与 `mat-*` 模板标签对应。
3. 添加或更新 props、原生属性、事件、组合上下文、组件 `color` 和主题响应测试。
4. 在 demo 中覆盖主要变体、状态和主题组合。
5. 更新对应 Markdown API 页面，并按下方的组件文档结构检查内容。
6. 重新生成 AI 文档并运行相关检查。

### 编写组件文档

每个公共组件在 `docs/site/components/` 中对应一个纳入 AI 文档的 Markdown 页面。页面必须先说明使用方法，再给出默认样式示例和 API。全局注册与按需导入都必须使用包 `exports` 中真实存在的入口，并分别展示 `mat-*` 标签与局部导入组件名的写法。

API 章节按组件实际能力选择以下内容，不创建空章节：

| 内容 | 记录要求 |
| --- | --- |
| 属性 | 名称、类型、默认值、用途和有效值 |
| 方法 | 仅记录明确公开的方法，并说明参数、返回值和错误 |
| 事件 | 事件名、载荷、触发条件，以及是自定义事件还是原生事件透传 |
| slots | slot 名称、用途和内容约束 |
| 状态 | 默认、交互、禁用、加载或校验等用户可观察状态 |
| CSS 定制入口 | 公开 CSS 自定义属性、默认回退值和影响范围 |

新组件至少提供默认样式示例。只有用户需求明确涉及且公共 API 已支持时，才增加变体、状态或组合示例。文档不得把内部类名、未公开的元素引用或计划中的能力写成可用 API。

### 修改主题

1. 先确认变更属于运行时 `--mat-*` 令牌还是 Tailwind 名称映射。
2. 保持原生 CSS 可独立工作，并同步两层令牌测试。
3. 覆盖 light、dark、system、四种 Material 2025 配色变体、对比度边界和监听清理。
4. 若改变长期主题边界或令牌权威关系，新增 ADR。

### 更新 AI 文档

1. 编辑 `docs/site/` 中带 AI 文档 frontmatter 的 Markdown 来源页面。
2. 运行 `pnpm docs:llms` 更新根目录 `llms.txt` 和 `llms-full.txt`。
3. 运行 `pnpm docs:check`，确认生成文件没有过期。
4. 不直接编辑生成文件。

## 在其他项目中验证

使用方从私有 Git 固定提交安装，并至少导入：

```js
import 'mdu-ui/styles.css';
```

使用 Tailwind CSS v4 时再导入 `mdu-ui/tailwind.css`。构建检查应证明 `.vue` 和 CSS 能由普通 Vue/Vite 项目直接处理，不依赖本仓库的路径别名。

## 常见问题

### pnpm 版本不一致

优先使用仓库 `package.json` 的 `packageManager` 字段和 Corepack，不要删除锁文件后重新安装。

### 组件没有主题颜色

确认应用已经导入 `mdu-ui/styles.css`，并安装 `createMatUi()` 插件。若指定了自定义 `target`，确认该元素是组件样式令牌可继承到的祖先。

### `system` 模式测试不稳定

测试中应显式模拟 `matchMedia` 及其变更监听，并在用例结束时调用主题控制器的清理方法。

### AI 文档检查失败

不要直接修改生成文本。重新检查 Markdown 的 frontmatter、排序和相对链接，然后运行生成命令，再执行 `pnpm docs:check`。
