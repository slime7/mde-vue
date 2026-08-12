<script setup>
import {
  computed, nextTick, ref, useAttrs, useId, watch,
} from 'vue';
import MatTextInputBase from '../MatTextInputBase.vue';
import { isComponentColor } from '../button-props';
import MatCheckbox from '../mat-checkbox/MatCheckbox.vue';
import MatChip from '../mat-chip/MatChip.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatMenu from '../mat-menu/MatMenu.vue';
import MatMenuItem from '../mat-menu/MatMenuItem.vue';
import MatMenuGroup from '../mat-menu-group/MatMenuGroup.vue';
import { isSelectionValue } from '../selection-control';
import { TEXT_INPUT_VARIANTS } from '../text-input-props';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatSelect',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 单选使用基础值或 null，多选使用基础值数组。
   *
   * @type {string | number | boolean | Array<string | number | boolean> | null}
   * @default null
   */
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: null,
    validator(value) {
      return value === null
        || isSelectionValue(value)
        || (Array.isArray(value) && value.every(isSelectionValue));
    },
  },
  /**
   * 选项、字符串选项或 `{ group, items }` 分组数组。
   *
   * @type {Array}
   * @required
   */
  items: {
    type: Array,
    required: true,
  },
  /** @type {boolean} @default false */
  multiple: { type: Boolean, default: false },
  /** @type {boolean} @default false */
  chips: { type: Boolean, default: false },
  /** @type {string} @default 'title' */
  itemTitle: { type: String, default: 'title' },
  /** @type {string} @default 'value' */
  itemValue: { type: String, default: 'value' },
  /** @type {string} @default 'subtitle' */
  itemSubtitle: { type: String, default: 'subtitle' },
  /** @type {string | undefined} @default undefined */
  label: { type: String, default: undefined },
  /** @type {'outlined' | 'filled'} @default 'outlined' */
  variant: {
    type: String,
    default: 'outlined',
    validator: (value) => TEXT_INPUT_VARIANTS.includes(value),
  },
  /** @type {string | undefined} @default undefined */
  color: { type: String, default: undefined, validator: isComponentColor },
  /** @type {string | undefined} @default undefined */
  supportingText: { type: String, default: undefined },
  /** @type {string | undefined} @default undefined */
  errorText: { type: String, default: undefined },
  /** @type {boolean} @default false */
  disabled: { type: Boolean, default: false },
  /** @type {boolean} @default false */
  readonly: { type: Boolean, default: false },
  /** @type {boolean} @default false */
  required: { type: Boolean, default: false },
  /** @type {boolean} @default false */
  error: { type: Boolean, default: false },
  /** @type {string | undefined} @default undefined */
  placeholder: { type: String, default: undefined },
});
const propsWithDefaults = useMatProps('select', props);
const emit = defineEmits({
  'update:modelValue': (value) => value === null
    || isSelectionValue(value)
    || (Array.isArray(value) && value.every(isSelectionValue)),
  change: (value) => value === null
    || isSelectionValue(value)
    || (Array.isArray(value) && value.every(isSelectionValue)),
});
const attrs = useAttrs();
const open = ref(false);
const focused = ref(false);
const trigger = ref(null);
const generatedId = useId().replace(/[^\w-]/g, '-');
const triggerId = computed(() => attrs.id ?? `${generatedId}-select`);
const nativeAttributes = computed(() => ({
  form: attrs.form,
  name: attrs.name,
}));

function warn(message) {
  if (import.meta.env.DEV) {
    console.warn(`MatSelect: ${message}`);
  }
}

function normalizeOption(item, group) {
  if (typeof item === 'string') {
    return {
      disabled: false, group, subtitle: undefined, title: item, value: item,
    };
  }

  if (!item || typeof item !== 'object' || Array.isArray(item) || 'items' in item) {
    warn('忽略无效选项或嵌套分组');
    return null;
  }

  const title = item[propsWithDefaults.itemTitle];
  const value = item[propsWithDefaults.itemValue];
  const subtitle = item[propsWithDefaults.itemSubtitle];

  if (typeof title !== 'string' || !isSelectionValue(value)) {
    warn('对象选项必须提供字符串 title 和基础类型 value');
    return null;
  }

  return {
    disabled: item.disabled === true,
    group,
    subtitle: subtitle === undefined ? undefined : String(subtitle),
    title,
    value,
  };
}

const normalized = computed(() => {
  const options = [];
  const groups = [];
  const values = [];
  const stringValues = new Set();

  function append(item, group) {
    const option = normalizeOption(item, group);

    if (!option) {
      return;
    }

    if (values.some((value) => Object.is(value, option.value))
      || stringValues.has(String(option.value))) {
      warn(`忽略重复或字符串化冲突的值 ${String(option.value)}`);
      return;
    }

    values.push(option.value);
    stringValues.add(String(option.value));
    options.push(option);
  }

  propsWithDefaults.items.forEach((item) => {
    if (item && typeof item === 'object' && !Array.isArray(item) && 'items' in item) {
      if (typeof item.group !== 'string' || !Array.isArray(item.items)) {
        warn('分组必须提供字符串 group 和 items 数组');
        return;
      }

      const start = options.length;

      item.items.forEach((child) => append(child, item.group));

      if (options.length > start) {
        groups.push({ label: item.group, options: options.slice(start) });
      }
      return;
    }

    append(item, undefined);
  });

  return {
    groups,
    options,
    ungrouped: options.filter((option) => option.group === undefined),
  };
});
const selectedOptions = computed(() => normalized.value.options.filter((option) => (
  propsWithDefaults.multiple
    ? Array.isArray(propsWithDefaults.modelValue)
      && propsWithDefaults.modelValue.some((value) => Object.is(value, option.value))
    : Object.is(propsWithDefaults.modelValue, option.value)
)));
const displayValue = computed(() => selectedOptions.value.map((option) => option.title).join(','));
const hasValue = computed(() => selectedOptions.value.length > 0);
const menuId = `${generatedId}-menu`;

watch(
  () => [propsWithDefaults.modelValue, propsWithDefaults.multiple],
  ([value, multiple]) => {
    if ((multiple && !Array.isArray(value)) || (!multiple && Array.isArray(value))) {
      warn('modelValue 必须与 multiple 模式匹配');
    }
  },
  { immediate: true },
);

function isSelected(value) {
  return selectedOptions.value.some((option) => Object.is(option.value, value));
}

function requestValue(value) {
  if (propsWithDefaults.disabled || propsWithDefaults.readonly) {
    return;
  }

  let nextValue;

  if (propsWithDefaults.multiple) {
    const current = Array.isArray(propsWithDefaults.modelValue)
      ? propsWithDefaults.modelValue
      : [];

    nextValue = current.some((item) => Object.is(item, value))
      ? current.filter((item) => !Object.is(item, value))
      : [...current, value];
  } else {
    nextValue = value;
    open.value = false;
  }

  emit('update:modelValue', nextValue);
  emit('change', nextValue);
}

function toggleMenu() {
  if (propsWithDefaults.disabled || propsWithDefaults.readonly) {
    return;
  }

  open.value = !open.value;
}

function handleKeydown(event) {
  if (!['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
    return;
  }

  event.preventDefault();

  if (!open.value) {
    toggleMenu();
  }
}

function removeValue(value) {
  requestValue(value);
  nextTick(() => trigger.value?.focus());
}
</script>

<template>
  <div class="mat-select" :class="$attrs.class" :style="$attrs.style">
    <MatTextInputBase
      :id="triggerId"
      control="custom"
      :model-value="displayValue"
      :label="propsWithDefaults.label"
      :variant="propsWithDefaults.variant"
      :color="propsWithDefaults.color"
      :supporting-text="propsWithDefaults.supportingText"
      :error-text="propsWithDefaults.errorText"
      :disabled="propsWithDefaults.disabled"
      :readonly="propsWithDefaults.readonly"
      :required="propsWithDefaults.required"
      :error="propsWithDefaults.error"
      :custom-focused="focused || open"
      :placeholder="propsWithDefaults.placeholder"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>

      <template #control="{ controlId, describedBy }">
        <div
          :id="controlId"
          ref="trigger"
          class="mat-select__trigger mat-text-input__control"
          role="combobox"
          :aria-controls="menuId"
          :aria-describedby="describedBy"
          :aria-label="$attrs['aria-label'] ?? propsWithDefaults.label"
          :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
          :aria-expanded="String(open)"
          :aria-invalid="propsWithDefaults.error ? 'true' : undefined"
          aria-haspopup="menu"
          :aria-readonly="propsWithDefaults.readonly ? 'true' : undefined"
          :tabindex="propsWithDefaults.disabled ? -1 : 0"
          @blur="focused = false"
          @click="toggleMenu"
          @focus="focused = true"
          @keydown="handleKeydown"
        >
          <span v-if="propsWithDefaults.chips && hasValue" class="mat-select__chips">
            <MatChip
              v-for="option in selectedOptions"
              :key="`${typeof option.value}:${String(option.value)}`"
              variant="input"
              :disabled="propsWithDefaults.disabled || propsWithDefaults.readonly"
              @click.stop
              @remove="removeValue(option.value)"
            >
              {{ option.title }}
            </MatChip>
          </span>

          <span v-else-if="hasValue" class="mat-select__value">{{ displayValue }}</span>
          <span v-else class="mat-select__placeholder">{{ propsWithDefaults.placeholder }}</span>

          <span class="mat-select__spacer" />

          <MatIcon
            as="span"
            icon="arrow_drop_down"
            :optical-size="24"
            size="24px"
            aria-hidden="true"
          />
        </div>
      </template>

      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </MatTextInputBase>

    <select
      v-bind="nativeAttributes"
      class="mat-select__native"
      :disabled="propsWithDefaults.disabled"
      :multiple="propsWithDefaults.multiple"
      :required="propsWithDefaults.required"
      tabindex="-1"
      aria-hidden="true"
    >
      <option v-if="!propsWithDefaults.multiple" value="" :selected="!hasValue" />
      <option
        v-for="option in normalized.options"
        :key="`${typeof option.value}:${String(option.value)}`"
        :disabled="option.disabled"
        :selected="isSelected(option.value)"
        :value="String(option.value)"
      >
        {{ option.title }}
      </option>
    </select>

    <MatMenu
      :id="menuId"
      v-model="open"
      :anchor="triggerId"
      :close-on-click="!propsWithDefaults.multiple"
    >
      <template v-if="normalized.groups.length === 0">
        <MatMenuItem
          v-for="option in normalized.ungrouped"
          :key="`${typeof option.value}:${String(option.value)}`"
          :disabled="option.disabled"
          @click="requestValue(option.value)"
        >
          <template v-if="propsWithDefaults.multiple" #leading>
            <MatCheckbox
              aria-hidden="true"
              inert
              tabindex="-1"
              :model-value="isSelected(option.value)"
            />
          </template>
          {{ option.title }}
          <template v-if="option.subtitle" #supporting>
            {{ option.subtitle }}
          </template>
        </MatMenuItem>
      </template>

      <MatMenuGroup v-else-if="normalized.ungrouped.length > 0">
        <MatMenuItem
          v-for="option in normalized.ungrouped"
          :key="`${typeof option.value}:${String(option.value)}`"
          :disabled="option.disabled"
          @click="requestValue(option.value)"
        >
          <template v-if="propsWithDefaults.multiple" #leading>
            <MatCheckbox
              aria-hidden="true"
              inert
              tabindex="-1"
              :model-value="isSelected(option.value)"
            />
          </template>
          {{ option.title }}
          <template v-if="option.subtitle" #supporting>
            {{ option.subtitle }}
          </template>
        </MatMenuItem>
      </MatMenuGroup>

      <MatMenuGroup
        v-for="group in normalized.groups"
        :key="group.label"
        :label="group.label"
      >
        <MatMenuItem
          v-for="option in group.options"
          :key="`${typeof option.value}:${String(option.value)}`"
          :disabled="option.disabled"
          @click="requestValue(option.value)"
        >
          <template v-if="propsWithDefaults.multiple" #leading>
            <MatCheckbox
              aria-hidden="true"
              inert
              tabindex="-1"
              :model-value="isSelected(option.value)"
            />
          </template>
          {{ option.title }}
          <template v-if="option.subtitle" #supporting>
            {{ option.subtitle }}
          </template>
        </MatMenuItem>
      </MatMenuGroup>
    </MatMenu>
  </div>
</template>

<style scoped>
.mat-select {
  position: relative;
  min-inline-size: 0;
  inline-size: 100%;
}

.mat-select__trigger {
  display: flex;
  flex-grow: 1;
  gap: 4px;
  align-items: center;
  min-inline-size: 0;
  min-block-size: 24px;
  padding: 0;
  color: inherit;
  font: inherit;
  text-align: start;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.mat-select__trigger[aria-disabled='true'] { cursor: default; }

.mat-select__value,
.mat-select__placeholder {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-select__placeholder { color: var(--mat-sys-color-on-surface-variant); }

.mat-select__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-inline-size: 0;
  padding-block: 4px;
}

.mat-select__spacer { flex-grow: 1; }

.mat-select__trigger > :last-child { flex-shrink: 0; }

.mat-select__native {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip-path: inset(50%);
}
</style>
