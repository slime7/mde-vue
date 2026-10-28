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

test.describe('MatScrollArea 拖拽与滚动停靠', () => {
  // 停靠点：28px 内边距下每项 224px + 12px 间距，第 n 项停靠在 (n - 1) * 236px。
  const SNAP_STEP = 236;

  function readSnapAreaScrollLeft(page) {
    return page.evaluate(() => window.readSnapAreaScrollLeft());
  }

  async function expectSnapAreaScrollLeft(page, expected) {
    await expect.poll(async () => Math.abs((await readSnapAreaScrollLeft(page)) - expected))
      .toBeLessThanOrEqual(2);
  }

  async function openSnapDragArea(page) {
    await openScene(page, 'scroll-area');
    const box = await page.getByTestId('snap-drag-area').boundingBox();

    return { startX: box.x + box.width / 2, startY: box.y + box.height / 2 };
  }

  test('按住拖动时逐段跟手，不被 mandatory 吸附拦截', async ({ page }) => {
    const { startX, startY } = await openSnapDragArea(page);

    await page.mouse.move(startX, startY);
    await page.mouse.down();

    await page.mouse.move(startX - 30, startY);
    await expectSnapAreaScrollLeft(page, 30);

    await page.mouse.move(startX - 80, startY);
    await expectSnapAreaScrollLeft(page, 80);

    await page.mouse.move(startX - 60, startY);
    await expectSnapAreaScrollLeft(page, 60);

    await page.mouse.up();
  });

  test('松手后恢复 mandatory 停靠，内容停靠到最近停靠点', async ({ page }) => {
    const { startX, startY } = await openSnapDragArea(page);

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 160, startY);
    await page.mouse.up();

    await expect.poll(() => readSnapAreaScrollLeft(page)).toBe(SNAP_STEP);

    // 恢复后的 mandatory 同样吸附程序化滚动，说明停靠能力已还原。
    await page.evaluate(() => window.writeSnapAreaScrollLeft(100));
    await expect.poll(() => readSnapAreaScrollLeft(page)).toBe(0);
  });

  test('从文本和图片上开始拖拽不误触点击，短按仍触发点击', async ({ page }) => {
    await openSnapDragArea(page);
    const readSnapClicks = async () => (
      (await readEvents(page)).filter((event) => event.name === 'snap-click')
    );

    // 位移 2px 未过阈值：仍是一次短按点击。
    const firstBox = await page.locator('[data-snap-item="1"]').boundingBox();
    await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(firstBox.x + firstBox.width / 2 + 2, firstBox.y + firstBox.height / 2);
    await page.mouse.up();
    await expect.poll(readSnapClicks).toContainEqual({ name: 'snap-click', payload: 1 });

    // 视口只有 340px 宽，超出部分被裁剪；按压点必须落在可见区域内。
    // 从文本可见部分按下并拖动：滚动跟手，不产生点击。
    const textBox = await page.locator('[data-snap-item="2"]').boundingBox();
    await page.mouse.move(textBox.x + 24, textBox.y + textBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(textBox.x + 24 - 60, textBox.y + textBox.height / 2);
    await expectSnapAreaScrollLeft(page, 60);
    await page.mouse.up();
    expect(await readSnapClicks()).toEqual([{ name: 'snap-click', payload: 1 }]);

    // 先停靠到第 4 项（3 * 236），让含图片的第 5 项部分可见，再从图片上拖动：
    // 原生拖放被阻止，滚动跟手，不产生点击。
    await page.evaluate(() => window.writeSnapAreaScrollLeft(3 * 236));
    await expect.poll(() => readSnapAreaScrollLeft(page)).toBe(3 * 236);
    const imageBox = await page.getByAltText('示例图片').boundingBox();
    await page.mouse.move(imageBox.x + 16, imageBox.y + imageBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(imageBox.x + 16 - 30, imageBox.y + imageBox.height / 2);
    await expectSnapAreaScrollLeft(page, 3 * 236 + 30);
    await page.mouse.up();
    expect(await readSnapClicks()).toEqual([{ name: 'snap-click', payload: 1 }]);
  });
});
