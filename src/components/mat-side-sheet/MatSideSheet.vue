<script setup>
import MatSheetBase from '../MatSheetBase.vue';

defineOptions({
  name: 'MatSideSheet',
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
   * Sheet 所依附的逻辑边缘。
   *
   * @type {'start'|'end'}
   * @default 'end'
   */
  position: {
    type: String,
    default: 'end',
    validator: (value) => ['start', 'end'].includes(value),
  },
  /**
   * 首选宽度；数字按 px 处理，字符串接受 CSS 宽度值。
   *
   * @type {number | string}
   * @default 400
   */
  width: {
    type: [Number, String],
    default: 400,
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
   * 是否允许在触摸设备上向依附边缘滑动关闭。
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
   * @default true
   */
  closable: {
    type: Boolean,
    default: true,
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
    v-bind="props"
    component-name="MatSideSheet"
    direction="side"
    @update:model-value="emit('update:modelValue', $event)"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <template v-if="$slots.activator" #activator>
      <slot name="activator" />
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
