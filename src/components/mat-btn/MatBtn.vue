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
      return ['elevated', 'filled', 'tonal', 'outlined', 'text'].includes(value);
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
    @click="handleClick"
  >
    <span
      v-if="hasIcon"
      class="mat-btn__icon"
      :class="{ 'mat-btn__icon--selected-fallback': isSelected && !slots['selected-icon'] }"
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
  gap: var(--mat-btn-icon-label-gap);
  min-inline-size: calc(var(--mat-btn-horizontal-padding) * 2);
  padding-inline: var(--mat-btn-horizontal-padding);
  font-family: var(--mat-btn-label-font);
  font-size: var(--mat-btn-label-size);
  font-weight: var(--mat-btn-label-weight);
  line-height: var(--mat-btn-label-line-height);
  letter-spacing: var(--mat-btn-label-tracking, 0);
  text-align: center;
  text-decoration: none;
}

.mat-btn--size-xs {
  --mat-button-container-height: var(--mat-btn-xs-container-height);
  --mat-btn-horizontal-padding: var(--mat-btn-xs-horizontal-padding);
  --mat-btn-icon-size: var(--mat-btn-xs-icon-size);
  --mat-btn-icon-label-gap: var(--mat-btn-xs-icon-label-gap);
  --mat-button-outline-width: var(--mat-btn-xs-outline-width);
  --mat-btn-square-radius: var(--mat-btn-xs-square-radius);
  --mat-button-pressed-radius: var(--mat-btn-xs-pressed-radius);
  --mat-btn-label-font: var(--mat-type-label-large-font);
  --mat-btn-label-size: var(--mat-type-label-large-size);
  --mat-btn-label-line-height: var(--mat-type-label-large-line-height);
  --mat-btn-label-weight: var(--mat-type-label-large-weight);
  --mat-btn-label-tracking: var(--mat-type-label-large-tracking);
}

.mat-btn--size-s {
  --mat-button-container-height: var(--mat-btn-s-container-height);
  --mat-btn-horizontal-padding: var(--mat-btn-s-horizontal-padding);
  --mat-btn-icon-size: var(--mat-btn-s-icon-size);
  --mat-btn-icon-label-gap: var(--mat-btn-s-icon-label-gap);
  --mat-button-outline-width: var(--mat-btn-s-outline-width);
  --mat-btn-square-radius: var(--mat-btn-s-square-radius);
  --mat-button-pressed-radius: var(--mat-btn-s-pressed-radius);
  --mat-btn-label-font: var(--mat-type-label-large-font);
  --mat-btn-label-size: var(--mat-type-label-large-size);
  --mat-btn-label-line-height: var(--mat-type-label-large-line-height);
  --mat-btn-label-weight: var(--mat-type-label-large-weight);
  --mat-btn-label-tracking: var(--mat-type-label-large-tracking);
}

.mat-btn--size-m {
  --mat-button-container-height: var(--mat-btn-m-container-height);
  --mat-btn-horizontal-padding: var(--mat-btn-m-horizontal-padding);
  --mat-btn-icon-size: var(--mat-btn-m-icon-size);
  --mat-btn-icon-label-gap: var(--mat-btn-m-icon-label-gap);
  --mat-button-outline-width: var(--mat-btn-m-outline-width);
  --mat-btn-square-radius: var(--mat-btn-m-square-radius);
  --mat-button-pressed-radius: var(--mat-btn-m-pressed-radius);
  --mat-btn-label-font: var(--mat-type-title-medium-font);
  --mat-btn-label-size: var(--mat-type-title-medium-size);
  --mat-btn-label-line-height: var(--mat-type-title-medium-line-height);
  --mat-btn-label-weight: var(--mat-type-title-medium-weight);
}

.mat-btn--size-l {
  --mat-button-container-height: var(--mat-btn-l-container-height);
  --mat-btn-horizontal-padding: var(--mat-btn-l-horizontal-padding);
  --mat-btn-icon-size: var(--mat-btn-l-icon-size);
  --mat-btn-icon-label-gap: var(--mat-btn-l-icon-label-gap);
  --mat-button-outline-width: var(--mat-btn-l-outline-width);
  --mat-btn-square-radius: var(--mat-btn-l-square-radius);
  --mat-button-pressed-radius: var(--mat-btn-l-pressed-radius);
  --mat-btn-label-font: var(--mat-type-headline-small-font);
  --mat-btn-label-size: var(--mat-type-headline-small-size);
  --mat-btn-label-line-height: var(--mat-type-headline-small-line-height);
  --mat-btn-label-weight: var(--mat-type-headline-small-weight);
}

.mat-btn--size-xl {
  --mat-button-container-height: var(--mat-btn-xl-container-height);
  --mat-btn-horizontal-padding: var(--mat-btn-xl-horizontal-padding);
  --mat-btn-icon-size: var(--mat-btn-xl-icon-size);
  --mat-btn-icon-label-gap: var(--mat-btn-xl-icon-label-gap);
  --mat-button-outline-width: var(--mat-btn-xl-outline-width);
  --mat-btn-square-radius: var(--mat-btn-xl-square-radius);
  --mat-button-pressed-radius: var(--mat-btn-xl-pressed-radius);
  --mat-btn-label-font: var(--mat-type-headline-large-font);
  --mat-btn-label-size: var(--mat-type-headline-large-size);
  --mat-btn-label-line-height: var(--mat-type-headline-large-line-height);
  --mat-btn-label-weight: var(--mat-type-headline-large-weight);
}

.mat-btn--shape-round {
  --mat-button-radius: var(--mat-button-full-radius);
}

.mat-btn--shape-square {
  --mat-button-radius: var(--mat-btn-square-radius);
}

.mat-btn--shape-round.mat-btn--selected {
  --mat-button-radius: var(--mat-btn-square-radius);
}

.mat-btn--shape-square.mat-btn--selected {
  --mat-button-radius: var(--mat-button-full-radius);
}

.mat-btn--elevated {
  --mat-button-container-color: var(--mat-color-surface-container-low);
  --mat-button-content-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
  --mat-button-shadow: var(--mat-shadow-level-1);
  --mat-button-border-width: 0;
}

.mat-btn--elevated.mat-btn--selected,
.mat-btn--filled:not(.mat-btn--toggle),
.mat-btn--filled.mat-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-button-content-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-btn--filled.mat-btn--toggle:not(.mat-btn--selected) {
  --mat-button-container-color: var(--mat-color-surface-container);
  --mat-button-content-color: var(--mat-color-on-surface-variant);
  --mat-button-state-color: var(--mat-color-on-surface-variant);
}

.mat-btn--tonal {
  --mat-button-container-color: var(--mat-color-secondary-container);
  --mat-button-content-color: var(--mat-color-on-secondary-container);
  --mat-button-state-color: var(--mat-color-on-secondary-container);
}

.mat-btn--tonal.mat-btn--selected {
  --mat-button-container-color: var(--mat-color-secondary);
  --mat-button-content-color: var(--mat-color-on-secondary);
  --mat-button-state-color: var(--mat-color-on-secondary);
}

.mat-btn--tonal.mat-button--explicit-color:not(.mat-btn--selected) {
  --mat-button-container-color: var(--mat-accent-container-color);
  --mat-button-content-color: var(--mat-on-accent-container-color);
  --mat-button-state-color: var(--mat-on-accent-container-color);
}

.mat-btn--tonal.mat-button--explicit-color.mat-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-button-content-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-btn--outlined {
  --mat-button-container-color: transparent;
  --mat-button-content-color: var(--mat-color-on-surface-variant);
  --mat-button-state-color: var(--mat-color-on-surface-variant);
  --mat-button-border-color: var(--mat-color-outline-variant);
  --mat-button-border-width: var(--mat-button-outline-width);
}

.mat-btn--outlined.mat-btn--selected {
  --mat-button-container-color: var(--mat-color-inverse-surface);
  --mat-button-content-color: var(--mat-color-inverse-on-surface);
  --mat-button-state-color: var(--mat-color-inverse-on-surface);
  --mat-button-border-color: transparent;
}

.mat-btn--outlined.mat-button--explicit-color:not(.mat-btn--selected),
.mat-btn--text.mat-button--explicit-color {
  --mat-button-content-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
}

.mat-btn--outlined.mat-button--explicit-color.mat-btn--selected {
  --mat-button-container-color: var(--mat-accent-color);
  --mat-button-content-color: var(--mat-on-accent-color);
  --mat-button-state-color: var(--mat-on-accent-color);
}

.mat-btn--text {
  --mat-button-container-color: transparent;
  --mat-button-content-color: var(--mat-color-primary);
  --mat-button-state-color: var(--mat-color-primary);
  --mat-button-border-width: 0;
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
    --mat-button-shadow: var(--mat-shadow-level-2);
  }

  .mat-btn--filled:not(:disabled):hover,
  .mat-btn--tonal:not(:disabled):hover {
    --mat-button-shadow: var(--mat-shadow-level-1);
  }
}

.mat-btn:disabled {
  --mat-button-container-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-container-opacity) * 100%), transparent);
  --mat-button-content-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-content-opacity) * 100%), transparent);
  --mat-button-state-color: var(--mat-color-on-surface);
  --mat-button-shadow: none;
  --mat-button-border-width: 0;
}

.mat-btn--outlined:disabled {
  --mat-button-container-color: transparent;
  --mat-button-border-color: color-mix(in srgb, var(--mat-color-on-surface) calc(var(--mat-state-disabled-container-opacity) * 100%), transparent);
}

.mat-btn--text:disabled {
  --mat-button-container-color: transparent;
}
</style>
