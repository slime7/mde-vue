<script setup>
import { computed } from 'vue';
import { isHtmlTagName } from '../icon-props';
import {
  getTypographyClass,
  isTypographySize,
  isTypographyType,
} from '../typography';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatText',
});

const props = defineProps({
  /**
   * Material 3 文字类型。
   *
   * @type {'display' | 'headline' | 'title' | 'body' | 'label'}
   * @default 'body'
   */
  type: {
    type: String,
    default: 'body',
    validator: isTypographyType,
  },
  /**
   * Material 3 文字尺寸。
   *
   * @type {'large' | 'medium' | 'small' | 'L' | 'M' | 'S'}
   * @default 'medium'
   */
  size: {
    type: String,
    default: 'medium',
    validator: isTypographySize,
  },
  /**
   * 使用同类型同尺寸的 emphasized 排版样式。
   *
   * @type {boolean}
   * @default false
   */
  emphasized: {
    type: Boolean,
    default: false,
  },
  /**
   * 实际根元素标签名。
   *
   * @type {string}
   * @default 'span'
   */
  as: {
    type: String,
    default: 'span',
    validator: isHtmlTagName,
  },
});
const propsWithDefaults = useMatProps('text', props);

const typographyClass = computed(() => getTypographyClass(
  propsWithDefaults.type,
  propsWithDefaults.size,
  propsWithDefaults.emphasized,
));
</script>

<template>
  <component :is="propsWithDefaults.as" :class="typographyClass">
    <slot />
  </component>
</template>
