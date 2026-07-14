<script setup>
import {
  computed, useSlots, watchEffect,
} from 'vue';
import MatButtonBase from '../MatButtonBase.vue';
import {
  BUTTON_SHAPES,
  BUTTON_SIZES,
  BUTTON_TYPES,
  isComponentColor,
} from '../button-props';
import useButton from '../use-button';

defineOptions({
  name: 'MatBtn',
  inheritAttrs: false,
});

const props = defineProps({
  variant: {
    type: String,
    default: 'filled',
    validator(value) {
      return ['elevated', 'filled', 'filled-tonal', 'outlined', 'text'].includes(value);
    },
  },
  size: {
    type: String,
    default: undefined,
    validator(value) {
      return BUTTON_SIZES.includes(value);
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
const isToggle = computed(() => effectiveToggle.value && effectiveVariant.value !== 'text');
const isSelected = computed(() => isToggle.value && effectiveSelected.value);
const hasIcon = computed(() => Boolean(slots.icon || (isSelected.value && slots['selected-icon'])));
const hasSelectedLabel = computed(() => isSelected.value && Boolean(slots.selected));

watchEffect(() => {
  if (props.toggle && props.variant === 'text') {
    console.warn('MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理');
  }
});
</script>

<template>
  <MatButtonBase
    v-bind="$attrs"
    class="mat-btn"
    :class="[
      `mat-btn--${effectiveVariant}`,
      `mat-btn--size-${effectiveSize}`,
      `mat-btn--shape-${effectiveShape}`,
      {
        'mat-button--explicit-color': hasExplicitColor,
        'mat-btn--toggle': isToggle,
        'mat-btn--selected': isSelected,
        'mat-btn--split-leading': split?.role === 'leading',
      },
    ]"
    :style="colorStyle"
    :aria-pressed="isToggle ? isSelected : undefined"
    :disabled="effectiveDisabled"
    :type="type"
    :use-cursor="useCursor"
    @click="handleClick"
  >
    <span
      v-if="hasIcon"
      class="mat-btn__icon"
      :class="{
        'mat-btn__icon--selected-fallback': isSelected && !slots['selected-icon'],
        'mat-icon--material-symbols': useMaterialSymbols,
      }"
      aria-hidden="true"
    >
      <slot v-if="isSelected && slots['selected-icon']" name="selected-icon" />
      <slot v-else name="icon" />
    </span>

    <span class="mat-btn__label">
      <slot v-if="hasSelectedLabel" name="selected" />
      <slot v-else />
    </span>
  </MatButtonBase>
</template>

<style scoped>
/*
 * 交互结构改编自 mdui v2 button（MIT），尺寸与状态按 Material 3 Expressive 重写：
 * https://github.com/zdhxiong/mdui/tree/818146c3e188580e2831873b4f245d864422552c
 */

.mat-btn {
  --mat-accent-color: var(--mat-sys-color-primary);
  --mat-on-accent-color: var(--mat-sys-color-on-primary);
  --mat-accent-container-color: var(--mat-sys-color-primary-container);
  --mat-on-accent-container-color: var(--mat-sys-color-on-primary-container);
  --mat-button-container-color: var(--mat-btn-filled-container-color);
  --mat-btn-label-text-color: var(--mat-btn-filled-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-filled-icon-color);
  --mat-button-content-color: var(--mat-btn-label-text-color);
  --mat-button-state-color: var(--mat-btn-filled-state-layer-color);
  --mat-button-border-width: 0;
  --mat-button-outline-width: 1px;
  --mat-button-container-elevation: var(--mat-btn-filled-container-elevation);
  gap: var(--mat-btn-icon-label-space);
  min-inline-size: calc(var(--mat-btn-leading-space) + var(--mat-btn-trailing-space));
  padding-inline: var(--mat-btn-leading-space) var(--mat-btn-trailing-space);
  font-family: var(--mat-btn-label-text-font);
  font-size: var(--mat-btn-label-text-size);
  font-weight: var(--mat-btn-label-text-weight);
  line-height: var(--mat-btn-label-text-line-height);
  letter-spacing: var(--mat-btn-label-text-tracking, 0);
  text-align: center;
  text-decoration: none;
}

.mat-btn--size-extra-small {
  --mat-button-container-height: var(--mat-btn-extra-small-container-height);
  --mat-btn-leading-space: var(--mat-btn-extra-small-leading-space);
  --mat-btn-trailing-space: var(--mat-btn-extra-small-trailing-space);
  --mat-btn-icon-size: var(--mat-btn-extra-small-icon-size);
  --mat-btn-icon-label-space: var(--mat-btn-extra-small-icon-label-space);
  --mat-button-outline-width: var(--mat-btn-extra-small-outlined-outline-width);
  --mat-btn-square-container-shape: var(--mat-btn-extra-small-square-container-shape);
  --mat-button-pressed-radius: var(--mat-btn-extra-small-pressed-container-shape);
  --mat-btn-label-text-font: var(--mat-btn-extra-small-label-text-font);
  --mat-btn-label-text-size: var(--mat-btn-extra-small-label-text-size);
  --mat-btn-label-text-line-height: var(--mat-btn-extra-small-label-text-line-height);
  --mat-btn-label-text-weight: var(--mat-btn-extra-small-label-text-weight);
  --mat-btn-label-text-tracking: var(--mat-btn-extra-small-label-text-tracking);
}

.mat-btn--size-small {
  --mat-button-container-height: var(--mat-btn-small-container-height);
  --mat-btn-leading-space: var(--mat-btn-small-leading-space);
  --mat-btn-trailing-space: var(--mat-btn-small-trailing-space);
  --mat-btn-icon-size: var(--mat-btn-small-icon-size);
  --mat-btn-icon-label-space: var(--mat-btn-small-icon-label-space);
  --mat-button-outline-width: var(--mat-btn-small-outlined-outline-width);
  --mat-btn-square-container-shape: var(--mat-btn-small-square-container-shape);
  --mat-button-pressed-radius: var(--mat-btn-small-pressed-container-shape);
  --mat-btn-label-text-font: var(--mat-btn-small-label-text-font);
  --mat-btn-label-text-size: var(--mat-btn-small-label-text-size);
  --mat-btn-label-text-line-height: var(--mat-btn-small-label-text-line-height);
  --mat-btn-label-text-weight: var(--mat-btn-small-label-text-weight);
  --mat-btn-label-text-tracking: var(--mat-btn-small-label-text-tracking);
}

.mat-btn--size-medium {
  --mat-button-container-height: var(--mat-btn-medium-container-height);
  --mat-btn-leading-space: var(--mat-btn-medium-leading-space);
  --mat-btn-trailing-space: var(--mat-btn-medium-trailing-space);
  --mat-btn-icon-size: var(--mat-btn-medium-icon-size);
  --mat-btn-icon-label-space: var(--mat-btn-medium-icon-label-space);
  --mat-button-outline-width: var(--mat-btn-medium-outlined-outline-width);
  --mat-btn-square-container-shape: var(--mat-btn-medium-square-container-shape);
  --mat-button-pressed-radius: var(--mat-btn-medium-pressed-container-shape);
  --mat-btn-label-text-font: var(--mat-btn-medium-label-text-font);
  --mat-btn-label-text-size: var(--mat-btn-medium-label-text-size);
  --mat-btn-label-text-line-height: var(--mat-btn-medium-label-text-line-height);
  --mat-btn-label-text-weight: var(--mat-btn-medium-label-text-weight);
  --mat-btn-label-text-tracking: var(--mat-btn-medium-label-text-tracking);
}

.mat-btn--size-large {
  --mat-button-container-height: var(--mat-btn-large-container-height);
  --mat-btn-leading-space: var(--mat-btn-large-leading-space);
  --mat-btn-trailing-space: var(--mat-btn-large-trailing-space);
  --mat-btn-icon-size: var(--mat-btn-large-icon-size);
  --mat-btn-icon-label-space: var(--mat-btn-large-icon-label-space);
  --mat-button-outline-width: var(--mat-btn-large-outlined-outline-width);
  --mat-btn-square-container-shape: var(--mat-btn-large-square-container-shape);
  --mat-button-pressed-radius: var(--mat-btn-large-pressed-container-shape);
  --mat-btn-label-text-font: var(--mat-btn-large-label-text-font);
  --mat-btn-label-text-size: var(--mat-btn-large-label-text-size);
  --mat-btn-label-text-line-height: var(--mat-btn-large-label-text-line-height);
  --mat-btn-label-text-weight: var(--mat-btn-large-label-text-weight);
  --mat-btn-label-text-tracking: var(--mat-btn-large-label-text-tracking);
}

.mat-btn--size-extra-large {
  --mat-button-container-height: var(--mat-btn-extra-large-container-height);
  --mat-btn-leading-space: var(--mat-btn-extra-large-leading-space);
  --mat-btn-trailing-space: var(--mat-btn-extra-large-trailing-space);
  --mat-btn-icon-size: var(--mat-btn-extra-large-icon-size);
  --mat-btn-icon-label-space: var(--mat-btn-extra-large-icon-label-space);
  --mat-button-outline-width: var(--mat-btn-extra-large-outlined-outline-width);
  --mat-btn-square-container-shape: var(--mat-btn-extra-large-square-container-shape);
  --mat-button-pressed-radius: var(--mat-btn-extra-large-pressed-container-shape);
  --mat-btn-label-text-font: var(--mat-btn-extra-large-label-text-font);
  --mat-btn-label-text-size: var(--mat-btn-extra-large-label-text-size);
  --mat-btn-label-text-line-height: var(--mat-btn-extra-large-label-text-line-height);
  --mat-btn-label-text-weight: var(--mat-btn-extra-large-label-text-weight);
  --mat-btn-label-text-tracking: var(--mat-btn-extra-large-label-text-tracking);
}

.mat-btn--shape-round {
  --mat-button-radius: var(--mat-button-full-radius);
}

.mat-btn--shape-square {
  --mat-button-radius: var(--mat-btn-square-container-shape);
}

.mat-btn--shape-round.mat-btn--selected {
  --mat-button-radius: var(--mat-btn-square-container-shape);
}

.mat-btn--shape-square.mat-btn--selected {
  --mat-button-radius: var(--mat-button-full-radius);
}

.mat-btn--elevated {
  --mat-button-container-color: var(--mat-btn-elevated-container-color);
  --mat-btn-label-text-color: var(--mat-btn-elevated-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-elevated-icon-color);
  --mat-button-state-color: var(--mat-btn-elevated-state-layer-color);
  --mat-button-container-elevation: var(--mat-btn-elevated-container-elevation);
  --mat-button-border-width: 0;
}

.mat-btn--elevated.mat-btn--selected,
.mat-btn--filled:not(.mat-btn--toggle),
.mat-btn--filled.mat-btn--selected {
  --mat-button-container-color: var(--mat-btn-filled-container-color);
  --mat-btn-label-text-color: var(--mat-btn-filled-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-filled-icon-color);
  --mat-button-state-color: var(--mat-btn-filled-state-layer-color);
  --mat-button-container-elevation: var(--mat-btn-filled-container-elevation);
}

.mat-btn--filled.mat-btn--toggle:not(.mat-btn--selected) {
  --mat-button-container-color: var(--mat-btn-filled-unselected-container-color);
  --mat-btn-label-text-color: var(--mat-btn-filled-unselected-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-filled-unselected-icon-color);
  --mat-button-state-color: var(--mat-btn-filled-unselected-state-layer-color);
}

.mat-btn--elevated.mat-button--explicit-color {
  --mat-btn-label-text-color: var(--mat-accent-color);
  --mat-btn-icon-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
}

.mat-btn--filled.mat-button--explicit-color:not(.mat-btn--toggle),
.mat-btn--filled.mat-button--explicit-color.mat-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-btn-label-text-color: var(--mat-on-accent-color);
  --mat-btn-icon-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-btn--filled-tonal {
  --mat-button-container-color: var(--mat-btn-filled-tonal-container-color);
  --mat-btn-label-text-color: var(--mat-btn-filled-tonal-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-filled-tonal-icon-color);
  --mat-button-state-color: var(--mat-btn-filled-tonal-state-layer-color);
  --mat-button-container-elevation: var(--mat-btn-filled-tonal-container-elevation);
}

.mat-btn--filled-tonal.mat-btn--selected {
  --mat-button-container-color: var(--mat-btn-filled-tonal-selected-container-color);
  --mat-btn-label-text-color: var(--mat-btn-filled-tonal-selected-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-filled-tonal-selected-icon-color);
  --mat-button-state-color: var(--mat-btn-filled-tonal-selected-state-layer-color);
}

.mat-btn--filled-tonal.mat-button--explicit-color:not(.mat-btn--selected) {
  --mat-button-container-color: var(--mat-accent-container-color);
  --mat-btn-label-text-color: var(--mat-on-accent-container-color);
  --mat-btn-icon-color: var(--mat-on-accent-container-color);
  --mat-button-state-color: var(--mat-on-accent-container-color);
}

.mat-btn--filled-tonal.mat-button--explicit-color.mat-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-btn-label-text-color: var(--mat-on-accent-color);
  --mat-btn-icon-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-btn--outlined {
  --mat-button-container-color: var(--mat-btn-outlined-container-color);
  --mat-btn-label-text-color: var(--mat-btn-outlined-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-outlined-icon-color);
  --mat-button-state-color: var(--mat-btn-outlined-state-layer-color);
  --mat-button-border-color: var(--mat-btn-outlined-outline-color);
  --mat-button-border-width: var(--mat-button-outline-width);
  --mat-button-container-elevation: var(--mat-btn-outlined-container-elevation);
}

.mat-btn--outlined.mat-btn--selected {
  --mat-button-container-color: var(--mat-btn-outlined-selected-container-color);
  --mat-btn-label-text-color: var(--mat-btn-outlined-selected-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-outlined-selected-icon-color);
  --mat-button-state-color: var(--mat-btn-outlined-selected-state-layer-color);
  --mat-button-border-color: transparent;
}

.mat-btn--outlined.mat-button--explicit-color:not(.mat-btn--selected),
.mat-btn--text.mat-button--explicit-color {
  --mat-btn-label-text-color: var(--mat-accent-color);
  --mat-btn-icon-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
}

.mat-btn--outlined.mat-button--explicit-color.mat-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-btn-label-text-color: var(--mat-on-accent-color);
  --mat-btn-icon-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-btn--text {
  --mat-button-container-color: var(--mat-btn-text-container-color);
  --mat-btn-label-text-color: var(--mat-btn-text-label-text-color);
  --mat-btn-icon-color: var(--mat-btn-text-icon-color);
  --mat-button-state-color: var(--mat-btn-text-state-layer-color);
  --mat-button-border-width: 0;
  --mat-button-container-elevation: var(--mat-btn-text-container-elevation);
}

.mat-btn__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  flex-shrink: 0;
  inline-size: var(--mat-btn-icon-size);
  block-size: var(--mat-btn-icon-size);
  align-items: center;
  justify-content: center;
  color: var(--mat-btn-icon-color);
  font-size: var(--mat-btn-icon-size);
  line-height: 1;
}

.mat-btn__icon--selected-fallback {
  font-variation-settings: 'FILL' 1;
  font-weight: 600;
}

.mat-btn__icon :deep(svg) {
  inline-size: 100%;
  block-size: 100%;
}

.mat-btn__label {
  position: relative;
  z-index: 1;
}

@media (hover: hover) {
  .mat-btn--elevated:not(:disabled):hover {
    --mat-button-container-elevation: var(--mat-btn-elevated-hover-container-elevation);
  }

  .mat-btn--filled:not(:disabled):hover {
    --mat-button-container-elevation: var(--mat-btn-filled-hover-container-elevation);
  }

  .mat-btn--filled-tonal:not(:disabled):hover {
    --mat-button-container-elevation: var(--mat-btn-filled-tonal-hover-container-elevation);
  }
}

.mat-btn:disabled {
  --mat-button-container-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
  --mat-btn-label-text-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-content-opacity) * 100%), transparent);
  --mat-btn-icon-color: var(--mat-btn-label-text-color);
  --mat-button-state-color: var(--mat-sys-color-on-surface);
  --mat-button-container-elevation: none;
  --mat-button-border-width: 0;
}

.mat-btn--outlined:disabled {
  --mat-button-container-color: transparent;
  --mat-button-border-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
}

.mat-btn--text:disabled {
  --mat-button-container-color: transparent;
}
</style>
