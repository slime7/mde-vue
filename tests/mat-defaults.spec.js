import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  createApp, defineComponent, h, nextTick, resolveComponent,
} from 'vue';
import { mount } from '@vue/test-utils';
import {
  afterEach, beforeAll, describe, expect, it, vi,
} from 'vitest';
import {
  createMatUi,
  dialog,
  MatBtn,
  useMatProps,
} from '../src';
import MAT_UI_KEY, { matComponentKey } from '../src/mat-ui-context';
import { GLOBAL_COMPONENTS } from '../src/plugin';

// eslint-disable-next-line vue/one-component-per-file -- 仅用于验证 useMatProps 合并语义。
const DefaultsHarness = defineComponent({
  name: 'MatDefaultsHarness',
  props: {
    label: {
      type: [String, Number, Boolean],
      default: 'definition-default',
    },
  },
  setup(props) {
    const merged = useMatProps('harness', props);

    return () => h('output', {
      'data-extra': merged.extra ?? null,
    }, String(merged.label));
  },
});

/**
 * @param {object} defaults
 * @param {object} [props]
 */
function mountHarness(defaults, props = {}) {
  return mount(DefaultsHarness, {
    global: {
      provide: {
        [MAT_UI_KEY]: {
          defaults,
          iconClass: '',
          useCursor: false,
        },
      },
    },
    props,
  });
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listVueFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      return listVueFiles(fullPath);
    }

    return entry.name.endsWith('.vue') ? [fullPath] : [];
  });
}

describe('createMatUi defaults 合并语义', () => {
  it('未配置 defaults 时使用组件定义默认值', () => {
    const wrapper = mountHarness({});

    expect(wrapper.text()).toBe('definition-default');
  });

  it('defaults 覆盖未显式传入的属性（含带定义默认值的属性）', () => {
    const wrapper = mountHarness({ harness: { label: 'from-defaults' } });

    expect(wrapper.text()).toBe('from-defaults');
  });

  it('显式传入的属性优先于 defaults', () => {
    const wrapper = mountHarness(
      { harness: { label: 'from-defaults' } },
      { label: 'explicit' },
    );

    expect(wrapper.text()).toBe('explicit');
  });

  it('显式 undefined 回退到 defaults', () => {
    const wrapper = mountHarness(
      { harness: { label: 'from-defaults' } },
      { label: undefined },
    );

    expect(wrapper.text()).toBe('from-defaults');
  });

  it('显式 null 保持显式值', () => {
    const wrapper = mountHarness(
      { harness: { label: 'from-defaults' } },
      { label: null },
    );

    expect(wrapper.text()).toBe('null');
  });

  it('defaults 中非 prop 键也保留在合并对象中', () => {
    const wrapper = mountHarness({
      harness: { label: 'label-value', extra: 'extra-value' },
    });

    expect(wrapper.attributes('data-extra')).toBe('extra-value');
  });
});

describe('createMatUi defaults 组件行为', () => {
  it('defaults 覆盖全局注册组件的定义默认值，显式属性优先', () => {
    const plugin = createMatUi({ defaults: { btn: { type: 'submit' } } });
    // eslint-disable-next-line vue/one-component-per-file -- 仅用于验证全局注册组件的 defaults 行为。
    const Consumer = defineComponent({
      setup() {
        return () => h('div', [
          h(resolveComponent('mat-btn'), null, { default: () => '默认按钮' }),
          h(resolveComponent('mat-btn'), { type: 'button' }, { default: () => '显式按钮' }),
          h(resolveComponent('mat-btn'), { type: undefined }, { default: () => 'undefined 按钮' }),
        ]);
      },
    });
    const wrapper = mount(Consumer, { global: { plugins: [plugin] } });
    const buttons = wrapper.findAll('button');

    expect(buttons).toHaveLength(3);
    expect(buttons[0].element.type).toBe('submit');
    expect(buttons[1].element.type).toBe('button');
    expect(buttons[2].element.type).toBe('submit');
  });

  it('本地按需导入的组件同样读取 defaults', () => {
    const plugin = createMatUi({ defaults: { btn: { type: 'submit' } } });
    const wrapper = mount(MatBtn, {
      global: { plugins: [plugin] },
      slots: { default: '本地按钮' },
    });

    expect(wrapper.find('button').element.type).toBe('submit');
  });
});

describe('命令式宿主继承 defaults', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value() {
        this.setAttribute('open', '');
      },
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value() {
        this.removeAttribute('open');
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.querySelector('[data-mat-dialog-host]')?.remove();
  });

  it('命令式 Dialog 内部组件读取最后安装插件的 defaults', async () => {
    vi.useFakeTimers();
    const plugin = createMatUi({ defaults: { btn: { type: 'submit' } } });
    // eslint-disable-next-line vue/one-component-per-file -- 仅用于触发插件安装。
    const app = createApp({ render: () => null });

    app.use(plugin);

    const result = dialog({
      content: '命令式内容',
      title: '标题',
    });

    await nextTick();
    await nextTick();

    const button = document.body.querySelector('dialog button');

    expect(button).not.toBeNull();
    expect(button.type).toBe('submit');
    button.click();
    await vi.advanceTimersByTimeAsync(200);
    await nextTick();

    await expect(result).resolves.toBeUndefined();
    expect(document.body.querySelector('[data-mat-dialog-host]')).toBeNull();
  });
});

describe('defaults 键名与组件接入一致性', () => {
  it('每个公共组件都以自身规范键名调用 useMatProps', () => {
    const componentsDir = resolve(process.cwd(), 'src/components');
    const publicNames = new Set(GLOBAL_COMPONENTS.map(([name]) => name));
    const expected = new Set();
    const matched = [];

    listVueFiles(componentsDir).forEach((file) => {
      const source = readFileSync(file, 'utf8');
      const nameMatch = source.match(/defineOptions\(\{[\s\S]*?name:\s*'([^']+)'/);

      if (!nameMatch || !publicNames.has(nameMatch[1])) {
        return;
      }

      // 无 props 的公共组件没有可配置属性，不需要调用 useMatProps。
      if (!source.includes('defineProps(')) {
        return;
      }

      expected.add(nameMatch[1]);
      matched.push(nameMatch[1]);
      expect(source, file).toContain(`useMatProps('${matComponentKey(nameMatch[1])}', props)`);
    });

    expect(new Set(matched)).toEqual(expected);
  });
});
