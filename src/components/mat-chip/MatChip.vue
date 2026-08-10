<script setup>
import {
  computed, inject, useSlots,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import { BUTTON_TYPES, isComponentColor } from '../button-props';
import MatIcon from '../mat-icon/MatIcon.vue';
import useComponentColor from '../use-component-color';

defineOptions({
  name: 'MatChip',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Chip 的用途形态。
   *
   * @type {'assist' | 'filter' | 'input' | 'suggestion'}
   * @default 'assist'
   */
  variant: {
    type: String,
    default: 'assist',
    validator(value) {
      return ['assist', 'filter', 'input', 'suggestion'].includes(value);
    },
  },
  /**
   * 使用 level 1 海拔和 surface container low 表面。
   *
   * @type {boolean}
   * @default false
   */
  elevated: {
    type: Boolean,
    default: false,
  },
  /**
   * filter 与 input 的受控选中外观；组件不会自行切换该值。
   *
   * @type {boolean}
   * @default false
   */
  selected: {
    type: Boolean,
    default: false,
  },
  /**
   * 使用原生按钮禁用语义。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 语义色或六位十六进制种子色 `#RRGGBB`。
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
   * 原生按钮类型。
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

const emit = defineEmits({
  /**
   * 启用的 Chip 被激活时转发原生点击事件，载荷为 `MouseEvent`。
   */
  click(payload) {
    return payload instanceof MouseEvent;
  },
});
const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const isSelectable = computed(() => ['filter', 'input'].includes(props.variant));
const isSelected = computed(() => isSelectable.value && props.selected);
const hasAvatar = computed(() => Boolean(slots.avatar));
const hasLeading = computed(() => !hasAvatar.value && Boolean(slots.leading));
const showSelectedIcon = computed(() => (
  props.variant === 'filter'
    && isSelected.value
    && !hasAvatar.value
    && !hasLeading.value
));
const hasLeadingContent = computed(() => (
  hasAvatar.value || hasLeading.value || showSelectedIcon.value
));
const hasTrailing = computed(() => Boolean(slots.trailing) || props.variant === 'input');
const { colorStyle, hasExplicitColor } = useComponentColor(computed(() => props.color));
</script>

<template>
  <MatActionBase
    v-bind="$attrs"
    class="mat-chip"
    :class="[
      `mat-chip--${variant}`,
      {
        'mat-chip--elevated': elevated,
        'mat-chip--selected': isSelected,
        'mat-chip--explicit-color': hasExplicitColor,
        'mat-chip--has-leading': hasLeadingContent,
        'mat-chip--has-avatar': hasAvatar,
        'mat-chip--has-trailing': hasTrailing,
      },
    ]"
    :style="colorStyle"
    :aria-pressed="isSelectable ? String(isSelected) : undefined"
    :disabled="disabled"
    :type="type"
    :use-cursor="matUi.useCursor"
    @click="emit('click', $event)"
  >
    <span
      v-if="hasAvatar"
      class="mat-chip__avatar"
      aria-hidden="true"
      inert
    >
      <slot name="avatar" />
    </span>

    <span
      v-else-if="hasLeading || showSelectedIcon"
      class="mat-chip__icon mat-chip__icon--leading"
      aria-hidden="true"
      inert
    >
      <slot v-if="hasLeading" name="leading" />
      <MatIcon
        v-else
        as="span"
        icon="check"
        :optical-size="20"
        size="18px"
      />
    </span>

    <span class="mat-chip__label">
      <slot />
    </span>

    <span
      v-if="hasTrailing"
      class="mat-chip__icon mat-chip__icon--trailing"
      aria-hidden="true"
      inert
    >
      <slot v-if="$slots.trailing" name="trailing" />
      <MatIcon
        v-else
        as="span"
        icon="close"
        :optical-size="20"
        size="18px"
      />
    </span>
  </MatActionBase>
</template>

<style scoped>
.mat-chip {
  --mat-chip-container-color: transparent;
  --mat-chip-label-color: var(--mat-sys-color-on-surface-variant);
  --mat-chip-icon-color: var(--mat-sys-color-on-surface-variant);
  --mat-chip-state-color: var(--mat-chip-label-color);
  --mat-chip-outline-color: var(--mat-sys-color-outline-variant);
  --mat-chip-elevation: none;
  --mat-action-state-color: var(--mat-chip-state-color);
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  max-inline-size: 100%;
  min-inline-size: 0;
  block-size: 32px;
  padding-block: 0;
  padding-inline: 16px;
  color: var(--mat-chip-label-color);
  font-family: var(--mat-sys-typescale-label-large-font);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
  letter-spacing: var(--mat-sys-typescale-label-large-tracking);
  line-height: var(--mat-sys-typescale-label-large-line-height);
  text-align: start;
  white-space: nowrap;
  vertical-align: middle;
  background: var(--mat-chip-container-color);
  border: 1px solid var(--mat-chip-outline-color);
  border-radius: var(--mat-sys-shape-corner-small);
  box-shadow: var(--mat-chip-elevation);
  transition-duration: var(--mat-sys-motion-duration-short3);
  transition-property: color, background-color, border-color, box-shadow;
  transition-timing-function: var(--mat-sys-motion-easing-standard);
}

.mat-chip--has-leading { padding-inline-start: 8px; }

.mat-chip--has-avatar { padding-inline-start: 4px; }

.mat-chip--has-trailing { padding-inline-end: 8px; }

.mat-chip--assist {
  --mat-chip-icon-color: var(--mat-accent-color, var(--mat-sys-color-primary));
}

.mat-chip--selected {
  --mat-chip-container-color: var(--mat-accent-container-color, var(--mat-sys-color-secondary-container));
  --mat-chip-label-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-secondary-container));
  --mat-chip-icon-color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-secondary-container));
  --mat-chip-outline-color: transparent;
}

.mat-chip--elevated {
  --mat-chip-container-color: var(--mat-sys-color-surface-container-low);
  --mat-chip-outline-color: transparent;
  --mat-chip-elevation: var(--mat-sys-elevation-level1);
}

.mat-chip--selected.mat-chip--elevated {
  --mat-chip-container-color: var(--mat-accent-container-color, var(--mat-sys-color-secondary-container));
}

.mat-chip::after {
  position: absolute;
  z-index: 2;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  inline-size: max(100%, var(--mat-sys-interaction-target-min-size));
  block-size: max(100%, var(--mat-sys-interaction-target-min-size));
  content: '';
  pointer-events: auto;
  transform: translate(-50%, -50%);
}

.mat-chip__avatar,
.mat-chip__icon,
.mat-chip__label {
  position: relative;
  z-index: 1;
}

.mat-chip__avatar,
.mat-chip__icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  overflow: clip;
  color: var(--mat-chip-icon-color);
  line-height: 1;
}

.mat-chip__icon {
  inline-size: 18px;
  block-size: 18px;
  font-size: 18px;
}

.mat-chip__avatar {
  inline-size: 24px;
  block-size: 24px;
  border-radius: var(--mat-sys-shape-corner-full);
}

.mat-chip__avatar :deep(*) {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

.mat-chip__label {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-chip:disabled {
  --mat-chip-container-color: transparent;
  --mat-chip-label-color: color-mix(
    in srgb,
    var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-content-opacity) * 100%),
    transparent
  );
  --mat-chip-icon-color: var(--mat-chip-label-color);
  --mat-chip-outline-color: color-mix(
    in srgb,
    var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%),
    transparent
  );
  --mat-chip-elevation: none;
}

.mat-chip--elevated:disabled,
.mat-chip--selected:disabled {
  --mat-chip-container-color: color-mix(
    in srgb,
    var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%),
    transparent
  );
  --mat-chip-outline-color: transparent;
}

@media (prefers-reduced-motion: reduce) {
  .mat-chip { transition-duration: 0s; }
}
</style>
