import { defineComponent, h, resolveComponent } from 'vue';
import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import {
  createMatUi,
  MatBtn,
  MatBtnGroup,
  MatIconBtn,
  MatSplitBtn,
  useMatTheme,
} from '../src';
import { MAT_COLOR_ROLES } from '../src/material-color';

const SCHEME_VARIANTS = [
  'tonal-spot',
  'neutral',
  'vibrant',
  'expressive',
];

/**
 * @param {boolean} [matches]
 */
function createMatchMediaMock(matches = false) {
  const listeners = new Set();
  const mediaQuery = {
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn((eventName, listener) => {
      if (eventName === 'change') {
        listeners.add(listener);
      }
    }),
    removeEventListener: vi.fn((eventName, listener) => {
      if (eventName === 'change') {
        listeners.delete(listener);
      }
    }),
    dispatch(matchesDark) {
      mediaQuery.matches = matchesDark;

      listeners.forEach((listener) => {
        listener({ matches: matchesDark, media: mediaQuery.media });
      });
    },
  };

  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery));

  return mediaQuery;
}

describe('主题控制器', () => {
  beforeEach(() => {
    createMatchMediaMock();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('使用默认参数生成亮色 Material 配色', () => {
    const target = document.createElement('div');
    const plugin = createMatUi({
      theme: {
        target,
      },
    });

    expect(plugin.theme.mode.value).toBe('system');
    expect(plugin.theme.resolvedMode.value).toBe('light');
    expect(plugin.theme.seedColor.value).toBe('#20a6fc');
    expect(plugin.theme.schemeVariant.value).toBe('tonal-spot');
    expect(plugin.theme.contrastLevel.value).toBe(0);
    expect(target.style.getPropertyValue('--mat-sys-color-primary')).toBe('#396287');
    expect(Object.values(MAT_COLOR_ROLES)).toHaveLength(53);
    Object.values(MAT_COLOR_ROLES).forEach((tokenName) => {
      expect(target.style.getPropertyValue(`--mat-sys-color-${tokenName}`)).toMatch(/^#[\da-f]{6}$/);
    });
    expect(target.getAttribute('data-mat-theme')).toBe('light');
    expect(target.style.colorScheme).toBe('light');
  });

  it('在显式模式和系统模式之间切换', () => {
    const mediaQuery = createMatchMediaMock(false);
    const plugin = createMatUi({
      theme: {
        target: document.createElement('div'),
      },
    });

    plugin.theme.setMode('dark');
    expect(plugin.theme.mode.value).toBe('dark');
    expect(plugin.theme.resolvedMode.value).toBe('dark');

    plugin.theme.setMode('system');
    mediaQuery.dispatch(true);
    expect(plugin.theme.resolvedMode.value).toBe('dark');

    mediaQuery.dispatch(false);
    expect(plugin.theme.resolvedMode.value).toBe('light');
  });

  it('支持运行时更换种子色并让组件继续使用主题令牌', () => {
    const target = document.documentElement;
    const plugin = createMatUi({
      theme: {
        mode: 'light',
        target,
      },
    });
    const wrapper = mount(MatBtn, {
      global: {
        plugins: [plugin],
      },
    });
    const initialPrimary = target.style.getPropertyValue('--mat-sys-color-primary');

    plugin.theme.setSeedColor('#f00');

    expect(plugin.theme.seedColor.value).toBe('#ff0000');
    expect(target.style.getPropertyValue('--mat-sys-color-primary')).not.toBe(initialPrimary);
    expect(wrapper.classes()).toContain('mat-btn--filled');
    plugin.theme.dispose();
  });

  it.each(SCHEME_VARIANTS)('支持 %s 配色变体', (schemeVariant) => {
    const plugin = createMatUi({
      theme: {
        mode: 'light',
        schemeVariant,
        target: document.createElement('div'),
      },
    });

    expect(plugin.theme.schemeVariant.value).toBe(schemeVariant);
    expect(plugin.theme.target.style.getPropertyValue('--mat-sys-color-primary')).toMatch(/^#[\da-f]{6}$/);
  });

  it('接受对比度边界并拒绝越界值', () => {
    const plugin = createMatUi({
      theme: {
        contrastLevel: -1,
        target: document.createElement('div'),
      },
    });

    expect(plugin.theme.contrastLevel.value).toBe(-1);
    plugin.theme.setContrastLevel(1);
    expect(plugin.theme.contrastLevel.value).toBe(1);
    expect(() => plugin.theme.setContrastLevel(1.01)).toThrow(RangeError);
    expect(plugin.theme.contrastLevel.value).toBe(1);
  });

  it('拒绝无效的主题参数', () => {
    const target = document.createElement('div');

    expect(() => createMatUi({ theme: { mode: 'auto', target } })).toThrow(TypeError);
    expect(() => createMatUi({ theme: { seedColor: 'red', target } })).toThrow(TypeError);
    expect(() => createMatUi({ theme: { schemeVariant: 'unknown', target } })).toThrow(TypeError);
    expect(() => createMatUi({ theme: { contrastLevel: Number.NaN, target } })).toThrow(RangeError);
  });

  it('拒绝非 boolean 的组件选项', () => {
    expect(() => createMatUi({ useCursor: 'pointer' })).toThrow(TypeError);
    expect(() => createMatUi({ useMaterialSymbols: 1 })).toThrow(TypeError);
  });

  it('按插件选项启用手指指针和 Material Symbols 图标', () => {
    const plugin = createMatUi({
      useCursor: true,
      useMaterialSymbols: true,
      theme: {
        target: document.createElement('div'),
      },
    });
    const button = mount(MatBtn, {
      global: {
        plugins: [plugin],
      },
      slots: {
        icon: 'favorite',
      },
    });
    const iconButton = mount(MatIconBtn, {
      global: {
        plugins: [plugin],
      },
      props: {
        label: '收藏',
      },
      slots: {
        default: 'favorite',
      },
    });

    expect(button.classes()).toContain('mat-button-base--use-cursor');
    expect(button.find('.mat-btn__icon').classes()).toContain('mat-icon--material-symbols');
    expect(iconButton.classes()).toContain('mat-button-base--use-cursor');
    expect(iconButton.find('.mat-icon-btn__icon').classes()).toContain('mat-icon--material-symbols');
    plugin.theme.dispose();
  });

  it('dispose 清理系统主题监听且可重复调用', () => {
    const mediaQuery = createMatchMediaMock();
    const target = document.createElement('div');
    const plugin = createMatUi({
      theme: {
        target,
      },
    });

    expect(mediaQuery.addEventListener).toHaveBeenCalledOnce();

    plugin.theme.dispose();
    plugin.theme.dispose();

    expect(mediaQuery.removeEventListener).toHaveBeenCalledOnce();
    expect(target.style.getPropertyValue('--mat-sys-color-primary')).toBe('');
    expect(target.getAttribute('data-mat-theme')).toBeNull();
    expect(target.style.colorScheme).toBe('');
  });

  it('通过插件注册组件并提供 useMatTheme()', () => {
    let injectedTheme;
    const Consumer = defineComponent({
      name: 'ThemeConsumer',
      setup() {
        injectedTheme = useMatTheme();

        return () => h('div', [
          h(resolveComponent('mat-btn'), null, '主题按钮'),
          h(resolveComponent('mat-icon-btn'), { label: '图标按钮' }, () => '★'),
          h(resolveComponent('mat-btn-group'), null, () => h(resolveComponent('mat-btn'), null, '组按钮')),
          h(resolveComponent('mat-split-btn'), null, {
            leading: () => h(resolveComponent('mat-btn'), null, '主要操作'),
            trailing: () => h(resolveComponent('mat-icon-btn'), { label: '更多操作' }, () => '⌄'),
          }),
        ]);
      },
    });
    const plugin = createMatUi({
      theme: {
        mode: 'light',
        target: document.createElement('div'),
      },
    });
    const wrapper = mount(Consumer, {
      global: {
        plugins: [plugin],
      },
    });

    expect(injectedTheme).toBe(plugin.theme);
    expect(wrapper.findComponent(MatBtn).exists()).toBe(true);
    expect(wrapper.findComponent(MatIconBtn).exists()).toBe(true);
    expect(wrapper.findComponent(MatBtnGroup).exists()).toBe(true);
    expect(wrapper.findComponent(MatSplitBtn).exists()).toBe(true);
  });
});
