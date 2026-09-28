import { expect, test } from '@playwright/test';
import { openScene, readEvents, waitForEvent } from './helpers';

const HANDLE_NAME = '调整面板高度';

async function openSheet(page) {
  await page.getByTestId('open-sheet').click();
  const dialog = page.locator('dialog[open]');
  await expect(dialog).toBeVisible();
  await waitForEvent(page, 'opened');
  return dialog.getByRole('button', { name: HANDLE_NAME });
}

async function dragHandle(page, handle, offsetY) {
  const box = await handle.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  const steps = 12;

  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let step = 1; step <= steps; step += 1) {
    await page.mouse.move(x, y + (offsetY * step) / steps);
    await page.waitForTimeout(24);
  }
  await page.mouse.up();
}

test.describe('MatBottomSheet 档位与拖动', () => {
  test('键盘操作把手在 normal 与 max 间切换并请求关闭', async ({ page }) => {
    await openScene(page, 'bottom-sheet');
    const handle = await openSheet(page);
    await expect(page.getByTestId('expanded-tier')).toHaveText('normal');

    await handle.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('expanded-tier')).toHaveText('max');

    // 等待高度过渡动画结束，避免断言与后续拖拽取到运动中的几何。
    await page.waitForTimeout(800);

    const content = page.getByTestId('sheet-content');
    const contentBox = await content.boundingBox();
    expect(contentBox.y + contentBox.height).toBeLessThanOrEqual(page.viewportSize().height);

    await page.keyboard.press('Enter');
    await waitForEvent(page, 'closed');
    await expect(page.locator('dialog[open]')).toHaveCount(0);
  });

  test('向上拖动把手释放后吸附到 max 档', async ({ page }) => {
    await openScene(page, 'bottom-sheet');
    const handle = await openSheet(page);
    await expect(page.getByTestId('expanded-tier')).toHaveText('normal');

    await dragHandle(page, handle, -320);

    await expect(page.getByTestId('expanded-tier')).toHaveText('max', { timeout: 5000 });
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'expanded', payload: 'max' });
  });

  test('向下拖入关闭分区释放后请求关闭', async ({ page }) => {
    await openScene(page, 'bottom-sheet');
    const handle = await openSheet(page);
    await expect(page.getByTestId('expanded-tier')).toHaveText('normal');

    // 先键盘切到 max 档，保证向下拖拽有足够的视口余量进入关闭分区。
    await handle.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('expanded-tier')).toHaveText('max');

    // 等待高度过渡动画结束，避免拖拽从过期的把手坐标起步。
    await page.waitForTimeout(800);

    const box = await handle.boundingBox();
    const viewport = page.viewportSize();
    const startY = box.y + box.height / 2;
    await dragHandle(page, handle, viewport.height - 2 - startY);

    await waitForEvent(page, 'closed');
    await expect(page.locator('dialog[open]')).toHaveCount(0);
  });
});
