import { computed, inject, unref } from 'vue';
import { getComponentColorPalette } from '../material-color';
import MAT_THEME_KEY from '../theme-context';
import {
  COMPONENT_COLORS,
  isComponentColor,
  SYSTEM_COLOR_CONTENT,
  SYSTEM_COLOR_ROLES,
} from './button-props';

const DEFAULT_SCHEME_VARIANT = 'tonal-spot';
const DEFAULT_CONTRAST_LEVEL = 0;

/**
 * 建立组件强调色的局部 CSS 变量。
 *
 * @param {import('vue').MaybeRefOrGetter<string | undefined>} color
 * @returns {{colorStyle: import('vue').ComputedRef<Record<string, string>>, hasExplicitColor: import('vue').ComputedRef<boolean>}}
 */
export default function useComponentColor(color) {
  const theme = inject(MAT_THEME_KEY, null);
  const hasExplicitColor = computed(() => unref(color) !== undefined);
  const colorStyle = computed(() => {
    const value = unref(color);

    if (!value || !isComponentColor(value)) {
      return {};
    }

    if (COMPONENT_COLORS.includes(value)) {
      return {
        '--mat-accent-color': `var(--mat-sys-color-${value})`,
        '--mat-on-accent-color': `var(--mat-sys-color-on-${value})`,
        '--mat-accent-container-color': `var(--mat-sys-color-${value}-container)`,
        '--mat-on-accent-container-color': `var(--mat-sys-color-on-${value}-container)`,
      };
    }

    if (SYSTEM_COLOR_ROLES.includes(value)) {
      const contentRole = SYSTEM_COLOR_CONTENT[value];

      return {
        '--mat-accent-color': `var(--mat-sys-color-${value})`,
        '--mat-on-accent-color': `var(--mat-sys-color-${contentRole})`,
        '--mat-accent-container-color': `var(--mat-sys-color-${value})`,
        '--mat-on-accent-container-color': `var(--mat-sys-color-${contentRole})`,
      };
    }

    const palette = getComponentColorPalette(
      value,
      theme?.schemeVariant.value ?? DEFAULT_SCHEME_VARIANT,
      theme?.contrastLevel.value ?? DEFAULT_CONTRAST_LEVEL,
    );

    return {
      '--mat-accent-color': `light-dark(${palette.light.primary}, ${palette.dark.primary})`,
      '--mat-on-accent-color': `light-dark(${palette.light.onPrimary}, ${palette.dark.onPrimary})`,
      '--mat-accent-container-color': `light-dark(${palette.light.primaryContainer}, ${palette.dark.primaryContainer})`,
      '--mat-on-accent-container-color': `light-dark(${palette.light.onPrimaryContainer}, ${palette.dark.onPrimaryContainer})`,
    };
  });

  return {
    colorStyle,
    hasExplicitColor,
  };
}
