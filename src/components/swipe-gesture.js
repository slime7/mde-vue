/**
 * 仅响应触摸与手写笔的横向跟手滑动手势。
 *
 * 鼠标指针不参与；宿主元素需声明 `touch-action: pan-y`，在锁定横向意图前保留纵向滚动。
 * 锁定后由组件接管：`onStart` 报告逻辑方向，`onMove` 报告横向位移，`onEnd` 报告方向、
 * 位移、释放速度与是否被浏览器取消；跟手拖动的释放会吞掉紧随的一次 click。
 */

const INTENT_THRESHOLD = 8;
const VELOCITY_SAMPLE_LIMIT = 6;

/**
 * 按元素书写方向把横向位移解析为逻辑方向。
 *
 * @param {HTMLElement | null} element
 * @param {number} deltaX 前端内容跟随手指的横向位移
 * @returns {'start' | 'end'} 内容移向的逻辑边缘
 */
export function swipeDirectionFor(element, deltaX) {
  const rtl = Boolean(
    element && globalThis.getComputedStyle(element).direction === 'rtl',
  );

  if (rtl) {
    return deltaX > 0 ? 'start' : 'end';
  }

  return deltaX > 0 ? 'end' : 'start';
}

/**
 * @typedef {object} SwipeGestureHandlers
 * @property {(input: { direction: 'start' | 'end', deltaX: number, deltaY: number }) => void} [onStart]
 * @property {(input: { direction: 'start' | 'end', deltaX: number, deltaY: number }) => void} [onMove]
 * @property {(input: { direction: 'start' | 'end', deltaX: number, velocity: number, cancelled: boolean }) => void} [onEnd]
 */

/**
 * @param {SwipeGestureHandlers} handlers
 * @returns {{bind: (element: HTMLElement | null) => void, destroy: () => void}}
 */
export default function createSwipeGesture(handlers) {
  let element = null;
  let pointerId;
  let startX = 0;
  let startY = 0;
  let active = false;
  let intent = null;
  let samples = [];
  let clickBlocker;

  /**
   * @param {PointerEvent} event
   */
  function releasePointer(event) {
    element?.releasePointerCapture?.(event.pointerId);
    active = false;
    intent = null;
    samples = [];
    pointerId = undefined;
  }

  function measureVelocity() {
    if (samples.length < 2) {
      return 0;
    }

    const first = samples[0];
    const last = samples[samples.length - 1];
    const elapsed = last.time - first.time;

    /* 采样过短无法区分真实甩动，按无速度处理，由位移阈值决定结果。 */
    if (elapsed < 32) {
      return 0;
    }

    return (last.x - first.x) / elapsed;
  }

  function blockNextClick() {
    clickBlocker = (event) => {
      event.stopPropagation();
      event.preventDefault();
      element?.removeEventListener('click', clickBlocker, true);
      clickBlocker = undefined;
    };
    element?.addEventListener('click', clickBlocker, true);
  }

  /**
   * @param {PointerEvent} event
   */
  function handlePointerDown(event) {
    if (active || event.pointerType === 'mouse' || !event.isPrimary) {
      return;
    }

    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    active = true;
    samples = [{ x: event.clientX, time: performance.now() }];
    element?.setPointerCapture?.(event.pointerId);
  }

  /**
   * @param {PointerEvent} event
   */
  function handlePointerMove(event) {
    if (!active || event.pointerId !== pointerId) {
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (!intent && Math.abs(deltaX) < INTENT_THRESHOLD) {
      return;
    }

    if (!intent) {
      if (Math.abs(deltaX) <= Math.abs(deltaY)) {
        releasePointer(event);
        return;
      }

      intent = swipeDirectionFor(element, deltaX);
      handlers.onStart?.({ direction: intent, deltaX, deltaY });
    }

    samples.push({ x: event.clientX, time: performance.now() });

    if (samples.length > VELOCITY_SAMPLE_LIMIT) {
      samples.shift();
    }

    handlers.onMove?.({ direction: intent, deltaX, deltaY });
  }

  /**
   * @param {PointerEvent} event
   */
  function handlePointerEnd(event) {
    if (!active || event.pointerId !== pointerId) {
      return;
    }

    const deltaX = event.clientX - startX;
    const cancelled = event.type === 'pointercancel';
    const direction = intent ?? swipeDirectionFor(element, deltaX);
    const velocity = measureVelocity();
    const hadIntent = intent !== null;

    releasePointer(event);
    blockNextClick();

    if (hadIntent) {
      handlers.onEnd?.({
        direction, deltaX, velocity, cancelled,
      });
    }
  }

  function destroy() {
    if (!element) {
      return;
    }

    if (clickBlocker) {
      element.removeEventListener('click', clickBlocker, true);
      clickBlocker = undefined;
    }
    element.removeEventListener('pointerdown', handlePointerDown);
    element.removeEventListener('pointermove', handlePointerMove);
    element.removeEventListener('pointerup', handlePointerEnd);
    element.removeEventListener('pointercancel', handlePointerEnd);
    element = null;
    active = false;
    intent = null;
    samples = [];
    pointerId = undefined;
  }

  /**
   * @param {HTMLElement | null} next
   */
  function bind(next) {
    if (element === next) {
      return;
    }

    destroy();

    if (!(next instanceof HTMLElement)) {
      return;
    }

    element = next;
    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerEnd);
    element.addEventListener('pointercancel', handlePointerEnd);
  }

  return { bind, destroy };
}
