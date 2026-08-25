<script setup>
import {
  computed, getCurrentInstance, inject, ref, useId, watch,
} from 'vue';
import { isComponentColor } from '../button-props';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatList from '../mat-list/MatList.vue';
import MatListItem from '../mat-list/MatListItem.vue';
import MatListGroup from '../mat-list-group/MatListGroup.vue';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import { MAT_EXPANSION_KEY } from './expansion-context';

defineOptions({
  name: 'MatExpansionPanel',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 当前面板在 MatExpansion 容器中的唯一稳定值。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * 独立或单面板使用时的受控展开状态。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 触发器标题文本；未提供 activator Slot 时自动渲染为 MatListItem 标题。
   *
   * @type {string | undefined}
   * @default undefined
   */
  title: {
    type: String,
    default: undefined,
  },
  /**
   * 是否以分立列表项形态展开；为 true 时默认插槽使用 MatListItem，为 false 时在同一块卡片内展开自由内容。
   *
   * @type {boolean}
   * @default true
   */
  split: {
    type: Boolean,
    default: true,
  },
  /**
   * 语义色或六位十六进制种子色 #RRGGBB。
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
   * 是否禁用面板展开触发。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 面板根元素语义；可选值为 div、section、article、li 等。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
  },
});
const propsWithDefaults = useMatProps('expansionPanel', props);

const emit = defineEmits({
  /**
   * 面板展开或折叠状态改变时触发，载荷为布尔值。
   */
  'update:modelValue'(payload) {
    return typeof payload === 'boolean';
  },
});

const instance = getCurrentInstance();
const expansion = inject(MAT_EXPANSION_KEY, null);
const generatedId = useId().replace(/[^\w-]/g, '-');
const fallbackValue = 'expansion-panel-' + generatedId;

const effectiveValue = computed(() => {
  if (propsWithDefaults.value !== undefined) {
    return propsWithDefaults.value;
  }
  return fallbackValue;
});

const isDisabled = computed(() => (
  propsWithDefaults.disabled || Boolean(expansion?.disabled.value)
));

const effectiveColor = computed(() => (
  propsWithDefaults.color || expansion?.color.value
));

const effectiveVariant = computed(() => (
  expansion?.variant.value ?? 'segmented'
));

const panelColor = computed(() => propsWithDefaults.color || expansion?.color.value);
const { colorStyle, hasExplicitColor } = useComponentColor(panelColor);

const isStandaloneControlled = computed(() => {
  const rawProps = instance?.vnode?.props ?? {};
  return 'modelValue' in rawProps || 'model-value' in rawProps;
});

const internalExpanded = ref(Boolean(propsWithDefaults.modelValue));

watch(
  () => propsWithDefaults.modelValue,
  (val) => {
    if (val !== undefined) {
      internalExpanded.value = Boolean(val);
    }
  },
);

const isExpanded = computed(() => {
  if (expansion) {
    return expansion.isExpanded(effectiveValue.value);
  }
  return isStandaloneControlled.value
    ? Boolean(propsWithDefaults.modelValue)
    : internalExpanded.value;
});

const standaloneExpandedArray = computed(() => (
  isExpanded.value ? [effectiveValue.value] : []
));

/**
 * @param {Array<string | number | boolean>} newExpanded
 */
function handleStandaloneExpandedUpdate(newExpanded) {
  const isExp = newExpanded.includes(effectiveValue.value);
  if (!isStandaloneControlled.value) {
    internalExpanded.value = isExp;
  }
  emit('update:modelValue', isExp);
}
</script>

<template>
  <!-- 若处于 MatExpansion 内，直接渲染 MatListGroup 保证属于同一 MatList -->
  <MatListGroup
    v-if="expansion"
    v-bind="$attrs"
    :value="effectiveValue"
    :as="propsWithDefaults.as"
    class="mat-expansion-panel"
    :class="[
      propsWithDefaults.split ? 'mat-expansion-panel--split' : 'mat-expansion-panel--unsplit',
      {
        'mat-expansion-panel--expanded': isExpanded,
        'mat-expansion-panel--explicit-color': hasExplicitColor,
      },
    ]"
    :style="colorStyle"
  >
    <template #activator="{ expanded }">
      <slot
        name="activator"
        :expanded="expanded"
      >
        <MatListItem :disabled="isDisabled">
          {{ propsWithDefaults.title }}
          <template #trailing>
            <MatIcon
              icon="expand_more"
              class="mat-expansion-panel__indicator"
              :class="{ 'mat-expansion-panel__indicator--expanded': expanded }"
            />
          </template>
        </MatListItem>
      </slot>
    </template>

    <div
      v-if="!propsWithDefaults.split"
      class="mat-expansion-panel__body"
    >
      <slot />
    </div>
    <slot v-else />
  </MatListGroup>

  <!-- 若独立使用，外层包裹 MatList 维持 ListGroup 语义与单项首尾 16px 圆角 -->
  <MatList
    v-else
    :variant="effectiveVariant"
    :color="effectiveColor"
    :expanded="standaloneExpandedArray"
    @update:expanded="handleStandaloneExpandedUpdate"
  >
    <MatListGroup
      v-bind="$attrs"
      :value="effectiveValue"
      class="mat-expansion-panel"
      :class="[
        propsWithDefaults.split ? 'mat-expansion-panel--split' : 'mat-expansion-panel--unsplit',
        {
          'mat-expansion-panel--expanded': isExpanded,
          'mat-expansion-panel--explicit-color': hasExplicitColor,
        },
      ]"
      :style="colorStyle"
    >
      <template #activator="{ expanded }">
        <slot
          name="activator"
          :expanded="expanded"
        >
          <MatListItem :disabled="isDisabled">
            {{ propsWithDefaults.title }}
            <template #trailing>
              <MatIcon
                icon="expand_more"
                class="mat-expansion-panel__indicator"
                :class="{ 'mat-expansion-panel__indicator--expanded': expanded }"
              />
            </template>
          </MatListItem>
        </slot>
      </template>

      <div
        v-if="!propsWithDefaults.split"
        class="mat-expansion-panel__body"
      >
        <slot />
      </div>
      <slot v-else />
    </MatListGroup>
  </MatList>
</template>

<style scoped>
@layer mde.components {
  .mat-expansion-panel {
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    min-inline-size: 0;
  }

  .mat-expansion-panel--explicit-color {
    --mat-list-item-container-color: var(--mat-accent-container-color);
    --mat-list-item-label-color: var(--mat-on-accent-container-color);
    --mat-list-item-supporting-color: var(--mat-on-accent-container-color);
    --mat-list-item-state-layer-color: var(--mat-on-accent-container-color);
    --mat-list-item-label-text-color: var(--mat-on-accent-container-color);
    --mat-list-item-supporting-text-color: var(--mat-on-accent-container-color);
  }

  .mat-expansion-panel--unsplit {
    --mat-list-group-gap: 0 !important;
    background: var(--mat-list-item-container-color);
    border-start-start-radius: var(--mat-list-group-start-start-shape);
    border-start-end-radius: var(--mat-list-group-start-end-shape);
    border-end-start-radius: var(--mat-list-group-end-start-shape);
    border-end-end-radius: var(--mat-list-group-end-end-shape);
    overflow: clip;
    overflow-clip-margin: 5px;
    transition: border-radius var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-expansion-panel--unsplit > :deep(.mat-list-item.mat-list-item--group-activator) {
    background: transparent !important;
    border-start-start-radius: inherit;
    border-start-end-radius: inherit;
    border-end-start-radius: inherit;
    border-end-end-radius: inherit;
  }

  .mat-expansion-panel--unsplit.mat-list-group--expanded > :deep(.mat-list-item.mat-list-item--group-activator) {
    border-end-start-radius: 0 !important;
    border-end-end-radius: 0 !important;
  }

  .mat-expansion-panel__body {
    box-sizing: border-box;
    padding: 16px;
    color: var(--mat-list-item-label-color, var(--mat-sys-color-on-surface));
  }

  .mat-expansion-panel__indicator {
    transition: transform var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-expansion-panel__indicator--expanded {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-expansion-panel__indicator {
      transition-duration: 0s;
    }
  }
}
</style>
