<script setup>
import {
  computed, Fragment, isVNode, onMounted, ref, useAttrs, useId, useSlots, watchEffect,
} from 'vue';
import MatButtonBase from '../MatButtonBase.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatTooltip from '../mat-tooltip/MatTooltip.vue';
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
  block: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'filled',
    validator(value) {
      return ['elevated', 'filled', 'filled-tonal', 'outlined', 'text', 'standard'].includes(value);
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
  width: {
    type: String,
    default: 'uniform',
    validator(value) {
      return ['narrow', 'uniform', 'wide'].includes(value);
    },
  },
  icon: {
    type: [Boolean, String],
    default: undefined,
    validator(value) {
      return value === undefined
        || typeof value === 'boolean'
        || value.trim().length > 0;
    },
  },
  prefix: {
    type: String,
    default: undefined,
  },
  suffix: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
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
const $attrs = useAttrs();
const slots = useSlots();
const buttonElement = ref(null);
const generatedId = useId();
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
} = useButton(props, emit);
const isToggle = computed(() => effectiveToggle.value && effectiveVariant.value !== 'text');
const isSelected = computed(() => isToggle.value && effectiveSelected.value);
const isIcon = computed(() => props.icon === true
  || (typeof props.icon === 'string' && props.icon.trim().length > 0));

/**
 * @param {unknown[]} nodes
 * @returns {string}
 */
function getSlotText(nodes) {
  return nodes
    .flatMap((node) => {
      if (typeof node === 'string' || typeof node === 'number') {
        return [String(node)];
      }

      if (!isVNode(node)) {
        return [];
      }

      if (node.type === Fragment && Array.isArray(node.children)) {
        return getSlotText(node.children);
      }

      if (typeof node.children === 'string' || typeof node.children === 'number') {
        return [String(node.children)];
      }

      if (Array.isArray(node.children)) {
        return getSlotText(node.children);
      }

      return [];
    })
    .join('')
    .trim();
}

const defaultSlotIconText = computed(() => {
  if (props.icon !== true) {
    return '';
  }

  return getSlotText(slots.default?.() ?? []);
});
const iconText = computed(() => (
  typeof props.icon === 'string' ? props.icon.trim() : defaultSlotIconText.value
));
const accessibleLabel = computed(() => $attrs['aria-label'] ?? props.label);
const tooltipContent = computed(() => (
  isIcon.value ? ($attrs.title ?? props.label) : undefined
));
const hasPrefix = computed(() => !isIcon.value && (
  props.prefix !== undefined || Boolean(slots.prefix)
));
const hasSuffix = computed(() => !isIcon.value && (
  props.suffix !== undefined || Boolean(slots.suffix)
));
const hasSelectedLabel = computed(() => isSelected.value && Boolean(slots.selected));
const iconOpticalSize = computed(() => ({
  'extra-small': 20,
  small: isIcon.value ? 24 : 20,
  medium: 24,
  large: 32,
  'extra-large': 40,
})[effectiveSize.value]);
onMounted(() => {
  if (props.icon === true && !defaultSlotIconText.value) {
    console.warn('MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本');
  }
});
watchEffect(() => {
  if (props.toggle && props.variant === 'text') {
    console.warn('MatBtn: text 形态不支持 toggle，当前按普通文本按钮处理');
  }

  if (isIcon.value && (!accessibleLabel.value || accessibleLabel.value.trim().length === 0)) {
    console.warn('MatBtn: 图标模式必须提供非空 label 或 aria-label');
  }
});
</script>

<template>
  <MatButtonBase
    ref="buttonElement"
    v-bind="$attrs"
    class="mat-btn"
    :class="[
      `mat-btn--${effectiveVariant}`,
      `mat-btn--size-${effectiveSize}`,
      `mat-btn--shape-${effectiveShape}`,
      {
        'mat-button--explicit-color': hasExplicitColor,
        'mat-btn--icon': isIcon,
        [`mat-btn--width-${width}`]: isIcon,
        'mat-btn--toggle': isToggle,
        'mat-btn--selected': isSelected,
        'mat-btn--split-leading': split?.role === 'leading',
      },
    ]"
    :style="colorStyle"
    :aria-label="isIcon ? accessibleLabel : $attrs['aria-label']"
    :aria-controls="split?.role === 'trailing' ? split.controls.value : undefined"
    :aria-expanded="split?.role === 'trailing' ? split.expanded.value : undefined"
    :aria-haspopup="split?.role === 'trailing' ? 'menu' : undefined"
    :aria-pressed="isToggle ? isSelected : undefined"
    :block="block"
    :disabled="effectiveDisabled"
    :title="isIcon ? undefined : $attrs.title"
    :type="type"
    :use-cursor="useCursor"
    @click="handleClick"
  >
    <MatIcon
      v-if="isIcon"
      as="span"
      class="mat-btn__icon mat-btn__icon--only"
      :fill="isSelected ? 1 : 0"
      :optical-size="iconOpticalSize"
      size="var(--mat-btn-icon-size)"
      aria-hidden="true"
    >
      {{ iconText }}
    </MatIcon>

    <MatIcon
      v-if="hasPrefix"
      as="span"
      class="mat-btn__icon mat-btn__icon--prefix"
      :fill="isSelected ? 1 : 0"
      :optical-size="iconOpticalSize"
      size="var(--mat-btn-icon-size)"
      aria-hidden="true"
    >
      <template v-if="prefix !== undefined">
        {{ prefix }}
      </template>
      <slot v-else name="prefix" />
    </MatIcon>

    <span v-if="!isIcon" class="mat-btn__label">
      <slot v-if="hasSelectedLabel" name="selected" />
      <slot v-else />
    </span>

    <MatIcon
      v-if="hasSuffix"
      as="span"
      class="mat-btn__icon mat-btn__icon--suffix"
      :fill="isSelected ? 1 : 0"
      :optical-size="iconOpticalSize"
      size="var(--mat-btn-icon-size)"
      aria-hidden="true"
    >
      <template v-if="suffix !== undefined">
        {{ suffix }}
      </template>
      <slot v-else name="suffix" />
    </MatIcon>

    <MatTooltip
      v-if="isIcon && tooltipContent"
      :content="tooltipContent"
      :id="`${generatedId}-tooltip`"
      :target="buttonElement"
    />
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
  --mat-btn-icon-only-size: var(--mat-btn-icon-only-extra-small-icon-size);
  --mat-btn-icon-only-narrow-space: var(--mat-btn-icon-only-extra-small-narrow-space);
  --mat-btn-icon-only-uniform-space: var(--mat-btn-icon-only-extra-small-uniform-space);
  --mat-btn-icon-only-wide-space: var(--mat-btn-icon-only-extra-small-wide-space);
  --mat-btn-icon-only-outline-width: var(--mat-btn-icon-only-extra-small-outline-width);
  --mat-btn-icon-only-square-shape: var(--mat-btn-icon-only-extra-small-square-shape);
  --mat-btn-icon-only-pressed-shape: var(--mat-btn-icon-only-extra-small-pressed-shape);
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
  --mat-btn-icon-only-size: var(--mat-btn-icon-only-small-icon-size);
  --mat-btn-icon-only-narrow-space: var(--mat-btn-icon-only-small-narrow-space);
  --mat-btn-icon-only-uniform-space: var(--mat-btn-icon-only-small-uniform-space);
  --mat-btn-icon-only-wide-space: var(--mat-btn-icon-only-small-wide-space);
  --mat-btn-icon-only-outline-width: var(--mat-btn-icon-only-small-outline-width);
  --mat-btn-icon-only-square-shape: var(--mat-btn-icon-only-small-square-shape);
  --mat-btn-icon-only-pressed-shape: var(--mat-btn-icon-only-small-pressed-shape);
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
  --mat-btn-icon-only-size: var(--mat-btn-icon-only-medium-icon-size);
  --mat-btn-icon-only-narrow-space: var(--mat-btn-icon-only-medium-narrow-space);
  --mat-btn-icon-only-uniform-space: var(--mat-btn-icon-only-medium-uniform-space);
  --mat-btn-icon-only-wide-space: var(--mat-btn-icon-only-medium-wide-space);
  --mat-btn-icon-only-outline-width: var(--mat-btn-icon-only-medium-outline-width);
  --mat-btn-icon-only-square-shape: var(--mat-btn-icon-only-medium-square-shape);
  --mat-btn-icon-only-pressed-shape: var(--mat-btn-icon-only-medium-pressed-shape);
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
  --mat-btn-icon-only-size: var(--mat-btn-icon-only-large-icon-size);
  --mat-btn-icon-only-narrow-space: var(--mat-btn-icon-only-large-narrow-space);
  --mat-btn-icon-only-uniform-space: var(--mat-btn-icon-only-large-uniform-space);
  --mat-btn-icon-only-wide-space: var(--mat-btn-icon-only-large-wide-space);
  --mat-btn-icon-only-outline-width: var(--mat-btn-icon-only-large-outline-width);
  --mat-btn-icon-only-square-shape: var(--mat-btn-icon-only-large-square-shape);
  --mat-btn-icon-only-pressed-shape: var(--mat-btn-icon-only-large-pressed-shape);
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
  --mat-btn-icon-only-size: var(--mat-btn-icon-only-extra-large-icon-size);
  --mat-btn-icon-only-narrow-space: var(--mat-btn-icon-only-extra-large-narrow-space);
  --mat-btn-icon-only-uniform-space: var(--mat-btn-icon-only-extra-large-uniform-space);
  --mat-btn-icon-only-wide-space: var(--mat-btn-icon-only-extra-large-wide-space);
  --mat-btn-icon-only-outline-width: var(--mat-btn-icon-only-extra-large-outline-width);
  --mat-btn-icon-only-square-shape: var(--mat-btn-icon-only-extra-large-square-shape);
  --mat-btn-icon-only-pressed-shape: var(--mat-btn-icon-only-extra-large-pressed-shape);
}

.mat-btn--icon {
  --mat-btn-icon-size: var(--mat-btn-icon-only-size);
  --mat-button-outline-width: var(--mat-btn-icon-only-outline-width);
  --mat-btn-square-container-shape: var(--mat-btn-icon-only-square-shape);
  --mat-button-pressed-radius: var(--mat-btn-icon-only-pressed-shape);
  --mat-button-container-width: calc(var(--mat-btn-icon-size) + var(--mat-btn-icon-only-leading-space) + var(--mat-btn-icon-only-trailing-space));
  gap: 0;
  min-inline-size: 0;
  padding-inline: 0;
}

.mat-btn--icon.mat-btn--width-narrow {
  --mat-btn-icon-only-leading-space: var(--mat-btn-icon-only-narrow-space);
  --mat-btn-icon-only-trailing-space: var(--mat-btn-icon-only-narrow-space);
}

.mat-btn--icon.mat-btn--width-uniform {
  --mat-btn-icon-only-leading-space: var(--mat-btn-icon-only-uniform-space);
  --mat-btn-icon-only-trailing-space: var(--mat-btn-icon-only-uniform-space);
}

.mat-btn--icon.mat-btn--width-wide {
  --mat-btn-icon-only-leading-space: var(--mat-btn-icon-only-wide-space);
  --mat-btn-icon-only-trailing-space: var(--mat-btn-icon-only-wide-space);
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

.mat-btn--standard {
  --mat-button-container-color: var(--mat-btn-standard-container-color);
  --mat-btn-label-text-color: var(--mat-btn-standard-content-color);
  --mat-btn-icon-color: var(--mat-btn-standard-content-color);
  --mat-button-state-color: var(--mat-btn-standard-state-layer-color);
  --mat-button-border-width: 0;
  --mat-button-container-elevation: var(--mat-sys-elevation-level0);
}

.mat-btn--standard.mat-btn--selected {
  --mat-btn-label-text-color: var(--mat-btn-standard-selected-content-color);
  --mat-btn-icon-color: var(--mat-btn-standard-selected-content-color);
  --mat-button-state-color: var(--mat-btn-standard-selected-state-layer-color);
}

.mat-btn--standard.mat-button--explicit-color {
  --mat-btn-label-text-color: var(--mat-accent-color);
  --mat-btn-icon-color: var(--mat-accent-color);
  --mat-button-state-color: var(--mat-accent-color);
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

.mat-btn--text:disabled,
.mat-btn--standard:disabled {
  --mat-button-container-color: transparent;
}
</style>
