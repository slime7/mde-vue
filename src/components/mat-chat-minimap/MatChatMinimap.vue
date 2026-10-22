<script setup>
import { computed, ref, watch } from 'vue';
import MatTooltip from '../mat-tooltip/MatTooltip.vue';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength, toCssLength } from '../value-utils';

const PROXIMITY_RANGE = 3;
const PROXIMITY_SIGMA = 1.7;

defineOptions({
  name: 'MatChatMinimap',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 从上到下展示的条目；每个条目渲染一条短横线。
   *
   * `tooltip` 按原样透传给内部 MatTooltip，`id` 用作稳定 key。
   *
   * @type {Array<{ id?: string | number, tooltip?: object }>}
   * @default []
   */
  items: {
    type: Array,
    default: () => [],
  },
  /**
   * 短横线的静止宽度，也是悬停展开宽度的二分之一。
   *
   * 数字与纯数字字符串按 px 处理，其他字符串须为合法正向 CSS 宽度。
   *
   * @type {number | string}
   * @default 16
   */
  itemWidth: {
    type: [Number, String],
    default: 16,
    validator: (value) => isValidCssLength(value, {
      property: 'inline-size',
      positive: true,
    }),
  },
  /**
   * 短横线的厚度。
   *
   * 数字与纯数字字符串按 px 处理，其他字符串须为合法正向 CSS 高度。
   *
   * @type {number | string}
   * @default 2
   */
  itemHeight: {
    type: [Number, String],
    default: 2,
    validator: (value) => isValidCssLength(value, {
      property: 'block-size',
      positive: true,
    }),
  },
  /**
   * 相邻短横线之间的间距；悬停范围在短横线上下各扩展该间距的一半。
   *
   * 数字与纯数字字符串按 px 处理，允许 0，其他字符串须为合法 CSS 间距。
   *
   * @type {number | string}
   * @default 8
   */
  itemGap: {
    type: [Number, String],
    default: 8,
    validator: (value) => isValidCssLength(value, { property: 'gap' }),
  },
  /**
   * 短横线的锚定方位。
   *
   * `left` 表示缩略图位于左侧，短横线左对齐并向右增长；`right` 表示位于右侧，右对齐并向左增长。
   *
   * @type {'left' | 'right'}
   * @default 'left'
   */
  direction: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
});
const propsWithDefaults = useMatProps('chatMinimap', props);
const rootStyle = computed(() => ({
  '--_mat-chat-minimap-item-width': toCssLength(propsWithDefaults.itemWidth, {
    property: 'inline-size',
    positive: true,
    fallback: '16px',
  }),
  '--_mat-chat-minimap-item-height': toCssLength(propsWithDefaults.itemHeight, {
    property: 'block-size',
    positive: true,
    fallback: '2px',
  }),
  '--_mat-chat-minimap-item-gap': toCssLength(propsWithDefaults.itemGap, {
    property: 'gap',
    fallback: '8px',
  }),
}));
const emit = defineEmits({
  /**
   * 点击条目时发出条目、索引和原始 MouseEvent。
   *
   * @type {{ item: { id?: string | number, tooltip?: object }, index: number, originalEvent: MouseEvent }}
   */
  click: (payload) => payload?.originalEvent instanceof MouseEvent,
});
const activeIndex = ref(null);

watch(
  () => propsWithDefaults.items.length,
  () => {
    activeIndex.value = null;
  },
);

/**
 * @param {number} index
 * @returns {number}
 */
function getWidthScale(index) {
  if (activeIndex.value === null) {
    return 0;
  }

  const distance = Math.abs(index - activeIndex.value);

  if (distance > PROXIMITY_RANGE) {
    return 0;
  }

  return Math.exp(-(distance * distance) / (2 * PROXIMITY_SIGMA * PROXIMITY_SIGMA));
}

/**
 * @param {number} index
 * @returns {Record<string, number>}
 */
function getBarStyle(index) {
  return {
    '--_mat-chat-minimap-width-scale': getWidthScale(index),
  };
}

/**
 * @param {{ tooltip?: object } | null | undefined} item
 * @returns {object}
 */
function getTooltipProps(item) {
  const tooltip = item && typeof item.tooltip === 'object' && item.tooltip !== null
    ? item.tooltip
    : {};

  return {
    rich: true,
    location: propsWithDefaults.direction === 'right' ? 'left' : 'right',
    ...tooltip,
  };
}

/**
 * @param {{ tooltip?: object } | null | undefined} item
 * @returns {string | undefined}
 */
function getItemLabel(item) {
  const tooltip = item && typeof item.tooltip === 'object' && item.tooltip !== null
    ? item.tooltip
    : {};
  const subhead = typeof tooltip.subhead === 'string' && tooltip.subhead.length > 0
    ? tooltip.subhead
    : undefined;
  const content = typeof tooltip.content === 'string' && tooltip.content.length > 0
    ? tooltip.content
    : undefined;

  return subhead ?? content;
}

/**
 * @param {unknown} item
 * @param {number} index
 * @param {MouseEvent} originalEvent
 * @returns {void}
 */
function handleItemClick(item, index, originalEvent) {
  emit('click', { item, index, originalEvent });
}

/**
 * @param {number} index
 * @returns {void}
 */
function setActive(index) {
  activeIndex.value = index;
}

/**
 * @returns {void}
 */
function clearActive() {
  activeIndex.value = null;
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-chat-minimap"
    :class="`mat-chat-minimap--${propsWithDefaults.direction}`"
    :style="rootStyle"
    @mouseleave="clearActive"
  >
    <MatTooltip
      v-for="(item, index) in propsWithDefaults.items"
      :key="item?.id ?? index"
      v-bind="getTooltipProps(item)"
    >
      <template #activator>
        <button
          type="button"
          class="mat-chat-minimap__item"
          :aria-label="getItemLabel(item)"
          @click="handleItemClick(item, index, $event)"
          @mouseenter="setActive(index)"
        >
          <span
            class="mat-chat-minimap__bar"
            :class="{ 'mat-chat-minimap__bar--active': activeIndex === index }"
            :style="getBarStyle(index)"
            aria-hidden="true"
          />
        </button>
      </template>
    </MatTooltip>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-chat-minimap {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    box-sizing: border-box;
    inline-size: calc(var(--_mat-chat-minimap-item-width, 16px) * 2);
  }

  .mat-chat-minimap__item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    inline-size: 100%;
    padding: calc(var(--_mat-chat-minimap-item-gap, 8px) / 2) 0;
    margin: 0;
    color: inherit;
    appearance: none;
    cursor: default;
    background: none;
    border: 0;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .mat-chat-minimap__item:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: var(--mat-sys-interaction-focus-ring-offset);
    border-radius: var(--mat-sys-shape-corner-extra-small);
  }

  .mat-chat-minimap--left .mat-chat-minimap__item {
    justify-content: flex-start;
  }

  .mat-chat-minimap--right .mat-chat-minimap__item {
    justify-content: flex-end;
  }

  .mat-chat-minimap__bar {
    flex: 0 0 auto;
    box-sizing: border-box;
    inline-size: calc(
      var(--_mat-chat-minimap-item-width, 16px)
      * (1 + var(--_mat-chat-minimap-width-scale, 0))
    );
    block-size: var(--_mat-chat-minimap-item-height, 2px);
    color: var(--mat-chat-minimap-bar-color);
    background: currentcolor;
    border-radius: var(--mat-sys-shape-corner-full);
    transition: inline-size var(--mat-sys-motion-duration-short4) var(--mat-sys-motion-easing-emphasized), color var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-chat-minimap__bar--active {
    color: var(--mat-chat-minimap-bar-active-color);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-chat-minimap__bar {
      transition: none;
    }
  }
}
</style>
