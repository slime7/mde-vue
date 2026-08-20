<script setup>
import {
  computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref,
} from 'vue';
import MatItemContentBase from '../MatItemContentBase.vue';

defineOptions({
  name: 'MatListItemContent',
});

const props = defineProps({
  lineCount: {
    type: Number,
    required: true,
  },
  separateTrailing: {
    type: Boolean,
    default: false,
  },
  presentationSlots: {
    type: Boolean,
    default: false,
  },
});

const contentRoot = ref(null);
const contentElement = computed(() => {
  if (contentRoot.value instanceof HTMLElement) {
    return contentRoot.value;
  }

  return contentRoot.value?.$el instanceof HTMLElement ? contentRoot.value.$el : null;
});
const hasLargeContent = ref(false);
const usesLargePadding = computed(() => props.lineCount === 3 || hasLargeContent.value);
let resizeObserver;

function measureContent() {
  if (!contentElement.value) {
    return;
  }

  const tallestContent = Array.from(contentElement.value.children).reduce((height, element) => (
    Math.max(height, element.getBoundingClientRect().height, element.scrollHeight)
  ), 0);

  hasLargeContent.value = tallestContent > 56;
}

function observeContent() {
  resizeObserver?.disconnect();
  resizeObserver = undefined;
  measureContent();

  if (!contentElement.value || typeof ResizeObserver === 'undefined') {
    return;
  }

  resizeObserver = new ResizeObserver(measureContent);
  Array.from(contentElement.value.children).forEach((element) => {
    resizeObserver.observe(element);
  });
}

onMounted(async () => {
  await nextTick();
  observeContent();
});
onUpdated(observeContent);
onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <MatItemContentBase
    ref="contentRoot"
    namespace="mat-list-item-content"
    label-typography-class="mat-sys-typescale-body-large"
    :line-count="lineCount"
    :class="{ 'mat-list-item-content--large-content': usesLargePadding }"
    :presentation-slots="presentationSlots"
    :separate-trailing="separateTrailing"
    supporting-typography-class="mat-sys-typescale-body-medium"
    trailing-typography-class="mat-sys-typescale-label-small"
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
  </MatItemContentBase>
</template>

<style scoped>
@layer mde.components {
  .mat-list-item-content {
    --mat-item-content-gap: var(--mat-list-item-content-gap);
    --mat-item-block-space: var(--mat-list-item-vertical-space);
    --mat-item-leading-space: var(--mat-list-item-leading-space);
    --mat-item-trailing-space: var(--mat-list-item-trailing-space);
    --mat-item-icon-size: var(--mat-list-item-icon-size);
    --mat-item-label-color: var(--mat-list-item-label-color);
    --mat-item-supporting-color: var(--mat-list-item-supporting-color);
  }

  .mat-list-item-content--lines-1 {
    --mat-item-min-block-size: var(--mat-list-item-one-line-height);
  }

  .mat-list-item-content--lines-2 {
    --mat-item-min-block-size: var(--mat-list-item-two-line-height);
  }

  .mat-list-item-content--lines-3 {
    --mat-item-min-block-size: var(--mat-list-item-three-line-height);
  }

  .mat-list-item-content--large-content {
    --mat-item-block-space: var(--mat-list-item-large-vertical-space);
  }
}
</style>
