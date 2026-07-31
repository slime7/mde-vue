import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import {
  createMatUi,
  MatSnackbar,
  snackbar,
  toast,
} from 'mdu-ui';

describe('Snackbar 公共导出', () => {
  it('根入口导出组件与命令式函数', () => {
    expect(MatSnackbar).toBeTypeOf('object');
    expect(snackbar).toBeTypeOf('function');
    expect(toast).toBe(snackbar);
  });

  it('createMatUi 全局注册 mat-snackbar', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({ theme: { target } });
    const app = createApp({});

    app.use(plugin);

    expect(app.component('mat-snackbar')).toBe(MatSnackbar);
    plugin.theme.dispose();
  });
});
