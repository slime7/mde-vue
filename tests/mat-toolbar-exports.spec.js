import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import {
  createMatUi,
  MatToolbar,
} from 'mdu-ui';

describe('Toolbar 公共导出', () => {
  it('根入口导出 Toolbar', () => {
    expect(MatToolbar).toBeTypeOf('object');
  });

  it('createMatUi 全局注册 mat-toolbar', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({ theme: { target } });
    const app = createApp({});

    app.use(plugin);

    expect(app.component('mat-toolbar')).toBe(MatToolbar);
    plugin.theme.dispose();
  });
});
