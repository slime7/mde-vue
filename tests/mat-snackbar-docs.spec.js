import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = 'docs/site/components/snackbar.md';
const exampleNames = [
  'SnackbarModelValueExample',
  'SnackbarTextExample',
  'SnackbarDefaultSlotExample',
  'SnackbarClosableExample',
  'SnackbarCloseLabelExample',
  'SnackbarCloseSlotExample',
  'SnackbarActionTextExample',
  'SnackbarActionSlotExample',
  'SnackbarPositionExample',
  'SnackbarDurationExample',
  'SnackbarFunctionExample',
  'SnackbarQueueExample',
];

describe('Snackbar 文档', () => {
  it('提供带 AI 标记的中文组件页、侧栏入口、安装入口和 AI 索引', () => {
    expect(existsSync(resolve(pagePath))).toBe(true);

    const page = readFileSync(resolve(pagePath), 'utf8');
    const config = readFileSync(resolve('docs/site/.vitepress/config.mjs'), 'utf8');
    const installation = readFileSync(resolve('docs/site/guide/installation.md'), 'utf8');
    const llmsGuide = readFileSync(resolve('docs/site/ai/llms.md'), 'utf8');

    expect(page).toContain('llms: true');
    expect(page).toContain('`<mat-snackbar>` 的组件导出名是 `MatSnackbar`');
    expect(page).toContain('`actionText`');
    expect(page).toContain('`onAction`');
    expect(page).toContain('| `action` | 无 |');
    ['## 组件简介', '## 示例', '## API', '## 事件', '## Slots'].forEach((heading) => {
      expect(page).toContain(heading);
    });
    expect(config).toContain("{ text: 'Snackbar 消息提示', link: '/components/snackbar' }");
    expect(installation).toContain("import { MatSnackbar } from 'mdu-ui/components/mat-snackbar';");
    expect(installation).toContain('snackbar,');
    expect(installation).toContain('toast,');
    expect(llmsGuide).toContain('Snackbar：`docs/site/components/snackbar.md`');
  });

  it('每个 Snackbar 示例都由同一 Vue 文件提供代码和预览', () => {
    const page = readFileSync(resolve(pagePath), 'utf8');

    exampleNames.forEach((exampleName) => {
      const snippetPath = `examples/snackbar/${exampleName}.vue`;

      expect(existsSync(resolve('docs/site', snippetPath)), snippetPath).toBe(true);
      expect(page).toContain(`<<< @/${snippetPath}`);
      expect(page).toContain(`import ${exampleName} from '../${snippetPath}';`);
      expect(page).toContain(`<${exampleName} />`);
    });
  });
});
