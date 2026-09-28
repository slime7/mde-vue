import { expect, test } from '@playwright/test';
import { openScene, readEvents } from './helpers';

test.describe('MatSnackbar 队列时序', () => {
  test('多条请求按 FIFO 依次展示，活动项退出动画完成后释放下一条', async ({ page }) => {
    await openScene(page, 'snackbar');

    await page.getByTestId('open-first').click();
    const first = page.getByText('通知甲内容');
    await expect(first).toBeVisible();

    await page.getByTestId('open-second').click();
    await expect(page.getByText('通知乙内容')).toBeHidden();

    await expect(page.getByText('通知乙内容')).toBeVisible({ timeout: 4000 });
    await expect(first).toBeHidden();
  });

  test('命令式通知在真实退出动画与清理完成后结算 Promise', async ({ page }) => {
    await openScene(page, 'snackbar');

    await page.getByTestId('open-imperative').click();
    await expect(page.getByText('命令式通知')).toBeVisible();

    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'imperative-settled', payload: null });
    await expect(page.getByText('命令式通知')).toBeHidden();
  });
});
