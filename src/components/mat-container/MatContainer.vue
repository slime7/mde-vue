<script setup>
import { useMatProps } from '../use-mat-props';

defineOptions({
  name: 'MatContainer',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 是否取消正文区域的最大宽度限制。
   *
   * @type {boolean}
   * @default false
   */
  fluid: {
    type: Boolean,
    default: false,
  },
});
const propsWithDefaults = useMatProps('container', props);
</script>

<template>
  <div
    v-bind="$attrs"
    class="mat-container"
    :class="{ 'mat-container--fluid': propsWithDefaults.fluid }"
  >
    <div class="mat-container__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.mat-container {
  box-sizing: border-box;
  inline-size: 100%;
  padding-inline: 16px;
}

.mat-container__content {
  inline-size: 100%;
  block-size: 100%;
  min-block-size: 0;
  max-inline-size: 1040px;
  margin-inline: auto;
}

.mat-container--fluid .mat-container__content {
  max-inline-size: none;
}

@media (width >= 600px) {
  .mat-container {
    padding-inline: 24px;
  }
}
</style>
