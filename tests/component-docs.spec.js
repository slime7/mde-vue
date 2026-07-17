import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const componentsDirectory = resolve('docs/site/components');
const componentDocs = readdirSync(componentsDirectory)
  .filter((fileName) => fileName.endsWith('.md'))
  .map((fileName) => ({
    fileName,
    source: readFileSync(resolve(componentsDirectory, fileName), 'utf8'),
  }));

describe('组件文档约束', () => {
  it('所有实际预览都与源码包含指令一一对应', () => {
    componentDocs.forEach(({ fileName, source }) => {
      const snippetMatches = [...source.matchAll(
        /^<<< @\/([^\s]+\.vue)(?:#[^\s]+)?(?:\s+\[[^\]]+\])?$/gm,
      )];
      const snippetPaths = snippetMatches.map((match) => match[1]);
      const codeGroupBlocks = [...source.matchAll(/::: code-group([\s\S]*?):::/g)]
        .map((match) => match[1]);
      const codeGroupSnippetMatches = codeGroupBlocks.flatMap((block) => (
        [...block.matchAll(/^<<< @\/([^\s]+\.vue)/gm)].map((match) => match[1])
      ));
      const codeGroupSnippetPaths = new Set(codeGroupSnippetMatches);
      const previewCount = [...source.matchAll(/<DocsPreview\b/g)].length;

      expect(source, fileName).not.toContain('```vue');
      expect(
        snippetPaths.length - codeGroupSnippetMatches.length + codeGroupBlocks.length,
        fileName,
      ).toBe(previewCount);
      expect(previewCount, fileName).toBeGreaterThan(0);

      snippetMatches.forEach((match) => {
        const snippetPath = match[1];
        expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);

        if (!codeGroupSnippetPaths.has(snippetPath)) {
          const componentName = basename(snippetPath, '.vue');
          const relativeImportPath = `../${snippetPath}`;

          expect(source).toContain(`import ${componentName} from '${relativeImportPath}';`);
          expect(source).toContain(`<${componentName} />`);
        }
      });
    });
  });

  it('项目规则明确要求先写测试再改代码', () => {
    [
      'AGENTS.md',
      'docs/project/ABSTRACTIONS.md',
      'docs/project/GETTING-STARTED.md',
    ].forEach((filePath) => {
      const source = readFileSync(resolve(filePath), 'utf8');

      expect(source, filePath).toContain('先写测试，再改代码');
    });
  });
});
