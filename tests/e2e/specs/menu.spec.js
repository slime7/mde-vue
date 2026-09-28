import { expect, test } from '@playwright/test';
import { clearEvents, openScene, readEvents } from './helpers';

test.describe('MatMenu 浮层定位与交互', () => {
  test('activator 打开菜单并锚定在触发器下方，点击项目后关闭', async ({ page }) => {
    await openScene(page, 'menu');
    const activator = page.getByTestId('open-basic');
    await activator.click();

    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();
    await expect(menu).toContainText('剪切');

    const anchorBox = await activator.boundingBox();
    const menuBox = await menu.boundingBox();
    expect(menuBox.y).toBeGreaterThanOrEqual(anchorBox.y + anchorBox.height - 4);
    expect(menuBox.x).toBeLessThan(anchorBox.x + anchorBox.width);
    expect(menuBox.x + menuBox.width).toBeGreaterThan(anchorBox.x);

    await clearEvents(page);
    await page.getByTestId('item-cut').click();
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'menu-item', payload: 'cut' });
    await expect(menu).toBeHidden();
  });

  test('真实指针点击禁用项目不激活且不关闭菜单', async ({ page }) => {
    await openScene(page, 'menu');
    await page.getByTestId('open-basic').click();

    const menu = page.getByRole('menu');
    const disabledItem = page.getByTestId('item-disabled');
    await expect(disabledItem).toBeVisible();

    const box = await disabledItem.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

    await page.waitForTimeout(300);
    const events = await readEvents(page);
    expect(events.filter((item) => item.name === 'menu-item')).toHaveLength(0);
    await expect(menu).toBeVisible();
  });

  test('键盘导航跳过禁用项目并激活聚焦项', async ({ page }) => {
    await openScene(page, 'menu');
    await page.getByTestId('open-basic').click();

    await expect(page.getByTestId('item-cut')).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('item-copy')).toBeFocused();

    await clearEvents(page);
    await page.keyboard.press('Enter');
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'menu-item', payload: 'copy' });
    await expect(page.getByRole('menu')).toBeHidden();
  });

  test('视口边缘打开时菜单保持完整可见', async ({ page }) => {
    await openScene(page, 'menu');
    await page.getByTestId('open-clamp').click();

    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();

    const viewport = page.viewportSize();
    const box = await menu.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });

  test('指针悬停打开子菜单，激活子项目后整条菜单链关闭', async ({ page }) => {
    await openScene(page, 'menu');
    await page.getByTestId('open-submenu').click();

    const parent = page.getByTestId('submenu-parent');
    await expect(parent).toBeVisible();
    await parent.hover();

    await expect(page.getByTestId('submenu-pdf')).toBeVisible();

    await clearEvents(page);
    await page.getByTestId('submenu-pdf').click();
    await expect.poll(() => readEvents(page)).toContainEqual({ name: 'menu-item', payload: 'pdf' });
    await expect(page.getByRole('menu')).toHaveCount(0);
  });
});
