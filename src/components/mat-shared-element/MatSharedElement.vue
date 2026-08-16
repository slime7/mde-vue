<script setup>
import { computed, useAttrs } from 'vue';
import { activeViewTransitionNames } from '../../view-transition-state';
import { isHtmlTagName } from '../icon-props';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatSharedElement',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * View Transition 使用的共享元素名称；同一文档快照中必须保持唯一。
   *
   * @type {string}
   * @required
   */
  name: {
    type: String,
    required: true,
    validator: (value) => value.trim().length > 0,
  },
  /**
   * 实际根元素标签名。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
    validator: isHtmlTagName,
  },
  /**
   * 是否禁用共享元素动画。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const propsWithDefaults = useMatProps('sharedElement', props);
const attrs = useAttrs();
const activeName = computed(() => (
  !propsWithDefaults.disabled
  && activeViewTransitionNames.value.has(propsWithDefaults.name)
    ? propsWithDefaults.name
    : undefined
));
const rootStyle = computed(() => [
  attrs.style,
  {
    viewTransitionName: activeName.value,
  },
]);
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    v-bind="attrs"
    :style="rootStyle"
  >
    <slot />
  </component>
</template>
