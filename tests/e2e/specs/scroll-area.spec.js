import { expect, test } from '@playwright/test';
import { openScene, readEvents } from './helpers';

test.describe('MatScrollArea 边缘事件与滚动', () => {
  test('初次布局保持静默，真实滚动到末端触发 reach-end', async ({ page }) => {
    await openScene(page, 'scroll-area');
    await page.waitForTimeout(400);
    expect(await readEvents(page)).toHaveLength(0);

    const area = page.getByTestId('scroll-area');
    await area.hover();
    await page.mouse.wheel(0, 3000);

    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'reach-end', payload: 0 });
  });

  test('离开起始边缘后回到顶部时再次触发 reach-start', async ({ page }) => {
    await openScene(page, 'scroll-area');

    const area = page.getByTestId('scroll-area');
    await area.hover();
    await page.mouse.wheel(0, 3000);
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'reach-end', payload: 0 });

    await area.evaluate((el) => {
      el.scrollTo({ top: 0 });
    });
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'reach-start', payload: 0 });
  });
});
