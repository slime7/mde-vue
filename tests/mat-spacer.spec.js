import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatSpacer } from 'mdu-ui';

describe('MatSpacer', () => {
  it('渲染不进入无障碍树的弹性占位元素', () => {
    const wrapper = mount(MatSpacer, {
      attrs: {
        'aria-hidden': 'false',
        class: 'consumer-spacer',
      },
    });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });
});
