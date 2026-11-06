import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

test.describe('MatAppBar 滚动反馈', () => {
  test('连续折叠按滚动距离插值，切换开关后恢复阈值折叠', async ({ page }) => {
    await openScene(page, 'app-bar');

    const scroller = page.getByTestId('scroll-target');
    const title = page.getByText('最近项目', { exact: true });
    const expandedBox = await title.boundingBox();
    const initialRange = await scroller.evaluate((element) => element.scrollHeight);

    await scroller.evaluate((element) => element.scrollTo({ top: 14 }));
    await expect.poll(async () => (await title.boundingBox()).width)
      .toBeCloseTo(expandedBox.width, 0);

    await page.getByTestId('toggle-scroll-timeline').click();
    await expect.poll(async () => (await title.boundingBox()).width / expandedBox.width)
      .toBeCloseTo(1 - (1 - 22 / 28) / 4, 2);

    await scroller.evaluate((element) => element.scrollTo({ top: 28 }));
    await expect.poll(async () => (await title.boundingBox()).width / expandedBox.width)
      .toBeCloseTo(1 - (1 - 22 / 28) / 2, 2);

    await scroller.evaluate((element) => element.scrollTo({ top: 56 }));
    await expect.poll(async () => (await title.boundingBox()).width / expandedBox.width)
      .toBeCloseTo(22 / 28, 2);
    expect(await scroller.evaluate((element) => element.scrollHeight)).toBe(initialRange);

    await scroller.evaluate((element) => element.scrollTo({ top: 14 }));
    await expect.poll(async () => (await title.boundingBox()).width / expandedBox.width)
      .toBeCloseTo(1 - (1 - 22 / 28) / 4, 2);
    await page.getByTestId('toggle-scroll-timeline').click();
    await expect.poll(async () => (await title.boundingBox()).width)
      .toBeCloseTo(expandedBox.width, 0);
  });

  test('切换规格后使用对应的连续折叠范围', async ({ page }) => {
    await openScene(page, 'app-bar');
    const scroller = page.getByTestId('scroll-target');
    const title = page.getByText('最近项目', { exact: true });
    const header = page.getByTestId('app-bar');

    await page.getByRole('combobox', { name: '应用栏规格' }).selectOption('medium-flexible');
    const expandedBox = await title.boundingBox();
    await page.getByTestId('toggle-scroll-timeline').click();
    await scroller.evaluate((element) => element.scrollTo({ top: 24 }));
    await expect.poll(async () => (await title.boundingBox()).width / expandedBox.width)
      .toBeCloseTo(1 - (1 - 22 / 24) / 2, 2);

    await page.getByRole('combobox', { name: '应用栏规格' }).selectOption('small');
    await scroller.evaluate((element) => element.scrollTo({ top: 8 }));
    await expect.poll(() => header.evaluate(
      (element) => Number(getComputedStyle(element, '::after').opacity),
    )).toBeCloseTo(0.5, 2);

    await page.getByRole('combobox', { name: '应用栏规格' }).selectOption('search');
    await expect.poll(() => header.evaluate(
      (element) => Number(getComputedStyle(element, '::after').opacity),
    )).toBeCloseTo(0.5, 2);
  });

  test('减少动态效果时保持标题尺寸且仍能滚动和填色', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openScene(page, 'app-bar');
    const title = page.getByText('最近项目', { exact: true });
    const expandedBox = await title.boundingBox();
    await page.getByTestId('toggle-scroll-timeline').click();
    await page.getByTestId('scroll-target').evaluate((element) => element.scrollTo({ top: 80 }));
    await expect.poll(() => page.getByTestId('app-bar').evaluate(
      (element) => Number(getComputedStyle(element, '::after').opacity),
    )).toBe(1);
    expect((await title.boundingBox()).width).toBeCloseTo(expandedBox.width, 0);
    await expect(page.getByText('验证连续折叠的启用与关闭', { exact: true })).toBeVisible();
  });

  [false, true].forEach((iframe) => {
    test(`连续滚轮到达边界后仍能反向滚动${iframe ? '（iframe）' : ''}`, async ({ page }) => {
      await openScene(page, 'app-bar');
      let scene = page;

      if (iframe) {
        const source = page.url();
        await page.setContent(`<iframe title="应用栏示例" src="${source}" style="width: 100%; height: 700px; border: 0"></iframe>`);
        scene = page.frameLocator('iframe');
      }

      await scene.getByTestId('toggle-scroll-timeline').click();
      const scroller = scene.getByTestId('scroll-target');
      const box = await scroller.boundingBox();
      const range = await scroller.evaluate((element) => element.scrollHeight - element.clientHeight);

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      for (let cycle = 0; cycle < 4; cycle += 1) {
        for (let step = 0; step < 12; step += 1) {
          await page.mouse.wheel(0, 120);
        }
        await expect.poll(() => scroller.evaluate((element) => element.scrollTop), { timeout: 800 })
          .toBeGreaterThan(range - 2);
        await page.mouse.wheel(0, -120);
        await expect.poll(() => scroller.evaluate((element) => element.scrollTop), { timeout: 800 })
          .toBeLessThan(range - 40);

        for (let step = 0; step < 12; step += 1) {
          await page.mouse.wheel(0, -120);
        }
        await expect.poll(() => scroller.evaluate((element) => element.scrollTop), { timeout: 800 })
          .toBeLessThan(2);
        await page.mouse.wheel(0, 120);
        await expect.poll(() => scroller.evaluate((element) => element.scrollTop), { timeout: 800 })
          .toBeGreaterThan(40);
      }
      expect(await scroller.evaluate((element) => element.scrollHeight - element.clientHeight)).toBe(range);
    });
  });

  test('关闭连续折叠时仍以滚动状态过渡表面色', async ({ page }) => {
    await openScene(page, 'app-bar');

    const scroller = page.getByTestId('scroll-target');
    const header = page.getByTestId('app-bar');

    await expect.poll(() => header.evaluate(
      (element) => Number(getComputedStyle(element, '::after').opacity),
    )).toBe(0);

    await scroller.evaluate((element) => element.scrollTo({ top: 80 }));

    await expect.poll(() => header.evaluate(
      (element) => Number(getComputedStyle(element, '::after').opacity),
    )).toBeGreaterThan(0.9);
  });

  test('关闭连续折叠时越过阈值后折叠，回到顶部后展开', async ({ page }) => {
    await openScene(page, 'app-bar');

    const scroller = page.getByTestId('scroll-target');
    const title = page.getByText('最近项目', { exact: true });
    const expandedBox = await title.boundingBox();

    await scroller.evaluate((element) => element.scrollTo({ top: 8 }));
    await page.waitForTimeout(100);
    const belowThresholdBox = await title.boundingBox();

    expect(Math.abs(belowThresholdBox.width - expandedBox.width)).toBeLessThan(1);

    await scroller.evaluate((element) => element.scrollTo({ top: 40 }));
    await expect.poll(async () => (await title.boundingBox()).width)
      .toBeLessThan(expandedBox.width * 0.9);

    await scroller.evaluate((element) => element.scrollTo({ top: 0 }));
    await expect.poll(async () => (await title.boundingBox()).width)
      .toBeGreaterThan(expandedBox.width * 0.98);
  });
});
