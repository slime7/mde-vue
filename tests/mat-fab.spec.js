import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { MatFab } from '../src';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MatFab', () => {
  it('默认渲染 medium 尺寸的纯图标 FAB', () => {
    const wrapper = mount(MatFab, {
      props: {
        icon: 'add',
        label: '创建',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.attributes('aria-label')).toBe('创建');
    expect(wrapper.text()).toBe('add');
  });

  it('默认 Slot 切换为 Extended FAB，并允许省略图标', () => {
    const withIcon = mount(MatFab, {
      props: {
        icon: 'edit',
        size: 'small',
      },
      slots: {
        default: '编辑',
      },
    });
    const withoutIcon = mount(MatFab, {
      props: {
        size: 'large',
      },
      slots: {
        default: '继续',
      },
    });

    expect(withIcon.text()).toBe('edit编辑');
    expect(withoutIcon.text()).toBe('继续');
  });

  it('expanded 控制同一 Extended FAB 在标签态与图标态之间切换', async () => {
    const wrapper = mount(MatFab, {
      props: {
        expanded: true,
        icon: 'add',
        label: '新建',
      },
      slots: {
        default: '新建',
      },
    });

    expect(wrapper.text()).toBe('add新建');
    expect(wrapper.attributes('aria-label')).toBeUndefined();

    await wrapper.setProps({ expanded: false });

    expect(wrapper.text()).toBe('add');
    expect(wrapper.attributes('aria-label')).toBe('新建');

    await wrapper.setProps({ expanded: true });

    expect(wrapper.text()).toBe('add新建');
  });

  it('图标模式将 label 作为 ARIA 名称和 Tooltip 文本，并警告缺失 label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const labelled = mount(MatFab, {
      props: {
        icon: 'settings',
        label: '设置',
      },
      attrs: {
        title: '打开设置',
      },
    });
    mount(MatFab, {
      props: {
        icon: 'settings',
      },
    });

    expect(labelled.attributes('aria-label')).toBe('设置');
    expect(labelled.attributes('title')).toBeUndefined();
    expect(labelled.findComponent({ name: 'MatTooltip' }).props('content')).toBe('打开设置');
    expect(warn).toHaveBeenCalledWith('MatFab: 图标模式必须提供非空 label');
  });

  it('透传原生属性和 click 事件', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatFab, {
      props: {
        icon: 'add',
        label: '创建',
      },
      attrs: {
        'aria-describedby': 'fab-help',
        'data-action': 'create',
        onClick: handleClick,
      },
    });

    wrapper.element.click();

    expect(wrapper.attributes('aria-describedby')).toBe('fab-help');
    expect(wrapper.attributes('data-action')).toBe('create');
    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  it('禁用时使用原生 disabled 并阻止点击', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MatFab, {
      props: {
        disabled: true,
        icon: 'add',
        label: '创建',
      },
      attrs: {
        onClick: handleClick,
      },
    });

    wrapper.element.click();

    expect(wrapper.attributes()).toHaveProperty('disabled');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('支持原生按钮 type 并拒绝不存在的尺寸', () => {
    const wrapper = mount(MatFab, {
      props: {
        icon: 'add',
        label: '创建',
        type: 'submit',
      },
    });

    expect(wrapper.attributes('type')).toBe('submit');
    expect(MatFab.props.size.validator('extra-small')).toBe(false);
    expect(MatFab.props.type.validator('link')).toBe(false);
  });
});
