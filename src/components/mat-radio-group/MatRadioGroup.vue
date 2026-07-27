<script setup>
import {
  computed, provide, shallowRef, useAttrs,
} from 'vue';
import { isComponentColor } from '../button-props';
import MAT_RADIO_GROUP_KEY from '../radio-context';
import { isSelectionValue } from '../selection-control';
import useComponentColor from '../use-component-color';

defineOptions({
  name: 'MatRadioGroup',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 当前选中值；未选中时为 null。
   *
   * @type {string | number | boolean | null}
   * @default null
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
    validator(value) {
      return value === null || isSelectionValue(value);
    },
  },
  /**
   * 组的必填无障碍标签。
   *
   * @type {string}
   * @required
   */
  label: {
    type: String,
    required: true,
  },
  /**
   * 禁止组内所有 Radio 交互。
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
});

const emit = defineEmits({
  /**
   * 子 Radio 被选中时发出新的 value。
   */
  'update:modelValue'(value) {
    return value === null || isSelectionValue(value);
  },
  /**
   * 子 Radio 的原生 change 事件。
   */
  change(event) {
    return event instanceof Event;
  },
});
const attrs = useAttrs();
const registrations = shallowRef([]);
const { colorStyle } = useComponentColor(computed(() => props.color));
const rootAttrs = computed(() => Object.fromEntries(
  Object.entries(attrs).filter(([name]) => name !== 'style'),
));
const rootStyle = computed(() => [colorStyle.value, attrs.style]);

/**
 * @param {string | number | boolean} value
 * @returns {boolean}
 */
function isSelected(value) {
  return Object.is(props.modelValue, value);
}

/**
 * @returns {object[]}
 */
function getOrderedRegistrations() {
  return [...registrations.value].sort((first, second) => {
    const firstElement = first.getInput();
    const secondElement = second.getInput();

    if (!firstElement || !secondElement) {
      return 0;
    }

    const position = firstElement.compareDocumentPosition(secondElement);

    if (position & 4) {
      return -1;
    }

    if (position & 2) {
      return 1;
    }

    return 0;
  });
}

/**
 * @param {object} registration
 */
function register(registration) {
  if (!registrations.value.includes(registration)) {
    registrations.value = [...registrations.value, registration];
  }
}

/**
 * @param {object} registration
 */
function unregister(registration) {
  registrations.value = registrations.value.filter((item) => item !== registration);
}

/**
 * @param {object} registration
 * @returns {number}
 */
function getTabIndex(registration) {
  if (registration.disabled.value) {
    return -1;
  }

  const enabled = getOrderedRegistrations().filter((item) => !item.disabled.value);
  const selected = enabled.find((item) => isSelected(item.value.value));

  if (selected) {
    return selected === registration ? 0 : -1;
  }

  return enabled[0] === registration ? 0 : -1;
}

/**
 * @param {string | number | boolean} value
 * @param {Event} originalEvent
 */
function requestSelection(value, originalEvent) {
  if (props.disabled || Object.is(props.modelValue, value)) {
    return;
  }

  emit('update:modelValue', value);
  emit('change', originalEvent);
}

/**
 * @param {object} registration
 * @param {-1 | 1} direction
 * @param {KeyboardEvent} originalEvent
 */
function move(registration, direction, originalEvent) {
  const enabled = getOrderedRegistrations().filter((item) => !item.disabled.value);
  const currentIndex = enabled.indexOf(registration);

  if (currentIndex === -1 || enabled.length === 0) {
    return;
  }

  originalEvent.preventDefault();

  const nextIndex = (currentIndex + direction + enabled.length) % enabled.length;
  const nextRegistration = enabled[nextIndex];

  nextRegistration.focus();
  nextRegistration.activate(originalEvent);
}

provide(MAT_RADIO_GROUP_KEY, {
  color: computed(() => props.color),
  disabled: computed(() => props.disabled),
  getTabIndex,
  isSelected,
  move,
  register,
  requestSelection,
  unregister,
});
</script>

<template>
  <fieldset
    v-bind="rootAttrs"
    class="mat-radio-group"
    :aria-disabled="disabled || undefined"
    :style="rootStyle"
    role="radiogroup"
  >
    <legend class="mat-radio-group__label">
      {{ label }}
    </legend>
    <slot />
  </fieldset>
</template>

<style scoped>
.mat-radio-group {
  display: inline-flex;
  flex-direction: column;
  gap: var(--mat-radio-group-item-space);
  align-items: flex-start;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  color: var(--mat-radio-label-text-color);
  border: 0;
}

.mat-radio-group__label {
  margin-block-end: var(--mat-radio-group-label-space);
  padding: 0;
  color: var(--mat-radio-label-text-color);
  font-family: var(--mat-sys-typescale-title-medium-font);
  font-size: var(--mat-sys-typescale-title-medium-size);
  font-weight: var(--mat-sys-typescale-title-medium-weight);
  line-height: var(--mat-sys-typescale-title-medium-line-height);
  letter-spacing: var(--mat-sys-typescale-title-medium-tracking);
}
</style>
