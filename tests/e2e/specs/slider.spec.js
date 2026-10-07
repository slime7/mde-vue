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

test.describe('MatSlider 轨道端帽圆角', () => {
  test('首尾端帽保持尺寸对应的圆角半径与轨道高度', async ({ page }) => {
    await openScene(page, 'slider');

    const metrics = await page
      .getByTestId('extra-large-zone')
      .locator('.mat-slider')
      .evaluate((slider) => {
        const corner = getComputedStyle(slider)
          .getPropertyValue('--mat-slider-extra-large-track-corner')
          .trim();
        const trackHeight = getComputedStyle(slider)
          .getPropertyValue('--mat-slider-extra-large-track-height')
          .trim();
        const leftCap = getComputedStyle(
          slider.querySelector('.mat-slider__active-track--from-start'),
          '::before',
        );
        const rightCap = getComputedStyle(
          slider.querySelector('.mat-slider__inactive-track--after'),
          '::before',
        );

        return {
          corner,
          trackHeight,
          left: {
            width: leftCap.width,
            height: leftCap.height,
            topLeft: leftCap.borderTopLeftRadius,
            topRight: leftCap.borderTopRightRadius,
            bottomLeft: leftCap.borderBottomLeftRadius,
            bottomRight: leftCap.borderBottomRightRadius,
          },
          right: {
            width: rightCap.width,
            height: rightCap.height,
            topLeft: rightCap.borderTopLeftRadius,
            topRight: rightCap.borderTopRightRadius,
            bottomLeft: rightCap.borderBottomLeftRadius,
            bottomRight: rightCap.borderBottomRightRadius,
          },
        };
      });

    expect(metrics.left).toEqual({
      width: metrics.corner,
      height: metrics.trackHeight,
      topLeft: metrics.corner,
      topRight: '0px',
      bottomLeft: metrics.corner,
      bottomRight: '0px',
    });
    expect(metrics.right).toEqual({
      width: metrics.corner,
      height: metrics.trackHeight,
      topLeft: '0px',
      topRight: metrics.corner,
      bottomLeft: '0px',
      bottomRight: metrics.corner,
    });
  });

  test('轨道末端圆角在邻近边缘时不被压缩', async ({ page }) => {
    await openScene(page, 'slider');

    const zone = page.getByTestId('extra-large-zone');
    const slider = zone.locator('.mat-slider');

    await slider.evaluate((element) => {
      element.querySelector('.mat-slider__native-input').focus();
    });
    await page.keyboard.press('End');
    await page.keyboard.press('ArrowLeft');

    const { corner, trackHeight } = await slider.evaluate((element) => {
      const sliderStyle = getComputedStyle(element);

      return {
        corner: sliderStyle.getPropertyValue('--mat-slider-extra-large-track-corner').trim(),
        trackHeight: sliderStyle
          .getPropertyValue('--mat-slider-extra-large-track-height')
          .trim(),
      };
    });

    const cap = {};
    await expect.poll(async () => {
      Object.assign(cap, await slider.evaluate((element) => {
        const segment = element.querySelector('.mat-slider__inactive-track--after');
        const capStyle = getComputedStyle(segment, '::before');

        return {
          width: capStyle.width,
          height: capStyle.height,
          topRight: capStyle.borderTopRightRadius,
          bottomRight: capStyle.borderBottomRightRadius,
          segmentWidth: segment.getBoundingClientRect().width,
        };
      }));

      return cap.segmentWidth;
    }, { timeout: 5000 }).toBeLessThan(Number.parseFloat(corner));

    expect(cap.width).toBe(corner);
    expect(cap.height).toBe(trackHeight);
    expect(cap.topRight).toBe(corner);
    expect(cap.bottomRight).toBe(corner);
  });
});

test.describe('MatRangeSlider 轨道端帽圆角', () => {
  test('首尾端帽保持尺寸对应的圆角半径与轨道高度', async ({ page }) => {
    await openScene(page, 'slider');

    const metrics = await page
      .getByTestId('range-extra-large-zone')
      .locator('.mat-range-slider')
      .evaluate((slider) => {
        const sliderStyle = getComputedStyle(slider);
        const corner = sliderStyle
          .getPropertyValue('--mat-slider-extra-large-track-corner')
          .trim();
        const trackHeight = sliderStyle
          .getPropertyValue('--mat-slider-extra-large-track-height')
          .trim();
        const leftCap = getComputedStyle(
          slider.querySelector('.mat-range-slider__inactive-track--before'),
          '::before',
        );
        const rightCap = getComputedStyle(
          slider.querySelector('.mat-range-slider__inactive-track--after'),
          '::before',
        );

        return {
          corner,
          trackHeight,
          left: {
            width: leftCap.width,
            height: leftCap.height,
            bottomLeft: leftCap.borderBottomLeftRadius,
            topLeft: leftCap.borderTopLeftRadius,
          },
          right: {
            width: rightCap.width,
            height: rightCap.height,
            topRight: rightCap.borderTopRightRadius,
            bottomRight: rightCap.borderBottomRightRadius,
          },
        };
      });

    expect(metrics.left).toEqual({
      width: metrics.corner,
      height: metrics.trackHeight,
      topLeft: metrics.corner,
      bottomLeft: metrics.corner,
    });
    expect(metrics.right).toEqual({
      width: metrics.corner,
      height: metrics.trackHeight,
      topRight: metrics.corner,
      bottomRight: metrics.corner,
    });
  });
});
