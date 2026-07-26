---
title: LLMs.txt 使用说明
description: 了解如何把 mdu-ui 的 llms.txt、llms-full.txt 或单个 Markdown 页面提供给 AI。
llms: false
---

# LLMs.txt

`mdu-ui` 提供 `llms.txt` 和 `llms-full.txt`，用于向 AI 提供与当前实现同步的组件、主题和使用限制。两份文件都由使用文档生成，不应手工编辑。

## 文件入口

- [`llms.txt`](/llms.txt)
- [`llms-full.txt`](/llms-full.txt)

`llms.txt` 是精简索引，列出可供 AI 继续读取的 Markdown 来源，适合能够访问当前仓库文件的 AI，或者用于先提供项目概览。

`llms-full.txt` 合并了全部 AI 使用文档，适合上传文件、直接粘贴，或者 AI 无法继续读取仓库文件的情况。

## 如何提供给 AI

根据 AI 是否能够读取仓库文件或上传附件，可以选择以下方式：

1. 上传 `llms-full.txt`，并说明“请以附件中的 mdu-ui 文档为主要依据”。
2. 将 `llms-full.txt` 的内容直接粘贴到对话中，再提出具体问题。
3. AI 能访问当前仓库时，让它先读取 `llms.txt`，再按索引读取与问题相关的 Markdown 页面。
4. 只讨论一个组件或主题时，直接提供对应的 Markdown 页面，减少无关上下文。

例如：

```text
请阅读 llms-full.txt，并以其中记录的公共 API 和支持范围为准，
为 Vue 3 客户端应用给出 mat-btn 的 JavaScript 使用示例。
```

## 按页面提供上下文

`llms.txt` 中的链接以 VitePress 文档根目录为基准，指向可直接访问的 Markdown 页面。常用页面包括：

- 安装：`docs/site/guide/installation.md`
- 主题：`docs/site/guide/theme.md`
- 组件配色：`docs/site/guide/component-color.md`
- Tailwind CSS：`docs/site/guide/tailwind.md`
- Button：`docs/site/components/button.md`
- Button group：`docs/site/components/button-group.md`
- Split button：`docs/site/components/split-button.md`
- FAB：`docs/site/components/fab.md`
- Hover：`docs/site/components/hover.md`
- Text field 与 Textarea：`docs/site/components/text-field.md`
- Menu 与 Menu item：`docs/site/components/menu.md`
- Toolbar：`docs/site/components/toolbar.md`
- Tooltip：`docs/site/components/tooltip.md`
- Snackbar：`docs/site/components/snackbar.md`
- Intersection：`docs/site/directives/intersection.md`
- Spacer：`docs/site/components/spacer.md`
- 支持范围：`docs/site/guide/limitations.md`

只提供单个页面时，可以使用以下提示：

```text
请以提供的 mdu-ui Markdown 页面为主要依据回答问题。
如果需求超出页面记录的公共 API，请明确指出，不要推测内部实现。
```
