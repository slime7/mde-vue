<script setup>
import {
  computed, inject, onBeforeUnmount, onMounted, provide, ref, useSlots,
} from 'vue';
import MAT_UI_KEY, { DEFAULT_MAT_UI_OPTIONS } from '../../mat-ui-context';
import MatActionBase from '../MatActionBase.vue';
import MatItemContentBase from '../MatItemContentBase.vue';
import MatIcon from '../mat-icon/MatIcon.vue';
import {
  isPointInMenuSafeTriangle, MAT_MENU_GROUP_KEY, MAT_MENU_ITEM_KEY, MAT_MENU_KEY,
} from '../menu-context';

defineOptions({
  name: 'MatMenuItem',
  inheritAttrs: false,
});

const SUBMENU_SAFE_CLOSE_DELAY = 300;

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits({
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
let submenuApi;
let closeTimer;
const hasSubmenu = computed(() => Boolean(slots.submenu));

function closeSubmenu({ delay = 0, focus = false } = {}) {
  cancelSubmenuClose();

  if (delay > 0) {
    closeTimer = setTimeout(() => {
      submenuOpen.value = false;
      submenuApi?.close({ focus });
    }, delay);
    return;
  }

  submenuOpen.value = false;
  submenuApi?.close({ focus });
}

function cancelSubmenuClose() {
  clearTimeout(closeTimer);
  closeTimer = undefined;
}

async function openSubmenu({ pointer = false } = {}) {
  if (!hasSubmenu.value || props.disabled) {
    return;
  }

  menu?.closeOtherSubmenus(itemApi, { pointer });
  submenuOpen.value = true;
  await submenuApi?.open();
}

/**
 * @param {{close: (options?: {focus?: boolean}) => void, element: import('vue').ComputedRef<HTMLElement | null>, id: import('vue').ComputedRef<string>, open: () => Promise<void>}} api
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
  getSubmenuCloseDelay() {
    if (!submenuApi?.element?.value || !menu?.pointerHistory || !element.value) {
      return 0;
    }

    const itemRect = element.value.getBoundingClientRect();
    const submenuRect = submenuApi.element.value.getBoundingClientRect();
    const side = submenuRect.left < itemRect.left ? 'left' : 'right';

    return isPointInMenuSafeTriangle(
      menu.pointerHistory.current,
      menu.pointerHistory.previous,
      submenuRect,
      side,
    ) ? SUBMENU_SAFE_CLOSE_DELAY : 0;
  },
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
  menu?.closeTree();
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
  cancelSubmenuClose,
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
  clearTimeout(closeTimer);
  group?.unregisterItem(itemApi);
  menu?.unregisterItem(itemApi);
});
</script>

<template>
  <span class="mat-menu-item-host">
    <MatActionBase
      ref="action"
      v-bind="$attrs"
      class="mat-menu-item"
      :class="[
        `mat-menu-item--${position}`,
        { 'mat-menu-item--submenu-open': submenuOpen },
      ]"
      data-mat-menu-item
      :aria-controls="hasSubmenu ? submenuId : undefined"
      :aria-expanded="hasSubmenu ? String(submenuOpen) : undefined"
      :aria-haspopup="hasSubmenu ? 'menu' : undefined"
      :disabled="disabled"
      role="menuitem"
      :use-cursor="matUi.useCursor"
      @click="handleClick"
      @keydown="handleKeyDown"
      @pointerenter="openSubmenu({ pointer: true })"
    >
      <MatItemContentBase
        namespace="mat-menu-item-content"
        :line-count="$slots.supporting ? 2 : 1"
        leading-icon
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
.mat-menu-item-host {
  display: contents;
}

.mat-menu-item {
  --mat-action-state-color: currentcolor;
  --mat-item-content-gap: 8px;
  --mat-item-block-space: 0;
  --mat-item-leading-space: 8px;
  --mat-item-trailing-space: 8px;
  --mat-item-icon-size: 20px;
  --mat-item-label-color: inherit;
  --mat-item-supporting-color: var(--mat-menu-supporting-color);
  --mat-item-label-font: var(--mat-sys-typescale-label-large-font);
  --mat-item-label-size: var(--mat-sys-typescale-label-large-size);
  --mat-item-label-weight: var(--mat-sys-typescale-label-large-weight);
  --mat-item-label-tracking: var(--mat-sys-typescale-label-large-tracking);
  --mat-item-label-line-height: var(--mat-sys-typescale-label-large-line-height);
  --mat-item-supporting-font: var(--mat-sys-typescale-body-small-font);
  --mat-item-supporting-size: var(--mat-sys-typescale-body-small-size);
  --mat-item-supporting-weight: var(--mat-sys-typescale-body-small-weight);
  --mat-item-supporting-tracking: var(--mat-sys-typescale-body-small-tracking);
  --mat-item-supporting-line-height: var(--mat-sys-typescale-body-small-line-height);
  --mat-item-trailing-font: var(--mat-sys-typescale-label-large-font);
  --mat-item-trailing-size: var(--mat-sys-typescale-label-large-size);
  --mat-item-trailing-weight: var(--mat-sys-typescale-label-large-weight);
  --mat-item-trailing-tracking: var(--mat-sys-typescale-label-large-tracking);
  --mat-item-trailing-line-height: var(--mat-sys-typescale-label-large-line-height);
  --mat-item-min-block-size: var(--mat-menu-item-height);
  display: flex;
  align-items: center;
  min-block-size: var(--mat-menu-item-height);
  inline-size: 100%;
  padding: 0;
  color: var(--mat-menu-content-color);
  text-align: start;
  background: transparent;
  border: 0;
  border-radius: var(--mat-sys-shape-corner-extra-small);
  transition: border-radius var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-emphasized), color var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard), background-color var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-standard);
}

.mat-menu-item--first:not(.mat-menu-item--submenu-open) {
  border-radius: var(--mat-sys-shape-corner-medium) var(--mat-sys-shape-corner-medium)
    var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small);
}

.mat-menu-item--last:not(.mat-menu-item--submenu-open) {
  border-radius: var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
    var(--mat-sys-shape-corner-medium) var(--mat-sys-shape-corner-medium);
}

.mat-menu-item--only:not(.mat-menu-item--submenu-open) {
  border-radius: var(--mat-sys-shape-corner-medium);
}

.mat-menu-item--submenu-open {
  color: var(--mat-menu-active-content-color);
  background: var(--mat-menu-active-container-color);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.mat-menu-item__submenu-icon {
  font-size: 20px;
  transition: transform var(--mat-sys-motion-duration-short3) var(--mat-sys-motion-easing-emphasized);
}

.mat-menu-item--submenu-open .mat-menu-item__submenu-icon {
  transform: translateX(2px);
}

.mat-menu-item:disabled {
  color: var(--mat-menu-content-color);
  opacity: var(--mat-sys-state-disabled-content-opacity);
}

@supports (border-shape: inset(0 round 1px)) {
  .mat-menu-item {
    border-shape: inset(0 round var(--mat-sys-shape-corner-extra-small));
  }

  .mat-menu-item--submenu-open {
    border-shape: inset(0 round var(--mat-sys-shape-corner-medium));
  }

  .mat-menu-item--first:not(.mat-menu-item--submenu-open) {
    border-shape: inset(
      0 round
      var(--mat-sys-shape-corner-medium) var(--mat-sys-shape-corner-medium)
      var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
    );
  }

  .mat-menu-item--last:not(.mat-menu-item--submenu-open) {
    border-shape: inset(
      0 round
      var(--mat-sys-shape-corner-extra-small) var(--mat-sys-shape-corner-extra-small)
      var(--mat-sys-shape-corner-medium) var(--mat-sys-shape-corner-medium)
    );
  }

  .mat-menu-item--only:not(.mat-menu-item--submenu-open) {
    border-shape: inset(0 round var(--mat-sys-shape-corner-medium));
  }
}

@media (prefers-reduced-motion: reduce) {
  .mat-menu-item,
  .mat-menu-item__submenu-icon {
    transition-duration: 0s;
  }
}
</style>
