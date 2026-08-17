<script setup>
import {
  Comment,
  computed,
  inject,
  ref,
  useAttrs,
  useId,
  useSlots,
  watchEffect,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatButtonBase from '../MatButtonBase.vue';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatTooltip from '../mat-tooltip/MatTooltip.vue';
import {
  FAB_SIZES,
  FAB_TYPES,
  isFabColor,
} from '../fab-props';
import { getTypographyClass } from '../typography';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatFab',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * FAB 尺寸；可选值为 `small`、`medium`、`large`。
   *
   * @type {'small' | 'medium' | 'large'}
   * @default 'medium'
   */
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return FAB_SIZES.includes(value);
    },
  },
  /**
   * FAB 图标的 Material Symbols 文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  icon: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || value.trim().length > 0;
    },
  },
  /**
   * Extended FAB 的按钮标签；图标模式用作无障碍名称。
   *
   * @type {string | undefined}
   * @default undefined
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * 是否显示默认 Slot 标签；设为 false 时，同一个 Extended FAB 收缩为纯图标 FAB。
   *
   * @type {boolean}
   * @default true
   */
  expanded: {
    type: Boolean,
    default: true,
  },
  /**
   * FAB 颜色角色；可选值为 `primary`、`secondary`、`tertiary`、`primary-container`、`secondary-container`、`tertiary-container`、`error`、`error-container`。
   *
   * @type {string}
   * @default 'primary-container'
   */
  color: {
    type: String,
    default: 'primary-container',
    validator: isFabColor,
  },
  /**
   * 禁用原生按钮交互。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生按钮类型；可选值为 `button`、`submit`、`reset`。
   *
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   */
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return FAB_TYPES.includes(value);
    },
  },
  /**
   * 是否自动挂载到最近 MatAppRoot 的普通浮动组。
   *
   * @type {boolean}
   * @default false
   */
  app: {
    type: Boolean,
    default: false,
  },
  /**
   * app=true 时在浮动组中的逻辑轴对齐位置。
   *
   * @type {'start' | 'center' | 'end'}
   * @default 'end'
   */
  position: {
    type: String,
    default: 'end',
    validator(value) {
      return ['start', 'center', 'end'].includes(value);
    },
  },
});
const propsWithDefaults = useMatProps('fab', props);

const emit = defineEmits({
  /**
   * 启用的 FAB 被用户激活时转发原生点击事件，载荷为 `MouseEvent`。
   */
  click(payload) {
    return payload instanceof MouseEvent;
  },
});
const attrs = useAttrs();
const slots = useSlots();
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const appContext = inject(MAT_APP_ROOT_KEY, null);
const buttonElement = ref(null);
const generatedId = useId();

const hasLabelContent = computed(() => {
  const nodes = slots.default?.() ?? [];

  return nodes.some((node) => {
    if (node.type === Comment) {
      return false;
    }

    return typeof node.children !== 'string' || node.children.trim().length > 0;
  });
});
const hasLabel = computed(() => propsWithDefaults.expanded && hasLabelContent.value);
const isIcon = computed(() => typeof propsWithDefaults.icon === 'string'
  && propsWithDefaults.icon.trim().length > 0);
const isIconOnly = computed(() => !hasLabel.value);
const tooltipContent = computed(() => (
  isIconOnly.value ? (attrs.title ?? propsWithDefaults.label) : undefined
));
const ariaLabel = computed(() => (
  isIconOnly.value ? propsWithDefaults.label : attrs['aria-label']
));
const iconOpticalSize = computed(() => ({
  small: 24,
  medium: 28,
  large: 36,
}[propsWithDefaults.size]));
const typographyClass = computed(() => {
  const [type, size] = {
    small: ['title', 'medium'],
    medium: ['title', 'large'],
    large: ['headline', 'small'],
  }[propsWithDefaults.size];

  return getTypographyClass(type, size);
});
const colorStyle = computed(() => ({
  '--mat-fab-container-color': `var(--mat-sys-color-${propsWithDefaults.color})`,
  '--mat-fab-content-color': `var(--mat-sys-color-on-${propsWithDefaults.color})`,
  '--mat-fab-state-color': `var(--mat-sys-color-on-${propsWithDefaults.color})`,
}));
const usesAppRoot = computed(() => propsWithDefaults.app && Boolean(appContext));
const teleportTarget = computed(() => (
  usesAppRoot.value ? appContext.floatingLayer.value : null
));

watchEffect(() => {
  if (isIconOnly.value && (!isIcon.value
    || !propsWithDefaults.label
    || propsWithDefaults.label.trim().length === 0)) {
    console.warn('MatFab: 图标模式必须提供非空 label');
  }
});
</script>

<template>
  <MatButtonBase
    v-if="!usesAppRoot"
    ref="buttonElement"
    v-bind="$attrs"
    class="mat-fab"
    :class="[
      `mat-fab--size-${propsWithDefaults.size}`,
      typographyClass,
      {
        'mat-fab--extended': hasLabel,
        'mat-fab--icon-only': isIconOnly,
      },
    ]"
    :style="colorStyle"
    :aria-label="ariaLabel"
    :disabled="propsWithDefaults.disabled"
    :title="isIconOnly ? undefined : attrs.title"
    :type="propsWithDefaults.type"
    :use-cursor="matUi.useCursor"
    @click="emit('click', $event)"
  >
    <MatIcon
      v-if="isIcon"
      as="span"
      class="mat-fab__icon"
      :fill="1"
      :optical-size="iconOpticalSize"
      size="var(--mat-fab-icon-size)"
      aria-hidden="true"
    >
      {{ propsWithDefaults.icon }}
    </MatIcon>

    <span
      v-if="hasLabelContent"
      class="mat-fab__label"
      :aria-hidden="hasLabel ? undefined : 'true'"
    >
      <slot />
    </span>

    <MatTooltip
      v-if="isIconOnly && tooltipContent"
      :content="tooltipContent"
      :id="`${generatedId}-tooltip`"
      :target="buttonElement"
    />
  </MatButtonBase>

  <Teleport v-else-if="teleportTarget" :to="teleportTarget">
    <MatButtonBase
      ref="buttonElement"
      v-bind="$attrs"
      class="mat-fab"
      :class="[
        `mat-fab--size-${propsWithDefaults.size}`,
        `mat-fab--position-${propsWithDefaults.position}`,
        typographyClass,
        {
          'mat-fab--app-root': true,
          'mat-fab--extended': hasLabel,
          'mat-fab--icon-only': isIconOnly,
        },
      ]"
      :style="colorStyle"
      :aria-label="ariaLabel"
      :disabled="propsWithDefaults.disabled"
      :title="isIconOnly ? undefined : attrs.title"
      :type="propsWithDefaults.type"
      :use-cursor="matUi.useCursor"
      @click="emit('click', $event)"
    >
      <MatIcon
        v-if="isIcon"
        as="span"
        class="mat-fab__icon"
        :fill="1"
        :optical-size="iconOpticalSize"
        size="var(--mat-fab-icon-size)"
        aria-hidden="true"
      >
        {{ propsWithDefaults.icon }}
      </MatIcon>

      <span
        v-if="hasLabelContent"
        class="mat-fab__label"
        :aria-hidden="hasLabel ? undefined : 'true'"
      >
        <slot />
      </span>

      <MatTooltip
        v-if="isIconOnly && tooltipContent"
        :content="tooltipContent"
        :id="`${generatedId}-tooltip`"
        :target="buttonElement"
      />
    </MatButtonBase>
  </Teleport>
</template>

<style scoped>
@layer mde.components {
  .mat-fab {
    --mat-button-container-color: var(--mat-fab-container-color);
    --mat-button-content-color: var(--mat-fab-content-color);
    --mat-button-state-color: var(--mat-fab-state-color);
    --mat-button-container-elevation: var(--mat-fab-rest-container-elevation);
    --mat-button-radius: var(--mat-fab-container-shape);
    --mat-button-pressed-radius: var(--mat-fab-container-shape);
    gap: var(--mat-fab-icon-label-space);
    interpolate-size: allow-keywords;
    min-inline-size: calc(var(--mat-fab-leading-space) + var(--mat-fab-trailing-space));
    padding-inline: var(--mat-fab-leading-space) var(--mat-fab-trailing-space);
    text-align: center;
    text-decoration: none;
  }

  .mat-fab--app-root {
    pointer-events: auto;
  }

  .mat-fab--app-root.mat-fab--position-start {
    align-self: flex-start;
  }

  .mat-fab--app-root.mat-fab--position-center {
    align-self: center;
  }

  .mat-fab--app-root.mat-fab--position-end {
    align-self: flex-end;
  }

  .mat-fab--size-small {
    --mat-button-container-height: var(--mat-fab-small-container-height);
    --mat-fab-icon-size: var(--mat-fab-small-icon-size);
    --mat-fab-leading-space: var(--mat-fab-small-leading-space);
    --mat-fab-trailing-space: var(--mat-fab-small-trailing-space);
    --mat-fab-icon-label-space: var(--mat-fab-small-icon-label-space);
  }

  .mat-fab--size-medium {
    --mat-button-container-height: var(--mat-fab-medium-container-height);
    --mat-fab-icon-size: var(--mat-fab-medium-icon-size);
    --mat-fab-leading-space: var(--mat-fab-medium-leading-space);
    --mat-fab-trailing-space: var(--mat-fab-medium-trailing-space);
    --mat-fab-icon-label-space: var(--mat-fab-medium-icon-label-space);
  }

  .mat-fab--size-large {
    --mat-button-container-height: var(--mat-fab-large-container-height);
    --mat-fab-icon-size: var(--mat-fab-large-icon-size);
    --mat-fab-leading-space: var(--mat-fab-large-leading-space);
    --mat-fab-trailing-space: var(--mat-fab-large-trailing-space);
    --mat-fab-icon-label-space: var(--mat-fab-large-icon-label-space);
  }

  .mat-fab--icon-only {
    --mat-button-container-width: var(--mat-button-container-height);
    --mat-fab-leading-space: 0;
    --mat-fab-trailing-space: 0;
    gap: 0;
  }

  .mat-fab--extended {
    --mat-button-container-width: auto;
    max-inline-size: 100%;
  }

  .mat-fab--extended .mat-fab__label {
    opacity: 1;
    visibility: visible;
    transition: inline-size var(--mat-sys-motion-spring-fast-spatial), opacity var(--mat-sys-motion-spring-fast-effects), visibility 0s;
  }

  .mat-fab--icon-only .mat-fab__label {
    inline-size: 0;
    opacity: 0;
    visibility: hidden;
  }

  .mat-fab__icon,
  .mat-fab__label {
    position: relative;
    z-index: 1;
  }

  .mat-fab__icon {
    display: inline-flex;
    flex: 0 0 auto;
    inline-size: var(--mat-fab-icon-size);
    block-size: var(--mat-fab-icon-size);
    align-items: center;
    justify-content: center;
    color: var(--mat-fab-content-color);
  }

  .mat-fab__label {
    flex: 0 1 auto;
    inline-size: auto;
    min-inline-size: 0;
    overflow: hidden;
    white-space: nowrap;
    transition: inline-size var(--mat-sys-motion-spring-fast-spatial), opacity var(--mat-sys-motion-spring-fast-effects), visibility 0s linear var(--mat-sys-motion-duration-short3);
  }

  @media (hover: hover) {
    .mat-fab:not(:disabled):hover {
      --mat-button-container-elevation: var(--mat-fab-hover-container-elevation);
    }
  }

  .mat-fab:disabled {
    --mat-button-container-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-container-opacity) * 100%), transparent);
    --mat-button-content-color: color-mix(in srgb, var(--mat-sys-color-on-surface) calc(var(--mat-sys-state-disabled-content-opacity) * 100%), transparent);
    --mat-button-state-color: var(--mat-sys-color-on-surface);
    --mat-button-container-elevation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-fab__icon,
    .mat-fab__label {
      transition-duration: 0s;
      transition-delay: 0s;
    }
  }
}
</style>
