<script setup>
import {
  computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, useId, watch,
} from 'vue';
import MatInputBase from './MatInputBase.vue';
import useComponentColor from './use-component-color';

defineOptions({
  name: 'MatTextInputBase',
  inheritAttrs: false,
});

const props = defineProps({
  control: {
    type: String,
    required: true,
    validator(value) {
      return ['custom', 'input', 'textarea'].includes(value);
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
  resizeMinRows: {
    type: Number,
    default: 1,
  },
  autoGrow: {
    type: Boolean,
    default: false,
  },
  maxRows: {
    type: Number,
    default: undefined,
  },
  noResize: {
    type: Boolean,
    default: false,
  },
  customFocused: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits({
  'update:modelValue': (payload) => typeof payload === 'string',
});
const attrs = useAttrs();
const focused = ref(false);
const inputValue = ref(props.modelValue);
const controlElement = ref();
const generatedId = useId();
const supportingId = `${generatedId}-supporting`;
const controlId = computed(() => attrs.id || generatedId);
const { colorStyle } = useComponentColor(computed(() => props.color));
const hasPlaceholder = computed(() => Boolean(attrs.placeholder));
const effectiveFocused = computed(() => (
  props.control === 'custom' ? props.customFocused : focused.value
));
const isFloating = computed(() => (
  effectiveFocused.value || inputValue.value.length > 0 || hasPlaceholder.value
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
const NON_NATIVE_ATTRIBUTES = new Set([
  'aria-describedby',
  'aria-hidden',
  'block',
  'class',
  'inert',
  'style',
]);
const nativeAttrs = computed(() => Object.fromEntries(
  Object.entries(attrs).filter(([name]) => !NON_NATIVE_ATTRIBUTES.has(name)),
));
let resizeObserver;
let observedInlineSize;

/**
 * @param {string} value
 * @returns {number}
 */
function parseCssLength(value) {
  return Number.parseFloat(value) || 0;
}

function syncTextareaSize() {
  const textarea = controlElement.value?.getInput();

  if (!(textarea instanceof HTMLTextAreaElement)) {
    return;
  }

  textarea.style.resize = props.noResize ? 'none' : '';

  const styles = getComputedStyle(textarea);
  const lineHeight = parseCssLength(styles.lineHeight) || 24;
  const paddingBlock = parseCssLength(styles.paddingBlockStart || styles.paddingTop)
    + parseCssLength(styles.paddingBlockEnd || styles.paddingBottom);

  textarea.style.minBlockSize = `${props.resizeMinRows * lineHeight + paddingBlock}px`;

  if (!props.autoGrow) {
    textarea.style.blockSize = '';
    textarea.style.height = '';
    textarea.style.overflowY = '';
    return;
  }

  const minimumRows = props.rows ?? 1;
  const maximumRows = props.maxRows === undefined
    ? Number.POSITIVE_INFINITY
    : Math.max(minimumRows, props.maxRows);
  const minimumBlockSize = minimumRows * lineHeight + paddingBlock;
  const maximumBlockSize = maximumRows * lineHeight + paddingBlock;

  textarea.style.blockSize = 'auto';
  textarea.style.height = '';

  const contentBlockSize = textarea.scrollHeight;
  const blockSize = Math.max(
    minimumBlockSize,
    Math.min(contentBlockSize, maximumBlockSize),
  );

  textarea.style.blockSize = `${blockSize}px`;
  textarea.style.overflowY = 'auto';
}

function scheduleTextareaSize() {
  nextTick(syncTextareaSize);
}

/**
 * @param {ResizeObserverEntry[]} entries
 */
function handleTextareaResize(entries) {
  const inlineSize = entries[0]?.contentRect.width;

  if (inlineSize === observedInlineSize) {
    return;
  }

  observedInlineSize = inlineSize;
  scheduleTextareaSize();
}

watch(() => props.modelValue, (value) => {
  inputValue.value = value;
  scheduleTextareaSize();
});
watch(
  () => [
    props.autoGrow,
    props.label,
    props.maxRows,
    props.noResize,
    props.resizeMinRows,
    props.rows,
  ],
  scheduleTextareaSize,
);

onMounted(() => {
  syncTextareaSize();

  if (props.control === 'custom' || typeof globalThis.ResizeObserver !== 'function') {
    return;
  }

  resizeObserver = new globalThis.ResizeObserver(handleTextareaResize);
  resizeObserver.observe(controlElement.value.getInput());
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});

function focusControl() {
  if (props.control === 'custom') {
    return;
  }

  controlElement.value?.focusInput();
}

/**
 * @param {string} value
 */
function handleModelValue(value) {
  inputValue.value = value;
  emit('update:modelValue', value);
  scheduleTextareaSize();
}
</script>

<template>
  <div
    class="mat-text-input mat-sys-typescale-body-large"
    :class="[
      $attrs.class,
      `mat-text-input--${variant}`,
      `mat-text-input--${control}`,
      {
        'mat-text-input--floating': isFloating,
        'mat-text-input--focused': effectiveFocused,
        'mat-text-input--error': error,
        'mat-text-input--disabled': disabled,
      },
    ]"
    :style="rootStyle"
    :inert="$attrs.inert"
    :aria-hidden="$attrs['aria-hidden']"
  >
    <div class="mat-text-input__container">
      <fieldset
        v-if="variant === 'outlined'"
        class="mat-text-input__outline"
        aria-hidden="true"
      >
        <legend
          v-if="isFloating && label"
          class="mat-text-input__outline-label mat-sys-typescale-body-small"
        >
          {{ label }}<span v-if="required"> *</span>
        </legend>
      </fieldset>

      <span
        v-if="variant === 'filled'"
        class="mat-text-input__indicator"
        aria-hidden="true"
      />

      <span
        v-if="$slots.leading"
        class="mat-text-input__icon mat-text-input__leading"
      >
        <slot name="leading" />
      </span>

      <component
        :is="control === 'custom' ? 'div' : 'label'"
        class="mat-text-input__main"
        :for="control === 'custom' ? undefined : controlId"
        @click="focusControl"
      >
        <span
          v-if="label"
          :class="[
            'mat-text-input__label',
            isFloating
              ? 'mat-sys-typescale-body-small'
              : 'mat-sys-typescale-body-large',
          ]"
        >
          {{ label }}<span v-if="required" aria-hidden="true"> *</span>
        </span>

        <span class="mat-text-input__control-row">
          <span v-if="prefixText" class="mat-text-input__affix mat-text-input__prefix">
            {{ prefixText }}
          </span>

          <slot
            v-if="control === 'custom'"
            name="control"
            :control-id="controlId"
            :described-by="describedBy"
          />

          <MatInputBase
            v-else
            ref="controlElement"
            v-bind="nativeAttrs"
            class="mat-text-input__control"
            :aria-describedby="describedBy"
            :aria-invalid="error ? 'true' : undefined"
            :disabled="disabled"
            :id="controlId"
            :max-length="maxLength"
            :readonly="readonly"
            :required="required"
            :rows="control === 'textarea' ? rows : undefined"
            :type="control === 'input' ? type : undefined"
            :control="control"
            :model-value="modelValue"
            @blur="focused = false"
            @focus="focused = true"
            @update:model-value="handleModelValue"
          />

          <span v-if="suffixText" class="mat-text-input__affix mat-text-input__suffix">
            {{ suffixText }}
          </span>
        </span>
      </component>

      <span
        v-if="$slots.trailing"
        class="mat-text-input__icon mat-text-input__trailing"
      >
        <slot name="trailing" />
      </span>
    </div>

    <span
      v-if="hasSupporting"
      :id="supportingId"
      class="mat-text-input__supporting mat-sys-typescale-body-small"
    >
      <span class="mat-text-input__supporting-text">
        {{ visibleSupportingText }}
      </span>
      <span v-if="maxLength !== undefined" class="mat-text-input__counter">
        {{ modelValue.length }} / {{ maxLength }}
      </span>
    </span>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-text-input {
    --mat-text-input-accent-color: var(--mat-accent-color, var(--mat-sys-color-primary));
    --mat-text-input-container-color: var(--mat-sys-color-surface-container-highest);
    --mat-text-input-content-color: var(--mat-sys-color-on-surface);
    --mat-text-input-label-color: var(--mat-sys-color-on-surface-variant);
    --mat-text-input-outline-color: var(--mat-sys-color-outline);
    --mat-text-input-supporting-color: var(--mat-sys-color-on-surface-variant);
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    inline-size: 100%;
    color: var(--mat-text-input-content-color);
    user-select: none;
  }

  .mat-text-input--input,
  .mat-text-input--textarea {
    cursor: text;
  }

  .mat-text-input__container {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-block-size: var(--mat-text-input-container-height);
    inline-size: 100%;
    background: transparent;
    border-radius: var(--mat-sys-shape-corner-small);
  }

  .mat-text-input__outline {
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    min-inline-size: 0;
    margin: 0;
    padding: 0 12px;
    border: 1px solid var(--mat-text-input-outline-color);
    border-radius: inherit;
    pointer-events: none;
    transition: border-color var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-text-input__outline:has(.mat-text-input__outline-label) {
    inset-block-start: -8px;
  }

  .mat-text-input__container:has(.mat-text-input__leading) .mat-text-input__outline {
    padding-inline-start: 48px;
  }

  .mat-text-input__outline-label {
    box-sizing: border-box;
    max-inline-size: calc(100% - 8px);
    padding-inline: 4px;
    overflow: hidden;
    color: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mat-text-input--focused .mat-text-input__outline {
    border-width: 2px;
    border-color: var(--mat-text-input-accent-color);
  }

  .mat-text-input--filled .mat-text-input__container {
    overflow: clip;
    background: var(--mat-text-input-container-color);
    border-radius: var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small) 0 0;
    box-shadow: inset 0 -1px 0 var(--mat-text-input-outline-color);
  }

  .mat-text-input__indicator {
    position: absolute;
    z-index: 2;
    inset: auto 0 0;
    block-size: 2px;
    background: var(--mat-text-input-accent-color);
    pointer-events: none;
    transform: scaleX(0);
    transition: transform var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-text-input--filled.mat-text-input--focused .mat-text-input__indicator {
    transform: scaleX(1);
  }

  .mat-text-input__main {
    position: relative;
    z-index: 1;
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
    flex: 1 1 0;
    max-inline-size: 100%;
    min-block-size: 24px;
    caret-color: var(--mat-text-input-accent-color);
  }

  .mat-text-input--textarea .mat-text-input__container {
    align-items: flex-start;
  }

  .mat-text-input--textarea .mat-text-input__control-row {
    align-items: flex-start;
    padding-block: 0;
  }

  .mat-text-input--textarea .mat-text-input__control {
    --mat-text-input-textarea-padding-block-start: 8px;
    --mat-text-input-textarea-scrollbar-space: 16px;
    min-block-size: 0;
    padding-block: var(--mat-text-input-textarea-padding-block-start) 8px;
    scrollbar-width: thin;
    scrollbar-color: var(--mat-sys-color-outline) transparent;
    mask-image: linear-gradient(to bottom, transparent 0 calc(var(--mat-text-input-textarea-padding-block-start) - 6px), black calc(var(--mat-text-input-textarea-padding-block-start) + 4px) 100%), linear-gradient(to right, transparent 0 calc(100% - var(--mat-text-input-textarea-scrollbar-space)), black calc(100% - var(--mat-text-input-textarea-scrollbar-space)) 100%);
    resize: vertical;
  }

  .mat-text-input--textarea:has(.mat-text-input__label) .mat-text-input__control {
    --mat-text-input-textarea-padding-block-start: 24px;
  }

  .mat-text-input--textarea .mat-text-input__control::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .mat-text-input--textarea .mat-text-input__control::-webkit-scrollbar-track,
  .mat-text-input--textarea .mat-text-input__control::-webkit-scrollbar-corner {
    background: transparent;
  }

  .mat-text-input--textarea .mat-text-input__control::-webkit-scrollbar-thumb {
    background: var(--mat-sys-color-outline);
    border-radius: var(--mat-sys-shape-corner-full);
  }

  .mat-text-input--textarea .mat-text-input__container:not(:has(.mat-text-input__leading)) .mat-text-input__main {
    margin-inline-start: 0;
  }

  .mat-text-input--textarea .mat-text-input__container:not(:has(.mat-text-input__trailing)) .mat-text-input__main {
    margin-inline-end: 0;
  }

  .mat-text-input--textarea .mat-text-input__container:not(:has(.mat-text-input__leading)) .mat-text-input__control {
    padding-inline-start: 16px;
  }

  .mat-text-input--textarea .mat-text-input__container:not(:has(.mat-text-input__trailing)) .mat-text-input__control {
    padding-inline-end: 16px;
  }

  .mat-text-input--textarea .mat-text-input__label {
    max-inline-size: calc(100% - 32px);
  }

  .mat-text-input--textarea .mat-text-input__container:not(:has(.mat-text-input__leading)) .mat-text-input__label {
    inset-inline-start: 16px;
  }

  .mat-text-input__label {
    position: absolute;
    z-index: 3;
    inset-block-start: 16px;
    inset-inline-start: 0;
    max-inline-size: 100%;
    overflow: hidden;
    color: var(--mat-text-input-label-color);
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    transform-origin: top left;
    transition: color var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-text-input--floating .mat-text-input__label {
    transform: translateY(-8px);
  }

  .mat-text-input--outlined:has(.mat-text-input__label) {
    padding-block-start: 8px;
  }

  .mat-text-input--outlined.mat-text-input--floating .mat-text-input__label {
    max-inline-size: calc(100% - 8px);
    transform: translateY(calc(-100% - 8px));
  }

  .mat-text-input--filled:not(.mat-text-input--textarea):has(.mat-text-input__label) .mat-text-input__control-row {
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
    z-index: 1;
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

  .mat-text-input__container:not(:has(.mat-text-input__leading)) .mat-text-input__main {
    margin-inline-start: 16px;
  }

  .mat-text-input__container:not(:has(.mat-text-input__trailing)) .mat-text-input__main {
    margin-inline-end: 16px;
  }

  .mat-text-input__affix {
    visibility: hidden;
    font: inherit;
    opacity: 0;
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-text-input--floating .mat-text-input__affix,
  .mat-text-input:not(:has(.mat-text-input__label)) .mat-text-input__affix {
    visibility: visible;
    opacity: 1;
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
  }

  .mat-text-input__supporting-text {
    flex: 1 1 auto;
    min-inline-size: 0;
    overflow-wrap: anywhere;
  }

  .mat-text-input__counter {
    flex: 0 0 auto;
    white-space: nowrap;
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

  @media (prefers-reduced-motion: reduce) {
    .mat-text-input__affix,
    .mat-text-input__indicator,
    .mat-text-input__label {
      transition-duration: 0s;
    }
  }
}
</style>
