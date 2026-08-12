import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import MatSelect from '../src/components/mat-select/MatSelect.vue';

function dispatchToggle(element, newState) {
  const event = new Event('toggle');

  Object.defineProperty(event, 'newState', { value: newState });
  element.dispatchEvent(event);
}

describe('MatSelect', () => {
  beforeEach(() => {
    HTMLElement.prototype.showPopover = vi.fn(function showPopover() {
      this.dataset.popoverOpen = '';
      dispatchToggle(this, 'open');
    });
    HTMLElement.prototype.hidePopover = vi.fn(function hidePopover() {
      delete this.dataset.popoverOpen;
      dispatchToggle(this, 'closed');
    });
  });

  it('解析字符串、字段映射、分组、副标题与禁用项目', async () => {
    const wrapper = mount(MatSelect, {
      attachTo: document.body,
      props: {
        modelValue: null,
        items: [
          '纯文本',
          {
            name: '普通对象', id: 2, detail: '对象说明', disabled: true,
          },
          {
            group: '分组',
            items: [{ name: '分组项目', id: true }],
          },
        ],
        itemTitle: 'name',
        itemValue: 'id',
        itemSubtitle: 'detail',
      },
    });

    await wrapper.get('[role="combobox"]').trigger('click');
    await nextTick();

    const items = wrapper.findAll('[role="menuitem"]');

    expect(items.map((item) => item.text())).toEqual([
      '纯文本', '普通对象 对象说明', '分组项目',
    ]);
    expect(items[1].attributes('disabled')).toBeDefined();
    const labelledGroup = wrapper.findAll('[role="group"]')
      .find((group) => group.attributes('aria-labelledby'));

    expect(labelledGroup?.text()).toContain('分组');
  });

  it('单选保持基础值类型、发出两个事件并关闭菜单', async () => {
    const wrapper = mount(MatSelect, {
      attachTo: document.body,
      props: {
        modelValue: null,
        items: [{ title: '数字', value: 1 }],
      },
    });

    await wrapper.get('[role="combobox"]').trigger('click');
    await nextTick();
    await wrapper.get('[role="menuitem"]').trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
    expect(wrapper.emitted('change')).toEqual([[1]]);
    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('false');
  });

  it('多选按 items 顺序展示、使用 checkbox，并在选择后保持展开', async () => {
    const wrapper = mount(MatSelect, {
      attachTo: document.body,
      props: {
        modelValue: [true, 1],
        multiple: true,
        items: [
          { title: '数字', value: 1 },
          { title: '布尔', value: true },
          { title: '其他', value: 'other' },
        ],
      },
    });

    expect(wrapper.get('[role="combobox"]').text()).toContain('数字,布尔');
    await wrapper.get('[role="combobox"]').trigger('click');
    await nextTick();

    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(3);
    await wrapper.findAll('[role="menuitem"]')[2].trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[true, 1, 'other']]);
    expect(wrapper.get('[role="menu"]').element.hidePopover).not.toHaveBeenCalled();
  });

  it('chips 可移除选中值、恢复字段焦点且不打开菜单', async () => {
    const wrapper = mount(MatSelect, {
      attachTo: document.body,
      props: {
        modelValue: ['a', 'b'],
        multiple: true,
        chips: true,
        items: [
          { title: '甲', value: 'a' },
          { title: '乙', value: 'b' },
        ],
      },
    });
    const trigger = wrapper.get('[role="combobox"]');

    await wrapper.findAllComponents({ name: 'MatChip' })[0].get('[aria-hidden="true"]:last-child').trigger('click');
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['b']]);
    expect(document.activeElement).toBe(trigger.element);
    expect(wrapper.get('[role="menu"]').element.showPopover).not.toHaveBeenCalled();
  });

  it('单选 chips 点击 x 后清空为 null', async () => {
    const wrapper = mount(MatSelect, {
      attachTo: document.body,
      props: {
        modelValue: 'a',
        chips: true,
        items: [
          { title: '甲', value: 'a' },
          { title: '乙', value: 'b' },
        ],
      },
    });
    const chip = wrapper.findComponent({ name: 'MatChip' });

    expect(chip.attributes('aria-pressed')).toBe('true');

    await chip.get('[aria-hidden="true"]:last-child').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([null]);
    expect(wrapper.emitted('change')?.at(-1)).toEqual([null]);
  });

  it('浏览器提供 ResizeObserver 时仍可挂载并展开', async () => {
    class TestResizeObserver {
      constructor() {
        this.observed = false;
      }

      observe() {
        this.observed = true;
      }

      disconnect() {
        this.observed = false;
      }
    }

    vi.stubGlobal('ResizeObserver', TestResizeObserver);
    const wrapper = mount(MatSelect, {
      attachTo: document.body,
      props: {
        modelValue: null,
        items: ['甲', '乙'],
      },
    });

    await wrapper.get('[role="combobox"]').trigger('click');
    await nextTick();

    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('true');
  });

  it('隐藏原生 select 同步表单属性、字符串值和选择状态', () => {
    const wrapper = mount(MatSelect, {
      props: {
        modelValue: [1, true],
        multiple: true,
        required: true,
        items: [
          { title: '数字', value: 1 },
          { title: '布尔', value: true },
        ],
      },
      attrs: {
        name: 'choices',
        form: 'profile-form',
      },
    });
    const select = wrapper.get('select');

    expect(select.attributes()).toMatchObject({
      name: 'choices',
      form: 'profile-form',
      multiple: '',
      required: '',
      tabindex: '-1',
      'aria-hidden': 'true',
    });
    expect(select.findAll('option').map((option) => ({
      value: option.attributes('value'),
      selected: option.element.selected,
    }))).toEqual([
      { value: '1', selected: true },
      { value: 'true', selected: true },
    ]);
  });

  it('readonly 保持可聚焦但不打开，disabled 不可聚焦', async () => {
    const readonly = mount(MatSelect, {
      props: { modelValue: null, readonly: true, items: ['甲'] },
    });
    const disabled = mount(MatSelect, {
      props: { modelValue: null, disabled: true, items: ['甲'] },
    });

    await readonly.get('[role="combobox"]').trigger('click');

    expect(readonly.get('[role="combobox"]').attributes('tabindex')).toBe('0');
    expect(readonly.get('[role="menu"]').element.showPopover).not.toHaveBeenCalled();
    expect(disabled.get('[role="combobox"]').attributes('tabindex')).toBe('-1');
  });
});
