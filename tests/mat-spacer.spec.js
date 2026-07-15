import { readFileSync } from 'node:fs';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { MatSpacer } from 'mdu-ui/components/mat-spacer';

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
    expect(wrapper.classes()).toContain('consumer-spacer');
  });

  it('通过 flex-grow 占据父级剩余空间', () => {
    const source = readFileSync('src/components/mat-spacer/MatSpacer.vue', 'utf8');

    expect(source).toContain('flex-grow: 1');
    expect(source).toContain('min-inline-size: 0');
  });
});
