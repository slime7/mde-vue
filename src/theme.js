import {
  argbFromHex,
  Hct,
  hexFromArgb,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities';
import { readonly, ref } from 'vue';

const DEFAULT_SEED_COLOR = '#20a6fc';
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

const SCHEME_CONSTRUCTORS = {
  'tonal-spot': SchemeTonalSpot,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  content: SchemeContent,
  monochrome: SchemeMonochrome,
  rainbow: SchemeRainbow,
  'fruit-salad': SchemeFruitSalad,
};

const COLOR_ROLES = {
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

/** @typedef {'light' | 'dark' | 'system'} MatThemeMode */
/** @typedef {'light' | 'dark'} MatResolvedThemeMode */
/** @typedef {'tonal-spot' | 'neutral' | 'vibrant' | 'expressive' | 'fidelity' | 'content' | 'monochrome' | 'rainbow' | 'fruit-salad'} MatSchemeVariant */

/**
 * @typedef {object} MatThemeOptions
 * @property {MatThemeMode} [mode]
 * @property {string} [seedColor]
 * @property {MatSchemeVariant} [schemeVariant]
 * @property {number} [contrastLevel]
 * @property {HTMLElement} [target]
 */

/**
 * @typedef {object} MatThemeController
 * @property {Readonly<import('vue').Ref<MatThemeMode>>} mode
 * @property {Readonly<import('vue').Ref<MatResolvedThemeMode>>} resolvedMode
 * @property {Readonly<import('vue').Ref<string>>} seedColor
 * @property {Readonly<import('vue').Ref<MatSchemeVariant>>} schemeVariant
 * @property {Readonly<import('vue').Ref<number>>} contrastLevel
 * @property {HTMLElement} target
 * @property {(value: MatThemeMode) => void} setMode
 * @property {(value: string) => void} setSeedColor
 * @property {(value: MatSchemeVariant) => void} setSchemeVariant
 * @property {(value: number) => void} setContrastLevel
 * @property {() => void} dispose
 */

/**
 * @param {unknown} value
 * @returns {asserts value is MatThemeMode}
 */
function assertMode(value) {
  if (!['light', 'dark', 'system'].includes(value)) {
    throw new TypeError('theme.mode 必须是 light、dark 或 system');
  }
}

/**
 * @param {unknown} value
 * @returns {asserts value is MatSchemeVariant}
 */
function assertSchemeVariant(value) {
  if (!Object.hasOwn(SCHEME_CONSTRUCTORS, value)) {
    throw new TypeError(`不支持主题配色变体：${String(value)}`);
  }
}

/**
 * @param {unknown} value
 * @returns {asserts value is number}
 */
function assertContrastLevel(value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < -1 || value > 1) {
    throw new RangeError('theme.contrastLevel 必须是 -1 到 1 之间的有限数字');
  }
}

/**
 * @param {unknown} value
 * @returns {asserts value is HTMLElement}
 */
function assertTarget(value) {
  if (!value || typeof value !== 'object' || typeof value.style?.setProperty !== 'function') {
    throw new TypeError('theme.target 必须是可设置 CSS 自定义属性的 HTML 元素');
  }
}

/**
 * 主题种子只接受不透明的三位或六位十六进制颜色。
 *
 * @param {unknown} value
 * @returns {asserts value is string}
 */
function assertSeedColor(value) {
  if (typeof value !== 'string' || !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value)) {
    throw new TypeError('theme.seedColor 必须是 #RGB 或 #RRGGBB 格式的十六进制颜色');
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function normalizeSeedColor(value) {
  if (value.length === 4) {
    return `#${[...value.slice(1)].map((character) => character.repeat(2)).join('')}`.toLowerCase();
  }

  return value.toLowerCase();
}

/**
 * @param {MatThemeOptions} [options]
 * @returns {MatThemeController}
 */
export default function createThemeController(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('theme 选项必须是对象');
  }

  const initialMode = options.mode ?? 'system';
  const initialSeedColor = options.seedColor ?? DEFAULT_SEED_COLOR;
  const initialSchemeVariant = options.schemeVariant ?? 'tonal-spot';
  const initialContrastLevel = options.contrastLevel ?? 0;
  const target = options.target ?? document.documentElement;

  assertMode(initialMode);
  assertSeedColor(initialSeedColor);
  assertSchemeVariant(initialSchemeVariant);
  assertContrastLevel(initialContrastLevel);
  assertTarget(target);

  const mode = ref(initialMode);
  const seedColor = ref(normalizeSeedColor(initialSeedColor));
  const schemeVariant = ref(initialSchemeVariant);
  const contrastLevel = ref(initialContrastLevel);
  const resolvedMode = ref('light');

  /** @type {MediaQueryList | null} */
  let systemThemeQuery = null;
  let isListeningToSystemTheme = false;
  let isDisposed = false;

  /**
   * @returns {MediaQueryList | null}
   */
  function getSystemThemeQuery() {
    if (!systemThemeQuery && typeof window.matchMedia === 'function') {
      systemThemeQuery = window.matchMedia(SYSTEM_THEME_QUERY);
    }

    return systemThemeQuery;
  }

  /**
   * @returns {MatResolvedThemeMode}
   */
  function resolveMode() {
    if (mode.value !== 'system') {
      return mode.value;
    }

    return getSystemThemeQuery()?.matches ? 'dark' : 'light';
  }

  function applyTheme() {
    resolvedMode.value = resolveMode();

    const SchemeConstructor = SCHEME_CONSTRUCTORS[schemeVariant.value];
    const sourceColor = Hct.fromInt(argbFromHex(seedColor.value));
    const scheme = new SchemeConstructor(
      sourceColor,
      resolvedMode.value === 'dark',
      contrastLevel.value,
    );

    Object.entries(COLOR_ROLES).forEach(([role, tokenName]) => {
      target.style.setProperty(`--mat-color-${tokenName}`, hexFromArgb(scheme[role]));
    });

    target.setAttribute?.('data-mat-theme', resolvedMode.value);
    target.style.colorScheme = resolvedMode.value;
  }

  /**
   * @param {MediaQueryListEvent} event
   */
  function handleSystemThemeChange(event) {
    if (mode.value !== 'system') {
      return;
    }

    resolvedMode.value = event.matches ? 'dark' : 'light';
    applyTheme();
  }

  function stopListeningToSystemTheme() {
    if (!systemThemeQuery || !isListeningToSystemTheme) {
      return;
    }

    systemThemeQuery.removeEventListener('change', handleSystemThemeChange);
    isListeningToSystemTheme = false;
  }

  function updateSystemThemeListener() {
    stopListeningToSystemTheme();

    if (mode.value !== 'system' || isDisposed) {
      return;
    }

    const query = getSystemThemeQuery();

    if (query) {
      query.addEventListener('change', handleSystemThemeChange);
      isListeningToSystemTheme = true;
    }
  }

  /**
   * @param {MatThemeMode} value
   */
  function setMode(value) {
    assertMode(value);
    mode.value = value;
    updateSystemThemeListener();
    applyTheme();
  }

  /**
   * @param {string} value
   */
  function setSeedColor(value) {
    assertSeedColor(value);
    seedColor.value = normalizeSeedColor(value);
    applyTheme();
  }

  /**
   * @param {MatSchemeVariant} value
   */
  function setSchemeVariant(value) {
    assertSchemeVariant(value);
    schemeVariant.value = value;
    applyTheme();
  }

  /**
   * @param {number} value
   */
  function setContrastLevel(value) {
    assertContrastLevel(value);
    contrastLevel.value = value;
    applyTheme();
  }

  function dispose() {
    isDisposed = true;
    stopListeningToSystemTheme();
  }

  updateSystemThemeListener();
  applyTheme();

  return {
    mode: readonly(mode),
    resolvedMode: readonly(resolvedMode),
    seedColor: readonly(seedColor),
    schemeVariant: readonly(schemeVariant),
    contrastLevel: readonly(contrastLevel),
    target,
    setMode,
    setSeedColor,
    setSchemeVariant,
    setContrastLevel,
    dispose,
  };
}
