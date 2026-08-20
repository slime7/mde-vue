<!-- #region template -->
<template>
  <mat-list
    variant="standard"
    aria-label="列表项目尺寸"
    class="example-list"
  >
    <mat-list-item>
      纯文本项目
    </mat-list-item>

    <mat-list-item>
      <template #leading>
        <mat-icon
          icon="person"
          aria-hidden="true"
        />
      </template>

      24px 图标
    </mat-list-item>

    <mat-list-item>
      <template #leading>
        <mat-avatar aria-hidden="true">
          A
        </mat-avatar>
      </template>

      40px 头像
    </mat-list-item>

    <mat-list-item>
      <template #leading>
        <span
          class="example-media example-media--medium"
          aria-hidden="true"
        />
      </template>

      56px 媒体
    </mat-list-item>

    <mat-list-item>
      <template #leading>
        <span
          class="example-media example-media--large"
          aria-hidden="true"
        />
      </template>

      64px 媒体
    </mat-list-item>
  </mat-list>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-list {
  inline-size: 100%;
}

.example-media {
  display: block;
  flex-shrink: 0;
  inline-size: 72px;
  background: linear-gradient(135deg, var(--mat-sys-color-primary-container), transparent), var(--mat-sys-color-surface-container-high);
  border-radius: var(--mat-sys-shape-corner-medium);
}

.example-media--medium {
  block-size: 56px;
}

.example-media--large {
  block-size: 64px;
}
</style>
<!-- #endregion style -->
