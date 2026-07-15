<script setup>
import {
  computed, ref, useAttrs, useId,
} from 'vue';
import MatIcon from './mat-icon/MatIcon.vue';
import useComponentColor from './use-component-color';

defineOptions({
  name: 'MatTextInputBase',
  inheritAttrs: false,
});

const props = defineProps({
  block: {
    type: Boolean,
    required: true,
  },
  control: {
    type: String,
    required: true,
    validator(value) {
      return ['input', 'textarea'].includes(value);
    },
  },
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: undefined,
  },
  supportingText: {
    type: String,
    default: undefined,
  },
  errorText: {
    type: String,
    default: undefined,
  },
  prefixText: {
    type: String,
    default: undefined,
  },
  suffixText: {
    type: String,
    default: undefined,
  },
  maxLength: {
    type: Number,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  readonly: {
    type: Boolean,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  error: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: undefined,
  },
  rows: {
    type: Number,
    default: undefined,
  },
});
const emit = defineEmits({
  'update:modelValue': (payload) => typeof payload === 'string',
});
const attrs = useAttrs();
const focused = ref(false);
const generatedId = useId();
const supportingId = `${generatedId}-supporting`;
const { colorStyle } = useComponentColor(computed(() => props.color));
const hasPlaceholder = computed(() => Boolean(attrs.placeholder));
const isFloating = computed(() => (
  focused.value || props.modelValue.length > 0 || hasPlaceholder.value
));
const visibleSupportingText = computed(() => (
  props.error ? props.errorText : props.supportingText
));
const hasSupporting = computed(() => (
  Boolean(visibleSupportingText.value) || props.maxLength !== undefined
));
const describedBy = computed(() => {
  const ids = [attrs['aria-describedby']];

  if (hasSupporting.value) {
    ids.push(supportingId);
  }

  return ids.filter(Boolean).join(' ') || undefined;
});
const rootStyle = computed(() => [colorStyle.value, attrs.style]);
const ROOT_ATTRIBUTES = new Set(['aria-describedby', 'aria-hidden', 'class', 'inert', 'style']);
const nativeAttrs = computed(() => Object.fromEntries(
  Object.entries(attrs).filter(([name]) => !ROOT_ATTRIBUTES.has(name)),
));

/**
 * @param {Event} event
 */
function handleInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<template>
  <label
    class="mat-text-input"
    :class="[
      $attrs.class,
      `mat-text-input--${variant}`,
      `mat-text-input--${control}`,
      {
        'mat-text-input--floating': isFloating,
        'mat-text-input--focused': focused,
        'mat-text-input--error': error,
        'mat-text-input--disabled': disabled,
        'mat-text-input--block': block,
      },
    ]"
    :style="rootStyle"
    :inert="$attrs.inert"
    :aria-hidden="$attrs['aria-hidden']"
  >
    <span class="mat-text-input__container">
      <MatIcon
        v-if="$slots.leading"
        as="span"
        class="mat-text-input__icon mat-text-input__leading"
        :optical-size="24"
        size="24px"
      >
        <slot name="leading" />
      </MatIcon>

      <span class="mat-text-input__main">
        <span v-if="label" class="mat-text-input__label">
          {{ label }}<span v-if="required" aria-hidden="true"> *</span>
        </span>

        <span class="mat-text-input__control-row">
          <span v-if="prefixText" class="mat-text-input__affix mat-text-input__prefix">
            {{ prefixText }}
          </span>

          <component
            :is="control"
            v-bind="nativeAttrs"
            class="mat-text-input__control"
            :aria-describedby="describedBy"
            :aria-invalid="error ? 'true' : undefined"
            :disabled="disabled"
            :maxlength="maxLength"
            :readonly="readonly"
            :required="required"
            :rows="control === 'textarea' ? rows : undefined"
            :type="control === 'input' ? type : undefined"
            :value="modelValue"
            @blur="focused = false"
            @focus="focused = true"
            @input="handleInput"
          />

          <span v-if="suffixText" class="mat-text-input__affix mat-text-input__suffix">
            {{ suffixText }}
          </span>
        </span>
      </span>

      <MatIcon
        v-if="$slots.trailing"
        as="span"
        class="mat-text-input__icon mat-text-input__trailing"
        :optical-size="24"
        size="24px"
      >
        <slot name="trailing" />
      </MatIcon>
    </span>

    <span v-if="hasSupporting" :id="supportingId" class="mat-text-input__supporting">
      <span class="mat-text-input__supporting-text">
        {{ visibleSupportingText }}
      </span>
      <span v-if="maxLength !== undefined" class="mat-text-input__counter">
        {{ modelValue.length }} / {{ maxLength }}
      </span>
    </span>
  </label>
</template>

<style scoped>
.mat-text-input {
  --mat-text-input-accent-color: var(--mat-accent-color, var(--mat-sys-color-primary));
  --mat-text-input-container-color: var(--mat-sys-color-surface-container-highest);
  --mat-text-input-content-color: var(--mat-sys-color-on-surface);
  --mat-text-input-label-color: var(--mat-sys-color-on-surface-variant);
  --mat-text-input-outline-color: var(--mat-sys-color-outline);
  --mat-text-input-supporting-color: var(--mat-sys-color-on-surface-variant);
  display: inline-flex;
  flex-direction: column;
  min-inline-size: 0;
  inline-size: 100%;
  color: var(--mat-text-input-content-color);
  cursor: text;
}

.mat-text-input__container {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-block-size: var(--mat-text-input-container-height);
  inline-size: 100%;
  overflow: visible;
  background: transparent;
  border: 1px solid var(--mat-text-input-outline-color);
  border-radius: var(--mat-sys-shape-corner-small);
}

.mat-text-input--block {
  display: flex;
}

.mat-text-input__container::after {
  position: absolute;
  z-index: 2;
  inset: 0;
  border: 2px solid var(--mat-text-input-accent-color);
  border-radius: inherit;
  clip-path: inset(0 50% round var(--mat-sys-shape-corner-small));
  content: '';
  opacity: 0;
  pointer-events: none;
  transition: clip-path var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized), opacity var(--mat-sys-motion-duration-short2) var(--mat-sys-motion-easing-standard);
}

.mat-text-input--focused .mat-text-input__container::after {
  clip-path: inset(0 round var(--mat-sys-shape-corner-small));
  opacity: 1;
}

.mat-text-input--filled .mat-text-input__container {
  overflow: clip;
  background: var(--mat-text-input-container-color);
  border: 0;
  border-radius: var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small) 0 0;
  box-shadow: inset 0 -1px 0 var(--mat-text-input-outline-color);
}

.mat-text-input--filled .mat-text-input__container::after {
  inset: auto 0 0;
  block-size: 2px;
  border: 0;
  border-radius: 0;
  background: var(--mat-text-input-accent-color);
  clip-path: inset(0 50%);
}

.mat-text-input--filled.mat-text-input--focused .mat-text-input__container::after {
  clip-path: inset(0);
}

.mat-text-input__main {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-self: stretch;
  min-inline-size: 0;
}

.mat-text-input__control-row {
  display: flex;
  flex: 1 1 auto;
  gap: 4px;
  align-items: center;
  min-inline-size: 0;
  padding-block: 8px;
}

.mat-text-input__control {
  flex: 1 1 auto;
  box-sizing: border-box;
  min-inline-size: 0;
  inline-size: 100%;
  min-block-size: 24px;
  padding: 0;
  color: inherit;
  font-family: var(--mat-sys-typescale-body-large-font);
  font-size: var(--mat-sys-typescale-body-large-size);
  font-weight: var(--mat-sys-typescale-body-large-weight);
  letter-spacing: var(--mat-sys-typescale-body-large-tracking);
  line-height: var(--mat-sys-typescale-body-large-line-height);
  caret-color: var(--mat-text-input-accent-color);
  background: transparent;
  border: 0;
  outline: 0;
}

.mat-text-input--textarea .mat-text-input__container {
  align-items: flex-start;
}

.mat-text-input--textarea .mat-text-input__control {
  min-block-size: 96px;
  resize: vertical;
}

.mat-text-input__label {
  position: absolute;
  z-index: 3;
  inset-block-start: 16px;
  inset-inline-start: 0;
  max-inline-size: 100%;
  overflow: hidden;
  color: var(--mat-text-input-label-color);
  font-family: var(--mat-sys-typescale-body-large-font);
  font-size: var(--mat-sys-typescale-body-large-size);
  font-weight: var(--mat-sys-typescale-body-large-weight);
  letter-spacing: var(--mat-sys-typescale-body-large-tracking);
  line-height: var(--mat-sys-typescale-body-large-line-height);
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  transform-origin: top left;
  transition: color var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard), transform var(--mat-sys-motion-duration-medium1) var(--mat-sys-motion-easing-emphasized);
}

.mat-text-input--floating .mat-text-input__label {
  font-family: var(--mat-sys-typescale-body-small-font);
  font-size: var(--mat-sys-typescale-body-small-size);
  font-weight: var(--mat-sys-typescale-body-small-weight);
  letter-spacing: var(--mat-sys-typescale-body-small-tracking);
  line-height: var(--mat-sys-typescale-body-small-line-height);
  transform: translateY(-8px);
}

.mat-text-input--outlined:has(.mat-text-input__label) {
  padding-block-start: 8px;
}

.mat-text-input--outlined.mat-text-input--floating .mat-text-input__label {
  box-sizing: border-box;
  max-inline-size: calc(100% - 8px);
  padding-inline: 4px;
  background: var(--mat-sys-color-surface);
  transform: translateY(calc(-100% - 8px));
}

.mat-text-input--filled:has(.mat-text-input__label) .mat-text-input__control-row {
  padding-block: 24px 8px;
}

.mat-text-input__icon,
.mat-text-input__affix {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: var(--mat-text-input-label-color);
}

.mat-text-input__icon {
  box-sizing: border-box;
  align-self: stretch;
  min-inline-size: 52px;
  inline-size: 52px;
  font-size: 24px;
}

.mat-text-input__leading {
  padding-inline: 12px 16px;
}

.mat-text-input__trailing {
  padding-inline: 16px 12px;
}

.mat-text-input__main:first-child {
  margin-inline-start: 16px;
}

.mat-text-input__main:last-child {
  margin-inline-end: 16px;
}

.mat-text-input__affix {
  font: inherit;
}

.mat-text-input__supporting {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  box-sizing: border-box;
  min-inline-size: 0;
  padding-block-start: 4px;
  padding-inline: 16px;
  color: var(--mat-text-input-supporting-color);
  font-family: var(--mat-sys-typescale-body-small-font);
  font-size: var(--mat-sys-typescale-body-small-size);
  font-weight: var(--mat-sys-typescale-body-small-weight);
  letter-spacing: var(--mat-sys-typescale-body-small-tracking);
  line-height: var(--mat-sys-typescale-body-small-line-height);
}

.mat-text-input__supporting-text {
  flex: 1 1 auto;
  min-inline-size: 0;
}

.mat-text-input__counter {
  flex: 0 0 auto;
}

.mat-text-input--focused {
  --mat-text-input-label-color: var(--mat-text-input-accent-color);
}

.mat-text-input--outlined:not(.mat-text-input--focused):not(.mat-text-input--error):not(.mat-text-input--disabled):hover {
  --mat-text-input-outline-color: var(--mat-sys-color-on-surface);
}

.mat-text-input--error {
  --mat-text-input-accent-color: var(--mat-sys-color-error);
  --mat-text-input-label-color: var(--mat-sys-color-error);
  --mat-text-input-outline-color: var(--mat-sys-color-error);
  --mat-text-input-supporting-color: var(--mat-sys-color-error);
}

.mat-text-input--disabled {
  cursor: not-allowed;
  opacity: var(--mat-sys-state-disabled-content-opacity);
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-text-input__container {
    border-shape: inset(0 round var(--mat-sys-shape-corner-small));
  }

  .mat-text-input--filled .mat-text-input__container {
    border-shape: inset(0 round var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small) 0 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-text-input__container::after,
  .mat-text-input__label {
    transition-duration: 0s;
  }
}
</style>
