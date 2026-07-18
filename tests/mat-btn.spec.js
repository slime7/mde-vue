import { mount } from '@vue/test-utils';
import { h } from 'vue';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { MatBtn, MatIcon } from '../src';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MatBtn', () => {
  it('block 默认关闭，启用后切换根布局且不透传原生属性', () => {
    const defaultButton = mount(MatBtn);
    const blockButton = mount(MatBtn, { props: { block: true } });

    expect(defaultButton.classes()).not.toContain('mat-button-base--block');
    expect(blockButton.classes()).toContain('mat-button-base--block');
    expect(blockButton.attributes('block')).toBeUndefined();
  });

  it('默认渲染 filled 按钮并避免意外提交表单', () => {
    const wrapper = mount(MatBtn, {
      slots: {
        default: '保存',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('mat-btn--filled');
    expect(wrapper.classes()).toContain('mat-btn--size-small');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.text()).toBe('保存');
    expect(wrapper.classes()).not.toContain('mat-button-base--use-cursor');
  });

  it.each(['elevated', 'filled', 'filled-tonal', 'outlined', 'text', 'standard'])(
    '支持 %s 外观',
    (variant) => {
      const button = mount(MatBtn, {
        props: {
          variant,
        },
      });
      const iconButton = mount(MatBtn, {
        props: {
          icon: 'favorite',
          label: '收藏',
          variant,
        },
      });

      expect(button.classes()).toContain(`mat-btn--${variant}`);
      expect(iconButton.classes()).toContain(`mat-btn--${variant}`);
      expect(iconButton.classes()).toContain('mat-btn--icon');
    },
  );

  it('透传原生属性和事件', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatBtn, {
      attrs: {
        'aria-label': '执行保存',
        'data-action': 'save',
        onClick: handleClick,
      },
    });

    wrapper.element.click();

    expect(wrapper.attributes('aria-label')).toBe('执行保存');
    expect(wrapper.attributes('data-action')).toBe('save');
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('禁用时阻止原生点击事件', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatBtn, {
      props: {
        disabled: true,
      },
      attrs: {
        onClick: handleClick,
      },
    });

    wrapper.element.click();

    expect(wrapper.attributes()).toHaveProperty('disabled');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('允许显式设置原生按钮类型', () => {
    const wrapper = mount(MatBtn, {
      props: {
        type: 'submit',
      },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('快速点击时保持足够长的按下状态以完成圆角过渡', async () => {
    vi.useFakeTimers();
    const wrapper = mount(MatBtn);

    try {
      wrapper.element.dispatchEvent(new MouseEvent('pointerdown', {
        bubbles: true,
        button: 0,
      }));
      await wrapper.vm.$nextTick();
      expect(wrapper.classes()).toContain('mat-button-base--pressed');

      wrapper.element.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
      await wrapper.vm.$nextTick();
      await vi.advanceTimersByTimeAsync(149);
      expect(wrapper.classes()).toContain('mat-button-base--pressed');

      await vi.advanceTimersByTimeAsync(1);
      expect(wrapper.classes()).not.toContain('mat-button-base--pressed');
    } finally {
      vi.useRealTimers();
    }
  });

  it.each(['extra-small', 'small', 'medium', 'large', 'extra-large'])('支持 %s 尺寸', (size) => {
    const wrapper = mount(MatBtn, {
      props: {
        size,
      },
    });

    expect(wrapper.classes()).toContain(`mat-btn--size-${size}`);
  });

  it('拒绝旧尺寸缩写和 tonal 变体', () => {
    expect(MatBtn.props.size.validator('s')).toBe(false);
    expect(MatBtn.props.variant.validator('tonal')).toBe(false);
  });

  it('支持方形、前后图标和受控选择内容，prop 优先于同名 Slot', () => {
    const wrapper = mount(MatBtn, {
      props: {
        prefix: 'favorite',
        shape: 'square',
        suffix: 'arrow_forward',
        toggle: true,
        selected: true,
      },
      slots: {
        default: '收藏',
        prefix: '<span>前置 Slot</span>',
        selected: '已收藏',
        suffix: '<span>后置 Slot</span>',
      },
    });

    expect(wrapper.classes()).toContain('mat-btn--shape-square');
    expect(wrapper.classes()).toContain('mat-btn--selected');
    expect(wrapper.attributes('aria-pressed')).toBe('true');
    expect(wrapper.text()).toContain('favorite');
    expect(wrapper.text()).toContain('已收藏');
    expect(wrapper.text()).toContain('arrow_forward');
    expect(wrapper.text()).not.toContain('前置 Slot');
    expect(wrapper.text()).not.toContain('后置 Slot');
  });

  it('没有 prefix 和 suffix prop 时使用同名 Slot', () => {
    const wrapper = mount(MatBtn, {
      slots: {
        default: '收藏',
        prefix: '<span class="prefix-slot">☆</span>',
        suffix: '<span class="suffix-slot">→</span>',
      },
    });

    expect(wrapper.get('.prefix-slot').text()).toBe('☆');
    expect(wrapper.get('.suffix-slot').text()).toBe('→');
  });

  it('icon 字符串切换图标模式并忽略标签、prefix 和 suffix 内容', () => {
    const wrapper = mount(MatBtn, {
      props: {
        icon: 'more_vert',
        label: '更多操作',
        prefix: 'favorite',
        suffix: 'arrow_forward',
      },
      attrs: {
        title: '打开更多操作',
      },
      slots: {
        default: '不应显示的标签',
        prefix: '<span>不应显示的前置 Slot</span>',
        suffix: '<span>不应显示的后置 Slot</span>',
      },
    });

    expect(wrapper.classes()).toContain('mat-btn--icon');
    expect(wrapper.classes()).toContain('mat-btn--width-uniform');
    expect(wrapper.classes()).toContain('mat-btn--shape-round');
    expect(wrapper.attributes('aria-label')).toBe('更多操作');
    expect(wrapper.attributes('title')).toBeUndefined();
    expect(wrapper.findComponent({ name: 'MatTooltip' }).props('content')).toBe('打开更多操作');
    expect(wrapper.text()).toBe('more_vert');
  });

  it('icon=true 从默认 Slot 读取 Material Symbols 文本', () => {
    const wrapper = mount(MatBtn, {
      props: {
        icon: true,
        label: '主页',
      },
      slots: {
        default: 'home',
      },
    });

    expect(wrapper.classes()).toContain('mat-btn--icon');
    expect(wrapper.attributes('aria-label')).toBe('主页');
    expect(wrapper.findComponent(MatIcon).text()).toBe('home');
  });

  it('icon 字符串优先于默认 Slot 文本', () => {
    const wrapper = mount(MatBtn, {
      props: {
        icon: 'settings',
        label: '设置',
      },
      slots: {
        default: '不应渲染的图标',
      },
    });

    expect(wrapper.findComponent(MatIcon).text()).toBe('settings');
    expect(wrapper.text()).not.toContain('不应渲染的图标');
  });

  it('不使用 icon 时允许默认 Slot 直接放置 MatIcon', () => {
    const wrapper = mount(MatBtn, {
      slots: {
        default: () => h(MatIcon, {
          icon: 'home',
          'aria-hidden': 'true',
        }),
      },
    });

    expect(wrapper.classes()).not.toContain('mat-btn--icon');
    expect(wrapper.findComponent(MatIcon).exists()).toBe(true);
    expect(wrapper.findComponent(MatIcon).text()).toBe('home');
  });

  it('图标模式优先使用显式 aria-label，title 覆盖 Tooltip 文本', () => {
    const wrapper = mount(MatBtn, {
      props: {
        icon: 'settings',
        label: '设置',
      },
      attrs: {
        'aria-label': '打开设置',
        title: '设置说明',
      },
    });

    expect(wrapper.attributes('aria-label')).toBe('打开设置');
    expect(wrapper.attributes('title')).toBeUndefined();
    expect(wrapper.findComponent({ name: 'MatTooltip' }).props('content')).toBe('设置说明');
  });

  it('图标模式将 label 交给 Tooltip，并在缺少可访问名称时发出警告', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const labelled = mount(MatBtn, {
      props: {
        icon: 'settings',
        label: '设置',
      },
    });
    mount(MatBtn, {
      props: {
        icon: 'settings',
      },
    });

    expect(labelled.attributes('title')).toBeUndefined();
    expect(labelled.findComponent({ name: 'MatTooltip' }).props('content')).toBe('设置');
    expect(warn).toHaveBeenCalledWith('MatBtn: 图标模式必须提供非空 label 或 aria-label');
  });

  it('icon=true 缺少默认 Slot 图标文本时发出警告', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(MatBtn, {
      props: {
        icon: true,
        label: '主页',
      },
    });

    expect(warn).toHaveBeenCalledWith('MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本');
  });

  it.each(['narrow', 'uniform', 'wide'])('图标模式支持 %s 宽度', (width) => {
    const wrapper = mount(MatBtn, {
      props: {
        icon: 'star',
        label: '收藏',
        width,
      },
    });

    expect(wrapper.classes()).toContain(`mat-btn--width-${width}`);
  });

  it('图标模式受控 toggle 复用 icon 并通过 fill 轴表达选中状态', () => {
    const wrapper = mount(MatBtn, {
      props: {
        icon: 'favorite',
        label: '收藏',
        selected: true,
        toggle: true,
      },
    });

    expect(wrapper.classes()).toContain('mat-btn--selected');
    expect(wrapper.attributes('aria-pressed')).toBe('true');
    expect(wrapper.get('.mat-btn__icon').attributes('style')).toContain("'FILL' 1");
  });

  it.each([
    {
      name: '普通按钮',
      props: { shape: 'square', toggle: true, selected: true },
      slots: { default: '保存' },
    },
    {
      name: '图标按钮',
      props: {
        icon: true,
        label: '收藏',
        shape: 'square',
        toggle: true,
        selected: true,
      },
      slots: { default: 'favorite' },
    },
  ])('%s 与普通按钮复用选择、形状和事件状态', ({ props, slots }) => {
    const handleClick = vi.fn();
    const wrapper = mount(MatBtn, {
      props,
      slots,
      attrs: { onClick: handleClick },
    });

    wrapper.element.click();

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'mat-btn--shape-square',
      'mat-btn--toggle',
      'mat-btn--selected',
    ]));
    expect(wrapper.attributes('aria-pressed')).toBe('true');
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('语义 color 映射项目令牌，自定义种子色生成局部亮暗配色', () => {
    const semantic = mount(MatBtn, {
      props: {
        color: 'tertiary',
      },
    });
    const custom = mount(MatBtn, {
      props: {
        color: '#ff0000',
      },
    });

    expect(semantic.attributes('style')).toContain('--mat-accent-color: var(--mat-sys-color-tertiary)');
    expect(custom.attributes('style')).toMatch(/--mat-accent-color: light-dark\(#[\da-f]{6}, #[\da-f]{6}\)/);
  });

  it('color prop 优先于调用方设置的同名局部 CSS 变量', () => {
    const wrapper = mount(MatBtn, {
      props: {
        color: 'secondary',
      },
      attrs: {
        style: '--mat-accent-color: hotpink;',
      },
    });

    expect(wrapper.element.style.getPropertyValue('--mat-accent-color')).toBe('var(--mat-sys-color-secondary)');
  });

  it('text 不进入 toggle 状态', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(MatBtn, {
      props: {
        variant: 'text',
        toggle: true,
        selected: true,
      },
    });

    expect(wrapper.classes()).not.toContain('mat-btn--toggle');
    expect(wrapper.attributes('aria-pressed')).toBeUndefined();
    expect(warn).toHaveBeenCalledOnce();
  });
});
