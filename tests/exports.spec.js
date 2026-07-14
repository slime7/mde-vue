import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
/* eslint-disable import-x/no-named-as-default -- 验证子入口默认导出和具名导出相同。 */
import MatCard, { MatCard as NamedMatCard } from 'mdu-ui/components/mat-card';
import MatBtn, { MatBtn as NamedMatBtn } from 'mdu-ui/components/mat-btn';
import MatBtnGroup, { MatBtnGroup as NamedMatBtnGroup } from 'mdu-ui/components/mat-btn-group';
import MatIconBtn, { MatIconBtn as NamedMatIconBtn } from 'mdu-ui/components/mat-icon-btn';
import MatSplitBtn, { MatSplitBtn as NamedMatSplitBtn } from 'mdu-ui/components/mat-split-btn';
import MatList, { MatList as NamedMatList } from 'mdu-ui/components/mat-list';
import MatListItem, { MatListItem as NamedMatListItem } from 'mdu-ui/components/mat-list-item';
import MatDivider, { MatDivider as NamedMatDivider } from 'mdu-ui/components/mat-divider';
import MatCheckbox, { MatCheckbox as NamedMatCheckbox } from 'mdu-ui/components/mat-checkbox';
import MatRadio, { MatRadio as NamedMatRadio } from 'mdu-ui/components/mat-radio';
import MatRadioGroup, { MatRadioGroup as NamedMatRadioGroup } from 'mdu-ui/components/mat-radio-group';
import MatSwitch, { MatSwitch as NamedMatSwitch } from 'mdu-ui/components/mat-switch';
/* eslint-enable import-x/no-named-as-default */
import {
  createMatUi,
  MatBtn as RootMatBtn,
  MatBtnGroup as RootMatBtnGroup,
  MatCard as RootMatCard,
  MatCheckbox as RootMatCheckbox,
  MatDivider as RootMatDivider,
  MatIconBtn as RootMatIconBtn,
  MatList as RootMatList,
  MatListItem as RootMatListItem,
  MatRadio as RootMatRadio,
  MatRadioGroup as RootMatRadioGroup,
  MatSplitBtn as RootMatSplitBtn,
  MatSwitch as RootMatSwitch,
} from '../src';

describe('公共组件导出', () => {
  it.each([
    ['MatCard', RootMatCard, NamedMatCard, MatCard],
    ['MatBtn', RootMatBtn, NamedMatBtn, MatBtn],
    ['MatBtnGroup', RootMatBtnGroup, NamedMatBtnGroup, MatBtnGroup],
    ['MatIconBtn', RootMatIconBtn, NamedMatIconBtn, MatIconBtn],
    ['MatSplitBtn', RootMatSplitBtn, NamedMatSplitBtn, MatSplitBtn],
    ['MatList', RootMatList, NamedMatList, MatList],
    ['MatListItem', RootMatListItem, NamedMatListItem, MatListItem],
    ['MatDivider', RootMatDivider, NamedMatDivider, MatDivider],
    ['MatCheckbox', RootMatCheckbox, NamedMatCheckbox, MatCheckbox],
    ['MatRadio', RootMatRadio, NamedMatRadio, MatRadio],
    ['MatRadioGroup', RootMatRadioGroup, NamedMatRadioGroup, MatRadioGroup],
    ['MatSwitch', RootMatSwitch, NamedMatSwitch, MatSwitch],
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

    plugin.theme.dispose();
  });
});
