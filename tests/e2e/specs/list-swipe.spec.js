import { expect, test } from '@playwright/test';
import {
  clearEvents, openScene, readEvents, waitForEvent,
} from './helpers';

/**
 * 通过 CDP 发送真实触摸事件序列。
 *
 * @param {import('@playwright/test').Page} page
 * @param {Array<[number, number]>} points
 */
async function touchSwipe(page, points) {
  const session = await page.context().newCDPSession(page);
  const [[startX, startY]] = points;

  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: startX, y: startY }],
  });

  for (let index = 1; index < points.length; index += 1) {
    const [x, y] = points[index];
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x, y }],
    });
    await page.waitForTimeout(16);
  }

  await session.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await session.detach();
}

test.describe('MatListItem 滑动手势', () => {
  test('触摸向左滑动露出操作按钮并发出 reveal 事件', async ({ page }) => {
    await openScene(page, 'list-swipe');
    await clearEvents(page);

    const item = page.locator('li').filter({ hasText: '邮件通知' });
    const box = await item.boundingBox();
    const y = box.y + box.height / 2;

    await touchSwipe(page, [
      [box.x + box.width - 16, y],
      [box.x + box.width - 80, y],
      [box.x + box.width - 120, y],
    ]);

    const events = await readEvents(page);
    const end = events.filter((entry) => entry.name === 'swipeend').at(-1);
    expect(end?.payload?.action).toBe('reveal');
    await expect(page.getByTestId('archive-action')).toBeVisible();
  });

  test('露出模式中越过七成宽度的全划不停留也不露出', async ({ page }) => {
    await openScene(page, 'list-swipe');
    await clearEvents(page);

    const item = page.locator('li').filter({ hasText: '邮件通知' });
    const box = await item.boundingBox();
    const y = box.y + box.height / 2;

    await touchSwipe(page, [
      [box.x + box.width - 16, y],
      [box.x + box.width - 200, y],
      [box.x + 24, y],
      [box.x + 20, y],
    ]);

    const events = await readEvents(page);
    const end = events.filter((entry) => entry.name === 'swipeend').at(-1);
    expect(end?.payload?.action).toBe('none');
    await page.waitForTimeout(400);
    /* 前景完全回弹：项目内容回到原位覆盖操作区。 */
    const afterBox = await item.boundingBox();
    expect(Math.abs(afterBox.x - box.x)).toBeLessThan(8);
  });

  test('移除模式的滑动越过阈值后发出 remove 并由应用移除项目', async ({ page }) => {
    await openScene(page, 'list-swipe');
    await clearEvents(page);

    const item = page.getByText('第一条通知');
    const box = await item.boundingBox();
    const y = box.y + box.height / 2;

    await touchSwipe(page, [
      [box.x + box.width - 16, y],
      [box.x + box.width - 120, y],
      [box.x + box.width - 260, y],
    ]);

    /* 退场动画期间不请求移除。 */
    expect((await readEvents(page)).filter((entry) => entry.name === 'remove')).toHaveLength(0);

    await expect.poll(async () => readEvents(page)).toContainEqual({
      name: 'remove',
      payload: { direction: 'start' },
    });
    await expect(page.getByTestId('item-count')).toHaveText('2');
  });

  test('鼠标拖动列表项不触发滑动手势', async ({ page }) => {
    await openScene(page, 'list-swipe');
    await clearEvents(page);

    const item = page.getByText('邮件通知');
    const box = await item.boundingBox();
    const y = box.y + box.height / 2;

    await page.mouse.move(box.x + box.width - 16, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width - 200, y, { steps: 8 });
    await page.mouse.up();

    await page.waitForTimeout(400);
    expect((await readEvents(page)).filter((entry) => entry.name === 'swipeend')).toHaveLength(0);
    await expect(page.getByTestId('item-count')).toHaveText('3');
  });

  test('函数触发的滑动与手势走同一套事件流程', async ({ page }) => {
    await openScene(page, 'list-swipe');
    await clearEvents(page);

    await page.getByTestId('programmatic-swipe').click();

    const end = await waitForEvent(page, 'swipeend');
    expect(end.payload.action).toBe('reveal');
    await expect(page.getByTestId('archive-action')).toBeVisible();
  });

  test('配置 swipe-primary 时全划越过阈值触发 primary 事件', async ({ page }) => {
    await openScene(page, 'list-swipe');
    await clearEvents(page);

    const item = page.locator('li').filter({ hasText: 'Tacos' });
    const box = await item.boundingBox();
    const y = box.y + box.height / 2;

    await touchSwipe(page, [
      [box.x + box.width - 16, y],
      [box.x + box.width - 200, y],
      [box.x + 24, y],
      [box.x + 20, y],
    ]);

    const events = await readEvents(page);
    const end = events.filter((entry) => entry.name === 'swipeend').at(-1);
    expect(end?.payload?.action).toBe('primary');
    await expect.poll(async () => readEvents(page)).toContainEqual({
      name: 'primary',
      payload: { direction: 'start' },
    });
  });
});
