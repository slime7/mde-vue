import { expect, test } from '@playwright/test';

async function pressHost(page, testId) {
  const host = page.getByTestId(testId);
  const box = await host.boundingBox();

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(250);

  return box;
}

async function readCoverage(page, testId) {
  return page.evaluate((hostTestId) => {
    const host = document.querySelector(`[data-testid="${hostTestId}"]`);
    const row = host.closest('li') ?? host;
    const containers = [...row.querySelectorAll('[aria-hidden="true"]')]
      .filter((element) => element.childElementCount > 0);
    const ripple = containers.at(-1);

    if (!ripple) {
      return null;
    }

    const rect = ripple.getBoundingClientRect();
    const icon = row.querySelector('.mat-icon');
    const indicatorElement = icon?.closest('[class*="__indicator"]');
    const indicator = indicatorElement?.getBoundingClientRect();

    return {
      ripple: {
        height: rect.height,
        left: rect.left,
        top: rect.top,
        width: rect.width,
      },
      rippleRadius: getComputedStyle(ripple).borderRadius,
      row: {
        height: row.getBoundingClientRect().height,
        left: row.getBoundingClientRect().left,
        top: row.getBoundingClientRect().top,
        width: row.getBoundingClientRect().width,
      },
      rowRadius: getComputedStyle(row).borderRadius,
      stateRadius: getComputedStyle(row, '::before').borderRadius,
      indicator: indicator
        ? {
          height: indicator.height,
          left: indicator.left,
          top: indicator.top,
          width: indicator.width,
        }
        : null,
      indicatorRadius: indicatorElement
        ? getComputedStyle(indicatorElement).borderRadius
        : null,
    };
  }, testId);
}

function expectSameBox(actual, expected) {
  expect(actual.left).toBeCloseTo(expected.left, 0);
  expect(actual.top).toBeCloseTo(expected.top, 0);
  expect(actual.width).toBeCloseTo(expected.width, 0);
  expect(actual.height).toBeCloseTo(expected.height, 0);
}

test.describe('组件涟漪覆盖范围', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?ripple=circle#/ripple-scope');
    await page.getByTestId('ripple-nav-analytics').waitFor();
  });

  test('导航项涟漪与图标指示器状态层范围一致', async ({ page }) => {
    await pressHost(page, 'ripple-nav-analytics');

    const coverage = await readCoverage(page, 'ripple-nav-analytics');

    expect(coverage.indicator).not.toBeNull();
    expectSameBox(coverage.ripple, coverage.indicator);
    expect(coverage.rippleRadius).toBe(coverage.indicatorRadius);
    await page.mouse.up();
  });

  test('多操作列表项涟漪与整行状态层范围一致', async ({ page }) => {
    await pressHost(page, 'ripple-list-multi');

    const coverage = await readCoverage(page, 'ripple-list-multi');

    expectSameBox(coverage.ripple, coverage.row);
    expect(coverage.rippleRadius).toBe(coverage.rowRadius);
    await page.mouse.up();
  });

  test('secondary 标签页涟漪跟随状态层内缩', async ({ page }) => {
    const hostBox = await pressHost(page, 'ripple-tab');

    const coverage = await readCoverage(page, 'ripple-tab');
    const expected = {
      left: hostBox.x + 8,
      top: hostBox.y + 4,
      width: hostBox.width - 16,
      height: hostBox.height - 8,
    };

    expectSameBox(coverage.ripple, expected);
    expect(coverage.rippleRadius).toBe(coverage.stateRadius);
    await page.mouse.up();
  });
});
