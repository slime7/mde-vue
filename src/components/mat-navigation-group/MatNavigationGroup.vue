<script setup>
import {
  computed,
  ref,
  watch,
} from 'vue';
import { toCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNavigationGroup',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控展开状态，支持 v-model:expanded 与 v-model。
   *
   * @type {boolean}
   * @default false
   */
  expanded: {
    type: Boolean,
    default: false,
  },
  /**
   * 受控展开状态（v-model 别名）。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 分组标题文本；未提供 activator 插槽时作为默认折叠触发项。
   *
   * @type {string | undefined}
   * @default undefined
   */
  title: {
    type: String,
    default: undefined,
  },
  /**
   * 二级子项的前置缩进量；数字按 px 处理，字符串按合法 CSS 长度处理。
   *
   * @type {number | string}
   * @default 16
   */
  indent: {
    type: [Number, String],
    default: 16,
  },
});
const propsWithDefaults = useMatProps('navigationGroup', props);

const emit = defineEmits({
  /**
   * 请求切换展开状态时发出新的 boolean。
   */
  'update:expanded': (value) => typeof value === 'boolean',
  /**
   * 请求切换展开状态时发出新的 boolean（v-model）。
   */
  'update:modelValue': (value) => typeof value === 'boolean',
});

const internalExpanded = ref(propsWithDefaults.modelValue ?? propsWithDefaults.expanded);

watch(
  () => propsWithDefaults.modelValue,
  (value) => {
    if (value !== undefined) {
      internalExpanded.value = value;
    }
  },
);

watch(
  () => propsWithDefaults.expanded,
  (value) => {
    if (propsWithDefaults.modelValue === undefined) {
      internalExpanded.value = value;
    }
  },
);

const isExpanded = computed(() => internalExpanded.value);

function toggle() {
  const nextValue = !isExpanded.value;
  internalExpanded.value = nextValue;
  emit('update:expanded', nextValue);
  emit('update:modelValue', nextValue);
}

const groupStyle = computed(() => {
  const indentCss = toCssLength(propsWithDefaults.indent, {
    property: 'inline-size',
    fallback: '16px',
  });

  return {
    '--mat-navigation-group-indent': indentCss,
  };
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-navigation-group"
    :class="{ 'mat-navigation-group--expanded': isExpanded }"
    :style="groupStyle"
  >
    <slot
      name="activator"
      :expanded="isExpanded"
      :toggle="toggle"
    />

    <div
      class="mat-navigation-group__content"
      :aria-hidden="!isExpanded ? 'true' : undefined"
    >
      <div class="mat-navigation-group__items">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-navigation-group {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
  }

  .mat-navigation-group__content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-group--expanded > .mat-navigation-group__content {
    grid-template-rows: 1fr;
  }

  .mat-navigation-group__items {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    overflow: hidden;
    gap: var(--mat-navigation-rail-item-space, 4px);
    padding-inline-start: var(--mat-navigation-group-indent, 16px);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-navigation-group__content {
      transition-duration: 0s;
    }
  }
}
</style>
