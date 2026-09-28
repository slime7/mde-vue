import { expect, test } from '@playwright/test';
import { clearEvents, openScene, readEvents } from './helpers';

const DRAG_STEPS = 10;
// 指针位移经 0.5 系数换算并扣除 4px slop 后需达到 60px 触发距离，200px 位移留足余量。
const DRAG_DISTANCE = 200;

async function dragDownFrom(page, startY) {
  const area = page.getByTestId('scroll-area');
  const box = await area.boundingBox();
  const x = box.x + box.width / 2;

  await page.mouse.move(x, startY);
  await page.mouse.down();
  for (let step = 1; step <= DRAG_STEPS; step += 1) {
    await page.mouse.move(x, startY + (DRAG_DISTANCE * step) / DRAG_STEPS);
    await page.waitForTimeout(24);
  }
  await page.mouse.up();
}

test.describe('MatPullToRefresh 手势触发', () => {
  test('顶部下拉达到阈值后触发刷新并自动结束', async ({ page }) => {
    await openScene(page, 'pull-to-refresh');

    const area = page.getByTestId('scroll-area');
    const box = await area.boundingBox();
    await dragDownFrom(page, box.y + 80);

    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'refresh', payload: null });
    await expect(page.getByTestId('refresh-state')).toHaveText('刷新中');
    await expect(page.getByTestId('refresh-state')).toHaveText('空闲', { timeout: 3000 });
  });

  test('未达阈值的下拉不触发刷新', async ({ page }) => {
    await openScene(page, 'pull-to-refresh');

    const area = page.getByTestId('scroll-area');
    const box = await area.boundingBox();
    const x = box.x + box.width / 2;
    const startY = box.y + 80;

    await page.mouse.move(x, startY);
    await page.mouse.down();
    for (let step = 1; step <= 3; step += 1) {
      await page.mouse.move(x, startY + step * 12);
      await page.waitForTimeout(24);
    }
    await page.mouse.up();

    await page.waitForTimeout(400);
    const refreshes = (await readEvents(page)).filter((item) => item.name === 'refresh');
    expect(refreshes).toHaveLength(0);
    await expect(page.getByTestId('refresh-state')).toHaveText('空闲');
  });

  test('内容滚离顶部后不触发，回到顶部后恢复触发', async ({ page }) => {
    await openScene(page, 'pull-to-refresh');

    const area = page.getByTestId('scroll-area');
    const box = await area.boundingBox();

    await area.hover();
    await page.mouse.wheel(0, 400);
    await expect.poll(async () => area.evaluate((el) => el.scrollTop)).toBeGreaterThan(100);

    await clearEvents(page);
    await dragDownFrom(page, box.y + 80);
    await page.waitForTimeout(400);
    expect((await readEvents(page)).filter((item) => item.name === 'refresh')).toHaveLength(0);

    await area.evaluate((el) => {
      el.scrollTo({ top: 0 });
    });
    await page.waitForTimeout(300);

    await dragDownFrom(page, box.y + 80);
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'refresh', payload: null });
  });
});
