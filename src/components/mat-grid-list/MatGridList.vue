<script setup>
import {
  computed, onBeforeUnmount, watchEffect,
} from 'vue';
import { isComponentColor } from '../button-props';
import { LIST_INTERACTIONS } from '../list-context';
import MatList from '../mat-list/MatList.vue';
import { useMatProps } from '../use-mat-props';
import { createGridListCornerCss, createGridListScopeId } from './grid-list-corners';

defineOptions({
  name: 'MatGridList',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 网格列数；必须是正整数。
   *
   * @type {number}
   * @default 2
   */
  cols: {
    type: Number,
    default: 2,
    validator(value) {
      return Number.isInteger(value) && value >= 1;
    },
  },
  /**
   * 交互模式；与 MatList 一致，可选值为 `none`、`single-action`、`multi-action`、`single-select`、`multi-select`。
   *
   * @type {'none' | 'single-action' | 'multi-action' | 'single-select' | 'multi-select'}
   * @default 'none'
   */
  interaction: {
    type: String,
    default: 'none',
    validator(value) {
      return LIST_INTERACTIONS.includes(value);
    },
  },
  /**
   * 受控选中值；single-select 使用单值，multi-select 使用数组。
   *
   * @type {string | number | boolean | Array<string | number | boolean> | null}
   * @default null
   */
  selected: {
    type: [String, Number, Boolean, Array],
    default: null,
  },
  /**
   * 网格项通常状态背景色使用的语义色或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
  /**
   * 选中网格项背景色使用的语义色或六位十六进制种子色 `#RRGGBB`。
   *
   * @type {string | undefined}
   * @default undefined
   */
  activeColor: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});
const propsWithDefaults = useMatProps('gridList', props);

const emit = defineEmits({
  /**
   * 选择规则允许变化时触发，载荷包含 value、selected、nextSelected 和 originalEvent。
   */
  select(payload) {
    return payload
      && Object.hasOwn(payload, 'value')
      && Object.hasOwn(payload, 'nextSelected')
      && payload.originalEvent instanceof Event;
  },
});

/* 实例唯一的作用域值，让相邻圆角规则只作用于当前网格。 */
const scopeId = createGridListScopeId();
const columnCount = computed(() => (
  Number.isInteger(propsWithDefaults.cols) && propsWithDefaults.cols >= 1
    ? propsWithDefaults.cols
    : 2
));
const gridStyle = computed(() => ({
  display: 'grid',
  'grid-template-columns': `repeat(${columnCount.value}, minmax(0, 1fr))`,
}));
const cornerCss = computed(() => createGridListCornerCss(
  `[data-mat-grid-list="${scopeId}"]`,
  columnCount.value,
));

/*
 * 角落圆角规则依赖 cols 生成 nth-child 公式，只能运行时注入样式表；
 * 模板中的 <style> 标签会被 Vue 编译器丢弃，因此直接在 head 维护规则
 * 元素。setup 期间同步挂载，保证项目首次样式解析就使用网格圆角，
 * 不产生挂载时的形状过渡；卸载时移除。规则只匹配当前实例的作用域
 * 属性，不会影响其他网格。
 */
const cornerStyleElement = document.createElement('style');
document.head.appendChild(cornerStyleElement);
onBeforeUnmount(() => {
  cornerStyleElement.remove();
});
watchEffect(() => {
  cornerStyleElement.textContent = cornerCss.value;
});

/**
 * @param {object} payload
 * @param {Event} payload.originalEvent
 */
function forwardSelect(payload) {
  emit('select', payload);
}
</script>

<template>
  <MatList
    v-bind="$attrs"
    class="mat-grid-list"
    :data-mat-grid-list="scopeId"
    :interaction="propsWithDefaults.interaction"
    :selected="propsWithDefaults.selected"
    :color="propsWithDefaults.color"
    :active-color="propsWithDefaults.activeColor"
    :style="gridStyle"
    @select="forwardSelect"
  >
    <slot />
  </MatList>
</template>
