import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/toolbar.md';
const exampleNames = [
  'ToolbarVariantExample',
  'ToolbarPlaceholderExample',
  'ToolbarBottomPlaceholderExample',
];

describe('Toolbar 文档', () => {
  it('提供带 AI 标记的中文组件页、侧栏入口、安装入口和 AI 索引', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-toolbar>` 的组件导出名是 `MatToolbar`');
    expect(page).toContain('`placeholder`');
    expect(page).toContain('`bottomPlaceholder`');
    expect(page).toContain('`modelValue`');
    expect(page).toContain('`position`');
    expect(page).toContain('floating-top');
    expect(page).toContain('是否将 Toolbar Teleport 到 `attach`');
    expect(page).toContain('固定到视口');
    expect(page).toContain('| `fab` |');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(config).toContain("{ text: 'Toolbar 工具栏', link: '/components/toolbar' }");
    expect(installation).toContain('MatToolbar,');
    expect(llmsGuide).toContain('Toolbar：`docs/site/components/toolbar.md`');
  });

  it('每个 Toolbar 示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/toolbar/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });

  it('示例默认隐藏 Toolbar，并提供当前示例的独立激活开关', () => {
    exampleNames.forEach((exampleName) => {
      const examplePath = resolve(
        'docs/site/examples/toolbar',
        `${exampleName}.vue`,
      );
      const example = readFileSync(examplePath, 'utf8');

      expect(example, exampleName).toContain('const active = ref(false);');
      expect(example, exampleName).toContain('v-model="active"');
      expect(example, exampleName).toContain('展示 Toolbar');
      expect(example, exampleName).toContain('隐藏 Toolbar');
    });
  });

  it('使用现有 MatBtn 的图标模式作为 fab 示例', () => {
    const example = readFileSync(
      resolve('docs/site/examples/toolbar/ToolbarVariantExample.vue'),
      'utf8',
    );

    expect(example).toContain('<mat-btn');
    expect(example).toContain('icon="add"');
    expect(example).toContain('width="wide"');
    expect(example).not.toContain('toolbar-variant-example__fab');
  });

  it('将 Variant 示例的选项按功能分组', () => {
    const example = readFileSync(
      resolve('docs/site/examples/toolbar/ToolbarVariantExample.vue'),
      'utf8',
    );

    expect(example).toContain('<mat-btn-group');
    expect(example).toContain('variant="connected"');
    expect(example).toContain('selection="single"');
    expect(example).toContain('@select="variant = $event.nextSelected"');
    expect(example).toContain('@select="position = $event.nextSelected"');
    expect(example).toContain("{ label: 'floating-top', value: 'floating-top' }");
    expect(example).toContain('position: relative;');
    expect(example).toContain('<mat-switch v-model="vibrant">');
    expect(example).toContain('<mat-switch v-model="active">');
  });

  it('使用 0 到 40px 的 Slider 调节 bottomPlaceholder 示例', () => {
    const example = readFileSync(
      resolve('docs/site/examples/toolbar/ToolbarBottomPlaceholderExample.vue'),
      'utf8',
    );

    expect(example).toContain('const bottomPlaceholder = ref(0);');
    expect(example).toContain('<mat-slider');
    expect(example).toContain(':min="0"');
    expect(example).toContain(':max="40"');
    expect(example).toContain(':bottom-placeholder="bottomPlaceholder"');
    expect(example).toContain('{{ bottomPlaceholder }}px');
  });

  it('在 bottomPlaceholder 示例中同时演示 docked 与 floating Toolbar', () => {
    const example = readFileSync(
      resolve('docs/site/examples/toolbar/ToolbarBottomPlaceholderExample.vue'),
      'utf8',
    );

    expect(example).toContain('const floatingActive = ref(false);');
    expect(example).toContain('v-model="floatingActive"');
    expect(example).toContain('variant="floating-bottom"');
    expect(example).toContain('position="end"');
  });
});
