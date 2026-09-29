import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

/**
 * 统计涟漪宿主中当前存活的波纹元素数量。
 *
 * 宿主可能同时带有 state layer 与 ripple 两个无障碍隐藏层，因此累加所有隐藏层的子元素；
 * state layer 自身没有子元素，结果即波纹数量。
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} testId 涟漪宿主的测试标识。
 * @returns {Promise<number>}
 */
function countWaves(page, testId = 'ripple-host') {
  return page.evaluate((hostTestId) => {
    const host = document.querySelector(`[data-testid="${hostTestId}"]`);

    if (!host) {
      return 0;
    }

    return Array.from(host.querySelectorAll('[aria-hidden="true"]'))
      .reduce((total, container) => total + container.childElementCount, 0);
  }, testId);
}

async function moveMouseToHostCenter(page, testId = 'ripple-host') {
  const host = page.getByTestId(testId);
  const box = await host.boundingBox();

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
}

test.describe('v-ripple 涟漪', () => {
  test('按压出现涟漪，长按保持，释放后淡出清理', async ({ page }) => {
    await openScene(page, 'ripple');
    await moveMouseToHostCenter(page);

    await page.mouse.down();
    await expect.poll(async () => countWaves(page)).toBeGreaterThanOrEqual(1);

    await page.waitForTimeout(150);
    expect(await countWaves(page)).toBeGreaterThanOrEqual(1);

    await page.mouse.up();
    await expect.poll(async () => countWaves(page)).toBe(0);
  });

  test('快速连点后涟漪全部清理', async ({ page }) => {
    await openScene(page, 'ripple');
    await moveMouseToHostCenter(page);

    await page.mouse.down();
    await expect.poll(async () => countWaves(page)).toBeGreaterThanOrEqual(1);
    await page.mouse.up();
    await page.mouse.down();
    await page.mouse.up();

    await expect.poll(async () => countWaves(page)).toBe(0);
  });

  test('variant 选项为 dots 时波点固定不动，由与实心圆同轨迹的遮罩逐渐显示', async ({ page }) => {
    await openScene(page, 'ripple');

    const host = page.getByTestId('ripple-dots-host');
    const box = await host.boundingBox();

    // 在偏离中心的 20% 处按压，验证遮罩圆心最终仍迁移到宿主中心。
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);

    await page.mouse.down();
    await expect.poll(async () => countWaves(page, 'ripple-dots-host')).toBeGreaterThanOrEqual(1);

    const waveStyle = await page.evaluate(() => {
      const hostElement = document.querySelector('[data-testid="ripple-dots-host"]');
      const wave = hostElement?.querySelector('[aria-hidden="true"] > span');

      if (!wave) {
        return null;
      }

      const computed = getComputedStyle(wave);

      return {
        backgroundImage: computed.backgroundImage,
        backgroundPosition: computed.backgroundPosition,
        backgroundRepeat: computed.backgroundRepeat,
        clipPath: computed.clipPath,
        scale: computed.scale,
        translate: computed.translate,
      };
    });

    // 与实现一致：round 平铺把间距按宿主尺寸取整，偏移把一个完整圆点对齐到按压点。
    const dotsTileSize = (length) => (length > 0 ? length / Math.max(1, Math.round(length / 12)) : 12);

    expect(waveStyle.backgroundImage).toContain('radial-gradient');
    expect(waveStyle.backgroundPosition).toBe(`${Math.round(box.width * 0.2 - dotsTileSize(box.width) / 2)}px ${Math.round(box.height / 2 - dotsTileSize(box.height) / 2)}px`);
    expect(waveStyle.backgroundRepeat).toBe('round');
    expect(waveStyle.clipPath).toContain('circle');
    expect(waveStyle.scale).toBe('none');
    expect(waveStyle.translate).toBe('none');

    await page.waitForTimeout(300);

    const reveal = await page.evaluate(() => {
      const hostElement = document.querySelector('[data-testid="ripple-dots-host"]');
      const wave = hostElement?.querySelector('[aria-hidden="true"] > span');

      if (!wave) {
        return null;
      }

      const rect = hostElement.getBoundingClientRect();
      const match = /circle\(([\d.]+)px at ([\d.]+)px ([\d.]+)px\)/.exec(getComputedStyle(wave).clipPath);

      return {
        height: rect.height,
        radius: match ? Number(match[1]) : 0,
        width: rect.width,
        x: match ? Number(match[2]) : -1,
        y: match ? Number(match[3]) : -1,
      };
    });

    expect(reveal.radius).toBeGreaterThanOrEqual(Math.hypot(reveal.width, reveal.height) / 2 + 10 - 0.5);
    expect(reveal.x).toBeGreaterThanOrEqual(reveal.width / 2 - 1);
    expect(reveal.x).toBeLessThanOrEqual(reveal.width / 2 + 1);
    expect(reveal.y).toBeGreaterThanOrEqual(reveal.height / 2 - 1);
    expect(reveal.y).toBeLessThanOrEqual(reveal.height / 2 + 1);

    await page.mouse.up();
    await expect.poll(async () => countWaves(page, 'ripple-dots-host')).toBe(0);
  });

  test('variant 选项为 glow 时羽化光斑在按压点放大并保持，释放后淡出', async ({ page }) => {
    await openScene(page, 'ripple');

    const host = page.getByTestId('ripple-glow-host');
    const box = await host.boundingBox();

    // 在偏离中心的 20% 处按压，验证光斑圆心不向宿主中心迁移。
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);

    await page.mouse.down();
    await expect.poll(async () => countWaves(page, 'ripple-glow-host')).toBeGreaterThanOrEqual(1);

    await page.waitForTimeout(300);

    const waveStyle = await page.evaluate(() => {
      const wave = document.querySelector('[data-testid="ripple-glow-host"] [aria-hidden="true"] > span');

      if (!wave) {
        return null;
      }

      const computed = getComputedStyle(wave);

      return {
        backgroundImage: computed.backgroundImage,
        borderRadius: computed.borderRadius,
        opacity: computed.opacity,
        scale: computed.scale,
        translate: computed.translate,
      };
    });

    expect(waveStyle.backgroundImage).toContain('radial-gradient');
    expect(waveStyle.borderRadius).toBe('50%');
    expect(Number(waveStyle.opacity)).toBeGreaterThan(0);
    // 进入动画结束后光斑放大到位并保持。
    expect(waveStyle.scale).toBe('1');
    expect(waveStyle.translate).toBe('none');

    await page.mouse.up();
    await expect.poll(async () => countWaves(page, 'ripple-glow-host')).toBe(0);
  });

  test('variant 选项为 rings 时不保持按压，动画结束后自行清理', async ({ page }) => {
    await openScene(page, 'ripple');

    const host = page.getByTestId('ripple-rings-host');
    const box = await host.boundingBox();

    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);

    await page.mouse.down();
    await expect.poll(async () => countWaves(page, 'ripple-rings-host')).toBeGreaterThanOrEqual(1);

    const rings = await page.evaluate(() => {
      const wave = document.querySelector('[data-testid="ripple-rings-host"] [aria-hidden="true"] > span');

      if (!wave || !wave.firstElementChild) {
        return null;
      }

      const first = getComputedStyle(wave.firstElementChild);

      return {
        childCount: wave.childElementCount,
        waveOpacity: getComputedStyle(wave).opacity,
        firstBorderWidth: first.borderTopWidth,
        firstBorderRadius: first.borderRadius,
      };
    });

    expect(rings.childCount).toBe(2);
    // 波纹层必须真实可见，防止被基类样式的 opacity: 0 整体压住。
    expect(Number(rings.waveOpacity)).toBeGreaterThan(0);
    expect(rings.firstBorderWidth).toBe('2px');
    expect(rings.firstBorderRadius).toBe('50%');

    // 不释放指针，瞬时变体也应在播放结束后自行移除。
    await expect.poll(async () => countWaves(page, 'ripple-rings-host'), { timeout: 3000 }).toBe(0);
  });

  test('variant 选项为 burst 时放射八道光线，释放不残留', async ({ page }) => {
    await openScene(page, 'ripple');

    const host = page.getByTestId('ripple-burst-host');
    const box = await host.boundingBox();

    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);

    await page.mouse.down();
    await expect.poll(async () => countWaves(page, 'ripple-burst-host')).toBeGreaterThanOrEqual(1);

    const burst = await page.evaluate(() => {
      const wave = document.querySelector('[data-testid="ripple-burst-host"] [aria-hidden="true"] > span');

      if (!wave || !wave.firstElementChild) {
        return null;
      }

      return {
        childCount: wave.childElementCount,
        waveOpacity: getComputedStyle(wave).opacity,
        firstRotate: getComputedStyle(wave.firstElementChild).rotate,
        firstBorderRadius: getComputedStyle(wave.firstElementChild).borderRadius,
      };
    });

    expect(burst.childCount).toBe(8);
    expect(Number(burst.waveOpacity)).toBeGreaterThan(0);
    expect(burst.firstRotate).toBe('22.5deg');
    expect(burst.firstBorderRadius).toBe('2px');

    // 播放中途释放指针不应让节点残留。
    await page.waitForTimeout(150);
    await page.mouse.up();
    await expect.poll(async () => countWaves(page, 'ripple-burst-host'), { timeout: 3000 }).toBe(0);
  });
});
