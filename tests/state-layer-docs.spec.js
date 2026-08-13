import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/directives/state-layer.md';
const exampleNames = ['StateLayerDefaultExample', 'StateLayerColorExample'];

describe('State layer 指令文档', () => {
  it('提供对象绑定、宿主约束和公共入口说明', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('`v-state-layer`');
    expect(page).toContain('`StateLayerOptions | undefined`');
    expect(page).toContain('`display: contents`');
    expect(config).toContain("{ text: 'State layer 状态层', link: '/directives/state-layer' }");
    expect(installation).toContain('StateLayer as vStateLayer,');
    expect(llmsGuide).toContain('State layer：`docs/site/directives/state-layer.md`');
  });

  it('每个示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/state-layer/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });
});
