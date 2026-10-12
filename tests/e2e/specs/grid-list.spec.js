import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

/**
 * 读取一个网格项目四角的 computed 圆角值。
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} testId
 * @returns {Promise<{ startStart: string, startEnd: string, endStart: string, endEnd: string }>}
 */
function readCorners(page, testId) {
  return page.evaluate((id) => {
    const element = document.querySelector(`[data-testid="${id}"]`);
    const style = getComputedStyle(element);

    return {
      startStart: style.borderStartStartRadius,
      startEnd: style.borderStartEndRadius,
      endStart: style.borderEndStartRadius,
      endEnd: style.borderEndEndRadius,
    };
  }, testId);
}

/**
 * 读取大、小圆角令牌的当前解析值。
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{ large: string, small: string }>}
 */
function readShapeTokens(page) {
  return page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);

    return {
      large: style.getPropertyValue('--mat-sys-shape-corner-large').trim(),
      small: style.getPropertyValue('--mat-sys-shape-corner-extra-small').trim(),
    };
  });
}

test.beforeEach(async ({ page }) => {
  await openScene(page, 'grid-list');
});

test('网格项目只有没有相邻项目的角使用大圆角', async ({ page }) => {
  const { large, small } = await readShapeTokens(page);
  const columns = await page.getByTestId('ragged-grid')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns);

  expect(columns.split(' ')).toHaveLength(2);

  /* 5 项、2 列：首项只有左上外角，第 2 项只有右上外角，第 3 项完全被包围，
     第 4 项的下、右方向都露出空白，末项底部两角外露。 */
  expect(await readCorners(page, 'item-0')).toEqual({
    startStart: large,
    startEnd: small,
    endStart: small,
    endEnd: small,
  });
  expect(await readCorners(page, 'item-1')).toEqual({
    startStart: small,
    startEnd: large,
    endStart: small,
    endEnd: small,
  });
  expect(await readCorners(page, 'item-2')).toEqual({
    startStart: small,
    startEnd: small,
    endStart: small,
    endEnd: small,
  });
  expect(await readCorners(page, 'item-3')).toEqual({
    startStart: small,
    startEnd: small,
    endStart: small,
    endEnd: large,
  });
  expect(await readCorners(page, 'item-4')).toEqual({
    startStart: small,
    startEnd: small,
    endStart: large,
    endEnd: large,
  });
});

test('cols 变化后角落圆角跟随新的相邻关系', async ({ page }) => {
  const { large, small } = await readShapeTokens(page);

  /* 4 项、3 列：第 3 项的右上和右下都外露，末项左下和右下外露。 */
  expect(await page.getByTestId('toggle-grid')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns)
    .then((value) => value.split(' ').length)).toBe(3);
  expect(await readCorners(page, 'toggle-item-2')).toEqual({
    startStart: small,
    startEnd: large,
    endStart: small,
    endEnd: large,
  });
  expect(await readCorners(page, 'toggle-item-3')).toEqual({
    startStart: small,
    startEnd: small,
    endStart: large,
    endEnd: large,
  });

  await page.getByTestId('toggle-cols').click();
  await expect(page.getByTestId('toggle-cols')).toContainText('当前 2');

  /* 切换为 2 列后第 3 项成为中段行首列，只有左下外露；末项只有右下外露。
     圆角变化会播放形状过渡，轮询等待弹簧收敛到最终值。 */
  await expect.poll(async () => ({
    item2: await readCorners(page, 'toggle-item-2'),
    item3: await readCorners(page, 'toggle-item-3'),
  }), { timeout: 2000 }).toEqual({
    item2: {
      startStart: small,
      startEnd: small,
      endStart: large,
      endEnd: small,
    },
    item3: {
      startStart: small,
      startEnd: small,
      endStart: small,
      endEnd: large,
    },
  });
});
