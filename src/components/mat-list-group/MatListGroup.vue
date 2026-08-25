<script setup>
import {
  Comment,
  computed,
  Fragment,
  inject,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useId,
  useSlots,
  watch,
} from 'vue';
import { MAT_LIST_KEY } from '../list-context';
import MatListItem from '../mat-list/MatListItem.vue';
import { useMatProps } from '../use-mat-props';
import MatListGroupActivatorProvider from './MatListGroupActivatorProvider.vue';

defineOptions({
  name: 'MatListGroup',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 分组稳定值；提供后由 MatList 的 expanded 控制展开状态。
   *
   * @type {string | number | boolean | undefined}
   * @default undefined
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * 根元素语义标签。
   *
   * @type {string | undefined}
   * @default undefined
   */
  as: {
    type: String,
    default: undefined,
  },
});
const propsWithDefaults = useMatProps('listGroup', props);

const list = inject(MAT_LIST_KEY, null);
const slots = useSlots();
const root = ref(null);
const internalExpanded = ref(false);
const renderedActivatorValid = ref(null);
const token = Symbol('mat-list-group');
const generatedId = useId().replace(/[^\w-]/g, '-');
const contentId = `mat-list-group-${generatedId}-content`;
const labelId = `mat-list-group-${generatedId}-label`;
let warnedInvalidActivator = false;
let registeredValue;

const hasValue = computed(() => propsWithDefaults.value !== undefined);
const isSelectableFallback = computed(() => list?.isSelectable.value ?? false);
const requestedExpanded = computed(() => {
  if (hasValue.value) {
    return list?.isGroupExpanded(propsWithDefaults.value) ?? false;
  }

  return internalExpanded.value;
});

/**
 * @param {unknown[]} nodes
 * @returns {unknown[]}
 */
function getSignificantNodes(nodes) {
  return nodes.flatMap((node) => {
    if (!isVNode(node)) {
      return typeof node === 'string' && node.trim().length > 0 ? [node] : [];
    }

    if (node.type === Comment) {
      return [];
    }

    if (node.type === Fragment && Array.isArray(node.children)) {
      return getSignificantNodes(node.children);
    }

    return [node];
  });
}

const vnodeActivatorValid = computed(() => {
  const nodes = getSignificantNodes(slots.activator?.({
    expanded: requestedExpanded.value,
  }) ?? []);

  if (nodes.length !== 1 || !isVNode(nodes[0])) {
    return false;
  }

  const component = nodes[0].type;

  return component === MatListItem
    || (typeof component === 'object' && (
      component.name === 'MatListItem' || component.__name === 'MatListItem'
    ));
});
const hasValidActivator = computed(() => (
  renderedActivatorValid.value ?? vnodeActivatorValid.value
));
const expanded = computed(() => (
  isSelectableFallback.value
  || !hasValidActivator.value
  || requestedExpanded.value
));
const variant = computed(() => list?.variant.value ?? 'segmented');

function focusActivatorWhenNeeded() {
  const content = root.value?.querySelector(':scope > [data-mat-list-group-content]');

  if (content?.contains(document.activeElement)) {
    root.value
      ?.querySelector(':scope > [data-mat-list-group-activator]')
      ?.focus();
  }
}

function toggle() {
  if (isSelectableFallback.value || !hasValidActivator.value) {
    return;
  }

  if (requestedExpanded.value) {
    focusActivatorWhenNeeded();
  }

  if (hasValue.value) {
    list?.requestGroupExpanded(propsWithDefaults.value, !requestedExpanded.value);
    return;
  }

  internalExpanded.value = !internalExpanded.value;
}

const activatorContext = {
  contentId,
  expanded,
  labelId,
  static: isSelectableFallback,
  toggle,
};

function warnInvalidActivator() {
  if (!hasValidActivator.value && !warnedInvalidActivator) {
    console.warn('MatListGroup: activator Slot 必须且只能放置一个 MatListItem，当前内容将保持展开');
    warnedInvalidActivator = true;
  } else if (hasValidActivator.value) {
    warnedInvalidActivator = false;
  }
}

function validateRenderedActivator() {
  if (!root.value) {
    return;
  }

  const attribute = isSelectableFallback.value
    ? 'data-mat-list-group-label'
    : 'data-mat-list-group-activator';
  const valid = Array.from(root.value.children)
    .filter((element) => element.hasAttribute(attribute)).length === 1;

  if (renderedActivatorValid.value !== valid) {
    renderedActivatorValid.value = valid;
  }
}

function validateAndWarnActivator() {
  validateRenderedActivator();
  warnInvalidActivator();
}

function registerValue(value) {
  if (value === undefined) {
    return;
  }

  list?.registerGroupValue(token, value);
  registeredValue = value;
}

function unregisterValue() {
  if (registeredValue === undefined) {
    return;
  }

  list?.unregisterGroupValue(token);
  registeredValue = undefined;
}

onMounted(() => {
  if (!list) {
    console.warn('MatListGroup: 必须直接放置在 MatList 中');
  }

  if (isSelectableFallback.value) {
    console.warn('MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开');
  }

  registerValue(propsWithDefaults.value);
  validateAndWarnActivator();
  list?.requestFocusRefresh();
});
onUpdated(validateAndWarnActivator);
onBeforeUnmount(() => {
  unregisterValue();
  list?.requestFocusRefresh();
});
watch(
  () => propsWithDefaults.value,
  (value, previousValue) => {
    if (Object.is(value, previousValue)) {
      return;
    }

    unregisterValue();
    registerValue(value);
  },
);
watch(requestedExpanded, async (isExpanded, wasExpanded) => {
  if (wasExpanded && !isExpanded) {
    focusActivatorWhenNeeded();
  }

  await nextTick();
  list?.requestFocusRefresh();
});
watch(isSelectableFallback, async (selectable, wasSelectable) => {
  if (selectable && !wasSelectable) {
    console.warn('MatListGroup: 选择模式暂不支持折叠，当前分组将作为静态标签并保持展开');
  }

  await nextTick();
  list?.requestFocusRefresh();
});
</script>

<template>
  <component
    :is="propsWithDefaults.as || (isSelectableFallback ? 'div' : 'li')"
    ref="root"
    v-bind="$attrs"
    class="mat-list-group"
    :class="[
      `mat-list-group--${variant}`,
      {
        'mat-list-group--expanded': expanded,
        'mat-list-group--selectable-fallback': isSelectableFallback,
      },
    ]"
    :role="isSelectableFallback ? 'group' : undefined"
    :aria-labelledby="isSelectableFallback ? labelId : undefined"
  >
    <MatListGroupActivatorProvider :context="activatorContext">
      <slot
        name="activator"
        :expanded="expanded"
      />
    </MatListGroupActivatorProvider>

    <div
      :id="contentId"
      class="mat-list-group__content"
      data-mat-list-group-content
      :role="isSelectableFallback ? 'presentation' : undefined"
      :aria-hidden="!expanded ? 'true' : undefined"
      :inert="!expanded ? '' : undefined"
    >
      <component
        :is="isSelectableFallback ? 'div' : 'ul'"
        class="mat-list-group__items"
        :role="isSelectableFallback ? 'presentation' : undefined"
      >
        <slot />
      </component>
    </div>
  </component>
</template>

<style scoped>
@layer mde.components {
  .mat-list-group {
    --mat-list-group-start-start-shape: var(--mat-list-item-container-shape);
    --mat-list-group-start-end-shape: var(--mat-list-item-container-shape);
    --mat-list-group-end-start-shape: var(--mat-list-item-container-shape);
    --mat-list-group-end-end-shape: var(--mat-list-item-container-shape);
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .mat-list-group--standard {
    --mat-list-group-gap: 0;
  }

  .mat-list-group--segmented {
    --mat-list-group-gap: var(--mat-list-segmented-gap);
  }

  .mat-list-group--expanded,
  .mat-list-group--selectable-fallback {
    gap: var(--mat-list-group-gap);
  }

  .mat-list-group__content {
    interpolate-size: allow-keywords;
    display: block;
    min-block-size: 0;
    overflow: clip;
    overflow-clip-margin: 5px;
    block-size: 0;
    opacity: 0;
    transition: block-size var(--mat-sys-motion-spring-default-spatial), opacity var(--mat-sys-motion-spring-default-effects);
  }

  .mat-list-group--expanded > .mat-list-group__content,
  .mat-list-group--selectable-fallback > .mat-list-group__content {
    block-size: auto;
    opacity: 1;
  }

  .mat-list-group__items {
    display: flex;
    flex-direction: column;
    gap: var(--mat-list-group-gap);
    min-block-size: 0;
    min-inline-size: 0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .mat-list-group > :deep(.mat-list-item.mat-list-item--group-activator) {
    --mat-list-item-start-start-shape: var(--mat-list-group-start-start-shape);
    --mat-list-item-start-end-shape: var(--mat-list-group-start-end-shape);
    --mat-list-item-end-start-shape: var(--mat-list-group-end-start-shape);
    --mat-list-item-end-end-shape: var(--mat-list-group-end-end-shape);
    border-start-start-radius: var(--mat-list-group-start-start-shape);
    border-start-end-radius: var(--mat-list-group-start-end-shape);
    border-end-start-radius: var(--mat-list-group-end-start-shape);
    border-end-end-radius: var(--mat-list-group-end-end-shape);
  }

  .mat-list-group--expanded > :deep(.mat-list-item.mat-list-item--group-activator),
  .mat-list-group--selectable-fallback > :deep(.mat-list-item.mat-list-item--group-activator) {
    --mat-list-item-end-start-shape: var(--mat-list-item-container-shape);
    --mat-list-item-end-end-shape: var(--mat-list-item-container-shape);
    border-end-start-radius: var(--mat-list-item-container-shape);
    border-end-end-radius: var(--mat-list-item-container-shape);
  }

  .mat-list-group__items > :deep(.mat-list-item:last-child) {
    --mat-list-item-end-start-shape: var(--mat-list-group-end-start-shape);
    --mat-list-item-end-end-shape: var(--mat-list-group-end-end-shape);
  }

  @media (prefers-reduced-motion: reduce) {
    .mat-list-group__content {
      transition-duration: 0s;
    }
  }
}
</style>
