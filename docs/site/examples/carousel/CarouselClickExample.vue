<!-- #region template -->
<template>
  <div class="carousel-click-example">
    <div class="carousel-click-example__stage">
      <mat-carousel
        variant="multi-browse"
        aria-label="可点击的项目轮播"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.title"
          :src="image.src"
          :alt="`${image.title}示例图`"
          @click="selected = image.title"
        >
          <span class="carousel-click-example__item-title">{{ image.title }}</span>
          <span class="carousel-click-example__item-label">{{ image.label }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>
    <p class="carousel-click-example__status">
      {{ selected ? `点击了：${selected}` : '点击轮播卡片查看反馈' }}
    </p>
  </div>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script setup>
import { ref } from 'vue';

function makeImage(background, accent) {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">'
    + `<rect width="640" height="360" fill="${background}"/>`
    + `<circle cx="320" cy="180" r="78" fill="${accent}"/>`
    + '</svg>';

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const images = [
  { src: makeImage('#cfeaff', '#20a6fc'), title: '群岛日出', label: '3 天前' },
  { src: makeImage('#ffd8e4', '#ff4f9a'), title: '晚樱小径', label: '1 周前' },
  { src: makeImage('#d9ffe2', '#1fae5f'), title: '茶山晨雾', label: '2 周前' },
  { src: makeImage('#fff3c4', '#f2a413'), title: '麦田日落', label: '3 周前' },
  { src: makeImage('#e6dcff', '#7b5cd6'), title: '薰衣草田', label: '1 个月前' },
  { src: makeImage('#c9f5ef', '#0f9e8e'), title: '湖心倒影', label: '1 个月前' },
];

const selected = ref('');
</script>
<!-- #endregion script -->

<!-- #region style -->
<style scoped>
.carousel-click-example {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.carousel-click-example__stage {
  block-size: 200px;
}

.carousel-click-example__item-title {
  color: inherit;
  font-size: var(--mat-sys-typescale-title-medium-size);
  font-weight: var(--mat-sys-typescale-title-medium-weight);
  line-height: var(--mat-sys-typescale-title-medium-line-height);
}

.carousel-click-example__item-label {
  color: inherit;
  opacity: .85;
  font-size: var(--mat-sys-typescale-body-small-size);
  line-height: var(--mat-sys-typescale-body-small-line-height);
}

.carousel-click-example__status {
  margin: 0;
  color: var(--mat-sys-color-on-surface-variant);
  font-size: var(--mat-sys-typescale-body-medium-size);
}
</style>
<!-- #endregion style -->
