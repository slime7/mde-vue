<script setup>
import {
  computed,
  ref,
  watch,
} from 'vue';
import { isHtmlTagName } from '../icon-props';
import { useMatProps } from '../use-mat-props';

const STAGGER_MS = 25;
const ANIMATION_DURATION_FALLBACK_MS = 300;

defineOptions({
  name: 'MatDynamicText',
});

const props = defineProps({
  /**
   * 需要展示和动态切换的单行文本或数值。
   *
   * @type {string | number}
   * @default ''
   */
  text: {
    type: [String, Number],
    default: '',
  },
  /**
   * 实际根元素标签名。
   *
   * @type {string}
   * @default 'span'
   */
  as: {
    type: String,
    default: 'span',
    validator: isHtmlTagName,
  },
  /**
   * 是否仅对发生变化的字符执行切换动画。
   *
   * @type {boolean}
   * @default true
   */
  diff: {
    type: Boolean,
    default: true,
  },
  /**
   * 首次挂载时是否执行入场动画。
   *
   * @type {boolean}
   * @default false
   */
  appear: {
    type: Boolean,
    default: false,
  },
});

const propsWithDefaults = useMatProps('dynamicText', props);

let nextColumnId = 0;
const columns = ref([]);
const animationTimers = new Map();

const accessibleLabel = computed(() => {
  const value = propsWithDefaults.text;
  return normalizeText(value);
});

/**
 * 将输入规范化为单行文本，换行统一替换为普通空格。
 *
 * @param {unknown} value
 * @returns {string}
 */
function normalizeText(value) {
  const text = value === undefined || value === null ? '' : String(value);
  return text.replace(/[\r\n]+/g, ' ');
}

/**
 * 判断用户是否请求减少动效。
 *
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return typeof globalThis.matchMedia === 'function'
    && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 安全地将输入拆分为字符（支持 Emoji 与组合字符）。
 *
 * @param {unknown} value
 * @returns {string[]}
 */
function splitGraphemes(value) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return [];
  }

  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(normalized), (segment) => segment.segment);
  }

  return Array.from(normalized);
}

/**
 * 立即提交并清理全部正在进行的动画状态。
 */
function commitAllAnimations() {
  animationTimers.forEach((timer) => clearTimeout(timer));
  animationTimers.clear();
  columns.value = columns.value
    .filter((col) => col.char)
    .map((col) => ({
      ...col,
      oldChar: null,
      animating: false,
    }));
}

/**
 * 清理某个字符列动画结束后的状态。
 *
 * @param {number} colId
 */
function handleAnimationEnd(colId) {
  const timer = animationTimers.get(colId);

  if (timer) {
    clearTimeout(timer);
    animationTimers.delete(colId);
  }

  const col = columns.value.find((item) => item.id === colId);

  if (!col) {
    return;
  }

  if (!col.char) {
    columns.value = columns.value.filter((item) => item.id !== colId);
  } else {
    col.oldChar = null;
    col.animating = false;
  }
}

/**
 * 为指定字符列安排动画结束清理任务。
 *
 * @param {number} colId
 * @param {number} index
 */
function scheduleCommit(colId, index) {
  const delay = (index * STAGGER_MS) + ANIMATION_DURATION_FALLBACK_MS;
  const timer = setTimeout(() => handleAnimationEnd(colId), delay);
  animationTimers.set(colId, timer);
}

/**
 * 初始化字符列。
 *
 * @param {string | number} rawText
 * @param {boolean} shouldAnimate
 * @returns {Array<object>}
 */
function createInitialColumns(rawText, shouldAnimate) {
  const chars = splitGraphemes(rawText);
  const animate = shouldAnimate && !prefersReducedMotion();

  return chars.map((char, index) => {
    const id = (nextColumnId += 1);

    const col = {
      id,
      char,
      oldChar: null,
      animating: animate,
      index,
      key: animate ? `${index}-${char}-${id}` : `${index}-${char}`,
    };

    if (col.animating) {
      scheduleCommit(id, index);
    }

    return col;
  });
}

/**
 * 根据新文本更新字符列状态。
 *
 * @param {string | number} newRawText
 * @param {boolean} shouldAnimate
 */
function updateText(newRawText, shouldAnimate) {
  commitAllAnimations();

  const newChars = splitGraphemes(newRawText);
  const oldChars = columns.value.map((col) => col.char);
  const animate = shouldAnimate && !prefersReducedMotion();
  const maxLength = Math.max(oldChars.length, newChars.length);
  const nextCols = [];

  for (let index = 0; index < maxLength; index += 1) {
    const oldChar = oldChars[index];
    const newChar = newChars[index];

    if (newChar !== undefined) {
      const unchanged = propsWithDefaults.diff && oldChar === newChar;
      const animating = animate && !unchanged;
      const id = (nextColumnId += 1);

      nextCols.push({
        id,
        char: newChar,
        oldChar: animating && oldChar !== undefined ? oldChar : null,
        animating,
        index,
        key: `${index}-${newChar}-${id}`,
      });

      if (animating) {
        scheduleCommit(id, index);
      }
    } else if (oldChar !== undefined && animate) {
      const id = (nextColumnId += 1);

      nextCols.push({
        id,
        char: '',
        oldChar,
        animating: true,
        index,
        key: `${index}-remove-${id}`,
      });
      scheduleCommit(id, index);
    }
  }

  columns.value = nextCols;
}

columns.value = createInitialColumns(propsWithDefaults.text, propsWithDefaults.appear);

watch(
  () => propsWithDefaults.text,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      updateText(newVal, true);
    }
  },
);
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    class="mat-dynamic-text"
    :aria-label="accessibleLabel"
  >
    <span
      v-for="col in columns"
      :key="col.key"
      class="mat-dynamic-text__column"
      :style="{ '--mat-dynamic-text-index': col.index }"
      :data-char="col.char || col.oldChar || ''"
      aria-hidden="true"
      @animationend="handleAnimationEnd(col.id)"
    >
      <span class="mat-dynamic-text__stage">
        <span
          v-if="col.char"
          class="mat-dynamic-text__char"
          :class="col.animating ? 'mat-dynamic-text__char--entering' : 'mat-dynamic-text__char--idle'"
        >
          {{ col.char }}
        </span>

        <span
          v-if="col.oldChar"
          class="mat-dynamic-text__char mat-dynamic-text__char--exiting"
        >
          {{ col.oldChar }}
        </span>
      </span>
    </span>
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-dynamic-text {
    display: inline-flex;
    align-items: baseline;
    font: inherit;
    color: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    white-space: pre;
    vertical-align: baseline;
  }

  .mat-dynamic-text__column {
    position: relative;
    display: inline-block;
    height: 1em;
    line-height: 1;
    vertical-align: baseline;
  }

  .mat-dynamic-text__column::before {
    content: attr(data-char);
    visibility: hidden;
  }

  .mat-dynamic-text__stage {
    position: absolute;
    inset: -.5em 0;
    overflow: hidden;
    mask-image: linear-gradient(
      to bottom,
      transparent 0,
      black .5em,
      black 1.5em,
      transparent 2em
    );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
  }

  .mat-dynamic-text__char {
    position: absolute;
    top: .5em;
    right: 0;
    left: 0;
    height: 1em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .mat-dynamic-text__char--entering {
    animation: mat-dynamic-text-slide-in var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-emphasized-accelerate) both;
    animation-delay: calc(var(--mat-dynamic-text-index, 0) * 25ms);
    backface-visibility: hidden;
    will-change: transform, filter, opacity;
  }

  .mat-dynamic-text__char--exiting {
    animation: mat-dynamic-text-slide-out var(--mat-sys-motion-duration-medium2) var(--mat-sys-motion-easing-emphasized-accelerate) both;
    animation-delay: calc(var(--mat-dynamic-text-index, 0) * 25ms);
    backface-visibility: hidden;
    will-change: transform, filter, opacity;
  }

  @keyframes mat-dynamic-text-slide-in {
    0% {
      transform: translateY(100%);
      filter: blur(16px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      filter: blur(0);
      opacity: 1;
    }
  }

  @keyframes mat-dynamic-text-slide-out {
    0% {
      transform: translateY(0);
      filter: blur(0);
      opacity: 1;
    }

    100% {
      transform: translateY(-100%);
      filter: blur(16px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-dynamic-text__char {
      animation: none !important;
      transform: none !important;
      filter: none !important;
      opacity: 1 !important;
    }

    .mat-dynamic-text__char--exiting {
      display: none !important;
    }
  }
}
</style>
