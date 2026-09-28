# 0036 — 通过 stdio MCP 提供文档与示例查询

- 状态: active
- 日期: 2026-09-28
- 替代: 无

## 背景

llms.txt 与 llms-full.txt 面向能读取仓库文件的 AI；其他项目中的 AI 客户端缺少按页查询组件文档与示例源码的渠道，直接注入约 774KB 的 llms-full.txt 也过于昂贵。

## 决策

在 scripts/docs-mcp.mjs 提供基于 stdio 传输的文档查询 MCP 服务，使用官方 @modelcontextprotocol/sdk 开发依赖实现协议，复用 build-llms.mjs 的文档收集逻辑与 docs/site/examples 示例文件，提供 list_docs、get_doc、search_docs、list_examples、get_example 五个工具。

## 考虑的方案

- 只依赖 llms-full.txt：无需新代码，但一次性注入完整文本，无法按页取用。
- 自行实现 stdio JSON-RPC：零依赖，但需自维护协议握手与规范演进。
- 使用官方 @modelcontextprotocol/sdk：MCP 协议参考实现，服务代码只关注工具逻辑（已选）。
- 托管 HTTP MCP 服务：可远程共享，但与项目无服务端运行时服务的边界冲突。

## 影响

- MCP 服务是开发工具，通过 pnpm docs:mcp 或客户端配置指向脚本运行，不进入包 exports、dist/ 与发布流程。
- 数据始终来自 docs/site 的 Markdown 来源与示例文件，不读取可能过期的生成产物，文档更新后无需重启。
- 使用方项目需能访问本仓库检出目录且本仓库已完成 pnpm install；无法检出仓库的使用方继续使用文档站 llms.txt。
- 新增开发依赖 @modelcontextprotocol/sdk，仅服务 MCP 运行，不影响组件库运行时依赖。
