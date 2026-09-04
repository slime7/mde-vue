import { nextTick } from 'vue';
import createMotionController from './motion-controller';

/**
 * @typedef {object} CloseMotionStartOptions
 * @property {boolean | (() => boolean)} [canStart]
 * @property {number} duration
 * @property {() => Element | null} getElement
 * @property {() => boolean} isActive
 * @property {() => void} onFinish
 * @property {() => void} onStart
 */

/**
 * 创建统一的关闭阶段控制器。
 *
 * 关闭阶段必须先提交状态并等待一次 Vue 渲染，再读取浏览器动画；如果
 * 浏览器在此刻尚未报告活动动画，则由 motion-controller 使用后备时长，
 * 从而避免节点被同步清理，导致 CSS 退出动画无法显示。
 *
 * @param {{motion?: ReturnType<typeof createMotionController>}} [options]
 * @returns {{cancel: () => void, start: (options: CloseMotionStartOptions) => Promise<void>}}
 */
export default function createCloseMotion({ motion = createMotionController() } = {}) {
  async function start({
    canStart = true,
    duration,
    getElement,
    isActive,
    onFinish,
    onStart,
  }) {
    const allowed = typeof canStart === 'function' ? canStart() : canStart;

    if (!allowed) {
      return;
    }

    motion.cancel();
    onStart();
    await nextTick();

    if (!isActive()) {
      return;
    }

    motion.wait(getElement(), duration, () => {
      if (isActive()) {
        onFinish();
      }
    }, { fallbackWhenIdle: true });
  }

  return Object.freeze({
    cancel: motion.cancel,
    start,
  });
}
