import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

test.describe('MatAppRoot 边缘登记与断点', () => {
  test('登记边缘产生正文内边距，叠加与注销正确累加', async ({ page }) => {
    await openScene(page, 'app-root');

    const padding = page.getByTestId('padding');
    await expect(padding).toHaveText(/"top":48/, { timeout: 5000 });
    await expect(padding).toHaveText(/"right":120/);
    await expect(padding).toHaveText(/"end":120/);

    await page.getByTestId('add-top-edge').click();
    await expect(padding).toHaveText(/"top":84/, { timeout: 5000 });

    await page.getByTestId('remove-top-edge').click();
    await expect(padding).toHaveText(/"top":36/, { timeout: 5000 });
  });

  test('视口跨越断点时更新断点名称', async ({ page }) => {
    await openScene(page, 'app-root');

    const breakpoint = page.getByTestId('breakpoint');
    // 首帧测量完成前断点保持初始值 compact，先等待配置视口 1280 宽度下的稳定值再做对照。
    await expect(breakpoint).toHaveText('large', { timeout: 5000 });

    await page.setViewportSize({ width: 500, height: 800 });
    await expect(breakpoint).toHaveText('compact', { timeout: 5000 });
  });
});
