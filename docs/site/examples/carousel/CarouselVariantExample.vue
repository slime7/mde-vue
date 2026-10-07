<!-- #region template -->
<template>
  <div class="carousel-variants">
    <section
      v-for="demo in demos"
      :key="demo.variant"
      class="carousel-variants__demo"
    >
      <h4 class="carousel-variants__title">
        {{ demo.label }}
      </h4>
      <div
        class="carousel-variants__stage"
        :class="{ 'carousel-variants__stage--vertical': demo.variant === 'full-screen' }"
      >
        <mat-carousel
          :variant="demo.variant"
          :aria-label="`${demo.label}轮播`"
        >
          <mat-carousel-item
            v-for="(image, index) in demo.images"
            :key="`${demo.variant}-${index}`"
            :src="image.src"
            :alt="`${image.title}示例图`"
            :aspect-ratio="demo.aspectRatios?.[index]"
          >
            <span class="carousel-variants__item-title">{{ image.title }}</span>
            <span class="carousel-variants__item-label">{{ image.label }}</span>
          </mat-carousel-item>
        </mat-carousel>
      </div>
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
function makeImage(background, accent) {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">'
    + `<rect width="640" height="360" fill="${background}"/>`
    + `<circle cx="320" cy="180" r="78" fill="${accent}"/>`
    + '</svg>';

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const palettes = [
  ['#cfeaff', '#20a6fc', '群岛日出', '3 天前'],
  ['#ffd8e4', '#ff4f9a', '晚樱小径', '1 周前'],
  ['#d9ffe2', '#1fae5f', '茶山晨雾', '2 周前'],
  ['#fff3c4', '#f2a413', '麦田日落', '3 周前'],
  ['#e6dcff', '#7b5cd6', '薰衣草田', '1 个月前'],
  ['#c9f5ef', '#0f9e8e', '湖心倒影', '1 个月前'],
  ['#ffe0cc', '#f2703a', '丹霞公路', '2 个月前'],
  ['#d6e4ff', '#3d6df2', '雪后松林', '2 个月前'],
  ['#f5d6e8', '#d63d92', '花市灯火', '3 个月前'],
  ['#e2f0d6', '#5c9e31', '梯田秋收', '3 个月前'],
];

const images = palettes.map(([background, accent, title, label]) => ({
  src: makeImage(background, accent),
  title,
  label,
}));

const aspectRatios = ['16/9', '9/16', '1/1', '3/4', '16/10', '4/3', '9/16', '1/1', '3/4', '16/9'];

const demos = [
  { variant: 'multi-browse', label: 'multi-browse', images },
  { variant: 'uncontained', label: 'uncontained', images },
  {
    variant: 'uncontained-multi-aspect',
    label: 'uncontained-multi-aspect',
    images,
    aspectRatios,
  },
  { variant: 'hero', label: 'hero', images },
  { variant: 'hero-center-aligned', label: 'hero-center-aligned', images },
  { variant: 'full-screen', label: 'full-screen', images },
];
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.carousel-variants {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.carousel-variants__demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.carousel-variants__title {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-label-large-size);
  font-weight: var(--mat-sys-typescale-label-large-weight);
}

/*
 * 横向布局的圆角由 mat-carousel 自带，stage 只提供块轴尺寸；
 * full-screen 保持直角铺满，仍由外部舞台提供圆角。
 */

.carousel-variants__stage {
  block-size: 200px;
}

.carousel-variants__stage--vertical {
  block-size: 280px;
  border-radius: 16px;
  overflow: hidden;
}

.carousel-variants__item-title {
  color: inherit;
  font-size: var(--mat-sys-typescale-title-medium-size);
  font-weight: var(--mat-sys-typescale-title-medium-weight);
  line-height: var(--mat-sys-typescale-title-medium-line-height);
}

.carousel-variants__item-label {
  color: inherit;
  opacity: .85;
  font-size: var(--mat-sys-typescale-body-small-size);
  line-height: var(--mat-sys-typescale-body-small-line-height);
}
</style>
<!-- #endregion style -->
