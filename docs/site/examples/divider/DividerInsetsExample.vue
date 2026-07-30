<!-- #region template -->
<template>
  <div class="example-stack">
    <section>
      <p>全宽</p>
      <mat-divider />
    </section>
    <section>
      <p>起始侧缩进</p>
      <mat-divider inset="start" />
    </section>
    <section>
      <p>两侧缩进</p>
      <mat-divider inset />
    </section>
  </div>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style scoped>
.example-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
  inline-size: 100%;
  padding-block: 12px;
}

.example-stack section {
  inline-size: 100%;
}

.example-stack p {
  margin: 0 16px 8px;
}
</style>
<!-- #endregion style -->
