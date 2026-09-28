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

        const componentName = basename(snippetPath, '.vue');
        const relativeImportPath = `../${snippetPath}`;

        expect(source).toContain(`import ${componentName} from '${relativeImportPath}';`);
        expect(source).toContain(`<${componentName} />`);
      });
    });
  });

  it('所有 Vue 示例代码按 template、script、style 顺序使用代码组', () => {
    componentDocs.forEach(({ fileName, source }) => {
      expect(source, fileName).not.toMatch(/^<<< @\/[^\s]+\.vue$/m);

      [...source.matchAll(/::: code-group([\s\S]*?):::/g)].forEach((match) => {
        const labels = [...match[1].matchAll(/\[([^\]]+)\]/g)]
          .map((labelMatch) => labelMatch[1]);

        expect(labels, fileName).toEqual(
          [...labels].sort((left, right) => (
            ['template', 'script', 'style'].indexOf(left)
            - ['template', 'script', 'style'].indexOf(right)
          )),
        );
      });

      expect(source, fileName).not.toMatch(/^::: details 查看示例代码\r?\n^::: code-group/m);
      expect(source, fileName).not.toMatch(/\n:::\r?\n:::\r?\n/);
    });
  });

  it('Button 与 Button group 尺寸示例明确表达视觉层级矩阵', () => {
    [
      'docs/site/examples/button/ButtonSizeExample.vue',
      'docs/site/examples/button/ButtonGroupSizeExample.vue',
    ].forEach((filePath) => {
      const source = readFileSync(resolve(filePath), 'utf8');

      ['standard', 'outlined', 'filled', 'filled-tonal'].forEach((variant) => {
        expect(source, filePath).toContain(`variant="${variant}"`);
      });
      ['round', 'square'].forEach((shape) => {
        expect(source, filePath).toContain(`shape="${shape}"`);
      });
      expect(source, filePath).toContain('color="secondary"');
      expect(source, filePath).toContain('color="tertiary"');
      expect(source, filePath).toContain('color="primary"');
      expect(source, filePath).toContain('width="uniform"');
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

  it('需要占满预览区的网格示例声明完整宽度', () => {
    [
      'docs/site/examples/panes/PanesBreakpointExample.vue',
      'docs/site/examples/panes/PanesResizableExample.vue',
      'docs/site/examples/panes/PanesWidthsExample.vue',
      'docs/site/examples/tooltip/TooltipLocationExample.vue',
      'docs/site/examples/menu/MenuContextExample.vue',
    ].forEach((filePath) => {
      const source = readFileSync(resolve(filePath), 'utf8');

      expect(source, filePath).toContain('inline-size: 100%;');
    });
  });
});
