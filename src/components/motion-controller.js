function prefersReducedMotion() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * 以浏览器实际运行的 CSS 动画作为组件阶段完成信号。
 *
 * @returns {{cancel: () => void, wait: (element: Element | null, fallbackDuration: number, callback: () => void) => void}}
 */
export default function createMotionController() {
  let sequence = 0;
  let fallbackTimer;

  function cancel() {
    sequence += 1;

    if (fallbackTimer === undefined) {
      return;
    }

    globalThis.clearTimeout(fallbackTimer);
    fallbackTimer = undefined;
  }

  function wait(element, fallbackDuration, callback) {
    cancel();
    const currentSequence = sequence;

    if (prefersReducedMotion()) {
      callback();
      return;
    }

    if (typeof element?.getAnimations === 'function') {
      const animations = element.getAnimations({ subtree: true }).filter((animation) => (
        animation.playState !== 'finished'
      ));

      if (animations.length === 0) {
        callback();
        return;
      }

      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        if (sequence === currentSequence) {
          callback();
        }
      });
      return;
    }

    fallbackTimer = globalThis.setTimeout(() => {
      fallbackTimer = undefined;

      if (sequence === currentSequence) {
        callback();
      }
    }, fallbackDuration);
  }

  return Object.freeze({ cancel, wait });
}
