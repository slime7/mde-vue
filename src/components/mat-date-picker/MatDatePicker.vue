<script setup>
import { computed, ref, useAttrs, watch } from 'vue';
import { isComponentColor } from '../button-props';
import MatIcon from '../mat-icon/MatIcon.vue';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatDatePicker',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * `v-model` 当前选中的日期；本地时区当天 0 点的 Date，null 表示未选择。
   * 选择只关心日期，传入值的时间分量会被忽略。
   *
   * @type {Date | null}
   * @default null
   */
  modelValue: {
    type: Date,
    default: null,
    validator: (value) => value === null || value instanceof Date,
  },
  /**
   * Material 语义色、系统颜色角色或六位十六进制种子色；强调选中的日期与年份。
   *
   * @type {string | undefined}
   * @default undefined
   */
  color: {
    type: String,
    default: undefined,
    validator: isComponentColor,
  },
});
const propsWithDefaults = useMatProps('datePicker', props);

const emit = defineEmits({
  /**
   * 选择日期时发出下一个本地时区当天 0 点的 Date。
   */
  'update:modelValue'(value) {
    return value === null || value instanceof Date;
  },
});

const attrs = useAttrs();
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const gridElement = ref(null);
const viewMode = ref('day');
const viewMonth = ref(startOfMonth(propsWithDefaults.modelValue ?? new Date()));

watch(() => propsWithDefaults.modelValue, (value) => {
  if (value !== null) {
    viewMonth.value = startOfMonth(value);
  }
});

/**
 * @param {Date} date
 * @returns {Date}
 */
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * @param {Date} date
 * @param {number} days
 * @returns {Date}
 */
function addDays(date, days) {
  const result = new Date(date);

  result.setDate(result.getDate() + days);
  return result;
}

/**
 * @param {Date} first
 * @param {Date} second
 * @returns {boolean}
 */
function isSameDay(first, second) {
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

/**
 * @param {Date} date
 * @returns {string}
 */
function toIsoDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
}

const headlineFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'long',
});
const headerFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});
const weekdayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'narrow' });
const dayFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' });

const headline = computed(() => headlineFormatter.format(viewMonth.value));
const headerDate = computed(() => (
  headerFormatter.format(propsWithDefaults.modelValue ?? new Date())
));
const weekdayLabels = computed(() => Array.from({ length: 7 }, (_, index) => (
  weekdayFormatter.format(new Date(2023, 0, 1 + index))
)));

const gridWeeks = computed(() => {
  const year = viewMonth.value.getFullYear();
  const month = viewMonth.value.getMonth();
  const first = new Date(year, month, 1);
  const start = addDays(first, -first.getDay());
  const now = new Date();
  const selected = propsWithDefaults.modelValue;
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = addDays(start, index);

    return {
      iso: toIsoDate(date),
      label: String(date.getDate()),
      outside: date.getMonth() !== month,
      today: isSameDay(date, now),
      selected: selected !== null && isSameDay(date, selected),
    };
  });

  return Array.from({ length: 6 }, (_, week) => days.slice(week * 7, week * 7 + 7));
});
const gridHasSelection = computed(() => (
  gridWeeks.value.some((week) => week.some((day) => day.selected))
));
const years = computed(() => {
  const base = viewMonth.value.getFullYear();

  return Array.from({ length: 25 }, (_, index) => base - 12 + index);
});
const selectedYear = computed(() => (
  propsWithDefaults.modelValue?.getFullYear() ?? null
));

/**
 * @param {{iso: string, selected: boolean, today: boolean}} day
 * @returns {number}
 */
function dayTabIndex(day) {
  if (day.selected || (day.today && !gridHasSelection.value)) {
    return 0;
  }

  return -1;
}

/**
 * @param {{iso: string, outside: boolean}} day
 */
function selectDay(day) {
  const [year, month, date] = day.iso.split('-').map(Number);

  emit('update:modelValue', new Date(year, month - 1, date));
  viewMonth.value = new Date(year, month - 1, 1);
}

/**
 * @param {number} year
 */
function selectYear(year) {
  viewMonth.value = new Date(year, viewMonth.value.getMonth(), 1);
  viewMode.value = 'day';
}

/**
 * @param {number} delta
 */
function navigateMonth(delta) {
  viewMonth.value = new Date(
    viewMonth.value.getFullYear(),
    viewMonth.value.getMonth() + delta,
    1,
  );
}

/**
 * @param {KeyboardEvent} event
 */
function handleGridKeydown(event) {
  const deltas = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -7,
    ArrowDown: 7,
  };
  const delta = deltas[event.key];

  if (delta === undefined || !gridElement.value) {
    return;
  }

  const target = event.target.closest?.('[data-mat-date]');

  if (!target) {
    return;
  }

  event.preventDefault();

  const days = [...gridElement.value.querySelectorAll('[data-mat-date]')];
  const next = days[Math.min(Math.max(days.indexOf(target) + delta, 0), days.length - 1)];

  next?.focus();
}
</script>

<template>
  <div
    v-bind="attrs"
    class="mat-date-picker"
    :style="colorStyle"
  >
    <header class="mat-date-picker__header">
      {{ headerDate }}
    </header>

    <div
      v-if="viewMode === 'day'"
      class="mat-date-picker__calendar"
    >
      <div class="mat-date-picker__toolbar">
        <button
          type="button"
          class="mat-date-picker__headline"
          data-mat-calendar-action="toggle-year"
          :aria-label="viewMode === 'day' ? '选择年份' : '返回日历'"
          @click="viewMode = viewMode === 'day' ? 'year' : 'day'"
        >
          <span>{{ headline }}</span>
          <MatIcon
            v-if="viewMode === 'day'"
            aria-hidden="true"
            icon="expand_more"
            size="20px"
          />
        </button>

        <div class="mat-date-picker__nav">
          <button
            type="button"
            class="mat-date-picker__action"
            data-mat-calendar-action="previous"
            aria-label="上一个月"
            @click="navigateMonth(-1)"
          >
            <MatIcon
              aria-hidden="true"
              icon="chevron_left"
              size="20px"
            />
          </button>
          <button
            type="button"
            class="mat-date-picker__action"
            data-mat-calendar-action="next"
            aria-label="下一个月"
            @click="navigateMonth(1)"
          >
            <MatIcon
              aria-hidden="true"
              icon="chevron_right"
              size="20px"
            />
          </button>
        </div>
      </div>

      <div
        class="mat-date-picker__weekdays"
        aria-hidden="true"
      >
        <span
          v-for="label in weekdayLabels"
          :key="label"
          class="mat-date-picker__weekday"
        >{{ label }}</span>
      </div>

      <div
        ref="gridElement"
        class="mat-date-picker__grid"
        role="grid"
        :aria-label="headline"
        @keydown="handleGridKeydown"
      >
        <div
          v-for="(week, weekIndex) in gridWeeks"
          :key="weekIndex"
          role="row"
          class="mat-date-picker__row"
        >
          <div
            v-for="day in week"
            :key="day.iso"
            role="gridcell"
            class="mat-date-picker__cell"
          >
            <button
              type="button"
              class="mat-date-picker__day"
              :class="{
                'mat-date-picker__day--outside': day.outside,
                'mat-date-picker__day--selected': day.selected,
                'mat-date-picker__day--today': day.today,
              }"
              :tabindex="dayTabIndex(day)"
              :aria-label="dayFormatter.format(new Date(day.iso.replace(/-/g, '/')))"
              :aria-pressed="day.selected ? 'true' : 'false'"
              :aria-current="day.today ? 'date' : undefined"
              :data-mat-date="day.iso"
              @click="selectDay(day)"
            >
              {{ day.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="mat-date-picker__years"
    >
      <button
        v-for="year in years"
        :key="year"
        type="button"
        class="mat-date-picker__year"
        :class="{ 'mat-date-picker__year--selected': year === selectedYear }"
        :aria-pressed="year === selectedYear ? 'true' : 'false'"
        :data-mat-year="year"
        @click="selectYear(year)"
      >
        {{ year }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-date-picker {
    box-sizing: border-box;
    inline-size: 328px;
    max-inline-size: 100%;
    padding-block: 24px 16px;
    padding-inline: 24px;
    color: var(--mat-sys-color-on-surface);
    user-select: none;
  }

  .mat-date-picker__header {
    margin-block-end: 12px;
    padding-block-end: 16px;
    border-block-end: 1px solid var(--mat-sys-color-outline-variant);
    font-size: var(--mat-sys-typescale-headline-large-size);
    font-weight: var(--mat-sys-typescale-headline-large-weight);
    line-height: var(--mat-sys-typescale-headline-large-line-height);
  }

  .mat-date-picker__toolbar {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-block-end: 12px;
  }

  .mat-date-picker__headline {
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    box-sizing: border-box;
    min-block-size: 40px;
    padding: 0 12px;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
    background: none;
    color: inherit;
    font-size: var(--mat-sys-typescale-label-large-size);
    font-weight: var(--mat-sys-typescale-label-large-weight);
    text-align: start;
  }

  .mat-date-picker__nav {
    display: flex;
    flex-shrink: 0;
    gap: 4px;
  }

  .mat-date-picker__action {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    inline-size: 40px;
    min-block-size: 40px;
    padding: 0;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
    background: none;
    color: var(--mat-sys-color-on-surface-variant);
  }

  .mat-date-picker__headline::before,
  .mat-date-picker__action::before,
  .mat-date-picker__year::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: currentcolor;
    opacity: 0;
    pointer-events: none;
  }

  .mat-date-picker__headline:hover::before,
  .mat-date-picker__action:hover::before,
  .mat-date-picker__year:hover::before {
    opacity: var(--mat-sys-state-hover-state-layer-opacity);
  }

  .mat-date-picker__headline:active::before,
  .mat-date-picker__action:active::before,
  .mat-date-picker__year:active::before {
    opacity: var(--mat-sys-state-pressed-state-layer-opacity);
  }

  .mat-date-picker__headline:focus-visible,
  .mat-date-picker__action:focus-visible,
  .mat-date-picker__day:focus-visible,
  .mat-date-picker__year:focus-visible {
    outline: var(--mat-sys-interaction-focus-ring-width) solid var(--mat-sys-color-secondary);
    outline-offset: var(--mat-sys-interaction-focus-ring-offset);
    z-index: 1;
  }

  .mat-date-picker__calendar {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mat-date-picker__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 40px);
    justify-content: center;
  }

  .mat-date-picker__grid {
    display: grid;
    grid-template-columns: repeat(7, 40px);
    justify-content: center;
    row-gap: 4px;
  }

  .mat-date-picker__weekday {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 40px;
    block-size: 40px;
    color: var(--mat-sys-color-on-surface-variant);
    font-size: var(--mat-sys-typescale-label-medium-size);
    font-weight: var(--mat-sys-typescale-label-medium-weight);
  }

  .mat-date-picker__row,
  .mat-date-picker__cell {
    display: contents;
  }

  .mat-date-picker__day {
    position: relative;
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
    color: inherit;
    font-size: var(--mat-sys-typescale-body-medium-size);
    font-weight: var(--mat-sys-typescale-body-medium-weight);
  }

  .mat-date-picker__day::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: currentcolor;
    opacity: 0;
    pointer-events: none;
  }

  .mat-date-picker__day:hover::before {
    opacity: var(--mat-sys-state-hover-state-layer-opacity);
  }

  .mat-date-picker__day:active::before {
    opacity: var(--mat-sys-state-pressed-state-layer-opacity);
  }

  .mat-date-picker__day--outside {
    color: var(--mat-sys-color-on-surface-variant);
    opacity: .6;
  }

  .mat-date-picker__day--today {
    color: var(--mat-accent-color, var(--mat-sys-color-primary));
    box-shadow: inset 0 0 0 1px var(--mat-accent-color, var(--mat-sys-color-primary));
  }

  .mat-date-picker__day--selected {
    background: var(--mat-accent-color, var(--mat-sys-color-primary));
    color: var(--mat-on-accent-color, var(--mat-sys-color-on-primary));
  }

  .mat-date-picker__years {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    max-block-size: 344px;
    padding-block: 4px;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .mat-date-picker__year {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-block-size: 48px;
    padding: 0 8px;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-full);
    background: none;
    color: inherit;
    font-size: var(--mat-sys-typescale-body-large-size);
    font-weight: var(--mat-sys-typescale-body-large-weight);
  }

  .mat-date-picker__year--selected {
    background: var(--mat-accent-container-color, var(--mat-sys-color-primary-container));
    color: var(--mat-on-accent-container-color, var(--mat-sys-color-on-primary-container));
    font-weight: var(--mat-sys-typescale-title-medium-weight);
  }
}
</style>
