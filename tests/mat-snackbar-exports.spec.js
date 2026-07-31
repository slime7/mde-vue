import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import MatSnackbar, { MatSnackbar as NamedMatSnackbar } from 'mdu-ui/components/mat-snackbar';
import { snackbar, toast } from 'mdu-ui/functions';
import {
  createMatUi,
  MatSnackbar as RootMatSnackbar,
} from 'mdu-ui';

describe('Snackbar 公共导出', () => {
  it('根入口、具名子入口和默认子入口导出同一个组件', () => {
    expect(RootMatSnackbar).toBe(NamedMatSnackbar);
    expect(MatSnackbar).toBe(NamedMatSnackbar);
  });

  it('createMatUi 全局注册 mat-snackbar', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({ theme: { target } });
    const app = createApp({});

    app.use(plugin);

    expect(app.component('mat-snackbar')).toBe(RootMatSnackbar);
    plugin.theme.dispose();
  });

  it('只从 functions 入口导出 snackbar 和 toast', async () => {
    const [rootExports, componentExports] = await Promise.all([
      import('mdu-ui'),
      import('mdu-ui/components/mat-snackbar'),
    ]);

    expect(snackbar).toBeTypeOf('function');
    expect(toast).toBe(snackbar);
    expect(rootExports.snackbar).toBeUndefined();
    expect(rootExports.toast).toBeUndefined();
    expect(componentExports.snackbar).toBeUndefined();
    expect(componentExports.toast).toBeUndefined();
  });
});
