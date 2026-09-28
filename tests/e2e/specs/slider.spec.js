import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

test.describe('MatSlider 指针几何取值', () => {
  test('点击轨道可视中点取接近中线的步长值', async ({ page }) => {
    await openScene(page, 'slider');

    const zone = page.getByTestId('slider-zone');
    const box = await zone.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

    const raw = await page
      .getByRole('slider', { name: '示例滑块' })
      .getAttribute('aria-valuenow');
    const value = Number(raw);
    expect(value).toBeGreaterThanOrEqual(40);
    expect(value).toBeLessThanOrEqual(60);
  });

  test('拖动把手按可视几何连续更新数值', async ({ page }) => {
    await openScene(page, 'slider');

    const zone = page.getByTestId('slider-zone');
    const box = await zone.boundingBox();
    const y = box.y + box.height / 2;
    const startX = box.x + box.width / 2;

    await page.mouse.move(startX, y);
    await page.mouse.down();
    for (let step = 1; step <= 10; step += 1) {
      await page.mouse.move(startX - step * 15, y, { steps: 2 });
      await page.waitForTimeout(16);
    }
    await page.mouse.up();

    await expect(page.getByTestId('slider-value')).toHaveText('0');
  });
});
