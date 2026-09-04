<script setup>
import MatNavigationRail from '../mat-navigation-rail/MatNavigationRail.vue';
import { computed, getCurrentInstance } from 'vue';
import { isValidCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNavigationDrawer',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控当前目的地值。
   *
   * @type {string | number | boolean | null}
   * @default null
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  /**
   * 是否展开 Navigation Drawer。
   *
   * @type {boolean}
   * @default false
   */
  expanded: {
    type: Boolean,
    default: false,
  },
  /**
   * expanded Drawer 的宽度；数字与纯数字字符串按 px 处理，
   * 其他字符串 trim 后须为合法 CSS 宽度值，非法时使用默认宽度。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  width: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, { property: 'inline-size' }),
  },
  /**
   * 纵向 Drawer 布局；可选值为 standard、modal。
   *
   * @type {'standard' | 'modal'}
   * @default 'standard'
   */
  layout: {
    type: String,
    default: 'standard',
    validator(value) {
      return ['standard', 'modal'].includes(value);
    },
  },
  /**
   * 默认 Slot 在主轴上的对齐方式；可选值为 start、center、end。
   *
   * @type {'start' | 'center' | 'end'}
   * @default 'start'
   */
  alignment: {
    type: String,
    default: 'start',
    validator(value) {
      return ['start', 'center', 'end'].includes(value);
    },
  },
  /**
   * 是否 Teleport 到 attach 并固定到视口。
   *
   * @type {boolean}
   * @default false
   */
  app: {
    type: Boolean,
    default: false,
  },
  /**
   * app=true 时的固定挂载目标。
   *
   * @type {string | HTMLElement}
   * @default 'body'
   */
  attach: {
    type: [String, Object],
    default: 'body',
  },
  /**
   * app=true 时在自然布局位置生成占位。
   *
   * @type {boolean}
   * @default false
   */
  placeholder: {
    type: Boolean,
    default: false,
  },
  /**
   * app=true 时的额外底部安全区；数字与纯数字字符串按 px 处理，
   * 其他字符串 trim 后须为合法 CSS block-size 值，非法时回退 0。
   *
   * @type {number | string}
   * @default 0
   */
  bottomPlaceholder: {
    type: [Number, String],
    default: 0,
    validator: (value) => isValidCssLength(value, {
      property: 'block-size',
      allowUndefined: false,
    }),
  },
});
const propsWithDefaults = useMatProps('navigationDrawer', props);
const instance = getCurrentInstance();
const rawVNodeProps = instance?.vnode.props ?? {};
const hasExplicitAttach = Object.prototype.hasOwnProperty.call(rawVNodeProps, 'attach') && rawVNodeProps.attach !== undefined;
const forwardedAttach = computed(() => (hasExplicitAttach ? propsWithDefaults.attach : undefined));

const emit = defineEmits({
  /**
   * 子 Item 请求切换目的地时发出新的 value。
   */
  'update:modelValue': (value) => ['string', 'number', 'boolean'].includes(typeof value),
  /**
   * Drawer 请求切换展开状态时发出新的 boolean。
   */
  'update:expanded': (value) => typeof value === 'boolean',
});
</script>

<template>
  <MatNavigationRail
    v-bind="$attrs"
    class="mat-navigation-drawer"
    :model-value="propsWithDefaults.modelValue"
    :expanded="propsWithDefaults.expanded"
    :width="propsWithDefaults.width"
    :layout="propsWithDefaults.layout"
    :alignment="propsWithDefaults.alignment"
    :app="propsWithDefaults.app"
    :attach="forwardedAttach"
    :placeholder="propsWithDefaults.placeholder"
    :bottom-placeholder="propsWithDefaults.bottomPlaceholder"
    :full-width="true"
    :collapsible="true"
    :hide-on-collapse="true"
    orientation="vertical"
    @update:model-value="emit('update:modelValue', $event)"
    @update:expanded="emit('update:expanded', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </MatNavigationRail>
</template>

<style scoped>
@layer mde.components {
  .mat-navigation-drawer {
    --mat-navigation-rail-expanded-width: clamp(240px, 30vw, 360px);
  }
}
</style>
