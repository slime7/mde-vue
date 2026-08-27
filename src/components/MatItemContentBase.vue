<script setup>

defineOptions({
  name: 'MatItemContentBase',
});

defineProps({
  namespace: {
    type: String,
    required: true,
  },
  lineCount: {
    type: Number,
    required: true,
    validator(value) {
      return [1, 2, 3].includes(value);
    },
  },
  separateTrailing: {
    type: Boolean,
    default: false,
  },
  presentationSlots: {
    type: Boolean,
    default: false,
  },
  labelTypographyClass: {
    type: String,
    required: true,
  },
  supportingTypographyClass: {
    type: String,
    required: true,
  },
  trailingTypographyClass: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span
    data-mat-item-content
    :data-line-count="lineCount"
    :class="[
      namespace,
      `${namespace}--lines-${lineCount}`,
      { [`${namespace}--separate-trailing`]: separateTrailing },
    ]"
  >
    <span
      v-if="$slots.leading"
      data-mat-item-content-leading
      :class="`${namespace}__leading`"
      :inert="presentationSlots ? '' : undefined"
    >
      <slot name="leading" />
    </span>

    <span data-mat-item-content-text :class="`${namespace}__text`">
      <span
        v-if="$slots.overline"
        data-mat-item-content-overline
        :class="[`${namespace}__overline`, trailingTypographyClass]"
      >
        <slot name="overline" />
      </span>

      <span
        data-mat-item-content-label
        :class="[`${namespace}__label`, labelTypographyClass]"
      >
        <slot />
      </span>

      <span
        v-if="$slots.supporting"
        data-mat-item-content-supporting
        :class="[`${namespace}__supporting`, supportingTypographyClass]"
      >
        <slot name="supporting" />
      </span>
    </span>

    <span
      v-if="$slots.trailing && !separateTrailing"
      data-mat-item-content-trailing
      :class="[`${namespace}__trailing`, trailingTypographyClass]"
      :inert="presentationSlots ? '' : undefined"
    >
      <slot name="trailing" />
    </span>
  </span>
</template>

<style scoped>
@layer mde.components {
  [data-mat-item-content] {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 1 1 auto;
    gap: var(--mat-item-content-gap);
    align-items: center;
    box-sizing: border-box;
    min-inline-size: 0;
    inline-size: 100%;
    min-block-size: var(--mat-item-min-block-size);
    padding-block: var(--mat-item-block-space);
    padding-inline: var(--mat-item-leading-space) var(--mat-item-trailing-space);
  }

  [data-mat-item-content][data-line-count='3'] {
    align-items: flex-start;
  }

  [data-mat-item-content-leading],
  [data-mat-item-content-trailing] {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    color: var(--mat-item-supporting-color);
  }

  [data-mat-item-content-leading] {
    font-size: var(--mat-item-icon-size);
    line-height: 1;
  }

  [data-mat-item-content-text] {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-inline-size: 0;
  }

  [data-mat-item-content-label],
  [data-mat-item-content-supporting] {
    align-self: stretch;
    min-inline-size: 0;
    overflow-wrap: anywhere;
  }

  [data-mat-item-content][data-line-count='1'] [data-mat-item-content-label],
  [data-mat-item-content][data-line-count='1'] [data-mat-item-content-overline],
  [data-mat-item-content][data-line-count='1'] [data-mat-item-content-supporting] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [data-mat-item-content-label] {
    color: var(--mat-item-label-color);
  }

  [data-mat-item-content-supporting] {
    color: var(--mat-item-supporting-color);
  }

  [data-mat-item-content-overline] {
    color: var(--mat-item-supporting-color);
    overflow-wrap: anywhere;
  }
}
</style>
