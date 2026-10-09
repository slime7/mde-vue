<script setup>
import {
  computed, inject, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import vStateLayer from '../../directives/state-layer';
import MatActionBase from '../MatActionBase.vue';
import { BUTTON_TYPES } from '../button-props';
import createMotionController from '../motion-controller';
import createSwipeGesture, { swipeDirectionFor } from '../swipe-gesture';
import { MAT_LIST_GROUP_ACTIVATOR_KEY, MAT_LIST_KEY } from '../list-context';
import { useMatProps } from '../use-mat-props';
import MatListItemContent from './MatListItemContent.vue';

defineOptions({
  name: 'MatListItem',
  inheritAttrs: false,
});

/* 移除退场兜底时长（毫秒），与 CSS 中 spatial-fast 的 350ms 过渡对应。 */
const SWIPE_LEAVE_FALLBACK = 400;
const SWIPE_COLLAPSE_FALLBACK = 400;
/* 应用未在 remove 后更新数据时，恢复原状的等待时长。 */
const SWIPE_RESTORE_FALLBACK = 500;

const props = defineProps({
  /**
   * 选择或拖动排序中的稳定项目值。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * 设置后渲染原生链接，否则渲染 button。
   *
   * @type {string | undefined}
   * @default undefined
   */
  href: {
    type: String,
    default: undefined,
  },
  /**
   * button 模式下的原生类型；可选值为 `button`、`submit`、`reset`。
   *
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   */
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return BUTTON_TYPES.includes(value);
    },
  },
  /**
   * 禁止项目被激活。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 内容行数；可选值为 `1`、`2`、`3`。
   *
   * @type {1 | 2 | 3 | undefined}
   * @default undefined
   */
  lines: {
    type: Number,
    default: undefined,
    validator(value) {
      return [1, 2, 3].includes(value);
    },
  },
  /**
   * 是否将 trailing 插槽与主操作/选择区分离渲染为独立操作区。
   *
   * @type {boolean}
   * @default false
   */
  separateTrailing: {
    type: Boolean,
    default: false,
  },
  /**
   * 启用触摸与手写笔的横向滑动手势；鼠标指针不参与，PC 端通过 `swipe()` 触发。
   * 仅在普通列表与 single-action 列表的项目上生效。
   *
   * @type {boolean}
   * @default false
   */
  swipeable: {
    type: Boolean,
    default: false,
  },
  /**
   * 没有 `swipe-actions` 插槽时，越过提交阈值的滑动播放退场动画后发出 `remove`。
   *
   * @type {boolean}
   * @default false
   */
  swipeRemove: {
    type: Boolean,
    default: false,
  },
  /**
   * 露出模式下允许长划越过阈值触发末尾主要操作；触发时发出 `primary`
   * 并将前景移出屏幕。
   *
   * @type {boolean}
   * @default false
   */
  swipePrimary: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('listItem', props);

const emit = defineEmits({
  /**
   * 启用的列表项被用户激活时转发原生点击事件，载荷为 `MouseEvent`。
   */
  click(payload) {
    return payload instanceof MouseEvent;
  },
  /**
   * 滑动手势锁定横向意图时发出，载荷为 `{ direction: 'start' | 'end' }`。
   */
  swipestart(payload) {
    return Boolean(payload) && ['start', 'end'].includes(payload.direction);
  },
  /**
   * 滑动手势释放时发出，载荷为
   * `{ direction: 'start' | 'end', distance: number, action: 'none' | 'reveal' | 'remove' | 'primary' }`。
   */
  swipeend(payload) {
    return Boolean(payload) && ['start', 'end'].includes(payload.direction)
      && ['none', 'reveal', 'remove', 'primary'].includes(payload.action);
  },
  /**
   * 移除模式越过提交阈值、退场动画结束后发出，载荷为 `{ direction: 'start' | 'end' }`；
   * 组件不修改列表数据，由应用决定是否移除对应项目。
   */
  remove(payload) {
    return Boolean(payload) && ['start', 'end'].includes(payload.direction);
  },
  /**
   * 露出模式下全划越过主要操作阈值时发出，载荷为 `{ direction: 'start' | 'end' }`。
   */
  primary(payload) {
    return Boolean(payload) && ['start', 'end'].includes(payload.direction);
  },
});
const slots = useSlots();
const list = inject(MAT_LIST_KEY, null);
const groupActivator = inject(MAT_LIST_GROUP_ACTIVATOR_KEY, null);
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const interaction = computed(() => list?.interaction.value ?? 'none');
const isAction = computed(() => (
  interaction.value === 'single-action' || interaction.value === 'multi-action'
));
const isMultiAction = computed(() => interaction.value === 'multi-action');
const isSelectable = computed(() => list?.isSelectable.value ?? false);
const selected = computed(() => list?.isSelected(propsWithDefaults.value) ?? false);
const hasTrailing = computed(() => Boolean(slots.trailing));
const shouldSeparateTrailing = computed(() => (
  hasTrailing.value && (isMultiAction.value || (isSelectable.value && propsWithDefaults.separateTrailing))
));
const itemRoot = ref(null);
const dragToken = Symbol('mat-list-item-drag');
const dragElement = computed(() => {
  if (itemRoot.value instanceof HTMLElement) {
    return itemRoot.value;
  }

  return itemRoot.value?.$el instanceof HTMLElement ? itemRoot.value.$el : null;
});
const dragValue = computed(() => propsWithDefaults.value);
const dragDisabled = computed(() => (
  propsWithDefaults.disabled || Boolean(groupActivator) || propsWithDefaults.swipeable
));
const lineCount = computed(() => {
  if (propsWithDefaults.lines !== undefined) {
    return propsWithDefaults.lines;
  }

  const additionalLines = Number(Boolean(slots.overline)) + Number(Boolean(slots.supporting));

  return Math.min(3, 1 + additionalLines);
});
const surfaceClasses = computed(() => ({
  'mat-list-item--disabled': propsWithDefaults.disabled,
  'mat-list-item--selected': selected.value,
  [`mat-list-item--lines-${lineCount.value}`]: true,
}));
const itemStateLayerOptions = computed(() => {
  if (!isMultiAction.value) {
    // single-action 的状态层由 primary 自行渲染并随其圆角形变；
    // 列表项自身没有圆角，状态层必须透明，否则直角层会盖过圆角 item。
    return { color: 'transparent' };
  }

  return { color: 'var(--mat-action-state-color, currentcolor)' };
});

const supportsSwipe = computed(() => (
  !groupActivator && (interaction.value === 'none' || interaction.value === 'single-action')
));
const swipeUnderMode = computed(() => {
  if (slots['swipe-actions']) {
    return 'reveal';
  }

  return propsWithDefaults.swipeRemove ? 'dismiss' : 'elastic';
});
const swipeEnabled = computed(() => (
  propsWithDefaults.swipeable && !propsWithDefaults.disabled && supportsSwipe.value
));
const swipeUnderRef = ref(null);
const swipeShift = ref(0);
const swipeTranslate = ref(0);
const swipeDragging = ref(false);
const swipeSuppress = ref(false);
const swipeRevealed = ref(false);
/** 退场阶段：`idle` 静止、`leave` 前景滑出、`collapse` 整行收拢。 */
const swipeExitPhase = ref('idle');
const swipeRemoving = computed(() => swipeExitPhase.value !== 'idle');
const swipeCollapsing = computed(() => swipeExitPhase.value === 'collapse');
const swipeRtl = ref(false);
const isSwiping = computed(() => (
  swipeDragging.value && Math.abs(swipeShift.value) >= 12
));
let swipeShiftStart = 0;
const swipeMotion = createMotionController();

function swipeRootElement() {
  return dragElement.value;
}

function swipeWidth() {
  return swipeRootElement()?.offsetWidth || 0;
}

function measureRevealWidth() {
  return swipeUnderRef.value?.offsetWidth || 0;
}

function logicalFromPhysical(px) {
  return swipeRtl.value ? px : -px;
}

function physicalFromLogical(shift) {
  return swipeRtl.value ? shift : -shift;
}

function clampSwipeShift(raw) {
  if (swipeUnderMode.value === 'reveal') {
    const revealWidth = measureRevealWidth();
    const width = swipeWidth();

    if (propsWithDefaults.swipePrimary) {
      const maxDistance = width > 0 ? width + 24 : Math.max(revealWidth * 2, 240);

      if (raw > maxDistance) {
        return maxDistance + (raw - maxDistance) * 0.2;
      }

      if (raw < 0) {
        return raw * 0.3;
      }

      return raw;
    }

    /* 未开启 swipePrimary 时全划需要回弹：超出上限后强阻尼顶住，不进入展开位；
       宽度不可测量（如单元测试环境）时不设上限。 */
    const cap = width > 0 ? Math.max(width * 0.7, revealWidth + 24) : Number.POSITIVE_INFINITY;

    if (raw > cap) {
      return cap + (raw - cap) * 0.1;
    }

    if (revealWidth > 0 && raw > revealWidth) {
      return revealWidth + (raw - revealWidth) * 0.3;
    }

    if (raw < 0) {
      return raw * 0.3;
    }

    return raw;
  }

  const limit = Math.max(swipeWidth() * 0.6, 200);

  if (Math.abs(raw) > limit) {
    return Math.sign(raw) * (limit + (Math.abs(raw) - limit) * 0.3);
  }

  return raw;
}

function resetSwipeVisual() {
  swipeExitPhase.value = 'idle';
  swipeRevealed.value = false;
  swipeShift.value = 0;
  swipeTranslate.value = 0;
}

/**
 * 无过渡地复位前景并恢复整行高度，用于应用未在退场后移除数据的兜底场景。
 */
function restoreSwipeRow() {
  swipeSuppress.value = true;
  resetSwipeVisual();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      swipeSuppress.value = false;
    });
  });
}

/**
 * 露出模式全划触发主要操作后前景留在屏外，应用未移除数据时在宽限期后复位。
 */
function resetAfterFrontLeave() {
  swipeExitPhase.value = 'leave';
  swipeMotion.wait(swipeRootElement(), 700, restoreSwipeRow);
}

/**
 * 移除退场：前景沿滑动方向滑出，随后收拢整行，动画播完再发出 `remove`；
 * 应用未在事件中移除数据时自动恢复原状。
 *
 * @param {'start' | 'end'} direction
 */
async function dismissSwipeRow(direction) {
  const element = swipeRootElement();
  const width = Math.max(swipeWidth(), 1);

  swipeRevealed.value = false;
  swipeExitPhase.value = 'leave';
  swipeShift.value = (direction === 'start' ? 1 : -1) * width;
  swipeTranslate.value = physicalFromLogical(swipeShift.value);

  await nextTick();
  swipeMotion.wait(element, SWIPE_LEAVE_FALLBACK, async () => {
    swipeExitPhase.value = 'collapse';
    await nextTick();
    swipeMotion.wait(element, SWIPE_COLLAPSE_FALLBACK, () => {
      emit('remove', { direction });
      swipeMotion.wait(element, SWIPE_RESTORE_FALLBACK, restoreSwipeRow, { fallbackWhenIdle: true });
    }, { fallbackWhenIdle: true });
  }, { fallbackWhenIdle: true });
}

function finishSwipe(direction, velocity) {
  const mode = swipeEnabled.value ? swipeUnderMode.value : null;
  const shift = swipeShift.value;
  const logicalVelocity = logicalFromPhysical(velocity);
  const distance = Math.round(Math.abs(shift));
  let action = 'none';

  if (mode === 'reveal') {
    const revealWidth = measureRevealWidth();
    const width = swipeWidth();
    const cap = width > 0 ? Math.max(width * 0.7, revealWidth + 24) : Number.POSITIVE_INFINITY;
    const primaryThreshold = width > 0
      ? Math.max(width * 0.6, revealWidth + 32)
      : 120;
    const shouldTriggerPrimary = propsWithDefaults.swipePrimary && (
      shift >= primaryThreshold || (logicalVelocity > 0.6 && shift > revealWidth)
    );

    if (shouldTriggerPrimary) {
      action = 'primary';
      swipeRevealed.value = false;
      swipeShift.value = Math.sign(shift || 1) * Math.max(width, revealWidth, 1);
      emit('primary', { direction });
      resetAfterFrontLeave();
    } else {
      const shouldReveal = (
        shift > Math.max(revealWidth / 2, 24) && (propsWithDefaults.swipePrimary || shift <= cap)
      ) || (logicalVelocity > 0.5 && (propsWithDefaults.swipePrimary || shift <= cap));

      swipeRevealed.value = shouldReveal;
      swipeShift.value = shouldReveal ? Math.max(revealWidth, 56) : 0;
      action = shouldReveal ? 'reveal' : 'none';
    }
  } else if (mode === 'dismiss') {
    const width = swipeWidth();
    const shouldRemove = (
      Math.abs(shift) > Math.max(width * 0.45, 24) || Math.abs(logicalVelocity) > 0.5
    );

    if (shouldRemove) {
      action = 'remove';
      dismissSwipeRow(direction);
    } else {
      swipeShift.value = 0;
    }
  } else {
    swipeShift.value = 0;
  }

  swipeTranslate.value = physicalFromLogical(swipeShift.value);
  emit('swipeend', { direction, distance, action });
}

const swipeGesture = createSwipeGesture({
  onStart: ({ direction }) => {
    if (propsWithDefaults.disabled) {
      return;
    }

    const element = swipeRootElement();

    swipeRtl.value = Boolean(
      element && globalThis.getComputedStyle(element).direction === 'rtl',
    );
    swipeMotion.cancel();

    /* 退场动画中再次按下：立即复位并重新开始跟手。 */
    if (swipeRemoving.value) {
      resetSwipeVisual();
    }

    swipeShiftStart = swipeShift.value;
    swipeDragging.value = true;
    emit('swipestart', { direction });
  },
  onMove: ({ deltaX }) => {
    swipeShift.value = clampSwipeShift(swipeShiftStart + logicalFromPhysical(deltaX));
    swipeTranslate.value = physicalFromLogical(swipeShift.value);
  },
  onEnd: ({ deltaX, velocity, cancelled }) => {
    swipeDragging.value = false;

    if (cancelled) {
      resetSwipeVisual();
      return;
    }

    finishSwipe(swipeDirectionFor(swipeRootElement(), deltaX), velocity);
  },
});

function bindSwipeGesture() {
  swipeGesture.bind(swipeEnabled.value ? swipeRootElement() : null);
}

/**
 * 以函数触发一次完整滑动（PC 场景）；手势未启用的结构不执行。
 *
 * @param {'start' | 'end'} direction 滑动方向，内容移向的逻辑边缘
 */
function swipe(direction) {
  if (!swipeEnabled.value) {
    return;
  }

  const normalized = direction === 'end' ? 'end' : 'start';
  const element = swipeRootElement();

  swipeRtl.value = Boolean(
    element && globalThis.getComputedStyle(element).direction === 'rtl',
  );
  swipeMotion.cancel();
  emit('swipestart', { direction: normalized });

  const mode = swipeUnderMode.value;

  if (mode === 'reveal' && normalized === 'start') {
    const revealWidth = Math.max(measureRevealWidth(), 56);

    swipeRevealed.value = true;
    swipeShift.value = revealWidth;
    swipeTranslate.value = physicalFromLogical(revealWidth);
    emit('swipeend', {
      direction: normalized,
      distance: Math.round(revealWidth),
      action: 'reveal',
    });
    return;
  }

  if (mode === 'dismiss') {
    const width = Math.max(swipeWidth(), 1);

    dismissSwipeRow(normalized);
    emit('swipeend', {
      direction: normalized,
      distance: Math.round(width),
      action: 'remove',
    });
    return;
  }

  resetSwipeVisual();
  emit('swipeend', {
    direction: normalized,
    distance: 0,
    action: 'none',
  });
}

/**
 * 立即复位滑动状态并收回前景内容，不发出滑动事件。
 */
function resetSwipe() {
  swipeMotion.cancel();
  resetSwipeVisual();
}

/**
 * 展开露出操作区域。
 *
 * @param {'start' | 'end'} [direction='start']
 */
function reveal(direction = 'start') {
  swipe(direction);
}

/**
 * 关闭并收回露出操作区域。
 */
function close() {
  resetSwipe();
}

/**
 * @param {MouseEvent} event
 */
function handleSwipeFrontClick(event) {
  if (swipeRevealed.value) {
    event.preventDefault();
    event.stopPropagation();
    resetSwipe();
  }
}

defineExpose({
  swipe,
  reveal,
  resetSwipe,
  close,
});

/**
 * 判定目标节点是否属于尾部区域内的可交互元素。
 *
 * @param {EventTarget | null} target
 * @param {HTMLElement | null} container
 * @returns {boolean}
 */
function isInteractiveTrailingTarget(target, container) {
  if (!(target instanceof HTMLElement) || !(container instanceof HTMLElement)) {
    return false;
  }

  if (target === container) {
    return false;
  }

  const interactive = target.closest(
    'a[href], button, input, select, textarea, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="checkbox"], [role="radio"], [role="switch"], [tabindex]:not([tabindex="-1"])',
  );

  return Boolean(interactive && container.contains(interactive));
}

/**
 * @param {MouseEvent} event
 */
function handlePrimaryClick(event) {
  if (hasTrailing.value && event.target instanceof HTMLElement) {
    const trailingContainer = event.target.closest('[data-mat-list-trailing]');
    if (trailingContainer && isInteractiveTrailingTarget(event.target, trailingContainer)) {
      return;
    }
  }

  if (isSelectable.value) {
    list?.requestSelection(propsWithDefaults.value, event);
    return;
  }

  if (isAction.value) {
    emit('click', event);
  }
}

function handleGroupActivatorClick() {
  if (!propsWithDefaults.disabled) {
    groupActivator?.toggle();
  }
}

/**
 * @param {KeyboardEvent} event
 */
function handleOptionKeyDown(event) {
  if (propsWithDefaults.disabled || event.repeat || ![' ', 'Enter'].includes(event.key)) {
    return;
  }

  if (hasTrailing.value && event.target instanceof HTMLElement) {
    const trailingContainer = event.target.closest('[data-mat-list-trailing]');
    if (trailingContainer && isInteractiveTrailingTarget(event.target, trailingContainer)) {
      return;
    }
  }

  event.preventDefault();
  list?.requestSelection(propsWithDefaults.value, event);
}

/**
 * @param {PointerEvent} event
 */
function handleTrailingPointerDown(event) {
  if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
    if (isInteractiveTrailingTarget(event.target, event.currentTarget)) {
      event.stopPropagation();
    }
  }
}

function validateProps() {
  if (propsWithDefaults.href !== undefined && !groupActivator && !isAction.value) {
    console.warn('MatListItem: href 仅在 single-action 或 multi-action 模式下生效');
  }

  if (propsWithDefaults.swipeable && !supportsSwipe.value) {
    console.warn('MatListItem: swipeable 仅在普通列表与 single-action 列表的项目上生效，当前结构已忽略');
  }
}

onMounted(async () => {
  validateProps();
  list?.registerDragItem?.({
    token: dragToken,
    element: dragElement,
    value: dragValue,
    disabled: dragDisabled,
  });
  await nextTick();
  list?.requestFocusRefresh();
  bindSwipeGesture();
});
onBeforeUnmount(() => {
  list?.unregisterDragItem?.(dragToken);
  swipeGesture.destroy();
  swipeMotion.cancel();
});
watch(
  () => [
    propsWithDefaults.disabled,
    propsWithDefaults.href,
    propsWithDefaults.value,
    interaction.value,
    propsWithDefaults.separateTrailing,
  ],
  async () => {
    validateProps();
    list?.requestDragValidation?.();
    await nextTick();
    list?.requestFocusRefresh();
  },
);
watch(swipeEnabled, () => {
  bindSwipeGesture();
});
watch(
  () => propsWithDefaults.value,
  () => {
    swipeMotion.cancel();
    resetSwipeVisual();
  },
);
</script>

<template>
  <div
    v-if="groupActivator?.static.value"
    ref="itemRoot"
    v-bind="$attrs"
    :id="groupActivator.labelId"
    class="mat-list-item mat-list-item__surface mat-list-item--static"
    :class="surfaceClasses"
    data-mat-list-group-label
    :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
  >
    <MatListItemContent
      :line-count="lineCount"
      :presentation-slots="false"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>
      <template v-if="$slots.overline" #overline>
        <slot name="overline" />
      </template>
      <slot />
      <template v-if="$slots.supporting" #supporting>
        <slot name="supporting" />
      </template>
      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </MatListItemContent>
  </div>

  <MatActionBase
    v-else-if="groupActivator"
    ref="itemRoot"
    v-bind="$attrs"
    class="mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator"
    :class="surfaceClasses"
    data-mat-list-primary
    data-mat-list-group-activator
    :aria-controls="groupActivator.contentId"
    :aria-expanded="groupActivator.expanded.value ? 'true' : 'false'"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :disabled="propsWithDefaults.disabled"
    :focus-ring="true"
    type="button"
    :use-cursor="matUi.useCursor"
    @click="handleGroupActivatorClick"
  >
    <MatListItemContent
      :line-count="lineCount"
      :presentation-slots="false"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>
      <template v-if="$slots.overline" #overline>
        <slot name="overline" />
      </template>
      <slot />
      <template v-if="$slots.supporting" #supporting>
        <slot name="supporting" />
      </template>
      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </MatListItemContent>
  </MatActionBase>

  <li
    v-else-if="interaction === 'none'"
    ref="itemRoot"
    v-state-layer="swipeEnabled
      ? { color: 'transparent' }
      : { color: 'var(--mat-action-state-color, currentcolor)' }"
    v-bind="$attrs"
    class="mat-list-item mat-list-item__surface"
    :class="[
      surfaceClasses,
      {
        'mat-list-item--swipe': swipeEnabled,
        'mat-list-item--swiping': isSwiping,
        'mat-list-item--swiped': swipeRevealed,
        'mat-list-item--removing': swipeRemoving,
        'mat-list-item--collapsing': swipeCollapsing,
      },
    ]"
    :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
  >
    <span
      v-if="swipeEnabled && swipeUnderMode === 'reveal'"
      ref="swipeUnderRef"
      class="mat-list-item__swipe-under"
      :inert="swipeRevealed ? undefined : ''"
    >
      <slot name="swipe-actions" />
    </span>

    <div
      class="mat-list-item__swipe-front"
      :class="{
        'mat-list-item__surface': swipeEnabled,
        'mat-list-item__swipe-front--dragging': swipeDragging,
        'mat-list-item__swipe-front--suppress': swipeSuppress,
      }"
      :style="swipeEnabled ? { transform: `translateX(${swipeTranslate}px)` } : undefined"
      @click.capture="handleSwipeFrontClick"
    >
      <MatListItemContent
        :line-count="lineCount"
        :presentation-slots="false"
      >
        <template
          v-if="$slots.leading"
          #leading
        >
          <slot name="leading" />
        </template>

        <template
          v-if="$slots.overline"
          #overline
        >
          <slot name="overline" />
        </template>

        <slot />

        <template
          v-if="$slots.supporting"
          #supporting
        >
          <slot name="supporting" />
        </template>

        <template
          v-if="$slots.trailing"
          #trailing
        >
          <slot name="trailing" />
        </template>
      </MatListItemContent>
    </div>
  </li>

  <li
    v-else-if="isAction"
    ref="itemRoot"
    v-state-layer="itemStateLayerOptions"
    class="mat-list-item"
    :class="[
      surfaceClasses,
      {
        'mat-list-item__surface': isMultiAction,
        'mat-list-item--multi-action': isMultiAction,
        'mat-list-item--swipe': swipeEnabled,
        'mat-list-item--swiping': isSwiping,
        'mat-list-item--swiped': swipeRevealed,
        'mat-list-item--removing': swipeRemoving,
        'mat-list-item--collapsing': swipeCollapsing,
      },
    ]"
    :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
  >
    <span
      v-if="swipeEnabled && swipeUnderMode === 'reveal'"
      ref="swipeUnderRef"
      class="mat-list-item__swipe-under"
      :inert="swipeRevealed ? undefined : ''"
    >
      <slot name="swipe-actions" />
    </span>

    <div
      class="mat-list-item__swipe-front"
      :class="{
        'mat-list-item__swipe-front--dragging': swipeDragging,
        'mat-list-item__swipe-front--suppress': swipeSuppress,
      }"
      :style="swipeEnabled ? { transform: `translateX(${swipeTranslate}px)` } : undefined"
      @click.capture="handleSwipeFrontClick"
    >
      <MatActionBase
        v-bind="$attrs"
        class="mat-list-item__primary"
        :class="{ 'mat-list-item__surface': !isMultiAction }"
        data-mat-list-primary
        :disabled="propsWithDefaults.disabled"
        :focus-ring="true"
        :href="propsWithDefaults.href"
        :type="propsWithDefaults.type"
        :use-cursor="matUi.useCursor"
        @click="handlePrimaryClick"
      >
        <MatListItemContent
          :line-count="lineCount"
          :presentation-slots="false"
          :separate-trailing="isMultiAction && hasTrailing"
        >
          <template
            v-if="$slots.leading"
            #leading
          >
            <slot name="leading" />
          </template>

          <template
            v-if="$slots.overline"
            #overline
          >
            <slot name="overline" />
          </template>

          <slot />

          <template
            v-if="$slots.supporting"
            #supporting
          >
            <slot name="supporting" />
          </template>

          <template
            v-if="$slots.trailing"
            #trailing
          >
            <slot name="trailing" />
          </template>
        </MatListItemContent>
      </MatActionBase>
    </div>

    <span
      v-if="isMultiAction && hasTrailing"
      class="mat-list-item__separate-trailing mat-sys-typescale-label-small"
      data-mat-list-trailing
      :inert="propsWithDefaults.disabled ? '' : undefined"
      @pointerdown="handleTrailingPointerDown"
    >
      <slot name="trailing" />
    </span>
  </li>

  <MatActionBase
    v-else
    ref="itemRoot"
    v-bind="$attrs"
    as="div"
    class="mat-list-item mat-list-item__surface mat-list-item--selectable"
    :class="[
      surfaceClasses,
      { 'mat-list-item--separate-trailing': shouldSeparateTrailing },
    ]"
    data-mat-list-primary
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :aria-selected="selected ? 'true' : 'false'"
    :disabled="propsWithDefaults.disabled"
    :focus-ring="true"
    role="option"
    :use-cursor="matUi.useCursor"
    @click="handlePrimaryClick"
    @keydown="handleOptionKeyDown"
  >
    <MatListItemContent
      :line-count="lineCount"
      presentation-slots
      :separate-trailing="shouldSeparateTrailing"
    >
      <template
        v-if="$slots.leading"
        #leading
      >
        <slot name="leading" />
      </template>

      <template
        v-if="$slots.overline"
        #overline
      >
        <slot name="overline" />
      </template>

      <slot />

      <template
        v-if="$slots.supporting"
        #supporting
      >
        <slot name="supporting" />
      </template>

      <template
        v-if="$slots.trailing && !shouldSeparateTrailing"
        #trailing
      >
        <slot name="trailing" />
      </template>
    </MatListItemContent>

    <span
      v-if="shouldSeparateTrailing"
      class="mat-list-item__separate-trailing mat-sys-typescale-label-small"
      data-mat-list-trailing
      :inert="propsWithDefaults.disabled ? '' : undefined"
      @pointerdown="handleTrailingPointerDown"
    >
      <slot name="trailing" />
    </span>
  </MatActionBase>
</template>

<style scoped>
@layer mde.components {
  .mat-list-item {
    --mat-list-item-start-start-shape: var(--mat-list-item-container-shape);
    --mat-list-item-start-end-shape: var(--mat-list-item-container-shape);
    --mat-list-item-end-start-shape: var(--mat-list-item-container-shape);
    --mat-list-item-end-end-shape: var(--mat-list-item-container-shape);
    display: block;
    box-sizing: border-box;
    min-inline-size: 0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .mat-list-item__surface {
    --mat-action-state-color: var(--mat-on-accent-container-color, var(--mat-list-item-state-layer-color));
    --mat-list-item-label-color: var(--mat-on-accent-container-color, var(--mat-list-item-label-text-color));
    --mat-list-item-supporting-color: var(--mat-on-accent-container-color, var(--mat-list-item-supporting-text-color));
    overflow: clip;
    overflow-clip-margin: 5px;
    inline-size: 100%;
    color: var(--mat-list-item-label-color);
    text-align: start;
    text-decoration: none;
    background: var(--mat-accent-container-color, var(--mat-list-item-container-color));
    border: 0;
    border-start-start-radius: var(--mat-list-item-start-start-shape);
    border-start-end-radius: var(--mat-list-item-start-end-shape);
    border-end-start-radius: var(--mat-list-item-end-start-shape);
    border-end-end-radius: var(--mat-list-item-end-end-shape);
    transition: border-radius var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-list-item:focus-visible,
  .mat-list-item:has(:focus-visible) {
    position: relative;
    z-index: 2;
  }

  .mat-list-item__primary {
    --mat-action-state-color: var(--mat-list-item-state-layer-color);
    display: block;
    min-inline-size: 0;
    padding: 0;
    color: inherit;
    text-align: start;
    text-decoration: none;
    border: 0;
    border-radius: inherit;
  }

  .mat-list-item__primary.mat-list-item__surface {
    border-start-start-radius: var(--mat-list-item-start-start-shape);
    border-start-end-radius: var(--mat-list-item-start-end-shape);
    border-end-start-radius: var(--mat-list-item-end-start-shape);
    border-end-end-radius: var(--mat-list-item-end-end-shape);
  }

  .mat-list-item--swipe {
    position: relative;
    touch-action: pan-y;
    background: transparent;
  }

  /* 状态层随前景位移，不残留在原位。 */
  .mat-list-item__swipe-front.mat-list-item__surface::after {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    content: '';
    background: var(--mat-action-state-color, currentcolor);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  @media (hover: hover) {
    .mat-list-item__swipe-front.mat-list-item__surface:not(.mat-list-item--disabled):hover::after {
      opacity: var(--mat-sys-state-hover-state-layer-opacity);
    }
  }

  .mat-list-item__swipe-front.mat-list-item__surface:not(.mat-list-item--disabled):active::after,
  .mat-list-item__swipe-front.mat-list-item__surface:not(.mat-list-item--disabled)[data-mat-state-layer-pressed]::after {
    opacity: var(--mat-sys-state-pressed-state-layer-opacity);
  }

  .mat-list-item__swipe-front {
    display: contents;
  }

  .mat-list-item--swipe .mat-list-item__swipe-front {
    position: relative;
    z-index: 1;
    display: block;
    min-inline-size: 0;
    transform: translateX(0);
    transition: transform var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-list-item__swipe-front--dragging,
  .mat-list-item__swipe-front--suppress {
    transition: none;
  }

  .mat-list-item__swipe-under {
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    z-index: 0;
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    min-inline-size: 56px;
    padding-block: 6px;
    padding-inline: 12px 8px;
    background: transparent;
  }

  .mat-list-item--swiping,
  .mat-list-item--swiped,
  .mat-list-item--removing {
    --mat-list-item-start-start-shape: var(--mat-list-container-shape, 16px);
    --mat-list-item-start-end-shape: var(--mat-list-container-shape, 16px);
    --mat-list-item-end-start-shape: var(--mat-list-container-shape, 16px);
    --mat-list-item-end-end-shape: var(--mat-list-container-shape, 16px);
  }

  /* 移除退场：前景裁剪在项目边界内，整行收拢时后续项目随布局上移。 */
  .mat-list-item--removing {
    interpolate-size: allow-keywords;
    overflow: clip;
    overflow-clip-margin: 0;
    transition: block-size var(--mat-sys-motion-spring-fast-spatial);
  }

  /* 弹性项目默认最小尺寸为 auto，必须解除才能压到 0 高度。 */
  .mat-list-item--collapsing {
    min-block-size: 0;
    block-size: 0;
  }

  .mat-list-item:has(+ .mat-list-item--swiping),
  .mat-list-item:has(+ .mat-list-item--swiped),
  .mat-list-item:has(+ .mat-list-item--removing) {
    --mat-list-item-end-start-shape: var(--mat-list-container-shape, 16px);
    --mat-list-item-end-end-shape: var(--mat-list-container-shape, 16px);
  }

  .mat-list-item--swiping + .mat-list-item,
  .mat-list-item--swiped + .mat-list-item,
  .mat-list-item--removing + .mat-list-item {
    --mat-list-item-start-start-shape: var(--mat-list-container-shape, 16px);
    --mat-list-item-start-end-shape: var(--mat-list-container-shape, 16px);
  }

  .mat-list-item__swipe-under > button,
  .mat-list-item__swipe-under > .mat-btn,
  .mat-list-item__swipe-under > .mat-list-item__swipe-action {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: 64px;
    min-inline-size: 56px;
    block-size: calc(100% - 4px);
    max-block-size: 64px;
    padding: 0;
    font-family: inherit;
    font-size: var(--mat-sys-typescale-label-large-size, 14px);
    line-height: var(--mat-sys-typescale-label-large-line-height, 20px);
    color: var(--mat-sys-color-on-secondary-container);
    text-decoration: none;
    cursor: pointer;
    background: var(--mat-sys-color-secondary-container);
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full, 9999px);
    transition: background-color var(--mat-sys-motion-spring-fast-effects), opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-list-item__swipe-under > button:last-child,
  .mat-list-item__swipe-under > .mat-btn:last-child,
  .mat-list-item__swipe-under > .mat-list-item__swipe-action--primary {
    color: var(--mat-sys-color-on-primary);
    background: var(--mat-sys-color-primary);
  }

  .mat-list-item__swipe-under > .mat-list-item__swipe-action--tonal {
    color: var(--mat-sys-color-on-secondary-container);
    background: var(--mat-sys-color-secondary-container);
  }

  .mat-list-item--multi-action {
    overflow: visible;
    display: flex;
    gap: var(--mat-list-item-content-gap);
    align-items: center;
  }

  .mat-list-item--multi-action .mat-list-item__primary {
    --mat-action-state-color: transparent;
    flex: 1 1 auto;
    background: transparent;
  }

  .mat-list-item--separate-trailing {
    display: flex;
    align-items: center;
  }

  .mat-list-item--separate-trailing :deep(.mat-list-item-content) {
    flex: 1 1 auto;
    min-inline-size: 0;
  }

  .mat-list-item__separate-trailing {
    --mat-list-item-trailing-action-space: 8px;
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 auto;
    gap: var(--mat-list-item-trailing-action-gap);
    align-items: center;
    box-sizing: border-box;
    min-block-size: var(--mat-sys-interaction-target-min-size);
    padding-inline-end: var(--mat-list-item-trailing-action-space);
    color: var(--mat-list-item-supporting-color);
  }

  .mat-list-item--selected {
    --mat-list-item-container-color: var(--mat-active-container-color, var(--mat-list-item-selected-container-color));
    --mat-list-item-label-color: var(--mat-on-active-container-color, var(--mat-list-item-selected-label-text-color));
    --mat-list-item-supporting-color: var(--mat-on-active-container-color, var(--mat-list-item-selected-supporting-text-color));
    --mat-action-state-color: var(--mat-on-active-container-color, var(--mat-list-item-selected-label-text-color));
    background: var(--mat-active-container-color, var(--mat-list-item-selected-container-color));
    border-radius: var(--mat-list-item-selected-container-shape);
  }

  .mat-list-item--disabled :deep(.mat-list-item-content) {
    opacity: var(--mat-list-item-disabled-content-opacity);
  }

  .mat-list-item--disabled.mat-list-item--selected {
    --mat-list-item-container-color: color-mix(
      in srgb,
      var(--mat-sys-color-on-surface) var(--mat-list-item-disabled-selected-container-opacity),
      var(--mat-sys-color-surface-container)
    );
    --mat-list-item-label-color: var(--mat-sys-color-on-surface);
    --mat-list-item-supporting-color: var(--mat-sys-color-on-surface);
  }

  .mat-list-item__surface:not(.mat-list-item--static):not(.mat-list-item--disabled):focus-visible,
  .mat-list-item__surface:not(.mat-list-item--static):not(.mat-list-item--disabled):active,
  .mat-list-item__surface[data-mat-state-layer-pressed] {
    border-radius: var(--mat-list-item-interactive-container-shape);
  }

  .mat-list-item--multi-action:not(.mat-list-item--disabled):has(.mat-list-item__primary:focus-visible),
  .mat-list-item--multi-action:not(.mat-list-item--disabled):has(.mat-list-item__primary:active),
  .mat-list-item--multi-action[data-mat-state-layer-pressed],
  .mat-list-item--multi-action:has(.mat-list-item__primary[data-mat-state-layer-pressed]) {
    border-radius: var(--mat-list-item-interactive-container-shape);
  }

  @media (hover: hover) {
    .mat-list-item__surface:not(.mat-list-item--static):not(.mat-list-item--disabled):hover {
      border-radius: var(--mat-list-item-hover-container-shape);
    }

    .mat-list-item--selected:not(.mat-list-item--disabled):hover {
      border-radius: var(--mat-list-item-selected-container-shape);
    }

    .mat-list-item--multi-action:not(.mat-list-item--disabled):hover {
      border-radius: var(--mat-list-item-hover-container-shape);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-list-item__surface {
      transition-duration: 0s;
    }

    .mat-list-item--swipe .mat-list-item__swipe-front,
    .mat-list-item--removing {
      transition-duration: 0s;
    }
  }
}
</style>
