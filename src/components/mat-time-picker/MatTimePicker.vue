<script>
/** 24 小时制 `HH:mm` 字符串格式。 */
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
</script>

<script setup>
import { computed, ref, useAttrs, watch } from 'vue';
import { isComponentColor } from '../button-props';
import MatIcon from '../mat-icon/MatIcon.vue';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatTimePicker',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 当前选中的时间；24 小时制 `HH:mm` 字符串，null 表示未选择。
   *
   * @type {string | null}
   * @default null
   */
  modelValue: {
    type: String,
    default: null,
    validator: (value) => value === null || (typeof value === 'string' && TIME_PATTERN.test(value)),
  },
  /**
   * Material 语义色、系统颜色角色或六位十六进制种子色；强调读出、表盘指针与选中刻度。
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
   * 时间显示制式，可选 '24h' 或 '12h'。
   *
   * @type {'24h' | '12h'}
   * @default '24h'
   */
  format: {
    type: String,
    default: '24h',
    validator: (value) => ['24h', '12h'].includes(value),
  },
  /**
   * 是否为 24 小时制。若显式提供，优先级高于 format。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  is24Hour: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 当前交互模式，可选 'dial' 或 'input'。
   *
   * @type {'dial' | 'input'}
   * @default 'dial'
   */
  mode: {
    type: String,
    default: 'dial',
    validator: (value) => ['dial', 'input'].includes(value),
  },
  /**
   * 是否在面板中显示模式切换按钮。
   *
   * @type {boolean}
   * @default false
   */
  showModeToggle: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('timePicker', props);

const emit = defineEmits({
  /**
   * 小时或分钟变化时发出下一个 24 小时制 `HH:mm` 字符串。
   */
  'update:modelValue'(value) {
    return typeof value === 'string' && TIME_PATTERN.test(value);
  },
  /**
   * 模式改变时发出新模式。
   */
  'update:mode'(value) {
    return ['dial', 'input'].includes(value);
  },
});

const attrs = useAttrs();
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const dialElement = ref(null);
const activePart = ref('hour');
const currentMode = ref(propsWithDefaults.mode);
let dragging = false;

watch(() => propsWithDefaults.mode, (nextMode) => {
  currentMode.value = nextMode;
});

const is24HourFormat = computed(() => (
  propsWithDefaults.is24Hour !== undefined
    ? propsWithDefaults.is24Hour
    : propsWithDefaults.format === '24h'
));

const hour = computed(() => (
  propsWithDefaults.modelValue === null ? 0 : Number(propsWithDefaults.modelValue.slice(0, 2))
));
const minute = computed(() => (
  propsWithDefaults.modelValue === null ? 0 : Number(propsWithDefaults.modelValue.slice(3, 5))
));

const isPm = computed(() => hour.value >= 12);
const displayHour = computed(() => {
  if (is24HourFormat.value) {
    return hour.value;
  }
  const h = hour.value % 12;
  return h === 0 ? 12 : h;
});

const activeValue = computed(() => (
  activePart.value === 'hour' ? displayHour.value : minute.value
));
const activeMin = computed(() => (
  activePart.value === 'hour' && !is24HourFormat.value ? 1 : 0
));
const activeMax = computed(() => {
  if (activePart.value === 'hour') {
    return is24HourFormat.value ? 23 : 12;
  }
  return 59;
});

/**
 * @param {number} value
 * @returns {string}
 */
function pad2(value) {
  return String(value).padStart(2, '0');
}

/**
 * @param {number} nextHour
 * @param {number} nextMinute
 */
function setTime(nextHour, nextMinute) {
  emit('update:modelValue', `${pad2(nextHour)}:${pad2(nextMinute)}`);
}

/**
 * @param {'AM' | 'PM'} period
 */
function setPeriod(period) {
  if (period === 'PM' && !isPm.value) {
    setTime(hour.value + 12, minute.value);
  } else if (period === 'AM' && isPm.value) {
    setTime(hour.value - 12, minute.value);
  }
}

function toggleMode() {
  const next = currentMode.value === 'dial' ? 'input' : 'dial';
  currentMode.value = next;
  emit('update:mode', next);
}

/**
 * @param {number} delta
 */
function adjustActive(delta) {
  if (activePart.value === 'hour') {
    if (!is24HourFormat.value) {
      const nextDisplay = ((displayHour.value - 1 + delta + 12) % 12) + 1;
      let nextHour = nextDisplay === 12 ? 0 : nextDisplay;
      if (isPm.value) {
        nextHour = nextDisplay === 12 ? 12 : nextDisplay + 12;
      }
      setTime(nextHour, minute.value);
      return;
    }
    setTime((hour.value + delta + 24) % 24, minute.value);
    return;
  }

  setTime(hour.value, (minute.value + delta + 60) % 60);
}

/**
 * @param {number} value
 */
function selectTick(value) {
  if (activePart.value === 'hour') {
    if (!is24HourFormat.value) {
      let nextHour = value === 12 ? 0 : value;
      if (isPm.value) {
        nextHour = value === 12 ? 12 : value + 12;
      }
      setTime(nextHour, minute.value);
      activePart.value = 'minute';
      return;
    }
    setTime(value, minute.value);
    activePart.value = 'minute';
    return;
  }

  setTime(hour.value, value);
}

/**
 * @param {KeyboardEvent} event
 */
function handleDialKeydown(event) {
  const deltas = {
    ArrowUp: 1,
    ArrowRight: 1,
    ArrowDown: -1,
    ArrowLeft: -1,
  };

  if (event.key in deltas) {
    event.preventDefault();
    adjustActive(deltas[event.key]);
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    adjustActive(activeMin.value - activeValue.value);
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    adjustActive(activeMax.value - activeValue.value);
    return;
  }

  if ((event.key === 'Enter' || event.key === ' ') && activePart.value === 'hour') {
    event.preventDefault();
    activePart.value = 'minute';
  }
}

/**
 * 由指针相对表盘中心的角度与半径计算当前视图的时间值。
 *
 * @param {PointerEvent} event
 * @returns {number}
 */
function valueFromPointer(event) {
  const rect = dialElement.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const offsetX = event.clientX - centerX;
  const offsetY = event.clientY - centerY;
  let angle = (Math.atan2(offsetY, offsetX) * 180) / Math.PI + 90;

  if (angle < 0) {
    angle += 360;
  }

  if (activePart.value === 'minute') {
    return Math.round(angle / 6) % 60;
  }

  const position12 = Math.round(angle / 30) % 12;
  if (!is24HourFormat.value) {
    const val = position12 === 0 ? 12 : position12;
    if (isPm.value) {
      return val === 12 ? 12 : val + 12;
    }
    return val === 12 ? 0 : val;
  }

  const inner = Math.hypot(offsetX, offsetY) / (rect.width / 2) < 0.45;

  if (inner) {
    return position12 === 0 ? 12 : position12;
  }

  return position12 === 0 ? 0 : 12 + position12;
}

/**
 * @param {PointerEvent} event
 */
function applyPointer(event) {
  const value = valueFromPointer(event);

  if (activePart.value === 'hour') {
    setTime(value, minute.value);
    return;
  }

  setTime(hour.value, value);
}

/**
 * @param {PointerEvent} event
 */
function handleDialPointerDown(event) {
  if (event.pointerType === 'mouse' && event.button !== 0) {
    return;
  }

  dragging = true;
  dialElement.value.setPointerCapture?.(event.pointerId);
  applyPointer(event);
}

/**
 * @param {PointerEvent} event
 */
function handleDialPointerMove(event) {
  if (dragging) {
    applyPointer(event);
  }
}

/**
 * @param {PointerEvent} event
 */
function handleDialPointerUp(event) {
  if (!dragging) {
    return;
  }

  dragging = false;
  applyPointer(event);

  if (activePart.value === 'hour') {
    activePart.value = 'minute';
  }
}

function handleDialPointerCancel() {
  dragging = false;
}

const ticks = computed(() => {
  if (activePart.value === 'hour') {
    const items = [];

    if (!is24HourFormat.value) {
      for (let value = 1; value <= 12; value += 1) {
        items.push({
          value,
          label: String(value),
          angle: value * 30,
          radius: 40,
        });
      }
      return items;
    }

    for (let value = 1; value <= 12; value += 1) {
      items.push({
        value,
        label: String(value),
        angle: value * 30,
        radius: 27,
      });
    }

    items.push({
      value: 0,
      label: '00',
      angle: 0,
      radius: 40,
    });

    for (let value = 13; value <= 23; value += 1) {
      items.push({
        value,
        label: String(value),
        angle: (value - 12) * 30,
        radius: 40,
      });
    }

    return items;
  }

  return Array.from({ length: 12 }, (_, index) => ({
    value: index * 5,
    label: pad2(index * 5),
    angle: index * 30,
    radius: 40,
  }));
});
const handAngle = computed(() => (
  activePart.value === 'hour'
    ? (hour.value % 12) * 30
    : minute.value * 6
));
const handReach = computed(() => {
  if (activePart.value === 'minute') {
    return 40;
  }

  if (!is24HourFormat.value) {
    return 40;
  }

  return hour.value === 0 || hour.value >= 13 ? 40 : 27;
});
const handStyle = computed(() => ({
  transform: `translate(-50%, -50%) rotate(${handAngle.value}deg)`,
  '--mat-time-picker-hand-reach': `${handReach.value}%`,
}));
</script>

<template>
  <div
    v-bind="attrs"
    class="mat-time-picker"
    :style="colorStyle"
  >
    <div
      class="mat-time-picker__readout"
      role="group"
      aria-label="当前时间"
    >
      <button
        type="button"
        class="mat-time-picker__part"
        :class="{ 'mat-time-picker__part--active': activePart === 'hour' }"
        data-mat-time-part="hour"
        :aria-pressed="activePart === 'hour' ? 'true' : 'false'"
        @click="activePart = 'hour'"
      >
        {{ pad2(displayHour) }}
      </button>
      <span
        class="mat-time-picker__colon"
        aria-hidden="true"
      >:</span>
      <button
        type="button"
        class="mat-time-picker__part"
        :class="{ 'mat-time-picker__part--active': activePart === 'minute' }"
        data-mat-time-part="minute"
        :aria-pressed="activePart === 'minute' ? 'true' : 'false'"
        @click="activePart = 'minute'"
      >
        {{ pad2(minute) }}
      </button>

      <div
        v-if="!is24HourFormat"
        class="mat-time-picker__period"
        role="radiogroup"
        aria-label="时段"
      >
        <button
          type="button"
          class="mat-time-picker__period-btn"
          :class="{ 'mat-time-picker__period-btn--selected': !isPm }"
          role="radio"
          data-mat-time-period="AM"
          :aria-checked="!isPm ? 'true' : 'false'"
          @click="setPeriod('AM')"
        >
          AM
        </button>
        <button
          type="button"
          class="mat-time-picker__period-btn"
          :class="{ 'mat-time-picker__period-btn--selected': isPm }"
          role="radio"
          data-mat-time-period="PM"
          :aria-checked="isPm ? 'true' : 'false'"
          @click="setPeriod('PM')"
        >
          PM
        </button>
      </div>
    </div>

    <div
      v-if="currentMode === 'dial'"
      ref="dialElement"
      class="mat-time-picker__dial"
      role="slider"
      tabindex="0"
      data-mat-time-dial
      :aria-label="activePart === 'hour' ? '小时' : '分钟'"
      :aria-valuemin="activeMin"
      :aria-valuemax="activeMax"
      :aria-valuenow="activeValue"
      :aria-valuetext="activePart === 'hour' ? `${activeValue} 时` : `${activeValue} 分`"
      @keydown="handleDialKeydown"
      @pointerdown="handleDialPointerDown"
      @pointermove="handleDialPointerMove"
      @pointerup="handleDialPointerUp"
      @pointercancel="handleDialPointerCancel"
    >
      <span
        class="mat-time-picker__hand"
        :style="handStyle"
        aria-hidden="true"
      />
      <button
        v-for="tick in ticks"
        :key="`${tick.value}-${tick.radius}`"
        type="button"
        tabindex="-1"
        class="mat-time-picker__tick"
        :class="{ 'mat-time-picker__tick--selected': tick.value === activeValue }"
        :style="{
          insetInlineStart: `${50 + tick.radius * Math.sin((tick.angle * Math.PI) / 180)}%`,
          insetBlockStart: `${50 - tick.radius * Math.cos((tick.angle * Math.PI) / 180)}%`,
        }"
        @click.stop="selectTick(tick.value)"
      >
        {{ tick.label }}
      </button>
    </div>

    <div
      v-else
      class="mat-time-picker__input"
    >
      <slot name="input" />
    </div>

    <div
      v-if="propsWithDefaults.showModeToggle"
      class="mat-time-picker__actions"
    >
      <button
        type="button"
        class="mat-time-picker__mode-toggle"
        data-mat-time-action="toggle-mode"
        :aria-label="currentMode === 'dial' ? '切换为文本输入模式' : '切换为表盘选择模式'"
        @click="toggleMode"
      >
        <MatIcon
          :icon="currentMode === 'dial' ? 'keyboard' : 'schedule'"
          size="24px"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-time-picker {
    box-sizing: border-box;
    inline-size: 328px;
    max-inline-size: 100%;
    padding-block: 24px 16px;
    padding-inline: 24px;
    color: var(--mat-sys-color-on-surface);
    user-select: none;
  }

  .mat-time-picker__readout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-block-end: 24px;
  }

  .mat-time-picker__part {
    position: relative;
    box-sizing: border-box;
    min-inline-size: 76px;
    padding: 6px 4px;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-small);
    background: var(--mat-sys-color-surface-container-highest);
    color: var(--mat-sys-color-on-surface);
    font-size: var(--mat-sys-typescale-display-large-size);
    font-weight: var(--mat-sys-typescale-display-large-weight);
    line-height: var(--mat-sys-typescale-display-large-line-height);
    font-variant-numeric: tabular-nums;
    text-align: center;
    transition: background-color var(--mat-sys-motion-spring-fast-effects), color var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-time-picker__part--active {
    background: var(--mat-accent-color, var(--mat-sys-color-primary));
    color: var(--mat-on-accent-color, var(--mat-sys-color-on-primary));
  }

  .mat-time-picker__part:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: var(--mat-sys-interaction-focus-ring-offset);
  }

  .mat-time-picker__colon {
    color: var(--mat-sys-color-on-surface);
    font-size: var(--mat-sys-typescale-display-large-size);
    font-weight: var(--mat-sys-typescale-display-large-weight);
  }

  .mat-time-picker__period {
    display: flex;
    flex-direction: column;
    margin-inline-start: 8px;
    border: 1px solid var(--mat-sys-color-outline);
    border-radius: var(--mat-sys-shape-corner-small);
    overflow: hidden;
  }

  .mat-time-picker__period-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: 44px;
    block-size: 36px;
    padding: 0;
    border: 0;
    background: none;
    color: var(--mat-sys-color-on-surface-variant);
    font-size: var(--mat-sys-typescale-title-small-size);
    font-weight: var(--mat-sys-typescale-title-small-weight);
    line-height: 1;
    cursor: pointer;
    transition: background-color var(--mat-sys-motion-spring-fast-effects), color var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-time-picker__period-btn:first-child {
    border-block-end: 1px solid var(--mat-sys-color-outline);
  }

  .mat-time-picker__period-btn--selected {
    background: var(--mat-accent-container-color, var(--mat-sys-color-tertiary-container));
    color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-tertiary-container));
  }

  .mat-time-picker__period-btn:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: -1px;
    z-index: 1;
  }

  .mat-time-picker__dial {
    position: relative;
    box-sizing: border-box;
    inline-size: 100%;
    aspect-ratio: 1;
    border-radius: var(--mat-sys-shape-corner-full);
    background: var(--mat-sys-color-surface-container-highest);
    touch-action: none;
  }

  .mat-time-picker__dial:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: var(--mat-sys-interaction-focus-ring-offset);
  }

  .mat-time-picker__input {
    display: flex;
    align-items: center;
    justify-content: center;
    min-block-size: 200px;
  }

  .mat-time-picker__actions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-block-start: 16px;
  }

  .mat-time-picker__mode-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: 40px;
    block-size: 40px;
    padding: 0;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
    background: none;
    color: var(--mat-sys-color-on-surface-variant);
    cursor: pointer;
  }

  .mat-time-picker__mode-toggle:hover {
    background: var(--mat-sys-color-surface-container-highest);
  }

  .mat-time-picker__mode-toggle:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: var(--mat-sys-interaction-focus-ring-offset);
  }

  .mat-time-picker__hand {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    inline-size: 100%;
    block-size: 100%;
    pointer-events: none;
    transition: transform var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-time-picker__hand::before {
    content: '';
    position: absolute;
    inset-block-end: 50%;
    inset-inline-start: calc(50% - 1px);
    inline-size: 2px;
    block-size: var(--mat-time-picker-hand-reach, 40%);
    border-radius: var(--mat-sys-shape-corner-full);
    background: var(--mat-accent-color, var(--mat-sys-color-primary));
  }

  .mat-time-picker__hand::after {
    content: '';
    position: absolute;
    inset-block-start: calc(50% - 4px);
    inset-inline-start: calc(50% - 4px);
    box-sizing: border-box;
    inline-size: 8px;
    block-size: 8px;
    border-radius: var(--mat-sys-shape-corner-full);
    background: var(--mat-accent-color, var(--mat-sys-color-primary));
  }

  .mat-time-picker__tick {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: 32px;
    block-size: 32px;
    padding: 0;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
    background: none;
    color: var(--mat-sys-color-on-surface);
    font-size: var(--mat-sys-typescale-label-large-size);
    font-weight: var(--mat-sys-typescale-label-large-weight);
    transform: translate(-50%, -50%);
  }

  .mat-time-picker__tick--selected {
    background: var(--mat-accent-color, var(--mat-sys-color-primary));
    color: var(--mat-on-accent-color, var(--mat-sys-color-on-primary));
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-time-picker__hand,
    .mat-time-picker__part {
      transition: none;
    }
  }
}
</style>
