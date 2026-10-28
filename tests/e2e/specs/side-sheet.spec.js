import { expect, test } from '@playwright/test';
import { openScene, waitForEvent } from './helpers';

test.describe('MatSideSheet modal 焦点与宿主滚动', () => {
  test('入场期间聚焦对话框根元素，入场后进入面板且不改变宿主滚动位置', async ({ page }) => {
    await openScene(page, 'side-sheet');

    await page.evaluate(() => {
      window.scrollTo(0, 600);
      document.querySelector('[data-testid="host-scroller"]').scrollTop = 200;
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);
    await expect.poll(() => page.evaluate(
      () => document.querySelector('[data-testid="host-scroller"]').scrollTop,
    )).toBe(200);

    await page.getByTestId('open-side-sheet').click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.activeElement?.tagName))
      .toBe('DIALOG');

    await waitForEvent(page, 'side-sheet-opened');
    await expect(page.getByTestId('side-sheet-primary')).toBeFocused();

    const { hostLeft, hostTop, windowY } = await page.evaluate(() => ({
      hostLeft: document.querySelector('[data-testid="host-scroller"]').scrollLeft,
      hostTop: document.querySelector('[data-testid="host-scroller"]').scrollTop,
      windowY: window.scrollY,
    }));

    expect(hostLeft).toBe(0);
    expect(hostTop).toBe(200);
    expect(windowY).toBeGreaterThan(400);
  });
});
