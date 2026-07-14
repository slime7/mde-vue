import { existsSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePaths = [
  'docs/site/components/checkbox.md',
  'docs/site/components/radio.md',
  'docs/site/components/switch.md',
];
const pages = pagePaths.map((pagePath) => ({
  pagePath,
  source: readFileSync(resolve(pagePath), 'utf8'),
}));

describe('选择控件文档示例', () => {
  it('代码块与预览引用同一个 Vue 示例文件', () => {
    pages.forEach(({ pagePath, source }) => {
      const snippetPaths = [...source.matchAll(/^<<< @\/(.+\.vue)$/gm)]
        .map((match) => match[1]);

      expect(snippetPaths.length, pagePath).toBeGreaterThan(0);

      snippetPaths.forEach((snippetPath) => {
        const componentName = basename(snippetPath, '.vue');
        const relativeImportPath = `../${snippetPath.replace(/^examples\//, 'examples/')}`;

        expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
        expect(source).toContain(`import ${componentName} from '${relativeImportPath}';`);
        expect(source).toContain(`<${componentName} />`);
      });
    });
  });

  it('Radio 与 Radio Group 使用同一个文档页面', () => {
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const radioPage = readFileSync(resolve('docs/site/components/radio.md'), 'utf8');

    expect(existsSync(resolve('docs/site/components/radio-group.md'))).toBe(false);
    expect(config).not.toContain('/components/radio-group');
    expect(radioPage).toContain('## MatRadio API');
    expect(radioPage).toContain('## MatRadioGroup API');
  });

  it('AI 完整文档展开 Vue 示例源码', () => {
    const llmsFull = readFileSync(resolve('llms-full.txt'), 'utf8');
    const switchExample = readFileSync(
      resolve('docs/site/examples/selection/SwitchIconsExample.vue'),
      'utf8',
    ).trim();

    expect(llmsFull).not.toContain('<<< @/examples/selection/');
    expect(llmsFull).toContain(`\`\`\`vue\n${switchExample}\n\`\`\``);
  });
});
