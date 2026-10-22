import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

const ITEM_SELECTOR = '.mat-chat-minimap__item';
const BAR_SELECTOR = '.mat-chat-minimap__bar';

/**
 * @param {import('@playwright/test').Locator} locator
 * @returns {Promise<Array<{ x: number, y: number, width: number, height: number }>>}
 */
async function readBoxes(locator) {
  const count = await locator.count();
  const boxes = [];

  for (let index = 0; index < count; index += 1) {
    const box = await locator.nth(index).boundingBox();

    if (!box) {
      throw new Error(`无法读取第 ${index} 个元素的尺寸`);
    }

    boxes.push(box);
  }

  return boxes;
}

/**
 * @param {number[]} values
 * @returns {void}
 */
function expectStrictlyDecreasing(values) {
  values.slice(1).forEach((value, index) => {
    expect(value).toBeLessThan(values[index]);
  });
}

test.describe('MatChatMinimap 悬停梯度与增长方向', () => {
  test('悬停中间项时前后 3 项按距离扩大，厚度固定且组件尺寸不抖动', async ({ page }) => {
    await openScene(page, 'chat-minimap');

    const minimap = page.getByTestId('left-minimap');
    const itemRows = minimap.locator(ITEM_SELECTOR);
    const bars = minimap.locator(BAR_SELECTOR);

    await expect(bars).toHaveCount(9);

    const rootBefore = await minimap.boundingBox();
    const boxesBefore = await readBoxes(bars);

    boxesBefore.forEach((box) => {
      expect(box.x).toBeCloseTo(boxesBefore[0].x, 0);
    });

    await itemRows.nth(4).hover();

    const tooltip = page.getByRole('tooltip').filter({
      hasText: '第 5 条消息的富文本摘要。',
    });

    await expect(tooltip).toBeVisible();

    const hoveredItem = await itemRows.nth(4).boundingBox();
    const tooltipBox = await tooltip.boundingBox();

    expect(tooltipBox.x).toBeGreaterThanOrEqual(hoveredItem.x + hoveredItem.width - 1);

    await expect.poll(async () => {
      const box = await bars.nth(4).boundingBox();

      return box?.width ?? 0;
    }).toBeGreaterThanOrEqual(rootBefore.width - 0.5);

    const rootAfter = await minimap.boundingBox();
    const boxesAfter = await readBoxes(bars);
    const widthsByDistance = [4, 3, 2, 1, 0].map((index) => boxesAfter[index].width);

    expect(rootAfter.width).toBeCloseTo(rootBefore.width, 1);
    expect(rootAfter.height).toBeCloseTo(rootBefore.height, 1);
    expect(boxesAfter[4].width).toBeCloseTo(rootAfter.width, 0);
    expectStrictlyDecreasing(widthsByDistance);
    expect(boxesAfter[0].width).toBeCloseTo(boxesBefore[0].width, 1);
    expect(boxesAfter[4].height).toBeCloseTo(boxesBefore[4].height, 1);
    boxesAfter.forEach((box) => {
      expect(box.height).toBeCloseTo(boxesBefore[0].height, 1);
    });
    expect(boxesAfter[4].x).toBeCloseTo(boxesBefore[4].x, 0);
    expect(boxesAfter[4].x + boxesAfter[4].width)
      .toBeGreaterThan(boxesBefore[4].x + boxesBefore[4].width);
  });

  test('direction="right" 时右对齐并向左增长，提示出现在左侧', async ({ page }) => {
    await openScene(page, 'chat-minimap');

    const minimap = page.getByTestId('right-minimap');
    const itemRows = minimap.locator(ITEM_SELECTOR);
    const bars = minimap.locator(BAR_SELECTOR);

    await expect(bars).toHaveCount(7);

    const rootBefore = await minimap.boundingBox();
    const boxesBefore = await readBoxes(bars);

    boxesBefore.forEach((box) => {
      expect(box.x + box.width).toBeCloseTo(boxesBefore[0].x + boxesBefore[0].width, 0);
    });

    await itemRows.nth(3).hover();

    const tooltip = page.getByRole('tooltip').filter({
      hasText: '第 4 条消息的富文本摘要。',
    });

    await expect(tooltip).toBeVisible();

    const hoveredItem = await itemRows.nth(3).boundingBox();
    const tooltipBox = await tooltip.boundingBox();

    expect(tooltipBox.x + tooltipBox.width).toBeLessThanOrEqual(hoveredItem.x + 1);

    await expect.poll(async () => {
      const box = await bars.nth(3).boundingBox();

      return box?.width ?? 0;
    }).toBeGreaterThanOrEqual(rootBefore.width - 0.5);

    const boxesAfter = await readBoxes(bars);

    expect(boxesAfter[3].x + boxesAfter[3].width)
      .toBeCloseTo(boxesBefore[3].x + boxesBefore[3].width, 0);
    expect(boxesAfter[3].x).toBeLessThan(boxesBefore[3].x);

    boxesAfter.forEach((box) => {
      expect(box.x + box.width).toBeCloseTo(boxesAfter[0].x + boxesAfter[0].width, 0);
    });
  });

  test('item-width、item-height 与 item-gap 控制短横线尺寸和整行高度', async ({ page }) => {
    await openScene(page, 'chat-minimap');

    const minimap = page.getByTestId('sized-minimap');
    const itemRows = minimap.locator(ITEM_SELECTOR);
    const bars = minimap.locator(BAR_SELECTOR);

    await expect(bars).toHaveCount(6);

    const rootBefore = await minimap.boundingBox();
    const barsBefore = await readBoxes(bars);
    const rowsBefore = await readBoxes(itemRows);

    expect(rootBefore.width).toBeCloseTo(48, 0);
    expect(rootBefore.height).toBeCloseTo(96, 0);
    barsBefore.forEach((box) => {
      expect(box.width).toBeCloseTo(24, 0);
      expect(box.height).toBeCloseTo(4, 0);
    });

    barsBefore.slice(1).forEach((box, index) => {
      expect(box.y - barsBefore[index].y).toBeCloseTo(16, 0);
    });

    rowsBefore.forEach((row) => {
      expect(row.height).toBeCloseTo(16, 0);
    });
    rowsBefore.slice(1).forEach((row, index) => {
      expect(row.y).toBeCloseTo(rowsBefore[index].y + rowsBefore[index].height, 0);
    });
    expect(rowsBefore[0].y).toBeCloseTo(rootBefore.y, 0);
    expect(rowsBefore[rowsBefore.length - 1].y + rowsBefore[rowsBefore.length - 1].height)
      .toBeCloseTo(rootBefore.y + rootBefore.height, 0);

    await itemRows.nth(2).hover();

    await expect.poll(async () => {
      const box = await bars.nth(2).boundingBox();

      return box?.width ?? 0;
    }).toBeGreaterThanOrEqual(rootBefore.width - 0.5);
  });

  test('悬停范围覆盖整行与上下半分间距，移动到短横线外侧不会关闭提示', async ({ page }) => {
    await openScene(page, 'chat-minimap');

    const minimap = page.getByTestId('left-minimap');
    const itemRows = minimap.locator(ITEM_SELECTOR);
    const bars = minimap.locator(BAR_SELECTOR);

    const row = await itemRows.nth(2).boundingBox();
    const bar = await bars.nth(2).boundingBox();

    await page.mouse.move(row.x + row.width - 2, bar.y + bar.height + 3);

    const tooltip = page.getByRole('tooltip').filter({
      hasText: '第 3 条消息的富文本摘要。',
    });

    await expect(tooltip).toBeVisible();
    await page.waitForTimeout(700);
    await expect(tooltip).toBeVisible();
  });
});
