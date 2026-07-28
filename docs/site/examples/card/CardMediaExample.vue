<!-- #region template -->
<template>
  <div class="example-row">
    <mat-card>
      <template #media>
        <div class="media-placeholder" role="img" aria-label="具名 Slot 媒体示意图">
          media Slot
        </div>
      </template>
      <mat-card-content>Media 默认占满卡片横向空间。</mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-media>
        <div class="media-placeholder" role="img" aria-label="子组件媒体示意图">
          MatCardMedia
        </div>
      </mat-card-media>
      <mat-card-content>也可以直接组合 MatCardMedia。</mat-card-content>
    </mat-card>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-row > * {
  inline-size: min(100%, 280px);
}

.media-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 9;
  color: var(--mat-sys-color-on-secondary-container);
  background: var(--mat-sys-color-secondary-container);
}
</style>
<!-- #endregion style -->
