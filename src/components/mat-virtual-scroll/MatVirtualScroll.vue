<script setup>
import { ref } from 'vue';
import { isHtmlTagName } from '../icon-props';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength } from '../value-utils';
import useVirtualScroll from './use-virtual-scroll';

defineOptions({
  name: 'MatVirtualScroll',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 待虚拟滚动的全量数据列表。
   *
   * @type {Array<unknown>}
   * @default []
   */
  items: {
    type: Array,
    default: () => [],
  },
  /**
   * 固定的单项高度（单位 px）；仅支持可转换为数字的数值或纯数字字符串。
   * 传入时跳过动态尺寸计算与 ResizeObserver 监听。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  itemHeight: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, { positive: true }),
  },
  /**
   * 动态高度模式下的初始预估单项高度（单位 px）。
   *
   * @type {number | string}
   * @default 48
   */
  estimatedItemHeight: {
    type: [Number, String],
    default: 48,
    validator: (value) => isValidCssLength(value, { positive: true, allowUndefined: false }),
  },
  /**
   * 视口上下方额外预渲染的缓冲项数量。
   *
   * @type {number | string}
   * @default 3
   */
  buffer: {
    type: [Number, String],
    default: 3,
    validator: (value) => isValidCssLength(value, { allowUndefined: false }),
  },
  /**
   * 用于提取 item 唯一 key 的函数或属性名；未设置时默认使用项的索引 index。
   *
   * @type {Function | string | undefined}
   * @default undefined
   */
  itemKey: {
    type: [Function, String],
    default: undefined,
  },
  /**
   * 根容器渲染的 HTML 标签名。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
    validator: isHtmlTagName,
  },
});

const propsWithDefaults = useMatProps('virtualScroll', props);

const emit = defineEmits({
  /**
   * 滚动时触发，载荷包含当前滚动位置与渲染区间。
   *
   * @type {{ scrollTop: number, scrollHeight: number, clientHeight: number, startIndex: number, endIndex: number }}
   */
  scroll: (payload) => (
    typeof payload?.scrollTop === 'number'
    && typeof payload?.startIndex === 'number'
    && typeof payload?.endIndex === 'number'
  ),
  /**
   * 可见索引区间变化时触发。
   *
   * @type {{ startIndex: number, endIndex: number }}
   */
  'visible-range-change': (payload) => (
    typeof payload?.startIndex === 'number'
    && typeof payload?.endIndex === 'number'
  ),
});

const root = ref(null);
const {
  calculate,
  getItemKey,
  getScroller,
  paddingBottom,
  paddingTop,
  refresh,
  scrollTo,
  scrollToIndex,
  setItemRef,
  visibleItems,
} = useVirtualScroll({
  root,
  props: propsWithDefaults,
  enabled: true,
  pinEdges: false,
  emit,
});

defineExpose({
  calculate,
  getScroller,
  refresh,
  scrollTo,
  scrollToIndex,
});
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    ref="root"
    class="mat-virtual-scroll"
  >
    <div
      class="mat-virtual-scroll__spacer"
      :style="{ height: `${paddingTop}px` }"
      aria-hidden="true"
    />

    <template
      v-for="itemRecord in visibleItems"
      :key="getItemKey(itemRecord.item, itemRecord.index)"
    >
      <slot
        :item="itemRecord.item"
        :index="itemRecord.index"
        :item-ref="(el) => setItemRef(itemRecord.index, el)"
      />
    </template>

    <div
      class="mat-virtual-scroll__spacer"
      :style="{ height: `${paddingBottom}px` }"
      aria-hidden="true"
    />
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-virtual-scroll {
    box-sizing: border-box;
    display: block;
    inline-size: 100%;
    position: relative;
  }

  .mat-virtual-scroll__spacer {
    box-sizing: border-box;
    inline-size: 100%;
    pointer-events: none;
  }
}
</style>
