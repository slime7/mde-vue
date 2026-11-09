import { expect, test } from '@playwright/test';
import { openScene } from './helpers';

async function fieldLabelPosition(page, testId, label) {
  const field = page.getByTestId(testId);
  const labelLocator = field.getByText(label, { exact: true }).last();

  return {
    field,
    labelLocator,
    async relativeTop() {
      const [fieldBox, labelBox] = await Promise.all([
        field.boundingBox(),
        labelLocator.boundingBox(),
      ]);

      return labelBox.y - fieldBox.y;
    },
  };
}

async function measureLabelDelta(page, testId, label) {
  const target = await fieldLabelPosition(page, testId, label);
  const before = await target.relativeTop();

  await target.field.locator('input').click();
  await page.waitForTimeout(500);

  return before - await target.relativeTop();
}

test.describe('文本输入与选择器密度', () => {
  test('compact 同时压缩 outlined 与 filled 字段，并保留 8px 高度差', async ({ page }) => {
    await openScene(page, 'density');

    const defaultOutlined = await page.getByTestId('text-default-outlined').boundingBox();
    const compactOutlined = await page.getByTestId('text-compact-outlined').boundingBox();
    const defaultFilled = await page.getByTestId('text-default-filled').boundingBox();
    const compactFilled = await page.getByTestId('text-compact-filled').boundingBox();

    expect(defaultOutlined.height - compactOutlined.height).toBeCloseTo(8, 0);
    expect(defaultFilled.height - compactFilled.height).toBeCloseTo(8, 0);
  });

  test('outlined 与 filled 的浮动标签在两种密度下保持相同位移', async ({ page }) => {
    await openScene(page, 'density');

    const cases = [
      { label: '默认浮动标签', testId: 'text-default-outlined' },
      { label: '紧凑浮动标签', testId: 'text-compact-outlined' },
      { label: '默认填充标签', testId: 'text-default-filled' },
      { label: '紧凑填充标签', testId: 'text-compact-filled' },
    ];
    const deltas = [
      await measureLabelDelta(page, cases[0].testId, cases[0].label),
      await measureLabelDelta(page, cases[1].testId, cases[1].label),
      await measureLabelDelta(page, cases[2].testId, cases[2].label),
      await measureLabelDelta(page, cases[3].testId, cases[3].label),
    ];

    expect(deltas[0]).toBeCloseTo(deltas[1], 0);
    expect(deltas[2]).toBeCloseTo(deltas[3], 0);
    expect(deltas[0]).toBeGreaterThan(deltas[2]);
  });

  test('compact 选择器保留菜单尺寸与选择行为', async ({ page }) => {
    await openScene(page, 'density');

    const defaultSelect = await page.getByTestId('select-default').boundingBox();
    const compactSelect = await page.getByTestId('select-compact').boundingBox();
    const compactFilled = await page.getByTestId('select-compact-filled').boundingBox();
    const compactTextField = await page.getByTestId('text-compact-outlined').boundingBox();
    const compactFilledTextField = await page.getByTestId('text-compact-filled').boundingBox();

    expect(defaultSelect.height - compactSelect.height).toBeCloseTo(8, 0);
    expect(compactSelect.height - compactFilled.height).toBeCloseTo(8, 0);
    expect(compactSelect.height).toBeCloseTo(compactTextField.height, 0);
    expect(compactFilled.height).toBeCloseTo(compactFilledTextField.height, 0);

    const field = page.getByTestId('select-compact');

    await field.getByRole('combobox').click();
    await expect(page.getByRole('menu')).toBeVisible();

    const menuItems = page.getByRole('menuitem');
    await expect(menuItems.first()).toBeVisible();
    await page.waitForTimeout(500);
    expect((await menuItems.first().boundingBox()).height).toBeCloseTo(48, 0);

    await menuItems.first().click();
    await expect(page.getByRole('menu')).toBeHidden();
    await expect(field.getByRole('combobox')).toContainText('甲');
  });
});
