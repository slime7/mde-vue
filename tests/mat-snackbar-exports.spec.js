import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
/* eslint-disable import-x/no-named-as-default -- 验证子入口默认导出和具名导出相同。 */
import MatSnackbar, { MatSnackbar as NamedMatSnackbar } from 'mdu-ui/components/mat-snackbar';
/* eslint-enable import-x/no-named-as-default */
import { snackbar, toast } from 'mdu-ui/functions';
import {
  createMatUi,
  MatSnackbar as RootMatSnackbar,
} from '../src';

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
      import('../src'),
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
