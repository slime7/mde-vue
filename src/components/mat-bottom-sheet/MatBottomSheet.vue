<script setup>
import { computed, getCurrentInstance, useAttrs } from 'vue';
import MatSheetBase from '../MatSheetBase.vue';
import { useMatProps } from '../use-mat-props';
import { isValidCssBlockSize, isValidCssLength } from '../value-utils';

defineOptions({
  name: 'MatBottomSheet',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 受控打开状态，可使用 v-model。
   *
   * @type {boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 布局变体；auto 在窄于 breakpoint 时使用 modal，否则使用 standard。
   *
   * @type {'auto'|'standard'|'modal'}
   * @default 'auto'
   */
  variant: {
    type: String,
    default: 'auto',
    validator: (value) => ['auto', 'standard', 'modal'].includes(value),
  },
  /**
   * auto 变体切换为 standard 的最小视口宽度，单位为 CSS px。
   *
   * @type {number}
   * @default 840
   */
  breakpoint: {
    type: Number,
    default: 840,
    validator: (value) => isValidCssLength(value, {
      positive: true,
      allowUndefined: false,
    }),
  },
  /**
   * 首选宽度；数字与纯数字字符串按 px 处理，其他字符串须为 trim 后合法的 CSS
   * 宽度值，非法时使用默认宽度；最终仍受 Material 3 的 640px 最大宽度约束。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  width: {
    type: [Number, String],
    default: undefined,
    validator: (value) => isValidCssLength(value, {
      property: 'inline-size',
      positive: true,
    }),
  },
  /**
   * modal 的 Teleport 目标；字符串按当前 document 的 CSS 选择器解析。
   *
   * @type {string | HTMLElement}
   * @default 'body'
   */
  attach: {
    type: [String, Object],
    default: 'body',
  },
  /**
   * modal 是否显示顶层帷幕。
   *
   * @type {boolean}
   * @default true
   */
  scrim: {
    type: Boolean,
    default: true,
  },
  /**
   * 点击 modal 帷幕时是否请求关闭。
   *
   * @type {boolean}
   * @default true
   */
  closeOnBack: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示可拖动的顶部把手。
   *
   * @type {boolean}
   * @default true
   */
  dragHandle: {
    type: Boolean,
    default: true,
  },
  /**
   * 已展开的 standard 状态下拖动把手的可访问名称，用于 max、full 或自定义高度。
   *
   * @type {string}
   * @default '折叠底部面板'
   */
  collapseDragHandleLabel: {
    type: String,
    default: '折叠底部面板',
  },
  /**
   * 展开高度。min 固定 64px，normal 取内容自然高度并以可用高度一半封顶，max 按内容自然高度
   * 展开且不超过可用高度，full 使用当前可用最大高度；数字与纯数字字符串按 px 处理，
   * 其他字符串须为合法的 CSS block-size 值。
   *
   * @type {'min'|'normal'|'max'|'full'|number|string}
   * @default 'normal'
   */
  expanded: {
    type: [String, Number],
    default: 'normal',
    validator: (value) => ['min', 'normal', 'max'].includes(value)
      || value === 'full'
      || isValidCssBlockSize(value, { allowNegative: true }),
  },
  /**
   * 虚拟展开模式；开启后 normal 状态保留 min(内容高度, 可用高度) 的面板高度，
   * 内容区继续支持滚动，并在向下滚动或向上滑动时请求 max。
   *
   * @type {boolean}
   * @default false
   */
  virtualExpand: {
    type: Boolean,
    default: false,
  },
  /**
   * 折叠档（min 与 normal）下拖动把手的可访问名称。
   *
   * @type {string}
   * @default '展开底部面板'
   */
  dragHandleLabel: {
    type: String,
    default: '展开底部面板',
  },
  /**
   * 展开的 modal 状态下拖动把手的可访问名称。
   *
   * @type {string}
   * @default '关闭底部面板'
   */
  expandedDragHandleLabel: {
    type: String,
    default: '关闭底部面板',
  },
  /**
   * 是否允许通过把手拖动在 min、normal 与 max 之间切换，或向下拖动关闭。
   *
   * @type {boolean}
   * @default true
   */
  draggable: {
    type: Boolean,
    default: true,
  },
  /**
   * 纯文本内容便利属性；提供默认 Slot 时优先使用默认 Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  content: {
    type: String,
    default: undefined,
  },
  /**
   * 是否在 standard 布局中使用与 modal 相同的容器背景语义色；
   * modal 布局始终使用 modal 语义色，不受该属性影响。
   *
   * @type {boolean}
   * @default false
   */
  containerColor: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示 Material 3 level 1 阴影。
   *
   * @type {boolean}
   * @default true
   */
  shadow: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示顶部 extra-large 圆角。
   *
   * @type {boolean}
   * @default true
   */
  rounded: {
    type: Boolean,
    default: true,
  },
});
const propsWithDefaults = useMatProps('bottomSheet', props);
const attrs = useAttrs();
const instance = getCurrentInstance();
const hasExplicitAttach = Object.prototype.hasOwnProperty.call(
  instance?.vnode.props ?? {},
  'attach',
);
const forwardedProps = computed(() => {
  if (hasExplicitAttach) {
    return propsWithDefaults;
  }

  const forwarded = { ...propsWithDefaults };

  delete forwarded.attach;

  return forwarded;
});
const forwardedAttrs = computed(() => {
  const forwarded = { ...attrs };

  delete forwarded.closable;
  delete forwarded.closeLabel;
  delete forwarded.title;

  return forwarded;
});

const emit = defineEmits({
  /**
   * 请求关闭时发出 false。
   */
  'update:modelValue': (payload) => typeof payload === 'boolean',
  /**
   * 通过把手、拖动或内容手势请求切换高度时发出 min、normal 或 max。
   */
  'update:expanded': (payload) => payload === 'min'
    || payload === 'normal'
    || payload === 'max',
  /**
   * 进入动画完成后触发。
   */
  opened: () => true,
  /**
   * 退出动画和 DOM 清理完成后触发。
   */
  closed: () => true,
});
</script>

<template>
  <MatSheetBase
    v-bind="{ ...forwardedProps, ...forwardedAttrs }"
    component-name="MatBottomSheet"
    direction="bottom"
    @update:model-value="emit('update:modelValue', $event)"
    @update:expanded="emit('update:expanded', $event)"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <template v-if="$slots.activator" #activator>
      <slot name="activator" />
    </template>
    <template v-if="$slots['drag-handle']" #drag-handle>
      <slot name="drag-handle" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </MatSheetBase>
</template>
