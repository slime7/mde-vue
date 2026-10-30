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
});
