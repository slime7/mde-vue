import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/search.md';
const exampleNames = [
  'SearchInputExample',
  'SearchStateExample',
  'SearchSlotsExample',
];

describe('Search 文档', () => {
  it('提供带 AI 标记的中文组件页、侧栏、安装入口和 AI 索引', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-search>` 的组件导出名是 `MatSearch`');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(config).toContain("{ text: 'Search 搜索', link: '/components/search' }");
    expect(installation).toContain('MatSearch,');
    expect(llmsGuide).toContain('Search：`docs/site/components/search.md`');
  });

  it('所有示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/search/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });
});
