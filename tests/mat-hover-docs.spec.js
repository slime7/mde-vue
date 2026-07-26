import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/hover.md';
const exampleNames = [
  'HoverDefaultExample',
  'HoverDelayExample',
  'HoverControlledExample',
];

describe('Hover 文档', () => {
  it('提供完整组件章节、侧栏入口和 AI 索引', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-hover>` 的组件导出名是 `MatHover`');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(config).toContain("{ text: 'Hover 悬停状态', link: '/components/hover' }");
    expect(llmsGuide).toContain('Hover：`docs/site/components/hover.md`');
  });

  it('每个 Hover 示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/hover/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });
});
