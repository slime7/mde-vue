import {
  describe, expect, it, vi,
} from 'vitest';
import createSwipeGesture, {
  swipeDirectionFor,
} from '../../src/components/swipe-gesture';

function firePointer(element, type, options = {}) {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, {
    pointerId: 1,
    isPrimary: true,
    pointerType: 'touch',
    clientX: 0,
    clientY: 0,
    ...options,
  });
  element.dispatchEvent(event);
}

describe('swipe-gesture 共享滑动手势', () => {
  it('鼠标指针不触发手势', () => {
    const onStart = vi.fn();
    const onEnd = vi.fn();
    const gesture = createSwipeGesture({ onStart, onEnd });
    const element = document.createElement('div');
    gesture.bind(element);

    firePointer(element, 'pointerdown', { pointerType: 'mouse', clientX: 0 });
    firePointer(element, 'pointermove', { pointerType: 'mouse', clientX: 60 });
    firePointer(element, 'pointerup', { pointerType: 'mouse', clientX: 60 });

    expect(onStart).not.toHaveBeenCalled();
    expect(onEnd).not.toHaveBeenCalled();
    gesture.destroy();
  });

  it('横向位移越过意图阈值后报告方向并跟随移动', () => {
    const onStart = vi.fn();
    const onMove = vi.fn();
    const gesture = createSwipeGesture({ onStart, onMove });
    const element = document.createElement('div');
    gesture.bind(element);

    firePointer(element, 'pointerdown', { clientX: 100, clientY: 50 });
    firePointer(element, 'pointermove', { clientX: 104, clientY: 50 });
    expect(onStart).not.toHaveBeenCalled();

    firePointer(element, 'pointermove', { clientX: 110, clientY: 50 });
    expect(onStart).toHaveBeenCalledWith({ direction: 'end', deltaX: 10, deltaY: 0 });
    expect(onMove).toHaveBeenCalled();

    gesture.destroy();
  });

  it('纵向占优的移动不锁定手势', () => {
    const onStart = vi.fn();
    const onEnd = vi.fn();
    const gesture = createSwipeGesture({ onStart, onEnd });
    const element = document.createElement('div');
    gesture.bind(element);

    firePointer(element, 'pointerdown', { clientX: 100, clientY: 50 });
    firePointer(element, 'pointermove', { clientX: 104, clientY: 70 });
    firePointer(element, 'pointerup', { clientX: 104, clientY: 70 });

    expect(onStart).not.toHaveBeenCalled();
    expect(onEnd).not.toHaveBeenCalled();
    gesture.destroy();
  });

  it('释放时报告方向、位移与速度，并吞掉紧随的 click', () => {
    const onEnd = vi.fn();
    const onClick = vi.fn();
    const gesture = createSwipeGesture({ onEnd });
    const element = document.createElement('div');
    element.addEventListener('click', onClick);
    gesture.bind(element);

    firePointer(element, 'pointerdown', { clientX: 120, clientY: 50 });
    firePointer(element, 'pointermove', { clientX: 40, clientY: 50 });
    firePointer(element, 'pointerup', { clientX: 40, clientY: 50 });

    expect(onEnd).toHaveBeenCalledTimes(1);
    const payload = onEnd.mock.calls[0][0];
    expect(payload.direction).toBe('start');
    expect(payload.deltaX).toBe(-80);
    expect(typeof payload.velocity).toBe('number');
    expect(payload.cancelled).toBe(false);

    element.dispatchEvent(new Event('click', { bubbles: true }));
    expect(onClick).not.toHaveBeenCalled();
    gesture.destroy();
  });

  it('pointercancel 报告取消且不锁定方向时不下发结束事件', () => {
    const onEnd = vi.fn();
    const gesture = createSwipeGesture({ onEnd });
    const element = document.createElement('div');
    gesture.bind(element);

    firePointer(element, 'pointerdown', { clientX: 100, clientY: 50 });
    firePointer(element, 'pointermove', { clientX: 120, clientY: 50 });
    firePointer(element, 'pointercancel', { clientX: 120, clientY: 50 });

    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(onEnd.mock.calls[0][0].cancelled).toBe(true);
    gesture.destroy();
  });

  it('swipeDirectionFor 按书写方向解析逻辑方向', () => {
    const ltrElement = document.createElement('div');
    expect(swipeDirectionFor(ltrElement, 20)).toBe('end');
    expect(swipeDirectionFor(ltrElement, -20)).toBe('start');
    expect(swipeDirectionFor(null, -20)).toBe('start');
  });

  it('destroy 后不再响应指针且可重新绑定', () => {
    const onEnd = vi.fn();
    const gesture = createSwipeGesture({ onEnd });
    const element = document.createElement('div');
    gesture.bind(element);
    gesture.destroy();

    firePointer(element, 'pointerdown', { clientX: 100 });
    firePointer(element, 'pointermove', { clientX: 140 });
    firePointer(element, 'pointerup', { clientX: 140 });
    expect(onEnd).not.toHaveBeenCalled();

    gesture.bind(element);
    firePointer(element, 'pointerdown', { clientX: 100 });
    firePointer(element, 'pointermove', { clientX: 140 });
    firePointer(element, 'pointerup', { clientX: 140 });
    expect(onEnd).toHaveBeenCalledTimes(1);
    gesture.destroy();
  });
});
