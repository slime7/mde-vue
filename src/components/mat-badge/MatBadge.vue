<script setup>
import {
  computed, useAttrs,
} from 'vue';
import { isComponentColor } from '../button-props';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import { toCssLength } from '../value-utils';
import { BADGE_LOCATIONS, isBadgeOffset } from './badge-props';

defineOptions({
  name: 'MatBadge',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 内容型 Badge 显示的文本或数字；空字符串不显示。
   *
   * @type {string | number | undefined}
   * @default undefined
   */
  content: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * 显示点型 Badge，并忽略 content。
   *
   * @type {boolean}
   * @default false
   */
  dot: {
    type: Boolean,
    default: false,
  },
  /**
   * 覆盖模式的方位；`inline` 使 Badge 自身参与自然布局并忽略默认 Slot。
   *
   * @type {'top-start' | 'top' | 'top-end' | 'end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'start' | 'inline'}
   * @default 'top-end'
   */
  location: {
    type: String,
    default: 'top-end',
    validator: (value) => BADGE_LOCATIONS.includes(value),
  },
  /**
   * 覆盖模式下沿逻辑行轴和块轴的微调量；数字按 px 处理。
   *
   * @type {{ inline?: number | string, block?: number | string }}
   * @default { inline: 0, block: 0 }
   */
  offset: {
    type: Object,
    default: () => ({
      inline: 0,
      block: 0,
    }),
    validator: isBadgeOffset,
  },
  /**
   * Material 语义色、系统颜色角色或六位十六进制种子色。
   *
   * @type {string}
   * @default 'error'
   */
  color: {
    type: String,
    default: 'error',
    validator: isComponentColor,
  },
});
const propsWithDefaults = useMatProps('badge', props);
const attrs = useAttrs();
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const isInline = computed(() => propsWithDefaults.location === 'inline');
const hasContent = computed(() => (
  propsWithDefaults.content !== undefined
  && String(propsWithDefaults.content).length > 0
));
const isVisible = computed(() => propsWithDefaults.dot || hasContent.value);
const renderedContent = computed(() => (
  propsWithDefaults.dot ? undefined : propsWithDefaults.content
));

/**
 * 保持 calc() 中偏移量的长度类型。
 *
 * @param {number | string | undefined} value
 * @returns {string}
 */
function toBadgeOffset(value) {
  const resolved = toCssLength(value ?? 0, {
    property: 'margin',
    allowNegative: true,
    fallback: '0px',
  });

  return resolved === '0' ? '0px' : resolved;
}

const indicatorStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-badge-offset-inline': isInline.value
    ? undefined
    : toBadgeOffset(propsWithDefaults.offset?.inline),
  '--mat-badge-offset-block': isInline.value
    ? undefined
    : toBadgeOffset(propsWithDefaults.offset?.block),
}));
</script>

<template>
  <span
    v-if="isInline && isVisible"
    v-bind="attrs"
    class="mat-badge__indicator mat-badge__indicator--inline"
    :class="{ 'mat-badge__indicator--dot': propsWithDefaults.dot }"
    :style="indicatorStyle"
    aria-hidden="true"
    :data-dot="propsWithDefaults.dot ? '' : undefined"
  >
    {{ renderedContent }}
  </span>

  <span
    v-else-if="!isInline"
    v-bind="attrs"
    class="mat-badge"
  >
    <slot />

    <span
      v-if="isVisible"
      class="mat-badge__indicator"
      :class="[
        `mat-badge__indicator--${propsWithDefaults.location}`,
        { 'mat-badge__indicator--dot': propsWithDefaults.dot },
      ]"
      :style="indicatorStyle"
      aria-hidden="true"
      :data-dot="propsWithDefaults.dot ? '' : undefined"
    >
      {{ renderedContent }}
    </span>
  </span>
</template>

<style scoped>
@layer mde.components {
  .mat-badge {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    vertical-align: middle;
  }

  .mat-badge__indicator {
    position: absolute;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-inline-size: 16px;
    block-size: 16px;
    padding: 4px;
    color: var(--mat-on-accent-color);
    font-family: var(--mat-sys-typescale-label-small-font);
    font-size: var(--mat-sys-typescale-label-small-size);
    font-weight: var(--mat-sys-typescale-label-small-weight);
    letter-spacing: var(--mat-sys-typescale-label-small-tracking);
    line-height: var(--mat-sys-typescale-label-small-line-height);
    white-space: nowrap;
    background: var(--mat-accent-color);
    border-radius: var(--mat-sys-shape-corner-full);
    pointer-events: none;
  }

  .mat-badge__indicator--dot {
    min-inline-size: 6px;
    inline-size: 6px;
    block-size: 6px;
    padding: 0;
  }

  .mat-badge__indicator--inline {
    position: static;
    vertical-align: baseline;
  }

  .mat-badge__indicator--top-start {
    inset-block-start: calc(-2px + var(--mat-badge-offset-block));
    inset-inline-end: calc(50% - var(--mat-badge-offset-inline));
  }

  .mat-badge__indicator--top {
    inset-block-start: calc(-2px + var(--mat-badge-offset-block));
    inset-inline-start: calc(50% + var(--mat-badge-offset-inline));
    translate: -50% 0;
  }

  .mat-badge__indicator--top-end {
    inset-block-start: calc(-2px + var(--mat-badge-offset-block));
    inset-inline-start: calc(50% + var(--mat-badge-offset-inline));
  }

  .mat-badge__indicator--end {
    inset-block-start: calc(50% + var(--mat-badge-offset-block));
    inset-inline-start: calc(50% + var(--mat-badge-offset-inline));
    translate: 0 -50%;
  }

  .mat-badge__indicator--bottom-end {
    inset-block-end: calc(-2px - var(--mat-badge-offset-block));
    inset-inline-start: calc(50% + var(--mat-badge-offset-inline));
  }

  .mat-badge__indicator--bottom {
    inset-block-end: calc(-2px - var(--mat-badge-offset-block));
    inset-inline-start: calc(50% + var(--mat-badge-offset-inline));
    translate: -50% 0;
  }

  .mat-badge__indicator--bottom-start {
    inset-block-end: calc(-2px - var(--mat-badge-offset-block));
    inset-inline-end: calc(50% - var(--mat-badge-offset-inline));
  }

  .mat-badge__indicator--start {
    inset-block-start: calc(50% + var(--mat-badge-offset-block));
    inset-inline-end: calc(50% - var(--mat-badge-offset-inline));
    translate: 0 -50%;
  }

  .mat-badge__indicator--dot.mat-badge__indicator--top-start {
    inset-block-start: var(--mat-badge-offset-block);
    inset-inline: var(--mat-badge-offset-inline) auto;
  }

  .mat-badge__indicator--dot.mat-badge__indicator--top {
    inset-block-start: var(--mat-badge-offset-block);
  }

  .mat-badge__indicator--dot.mat-badge__indicator--top-end {
    inset-block-start: var(--mat-badge-offset-block);
    inset-inline: auto calc(0px - var(--mat-badge-offset-inline));
  }

  .mat-badge__indicator--dot.mat-badge__indicator--end {
    inset-inline: auto calc(0px - var(--mat-badge-offset-inline));
  }

  .mat-badge__indicator--dot.mat-badge__indicator--bottom-end {
    inset-block: auto calc(0px - var(--mat-badge-offset-block));
    inset-inline: auto calc(0px - var(--mat-badge-offset-inline));
  }

  .mat-badge__indicator--dot.mat-badge__indicator--bottom {
    inset-block: auto calc(0px - var(--mat-badge-offset-block));
  }

  .mat-badge__indicator--dot.mat-badge__indicator--bottom-start {
    inset-block: auto calc(0px - var(--mat-badge-offset-block));
    inset-inline: var(--mat-badge-offset-inline) auto;
  }

  .mat-badge__indicator--dot.mat-badge__indicator--start {
    inset-inline: var(--mat-badge-offset-inline) auto;
  }
}
</style>
