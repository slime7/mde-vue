<script setup>
import {
  computed,
  ref,
  useAttrs,
} from 'vue';
import MatBtn from '../mat-btn/MatBtn.vue';
import MatInputBase from '../MatInputBase.vue';

defineOptions({
  name: 'MatSearch',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控搜索文本，可使用 v-model。
   *
   * @type {string}
   * @default ''
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * 搜索输入和默认搜索按钮的无障碍名称。
   *
   * @type {string}
   * @default 'Search'
   */
  label: {
    type: String,
    default: 'Search',
  },
  /**
   * 输入框占位文本。
   *
   * @type {string}
   * @default 'Search'
   */
  placeholder: {
    type: String,
    default: 'Search',
  },
  /**
   * 使用原生禁用语义。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 使用原生只读语义。
   *
   * @type {boolean}
   * @default false
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生最大字符数。
   *
   * @type {number | undefined}
   * @default undefined
   */
  maxLength: {
    type: Number,
    default: undefined,
  },
});
const emit = defineEmits({
  /** 输入内容变化时发出新的字符串。 */
  'update:modelValue': (value) => typeof value === 'string',
  /** 提交搜索时发出当前查询字符串。 */
  search: (value) => typeof value === 'string',
});
const attrs = useAttrs();
const inputBase = ref(null);
const rootAttrs = computed(() => ({
  class: attrs.class,
  style: attrs.style,
}));
const inputAttrs = computed(() => {
  const rest = { ...attrs };

  delete rest.class;
  delete rest.style;

  return rest;
});

function submitSearch() {
  if (!props.disabled) {
    emit('search', props.modelValue);
  }
}

/**
 * 将焦点移到原生搜索输入框。
 *
 * @returns {void}
 */
function focusInput() {
  inputBase.value?.focusInput();
}

/**
 * 获取原生搜索输入框。
 *
 * @returns {HTMLInputElement | null}
 */
function getInput() {
  return inputBase.value?.getInput() ?? null;
}

defineExpose({
  focusInput,
  getInput,
});
</script>

<template>
  <form
    v-bind="rootAttrs"
    class="mat-search"
    role="search"
    @submit.prevent="submitSearch"
  >
    <span class="mat-search__leading">
      <slot name="leading">
        <MatBtn
          :disabled="props.disabled"
          icon="search"
          :label="props.label"
          size="small"
          type="button"
          variant="standard"
          @click="submitSearch"
        />
      </slot>
    </span>

    <MatInputBase
      ref="inputBase"
      v-bind="inputAttrs"
      :aria-label="props.label"
      control="input"
      :disabled="props.disabled"
      :max-length="props.maxLength"
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      type="search"
      @keydown.enter.prevent="submitSearch"
      @update:model-value="emit('update:modelValue', $event)"
    />

    <span v-if="$slots.trailing" class="mat-search__trailing">
      <slot name="trailing" />
    </span>
  </form>
</template>

<style scoped>
.mat-search {
  box-sizing: border-box;
  display: flex;
  inline-size: min(100%, 45rem);
  min-inline-size: 0;
  block-size: 56px;
  align-items: center;
  gap: var(--mat-sys-spacing-2, 8px);
  padding-inline: 4px 16px;
  color: var(--mat-sys-color-on-surface);
  background: var(--mat-sys-color-surface-container-high);
  border-radius: 28px;
  user-select: none;
}

.mat-search__leading,
.mat-search__trailing {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
}

.mat-search :deep(.mat-input-base) {
  flex-grow: 1;
  min-inline-size: 0;
  font-family: var(--mat-sys-typescale-body-large-font);
  font-size: var(--mat-sys-typescale-body-large-size);
  line-height: var(--mat-sys-typescale-body-large-line-height);
  letter-spacing: var(--mat-sys-typescale-body-large-tracking);
}

.mat-search :deep(.mat-input-base::placeholder) {
  color: var(--mat-sys-color-on-surface-variant);
  opacity: 1;
}

.mat-search:has(.mat-input-base:focus-visible) {
  outline: 3px solid var(--mat-sys-color-primary);
  outline-offset: 2px;
}

.mat-search:has(.mat-input-base:disabled) {
  opacity: .38;
}
</style>
