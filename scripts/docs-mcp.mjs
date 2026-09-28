import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { collectDocuments } from './build-llms.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const packageJsonPath = path.join(projectRoot, 'package.json');
const examplesDirectory = path.join(projectRoot, 'docs', 'site', 'examples');
const serverName = 'mde-vue-docs';
const defaultSearchLimit = 10;
const maxSearchLimit = 50;
const snippetWindowBefore = 80;
const snippetWindowAfter = 220;

/**
 * 读取全部纳入 AI 文档的 Markdown 页面。
 *
 * 每次工具调用重新收集，保证结果始终与 `docs/site` 的 Markdown 来源同步，
 * 不依赖可能过期的 `llms.txt` 生成产物。
 *
 * @returns {Promise<Awaited<ReturnType<typeof collectDocuments>>>} 文档页面列表。
 */
async function loadDocuments() {
  return collectDocuments();
}

/**
 * 递归收集全部组件示例文件，并按组件目录归类。
 *
 * @returns {Promise<Array<{ component: string, name: string, path: string }>>} 示例列表。
 */
async function loadExamples() {
  const entries = await readdir(examplesDirectory, {
    recursive: true,
    withFileTypes: true,
  });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.vue'))
    .map((entry) => {
      const relativePath = path
        .relative(examplesDirectory, path.join(entry.parentPath, entry.name))
        .split(path.sep)
        .join('/');

      return {
        component: relativePath.split('/')[0],
        name: entry.name,
        path: relativePath,
      };
    })
    .sort((left, right) => left.component.localeCompare(right.component, 'zh-CN')
      || left.name.localeCompare(right.name, 'zh-CN'));
}

/**
 * 去掉组件参数中的 `mat-` 前缀并统一小写。
 *
 * @param {string} value 原始组件参数。
 * @returns {string} 规范化后的组件名。
 */
function normalizeComponentFilter(value) {
  return value.trim().toLowerCase().replace(/^mat-/, '');
}

/**
 * 从组件文档页的简介中提取开头的 `mat-*` 标签。
 *
 * 组件文档惯例是简介以该页介绍的全部 `mat-*` 标签开头，
 * 例如 "mat-btn 的…"、"mat-text-field 与 mat-textarea 的…"，
 * 据此把标签解析到示例目录（文档页路径即示例目录名）。
 *
 * @param {string} description 文档页简介。
 * @returns {string[]} 简介开头连续出现的标签。
 */
function extractLeadingTags(description) {
  const leadMatch = description.match(
    /^mat-[a-z][a-z0-9-]*(?![\w-])(?:\s*(?:、|和|与|及|或|,|，)\s*mat-[a-z][a-z0-9-]*(?![\w-]))*/,
  );

  return leadMatch ? leadMatch[0].match(/mat-[a-z][a-z0-9-]*/g) ?? [] : [];
}

/**
 * 建立 `mat-*` 标签到示例目录的映射。标签可能被组合组件的页面大量引用，
 * 因此不用出现次数推断，而是采用"页面简介以自身标签开头"的文档惯例，
 * 该惯例让每个标签唯一归属其主文档页面。
 *
 * @param {Awaited<ReturnType<typeof collectDocuments>>} documents 文档页面列表。
 * @returns {Map<string, string>} 标签到示例目录的映射。
 */
function buildComponentTagMap(documents) {
  const resolved = new Map();

  documents.forEach((document) => {
    const segments = document.relativePath.split('/');

    if (segments[0] !== 'components' || segments.length !== 2) {
      return;
    }

    const directory = segments[1].replace(/\.md$/, '');

    extractLeadingTags(document.description).forEach((tag) => {
      resolved.set(tag, directory);
    });
  });

  return resolved;
}

/**
 * 把组件参数解析为示例目录名，支持目录名与 `mat-*` 标签写法。
 *
 * @param {string} rawComponent 用户传入的组件名。
 * @param {Array<{ component: string, name: string, path: string }>} examples 示例列表。
 * @returns {Promise<string | null>} 解析到的目录名，无法解析时返回 null。
 */
async function resolveComponentDirectory(rawComponent, examples) {
  const directories = new Set(examples.map((example) => example.component));
  const filter = normalizeComponentFilter(rawComponent);

  if (directories.has(filter)) {
    return filter;
  }

  const tagMap = buildComponentTagMap(await loadDocuments());
  const resolved = tagMap.get(`mat-${filter}`);

  if (resolved !== undefined && directories.has(resolved)) {
    return resolved;
  }

  const looseMatched = [...directories]
    .filter((directory) => directory.includes(filter) || filter.includes(directory));

  return looseMatched.length === 1 ? looseMatched[0] : null;
}

/**
 * 在示例文件名中查找目标示例。
 *
 * @param {Array<{ component: string, name: string, path: string }>} examples 示例列表。
 * @param {string} rawName 示例名，允许省略 `.vue` 后缀。
 * @returns {{ example: object }} 命中的示例。
 * @throws {Error} 无法唯一定位示例时抛出，并给出可用的近似候选。
 */
function findExample(examples, rawName) {
  const baseName = path
    .posix.basename(String(rawName).trim().replace(/\\/g, '/'))
    .replace(/\.vue$/i, '');
  const lowered = baseName.toLowerCase();
  const stripped = (name) => name.slice(0, -4).toLowerCase();

  const exact = examples.filter((example) => stripped(example.name) === lowered);
  if (exact.length === 1) {
    return { example: exact[0] };
  }

  const prefixed = examples.filter((example) => stripped(example.name).startsWith(lowered));
  if (prefixed.length === 1) {
    return { example: prefixed[0] };
  }

  const related = examples
    .filter((example) => stripped(example.name).includes(lowered)
      || lowered.includes(stripped(example.name)))
    .slice(0, 10)
    .map((example) => example.path);
  const hint = related.length > 0
    ? `相近的示例：\n${related.map((candidate) => `- ${candidate}`).join('\n')}`
    : `可用的示例目录：\n${[...new Set(examples.map((example) => example.component))].sort().join('、')}`;

  throw new Error(`找不到示例 ${rawName}。${hint}`);
}

/**
 * 在单个文档中定位首个关键词位置并构造摘要片段。
 *
 * @param {string} content 文档正文。
 * @param {string[]} tokens 小写关键词列表。
 * @returns {string} 压缩空白后的上下文片段。
 */
function buildSnippet(content, tokens) {
  const lowered = content.toLowerCase();
  let index = -1;

  tokens.forEach((token) => {
    const position = lowered.indexOf(token);

    if (position !== -1 && (index === -1 || position < index)) {
      index = position;
    }
  });

  const start = Math.max(0, index - snippetWindowBefore);
  const end = Math.min(content.length, index + snippetWindowAfter);
  const raw = content.slice(start, end).replace(/\s+/g, ' ').trim();

  return `${start > 0 ? '…' : ''}${raw}${end < content.length ? '…' : ''}`;
}

/**
 * 按关键词搜索文档，多个关键词要求同时命中。
 *
 * @param {Awaited<ReturnType<typeof collectDocuments>>} documents 文档页面列表。
 * @param {string} query 空格分隔的关键词。
 * @param {number} limit 返回条数上限。
 * @returns {Array<{ path: string, title: string, description: string, snippet: string }>} 命中结果。
 */
function searchDocuments(documents, query, limit) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return [];
  }

  const matches = documents
    .map((document) => {
      const title = document.title.toLowerCase();
      const description = document.description.toLowerCase();
      const content = document.content.toLowerCase();
      const inTitle = tokens.every((token) => title.includes(token));
      const inDescription = tokens.every((token) => description.includes(token));
      const inContent = tokens.every((token) => content.includes(token));

      if (!inTitle && !inDescription && !inContent) {
        return null;
      }

      const score = [inTitle, inDescription, inContent].findIndex(Boolean);

      return {
        score,
        document,
        snippet: buildSnippet(document.content, tokens),
      };
    })
    .filter(Boolean);

  return matches
    .sort((left, right) => left.score - right.score
      || left.document.order - right.document.order
      || left.document.relativePath.localeCompare(right.document.relativePath, 'zh-CN'))
    .slice(0, limit)
    .map(({ document, snippet }) => ({
      path: document.relativePath,
      title: document.title,
      description: document.description,
      snippet,
    }));
}

/**
 * 归一化文档路径参数并定位文档页面。
 *
 * @param {Awaited<ReturnType<typeof collectDocuments>>} documents 文档页面列表。
 * @param {string} rawPath 文档页相对路径。
 * @returns {object} 命中的文档页面。
 * @throws {Error} 无法定位页面时抛出，并提示先调用 list_docs。
 */
function findDocument(documents, rawPath) {
  const normalized = String(rawPath)
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/^docs\/site\//, '');

  const exact = documents.find((document) => document.relativePath === normalized);
  if (exact) {
    return exact;
  }

  const baseName = normalized.split('/').pop().toLowerCase();
  const sameName = documents.filter(
    (document) => document.relativePath.split('/').pop().toLowerCase() === baseName,
  );

  if (sameName.length === 1) {
    return sameName[0];
  }

  throw new Error(`找不到文档页面 ${rawPath}。请先调用 list_docs 获取可用路径。`);
}

/**
 * 各工具的具体实现，参数校验失败或目标不存在时抛出错误。
 */
const toolHandlers = {
  async list_docs() {
    const documents = await loadDocuments();

    return JSON.stringify(documents.map((document) => ({
      description: document.description,
      path: document.relativePath,
      title: document.title,
    })), null, 2);
  },

  async get_doc(args) {
    if (typeof args.path !== 'string' || args.path.trim() === '') {
      throw new Error('get_doc 需要字符串参数 path，取值来自 list_docs 返回的 path。');
    }

    const documents = await loadDocuments();
    const document = findDocument(documents, args.path);

    return document.content;
  },

  async search_docs(args) {
    if (typeof args.query !== 'string' || args.query.trim() === '') {
      throw new Error('search_docs 需要字符串参数 query，多个关键词用空格分隔。');
    }

    const rawLimit = Number(args.limit ?? defaultSearchLimit);
    const limit = Math.min(
      Math.max(Number.isFinite(rawLimit) ? Math.trunc(rawLimit) : defaultSearchLimit, 1),
      maxSearchLimit,
    );
    const documents = await loadDocuments();

    return JSON.stringify(searchDocuments(documents, args.query, limit), null, 2);
  },

  async list_examples(args) {
    const examples = await loadExamples();

    if (typeof args.component !== 'string' || args.component.trim() === '') {
      return JSON.stringify(examples, null, 2);
    }

    const directory = await resolveComponentDirectory(args.component, examples);

    if (directory === null) {
      const components = [...new Set(examples.map((example) => example.component))].sort();

      throw new Error(
        `找不到组件 ${args.component} 的示例。可用的组件目录：${components.join('、')}`,
      );
    }

    return JSON.stringify(
      examples.filter((example) => example.component === directory),
      null,
      2,
    );
  },

  async get_example(args) {
    if (typeof args.name !== 'string' || args.name.trim() === '') {
      throw new Error('get_example 需要字符串参数 name，例如 ButtonLoadingExample。');
    }

    const examples = await loadExamples();
    const { example } = findExample(examples, args.name);
    const source = await readFile(path.join(examplesDirectory, example.path), 'utf8');

    return source;
  },
};

/**
 * 执行单个工具调用并返回序列化为 JSON 文本的结果。
 *
 * @param {string} name 工具名称。
 * @param {Record<string, unknown>} args 工具参数。
 * @returns {Promise<string>} 文本结果。
 */
async function runTool(name, args) {
  const handler = toolHandlers[name];

  if (!handler) {
    throw new Error(`未知工具 ${name}，可用工具：${Object.keys(toolHandlers).join('、')}。`);
  }

  return handler(args);
}

/**
 * 构造成功的工具结果。
 *
 * @param {string} text 文本内容。
 * @returns {{ content: Array<{ type: string, text: string }> }} 工具结果。
 */
function textResult(text) {
  return {
    content: [{
      text,
      type: 'text',
    }],
  };
}

/**
 * 构造标记为错误的工具结果。
 *
 * @param {string} message 错误说明。
 * @returns {{ content: Array<{ type: string, text: string }>, isError: true }} 工具结果。
 */
function errorResult(message) {
  return {
    content: [{
      text: message,
      type: 'text',
    }],
    isError: true,
  };
}

/**
 * 启动 stdio MCP 服务。
 *
 * @returns {Promise<void>}
 */
async function main() {
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  const server = new Server(
    { name: serverName, version: packageJson.version },
    {
      capabilities: { tools: {} },
      instructions: [
        '这是 mde-vue（Vue 3 Material 3 Expressive 组件库）的中文文档查询服务。',
        '先 list_docs 了解可用页面，再 get_doc 读取组件 API 与用法，',
        'list_examples 与 get_example 用于查看真实示例源码。',
      ].join(''),
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'list_docs',
        title: '列出文档页面',
        description: '列出 mde-vue 全部中文使用文档页面（指南、组件、指令），返回每页的路径、标题和简介。',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      },
      {
        name: 'get_doc',
        title: '读取文档页面',
        description: '按 list_docs 返回的路径读取单个文档页面，返回完整 Markdown 正文（示例代码已展开）。',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: '文档页相对路径，例如 components/button.md' },
          },
          required: ['path'],
          additionalProperties: false,
        },
      },
      {
        name: 'search_docs',
        title: '搜索文档',
        description: '在全部文档页的标题、简介和正文中做大小写不敏感的关键词搜索；多个关键词用空格分隔时要求同时命中。',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: '关键词，例如 loading 或 v-model 受控' },
            limit: {
              type: 'integer', minimum: 1, maximum: 50, description: '返回条数上限，默认 10',
            },
          },
          required: ['query'],
          additionalProperties: false,
        },
      },
      {
        name: 'list_examples',
        title: '列出示例文件',
        description: '列出 docs/site/examples 下的 Vue 示例文件；可传入组件名过滤，接受 button、mat-btn、Btn 等写法。',
        inputSchema: {
          type: 'object',
          properties: {
            component: { type: 'string', description: '组件目录名或 mat-* 标签，例如 button 或 mat-btn，省略时返回全部示例' },
          },
          additionalProperties: false,
        },
      },
      {
        name: 'get_example',
        title: '读取示例源码',
        description: '按文件名读取单个示例的完整 Vue 源码，例如 ButtonLoadingExample 或 ButtonLoadingExample.vue。',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: '示例文件名，可省略 .vue 后缀' },
          },
          required: ['name'],
          additionalProperties: false,
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { arguments: args, name } = request.params;

    try {
      return textResult(await runTool(name, args ?? {}));
    } catch (error) {
      return errorResult(error instanceof Error ? error.message : String(error));
    }
  });

  await server.connect(new StdioServerTransport());
  process.stderr.write(`${serverName} MCP 服务已就绪（stdio 传输）。\n`);
}

const isDirectExecution = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution) {
  try {
    await main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
    process.exitCode = 1;
  }
}
