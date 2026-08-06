<script setup>
import MatSheetBase from '../MatSheetBase.vue';

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
    validator: (value) => Number.isFinite(value) && value > 0,
  },
  /**
   * 首选宽度；最终仍受 Material 3 的 640px 最大宽度约束。
   *
   * @type {number | string | undefined}
   * @default undefined
   */
  width: {
    type: [Number, String],
    default: undefined,
    validator(value) {
      if (typeof value === 'number') {
        return Number.isFinite(value) && value > 0;
      }

      return typeof value === 'string' && value.trim().length > 0;
    },
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
   * 展开的 standard 状态下拖动把手的可访问名称。
   *
   * @type {string}
   * @default '折叠底部面板'
   */
  collapseDragHandleLabel: {
    type: String,
    default: '折叠底部面板',
  },
  /**
   * 预设高度状态；false 为不超过半屏的预览状态，true 为展开状态。
   *
   * @type {boolean}
   * @default false
   */
  expanded: {
    type: Boolean,
    default: false,
  },
  /**
   * 预览状态下拖动把手的可访问名称。
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
   * 是否允许通过把手向上展开，以及向下折叠或关闭。
   *
   * @type {boolean}
   * @default true
   */
  draggable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示内置关闭按钮。
   *
   * @type {boolean}
   * @default false
   */
  closable: {
    type: Boolean,
    default: false,
  },
  /**
   * 内置关闭按钮的非空可访问名称。
   *
   * @type {string}
   * @default '关闭'
   */
  closeLabel: {
    type: String,
    default: '关闭',
  },
  /**
   * 简单标题；设置后优先于 title Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  title: {
    type: String,
    default: undefined,
  },
  /**
   * 简单正文；设置后优先于默认 Slot。
   *
   * @type {string | undefined}
   * @default undefined
   */
  content: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits({
  /**
   * 请求关闭时发出 false。
   */
  'update:modelValue': (payload) => typeof payload === 'boolean',
  /**
   * 通过把手请求切换预设高度时发出。
   */
  'update:expanded': (payload) => typeof payload === 'boolean',
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
    v-bind="{ ...props, ...$attrs }"
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
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </MatSheetBase>
</template>
