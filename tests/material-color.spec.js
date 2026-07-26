import { describe, expect, it } from 'vitest';
import {
  clearComponentColorCache,
  createMaterialScheme,
  getComponentColorCacheSize,
  getComponentColorPalette,
  MAT_COLOR_ROLES,
  readMaterialColors,
} from '../src/material-color';

describe('Material 2025 配色', () => {
  it('按 2025 phone 规格生成全局颜色角色', () => {
    const light = createMaterialScheme({
      seedColor: '#20a6fc',
      isDark: false,
      schemeVariant: 'tonal-spot',
      contrastLevel: 0,
    });
    const dark = createMaterialScheme({
      seedColor: '#20a6fc',
      isDark: true,
      schemeVariant: 'tonal-spot',
      contrastLevel: 0,
    });

    const lightColors = readMaterialColors(light, Object.keys(MAT_COLOR_ROLES));
    const darkColors = readMaterialColors(dark, Object.keys(MAT_COLOR_ROLES));

    expect(light.specVersion).toBe('2025');
    expect(dark.specVersion).toBe('2025');
    expect(Object.keys(MAT_COLOR_ROLES)).toHaveLength(53);
    expect(lightColors.primary).toBe('#396287');
    expect(lightColors.primaryDim).toBe('#2c567a');
    expect(lightColors.errorDim).toBe('#67040d');
    expect(darkColors.primary).toBe('#accaea');
    expect(darkColors.primaryDim).toBe('#9ebcdb');
    expect(darkColors.errorDim).toBe('#c54d4a');
  });

  it('缓存组件色板且最多保留 64 项', () => {
    clearComponentColorCache();
    const first = getComponentColorPalette('#123456');

    expect(getComponentColorPalette('#123456')).toBe(first);

    for (let index = 0; index < 70; index += 1) {
      getComponentColorPalette(`#${index.toString(16).padStart(6, '0')}`);
    }

    expect(getComponentColorCacheSize()).toBe(64);
  });
});
