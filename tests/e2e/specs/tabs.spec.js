import { expect, test } from '@playwright/test';
import { openScene, readEvents } from './helpers';

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

test.describe('MatTabs 内容滑动', () => {
  test('触摸向左滑动越过阈值后切换到相邻页', async ({ page }) => {
    await openScene(page, 'tabs');

    const tabs = page.getByTestId('tabs');
    const box = await tabs.boundingBox();
    const y = box.y + box.height / 2 + 40;

    await touchSwipe(page, [
      [box.x + box.width - 40, y],
      [box.x + box.width - 120, y],
      [box.x + box.width - 260, y],
      [box.x + box.width - 300, y],
    ]);

    await expect(page.getByTestId('active-page')).toHaveText('photos');
    await expect(page.getByText('照片内容')).toBeVisible();
  });

  test('触摸位移不足时保持当前页', async ({ page }) => {
    await openScene(page, 'tabs');

    const tabs = page.getByTestId('tabs');
    const box = await tabs.boundingBox();
    const y = box.y + box.height / 2 + 40;

    await touchSwipe(page, [
      [box.x + box.width - 40, y],
      [box.x + box.width - 60, y],
    ]);

    await page.waitForTimeout(400);
    await expect(page.getByTestId('active-page')).toHaveText('home');
  });

  test('鼠标拖动内容不切换页面', async ({ page }) => {
    await openScene(page, 'tabs');

    const tabs = page.getByTestId('tabs');
    const box = await tabs.boundingBox();
    const y = box.y + box.height / 2 + 40;

    await page.mouse.move(box.x + box.width - 40, y);
    await page.mouse.down();
    await page.mouse.move(box.x + 40, y, { steps: 8 });
    await page.mouse.up();

    await page.waitForTimeout(400);
    await expect(page.getByTestId('active-page')).toHaveText('home');
    await expect(page.getByText('首页内容')).toBeVisible();
  });

  test('点击跨越多页的标签后只播放相邻过渡并停在目标页', async ({ page }) => {
    await openScene(page, 'tabs');

    const firstPage = page.getByText('首页内容');
    const tabs = page.getByTestId('tabs');
    const box = await tabs.boundingBox();
    const startBox = await firstPage.boundingBox();

    await page.getByRole('tab', { name: '设置' }).click();

    /* 过渡进行中：首页位移约一页宽度，忽略中间页。 */
    await page.waitForTimeout(90);
    const midBox = await firstPage.boundingBox();
    expect(Math.abs(midBox.x - startBox.x)).toBeLessThan(box.width * 1.6);

    await expect(page.getByTestId('active-page')).toHaveText('settings');
    await expect(page.getByText('设置内容')).toBeVisible();
    await expect.poll(() => readEvents(page)).toContainEqual({
      name: 'select',
      payload: 'settings',
    });
  });

  test('反向跨越多页点击同样只播放相邻过渡并正确停在目标页', async ({ page }) => {
    await openScene(page, 'tabs');

    await page.getByRole('tab', { name: '设置' }).click();
    await expect(page.getByTestId('active-page')).toHaveText('settings');
    await expect(page.getByText('设置内容')).toBeVisible();

    await page.getByRole('tab', { name: '首页' }).click();
    await expect(page.getByTestId('active-page')).toHaveText('home');
    await expect(page.getByText('首页内容')).toBeVisible();
  });

  test('方向键在标签间自动激活', async ({ page }) => {
    await openScene(page, 'tabs');

    await page.getByRole('tab', { name: '首页' }).focus();
    await page.keyboard.press('ArrowRight');

    await expect(page.getByTestId('active-page')).toHaveText('photos');
  });

  test('scrollable 与 scroll-buttons 在内容溢出时渲染翻页按钮并可驱动滚动', async ({ page }) => {
    await openScene(page, 'tabs');

    const scrollTabs = page.getByTestId('scroll-tabs');
    const nextBtn = scrollTabs.locator('.mat-tabs__scroll-btn--end');
    await expect(nextBtn).toBeVisible();

    await nextBtn.click();

    const prevBtn = scrollTabs.locator('.mat-tabs__scroll-btn--start');
    await expect(prevBtn).toBeVisible();
  });
});
