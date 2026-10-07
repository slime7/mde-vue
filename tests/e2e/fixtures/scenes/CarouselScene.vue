<script setup>
function makeImage(background, accent) {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">'
    + `<rect width="640" height="360" fill="${background}"/>`
    + `<circle cx="320" cy="180" r="78" fill="${accent}"/>`
    + '</svg>';

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const palettes = [
  ['#cfeaff', '#20a6fc'],
  ['#ffd8e4', '#ff4f9a'],
  ['#d9ffe2', '#1fae5f'],
  ['#fff3c4', '#f2a413'],
  ['#e6dcff', '#7b5cd6'],
  ['#c9f5ef', '#0f9e8e'],
];

const images = palettes.map(([background, accent], index) => ({
  src: makeImage(background, accent),
  title: `示例图 ${index + 1}`,
}));

const aspectRatios = ['16/9', '9/16', '1/1', '3/4', '16/10', '4/3'];
</script>

<template>
  <section data-scene="carousel" class="carousel-scene">
    <h1>轮播场景</h1>

    <div
      class="carousel-stage"
      data-testid="carousel-stage"
    >
      <mat-carousel
        variant="multi-browse"
        switch-on-click
        aria-label="场景轮播"
        data-testid="carousel"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>

    <div
      class="carousel-stage"
      data-testid="uncontained-stage"
    >
      <mat-carousel
        variant="uncontained"
        aria-label="等宽轮播"
        data-testid="carousel-uncontained"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>

    <div
      class="carousel-stage"
      data-testid="uncontained-multi-aspect-stage"
    >
      <mat-carousel
        variant="uncontained-multi-aspect"
        aria-label="多比例轮播"
        data-testid="carousel-uncontained-multi-aspect"
      >
        <mat-carousel-item
          v-for="(image, index) in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
          :aspect-ratio="aspectRatios[index]"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>

    <div
      class="carousel-stage"
      data-testid="hero-stage"
    >
      <mat-carousel
        variant="hero"
        aria-label="主视觉轮播"
        data-testid="carousel-hero"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>
    <div
      class="carousel-stage"
      data-testid="hero-centered-stage"
    >
      <mat-carousel
        variant="hero-center-aligned"
        aria-label="居中主视觉轮播"
        data-testid="carousel-hero-centered"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>

    <!-- 宽容器舞台：宽屏下停靠画面的尺寸组成与中间态几何有独立回归面。 -->
    <div
      class="carousel-stage carousel-stage--wide"
      data-testid="carousel-wide-stage"
    >
      <mat-carousel
        variant="multi-browse"
        aria-label="宽容器场景轮播"
        data-testid="carousel-wide"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>

    <div
      class="carousel-stage carousel-stage--wide"
      data-testid="carousel-hero-wide-stage"
    >
      <mat-carousel
        variant="hero"
        aria-label="宽容器主视觉轮播"
        data-testid="carousel-hero-wide"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>

    <div
      class="carousel-stage carousel-stage--wide"
      data-testid="carousel-hero-centered-wide-stage"
    >
      <mat-carousel
        variant="hero-center-aligned"
        aria-label="宽容器居中主视觉轮播"
        data-testid="carousel-hero-centered-wide"
      >
        <mat-carousel-item
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.title"
        >
          <span class="carousel-title">{{ image.title }}</span>
        </mat-carousel-item>
      </mat-carousel>
    </div>
  </section>
</template>

<style scoped>
.carousel-scene {
  min-block-size: 100vh;
}

.carousel-stage {
  inline-size: 800px;
  block-size: 320px;
  background: var(--mat-sys-color-surface-container);
}

.carousel-stage--wide {
  inline-size: 1184px;
}
</style>
