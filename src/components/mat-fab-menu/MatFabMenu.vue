<script setup>
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatButtonBase from '../MatButtonBase.vue';
import { MAT_APP_ROOT_KEY } from '../mat-app-root/mat-app-root-context';
import MatFab from '../mat-fab/MatFab.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatTooltip from '../mat-tooltip/MatTooltip.vue';
import {
  FAB_SIZES,
  FAB_TYPES,
  isFabColor,
} from '../fab-props';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatFabMenu',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 折叠状态下主 FAB 的尺寸；可选值为 `small`、`medium`、`large`。
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
   * 折叠状态下主 FAB 显示的 Material Symbols 图标。
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
   * 折叠状态下主 FAB 的无障碍名称与默认 Tooltip 文本。
   *
   * @type {string | undefined}
   * @default undefined
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * 展开状态下关闭按钮显示的 Material Symbols 图标。
   *
   * @type {string}
   * @default 'close'
   */
  closeIcon: {
    type: String,
    default: 'close',
  },
  /**
   * 展开状态下关闭按钮的无障碍名称与 Tooltip 文本；缺省时回退到 '关闭'。
   *
   * @type {string | undefined}
   * @default undefined
   */
  closeLabel: {
    type: String,
    default: undefined,
  },
  /**
   * 主 FAB 与关闭按钮的官方颜色角色；可选值为 `primary`、`secondary`、`tertiary`、`primary-container`、`secondary-container`、`tertiary-container`、`error`、`error-container`。
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
   * 禁用主按钮及菜单展开交互。
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
   * 控制菜单的展开与折叠状态。
   *
   * @type {boolean | undefined}
   * @default undefined
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 点击默认 Slot 内的按钮后是否自动收起菜单。
   *
   * @type {boolean}
   * @default true
   */
  closeOnClick: {
    type: Boolean,
    default: true,
  },
  /**
   * 按下 Escape 键时是否自动收起菜单。
   *
   * @type {boolean}
   * @default true
   */
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  /**
   * 点击菜单外部区域时是否自动收起菜单。
   *
   * @type {boolean}
   * @default true
   */
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
});
const propsWithDefaults = useMatProps('fabMenu', props);

const emit = defineEmits({
  /**
   * 展开状态改变时发出更新。
   */
  'update:modelValue'(payload) {
    return typeof payload === 'boolean';
  },
  /**
   * 菜单展开时触发。
   */
  open() {
    return true;
  },
  /**
   * 菜单收起时触发。
   */
  close() {
    return true;
  },
});

const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const appContext = inject(MAT_APP_ROOT_KEY, null);
const rootElement = ref(null);
const closeButtonElement = ref(null);
const uncontrolledOpen = ref(false);
const generatedId = useId();

const isControlled = computed(() => propsWithDefaults.modelValue !== undefined);
const isOpen = computed(() => (
  isControlled.value ? Boolean(propsWithDefaults.modelValue) : uncontrolledOpen.value
));

const closeButtonLabel = computed(() => (
  propsWithDefaults.closeLabel || '关闭'
));

const colorStyle = computed(() => ({
  '--mat-fab-menu-container-color': `var(--mat-sys-color-${propsWithDefaults.color})`,
  '--mat-fab-menu-content-color': `var(--mat-sys-color-on-${propsWithDefaults.color})`,
  '--mat-fab-menu-state-color': `var(--mat-sys-color-on-${propsWithDefaults.color})`,
}));

const usesAppRoot = computed(() => Boolean(appContext));
const teleportTarget = computed(() => (
  usesAppRoot.value ? appContext.floatingLayer.value : null
));

function setOpen(value) {
  if (propsWithDefaults.disabled) {
    return;
  }
  if (value === isOpen.value) {
    return;
  }
  if (!isControlled.value) {
    uncontrolledOpen.value = value;
  }
  emit('update:modelValue', value);
  if (value) {
    emit('open');
  } else {
    emit('close');
  }
}

function toggle() {
  setOpen(!isOpen.value);
}

function handleItemsClick(event) {
  if (!propsWithDefaults.closeOnClick) {
    return;
  }
  const target = event.target;
  if (target instanceof Element && target.closest('button, [role="button"], a')) {
    setOpen(false);
  }
}

function handleKeydown(event) {
  if (propsWithDefaults.closeOnEsc && isOpen.value && event.key === 'Escape') {
    setOpen(false);
  }
}

function handlePointerDown(event) {
  if (propsWithDefaults.closeOnClickOutside && isOpen.value && rootElement.value) {
    if (!rootElement.value.contains(event.target)) {
      setOpen(false);
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('pointerdown', handlePointerDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('pointerdown', handlePointerDown);
});
</script>

<template>
  <Teleport v-if="teleportTarget" :to="teleportTarget">
    <div
      ref="rootElement"
      v-bind="$attrs"
      class="mat-fab-menu"
      :class="[
        `mat-fab-menu--size-${propsWithDefaults.size}`,
        {
          'mat-fab-menu--app-root': true,
          'mat-fab-menu--open': isOpen,
          'mat-fab-menu--disabled': propsWithDefaults.disabled,
        },
      ]"
      :style="colorStyle"
    >
      <div
        class="mat-fab-menu__items"
        :aria-hidden="isOpen ? undefined : 'true'"
        @click="handleItemsClick"
      >
        <slot />
      </div>

      <div class="mat-fab-menu__trigger-box">
        <slot
          name="trigger"
          :open="isOpen"
          :toggle="toggle"
          :size="propsWithDefaults.size"
          :color="propsWithDefaults.color"
        >
          <MatFab
            class="mat-fab-menu__trigger-fab"
            :color="propsWithDefaults.color"
            :disabled="propsWithDefaults.disabled"
            :icon="propsWithDefaults.icon"
            :label="propsWithDefaults.label"
            :size="propsWithDefaults.size"
            :type="propsWithDefaults.type"
            aria-haspopup="true"
            :aria-expanded="String(isOpen)"
            @click="setOpen(true)"
          />

          <MatButtonBase
            ref="closeButtonElement"
            class="mat-fab-menu__close-btn"
            :aria-label="closeButtonLabel"
            :disabled="propsWithDefaults.disabled"
            :type="propsWithDefaults.type"
            :use-cursor="matUi.useCursor"
            @click="setOpen(false)"
          >
            <MatIcon
              as="span"
              class="mat-fab-menu__close-icon"
              :fill="1"
              :optical-size="24"
              size="24px"
              aria-hidden="true"
            >
              {{ propsWithDefaults.closeIcon || 'close' }}
            </MatIcon>

            <MatTooltip
              v-if="closeButtonLabel"
              :content="closeButtonLabel"
              :id="`${generatedId}-close-tooltip`"
              :target="closeButtonElement"
            />
          </MatButtonBase>
        </slot>
      </div>
    </div>
  </Teleport>

  <div
    v-else
    ref="rootElement"
    v-bind="$attrs"
    class="mat-fab-menu"
    :class="[
      `mat-fab-menu--size-${propsWithDefaults.size}`,
      {
        'mat-fab-menu--open': isOpen,
        'mat-fab-menu--disabled': propsWithDefaults.disabled,
      },
    ]"
    :style="colorStyle"
  >
    <div
      class="mat-fab-menu__items"
      :aria-hidden="isOpen ? undefined : 'true'"
      @click="handleItemsClick"
    >
      <slot />
    </div>

    <div class="mat-fab-menu__trigger-box">
      <slot
        name="trigger"
        :open="isOpen"
        :toggle="toggle"
        :size="propsWithDefaults.size"
        :color="propsWithDefaults.color"
      >
        <MatFab
          class="mat-fab-menu__trigger-fab"
          :color="propsWithDefaults.color"
          :disabled="propsWithDefaults.disabled"
          :icon="propsWithDefaults.icon"
          :label="propsWithDefaults.label"
          :size="propsWithDefaults.size"
          :type="propsWithDefaults.type"
          aria-haspopup="true"
          :aria-expanded="String(isOpen)"
          @click="setOpen(true)"
        />

        <MatButtonBase
          ref="closeButtonElement"
          class="mat-fab-menu__close-btn"
          :aria-label="closeButtonLabel"
          :disabled="propsWithDefaults.disabled"
          :type="propsWithDefaults.type"
          :use-cursor="matUi.useCursor"
          @click="setOpen(false)"
        >
          <MatIcon
            as="span"
            class="mat-fab-menu__close-icon"
            :fill="1"
            :optical-size="24"
            size="24px"
            aria-hidden="true"
          >
            {{ propsWithDefaults.closeIcon || 'close' }}
          </MatIcon>

          <MatTooltip
            v-if="closeButtonLabel"
            :content="closeButtonLabel"
            :id="`${generatedId}-close-tooltip`"
            :target="closeButtonElement"
          />
        </MatButtonBase>
      </slot>
    </div>
  </div>
</template>

<style scoped>
@layer mde.components {
  .mat-fab-menu {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: flex-end;
    align-self: flex-end;
    gap: 0;
    pointer-events: auto;
  }

  .mat-fab-menu--app-root {
    pointer-events: auto;
    align-self: flex-end;
  }

  .mat-fab-menu--size-small .mat-fab-menu__trigger-box {
    inline-size: var(--mat-fab-small-container-height, 56px);
    block-size: var(--mat-fab-small-container-height, 56px);
  }

  .mat-fab-menu--size-medium .mat-fab-menu__trigger-box {
    inline-size: var(--mat-fab-medium-container-height, 80px);
    block-size: var(--mat-fab-medium-container-height, 80px);
  }

  .mat-fab-menu--size-large .mat-fab-menu__trigger-box {
    inline-size: var(--mat-fab-large-container-height, 96px);
    block-size: var(--mat-fab-large-container-height, 96px);
  }

  .mat-fab-menu__trigger-box {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .mat-fab-menu__trigger-fab {
    position: absolute;
    inset: 0;
    margin: auto;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: scale(1);
    transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), visibility 0s;
  }

  .mat-fab-menu--open .mat-fab-menu__trigger-fab {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: scale(.8);
    transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), visibility 0s linear var(--mat-sys-motion-duration-short3);
  }

  .mat-fab-menu__close-btn {
    --mat-button-container-color: var(--mat-fab-menu-container-color);
    --mat-button-content-color: var(--mat-fab-menu-content-color);
    --mat-button-state-color: var(--mat-fab-menu-state-color);
    --mat-button-container-elevation: var(--mat-fab-rest-container-elevation, var(--mat-sys-elevation-level3));
    --mat-button-radius: var(--mat-sys-shape-corner-full, 9999px);
    --mat-button-pressed-radius: var(--mat-sys-shape-corner-full, 9999px);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inline-size: 56px;
    block-size: 56px;
    border-radius: var(--mat-sys-shape-corner-full, 9999px);
    padding: 0;
    align-items: center;
    justify-content: center;
    z-index: 3;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: scale(.8);
    transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), visibility 0s linear var(--mat-sys-motion-duration-short3);
  }

  @media (hover: hover) {
    .mat-fab-menu__close-btn:not(:disabled):hover {
      --mat-button-container-elevation: var(--mat-fab-hover-container-elevation, var(--mat-sys-elevation-level4));
    }
  }

  .mat-fab-menu--open .mat-fab-menu__close-btn {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: scale(1);
    transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), visibility 0s;
  }

  .mat-fab-menu__close-icon {
    display: inline-flex;
    flex: 0 0 auto;
    inline-size: 24px;
    block-size: 24px;
    align-items: center;
    justify-content: center;
    color: var(--mat-fab-menu-content-color);
  }

  .mat-fab-menu__items {
    position: absolute;
    inset-block-end: calc(100% + var(--mat-sys-spacing-3, 12px));
    inset-inline-end: 0;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    box-sizing: border-box;
    gap: var(--mat-sys-spacing-3, 12px);
    width: max-content;
    align-items: flex-end;
    transform-origin: bottom right;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(16px) scale(.92);
    transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), visibility 0s linear var(--mat-sys-motion-duration-short3);
  }

  .mat-fab-menu--open .mat-fab-menu__items {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0) scale(1);
    transition: opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), visibility 0s;
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-fab-menu__trigger-fab,
    .mat-fab-menu__close-btn,
    .mat-fab-menu__items {
      transition: none;
    }
  }
}
</style>
