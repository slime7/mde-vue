<script setup>
import {
  computed, nextTick, onMounted, provide, ref, useSlots, watch,
} from 'vue';
import { MAT_SPLIT_BTN_KEY } from '../button-context';
import { BUTTON_SIZES, isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import MatSplitSegment from './MatSplitSegment.vue';

defineOptions({
  name: 'MatSplitBtn',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 使用块级 flex 组根，在普通文档流中铺满父元素。
   *
   * @type {boolean}
   * @default false
   */
  block: {
    type: Boolean,
    default: false,
  },
  /**
   * 两侧按钮统一视觉层级；可选值为 `elevated`、`filled`、`filled-tonal`、`outlined`。
   *
   * @type {string}
   * @default 'filled'
   */
  variant: {
    type: String,
    default: 'filled',
    validator(value) {
      return ['elevated', 'filled', 'filled-tonal', 'outlined'].includes(value);
    },
  },
  /**
   * 两侧按钮统一尺寸；可选值为 `extra-small`、`small`、`medium`、`large`、`extra-large`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  size: {
    type: String,
    default: 'small',
    validator(value) {
      return BUTTON_SIZES.includes(value);
    },
  },
  /**
   * 两侧按钮统一配色，可使用语义色或 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  /**
   * 禁用两侧原生按钮。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 受控菜单展开状态。
   *
   * @type {boolean}
   * @default false
   */
  expanded: {
    type: Boolean,
    default: false,
  },
  /**
   * 写入 trailing 按钮的 `aria-controls`，通常是外部菜单 id。
   *
   * @type {string | undefined}
   * @default undefined
   */
  controls: {
    type: String,
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('splitBtn', props);

const emit = defineEmits({
  /**
   * 主要按钮激活时触发，载荷为 `MouseEvent`。
   */
  'leading-click': (payload) => payload instanceof MouseEvent,
  /**
   * 展开按钮激活时触发，载荷为 `MouseEvent`。
   */
  'trailing-click': (payload) => payload instanceof MouseEvent,
  /**
   * 展开按钮激活时触发，载荷为当前 expanded 的相反值。
   */
  'update:expanded': (payload) => typeof payload === 'boolean',
});
const root = ref(null);
const slots = useSlots();
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => propsWithDefaults.color));

provide(MAT_SPLIT_BTN_KEY, {
  color: computed(() => propsWithDefaults.color),
  controls: computed(() => propsWithDefaults.controls),
  disabled: computed(() => propsWithDefaults.disabled),
  expanded: computed(() => propsWithDefaults.expanded),
  size: computed(() => propsWithDefaults.size),
  variant: computed(() => propsWithDefaults.variant),
});

/**
 * @param {MouseEvent} event
 */
function handleLeadingClick(event) {
  if (!(event.target instanceof Element) || !event.target.closest('.mat-button-base')) {
    return;
  }

  emit('leading-click', event);
}

/**
 * @param {MouseEvent} event
 */
function handleTrailingClick(event) {
  if (!(event.target instanceof Element) || !event.target.closest('.mat-button-base')) {
    return;
  }

  emit('trailing-click', event);
  emit('update:expanded', !propsWithDefaults.expanded);
}

function validateSlots() {
  if (!root.value) {
    return;
  }

  if (!slots.leading || root.value.querySelectorAll('.mat-split-btn__leading .mat-button-base').length !== 1) {
    console.warn('MatSplitBtn: leading slot 必须提供一个 MatBtn');
  }

  const trailingIconButtons = root.value.querySelectorAll(
    '.mat-split-btn__trailing .mat-btn--icon',
  );

  if (!slots.trailing || trailingIconButtons.length !== 1) {
    console.warn('MatSplitBtn: trailing slot 必须提供一个图标模式 MatBtn');
  }
}

onMounted(validateSlots);
watch(
  () => [propsWithDefaults.size, propsWithDefaults.variant],
  async () => {
    await nextTick();
    validateSlots();
  },
);
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    class="mat-split-btn"
    :class="[
      `mat-split-btn--${propsWithDefaults.variant}`,
      `mat-split-btn--size-${propsWithDefaults.size}`,
      {
        'mat-split-btn--block': propsWithDefaults.block,
        'mat-split-btn--expanded': propsWithDefaults.expanded,
        'mat-split-btn--explicit-color': hasExplicitColor,
      },
    ]"
    :style="colorStyle"
    role="group"
  >
    <span class="mat-split-btn__segment mat-split-btn__leading" @click="handleLeadingClick">
      <MatSplitSegment role="leading">
        <slot name="leading" />
      </MatSplitSegment>
    </span>

    <span class="mat-split-btn__segment mat-split-btn__trailing" @click="handleTrailingClick">
      <MatSplitSegment role="trailing">
        <slot name="trailing" />
      </MatSplitSegment>
    </span>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-split-btn {
    --mat-accent-color: var(--mat-sys-color-primary);
    --mat-on-accent-color: var(--mat-sys-color-on-primary);
    --mat-accent-container-color: var(--mat-sys-color-primary-container);
    --mat-on-accent-container-color: var(--mat-sys-color-on-primary-container);
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--mat-split-btn-between-space);
  }

  .mat-split-btn__segment {
    display: inline-flex;
    flex-shrink: 0;
  }

  .mat-split-btn--block {
    display: flex;
  }

  .mat-split-btn--size-extra-small {
    --mat-split-btn-inner-corner-size: var(--mat-split-btn-extra-small-inner-corner-size);
    --mat-split-btn-interactive-inner-corner-size: var(--mat-split-btn-extra-small-interactive-inner-corner-size);
    --mat-split-btn-leading-button-leading-space: var(--mat-split-btn-extra-small-leading-button-leading-space);
    --mat-split-btn-leading-button-trailing-space: var(--mat-split-btn-extra-small-leading-button-trailing-space);
    --mat-split-btn-trailing-button-icon-size: var(--mat-split-btn-extra-small-trailing-button-icon-size);
    --mat-split-btn-trailing-button-leading-space: var(--mat-split-btn-extra-small-trailing-button-leading-space);
    --mat-split-btn-trailing-button-trailing-space: var(--mat-split-btn-extra-small-trailing-button-trailing-space);
    --mat-split-btn-trailing-button-width: calc(var(--mat-split-btn-trailing-button-icon-size) + var(--mat-split-btn-trailing-button-leading-space) + var(--mat-split-btn-trailing-button-trailing-space));
    --mat-split-btn-icon-offset: -1px;
  }

  .mat-split-btn--size-small {
    --mat-split-btn-inner-corner-size: var(--mat-split-btn-small-inner-corner-size);
    --mat-split-btn-interactive-inner-corner-size: var(--mat-split-btn-small-interactive-inner-corner-size);
    --mat-split-btn-leading-button-leading-space: var(--mat-split-btn-small-leading-button-leading-space);
    --mat-split-btn-leading-button-trailing-space: var(--mat-split-btn-small-leading-button-trailing-space);
    --mat-split-btn-trailing-button-icon-size: var(--mat-split-btn-small-trailing-button-icon-size);
    --mat-split-btn-trailing-button-leading-space: var(--mat-split-btn-small-trailing-button-leading-space);
    --mat-split-btn-trailing-button-trailing-space: var(--mat-split-btn-small-trailing-button-trailing-space);
    --mat-split-btn-trailing-button-width: calc(var(--mat-split-btn-trailing-button-icon-size) + var(--mat-split-btn-trailing-button-leading-space) + var(--mat-split-btn-trailing-button-trailing-space));
    --mat-split-btn-icon-offset: -1px;
  }

  .mat-split-btn--size-medium {
    --mat-split-btn-inner-corner-size: var(--mat-split-btn-medium-inner-corner-size);
    --mat-split-btn-interactive-inner-corner-size: var(--mat-split-btn-medium-interactive-inner-corner-size);
    --mat-split-btn-leading-button-leading-space: var(--mat-split-btn-medium-leading-button-leading-space);
    --mat-split-btn-leading-button-trailing-space: var(--mat-split-btn-medium-leading-button-trailing-space);
    --mat-split-btn-trailing-button-icon-size: var(--mat-split-btn-medium-trailing-button-icon-size);
    --mat-split-btn-trailing-button-leading-space: var(--mat-split-btn-medium-trailing-button-leading-space);
    --mat-split-btn-trailing-button-trailing-space: var(--mat-split-btn-medium-trailing-button-trailing-space);
    --mat-split-btn-trailing-button-width: calc(var(--mat-split-btn-trailing-button-icon-size) + var(--mat-split-btn-trailing-button-leading-space) + var(--mat-split-btn-trailing-button-trailing-space));
    --mat-split-btn-icon-offset: -2px;
  }

  .mat-split-btn--size-large {
    --mat-split-btn-inner-corner-size: var(--mat-split-btn-large-inner-corner-size);
    --mat-split-btn-interactive-inner-corner-size: var(--mat-split-btn-large-interactive-inner-corner-size);
    --mat-split-btn-leading-button-leading-space: var(--mat-split-btn-large-leading-button-leading-space);
    --mat-split-btn-leading-button-trailing-space: var(--mat-split-btn-large-leading-button-trailing-space);
    --mat-split-btn-trailing-button-icon-size: var(--mat-split-btn-large-trailing-button-icon-size);
    --mat-split-btn-trailing-button-leading-space: var(--mat-split-btn-large-trailing-button-leading-space);
    --mat-split-btn-trailing-button-trailing-space: var(--mat-split-btn-large-trailing-button-trailing-space);
    --mat-split-btn-trailing-button-width: calc(var(--mat-split-btn-trailing-button-icon-size) + var(--mat-split-btn-trailing-button-leading-space) + var(--mat-split-btn-trailing-button-trailing-space));
    --mat-split-btn-icon-offset: -3px;
  }

  .mat-split-btn--size-extra-large {
    --mat-split-btn-inner-corner-size: var(--mat-split-btn-extra-large-inner-corner-size);
    --mat-split-btn-interactive-inner-corner-size: var(--mat-split-btn-extra-large-interactive-inner-corner-size);
    --mat-split-btn-leading-button-leading-space: var(--mat-split-btn-extra-large-leading-button-leading-space);
    --mat-split-btn-leading-button-trailing-space: var(--mat-split-btn-extra-large-leading-button-trailing-space);
    --mat-split-btn-trailing-button-icon-size: var(--mat-split-btn-extra-large-trailing-button-icon-size);
    --mat-split-btn-trailing-button-leading-space: var(--mat-split-btn-extra-large-trailing-button-leading-space);
    --mat-split-btn-trailing-button-trailing-space: var(--mat-split-btn-extra-large-trailing-button-trailing-space);
    --mat-split-btn-trailing-button-width: calc(var(--mat-split-btn-trailing-button-icon-size) + var(--mat-split-btn-trailing-button-leading-space) + var(--mat-split-btn-trailing-button-trailing-space));
    --mat-split-btn-icon-offset: -6px;
  }

  .mat-split-btn__leading :deep(.mat-button-base) {
    --mat-button-start-end-radius: var(--mat-split-btn-inner-corner-size);
    --mat-button-end-end-radius: var(--mat-split-btn-inner-corner-size);
    --mat-button-pressed-start-end-radius: var(--mat-split-btn-interactive-inner-corner-size);
    --mat-button-pressed-end-end-radius: var(--mat-split-btn-interactive-inner-corner-size);
  }

  .mat-split-btn__leading :deep(.mat-btn) {
    padding-inline: var(--mat-split-btn-leading-button-leading-space) var(--mat-split-btn-leading-button-trailing-space);
  }

  .mat-split-btn__trailing :deep(.mat-button-base) {
    --mat-button-container-width: var(--mat-split-btn-trailing-button-width);
    --mat-button-start-start-radius: var(--mat-split-btn-inner-corner-size);
    --mat-button-end-start-radius: var(--mat-split-btn-inner-corner-size);
    --mat-button-pressed-start-start-radius: var(--mat-split-btn-interactive-inner-corner-size);
    --mat-button-pressed-end-start-radius: var(--mat-split-btn-interactive-inner-corner-size);
    padding-inline: var(--mat-split-btn-trailing-button-leading-space) var(--mat-split-btn-trailing-button-trailing-space);
  }

  .mat-split-btn__trailing :deep(.mat-btn__icon--only) {
    inline-size: var(--mat-split-btn-trailing-button-icon-size);
    block-size: var(--mat-split-btn-trailing-button-icon-size);
    font-size: var(--mat-split-btn-trailing-button-icon-size);
    transform: translateX(var(--mat-split-btn-icon-offset));
  }

  .mat-split-btn--expanded .mat-split-btn__trailing :deep(.mat-button-base) {
    --mat-button-start-start-radius: var(--mat-button-full-radius);
    --mat-button-start-end-radius: var(--mat-button-full-radius);
    --mat-button-end-start-radius: var(--mat-button-full-radius);
    --mat-button-end-end-radius: var(--mat-button-full-radius);
    --mat-button-pressed-start-start-radius: var(--mat-button-full-radius);
    --mat-button-pressed-start-end-radius: var(--mat-button-full-radius);
    --mat-button-pressed-end-start-radius: var(--mat-button-full-radius);
    --mat-button-pressed-end-end-radius: var(--mat-button-full-radius);
  }

  .mat-split-btn--expanded .mat-split-btn__trailing :deep(.mat-btn__icon--only) {
    transform: translateX(0) rotate(180deg);
  }

  .mat-split-btn--expanded .mat-split-btn__trailing :deep(.mat-button-base > .mat-state-layer) {
    opacity: var(--mat-sys-state-pressed-state-layer-opacity);
  }

  .mat-split-btn__leading :deep(.mat-button-base:not(:disabled):hover),
  .mat-split-btn__leading :deep(.mat-button-base:not(:disabled):focus-visible) {
    border-start-end-radius: var(--mat-split-btn-interactive-inner-corner-size);
    border-end-end-radius: var(--mat-split-btn-interactive-inner-corner-size);
  }

  .mat-split-btn:not(.mat-split-btn--expanded) .mat-split-btn__trailing :deep(.mat-button-base:not(:disabled):hover),
  .mat-split-btn:not(.mat-split-btn--expanded) .mat-split-btn__trailing :deep(.mat-button-base:not(:disabled):focus-visible) {
    border-start-start-radius: var(--mat-split-btn-interactive-inner-corner-size);
    border-end-start-radius: var(--mat-split-btn-interactive-inner-corner-size);
  }

  .mat-split-btn--elevated {
    --mat-split-btn-active-icon-color: var(--mat-split-btn-elevated-icon-color);
  }

  .mat-split-btn--filled {
    --mat-split-btn-active-icon-color: var(--mat-split-btn-filled-icon-color);
  }

  .mat-split-btn--filled-tonal {
    --mat-split-btn-active-icon-color: var(--mat-split-btn-filled-tonal-icon-color);
  }

  .mat-split-btn--outlined {
    --mat-split-btn-active-icon-color: var(--mat-split-btn-outlined-icon-color);
  }

  .mat-split-btn :deep(.mat-btn__icon) {
    color: var(--mat-split-btn-active-icon-color);
  }

  .mat-split-btn--elevated .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-container-color: var(--mat-split-btn-elevated-container-color);
    --mat-button-content-color: var(--mat-split-btn-elevated-label-text-color);
    --mat-button-state-color: var(--mat-split-btn-elevated-state-layer-color);
    --mat-button-container-elevation: var(--mat-split-btn-elevated-container-elevation);
    --mat-button-border-width: 0;
  }

  .mat-split-btn--elevated.mat-split-btn--explicit-color {
    --mat-split-btn-active-icon-color: var(--mat-accent-color);
  }

  .mat-split-btn--elevated.mat-split-btn--explicit-color .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-content-color: var(--mat-accent-color);
    --mat-button-state-color: var(--mat-accent-color);
  }

  .mat-split-btn--filled .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-container-color: var(--mat-split-btn-filled-container-color);
    --mat-button-content-color: var(--mat-split-btn-filled-label-text-color);
    --mat-button-state-color: var(--mat-split-btn-filled-state-layer-color);
    --mat-button-container-elevation: var(--mat-split-btn-filled-container-elevation);
    --mat-button-border-width: 0;
  }

  .mat-split-btn--filled.mat-split-btn--explicit-color {
    --mat-split-btn-active-icon-color: var(--mat-on-accent-color);
  }

  .mat-split-btn--filled.mat-split-btn--explicit-color .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-container-color: var(--mat-accent-color);
    --mat-button-content-color: var(--mat-on-accent-color);
    --mat-button-state-color: var(--mat-on-accent-color);
  }

  .mat-split-btn--filled-tonal .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-container-color: var(--mat-split-btn-filled-tonal-container-color);
    --mat-button-content-color: var(--mat-split-btn-filled-tonal-label-text-color);
    --mat-button-state-color: var(--mat-split-btn-filled-tonal-state-layer-color);
    --mat-button-container-elevation: var(--mat-split-btn-filled-tonal-container-elevation);
    --mat-button-border-width: 0;
  }

  .mat-split-btn--filled-tonal.mat-split-btn--explicit-color .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-container-color: var(--mat-accent-container-color);
    --mat-button-content-color: var(--mat-on-accent-container-color);
    --mat-button-state-color: var(--mat-on-accent-container-color);
  }

  .mat-split-btn--filled-tonal.mat-split-btn--explicit-color {
    --mat-split-btn-active-icon-color: var(--mat-on-accent-container-color);
  }

  .mat-split-btn--outlined .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-container-color: var(--mat-split-btn-outlined-container-color);
    --mat-button-content-color: var(--mat-split-btn-outlined-label-text-color);
    --mat-button-state-color: var(--mat-split-btn-outlined-state-layer-color);
    --mat-button-border-color: var(--mat-split-btn-outlined-outline-color);
  }

  .mat-split-btn--outlined.mat-split-btn--explicit-color .mat-split-btn__segment :deep(.mat-button-base) {
    --mat-button-content-color: var(--mat-accent-color);
    --mat-button-state-color: var(--mat-accent-color);
  }

  .mat-split-btn--outlined.mat-split-btn--explicit-color {
    --mat-split-btn-active-icon-color: var(--mat-accent-color);
  }

  .mat-split-btn .mat-split-btn__segment :deep(.mat-button-base:disabled) {
    --mat-button-container-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
    --mat-button-content-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-content-opacity) * 100%), transparent);
    --mat-button-state-color: var(--mat-sys-color-on-surface);
    --mat-button-border-color: transparent;
    --mat-button-container-elevation: none;
  }

  .mat-split-btn--outlined .mat-split-btn__segment :deep(.mat-button-base:disabled) {
    --mat-button-container-color: transparent;
    --mat-button-border-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
  }

  @media (hover: hover) {
    .mat-split-btn--elevated :deep(.mat-button-base:not(:disabled):hover) {
      --mat-button-container-elevation: var(--mat-split-btn-elevated-hover-container-elevation);
    }

    .mat-split-btn--filled :deep(.mat-button-base:not(:disabled):hover) {
      --mat-button-container-elevation: var(--mat-split-btn-filled-hover-container-elevation);
    }

    .mat-split-btn--filled-tonal :deep(.mat-button-base:not(:disabled):hover) {
      --mat-button-container-elevation: var(--mat-split-btn-filled-tonal-hover-container-elevation);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-split-btn :deep(.mat-btn__icon--only) {
      transition-duration: 0s;
    }
  }
}
</style>
