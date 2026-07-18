import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
/* eslint-disable import-x/no-named-as-default -- 验证子入口默认导出和具名导出相同。 */
import MatToolbar, { MatToolbar as NamedMatToolbar } from 'mdu-ui/components/mat-toolbar';
/* eslint-enable import-x/no-named-as-default */
import {
  createMatUi,
  MatToolbar as RootMatToolbar,
} from '../src';

describe('Toolbar 公共导出', () => {
  it('根入口、具名子入口和默认子入口导出同一个组件', () => {
    expect(RootMatToolbar).toBe(NamedMatToolbar);
    expect(MatToolbar).toBe(NamedMatToolbar);
  });

  it('createMatUi 全局注册 mat-toolbar', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({ theme: { target } });
    const app = createApp({});

    app.use(plugin);

    expect(app.component('mat-toolbar')).toBe(RootMatToolbar);
    plugin.theme.dispose();
  });
});
