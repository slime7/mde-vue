import { reactive, readonly } from 'vue';

export const EDGE_NAMES = Object.freeze([
  'top', 'bottom', 'left', 'right', 'start', 'end',
]);

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
 * @returns {{measure: (options?: {baseInsets?: object, width?: number, height?: number}) => object, registerEdge: Function, setResizeObserver: (observer?: ResizeObserver) => void}}
 */
export function createEdgeLayoutController({ scheduleMeasure } = {}) {
  const registrations = [];
  let resizeObserver;

  function setResizeObserver(observer) {
    resizeObserver = observer;
    registrations.forEach((registration) => {
      if (registration.active) {
        resizeObserver?.observe?.(registration.element);
      }
    });
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
      const { edge } = registration;
      const mutableInsets = registration.insets;

      if (edge === 'top') {
        const extent = readExtent(rect, 'height');
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
        const extent = readExtent(rect, 'height');
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
        const extent = readExtent(rect, 'width');
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
        const extent = readExtent(rect, 'width');
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
   * @param {{edge: string, element: HTMLElement}} options
   * @returns {{insets: Readonly<object>, update: () => void, unregister: () => void}}
   * @throws {TypeError} edge 或 element 无效时抛出。
   */
  function registerEdge({ edge, element } = {}) {
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
  };
}
