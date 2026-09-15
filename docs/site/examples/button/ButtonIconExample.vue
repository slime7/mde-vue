<!-- #region template -->
<template>
  <div class="example-icon-buttons">
    <figure>
      <mat-btn icon="home" label="主页" />
      <figcaption>icon 直接传字符串</figcaption>
    </figure>
    <figure>
      <mat-btn icon label="主页">
        home
      </mat-btn>
      <figcaption>icon 加默认 Slot 文本</figcaption>
    </figure>
    <figure>
      <mat-btn aria-label="打开主页">
        <mat-icon icon="home" aria-hidden="true" />
      </mat-btn>
      <figcaption>默认 Slot 放置组件</figcaption>
    </figure>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-icon-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}

.example-icon-buttons figure {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin: 0;
}

.example-icon-buttons figcaption {
  color: var(--mat-sys-color-on-surface-variant);
  font: var(--mat-sys-typescale-body-small);
}
</style>
<!-- #endregion style -->
