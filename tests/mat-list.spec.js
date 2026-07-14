import { mount } from '@vue/test-utils';
import {
  createApp, h, nextTick,
} from 'vue';
import {
  describe, expect, it, vi,
} from 'vitest';
import {
  createMatUi, MatIconBtn, MatList, MatListItem,
} from '../src';

async function flushFocusManagement() {
  await nextTick();
  await Promise.resolve();
}

describe('MatList', () => {
  it('渲染普通语义列表、结构化 Slots 和自动行数', () => {
    const wrapper = mount(MatList, {
      slots: {
        default: () => h(MatListItem, null, {
          leading: () => '图标',
          overline: () => '上方文字',
          default: () => '标题',
          supporting: () => '辅助文字',
          trailing: () => '尾部',
        }),
      },
    });

    expect(wrapper.element.tagName).toBe('UL');
    expect(wrapper.classes()).toContain('mat-list--standard');
    expect(wrapper.find('li').classes()).toContain('mat-list-item--lines-3');
    expect(wrapper.find('.mat-list-item-content__leading').text()).toBe('图标');
    expect(wrapper.find('.mat-list-item-content__overline').text()).toBe('上方文字');
    expect(wrapper.find('.mat-list-item-content__label').text()).toBe('标题');
    expect(wrapper.find('.mat-list-item-content__supporting').text()).toBe('辅助文字');
    expect(wrapper.find('.mat-list-item-content__trailing').text()).toBe('尾部');
  });

  it('支持 segmented、显式行数和局部选择配色', () => {
    const wrapper = mount(MatList, {
      props: {
        variant: 'segmented',
        interaction: 'single-select',
        selected: 'one',
        color: 'tertiary',
      },
      slots: {
        default: () => h(MatListItem, { value: 'one', lines: 2 }, () => '一'),
      },
    });

    expect(wrapper.classes()).toContain('mat-list--segmented');
    expect(wrapper.attributes('style')).toContain(
      '--mat-accent-container-color: var(--mat-sys-color-tertiary-container)',
    );
    expect(wrapper.find('[role="option"]').classes()).toContain('mat-list-item--lines-2');
    expect(wrapper.find('[role="option"]').classes()).toContain('mat-list-item--selected');
  });

  it('单操作模式使用原生按钮或链接并只从主操作发出 click', async () => {
    const click = vi.fn();
    const secondaryClick = vi.fn();
    const wrapper = mount(MatList, {
      props: { interaction: 'single-action' },
      slots: {
        default: () => [
          h(MatListItem, { onClick: click }, {
            default: () => '按钮',
            trailing: () => '尾部文字',
          }),
          h(MatListItem, { href: '/detail', target: '_blank' }, () => '链接'),
          h(MatListItem, null, {
            default: () => '不包含尾部按钮',
            trailing: () => h('span', { onClick: secondaryClick }, '尾部'),
          }),
        ],
      },
    });

    const actions = wrapper.findAll('[data-mat-list-primary]');

    expect(actions[0].element.tagName).toBe('BUTTON');
    expect(actions[1].element.tagName).toBe('A');
    expect(actions[1].attributes('href')).toBe('/detail');
    expect(actions[1].attributes('target')).toBe('_blank');
    await actions[0].trigger('click');
    expect(click).toHaveBeenCalledOnce();
    expect(secondaryClick).not.toHaveBeenCalled();
  });

  it('单选保持受控状态且不会通过再次激活取消当前项', async () => {
    const wrapper = mount(MatList, {
      props: {
        interaction: 'single-select',
        selected: 'one',
        'aria-label': '单选列表',
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    await flushFocusManagement();
    const options = wrapper.findAll('[role="option"]');

    expect(wrapper.attributes('role')).toBe('listbox');
    expect(wrapper.attributes('aria-label')).toBe('单选列表');
    expect(options[0].attributes('aria-selected')).toBe('true');
    expect(options[0].attributes('tabindex')).toBe('0');
    expect(options[1].attributes('tabindex')).toBe('-1');

    await options[0].trigger('click');
    expect(wrapper.emitted('select')).toBeUndefined();

    await options[1].trigger('click');
    expect(wrapper.emitted('select')).toHaveLength(1);
    expect(wrapper.emitted('select')[0][0]).toMatchObject({
      value: 'two',
      selected: true,
      nextSelected: 'two',
    });
    expect(wrapper.emitted('select')[0][0].originalEvent).toBeInstanceOf(MouseEvent);
    expect(options[0].attributes('aria-selected')).toBe('true');
    expect(options[1].attributes('aria-selected')).toBe('false');
  });

  it('多选返回新数组并保留键盘原始事件', async () => {
    const wrapper = mount(MatList, {
      props: {
        interaction: 'multi-select',
        selected: ['one'],
      },
      slots: {
        default: () => [
          h(MatListItem, { value: 'one' }, () => '一'),
          h(MatListItem, { value: 'two' }, () => '二'),
        ],
      },
    });
    const options = wrapper.findAll('[role="option"]');

    expect(wrapper.attributes('aria-multiselectable')).toBe('true');
    await options[1].trigger('keydown', { key: ' ' });
    expect(wrapper.emitted('select')[0][0].nextSelected).toEqual(['one', 'two']);
    expect(wrapper.emitted('select')[0][0].originalEvent).toBeInstanceOf(KeyboardEvent);

    await options[0].trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')[1][0].nextSelected).toEqual([]);
  });

  it('方向键循环移动焦点并跳过禁用项', async () => {
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: { interaction: 'single-action' },
      slots: {
        default: () => [
          h(MatListItem, null, () => '一'),
          h(MatListItem, { disabled: true }, () => '二'),
          h(MatListItem, null, () => '三'),
        ],
      },
    });
    await flushFocusManagement();
    const actions = wrapper.findAll('[data-mat-list-primary]');

    expect(actions[0].attributes('tabindex')).toBe('0');
    expect(actions[1].attributes('tabindex')).toBeUndefined();
    expect(actions[2].attributes('tabindex')).toBe('-1');

    actions[0].element.focus();
    await actions[0].trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(actions[2].element);

    await actions[2].trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(actions[0].element);

    await actions[0].trigger('keydown', { key: 'ArrowUp' });
    expect(document.activeElement).toBe(actions[2].element);
    wrapper.unmount();
  });

  it('多操作模式统一管理主操作与 trailing 控件并在卸载时恢复 tabindex', async () => {
    const wrapper = mount(MatList, {
      attachTo: document.body,
      props: { interaction: 'multi-action' },
      slots: {
        default: () => h(MatListItem, null, {
          default: () => '项目',
          trailing: () => h(MatIconBtn, {
            label: '更多',
            tabindex: 2,
          }, () => 'more_vert'),
        }),
      },
    });
    await flushFocusManagement();
    const primary = wrapper.find('[data-mat-list-primary]');
    const secondary = wrapper.find('[data-mat-list-trailing] button');

    expect(primary.attributes('tabindex')).toBe('0');
    expect(secondary.attributes('tabindex')).toBe('-1');
    primary.element.focus();
    await primary.trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(secondary.element);

    const secondaryElement = secondary.element;

    wrapper.unmount();
    expect(secondaryElement.getAttribute('tabindex')).toBe('2');
  });

  it('插件全局注册 List、ListItem 和 Divider', () => {
    const app = createApp({});

    app.use(createMatUi());
    expect(app.component('mat-list')).toBe(MatList);
    expect(app.component('mat-list-item')).toBe(MatListItem);
    expect(app.component('mat-divider')).toBeDefined();
  });
});
