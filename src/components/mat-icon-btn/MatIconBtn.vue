<script setup>
import { computed, useAttrs, useSlots } from 'vue';
import MatButtonBase from '../MatButtonBase.vue';
import {
  BUTTON_SHAPES,
  BUTTON_SIZES,
  BUTTON_TYPES,
  isComponentColor,
} from '../button-props';
import useButton from '../use-button';

defineOptions({
  name: 'MatIconBtn',
  inheritAttrs: false,
});

const props = defineProps({
  variant: {
    type: String,
    default: 'filled',
    validator(value) {
      return ['filled', 'tonal', 'outlined', 'standard'].includes(value);
    },
  },
  size: {
    type: String,
    default: undefined,
    validator(value) {
      return BUTTON_SIZES.includes(value);
    },
  },
  width: {
    type: String,
    default: 'default',
    validator(value) {
      return ['narrow', 'default', 'wide'].includes(value);
    },
  },
  shape: {
    type: String,
    default: undefined,
    validator(value) {
      return BUTTON_SHAPES.includes(value);
    },
  },
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  toggle: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return BUTTON_TYPES.includes(value);
    },
  },
});

const emit = defineEmits({
  click(payload) {
    return payload instanceof MouseEvent;
  },
});
const attrs = useAttrs();
const slots = useSlots();
const {
  colorStyle,
  effectiveDisabled,
  effectiveSelected,
  effectiveShape,
  effectiveSize,
  effectiveToggle,
  effectiveVariant,
  handleClick,
  hasExplicitColor,
  split,
} = useButton(props, emit);
const title = computed(() => attrs.title ?? props.label);
const isSelected = computed(() => effectiveToggle.value && effectiveSelected.value);
</script>

<template>
  <MatButtonBase
    v-bind="$attrs"
    class="mat-icon-btn"
    :class="[
      `mat-icon-btn--${effectiveVariant}`,
      `mat-icon-btn--size-${effectiveSize}`,
      `mat-icon-btn--width-${width}`,
      `mat-icon-btn--shape-${effectiveShape}`,
      {
        'mat-button--explicit-color': hasExplicitColor,
        'mat-icon-btn--toggle': effectiveToggle,
        'mat-icon-btn--selected': isSelected,
        'mat-icon-btn--split-trailing': split?.role === 'trailing',
      },
    ]"
    :style="colorStyle"
    :aria-label="label"
    :aria-controls="split?.role === 'trailing' ? split.controls.value : undefined"
    :aria-expanded="split?.role === 'trailing' ? split.expanded.value : undefined"
    :aria-haspopup="split?.role === 'trailing' ? 'menu' : undefined"
    :aria-pressed="effectiveToggle ? isSelected : undefined"
    :disabled="effectiveDisabled"
    :title="title"
    :type="type"
    @click="handleClick"
  >
    <span
      class="mat-icon-btn__icon"
      :class="{ 'mat-icon-btn__icon--selected-fallback': isSelected && !slots.selected }"
      aria-hidden="true"
    >
      <slot v-if="isSelected && slots.selected" name="selected" />
      <slot v-else />
    </span>
  </MatButtonBase>
</template>

<style scoped>
.mat-icon-btn {
  --mat-accent-color: var(--mat-color-primary);
  --mat-on-accent-color: var(--mat-color-on-primary);
  --mat-accent-container-color: var(--mat-color-primary-container);
  --mat-on-accent-container-color: var(--mat-color-on-primary-container);
  --mat-button-container-color: var(--mat-accent-color);
  --mat-button-content-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-button-content-color);
  --mat-button-border-width: 0;
  --mat-button-outline-width: 1px;
  --mat-button-shadow: var(--mat-shadow-level-0);
}

.mat-icon-btn--size-xs {
  --mat-button-container-height: var(--mat-icon-btn-xs-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-xs-icon-size);
  --mat-icon-btn-narrow-width: var(--mat-icon-btn-xs-narrow-width);
  --mat-icon-btn-default-width: var(--mat-icon-btn-xs-default-width);
  --mat-icon-btn-wide-width: var(--mat-icon-btn-xs-wide-width);
  --mat-button-outline-width: var(--mat-icon-btn-xs-outline-width);
  --mat-icon-btn-square-radius: var(--mat-icon-btn-xs-square-radius);
  --mat-button-pressed-radius: var(--mat-icon-btn-xs-pressed-radius);
}

.mat-icon-btn--size-s {
  --mat-button-container-height: var(--mat-icon-btn-s-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-s-icon-size);
  --mat-icon-btn-narrow-width: var(--mat-icon-btn-s-narrow-width);
  --mat-icon-btn-default-width: var(--mat-icon-btn-s-default-width);
  --mat-icon-btn-wide-width: var(--mat-icon-btn-s-wide-width);
  --mat-button-outline-width: var(--mat-icon-btn-s-outline-width);
  --mat-icon-btn-square-radius: var(--mat-icon-btn-s-square-radius);
  --mat-button-pressed-radius: var(--mat-icon-btn-s-pressed-radius);
}

.mat-icon-btn--size-m {
  --mat-button-container-height: var(--mat-icon-btn-m-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-m-icon-size);
  --mat-icon-btn-narrow-width: var(--mat-icon-btn-m-narrow-width);
  --mat-icon-btn-default-width: var(--mat-icon-btn-m-default-width);
  --mat-icon-btn-wide-width: var(--mat-icon-btn-m-wide-width);
  --mat-button-outline-width: var(--mat-icon-btn-m-outline-width);
  --mat-icon-btn-square-radius: var(--mat-icon-btn-m-square-radius);
  --mat-button-pressed-radius: var(--mat-icon-btn-m-pressed-radius);
}

.mat-icon-btn--size-l {
  --mat-button-container-height: var(--mat-icon-btn-l-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-l-icon-size);
  --mat-icon-btn-narrow-width: var(--mat-icon-btn-l-narrow-width);
  --mat-icon-btn-default-width: var(--mat-icon-btn-l-default-width);
  --mat-icon-btn-wide-width: var(--mat-icon-btn-l-wide-width);
  --mat-button-outline-width: var(--mat-icon-btn-l-outline-width);
  --mat-icon-btn-square-radius: var(--mat-icon-btn-l-square-radius);
  --mat-button-pressed-radius: var(--mat-icon-btn-l-pressed-radius);
}

.mat-icon-btn--size-xl {
  --mat-button-container-height: var(--mat-icon-btn-xl-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-xl-icon-size);
  --mat-icon-btn-narrow-width: var(--mat-icon-btn-xl-narrow-width);
  --mat-icon-btn-default-width: var(--mat-icon-btn-xl-default-width);
  --mat-icon-btn-wide-width: var(--mat-icon-btn-xl-wide-width);
  --mat-button-outline-width: var(--mat-icon-btn-xl-outline-width);
  --mat-icon-btn-square-radius: var(--mat-icon-btn-xl-square-radius);
  --mat-button-pressed-radius: var(--mat-icon-btn-xl-pressed-radius);
}

.mat-icon-btn--width-narrow {
  --mat-button-container-width: var(--mat-icon-btn-narrow-width);
}

.mat-icon-btn--width-default {
  --mat-button-container-width: var(--mat-icon-btn-default-width);
}

.mat-icon-btn--width-wide {
  --mat-button-container-width: var(--mat-icon-btn-wide-width);
}

.mat-icon-btn--shape-round {
  --mat-button-radius: var(--mat-shape-corner-full);
}

.mat-icon-btn--shape-square {
  --mat-button-radius: var(--mat-icon-btn-square-radius);
}

.mat-icon-btn--shape-round.mat-icon-btn--selected {
  --mat-button-radius: var(--mat-icon-btn-square-radius);
}

.mat-icon-btn--shape-square.mat-icon-btn--selected {
  --mat-button-radius: var(--mat-shape-corner-full);
}

.mat-icon-btn--filled.mat-icon-btn--toggle:not(.mat-icon-btn--selected) {
  --mat-button-container-color: var(--mat-color-surface-container);
  --mat-button-content-color: var(--mat-color-on-surface-variant);
  --mat-button-state-color: var(--mat-color-on-surface-variant);
}

.mat-icon-btn--tonal {
  --mat-button-container-color: var(--mat-color-secondary-container);
  --mat-button-content-color: var(--mat-color-on-secondary-container);
  --mat-button-state-color: var(--mat-color-on-secondary-container);
}

.mat-icon-btn--tonal.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-color-secondary);
  --mat-button-content-color: var(--mat-color-on-secondary);
  --mat-button-state-color: var(--mat-color-on-secondary);
}

.mat-icon-btn--tonal.mat-button--explicit-color:not(.mat-icon-btn--selected) {
  --mat-button-container-color: var(--mat-accent-container-color);
  --mat-button-content-color: var(--mat-on-accent-container-color);
  --mat-button-state-color: var(--mat-on-accent-container-color);
}

.mat-icon-btn--tonal.mat-button--explicit-color.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-button-content-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-icon-btn--outlined {
  --mat-button-container-color: transparent;
  --mat-button-content-color: var(--mat-color-on-surface-variant);
  --mat-button-state-color: var(--mat-color-on-surface-variant);
  --mat-button-border-color: var(--mat-color-outline-variant);
  --mat-button-border-width: var(--mat-button-outline-width);
}

.mat-icon-btn--outlined.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-color-inverse-surface);
  --mat-button-content-color: var(--mat-color-inverse-on-surface);
  --mat-button-state-color: var(--mat-color-inverse-on-surface);
  --mat-button-border-color: transparent;
}

.mat-icon-btn--outlined.mat-button--explicit-color:not(.mat-icon-btn--selected),
.mat-icon-btn--standard.mat-button--explicit-color:not(.mat-icon-btn--selected) {
  --mat-button-content-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
}

.mat-icon-btn--outlined.mat-button--explicit-color.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-button-content-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-icon-btn--standard {
  --mat-button-container-color: transparent;
  --mat-button-content-color: var(--mat-color-on-surface-variant);
  --mat-button-state-color: var(--mat-color-on-surface-variant);
  --mat-button-border-width: 0;
}

.mat-icon-btn--standard.mat-icon-btn--selected {
  --mat-button-content-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
}

.mat-icon-btn__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  inline-size: var(--mat-icon-btn-icon-size);
  block-size: var(--mat-icon-btn-icon-size);
  align-items: center;
  justify-content: center;
  font-size: var(--mat-icon-btn-icon-size);
  line-height: 1;
  transition: transform var(--mat-motion-duration-medium) var(--mat-motion-easing-standard);
}

.mat-icon-btn__icon--selected-fallback {
  font-variation-settings: 'FILL' 1;
  font-weight: 600;
}

.mat-icon-btn__icon :deep(svg) {
  inline-size: 100%;
  block-size: 100%;
}

.mat-icon-btn:disabled {
  --mat-button-container-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-container-opacity) * 100%), transparent);
  --mat-button-content-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-content-opacity) * 100%), transparent);
  --mat-button-state-color: var(--mat-color-on-surface);
  --mat-button-shadow: none;
  --mat-button-border-width: 0;
}

.mat-icon-btn--outlined:disabled {
  --mat-button-container-color: transparent;
  --mat-button-border-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-container-opacity) * 100%), transparent);
}

.mat-icon-btn--standard:disabled {
  --mat-button-container-color: transparent;
}
</style>
