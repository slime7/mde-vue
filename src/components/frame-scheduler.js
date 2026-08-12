/**
 * 将连续输入合并到下一次绘制，并允许交互结束前同步刷新最新输入。
 *
 * @template T
 * @param {(value: T) => void} handler
 * @returns {{cancel: () => void, flush: () => boolean, schedule: (value: T) => void}}
 */
export default function createFrameScheduler(handler) {
  let frameId;
  let hasPendingValue = false;
  let pendingValue;

  function cancelFrame() {
    if (frameId === undefined) {
      return;
    }

    globalThis.cancelAnimationFrame(frameId);
    frameId = undefined;
  }

  function flush() {
    cancelFrame();

    if (!hasPendingValue) {
      return false;
    }

    const value = pendingValue;

    hasPendingValue = false;
    pendingValue = undefined;
    handler(value);

    return true;
  }

  function cancel() {
    cancelFrame();
    hasPendingValue = false;
    pendingValue = undefined;
  }

  function schedule(value) {
    pendingValue = value;
    hasPendingValue = true;

    if (frameId !== undefined) {
      return;
    }

    frameId = globalThis.requestAnimationFrame(() => {
      frameId = undefined;
      flush();
    });
  }

  return Object.freeze({ cancel, flush, schedule });
}
