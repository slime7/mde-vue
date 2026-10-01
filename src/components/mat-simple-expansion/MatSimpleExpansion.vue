<script setup>
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatSimpleExpansion',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 展开状态；true 展开内容，false 折叠内容。展开状态完全由外部驱动，
   * 组件自身不渲染触发器，也不会发出变更。
   *
   * @type {boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('simpleExpansion', props);

// update:modelValue 仅作为 v-model 契约保留，使该属性不接受 defaults 配置；
// 组件没有内部触发器，不会发出该事件。
defineEmits({
  'update:modelValue'(payload) {
    return typeof payload === 'boolean';
  },
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-simple-expansion"
    :class="{ 'mat-simple-expansion--expanded': propsWithDefaults.modelValue }"
    :aria-hidden="!propsWithDefaults.modelValue ? 'true' : undefined"
    :inert="!propsWithDefaults.modelValue ? '' : undefined"
  >
    <slot />
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-simple-expansion {
    interpolate-size: allow-keywords;
    display: block;
    min-block-size: 0;
    min-inline-size: 0;
    overflow: clip;
    overflow-clip-margin: 5px;
    block-size: 0;
    opacity: 0;
    transition: block-size var(--mat-sys-motion-spring-default-spatial), opacity var(--mat-sys-motion-spring-default-effects);
  }

  .mat-simple-expansion--expanded {
    block-size: auto;
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-simple-expansion {
      transition-duration: 0s;
    }
  }
}
</style>
