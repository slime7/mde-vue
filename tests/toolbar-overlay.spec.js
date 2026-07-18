import {
  describe, expect, it, vi,
} from 'vitest';
import {
  getBottomToolbarClearance,
  getToolbarRects,
  registerToolbar,
  subscribeToolbarOverlay,
} from '../src/components/toolbar-overlay';

describe('Toolbar 覆盖层注册', () => {
  it('提供底部避让距离、全部 Toolbar 矩形和变更订阅', () => {
    const element = document.createElement('div');
    const rect = {
      bottom: 600,
      height: 80,
      left: 0,
      right: 400,
      top: 520,
      width: 400,
    };
    const listener = vi.fn();

    document.body.append(element);
    const registration = registerToolbar(element, {
      isBottom: () => true,
      getRect: () => rect,
    });
    const unsubscribe = subscribeToolbarOverlay(listener);

    expect(getToolbarRects()).toEqual([rect]);
    expect(getBottomToolbarClearance(600)).toBe(80);

    registration.update();
    expect(listener).toHaveBeenCalled();

    unsubscribe();
    registration.unregister();

    expect(getToolbarRects()).toEqual([]);
    expect(getBottomToolbarClearance(600)).toBe(0);
  });

  it('忽略已脱离 document 的 Toolbar', () => {
    const element = document.createElement('div');

    const registration = registerToolbar(element, {
      isBottom: () => true,
      getRect: () => ({
        bottom: 600,
        height: 80,
        left: 0,
        right: 400,
        top: 520,
        width: 400,
      }),
    });

    expect(getToolbarRects()).toEqual([]);
    expect(getBottomToolbarClearance(600)).toBe(0);

    registration.unregister();
  });
});
