<script setup>
import {
  computed, inject, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import { BUTTON_TYPES } from '../button-props';
import { MAT_LIST_GROUP_ACTIVATOR_KEY, MAT_LIST_KEY } from '../list-context';
import { useMatProps } from '../use-mat-props';
import MatListItemContent from './MatListItemContent.vue';

defineOptions({
  name: 'MatListItem',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 选择或拖动排序中的稳定项目值。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * 设置后渲染原生链接，否则渲染 button。
   *
   * @type {string | undefined}
   * @default undefined
   */
  href: {
    type: String,
    default: undefined,
  },
  /**
   * button 模式下的原生类型；可选值为 `button`、`submit`、`reset`。
   *
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   */
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return BUTTON_TYPES.includes(value);
    },
  },
  /**
   * 禁止项目被激活。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 内容行数；可选值为 `1`、`2`、`3`。
   *
   * @type {1 | 2 | 3 | undefined}
   * @default undefined
   */
  lines: {
    type: Number,
    default: undefined,
    validator(value) {
      return [1, 2, 3].includes(value);
    },
  },
  /**
   * 是否将 trailing 插槽与主操作/选择区分离渲染为独立操作区。
   *
   * @type {boolean}
   * @default false
   */
  separateTrailing: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('listItem', props);

const emit = defineEmits({
  /**
   * 启用的列表项被用户激活时转发原生点击事件，载荷为 `MouseEvent`。
   */
  click(payload) {
    return payload instanceof MouseEvent;
  },
});
const slots = useSlots();
const list = inject(MAT_LIST_KEY, null);
const groupActivator = inject(MAT_LIST_GROUP_ACTIVATOR_KEY, null);
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const interaction = computed(() => list?.interaction.value ?? 'none');
const isAction = computed(() => (
  interaction.value === 'single-action' || interaction.value === 'multi-action'
));
const isMultiAction = computed(() => interaction.value === 'multi-action');
const isSelectable = computed(() => list?.isSelectable.value ?? false);
const selected = computed(() => list?.isSelected(propsWithDefaults.value) ?? false);
const hasTrailing = computed(() => Boolean(slots.trailing));
const shouldSeparateTrailing = computed(() => (
  hasTrailing.value && (isMultiAction.value || (isSelectable.value && propsWithDefaults.separateTrailing))
));
const itemRoot = ref(null);
const dragToken = Symbol('mat-list-item-drag');
const dragElement = computed(() => {
  if (itemRoot.value instanceof HTMLElement) {
    return itemRoot.value;
  }

  return itemRoot.value?.$el instanceof HTMLElement ? itemRoot.value.$el : null;
});
const dragValue = computed(() => propsWithDefaults.value);
const dragDisabled = computed(() => propsWithDefaults.disabled || Boolean(groupActivator));
const lineCount = computed(() => {
  if (propsWithDefaults.lines !== undefined) {
    return propsWithDefaults.lines;
  }

  const additionalLines = Number(Boolean(slots.overline)) + Number(Boolean(slots.supporting));

  return Math.min(3, 1 + additionalLines);
});
const surfaceClasses = computed(() => ({
  'mat-list-item--disabled': propsWithDefaults.disabled,
  'mat-list-item--selected': selected.value,
  [`mat-list-item--lines-${lineCount.value}`]: true,
}));

/**
 * @param {MouseEvent} event
 */
function handlePrimaryClick(event) {
  if (isSelectable.value) {
    list?.requestSelection(propsWithDefaults.value, event);
    return;
  }

  if (isAction.value) {
    emit('click', event);
  }
}

function handleGroupActivatorClick() {
  if (!propsWithDefaults.disabled) {
    groupActivator?.toggle();
  }
}

/**
 * @param {KeyboardEvent} event
 */
function handleOptionKeyDown(event) {
  if (propsWithDefaults.disabled || event.repeat || ![' ', 'Enter'].includes(event.key)) {
    return;
  }

  event.preventDefault();
  list?.requestSelection(propsWithDefaults.value, event);
}

function validateProps() {
  if (propsWithDefaults.href !== undefined && !groupActivator && !isAction.value) {
    console.warn('MatListItem: href 仅在 single-action 或 multi-action 模式下生效');
  }
}

onMounted(async () => {
  validateProps();
  list?.registerDragItem?.({
    token: dragToken,
    element: dragElement,
    value: dragValue,
    disabled: dragDisabled,
  });
  await nextTick();
  list?.requestFocusRefresh();
});
onBeforeUnmount(() => {
  list?.unregisterDragItem?.(dragToken);
});
watch(
  () => [
    propsWithDefaults.disabled,
    propsWithDefaults.href,
    propsWithDefaults.value,
    interaction.value,
    propsWithDefaults.separateTrailing,
  ],
  async () => {
    validateProps();
    list?.requestDragValidation?.();
    await nextTick();
    list?.requestFocusRefresh();
  },
);
</script>

<template>
  <div
    v-if="groupActivator?.static.value"
    ref="itemRoot"
    v-bind="$attrs"
    :id="groupActivator.labelId"
    class="mat-list-item mat-list-item__surface mat-list-item--static"
    :class="surfaceClasses"
    data-mat-list-group-label
    :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
  >
    <MatListItemContent
      :line-count="lineCount"
      :presentation-slots="false"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>
      <template v-if="$slots.overline" #overline>
        <slot name="overline" />
      </template>
      <slot />
      <template v-if="$slots.supporting" #supporting>
        <slot name="supporting" />
      </template>
      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </MatListItemContent>
  </div>

  <MatActionBase
    v-else-if="groupActivator"
    ref="itemRoot"
    v-bind="$attrs"
    class="mat-list-item mat-list-item__surface mat-list-item__primary mat-list-item--group-activator"
    :class="surfaceClasses"
    data-mat-list-primary
    data-mat-list-group-activator
    :aria-controls="groupActivator.contentId"
    :aria-expanded="groupActivator.expanded.value ? 'true' : 'false'"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :disabled="propsWithDefaults.disabled"
    :focus-ring="true"
    type="button"
    :use-cursor="matUi.useCursor"
    @click="handleGroupActivatorClick"
  >
    <MatListItemContent
      :line-count="lineCount"
      :presentation-slots="false"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>
      <template v-if="$slots.overline" #overline>
        <slot name="overline" />
      </template>
      <slot />
      <template v-if="$slots.supporting" #supporting>
        <slot name="supporting" />
      </template>
      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </MatListItemContent>
  </MatActionBase>

  <li
    v-else-if="interaction === 'none'"
    ref="itemRoot"
    v-bind="$attrs"
    class="mat-list-item mat-list-item__surface mat-list-item--static"
    :class="surfaceClasses"
    :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
  >
    <MatListItemContent
      :line-count="lineCount"
      :presentation-slots="false"
    >
      <template
        v-if="$slots.leading"
        #leading
      >
        <slot name="leading" />
      </template>

      <template
        v-if="$slots.overline"
        #overline
      >
        <slot name="overline" />
      </template>

      <slot />

      <template
        v-if="$slots.supporting"
        #supporting
      >
        <slot name="supporting" />
      </template>

      <template
        v-if="$slots.trailing"
        #trailing
      >
        <slot name="trailing" />
      </template>
    </MatListItemContent>
  </li>

  <li
    v-else-if="isAction"
    ref="itemRoot"
    class="mat-list-item"
    :class="[
      surfaceClasses,
      {
        'mat-list-item__surface': isMultiAction,
        'mat-list-item--multi-action': isMultiAction,
      },
    ]"
    :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
  >
    <MatActionBase
      v-bind="$attrs"
      class="mat-list-item__primary"
      :class="{ 'mat-list-item__surface': !isMultiAction }"
      data-mat-list-primary
      :disabled="propsWithDefaults.disabled"
      :focus-ring="true"
      :href="propsWithDefaults.href"
      :type="propsWithDefaults.type"
      :use-cursor="matUi.useCursor"
      @click="handlePrimaryClick"
    >
      <MatListItemContent
        :line-count="lineCount"
        :presentation-slots="false"
        :separate-trailing="isMultiAction && hasTrailing"
      >
        <template
          v-if="$slots.leading"
          #leading
        >
          <slot name="leading" />
        </template>

        <template
          v-if="$slots.overline"
          #overline
        >
          <slot name="overline" />
        </template>

        <slot />

        <template
          v-if="$slots.supporting"
          #supporting
        >
          <slot name="supporting" />
        </template>

        <template
          v-if="$slots.trailing"
          #trailing
        >
          <slot name="trailing" />
        </template>
      </MatListItemContent>
    </MatActionBase>

    <span
      v-if="isMultiAction && hasTrailing"
      class="mat-list-item__separate-trailing mat-sys-typescale-label-small"
      data-mat-list-trailing
      :inert="propsWithDefaults.disabled ? '' : undefined"
    >
      <slot name="trailing" />
    </span>
  </li>

  <div
    v-else-if="isSelectable && shouldSeparateTrailing"
    ref="itemRoot"
    class="mat-list-item mat-list-item__surface mat-list-item--multi-action mat-list-item--selectable"
    :class="surfaceClasses"
    :aria-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
  >
    <MatActionBase
      v-bind="$attrs"
      as="div"
      class="mat-list-item__primary"
      data-mat-list-primary
      :aria-selected="selected ? 'true' : 'false'"
      :disabled="propsWithDefaults.disabled"
      :focus-ring="true"
      role="option"
      :use-cursor="matUi.useCursor"
      @click="handlePrimaryClick"
      @keydown="handleOptionKeyDown"
    >
      <MatListItemContent
        :line-count="lineCount"
        presentation-slots
        :separate-trailing="true"
      >
        <template
          v-if="$slots.leading"
          #leading
        >
          <slot name="leading" />
        </template>

        <template
          v-if="$slots.overline"
          #overline
        >
          <slot name="overline" />
        </template>

        <slot />

        <template
          v-if="$slots.supporting"
          #supporting
        >
          <slot name="supporting" />
        </template>
      </MatListItemContent>
    </MatActionBase>

    <span
      class="mat-list-item__separate-trailing mat-sys-typescale-label-small"
      data-mat-list-trailing
      :inert="propsWithDefaults.disabled ? '' : undefined"
    >
      <slot name="trailing" />
    </span>
  </div>

  <MatActionBase
    v-else
    ref="itemRoot"
    v-bind="$attrs"
    as="div"
    class="mat-list-item mat-list-item__surface mat-list-item--selectable"
    :class="surfaceClasses"
    data-mat-list-primary
    :data-mat-list-disabled="propsWithDefaults.disabled ? 'true' : undefined"
    :aria-selected="selected ? 'true' : 'false'"
    :disabled="propsWithDefaults.disabled"
    :focus-ring="true"
    role="option"
    :use-cursor="matUi.useCursor"
    @click="handlePrimaryClick"
    @keydown="handleOptionKeyDown"
  >
    <MatListItemContent
      :line-count="lineCount"
      presentation-slots
    >
      <template
        v-if="$slots.leading"
        #leading
      >
        <slot name="leading" />
      </template>

      <template
        v-if="$slots.overline"
        #overline
      >
        <slot name="overline" />
      </template>

      <slot />

      <template
        v-if="$slots.supporting"
        #supporting
      >
        <slot name="supporting" />
      </template>

      <template
        v-if="$slots.trailing"
        #trailing
      >
        <slot name="trailing" />
      </template>
    </MatListItemContent>
  </MatActionBase>
</template>

<style scoped>
@layer mde.components {
  .mat-list-item {
    --mat-list-item-start-start-shape: var(--mat-list-item-container-shape);
    --mat-list-item-start-end-shape: var(--mat-list-item-container-shape);
    --mat-list-item-end-start-shape: var(--mat-list-item-container-shape);
    --mat-list-item-end-end-shape: var(--mat-list-item-container-shape);
    display: block;
    box-sizing: border-box;
    min-inline-size: 0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .mat-list-item__surface {
    --mat-action-state-color: var(--mat-list-item-state-layer-color);
    --mat-list-item-label-color: var(--mat-list-item-label-text-color);
    --mat-list-item-supporting-color: var(--mat-list-item-supporting-text-color);
    overflow: clip;
    overflow-clip-margin: 5px;
    inline-size: 100%;
    color: var(--mat-list-item-label-color);
    text-align: start;
    text-decoration: none;
    background: var(--mat-list-item-container-color);
    border: 0;
    border-start-start-radius: var(--mat-list-item-start-start-shape);
    border-start-end-radius: var(--mat-list-item-start-end-shape);
    border-end-start-radius: var(--mat-list-item-end-start-shape);
    border-end-end-radius: var(--mat-list-item-end-end-shape);
    transition: border-radius var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-list-item:focus-visible,
  .mat-list-item:has(:focus-visible) {
    position: relative;
    z-index: 2;
  }

  .mat-list-item__primary {
    --mat-action-state-color: var(--mat-list-item-state-layer-color);
    display: block;
    min-inline-size: 0;
    padding: 0;
    color: inherit;
    text-align: start;
    text-decoration: none;
    border: 0;
    border-radius: inherit;
  }

  .mat-list-item__primary.mat-list-item__surface {
    border-start-start-radius: var(--mat-list-item-start-start-shape);
    border-start-end-radius: var(--mat-list-item-start-end-shape);
    border-end-start-radius: var(--mat-list-item-end-start-shape);
    border-end-end-radius: var(--mat-list-item-end-end-shape);
  }

  .mat-list-item--multi-action {
    overflow: visible;
    display: flex;
    gap: var(--mat-list-item-content-gap);
    align-items: center;
  }

  .mat-list-item--multi-action .mat-list-item__primary {
    flex: 1 1 auto;
    background: transparent;
  }

  .mat-list-item__separate-trailing {
    --mat-list-item-trailing-action-space: 8px;
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 auto;
    gap: var(--mat-list-item-trailing-action-gap);
    align-items: center;
    box-sizing: border-box;
    min-block-size: var(--mat-sys-interaction-target-min-size);
    padding-inline-end: var(--mat-list-item-trailing-action-space);
    color: var(--mat-list-item-supporting-color);
  }

  .mat-list-item--selected {
    --mat-list-item-container-color: var(--mat-accent-container-color, var(--mat-list-item-selected-container-color));
    --mat-list-item-label-color: var(--mat-on-accent-container-color, var(--mat-list-item-selected-label-text-color));
    --mat-list-item-supporting-color: var(--mat-on-accent-container-color, var(--mat-list-item-selected-supporting-text-color));
    border-radius: var(--mat-list-item-selected-container-shape);
  }

  .mat-list-item--disabled :deep(.mat-list-item-content) {
    opacity: var(--mat-list-item-disabled-content-opacity);
  }

  .mat-list-item--disabled.mat-list-item--selected {
    --mat-list-item-container-color: color-mix(
      in srgb,
      var(--mat-sys-color-on-surface) var(--mat-list-item-disabled-selected-container-opacity),
      var(--mat-sys-color-surface)
    );
    --mat-list-item-label-color: var(--mat-sys-color-on-surface);
    --mat-list-item-supporting-color: var(--mat-sys-color-on-surface);
  }

  .mat-list-item__surface:not(.mat-list-item--static):not(.mat-list-item--disabled):focus-visible,
  .mat-list-item__surface:not(.mat-list-item--static):not(.mat-list-item--disabled):active,
  .mat-list-item__surface[data-mat-state-layer-pressed] {
    border-radius: var(--mat-list-item-interactive-container-shape);
  }

  .mat-list-item--multi-action:not(.mat-list-item--disabled):has(.mat-list-item__primary:focus-visible),
  .mat-list-item--multi-action:not(.mat-list-item--disabled):has(.mat-list-item__primary:active),
  .mat-list-item--multi-action:has(.mat-list-item__primary[data-mat-state-layer-pressed]) {
    border-radius: var(--mat-list-item-interactive-container-shape);
  }

  @media (hover: hover) {
    .mat-list-item__surface:not(.mat-list-item--static):not(.mat-list-item--disabled):hover {
      border-radius: var(--mat-list-item-hover-container-shape);
    }

    .mat-list-item--selected:not(.mat-list-item--disabled):hover {
      border-radius: var(--mat-list-item-selected-container-shape);
    }

    .mat-list-item--multi-action:not(.mat-list-item--disabled):has(.mat-list-item__primary:hover) {
      border-radius: var(--mat-list-item-hover-container-shape);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-list-item__surface {
      transition-duration: 0s;
    }
  }
}
</style>
