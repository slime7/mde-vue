import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

/**
 * 在指定毫秒内逐帧采样元素尺寸，用于判断过渡是否经过中间值。
 *
 * @param {import('@playwright/test').Locator} locator
 * @param {'block'|'inline'} axis
 * @param {number} duration 采样时长，单位为毫秒
 * @returns {Promise<number[]>}
 */
function sampleSize(locator, axis, duration) {
  return locator.evaluate(async (element, options) => {
    const read = () => (
      options.axis === 'block'
        ? element.getBoundingClientRect().height
        : element.getBoundingClientRect().width
    );
    const samples = [];
    const startedAt = performance.now();

    while (performance.now() - startedAt < options.duration) {
      await new Promise((resolve) => {
        requestAnimationFrame(resolve);
      });
      samples.push(read());
    }

    return samples;
  }, { axis, duration });
}

/**
 * 读取元素在指定轴上的当前渲染尺寸。
 *
 * @param {import('@playwright/test').Locator} locator
 * @param {'block'|'inline'} axis
 * @returns {Promise<number>}
 */
function readSize(locator, axis) {
  return locator.evaluate((element, options) => (
    options.axis === 'block'
      ? element.getBoundingClientRect().height
      : element.getBoundingClientRect().width
  ), { axis });
}

test.beforeEach(async ({ page }) => {
  await openScene(page, 'navigation-group');
});

test('分组折叠时高度在 0 与内容高度之间过渡', async ({ page }) => {
  const content = page.locator('.mat-navigation-group__content');

  await expect.poll(() => readSize(content, 'block'), { timeout: 3000 }).toBe(0);

  await page.getByTestId('toggle-group').click();

  /* 展开用的是 500ms 弹簧，采样窗口只覆盖前 200ms，因此窗口内不会出现弹簧过冲；
     若高度直接跳到终态，说明长度与 auto 之间没有插值。 */
  const samples = await sampleSize(content, 'block', 200);
  await expect.poll(() => readSize(content, 'block'), { timeout: 3000 }).toBeGreaterThan(0);
  const settled = await readSize(content, 'block');

  expect(settled).toBeGreaterThan(0);
  expect(samples.some((value) => value > 0 && value < settled * 0.9)).toBe(true);

  await page.getByTestId('toggle-group').click();

  await expect.poll(() => readSize(content, 'block'), { timeout: 3000 }).toBe(0);
});

test('rail 展开时标签宽度在 0 与内容宽度之间过渡', async ({ page }) => {
  const item = page.getByTestId('rail-item');
  const labelWrap = item.locator('.mat-navigation-rail-item__label-wrap');

  await expect.poll(() => readSize(labelWrap, 'inline'), { timeout: 3000 }).toBe(0);

  await page.getByTestId('toggle-rail-expanded').click();

  const samples = await sampleSize(labelWrap, 'inline', 200);
  await expect.poll(() => readSize(labelWrap, 'inline'), { timeout: 3000 }).toBeGreaterThan(0);
  const settled = await readSize(labelWrap, 'inline');

  expect(settled).toBeGreaterThan(0);
  expect(samples.some((value) => value > 0 && value < settled * 0.9)).toBe(true);

  /* 展开后标签容器放得下完整文本，不应仍在裁剪。 */
  const label = item.locator('.mat-navigation-rail-item__label').last();

  expect(settled).toBeGreaterThan(0);
  expect(await readSize(label, 'inline')).toBeGreaterThan(0);
});
