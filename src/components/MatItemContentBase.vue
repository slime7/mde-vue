<script setup>
import MatIcon from './mat-icon/MatIcon.vue';

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
  leadingIcon: {
    type: Boolean,
    default: false,
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
      <MatIcon
        v-if="leadingIcon"
        as="span"
        :optical-size="20"
        size="var(--mat-item-icon-size)"
      >
        <slot name="leading" />
      </MatIcon>
      <slot v-else name="leading" />
    </span>

    <span data-mat-item-content-text :class="`${namespace}__text`">
      <span
        v-if="$slots.overline"
        data-mat-item-content-overline
        :class="`${namespace}__overline`"
      >
        <slot name="overline" />
      </span>

      <span data-mat-item-content-label :class="`${namespace}__label`">
        <slot />
      </span>

      <span
        v-if="$slots.supporting"
        data-mat-item-content-supporting
        :class="`${namespace}__supporting`"
      >
        <slot name="supporting" />
      </span>
    </span>

    <span
      v-if="$slots.trailing && !separateTrailing"
      data-mat-item-content-trailing
      :class="`${namespace}__trailing`"
      :inert="presentationSlots ? '' : undefined"
    >
      <slot name="trailing" />
    </span>
  </span>
</template>

<style scoped>
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

[data-mat-item-content][class*='--separate-trailing'] {
  padding-inline-end: 0;
}

[data-mat-item-content-leading],
[data-mat-item-content-trailing] {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: var(--mat-item-supporting-color);
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

[data-mat-item-content-label] {
  color: var(--mat-item-label-color);
  font-family: var(--mat-item-label-font);
  font-size: var(--mat-item-label-size);
  font-weight: var(--mat-item-label-weight);
  letter-spacing: var(--mat-item-label-tracking);
  line-height: var(--mat-item-label-line-height);
}

[data-mat-item-content-supporting] {
  color: var(--mat-item-supporting-color);
  font-family: var(--mat-item-supporting-font);
  font-size: var(--mat-item-supporting-size);
  font-weight: var(--mat-item-supporting-weight);
  letter-spacing: var(--mat-item-supporting-tracking);
  line-height: var(--mat-item-supporting-line-height);
}

[data-mat-item-content-overline],
[data-mat-item-content-trailing] {
  font-family: var(--mat-item-trailing-font);
  font-size: var(--mat-item-trailing-size);
  font-weight: var(--mat-item-trailing-weight);
  letter-spacing: var(--mat-item-trailing-tracking);
  line-height: var(--mat-item-trailing-line-height);
}

[data-mat-item-content-overline] {
  color: var(--mat-item-supporting-color);
}
</style>
