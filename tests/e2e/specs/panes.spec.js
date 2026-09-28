import { expect, test } from '@playwright/test';
import { openScene, readEvents } from './helpers';

test.describe('MatPanes 分隔条拖拽', () => {
  test('拖动分隔条实时改变可视宽度，释放后提交新权重', async ({ page }) => {
    await openScene(page, 'panes');

    const left = page.getByTestId('pane-left');
    const before = await left.boundingBox();
    expect(before.width).toBeGreaterThan(350);
    expect(before.width).toBeLessThan(450);

    const separator = page.locator('[role="separator"]').first();
    const sepBox = await separator.boundingBox();
    const y = sepBox.y + sepBox.height / 2;

    await page.mouse.move(sepBox.x + sepBox.width / 2, y);
    await page.mouse.down();
    for (let step = 1; step <= 10; step += 1) {
      await page.mouse.move(sepBox.x + step * 15, y);
      await page.waitForTimeout(16);
    }
    await page.mouse.up();

    await expect.poll(async () => readEvents(page)).toContainEqual(
      expect.objectContaining({
        name: 'sizes',
        payload: expect.objectContaining({ left: expect.any(Number), right: expect.any(Number) }),
      }),
    );

    const after = await left.boundingBox();
    expect(after.width).toBeGreaterThan(before.width + 60);
  });
});
