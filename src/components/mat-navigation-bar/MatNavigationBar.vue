<script setup>
import {
  computed, getCurrentInstance, inject, provide, ref,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import { MAT_LAYOUT_KEY } from '../mat-layout/layout-context';
import MatAside from '../mat-aside/MatAside.vue';
import { MAT_NAVIGATION_KEY } from '../mat-navigation-rail/mat-navigation-context';
import { isValidCssLength } from '../value-utils';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNavigationBar',
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
   * 默认 Slot 在主轴上的对齐方式；可选值为 start、center、end。
   *
   * @type {'start' | 'center' | 'end'}
   * @default 'center'
   */
  alignment: {
    type: String,
    default: 'center',
    validator(value) {
      return ['start', 'center', 'end'].includes(value);
    },
  },
  /**
   * 是否 Teleport 到 attach 并固定到视口或登记至 MatAppRoot 底部。
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
   * 导航栏高度尺寸；数字与纯数字字符串按 px 处理，其他字符串为合法 CSS 长度。
   * 省略时使用默认高度 64px。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  height: {
    type: [Number, String],
    default: undefined,
    validator: (value) => value === undefined || isValidCssLength(value, {
      property: 'block-size',
      positive: true,
    }),
  },
  /**
   * 底部安全区留白配置。
   *
   * @type {boolean | number | string}
   * @default true
   */
  safeArea: {
    type: [Boolean, Number, String],
    default: true,
  },
  /**
   * 显式指定底部安全区尺寸。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  safeAreaSize: {
    type: [Number, String],
    default: undefined,
  },
  /**
   * 是否在顶部渲染 1px 细边框。
   *
   * @type {boolean}
   * @default false
   */
  bordered: {
    type: Boolean,
    default: false,
  },
  /**
   * 受控显示/隐藏状态，支持 v-model:open。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  open: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否启用滑入滑出动效。
   *
   * @type {boolean}
   * @default true
   */
  transition: {
    type: Boolean,
    default: true,
  },
  /**
   * 排布与定位模式。未指定时遵循 aside 默认行为。
   *
   * @type {'docked' | 'flow' | 'sticky' | 'fixed' | undefined}
   * @default undefined
   */
  mode: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || ['docked', 'flow', 'sticky', 'fixed'].includes(value);
    },
  },
  /**
   * 显式指定层级。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  zIndex: {
    type: [Number, String],
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('navigationBar', props);

const emit = defineEmits({
  /**
   * 子 Item 请求切换目的地时发出新的 value。
   */
  'update:modelValue': (value) => ['string', 'number', 'boolean'].includes(typeof value),
  /**
   * 请求切换显示状态时发出新的 boolean。
   */
  'update:open': (value) => typeof value === 'boolean',
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const layoutContext = inject(MAT_LAYOUT_KEY, null);
const asideRef = ref(null);
const instance = getCurrentInstance();
const rawVNodeProps = instance?.vnode.props ?? {};
const hasExplicitAttach = computed(() => (
  Object.prototype.hasOwnProperty.call(rawVNodeProps, 'attach') && rawVNodeProps.attach !== undefined
));
const forwardedAttach = computed(() => (hasExplicitAttach.value ? propsWithDefaults.attach : undefined));

const effectiveMode = computed(() => {
  if (propsWithDefaults.mode !== undefined) {
    return propsWithDefaults.mode;
  }
  if (propsWithDefaults.app) {
    return undefined;
  }
  if (layoutContext) {
    return 'docked';
  }
  return 'flow';
});

const effectiveHeight = computed(() => {
  if (propsWithDefaults.height !== undefined) {
    return propsWithDefaults.height;
  }
  return 64;
});

provide(MAT_NAVIGATION_KEY, {
  expanded: computed(() => false),
  fullWidth: computed(() => false),
  orientation: computed(() => 'horizontal'),
  isSelected: (value) => value !== undefined && Object.is(propsWithDefaults.modelValue, value),
  requestSelection: (value) => {
    if (value !== undefined && !Object.is(propsWithDefaults.modelValue, value)) {
      emit('update:modelValue', value);
    }
  },
  useCursor: matUi.useCursor,
});

defineExpose({
  asideRef,
  hostElement: computed(() => asideRef.value?.hostElement),
});
</script>

<template>
  <MatAside
    ref="asideRef"
    as="nav"
    location="bottom"
    :app="propsWithDefaults.app"
    :attach="forwardedAttach"
    :placeholder="propsWithDefaults.placeholder"
    :block-size="effectiveHeight"
    :safe-area="propsWithDefaults.safeArea"
    :safe-area-size="propsWithDefaults.safeAreaSize"
    :bordered="propsWithDefaults.bordered"
    :open="propsWithDefaults.open"
    :transition="propsWithDefaults.transition"
    :mode="effectiveMode"
    :z-index="propsWithDefaults.zIndex"
    class="mat-navigation-bar"
    v-bind="$attrs"
    @update:open="emit('update:open', $event)"
  >
    <div
      class="mat-navigation-bar__content"
      :class="`mat-navigation-bar__content--${propsWithDefaults.alignment}`"
    >
      <slot />
    </div>
  </MatAside>
</template>

<style scoped>
@layer mde.components {
  .mat-navigation-bar {
    --mat-navigation-bar-current-container-color: var(--mat-navigation-bar-container-color);
    box-sizing: border-box;
    inline-size: 100%;
    color: var(--mat-navigation-rail-content-color);
    background: var(--mat-navigation-bar-current-container-color);
    box-shadow: var(--mat-navigation-bar-elevation);
  }

  .mat-navigation-bar__content {
    display: flex;
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    min-inline-size: 0;
    min-block-size: 0;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    padding-inline: var(--mat-navigation-bar-edge-space);
    gap: var(--mat-navigation-bar-item-space);
  }

  .mat-navigation-bar__content--start {
    justify-content: flex-start;
  }

  .mat-navigation-bar__content--center {
    justify-content: center;
  }

  .mat-navigation-bar__content--end {
    justify-content: flex-end;
  }

  .mat-navigation-bar__placeholder {
    display: block;
    pointer-events: none;
    box-sizing: border-box;
    overflow: hidden;
    transition: block-size var(--mat-sys-motion-spring-default-spatial, .3s ease);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-navigation-bar__placeholder {
      transition-duration: 0s;
    }
  }
}
</style>
