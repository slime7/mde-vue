import { expect, test } from '@playwright/test';
import { openScene, readEvents, waitForEvent } from './helpers';

test.describe('MatDialog 焦点陷阱与滚动锁', () => {
  test('Esc 关闭后触发 closed 并恢复触发元素焦点', async ({ page }) => {
    await openScene(page, 'dialog');
    await page.getByTestId('open-dialog').click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('对话框正文内容');

    await page.keyboard.press('Escape');
    await waitForEvent(page, 'dialog-closed');
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await expect(page.getByTestId('open-dialog')).toBeFocused();
  });

  test('焦点在对话框内循环，不会泄漏到背景', async ({ page }) => {
    await openScene(page, 'dialog');
    await page.getByTestId('open-dialog').click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();

    for (let step = 0; step < 8; step += 1) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => (
        Boolean(document.activeElement?.closest('dialog[open]'))
      ));
      expect(inside).toBe(true);
    }
  });

  test('打开期间锁定页面滚动，关闭后恢复', async ({ page }) => {
    await openScene(page, 'dialog');

    await page.evaluate(() => window.scrollTo(0, 600));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);

    await page.getByTestId('open-dialog').click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);

    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(200);
    const lockedScrollY = await page.evaluate(() => window.scrollY);
    expect(lockedScrollY).toBeGreaterThan(400);

    await page.getByTestId('dialog-cancel').click();
    await waitForEvent(page, 'dialog-closed');

    await page.mouse.wheel(0, 400);
    await expect.poll(() => page.evaluate(() => window.scrollY)).not.toBe(lockedScrollY);
  });

  test('默认不响应帷幕点击关闭', async ({ page }) => {
    await openScene(page, 'dialog');
    await page.getByTestId('open-dialog').click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();

    await page.mouse.click(20, 760);
    await expect(dialog).toBeVisible();
  });

  test('命令式 confirm 按动作结算 Promise', async ({ page }) => {
    await openScene(page, 'dialog');

    await page.getByTestId('open-imperative').click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toContainText('命令式正文');
    await dialog.getByRole('button', { name: '取消' }).click();
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'confirm-result', payload: false });

    await expect(page.locator('dialog[open]')).toHaveCount(0);

    await page.getByTestId('open-imperative').click();
    const second = page.locator('dialog[open]');
    await expect(second).toContainText('命令式正文');
    await second.getByRole('button', { name: '确定' }).click();
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'confirm-result', payload: true });
  });
});
