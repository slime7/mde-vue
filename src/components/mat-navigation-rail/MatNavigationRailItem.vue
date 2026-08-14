<script setup>
import { computed, inject, useSlots } from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import { getTypographyClass } from '../typography';
import { MAT_NAVIGATION_RAIL_KEY } from './mat-navigation-context';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatNavigationRailItem',
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
  /**
   * 展开态活动指示器是否铺满 Item 可用宽度；默认贴合内容。
   *
   * @type {boolean}
   * @default false
   */
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('navigationRailItem', props);

const emit = defineEmits({
  /**
   * 启用的导航项被用户激活时转发原生点击事件，载荷为 `MouseEvent`。
   */
  click: (payload) => payload instanceof MouseEvent,
});
const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const navigation = inject(MAT_NAVIGATION_RAIL_KEY, null);
const expanded = computed(() => navigation?.expanded.value ?? false);
const isHorizontal = computed(() => navigation?.orientation.value === 'horizontal');
const position = computed(() => navigation?.position.value ?? 'start');
const selected = computed(() => navigation?.isSelected(propsWithDefaults.value) ?? false);
const hasIcon = computed(() => Boolean(propsWithDefaults.icon || slots.icon));
const typographyClass = computed(() => getTypographyClass(
  'label',
  expanded.value && !isHorizontal.value ? 'large' : 'medium',
));
const collapsedLabelClass = computed(() => getTypographyClass('label', 'medium'));
const itemClasses = computed(() => ({
  'mat-navigation-rail-item--selected': selected.value,
  'mat-navigation-rail-item--disabled': propsWithDefaults.disabled,
  'mat-navigation-rail-item--expanded': expanded.value,
  'mat-navigation-rail-item--collapsed': !expanded.value,
  'mat-navigation-rail-item--horizontal': isHorizontal.value,
  'mat-navigation-rail-item--full-width': propsWithDefaults.fullWidth,
  [`mat-navigation-rail-item--${position.value}`]: true,
}));

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
  if (!propsWithDefaults.disabled) {
    navigation?.requestSelection(propsWithDefaults.value);
  }

  emit('click', event);
}
</script>

<template>
  <MatActionBase
    v-bind="$attrs"
    class="mat-navigation-rail-item"
    :class="itemClasses"
    :aria-current="selected ? 'page' : undefined"
    :disabled="propsWithDefaults.disabled"
    :focus-ring="false"
    :href="propsWithDefaults.href"
    :use-cursor="matUi.useCursor"
    @click="handleClick"
  >
    <span class="mat-navigation-rail-item__indicator">
      <span class="mat-navigation-rail-item__icon-wrap">
        <slot
          v-if="slots.icon"
          name="icon"
          :selected="selected"
        />

        <MatIcon
          v-else-if="hasIcon"
          :fill="selected ? 1 : 0"
          :icon="propsWithDefaults.icon"
          class="mat-navigation-rail-item__icon"
          aria-hidden="true"
        />

      </span>

      <span
        class="mat-navigation-rail-item__label-wrap"
      >
        <span
          :class="['mat-navigation-rail-item__label', typographyClass]"
        >
          <slot />
        </span>
      </span>
    </span>

    <span
      :class="['mat-navigation-rail-item__label', collapsedLabelClass]"
    >
      <slot />
    </span>

    <span
      v-if="$slots.trailing"
      class="mat-navigation-rail-item__spacer"
      aria-hidden="true"
    />

    <span
      v-if="$slots.trailing"
      class="mat-navigation-rail-item__trailing"
    >
      <slot
        name="trailing"
        :expanded="expanded"
        :selected="selected"
      />
    </span>
  </MatActionBase>
</template>

<style scoped>
@layer mde.components {
  .mat-navigation-rail-item {
    --mat-action-state-color: transparent;
    position: relative;
    display: flex;
    box-sizing: border-box;
    inline-size: 100%;
    min-inline-size: 0;
    align-items: center;
    color: var(--mat-navigation-rail-item-content-color);
    text-align: start;
    text-decoration: none;
    background: transparent;
    border: 0;
  }

  .mat-navigation-rail-item--collapsed {
    min-block-size: var(--mat-navigation-rail-collapsed-item-height);
    flex-direction: column;
    align-items: var(--mat-navigation-rail-item-inline-alignment, center);
    justify-content: center;
    gap: var(--mat-navigation-rail-vertical-icon-label-space);
    padding-block: var(--mat-navigation-rail-item-space);
    padding-inline: var(--mat-navigation-rail-collapsed-side-space);
    transition: min-block-size var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail-item--expanded {
    min-block-size: var(--mat-navigation-rail-expanded-item-height);
    justify-content: var(--mat-navigation-rail-item-inline-alignment, flex-start);
    padding-inline: var(--mat-navigation-rail-expanded-side-space);
    transition: min-block-size var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail-item--horizontal {
    flex: 0 0 var(--mat-navigation-bar-horizontal-item-width);
    min-block-size: 100%;
    align-items: center;
    justify-content: center;
    padding-inline: 0;
  }

  .mat-navigation-rail-item__indicator {
    position: relative;
    isolation: isolate;
    display: flex;
    box-sizing: border-box;
    flex: 0 0 auto;
    align-items: center;
    justify-content: flex-start;
    background: transparent;
    border-radius: var(--mat-sys-shape-corner-full);
    transition: min-block-size var(--mat-sys-motion-spring-default-spatial), inline-size var(--mat-sys-motion-spring-default-spatial);
  }

  .mat-navigation-rail-item__indicator::before,
  .mat-navigation-rail-item__indicator::after {
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: inherit;
    content: '';
    pointer-events: none;
  }

  .mat-navigation-rail-item__indicator::before {
    background: var(--mat-navigation-rail-item-selected-container-color);
    opacity: 0;
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-navigation-rail-item__indicator::after {
    background: var(--mat-navigation-rail-item-state-color);
    opacity: 0;
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-navigation-rail-item--selected .mat-navigation-rail-item__indicator::before {
    opacity: 1;
  }

  .mat-navigation-rail-item--collapsed .mat-navigation-rail-item__indicator {
    inline-size: var(--mat-navigation-rail-vertical-indicator-width);
    min-block-size: var(--mat-navigation-rail-vertical-indicator-height);
    padding-inline: var(--mat-navigation-rail-horizontal-leading-space);
  }

  .mat-navigation-rail-item--expanded .mat-navigation-rail-item__indicator {
    flex: 0 1 auto;
    min-inline-size: var(--mat-navigation-rail-vertical-indicator-width);
    min-block-size: var(--mat-navigation-rail-horizontal-indicator-height);
    max-inline-size: 100%;
    gap: var(--mat-navigation-rail-horizontal-icon-label-space);
    padding-inline: var(--mat-navigation-rail-horizontal-leading-space);
  }

  .mat-navigation-rail-item--horizontal .mat-navigation-rail-item__indicator {
    min-block-size: var(--mat-navigation-bar-horizontal-indicator-height);
    max-inline-size: 100%;
    gap: var(--mat-navigation-bar-horizontal-icon-label-space);
    padding-inline: var(--mat-navigation-bar-horizontal-indicator-space);
  }

  .mat-navigation-rail-item--horizontal.mat-navigation-rail-item--collapsed .mat-navigation-rail-item__indicator {
    inline-size: var(--mat-navigation-rail-vertical-indicator-width);
    min-block-size: var(--mat-navigation-rail-vertical-indicator-height);
    padding-inline: var(--mat-navigation-bar-horizontal-indicator-space);
  }

  .mat-navigation-rail-item__icon-wrap {
    position: relative;
    z-index: 1;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
  }

  .mat-navigation-rail-item__icon {
    color: inherit;
  }

  .mat-navigation-rail-item__label-wrap {
    display: grid;
    min-inline-size: 0;
    grid-template-columns: 0fr;
    transition: grid-template-columns var(--mat-sys-motion-spring-default-effects);
  }

  .mat-navigation-rail-item--expanded .mat-navigation-rail-item__label-wrap {
    grid-template-columns: 1fr;
  }

  .mat-navigation-rail-item__label-wrap > .mat-navigation-rail-item__label {
    min-inline-size: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--mat-sys-motion-spring-default-effects), visibility 0s linear var(--mat-sys-motion-duration-short3);
  }

  .mat-navigation-rail-item--expanded .mat-navigation-rail-item__label-wrap > .mat-navigation-rail-item__label {
    opacity: 1;
    visibility: visible;
    transition: opacity var(--mat-sys-motion-spring-default-effects), visibility 0s;
  }

  .mat-navigation-rail-item__label {
    position: relative;
    z-index: 1;
    min-inline-size: 0;
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mat-navigation-rail-item > .mat-navigation-rail-item__label {
    inline-size: var(--mat-navigation-rail-vertical-indicator-width);
    max-inline-size: 100%;
    color: var(--mat-navigation-rail-item-content-color);
    text-align: center;
  }

  .mat-navigation-rail-item--collapsed > .mat-navigation-rail-item__label {
    opacity: 1;
    visibility: visible;
    transition: opacity var(--mat-sys-motion-spring-fast-effects), visibility 0s;
  }

  .mat-navigation-rail-item--expanded > .mat-navigation-rail-item__label {
    position: absolute;
    inset-inline-start: 50%;
    translate: -50% 0;
    inset-block-end: var(--mat-navigation-rail-item-space);
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--mat-sys-motion-spring-fast-effects), visibility 0s linear var(--mat-sys-motion-duration-short3);
  }

  .mat-navigation-rail-item--expanded.mat-navigation-rail-item--start > .mat-navigation-rail-item__label {
    inset-inline-start: var(--mat-navigation-rail-collapsed-side-space);
    translate: 0 0;
  }

  .mat-navigation-rail-item--expanded.mat-navigation-rail-item--end > .mat-navigation-rail-item__label {
    inset-inline: auto var(--mat-navigation-rail-collapsed-side-space);
    translate: 0 0;
  }

  .mat-navigation-rail-item--horizontal.mat-navigation-rail-item--expanded > .mat-navigation-rail-item__label {
    inset-inline-start: 50%;
    translate: -50% 0;
  }

  .mat-navigation-rail-item--selected {
    color: var(--mat-navigation-rail-item-selected-content-color);
  }

  .mat-navigation-rail-item--selected > .mat-navigation-rail-item__label {
    color: var(--mat-navigation-rail-item-selected-label-color);
  }

  .mat-navigation-rail-item--horizontal.mat-navigation-rail-item--selected .mat-navigation-rail-item__label {
    color: var(--mat-navigation-bar-item-selected-label-color);
  }

  .mat-navigation-rail-item__trailing {
    display: none;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
  }

  .mat-navigation-rail-item--expanded .mat-navigation-rail-item__trailing {
    display: inline-flex;
    margin-inline: var(--mat-navigation-rail-trailing-start-space) var(--mat-navigation-rail-trailing-end-space);
  }

  .mat-navigation-rail-item__spacer {
    display: none;
  }

  .mat-navigation-rail-item--expanded .mat-navigation-rail-item__spacer {
    display: block;
    flex: 1 1 auto;
    min-inline-size: 0;
  }

  .mat-navigation-rail-item--expanded.mat-navigation-rail-item--end .mat-navigation-rail-item__indicator {
    margin-inline-start: auto;
  }

  .mat-navigation-rail-item--horizontal.mat-navigation-rail-item--expanded .mat-navigation-rail-item__indicator {
    margin-inline-start: 0;
  }

  .mat-navigation-rail-item--expanded.mat-navigation-rail-item--full-width .mat-navigation-rail-item__indicator {
    inline-size: 100%;
    gap: var(--mat-navigation-rail-full-width-icon-label-space);
  }

  .mat-navigation-rail-item:focus-visible {
    outline: 0;
  }

  .mat-navigation-rail-item:focus-visible .mat-navigation-rail-item__indicator {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: var(--mat-sys-interaction-focus-ring-offset);
  }

  .mat-navigation-rail-item:focus-visible .mat-navigation-rail-item__indicator::after,
  .mat-navigation-rail-item:active .mat-navigation-rail-item__indicator::after {
    opacity: var(--mat-sys-state-focus-state-layer-opacity);
  }

  @media (hover: hover) {
    .mat-navigation-rail-item:not(:disabled):hover .mat-navigation-rail-item__indicator::after {
      opacity: var(--mat-sys-state-hover-state-layer-opacity);
    }
  }

  .mat-navigation-rail-item--disabled {
    opacity: var(--mat-sys-state-disabled-content-opacity);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-navigation-rail-item,
    .mat-navigation-rail-item__indicator,
    .mat-navigation-rail-item__indicator::before,
    .mat-navigation-rail-item__indicator::after,
    .mat-navigation-rail-item__label-wrap,
    .mat-navigation-rail-item__label {
      transition-duration: 0s;
      transition-delay: 0s;
    }
  }
}
</style>
