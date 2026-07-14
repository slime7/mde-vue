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
      return ['filled', 'filled-tonal', 'outlined', 'standard'].includes(value);
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
  useCursor,
  useMaterialSymbols,
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
    :use-cursor="useCursor"
    @click="handleClick"
  >
    <span
      class="mat-icon-btn__icon"
      :class="{
        'mat-icon-btn__icon--selected-fallback': isSelected && !slots.selected,
        'mat-icon--material-symbols': useMaterialSymbols,
      }"
      aria-hidden="true"
    >
      <slot v-if="isSelected && slots.selected" name="selected" />
      <slot v-else />
    </span>
  </MatButtonBase>
</template>

<style scoped>
.mat-icon-btn {
  --mat-accent-color: var(--mat-sys-color-primary);
  --mat-on-accent-color: var(--mat-sys-color-on-primary);
  --mat-accent-container-color: var(--mat-sys-color-primary-container);
  --mat-on-accent-container-color: var(--mat-sys-color-on-primary-container);
  --mat-button-container-color: var(--mat-icon-btn-filled-container-color);
  --mat-icon-btn-icon-color: var(--mat-icon-btn-filled-icon-color);
  --mat-button-content-color: var(--mat-icon-btn-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-filled-state-layer-color);
  --mat-button-border-width: 0;
  --mat-button-outline-width: 1px;
  --mat-button-container-elevation: var(--mat-sys-elevation-level0);
  --mat-button-container-width: calc(var(--mat-icon-btn-icon-size) + var(--mat-icon-btn-leading-space) + var(--mat-icon-btn-trailing-space));
}

.mat-icon-btn--size-extra-small {
  --mat-button-container-height: var(--mat-icon-btn-extra-small-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-extra-small-icon-size);
  --mat-icon-btn-narrow-leading-space: var(--mat-icon-btn-extra-small-narrow-leading-space);
  --mat-icon-btn-narrow-trailing-space: var(--mat-icon-btn-extra-small-narrow-trailing-space);
  --mat-icon-btn-default-leading-space: var(--mat-icon-btn-extra-small-default-leading-space);
  --mat-icon-btn-default-trailing-space: var(--mat-icon-btn-extra-small-default-trailing-space);
  --mat-icon-btn-wide-leading-space: var(--mat-icon-btn-extra-small-wide-leading-space);
  --mat-icon-btn-wide-trailing-space: var(--mat-icon-btn-extra-small-wide-trailing-space);
  --mat-button-outline-width: var(--mat-icon-btn-extra-small-outlined-outline-width);
  --mat-icon-btn-square-container-shape: var(--mat-icon-btn-extra-small-square-container-shape);
  --mat-button-pressed-radius: var(--mat-icon-btn-extra-small-pressed-container-shape);
}

.mat-icon-btn--size-small {
  --mat-button-container-height: var(--mat-icon-btn-small-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-small-icon-size);
  --mat-icon-btn-narrow-leading-space: var(--mat-icon-btn-small-narrow-leading-space);
  --mat-icon-btn-narrow-trailing-space: var(--mat-icon-btn-small-narrow-trailing-space);
  --mat-icon-btn-default-leading-space: var(--mat-icon-btn-small-default-leading-space);
  --mat-icon-btn-default-trailing-space: var(--mat-icon-btn-small-default-trailing-space);
  --mat-icon-btn-wide-leading-space: var(--mat-icon-btn-small-wide-leading-space);
  --mat-icon-btn-wide-trailing-space: var(--mat-icon-btn-small-wide-trailing-space);
  --mat-button-outline-width: var(--mat-icon-btn-small-outlined-outline-width);
  --mat-icon-btn-square-container-shape: var(--mat-icon-btn-small-square-container-shape);
  --mat-button-pressed-radius: var(--mat-icon-btn-small-pressed-container-shape);
}

.mat-icon-btn--size-medium {
  --mat-button-container-height: var(--mat-icon-btn-medium-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-medium-icon-size);
  --mat-icon-btn-narrow-leading-space: var(--mat-icon-btn-medium-narrow-leading-space);
  --mat-icon-btn-narrow-trailing-space: var(--mat-icon-btn-medium-narrow-trailing-space);
  --mat-icon-btn-default-leading-space: var(--mat-icon-btn-medium-default-leading-space);
  --mat-icon-btn-default-trailing-space: var(--mat-icon-btn-medium-default-trailing-space);
  --mat-icon-btn-wide-leading-space: var(--mat-icon-btn-medium-wide-leading-space);
  --mat-icon-btn-wide-trailing-space: var(--mat-icon-btn-medium-wide-trailing-space);
  --mat-button-outline-width: var(--mat-icon-btn-medium-outlined-outline-width);
  --mat-icon-btn-square-container-shape: var(--mat-icon-btn-medium-square-container-shape);
  --mat-button-pressed-radius: var(--mat-icon-btn-medium-pressed-container-shape);
}

.mat-icon-btn--size-large {
  --mat-button-container-height: var(--mat-icon-btn-large-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-large-icon-size);
  --mat-icon-btn-narrow-leading-space: var(--mat-icon-btn-large-narrow-leading-space);
  --mat-icon-btn-narrow-trailing-space: var(--mat-icon-btn-large-narrow-trailing-space);
  --mat-icon-btn-default-leading-space: var(--mat-icon-btn-large-default-leading-space);
  --mat-icon-btn-default-trailing-space: var(--mat-icon-btn-large-default-trailing-space);
  --mat-icon-btn-wide-leading-space: var(--mat-icon-btn-large-wide-leading-space);
  --mat-icon-btn-wide-trailing-space: var(--mat-icon-btn-large-wide-trailing-space);
  --mat-button-outline-width: var(--mat-icon-btn-large-outlined-outline-width);
  --mat-icon-btn-square-container-shape: var(--mat-icon-btn-large-square-container-shape);
  --mat-button-pressed-radius: var(--mat-icon-btn-large-pressed-container-shape);
}

.mat-icon-btn--size-extra-large {
  --mat-button-container-height: var(--mat-icon-btn-extra-large-container-height);
  --mat-icon-btn-icon-size: var(--mat-icon-btn-extra-large-icon-size);
  --mat-icon-btn-narrow-leading-space: var(--mat-icon-btn-extra-large-narrow-leading-space);
  --mat-icon-btn-narrow-trailing-space: var(--mat-icon-btn-extra-large-narrow-trailing-space);
  --mat-icon-btn-default-leading-space: var(--mat-icon-btn-extra-large-default-leading-space);
  --mat-icon-btn-default-trailing-space: var(--mat-icon-btn-extra-large-default-trailing-space);
  --mat-icon-btn-wide-leading-space: var(--mat-icon-btn-extra-large-wide-leading-space);
  --mat-icon-btn-wide-trailing-space: var(--mat-icon-btn-extra-large-wide-trailing-space);
  --mat-button-outline-width: var(--mat-icon-btn-extra-large-outlined-outline-width);
  --mat-icon-btn-square-container-shape: var(--mat-icon-btn-extra-large-square-container-shape);
  --mat-button-pressed-radius: var(--mat-icon-btn-extra-large-pressed-container-shape);
}

.mat-icon-btn--width-narrow {
  --mat-icon-btn-leading-space: var(--mat-icon-btn-narrow-leading-space);
  --mat-icon-btn-trailing-space: var(--mat-icon-btn-narrow-trailing-space);
}

.mat-icon-btn--width-default {
  --mat-icon-btn-leading-space: var(--mat-icon-btn-default-leading-space);
  --mat-icon-btn-trailing-space: var(--mat-icon-btn-default-trailing-space);
}

.mat-icon-btn--width-wide {
  --mat-icon-btn-leading-space: var(--mat-icon-btn-wide-leading-space);
  --mat-icon-btn-trailing-space: var(--mat-icon-btn-wide-trailing-space);
}

.mat-icon-btn--shape-round {
  --mat-button-radius: var(--mat-button-full-radius);
}

.mat-icon-btn--shape-square {
  --mat-button-radius: var(--mat-icon-btn-square-container-shape);
}

.mat-icon-btn--shape-round.mat-icon-btn--selected {
  --mat-button-radius: var(--mat-icon-btn-square-container-shape);
}

.mat-icon-btn--shape-square.mat-icon-btn--selected {
  --mat-button-radius: var(--mat-button-full-radius);
}

.mat-icon-btn--filled.mat-icon-btn--toggle:not(.mat-icon-btn--selected) {
  --mat-button-container-color: var(--mat-icon-btn-filled-unselected-container-color);
  --mat-icon-btn-icon-color: var(--mat-icon-btn-filled-unselected-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-filled-unselected-state-layer-color);
}

.mat-icon-btn--filled.mat-button--explicit-color:not(.mat-icon-btn--toggle),
.mat-icon-btn--filled.mat-button--explicit-color.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-icon-btn-icon-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-icon-btn--filled-tonal {
  --mat-button-container-color: var(--mat-icon-btn-filled-tonal-container-color);
  --mat-icon-btn-icon-color: var(--mat-icon-btn-filled-tonal-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-filled-tonal-state-layer-color);
}

.mat-icon-btn--filled-tonal.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-icon-btn-filled-tonal-selected-container-color);
  --mat-icon-btn-icon-color: var(--mat-icon-btn-filled-tonal-selected-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-filled-tonal-selected-state-layer-color);
}

.mat-icon-btn--filled-tonal.mat-button--explicit-color:not(.mat-icon-btn--selected) {
  --mat-button-container-color: var(--mat-accent-container-color);
  --mat-icon-btn-icon-color: var(--mat-on-accent-container-color);
  --mat-button-state-color: var(--mat-on-accent-container-color);
}

.mat-icon-btn--filled-tonal.mat-button--explicit-color.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-icon-btn-icon-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-icon-btn--outlined {
  --mat-button-container-color: var(--mat-icon-btn-outlined-container-color);
  --mat-icon-btn-icon-color: var(--mat-icon-btn-outlined-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-outlined-state-layer-color);
  --mat-button-border-color: var(--mat-icon-btn-outlined-outline-color);
  --mat-button-border-width: var(--mat-button-outline-width);
}

.mat-icon-btn--outlined.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-icon-btn-outlined-selected-container-color);
  --mat-icon-btn-icon-color: var(--mat-icon-btn-outlined-selected-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-outlined-selected-state-layer-color);
  --mat-button-border-color: transparent;
}

.mat-icon-btn--outlined.mat-button--explicit-color:not(.mat-icon-btn--selected),
.mat-icon-btn--standard.mat-button--explicit-color:not(.mat-icon-btn--selected) {
  --mat-icon-btn-icon-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
}

.mat-icon-btn--outlined.mat-button--explicit-color.mat-icon-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-icon-btn-icon-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-icon-btn--standard {
  --mat-button-container-color: var(--mat-icon-btn-standard-container-color);
  --mat-icon-btn-icon-color: var(--mat-icon-btn-standard-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-standard-state-layer-color);
  --mat-button-border-width: 0;
}

.mat-icon-btn--standard.mat-icon-btn--selected {
  --mat-icon-btn-icon-color: var(--mat-icon-btn-standard-selected-icon-color);
  --mat-button-state-color: var(--mat-icon-btn-standard-selected-state-layer-color);
}

.mat-icon-btn--standard.mat-button--explicit-color.mat-icon-btn--selected {
  --mat-icon-btn-icon-color: var(--mat-accent-color);
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
  color: var(--mat-icon-btn-icon-color);
  font-size: var(--mat-icon-btn-icon-size);
  line-height: 1;
  transition: transform var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-standard);
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
  --mat-button-container-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
  --mat-icon-btn-icon-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-content-opacity) * 100%), transparent);
  --mat-button-state-color: var(--mat-sys-color-on-surface);
  --mat-button-container-elevation: none;
  --mat-button-border-width: 0;
}

.mat-icon-btn--outlined:disabled {
  --mat-button-container-color: transparent;
  --mat-button-border-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
}

.mat-icon-btn--standard:disabled {
  --mat-button-container-color: transparent;
}
</style>
