<script setup>
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
  <span
    class="mat-list-item-content"
    :class="[
      `mat-list-item-content--lines-${lineCount}`,
      { 'mat-list-item-content--separate-trailing': separateTrailing },
    ]"
  >
    <span
      v-if="$slots.leading"
      class="mat-list-item-content__leading"
      :inert="presentationSlots ? '' : undefined"
    >
      <slot name="leading" />
    </span>

    <span class="mat-list-item-content__text">
      <span
        v-if="$slots.overline"
        class="mat-list-item-content__overline"
      >
        <slot name="overline" />
      </span>

      <span class="mat-list-item-content__label">
        <slot />
      </span>

      <span
        v-if="$slots.supporting"
        class="mat-list-item-content__supporting"
      >
        <slot name="supporting" />
      </span>
    </span>

    <span
      v-if="$slots.trailing && !separateTrailing"
      class="mat-list-item-content__trailing"
      :inert="presentationSlots ? '' : undefined"
    >
      <slot name="trailing" />
    </span>
  </span>
</template>

<style scoped>
.mat-list-item-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1 1 auto;
  gap: var(--mat-list-item-content-gap);
  align-items: center;
  box-sizing: border-box;
  min-inline-size: 0;
  inline-size: 100%;
  padding-block: var(--mat-list-item-vertical-space);
  padding-inline: var(--mat-list-item-leading-space) var(--mat-list-item-trailing-space);
}

.mat-list-item-content--lines-1 {
  min-block-size: var(--mat-list-item-one-line-height);
}

.mat-list-item-content--lines-2 {
  min-block-size: var(--mat-list-item-two-line-height);
}

.mat-list-item-content--lines-3 {
  align-items: flex-start;
  min-block-size: var(--mat-list-item-three-line-height);
}

.mat-list-item-content--separate-trailing {
  padding-inline-end: 0;
}

.mat-list-item-content__leading,
.mat-list-item-content__trailing {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: var(--mat-list-item-supporting-color);
  font-size: var(--mat-list-item-icon-size);
  line-height: 1;
}

.mat-list-item-content__text {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-inline-size: 0;
}

.mat-list-item-content__label {
  color: var(--mat-list-item-label-color);
  font-family: var(--mat-sys-typescale-body-large-font);
  font-size: var(--mat-sys-typescale-body-large-size);
  font-weight: var(--mat-sys-typescale-body-large-weight);
  letter-spacing: var(--mat-sys-typescale-body-large-tracking);
  line-height: var(--mat-sys-typescale-body-large-line-height);
}

.mat-list-item-content__supporting {
  color: var(--mat-list-item-supporting-color);
  font-family: var(--mat-sys-typescale-body-medium-font);
  font-size: var(--mat-sys-typescale-body-medium-size);
  font-weight: var(--mat-sys-typescale-body-medium-weight);
  letter-spacing: var(--mat-sys-typescale-body-medium-tracking);
  line-height: var(--mat-sys-typescale-body-medium-line-height);
}

.mat-list-item-content__overline,
.mat-list-item-content__trailing {
  font-family: var(--mat-sys-typescale-label-small-font);
  font-size: var(--mat-sys-typescale-label-small-size);
  font-weight: var(--mat-sys-typescale-label-small-weight);
  letter-spacing: var(--mat-sys-typescale-label-small-tracking);
  line-height: var(--mat-sys-typescale-label-small-line-height);
}

.mat-list-item-content__overline {
  color: var(--mat-list-item-supporting-color);
}
</style>
