import {
  argbFromHex,
  Hct,
  hexFromArgb,
  SchemeExpressive,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities';

export const MAT_SCHEME_VARIANTS = [
  'tonal-spot',
  'neutral',
  'vibrant',
  'expressive',
];

export const MAT_COLOR_ROLES = {
  primary: 'primary',
  onPrimary: 'on-primary',
  primaryContainer: 'primary-container',
  onPrimaryContainer: 'on-primary-container',
  primaryFixed: 'primary-fixed',
  primaryFixedDim: 'primary-fixed-dim',
  onPrimaryFixed: 'on-primary-fixed',
  onPrimaryFixedVariant: 'on-primary-fixed-variant',
  secondary: 'secondary',
  onSecondary: 'on-secondary',
  secondaryContainer: 'secondary-container',
  onSecondaryContainer: 'on-secondary-container',
  secondaryFixed: 'secondary-fixed',
  secondaryFixedDim: 'secondary-fixed-dim',
  onSecondaryFixed: 'on-secondary-fixed',
  onSecondaryFixedVariant: 'on-secondary-fixed-variant',
  tertiary: 'tertiary',
  onTertiary: 'on-tertiary',
  tertiaryContainer: 'tertiary-container',
  onTertiaryContainer: 'on-tertiary-container',
  tertiaryFixed: 'tertiary-fixed',
  tertiaryFixedDim: 'tertiary-fixed-dim',
  onTertiaryFixed: 'on-tertiary-fixed',
  onTertiaryFixedVariant: 'on-tertiary-fixed-variant',
  error: 'error',
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
