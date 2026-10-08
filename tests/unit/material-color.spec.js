import { describe, expect, it } from 'vitest';
import {
  clearComponentColorCache,
  createMaterialScheme,
  extractColorFromImage,
  getComponentColorCacheSize,
  getComponentColorPalette,
  MAT_COLOR_ROLES,
  readMaterialColors,
} from '../../src/material-color';

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

  it('从像素数据和 ImageData 中提取主色', async () => {
    const redPixels = new Uint8ClampedArray([255, 0, 0, 255]);
    const redColor = await extractColorFromImage(redPixels);

    expect(redColor).toBe('#ff0000');

    const imageData = {
      data: new Uint8ClampedArray([0, 0, 255, 255]),
      width: 1,
      height: 1,
    };
    const blueColor = await extractColorFromImage(imageData);

    expect(blueColor).toBe('#0000ff');
  });

  it('当提取主色的参数无效时抛出 TypeError', async () => {
    await expect(() => extractColorFromImage(null)).rejects.toThrow(TypeError);
    await expect(() => extractColorFromImage(undefined)).rejects.toThrow(TypeError);
    await expect(() => extractColorFromImage('')).rejects.toThrow(TypeError);
    await expect(() => extractColorFromImage(new Uint8ClampedArray([1, 2]))).rejects.toThrow(TypeError);
  });

  it('从 HTMLCanvasElement 提取主色', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvas.getContext = () => ({
      getImageData: () => ({ data: new Uint8ClampedArray([0, 255, 0, 255]) }),
    });
    const greenColor = await extractColorFromImage(canvas);
    expect(greenColor).toBe('#00ff00');
  });
});
