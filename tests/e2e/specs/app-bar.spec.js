import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

function readAppBarAnimations(page) {
  return page.getByTestId('app-bar').evaluate((header) => (
    header.getAnimations({ subtree: true })
      .filter((animation) => animation.animationName?.startsWith('mat-app-bar-'))
      .map((animation) => ({
        name: animation.animationName,
        pseudoElement: animation.effect?.pseudoElement ?? null,
      }))
  ));
}

test.describe('MatAppBar 滚动时间线', () => {
  test('默认关闭，显式启用后创建，关闭后移除', async ({ page }) => {
    await openScene(page, 'app-bar');

    await expect.poll(() => readAppBarAnimations(page)).toHaveLength(0);

    await page.getByTestId('toggle-scroll-timeline').click();
    await expect.poll(() => readAppBarAnimations(page)).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: expect.stringMatching(/^mat-app-bar-/),
        pseudoElement: '::after',
      }),
    ]));

    await page.getByTestId('toggle-scroll-timeline').click();
    await expect.poll(() => readAppBarAnimations(page)).toHaveLength(0);
  });

  test('关闭时间线时仍以滚动状态过渡表面色', async ({ page }) => {
    await openScene(page, 'app-bar');

    const scroller = page.getByTestId('scroll-target');
    const header = page.getByTestId('app-bar');

    await expect.poll(() => header.evaluate(
      (element) => Number(getComputedStyle(element, '::after').opacity),
    )).toBe(0);

    await scroller.evaluate((element) => element.scrollTo({ top: 80 }));

    await expect.poll(() => header.evaluate(
      (element) => Number(getComputedStyle(element, '::after').opacity),
    )).toBeGreaterThan(0.9);
  });

  test('关闭时间线时由顶部观察哨触发折叠过渡，回到顶部后展开', async ({ page }) => {
    await openScene(page, 'app-bar');

    const scroller = page.getByTestId('scroll-target');
    const title = page.getByText('最近项目', { exact: true });

    await expect(title).toBeVisible();
    const expandedBox = await title.boundingBox();

    await scroller.evaluate((element) => element.scrollTo({ top: 8 }));
    await page.waitForTimeout(100);
    const belowThresholdBox = await title.boundingBox();

    expect(Math.abs(belowThresholdBox.width - expandedBox.width)).toBeLessThan(1);

    await scroller.evaluate((element) => element.scrollTo({ top: 40 }));
    await expect.poll(async () => (await title.boundingBox()).width)
      .toBeLessThan(expandedBox.width * 0.9);

    await scroller.evaluate((element) => element.scrollTo({ top: 0 }));
    await expect.poll(async () => (await title.boundingBox()).width)
      .toBeGreaterThan(expandedBox.width * 0.98);
  });
});
