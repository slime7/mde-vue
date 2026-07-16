import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
/* eslint-disable import-x/no-named-as-default -- 验证子入口默认导出和具名导出相同。 */
import MatCard, { MatCard as NamedMatCard } from 'mdu-ui/components/mat-card';
import MatBtn, { MatBtn as NamedMatBtn } from 'mdu-ui/components/mat-btn';
import MatBtnGroup, { MatBtnGroup as NamedMatBtnGroup } from 'mdu-ui/components/mat-btn-group';
import MatIcon, { MatIcon as NamedMatIcon } from 'mdu-ui/components/mat-icon';
import MatSplitBtn, { MatSplitBtn as NamedMatSplitBtn } from 'mdu-ui/components/mat-split-btn';
import MatList, { MatList as NamedMatList } from 'mdu-ui/components/mat-list';
import MatListItem, { MatListItem as NamedMatListItem } from 'mdu-ui/components/mat-list-item';
import MatDivider, { MatDivider as NamedMatDivider } from 'mdu-ui/components/mat-divider';
import MatCheckbox, { MatCheckbox as NamedMatCheckbox } from 'mdu-ui/components/mat-checkbox';
import MatRadio, { MatRadio as NamedMatRadio } from 'mdu-ui/components/mat-radio';
import MatRadioGroup, { MatRadioGroup as NamedMatRadioGroup } from 'mdu-ui/components/mat-radio-group';
import MatSwitch, { MatSwitch as NamedMatSwitch } from 'mdu-ui/components/mat-switch';
import MatTextField, { MatTextField as NamedMatTextField } from 'mdu-ui/components/mat-text-field';
import MatTextarea, { MatTextarea as NamedMatTextarea } from 'mdu-ui/components/mat-textarea';
import MatMenu, { MatMenu as NamedMatMenu } from 'mdu-ui/components/mat-menu';
import MatMenuGroup, { MatMenuGroup as NamedMatMenuGroup } from 'mdu-ui/components/mat-menu-group';
import MatMenuItem, { MatMenuItem as NamedMatMenuItem } from 'mdu-ui/components/mat-menu-item';
import MatDialog, { MatDialog as NamedMatDialog } from 'mdu-ui/components/mat-dialog';
import MatSpacer, { MatSpacer as NamedMatSpacer } from 'mdu-ui/components/mat-spacer';
import MatLoader, { MatLoader as NamedMatLoader } from 'mdu-ui/components/mat-loader';
/* eslint-enable import-x/no-named-as-default */
import {
  alert, confirm, dialog, prompt,
} from 'mdu-ui/functions';
import {
  createMatUi,
  MatBtn as RootMatBtn,
  MatBtnGroup as RootMatBtnGroup,
  MatCard as RootMatCard,
  MatCheckbox as RootMatCheckbox,
  MatDialog as RootMatDialog,
  MatDivider as RootMatDivider,
  MatIcon as RootMatIcon,
  MatList as RootMatList,
  MatListItem as RootMatListItem,
  MatLoader as RootMatLoader,
  MatMenu as RootMatMenu,
  MatMenuGroup as RootMatMenuGroup,
  MatMenuItem as RootMatMenuItem,
  MatRadio as RootMatRadio,
  MatRadioGroup as RootMatRadioGroup,
  MatSpacer as RootMatSpacer,
  MatSplitBtn as RootMatSplitBtn,
  MatSwitch as RootMatSwitch,
  MatTextarea as RootMatTextarea,
  MatTextField as RootMatTextField,
} from '../src';

describe('公共组件导出', () => {
  it.each([
    ['MatCard', RootMatCard, NamedMatCard, MatCard],
    ['MatBtn', RootMatBtn, NamedMatBtn, MatBtn],
    ['MatBtnGroup', RootMatBtnGroup, NamedMatBtnGroup, MatBtnGroup],
    ['MatIcon', RootMatIcon, NamedMatIcon, MatIcon],
    ['MatSplitBtn', RootMatSplitBtn, NamedMatSplitBtn, MatSplitBtn],
    ['MatList', RootMatList, NamedMatList, MatList],
    ['MatListItem', RootMatListItem, NamedMatListItem, MatListItem],
    ['MatDivider', RootMatDivider, NamedMatDivider, MatDivider],
    ['MatCheckbox', RootMatCheckbox, NamedMatCheckbox, MatCheckbox],
    ['MatRadio', RootMatRadio, NamedMatRadio, MatRadio],
    ['MatRadioGroup', RootMatRadioGroup, NamedMatRadioGroup, MatRadioGroup],
    ['MatSwitch', RootMatSwitch, NamedMatSwitch, MatSwitch],
    ['MatTextField', RootMatTextField, NamedMatTextField, MatTextField],
    ['MatTextarea', RootMatTextarea, NamedMatTextarea, MatTextarea],
    ['MatMenu', RootMatMenu, NamedMatMenu, MatMenu],
    ['MatMenuGroup', RootMatMenuGroup, NamedMatMenuGroup, MatMenuGroup],
    ['MatMenuItem', RootMatMenuItem, NamedMatMenuItem, MatMenuItem],
    ['MatDialog', RootMatDialog, NamedMatDialog, MatDialog],
    ['MatSpacer', RootMatSpacer, NamedMatSpacer, MatSpacer],
    ['MatLoader', RootMatLoader, NamedMatLoader, MatLoader],
  ])('%s 的根入口、具名子入口和默认子入口指向同一组件', (
    name,
    rootExport,
    namedExport,
    defaultExport,
  ) => {
    expect(rootExport).toBe(namedExport);
    expect(defaultExport).toBe(namedExport);
  });

  it('createMatUi 全局注册选择控件组件族', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({
      theme: { target },
    });
    const app = createApp({});

    app.use(plugin);

    expect(app.component('mat-checkbox')).toBe(RootMatCheckbox);
    expect(app.component('mat-radio')).toBe(RootMatRadio);
    expect(app.component('mat-radio-group')).toBe(RootMatRadioGroup);
    expect(app.component('mat-switch')).toBe(RootMatSwitch);
    expect(app.component('mat-text-field')).toBe(RootMatTextField);
    expect(app.component('mat-textarea')).toBe(RootMatTextarea);
    expect(app.component('mat-menu')).toBe(RootMatMenu);
    expect(app.component('mat-menu-group')).toBe(RootMatMenuGroup);
    expect(app.component('mat-menu-item')).toBe(RootMatMenuItem);
    expect(app.component('mat-dialog')).toBe(RootMatDialog);
    expect(app.component('mat-spacer')).toBe(RootMatSpacer);
    expect(app.component('mat-loader')).toBe(RootMatLoader);
    expect(app.component('mat-icon')).toBe(RootMatIcon);
    expect(app.component('mat-icon-btn')).toBeUndefined();

    plugin.theme.dispose();
  });

  it('只从 functions 入口导出命令式函数', async () => {
    const [rootExports, dialogComponentExports] = await Promise.all([
      import('../src'),
      import('mdu-ui/components/mat-dialog'),
    ]);

    expect(dialog).toBeTypeOf('function');
    expect(alert).toBeTypeOf('function');
    expect(confirm).toBeTypeOf('function');
    expect(prompt).toBeTypeOf('function');
    expect(rootExports.dialog).toBeUndefined();
    expect(dialogComponentExports.dialog).toBeUndefined();
  });

  it('不再提供 MatIconBtn 单组件入口', () => {
    expect(existsSync(new URL('../src/components/mat-icon-btn', import.meta.url))).toBe(false);
  });
});
