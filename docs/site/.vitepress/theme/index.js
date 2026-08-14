import './custom.css';
import DefaultTheme from 'vitepress/theme-without-fonts';
import { watch } from 'vue';
import { createMatUi } from 'mde-vue';
import DocsPreview from './DocsPreview.vue';

const DOCS_THEME_STORAGE_KEY = 'mde-vue.docs.theme';
const THEME_MODES = ['light', 'dark', 'system'];
const SCHEME_VARIANTS = ['tonal-spot', 'neutral', 'vibrant', 'expressive'];
const SEED_COLOR_PATTERN = /^#(?:[\da-f]{3}|[\da-f]{6})$/i;

/**
 * @returns {{
 *   mode?: 'light' | 'dark' | 'system',
 *   seedColor?: string,
 *   schemeVariant?: 'tonal-spot' | 'neutral' | 'vibrant' | 'expressive',
 *   contrastLevel?: number
 * }}
 */
function readStoredThemeOptions() {
  try {
    const storedValue = window.localStorage.getItem(DOCS_THEME_STORAGE_KEY);

    if (!storedValue) {
      return {};
    }

    const storedTheme = JSON.parse(storedValue);

    if (!storedTheme || typeof storedTheme !== 'object' || Array.isArray(storedTheme)) {
      return {};
    }

    /** @type {{
     *   mode?: 'light' | 'dark' | 'system',
     *   seedColor?: string,
     *   schemeVariant?: 'tonal-spot' | 'neutral' | 'vibrant' | 'expressive',
     *   contrastLevel?: number
     * }} */
    const themeOptions = {};

    if (THEME_MODES.includes(storedTheme.mode)) {
      themeOptions.mode = storedTheme.mode;
    }

    if (typeof storedTheme.seedColor === 'string' && SEED_COLOR_PATTERN.test(storedTheme.seedColor)) {
      themeOptions.seedColor = storedTheme.seedColor;
    }

    if (SCHEME_VARIANTS.includes(storedTheme.schemeVariant)) {
      themeOptions.schemeVariant = storedTheme.schemeVariant;
    }

    if (typeof storedTheme.contrastLevel === 'number'
      && Number.isFinite(storedTheme.contrastLevel)
      && storedTheme.contrastLevel >= -1
      && storedTheme.contrastLevel <= 1) {
      themeOptions.contrastLevel = storedTheme.contrastLevel;
    }

    return themeOptions;
  } catch {
    return {};
  }
}

/**
 * @param {'light' | 'dark' | 'system'} mode
 * @param {string} seedColor
 * @param {'tonal-spot' | 'neutral' | 'vibrant' | 'expressive'} schemeVariant
 * @param {number} contrastLevel
 * @returns {void}
 */
function persistThemeOptions(mode, seedColor, schemeVariant, contrastLevel) {
  try {
    window.localStorage.setItem(DOCS_THEME_STORAGE_KEY, JSON.stringify({
      mode,
      seedColor,
      schemeVariant,
      contrastLevel,
    }));
  } catch {
    // localStorage 不可用时仍使用当前会话主题。
  }
}

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DocsPreview', DocsPreview);

    if (typeof document !== 'undefined') {
      const matUi = createMatUi({
        iconClass: 'material-symbols-outlined',
        theme: readStoredThemeOptions(),
      });

      app.use(matUi);
      watch(() => matUi.theme.resolvedMode.value, (mode) => {
        document.documentElement.classList.toggle('dark', mode === 'dark');
      }, { immediate: true });
      watch(() => [
        matUi.theme.mode.value,
        matUi.theme.seedColor.value,
        matUi.theme.schemeVariant.value,
        matUi.theme.contrastLevel.value,
      ], ([mode, seedColor, schemeVariant, contrastLevel]) => {
        persistThemeOptions(mode, seedColor, schemeVariant, contrastLevel);
      }, { immediate: true });
    }
  },
};
