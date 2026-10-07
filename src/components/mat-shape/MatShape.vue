<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { isComponentColor } from '../button-props';
import { isHtmlTagName } from '../icon-props';
import { getShapeMorphPolygon } from '../shape-morph';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength, toCssLength } from '../value-utils';
import { isShapeName, SHAPE_PATHS } from './shape-paths';

defineOptions({
  name: 'MatShape',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Material 3 Expressive 预定义形状名称。
   *
   * @type {string}
   * @default 'circle'
   */
  name: {
    type: String,
    default: 'circle',
    validator: isShapeName,
  },
  /**
   * 形状边长；数字与纯数字字符串按 px 处理，其他字符串须为合法正 CSS 长度。
   *
   * @type {number | string}
   * @default 48
   */
  size: {
    type: [Number, String],
    default: 48,
    validator: (value) => isValidCssLength(value, {
      property: 'width',
      positive: true,
    }),
  },
  /**
   * Material 语义色、系统颜色角色或六位十六进制种子色。
   *
   * @type {string}
   * @default 'primary'
   */
  color: {
    type: String,
    default: 'primary',
    validator: isComponentColor,
  },
  /**
   * 形状根元素标签名。
   *
   * @type {string}
   * @default 'div'
   */
  as: {
    type: String,
    default: 'div',
    validator: isHtmlTagName,
  },
  /**
   * 是否在 `name` 切换时以同拓扑轮廓动画过渡到目标形状；关闭时立即切换。
   *
   * @type {boolean}
   * @default false
   */
  morph: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('shape', props);
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const root = ref(null);
let morphAnimation;
const resolvedSize = computed(() => toCssLength(propsWithDefaults.size, {
  property: 'width',
  positive: true,
  fallback: '48px',
}));
const resolvedName = computed(() => (
  isShapeName(propsWithDefaults.name) ? propsWithDefaults.name : 'circle'
));
const rootStyle = computed(() => ({
  ...colorStyle.value,
  inlineSize: resolvedSize.value,
  blockSize: resolvedSize.value,
  clipPath: SHAPE_PATHS[resolvedName.value],
}));

function prefersReducedMotion() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function stopMorphAnimation() {
  morphAnimation?.cancel();
  morphAnimation = undefined;
}

/**
 * 解析变形动画的时长与缓动。
 *
 * @param {Element} target
 * @returns {{duration: number, easing: string}}
 */
function resolveMorphMotion(target) {
  const token = globalThis.getComputedStyle?.(target)
    .getPropertyValue('--mat-sys-motion-spring-default-spatial')
    .trim();
  const match = /^(\d+(?:\.\d+)?)ms\s+(.+)$/.exec(token ?? '');

  if (match) {
    return {
      duration: Number(match[1]),
      easing: match[2],
    };
  }

  return {
    duration: 500,
    easing: 'cubic-bezier(.38, 1.21, .22, 1)',
  };
}

/**
 * @param {string} previousName
 * @param {string} nextName
 */
function playShapeMorph(previousName, nextName) {
  const target = root.value;
  const targetPolygon = getShapeMorphPolygon(nextName);
  const previousPolygon = getShapeMorphPolygon(previousName);

  if (!target || !targetPolygon || !previousPolygon) {
    stopMorphAnimation();
    return;
  }

  if (typeof target.animate !== 'function' || prefersReducedMotion()) {
    stopMorphAnimation();
    return;
  }

  let fromClipPath = previousPolygon;

  /* 正在执行动画时从当前插值轮廓继续。 */
  if (morphAnimation?.playState === 'running') {
    const currentClipPath = globalThis.getComputedStyle?.(target).clipPath;

    if (currentClipPath) {
      fromClipPath = currentClipPath;
    }
  }

  stopMorphAnimation();

  const motion = resolveMorphMotion(target);

  morphAnimation = target.animate(
    [{ clipPath: fromClipPath }, { clipPath: targetPolygon }],
    { duration: motion.duration, easing: motion.easing },
  );
}

watch(resolvedName, (nextName, previousName) => {
  if (!propsWithDefaults.morph || previousName === undefined) {
    return;
  }

  playShapeMorph(previousName, nextName);
});

onBeforeUnmount(() => {
  stopMorphAnimation();
});
</script>

<template>
  <component
    :is="propsWithDefaults.as"
    ref="root"
    v-bind="$attrs"
    class="mat-shape"
    :style="rootStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-shape {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
    background: var(--mat-accent-color);
    color: var(--mat-on-accent-color);
    vertical-align: middle;
  }
}
</style>
