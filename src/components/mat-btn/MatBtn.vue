<script setup>
defineOptions({
  name: 'MatBtn',
  inheritAttrs: false,
});

/**
 * Material 3 风格的基础按钮，用于触发页面内操作。
 *
 * @example
 * <mat-btn variant="filled">保存</mat-btn>
 */
defineProps({
  /**
   * 按钮的视觉层级，默认为 filled。
   */
  variant: {
    type: String,
    default: 'filled',
    validator(value) {
      return ['elevated', 'filled', 'tonal', 'outlined', 'text'].includes(value);
    },
  },
  /**
   * 是否禁用按钮；禁用时原生 click 事件不会触发。
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生 button 类型，默认为 button，避免在表单中意外提交。
   */
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'submit', 'reset'].includes(value);
    },
  },
});
</script>

<template>
  <button
    v-bind="$attrs"
    class="mat-btn"
    :class="`mat-btn--${variant}`"
    :disabled="disabled"
    :type="type"
  >
    <span class="mat-btn__label"><slot /></span>
  </button>
</template>

<style scoped>
/*
 * 交互行为参考 mdui v2 button（MIT）：
 * https://github.com/zdhxiong/mdui/tree/818146c3e188580e2831873b4f245d864422552c
 * 本实现已针对 Vue 和本项目令牌体系重写。
 */

.mat-btn {
  --mat-btn-container-color: var(--mat-color-primary);
  --mat-btn-label-color: var(--mat-color-on-primary);
  --mat-btn-state-color: var(--mat-color-on-primary);
  --mat-btn-border-color: transparent;
  --mat-btn-shadow: none;
  position: relative;
  isolation: isolate;
  display: inline-flex;
  min-width: 64px;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  overflow: hidden;
  color: var(--mat-btn-label-color);
  font-family: var(--mat-type-label-large-font);
  font-size: var(--mat-type-label-large-size);
  font-weight: var(--mat-type-label-large-weight);
  line-height: var(--mat-type-label-large-line-height);
  letter-spacing: var(--mat-type-label-large-tracking);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  appearance: none;
  cursor: pointer;
  background-color: var(--mat-btn-container-color);
  border: 1px solid var(--mat-btn-border-color);
  border-radius: var(--mat-btn-radius, var(--mat-shape-corner-full));
  box-shadow: var(--mat-btn-shadow);
  transform: scale(1);
  transition-duration: var(--mat-motion-duration-short);
  transition-property: color, background-color, border-color, box-shadow, transform;
  transition-timing-function: var(--mat-motion-easing-standard);
  -webkit-tap-highlight-color: transparent;
}

.mat-btn::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: '';
  pointer-events: none;
  background-color: var(--mat-btn-state-color);
  opacity: 0;
  transition: opacity var(--mat-motion-duration-short) var(--mat-motion-easing-standard);
}

.mat-btn__label {
  position: relative;
}

.mat-btn--elevated {
  --mat-btn-container-color: var(--mat-color-surface-container-low);
  --mat-btn-label-color: var(--mat-color-primary);
  --mat-btn-state-color: var(--mat-color-primary);
  --mat-btn-shadow: var(--mat-shadow-level-1);
}

.mat-btn--tonal {
  --mat-btn-container-color: var(--mat-color-secondary-container);
  --mat-btn-label-color: var(--mat-color-on-secondary-container);
  --mat-btn-state-color: var(--mat-color-on-secondary-container);
}

.mat-btn--outlined {
  --mat-btn-container-color: transparent;
  --mat-btn-label-color: var(--mat-color-primary);
  --mat-btn-state-color: var(--mat-color-primary);
  --mat-btn-border-color: var(--mat-color-outline);
}

.mat-btn--text {
  --mat-btn-container-color: transparent;
  --mat-btn-label-color: var(--mat-color-primary);
  --mat-btn-state-color: var(--mat-color-primary);
  min-width: 48px;
  padding-inline: 12px;
}

@media (hover: hover) {
  .mat-btn:not(:disabled):hover::before {
    opacity: var(--mat-state-hover-opacity);
  }

  .mat-btn--elevated:not(:disabled):hover {
    --mat-btn-shadow: var(--mat-shadow-level-2);
  }
}

.mat-btn:not(:disabled):focus-visible {
  outline: 3px solid var(--mat-color-secondary);
  outline-offset: 2px;
}

.mat-btn:not(:disabled):focus-visible::before {
  opacity: var(--mat-state-focus-opacity);
}

.mat-btn:not(:disabled):active {
  transform: scale(.96);
}

.mat-btn:not(:disabled):active::before {
  opacity: var(--mat-state-pressed-opacity);
}

.mat-btn:disabled {
  --mat-btn-container-color: color-mix(in srgb, var(--mat-color-on-surface) 12%, transparent);
  --mat-btn-label-color: color-mix(in srgb, var(--mat-color-on-surface) 38%, transparent);
  --mat-btn-border-color: transparent;
  --mat-btn-shadow: none;
  cursor: not-allowed;
}

.mat-btn--outlined:disabled {
  --mat-btn-container-color: transparent;
  --mat-btn-border-color: color-mix(in srgb, var(--mat-color-on-surface) 12%, transparent);
}

.mat-btn--text:disabled {
  --mat-btn-container-color: transparent;
}

@media (prefers-reduced-motion: reduce) {
  .mat-btn,
  .mat-btn::before {
    transition-duration: 0s;
  }

  .mat-btn:not(:disabled):active {
    transform: none;
  }
}
</style>
