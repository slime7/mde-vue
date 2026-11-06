import { nextTick, reactive, readonly } from 'vue';

export const EDGE_NAMES = Object.freeze([
  'top', 'bottom', 'left', 'right', 'start', 'end',
]);

export const EDGE_MOTION_PHASES = Object.freeze({
  idle: 'idle',
  enter: 'enter',
  exit: 'exit',
  instant: 'instant',
});

export const EDGE_MOTION_TIMING = Object.freeze({
  idle: 'var(--mat-sys-motion-duration-long2) var(--mat-sys-motion-easing-emphasized)',
  enter: 'var(--mat-sys-motion-duration-medium4) var(--mat-sys-motion-easing-emphasized-decelerate)',
  exit: 'var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized-accelerate)',
  instant: '0s',
});

export const EDGE_MOTION_DURATION = Object.freeze({
  enter: 400,
  exit: 200,
});

/**
 * 读取边缘动效阶段对应的 transition 或 animation 时间值。
 *
 * @param {string} phase
 * @returns {string}
 */
export function getEdgeMotionTiming(phase) {
  return EDGE_MOTION_TIMING[phase] ?? EDGE_MOTION_TIMING.idle;
}

function readExtent(rect, axis) {
  const direct = Number(rect[axis]);
  if (direct) {
    return Math.max(0, direct);
  }

  const start = axis === 'height' ? rect.top : rect.left;
  const end = axis === 'height' ? rect.bottom : rect.right;
  return Math.max(0, (Number(end) || 0) - (Number(start) || 0));
}

function createInsets(source = {}) {
  return {
    top: Math.max(0, Number(source.top) || 0),
    bottom: Math.max(0, Number(source.bottom) || 0),
    left: Math.max(0, Number(source.left) || 0),
    right: Math.max(0, Number(source.right) || 0),
    start: Math.max(0, Number(source.start) || 0),
    end: Math.max(0, Number(source.end) || 0),
  };
}

function hasDocumentPosition(position, flag) {
  return Math.floor(position / flag) % 2 === 1;
}

function compareRegistrations(registrations, first, second) {
  if (first.element === second.element) {
    return 0;
  }

  if (first.element.isConnected && second.element.isConnected) {
    const position = first.element.compareDocumentPosition(second.element);
    if (hasDocumentPosition(position, Node.DOCUMENT_POSITION_FOLLOWING)) {
      return -1;
    }
    if (hasDocumentPosition(position, Node.DOCUMENT_POSITION_PRECEDING)) {
      return 1;
    }
  }

  return registrations.indexOf(first) - registrations.indexOf(second);
}

/**
 * 创建边缘布局控制器，统一处理六向登记、DOM 顺序和正交避让。
 *
 * @param {{scheduleMeasure?: () => void}} [options]
 * @returns {{measure: (options?: {baseInsets?: object, width?: number, height?: number}) => object, registerEdge: Function, setResizeObserver: (observer?: ResizeObserver) => void, motion: Readonly<{block: string, inline: string}>, markMotion: (edge: string, phase: string) => void, completeMotion: () => void, dispose: () => void}}
 */
export function createEdgeLayoutController({ scheduleMeasure } = {}) {
  const registrations = [];
  const motion = reactive({
    block: EDGE_MOTION_PHASES.idle,
    inline: EDGE_MOTION_PHASES.idle,
  });
  const motionTimers = {
    block: undefined,
    inline: undefined,
  };
  let resizeObserver;

  function setResizeObserver(observer) {
    resizeObserver = observer;
    registrations.forEach((registration) => {
      if (registration.active) {
        resizeObserver?.observe?.(registration.element);
      }
    });
  }

  function clearMotionTimer(axis) {
    if (motionTimers[axis] === undefined) {
      return;
    }

    globalThis.clearTimeout(motionTimers[axis]);
    motionTimers[axis] = undefined;
  }

  function getEdgeAxis(edge) {
    return edge === 'top' || edge === 'bottom' ? 'block' : 'inline';
  }

  /**
   * 标记边缘轴的运动阶段，并在 enter 或 exit 结束后回到空闲。
   *
   * @param {string} edge
   * @param {'idle' | 'enter' | 'exit' | 'instant'} phase
   * @returns {void}
   */
  function markMotion(edge, phase) {
    if (!EDGE_MOTION_PHASES[phase]) {
      return;
    }

    const axis = getEdgeAxis(edge);
    const duration = EDGE_MOTION_DURATION[phase];

    clearMotionTimer(axis);
    motion[axis] = phase;

    if (duration === undefined) {
      return;
    }

    motionTimers[axis] = globalThis.setTimeout(() => {
      motionTimers[axis] = undefined;

      if (motion[axis] === phase) {
        motion[axis] = EDGE_MOTION_PHASES.idle;
      }
    }, duration);
  }

  /**
   * 在布局应用本次测量值后清除 instant 阶段，避免无动画切换影响后续尺寸变化。
   *
   * @returns {void}
   */
  function completeMotion() {
    nextTick(() => {
      if (motion.block === EDGE_MOTION_PHASES.instant) {
        motion.block = EDGE_MOTION_PHASES.idle;
      }
      if (motion.inline === EDGE_MOTION_PHASES.instant) {
        motion.inline = EDGE_MOTION_PHASES.idle;
      }
    });
  }

  function dispose() {
    clearMotionTimer('block');
    clearMotionTimer('inline');
    motion.block = EDGE_MOTION_PHASES.idle;
    motion.inline = EDGE_MOTION_PHASES.idle;
  }

  function measure({ baseInsets, width = 0, height = 0 } = {}) {
    const currentInsets = createInsets(baseInsets);
    const crossInsets = Object.fromEntries(
      EDGE_NAMES.map((edge) => [edge, { startInset: 0, endInset: 0 }]),
    );
    const activeRegistrations = registrations
      .filter((registration) => registration.active)
      .sort((first, second) => compareRegistrations(registrations, first, second));

    activeRegistrations.forEach((registration) => {
      const rect = registration.element.getBoundingClientRect();
      const { edge, getSize } = registration;
      const mutableInsets = registration.insets;
      const reportedExtent = getSize?.();
      const extent = Math.max(0, Number.isFinite(reportedExtent)
        ? reportedExtent
        : readExtent(rect, edge === 'top' || edge === 'bottom' ? 'height' : 'width'));

      if (edge === 'top') {
        mutableInsets.top = currentInsets.top;
        mutableInsets.bottom = 0;
        mutableInsets.left = currentInsets.left;
        mutableInsets.right = currentInsets.right;
        mutableInsets.start = currentInsets.start;
        mutableInsets.end = currentInsets.end;
        mutableInsets.offset = currentInsets.top;
        crossInsets.top.startInset = Math.max(
          crossInsets.top.startInset,
          currentInsets.start,
        );
        crossInsets.top.endInset = Math.max(
          crossInsets.top.endInset,
          currentInsets.end,
        );
        currentInsets.top += extent;
      } else if (edge === 'bottom') {
        mutableInsets.top = 0;
        mutableInsets.bottom = currentInsets.bottom;
        mutableInsets.left = currentInsets.left;
        mutableInsets.right = currentInsets.right;
        mutableInsets.start = currentInsets.start;
        mutableInsets.end = currentInsets.end;
        mutableInsets.offset = currentInsets.bottom;
        crossInsets.bottom.startInset = Math.max(
          crossInsets.bottom.startInset,
          currentInsets.start,
        );
        crossInsets.bottom.endInset = Math.max(
          crossInsets.bottom.endInset,
          currentInsets.end,
        );
        currentInsets.bottom += extent;
      } else if (edge === 'left' || edge === 'start') {
        mutableInsets.top = currentInsets.top;
        mutableInsets.bottom = currentInsets.bottom;
        mutableInsets.left = currentInsets.left;
        mutableInsets.right = 0;
        mutableInsets.start = currentInsets.start;
        mutableInsets.end = 0;
        mutableInsets.offset = currentInsets.left;
        crossInsets[edge].startInset = Math.max(
          crossInsets[edge].startInset,
          currentInsets.top,
        );
        crossInsets[edge].endInset = Math.max(
          crossInsets[edge].endInset,
          currentInsets.bottom,
        );
        currentInsets.left += extent;
        currentInsets.start += extent;
      } else if (edge === 'right' || edge === 'end') {
        mutableInsets.top = currentInsets.top;
        mutableInsets.bottom = currentInsets.bottom;
        mutableInsets.left = 0;
        mutableInsets.right = currentInsets.right;
        mutableInsets.start = 0;
        mutableInsets.end = currentInsets.end;
        mutableInsets.offset = currentInsets.right;
        crossInsets[edge].startInset = Math.max(
          crossInsets[edge].startInset,
          currentInsets.top,
        );
        crossInsets[edge].endInset = Math.max(
          crossInsets[edge].endInset,
          currentInsets.bottom,
        );
        currentInsets.right += extent;
        currentInsets.end += extent;
      }
    });

    const edges = Object.fromEntries(
      EDGE_NAMES.map((edge) => [edge, {
        size: currentInsets[edge],
        ...crossInsets[edge],
      }]),
    );

    return {
      size: {
        width: Math.max(0, Number(width) || 0),
        height: Math.max(0, Number(height) || 0),
      },
      padding: currentInsets,
      edges,
    };
  }

  /**
   * 登记当前 document 中的边缘元素。
   *
   * @param {{edge: string, element: HTMLElement, getSize?: () => number | undefined}} options
   * getSize 用于内部组件报告过渡中的目标厚度，返回 undefined 时回退到实测矩形。
   * @returns {{insets: Readonly<object>, update: () => void, unregister: () => void}}
   * @throws {TypeError} edge 或 element 无效时抛出。
   */
  function registerEdge({ edge, element, getSize } = {}) {
    if (!EDGE_NAMES.includes(edge)) {
      throw new TypeError('registerEdge() 的 edge 必须是 top、bottom、left、right、start 或 end');
    }

    if (!(element instanceof HTMLElement) || element.ownerDocument !== document) {
      throw new TypeError('registerEdge() 的 element 必须是当前 document 中的 HTMLElement');
    }

    const insets = reactive({
      bottom: 0,
      end: 0,
      left: 0,
      offset: 0,
      right: 0,
      start: 0,
      top: 0,
    });
    const registration = {
      active: true,
      edge,
      element,
      getSize: typeof getSize === 'function' ? getSize : undefined,
      insets,
    };
    const unregister = () => {
      if (!registration.active) {
        return;
      }

      registration.active = false;
      resizeObserver?.unobserve?.(element);
      scheduleMeasure?.();
    };
    const update = () => {
      if (!registration.active) {
        return;
      }

      scheduleMeasure?.();
    };

    registrations.push(registration);
    resizeObserver?.observe?.(element);
    scheduleMeasure?.();

    return Object.freeze({
      insets: readonly(insets),
      unregister,
      update,
    });
  }

  return {
    measure,
    registerEdge,
    setResizeObserver,
    motion: readonly(motion),
    markMotion,
    completeMotion,
    dispose,
  };
}
