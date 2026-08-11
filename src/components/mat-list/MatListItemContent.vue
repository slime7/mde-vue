<script setup>
import MatItemContentBase from '../MatItemContentBase.vue';

defineOptions({
  name: 'MatListItemContent',
});

defineProps({
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
</script>

<template>
  <MatItemContentBase
    namespace="mat-list-item-content"
    label-typography-class="mat-sys-typescale-body-large"
    :line-count="lineCount"
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
</style>
