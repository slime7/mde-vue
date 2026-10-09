<script setup>
import { computed, inject, useSlots } from 'vue';
import { getTypographyClass } from '../typography';
import { useMatProps } from '../use-mat-props';
import MatActionBase from '../MatActionBase.vue';
import MatBadge from '../mat-badge/MatBadge.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import { MAT_TABS_KEY } from './tabs-context';

defineOptions({
  name: 'MatTabItem',
});

const props = defineProps({
  /**
   * 标签页的稳定值，与容器 `modelValue` 和对应 `mat-tab-content` 的 `value` 匹配；
   * 省略时该项不可被选中。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * 标签文字；省略时使用默认 Slot 内容。
   *
   * @type {string | undefined}
   * @default undefined
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * Material Symbols 图标文本；primary 渲染在文本上方，secondary 与文本水平并排。
   *
   * @type {string | undefined}
   * @default undefined
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * 图标或标签上的 Badge 配置，支持 `content`、`dot` 与 `color`。
   *
   * @type {{ content?: string | number, dot?: boolean, color?: string } | undefined}
   * @default undefined
   */
  badge: {
    type: Object,
    default: undefined,
  },
  /**
   * 禁止该标签页被激活。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('tabItem', props);

const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const tabs = inject(MAT_TABS_KEY, null);
const selected = computed(() => tabs?.isSelected(propsWithDefaults.value) ?? false);
const isSecondary = computed(() => tabs?.variant.value === 'secondary');
const hasIcon = computed(() => Boolean(
  slots.icon || (propsWithDefaults.icon && propsWithDefaults.icon.trim()),
));
const hasLabel = computed(() => Boolean(
  slots.default || (propsWithDefaults.label && propsWithDefaults.label.trim()),
));

const showsStackedIcon = computed(() => hasIcon.value && !isSecondary.value);
const showsInlineIcon = computed(() => hasIcon.value && isSecondary.value);

const typographyClass = computed(() => getTypographyClass('label', 'large'));
const itemClasses = computed(() => ({
  'mat-tab-item': true,
  'mat-tab-item--selected': selected.value,
  'mat-tab-item--disabled': propsWithDefaults.disabled,
  'mat-tab-item--secondary': isSecondary.value,
  'mat-tab-item--primary': !isSecondary.value,
  'mat-tab-item--stacked': showsStackedIcon.value,
  'mat-tab-item--with-icon': hasIcon.value,
}));

const iconBadgeOffset = computed(() => ({ inline: 6, block: 0 }));

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
  if (!propsWithDefaults.disabled) {
    tabs?.requestSelection(propsWithDefaults.value);
  }

  if (propsWithDefaults.disabled) {
    event.preventDefault();
  }
}
</script>

<template>
  <MatActionBase
    v-bind="$attrs"
    class="mat-tab-item"
    :class="itemClasses"
    role="tab"
    :aria-selected="selected ? 'true' : 'false'"
    :disabled="propsWithDefaults.disabled"
    :focus-ring="false"
    type="button"
    :use-cursor="matUi.useCursor"
    @click="handleClick"
  >
    <span class="mat-tab-item__content">
      <template v-if="showsStackedIcon">
        <MatBadge
          v-if="badge"
          class="mat-tab-item__icon-badge"
          :color="badge.color"
          :content="badge.content"
          :dot="badge.dot"
          :offset="iconBadgeOffset"
          location="top-end"
        >
          <slot
            v-if="slots.icon"
            name="icon"
            :selected="selected"
          />

          <MatIcon
            v-else
            :fill="selected ? 1 : 0"
            :icon="propsWithDefaults.icon"
            class="mat-tab-item__icon"
            aria-hidden="true"
          />
        </MatBadge>

        <template v-else>
          <slot
            v-if="slots.icon"
            name="icon"
            :selected="selected"
          />

          <MatIcon
            v-else
            :fill="selected ? 1 : 0"
            :icon="propsWithDefaults.icon"
            class="mat-tab-item__icon"
            aria-hidden="true"
          />
        </template>

        <span
          v-if="hasLabel"
          class="mat-tab-item__label"
          :class="typographyClass"
        >
          <slot>{{ propsWithDefaults.label }}</slot>
        </span>
      </template>

      <template v-else>
        <span
          v-if="showsInlineIcon"
          class="mat-tab-item__icon-wrap"
        >
          <slot
            v-if="slots.icon"
            name="icon"
            :selected="selected"
          />

          <MatIcon
            v-else
            :fill="selected ? 1 : 0"
            :icon="propsWithDefaults.icon"
            class="mat-tab-item__icon"
            aria-hidden="true"
          />
        </span>

        <span
          v-if="hasLabel"
          class="mat-tab-item__label-wrap"
        >
          <span
            class="mat-tab-item__label"
            :class="typographyClass"
          >
            <slot>{{ propsWithDefaults.label }}</slot>
          </span>

          <MatBadge
            v-if="badge"
            class="mat-tab-item__inline-badge"
            :color="badge.color"
            :content="badge.content"
            :dot="badge.dot"
            location="inline"
          />
        </span>

        <MatBadge
          v-else-if="badge"
          class="mat-tab-item__inline-badge"
          :color="badge.color"
          :content="badge.content"
          :dot="badge.dot"
          location="inline"
        />
      </template>
    </span>
  </MatActionBase>
</template>

<style scoped>
@layer mde.components {
  .mat-tab-item {
    --mat-tab-item-indicator-color: var(--mat-accent-color, var(--mat-sys-color-primary));
    --mat-tab-item-selected-content-color: var(--mat-accent-color, var(--mat-sys-color-primary));
    --mat-tab-item-content-color: var(--mat-sys-color-on-surface-variant);
    --mat-tab-item-state-color: var(--mat-sys-color-on-surface);

    /* 关闭 MatActionBase 宿主状态层，状态层由本组件自绘。 */
    --mat-action-state-color: transparent;
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    flex: 1 1 0;
    min-inline-size: var(--mat-tab-item-min-inline-size, 90px);
    min-block-size: var(--mat-tab-item-height, 48px);
    block-size: var(--mat-tab-item-height, 48px);
    align-items: center;
    justify-content: center;
    padding-inline: var(--mat-tab-item-inline-space, 16px);
    padding-block: 0;
    color: var(--mat-tab-item-content-color);
    text-align: center;
    text-decoration: none;
    background: transparent;
    border: 0;
  }

  /* primary 变体 */
  .mat-tab-item--primary {
    --mat-tab-item-height: 48px;
    --mat-tab-item-state-inset: 0;
    --mat-tab-item-state-radius: 0;
    --mat-tab-item-focus-inset: 4px;
    --mat-tab-item-focus-radius: 8px;
  }

  /* primary 带图标时为 64px 堆叠 */
  .mat-tab-item--primary.mat-tab-item--stacked {
    --mat-tab-item-height: 64px;
  }

  /* secondary 始终 48px：内缩圆角矩形状态层与配套焦点环 */
  .mat-tab-item--secondary {
    --mat-tab-item-height: 48px;
    --mat-tab-item-state-inset: 4px 8px;
    --mat-tab-item-state-radius: 8px;
    --mat-tab-item-focus-inset: 2px 6px;
    --mat-tab-item-focus-radius: 10px;
  }

  /* 状态层 */
  .mat-tab-item::before {
    position: absolute;
    inset: var(--mat-tab-item-state-inset, 0);
    border-radius: var(--mat-tab-item-state-radius, 0);
    content: '';
    background: var(--mat-tab-item-state-color);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  @media (hover: hover) {
    .mat-tab-item:not(:disabled):hover::before {
      opacity: var(--mat-sys-state-hover-state-layer-opacity);
    }
  }

  .mat-tab-item:not(:disabled):active::before {
    opacity: var(--mat-sys-state-pressed-state-layer-opacity);
  }

  /* 焦点环自绘：标准 outline 为矩形，无法贴合内缩圆角状态层。 */
  .mat-tab-item:focus-visible {
    outline: none;
  }

  .mat-tab-item::after {
    position: absolute;
    inset: var(--mat-tab-item-focus-inset, 4px);
    box-sizing: border-box;
    border: var(--mat-sys-interaction-focus-ring-width, 3px) solid var(--mat-sys-color-secondary);
    border-radius: var(--mat-tab-item-focus-radius, 8px);
    content: '';
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-tab-item:focus-visible::after {
    opacity: 1;
  }

  .mat-tab-item__content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-inline-size: 0;
  }

  .mat-tab-item--stacked .mat-tab-item__content {
    flex-direction: column;
    gap: 4px;
  }

  .mat-tab-item__icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .mat-tab-item__icon {
    font-size: var(--mat-tab-item-icon-size, 24px);
    color: inherit;
  }

  .mat-tab-item__label-wrap {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-inline-size: 0;
  }

  .mat-tab-item__label {
    min-inline-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 20px;
  }

  .mat-tab-item--selected {
    color: var(--mat-tab-item-selected-content-color);
  }

  .mat-tab-item--disabled {
    cursor: default;
    opacity: var(--mat-sys-state-disabled-content-opacity);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-tab-item,
    .mat-tab-item::before,
    .mat-tab-item::after {
      transition: none;
    }
  }
}
</style>
