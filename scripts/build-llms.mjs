import {
  access,
  cp,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const docsDirectory = path.join(projectRoot, 'docs', 'site');
const examplesDirectory = path.join(docsDirectory, 'examples');
const llmsPath = path.join(projectRoot, 'llms.txt');
const llmsFullPath = path.join(projectRoot, 'llms-full.txt');
const llmsArtifacts = new Map([
  ['/llms.txt', llmsPath],
  ['/llms-full.txt', llmsFullPath],
]);

/**
 * @typedef {object} DocumentEntry
 * @property {string} absolutePath 文件绝对路径。
 * @property {string} relativePath 相对 VitePress 文档根目录的 POSIX 路径。
 * @property {string} title 文档标题。
 * @property {string} description 文档简介。
 * @property {number} order 排序值。
 * @property {string} content 已移除 frontmatter 的 Markdown 内容。
 */

/**
 * 递归读取目录中的 Markdown 文件。
 *
 * @param {string} directory 要扫描的目录。
 * @returns {Promise<string[]>} Markdown 文件绝对路径。
 */
async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === '.vitepress' || entry.name === 'adr') {
        return [];
      }

      return findMarkdownFiles(absolutePath);
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      return [absolutePath];
    }

    return [];
  }));

  return nestedFiles.flat();
}

/**
 * 解析文档 frontmatter 中供 AI 文档使用的字段。
 *
 * @param {string} source Markdown 原文。
 * @param {string} absolutePath 文件绝对路径，用于错误信息。
 * @returns {DocumentEntry | null} 纳入 AI 的文档信息，或 null。
 */
function parseDocument(source, absolutePath) {
  const normalizedSource = source.replaceAll('\r\n', '\n');
  const frontmatterMatch = normalizedSource.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!frontmatterMatch) {
    return null;
  }

  const metadata = Object.fromEntries(frontmatterMatch[1]
    .split('\n')
    .map((line) => line.match(/^([a-zA-Z][\w-]*):\s*(.*?)\s*$/))
    .filter(Boolean)
    .map((match) => [match[1], match[2].replace(/^(['"])(.*)\1$/, '$2')]));

  if (metadata.llms !== 'true') {
    return null;
  }

  const order = Number(metadata.order);

  if (!Number.isFinite(order)) {
    throw new Error(`${path.relative(projectRoot, absolutePath)} 缺少有效的 frontmatter order。`);
  }

  if (!metadata.description) {
    throw new Error(`${path.relative(projectRoot, absolutePath)} 缺少 frontmatter description。`);
  }

  const content = normalizedSource.slice(frontmatterMatch[0].length).trim();
  const headingMatch = content.match(/^#\s+(.+)$/m);
  const title = metadata.title || headingMatch?.[1];

  if (!title) {
    throw new Error(`${path.relative(projectRoot, absolutePath)} 缺少标题。`);
  }

  return {
    absolutePath,
    relativePath: path.relative(docsDirectory, absolutePath).split(path.sep).join('/'),
    title,
    description: metadata.description,
    order,
    content,
  };
}

/**
 * 将 VitePress 的代码片段包含指令展开为 Markdown 代码块，支持 VS Code region。
 *
 * @param {string} content Markdown 正文。
 * @param {string} documentPath Markdown 文件绝对路径。
 * @returns {Promise<string>} 已展开代码片段的正文。
 * @throws {Error} 代码片段位于文档目录之外或无法读取时抛出。
 */
async function expandCodeSnippets(content, documentPath) {
  const matches = [...content.matchAll(
    /^<<<\s+([^\s{#[\]]+)(?:#([^\s{#[\]]+))?(?:\s+\[[^\]]+\])?\s*$/gm,
  )];
  const replacements = await Promise.all(matches.map(async (match) => {
    const sourcePath = match[1].startsWith('@/')
      ? path.resolve(docsDirectory, match[1].slice(2))
      : path.resolve(path.dirname(documentPath), match[1]);
    const relativeSourcePath = path.relative(docsDirectory, sourcePath);

    if (relativeSourcePath.startsWith('..') || path.isAbsolute(relativeSourcePath)) {
      throw new Error(`${match[1]} 不在 VitePress 文档目录中。`);
    }

    const fullSource = await readFile(sourcePath, 'utf8');
    const region = match[2];
    const source = region
      ? fullSource.match(
        new RegExp(`<!-- #region ${region} -->\\r?\\n([\\s\\S]*?)\\r?\\n<!-- #endregion ${region} -->`),
      )?.[1]
      : fullSource;

    if (source === undefined) {
      throw new Error(`${match[1]} 缺少名为 ${region} 的代码 region。`);
    }

    const language = path.extname(sourcePath).slice(1) || 'text';

    return {
      end: match.index + match[0].length,
      start: match.index,
      value: `\`\`\`${language}\n${source.trimEnd()}\n\`\`\``,
    };
  }));

  return replacements
    .sort((left, right) => right.start - left.start)
    .reduce((result, replacement) => (
      result.slice(0, replacement.start)
      + replacement.value
      + result.slice(replacement.end)
    ), content);
}

/**
 * 读取并排序所有纳入 AI 文档的 Markdown 页面。
 *
 * @returns {Promise<DocumentEntry[]>} 已排序的页面。
 */
async function collectDocuments() {
  const markdownFiles = await findMarkdownFiles(docsDirectory);
  const documents = await Promise.all(markdownFiles.map(async (absolutePath) => {
    const source = await readFile(absolutePath, 'utf8');
    const document = parseDocument(source, absolutePath);

    if (!document) {
      return null;
    }

    return {
      ...document,
      content: await expandCodeSnippets(document.content, absolutePath),
    };
  }));

  return documents
    .filter(Boolean)
    .sort((left, right) => left.order - right.order
      || left.relativePath.localeCompare(right.relativePath, 'zh-CN'));
}

/**
 * 根据 Markdown 页面生成两个 AI 文档文件的内容。
 *
 * @param {DocumentEntry[]} documents 已排序的页面。
 * @returns {{ llms: string, llmsFull: string }} 两个生成文件的内容。
 */
function renderDocuments(documents) {
  const indexItems = documents.map((document) => `- [${document.title}](${document.relativePath}): ${document.description}`);
  const fullSections = documents.map((document) => document.content);

  return {
    llms: [
      '# mdu-ui',
      '',
      '> 面向最新浏览器的私有 Vue 3 组件库。',
      '',
      '## 文档',
      '',
      ...indexItems,
      '',
    ].join('\n'),
    llmsFull: [
      '# mdu-ui 完整文档',
      '',
      '> 本文件由 docs/site 中标记 llms: true 的 Markdown 页面生成，请勿手动编辑。',
      '',
      ...fullSections.flatMap((content) => [content, '']),
    ].join('\n'),
  };
}

/**
 * 比较生成结果与磁盘文件是否一致。
 *
 * @param {string} filePath 要检查的文件。
 * @param {string} expected 期望内容。
 * @returns {Promise<boolean>} 文件存在且内容一致时返回 true。
 */
async function isCurrent(filePath, expected) {
  try {
    return await readFile(filePath, 'utf8') === expected;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}

/**
 * 生成或检查 llms.txt 与 llms-full.txt。
 *
 * @param {{ check?: boolean }} [options] 生成选项。
 * @returns {Promise<void>}
 */
export async function buildLlms({ check = false } = {}) {
  const documents = await collectDocuments();
  const rendered = renderDocuments(documents);

  if (check) {
    const checks = await Promise.all([
      isCurrent(llmsPath, rendered.llms),
      isCurrent(llmsFullPath, rendered.llmsFull),
    ]);

    if (checks.includes(false)) {
      throw new Error('AI 文档不是最新状态，请运行 pnpm docs:llms。');
    }

    return;
  }

  await Promise.all([
    writeFile(llmsPath, rendered.llms, 'utf8'),
    writeFile(llmsFullPath, rendered.llmsFull, 'utf8'),
  ]);
}

/**
 * 将 AI 文档及其 Markdown 来源复制到 VitePress 构建目录。
 *
 * @param {string} outDirectory VitePress 构建输出目录。
 * @returns {Promise<void>}
 */
export async function copyLlmsArtifacts(outDirectory) {
  await Promise.all([access(llmsPath), access(llmsFullPath)]);

  const documents = await collectDocuments();

  await Promise.all([
    cp(llmsPath, path.join(outDirectory, 'llms.txt')),
    cp(llmsFullPath, path.join(outDirectory, 'llms-full.txt')),
    cp(
      examplesDirectory,
      path.join(outDirectory, 'docs', 'site', 'examples'),
      { recursive: true },
    ),
    ...documents.map(async (document) => {
      const destination = path.join(outDirectory, document.relativePath);

      await mkdir(path.dirname(destination), { recursive: true });
      await cp(document.absolutePath, destination);
    }),
  ]);
}

/**
 * 创建在 Vite 开发服务器中提供 AI 文档生成产物的插件。
 *
 * @returns {import('vite').Plugin} Vite 插件。
 */
export function createLlmsArtifactsPlugin() {
  return {
    name: 'mdu-ui:llms-artifacts',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestUrl = new URL(request.url || '/', 'http://localhost');
        const artifactPath = llmsArtifacts.get(requestUrl.pathname);

        if (!artifactPath || !['GET', 'HEAD'].includes(request.method)) {
          next();

          return;
        }

        try {
          const content = await readFile(artifactPath);

          response.writeHead(200, {
            'Cache-Control': 'no-cache',
            'Content-Length': content.byteLength,
            'Content-Type': 'text/plain; charset=utf-8',
          });
          response.end(request.method === 'HEAD' ? undefined : content);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

const isDirectExecution = process.argv[1]
  && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isDirectExecution) {
  buildLlms({ check: process.argv.includes('--check') }).catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
