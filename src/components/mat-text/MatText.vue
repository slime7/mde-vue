<script setup>
import { computed } from 'vue';
import { isHtmlTagName } from '../icon-props';
import {
  getTypographyClass,
  isTypographySize,
  isTypographyType,
} from '../typography';

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
   * @type {'large' | 'medium' | 'small'}
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

const typographyClass = computed(() => getTypographyClass(
  props.type,
  props.size,
  props.emphasized,
));
</script>

<template>
  <component :is="as" :class="typographyClass">
    <slot />
  </component>
</template>
