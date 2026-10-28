<script setup>
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  shallowRef,
  useAttrs,
  useId,
  useSlots,
  watch,
} from 'vue';
import createCloseMotion from './close-motion';
import createFrameScheduler from './frame-scheduler';
import createMotionController from './motion-controller';
import {
  dialogStack,
  registerDialog,
  unregisterDialog,
} from './dialog-stack';
import {
  getAppRootContext,
  MAT_APP_ROOT_KEY,
} from './mat-app-root/mat-app-root-context';
import {
  GESTURE_SLOP,
  resolveBottomSheetDragGeometry,
  resolveBottomSheetDragTarget,
  resolveBottomSheetFlick,
  resolveBottomSheetGestureAction,
  resolveBottomSheetKeyboardTarget,
} from './bottom-sheet-drag';
import useFocusTrap from './use-focus-trap';
import MatBtn from './mat-btn/MatBtn.vue';
import MatSurfaceBase from './MatSurfaceBase.vue';
import MatScrollArea from './mat-scroll-area/MatScrollArea.vue';
import {
  isValidCssBlockSize,
  normalizeNumber,
  toCssLength,
} from './value-utils';

defineOptions({
  name: 'MatSheetBase',
  inheritAttrs: false,
});

const props = defineProps({
  attach: {
    type: [String, Object],
    default: 'body',
  },
  breakpoint: {
    type: Number,
    default: 840,
  },
  closeLabel: {
    type: String,
    default: '关闭',
  },
  closeOnBack: {
    type: Boolean,
    default: true,
  },
  collapseDragHandleLabel: {
    type: String,
    default: '折叠底部面板',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  componentName: {
    type: String,
    required: true,
  },
  containerColor: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: undefined,
  },
  direction: {
    type: String,
    required: true,
  },
  dragHandle: {
    type: Boolean,
    default: false,
  },
  dragHandleLabel: {
    type: String,
    default: '展开底部面板',
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  expanded: {
    type: [Boolean, String, Number],
    default: false,
  },
  expandedDragHandleLabel: {
    type: String,
    default: '关闭底部面板',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'end',
  },
  scrim: {
    type: Boolean,
    default: true,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: 'auto',
  },
  width: {
    type: [Number, String],
    default: undefined,
  },
});

const emit = defineEmits({
  closed: () => true,
  opened: () => true,
  'update:expanded': (payload) => payload === 'min'
    || payload === 'normal'
    || payload === 'max',
  'update:modelValue': (payload) => typeof payload === 'boolean',
});
const attrs = useAttrs();
const slots = useSlots();
const instance = getCurrentInstance();
const appContext = inject(MAT_APP_ROOT_KEY, null);
const hasExplicitAttach = Object.prototype.hasOwnProperty.call(
  instance?.vnode.props ?? {},
  'attach',
);
const activatorHost = ref(null);
const surface = ref(null);
const panelElement = ref(null);
const contentArea = ref(null);
const rendered = ref(false);
const phase = ref('closed');
const teleportTarget = ref(null);
const scopedContext = shallowRef(null);
const viewportWidth = ref(typeof window === 'undefined' ? 0 : window.innerWidth);
let dragOffset = 0;
const dragging = ref(false);
const contentBlockSize = ref(0);
const titleId = `${useId().replace(/[^\w-]/g, '-')}-title`;
const root = computed(() => surface.value?.root ?? surface.value?.$el ?? null);
const isAppRootScoped = computed(() => Boolean(scopedContext.value));
const dragElement = computed(() => (isModal.value ? panelElement.value : root.value));
const resolvedVariant = computed(() => {
  if (props.variant !== 'auto') {
    return props.variant;
  }

  return viewportWidth.value < normalizeNumber(props.breakpoint, {
    positive: true,
    fallback: 840,
  }) ? 'modal' : 'standard';
});
const isModal = computed(() => resolvedVariant.value === 'modal');
const isTop = computed(() => isModal.value && dialogStack.value.at(-1) === root.value);
const hasActivatorSlot = computed(() => Boolean(slots.activator));
const hasTitle = computed(() => props.title !== undefined || Boolean(slots.title));
const hasContent = computed(() => props.content !== undefined || Boolean(slots.default));
const showCloseButton = computed(() => props.closable);
/**
 * 解析 Bottom sheet 的展开值：min 与 normal 是折叠档，max、full 与自定义
 * 高度都表示面板已经展开；normal 按内容自然高度渲染并以可用高度一半封顶，
 * max 同样按自然高度渲染但只受可用高度限制。
 *
 * @param {unknown} value
 * @returns {'min'|'normal'|'max'|'full'|string|number}
 */
function resolveBottomExpanded(value) {
  if (value === 'full' || value === true) {
    return 'full';
  }

  if (value === 'min' || value === 'max') {
    return value;
  }

  if (value === 'normal' || value === false || value === undefined) {
    return 'normal';
  }

  if (isValidCssBlockSize(value, { allowNegative: true })) {
    return value;
  }

  return 'normal';
}
// 半受控展开档位：拖动、滚轮与键盘先更新内部档位再通知使用者，
// 使用者未监听 update:expanded 时组件仍保持切换后的高度。
const expandedState = ref(resolveBottomExpanded(props.expanded));
watch(() => props.expanded, (value) => {
  expandedState.value = resolveBottomExpanded(value);
});
/**
 * 应用新的展开档位：更新内部档位并发出更新事件。
 *
 * @param {'max'|'min'|'normal'} value
 */
function applyExpanded(value) {
  expandedState.value = value;
  emit('update:expanded', value);
}
const bottomExpanded = computed(() => (
  props.direction === 'bottom' ? expandedState.value : props.expanded
));
const isBottomCollapsed = computed(() => (
  props.direction !== 'bottom'
  || bottomExpanded.value === 'min'
  || bottomExpanded.value === 'normal'
));
const isBottomExpanded = computed(() => props.direction === 'bottom' && !isBottomCollapsed.value);
// min、full 与自定义高度始终使用显式 block-size；normal 与 max 在测量到内容高度后
// 改用实测值，避免长度与 fit-content 之间无法插值而丢失高度切换动画。
const usesExplicitBlockSize = computed(() => {
  if (props.direction !== 'bottom') {
    return false;
  }

  if (bottomExpanded.value === 'normal' || bottomExpanded.value === 'max') {
    return contentBlockSize.value > 0;
  }

  return true;
});
const expandedBlockSize = computed(() => {
  if (!usesExplicitBlockSize.value || bottomExpanded.value === 'full') {
    return undefined;
  }

  if (bottomExpanded.value === 'min') {
    return 'var(--mat-sheet-min-block-size)';
  }

  if (bottomExpanded.value === 'normal' || bottomExpanded.value === 'max') {
    const limit = bottomExpanded.value === 'normal'
      ? 'calc(var(--mat-sheet-full-block-size) / 2)'
      : 'var(--mat-sheet-full-block-size)';

    return `max(64px, min(${contentBlockSize.value}px, ${limit}))`;
  }

  const length = toCssLength(bottomExpanded.value, {
    allowNegative: true,
    property: 'block-size',
  });

  if (!length) {
    return undefined;
  }

  if (/^(auto|contain|fit-content(?:\(.+\))?|inherit|initial|max-content|min-content|revert(?:-layer)?|stretch|unset)$/i.test(length)) {
    return length;
  }

  return `max(64px, ${length})`;
});
// normal 档的上限，保证与 min、max 之间的高度切换都能插值过渡。
const normalMaxBlockSize = computed(() => (
  props.direction === 'bottom'
  && bottomExpanded.value === 'normal'
    ? 'calc(var(--mat-sheet-full-block-size) / 2)'
    : undefined
));
const panelClasses = computed(() => [
  `mat-sheet__panel--${props.direction}`,
  `mat-sheet__panel--position-${props.position}`,
  {
    'mat-sheet__panel--sized': usesExplicitBlockSize.value,
    'mat-sheet__panel--dragging': dragging.value,
  },
]);
const resolvedDragHandleLabel = computed(() => {
  if (isBottomCollapsed.value) {
    return props.dragHandleLabel;
  }

  return isModal.value ? props.expandedDragHandleLabel : props.collapseDragHandleLabel;
});
const hasHeader = computed(() => hasTitle.value
  || showCloseButton.value
  || Boolean(slots.header)
  || Boolean(slots.actions));
const rootTag = computed(() => (isModal.value ? 'dialog' : 'aside'));
const resolvedWidth = computed(() => {
  if (props.width === undefined) {
    return undefined;
  }

  return toCssLength(props.width, {
    property: 'inline-size',
    positive: true,
  });
});
const sizeStyle = computed(() => {
  if (!resolvedWidth.value) {
    return undefined;
  }

  return {
    '--mat-sheet-preferred-width': resolvedWidth.value,
  };
});
// 高度基准与显式高度上限由组件内部变量表达。
const bottomSizeStyle = computed(() => {
  const style = {};

  if (expandedBlockSize.value) {
    style['--mat-sheet-expanded-block-size'] = expandedBlockSize.value;
  }

  if (normalMaxBlockSize.value) {
    style['--mat-sheet-max-block-size'] = normalMaxBlockSize.value;
  }

  return Object.keys(style).length > 0 ? style : undefined;
});
const rootStyle = computed(() => [attrs.style, sizeStyle.value, bottomSizeStyle.value]);
const panelStyle = computed(() => [sizeStyle.value, bottomSizeStyle.value]);
let mounted = false;
const phaseMotion = createMotionController();
const closeMotion = createCloseMotion({ motion: phaseMotion });
let previousFocus = null;
let previousWasModal = false;
let activePointerId = null;
let dragStart = 0;
let dragStartExtent = 0;
let dragStartVisibleExtent = 0;
let dragContentExtent = 0;
let dragAvailableExtent = 0;
let dragOvershootLimit = 0;
let dragPointerType = null;
let dragStartedAt = 0;
let dragDistance = 0;
// 内容手势接管面板拖动后，超出可用高度的位移改为滚动内容。
let dragHandsOffScroll = false;
let dragStartScrollTop = 0;
// 内容区触摸手势：按下只记录，移动超过意图阈值后按方向决定是否拦截。
let contentGesture = null;
let scrimPressed = false;
let contentObserver = null;
let contentObserverTargets = [];

useFocusTrap(root, computed(() => (
  isModal.value && rendered.value && isTop.value
)));

function clearPhaseTimer() {
  phaseMotion.cancel();
}

/**
 * @param {number} duration
 * @param {() => void} callback
 */
function waitForPhase(duration, callback) {
  phaseMotion.wait(root.value, duration, callback);
}

/**
 * @returns {HTMLElement | null}
 */
function resolveActivatorTarget() {
  const elements = activatorHost.value ? [...activatorHost.value.children] : [];

  if (elements.length === 1 && elements[0] instanceof HTMLElement
    && elements[0].ownerDocument === document) {
    return elements[0];
  }

  return null;
}

/**
 * @returns {HTMLElement | null}
 */
function resolveAttach() {
  if (typeof props.attach === 'string') {
    try {
      return document.querySelector(props.attach);
    } catch {
      return null;
    }
  }

  if (props.attach instanceof HTMLElement && props.attach.ownerDocument === document) {
    return props.attach;
  }

  return null;
}

/**
 * @param {HTMLElement | null} attachTarget
 * @returns {{context: object, target: HTMLElement | null} | null}
 */
function resolveScopedEntry(attachTarget) {
  if (appContext && !hasExplicitAttach) {
    return {
      context: appContext,
      target: appContext.modalLayer.value,
    };
  }

  if (hasExplicitAttach) {
    const entry = attachTarget ? getAppRootContext(attachTarget) : null;

    if (entry) {
      return {
        context: entry,
        target: entry.modalLayer.value,
      };
    }
  }

  return null;
}

/**
 * @param {object} context
 * @returns {{inertElement: HTMLElement | null, scrollElement: HTMLElement | null}}
 */
function buildScopeOptions(context) {
  return {
    inertElement: context.contentElement.value,
    scrollElement: context.documentMode.value
      ? null
      : context.contentElement.value,
  };
}

/**
 * 顶部安全间距：宽屏 56px、窄屏 72px，同时也是向上拖动超出可用高度后的上限。
 *
 * @returns {number}
 */
function resolveTopGap() {
  return window.innerWidth >= 641 ? 56 : 72;
}

/**
 * 可用高度，即 full 档使用的高度：容器高度减去顶部安全间距。
 *
 * standard 以视口为容器，modal 以铺满坐标空间的根元素为容器。
 *
 * @returns {number}
 */
function resolveAvailableExtent() {
  const containerExtent = isModal.value
    ? root.value?.getBoundingClientRect().height ?? 0
    : window.innerHeight;

  return Math.max(0, containerExtent - resolveTopGap());
}

/**
 * 内容完整高度：把手行、内容主体与页脚按布局高度相加，无法测量时返回 0。
 *
 * 各部分只受自身内容影响，不受面板当前高度的过渡影响，因此折叠状态下也能量到
 * 完整内容高度。
 *
 * @returns {number}
 */
function measureBottomContentExtent() {
  const panel = dragElement.value;

  if (!panel) {
    return 0;
  }

  return [
    '.mat-sheet__drag-handle-target',
    '.mat-sheet__content-body',
    '.mat-sheet__footer',
  ].reduce((total, selector) => (
    total + (panel.querySelector(selector)?.getBoundingClientRect().height ?? 0)
  ), 0);
}

/**
 * 拖动用的内容完整高度：测量不到时退回当前面板高度。
 *
 * @returns {number}
 */
function resolveContentExtent() {
  const extent = measureBottomContentExtent();

  if (extent > 0) {
    return extent;
  }

  return dragElement.value?.getBoundingClientRect().height ?? 0;
}

/**
 * 记录内容完整高度，供 normal 与 max 写出可插值的显式高度。
 */
function updateBottomContentExtent() {
  if (props.direction !== 'bottom') {
    return;
  }

  const extent = measureBottomContentExtent();

  if (extent !== contentBlockSize.value) {
    contentBlockSize.value = extent;
  }
}

/**
 * 监听内容与页脚尺寸，内容变化后重新测量高度。
 *
 * 只在观测目标变化时重建观察器，避免每次渲染都重新连接。
 */
function observeBottomContent() {
  const panel = props.direction === 'bottom' && typeof ResizeObserver === 'function'
    ? dragElement.value
    : null;
  const targets = panel
    ? [
      '.mat-sheet__drag-handle-target',
      '.mat-sheet__content-body',
      '.mat-sheet__footer',
    ].map((selector) => panel.querySelector(selector)).filter(Boolean)
    : [];
  const unchanged = targets.length === contentObserverTargets.length
    && targets.every((target, index) => target === contentObserverTargets[index]);

  if (unchanged) {
    return;
  }

  contentObserverTargets = targets;
  contentObserver?.disconnect();
  contentObserver = null;

  if (targets.length === 0) {
    return;
  }

  contentObserver = new ResizeObserver(updateBottomContentExtent);
  targets.forEach((target) => contentObserver.observe(target));
}

/**
 * 重新测量内容高度并连接观察器。
 */
function refreshBottomGeometry() {
  if (props.direction !== 'bottom') {
    return;
  }

  updateBottomContentExtent();
  observeBottomContent();
}

function stopContentObserver() {
  contentObserver?.disconnect();
  contentObserver = null;
  contentObserverTargets = [];
}

/**
 * 内容滚动元素，手势决策与滚动接管需要读取或写入它的滚动位置。
 *
 * @returns {HTMLElement | null}
 */
function resolveContentScrollElement() {
  return contentArea.value?.getScroller?.() ?? null;
}

/**
 * @param {EventTarget | null} target
 * @returns {boolean}
 */
function isInteractiveTarget(target) {
  return target instanceof Element && target.closest(
    'button, a, input, textarea, select, [contenteditable="true"]',
  );
}

/**
 * 折叠档内容区滚轮向下请求展开到 max，参考 AndroidX shouldExpandOnScroll。
 *
 * @param {WheelEvent} event
 */
function handleContentWheel(event) {
  if (props.direction !== 'bottom' || !props.draggable || isBottomExpanded.value) {
    return;
  }

  if (event.deltaY <= 0) {
    return;
  }

  event.preventDefault();
  applyExpanded('max');
}

/**
 * 底部面板内容手势入口：触摸与手写笔在内容区按下后只做记录，
 * 移动超过意图阈值再按方向与滚动位置决定是否拦截；鼠标不参与，
 * 交互元素上的按下交给元素自身。
 *
 * @param {PointerEvent} event
 */
function handleBottomPress(event) {
  if (props.direction !== 'bottom' || !props.draggable || activePointerId !== null) {
    return;
  }

  if (event.button !== 0 || event.pointerType === 'mouse' || contentGesture) {
    return;
  }

  if (!rendered.value || phase.value === 'closing' || isInteractiveTarget(event.target)) {
    return;
  }

  contentGesture = {
    action: null,
    pointerId: event.pointerId,
    startedAt: performance.now(),
    startScrollTop: resolveContentScrollElement()?.scrollTop ?? 0,
    startY: event.clientY,
  };
  window.addEventListener('pointermove', updateContentGesture);
  window.addEventListener('pointerup', finishContentGesture);
  window.addEventListener('pointercancel', cancelContentGesture);
  window.addEventListener('touchmove', blockContentTouchScroll, { passive: false });
}

function releaseContentGestureListeners() {
  window.removeEventListener('pointermove', updateContentGesture);
  window.removeEventListener('pointerup', finishContentGesture);
  window.removeEventListener('pointercancel', cancelContentGesture);
  window.removeEventListener('touchmove', blockContentTouchScroll);
}

/**
 * 拦截期间阻止原生触摸滚动，让面板跟手。
 *
 * @param {TouchEvent} event
 */
function blockContentTouchScroll(event) {
  if (contentGesture?.action === 'collapse' || contentGesture?.action === 'expand') {
    event.preventDefault();
  }
}

/**
 * 释放未完成的内容手势并清理窗口监听与拖拽样式。
 */
function releaseContentGesture() {
  const hadGesture = contentGesture !== null;

  contentGesture = null;
  releaseContentGestureListeners();

  if (hadGesture) {
    cancelDrag();
  }
}

/**
 * 把内容手势切换成与把手拖动共用的跟手管线。
 *
 * @param {PointerEvent} event
 */
function beginContentDrag(event) {
  activePointerId = contentGesture.pointerId;
  dragStart = contentGesture.startY;
  dragStartedAt = contentGesture.startedAt;
  dragDistance = 0;
  dragPointerType = event.pointerType ?? null;
  dragStartExtent = dragElement.value?.getBoundingClientRect().height ?? 0;
  dragStartVisibleExtent = dragStartExtent;
  dragContentExtent = resolveContentExtent();
  dragAvailableExtent = resolveAvailableExtent();
  dragOvershootLimit = 0;
  dragStartScrollTop = contentGesture.startScrollTop;
  dragHandsOffScroll = contentGesture.action === 'expand';
  writeDragStyle(0, dragStartExtent);
  dragging.value = true;
}

/**
 * 内容手势移动：方向明确后切换为面板拖动，后续位移复用把手拖动管线。
 *
 * @param {PointerEvent} event
 */
function updateContentGesture(event) {
  if (!contentGesture || event.pointerId !== contentGesture.pointerId) {
    return;
  }

  if (!contentGesture.action) {
    const deltaY = event.clientY - contentGesture.startY;

    if (Math.abs(deltaY) < GESTURE_SLOP) {
      return;
    }

    contentGesture.action = resolveBottomSheetGestureAction({
      deltaY,
      isCollapsed: isBottomCollapsed.value,
      scrollTop: contentGesture.startScrollTop,
    });

    if (contentGesture.action !== 'collapse' && contentGesture.action !== 'expand') {
      return;
    }

    beginContentDrag(event);
  }

  updateDrag(event);
}

/**
 * @param {PointerEvent} event
 */
function finishContentGesture(event) {
  if (!contentGesture || event.pointerId !== contentGesture.pointerId) {
    return;
  }

  const intercepted = contentGesture.action === 'collapse'
    || contentGesture.action === 'expand';

  releaseContentGestureListeners();
  contentGesture = null;

  if (intercepted) {
    finishDrag(event);
  }
}

/**
 * @param {PointerEvent} event
 */
function cancelContentGesture(event) {
  if (!contentGesture || event.pointerId !== contentGesture.pointerId) {
    return;
  }

  releaseContentGestureListeners();
  contentGesture = null;
  cancelDrag();
}

function requestClose() {
  emit('update:modelValue', false);
}

/**
 * @param {number} offset
 * @param {number | null} size
 */
function writeDragStyle(offset, size) {
  dragOffset = offset;
  root.value?.style.setProperty('--mat-sheet-drag-offset', `${offset}px`);

  if (size === null) {
    root.value?.style.removeProperty('--mat-sheet-drag-size');
    return;
  }

  root.value?.style.setProperty('--mat-sheet-drag-size', `${size}px`);
}

function clearDragStyle() {
  writeDragStyle(0, null);
}

/**
 * 把手键盘操作：方向键在 min、normal、max 间步进，Enter/Space 在折叠档与
 * max 之间切换；modal 展开档的 Enter/Space 请求关闭。
 *
 * @param {KeyboardEvent} event
 */
function handleDragHandleKeydown(event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();

    const target = resolveBottomSheetKeyboardTarget(
      bottomExpanded.value,
      event.key === 'ArrowUp' ? 1 : -1,
    );

    if (target) {
      applyExpanded(target);
    }

    return;
  }

  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();

  if (isBottomCollapsed.value) {
    applyExpanded('max');
    return;
  }

  if (isModal.value) {
    requestClose();
    return;
  }

  applyExpanded('normal');
}

function warnForInvalidActivator() {
  console.warn(
    `${props.componentName}: activator Slot 必须只渲染一个当前 document 中的 HTMLElement 根节点`,
  );
}

function warnForAccessibleName() {
  if (!isModal.value || attrs['aria-label'] || attrs['aria-labelledby']) {
    return;
  }

  if (props.direction === 'side' && hasTitle.value) {
    return;
  }

  const message = props.direction === 'bottom'
    ? '必须通过 aria-label 或 aria-labelledby 提供可访问名称'
    : '必须通过 title、title Slot、aria-label 或 aria-labelledby 提供可访问名称';

  console.warn(`${props.componentName}: ${message}`);
}

function warnForInvalidAttach() {
  console.warn(`${props.componentName}: attach 必须指向当前 document 中存在的 HTMLElement`);
}

function focusInitialElement() {
  const element = root.value;

  if (!element) {
    return;
  }

  const focusTarget = element.querySelector([
    '[autofocus]',
    'button:not([disabled]):not([data-sheet-drag-handle])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(','));

  (focusTarget ?? element).focus({ preventScroll: true });
}

// 入场动画期间不聚焦仍在屏幕外的面板内容，避免宿主滚动容器被焦点带动。
function focusInitialElementWhenIdle() {
  const element = root.value;

  if (!element || !props.modelValue || !isModal.value || !isTop.value) {
    return;
  }

  if (document.activeElement !== element) {
    return;
  }

  focusInitialElement();
}

function showModalRoot({ deferInitialFocus = false } = {}) {
  const element = root.value;

  if (!(element instanceof HTMLDialogElement)) {
    return;
  }

  if (!element.open) {
    element.show();
  }

  if (isAppRootScoped.value) {
    const scoped = scopedContext.value;

    if (!scoped) {
      return;
    }

    registerDialog(element, buildScopeOptions(scoped.context));
  } else {
    registerDialog(element);
  }

  if (deferInitialFocus) {
    element.focus({ preventScroll: true });
  } else {
    focusInitialElement();
  }
}

async function openSheet() {
  clearPhaseTimer();
  stopDragging();
  clearDragStyle();

  if (rendered.value) {
    phase.value = 'opening';
    await nextTick();
    refreshBottomGeometry();
    waitForPhase(400, () => {
      phase.value = 'open';
      emit('opened');
    });
    return;
  }

  const activator = hasActivatorSlot.value ? resolveActivatorTarget() : null;

  if (hasActivatorSlot.value && !activator) {
    warnForInvalidActivator();
    requestClose();
    return;
  }

  if (isModal.value) {
    const attachTarget = resolveAttach();
    const scoped = resolveScopedEntry(attachTarget);
    const target = scoped ? scoped.target : attachTarget;

    if (!target) {
      warnForInvalidAttach();
      requestClose();
      return;
    }

    scopedContext.value = scoped;
    teleportTarget.value = target;
    previousFocus = activator ?? (
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    );
  } else {
    scopedContext.value = null;
  }

  previousWasModal = isModal.value;
  rendered.value = true;
  phase.value = 'opening';
  warnForAccessibleName();
  await nextTick();

  if (!props.modelValue || !root.value) {
    return;
  }

  if (isModal.value) {
    showModalRoot({ deferInitialFocus: true });
  }

  refreshBottomGeometry();
  waitForPhase(400, () => {
    phase.value = 'open';
    focusInitialElementWhenIdle();
    emit('opened');
  });
}

function restoreFocus() {
  if (previousWasModal && previousFocus?.isConnected) {
    previousFocus.focus({ preventScroll: true });
  }

  previousFocus = null;
  previousWasModal = false;
}

function finishClose() {
  const element = root.value;

  if (element instanceof HTMLDialogElement) {
    if (element.open) {
      element.close();
    }

    unregisterDialog(element);
  }

  scopedContext.value = null;
  rendered.value = false;
  phase.value = 'closed';
  releaseContentGesture();
  stopDragging();
  stopContentObserver();
  clearDragStyle();
  nextTick(() => {
    restoreFocus();
    emit('closed');
  });
}

function closeSheet() {
  if (!rendered.value) {
    return;
  }

  if (phase.value === 'closing') {
    return;
  }

  closeMotion.start({
    canStart: () => rendered.value && phase.value !== 'closing',
    duration: 200,
    getElement: () => root.value,
    isActive: () => mounted && !props.modelValue
      && phase.value === 'closing'
      && rendered.value
      && Boolean(root.value),
    onFinish: finishClose,
    onStart: () => {
      phase.value = 'closing';
    },
  });
}

/**
 * @param {Event} event
 */
function handleCancel(event) {
  event.preventDefault();

  if (!props.closeOnBack) {
    return;
  }

  requestClose();
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (event.key !== 'Escape' || !props.closeOnBack) {
    return;
  }

  event.preventDefault();
  requestClose();
}

/**
 * 根元素按下：modal 记录按下是否落在帷幕上，供帷幕点击判断按下与抬起同在
 * 帷幕；standard 下触摸按下进入拖动。
 *
 * @param {PointerEvent} event
 */
function handleRootPress(event) {
  scrimPressed = isModal.value && event.target === root.value;

  if (!isModal.value) {
    handleRootPointerDown(event);
  }
}

/**
 * 帷幕点击：按下与抬起都落在帷幕上时请求关闭，面板内开始的文本选择或拖拽
 * 不会触发。
 *
 * @param {MouseEvent} event
 */
function handleSheetClick(event) {
  if (!isModal.value || !props.closeOnBack || !scrimPressed || event.target !== root.value) {
    return;
  }

  requestClose();
}

/**
 * 内容手势向上展开超出可用高度后，把剩余位移交给内容滚动。
 *
 * @param {number} extent 当前请求的可见高度
 */
function syncDragScrollHandoff(extent) {
  if (!dragHandsOffScroll) {
    return;
  }

  const scroller = resolveContentScrollElement();

  if (!scroller || extent <= dragAvailableExtent) {
    return;
  }

  const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);

  scroller.scrollTop = Math.min(
    maxScrollTop,
    Math.max(0, dragStartScrollTop + (extent - dragAvailableExtent)),
  );
}

/**
 * @param {PointerEvent} event
 */
function updateDragNow(event) {
  if (event.pointerId !== activePointerId) {
    return;
  }

  if (props.direction === 'bottom') {
    dragDistance = event.clientY - dragStart;
    const extent = dragStartVisibleExtent - dragDistance;
    const geometry = resolveBottomSheetDragGeometry({
      availableExtent: dragAvailableExtent,
      extent,
      overshootLimit: dragOvershootLimit,
    });

    writeDragStyle(geometry.offset, geometry.size);
    syncDragScrollHandoff(extent);
    return;
  }

  writeDragStyle(
    props.position === 'start'
      ? Math.max(0, dragStart - event.clientX)
      : Math.max(0, event.clientX - dragStart),
    null,
  );
}

const dragFrame = createFrameScheduler(updateDragNow);

/**
 * @param {PointerEvent} event
 */
function updateDrag(event) {
  if (event.pointerId !== activePointerId) {
    return;
  }

  dragFrame.schedule(event);
}

/**
 * @param {{keepDragging?: boolean}} [options] 关闭动画需要沿用拖拽几何时保留拖动状态
 */
function stopDragging({ keepDragging = false } = {}) {
  activePointerId = null;
  dragging.value = keepDragging;
  window.removeEventListener('pointermove', updateDrag);
  window.removeEventListener('pointerup', finishDrag);
  window.removeEventListener('pointercancel', cancelDrag);
}

/**
 * 请求关闭并保留当前拖拽几何，让退出动画从可见位置继续播放；
 * 使用者没有接受关闭请求时恢复常态，避免面板停留在拖拽尺寸。
 */
function requestCloseFromDrag() {
  requestClose();

  nextTick(() => {
    if (props.modelValue) {
      stopDragging();
      clearDragStyle();
    }
  });
}

/**
 * 结算底部拖动：快速下甩或落点在关闭分区时请求关闭，折叠档快速上甩请求
 * 展开，其余按相邻档位中点吸附。
 *
 * @param {{distance: number, velocity: number}} input
 */
function finishBottomDrag({ distance, velocity }) {
  const target = resolveBottomSheetDragTarget({
    availableExtent: dragAvailableExtent,
    contentExtent: dragContentExtent,
    currentExtent: dragStartVisibleExtent,
    currentValue: bottomExpanded.value,
  }, dragStartVisibleExtent - dragDistance);
  const flick = resolveBottomSheetFlick({
    delta: dragDistance,
    distance,
    pointerType: dragPointerType,
    velocity,
  });

  if (target.close || flick === 'close') {
    stopDragging({ keepDragging: true });
    requestCloseFromDrag();
    return;
  }

  if (flick === 'expand' && isBottomCollapsed.value) {
    stopDragging();
    clearDragStyle();
    applyExpanded('max');
    return;
  }

  const unchanged = target.value === bottomExpanded.value
    || target.size === dragStartVisibleExtent;

  stopDragging();
  clearDragStyle();

  if (!unchanged) {
    applyExpanded(target.value);
  }
}

/**
 * @param {{distance: number, threshold: number, velocity: number}} input
 */
function finishSideDrag({ distance, threshold, velocity }) {
  const reachedThreshold = distance >= threshold
    || (distance >= 20 && velocity >= 0.35);

  stopDragging();

  if (reachedThreshold) {
    requestClose();
    return;
  }

  clearDragStyle();
}

/**
 * @param {PointerEvent} event
 */
function finishDrag(event) {
  if (event.pointerId !== activePointerId) {
    return;
  }

  dragFrame.flush();
  const elapsed = Math.max(1, performance.now() - dragStartedAt);
  const distance = props.direction === 'bottom'
    ? Math.abs(dragDistance)
    : dragOffset;
  const velocity = distance / elapsed;

  if (props.direction === 'bottom') {
    finishBottomDrag({ distance, velocity });
    return;
  }

  finishSideDrag({
    distance,
    threshold: Math.min(120, Math.max(48, dragStartExtent * 0.15)),
    velocity,
  });
}

function cancelDrag() {
  dragFrame.cancel();
  stopDragging();
  clearDragStyle();
}

/**
 * @param {PointerEvent} event
 */
function startDrag(event) {
  if (!props.draggable || event.button !== 0 || activePointerId !== null || contentGesture) {
    return;
  }

  dragFrame.cancel();
  activePointerId = event.pointerId;
  dragStart = props.direction === 'bottom' ? event.clientY : event.clientX;
  dragStartExtent = props.direction === 'bottom'
    ? dragElement.value?.getBoundingClientRect().height ?? 0
    : dragElement.value?.getBoundingClientRect().width ?? 0;
  dragPointerType = event.pointerType ?? null;
  dragStartedAt = performance.now();
  dragDistance = 0;
  dragHandsOffScroll = false;

  if (props.direction === 'bottom') {
    dragStartVisibleExtent = dragStartExtent;
    dragContentExtent = resolveContentExtent();
    dragAvailableExtent = resolveAvailableExtent();
    dragOvershootLimit = resolveTopGap();
    writeDragStyle(0, dragStartExtent);
  } else {
    writeDragStyle(0, null);
  }

  dragging.value = true;
  window.addEventListener('pointermove', updateDrag);
  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', cancelDrag);
}

/**
 * @param {PointerEvent} event
 */
function handleRootPointerDown(event) {
  if (props.direction !== 'side' || event.pointerType !== 'touch') {
    return;
  }

  if (event.target instanceof Element && event.target.closest(
    'button, a, input, textarea, select, [contenteditable="true"]',
  )) {
    return;
  }

  startDrag(event);
}

/**
 * @param {PointerEvent} event
 */
function handleModalPointerDown(event) {
  if (isModal.value) {
    handleRootPointerDown(event);
  }
}

/**
 * 面板按下：side modal 沿用触摸拖动关闭，bottom 建立内容手势跟踪。
 *
 * @param {PointerEvent} event
 */
function handlePanelPointerDown(event) {
  handleModalPointerDown(event);
  handleBottomPress(event);
}

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth;
  refreshBottomGeometry();
}

/**
 * @param {'modal'|'standard'} nextVariant
 * @param {'modal'|'standard'} previousVariant
 */
async function handleVariantChange(nextVariant, previousVariant) {
  if (!rendered.value || !props.modelValue || nextVariant === previousVariant) {
    return;
  }

  clearPhaseTimer();
  const element = root.value;

  if (previousVariant === 'modal' && element instanceof HTMLDialogElement) {
    if (element.open) {
      element.close();
    }

    unregisterDialog(element);
    restoreFocus();
    scopedContext.value = null;
  }

  if (nextVariant === 'modal') {
    const attachTarget = resolveAttach();
    const scoped = resolveScopedEntry(attachTarget);
    const target = scoped ? scoped.target : attachTarget;

    if (!target) {
      warnForInvalidAttach();
      requestClose();
      return;
    }

    scopedContext.value = scoped;
    teleportTarget.value = target;
    previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    previousWasModal = true;
    warnForAccessibleName();
  }

  phase.value = 'open';
  await nextTick();

  if (nextVariant === 'modal' && props.modelValue) {
    showModalRoot();
  }

  refreshBottomGeometry();
}

onMounted(() => {
  mounted = true;
  updateViewportWidth();
  window.addEventListener('resize', updateViewportWidth);

  if (props.modelValue) {
    openSheet();
  }
});
// 渲染后重新测量：内容、页脚或把手行换元素时观察目标需要重建。
onUpdated(refreshBottomGeometry);
onBeforeUnmount(() => {
  dragFrame.cancel();
  mounted = false;
  clearPhaseTimer();
  releaseContentGesture();
  stopDragging();
  stopContentObserver();
  window.removeEventListener('resize', updateViewportWidth);

  const element = root.value;

  if (element instanceof HTMLDialogElement) {
    unregisterDialog(element);

    if (element.open) {
      element.close();
    }
  }
});
watch(() => props.modelValue, (open) => {
  if (!mounted) {
    return;
  }

  if (open) {
    openSheet();
  } else {
    closeSheet();
  }
});
watch(resolvedVariant, handleVariantChange);
watch(() => props.attach, () => {
  if (props.modelValue && rendered.value && isModal.value) {
    console.warn(`${props.componentName}: 打开期间修改 attach 将在下次打开时生效`);
  }
});
watch(() => props.closeLabel, (value) => {
  if (value.trim().length === 0) {
    console.warn(`${props.componentName}: closeLabel 必须是非空字符串`);
  }
}, { immediate: true });
</script>

<template>
  <span v-if="hasActivatorSlot" ref="activatorHost" class="mat-sheet__activator">
    <slot name="activator" />
  </span>

  <Teleport
    v-if="rendered"
    :to="teleportTarget ?? 'body'"
    :disabled="!isModal"
  >
    <MatSurfaceBase
      ref="surface"
      v-bind="$attrs"
      :as="rootTag"
      class="mat-sheet"
      :class="[
        `mat-sheet--${direction}`,
        `mat-sheet--${resolvedVariant}`,
        `mat-sheet--${phase}`,
        `mat-sheet--position-${position}`,
        {
          'mat-sheet--app-root': isAppRootScoped,
          'mat-sheet--dragging': dragging,
          'mat-sheet--sized': usesExplicitBlockSize,
          'mat-sheet--no-shadow': !shadow,
          'mat-sheet--no-rounded': !rounded,
          'mat-sheet--top': isTop,
          'mat-sheet--transparent-scrim': !scrim,
          'mat-sheet--explicit-container-color': props.containerColor && !isModal,
        },
      ]"
      :style="rootStyle"
      :aria-labelledby="$attrs['aria-labelledby'] ?? (direction === 'side' && hasTitle ? titleId : undefined)"
      :aria-modal="isModal ? 'true' : undefined"
      :tabindex="isModal ? -1 : undefined"
      @cancel="handleCancel"
      @click="handleSheetClick"
      @keydown="handleKeyDown"
      @pointerdown="handleRootPress"
    >
      <div
        ref="panelElement"
        class="mat-sheet__panel"
        :class="panelClasses"
        :style="panelStyle"
        @pointerdown="handlePanelPointerDown"
        @wheel="handleContentWheel"
      >
        <button
          v-if="direction === 'bottom' && dragHandle"
          class="mat-sheet__drag-handle-target"
          type="button"
          data-sheet-drag-handle
          :aria-label="resolvedDragHandleLabel"
          @keydown="handleDragHandleKeydown"
          @pointerdown.stop="startDrag"
        >
          <slot name="drag-handle">
            <span class="mat-sheet__drag-handle" />
          </slot>
        </button>

        <header v-if="direction === 'side' && hasHeader" class="mat-sheet__header">
          <slot name="header">
            <h2
              v-if="hasTitle"
              :id="titleId"
              class="mat-sheet__title mat-sys-typescale-title-large"
            >
              <template v-if="title !== undefined">
                {{ title }}
              </template>
              <slot v-else name="title" />
            </h2>

            <div v-if="$slots.actions" class="mat-sheet__header-actions">
              <slot name="actions" />
            </div>

            <MatBtn
              v-if="showCloseButton"
              class="mat-sheet__close"
              icon="close"
              :label="closeLabel"
              size="small"
              variant="standard"
              @click="requestClose"
            />
          </slot>
        </header>

        <MatScrollArea
          v-if="hasContent"
          ref="contentArea"
          class="mat-sheet__content mat-sys-typescale-body-medium"
          orientation="vertical"
          no-scroll-padding
          bar-width="thin"
        >
          <div class="mat-sheet__content-body">
            <template v-if="direction !== 'bottom' && content !== undefined">
              {{ content }}
            </template>
            <slot v-else-if="$slots.default" />
            <template v-else-if="content !== undefined">
              {{ content }}
            </template>
          </div>
        </MatScrollArea>

        <div v-if="$slots.footer" class="mat-sheet__footer">
          <slot name="footer" />
        </div>
      </div>
    </MatSurfaceBase>
  </Teleport>
</template>

<style scoped>
@layer mde.components {
  .mat-sheet__activator {
    display: contents;
  }

  .mat-sheet {
    --mat-sheet-container-color: var(--mat-sys-color-surface-container-low);
    --mat-sheet-content-color: var(--mat-sys-color-on-surface-variant);
    --mat-sheet-full-block-size: calc(100dvb - 72px);
    --mat-sheet-min-block-size: 64px;
    --mat-sheet-preferred-width: 100%;
    --mat-sheet-drag-offset: 0;
    box-sizing: border-box;
    min-inline-size: 0;
    padding: 0;
    border: 0;
  }

  .mat-sheet--standard {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    overflow: hidden;
    color: var(--mat-sheet-content-color);
    background: var(--mat-sheet-container-color);
    box-shadow: none;
  }

  .mat-sheet--standard > .mat-sheet__panel {
    display: contents;
  }

  .mat-sheet--modal {
    position: fixed;
    z-index: var(--mat-sys-z-index-dialog);
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    margin: 0;
    background: transparent;
    pointer-events: auto;
  }

  .mat-sheet--modal[open] {
    display: block;
  }

  .mat-sheet--modal.mat-sheet--app-root {
    position: absolute;
  }

  .mat-sheet--modal.mat-sheet--top:not(.mat-sheet--transparent-scrim):not(.mat-sheet--closing) {
    background: color-mix(in srgb, var(--mat-sys-color-scrim) 32%, transparent);
  }

  .mat-sheet--modal.mat-sheet--opening {
    animation: mat-sheet-scrim-enter var(--mat-sys-motion-spring-default-effects) both;
  }

  .mat-sheet--modal.mat-sheet--closing {
    animation: mat-sheet-scrim-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-sheet__panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    overflow: hidden;
    color: var(--mat-sheet-content-color);
    background: var(--mat-sheet-container-color);
    border: 0;
    box-shadow: none;
  }

  .mat-sheet--standard.mat-sheet--bottom {
    --mat-sheet-full-block-size: calc(100dvb - 72px);
    interpolate-size: allow-keywords;
    align-self: center;
    block-size: fit-content;
    min-block-size: var(--mat-sheet-min-block-size);
    inline-size: min(var(--mat-sheet-preferred-width), 100%);
    max-inline-size: min(640px, 100%);
    max-block-size: var(--mat-sheet-max-block-size, var(--mat-sheet-full-block-size));
    border-radius: var(--mat-sys-shape-corner-extra-large)
      var(--mat-sys-shape-corner-extra-large)
      var(--mat-sys-shape-corner-none)
      var(--mat-sys-shape-corner-none);
    box-shadow: var(--mat-sys-elevation-level1), 0 50vh 0 0 var(--mat-sheet-container-color);
    transform: translateY(var(--mat-sheet-drag-offset, 0));
    transition: transform var(--mat-sys-motion-spring-fast-spatial), block-size var(--mat-sys-motion-spring-fast-spatial), box-shadow var(--mat-sys-motion-spring-fast-effects), border-radius var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-sheet--modal .mat-sheet__panel--bottom {
    --mat-sheet-full-block-size: calc(100% - 72px);
    interpolate-size: allow-keywords;
    position: absolute;
    inset-block-end: 0;
    inset-inline: 0;
    block-size: fit-content;
    min-block-size: var(--mat-sheet-min-block-size);
    inline-size: min(var(--mat-sheet-preferred-width), 100%);
    max-inline-size: min(640px, 100%);
    max-block-size: var(--mat-sheet-max-block-size, var(--mat-sheet-full-block-size));
    margin-inline: auto;
    border-radius: var(--mat-sys-shape-corner-extra-large)
      var(--mat-sys-shape-corner-extra-large)
      var(--mat-sys-shape-corner-none)
      var(--mat-sys-shape-corner-none);
    box-shadow: var(--mat-sys-elevation-level1), 0 50vh 0 0 var(--mat-sheet-container-color);
    transform: translateY(var(--mat-sheet-drag-offset, 0));
    transition: transform var(--mat-sys-motion-spring-fast-spatial), block-size var(--mat-sys-motion-spring-fast-spatial), box-shadow var(--mat-sys-motion-spring-fast-effects), border-radius var(--mat-sys-motion-spring-fast-effects);
  }

  /* min、full 与自定义高度使用显式 block-size；normal 与 max 按内容自然高度渲染。 */
  .mat-sheet--standard.mat-sheet--bottom.mat-sheet--sized {
    block-size: var(--mat-sheet-expanded-block-size, var(--mat-sheet-full-block-size));
  }

  .mat-sheet--modal .mat-sheet__panel--bottom.mat-sheet__panel--sized {
    block-size: var(--mat-sheet-expanded-block-size, var(--mat-sheet-full-block-size));
  }

  .mat-sheet--standard.mat-sheet--bottom.mat-sheet--no-shadow,
  .mat-sheet--modal.mat-sheet--no-shadow .mat-sheet__panel--bottom {
    box-shadow: none;
  }

  .mat-sheet--standard.mat-sheet--bottom.mat-sheet--no-rounded,
  .mat-sheet--modal.mat-sheet--no-rounded .mat-sheet__panel--bottom {
    border-radius: var(--mat-sys-shape-corner-none);
  }

  .mat-sheet--standard.mat-sheet--side {
    --mat-sheet-container-color: var(--mat-sys-color-surface);
    align-self: stretch;
    inline-size: min(var(--mat-sheet-preferred-width), 100%);
    max-inline-size: min(400px, 100%);
    min-block-size: 0;
    border-radius: var(--mat-sys-shape-corner-large);
    touch-action: pan-y;
  }

  .mat-sheet--explicit-container-color,
  .mat-sheet--standard.mat-sheet--side.mat-sheet--explicit-container-color {
    --mat-sheet-container-color: var(--mat-sys-color-surface-container-low);
  }

  .mat-sheet--standard.mat-sheet--side.mat-sheet--position-end {
    border-start-end-radius: var(--mat-sys-shape-corner-none);
    border-end-end-radius: var(--mat-sys-shape-corner-none);
    transform: translateX(var(--mat-sheet-drag-offset));
  }

  .mat-sheet--standard.mat-sheet--side.mat-sheet--position-start {
    border-start-start-radius: var(--mat-sys-shape-corner-none);
    border-end-start-radius: var(--mat-sys-shape-corner-none);
    transform: translateX(calc(-1 * var(--mat-sheet-drag-offset)));
  }

  .mat-sheet--modal .mat-sheet__panel--side {
    position: absolute;
    inset-block: 0;
    inline-size: min(var(--mat-sheet-preferred-width), calc(100% - 16px), 400px);
    max-inline-size: min(calc(100% - 16px), 400px);
    min-block-size: 100%;
    block-size: 100%;
    max-block-size: 100%;
    margin-block: 0;
    border-radius: var(--mat-sys-shape-corner-large);
    box-shadow: var(--mat-sys-elevation-level1);
    touch-action: pan-y;
  }

  .mat-sheet--modal .mat-sheet__panel--side.mat-sheet__panel--position-end {
    inset-inline: auto 0;
    margin-inline: auto 0;
    border-start-end-radius: var(--mat-sys-shape-corner-none);
    border-end-end-radius: var(--mat-sys-shape-corner-none);
  }

  .mat-sheet--modal .mat-sheet__panel--side.mat-sheet__panel--position-start {
    inset-inline: 0 auto;
    margin-inline: 0 auto;
    border-start-start-radius: var(--mat-sys-shape-corner-none);
    border-end-start-radius: var(--mat-sys-shape-corner-none);
  }

  .mat-sheet__drag-handle-target {
    display: flex;
    flex: 0 0 48px;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    padding: 0;
    touch-action: none;
    user-select: none;
    color: inherit;
    background: transparent;
    border: 0;
    cursor: grab;
  }

  .mat-sheet__drag-handle-target:active {
    cursor: grabbing;
  }

  .mat-sheet__drag-handle-target:focus-visible {
    outline: 2px solid var(--mat-sys-color-primary);
    outline-offset: -4px;
  }

  .mat-sheet__drag-handle {
    display: block;
    inline-size: 32px;
    block-size: 4px;
    background: var(--mat-sys-color-on-surface-variant);
    border-radius: var(--mat-sys-shape-corner-full);
    opacity: .4;
  }

  .mat-sheet__header {
    display: flex;
    flex: 0 0 auto;
    gap: 16px;
    align-items: center;
    box-sizing: border-box;
    min-block-size: 64px;
    min-inline-size: 0;
    padding: 12px 16px 12px 24px;
  }

  .mat-sheet--side .mat-sheet__header {
    padding-inline: 24px;
  }

  .mat-sheet--bottom .mat-sheet__drag-handle-target + .mat-sheet__header {
    padding-block-start: 0;
  }

  .mat-sheet__title {
    flex: 1 1 auto;
    min-inline-size: 0;
    margin: 0;
    padding: 0;
    overflow-wrap: anywhere;
    color: var(--mat-sys-color-on-surface);
    border: 0;
  }

  .mat-sheet__header-actions {
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    min-inline-size: 0;
  }

  .mat-sheet__close {
    flex-shrink: 0;
  }

  .mat-sheet__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    box-sizing: border-box;
    min-block-size: 0;
    inline-size: 100%;
    overscroll-behavior: contain;
  }

  .mat-sheet__content-body {
    box-sizing: border-box;
    min-inline-size: 0;
    inline-size: 100%;
    overflow-wrap: anywhere;
  }

  .mat-sheet--side .mat-sheet__content-body {
    padding-block: 16px 24px;
    padding-inline: 24px calc(24px - var(--mat-scroll-area-scrollbar-width, 0px));
  }

  .mat-sheet--side .mat-sheet__content:first-child .mat-sheet__content-body {
    padding-block-start: 24px;
  }

  .mat-sheet__footer {
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    box-sizing: border-box;
    inline-size: 100%;
    min-block-size: 72px;
    padding: 16px 24px 24px;
  }

  @media (width >= 641px) {
    .mat-sheet--standard.mat-sheet--bottom {
      --mat-sheet-full-block-size: calc(100dvb - 56px);
      max-inline-size: min(640px, calc(100% - 112px));
    }

    .mat-sheet--modal .mat-sheet__panel--bottom {
      --mat-sheet-full-block-size: calc(100% - 56px);
      max-inline-size: min(640px, calc(100% - 112px));
    }
  }

  /* 跟手拖动不受当前档位上限约束，向上超出可用高度的部分由阻尼值给出。 */
  .mat-sheet--standard.mat-sheet--bottom.mat-sheet--dragging,
  .mat-sheet--modal .mat-sheet__panel--bottom.mat-sheet__panel--dragging {
    block-size: var(--mat-sheet-drag-size);
    max-block-size: none;
    transition: none;
  }

  .mat-sheet--standard.mat-sheet--opening.mat-sheet--bottom {
    animation: mat-bottom-sheet-enter var(--mat-sys-motion-spring-default-spatial) both;
  }

  .mat-sheet--standard.mat-sheet--closing.mat-sheet--bottom {
    animation: mat-bottom-sheet-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-sheet--standard.mat-sheet--opening.mat-sheet--side.mat-sheet--position-end {
    animation: mat-side-sheet-end-enter var(--mat-sys-motion-spring-default-spatial) both;
  }

  .mat-sheet--standard.mat-sheet--closing.mat-sheet--side.mat-sheet--position-end {
    animation: mat-side-sheet-end-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-sheet--standard.mat-sheet--opening.mat-sheet--side.mat-sheet--position-start {
    animation: mat-side-sheet-start-enter var(--mat-sys-motion-spring-default-spatial) both;
  }

  .mat-sheet--standard.mat-sheet--closing.mat-sheet--side.mat-sheet--position-start {
    animation: mat-side-sheet-start-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-sheet--modal.mat-sheet--opening .mat-sheet__panel--bottom {
    animation: mat-bottom-sheet-enter var(--mat-sys-motion-spring-default-spatial) both;
  }

  .mat-sheet--modal.mat-sheet--closing .mat-sheet__panel--bottom {
    animation: mat-bottom-sheet-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-sheet--modal.mat-sheet--opening .mat-sheet__panel--side.mat-sheet__panel--position-end {
    animation: mat-side-sheet-end-enter var(--mat-sys-motion-spring-default-spatial) both;
  }

  .mat-sheet--modal.mat-sheet--closing .mat-sheet__panel--side.mat-sheet__panel--position-end {
    animation: mat-side-sheet-end-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-sheet--modal.mat-sheet--opening .mat-sheet__panel--side.mat-sheet__panel--position-start {
    animation: mat-side-sheet-start-enter var(--mat-sys-motion-spring-default-spatial) both;
  }

  .mat-sheet--modal.mat-sheet--closing .mat-sheet__panel--side.mat-sheet__panel--position-start {
    animation: mat-side-sheet-start-exit var(--mat-sys-motion-spring-fast-effects) both;
  }

  .mat-sheet--modal .mat-sheet__panel--dragging,
  .mat-sheet--standard.mat-sheet--dragging {
    transition: none;
  }

  @keyframes mat-bottom-sheet-enter {
    from {
      transform: translateY(100%);
    }
  }

  @keyframes mat-bottom-sheet-exit {
    to {
      transform: translateY(100%);
    }
  }

  @keyframes mat-side-sheet-end-enter {
    from {
      transform: translateX(100%);
    }
  }

  @keyframes mat-side-sheet-end-exit {
    to {
      transform: translateX(100%);
    }
  }

  @keyframes mat-side-sheet-start-enter {
    from {
      transform: translateX(-100%);
    }
  }

  @keyframes mat-side-sheet-start-exit {
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes mat-sheet-scrim-enter {
    from {
      background: transparent;
    }
  }

  @keyframes mat-sheet-scrim-exit {
    to {
      background: transparent;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-sheet,
    .mat-sheet__panel {
      animation: none;
      transition: none;
    }
  }
}
</style>
