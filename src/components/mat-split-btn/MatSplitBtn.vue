<script setup>
import {
  computed, nextTick, onMounted, provide, ref, useSlots, watch,
} from 'vue';
import { MAT_SPLIT_BTN_KEY } from '../button-context';
import { BUTTON_SIZES, isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import MatSplitSegment from './MatSplitSegment.vue';

defineOptions({
  name: 'MatSplitBtn',
  inheritAttrs: false,
});

const props = defineProps({
  variant: {
    type: String,
    default: 'filled',
    validator(value) {
      return ['elevated', 'filled', 'tonal', 'outlined'].includes(value);
    },
  },
  size: {
    type: String,
    default: 's',
    validator(value) {
      return BUTTON_SIZES.includes(value);
    },
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  controls: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits({
  'leading-click': (payload) => payload instanceof MouseEvent,
  'trailing-click': (payload) => payload instanceof MouseEvent,
  'update:expanded': (payload) => typeof payload === 'boolean',
});
const root = ref(null);
const slots = useSlots();
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => props.color));

provide(MAT_SPLIT_BTN_KEY, {
  color: computed(() => props.color),
  controls: computed(() => props.controls),
  disabled: computed(() => props.disabled),
  expanded: computed(() => props.expanded),
  size: computed(() => props.size),
  variant: computed(() => props.variant),
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
  emit('update:expanded', !props.expanded);
}

function validateSlots() {
  if (!root.value) {
    return;
  }

  if (!slots.leading || root.value.querySelectorAll('.mat-split-btn__leading .mat-button-base').length !== 1) {
    console.warn('MatSplitBtn: leading slot 必须提供一个 MatBtn 或 MatIconBtn');
  }

  if (!slots.trailing || root.value.querySelectorAll('.mat-split-btn__trailing .mat-icon-btn').length !== 1) {
    console.warn('MatSplitBtn: trailing slot 必须提供一个 MatIconBtn');
  }
}

onMounted(validateSlots);
watch(
  () => [props.size, props.variant],
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
      `mat-split-btn--${variant}`,
      `mat-split-btn--size-${size}`,
      {
        'mat-split-btn--expanded': expanded,
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
.mat-split-btn {
  --mat-accent-color: var(--mat-color-primary);
  --mat-on-accent-color: var(--mat-color-on-primary);
  --mat-accent-container-color: var(--mat-color-primary-container);
  --mat-on-accent-container-color: var(--mat-color-on-primary-container);
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--mat-split-btn-gap);
}

.mat-split-btn__segment {
  display: inline-flex;
  flex-shrink: 0;
}

.mat-split-btn--size-xs {
  --mat-split-btn-inner-radius: var(--mat-split-btn-xs-inner-radius);
  --mat-split-btn-interactive-inner-radius: var(--mat-split-btn-xs-interactive-inner-radius);
  --mat-split-btn-leading-start-padding: var(--mat-split-btn-xs-leading-start-padding);
  --mat-split-btn-leading-end-padding: var(--mat-split-btn-xs-leading-end-padding);
  --mat-split-btn-trailing-icon-size: var(--mat-split-btn-xs-trailing-icon-size);
  --mat-split-btn-trailing-padding: var(--mat-split-btn-xs-trailing-padding);
  --mat-split-btn-trailing-width: var(--mat-split-btn-xs-trailing-width);
  --mat-split-btn-icon-offset: var(--mat-split-btn-xs-icon-offset);
}

.mat-split-btn--size-s {
  --mat-split-btn-inner-radius: var(--mat-split-btn-s-inner-radius);
  --mat-split-btn-interactive-inner-radius: var(--mat-split-btn-s-interactive-inner-radius);
  --mat-split-btn-leading-start-padding: var(--mat-split-btn-s-leading-start-padding);
  --mat-split-btn-leading-end-padding: var(--mat-split-btn-s-leading-end-padding);
  --mat-split-btn-trailing-icon-size: var(--mat-split-btn-s-trailing-icon-size);
  --mat-split-btn-trailing-padding: var(--mat-split-btn-s-trailing-padding);
  --mat-split-btn-trailing-width: var(--mat-split-btn-s-trailing-width);
  --mat-split-btn-icon-offset: var(--mat-split-btn-s-icon-offset);
}

.mat-split-btn--size-m {
  --mat-split-btn-inner-radius: var(--mat-split-btn-m-inner-radius);
  --mat-split-btn-interactive-inner-radius: var(--mat-split-btn-m-interactive-inner-radius);
  --mat-split-btn-leading-start-padding: var(--mat-split-btn-m-leading-start-padding);
  --mat-split-btn-leading-end-padding: var(--mat-split-btn-m-leading-end-padding);
  --mat-split-btn-trailing-icon-size: var(--mat-split-btn-m-trailing-icon-size);
  --mat-split-btn-trailing-padding: var(--mat-split-btn-m-trailing-padding);
  --mat-split-btn-trailing-width: var(--mat-split-btn-m-trailing-width);
  --mat-split-btn-icon-offset: var(--mat-split-btn-m-icon-offset);
}

.mat-split-btn--size-l {
  --mat-split-btn-inner-radius: var(--mat-split-btn-l-inner-radius);
  --mat-split-btn-interactive-inner-radius: var(--mat-split-btn-l-interactive-inner-radius);
  --mat-split-btn-leading-start-padding: var(--mat-split-btn-l-leading-start-padding);
  --mat-split-btn-leading-end-padding: var(--mat-split-btn-l-leading-end-padding);
  --mat-split-btn-trailing-icon-size: var(--mat-split-btn-l-trailing-icon-size);
  --mat-split-btn-trailing-padding: var(--mat-split-btn-l-trailing-padding);
  --mat-split-btn-trailing-width: var(--mat-split-btn-l-trailing-width);
  --mat-split-btn-icon-offset: var(--mat-split-btn-l-icon-offset);
}

.mat-split-btn--size-xl {
  --mat-split-btn-inner-radius: var(--mat-split-btn-xl-inner-radius);
  --mat-split-btn-interactive-inner-radius: var(--mat-split-btn-xl-interactive-inner-radius);
  --mat-split-btn-leading-start-padding: var(--mat-split-btn-xl-leading-start-padding);
  --mat-split-btn-leading-end-padding: var(--mat-split-btn-xl-leading-end-padding);
  --mat-split-btn-trailing-icon-size: var(--mat-split-btn-xl-trailing-icon-size);
  --mat-split-btn-trailing-padding: var(--mat-split-btn-xl-trailing-padding);
  --mat-split-btn-trailing-width: var(--mat-split-btn-xl-trailing-width);
  --mat-split-btn-icon-offset: var(--mat-split-btn-xl-icon-offset);
}

.mat-split-btn__leading :deep(.mat-button-base) {
  border-start-end-radius: var(--mat-split-btn-inner-radius);
  border-end-end-radius: var(--mat-split-btn-inner-radius);
}

.mat-split-btn__leading :deep(.mat-btn) {
  padding-inline: var(--mat-split-btn-leading-start-padding) var(--mat-split-btn-leading-end-padding);
}

.mat-split-btn__trailing :deep(.mat-button-base) {
  --mat-button-container-width: var(--mat-split-btn-trailing-width);
  padding-inline: var(--mat-split-btn-trailing-padding);
  border-start-start-radius: var(--mat-split-btn-inner-radius);
  border-end-start-radius: var(--mat-split-btn-inner-radius);
}

.mat-split-btn__trailing :deep(.mat-icon-btn__icon) {
  inline-size: var(--mat-split-btn-trailing-icon-size);
  block-size: var(--mat-split-btn-trailing-icon-size);
  font-size: var(--mat-split-btn-trailing-icon-size);
  transform: translateX(var(--mat-split-btn-icon-offset));
}

.mat-split-btn--expanded .mat-split-btn__trailing :deep(.mat-button-base) {
  border-start-start-radius: 50%;
  border-end-start-radius: 50%;
}

.mat-split-btn--expanded .mat-split-btn__trailing :deep(.mat-icon-btn__icon) {
  transform: translateX(0) rotate(180deg);
}

.mat-split-btn--expanded .mat-split-btn__trailing :deep(.mat-button-base::before) {
  opacity: var(--mat-state-pressed-opacity);
}

.mat-split-btn__leading :deep(.mat-button-base:not(:disabled):hover),
.mat-split-btn__leading :deep(.mat-button-base:not(:disabled):focus-visible),
.mat-split-btn__leading :deep(.mat-button-base:not(:disabled):active) {
  border-start-end-radius: var(--mat-split-btn-interactive-inner-radius);
  border-end-end-radius: var(--mat-split-btn-interactive-inner-radius);
}

.mat-split-btn:not(.mat-split-btn--expanded) .mat-split-btn__trailing :deep(.mat-button-base:not(:disabled):hover),
.mat-split-btn:not(.mat-split-btn--expanded) .mat-split-btn__trailing :deep(.mat-button-base:not(:disabled):focus-visible),
.mat-split-btn:not(.mat-split-btn--expanded) .mat-split-btn__trailing :deep(.mat-button-base:not(:disabled):active) {
  border-start-start-radius: var(--mat-split-btn-interactive-inner-radius);
  border-end-start-radius: var(--mat-split-btn-interactive-inner-radius);
}

.mat-split-btn--elevated :deep(.mat-button-base) {
  --mat-button-container-color: var(--mat-color-surface-container-low);
  --mat-button-content-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
  --mat-button-shadow: var(--mat-shadow-level-1);
  --mat-button-border-width: 0;
}

.mat-split-btn--filled :deep(.mat-button-base) {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-button-content-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
  --mat-button-border-width: 0;
}

.mat-split-btn--tonal :deep(.mat-button-base) {
  --mat-button-container-color: var(--mat-color-secondary-container);
  --mat-button-content-color: var(--mat-color-on-secondary-container);
  --mat-button-state-color: var(--mat-color-on-secondary-container);
  --mat-button-border-width: 0;
}

.mat-split-btn--tonal.mat-split-btn--explicit-color :deep(.mat-button-base) {
  --mat-button-container-color: var(--mat-accent-container-color);
  --mat-button-content-color: var(--mat-on-accent-container-color);
  --mat-button-state-color: var(--mat-on-accent-container-color);
}

.mat-split-btn--outlined :deep(.mat-button-base) {
  --mat-button-container-color: transparent;
  --mat-button-content-color: var(--mat-color-on-surface-variant);
  --mat-button-state-color: var(--mat-color-on-surface-variant);
  --mat-button-border-color: var(--mat-color-outline-variant);
}

.mat-split-btn--outlined.mat-split-btn--explicit-color :deep(.mat-button-base) {
  --mat-button-content-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
}

@media (hover: hover) {
  .mat-split-btn--elevated :deep(.mat-button-base:not(:disabled):hover) {
    --mat-button-shadow: var(--mat-shadow-level-2);
  }

  .mat-split-btn--filled :deep(.mat-button-base:not(:disabled):hover),
  .mat-split-btn--tonal :deep(.mat-button-base:not(:disabled):hover) {
    --mat-button-shadow: var(--mat-shadow-level-1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-split-btn :deep(.mat-icon-btn__icon) {
    transition-duration: 0s;
  }
}
</style>
