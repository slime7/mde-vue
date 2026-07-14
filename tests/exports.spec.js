import { describe, expect, it } from 'vitest';
/* eslint-disable import-x/no-named-as-default -- 验证子入口默认导出和具名导出相同。 */
import MatCard, { MatCard as NamedMatCard } from 'mdu-ui/components/mat-card';
import MatBtn, { MatBtn as NamedMatBtn } from 'mdu-ui/components/mat-btn';
import MatBtnGroup, { MatBtnGroup as NamedMatBtnGroup } from 'mdu-ui/components/mat-btn-group';
import MatIconBtn, { MatIconBtn as NamedMatIconBtn } from 'mdu-ui/components/mat-icon-btn';
import MatSplitBtn, { MatSplitBtn as NamedMatSplitBtn } from 'mdu-ui/components/mat-split-btn';
import MatList, { MatList as NamedMatList } from 'mdu-ui/components/mat-list';
import MatListItem, { MatListItem as NamedMatListItem } from 'mdu-ui/components/mat-list-item';
import MatDivider, { MatDivider as NamedMatDivider } from 'mdu-ui/components/mat-divider';
/* eslint-enable import-x/no-named-as-default */
import {
  MatBtn as RootMatBtn,
  MatBtnGroup as RootMatBtnGroup,
  MatCard as RootMatCard,
  MatDivider as RootMatDivider,
  MatIconBtn as RootMatIconBtn,
  MatList as RootMatList,
  MatListItem as RootMatListItem,
  MatSplitBtn as RootMatSplitBtn,
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
  ])('%s 的根入口、具名子入口和默认子入口指向同一组件', (
    name,
    rootExport,
    namedExport,
    defaultExport,
  ) => {
    expect(rootExport).toBe(namedExport);
    expect(defaultExport).toBe(namedExport);
  });
});
