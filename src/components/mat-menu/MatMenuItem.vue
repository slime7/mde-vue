<script setup>
import {
  computed, inject, onBeforeUnmount, onMounted, provide, ref, useSlots,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import MatItemContentBase from '../MatItemContentBase.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import MatTooltip from '../mat-tooltip/MatTooltip.vue';
import {
  MAT_MENU_GROUP_KEY, MAT_MENU_ITEM_KEY, MAT_MENU_KEY,
} from '../menu-context';
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatMenuItem',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 禁止项目激活和打开子菜单。
   *
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 标记项目为已选状态。
   *
   * @type {boolean}
   * @default false
   */
  selected: {
    type: Boolean,
    default: false,
  },
  /**
   * 提示文本内容。传入非空字符串时自动挂载 Tooltip。
   *
   * @type {string | undefined}
   * @default undefined
   */
  tooltip: {
    type: String,
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('menuItem', props);
const emit = defineEmits({
  /**
   * 叶子菜单项被激活时触发，载荷为 `MouseEvent`。
   */
  click: (payload) => payload instanceof MouseEvent,
});
const slots = useSlots();
const menu = inject(MAT_MENU_KEY, null);
const group = inject(MAT_MENU_GROUP_KEY, null);
const matUi = inject(MAT_UI_KEY, DEFAULT_MAT_UI_OPTIONS);
const action = ref(null);
const element = computed(() => action.value?.root ?? action.value?.$el ?? null);
const submenuOpen = ref(false);
const submenuId = ref(undefined);
const position = ref('only');
const isGrouped = computed(() => Boolean(group));
let submenuApi;
const hasSubmenu = computed(() => Boolean(slots.submenu));

function closeSubmenu({ focus = false, immediate = false } = {}) {
  submenuOpen.value = false;
  submenuApi?.close({ focus, immediate });
}

async function openSubmenu({ pointer = false } = {}) {
  if (!hasSubmenu.value || propsWithDefaults.disabled) {
    return;
  }

  if (pointer && menu?.isPointerInOpenSubmenuTriangle?.()) {
    return;
  }

  menu?.closeOtherSubmenus(itemApi);
  submenuOpen.value = true;
  await submenuApi?.open();
}

/**
 * @param {{close: (options?: {focus?: boolean, immediate?: boolean}) => void, element: import('vue').ComputedRef<HTMLElement | null>, id: import('vue').ComputedRef<string>, open: () => Promise<void>}} api
 */
function registerSubmenu(api) {
  submenuApi = api;
  submenuId.value = api.id.value;
}

function unregisterSubmenu() {
  submenuApi = undefined;
  submenuId.value = undefined;
  submenuOpen.value = false;
}

const itemApi = {
  closeSubmenu,
  element,
  grouped: Boolean(group),
  setPosition(value) {
    position.value = value;
  },
  submenuElement: computed(() => submenuApi?.element?.value ?? null),
  submenuOpen,
};

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
  if (hasSubmenu.value) {
    openSubmenu();
    return;
  }

  emit('click', event);

  if (menu?.closeOnClick.value) {
    menu.closeTree();
  }
}

/**
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (!hasSubmenu.value) {
    return;
  }

  const direction = getComputedStyle(element.value).direction;
  const openDirection = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';

  if (event.key === openDirection || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openSubmenu();
  }
}

provide(MAT_MENU_ITEM_KEY, {
  element,
  registerSubmenu,
  submenuOpen,
  unregisterSubmenu,
});

onMounted(() => {
  group?.registerItem(itemApi);
  menu?.registerItem(itemApi);
});
onBeforeUnmount(() => {
  group?.unregisterItem(itemApi);
  menu?.unregisterItem(itemApi);
});
</script>

<template>
  <span class="mat-menu-item-host">
    <MatTooltip
      v-if="propsWithDefaults.tooltip"
      :content="propsWithDefaults.tooltip"
    >
      <template #activator>
        <MatActionBase
          ref="action"
          v-bind="$attrs"
          class="mat-menu-item"
          :class="[
            `mat-menu-item--${position}`,
            {
              'mat-menu-item--grouped': isGrouped,
              'mat-menu-item--selected': propsWithDefaults.selected,
              'mat-menu-item--submenu-open': submenuOpen,
            },
          ]"
          data-mat-menu-item
          :aria-controls="hasSubmenu ? submenuId : undefined"
          :aria-expanded="hasSubmenu ? String(submenuOpen) : undefined"
          :aria-haspopup="hasSubmenu ? 'menu' : undefined"
          :aria-selected="propsWithDefaults.selected ? 'true' : undefined"
          :disabled="propsWithDefaults.disabled"
          role="menuitem"
          :use-cursor="matUi.useCursor"
          @click="handleClick"
          @keydown="handleKeyDown"
          @pointerenter="openSubmenu({ pointer: true })"
        >
          <MatItemContentBase
            namespace="mat-menu-item-content"
            label-typography-class="mat-sys-typescale-label-large"
            :line-count="$slots.supporting ? 2 : 1"
            supporting-typography-class="mat-sys-typescale-body-small"
            trailing-typography-class="mat-sys-typescale-label-large"
          >
            <template v-if="$slots.leading" #leading>
              <slot name="leading" />
            </template>

            <slot />

            <template v-if="$slots.supporting" #supporting>
              <slot name="supporting" />
            </template>

            <template #trailing>
              <slot v-if="$slots.trailing" name="trailing" />
              <MatIcon
                v-else-if="hasSubmenu"
                as="span"
                class="mat-menu-item__submenu-icon"
                icon="chevron_right"
                :optical-size="20"
                size="small"
                aria-hidden="true"
              />
            </template>
          </MatItemContentBase>
        </MatActionBase>
      </template>
    </MatTooltip>

    <MatActionBase
      v-else
      ref="action"
      v-bind="$attrs"
      class="mat-menu-item"
      :class="[
        `mat-menu-item--${position}`,
        {
          'mat-menu-item--grouped': isGrouped,
          'mat-menu-item--selected': propsWithDefaults.selected,
          'mat-menu-item--submenu-open': submenuOpen,
        },
      ]"
      data-mat-menu-item
      :aria-controls="hasSubmenu ? submenuId : undefined"
      :aria-expanded="hasSubmenu ? String(submenuOpen) : undefined"
      :aria-haspopup="hasSubmenu ? 'menu' : undefined"
      :aria-selected="propsWithDefaults.selected ? 'true' : undefined"
      :disabled="propsWithDefaults.disabled"
      role="menuitem"
      :use-cursor="matUi.useCursor"
      @click="handleClick"
      @keydown="handleKeyDown"
      @pointerenter="openSubmenu({ pointer: true })"
    >
      <MatItemContentBase
        namespace="mat-menu-item-content"
        label-typography-class="mat-sys-typescale-label-large"
        :line-count="$slots.supporting ? 2 : 1"
        supporting-typography-class="mat-sys-typescale-body-small"
        trailing-typography-class="mat-sys-typescale-label-large"
      >
        <template v-if="$slots.leading" #leading>
          <slot name="leading" />
        </template>

        <slot />

        <template v-if="$slots.supporting" #supporting>
          <slot name="supporting" />
        </template>

        <template #trailing>
          <slot v-if="$slots.trailing" name="trailing" />
          <MatIcon
            v-else-if="hasSubmenu"
            as="span"
            class="mat-menu-item__submenu-icon"
            icon="chevron_right"
            :optical-size="20"
            size="small"
            aria-hidden="true"
          />
        </template>
      </MatItemContentBase>
    </MatActionBase>

    <slot v-if="$slots.submenu" name="submenu" />
  </span>
</template>

<style scoped>
@layer mde.components {
  .mat-menu-item-host {
    display: contents;
  }

  .mat-menu-item {
    --mat-action-state-color: currentcolor;
    --mat-item-content-gap: 8px;
    --mat-item-block-space: 0;
    --mat-item-leading-space: 12px;
    --mat-item-trailing-space: 12px;
    --mat-item-icon-size: 20px;
    --mat-item-label-color: inherit;
    --mat-item-supporting-color: var(--mat-menu-supporting-color);
    --mat-item-min-block-size: var(--mat-menu-item-height);
    display: flex;
    align-items: center;
    min-block-size: var(--mat-menu-item-height);
    inline-size: 100%;
    min-inline-size: 0;
    padding: 0;
    color: var(--mat-menu-content-color);
    text-align: start;
    background-color: transparent;
    border: 0;
    border-radius: var(--mat-sys-shape-corner-extra-small);
    transition: border-radius var(--mat-sys-motion-spring-fast-spatial), border-shape var(--mat-sys-motion-spring-fast-spatial), color var(--mat-sys-motion-spring-fast-effects), background-color var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-menu-item--first:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
    border-radius: var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
      var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small);
  }

  .mat-menu-item--last:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
    border-radius: var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
      var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large);
  }

  .mat-menu-item--grouped.mat-menu-item--last:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
    border-radius: var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
      var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small);
  }

  .mat-menu-item--only:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
    border-radius: var(--mat-sys-shape-corner-large);
  }

  .mat-menu-item--grouped.mat-menu-item--only:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
    border-radius: var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
      var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small);
  }

  .mat-menu-item--selected,
  .mat-menu-item--submenu-open {
    --mat-action-state-color: var(--mat-menu-active-content-color);
    --mat-item-label-color: var(--mat-menu-active-content-color);
    --mat-item-supporting-color: var(--mat-menu-active-content-color);
    color: var(--mat-menu-active-content-color);
    background-color: var(--mat-menu-active-container-color);
    border-radius: var(--mat-sys-shape-corner-medium);
  }

  .mat-menu-item__submenu-icon {
    font-size: 20px;
    transition: transform var(--mat-sys-motion-spring-fast-spatial);
  }

  .mat-menu-item--submenu-open .mat-menu-item__submenu-icon {
    transform: translateX(2px);
  }

  .mat-menu-item:disabled {
    color: var(--mat-menu-content-color);
    opacity: var(--mat-sys-state-disabled-content-opacity);
  }

  .mat-menu-item :deep([data-mat-item-content-leading]) {
    transition: inline-size var(--mat-sys-motion-spring-fast-spatial), min-inline-size var(--mat-sys-motion-spring-fast-spatial), opacity var(--mat-sys-motion-spring-fast-effects), transform var(--mat-sys-motion-spring-fast-spatial), color var(--mat-sys-motion-spring-fast-effects);
  }

  .mat-menu-item :deep([data-mat-item-content-label]),
  .mat-menu-item :deep([data-mat-item-content-supporting]),
  .mat-menu-item :deep([data-mat-item-content-trailing]) {
    transition: color var(--mat-sys-motion-spring-fast-effects);
  }

  @supports (border-shape: inset(0 round 1px)) {
    .mat-menu-item {
      border-shape: inset(0 round var(--mat-sys-shape-corner-extra-small));
    }

    .mat-menu-item--selected,
    .mat-menu-item--submenu-open {
      border-shape: inset(0 round var(--mat-sys-shape-corner-medium));
    }

    .mat-menu-item--first:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
      border-shape: inset(
        0 round
        var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
        var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
      );
    }

    .mat-menu-item--last:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
      border-shape: inset(
        0 round
        var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
        var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
      );
    }

    .mat-menu-item--grouped.mat-menu-item--last:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
      border-shape: inset(
        0 round
        var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
        var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small)
      );
    }

    .mat-menu-item--only:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
      border-shape: inset(0 round var(--mat-sys-shape-corner-large));
    }

    .mat-menu-item--grouped.mat-menu-item--only:not(.mat-menu-item--submenu-open):not(.mat-menu-item--selected) {
      border-shape: inset(
        0 round
        var(--mat-sys-shape-corner-large) var(--mat-sys-shape-corner-large)
        var(--mat-sys-shape-corner-small) var(--mat-sys-shape-corner-small)
      );
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-menu-item,
    .mat-menu-item :deep([data-mat-item-content-leading]),
    .mat-menu-item :deep([data-mat-item-content-label]),
    .mat-menu-item :deep([data-mat-item-content-supporting]),
    .mat-menu-item :deep([data-mat-item-content-trailing]),
    .mat-menu-item__submenu-icon {
      transition-duration: 0s;
    }
  }
}
</style>
