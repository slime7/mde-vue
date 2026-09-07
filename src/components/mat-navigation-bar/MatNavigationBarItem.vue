<script setup>
import MatNavigationItem from '../mat-navigation-item/MatNavigationItem.vue';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNavigationBarItem',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 当前导航目的地的稳定值。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * Material Symbols 图标文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * 附着到图标区域的 Badge 配置。
   *
   * @type {{ content?: string | number, dot?: boolean, location?: 'top-start' | 'top' | 'top-end' | 'end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'start', color?: string } | undefined}
   * @default undefined
   */
  badge: {
    type: Object,
    default: undefined,
  },
  /**
   * 设置后渲染原生链接。
   *
   * @type {string | undefined}
   * @default undefined
   */
  href: {
    type: String,
    default: undefined,
  },
  /**
   * 禁止导航交互。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('navigationBarItem', props);

const emit = defineEmits({
  /**
   * 启用的导航项被用户激活时转发原生点击事件，载荷为 MouseEvent。
   */
  click: (payload) => payload instanceof MouseEvent,
});
</script>

<template>
  <MatNavigationItem
    v-bind="{ ...$attrs, ...propsWithDefaults }"
    component-name="MatNavigationBarItem"
    @click="emit('click', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </MatNavigationItem>
</template>
