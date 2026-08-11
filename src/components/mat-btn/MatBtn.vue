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
import { useMatProps } from '../use-mat-props';
import { getTypographyClass } from '../typography';

defineOptions({
  name: 'MatBtn',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 使用块级 flex 根布局，在普通文档流中铺满父元素。
   *
   * @type {boolean}
   * @default false
   */
  block: {
    type: Boolean,
    default: false,
  },
  /**
   * 按钮视觉层级。可选值为 `elevated`、`filled`、`filled-tonal`、`outlined`、`text`、`standard`。
   *
   * @type {'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text' | 'standard'}
   * @default 'filled'
   */
  variant: {
    type: String,
    default: 'filled',
    validator(value) {
      return ['elevated', 'filled', 'filled-tonal', 'outlined', 'text', 'standard'].includes(value);
    },
  },
  /**
   * 按钮容器、排版、图标、间距和圆角尺寸；可选值为 `extra-small`、`small`、`medium`、`large`、`extra-large`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  size: {
    type: String,
    default: undefined,
    validator(value) {
      return BUTTON_SIZES.includes(value);
    },
  },
  /**
   * 静止形状；可选值为 `round`、`square`。
   *
   * @type {'round' | 'square' | undefined}
   * @default undefined
   */
  shape: {
    type: String,
    default: undefined,
    validator(value) {
      return BUTTON_SHAPES.includes(value);
    },
  },
  /**
   * 图标模式的容器宽度；可选值为 `narrow`、`uniform`、`wide`，普通模式忽略。
   *
   * @type {'narrow' | 'uniform' | 'wide'}
   * @default 'uniform'
   */
  width: {
    type: String,
    default: 'uniform',
    validator(value) {
      return ['narrow', 'uniform', 'wide'].includes(value);
    },
  },
  /**
   * 图标模式；`true` 从默认 Slot 读取 Material Symbols，字符串直接指定图标。
   *
   * @type {boolean | string | undefined}
   * @default undefined
   */
  icon: {
    type: [Boolean, String],
    default: undefined,
    validator(value) {
      return value === undefined
        || typeof value === 'boolean'
        || value.trim().length > 0;
    },
  },
  /**
   * 图标 FILL 轴，仅在图标模式生效；省略时沿用 toggle 选中态的旧行为。
   *
   * @type {number | undefined}
   * @default undefined
   */
  fill: {
    type: Number,
    default: undefined,
  },
  /**
   * 普通按钮前置图标，优先于 prefix Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  prefix: {
    type: String,
    default: undefined,
  },
  /**
   * 普通按钮后置图标，优先于 suffix Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  suffix: {
    type: String,
    default: undefined,
  },
  /**
   * 图标模式的无障碍名称和默认 Tooltip 文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`。可选语义色为 `primary`、`secondary`、`tertiary`、`error`。
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
   * 启用可选择外观和 `aria-pressed`。
   *
   * @type {boolean}
   * @default false
   */
  toggle: {
    type: Boolean,
    default: false,
  },
  /**
   * 受控选中状态，仅在 toggle 或选择组中生效。
   *
   * @type {boolean}
   * @default false
   */
  selected: {
    type: Boolean,
    default: false,
  },
  /**
   * 在 MatBtnGroup 选择模式中的项目值。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * 原生禁用状态。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生按钮类型；可选值为 `button`、`submit`、`reset`。
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
});
const propsWithDefaults = useMatProps('btn', props);

const emit = defineEmits({
  /**
   * 启用的按钮被用户激活时转发原生点击事件。载荷为 `MouseEvent`。
   */
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
} = useButton(propsWithDefaults, emit);
const isToggle = computed(() => effectiveToggle.value && effectiveVariant.value !== 'text');
const isSelected = computed(() => isToggle.value && effectiveSelected.value);
const isIcon = computed(() => propsWithDefaults.icon === true
  || (typeof propsWithDefaults.icon === 'string' && propsWithDefaults.icon.trim().length > 0));
const iconFill = computed(() => {
  if (propsWithDefaults.fill !== undefined) {
    return propsWithDefaults.fill;
  }

  return isSelected.value ? 1 : 0;
});

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
  if (propsWithDefaults.icon !== true) {
    return '';
  }

  return getSlotText(slots.default?.() ?? []);
});
const iconText = computed(() => (
  typeof propsWithDefaults.icon === 'string' ? propsWithDefaults.icon.trim() : defaultSlotIconText.value
));
const accessibleLabel = computed(() => $attrs['aria-label'] ?? propsWithDefaults.label);
const tooltipContent = computed(() => (
  isIcon.value ? ($attrs.title ?? propsWithDefaults.label) : undefined
));
const hasPrefix = computed(() => !isIcon.value && (
  propsWithDefaults.prefix !== undefined || Boolean(slots.prefix)
));
const hasSuffix = computed(() => !isIcon.value && (
  propsWithDefaults.suffix !== undefined || Boolean(slots.suffix)
));
const hasSelectedLabel = computed(() => isSelected.value && Boolean(slots.selected));
const iconOpticalSize = computed(() => ({
  'extra-small': 20,
  small: isIcon.value ? 24 : 20,
  medium: 24,
  large: 32,
  'extra-large': 40,
})[effectiveSize.value]);
const typographyClass = computed(() => {
  const [type, size] = {
    'extra-small': ['label', 'large'],
    small: ['label', 'large'],
    medium: ['title', 'medium'],
    large: ['headline', 'small'],
    'extra-large': ['headline', 'large'],
  }[effectiveSize.value];

  return getTypographyClass(type, size, true);
});
onMounted(() => {
  if (propsWithDefaults.icon === true && !defaultSlotIconText.value) {
    console.warn('MatBtn: icon=true 必须在默认 Slot 提供非空 Material Symbols 文本');
  }
});
watchEffect(() => {
  if (propsWithDefaults.toggle && propsWithDefaults.variant === 'text') {
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
      typographyClass,
      {
        'mat-button--explicit-color': hasExplicitColor,
        'mat-btn--icon': isIcon,
        [`mat-btn--width-${propsWithDefaults.width}`]: isIcon,
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
    :block="propsWithDefaults.block"
    :disabled="effectiveDisabled"
    :title="isIcon ? undefined : $attrs.title"
    :type="propsWithDefaults.type"
    :use-cursor="useCursor"
    @click="handleClick"
  >
    <MatIcon
      v-if="isIcon"
      as="span"
      class="mat-btn__icon mat-btn__icon--only"
      :fill="iconFill"
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
      :fill="iconFill"
      :optical-size="iconOpticalSize"
      size="var(--mat-btn-icon-size)"
      aria-hidden="true"
    >
      <template v-if="propsWithDefaults.prefix !== undefined">
        {{ propsWithDefaults.prefix }}
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
      :fill="iconFill"
      :optical-size="iconOpticalSize"
      size="var(--mat-btn-icon-size)"
      aria-hidden="true"
    >
      <template v-if="propsWithDefaults.suffix !== undefined">
        {{ propsWithDefaults.suffix }}
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
  max-inline-size: 100%;
  min-inline-size: calc(var(--mat-btn-leading-space) + var(--mat-btn-trailing-space));
  padding-inline: var(--mat-btn-leading-space) var(--mat-btn-trailing-space);
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
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
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
