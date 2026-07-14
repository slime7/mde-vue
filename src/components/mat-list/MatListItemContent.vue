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
    :line-count="lineCount"
    :presentation-slots="presentationSlots"
    :separate-trailing="separateTrailing"
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
  --mat-item-label-font: var(--mat-sys-typescale-body-large-font);
  --mat-item-label-size: var(--mat-sys-typescale-body-large-size);
  --mat-item-label-weight: var(--mat-sys-typescale-body-large-weight);
  --mat-item-label-tracking: var(--mat-sys-typescale-body-large-tracking);
  --mat-item-label-line-height: var(--mat-sys-typescale-body-large-line-height);
  --mat-item-supporting-font: var(--mat-sys-typescale-body-medium-font);
  --mat-item-supporting-size: var(--mat-sys-typescale-body-medium-size);
  --mat-item-supporting-weight: var(--mat-sys-typescale-body-medium-weight);
  --mat-item-supporting-tracking: var(--mat-sys-typescale-body-medium-tracking);
  --mat-item-supporting-line-height: var(--mat-sys-typescale-body-medium-line-height);
  --mat-item-trailing-font: var(--mat-sys-typescale-label-small-font);
  --mat-item-trailing-size: var(--mat-sys-typescale-label-small-size);
  --mat-item-trailing-weight: var(--mat-sys-typescale-label-small-weight);
  --mat-item-trailing-tracking: var(--mat-sys-typescale-label-small-tracking);
  --mat-item-trailing-line-height: var(--mat-sys-typescale-label-small-line-height);
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
