import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/directives/intersection.md';
const exampleNames = [
  'IntersectionHandlerExample',
  'IntersectionOptionsExample',
  'IntersectionModifiersExample',
];

describe('Intersection 指令文档', () => {
  it('提供绑定值、修饰符、生命周期和 AI 索引说明', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('`v-intersection`');
    expect(page).toContain('`Intersection`');
    expect(page).toContain('`.once`');
    expect(page).toContain('`.quiet`');
    expect(config).toContain("{ text: 'Intersection 相交观察', link: '/directives/intersection' }");
    expect(installation).toContain("import { Intersection as vIntersection } from 'mdu-ui/directives/intersection';");
    expect(llmsGuide).toContain('Intersection：`docs/site/directives/intersection.md`');
  });

  it('每个 Intersection 示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/intersection/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });

  it('每个示例都提供固定高度的内部滚动观察区域', () => {
    exampleNames.forEach((exampleName) => {
      const example = readFileSync(
        resolve('docs/site/examples/intersection', `${exampleName}.vue`),
        'utf8',
      );

      expect(example).toContain('class="intersection-example__viewport"');
      expect(example).toContain('block-size: 240px;');
      expect(example).toContain('overflow-block: auto;');
    });
  });
});
