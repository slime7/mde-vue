import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

test.describe('MatTooltip 延迟与定位', () => {
  test('悬停后按打开延迟在目标上方显示，离开后按关闭延迟隐藏', async ({ page }) => {
    await openScene(page, 'tooltip');

    const trigger = page.getByTestId('hover-target');
    const tooltip = page.getByRole('tooltip').filter({ hasText: '自动提示内容' });

    await expect(tooltip).toHaveCount(0);
    await trigger.hover();
    await expect(tooltip).toBeVisible({ timeout: 2000 });

    const describedBy = await trigger.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();

    const targetBox = await trigger.boundingBox();
    const tooltipBox = await tooltip.boundingBox();
    expect(tooltipBox.y + tooltipBox.height).toBeLessThanOrEqual(targetBox.y + 8);
    expect(tooltipBox.x).toBeLessThan(targetBox.x + targetBox.width);
    expect(tooltipBox.x + tooltipBox.width).toBeGreaterThan(targetBox.x);

    await page.mouse.move(640, 500);
    await expect(tooltip).toBeHidden({ timeout: 2000 });
    expect(await trigger.getAttribute('aria-describedby')).toBeFalsy();
  });

  test('靠近视口边缘时提示保持完整可见', async ({ page }) => {
    await openScene(page, 'tooltip');

    await page.getByTestId('edge-target').hover();
    const tooltip = page.getByRole('tooltip').filter({ hasText: '边缘提示内容' });
    await expect(tooltip).toBeVisible({ timeout: 2000 });

    const viewport = page.viewportSize();
    const box = await tooltip.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });
});
