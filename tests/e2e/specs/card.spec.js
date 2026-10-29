import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

/**
 * 读取卡片当前的 computed 圆角。
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} testId
 * @returns {Promise<string>}
 */
function readRadius(page, testId) {
  return page.getByTestId(testId)
    .evaluate((element) => getComputedStyle(element).borderRadius);
}

/**
 * 读取卡片当前的 computed 阴影。
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} testId
 * @returns {Promise<string>}
 */
function readShadow(page, testId) {
  return page.getByTestId(testId)
    .evaluate((element) => getComputedStyle(element).boxShadow);
}

test.beforeEach(async ({ page }) => {
  await openScene(page, 'card');
});

test('rounded 映射到系统形状令牌，默认 medium', async ({ page }) => {
  const tokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);

    return {
      medium: style.getPropertyValue('--mat-sys-shape-corner-medium').trim(),
      large: style.getPropertyValue('--mat-sys-shape-corner-large').trim(),
    };
  });

  expect(await readRadius(page, 'card-medium')).toBe(tokens.medium);
  expect(await readRadius(page, 'card-large')).toBe(tokens.large);
});

test('flat 悬停不提升阴影，同时保留静止阴影', async ({ page }) => {
  const plainBase = await readShadow(page, 'card-plain');
  await page.getByTestId('plain-action').hover();
  await expect.poll(() => readShadow(page, 'card-plain')).not.toBe(plainBase);

  await page.mouse.move(0, 0);
  const flatBase = await readShadow(page, 'card-flat');
  await page.getByTestId('flat-action').hover();
  await page.waitForTimeout(300);
  expect(await readShadow(page, 'card-flat')).toBe(flatBase);

  await page.mouse.move(0, 0);
  const elevatedBase = await readShadow(page, 'card-flat-elevated');
  expect(elevatedBase).not.toBe('none');
  await page.getByTestId('flat-elevated-action').hover();
  await page.waitForTimeout(300);
  expect(await readShadow(page, 'card-flat-elevated')).toBe(elevatedBase);
});
