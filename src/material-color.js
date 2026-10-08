import {
  argbFromHex,
  Hct,
  hexFromArgb,
  SchemeExpressive,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
  sourceColorFromImageBytes,
} from '@material/material-color-utilities';

export const MAT_SCHEME_VARIANTS = [
  'tonal-spot',
  'neutral',
  'vibrant',
  'expressive',
];

export const MAT_COLOR_ROLES = {
  primary: 'primary',
  primaryDim: 'primary-dim',
  onPrimary: 'on-primary',
  primaryContainer: 'primary-container',
  onPrimaryContainer: 'on-primary-container',
  primaryFixed: 'primary-fixed',
  primaryFixedDim: 'primary-fixed-dim',
  onPrimaryFixed: 'on-primary-fixed',
  onPrimaryFixedVariant: 'on-primary-fixed-variant',
  secondary: 'secondary',
  secondaryDim: 'secondary-dim',
  onSecondary: 'on-secondary',
  secondaryContainer: 'secondary-container',
  onSecondaryContainer: 'on-secondary-container',
  secondaryFixed: 'secondary-fixed',
  secondaryFixedDim: 'secondary-fixed-dim',
  onSecondaryFixed: 'on-secondary-fixed',
  onSecondaryFixedVariant: 'on-secondary-fixed-variant',
  tertiary: 'tertiary',
  tertiaryDim: 'tertiary-dim',
  onTertiary: 'on-tertiary',
  tertiaryContainer: 'tertiary-container',
  onTertiaryContainer: 'on-tertiary-container',
  tertiaryFixed: 'tertiary-fixed',
  tertiaryFixedDim: 'tertiary-fixed-dim',
  onTertiaryFixed: 'on-tertiary-fixed',
  onTertiaryFixedVariant: 'on-tertiary-fixed-variant',
  error: 'error',
  errorDim: 'error-dim',
  onError: 'on-error',
  errorContainer: 'error-container',
  onErrorContainer: 'on-error-container',
  background: 'background',
  onBackground: 'on-background',
  surface: 'surface',
  surfaceDim: 'surface-dim',
  surfaceBright: 'surface-bright',
  surfaceContainerLowest: 'surface-container-lowest',
  surfaceContainerLow: 'surface-container-low',
  surfaceContainer: 'surface-container',
  surfaceContainerHigh: 'surface-container-high',
  surfaceContainerHighest: 'surface-container-highest',
  onSurface: 'on-surface',
  surfaceVariant: 'surface-variant',
  onSurfaceVariant: 'on-surface-variant',
  outline: 'outline',
  outlineVariant: 'outline-variant',
  inverseSurface: 'inverse-surface',
  inverseOnSurface: 'inverse-on-surface',
  inversePrimary: 'inverse-primary',
  shadow: 'shadow',
  scrim: 'scrim',
  surfaceTint: 'surface-tint',
};

const SCHEME_CONSTRUCTORS = {
  'tonal-spot': SchemeTonalSpot,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
};
const COMPONENT_COLOR_ROLES = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
];
const COMPONENT_PALETTE_CACHE_LIMIT = 64;
const componentPaletteCache = new Map();

/**
 * 将主题种子色规范化为六位小写十六进制格式。
 *
 * @param {string} value
 * @returns {string}
 * @throws {TypeError} 颜色不是 #RGB 或 #RRGGBB 格式时抛出
 */
export function normalizeSeedColor(value) {
  if (typeof value !== 'string' || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value)) {
    throw new TypeError('颜色必须是 #RGB 或 #RRGGBB 格式的十六进制颜色');
  }

  if (value.length === 4) {
    return `#${[...value.slice(1)].map((character) => character.repeat(2)).join('')}`.toLowerCase();
  }

  return value.toLowerCase();
}

/**
 * 建立 Material 2025 phone 动态配色。
 *
 * @param {object} options
 * @param {string} options.seedColor
 * @param {boolean} options.isDark
 * @param {string} options.schemeVariant
 * @param {number} options.contrastLevel
 * @returns {import('@material/material-color-utilities').DynamicScheme}
 * @throws {Error} 依赖未按请求生成 2025 配色时抛出
 */
export function createMaterialScheme({
  seedColor,
  isDark,
  schemeVariant,
  contrastLevel,
}) {
  const SchemeConstructor = SCHEME_CONSTRUCTORS[schemeVariant];

  if (!SchemeConstructor) {
    throw new TypeError(`不支持主题配色变体：${String(schemeVariant)}`);
  }

  const sourceColor = Hct.fromInt(argbFromHex(normalizeSeedColor(seedColor)));
  const scheme = new SchemeConstructor(
    sourceColor,
    isDark,
    contrastLevel,
    '2025',
    'phone',
  );

  if (scheme.specVersion !== '2025' || scheme.platform !== 'phone') {
    throw new Error('Material Color Utilities 未生成请求的 2025 phone 配色');
  }

  return scheme;
}

/**
 * 读取配色中的指定颜色角色。
 *
 * @param {import('@material/material-color-utilities').DynamicScheme} scheme
 * @param {string[]} roles
 * @returns {Readonly<Record<string, string>>}
 */
export function readMaterialColors(scheme, roles) {
  return Object.freeze(Object.fromEntries(
    roles.map((role) => [role, hexFromArgb(scheme[role])]),
  ));
}

/**
 * 为组件自定义种子色生成亮暗 primary 色族，并复用最近的计算结果。
 *
 * @param {string} seedColor
 * @param {string} [schemeVariant]
 * @param {number} [contrastLevel]
 * @returns {Readonly<{light: Readonly<Record<string, string>>, dark: Readonly<Record<string, string>>}>}
 */
export function getComponentColorPalette(
  seedColor,
  schemeVariant = 'tonal-spot',
  contrastLevel = 0,
) {
  const normalizedSeed = normalizeSeedColor(seedColor);
  const cacheKey = `${normalizedSeed}|${schemeVariant}|${contrastLevel}|2025|phone`;
  const cached = componentPaletteCache.get(cacheKey);

  if (cached) {
    componentPaletteCache.delete(cacheKey);
    componentPaletteCache.set(cacheKey, cached);
    return cached;
  }

  const palette = Object.freeze({
    light: readMaterialColors(createMaterialScheme({
      seedColor: normalizedSeed,
      isDark: false,
      schemeVariant,
      contrastLevel,
    }), COMPONENT_COLOR_ROLES),
    dark: readMaterialColors(createMaterialScheme({
      seedColor: normalizedSeed,
      isDark: true,
      schemeVariant,
      contrastLevel,
    }), COMPONENT_COLOR_ROLES),
  });

  componentPaletteCache.set(cacheKey, palette);

  if (componentPaletteCache.size > COMPONENT_PALETTE_CACHE_LIMIT) {
    const oldestKey = componentPaletteCache.keys().next().value;
    componentPaletteCache.delete(oldestKey);
  }

  return palette;
}

/**
 * 返回当前组件配色缓存项数，供内部验证使用。
 *
 * @returns {number}
 */
export function getComponentColorCacheSize() {
  return componentPaletteCache.size;
}

/**
 * 清空组件配色缓存，供测试隔离使用。
 *
 * @returns {void}
 */
export function clearComponentColorCache() {
  componentPaletteCache.clear();
}

/**
 * 从可绘制对象中绘制并获取像素数据。
 *
 * @param {CanvasImageSource} drawable
 * @param {number} width
 * @param {number} height
 * @returns {Uint8ClampedArray}
 */
function getBytesFromDrawable(drawable, width, height) {
  if (!width || !height) {
    throw new Error('图片尺寸无效');
  }

  const canvas = document.createElement('canvas');
  const maxDimension = 128;
  const scale = Math.min(1, maxDimension / Math.max(width, height));
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));

  const context = canvas.getContext?.('2d');
  if (!context) {
    throw new Error('无法获取 Canvas 2D 绘图上下文');
  }

  context.drawImage(drawable, 0, 0, canvas.width, canvas.height);
  return context.getImageData(0, 0, canvas.width, canvas.height).data;
}

/**
 * 从 HTMLImageElement 获取像素数据。
 *
 * @param {HTMLImageElement} img
 * @returns {Promise<Uint8ClampedArray>}
 */
async function loadImageBytesFromElement(img) {
  if (!img.complete || img.naturalWidth === 0) {
    await new Promise((resolve, reject) => {
      if (img.complete && img.naturalWidth > 0) {
        resolve();
        return;
      }
      let cleanup;
      const handleLoad = () => {
        cleanup();
        resolve();
      };
      const handleError = () => {
        cleanup();
        reject(new Error('图片加载失败'));
      };
      cleanup = () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
    });
  }

  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  return getBytesFromDrawable(img, width, height);
}

/**
 * 从 URL 异步加载图片并获取像素数据。
 *
 * @param {string} url
 * @returns {Promise<Uint8ClampedArray>}
 */
async function loadImageBytesFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        resolve(loadImageBytesFromElement(img));
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    img.src = url;
  });
}

/**
 * 从各类图片源解析出像素数据。
 *
 * @param {HTMLImageElement | HTMLCanvasElement | ImageData | ImageBitmap | Blob | File | string | Uint8ClampedArray | Uint8Array} image
 * @returns {Promise<Uint8ClampedArray>}
 */
async function getImageBytes(image) {
  if (!image) {
    throw new TypeError('image 必须是 HTMLImageElement、HTMLCanvasElement、ImageData、Blob、File、图片 URL 或像素数据');
  }

  if (image instanceof Uint8ClampedArray) {
    if (image.length < 4 || image.length % 4 !== 0) {
      throw new TypeError('像素数据长度必须是 4 的正整数倍');
    }
    return image;
  }

  if (ArrayBuffer.isView(image)) {
    if (image.byteLength < 4 || image.byteLength % 4 !== 0) {
      throw new TypeError('像素数据长度必须是 4 的正整数倍');
    }
    return new Uint8ClampedArray(image.buffer, image.byteOffset, image.byteLength);
  }

  if (typeof ImageData !== 'undefined' && image instanceof ImageData) {
    return image.data;
  }

  if (typeof image === 'object' && image !== null && image.data instanceof Uint8ClampedArray) {
    return image.data;
  }

  if (typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement) {
    const context = image.getContext?.('2d');
    if (!context) {
      throw new Error('无法获取 Canvas 2D 绘图上下文');
    }
    return context.getImageData(0, 0, image.width, image.height).data;
  }

  if (typeof Blob !== 'undefined' && image instanceof Blob) {
    const objectUrl = URL.createObjectURL(image);
    try {
      return await loadImageBytesFromUrl(objectUrl);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  if (typeof image === 'string') {
    if (!image.trim()) {
      throw new TypeError('图片地址不能为空');
    }
    return loadImageBytesFromUrl(image);
  }

  if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement) {
    return loadImageBytesFromElement(image);
  }

  if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
    return getBytesFromDrawable(image, image.width, image.height);
  }

  throw new TypeError('不支持的图片或像素源类型');
}

/**
 * 从图片或像素数据中提取 Material 3 种子色（莫奈取色）。
 *
 * @param {HTMLImageElement | HTMLCanvasElement | ImageData | ImageBitmap | Blob | File | string | Uint8ClampedArray | Uint8Array} image
 * @returns {Promise<string>} 提取出的规范化十六进制种子色
 */
export async function extractColorFromImage(image) {
  const bytes = await getImageBytes(image);
  const colorInt = sourceColorFromImageBytes(bytes);
  return normalizeSeedColor(hexFromArgb(colorInt));
}
