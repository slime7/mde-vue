import { expect, test } from '@playwright/test';
import { openScene, waitForEvent } from './helpers';

test.describe('MatNotification 定位与交互', () => {
  test('六个方位相对最近的布局容器定位', async ({ page }) => {
    await openScene(page, 'notification');

    const stage = page.getByTestId('notification-stage');
    const card = page.getByTestId('notification-positioned');
    const positionedHost = page.getByTestId('notification-positioned-host');

    await expect(card).toBeVisible();
    await expect(positionedHost.getByTestId('notification-positioned')).toHaveCount(0);
    await expect.poll(
      () => card.evaluate((element) => getComputedStyle(element).transform),
    ).toBe('none');

    const stageBox = await stage.boundingBox();
    const initialBox = await card.boundingBox();

    expect(initialBox.width).toBeLessThanOrEqual(400);
    expect(initialBox.x).toBeCloseTo(stageBox.x + 16, 0);
    expect(initialBox.y).toBeCloseTo(stageBox.y + 16, 0);

    const cases = [
      { align: 'center', edge: 'top', position: 'top-center' },
      { align: 'end', edge: 'top', position: 'top-end' },
      { align: 'start', edge: 'bottom', position: 'bottom-start' },
      { align: 'center', edge: 'bottom', position: 'bottom-center' },
      { align: 'end', edge: 'bottom', position: 'bottom-end' },
    ];

    await cases.reduce(async (previous, item) => {
      await previous;
      await page.locator(`[data-position="${item.position}"]`).click();
      await page.waitForTimeout(100);

      const box = await card.boundingBox();

      if (item.edge === 'top') {
        expect(box.y).toBeCloseTo(stageBox.y + 16, 0);
      } else {
        expect(box.y + box.height).toBeCloseTo(stageBox.y + stageBox.height - 16, 0);
      }

      if (item.align === 'start') {
        expect(box.x).toBeCloseTo(stageBox.x + 16, 0);
      } else if (item.align === 'end') {
        expect(box.x + box.width).toBeCloseTo(stageBox.x + stageBox.width - 16, 0);
      } else {
        expect(box.x + (box.width / 2)).toBeCloseTo(stageBox.x + (stageBox.width / 2), 0);
      }
    }, Promise.resolve());

    await card.getByRole('button', { name: '关闭' }).click();
    await expect(card).toBeHidden();

    await page.getByTestId('notification-reopen').click();
    await expect(card).toBeVisible();
  });

  test('独立使用时保持自然布局', async ({ page }) => {
    await openScene(page, 'notification');

    const host = page.getByTestId('notification-inline-host');
    const card = host.getByTestId('notification-inline');

    await expect(card).toBeVisible();

    const hostBox = await host.boundingBox();
    const cardBox = await card.boundingBox();

    expect(cardBox.x).toBeCloseTo(hostBox.x, 0);
    expect(cardBox.width).toBeLessThanOrEqual(400);
    expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(hostBox.x + hostBox.width + 0.5);
  });

  test('app=false 时即使位于 Layout 内也保持自然布局', async ({ page }) => {
    await openScene(page, 'notification');

    const stage = page.getByTestId('notification-stage');
    const host = page.getByTestId('notification-app-false-host');
    const card = host.getByTestId('notification-app-false');

    await expect(card).toBeVisible();
    await expect.poll(
      () => card.evaluate((element) => getComputedStyle(element).position),
    ).toBe('static');

    const stageBox = await stage.boundingBox();
    const hostBox = await host.boundingBox();
    const cardBox = await card.boundingBox();

    expect(cardBox.x).toBeCloseTo(hostBox.x, 0);
    expect(cardBox.y).toBeCloseTo(hostBox.y, 0);
    expect(cardBox.y + cardBox.height).toBeLessThanOrEqual(stageBox.y + stageBox.height);
  });

  test('触发操作后派发事件并关闭', async ({ page }) => {
    await openScene(page, 'notification');

    await page.getByTestId('notification-action-open').click();

    const card = page.getByTestId('notification-action');

    await expect(card).toBeVisible();
    await card.getByRole('button', { name: '查看' }).click();

    const event = await waitForEvent(page, 'notification-action');

    expect(event.payload).toBe('查看');
    await expect(card).toBeHidden();
  });
});
