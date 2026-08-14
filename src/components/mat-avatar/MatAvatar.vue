<script setup>
import { computed } from 'vue';
import { isComponentColor } from '../button-props';
import MatIcon from '../mat-icon/MatIcon.vue';
import useComponentColor from '../use-component-color';
import { useMatProps } from '../use-mat-props';
import { isValidCssLength, toCssLength } from '../value-utils';

defineOptions({
  name: 'MatAvatar',
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * 头像图片资源地址；非空字符串才有效，空字符串等同未设置。
   *
   * @type {string | undefined}
   * @default undefined
   */
  src: {
    type: String,
    default: undefined,
    validator(value) {
      return value === undefined || value.length > 0;
    },
  },
  /**
   * Material Symbols 字形文本；仅非空字符串视为有效，空字符串等同未设置。
   *
   * @type {string | undefined}
   * @default undefined
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * Material 语义色、系统颜色角色或六位十六进制种子色。
   *
   * @type {string}
   * @default 'primary'
   */
  color: {
    type: String,
    default: 'primary',
    validator: isComponentColor,
  },
  /**
   * 头像边长；数字与纯数字字符串按 px 处理，其他字符串 trim 后须为合法正 CSS 长度。
   *
   * @type {number | string}
   * @default 40
   */
  size: {
    type: [Number, String],
    default: 40,
    validator: (value) => isValidCssLength(value, {
      property: 'width',
      positive: true,
    }),
  },
});
const propsWithDefaults = useMatProps('avatar', props);
const { colorStyle } = useComponentColor(computed(() => propsWithDefaults.color));
const avatarSize = computed(() => toCssLength(propsWithDefaults.size, {
  property: 'width',
  positive: true,
  fallback: '40px',
}));
const rootStyle = computed(() => ({
  ...colorStyle.value,
  '--mat-avatar-size': avatarSize.value,
  'inline-size': avatarSize.value,
  'block-size': avatarSize.value,
}));
</script>

<template>
  <span
    v-bind="$attrs"
    class="mat-avatar"
    :style="rootStyle"
  >
    <img
      v-if="propsWithDefaults.src"
      class="mat-avatar__image"
      :src="propsWithDefaults.src"
      alt=""
    >

    <MatIcon
      v-else-if="propsWithDefaults.icon"
      as="span"
      class="mat-avatar__icon"
      :icon="propsWithDefaults.icon"
      size="var(--mat-avatar-icon-size)"
      aria-hidden="true"
    />

    <span
      v-else
      class="mat-avatar__content"
    >
      <slot />
    </span>
  </span>
</template>

<style scoped>
@layer mde.components {
  .mat-avatar {
    --mat-avatar-icon-size: calc(var(--mat-avatar-size) * .6);
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: var(--mat-sys-shape-corner-full);
    background: var(--mat-accent-color);
    color: var(--mat-on-accent-color);
    vertical-align: middle;
    font-family: var(--mat-sys-typescale-label-large-font);
    font-size: var(--mat-sys-typescale-label-large-size);
    font-weight: var(--mat-sys-typescale-label-large-weight);
    letter-spacing: var(--mat-sys-typescale-label-large-tracking);
    line-height: var(--mat-sys-typescale-label-large-line-height);
  }

  .mat-avatar__image {
    display: block;
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
  }

  .mat-avatar__icon {
    flex: 0 0 auto;
  }

  .mat-avatar__content {
    display: block;
    box-sizing: border-box;
    min-inline-size: 0;
    max-inline-size: 100%;
    padding-inline: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
}
</style>
